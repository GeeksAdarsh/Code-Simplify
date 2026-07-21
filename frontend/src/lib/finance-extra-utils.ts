// ---------------------------------------------------------------------------
// Savings schemes (FD, RD, PPF, EPF, NPS, Sukanya)
// ---------------------------------------------------------------------------

export interface FdResult {
  maturityValue: number;
  totalInterest: number;
}

/** Fixed Deposit with periodic compounding (e.g. compoundingsPerYear = 4 for quarterly). */
export function calculateFd(principal: number, annualRatePercent: number, years: number, compoundingsPerYear = 4): FdResult {
  const n = compoundingsPerYear;
  const maturityValue = principal * Math.pow(1 + annualRatePercent / 100 / n, n * years);
  return { maturityValue, totalInterest: maturityValue - principal };
}

export interface RdResult {
  maturityValue: number;
  totalDeposited: number;
  totalInterest: number;
}

/** Recurring Deposit: a fixed monthly deposit compounding monthly (annuity-due convention). */
export function calculateRd(monthlyDeposit: number, annualRatePercent: number, months: number): RdResult {
  const r = annualRatePercent / 12 / 100;
  let balance = 0;
  for (let m = 0; m < months; m++) {
    balance = (balance + monthlyDeposit) * (1 + r);
  }
  const totalDeposited = monthlyDeposit * months;
  return { maturityValue: balance, totalDeposited, totalInterest: balance - totalDeposited };
}

export interface PpfResult {
  maturityValue: number;
  totalDeposited: number;
  totalInterest: number;
}

/** PPF: fixed yearly contribution at the start of each year, compounded annually, over `years` (typically 15). */
export function calculatePpf(yearlyContribution: number, annualRatePercent: number, years: number): PpfResult {
  let balance = 0;
  for (let y = 0; y < years; y++) {
    balance = (balance + yearlyContribution) * (1 + annualRatePercent / 100);
  }
  const totalDeposited = yearlyContribution * years;
  return { maturityValue: balance, totalDeposited, totalInterest: balance - totalDeposited };
}

export interface EpfResult {
  maturityValue: number;
  totalContribution: number;
  totalInterest: number;
}

/**
 * EPF: monthly employee + employer contribution (on basic salary), salary increasing by
 * `annualIncrementPercent` each year, compounded annually at `annualRatePercent`.
 */
export function calculateEpf(
  monthlyBasicSalary: number,
  employeeContributionPercent: number,
  employerContributionPercent: number,
  annualRatePercent: number,
  years: number,
  annualIncrementPercent: number,
  currentBalance = 0
): EpfResult {
  let balance = currentBalance;
  let salary = monthlyBasicSalary;
  let totalContribution = 0;
  const monthlyRate = employeeContributionPercent / 100 + employerContributionPercent / 100;

  for (let y = 0; y < years; y++) {
    const yearlyContribution = salary * monthlyRate * 12;
    balance = (balance + yearlyContribution) * (1 + annualRatePercent / 100);
    totalContribution += yearlyContribution;
    salary *= 1 + annualIncrementPercent / 100;
  }

  return { maturityValue: balance, totalContribution, totalInterest: balance - totalContribution - currentBalance };
}

export interface NpsResult {
  corpusAtRetirement: number;
  totalContribution: number;
  estimatedMonthlyPension: number;
  lumpSumAvailable: number;
}

/**
 * NPS: monthly contribution until retirement, then a portion of the corpus (annuityPortionPercent,
 * commonly at least 40%) is used to purchase an annuity at annuityRatePercent.
 */
export function calculateNps(
  monthlyContribution: number,
  annualReturnPercent: number,
  yearsToRetirement: number,
  annuityPortionPercent = 40,
  annuityRatePercent = 6
): NpsResult {
  const months = Math.round(yearsToRetirement * 12);
  const r = annualReturnPercent / 12 / 100;
  let balance = 0;
  for (let m = 0; m < months; m++) {
    balance = (balance + monthlyContribution) * (1 + r);
  }
  const totalContribution = monthlyContribution * months;
  const annuityCorpus = balance * (annuityPortionPercent / 100);
  const lumpSumAvailable = balance - annuityCorpus;
  const estimatedMonthlyPension = (annuityCorpus * (annuityRatePercent / 100)) / 12;

  return { corpusAtRetirement: balance, totalContribution, estimatedMonthlyPension, lumpSumAvailable };
}

export interface SukanyaResult {
  maturityValue: number;
  totalDeposited: number;
  totalInterest: number;
}

/** Sukanya Samriddhi Yojana: deposits for depositYears, then compounds untouched until maturityYears. */
export function calculateSukanya(
  yearlyDeposit: number,
  annualRatePercent: number,
  depositYears = 15,
  maturityYears = 21
): SukanyaResult {
  let balance = 0;
  for (let y = 0; y < depositYears; y++) {
    balance = (balance + yearlyDeposit) * (1 + annualRatePercent / 100);
  }
  for (let y = depositYears; y < maturityYears; y++) {
    balance *= 1 + annualRatePercent / 100;
  }
  const totalDeposited = yearlyDeposit * depositYears;
  return { maturityValue: balance, totalDeposited, totalInterest: balance - totalDeposited };
}

// ---------------------------------------------------------------------------
// Retirement
// ---------------------------------------------------------------------------

export interface RetirementResult {
  corpusNeeded: number;
  futureMonthlyExpense: number;
  requiredMonthlySip: number;
}

export function calculateRetirementCorpus(
  currentMonthlyExpense: number,
  currentAge: number,
  retirementAge: number,
  lifeExpectancy: number,
  inflationPercent: number,
  preRetirementReturnPercent: number,
  postRetirementReturnPercent: number
): RetirementResult {
  const yearsToRetirement = Math.max(0, retirementAge - currentAge);
  const retirementYears = Math.max(1, lifeExpectancy - retirementAge);

  const futureMonthlyExpense = currentMonthlyExpense * Math.pow(1 + inflationPercent / 100, yearsToRetirement);

  const realReturnMonthly = (postRetirementReturnPercent - inflationPercent) / 12 / 100;
  const retirementMonths = retirementYears * 12;
  const corpusNeeded =
    realReturnMonthly === 0
      ? futureMonthlyExpense * retirementMonths
      : (futureMonthlyExpense * (1 - Math.pow(1 + realReturnMonthly, -retirementMonths))) / realReturnMonthly;

  const monthlyReturn = preRetirementReturnPercent / 12 / 100;
  const months = yearsToRetirement * 12;
  const requiredMonthlySip =
    months <= 0
      ? corpusNeeded
      : monthlyReturn === 0
        ? corpusNeeded / months
        : (corpusNeeded * monthlyReturn) / ((Math.pow(1 + monthlyReturn, months) - 1) * (1 + monthlyReturn));

  return { corpusNeeded, futureMonthlyExpense, requiredMonthlySip };
}

export interface FireResult {
  fireNumber: number;
  yearsToFire: number | null;
}

export function calculateFire(
  annualExpenses: number,
  safeWithdrawalRatePercent: number,
  currentSavings: number,
  monthlySavings: number,
  expectedReturnPercent: number
): FireResult {
  const fireNumber = annualExpenses / (safeWithdrawalRatePercent / 100);
  const monthlyRate = expectedReturnPercent / 12 / 100;

  if (currentSavings >= fireNumber) return { fireNumber, yearsToFire: 0 };
  if (monthlySavings <= 0 && monthlyRate <= 0) return { fireNumber, yearsToFire: null };

  let balance = currentSavings;
  let months = 0;
  const maxMonths = 100 * 12;
  while (balance < fireNumber && months < maxMonths) {
    balance = balance * (1 + monthlyRate) + monthlySavings;
    months++;
  }
  return { fireNumber, yearsToFire: months >= maxMonths ? null : months / 12 };
}

export interface PensionResult {
  corpusAtRetirement: number;
  estimatedMonthlyPension: number;
}

export function calculatePension(
  monthlyContribution: number,
  annualReturnPercent: number,
  yearsToRetirement: number,
  payoutYears: number,
  annuityRatePercent: number
): PensionResult {
  const months = Math.round(yearsToRetirement * 12);
  const r = annualReturnPercent / 12 / 100;
  let balance = 0;
  for (let m = 0; m < months; m++) {
    balance = (balance + monthlyContribution) * (1 + r);
  }
  const payoutMonths = payoutYears * 12;
  const monthlyAnnuityRate = annuityRatePercent / 12 / 100;
  const estimatedMonthlyPension =
    monthlyAnnuityRate === 0
      ? balance / payoutMonths
      : (balance * monthlyAnnuityRate) / (1 - Math.pow(1 + monthlyAnnuityRate, -payoutMonths));

  return { corpusAtRetirement: balance, estimatedMonthlyPension };
}

export function calculateFutureValue(presentValue: number, ratePercent: number, periods: number, periodicContribution = 0): number {
  const fvOfPrincipal = presentValue * Math.pow(1 + ratePercent / 100, periods);
  const r = ratePercent / 100;
  const fvOfContributions =
    r === 0 ? periodicContribution * periods : periodicContribution * ((Math.pow(1 + r, periods) - 1) / r);
  return fvOfPrincipal + fvOfContributions;
}

export function calculatePresentValue(futureValue: number, ratePercent: number, periods: number): number {
  return futureValue / Math.pow(1 + ratePercent / 100, periods);
}

// ---------------------------------------------------------------------------
// Tax (India-oriented; slabs are illustrative and should be verified against the
// current assessment year, since tax laws change with each budget)
// ---------------------------------------------------------------------------

interface TaxSlab {
  upTo: number | null;
  rate: number;
}

const NEW_REGIME_SLABS: TaxSlab[] = [
  { upTo: 300000, rate: 0 },
  { upTo: 700000, rate: 5 },
  { upTo: 1000000, rate: 10 },
  { upTo: 1200000, rate: 15 },
  { upTo: 1500000, rate: 20 },
  { upTo: null, rate: 30 },
];

const OLD_REGIME_SLABS: TaxSlab[] = [
  { upTo: 250000, rate: 0 },
  { upTo: 500000, rate: 5 },
  { upTo: 1000000, rate: 20 },
  { upTo: null, rate: 30 },
];

function computeSlabTax(taxableIncome: number, slabs: TaxSlab[]): number {
  let tax = 0;
  let lowerBound = 0;
  for (const slab of slabs) {
    const upper = slab.upTo ?? Infinity;
    if (taxableIncome > lowerBound) {
      const amountInSlab = Math.min(taxableIncome, upper) - lowerBound;
      tax += amountInSlab * (slab.rate / 100);
    }
    lowerBound = upper;
    if (taxableIncome <= upper) break;
  }
  return tax;
}

export interface IncomeTaxResult {
  newRegimeTax: number;
  oldRegimeTax: number;
  betterRegime: "new" | "old" | "equal";
}

/** Illustrative Indian income tax estimate under both regimes, including 4% health & education cess and the sec 87A rebate. */
export function calculateIncomeTax(annualIncome: number, deductions: number, standardDeduction = 50000): IncomeTaxResult {
  const newTaxableIncome = Math.max(0, annualIncome - standardDeduction);
  let newTax = computeSlabTax(newTaxableIncome, NEW_REGIME_SLABS);
  if (newTaxableIncome <= 700000) newTax = 0;
  newTax *= 1.04;

  const oldTaxableIncome = Math.max(0, annualIncome - standardDeduction - deductions);
  let oldTax = computeSlabTax(oldTaxableIncome, OLD_REGIME_SLABS);
  if (oldTaxableIncome <= 500000) oldTax = 0;
  oldTax *= 1.04;

  const betterRegime = newTax < oldTax ? "new" : newTax > oldTax ? "old" : "equal";
  return { newRegimeTax: newTax, oldRegimeTax: oldTax, betterRegime };
}

export interface GstResult {
  baseAmount: number;
  gstAmount: number;
  totalAmount: number;
}

export function calculateGst(amount: number, ratePercent: number, isInclusive: boolean): GstResult {
  if (isInclusive) {
    const baseAmount = amount / (1 + ratePercent / 100);
    return { baseAmount, gstAmount: amount - baseAmount, totalAmount: amount };
  }
  const gstAmount = amount * (ratePercent / 100);
  return { baseAmount: amount, gstAmount, totalAmount: amount + gstAmount };
}

export function calculateHraExemption(basicSalaryAnnual: number, hraReceivedAnnual: number, rentPaidAnnual: number, isMetro: boolean): number {
  const actualHra = hraReceivedAnnual;
  const rentMinusBasic = Math.max(0, rentPaidAnnual - 0.1 * basicSalaryAnnual);
  const percentOfBasic = basicSalaryAnnual * (isMetro ? 0.5 : 0.4);
  return Math.max(0, Math.min(actualHra, rentMinusBasic, percentOfBasic));
}

export interface CapitalGainsResult {
  gain: number;
  isLongTerm: boolean;
  holdingMonths: number;
}

export function calculateCapitalGains(
  purchasePrice: number,
  salePrice: number,
  purchaseDate: string,
  saleDate: string,
  assetType: "equity" | "property" | "other"
): CapitalGainsResult {
  const gain = salePrice - purchasePrice;
  const holdingMonths = Math.max(
    0,
    (new Date(saleDate).getTime() - new Date(purchaseDate).getTime()) / (1000 * 60 * 60 * 24 * 30.44)
  );
  const longTermThresholdMonths = assetType === "equity" ? 12 : assetType === "property" ? 24 : 36;
  return { gain, isLongTerm: holdingMonths >= longTermThresholdMonths, holdingMonths };
}

export function calculateTds(amount: number, ratePercent: number): { tdsAmount: number; netPayable: number } {
  const tdsAmount = amount * (ratePercent / 100);
  return { tdsAmount, netPayable: amount - tdsAmount };
}

export interface SalaryBreakdown {
  basic: number;
  hra: number;
  otherAllowances: number;
  grossMonthly: number;
  employeePf: number;
  professionalTax: number;
  netMonthly: number;
}

export function calculateSalaryBreakdown(
  annualCtc: number,
  basicPercent: number,
  hraPercent: number,
  employeePfPercent: number,
  professionalTaxMonthly: number
): SalaryBreakdown {
  const monthlyCtc = annualCtc / 12;
  const basic = monthlyCtc * (basicPercent / 100);
  const hra = basic * (hraPercent / 100);
  const employeePf = basic * (employeePfPercent / 100);
  const otherAllowances = Math.max(0, monthlyCtc - basic - hra - employeePf);
  const grossMonthly = basic + hra + otherAllowances;
  const netMonthly = grossMonthly - employeePf - professionalTaxMonthly;
  return { basic, hra, otherAllowances, grossMonthly, employeePf, professionalTax: professionalTaxMonthly, netMonthly };
}

export interface TakeHomeResult {
  grossMonthly: number;
  monthlyPf: number;
  monthlyProfessionalTax: number;
  monthlyIncomeTax: number;
  netMonthly: number;
  annualNetTakeHome: number;
}

export function calculateTakeHomeSalary(
  annualCtc: number,
  employeePfPercent: number,
  professionalTaxMonthly: number,
  basicPercent: number,
  useNewRegime: boolean
): TakeHomeResult {
  const basic = annualCtc * (basicPercent / 100);
  const employeePfAnnual = basic * (employeePfPercent / 100);
  const { newRegimeTax, oldRegimeTax } = calculateIncomeTax(annualCtc - employeePfAnnual, 0);
  const incomeTaxAnnual = useNewRegime ? newRegimeTax : oldRegimeTax;

  const grossMonthly = annualCtc / 12;
  const monthlyPf = employeePfAnnual / 12;
  const monthlyIncomeTax = incomeTaxAnnual / 12;
  const netMonthly = grossMonthly - monthlyPf - professionalTaxMonthly - monthlyIncomeTax;

  return {
    grossMonthly,
    monthlyPf,
    monthlyProfessionalTax: professionalTaxMonthly,
    monthlyIncomeTax,
    netMonthly,
    annualNetTakeHome: netMonthly * 12,
  };
}

// ---------------------------------------------------------------------------
// Precious metals
// ---------------------------------------------------------------------------

export const GOLD_PURITY_FACTORS: Record<string, number> = {
  "24K (999)": 1,
  "22K (916)": 0.916,
  "18K (750)": 0.75,
  "14K (585)": 0.585,
};

export function calculateMetalValue(ratePerGram: number, weightGrams: number, purityFactor = 1): number {
  return ratePerGram * weightGrams * purityFactor;
}

// ---------------------------------------------------------------------------
// Business
// ---------------------------------------------------------------------------

export interface ProfitMarginResult {
  profit: number;
  marginPercent: number;
  markupPercent: number;
}

export function calculateProfitMargin(costPrice: number, sellingPrice: number): ProfitMarginResult {
  const profit = sellingPrice - costPrice;
  const marginPercent = sellingPrice > 0 ? (profit / sellingPrice) * 100 : 0;
  const markupPercent = costPrice > 0 ? (profit / costPrice) * 100 : 0;
  return { profit, marginPercent, markupPercent };
}

export interface BreakEvenResult {
  breakEvenUnits: number;
  breakEvenRevenue: number;
  contributionMarginPerUnit: number;
}

export function calculateBreakEven(fixedCosts: number, variableCostPerUnit: number, pricePerUnit: number): BreakEvenResult {
  const contributionMarginPerUnit = pricePerUnit - variableCostPerUnit;
  const breakEvenUnits = contributionMarginPerUnit > 0 ? fixedCosts / contributionMarginPerUnit : Infinity;
  return { breakEvenUnits, breakEvenRevenue: breakEvenUnits * pricePerUnit, contributionMarginPerUnit };
}

export interface DiscountResult {
  discountAmount: number;
  finalPrice: number;
}

export function calculateDiscount(originalPrice: number, discountPercent: number): DiscountResult {
  const discountAmount = originalPrice * (discountPercent / 100);
  return { discountAmount, finalPrice: originalPrice - discountAmount };
}

export function calculateOriginalPriceFromDiscount(finalPrice: number, discountPercent: number): number {
  return discountPercent >= 100 ? 0 : finalPrice / (1 - discountPercent / 100);
}

export function calculateCommission(saleAmount: number, commissionPercent: number): { commission: number; netAmount: number } {
  const commission = saleAmount * (commissionPercent / 100);
  return { commission, netAmount: saleAmount - commission };
}

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface InvoiceResult {
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  total: number;
}

export function calculateInvoice(items: InvoiceLineItem[], taxPercent: number, discountPercent = 0): InvoiceResult {
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const discountAmount = subtotal * (discountPercent / 100);
  const taxableAmount = subtotal - discountAmount;
  const taxAmount = taxableAmount * (taxPercent / 100);
  return { subtotal, taxAmount, discountAmount, total: taxableAmount + taxAmount };
}

// ---------------------------------------------------------------------------
// Personal finance
// ---------------------------------------------------------------------------

export interface BudgetCategory {
  name: string;
  amount: number;
}

export interface BudgetResult {
  totalExpenses: number;
  savings: number;
  savingsRatePercent: number;
}

export function calculateBudget(monthlyIncome: number, expenses: BudgetCategory[]): BudgetResult {
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const savings = monthlyIncome - totalExpenses;
  const savingsRatePercent = monthlyIncome > 0 ? (savings / monthlyIncome) * 100 : 0;
  return { totalExpenses, savings, savingsRatePercent };
}

export interface NetWorthItem {
  name: string;
  amount: number;
}

export function calculateNetWorth(assets: NetWorthItem[], liabilities: NetWorthItem[]): { totalAssets: number; totalLiabilities: number; netWorth: number } {
  const totalAssets = assets.reduce((sum, a) => sum + a.amount, 0);
  const totalLiabilities = liabilities.reduce((sum, l) => sum + l.amount, 0);
  return { totalAssets, totalLiabilities, netWorth: totalAssets - totalLiabilities };
}

export function calculateEmergencyFund(
  monthlyEssentialExpenses: number,
  monthsOfCoverage: number,
  currentSavings: number,
  monthlySavingsCapacity: number
): { targetAmount: number; shortfall: number; monthsToGoal: number | null } {
  const targetAmount = monthlyEssentialExpenses * monthsOfCoverage;
  const shortfall = Math.max(0, targetAmount - currentSavings);
  const monthsToGoal = monthlySavingsCapacity > 0 ? Math.ceil(shortfall / monthlySavingsCapacity) : shortfall > 0 ? null : 0;
  return { targetAmount, shortfall, monthsToGoal };
}

export interface Debt {
  name: string;
  balance: number;
  annualRatePercent: number;
  minPayment: number;
}

export interface DebtPayoffResult {
  order: string[];
  totalMonths: number;
  totalInterestPaid: number;
}

/** Simulates paying off multiple debts with a fixed extra monthly budget, using snowball (smallest balance first) or avalanche (highest rate first). */
export function calculateDebtPayoff(debts: Debt[], extraMonthlyBudget: number, method: "snowball" | "avalanche"): DebtPayoffResult {
  const remaining = debts.map((d) => ({ ...d }));
  const order: string[] = [];
  let totalInterestPaid = 0;
  let months = 0;
  const maxMonths = 100 * 12;

  while (remaining.some((d) => d.balance > 0.01) && months < maxMonths) {
    months++;
    let freedUpBudget = extraMonthlyBudget;

    for (const debt of remaining) {
      if (debt.balance <= 0) continue;
      const monthlyRate = debt.annualRatePercent / 12 / 100;
      const interest = debt.balance * monthlyRate;
      totalInterestPaid += interest;
      debt.balance += interest;
      const payment = Math.min(debt.balance, debt.minPayment);
      debt.balance -= payment;
    }

    const active = remaining
      .filter((d) => d.balance > 0.01)
      .sort((a, b) => (method === "snowball" ? a.balance - b.balance : b.annualRatePercent - a.annualRatePercent));

    for (const debt of active) {
      if (freedUpBudget <= 0) break;
      const extra = Math.min(freedUpBudget, debt.balance);
      debt.balance -= extra;
      freedUpBudget -= extra;
      if (debt.balance <= 0.01 && !order.includes(debt.name)) order.push(debt.name);
    }
  }

  for (const debt of remaining) {
    if (debt.balance <= 0.01 && !order.includes(debt.name)) order.push(debt.name);
  }

  return { order, totalMonths: months, totalInterestPaid };
}

export interface CreditCardPayoffResult {
  months: number | null;
  totalInterestPaid: number;
  totalPaid: number;
}

export function calculateCreditCardPayoff(balance: number, annualRatePercent: number, monthlyPayment: number): CreditCardPayoffResult {
  const monthlyRate = annualRatePercent / 12 / 100;
  let remaining = balance;
  let totalInterestPaid = 0;
  let months = 0;
  const maxMonths = 100 * 12;

  if (monthlyPayment <= remaining * monthlyRate) {
    return { months: null, totalInterestPaid: 0, totalPaid: 0 };
  }

  while (remaining > 0.01 && months < maxMonths) {
    const interest = remaining * monthlyRate;
    totalInterestPaid += interest;
    remaining += interest;
    const payment = Math.min(monthlyPayment, remaining);
    remaining -= payment;
    months++;
  }

  return { months, totalInterestPaid, totalPaid: balance + totalInterestPaid };
}

// ---------------------------------------------------------------------------
// Insurance
// ---------------------------------------------------------------------------

export function calculateLifeInsuranceNeed(
  annualIncome: number,
  yearsToReplace: number,
  outstandingLiabilities: number,
  existingCover: number
): number {
  return Math.max(0, annualIncome * yearsToReplace + outstandingLiabilities - existingCover);
}

export function calculateTermInsuranceNeed(
  annualIncome: number,
  yearsToRetirement: number,
  outstandingLoans: number,
  futureGoalsCost: number,
  existingSavings: number,
  existingCover: number
): number {
  const incomeReplacement = annualIncome * yearsToRetirement;
  return Math.max(0, incomeReplacement + outstandingLoans + futureGoalsCost - existingSavings - existingCover);
}

/** Rough heuristic premium estimate, not a real insurer quote. */
export function estimateHealthInsurancePremium(age: number, familySize: number, sumInsuredLakhs: number, cityTier: 1 | 2 | 3): number {
  const ageFactor = age < 30 ? 1 : age < 40 ? 1.3 : age < 50 ? 1.8 : age < 60 ? 2.6 : 3.5;
  const cityFactor = cityTier === 1 ? 1.15 : cityTier === 2 ? 1 : 0.9;
  const basePremiumPerLakh = 700;
  const familyFactor = 1 + (familySize - 1) * 0.55;
  return Math.round(basePremiumPerLakh * sumInsuredLakhs * ageFactor * cityFactor * familyFactor);
}

// ---------------------------------------------------------------------------
// Real estate
// ---------------------------------------------------------------------------

export const STAMP_DUTY_RATES_BY_STATE: Record<string, number> = {
  Maharashtra: 6,
  Karnataka: 5.6,
  "Delhi (Male owner)": 6,
  "Delhi (Female owner)": 4,
  "Tamil Nadu": 7,
  "Uttar Pradesh": 7,
  Gujarat: 4.9,
  "West Bengal": 7,
  Telangana: 5.5,
  Rajasthan: 6,
  "Other / Custom": 5,
};

export function calculateStampDuty(propertyValue: number, ratePercent: number, registrationFeePercent = 1): { stampDuty: number; registrationFee: number; total: number } {
  const stampDuty = propertyValue * (ratePercent / 100);
  const registrationFee = propertyValue * (registrationFeePercent / 100);
  return { stampDuty, registrationFee, total: stampDuty + registrationFee };
}

export function calculateRentalYield(propertyValue: number, annualRentalIncome: number, annualExpenses = 0): { grossYieldPercent: number; netYieldPercent: number } {
  const grossYieldPercent = propertyValue > 0 ? (annualRentalIncome / propertyValue) * 100 : 0;
  const netYieldPercent = propertyValue > 0 ? ((annualRentalIncome - annualExpenses) / propertyValue) * 100 : 0;
  return { grossYieldPercent, netYieldPercent };
}

export interface MortgagePitiResult {
  principalAndInterest: number;
  monthlyTax: number;
  monthlyInsurance: number;
  monthlyHoa: number;
  totalMonthlyPayment: number;
}

export function calculateMortgagePiti(
  principalAndInterestMonthly: number,
  homePrice: number,
  annualPropertyTaxPercent: number,
  annualInsurance: number,
  monthlyHoa: number
): MortgagePitiResult {
  const monthlyTax = (homePrice * (annualPropertyTaxPercent / 100)) / 12;
  const monthlyInsurance = annualInsurance / 12;
  return {
    principalAndInterest: principalAndInterestMonthly,
    monthlyTax,
    monthlyInsurance,
    monthlyHoa,
    totalMonthlyPayment: principalAndInterestMonthly + monthlyTax + monthlyInsurance + monthlyHoa,
  };
}

export interface PropertyRoiResult {
  totalRentalIncome: number;
  totalExpenses: number;
  saleValue: number;
  netProfit: number;
  totalRoiPercent: number;
  annualizedRoiPercent: number;
}

export function calculatePropertyRoi(
  purchasePrice: number,
  purchaseCosts: number,
  annualRentalIncome: number,
  annualExpenses: number,
  appreciationPercent: number,
  holdingYears: number,
  sellingCostsPercent: number
): PropertyRoiResult {
  const totalInvestment = purchasePrice + purchaseCosts;
  const totalRentalIncome = annualRentalIncome * holdingYears;
  const totalExpenses = annualExpenses * holdingYears;
  const grossSaleValue = purchasePrice * Math.pow(1 + appreciationPercent / 100, holdingYears);
  const sellingCosts = grossSaleValue * (sellingCostsPercent / 100);
  const saleValue = grossSaleValue - sellingCosts;

  const netProfit = saleValue - totalInvestment + totalRentalIncome - totalExpenses;
  const totalRoiPercent = totalInvestment > 0 ? (netProfit / totalInvestment) * 100 : 0;
  const annualizedRoiPercent = holdingYears > 0 ? (Math.pow(1 + totalRoiPercent / 100, 1 / holdingYears) - 1) * 100 : 0;

  return { totalRentalIncome, totalExpenses, saleValue, netProfit, totalRoiPercent, annualizedRoiPercent };
}

// ---------------------------------------------------------------------------
// Crypto
// ---------------------------------------------------------------------------

export interface CryptoProfitResult {
  costBasis: number;
  saleProceeds: number;
  netProfit: number;
  roiPercent: number;
}

export function calculateCryptoProfit(
  quantity: number,
  buyPrice: number,
  sellPrice: number,
  buyFeePercent: number,
  sellFeePercent: number
): CryptoProfitResult {
  const costBasis = quantity * buyPrice * (1 + buyFeePercent / 100);
  const saleProceeds = quantity * sellPrice * (1 - sellFeePercent / 100);
  const netProfit = saleProceeds - costBasis;
  const roiPercent = costBasis > 0 ? (netProfit / costBasis) * 100 : 0;
  return { costBasis, saleProceeds, netProfit, roiPercent };
}

export interface MiningProfitResult {
  dailyRevenue: number;
  dailyElectricityCost: number;
  dailyPoolFee: number;
  dailyNetProfit: number;
  monthlyNetProfit: number;
  breakEvenElectricityCostPerKwh: number | null;
}

export function calculateMiningProfit(
  estimatedCoinsPerDay: number,
  coinPrice: number,
  powerConsumptionWatts: number,
  electricityCostPerKwh: number,
  poolFeePercent: number
): MiningProfitResult {
  const grossDailyRevenue = estimatedCoinsPerDay * coinPrice;
  const dailyPoolFee = grossDailyRevenue * (poolFeePercent / 100);
  const dailyRevenue = grossDailyRevenue - dailyPoolFee;
  const dailyKwh = (powerConsumptionWatts / 1000) * 24;
  const dailyElectricityCost = dailyKwh * electricityCostPerKwh;
  const dailyNetProfit = dailyRevenue - dailyElectricityCost;

  const breakEvenElectricityCostPerKwh = dailyKwh > 0 ? dailyRevenue / dailyKwh : null;

  return {
    dailyRevenue,
    dailyElectricityCost,
    dailyPoolFee,
    dailyNetProfit,
    monthlyNetProfit: dailyNetProfit * 30,
    breakEvenElectricityCostPerKwh,
  };
}
