// ---------------------------------------------------------------------------
// Shared formatting
// ---------------------------------------------------------------------------

export const CURRENCY_OPTIONS = [
  { value: "\u20B9", label: "\u20B9 INR" },
  { value: "$", label: "$ USD" },
  { value: "\u20AC", label: "\u20AC EUR" },
  { value: "\u00A3", label: "\u00A3 GBP" },
];

export function formatMoney(value: number): string {
  if (!Number.isFinite(value)) return "0";
  return Math.round(value).toLocaleString("en-IN");
}

// ---------------------------------------------------------------------------
// Loan / EMI math
// ---------------------------------------------------------------------------

export interface EmiResult {
  emi: number;
  totalPayment: number;
  totalInterest: number;
}

/** Standard reducing-balance EMI formula. annualRatePercent is the nominal annual rate. */
export function calculateEmi(principal: number, annualRatePercent: number, months: number): EmiResult {
  if (principal <= 0 || months <= 0) return { emi: 0, totalPayment: 0, totalInterest: 0 };
  const r = annualRatePercent / 12 / 100;
  const emi = r === 0 ? principal / months : (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  const totalPayment = emi * months;
  return { emi, totalPayment, totalInterest: totalPayment - principal };
}

/** Reverse of calculateEmi: max principal that a given EMI budget can service. */
export function calculatePrincipalFromEmi(emi: number, annualRatePercent: number, months: number): number {
  if (emi <= 0 || months <= 0) return 0;
  const r = annualRatePercent / 12 / 100;
  return r === 0 ? emi * months : (emi * (1 - Math.pow(1 + r, -months))) / r;
}

export interface AmortizationYear {
  year: number;
  principalPaid: number;
  interestPaid: number;
  endingBalance: number;
}

export function calculateAmortizationSchedule(principal: number, annualRatePercent: number, months: number): AmortizationYear[] {
  const r = annualRatePercent / 12 / 100;
  const { emi } = calculateEmi(principal, annualRatePercent, months);
  let balance = principal;
  const years: AmortizationYear[] = [];
  let yearPrincipal = 0;
  let yearInterest = 0;

  for (let m = 1; m <= months; m++) {
    const interestForMonth = balance * r;
    const principalForMonth = Math.min(emi - interestForMonth, balance);
    balance = Math.max(0, balance - principalForMonth);
    yearPrincipal += principalForMonth;
    yearInterest += interestForMonth;

    if (m % 12 === 0 || m === months) {
      years.push({ year: Math.ceil(m / 12), principalPaid: yearPrincipal, interestPaid: yearInterest, endingBalance: balance });
      yearPrincipal = 0;
      yearInterest = 0;
    }
  }
  return years;
}

export interface PrepaymentResult {
  originalMonths: number;
  newMonths: number;
  monthsSaved: number;
  originalTotalInterest: number;
  newTotalInterest: number;
  interestSaved: number;
}

/**
 * Simulates a one-time lump-sum prepayment made at `prepaymentAtMonth`, keeping the
 * original EMI amount unchanged (tenure shortens instead of the EMI reducing).
 */
export function calculatePrepaymentImpact(
  principal: number,
  annualRatePercent: number,
  months: number,
  prepaymentAmount: number,
  prepaymentAtMonth: number
): PrepaymentResult {
  const r = annualRatePercent / 12 / 100;
  const { emi, totalInterest: originalTotalInterest } = calculateEmi(principal, annualRatePercent, months);

  let balance = principal;
  let interestPaid = 0;
  let month = 0;

  while (balance > 0.01 && month < months * 3) {
    month++;
    const interestForMonth = balance * r;
    let principalForMonth = emi - interestForMonth;

    if (month === prepaymentAtMonth) {
      principalForMonth += prepaymentAmount;
    }

    principalForMonth = Math.min(principalForMonth, balance);
    balance -= principalForMonth;
    interestPaid += interestForMonth;
  }

  return {
    originalMonths: months,
    newMonths: month,
    monthsSaved: months - month,
    originalTotalInterest,
    newTotalInterest: interestPaid,
    interestSaved: originalTotalInterest - interestPaid,
  };
}

// ---------------------------------------------------------------------------
// SIP / Lumpsum / Step-up SIP
// ---------------------------------------------------------------------------

export interface SipResult {
  futureValue: number;
  totalInvested: number;
  gain: number;
}

/** Monthly SIP, contribution made at the start of each month (annuity-due convention). */
export function calculateSipFutureValue(monthlyAmount: number, annualReturnPercent: number, years: number): SipResult {
  const months = Math.round(years * 12);
  const r = annualReturnPercent / 12 / 100;
  let balance = 0;
  for (let m = 0; m < months; m++) {
    balance = (balance + monthlyAmount) * (1 + r);
  }
  const totalInvested = monthlyAmount * months;
  return { futureValue: balance, totalInvested, gain: balance - totalInvested };
}

/** SIP where the monthly contribution increases by stepUpPercent every 12 months. */
export function calculateStepUpSipFutureValue(
  initialMonthlyAmount: number,
  stepUpPercent: number,
  annualReturnPercent: number,
  years: number
): SipResult {
  const months = Math.round(years * 12);
  const r = annualReturnPercent / 12 / 100;
  let balance = 0;
  let totalInvested = 0;
  let currentAmount = initialMonthlyAmount;

  for (let m = 0; m < months; m++) {
    if (m > 0 && m % 12 === 0) {
      currentAmount *= 1 + stepUpPercent / 100;
    }
    balance = (balance + currentAmount) * (1 + r);
    totalInvested += currentAmount;
  }

  return { futureValue: balance, totalInvested, gain: balance - totalInvested };
}

export function calculateLumpsumFutureValue(principal: number, annualReturnPercent: number, years: number): SipResult {
  const futureValue = principal * Math.pow(1 + annualReturnPercent / 100, years);
  return { futureValue, totalInvested: principal, gain: futureValue - principal };
}

// ---------------------------------------------------------------------------
// SWP (Systematic Withdrawal Plan)
// ---------------------------------------------------------------------------

export interface SwpResult {
  finalBalance: number;
  totalWithdrawn: number;
  depleted: boolean;
  depletedAtMonth: number | null;
}

export function calculateSwp(corpus: number, annualReturnPercent: number, monthlyWithdrawal: number, years: number): SwpResult {
  const months = Math.round(years * 12);
  const r = annualReturnPercent / 12 / 100;
  let balance = corpus;
  let totalWithdrawn = 0;
  let depletedAtMonth: number | null = null;

  for (let m = 1; m <= months; m++) {
    balance = balance * (1 + r) - monthlyWithdrawal;
    totalWithdrawn += monthlyWithdrawal;
    if (balance <= 0) {
      depletedAtMonth = m;
      balance = 0;
      break;
    }
  }

  return { finalBalance: balance, totalWithdrawn, depleted: depletedAtMonth !== null, depletedAtMonth };
}

// ---------------------------------------------------------------------------
// CAGR / ROI
// ---------------------------------------------------------------------------

export function calculateCagr(initialValue: number, finalValue: number, years: number): number {
  if (initialValue <= 0 || years <= 0) return 0;
  return (Math.pow(finalValue / initialValue, 1 / years) - 1) * 100;
}

export interface RoiResult {
  roiPercent: number;
  gain: number;
  annualizedPercent: number | null;
}

export function calculateRoi(initialValue: number, finalValue: number, years?: number): RoiResult {
  const gain = finalValue - initialValue;
  const roiPercent = initialValue > 0 ? (gain / initialValue) * 100 : 0;
  const annualizedPercent = years && years > 0 ? calculateCagr(initialValue, finalValue, years) : null;
  return { roiPercent, gain, annualizedPercent };
}

// ---------------------------------------------------------------------------
// IRR / XIRR (solved via bisection on NPV = 0)
// ---------------------------------------------------------------------------

/** Regular periodic cash flows (e.g. one per year), cashFlows[0] is typically negative (the outlay). */
export function calculateIrr(cashFlows: number[]): number | null {
  const npv = (rate: number) => cashFlows.reduce((sum, cf, i) => sum + cf / Math.pow(1 + rate, i), 0);

  let low = -0.99;
  let high = 10;
  if (npv(low) * npv(high) > 0) return null;

  for (let i = 0; i < 100; i++) {
    const mid = (low + high) / 2;
    const value = npv(mid);
    if (Math.abs(value) < 1e-6) return mid * 100;
    if (npv(low) * value < 0) high = mid;
    else low = mid;
  }
  return ((low + high) / 2) * 100;
}

export interface DatedCashFlow {
  date: string;
  amount: number;
}

/** Irregular-interval cash flows, each with its own date. */
export function calculateXirr(cashFlows: DatedCashFlow[]): number | null {
  if (cashFlows.length < 2) return null;
  const sorted = [...cashFlows].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const t0 = new Date(sorted[0].date).getTime();
  const years = sorted.map((cf) => (new Date(cf.date).getTime() - t0) / (1000 * 60 * 60 * 24 * 365));

  const npv = (rate: number) => sorted.reduce((sum, cf, i) => sum + cf.amount / Math.pow(1 + rate, years[i]), 0);

  let low = -0.99;
  let high = 10;
  if (npv(low) * npv(high) > 0) return null;

  for (let i = 0; i < 100; i++) {
    const mid = (low + high) / 2;
    const value = npv(mid);
    if (Math.abs(value) < 1e-6) return mid * 100;
    if (npv(low) * value < 0) high = mid;
    else low = mid;
  }
  return ((low + high) / 2) * 100;
}

// ---------------------------------------------------------------------------
// Mutual fund returns / stock average price
// ---------------------------------------------------------------------------

export interface MutualFundReturnResult {
  investedValue: number;
  currentValue: number;
  absoluteGain: number;
  absoluteReturnPercent: number;
  annualizedReturnPercent: number | null;
}

export function calculateMutualFundReturns(units: number, purchaseNav: number, currentNav: number, years?: number): MutualFundReturnResult {
  const investedValue = units * purchaseNav;
  const currentValue = units * currentNav;
  const absoluteGain = currentValue - investedValue;
  const absoluteReturnPercent = investedValue > 0 ? (absoluteGain / investedValue) * 100 : 0;
  const annualizedReturnPercent = years && years > 0 ? calculateCagr(investedValue, currentValue, years) : null;
  return { investedValue, currentValue, absoluteGain, absoluteReturnPercent, annualizedReturnPercent };
}

export interface StockLot {
  quantity: number;
  price: number;
}

export interface StockAverageResult {
  totalQuantity: number;
  totalInvested: number;
  averagePrice: number;
  currentValue: number | null;
  profitOrLoss: number | null;
  profitOrLossPercent: number | null;
}

export function calculateStockAverage(lots: StockLot[], currentPrice?: number): StockAverageResult {
  const totalQuantity = lots.reduce((sum, lot) => sum + lot.quantity, 0);
  const totalInvested = lots.reduce((sum, lot) => sum + lot.quantity * lot.price, 0);
  const averagePrice = totalQuantity > 0 ? totalInvested / totalQuantity : 0;

  if (currentPrice === undefined || totalQuantity === 0) {
    return { totalQuantity, totalInvested, averagePrice, currentValue: null, profitOrLoss: null, profitOrLossPercent: null };
  }

  const currentValue = totalQuantity * currentPrice;
  const profitOrLoss = currentValue - totalInvested;
  const profitOrLossPercent = totalInvested > 0 ? (profitOrLoss / totalInvested) * 100 : 0;
  return { totalQuantity, totalInvested, averagePrice, currentValue, profitOrLoss, profitOrLossPercent };
}
