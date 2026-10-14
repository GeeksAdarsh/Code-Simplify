import type { ToolExtraContent } from "./types";

export const group4: Record<string, ToolExtraContent> = {
  "json/to-php": {
    about: [
      "JSON to PHP turns a JSON document into a PHP array literal you can paste straight into a .php file. The output starts with an opening <?php tag and assigns everything to a $data variable, using short [ ] syntax, four-space indentation, and a trailing comma after every element so later edits produce clean diffs.",
      "It is handy when you want fixture data for a PHPUnit test, a seeder in a Laravel project, or a config array copied from an API response, without calling json_decode() at runtime. JSON objects become associative arrays with 'key' => value pairs, JSON arrays become numbered lists, and true, false and null map to the matching PHP keywords.",
      "Example: {\"plan\": \"pro\", \"limits\": [10, 50]} becomes $data = ['plan' => 'pro', 'limits' => [10, 50]]; spread over indented lines. If you need the data inside a function instead, rename $data or turn the assignment into a return statement.",
    ],
    faq: [
      {
        question: "Is the output the same as json_decode($json, true)?",
        answer: "Structurally, yes: both give nested associative arrays. One small difference is numbers written like 1.0, which the browser reads as the integer 1, so the generated literal says 1 where json_decode would return a float.",
      },
      {
        question: "Can I convert a PHP array back to JSON?",
        answer: "This tool only goes from JSON to PHP. Inside PHP, json_encode($data, JSON_PRETTY_PRINT) turns the array back into formatted JSON.",
      },
      {
        question: "What happens to very long numeric IDs?",
        answer: "Integers larger than 9,007,199,254,740,991 lose precision when the browser parses the JSON, so long numeric IDs can change. Keep such IDs as strings in the JSON before converting.",
      },
    ],
  },

  "json/to-xml": {
    about: [
      "This converter rewrites a JSON document as XML, adding an <?xml version=\"1.0\" encoding=\"UTF-8\"?> declaration and a single <root> element that wraps everything. Each key becomes a child element, nesting follows the JSON structure, and the result is indented with two spaces.",
      "People reach for it when a JSON-producing service has to feed an XML consumer: a SOAP endpoint, an older ERP or accounting import, a feed format, or a test that compares XML payloads. Characters such as &, < and > inside values are escaped to &amp;, &lt; and &gt;, so text like \"R&D\" will not break the document.",
      "For example, {\"order\": {\"id\": 42, \"items\": [\"pen\", \"ink\"]}} produces <order><id>42</id><items>pen</items><items>ink</items></order> inside <root>. If the receiving system expects a wrapper such as <items><item>…</item></items>, reshape the JSON first or adjust the tags after converting.",
    ],
    faq: [
      {
        question: "What is the root element called, and can I rename it?",
        answer: "The output always uses <root> as the outermost element. Rename it with a quick find-and-replace on the result if your schema expects a different name.",
      },
      {
        question: "How are null values and booleans converted to XML?",
        answer: "A null becomes an empty element such as <middleName></middleName>, and booleans and numbers are written as plain text, for example <active>true</active>. XML has no built-in data types, so the receiving system decides how to read them.",
      },
      {
        question: "Is the generated XML validated against a schema?",
        answer: "The output is well-formed XML, but it is not checked against any XSD. If your integration requires a specific schema, run the result through a schema validator before sending it.",
      },
    ],
  },

  "json/to-yaml": {
    about: [
      "JSON to YAML rewrites a JSON document in YAML's indentation-based style, with two-space indents and \"- \" in front of list items. It is built on js-yaml, a widely used YAML library, and it does not wrap long lines, so long strings such as URLs or tokens stay on one line.",
      "A common situation: an API or a script gives you JSON, but the file you are writing—a Kubernetes manifest, a GitHub Actions workflow, a Docker Compose file or an OpenAPI spec—needs to be YAML. Retyping it by hand invites indentation mistakes; converting here keeps the structure exact.",
      "Watch strings that look like other types. Values such as \"yes\", \"on\", \"true\" or \"0755\" are written in single quotes ('yes', '0755') so YAML parsers keep them as text instead of reading them as booleans or numbers. Strings containing line breaks are written as block scalars starting with |-, which keeps them readable.",
    ],
    faq: [
      {
        question: "Why are only some values quoted in the YAML output?",
        answer: "Quotes are added only where a plain value would be misread, for example the string \"123\" or \"no\". Ordinary text such as names and URLs is left unquoted, which is the usual YAML style.",
      },
      {
        question: "Can I convert the YAML back to JSON?",
        answer: "Yes. Use the YAML to JSON converter on CodeSimplify, or any YAML parser, and you get the same data back.",
      },
      {
        question: "How are empty objects and arrays written?",
        answer: "They appear in compact flow style as {} and [], which every YAML parser accepts.",
      },
    ],
  },

  "json/tree-viewer": {
    about: [
      "The JSON Tree Viewer shows a JSON document as an outline you can fold and unfold. Every object and array gets a +/− toggle, and a folded node shows a summary such as \"{ 12 keys }\" or \"[ 40 items ]\", so you can judge the size of a branch before opening it.",
      "It is most useful for large, deeply nested payloads: a GraphQL response, a Firebase export, a package-lock.json file, or a webhook body from a payment gateway such as Stripe or Razorpay. Instead of scrolling through hundreds of lines, you collapse everything and open only the path you care about.",
      "A practical routine is to paste the payload, press \"Collapse all\", then expand one level at a time until you reach the field you need. Values are colored by type and strings keep their quotes, so you can tell the string \"42\" from the number 42 at a glance—a frequent source of bugs when a backend changes a field's type.",
    ],
    faq: [
      {
        question: "What happens if my JSON is invalid?",
        answer: "The tree stays empty and an error box shows the parser's message along with the line and column, so you can find the stray comma or missing quote.",
      },
      {
        question: "Are array indexes shown in the tree?",
        answer: "Array elements are listed in order under their parent without index labels, while object entries show their key names. Count from zero when you need to reference a position in code.",
      },
      {
        question: "Can I search for a key inside the tree?",
        answer: "There is no built-in search box. Use your browser's find (Ctrl+F or Cmd+F) on the expanded nodes, or collapse unrelated branches to narrow the view.",
      },
    ],
  },

  "json/viewer": {
    about: [
      "The JSON Viewer is a read-only display: paste JSON on the left and a neatly indented, color-highlighted copy appears on the right. It also shows the size of your input in bytes, which helps when you are checking payload limits or comparing response sizes.",
      "It suits moments when you want to read data rather than change it—checking what an endpoint returned, inspecting a saved log line, or reviewing a teammate's config without any risk of editing it. Minified JSON copied from the browser's Network tab, which arrives as one long line, is expanded to two-space indentation automatically.",
      "If the right panel stays empty, the input is not valid JSON. The error box below the editors gives a line and column; the usual culprits are trailing commas, single-quoted strings and comments, none of which strict JSON allows.",
    ],
    faq: [
      {
        question: "What does the byte count above the input mean?",
        answer: "It is the UTF-8 size of the text you pasted, so characters such as ₹ or emoji count as more than one byte. That is the figure that matters for API payload limits, message queue caps or storage quotas.",
      },
      {
        question: "Does the viewer change the order of keys?",
        answer: "Keys keep their original order, with one JavaScript quirk: keys that are whole numbers, such as \"10\" or \"2\", are listed first in ascending order. Apart from that, only whitespace and indentation change.",
      },
      {
        question: "Can it open JSON with comments, like tsconfig.json?",
        answer: "No. The viewer uses strict JSON parsing, so // or /* */ comments and trailing commas, which tsconfig.json and VS Code settings files allow, cause an error. Remove them first.",
      },
    ],
  },

  "loan-calculators/bike-loan": {
    about: [
      "A bike loan, or two-wheeler loan, covers part of the price of a motorcycle or scooter and is usually repaid within one to four years. This calculator takes the bike price, subtracts the down payment you set on the slider (0–80%), and works out the EMI on the rest with the reducing-balance formula. Tenure can go up to 6 years.",
      "Example with the default values: a bike priced at ₹1,20,000 with 10% down (₹12,000) needs a loan of ₹1,08,000. At 11% a year for 3 years the EMI is about ₹3,536, and you pay about ₹19,288 in interest over the 36 months.",
      "Because the amounts are small, fees weigh more heavily than on big loans: a ₹2,000 processing fee on the loan above adds roughly 10% to its interest cost. When comparing a dealer scheme with a bank loan, look at the total you will pay, not only the EMI on the showroom board.",
    ],
    faq: [
      {
        question: "What is the minimum down payment for a two-wheeler loan?",
        answer: "Many lenders finance 85–95% of the on-road price, so a down payment of 5–15% is common. Set the slider to your lender's figure to see the exact EMI.",
      },
      {
        question: "Are zero-interest bike EMI offers really free?",
        answer: "Not always. These schemes often include a processing fee, a slightly higher price, or advance EMIs collected upfront, so compare the total amount payable with a regular loan.",
      },
      {
        question: "Can I close a bike loan early?",
        answer: "Most lenders allow foreclosure after a few EMIs, sometimes with a charge of a few percent of the outstanding amount. Your loan agreement lists the exact terms.",
      },
    ],
  },

  "loan-calculators/car-loan": {
    about: [
      "A car loan pays for part of a vehicle and is repaid in monthly EMIs, most often over one to seven years. This calculator starts from the car price, removes the down payment you choose (0–80% on the slider), and calculates the EMI on the remaining amount using the reducing-balance formula. Tenure can be set up to 10 years.",
      "Example with the defaults: a ₹10 lakh car with 10% down (₹1 lakh) leaves a loan of ₹9 lakh. At 9% for 7 years the EMI is about ₹14,480 and total interest about ₹3.16 lakh. Choosing 5 years instead raises the EMI to about ₹18,683 but cuts the interest to about ₹2.21 lakh.",
      "Enter the on-road price—ex-showroom plus registration, road tax and insurance—if your lender finances it, since that is what you actually pay. Dealer quotes may also include processing fees or bundled extras that this estimate leaves out.",
    ],
    faq: [
      {
        question: "How much down payment is needed for a car loan?",
        answer: "Many lenders finance 80–90% of the car's price, so a down payment of 10–20% is common. Some offer full funding to borrowers with strong credit, but a larger down payment lowers both the EMI and the total interest.",
      },
      {
        question: "Is a shorter or longer car loan better?",
        answer: "A car loses value quickly, so a shorter tenure often makes sense: you pay less interest and are less likely to owe more than the car is worth. A longer tenure helps mainly when the higher EMI would strain your monthly budget.",
      },
      {
        question: "Does the car loan EMI include insurance?",
        answer: "No. The result covers the loan repayment only; insurance premiums, processing fees and dealer add-ons are separate costs.",
      },
    ],
  },

  "loan-calculators/education-loan": {
    about: [
      "An education loan pays for tuition, hostel and related costs, and usually includes a moratorium: you pay nothing during the course and for a few months after it, then EMIs begin. Interest keeps building during that time, which is why the post-study EMI is higher than the original loan amount suggests.",
      "This calculator adds simple interest for the moratorium months to the principal, then applies the reducing-balance EMI formula over the repayment tenure (up to 15 years, with a moratorium of up to 48 months). Example: ₹10 lakh at 10% with a 24-month moratorium accrues 10,00,000 × (10 ÷ 12 ÷ 100) × 24 = ₹2,00,000, so repayment starts on ₹12 lakh. Over 10 years that is an EMI of about ₹15,858, compared with about ₹13,215 had no interest accrued.",
      "Some banks compound interest during the moratorium, which makes the real figure a little higher. Ask your lender how they calculate it, and whether a government interest subsidy applies to you.",
    ],
    faq: [
      {
        question: "Is education loan interest tax deductible in India?",
        answer: "Under Section 80E of the Income Tax Act, interest paid on a loan for higher studies can be deducted for up to eight years from the year repayment starts, with no upper limit on the amount. The deduction is available only under the old tax regime.",
      },
      {
        question: "What moratorium period should I enter?",
        answer: "Enter the course length plus the grace period your lender gives, usually 6 to 12 months after the course ends. For a two-year master's degree with a six-month grace period, that is 30 months.",
      },
      {
        question: "Why is my bank's education loan EMI higher than this result?",
        answer: "Your bank may compound moratorium interest monthly or quarterly instead of adding simple interest, or apply a slightly different rate. Processing fees or insurance added to the loan also raise the amount you repay.",
      },
    ],
  },

  "loan-calculators/emi-calculator": {
    about: [
      "An EMI (equated monthly instalment) is the fixed amount you pay every month until a loan is closed. This calculator uses the reducing-balance method, where each month's interest is charged only on the principal still outstanding, so the interest share of the EMI shrinks over time while the principal share grows.",
      "Worked example with the default values: ₹20,00,000 at 9.5% a year for 20 years. The monthly rate r is 9.5 ÷ 12 ÷ 100 ≈ 0.0079167 and n is 240 months, which gives an EMI of about ₹18,643. Across 240 payments you repay about ₹44.74 lakh, of which roughly ₹24.74 lakh is interest.",
      "Use it before visiting a bank to see what fits your monthly budget, and drag the tenure slider to compare options. The rate slider runs from 1% to 30%, tenure goes up to 30 years, and you can switch the currency to $, € or £. A lender's actual figure can differ slightly because of processing fees, rounding, or a floating rate that changes later.",
    ],
    faq: [
      {
        question: "How can I reduce my EMI?",
        answer: "Borrow less, negotiate a lower interest rate, or choose a longer tenure. A longer tenure lowers the EMI but raises total interest, so check the Total interest figure before deciding.",
      },
      {
        question: "Is the EMI calculated on a flat rate or reducing balance?",
        answer: "This calculator uses reducing balance, which is how most bank home, car and personal loans work. A flat-rate quote charges interest on the full original amount for the whole term, so the same headline rate costs noticeably more.",
      },
      {
        question: "Can I see how much principal and interest I pay each year?",
        answer: "Yes. The amortization schedule groups payments by year and shows principal paid, interest paid and the remaining balance at the end of each year.",
      },
    ],
  },

  "loan-calculators/home-loan": {
    about: [
      "A home loan is usually the largest and longest borrowing a household takes on, so small changes in rate or tenure add up to large sums. This calculator applies the standard reducing-balance EMI formula to your loan amount, interest rate and a tenure of up to 30 years.",
      "Example using the defaults: ₹40 lakh at 8.5% for 20 years works out to an EMI of about ₹34,713 and total interest of about ₹43.3 lakh—more than the amount borrowed. Stretching the same loan to 25 years lowers the EMI to about ₹32,209, roughly ₹2,500 less a month, but pushes total interest to about ₹56.6 lakh, around ₹13.3 lakh more.",
      "Enter the loan amount, not the property price: Indian banks typically finance 75–90% of the property value depending on the loan size, and you pay the rest as a down payment. Many home loans also carry a floating rate linked to an external benchmark such as the repo rate, so treat the result as a starting estimate rather than the bank's final figure.",
    ],
    faq: [
      {
        question: "What tenure should I choose for a home loan?",
        answer: "Pick the shortest tenure whose EMI you can still pay comfortably in a tight month. Many borrowers choose a longer tenure for flexibility and prepay whenever they can, which cuts interest without locking them into a high EMI.",
      },
      {
        question: "Does my home loan EMI change when the repo rate changes?",
        answer: "On a floating-rate loan, the lender usually responds by extending or shortening the tenure first, and sometimes by changing the EMI. Re-run the calculator with the new rate to see the effect.",
      },
      {
        question: "Can stamp duty and registration be added to the home loan?",
        answer: "Usually not; banks in India typically do not finance stamp duty and registration charges, so budget for them separately from the loan amount.",
      },
    ],
  },

  "loan-calculators/loan-affordability": {
    about: [
      "Loan affordability answers a simple question: given the EMI I am comfortable paying, how large a loan can I take? Rather than starting from a loan amount, this calculator starts from your monthly budget and works backwards with P = EMI × (1 − (1 + r)^−n) ÷ r, where r is the monthly interest rate and n is the number of months.",
      "Example with the defaults: a budget of ₹20,000 a month at 9.5% for 15 years supports a loan of about ₹19.15 lakh. Stretching to 20 years raises that only to about ₹21.46 lakh—five more years of payments for about ₹2.3 lakh of extra borrowing—which shows how quickly longer tenures run into diminishing returns.",
      "The \"Resulting EMI\" box recalculates the EMI on the affordable amount so you can confirm the two match. A common rule of thumb is to keep all EMIs together below about 40% of take-home pay, leaving room for savings and emergencies.",
    ],
    faq: [
      {
        question: "How much EMI can I afford on my salary?",
        answer: "A common guideline is to keep total EMIs within 30–40% of net monthly income. On take-home pay of ₹60,000, that means roughly ₹18,000 to ₹24,000 a month across all loans.",
      },
      {
        question: "Why doesn't doubling the tenure double the loan I can afford?",
        answer: "Interest is charged on the outstanding balance, so each extra year of EMIs goes more towards interest and less towards principal. The amount you can borrow rises with tenure, but at a slowing pace.",
      },
      {
        question: "Does the affordable amount include my down payment?",
        answer: "No. The result is the loan amount only; add your down payment to it to find the total price of the home, car or other purchase you can aim for.",
      },
    ],
  },

  "loan-calculators/loan-comparison": {
    about: [
      "Loan offers are hard to compare by headline rate alone, especially when the amounts or tenures differ. This calculator places up to four offers side by side and shows the EMI, total interest and total payment for each, putting a check mark next to the one with the lowest total repayment. You can rename each offer, for example with the bank's name, to keep track.",
      "Example with the defaults: ₹20 lakh for 20 years at 8.5% versus 9.2%. The EMIs are about ₹17,356 and ₹18,253, a gap of under ₹900 a month, yet over 240 months total interest comes to about ₹21.66 lakh against ₹23.81 lakh—roughly ₹2.15 lakh more for a rate just 0.7% higher.",
      "Processing fees and other charges are not part of the comparison, so add them to each offer's total yourself. If one lender quotes a lower rate but a much higher fee, the cheapest option can change.",
    ],
    faq: [
      {
        question: "How do I compare loans with different tenures?",
        answer: "Look at the total payment column rather than the EMI: a longer tenure lowers the EMI but usually raises the overall cost. The table shows both so you can weigh monthly comfort against total cost.",
      },
      {
        question: "Does a 0.5% difference in interest rate really matter?",
        answer: "On large, long loans, yes. On a ₹20 lakh loan over 20 years, going from 8.5% to 9% adds roughly ₹1.5 lakh in total interest, so it is worth negotiating.",
      },
      {
        question: "Can I compare a fixed-rate loan with a floating-rate loan?",
        answer: "Only approximately. Enter the floating loan at its current rate, then add another offer with a higher rate to see how the cost changes if rates rise.",
      },
    ],
  },

  "loan-calculators/loan-eligibility": {
    about: [
      "Loan eligibility is the largest amount a lender is likely to offer you based on your income and existing debts. This calculator uses FOIR: it multiplies your net monthly income by the FOIR percentage (20–70% on the slider), subtracts your current EMIs, and treats what remains as the maximum new EMI. It then converts that EMI into a loan amount for your chosen rate and tenure.",
      "Worked example: with net income of ₹80,000, FOIR of 50% and an existing car-loan EMI of ₹10,000, the room for a new EMI is 80,000 × 50% − 10,000 = ₹30,000. At 9.5% for 15 years, a ₹30,000 EMI supports a loan of about ₹28.7 lakh.",
      "Clearing a small loan before applying can raise eligibility noticeably, because every rupee of existing EMI reduces the new EMI rupee for rupee. Banks also weigh your credit score, job stability and age, so their figure may differ from this estimate.",
    ],
    faq: [
      {
        question: "How can I increase my loan eligibility?",
        answer: "Close or reduce existing loans, add an earning co-applicant, choose a longer tenure, or improve your credit score to qualify for a lower rate. Each of these raises either the EMI you can carry or the loan that EMI supports.",
      },
      {
        question: "Should I enter gross salary or net salary?",
        answer: "Enter net (take-home) monthly income, since lenders normally apply FOIR to what you actually receive after tax and deductions.",
      },
      {
        question: "Does a longer tenure increase loan eligibility?",
        answer: "Yes. The same EMI supports a larger loan when spread over more months; in the example above, ₹30,000 a month for 20 years instead of 15 supports about ₹32.2 lakh.",
      },
    ],
  },

  "loan-calculators/loan-prepayment": {
    about: [
      "Prepayment means paying an extra lump sum towards your loan principal on top of the regular EMI. Because interest is charged on the outstanding balance, every rupee repaid early stops attracting interest for all the remaining months, which is why prepayments in the first few years save the most.",
      "The calculator works month by month: it charges interest on the balance, deducts the principal part of the EMI, applies your lump sum in the month you pick, and keeps the EMI unchanged until the balance reaches zero. Example with the defaults: a ₹20 lakh loan at 9% over 20 years has an EMI of about ₹17,995. A single ₹2 lakh prepayment in month 12 closes the loan after 190 months instead of 240—50 months earlier—and saves about ₹7.08 lakh in interest.",
      "Try moving the prepayment month later to watch the saving shrink. Before prepaying, keep an emergency fund aside, and compare your loan rate with what the money could safely earn elsewhere.",
    ],
    faq: [
      {
        question: "When is the best time to prepay a loan?",
        answer: "As early as you can, because the outstanding balance, and therefore the interest, is highest in the first years. Move the prepayment month slider to compare the saving at different points in the loan.",
      },
      {
        question: "Should I prepay my home loan or invest the money?",
        answer: "If your loan rate is higher than the after-tax return you can expect from a safe investment, prepaying usually comes out ahead. Also factor in any tax benefit on home loan interest, and keep enough emergency savings before prepaying.",
      },
      {
        question: "Can I calculate several prepayments at once?",
        answer: "This tool models one lump-sum payment. To get a rough idea for regular part-payments, enter their combined amount in the month of the first payment, keeping in mind that this overstates the saving slightly.",
      },
    ],
  },

  "loan-calculators/personal-loan": {
    about: [
      "A personal loan is an unsecured loan you can use for almost anything—medical bills, a wedding, travel, or paying off credit-card debt. Because there is no collateral, rates are usually higher than on home or car loans and tenures are shorter; this calculator allows up to 7 years.",
      "Example with the defaults: ₹5 lakh at 13% for 5 years gives an EMI of about ₹11,377 and total interest of about ₹1.83 lakh. Choosing 3 years instead raises the EMI to about ₹16,847 but brings interest down to about ₹1.06 lakh, a saving of roughly ₹76,000.",
      "If you are replacing credit-card debt, which often costs 36–42% a year, compare this EMI with what you currently pay on the cards. Lenders also charge a processing fee, often 1–3% of the loan amount plus GST, which this estimate does not include.",
    ],
    faq: [
      {
        question: "What credit score do I need for a personal loan?",
        answer: "Many Indian lenders look for a CIBIL score of around 750 or higher for their best rates. A lower score may still be approved, but usually at a higher interest rate.",
      },
      {
        question: "How is a personal loan EMI calculated?",
        answer: "With the reducing-balance formula EMI = P × r × (1 + r)^n ÷ ((1 + r)^n − 1), where r is the monthly rate and n the number of months. For ₹5 lakh at 13% over 60 months, that comes to about ₹11,377.",
      },
      {
        question: "Can I prepay or foreclose a personal loan?",
        answer: "Most lenders allow it after a lock-in period, often 6 to 12 EMIs, and may charge a fee of a few percent of the outstanding amount. Check your loan agreement for the exact terms.",
      },
    ],
  },

  "markdown/formatter": {
    about: [
      "Markdown files that pass through several editors tend to collect small inconsistencies: a mix of *, + and - bullets, headings typed as ##Title without a space, trailing spaces, and runs of blank lines. This formatter tidies those in one pass while leaving the wording and structure of your document alone.",
      "It is useful before committing a README or docs page, especially if your repository runs a linter such as markdownlint in CI, or after pasting text exported from a note-taking app. Windows line endings (CRLF) are converted to LF, and the file ends with exactly one newline.",
      "One thing to check afterwards: a line that starts with a hashtag, like #release-notes, is treated as a heading and becomes \"# release-notes\". Indented bullets keep their indentation, so nested lists stay nested, and lines inside ``` or ~~~ fences are not reformatted apart from trailing spaces being trimmed.",
    ],
    faq: [
      {
        question: "Will it remove the two trailing spaces I use for line breaks?",
        answer: "Yes. All trailing whitespace is stripped, including the double space that Markdown treats as a hard line break. End the line with a backslash or use a <br> tag if you need those breaks preserved.",
      },
      {
        question: "Does it renumber ordered lists?",
        answer: "No. Numbered lists are left exactly as written; only unordered bullet markers are changed to -.",
      },
      {
        question: "Can this replace a Markdown linter?",
        answer: "It fixes a few common style issues but is not a full linter. Rules about line length, heading order or link style are not checked.",
      },
    ],
  },

  "markdown/from-html": {
    about: [
      "HTML to Markdown converts markup into plain Markdown text using the Turndown library. Headings become # style, bold becomes **text**, italic becomes _text_, lists use - bullets, links and images keep their URLs, and <pre><code> blocks turn into fenced code blocks.",
      "Typical uses include moving blog posts out of WordPress or another CMS into a static site generator such as Hugo, Jekyll or Astro, turning a rich-text page into a README, or getting clean text from a web page to paste into notes or an AI chat without the clutter of tags.",
      "For the cleanest result, paste only the content area—the <article> or main post body—rather than the whole page with its navigation and footer. Remove <script> and <style> blocks first, because their text can otherwise end up in the output, and expect layout-only tags like <div> and <span> to disappear while their text is kept.",
    ],
    faq: [
      {
        question: "Why does italic text use underscores instead of asterisks?",
        answer: "The converter writes emphasis as _text_ and strong text as **text**. Both are standard Markdown and render the same on GitHub, in VS Code and in most other renderers.",
      },
      {
        question: "Are relative links and image paths kept?",
        answer: "Yes, URLs are copied exactly as they appear in the href or src attribute. If they are relative, such as /images/logo.png, update them to match your new site's folder structure.",
      },
      {
        question: "Can I convert a Word or Google Docs file to Markdown?",
        answer: "Not directly, but you can save or export the document as a web page (HTML), open that file in a text editor, and paste its HTML here.",
      },
    ],
  },

  "markdown/preview": {
    about: [
      "Markdown Preview renders your Markdown as formatted text beside the editor, so you can see headings, lists, code blocks, tables and links the way a reader will. It uses the marked parser with GitHub Flavored Markdown enabled and shows a running byte count of your source.",
      "It is handy for drafting a GitHub README, a pull-request description, a blog post for Dev.to or Hashnode, or project documentation, where you want to catch a broken table or an unclosed code fence before publishing. The preview is drawn in a sandboxed frame with scripts blocked, so Markdown from an unknown source cannot run code while you look at it.",
      "A note on line breaks: a single newline inside a paragraph does not start a new line in the preview, which is standard Markdown behaviour. Leave a blank line to start a new paragraph, or end a line with two spaces or a backslash for a line break.",
    ],
    faq: [
      {
        question: "Does the preview highlight code syntax?",
        answer: "Code blocks appear in a monospace font on a shaded background, but without per-language coloring. The language name after the opening fence is kept as a CSS class in the generated HTML, which a syntax highlighter on your own site can use.",
      },
      {
        question: "Will my Markdown look exactly like it does on GitHub?",
        answer: "Close, but not identical. GitHub adds its own styles, heading anchor links, syntax colors and HTML sanitizing, so spacing and some details will differ slightly.",
      },
    ],
  },

  "markdown/to-html": {
    about: [
      "Markdown to HTML turns Markdown into the tags a browser understands: # Heading becomes <h1>, **bold** becomes <strong>, lists become <ul> or <ol>, and fenced code becomes <pre><code class=\"language-…\">. It uses the marked library with GitHub Flavored Markdown, so tables and ~~strikethrough~~ work too.",
      "Use it when the destination accepts HTML but not Markdown—an email newsletter tool, a CMS rich-text field in source mode, an e-commerce product description, or a hand-built static page. You can draft in Markdown, which is quicker to type and easier to review in Git, and convert at the end.",
      "The output is an HTML fragment, not a complete page: there is no <html>, <head> or stylesheet. Paste it inside your template's body, or download it as output.html and add your own CSS. The result refreshes a moment after you stop typing.",
    ],
    faq: [
      {
        question: "Why do single line breaks disappear in the HTML?",
        answer: "Standard Markdown joins lines within a paragraph, so a single newline becomes a space. Leave a blank line between paragraphs, or end a line with two spaces or a backslash to get a <br>.",
      },
      {
        question: "Can I use the converted HTML in an email?",
        answer: "Yes, but many email clients ignore external or embedded CSS, so you may need to add inline styles after converting. Test in a few clients such as Gmail and Outlook before sending.",
      },
    ],
  },

  "networking/random-ip": {
    about: [
      "This generator produces random IPv4 addresses (four numbers from 0 to 255, such as 83.17.204.9) or IPv6 addresses (eight groups of four hex digits written out in full, such as 2a01:04f8:0c17:3b1e:0000:9d2f:00a1:7e44). You can create 1, 5, 10 or 20 at a time, and the values come from the browser's crypto.getRandomValues().",
      "Developers use random IPs to fill access-log fixtures, test rate-limiting or geo-blocking code, seed a demo admin dashboard, or check that a form validates IP fields. Each part is picked independently across the full range, so results can include special blocks: about one in eight IPv4 addresses starts with 224–255 (multicast and reserved space), and a private 10.x.x.x address turns up about once in 256.",
      "For public documentation or tutorials, consider the ranges set aside for examples—192.0.2.0/24, 198.51.100.0/24 and 203.0.113.0/24 for IPv4, and 2001:db8::/32 for IPv6—so no reader mistakes a sample for a real host.",
    ],
    faq: [
      {
        question: "Can I generate random IPs within a specific subnet?",
        answer: "Not with this tool; every address is drawn from the whole IPv4 or IPv6 space. To work inside a particular subnet, use the CIDR calculator to find its range and choose addresses within it.",
      },
      {
        question: "Why aren't the IPv6 addresses shortened with ::?",
        answer: "They are shown in full, uncompressed form so every result has the same length and layout. Any IPv6 parser accepts this form, and you can shorten it yourself if you prefer.",
      },
      {
        question: "Is it safe to put these IPs in test data?",
        answer: "Yes for local tests and fixtures, since nothing is ever sent to them. Do not use them as targets for scans or real requests, because some will belong to real organisations.",
      },
    ],
  },

  "networking/random-mac-address": {
    about: [
      "A MAC address is the 48-bit hardware identifier of a network interface, written as six pairs of hex digits such as 3a:1f:9c:04:e7:b2. This generator creates them with crypto.getRandomValues(), separated by colons, in lowercase or uppercase, in batches of 1, 5, 10 or 20.",
      "In every generated address the first byte has the locally administered bit set and the multicast bit cleared, so the second hex digit is always 2, 6, A or E. That marks it as a unicast address not assigned by any manufacturer, the same convention phones use for private Wi-Fi addresses and hypervisors use for virtual network cards. The other 46 bits are random, giving about 70 trillion possible values.",
      "Typical uses include assigning a fixed MAC to a virtual machine in VirtualBox, Hyper-V or QEMU, setting one for a Docker container, filling a device-inventory table in a demo, or testing code that parses and validates MAC addresses.",
    ],
    faq: [
      {
        question: "How can I tell whether a MAC address is locally administered?",
        answer: "Look at the second hex digit of the first byte: 2, 6, A or E means a locally administered unicast address. Manufacturer-assigned unicast addresses have 0, 4, 8 or C in that position.",
      },
      {
        question: "Can I get MAC addresses with hyphens instead of colons?",
        answer: "The tool outputs colon-separated addresses. For the hyphenated style Windows displays, such as 3A-1F-9C-04-E7-B2, replace the colons with hyphens after copying.",
      },
      {
        question: "Will a MAC vendor lookup identify these addresses?",
        answer: "No vendor will be found, because locally administered addresses are not part of any manufacturer's registered OUI block. That is intentional for test data.",
      },
    ],
  },

  "numbers/decimal-binary": {
    about: [
      "Binary writes numbers using only 0 and 1, with each position worth twice the one to its right: 1, 2, 4, 8, 16 and so on. This converter works in both directions—type in either field and the other updates—which is useful for bit masks, permission flags, subnet masks and computer science homework.",
      "To convert by hand, divide by 2 repeatedly and read the remainders from bottom to top. For 156: 156 ÷ 2 = 78 r 0, 78 ÷ 2 = 39 r 0, 39 ÷ 2 = 19 r 1, 19 ÷ 2 = 9 r 1, 9 ÷ 2 = 4 r 1, 4 ÷ 2 = 2 r 0, 2 ÷ 2 = 1 r 0, 1 ÷ 2 = 0 r 1, giving 10011100. Check: 128 + 16 + 8 + 4 = 156.",
      "Leading zeros are not added, so 5 shows as 101 rather than 00000101; pad it yourself when you need a fixed 8-bit byte. Spaces between groups, as in 1001 1100, are not accepted, so remove them before pasting.",
    ],
    faq: [
      {
        question: "How do I convert binary to decimal by hand?",
        answer: "Multiply each digit by its place value, starting from 1 on the right and doubling each step, then add the results. For 1011 that is 8 + 0 + 2 + 1 = 11.",
      },
      {
        question: "What is the largest number this converter handles accurately?",
        answer: "Whole numbers up to 9,007,199,254,740,991 (2^53 − 1), the largest integer JavaScript stores exactly. Beyond that, the last digits may be rounded.",
      },
      {
        question: "Can I convert decimal fractions like 0.5 to binary?",
        answer: "No, only whole numbers are accepted, and a decimal point makes the input invalid. Fractions need a different method, repeatedly multiplying the fractional part by 2.",
      },
    ],
  },

  "numbers/decimal-hex": {
    about: [
      "Hexadecimal is base 16: the digits 0–9 followed by a–f for the values 10 to 15. Two hex digits describe exactly one byte, which is why hex appears in color codes (#ff8800), memory addresses, Unicode code points (U+20B9 is ₹), hash outputs and error codes.",
      "To convert decimal to hex, divide by 16 repeatedly and read the remainders upwards. For 48879: 48879 ÷ 16 = 3054 r 15 (F), 3054 ÷ 16 = 190 r 14 (E), 190 ÷ 16 = 11 r 14 (E), 11 ÷ 16 = 0 r 11 (B), so the answer is BEEF. Going the other way, FF is 15 × 16 + 15 = 255.",
      "The converter accepts uppercase or lowercase hex digits and always shows its hex result in lowercase. A CSS color such as #1e90ff is three separate bytes, so convert each pair on its own—1e, 90 and ff give 30, 144 and 255 for the red, green and blue values.",
    ],
    faq: [
      {
        question: "How do I convert hex to decimal manually?",
        answer: "Multiply each digit by a power of 16, starting from 16^0 = 1 on the right, and add the results. For 2F that is 2 × 16 + 15 = 47.",
      },
      {
        question: "Why is the hex result shown in lowercase?",
        answer: "Lowercase is the default output of JavaScript's number conversion. Hex is case-insensitive, so ff and FF are the same value; change the case if your style guide prefers uppercase.",
      },
      {
        question: "What is the largest value I can convert?",
        answer: "Up to 9,007,199,254,740,991 in decimal, which is 1fffffffffffff in hex. Larger values, such as full 64-bit numbers, lose precision in the browser.",
      },
    ],
  },

  "numbers/decimal-octal": {
    about: [
      "Octal is base 8 and uses only the digits 0 to 7. Each octal digit stands for exactly three binary bits, which made it a natural shorthand on early computers and explains why it survives in Unix file permissions, where read, write and execute are worth 4, 2 and 1.",
      "To convert decimal to octal, divide by 8 repeatedly and read the remainders from the bottom up. For 493: 493 ÷ 8 = 61 r 5, 61 ÷ 8 = 7 r 5, 7 ÷ 8 = 0 r 7, giving 755. That is the familiar chmod 755: the owner gets rwx (4 + 2 + 1 = 7), while group and others get r-x (4 + 1 = 5). Likewise, octal 644 equals decimal 420.",
      "This matters in code. In Python's os.chmod, or Node's fs.chmod when the mode is given as a number, writing 755 means decimal 755 and sets the wrong permissions. Use the octal literal 0o755, or pass the decimal value 493.",
    ],
    faq: [
      {
        question: "What does chmod 644 mean?",
        answer: "The owner can read and write (4 + 2 = 6), while the group and everyone else can only read (4). It is the usual permission for ordinary files such as web pages and config files.",
      },
      {
        question: "How do I convert octal back to decimal?",
        answer: "Multiply each digit by a power of 8 and add the results: 755 is 7 × 64 + 5 × 8 + 5 = 493.",
      },
      {
        question: "Why does a leading zero change a number's value in some code?",
        answer: "In C, and in older non-strict JavaScript, a leading zero such as 010 marks an octal literal, so 010 equals 8, not 10. Modern code uses the explicit 0o prefix to avoid this confusion.",
      },
    ],
  },
};
