import type { ToolExtraContent } from "./types";

export const group3: Record<string, ToolExtraContent> = {
  "ids/guid": {
    about: [
      "A GUID is a 128-bit identifier written as 32 hexadecimal digits, usually split into five groups like 8-4-4-4-12. Windows, .NET, SQL Server (uniqueidentifier columns), COM components and the Windows registry all rely on GUIDs to label records, classes and interfaces without needing a central authority to hand out numbers.",
      "This generator produces random (version 4) GUIDs in your browser using crypto.randomUUID() or, where that is missing, crypto.getRandomValues(). Braces are switched on by default, so the output matches the registry-style {xxxxxxxx-...} form that many Microsoft tools and config files expect. Turn braces off and uppercase on if you need the plain style used in SQL scripts.",
      "A practical tip: when seeding test data for a .NET project, generate a batch of 20, click Copy all, and paste the list straight into your seed file — each GUID lands on its own line, ready to wrap in quotes.",
    ],
    faq: [
      {
        question: "How do I generate a GUID in C#?",
        answer: "Call Guid.NewGuid() to create one and Guid.NewGuid().ToString(\"B\") to get it wrapped in braces. This page is handy when you need a value outside of code, such as in a config file or a SQL insert script.",
      },
      {
        question: "Can two GUIDs ever be the same?",
        answer: "In theory yes, but with 122 random bits the odds are so small that duplicates are not a practical concern. A collision is far more likely to come from a bug, such as copying the same value twice, than from the generator itself.",
      },
      {
        question: "How many GUIDs can I generate at once?",
        answer: "Each batch holds 1, 5, 10 or 20 GUIDs. Press Regenerate as often as you like to get fresh batches; there is no daily limit.",
      },
    ],
  },

  "ids/nano-id": {
    about: [
      "Nano ID is a compact random identifier popular in JavaScript projects. Instead of the 36-character UUID format, it produces a short string such as V1StGXR8_Z5jdHi6B-myT that is safe to drop into URLs, filenames and HTML attributes without escaping.",
      "This page uses the official nanoid package, which draws randomness from the browser's crypto.getRandomValues(). You can set the length anywhere from 2 to 64 characters and optionally supply your own alphabet — for example only lowercase letters and digits for case-insensitive systems, or a set without look-alike characters such as 0, O, 1 and l for codes people have to read aloud.",
      "Typical uses include short links, invite codes, public order references and client-side keys for list items. Keep in mind that shortening the length or shrinking the alphabet reduces the number of possible IDs, so a 6-character code is fine for a small promo campaign but not for millions of database rows.",
    ],
    faq: [
      {
        question: "Is a shorter Nano ID still unique?",
        answer: "Shorter IDs have far fewer possible values, so the chance of a collision rises quickly as you generate more of them. The default 21 characters is a safe general-purpose length; if you shorten it, check your database for duplicates on insert.",
      },
      {
        question: "Are Nano IDs sortable by creation time?",
        answer: "No. Nano IDs are purely random and contain no timestamp, so sorting them gives no meaningful order. If you need time-ordered IDs, look at UUID v7 instead.",
      },
      {
        question: "How do I generate a Nano ID in my own code?",
        answer: "Install the package with npm install nanoid, then call nanoid() for a 21-character ID or nanoid(10) for a custom length. customAlphabet() lets you define your own character set, just like the option on this page.",
      },
    ],
  },

  "ids/random-number": {
    about: [
      "A random number generator picks whole numbers between a minimum and maximum you choose, with both ends included. People use it for raffles and giveaways, choosing a random winner from a numbered list, assigning participants to groups, generating sample data, or settling a quick decision.",
      "This tool draws its randomness from crypto.getRandomValues(), the browser's secure random source, rather than Math.random(). It can produce 1, 5, 10 or 20 numbers per batch, and the No duplicates option shuffles the full range so every number in the result is different — useful for lottery-style draws where the same ticket cannot win twice.",
      "Example: to pick three winners from 250 numbered entries, set the minimum to 1 and the maximum to 250, choose 5, tick No duplicates, and take the first three results. If you type the bounds the wrong way round, the tool simply treats the smaller value as the minimum.",
    ],
    faq: [
      {
        question: "Are the minimum and maximum included?",
        answer: "Yes. Both bounds are inclusive, so a range of 1 to 6 can return 1, 6 or anything in between, just like a die roll.",
      },
      {
        question: "Can it generate decimal numbers?",
        answer: "No, the tool only returns whole numbers. If you enter decimal bounds, the minimum is rounded up and the maximum rounded down to the nearest integer.",
      },
      {
        question: "Is this fair enough for a giveaway or raffle?",
        answer: "Each number in the range has an essentially equal chance of being picked, and the source is the browser's secure random generator. For a public draw, record your screen or share the settings you used so participants can see the process.",
      },
    ],
  },

  "ids/random-string": {
    about: [
      "A random string generator builds text out of characters picked at random from a pool you choose. Developers use it for test fixtures, temporary passwords, session or API tokens in local environments, coupon codes, file name suffixes and anything else that needs a value nobody can easily guess.",
      "Here you can set a length from 1 to 128 and choose letters and numbers (62 characters, upper and lower case), letters only, numbers only, lowercase hexadecimal, or a custom pool of your own. Every character comes from crypto.getRandomValues(), and you can generate up to 20 strings per batch.",
      "To judge strength, think in bits: each hex character adds 4 bits, and each letters-and-numbers character adds about 6. A 32-character hex string therefore carries 128 bits of randomness, the same amount as the random part of a typical secret key. For codes customers type by hand, a custom pool without confusing characters like O and 0 saves support tickets.",
    ],
    faq: [
      {
        question: "How long should a random string be for an API key or token?",
        answer: "Aim for at least 128 bits of randomness, which is 32 hexadecimal characters or about 22 letters-and-numbers characters. Longer is fine; shorter tokens become easier to guess by brute force.",
      },
      {
        question: "Is the output case-sensitive?",
        answer: "The Letters + numbers and Letters only presets mix uppercase and lowercase, so treat the result as case-sensitive. The Hexadecimal preset uses lowercase a–f only.",
      },
      {
        question: "Can I generate a numeric code like a 6-digit OTP?",
        answer: "Yes. Choose Numbers only and set the length to 6. Leading zeros are kept, so a result like 004219 is a valid six-character code.",
      },
    ],
  },

  "ids/uuid-v4": {
    about: [
      "UUID version 4 is the most widely used kind of universally unique identifier. Apart from a few fixed bits that mark its version and variant, all of its 128 bits are random, which means any app, server or device can create IDs on its own without checking a central counter first.",
      "This generator calls the browser's crypto.randomUUID() and falls back to crypto.getRandomValues() when needed, so values are produced on your device and never sent anywhere. You can create 1, 5, 10 or 20 at a time, switch to uppercase, or remove the hyphens to get a 32-character hex string for systems that store IDs compactly.",
      "Common uses include primary keys in PostgreSQL or MongoDB, idempotency keys for payment APIs, correlation IDs in logs, and unique names for uploaded files. When writing tests, paste a fixed UUID from this page into your fixtures so the expected output stays stable between runs.",
    ],
    faq: [
      {
        question: "What does the 4 in UUID v4 mean?",
        answer: "It is the version number, stored in the first character of the third group — every v4 UUID looks like xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx. The y position is always 8, 9, a or b, which marks the standard RFC variant.",
      },
      {
        question: "How can I check whether a string is a valid UUID v4?",
        answer: "Use a case-insensitive pattern such as ^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$. Many languages also offer a parser, for example Guid.TryParse in .NET or the uuid package's validate() in JavaScript.",
      },
      {
        question: "How do I generate a UUID v4 in JavaScript?",
        answer: "In modern browsers and Node.js 19+, call crypto.randomUUID(). It returns a lowercase, hyphenated v4 UUID — the same format this page shows by default.",
      },
      {
        question: "What does UUID stand for, and what is it used for?",
        answer: "UUID stands for Universally Unique Identifier. It is a 128-bit ID that any program can create on its own and still be practically certain nobody else has the same one. Developers use UUIDs as database primary keys, order and request IDs, file names for uploads, and idempotency keys for APIs, anywhere an ID must be unique without asking a central server.",
      },
      {
        question: "What is an example of a UUID, and which characters are allowed?",
        answer: "A UUID v4 looks like 3f2b8c1e-9d4a-4e7b-a5c6-1b2d3e4f5a6b. It is 36 characters: 32 hexadecimal digits (0–9 and a–f) split into groups of 8-4-4-4-12 by hyphens. Letters are case-insensitive, so uppercase is equally valid, and some systems store it without hyphens as 32 characters.",
      },
      {
        question: "How do I generate a UUID in Python, Java, C# or SQL?",
        answer: "Python: import uuid; uuid.uuid4(). Java: UUID.randomUUID(). C#: Guid.NewGuid(). PostgreSQL 13+: SELECT gen_random_uuid(). MySQL's UUID() returns a v1 UUID, not v4. All of these produce the same standard format this page generates.",
      },
      {
        question: "Can you decode a UUID?",
        answer: "Only partly. Every UUID tells you its version (the first digit of the third group) and variant. A UUID v4 contains nothing else: the rest is random, so there is no hidden data to decode. Time-based UUID v1 and UUID v7 do embed the moment they were created, which can be read back.",
      },
      {
        question: "Is a UUID secret, and is it safe to expose?",
        answer: "A UUID is an identifier, not a password. A v4 UUID reveals nothing about your system, so showing it in a URL or API response is generally fine. But don't rely on it to protect anything: if knowing an ID gives access to data, check permissions on the server. For secret values such as API keys or reset tokens, use a random token generator instead. If a UUID is linked to a person, privacy laws like GDPR can treat it as personal data.",
      },
      {
        question: "Can UUIDs run out or collide?",
        answer: "Not in practice. A v4 UUID has 122 random bits, about 5.3 × 10^36 possible values. You would need to generate around 2.7 × 10^18 of them, a billion per second for 85 years, before there is even a 50% chance of a single duplicate.",
      },
      {
        question: "Why use a UUID instead of an auto-increment ID? Is it overkill?",
        answer: "Auto-increment IDs (1, 2, 3…) are smaller and faster to index, and they are fine for a single database. UUIDs are worth it when IDs are created on many servers or offline devices, when records are merged between databases, or when you don't want users to guess other IDs or count your orders. If index speed matters, use time-ordered UUID v7; if you need short IDs for URLs, Nano ID is a common alternative.",
      },
    ],
  },

  "investment-calculators/cagr-calculator": {
    about: [
      "CAGR, or compound annual growth rate, describes how fast something grew per year if it had grown at a steady pace the whole time. It is the standard way to compare the performance of a stock, mutual fund, property or business revenue over periods of different lengths.",
      "Enter a starting value, an ending value and the number of years (1 to 40), and the calculator applies CAGR = (Final ÷ Initial)^(1 ÷ years) − 1. For example, an investment that went from 1,00,000 to 2,00,000 in 5 years has a CAGR of about 14.87%, even though the total gain was 100%.",
      "CAGR is useful for checking claims like \"this fund doubled in five years\" against a benchmark index or a fixed deposit rate. It only looks at the start and end points, though, so it hides volatility in between and does not handle extra deposits or withdrawals — for those, the XIRR Calculator is a better fit.",
    ],
    faq: [
      {
        question: "How do I calculate CAGR in Excel?",
        answer: "Use =(End/Start)^(1/Years)-1 and format the cell as a percentage, or use the built-in =RRI(Years, Start, End) function. Both give the same result as this calculator.",
      },
      {
        question: "Can CAGR be negative?",
        answer: "Yes. If the final value is lower than the initial value, the CAGR is negative and shows the average yearly rate at which the investment shrank.",
      },
      {
        question: "Can I calculate CAGR for a period shorter than a year or with months?",
        answer: "This calculator accepts whole years from 1 to 40. For partial years or investments with dated cash flows, enter the dates in the XIRR Calculator, which works out an annualized rate from exact day counts.",
      },
    ],
  },

  "investment-calculators/irr-calculator": {
    about: [
      "IRR, the internal rate of return, is the discount rate at which the present value of all money going out equals the present value of all money coming back. Businesses use it to rank projects, landlords use it to judge a rental purchase, and investors use it to compare deals with uneven payouts.",
      "In this calculator you list one cash flow per period, starting with period 0, which is normally the upfront cost entered as a negative number. You can add or remove periods as needed, and the rate is found numerically by repeatedly narrowing the range between −99% and 1,000% until the net present value reaches zero.",
      "The default example shows how it works: paying 1,00,000 today and receiving 20,000, 30,000, 40,000 and 50,000 over the next four periods gives an IRR of roughly 12.8%. If your company's required return (its hurdle rate) is 10%, that project clears the bar; at 15% it would not.",
    ],
    faq: [
      {
        question: "Is the IRR result annual or monthly?",
        answer: "It is a rate per period, so it matches whatever spacing you used. If each period is a month, convert the monthly IRR to an annual figure with (1 + IRR)^12 − 1.",
      },
      {
        question: "Why does the IRR calculator show a dash instead of a number?",
        answer: "A dash means no rate could be found, usually because all cash flows have the same sign or the true rate lies outside the −99% to 1,000% search range. Check that your initial investment is negative and at least one later amount is positive.",
      },
      {
        question: "Can a project have more than one IRR?",
        answer: "Yes. When cash flows switch between negative and positive more than once, there can be several rates that make the net present value zero. In that case this tool reports one of them, so it is worth cross-checking with a net present value calculation at your own discount rate.",
      },
    ],
  },

  "investment-calculators/lumpsum-calculator": {
    about: [
      "A lumpsum investment is a single, one-time amount put to work at once — for example a bonus, an inheritance, or the proceeds from selling a property invested in a mutual fund, index fund or bond. This calculator estimates what that amount could grow to over 1 to 40 years at a constant expected return between 1% and 30% a year.",
      "It uses annual compounding with the formula FV = P × (1 + r)^n and shows the future value, the amount you put in and the wealth gained. As an example, 1,00,000 invested for 10 years at 12% a year grows to about 3,10,585, more than three times the original sum.",
      "A quick sanity check is the rule of 72: divide 72 by the yearly return to estimate how many years it takes money to double. At 12% that is about six years, which lines up with the calculator's output. You can pick ₹, $, € or £ as the currency symbol; the maths is the same for each.",
    ],
    faq: [
      {
        question: "What is the formula for lumpsum returns?",
        answer: "Future value = Principal × (1 + annual rate)^years. With 50,000 at 8% for 5 years, that is 50,000 × 1.08^5 ≈ 73,466.",
      },
      {
        question: "Does the lumpsum calculator account for inflation or tax?",
        answer: "No, it shows a nominal, pre-tax figure. To get a rough inflation-adjusted view, subtract the expected inflation rate from your return before entering it, for example 12% − 5% = 7%.",
      },
      {
        question: "Should I invest a lumpsum or use a SIP?",
        answer: "A lumpsum puts all your money in the market immediately, while a SIP spreads purchases over time and reduces the risk of investing just before a fall. Run both calculators with the same total amount to compare outcomes, and consider your risk tolerance before deciding.",
      },
    ],
  },

  "investment-calculators/mutual-fund-returns": {
    about: [
      "Mutual fund statements list how many units you own and the NAV (net asset value per unit), but they don't always show your return clearly. This calculator works from those three numbers — units held, purchase NAV and current NAV — to show what you invested, what it is worth today, and your gain in percentage terms.",
      "Absolute return is simply the total percentage change. Ticking the annualized option and setting a holding period of 1 to 30 years also gives the yearly CAGR, which is the figure to use when comparing funds held for different lengths of time. With the default example of 500 units bought at NAV 20 and now worth 28, the absolute return is 40% and the 3-year annualized return is about 11.87%.",
      "For SIP investments bought at many different NAVs, divide your total amount invested by total units to get an average purchase NAV, or enter each instalment in the XIRR Calculator for a more precise annual return.",
    ],
    faq: [
      {
        question: "What is the difference between absolute return and annualized return?",
        answer: "Absolute return is the total gain over the whole holding period, regardless of how long it took. Annualized return (CAGR) spreads that gain into an equivalent yearly rate, so a 40% gain over 3 years becomes roughly 11.87% a year.",
      },
      {
        question: "Does this include dividends, exit load or tax?",
        answer: "No. It compares purchase NAV with current NAV only. Payouts from IDCW (dividend) plans, exit loads and capital gains tax are not included, so your actual take-home return may differ.",
      },
      {
        question: "Can I use this for a SIP with many purchase dates?",
        answer: "Only approximately, by entering your average purchase NAV and total units. Because SIP money is invested at different times, the XIRR Calculator gives a more accurate annual return for SIPs.",
      },
    ],
  },

  "investment-calculators/roi-calculator": {
    about: [
      "Return on investment (ROI) measures how much you gained or lost relative to what you put in. It applies to almost anything: a stock position, a rental renovation, a marketing campaign, new equipment for a small business, or a collectible bought and resold.",
      "Enter the initial investment and the final or current value to see the gain or loss in money and as a percentage. The formula is ROI = (Final − Initial) ÷ Initial × 100. With the default figures, 50,000 growing to 65,000 is a 30% ROI. Switch on the annualized option and set a holding period of 1 to 40 years to see the yearly rate — the same 30% over 2 years works out to about 14.02% a year.",
      "For a fair result, include all costs. Add purchase fees, brokerage or setup costs to the initial investment, and subtract selling costs or commissions from the final value before you enter them; otherwise the ROI will look better than it really was.",
    ],
    faq: [
      {
        question: "What is the formula for ROI?",
        answer: "ROI = (Final value − Initial investment) ÷ Initial investment × 100. If you spend 2,000 on a campaign that brings in 2,600, the ROI is 600 ÷ 2,000 × 100 = 30%.",
      },
      {
        question: "Can ROI be negative?",
        answer: "Yes. If the final value is less than what you invested, the gain is negative and the ROI percentage shows how much of your money was lost.",
      },
      {
        question: "What is the difference between ROI and annualized return?",
        answer: "ROI is the total return over the whole period, while annualized return converts it into an average yearly rate using the CAGR formula. Annualized return is the better choice when comparing investments held for different lengths of time.",
      },
    ],
  },

  "investment-calculators/sip-calculator": {
    about: [
      "A SIP (systematic investment plan) means investing the same amount every month, usually into a mutual fund, instead of investing a large sum at once. It is a common way for salaried investors to build savings gradually, and it spreads purchases across market highs and lows.",
      "This calculator assumes each monthly instalment is invested at the start of the month and grows at a monthly rate equal to your annual return divided by 12. You can set the expected return from 1% to 30% and the duration from 1 to 40 years. For example, 10,000 a month for 10 years at 12% gives a projected value of about 23.2 lakh on 12 lakh invested.",
      "The bar under the results shows how much of the final amount is your own money and how much is growth. Try extending the duration while keeping everything else the same — the growth share rises sharply over longer periods, which is why starting earlier often matters more than investing a slightly larger amount later.",
    ],
    faq: [
      {
        question: "How is the SIP maturity amount calculated?",
        answer: "It uses FV = P × [((1 + i)^n − 1) ÷ i] × (1 + i), where P is the monthly amount, i is the annual return divided by 12, and n is the number of months. The extra (1 + i) reflects that each instalment is invested at the start of the month.",
      },
      {
        question: "How much should I invest monthly to reach a target amount?",
        answer: "The calculator works forwards from a monthly amount, so adjust the SIP amount until the future value reaches your goal. As a reference point, at 12% for 10 years, every 1,000 a month grows to roughly 2.32 lakh.",
      },
    ],
  },

  "investment-calculators/step-up-sip": {
    about: [
      "A step-up SIP (also called a top-up SIP) is a monthly investment that increases by a fixed percentage once a year. It suits people whose income is expected to rise, because it lets them start with a manageable amount and invest more as their salary grows, without having to remember to change the plan.",
      "In this calculator the monthly amount stays the same for 12 months, then rises by the step-up percentage (0% to 50%) at the start of each new year. The increase compounds: a 10,000 SIP with a 10% step-up becomes 11,000 in year two and 12,100 in year three. Each month's balance then grows at your expected annual return divided by 12.",
      "To see the effect, compare two runs. At 12% for 10 years, a flat 10,000 SIP (set step-up to 0%) reaches about 23.2 lakh, while the same SIP with a 10% yearly step-up reaches about 33.7 lakh, because you invest more and the larger later amounts still have time to grow.",
    ],
    faq: [
      {
        question: "When does the step-up increase happen?",
        answer: "Every 12 months from the first instalment. Months 1–12 use the starting amount, months 13–24 use the first increased amount, and so on.",
      },
      {
        question: "Can I step up by a fixed amount instead of a percentage?",
        answer: "This calculator only supports a percentage increase. A fixed rupee or dollar top-up becomes a smaller percentage each year, so the results here will be slightly higher than a fixed-amount plan with the same first-year increase.",
      },
      {
        question: "What step-up percentage should I choose?",
        answer: "Many investors match it roughly to their expected yearly salary increase, often 5% to 10%. Pick a rate you can realistically sustain, since skipping increases later will lower the final amount.",
      },
    ],
  },

  "investment-calculators/stock-average-price": {
    about: [
      "When you buy the same share several times at different prices, your real cost per share is the weighted average of all those purchases. Traders call adding shares at a lower price \"averaging down\" and adding at a higher price \"averaging up\"; either way, the average decides your break-even point.",
      "Add each buy as a quantity and price per share, and the calculator divides the total amount spent by the total number of shares. You can add as many buy transactions as you need and remove any you no longer want. Optionally enter today's market price to see your profit or loss in money and as a percentage.",
      "Example: 10 shares at 100 and 5 shares at 120 cost 1,600 in total, so the average is 1,600 ÷ 15 = 106.67. The calculator shows amounts rounded to whole currency units, so it displays 107 here; for low-priced shares where paise or cents matter, use the formula above to get the exact figure.",
    ],
    faq: [
      {
        question: "What is the formula for average share price?",
        answer: "Average price = (Q1 × P1 + Q2 × P2 + …) ÷ (Q1 + Q2 + …), where Q is the quantity and P the price of each purchase. It is a weighted average, so larger purchases pull the average further toward their price.",
      },
      {
        question: "How many shares do I need to buy to bring my average down?",
        answer: "Add a new buy row with the current price and adjust its quantity until the average buy price reaches your target. This lets you test different scenarios before placing an order.",
      },
    ],
  },

  "investment-calculators/swp-calculator": {
    about: [
      "An SWP lets you withdraw a fixed amount every month from an existing investment while the rest stays invested. Retirees often use it to turn a mutual fund corpus into a regular income, and others use it to fund school fees or rent from savings.",
      "This calculator simulates each month in turn: the balance grows at your expected annual return divided by 12 (between 1% and 20% a year), and then your withdrawal is taken out. Over a period of 1 to 40 years it shows either the balance left at the end or, if the money runs out first, how many years it lasted, along with the total amount withdrawn.",
      "A simple test of sustainability is to compare your withdrawal with the monthly growth. With the default 20 lakh corpus at 8%, monthly growth is about 13,333, so a 15,000 withdrawal slowly eats into the principal: about 10.2 lakh is left after 20 years, and the corpus lasts roughly 27.6 years in total.",
    ],
    faq: [
      {
        question: "How much can I withdraw monthly without running out of money?",
        answer: "If your monthly withdrawal is below corpus × annual return ÷ 12, the balance should not shrink under a constant-return assumption. Real returns fluctuate, so many people withdraw less than that to leave a safety margin.",
      },
      {
        question: "Does the SWP calculator adjust withdrawals for inflation?",
        answer: "No, it keeps the withdrawal amount the same every month. If you plan to raise withdrawals over time, test a higher monthly figure to see how much sooner the corpus would run out.",
      },
      {
        question: "Are taxes included in the SWP result?",
        answer: "No. Each SWP withdrawal may be partly treated as capital gains depending on your country and fund type, so check the tax rules that apply to you separately.",
      },
    ],
  },

  "investment-calculators/xirr-calculator": {
    about: [
      "XIRR is an annualized rate of return for investments where money goes in and comes out on irregular dates. It is the figure most mutual fund platforms show for SIP portfolios, and it works equally well for stock positions with several purchases, P2P lending, or a business loan repaid in uneven instalments.",
      "Enter every cash flow with its date: money you invested as a negative amount and money you received (including today's portfolio value, if you haven't sold) as a positive amount. The calculator sorts the rows by date, measures time in 365-day years from the first cash flow, and searches for the rate at which the net present value equals zero.",
      "Example: investing 1,00,000 on 15 January 2023, adding 50,000 on 10 June 2024, and holding a portfolio worth 1,80,000 today. Since the second deposit has been invested for less time than the first, XIRR weights it accordingly — something a simple CAGR on the 1,50,000 total cannot do.",
    ],
    faq: [
      {
        question: "How is XIRR different from CAGR?",
        answer: "CAGR assumes a single investment at the start and a single value at the end. XIRR handles multiple deposits and withdrawals on different dates, so it is the right measure for SIPs, top-ups and partial redemptions.",
      },
      {
        question: "How do I calculate XIRR in Excel or Google Sheets?",
        answer: "Put the amounts in one column and the dates in another, then use =XIRR(amounts, dates). Like this calculator, Excel uses a 365-day year, so results should match closely.",
      },
      {
        question: "Do I need to enter cash flows in date order?",
        answer: "No. The calculator sorts the cash flows by date before solving, so you can add rows in any order.",
      },
    ],
  },

  "javascript/beautifier": {
    about: [
      "A JavaScript beautifier takes code that has been squashed onto one line — a minified library, a script copied from a production site, or a snippet from a browser's network tab — and lays it out again with line breaks and indentation so a person can follow it.",
      "This tool runs Prettier with the Babel parser in your browser. Output uses 2-space indentation, double quotes, semicolons and Prettier's default line width of 80 characters, and long expressions are broken across lines automatically. Because Prettier needs to parse the code first, a syntax error stops the output and shows the parser's message instead.",
      "Beautifying is great for debugging a third-party script or auditing what a tracking snippet does, but it can only restore layout. Minifiers rename local variables to single letters and remove comments, so those original names cannot be recovered. If the code also contains hex-encoded strings, the JS Deobfuscator can decode those first.",
    ],
    faq: [
      {
        question: "Can a beautifier recover original variable names from minified code?",
        answer: "No. Minification permanently replaces local names like totalPrice with short ones like t, and that information is not stored in the file. Only a source map from the original build can map names back.",
      },
      {
        question: "Why do I get an error instead of beautified code?",
        answer: "The code has to be valid JavaScript for Prettier to parse it. Check the error message for the line and column, and make sure you copied the complete script rather than a fragment cut off mid-expression.",
      },
    ],
  },

  "javascript/formatter": {
    about: [
      "A JavaScript formatter rewrites code into one consistent style so the layout doesn't depend on who wrote it. Teams use formatters so code reviews focus on logic rather than spacing, and so diffs only show real changes instead of reshuffled whitespace.",
      "This page uses Prettier 3 with the Babel parser and fixed settings: 2 spaces, double quotes, semicolons at the end of statements and an 80-character line width. Comments are kept, and runs of blank lines are reduced to a single empty line. Output updates a moment after you stop typing, and you can copy it or download it as formatted.js.",
      "It is useful when you want Prettier-style output without installing anything — tidying a snippet before posting it in documentation or a Stack Overflow answer, or checking how Prettier will treat a tricky chained expression before adding it to a project. For a whole repository, install Prettier locally and run it from your editor or CI.",
    ],
    faq: [
      {
        question: "Can I change the indentation or use single quotes?",
        answer: "No, the settings on this page are fixed to 2 spaces and double quotes. To use your own style, run Prettier locally with a .prettierrc file containing options such as singleQuote or tabWidth.",
      },
      {
        question: "Does formatting fix bugs or lint errors?",
        answer: "No. Formatting only changes layout, such as whitespace, line breaks and quote style, so the code behaves exactly as before. Use a linter such as ESLint to find unused variables or likely bugs.",
      },
    ],
  },

  "javascript/minifier": {
    about: [
      "Minifying JavaScript shrinks a file so browsers download and parse it faster. It removes whitespace and comments, shortens local variable and parameter names, and simplifies code where the result behaves the same. Smaller scripts help page-load times and Core Web Vitals, especially on mobile connections.",
      "This tool runs Terser with compression and name mangling turned on. Top-level function and variable names are left untouched, so code that other scripts call by name keeps working. Comments that start with /*! or contain @license or @preserve are also kept, which preserves the licence banners many libraries require.",
      "Example: a function add(alpha, beta) { return alpha + beta; } becomes function add(d,n){return d+n}. Minify a standalone script, an inline snippet or a widget before pasting it into a page. The input must be plain JavaScript, so compile TypeScript or JSX first, and keep your original readable file — the minified version is for shipping, not editing.",
    ],
    faq: [
      {
        question: "Why are some comments still in the minified output?",
        answer: "Terser keeps comments that begin with /*! or include @license or @preserve, because they usually carry copyright or licence notices. Ordinary // and /* */ comments are removed.",
      },
      {
        question: "Why weren't my top-level function names shortened?",
        answer: "Top-level names may be used by other scripts or HTML attributes such as onclick, so renaming them could break the page. Only names inside functions are shortened.",
      },
      {
        question: "Can I minify TypeScript or JSX here?",
        answer: "No. Terser only understands JavaScript, so TypeScript type annotations or JSX tags will cause a parse error. Compile with tsc, Babel or your bundler first, then minify the output.",
      },
    ],
  },

  "json/beautifier": {
    about: [
      "JSON from APIs, logs and databases often arrives as one long line that is impossible to scan. A JSON beautifier parses it and prints it again with each key on its own line and nested objects indented, so you can see the structure at a glance.",
      "Paste JSON, upload a .json file, or drag one onto the editor. Choose 2 spaces, 4 spaces or tabs, and turn on Sort keys to order object keys alphabetically at every level; array order is never changed. Besides the text view, there is a collapsible Tree view with key and value search, a Raw view, a Minified view, and a summary of objects, arrays, keys, size and nesting depth.",
      "Sorting keys is a handy trick before comparing two API responses: beautify both with sorting on, then run them through a diff tool so only real changes show up. Errors show the parser's message plus a line and column when available, which makes a stray trailing comma easy to find.",
    ],
    faq: [
      {
        question: "Why did 1.0 become 1 after beautifying?",
        answer: "The beautifier parses your JSON into real values and prints them back, and JSON treats 1.0 and 1 as the same number. The value is unchanged, but the original spelling of numbers is not kept.",
      },
      {
        question: "Are very large numbers safe to beautify?",
        answer: "Integers larger than 9,007,199,254,740,991 cannot be stored exactly in JavaScript, so long IDs like 1234567890123456789 may lose their last digits. If your data has IDs that big, keep them as strings in the JSON.",
      },
      {
        question: "Does Sort keys also sort arrays?",
        answer: "No. Only object keys are sorted, recursively at every level. Items inside arrays stay in their original order because their position is usually meaningful.",
      },
    ],
  },

  "json/minifier": {
    about: [
      "JSON minification removes every space, tab and line break that sits between tokens, leaving the smallest valid version of the same data. It is useful when embedding JSON in an HTML data attribute or environment variable, storing it in a database column, or trimming a large fixture file before committing it.",
      "This tool parses your input first and then prints it in compact form, so invalid JSON is rejected with an error message and a line and column where possible, rather than producing broken output. The byte counts above each panel show how much space you saved, and you can copy the result or download it as minified.json.",
      "Keep in mind that minifying only affects whitespace in the text you send. If your server already applies gzip or Brotli compression, the transfer saving is smaller than the byte count suggests, because compression handles repeated whitespace well. Minifying still helps with storage limits and places where compression doesn't apply, like URL parameters.",
    ],
    faq: [
      {
        question: "Can I turn minified JSON back into readable JSON?",
        answer: "Yes. Paste it into the JSON Beautifier or JSON Formatter to add indentation back. Because minifying only removes whitespace, nothing is lost in the round trip.",
      },
      {
        question: "Will the minifier remove comments from my JSON?",
        answer: "Standard JSON does not allow comments, so input containing // or /* */ comments is reported as invalid. Remove the comments first, or keep JSONC files such as tsconfig.json as they are.",
      },
    ],
  },

  "json/compare": {
    about: [
      "JSON Compare gives a quick yes-or-no answer for each top-level field in two JSON objects. It is handy for checking a staging response against production, confirming that a config change touched only the keys you expected, or spotting what differs between two records exported from a database.",
      "Paste one object into JSON A and another into JSON B. The tool lists every key found in either object with both values side by side and a match or differs label, plus a summary badge such as \"2/4 fields match\" or \"Identical\". Nested values are compared deeply, so a change anywhere inside a nested object marks that top-level row as differs.",
      "Because both inputs are parsed first, formatting and indentation never cause false differences. A key that exists in only one object appears with undefined on the other side, which makes missing or newly added fields easy to spot.",
    ],
    faq: [
      {
        question: "Does key order matter when comparing JSON?",
        answer: "No. Fields are matched by key name, so {\"a\":1,\"b\":2} and {\"b\":2,\"a\":1} are reported as identical.",
      },
      {
        question: "Why does a row say differs when both values look the same?",
        answer: "Usually the types differ, for example the string \"5\" in one object and the number 5 in the other. The table shows string values without quotes, so check the raw JSON to see which one is quoted.",
      },
    ],
  },

  "json/to-csharp": {
    about: [
      "When you call a REST API from a .NET app, you need C# classes that match the JSON response before you can deserialize it. Writing those by hand is slow and error-prone for large payloads; this tool generates them from a sample response in one step.",
      "Paste a real response and set a root class name. Each nested object becomes its own public class named from its JSON key in PascalCase (an \"address\" object becomes Address), and property names are converted to PascalCase as well. Whole numbers map to int, numbers with a fractional part to double, true/false to bool, text to string, and arrays to List<T> based on the first item. Null values and empty arrays become object and List<object>, since their type can't be inferred.",
      "Review the result before using it. JSON parsing treats 10.0 as 10, so a price field may come out as int — change it to decimal for money. IDs above 2,147,483,647 need long.",
    ],
    faq: [
      {
        question: "Why is a decimal field generated as int?",
        answer: "The type is inferred from the sample value, and a value like 10 or 10.0 is a whole number once parsed. Use a sample where the field has a fractional part, or change the property to double or decimal by hand.",
      },
      {
        question: "How are snake_case JSON keys like first_name handled?",
        answer: "They become PascalCase properties such as FirstName, without attributes. With System.Text.Json, add [JsonPropertyName(\"first_name\")] or use JsonNamingPolicy.SnakeCaseLower (available in .NET 8 and later) so the names match during deserialization.",
      },
      {
        question: "What type is used when a value is null in the sample?",
        answer: "Null values are generated as object because the real type can't be known. Replace it with the correct nullable type, such as string? or int?, once you know what the field holds.",
      },
    ],
  },

  "json/to-excel": {
    about: [
      "Exporting JSON to Excel is a common step when someone who doesn't work with code needs to read API data — a sales export, a list of users, or survey results that a manager wants to filter and chart. This tool turns a JSON array of objects into a real .xlsx workbook without uploading the data anywhere.",
      "Each object becomes a row and each key becomes a column. Columns are collected from every object in the order they first appear, so if some records have extra fields, those columns are still created and left blank where a value is missing. Nested objects are flattened into dotted column names like customer.email, and arrays inside a record are written into a single cell as JSON text. A single object at the top level becomes a one-row sheet.",
      "Check the preview table before downloading; if a column holds JSON text, consider flattening that array in your data first. The download is saved as converted.xlsx with one sheet named Sheet1.",
    ],
    faq: [
      {
        question: "What happens to arrays inside my JSON objects?",
        answer: "An array value, such as a list of tags, is written into one cell as JSON text like [\"a\",\"b\"]. If you need each item in its own row, restructure the data into a flat array of objects before converting.",
      },
      {
        question: "What if my objects don't all have the same keys?",
        answer: "The sheet includes a column for every key found in any object. Rows that don't have that key simply get an empty cell.",
      },
      {
        question: "Can I open the file in Google Sheets?",
        answer: "Yes. Upload converted.xlsx to Google Drive and open it with Google Sheets, or use File > Import inside an existing spreadsheet.",
      },
    ],
  },

  "json/to-kotlin": {
    about: [
      "Android and Kotlin backend developers need data classes that mirror the JSON their app receives before they can parse it with Gson, Moshi or kotlinx.serialization. Pasting a sample API response here gives you a starting set of classes in seconds instead of typing every field by hand.",
      "Each JSON object becomes a data class with val properties, named after its key in PascalCase (a \"profile\" object becomes Profile), and if two objects share a name the second gets a number suffix such as Profile2. Property names are converted to camelCase. Whole numbers become Int, numbers with a fractional part become Double, true/false becomes Boolean, text becomes String, and arrays become List<T> based on the first element. Null values and empty arrays fall back to Any? and List<Any?>.",
      "For a typical REST response, rename the root class from Root to something meaningful like UserResponse, then fix any Int fields that hold large IDs (use Long) or prices.",
    ],
    faq: [
      {
        question: "How are snake_case keys like user_id handled?",
        answer: "They are turned into camelCase properties such as userId without any annotations. Add @SerializedName(\"user_id\") for Gson, @Json(name = \"user_id\") for Moshi, or @SerialName(\"user_id\") for kotlinx.serialization so the original key is still matched.",
      },
      {
        question: "Are the generated properties nullable?",
        answer: "Only fields that are null in your sample become Any?; everything else is non-nullable. If an API can omit a field or return null, change its type to a nullable form like String? and consider adding a default value.",
      },
      {
        question: "Why is a number field generated as Int instead of Long?",
        answer: "Every whole number is mapped to Int. Values above 2,147,483,647, such as timestamps in milliseconds or large IDs, need Long, so update those properties manually.",
      },
    ],
  },
};
