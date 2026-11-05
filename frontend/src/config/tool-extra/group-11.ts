import type { ToolExtraContent } from "./types";

export const group11: Record<string, ToolExtraContent> = {
  "ai/prompt-formatter": {
    about: [
      "This prompt formatter cleans up text before you send it to ChatGPT, Claude or an LLM API. Prompts copied from Word, Google Docs, Notion or a chat window often carry trailing spaces, piles of blank lines, curly quotes and invisible non-breaking spaces, and this tool strips that noise out without touching your words.",
      "Paste the raw prompt on the left and the cleaned version appears on the right. Four toggles control the cleanup: Trim trailing spaces, Collapse blank lines (three or more line breaks become a single blank line), Collapse spaces, and Normalize smart quotes, which also turns en dashes into -, em dashes into --, the ellipsis character into ... and non-breaking spaces into normal spaces. Windows line endings are always converted to plain line feeds, and blank lines at the very start and end are removed.",
      "The character and line counts above each pane show how much was removed; on the built-in sample, the extra blank lines and trailing spaces disappear and the curly quotes and em dash become plain ASCII. Collapse spaces keeps each line's leading indentation but squeezes runs of spaces inside a line, so leave it off if your prompt contains aligned tables or columns. The cleanup runs in your browser and nothing is uploaded.",
    ],
    faq: [
      {
        question: "How do I remove extra blank lines and trailing spaces from a prompt?",
        answer: "Paste the prompt and keep Trim trailing spaces and Collapse blank lines switched on, which they are by default. Every run of two or more empty lines is reduced to one empty line, and spaces or tabs at the end of each line are removed. Copy the result from the right-hand pane.",
      },
      {
        question: "Does cleaning a prompt reduce its token count?",
        answer: "Usually a little. Redundant whitespace and characters such as curly quotes or em dashes can each take tokens, so removing or normalizing them trims the count. The saving is small for short prompts but adds up for long system prompts sent on every request; paste the before and after versions into the Prompt Token Counter to see the exact difference.",
      },
    ],
  },

  "ai/prompt-token-counter": {
    about: [
      "A prompt token counter tells you how many tokens a piece of text uses for an OpenAI model, which is what the API bills for and what counts against the model's context window. This one tokenizes your text with the same o200k_base and cl100k_base encodings OpenAI uses, so you get the real number rather than a guess based on characters.",
      "Paste your prompt and pick a model: GPT-5, GPT-4o, GPT-4.1, o1 / o3 / o4-mini, GPT-4 / GPT-4 Turbo or GPT-3.5 Turbo. The tool shows tokens, characters, words and the average characters per token, plus a bar showing what share of the model's context window the text fills, using the window sizes built into the tool, such as 128,000 tokens for GPT-4o. Use it to keep system prompts lean, check long documents before sending them, or estimate cost from a per-token price.",
      "Example: the built-in sample sentence has 136 characters and 21 words and comes to 23 tokens, about 5.9 characters per token. Language matters more than you might expect: a short Hindi sentence of 43 characters is 13 tokens with o200k_base but 44 tokens with cl100k_base. Counting happens in your browser, so the prompt is never uploaded.",
    ],
    faq: [
      {
        question: "How many tokens is 1,000 words?",
        answer: "For ordinary English prose, OpenAI's rule of thumb is that one token is about three quarters of a word, so 1,000 words is roughly 1,300 to 1,400 tokens. Code, URLs, numbers and non-English text usually take more tokens per word. Paste your actual text here to get the exact figure.",
      },
      {
        question: "Does the context window include the model's reply?",
        answer: "Yes. The context window covers the input and the generated output together, so a prompt that fills 95% of the window leaves little room for the answer. Leave headroom for the response and for the few extra tokens the API adds per chat message, which this counter does not include.",
      },
      {
        question: "Why does my Hindi or other non-English text use so many tokens?",
        answer: "Tokenizers are trained mostly on English, so other scripts are split into smaller pieces. The newer o200k_base encoding used by GPT-4o, GPT-4.1, GPT-5 and the o-series handles many languages far more efficiently than cl100k_base. Switch the model selector to compare the two on your own text.",
      },
    ],
  },

  "ai/openai-schema-validator": {
    about: [
      "This OpenAI schema validator checks a JSON Schema against the rules of OpenAI structured outputs and strict function calling before you send it to the API. A schema that is valid JSON Schema can still be rejected in strict mode, and the error you get back from the API is not always clear about where the problem is.",
      "Paste the schema object itself, meaning the value under schema in a response_format, or under parameters in a function definition. The tool reports each problem with its path, such as root.address.city, and labels it as an error, warning or info. It checks additionalProperties and required on every object, follows local $ref links into $defs, walks anyOf branches and array items, flags unsupported formats and keywords, and counts properties, nesting depth and enum values.",
      "For example, an object with properties name and email but \"required\": [\"name\"] gets an error saying email is missing from required. The tool warns when nesting goes past 5 levels, total properties past 100 or enum values past 500, the limits it is built around; confirm them against OpenAI's current documentation. Validation runs in your browser, so the schema is not uploaded.",
    ],
    faq: [
      {
        question: "Can I use anyOf and enum in an OpenAI strict schema?",
        answer: "Both are commonly used in structured outputs. The validator checks every anyOf branch (and oneOf or allOf branches) as its own schema, so a missing additionalProperties inside a branch is still caught, and it adds up enum values across the whole schema so you can see how close you are to the 500-value limit it checks.",
      },
      {
        question: "What does the info message about a type array mean?",
        answer: "It appears when a property uses a type array such as [\"string\", \"null\"]. That pattern is the usual way to make a field nullable and is not an error. The message is a suggestion for unions of genuinely different types, such as a string or an object, which are clearer written as anyOf with a separate schema for each case.",
      },
      {
        question: "Why does it warn about minLength, pattern or minimum?",
        answer: "These keywords are on the validator's list of constraints that strict mode may ignore or reject, and OpenAI's support for them has changed over time. They are reported as warnings rather than errors. Check OpenAI's current docs, and if a constraint matters, validate the model's output in your own code as well.",
      },
    ],
  },

  "ai/embedding-token-counter": {
    about: [
      "An embedding token counter checks whether a piece of text fits the input limit of an OpenAI embedding model before you call the API. Requests over the limit fail, so counting first saves failed calls and half-finished indexing jobs when you embed documents for semantic search, RAG or recommendations.",
      "Paste the text you plan to embed and choose text-embedding-3-small, text-embedding-3-large or the legacy text-embedding-ada-002. The tool counts tokens with the cl100k_base encoding these models share and compares the total with the 8,191-token limit it uses for each of them. A badge shows Within limit or Exceeds limit, and a bar shows how much of the limit the text uses.",
      "A useful habit is to check your largest chunk rather than a typical one. At roughly four characters per token for English prose, 8,191 tokens is about 32,000 characters, but tables, code and non-English text use more tokens per character and can go over sooner. Counting happens in your browser and the text is not uploaded.",
    ],
    faq: [
      {
        question: "How big should my chunks be for embeddings?",
        answer: "Most retrieval setups use chunks far smaller than the limit, often a few hundred to about a thousand tokens, with a small overlap between neighbouring chunks so sentences are not cut off from their context. Smaller chunks give more precise matches; larger ones keep more context together. Paste a sample chunk here to check its size.",
      },
      {
        question: "Does the limit apply to a whole batch or to each input?",
        answer: "This tool treats everything you paste as one input and checks it against the per-input limit. When you send an array of texts to the embeddings API, each text is checked against the model's limit separately, and the API also has its own limits on the request as a whole, so check OpenAI's documentation for large batches.",
      },
    ],
  },

  "random-generators/random-credit-card": {
    about: [
      "This random credit card generator creates fake card numbers for testing payment forms, card-type detection and input masks. Each number has a real network prefix and length and a correct Luhn check digit, so it passes the same format checks a checkout page runs before it ever contacts a bank.",
      "Choose Visa, Mastercard, American Express or Discover and generate 1, 3, 5 or 10 cards at a time. Visa numbers start with 4, Mastercard with 51 to 55, Amex with 34 or 37 and Discover with 6011; Amex numbers are 15 digits and shown in 4-6-5 groups, the rest are 16 digits in groups of four. Each card gets an expiry date one to five years ahead in MM/YY format, and Copy number copies the digits without spaces.",
      "To find a Luhn check digit, take the digits before it, double every second one starting from the rightmost, subtract 9 from any result above 9, add everything up and pick the digit that makes the total a multiple of 10; for 411111111111111 the check digit is 1. The generator does not produce 2-series Mastercard numbers or Discover 65 numbers, so add those yourself if you test that detection. Numbers are generated in your browser.",
    ],
    faq: [
      {
        question: "Why does Stripe or Razorpay decline these test card numbers?",
        answer: "Payment gateways in test mode only accept the specific test cards they publish, such as Stripe's 4242 4242 4242 4242, because each one triggers a known response. Use this generator for front-end validation and card-type detection, and use your gateway's documented test cards for end-to-end payment tests.",
      },
      {
        question: "Can I generate RuPay or Maestro test numbers here?",
        answer: "No. The generator covers Visa, Mastercard, American Express and Discover only. For RuPay or other networks, take the test card numbers from your payment gateway's documentation, which are set up to work in its sandbox.",
      },
    ],
  },

  "decision-tools/secret-santa-generator": {
    about: [
      "This Secret Santa generator draws names for an office, family or friends gift exchange. It assigns every person someone to buy for, makes sure nobody draws their own name, and with three or more people also avoids two people drawing each other. It replaces drawing names from a hat, and works on one shared phone or laptop.",
      "Type one name per line and click Generate Secret Santa Pairs. You need at least two names, and names must be unique; the check ignores capital letters, so Alex and alex count as the same person. The result is a set of cards, one per giver in the order you typed them. Each person taps their own card to see who they are gifting, then taps again to hide it before passing the device on.",
      "With 3 people the draw always forms one loop, for example Alex gifts Jordan, Jordan gifts Taylor and Taylor gifts Alex. The pairs are not saved anywhere, so refreshing the page or clicking Generate again creates a new draw; make sure everyone has seen their card first. The draw happens in your browser and no names are sent anywhere.",
    ],
    faq: [
      {
        question: "How do I do Secret Santa with only 2 or 3 people?",
        answer: "With 2 people the only possible draw is that each buys for the other, so there is no surprise about who your Santa is. With 3 people the generator always makes a single loop, so nobody is paired back with the person buying for them. Four or more people gives the most variety.",
      },
      {
        question: "Can I run a Secret Santa draw for a remote team?",
        answer: "The tool has no email or messaging feature, so someone has to pass on each result. The simplest way is for the organizer to reveal one card at a time and send each person their match privately, accepting that the organizer will know the pairs, or to pass a shared screen around on a video call with only the giver looking.",
      },
      {
        question: "How do I redo the draw if someone drops out?",
        answer: "Remove or add the name in the list and click Generate Secret Santa Pairs again. This creates a completely new random draw for everyone, so let all participants know their earlier match no longer applies.",
      },
    ],
  },

  "savings-calculators/fd-calculator": {
    about: [
      "This FD calculator works out the maturity value of a fixed deposit and the fixed deposit interest you will earn. Enter the amount, the bank's interest rate and the tenure, and it shows the maturity value, the principal and the interest earned, so you can compare banks, tenures and payout choices quickly.",
      "Pick the currency, choose annual, half-yearly, quarterly or monthly compounding, type the deposit amount, and set the rate (1% to 12% a year) and the tenure (1 to 10 years) with the sliders. The result updates as you move them. It is handy for comparing a bank FD with a corporate deposit or for seeing how much a longer tenure adds.",
      "The calculator uses Maturity = P \u00D7 (1 + r/n)^(n \u00D7 t). For \u20B92,00,000 at 7.5% for 3 years, quarterly compounding gives about \u20B92,49,943, monthly gives \u20B92,50,289 and annual gives \u20B92,48,459. The tenure is in whole years, so for a deposit such as 444 days, use the formula with t = 444 / 365. It runs in your browser, and the result is an estimate before tax.",
    ],
    faq: [
      {
        question: "Does compounding frequency make a big difference to FD returns?",
        answer: "It makes a small difference. On \u20B92,00,000 at 7.5% for 3 years, monthly compounding earns about \u20B9346 more than quarterly, and quarterly earns about \u20B91,484 more than annual. The interest rate and tenure matter far more than the compounding option.",
      },
      {
        question: "What is the effective annual yield of an FD?",
        answer: "The effective yield is the rate you actually earn in a year once compounding is included: (1 + r/n)^n \u2212 1. A 7.5% FD compounded quarterly yields about 7.71% a year. Banks sometimes quote this figure next to the headline rate, so check which one you are comparing.",
      },
    ],
  },

  "savings-calculators/rd-calculator": {
    about: [
      "An RD calculator shows how much a recurring deposit will be worth at maturity when you save a fixed amount every month. It gives the maturity value, the total you deposit and the RD interest earned, which helps you set a monthly amount for a goal such as a holiday, a gadget or an emergency fund.",
      "Choose the currency, enter the monthly deposit, and set the interest rate (1% to 12% a year) and the tenure in months (3 to 120) with the sliders. The calculator assumes each instalment is paid at the start of the month and the balance compounds monthly. It is useful for comparing tenures or checking whether a bank's maturity figure looks right.",
      "Example: \u20B95,000 a month at 6.5% for 24 months adds up to \u20B91,20,000 in deposits and matures at about \u20B91,28,473, so the interest is about \u20B98,473. Each month the balance plus the new instalment is multiplied by 1 + 6.5% / 12. Missed instalments and late-payment penalties are not modelled. Everything is calculated in your browser.",
    ],
    faq: [
      {
        question: "How much will I get if I deposit \u20B95,000 per month in an RD for 2 years?",
        answer: "At 6.5% a year, \u20B95,000 a month for 24 months matures at about \u20B91,28,473 in this calculator: \u20B91,20,000 deposited plus about \u20B98,473 interest. Your bank's figure may differ slightly because many banks compound RDs quarterly and the rate depends on the tenure you pick.",
      },
      {
        question: "Why does an RD earn less interest than an FD of the same total?",
        answer: "In an RD only the first instalment earns interest for the full tenure; the last one earns interest for a single month. If you put \u20B91,20,000 in a 2-year FD at 6.5% compounded monthly instead, it would grow to about \u20B91,36,611, roughly \u20B916,611 of interest against about \u20B98,473 for the RD. An RD suits money you save from each month's income.",
      },
    ],
  },

  "savings-calculators/ppf-calculator": {
    about: [
      "A PPF calculator estimates how much your Public Provident Fund account will be worth at maturity. Enter how much you put in each year, the PPF interest rate and how long you keep the account, and it shows the maturity amount, total deposits and interest earned.",
      "Pick the currency, type your yearly contribution, set the interest rate (5% to 10%, default 7.1%) and choose a tenure from 15 to 50 years. The rate is set by the government and revised from time to time, so check the latest official rate and enter it. Moving the tenure past 15 years shows what extending the account in 5-year blocks, while continuing to contribute, could add.",
      "The calculator adds each year's contribution at the start of the year and compounds annually. \u20B91,50,000 a year at 7.1% for 15 years means \u20B922,50,000 deposited and a maturity value of about \u20B940,68,209; continuing for 20 years gives about \u20B966,58,288. PPF interest is worked out on the lowest balance between the 5th and the end of each month, so deposits made later in the year earn less than shown. It runs in your browser.",
    ],
    faq: [
      {
        question: "How much will I get if I invest \u20B91.5 lakh in PPF every year for 15 years?",
        answer: "At 7.1% a year, the calculator's default, \u20B91,50,000 deposited at the start of every year for 15 years grows to about \u20B940,68,209. That is \u20B922,50,000 of your money and about \u20B918,18,209 of interest. The actual amount depends on the rates announced over those 15 years.",
      },
      {
        question: "Can I use the PPF calculator for monthly deposits?",
        answer: "The calculator takes one yearly figure, so enter your monthly amount multiplied by 12, for example \u20B912,500 \u00D7 12 = \u20B91,50,000. Expect the real result to be somewhat lower than shown, because money paid in month by month earns interest for less time than a single deposit at the start of the year.",
      },
    ],
  },

  "savings-calculators/epf-calculator": {
    about: [
      "An EPF calculator projects how big your Employees' Provident Fund corpus could be when you retire. It combines your own and your employer's monthly contributions, your salary growth and the EPF interest rate to show the corpus, total contributions and interest earned. Use it to see what your PF could be worth at 58 or 60, or how much a job change or raise affects it.",
      "Enter your monthly basic salary plus DA and any existing EPF balance, set the employee and employer contribution (1% to 20% each, default 12%), the EPF interest rate (default 8.25%; check the latest rate declared by EPFO), your expected yearly salary increase and the years left to retirement. Raising the employee share above 12% is a simple way to see the effect of voluntary contributions.",
      "Each year the calculator adds salary \u00D7 (employee% + employer%) \u00D7 12 to the balance, compounds it once at the interest rate and then raises the salary. With the defaults, \u20B930,000 basic, 12% + 12%, 8.25%, 5% raises and 25 years, the first year's contribution is \u20B986,400 and the corpus reaches about \u20B91,11,36,022. Because a full year's money is added up front and the pension (EPS) share of the employer contribution is not separated, treat this as an upper estimate. It runs in your browser.",
    ],
    faq: [
      {
        question: "How much EPF will I have on a \u20B930,000 basic salary?",
        answer: "With 12% from you and 12% from your employer, 8.25% interest, 5% yearly raises and 25 years of service, this calculator projects about \u20B91.11 crore, of which about \u20B941.2 lakh is contributions and about \u20B970.1 lakh is interest. The real figure will be lower once the EPS share and monthly crediting are taken into account.",
      },
      {
        question: "How is EPF interest actually calculated?",
        answer: "EPFO works out interest on the monthly running balance and credits it to your account once a year. This calculator simplifies that to one annual compounding step on the whole year's contributions, which is why it comes out slightly higher than a month-by-month calculation.",
      },
      {
        question: "Why does my EPF passbook balance not match the calculator?",
        answer: "Common reasons are the employer's EPS share going to the pension fund instead of your EPF account, contributions calculated on a capped wage rather than your full basic, salary changes during the year and differences in the interest rate declared each year. Enter your current passbook balance as the starting balance to keep the projection close to reality.",
      },
    ],
  },

  "savings-calculators/nps-calculator": {
    about: [
      "An NPS calculator estimates the corpus you could build in the National Pension System and the pension it could pay. Enter a monthly contribution and an expected return, and it shows the corpus at retirement, how much of it you could take as a lump sum, and an estimated monthly pension from the annuity part.",
      "Set the monthly contribution, the expected return (1% to 15%), the years to retirement (1 to 40), the share of the corpus used to buy an annuity (40% to 100%) and the annuity rate (3% to 10%). The 40% floor and the default rates are the calculator's settings; check current NPS exit rules and annuity quotes before relying on them. It is useful for testing how contribution size, years and return change the outcome.",
      "Contributions compound monthly until retirement. The pension is then worked out as annuity corpus \u00D7 annuity rate \u00F7 12. With \u20B95,000 a month at 10% for 25 years, \u20B915,00,000 of contributions grows to about \u20B966,89,452; 40% buys an annuity paying about \u20B913,379 a month at 6%, leaving about \u20B940,13,671 as a lump sum. Pensions are fixed in rupees, so inflation will reduce what they buy over time. It runs in your browser.",
    ],
    faq: [
      {
        question: "How much pension will I get from NPS with \u20B95,000 a month?",
        answer: "Using the calculator defaults of 10% return for 25 years, 40% annuity and a 6% annuity rate, about \u20B913,379 a month, plus a lump sum of about \u20B940.1 lakh. Actual returns depend on your fund choices and market performance, and annuity rates depend on the insurer and plan.",
      },
      {
        question: "What happens if I use more than 40% of the corpus for the annuity?",
        answer: "The pension rises and the lump sum shrinks. In the example above, putting 100% of the \u20B966,89,452 corpus into a 6% annuity gives about \u20B933,447 a month with no lump sum. Move the annuity slider to see the balance that suits you.",
      },
    ],
  },

  "savings-calculators/sukanya-calculator": {
    about: [
      "A Sukanya Samriddhi calculator, or SSY calculator, estimates how much a Sukanya Samriddhi Yojana account opened for a girl child will be worth at maturity. It shows the maturity value, the total you deposit and the interest earned, which helps parents decide how much to set aside each year for a daughter's higher education or other long-term needs.",
      "Enter the yearly deposit (the input notes the \u20B91.5 lakh maximum), set the interest rate (5% to 10%, default 8.2%; check the current rate announced by the government), the number of years you deposit (5 to 15) and when the account matures (15 to 21 years from opening). If you pay in monthly, enter the yearly total.",
      "Deposits are added at the start of each year and compounded annually; after the deposit years end, the balance keeps compounding until maturity. \u20B950,000 a year at 8.2% for 15 years is \u20B97,50,000 of deposits, which grows to about \u20B914,91,996 by year 15 and about \u20B923,94,040 at year 21. The rate can change many times over 21 years, so treat the result as an estimate. It runs in your browser.",
    ],
    faq: [
      {
        question: "How much will I get if I deposit \u20B950,000 a year in Sukanya Samriddhi?",
        answer: "At 8.2% a year, \u20B950,000 deposited each year for 15 years matures at about \u20B923,94,040 after 21 years in this calculator. You put in \u20B97,50,000 and the remaining \u20B916,44,040 or so is interest, most of it earned in the later years.",
      },
      {
        question: "Why do the last six years add so much to the maturity value?",
        answer: "After deposits stop, the full balance keeps compounding. In the example, the account holds about \u20B914.9 lakh at year 15 and reaches about \u20B923.9 lakh at year 21 without any new money, which is why keeping the account until maturity matters.",
      },
    ],
  },

  "retirement-calculators/retirement-calculator": {
    about: [
      "A retirement calculator answers two questions: how big a retirement corpus you need, and how much you must invest each month to build it. It starts from what you spend today, inflates it to your retirement year and works out a corpus that can fund those expenses until your chosen life expectancy.",
      "Enter your current monthly expenses, current age, retirement age and life expectancy, then set inflation (2% to 12%), the return you expect before retirement (4% to 16%) and the return after retirement (2% to 12%). The results are the corpus needed, your monthly expense at retirement and the required monthly SIP. Try a few retirement ages to see how much each extra working year helps.",
      "The corpus is the present value of your inflated monthly expense over the retirement months, discounted at the post-retirement return minus inflation. With the defaults, \u20B950,000 a month at age 30, retiring at 60, living to 85, 6% inflation, 11% and 7% returns, expenses become about \u20B92,87,175 a month, the corpus needed is about \u20B97.62 crore and the SIP is about \u20B926,923. The SIP is a flat amount; it does not step up with salary. It runs in your browser.",
    ],
    faq: [
      {
        question: "How much SIP do I need to retire at 60?",
        answer: "It depends on your expenses, age and return assumptions. For someone aged 30 spending \u20B950,000 a month, with 6% inflation, 11% returns before retirement and 7% after, the calculator suggests about \u20B926,923 a month. Starting at 35 instead of 30, or retiring earlier, raises the SIP sharply, so try your own numbers.",
      },
      {
        question: "What if my post-retirement return only matches inflation?",
        answer: "Then your money earns nothing in real terms and the corpus must cover every month of spending in full: future monthly expense \u00D7 number of retirement months. In the default example that is about \u20B92,87,175 \u00D7 300 months, or roughly \u20B98.62 crore, compared with \u20B97.62 crore when returns beat inflation by 1%.",
      },
    ],
  },

  "retirement-calculators/fire-calculator": {
    about: [
      "A FIRE calculator works out your FIRE number, the corpus you need for Financial Independence, Retire Early, and how many years it will take to get there. It is built on the safe withdrawal rate idea: if you withdraw a small, fixed share of your portfolio each year, it should last for a very long retirement.",
      "Enter your current annual expenses, a safe withdrawal rate between 2% and 6%, your current savings and investments, how much you save each month and the expected annual return. The FIRE number is annual expenses divided by the withdrawal rate, and the timeline adds your monthly savings to a balance that grows each month until it reaches that number.",
      "With \u20B96,00,000 of yearly expenses and a 4% rate, the FIRE number is \u20B91.5 crore. Starting from \u20B95,00,000 and saving \u20B930,000 a month at 10%, it takes about 15.3 years. The target is in today's money but the growth uses your nominal return, so for a fairer timeline enter a return minus inflation: at 4%, the same plan takes about 23.3 years. It runs in your browser.",
    ],
    faq: [
      {
        question: "How much money do I need to retire early in India?",
        answer: "A common starting point is 25 to 33 times your annual expenses, which matches a 4% to 3% withdrawal rate. Spending \u20B96 lakh a year, that is \u20B91.5 crore at 4% or about \u20B91.71 crore at 3.5%. Many Indian FIRE planners lean towards the lower withdrawal rates because inflation and early retirement mean the money must last longer.",
      },
      {
        question: "What does 100+ yrs mean in the result?",
        answer: "The calculator stops at 100 years. If your savings and returns are too low to reach the FIRE number within that time, it shows 100+ yrs instead of a figure. Increase monthly savings, lower your expenses or check that the return is not set too low.",
      },
    ],
  },

  "retirement-calculators/pension-calculator": {
    about: [
      "A pension calculator estimates the monthly pension you could draw from your own savings. It grows your monthly contributions until retirement, then turns the corpus into equal monthly payments over the payout period you choose, the way a fixed-term annuity or systematic withdrawal plan works.",
      "Enter the monthly contribution, the expected return before retirement (1% to 15%), the years to retirement (1 to 40), the payout period (5 to 35 years) and the annuity rate earned during payout (2% to 10%). It shows the corpus at retirement and the estimated monthly pension. Unlike the NPS calculator, which pays interest only and keeps the annuity corpus intact, this one spends the corpus down to zero by the end of the payout period.",
      "The pension uses the loan EMI formula in reverse: corpus \u00D7 i \u00F7 (1 \u2212 (1 + i)^\u2212n), where i is the monthly annuity rate and n the payout months. With \u20B95,000 a month at 9% for 25 years, the corpus is about \u20B956,47,652, and spreading it over 20 years at 6% gives about \u20B940,462 a month. The payment stays flat, so its buying power falls with inflation. It runs in your browser.",
    ],
    faq: [
      {
        question: "How much monthly pension will \u20B950 lakh give?",
        answer: "Spread over 20 years at 6% a year, \u20B950,00,000 supports about \u20B935,822 a month, after which the money is used up. A longer payout period or lower rate reduces the monthly amount. The calculator builds the corpus from monthly contributions, so for a lump sum you already have, use the formula in the section above.",
      },
      {
        question: "Is the pension in this calculator adjusted for inflation?",
        answer: "No. It is the same amount every month for the whole payout period. At 6% inflation, prices roughly double in 12 years, so a \u20B940,000 pension would buy about half as much by then. Plan for a higher figure or a separate growth portfolio if you want rising income.",
      },
    ],
  },

  "retirement-calculators/future-value": {
    about: [
      "A future value calculator shows what money invested today, plus optional yearly additions, will grow to after a number of years. It is the basic time-value-of-money tool behind savings goals, lump-sum investments and comparing growth rates, and it works in any currency. Use it to see what a bonus invested today could become, or how much difference two extra percentage points of return make.",
      "Choose the currency, enter the present value (the amount you start with), an optional periodic contribution per year, the annual rate (0% to 25%) and the number of years (1 to 40). The result shows the future value and the total you contributed, so the difference is the growth. Compounding is yearly, and yearly contributions are assumed to go in at the end of each year.",
      "The formula is FV = PV \u00D7 (1 + r)^n + C \u00D7 ((1 + r)^n \u2212 1) \u00F7 r. \u20B91,00,000 at 8% for 10 years grows to about \u20B92,15,892; adding \u20B910,000 at the end of each year brings it to about \u20B93,60,758 on \u20B92,00,000 contributed. For monthly SIPs, use a SIP calculator, since this one compounds yearly. It runs in your browser.",
    ],
    faq: [
      {
        question: "What is the future value of \u20B910,000 a year for 10 years at 8%?",
        answer: "Set the present value to 0, the contribution to 10,000, the rate to 8% and the years to 10. The calculator shows about \u20B91,44,866, of which \u20B91,00,000 is your money and the rest is growth, assuming each payment is made at the end of the year.",
      },
      {
        question: "How long does it take money to double?",
        answer: "Use the rule of 72: divide 72 by the annual rate. At 8% money roughly doubles in 9 years, and the calculator confirms that \u20B91,00,000 at 8% for 9 years grows to about \u20B91,99,900. At 12% it takes about 6 years.",
      },
    ],
  },

  "retirement-calculators/present-value": {
    about: [
      "A present value calculator tells you what a future sum of money is worth today. It answers questions like how much you need to invest now to reach a goal, or whether \u20B910 lakh paid in ten years is a better deal than a smaller amount paid today.",
      "Choose the currency, enter the future value (the target amount), the discount rate (0% to 25%) and the number of years (1 to 40). Use your expected investment return as the discount rate to find how much to invest today, or the inflation rate to see a future amount in today's money.",
      "The formula is PV = FV \u00F7 (1 + r)^n. \u20B910,00,000 needed in 10 years, discounted at 8%, is worth about \u20B94,63,193 today, so investing that amount now at 8% a year would reach the goal. Discounted at 6% inflation instead, the same \u20B910 lakh has the buying power of about \u20B95,58,395 today. Discounting is yearly. It runs in your browser.",
    ],
    faq: [
      {
        question: "How much should I invest today to have \u20B95 lakh in 5 years?",
        answer: "At an expected return of 7% a year, you would need about \u20B93,56,493 today. Enter 5,00,000 as the future value, 7% as the rate and 5 years to see it. A higher expected return lowers the amount needed, but also usually means more risk.",
      },
      {
        question: "What is \u20B910 lakh in 10 years worth in today's money?",
        answer: "It depends on inflation. At 6% a year, \u20B910,00,000 in 10 years buys about what \u20B95,58,395 buys today. This is a useful check when a goal, salary offer or insurance payout is quoted in future rupees.",
      },
    ],
  },

  "tax-calculators/income-tax-calculator": {
    about: [
      "This income tax calculator for India compares the tax on your salary or income under the new tax regime and the old tax regime side by side and marks which one is lower. It is a quick way to answer the new vs old regime question before you declare your choice to your employer.",
      "Enter your gross annual income and, for the old regime, your total deductions such as 80C, 80D and home loan interest. The calculator subtracts a \u20B950,000 standard deduction in both regimes, applies the slab rates built into it, the Section 87A rebate (for taxable income up to \u20B97 lakh in the new regime and \u20B95 lakh in the old) and 4% cess. Slabs and limits change with each Budget, so check the latest official figures.",
      "With the defaults, \u20B912,00,000 income and \u20B91,50,000 deductions, the new regime tax is \u20B975,400 and the old regime tax is \u20B91,17,000. The rebate is applied as a cliff: \u20B97,50,000 income shows zero tax in the new regime but \u20B97,60,000 shows \u20B921,840, as marginal relief and surcharge are not modelled. It runs in your browser and is an estimate, not tax advice.",
    ],
    faq: [
      {
        question: "How much deduction do I need for the old regime to be better?",
        answer: "It depends on your income. In this calculator, at \u20B910,00,000 income the old regime wins with \u20B93,50,000 of deductions: \u20B933,800 against \u20B946,800 under the new regime. With only \u20B91,50,000 of deductions the new regime is cheaper. Enter your own figures to find your break-even point.",
      },
      {
        question: "Does the income tax calculator include surcharge?",
        answer: "No. It covers slab tax, the 87A rebate and 4% cess only, so the estimate will be too low for high incomes where surcharge applies. It also does not handle capital gains, which are taxed separately and have their own calculator.",
      },
    ],
  },

  "tax-calculators/gst-calculator": {
    about: [
      "A GST calculator adds GST to a price or works out how much GST is included in a price. It gives the base amount, the GST amount and the total, which is useful for quoting prices, checking invoices and understanding the tax inside an MRP.",
      "Enter the amount in rupees, pick the GST rate from the list (0%, 3%, 5%, 12%, 18% or 28%) and choose Add GST if the amount is before tax, or Remove GST if it already includes tax. GST rates are revised by the GST Council from time to time, so confirm the current rate for your product or service first.",
      "Adding GST: base \u00D7 rate. \u20B910,000 at 18% gives \u20B91,800 of GST and a total of \u20B911,800. Removing GST: base = total \u00F7 (1 + rate), so \u20B911,800 \u00F7 1.18 = \u20B910,000 and the GST is \u20B91,800. A common mistake is taking 18% of the total, which gives \u20B92,124 and overstates the tax. It runs in your browser.",
    ],
    faq: [
      {
        question: "How do I calculate 18% GST on an amount?",
        answer: "Multiply the amount by 0.18 for the GST, or by 1.18 for the total. On \u20B92,500, GST is \u20B9450 and the total is \u20B92,950. In the calculator, enter 2,500, choose 18% and select Add GST.",
      },
      {
        question: "What if my GST rate is not in the list?",
        answer: "The calculator offers 0%, 3%, 5%, 12%, 18% and 28% only. For any other rate, use the same formulas by hand: GST = amount \u00D7 rate \u00F7 100 when adding tax, and base = total \u00F7 (1 + rate \u00F7 100) when removing it.",
      },
    ],
  },

  "tax-calculators/hra-calculator": {
    about: [
      "An HRA calculator works out how much of your House Rent Allowance is exempt from tax and how much is taxable. It is useful when you choose between tax regimes, plan your rent declaration for your employer or check the HRA exemption figure shown on your Form 16 at the end of the year.",
      "Enter your monthly basic salary, monthly HRA received and monthly rent paid, and choose Metro (Delhi, Mumbai, Kolkata, Chennai) or Non-metro. The calculator multiplies each figure by 12 and shows the annual exemption and the annual taxable HRA. If your basic salary includes DA that counts for retirement benefits, include it in the basic figure.",
      "The exemption is the lowest of three figures. With the defaults, \u20B940,000 basic, \u20B920,000 HRA and \u20B918,000 rent in a metro, those are \u20B92,40,000 HRA received, \u20B92,16,000 rent minus \u20B948,000 (10% of basic) = \u20B91,68,000, and \u20B92,40,000 (50% of basic). The exemption is \u20B91,68,000 and \u20B972,000 is taxable. It runs in your browser and is an estimate, not tax advice.",
    ],
    faq: [
      {
        question: "How much HRA exemption can I claim on \u20B918,000 rent?",
        answer: "It depends on your basic salary and HRA. With a \u20B940,000 basic, \u20B920,000 HRA and a metro city, the exemption is \u20B91,68,000 a year, because rent minus 10% of basic is the lowest of the three figures. Paying more rent would raise the exemption until it hits the HRA received or 50% of basic.",
      },
      {
        question: "Why is my HRA exemption zero?",
        answer: "If your rent is no more than 10% of your basic salary, the rent-minus-10%-of-basic figure is zero, so the exemption is zero. With a \u20B940,000 monthly basic, rent must be above \u20B94,000 a month before any HRA becomes exempt.",
      },
      {
        question: "What if my rent or salary changed during the year?",
        answer: "The calculator assumes the same figures for all 12 months. HRA exemption is worked out for each period separately, so run the calculator once for each period, scale each annual result by the number of months it covers and add them together.",
      },
    ],
  },

  "tax-calculators/capital-gains-calculator": {
    about: [
      "A capital gains calculator works out the profit or loss when you sell shares, mutual funds, property, gold or other assets, and whether it counts as short-term or long-term. The classification matters because short-term and long-term capital gains (STCG and LTCG) are taxed differently in India.",
      "Pick the asset type, enter the purchase and sale price and the purchase and sale dates. The calculator shows the gain or loss, the holding period in months and the classification, using 12 months for equity, 24 months for property and 36 months for other assets. A note below gives the tax rate it assumes, such as 12.5% LTCG above \u20B91.25 lakh for equity; check current rules before filing.",
      "The gain is sale price minus purchase price, and months are days held \u00F7 30.44. With the defaults, \u20B91,00,000 bought on 15 Jan 2023 and sold for \u20B91,50,000 on 15 Jun 2025 is a \u20B950,000 gain over about 29 months: long-term for equity or property but short-term for other assets. Brokerage and stamp duty are not deducted, so include them in the prices. It runs in your browser and is not tax advice.",
    ],
    faq: [
      {
        question: "How do I calculate capital gains on shares?",
        answer: "Subtract what you paid from what you received. For a fair figure, add brokerage and other buying costs to the purchase price and subtract selling costs from the sale price before entering them. Choose Equity, enter both dates, and the calculator tells you whether the gain is short-term or long-term.",
      },
      {
        question: "Why is my sale just under a year showing as short-term?",
        answer: "The calculator counts months as days held divided by 30.44. A purchase on 15 Jan 2024 sold on 10 Jan 2025 is 361 days, or 11.9 months, so it is short-term for equity. If you are close to the threshold, check the exact dates carefully before selling.",
      },
    ],
  },

  "tax-calculators/tds-calculator": {
    about: [
      "A TDS calculator works out how much tax to deduct at source from a payment and how much to pay the recipient. It is handy for businesses and accounts teams paying freelancers, landlords and contractors, and for freelancers who want to check that the amount credited to them matches the invoice minus TDS.",
      "Enter the payment amount and choose a section: 194J professional fees (10%), 194I rent (10%), 194C contractors (2%), 194H commission (5%), 194A interest (10%), or Custom rate for a slider from 0% to 30%. These are the rates built into the calculator; actual rates depend on the payee type, PAN and thresholds, so check the current TDS rate chart. The salary option shows 0% because salary TDS depends on slabs; use the Income Tax Calculator for that.",
      "TDS = amount \u00D7 rate, and net payable = amount \u2212 TDS. A \u20B950,000 professional fee at 10% means \u20B95,000 of TDS and \u20B945,000 paid to the professional. When GST is shown separately on the invoice, TDS is usually worked out on the amount before GST, so enter that figure. It runs in your browser and is a quick reference, not tax advice.",
    ],
    faq: [
      {
        question: "How much TDS is deducted on a \u20B950,000 professional fee?",
        answer: "With the 10% rate the calculator uses for Section 194J professional fees, TDS is \u20B95,000 and the professional receives \u20B945,000. The deducted amount shows in their Form 26AS and counts towards their tax when they file a return.",
      },
      {
        question: "How do I calculate TDS on a contractor payment?",
        answer: "Choose the 194C contractor option, which uses 2%, and enter the payment amount. On \u20B980,000 that gives \u20B91,600 of TDS and \u20B978,400 payable. If the applicable rate for the payee is different, pick Custom rate and set it with the slider.",
      },
    ],
  },

  "tax-calculators/salary-calculator": {
    about: [
      "A salary calculator breaks your CTC into monthly salary components: basic, HRA, other allowances, gross salary, employee PF and net pay before income tax. It helps you read an offer letter, see how a CTC figure turns into a monthly salary structure, and compare two offers whose CTC looks similar but whose split is different.",
      "Enter your annual CTC and set the basic salary (30% to 60% of CTC), HRA (0% to 50% of basic), employee PF (0% to 12% of basic) and monthly professional tax. The calculator assumes your CTC also includes an employer PF contribution at the same percentage, so that amount is taken out before gross salary. Adjust the sliders to match your offer letter.",
      "With the defaults, \u20B912,00,000 CTC is \u20B91,00,000 a month: basic \u20B940,000, HRA \u20B920,000, PF \u20B94,800, other allowances \u20B935,200, gross salary \u20B995,200 and net pay \u20B990,200 after PF and \u20B9200 professional tax. Income tax is not deducted here. It runs in your browser and is an estimate based on common salary splits.",
    ],
    faq: [
      {
        question: "What is the monthly salary for 12 LPA?",
        answer: "\u20B912 lakh per annum is \u20B91,00,000 a month of CTC. With 40% basic, 50% HRA and 12% PF, this calculator shows a gross salary of \u20B995,200 and \u20B990,200 after PF and professional tax, before income tax. Your in-hand pay will be lower once tax is deducted.",
      },
      {
        question: "Why is gross salary lower than CTC divided by 12?",
        answer: "CTC includes things that never reach your account as salary, such as the employer's PF contribution. This calculator removes an employer PF amount equal to the employee PF percentage from CTC before working out gross salary, so with 12% PF on a \u20B940,000 basic, gross is \u20B94,800 less than CTC per month.",
      },
    ],
  },

  "tax-calculators/take-home-salary": {
    about: [
      "A take-home salary calculator estimates your in-hand salary each month after PF, professional tax and income tax. It is the quickest way to turn a CTC offer into the amount you will actually receive in your bank account, and to compare job offers or the two tax regimes on an in-hand basis.",
      "Enter your annual CTC, the basic salary share (30% to 60% of CTC), employee PF (0% to 12% of basic), monthly professional tax and the tax regime. Income tax uses the same illustrative slabs as the Income Tax Calculator on CTC minus employee PF minus a \u20B950,000 standard deduction. There is no field for other deductions, so the old regime result ignores HRA exemption and 80C investments other than PF.",
      "With the defaults, \u20B912,00,000 CTC, 40% basic, 12% PF and \u20B9200 professional tax, gross is \u20B91,00,000 a month, PF \u20B94,800 and tax about \u20B95,535 under the new regime, leaving about \u20B989,465. The old regime shows about \u20B982,848. Employee PF is deducted from taxable income in both regimes here, though it counts only as an old-regime deduction, so new-regime tax may be understated. It runs in your browser and is not tax advice.",
    ],
    faq: [
      {
        question: "What is the in-hand salary for a \u20B912 lakh CTC?",
        answer: "With 40% basic, 12% PF and \u20B9200 professional tax under the new regime, this calculator estimates about \u20B989,465 a month. If your CTC also includes employer PF, gratuity or insurance, your real in-hand pay will be lower, since this tool treats the whole CTC as gross salary.",
      },
      {
        question: "Why does the old regime always show lower take-home here?",
        answer: "The calculator has no input for deductions such as HRA exemption, 80C investments beyond PF, 80D or home loan interest, so the old regime is calculated with almost no deductions and its higher slab rates make the tax bigger. To compare properly, use the Income Tax Calculator with your actual deductions.",
      },
    ],
  },
};
