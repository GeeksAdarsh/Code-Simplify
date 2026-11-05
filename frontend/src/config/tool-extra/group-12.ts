import type { ToolExtraContent } from "./types";

export const group12: Record<string, ToolExtraContent> = {
  "currency-calculators/gold-price-calculator": {
    about: [
      "A gold price calculator works out what a piece of gold is worth from today's gold rate, its purity and its weight. It is useful before buying jewellery, selling old gold, or checking a jeweller's bill, because it shows the metal value separately from making charges.",
      "Type the 24K rate per gram you were quoted, pick the purity (24K, 22K, 18K or 14K), and enter the quantity in grams, 10 grams, troy ounces or tolas. The calculator does not fetch live rates, so the result is only as current as the rate you enter. The making charges slider (0\u201330%) adds a percentage on top of the gold value.",
      "Value = 24K rate per gram \u00D7 weight in grams \u00D7 purity factor, where the factors are 0.916 for 22K, 0.75 for 18K and 0.585 for 14K. At \u20B96,500 per gram, 10 g of 22K gold is 6,500 \u00D7 10 \u00D7 0.916 = \u20B959,540. GST is not added, so a jeweller's final bill will be higher. Everything is calculated in your browser.",
    ],
    faq: [
      {
        question: "How do I calculate the 22 carat gold rate from the 24 carat rate?",
        answer: "Multiply the 24K rate by 0.916, since 22K gold is 91.6% pure. For example, \u20B96,500 \u00D7 0.916 = \u20B95,954 per gram. Jewellers sometimes publish their own 22K rate, which can differ slightly from this calculation.",
      },
      {
        question: "How do I enter making charges that are quoted per gram?",
        answer: "The slider takes a percentage, so convert first: per-gram charge \u00D7 weight \u00F7 gold value \u00D7 100. A charge of \u20B9500 per gram on 10 g of 22K gold worth \u20B959,540 is 5,000 \u00F7 59,540 \u00D7 100, or about 8.4%.",
      },
      {
        question: "How much is 1 tola of 22K gold worth?",
        answer: "The calculator treats 1 tola as 11.6638 grams. At a 24K rate of \u20B96,500 per gram, 1 tola of 22K gold is 6,500 \u00D7 11.6638 \u00D7 0.916, which is about \u20B969,446. Select Tola as the unit and 22K as the purity to get this directly.",
      },
    ],
  },

  "currency-calculators/silver-price-calculator": {
    about: [
      "A silver price calculator tells you what a quantity of silver is worth at a given rate, whether it is a coin, a bar, utensils or jewellery. It saves you from converting between grams, kilograms and troy ounces by hand when comparing quotes from different sellers.",
      "Enter the silver rate per gram you were quoted, choose the unit (gram, 10 grams, kilogram or troy ounce) and type the quantity. The calculator shows the weight in grams, the silver value, and a total that includes the making charges percentage you set on the slider (0\u201330%). It does not fetch live prices, so use today's rate from your jeweller or bank.",
      "Value = rate per gram \u00D7 weight in grams. At \u20B985 per gram, 1 kg is 85 \u00D7 1,000 = \u20B985,000, and 8% making charges bring the total to \u20B991,800. There is no purity selector, so the rate you enter should match the purity of the item. The calculation runs entirely in your browser.",
    ],
    faq: [
      {
        question: "How do I calculate the price of 1 kg of silver?",
        answer: "Multiply the per-gram rate by 1,000, or select Kilogram as the unit and enter 1. At \u20B985 per gram, 1 kg of silver is \u20B985,000 before making charges and GST.",
      },
      {
        question: "How do I value sterling silver (92.5%) jewellery?",
        answer: "The calculator assumes the rate you enter is for the silver you are valuing. If you only have the fine silver rate, multiply it by 0.925 first: \u20B985 \u00D7 0.925 = about \u20B978.63 per gram. Enter that as the rate to get the metal value of a sterling silver item.",
      },
    ],
  },

  "business-calculators/gst-invoice-generator": {
    about: [
      "A GST invoice generator builds a simple tax invoice preview with the GST worked out for you. It shows the subtotal, the tax split into CGST and SGST or charged as IGST, and the total, which is what small businesses, freelancers and shopkeepers usually need for a quick bill or quotation.",
      "Enter your business name, the client name and an invoice number, then add line items with a description, quantity and unit price. Pick a GST rate from the dropdown (0, 3, 5, 12, 18 or 28%); one rate applies to every line. Tick Inter-state supply to charge IGST instead of CGST and SGST.",
      "Two items at \u20B91,500 and one at \u20B92,000 give a subtotal of \u20B95,000. At 18% intra-state, that is CGST 9% (\u20B9450) plus SGST 9% (\u20B9450), for a total of \u20B95,900. GST slabs are revised from time to time, so verify the current rate for your goods or service. The invoice is built in your browser and is not saved.",
    ],
    faq: [
      {
        question: "How do I calculate CGST and SGST on an invoice?",
        answer: "Apply the full GST rate to the taxable value, then split the tax equally. On \u20B910,000 at 18%, the GST is \u20B91,800, so CGST is \u20B9900 (9%) and SGST is \u20B9900 (9%). For an inter-state sale, the same \u20B91,800 is charged as IGST.",
      },
      {
        question: "Can I use different GST rates for different items?",
        answer: "No. The generator applies one GST rate to all line items. If an invoice mixes items at different rates, calculate each group separately or use accounting software that supports per-item tax rates.",
      },
      {
        question: "Does the generator add GSTIN, HSN codes or a PDF download?",
        answer: "No. It has fields only for business name, client name, invoice number and line items, and shows an on-screen preview. A full tax invoice usually needs details such as GSTIN, HSN or SAC codes and place of supply, so use it for checking amounts rather than as a filed document.",
      },
    ],
  },

  "business-calculators/profit-margin-calculator": {
    about: [
      "A profit margin calculator shows how much you earn on a sale and expresses it two ways: margin, which is profit as a share of the selling price, and markup, which is profit as a share of the cost. Shop owners, resellers and freelancers use it to check whether a price covers their costs with enough left over.",
      "Enter the cost price and the selling price. The calculator shows the profit amount, the margin percentage and the markup percentage together, so you can quote either figure. Try different selling prices to see how a small price change affects the margin, or enter a supplier's new cost to see how much of your margin a price rise would take.",
      "Margin = (selling price \u2212 cost) \u00F7 selling price \u00D7 100, and markup = (selling price \u2212 cost) \u00F7 cost \u00D7 100. Buying at \u20B9500 and selling at \u20B9750 gives \u20B9250 profit, a 33.33% margin and a 50% markup. A common mistake is pricing at a 30% markup when you wanted a 30% margin. Results are calculated in your browser.",
    ],
    faq: [
      {
        question: "How do I calculate the selling price for a target margin?",
        answer: "Divide the cost by (1 \u2212 target margin). For a 40% margin on a \u20B9500 cost, the price is 500 \u00F7 0.6 = \u20B9833.33. Enter that selling price here to confirm the margin shows 40%.",
      },
      {
        question: "How do I convert markup to margin?",
        answer: "Margin = markup \u00F7 (1 + markup). A 50% markup equals a 33.33% margin, and a 100% markup equals a 50% margin. Margin is always lower than markup for the same profit.",
      },
      {
        question: "Why does the calculator show a negative margin?",
        answer: "A negative profit and margin mean the selling price is lower than the cost price, so you lose money on each sale. Raise the selling price above the cost to get back to a positive margin.",
      },
    ],
  },

  "business-calculators/break-even-calculator": {
    about: [
      "A break-even calculator tells you how many units you need to sell, and how much revenue that represents, before a product or business stops losing money. It is used when launching a product, setting prices, or checking whether a new shop or service can cover its rent and salaries.",
      "Enter your total fixed costs, the variable cost per unit and the selling price per unit. The calculator shows the contribution margin per unit, the break-even units rounded up to the next whole unit, and the break-even revenue. If the price does not exceed the variable cost, the units show as infinite.",
      "Break-even units = fixed costs \u00F7 (price \u2212 variable cost). With \u20B950,000 fixed costs, a \u20B9100 variable cost and a \u20B9250 price, each unit contributes \u20B9150, so you need 333.3 units, shown as 334. Break-even revenue is based on the unrounded figure, about \u20B983,333. Make sure fixed costs cover the same period as your sales. It runs in your browser.",
    ],
    faq: [
      {
        question: "How do I calculate the units needed for a target profit?",
        answer: "Add the target profit to your fixed costs and divide by the contribution margin. To earn \u20B930,000 with \u20B950,000 fixed costs and a \u20B9150 margin per unit, you need (50,000 + 30,000) \u00F7 150 = 533.3, so 534 units. You can do this here by entering \u20B980,000 as the fixed costs.",
      },
      {
        question: "How do I work out how long it will take to break even?",
        answer: "Divide the break-even units by the number of units you expect to sell per period. If you need 334 units and sell about 100 a month, you will break even in a little under 3.5 months, assuming the fixed costs you entered are for that whole period.",
      },
    ],
  },

  "business-calculators/discount-calculator": {
    about: [
      "A discount calculator works out the sale price and how much you save when a percentage is taken off, or works backwards to find the original price from a discounted one. Shoppers use it during sales, and sellers use it to check offer prices before printing tags.",
      "Choose Find discounted price to enter the original price and get the amount saved and the final price. Choose Find original price to enter the price you paid and get the price before the discount. The discount slider goes from 0 to 90% in whole-number steps.",
      "Final price = original \u00D7 (1 \u2212 discount \u00F7 100). At 20% off \u20B92,000 you save \u20B9400 and pay \u20B91,600. To reverse it, \u20B91,600 \u00F7 0.8 = \u20B92,000. A common mistake is adding 20% back to \u20B91,600, which gives \u20B91,920 instead of the real original price. All calculations run in your browser.",
    ],
    faq: [
      {
        question: "How do I calculate the discount percentage from two prices?",
        answer: "Subtract the sale price from the original price, divide by the original price and multiply by 100. An item marked down from \u20B92,499 to \u20B91,749 has a discount of 750 \u00F7 2,499 \u00D7 100, which is about 30%.",
      },
      {
        question: "How much is 15% off \u20B91,200?",
        answer: "15% of \u20B91,200 is \u20B9180, so the final price is \u20B91,020. In the calculator, enter 1,200 as the original price and set the slider to 15%.",
      },
    ],
  },

  "business-calculators/commission-calculator": {
    about: [
      "A commission calculator shows how much a salesperson, broker or agent earns on a sale at a percentage rate, and how much is left for the seller after the commission is paid. It suits property brokerage, insurance and sales incentives, marketplace fees and affiliate payouts.",
      "Enter the sale amount and set the commission rate on the slider, which runs from 0 to 50% in steps of 0.5%. The calculator shows the commission earned and the net amount after commission. It models a single flat rate, so tiered plans need to be worked out one slab at a time.",
      "Commission = sale amount \u00D7 rate \u00F7 100. A \u20B91,00,000 sale at 5% earns \u20B95,000, leaving \u20B995,000 net. Check whether your rate applies to the price before or after GST, because that changes the base amount. This is an estimate, not tax advice, and it runs in your browser.",
    ],
    faq: [
      {
        question: "How do I calculate a tiered commission?",
        answer: "Calculate each slab separately and add the results. If the plan pays 5% on the first \u20B91,00,000 and 8% above that, a \u20B91,50,000 sale earns \u20B95,000 + \u20B94,000 = \u20B99,000. You can run each slab through this calculator in turn.",
      },
      {
        question: "Can I enter a rate like 2.25%?",
        answer: "No. The slider moves in steps of 0.5%, so it accepts 2% or 2.5% but not 2.25%. For an exact odd rate, multiply the sale amount by the rate and divide by 100 by hand.",
      },
    ],
  },

  "business-calculators/vat-calculator": {
    about: [
      "A VAT calculator adds value added tax to a net price or removes it from a gross price, showing the net amount, the VAT and the gross total. It helps businesses preparing invoices, travellers checking receipts abroad, and anyone comparing prices quoted with and without tax.",
      "Enter the amount and set the VAT rate on the slider, from 0 to 30% in steps of 0.5%; it starts at 20%. Choose Add VAT if the amount excludes tax, or Remove VAT if the amount already includes it. The same maths also works for GST or sales tax at any rate in that range.",
      "To add VAT, gross = net \u00D7 (1 + rate). \u20B91,000 at 20% becomes \u20B91,200. To remove it, net = gross \u00F7 (1 + rate), so \u20B91,200 \u00F7 1.2 = \u20B91,000 with \u20B9200 of VAT. The common mistake is taking 20% of the gross, which gives \u20B9240 instead of \u20B9200. VAT rates change, so verify the current rate. It runs in your browser.",
    ],
    faq: [
      {
        question: "What fraction of a VAT-inclusive price is VAT?",
        answer: "The VAT share of a gross price is rate \u00F7 (100 + rate). At 20%, that is 20 \u00F7 120, or one sixth (about 16.67%) of the total. At 5%, it is 5 \u00F7 105, or about 4.76%.",
      },
      {
        question: "Can I use this VAT calculator for GST or sales tax?",
        answer: "Yes. Adding or removing a percentage tax works the same way whatever it is called, so set the slider to your GST or sales tax rate. The slider goes up to 30%, so higher rates need to be worked out by hand.",
      },
    ],
  },

  "business-calculators/invoice-calculator": {
    about: [
      "An invoice calculator totals a bill with several line items, a discount and tax, so you can check an invoice or prepare a quote without a spreadsheet. It suits freelancers, consultants and small businesses in any country, because the tax is a single percentage you set.",
      "Add line items with a description, quantity and unit price; each line is multiplied out and added to the subtotal. Set the discount slider (0\u201350%, whole numbers) and the tax slider (0\u201330%, in steps of 0.5%). The calculator shows the subtotal, discount, tax and final total.",
      "The discount comes off the subtotal first, then tax is charged on the discounted amount. Three items at \u20B91,200 plus one at \u20B92,400 give \u20B96,000; 10% off leaves \u20B95,400, and 18% tax adds \u20B9972 for a total of \u20B96,372. Applying tax before the discount gives the same total only for percentage discounts. It runs in your browser.",
    ],
    faq: [
      {
        question: "How do I calculate an invoice total by hand?",
        answer: "Multiply quantity by unit price for each line and add them up for the subtotal. Subtract the discount, then multiply the result by (1 + tax rate). For example, \u20B96,000 with 10% off and 18% tax is 6,000 \u00D7 0.9 \u00D7 1.18 = \u20B96,372.",
      },
      {
        question: "Can I apply a flat discount amount instead of a percentage?",
        answer: "Not directly. Convert it to a percentage with discount \u00F7 subtotal \u00D7 100. The slider moves in whole percent, so a \u20B9500 discount on \u20B96,000 (8.33%) can only be approximated as 8%; for an exact figure, subtract the amount by hand.",
      },
    ],
  },

  "personal-finance-calculators/budget-planner": {
    about: [
      "A budget planner, or monthly budget calculator, compares your income with what you spend so you can see how much you save each month. It is a quick way to make a household budget, check a salary offer against your fixed costs, or see whether a new EMI fits.",
      "Enter your monthly income, then edit the expense categories, which start with rent, groceries, transport and entertainment. Rename them, change the amounts, add as many as you need or remove the ones you do not use. The planner shows total expenses, monthly savings and your savings rate.",
      "Savings = income \u2212 total expenses, and savings rate = savings \u00F7 income \u00D7 100. On \u20B975,000 income with \u20B960,000 of expenses, you save \u20B915,000, a 20.0% savings rate. Remember yearly bills such as insurance premiums: divide them by 12 and add them as a monthly line. Nothing is saved; the budget resets when you reload the page.",
    ],
    faq: [
      {
        question: "How do I make a monthly budget?",
        answer: "Start with your take-home pay, not your gross salary. List fixed costs first (rent, EMIs, utilities, school fees), then variable ones (groceries, fuel, eating out), using last month's bank statement for real figures. Enter them here and adjust until the savings rate reaches your target.",
      },
      {
        question: "Should I enter SIPs and EMIs as expenses?",
        answer: "Enter EMIs as expenses, since they are fixed payments you must make. For SIPs and other investments, either leave them out so the savings figure shows what is available to invest, or add them as a category if you want the savings figure to show only what is left over.",
      },
      {
        question: "Does the budget planner save my data?",
        answer: "No. The planner keeps your numbers only while the page is open and does not store them in your browser or on a server. Refreshing or leaving the page resets it, so note down your figures if you want to compare months.",
      },
    ],
  },

  "personal-finance-calculators/expense-tracker": {
    about: [
      "An expense tracker lets you log what you spend and see which categories take most of your money. This one is built for a quick breakdown of a week or month of spending, such as a trip, a festival month or a bank statement you want to sort.",
      "Add each expense with a description, a category (Food, Transport, Housing, Utilities, Entertainment, Shopping, Health or Other) and an amount. The tracker shows the total spent and a bar for each category with its amount and share of the total, sorted from the largest to the smallest.",
      "Each category's share is its total \u00F7 overall total \u00D7 100, rounded to a whole percent. If you log \u20B92,400 on food, \u20B91,800 on utilities and \u20B9800 on transport, the total is \u20B95,000, split 48%, 36% and 16%. Entries live only in the open page and reset when you leave or refresh, so finish a session in one go.",
    ],
    faq: [
      {
        question: "How do I find out where most of my money goes?",
        answer: "Go through a month of bank and UPI statements and add each payment here with a category. The breakdown sorts categories by amount, so the top bar shows your biggest spending area. Grouping many small purchases, such as food deliveries, often shows a larger total than expected.",
      },
      {
        question: "Can I add my own categories?",
        answer: "No. The tracker uses a fixed list of eight categories. Put anything that does not fit in Other and use the description field to label it, for example \"Gym membership\" or \"Gift\".",
      },
    ],
  },

  "personal-finance-calculators/net-worth-calculator": {
    about: [
      "A net worth calculator adds up everything you own and subtracts everything you owe, giving one number that shows your overall financial position. Tracking it over time is a simple way to see whether your savings and debt repayments are actually moving you forward.",
      "Enter assets such as bank balances, investments, PF, gold and property, and liabilities such as home, car and personal loans and credit card dues. Each list starts with a couple of example rows; rename them, change the amounts, add rows or remove ones you do not need. The calculator shows total assets, total liabilities and net worth.",
      "Net worth = total assets \u2212 total liabilities. With \u20B91,50,000 in the bank, \u20B94,00,000 in mutual funds and \u20B92,50,000 in PF, against a \u20B93,00,000 car loan and \u20B920,000 of card dues, net worth is \u20B98,00,000 \u2212 \u20B93,20,000 = \u20B94,80,000. Use current values, not purchase prices. Nothing is saved, and everything runs in your browser.",
    ],
    faq: [
      {
        question: "Should I include my house and car in my net worth?",
        answer: "Yes, at a realistic current resale value, along with the loans against them. Some people also work out a second figure that excludes the home they live in, because it is not easy to turn into cash; you can do this by removing that row.",
      },
      {
        question: "What value should I enter for a loan?",
        answer: "Enter the outstanding principal shown in your loan statement, not the total of the EMIs left. Remaining EMIs include future interest you have not owed yet, so using them would understate your net worth.",
      },
    ],
  },

  "personal-finance-calculators/emergency-fund-calculator": {
    about: [
      "An emergency fund calculator tells you how much money to keep aside for job loss, a medical bill or an urgent repair, based on your essential monthly expenses. It also shows how far you are from that target and how many months of saving it will take to get there.",
      "Enter your essential monthly expenses, choose how many months of cover you want on the slider (3 to 12), and enter your current emergency savings and how much you can set aside each month. The calculator shows the target fund, the shortfall and the months needed to reach the goal.",
      "Target = monthly essentials \u00D7 months of cover. With \u20B930,000 of essentials and 6 months, the target is \u20B91,80,000. If you have \u20B950,000, the shortfall is \u20B91,30,000, and at \u20B95,000 a month it takes 26 months, rounded up. Revisit the target when rent or EMIs change. It runs in your browser.",
    ],
    faq: [
      {
        question: "How long will it take to build my emergency fund?",
        answer: "Divide the shortfall by what you can save each month and round up. A \u20B91,30,000 gap at \u20B95,000 a month takes 26 months, while \u20B910,000 a month cuts it to 13. If you enter 0 as the monthly savings, the months to goal shows a dash because the target cannot be reached.",
      },
      {
        question: "Should EMIs be counted in essential expenses?",
        answer: "Yes. Loan EMIs still have to be paid if your income stops, so include them along with rent, groceries, utilities, insurance premiums and school fees. Leave out spending you could pause, such as holidays or shopping.",
      },
    ],
  },

  "personal-finance-calculators/debt-payoff-calculator": {
    about: [
      "A debt payoff calculator shows how long it will take to clear several debts, such as credit cards and personal loans, and how much interest you will pay on the way. It compares the avalanche and snowball methods so you can pick a repayment order with real numbers in front of you.",
      "Add each debt with a name, balance, annual interest rate and minimum monthly payment, then enter the extra amount you can pay each month beyond the minimums. Choose Avalanche (highest rate first) or Snowball (smallest balance first). The calculator shows the time to become debt-free, total interest and the order debts are cleared.",
      "Each month, interest is added at the annual rate \u00F7 12, minimums are paid, and the extra goes to the target debt. With the starting values, a \u20B980,000 card at 36% (\u20B94,000 minimum), a \u20B92,00,000 loan at 13% (\u20B96,000 minimum) and \u20B95,000 extra, both debts clear in 26 months with about \u20B949,301 in interest. It is an estimate and runs in your browser.",
    ],
    faq: [
      {
        question: "Why do snowball and avalanche give the same result?",
        answer: "They match when the smallest debt also has the highest interest rate, as in the starting example where the credit card is both. The two methods only differ when a small balance carries a low rate, so try your own debts to see whether the order changes.",
      },
      {
        question: "How much interest do I save by paying extra each month?",
        answer: "Run the calculation twice: once with your planned extra amount and once with the extra set to 0. The difference in total interest is your saving, and the difference in months shows how much sooner you become debt-free.",
      },
    ],
  },

  "personal-finance-calculators/credit-card-interest-calculator": {
    about: [
      "A credit card interest calculator shows how long it will take to clear a card balance with a fixed monthly payment and how much interest you will pay in total. It is most useful when you are carrying a balance and want to see what paying a little more each month would save.",
      "Enter the outstanding balance, set the annual interest rate (APR) on the slider from 12% to 48%, and enter the fixed amount you will pay each month. The calculator shows the months to pay off, total interest and total amount paid. If the payment does not cover the monthly interest, it shows a warning with the interest amount instead.",
      "Interest is charged monthly at APR \u00F7 12. A \u20B950,000 balance at 36% (3% a month) paid at \u20B93,000 a month takes 24 months and costs about \u20B920,360 in interest; paying \u20B95,000 a month clears it in 13 months for about \u20B910,338. It assumes no new spending on the card. It runs in your browser.",
    ],
    faq: [
      {
        question: "How is credit card interest calculated each month?",
        answer: "This calculator divides the APR by 12 and applies it to the balance each month, so 36% a year is 3% a month, or \u20B91,500 on a \u20B950,000 balance. Card issuers often calculate interest on daily balances and charge GST on interest and fees, so your statement may differ slightly.",
      },
      {
        question: "Does the calculator include new purchases or late fees?",
        answer: "No. It assumes you stop using the card and pay the same amount every month on time. New spending, late payment fees or a missed payment will make the real payoff take longer than the estimate.",
      },
    ],
  },

  "insurance-calculators/life-insurance-calculator": {
    about: [
      "A life insurance calculator estimates how much cover your family would need to stay financially secure if you were not there. It gives a quick starting figure before you compare term plans or speak to an advisor, using your income, your debts and any cover you already have.",
      "Enter your annual income, choose how many years of income to replace on the slider (5 to 30), and enter your outstanding loans and existing life cover. The calculator shows a single recommended life cover figure. For a version that also counts future goals and savings, use the Term Insurance Need Calculator.",
      "Cover = annual income \u00D7 years to replace + liabilities \u2212 existing cover. With the starting values, \u20B910,00,000 \u00D7 15 + \u20B915,00,000 = \u20B91.65 crore. The formula ignores inflation and your savings, so treat it as a rough guide, not insurance advice. It runs in your browser.",
    ],
    faq: [
      {
        question: "Should I include my home loan when calculating life cover?",
        answer: "Yes. Add the outstanding principal of your home loan and other debts as liabilities, so your family could clear them without selling the house. If the loan already has its own credit life policy, you can leave that loan out or count that policy as existing cover.",
      },
      {
        question: "Does the calculator account for inflation?",
        answer: "No. It multiplies today's income by the number of years without adjusting for inflation or investment returns. Choosing a few extra years of income replacement is a simple way to leave a margin.",
      },
    ],
  },

  "insurance-calculators/health-insurance-estimator": {
    about: [
      "A health insurance premium estimator gives a rough idea of what a policy might cost each year before you ask insurers for quotes. It helps you budget for a family floater or individual plan in India and see how age, family size, sum insured and city change the price.",
      "Set the age of the eldest member (1 to 80), the number of people covered (1 to 8), the sum insured (\u20B93 lakh to \u20B91 crore) and the city tier. The estimator shows one estimated annual premium. It does not ask about medical history, add-ons or a specific insurer, which all change real quotes.",
      "The estimate is \u20B9700 per lakh of cover, multiplied by an age factor (1.0 under 30, rising to 3.5 at 60 and over), a city factor and a family factor. A 28-year-old alone in a Tier 2 city with \u20B95 lakh cover comes to \u20B93,500. It is a rule-of-thumb figure, not an insurer quote or advice. It runs in your browser.",
    ],
    faq: [
      {
        question: "How does family size change the estimated premium?",
        answer: "Each extra member adds 55% of the single-person premium in this estimator. A family of three is 1 + 2 \u00D7 0.55 = 2.1 times the single premium. Real floater pricing also depends on each member's age, so get quotes for your actual family.",
      },
      {
        question: "Why is the estimate higher for metro cities?",
        answer: "Treatment in large cities usually costs more, and insurers often price policies by zone. The estimator adds 15% for Tier 1 cities and takes 10% off for Tier 3, compared with Tier 2.",
      },
    ],
  },

  "insurance-calculators/term-insurance-need-calculator": {
    about: [
      "A term insurance calculator estimates the sum assured you need so your family could cover living costs, repay loans and fund big goals if you died during the policy term. It goes beyond the usual multiple-of-income rule by counting your debts, future goals, savings and existing cover.",
      "Enter your annual income, set the years to retirement on the slider (5 to 35), and add outstanding loans, the cost of future goals such as education or marriage, existing savings and investments, and existing term cover. The calculator shows one recommended sum assured.",
      "Sum assured = income \u00D7 years to retirement + loans + goals \u2212 savings \u2212 existing cover. With the starting values, \u20B910,00,000 \u00D7 25 + \u20B920,00,000 + \u20B910,00,000 \u2212 \u20B95,00,000 = \u20B92.75 crore. Enter goals at their expected future cost, since the calculator does not add inflation. It is an estimate, not advice, and runs in your browser.",
    ],
    faq: [
      {
        question: "How long should my term insurance policy run?",
        answer: "Most people choose a term that lasts until they plan to retire or until their children are financially independent and major loans are repaid. The years-to-retirement input in this calculator should match the policy term you are considering.",
      },
      {
        question: "Should I enter my gross income or take-home pay?",
        answer: "The calculator uses whatever figure you enter. Gross income gives a larger, more conservative cover. Some planners use only the part of income your family spends, excluding your own expenses and taxes, which gives a smaller sum assured.",
      },
    ],
  },

  "real-estate-calculators/stamp-duty-calculator": {
    about: [
      "A stamp duty calculator estimates the stamp duty and registration charges you pay when buying property in India. These costs often add several lakh rupees on top of the agreed price, and banks usually do not include them in a home loan, so it helps to know them early.",
      "Enter the property value and pick a state from the dropdown, which shows the stamp duty rate the calculator uses for each option. The stamp duty rate cannot be typed in; \"Other / Custom\" uses 5%. The registration fee slider runs from 0 to 3% in steps of 0.1%, starting at 1%. Results show stamp duty, registration fee and total charges.",
      "Stamp duty = property value \u00D7 state rate, and registration fee = property value \u00D7 fee percentage. For \u20B950 lakh in Maharashtra, where the calculator uses 6%, stamp duty is \u20B93,00,000 and a 1% fee is \u20B950,000, totalling \u20B93,50,000. Rates and caps change, so verify current official figures. It runs in your browser.",
    ],
    faq: [
      {
        question: "How much stamp duty do I pay on a \u20B950 lakh flat?",
        answer: "It depends on the state. At the 6% rate the calculator uses for Maharashtra, stamp duty is \u20B93,00,000; at the 5.6% it uses for Karnataka, it is \u20B92,80,000. Check your state's registration department for the current rate and any local surcharge.",
      },
      {
        question: "Can I enter my own stamp duty rate?",
        answer: "No. The stamp duty rate comes from the state you select, and \"Other / Custom\" is fixed at 5%. Only the registration fee percentage is adjustable. If your rate differs, multiply the property value by your rate to get the stamp duty.",
      },
      {
        question: "Why might my registration fee be lower than the calculator shows?",
        answer: "Some states cap the registration fee at a fixed amount instead of charging a flat percentage on expensive properties. The calculator always applies the percentage you set, so check your state's rules and lower the slider if a cap applies.",
      },
    ],
  },

  "real-estate-calculators/rental-yield-calculator": {
    about: [
      "A rental yield calculator shows the yearly rent from a property as a percentage of its value. Investors use it to compare a flat or shop with other options such as fixed deposits, or to decide whether a property's asking price makes sense for the rent it earns.",
      "Enter the property value, the monthly rent and your annual expenses such as maintenance, property tax and insurance. The calculator multiplies the monthly rent by 12 and shows both gross yield, before expenses, and net yield, after expenses. Run it for two or three properties on your shortlist to see which one earns the most rent for its price.",
      "Gross yield = annual rent \u00F7 property value \u00D7 100, and net yield subtracts expenses from the rent first. A \u20B960 lakh flat let at \u20B925,000 a month earns \u20B93,00,000 a year, a 5% gross yield; with \u20B930,000 of expenses, net yield is 4.5%. Empty months are not included, so reduce the rent if you expect gaps between tenants. It runs in your browser.",
    ],
    faq: [
      {
        question: "How do I calculate rental yield from monthly rent?",
        answer: "Multiply the monthly rent by 12, divide by the property value and multiply by 100. A \u20B920,000 monthly rent on a \u20B950 lakh property is 2,40,000 \u00F7 50,00,000 \u00D7 100 = 4.8% gross yield.",
      },
      {
        question: "Should I use the purchase price or the current value?",
        answer: "Use the current market value to see the return you are earning on what the property is worth today, which is the fair comparison when deciding whether to hold or sell. Use the purchase price, including stamp duty and registration, to see the yield on the money you actually spent.",
      },
    ],
  },

  "real-estate-calculators/mortgage-calculator": {
    about: [
      "A mortgage calculator estimates your full monthly housing payment, not just the loan instalment. It adds principal and interest, property tax, home insurance and any HOA fee, the PITI total used in the US and similar markets to judge whether a home fits a budget.",
      "Choose a currency symbol (INR, USD, EUR or GBP), then enter the home price, down payment (0\u201390%), interest rate (1\u201315%), loan term (5\u201330 years), property tax rate, annual insurance and monthly HOA fee. The results show principal and interest, monthly tax, insurance plus HOA, and the total.",
      "Principal and interest use the standard amortisation formula on the loan after the down payment; property tax is price \u00D7 rate \u00F7 12. A $400,000 home with 20% down, 6.5% and 30 years costs about $2,023 a month, plus $367 tax at 1.1% and $125 insurance, roughly $2,514 in total. PMI is not included. It runs in your browser.",
    ],
    faq: [
      {
        question: "Does the mortgage calculator include PMI?",
        answer: "No. Private mortgage insurance, which US lenders often require when the down payment is under 20%, is not part of the calculation. If your lender quotes PMI, add the monthly amount to the HOA field to see it in the total.",
      },
      {
        question: "How much does a 15-year mortgage cost compared with a 30-year one?",
        answer: "On a $320,000 loan at 6.5%, a 15-year term costs about $2,788 a month and about $181,758 in total interest. A 30-year term lowers the payment to about $2,023 but raises total interest to about $408,142. Change the loan term slider to compare your own numbers.",
      },
    ],
  },

  "real-estate-calculators/property-roi": {
    about: [
      "A property ROI calculator estimates the total return on a real estate investment by combining rent earned while you hold it with the gain when you sell. It helps compare buying a flat to rent out with other investments over the same period.",
      "Enter the purchase price, purchase costs such as stamp duty and renovation, annual rent and expenses, appreciation rate (0\u201315% a year), holding period (1\u201330 years) and selling costs (0\u201310%). The calculator shows the projected sale value, net rental income, net profit, and total and annualised ROI. It assumes a cash purchase with no loan.",
      "Sale value = price \u00D7 (1 + appreciation)^years, less selling costs. With the starting values (\u20B950 lakh plus \u20B93 lakh costs, \u20B93 lakh rent, \u20B960,000 expenses, 6%, 10 years, 2%), the sale value is about \u20B987.75 lakh, profit about \u20B958.75 lakh, total ROI 110.85% and annualised ROI about 7.75%. Rent stays flat. It runs in your browser.",
    ],
    faq: [
      {
        question: "What is the difference between total ROI and annualised ROI?",
        answer: "Total ROI is the net profit as a percentage of the money invested over the whole holding period. Annualised ROI converts that into an equivalent yearly compound rate, so a 110.85% total return over 10 years is about 7.75% a year, which you can compare with FD or mutual fund returns.",
      },
      {
        question: "Should I include stamp duty and brokerage in purchase costs?",
        answer: "Yes. Stamp duty, registration, brokerage, legal fees and any renovation before letting are part of what you invest, and leaving them out makes the ROI look higher than it is. Use the Stamp Duty Calculator to estimate the first two.",
      },
    ],
  },

  "crypto-calculators/crypto-profit-calculator": {
    about: [
      "A crypto profit calculator works out the profit or loss on a cryptocurrency trade after exchange fees, along with the return as a percentage. It works for Bitcoin, Ethereum or any token, and shows whether a trade was worth it once the buy and sell fees are counted.",
      "Enter the quantity, the buy price and sell price per unit, and the buy and sell fees on the sliders (0\u20135% in steps of 0.05%). The calculator shows the cost basis including the buy fee, the sale proceeds after the sell fee, the net profit and the ROI. Prices are entered by you; it does not fetch live market rates.",
      "Cost basis = quantity \u00D7 buy price \u00D7 (1 + buy fee), and proceeds = quantity \u00D7 sell price \u00D7 (1 \u2212 sell fee). Buying 0.5 BTC at \u20B930,00,000 and selling at \u20B938,00,000 with 0.5% fees gives a cost of \u20B915,07,500, proceeds of \u20B918,90,500 and profit of \u20B93,83,000 (25.41%). Tax is not deducted. It runs in your browser.",
    ],
    faq: [
      {
        question: "What sell price do I need to break even on a crypto trade?",
        answer: "Break-even sell price = buy price \u00D7 (1 + buy fee) \u00F7 (1 \u2212 sell fee). With a \u20B930,00,000 buy price and 0.5% fees on both sides, you need to sell above about \u20B930,30,151 just to cover the fees.",
      },
      {
        question: "How do I calculate profit if I bought at several different prices?",
        answer: "Work out your average buy price: total amount spent divided by total quantity bought. For example, 0.2 BTC at \u20B928,00,000 and 0.3 BTC at \u20B932,00,000 cost \u20B915,20,000 for 0.5 BTC, an average of \u20B930,40,000. Enter 0.5 as the quantity and \u20B930,40,000 as the buy price.",
      },
    ],
  },

  "crypto-calculators/mining-profit-calculator": {
    about: [
      "A crypto mining profit calculator shows whether a mining rig earns more than it costs to run. It takes your expected daily coin reward and subtracts pool fees and electricity, which is usually the cost that decides whether mining pays at home in India or elsewhere.",
      "Enter the estimated coins mined per day from your pool dashboard or hardware calculator, the coin price, your rig's power draw in watts, electricity cost per kWh, and the pool fee (0\u20135%). The calculator shows daily revenue after the pool fee, daily electricity cost, daily net profit and monthly net profit based on 30 days.",
      "Daily kWh = watts \u00F7 1,000 \u00D7 24. Mining 0.0005 coins a day at \u20B935,00,000 earns \u20B91,750, or \u20B91,732.50 after a 1% fee; a 3,000 W rig at \u20B98 per kWh uses 72 kWh costing \u20B9576, leaving \u20B91,156.50 a day, about \u20B934,695 a month. Hardware cost is not included. It runs in your browser.",
    ],
    faq: [
      {
        question: "What electricity rate makes mining unprofitable?",
        answer: "Divide daily revenue after the pool fee by daily kWh. In the example above, \u20B91,732.50 \u00F7 72 kWh is about \u20B924.06 per kWh; above that rate the rig loses money. The calculator does not show this figure directly, but you can work it out from its results.",
      },
      {
        question: "How much electricity does a mining rig use in a month?",
        answer: "Multiply the power draw in kilowatts by 24 hours and 30 days. A 3,000 W rig running nonstop uses 3 \u00D7 24 \u00D7 30 = 2,160 kWh a month, so at \u20B98 per kWh that is \u20B917,280 in electricity.",
      },
    ],
  },
};
