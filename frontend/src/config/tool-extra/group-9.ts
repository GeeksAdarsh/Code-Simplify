import type { ToolExtraContent } from "./types";

export const group9: Record<string, ToolExtraContent> = {
  "colors/gradient-generator": {
    about: [
      "This CSS gradient generator builds a linear-gradient() or radial-gradient() background visually, so you do not have to remember the syntax or guess at color stop positions. You see the gradient as you edit it and get a background declaration you can paste into any stylesheet, plus the same value written as a Tailwind arbitrary class.",
      "Start from a preset such as Sunset, Ocean or Forest, or pick your own colors. For a linear gradient, drag the angle slider from 0 to 360 degrees; for a radial gradient, choose a circle or an ellipse. Each stop has its own color and position, and you can use between 2 and 6 stops. Typical uses are hero section backgrounds, buttons, card headers and placeholder images.",
      "In CSS, 0deg points up and 90deg points right, so 90deg runs from left to right and 180deg from top to bottom. A common surprise is a sharp line instead of a smooth blend: that happens when two stops share the same position, which is also how you make deliberate stripes. The gradient is built in your browser and nothing is uploaded.",
    ],
    faq: [
      {
        question: "How do I make a gradient with a hard edge instead of a smooth blend?",
        answer: "Give two neighboring stops the same position. For example, a blue stop at 50% followed by a white stop at 50% produces a sharp split down the middle. Adding more pairs like this creates stripes.",
      },
      {
        question: "How do I apply a gradient to text?",
        answer: "Copy the background value from this tool, then add background-clip: text and color: transparent to the same element. Some browsers still need the -webkit-background-clip: text prefix, so include both for wider support.",
      },
      {
        question: "How do I make a gradient that fades to transparent?",
        answer: "Type a transparent color into a stop's text field instead of using the color picker, for example rgba(255, 255, 255, 0) or the 8-digit hex #ffffff00. Using a transparent version of the same color as the other stop avoids the grayish tint you can get with the keyword transparent in some older browsers.",
      },
    ],
  },

  "colors/palette-generator": {
    about: [
      "A color palette generator suggests colors that work together, starting from one base color you already like, such as a brand color or a color from a logo. It uses standard color wheel harmonies, so the results follow the same rules designers use for color schemes in websites, apps, slides and print.",
      "Pick a base color with the picker or type a hex code, then choose a harmony. Complementary gives 2 colors, analogous, triadic and split-complementary give 3, tetradic gives 4, and monochromatic gives 5 lightness steps of one hue. Below the palette you also get 5 darker shades and 5 lighter tints of the base color. Click any swatch to copy its hex code, or press Random base to explore.",
      "The harmonies are calculated by rotating the hue in HSL while keeping saturation and lightness the same. Because HSL lightness does not match how bright a color looks to the eye, a yellow and a blue with the same lightness value can look very different, so check text colors with a contrast checker. All calculations run locally in your browser.",
    ],
    faq: [
      {
        question: "How do I use a generated palette in CSS?",
        answer: "Store each color as a CSS custom property, for example --color-primary: #0ea5e9; on :root, and reference it with var(--color-primary). This keeps the palette in one place, so changing a color later updates the whole site.",
      },
      {
        question: "What is the 60-30-10 rule?",
        answer: "It is a common design guideline for balancing a palette: use one dominant color for about 60% of a design, a secondary color for about 30%, and an accent color for the remaining 10%. The accent is usually reserved for buttons, links and highlights.",
      },
      {
        question: "Why do some colors in my palette look much brighter than others?",
        answer: "The palette keeps the same HSL saturation and lightness for every hue, but the eye sees yellows and greens as brighter than blues and purples at the same values. Use the shades and tints rows to pick a darker or lighter version when a color stands out too much.",
      },
    ],
  },

  "colors/contrast-checker": {
    about: [
      "A color contrast checker tells you whether text will be readable against its background and whether the pair meets the WCAG accessibility guidelines. It calculates the contrast ratio between two colors, from 1:1 for identical colors up to 21:1 for black on white, and compares it with the AA and AAA thresholds that accessibility audits and many legal requirements refer to.",
      "Enter the text color and the background color as hex, rgb(), hsl() or a CSS color name, or use the color pickers. The preview shows normal, large and bold sample text in your colors, and the badges show pass or fail for each WCAG level. Use Swap colors to test the reverse combination, for example for a dark mode version of the same design.",
      "The ratio is (L1 + 0.05) / (L2 + 0.05), where L1 and L2 are the relative luminance of the lighter and darker color. For example, #767676 on white gives about 4.54:1, which is close to the lightest gray that still passes AA for normal text. Transparency is ignored, so test the final blended color. The check runs entirely in your browser.",
    ],
    faq: [
      {
        question: "What contrast ratio do buttons, icons and form borders need?",
        answer: "WCAG 2.1 success criterion 1.4.11 (Non-text Contrast) requires at least 3:1 for user interface components and meaningful graphics, such as input borders, icons and focus indicators, against the colors next to them. Button labels are text, so they follow the normal 4.5:1 or large-text 3:1 rule.",
      },
      {
        question: "Can I check a color with transparency, like rgba() or an 8-digit hex code?",
        answer: "The alpha value is dropped, so the checker treats the color as fully opaque. To test a semi-transparent color, work out the color it produces on top of its background, for example with a color picker on a screenshot, and enter that solid color instead.",
      },
      {
        question: "How do I fix a color pair that fails?",
        answer: "Darken the text color or lighten the background (or the reverse for dark themes) until the ratio reaches the level you need. Changing lightness has a much bigger effect on contrast than changing hue, so keep the same color family and adjust how light or dark it is.",
      },
    ],
  },

  "colors/color-blindness-simulator": {
    about: [
      "A color blindness simulator shows how colors and images look to people with color vision deficiency, so you can check whether a chart, map, status indicator or user interface still makes sense without full color vision. It simulates protanopia (red-blind), deuteranopia (green-blind), tritanopia (blue-blind) and achromatopsia (no color vision).",
      "The swatch table shows 8 common colors under each type, which is a quick way to see which pairs collapse into the same shade. To test your own design, choose an image such as a screenshot of a dashboard or a chart, and the tool shows the original next to all four simulated versions. Large images are scaled down to at most 480 pixels on their longest side for the preview.",
      "The simulations show the complete forms of color blindness. Milder forms such as deuteranomaly are more common, so the result is close to a worst case for those users. If two lines in a chart become the same color in the protanopia or deuteranopia view, add labels, patterns or different line styles. Images are processed in your browser and never uploaded.",
    ],
    faq: [
      {
        question: "Which colors are hard to tell apart with red-green color blindness?",
        answer: "Red and green are the classic pair, but green and orange, red and brown, and blue and purple can also look alike. Problems are worst when the two colors have similar lightness, which is why a red error and a green success badge of the same brightness are easy to confuse.",
      },
      {
        question: "Which color combinations are safe for color-blind users?",
        answer: "Blue and orange is a widely used pairing because it stays distinct for the most common types of color blindness. Colors that differ strongly in lightness, such as dark blue and light yellow, are also easy to separate. Run your palette through the simulator to confirm.",
      },
      {
        question: "Can I test a live website?",
        answer: "Take a screenshot of the page (on Windows, Windows + Shift + S; on a Mac, Command + Shift + 4) and upload it here. All four simulations are generated from the screenshot.",
      },
    ],
  },

  "qr-barcode/qr-generator": {
    about: [
      "This free QR code generator turns a link, a piece of text, a phone number or any other content into a QR code that phone cameras can scan. It is useful for putting a website address on a poster, a menu, a product label, a slide or a business card without making people type it.",
      "Type or paste your content and the code updates as you type. Choose an error correction level: Low recovers about 7% of damage, Medium 15%, Quartile 25% and High 30%. Higher levels make the code harder to break if it gets scratched, smudged or partly covered, at the cost of a denser pattern. Download the result as a PNG image to print or share.",
      "The codes made here are static: your content is stored in the pattern itself, so the code never expires and keeps working without any service in between. The trade-off is that you cannot change where it points after printing; generate a new code instead. Shorter content gives a simpler pattern that scans more easily from a distance. The code is created in your browser.",
    ],
    faq: [
      {
        question: "Do QR codes from this generator expire?",
        answer: "No. The content is encoded directly into the image, so the code works for as long as the content itself is valid, for example as long as the website it links to is online. There is no redirect service or account involved that could stop working.",
      },
      {
        question: "Can I add a logo to the middle of the QR code?",
        answer: "This tool does not add logos, but you can place one over the downloaded PNG in an image editor. Choose the High error correction level first, keep the logo small and centered, and test-scan the result with a couple of different phones before printing.",
      },
      {
        question: "Why won't my printed QR code scan?",
        answer: "Common causes are printing it too small, low contrast between the dark and light parts, a glossy surface that reflects light, and cropping away the white border around the code. Long URLs also make the pattern dense; a shorter URL gives bigger squares that scan more reliably.",
      },
    ],
  },

  "qr-barcode/qr-scanner": {
    about: [
      "This online QR code scanner reads a QR code from an image file, such as a screenshot, a photo or a saved picture, and shows the text or link inside it. It is handy when the code is already on your computer screen, in an email or in a PDF, where pointing a phone camera at it is awkward.",
      "Click the upload area and choose an image. The tool decodes it, shows the detected format, and gives you a Copy text button. If the content is an http or https link, an Open link button appears so you can visit it. The underlying decoder also reads most common barcode formats, so a product barcode in the same image can work too.",
      "The decoded text is shown exactly as stored. A Wi-Fi QR code, for example, reads like WIFI:T:WPA;S:NetworkName;P:password;; which lets you recover a network password from a photo of the code. A contact code starts with BEGIN:VCARD. Decoding happens in your browser, and the image is never uploaded.",
    ],
    faq: [
      {
        question: "How do I scan a QR code from a screenshot on my phone or computer?",
        answer: "Save or take the screenshot, open this page, and choose the image in the upload area. On most phones the file picker also lets you pick from your photo gallery or take a new photo, so you can scan a code without a separate app.",
      },
      {
        question: "Is it safe to open a link from a QR code?",
        answer: "Check the link before you open it. Fake QR codes stuck over real ones on parking meters, posters and emails are a known phishing trick. This scanner shows the full URL first, so you can confirm the domain is the one you expect before clicking Open link.",
      },
    ],
  },

  "qr-barcode/wifi-qr": {
    about: [
      "A Wi-Fi QR code generator creates a code that lets guests join your wireless network by pointing their phone camera at it, without typing a long password. It is popular for homes, offices, cafes, rental properties and events, where you can print the code and stick it on a wall or a table.",
      "Enter the network name (SSID), choose the security type and type the password. WPA/WPA2/WPA3 covers almost all modern routers; WEP is only for very old equipment, and No password is for open networks. Tick Hidden network if your router does not broadcast its name. Download the code as a PNG to print or share.",
      "The code stores a standard text string such as WIFI:T:WPA;S:MyHomeWiFi;P:secret;; and special characters like semicolons, commas, colons and quotes are escaped automatically. The network name and password are case-sensitive and must match the router exactly. If you change the Wi-Fi password, print a new code. The code is generated in your browser.",
    ],
    faq: [
      {
        question: "Where do I find my Wi-Fi network name and password?",
        answer: "They are often printed on a sticker on the router. You can also find them in the router's admin page, or on a Windows PC that is already connected: open Settings, go to Network & internet, open the Wi-Fi network properties and choose to view the security key.",
      },
      {
        question: "Why does my phone say it cannot join the network after scanning?",
        answer: "The most common cause is a typo or wrong capitalization in the network name or password, since both must match exactly. Also check that the security type is correct and that the phone is in range of the network. Generate a fresh code after fixing the details.",
      },
      {
        question: "Is the password visible to anyone who scans the code?",
        answer: "Yes. Anyone who scans it can read the password with a QR scanning app, so treat a printed code like a written password. For visitors, many routers let you set up a separate guest network and share a code for that instead.",
      },
    ],
  },

  "qr-barcode/vcard-qr": {
    about: [
      "A vCard QR code generator puts your contact details into a QR code, so people can save you to their phone contacts with one scan. It works like a digital business card and is commonly printed on business cards, name badges, flyers, conference booths and email signatures.",
      "Fill in your first and last name, organization, job title, phone, email, website and address. At least a first or last name is required, and empty fields are left out. The phone is saved as a mobile number and the address is stored as a single line. Download the code as a PNG and place it wherever people will see it.",
      "The code contains a vCard 3.0 text block that starts with BEGIN:VCARD, which iPhone and Android contact apps understand. Write the phone number in international format, such as +44 20 7946 0000, so it works for people in other countries. Avoid semicolons in the fields, because vCard uses them as separators. The code is generated in your browser.",
    ],
    faq: [
      {
        question: "How do I add a QR code to my business card?",
        answer: "Download the PNG and place it in your card design in a tool such as Canva, Word or Illustrator. Keep a white border around the code, do not stretch it, and print a test card to scan with a phone before ordering a full batch.",
      },
      {
        question: "Does the contact update if my details change?",
        answer: "No. The details are stored inside the code itself, so a printed code always contains the information it was made with. When your phone number or job changes, generate a new code and replace it on your materials.",
      },
    ],
  },

  "qr-barcode/barcode-generator": {
    about: [
      "This free barcode generator creates 1D barcodes for labels, product packaging, inventory, asset tags and shipping cartons. It supports Code 128, Code 39, EAN-13, EAN-8, UPC-A, ITF-14, Codabar, MSI and Pharmacode, and lets you download each barcode as a PNG image.",
      "Enter the value, choose the format, and decide whether to show the human-readable text under the bars. Code 128 accepts any text and is the usual choice for internal labels. Code 39 is limited to uppercase letters, digits and a few symbols, and lowercase letters are converted to uppercase. Pharmacode accepts a number from 3 to 131070. If the value does not fit the format, an error explains why.",
      "Retail formats have a check digit calculated from the other digits. If you type 12 digits for EAN-13, 11 for UPC-A, 7 for EAN-8 or 13 for ITF-14, the check digit is added for you; if you type the full length, the last digit must be correct. For example, 400638133393 becomes 4006381333931. Barcodes are drawn in your browser.",
    ],
    faq: [
      {
        question: "Can I make up my own EAN or UPC number for products?",
        answer: "You can generate a barcode for any valid number, but retailers and marketplaces expect product numbers registered with GS1, the organization that issues company prefixes. For internal stock, bins or assets that never leave your business, Code 128 with your own codes is simpler.",
      },
      {
        question: "What is the difference between Code 128 and Code 39?",
        answer: "Code 128 can encode all ASCII characters, including lowercase letters, and produces a more compact barcode for the same data. Code 39 supports only uppercase letters, digits and a few symbols, but is still required by some older systems and industries.",
      },
    ],
  },

  "date-time/unix-timestamp": {
    about: [
      "A Unix timestamp converter changes epoch time into a readable date and back again. Developers run into these numbers constantly in API responses, database columns, JWT exp and iat claims, log files and analytics events, where 1751328000 means nothing until it is converted.",
      "The current timestamp at the top updates every second. Use the Seconds or Milliseconds switch to match your value; it applies to both panels. Paste a timestamp on the left to see it in your local time, in UTC and as an ISO 8601 string, or pick a date and time on the right to get its timestamp. The Now buttons fill in the current moment.",
      "The date you pick on the right is read in your computer's time zone, so the same wall-clock time gives a different timestamp on a machine set to another zone. Negative values work for dates before 1970. Systems that store seconds in a signed 32-bit integer will overflow after 2147483647, which is 03:14:07 UTC on 19 January 2038. Everything runs in your browser.",
    ],
    faq: [
      {
        question: "How do I get the current Unix timestamp in code?",
        answer: "In JavaScript, use Math.floor(Date.now() / 1000) for seconds (Date.now() alone gives milliseconds). In Python, use int(time.time()). On Linux or macOS, run date +%s in a terminal. In PostgreSQL, use EXTRACT(EPOCH FROM now()).",
      },
      {
        question: "Why is my converted date in 1970?",
        answer: "This usually means a seconds value was treated as milliseconds, which makes it 1,000 times too small and lands a few weeks after 1 January 1970. Switch the unit to Seconds. The opposite mistake, reading milliseconds as seconds, produces a date tens of thousands of years in the future.",
      },
      {
        question: "Does Unix time include leap seconds?",
        answer: "No. Unix time treats every day as exactly 86,400 seconds and ignores leap seconds, which keeps date arithmetic simple. For almost all applications the difference does not matter.",
      },
    ],
  },

  "date-time/date-difference": {
    about: [
      "A date difference calculator counts the time between two dates, so you can see how many days, weeks or months there are until a deadline, since an event, or across a contract, notice period, project or subscription. It gives both a calendar breakdown and simple totals.",
      "Pick a start date and an end date. The result shows the difference as years, months and days, along with total days, total weeks, total hours and total minutes. You can enter the dates in either order and the calculator works out the gap from the earlier date to the later one. Typical uses include counting days until a trip, tracking notice periods and checking how long ago something happened.",
      "For example, 1 January 2025 to 18 July 2026 is 563 days, or 80 full weeks. The count runs from the start of the first date to the start of the second, so the end date itself is not included; add 1 if you need both days counted. Weekends and public holidays are counted like any other day. The calculation runs in your browser.",
    ],
    faq: [
      {
        question: "Does this calculator count working days only?",
        answer: "No. It counts every calendar day, including weekends and public holidays. As a rough estimate, multiply full weeks by 5 to get weekdays, then subtract any holidays that fall in the period.",
      },
      {
        question: "How many days until a specific date?",
        answer: "Set the start date to today and the end date to the date you are counting to. The Total days figure is the number of days left, not counting today as a full day.",
      },
      {
        question: "How do I calculate the days between two dates in Excel?",
        answer: "Subtract the earlier date from the later one, for example =B1-A1, and format the cell as a number. For whole months or years, use =DATEDIF(A1,B1,\"M\") or =DATEDIF(A1,B1,\"Y\"). Google Sheets supports the same formulas.",
      },
    ],
  },

  "date-time/age-calculator": {
    about: [
      "An age calculator works out exactly how old someone is from their date of birth, in years, months and days, rather than just subtracting one year from another. It is useful for forms, school admissions, job applications, insurance, visas and any eligibility rule based on age on a specific date.",
      "Enter the date of birth. The As of date defaults to today, but you can set it to any date, such as an exam cutoff date or the day a policy starts, to see the age on that day. Along with the exact age, you get total months, weeks and days lived, plus the number of days until the next birthday.",
      "Age is counted in completed units: someone born on 15 March 2000 is still 25 on 14 March 2026 and turns 26 the next day. Many applications ask for age as of a fixed date, so set that date instead of using today. The calculator asks for a birth date on or before the As of date, and nothing you enter leaves your browser.",
    ],
    faq: [
      {
        question: "How many days old am I?",
        answer: "Enter your date of birth and leave the As of date set to today. The Total days figure shows how many days you have lived, and Total weeks shows the same period in weeks.",
      },
      {
        question: "How do I calculate age in Excel or Google Sheets?",
        answer: "With the birth date in A1, use =DATEDIF(A1,TODAY(),\"Y\") for full years. Add months and days with =DATEDIF(A1,TODAY(),\"YM\") and =DATEDIF(A1,TODAY(),\"MD\"). Replace TODAY() with a cell reference to get the age on a different date.",
      },
    ],
  },

  "date-time/timezone-converter": {
    about: [
      "A time zone converter shows what a given date and time is in other parts of the world. It helps when you schedule meetings across offices, plan a webinar for an international audience, work with remote teammates, or need to know when a launch or deadline happens in your own time.",
      "Pick the date and time, choose the time zone it is in, then click the city chips to choose which zones to compare. Each selected zone shows the converted time in 12-hour format along with its UTC offset, such as GMT-4 or GMT+5:30. The list covers 22 common zones across the Americas, Europe, Africa, Asia and the Pacific.",
      "Offsets depend on the date. At 9:00 AM in New York in July (GMT-4) it is 6:30 PM in Kolkata, but in January (GMT-5) the same 9:00 AM is 7:30 PM, because India does not use daylight saving time. That is why zones are named by city, like America/New_York, instead of abbreviations like IST, which can mean India, Ireland or Israel. Conversions use your browser's built-in time zone data.",
    ],
    faq: [
      {
        question: "What is the best time for a meeting across time zones?",
        answer: "Enter a candidate time and compare it across everyone's zones, then look for a slot that falls within working hours for all of them. For the US and India, early morning in the US usually lines up with evening in India. Check again after daylight saving changes, since the gap can shift by an hour.",
      },
      {
        question: "What is the difference between UTC and GMT?",
        answer: "For everyday scheduling they show the same time. UTC is the precise time standard that computers and servers use, while GMT is also the name of the UK's winter time zone. In summer the UK switches to BST (GMT+1), but UTC never changes.",
      },
    ],
  },

  "date-time/cron-generator": {
    about: [
      "A cron expression generator helps you write the five-field schedule used by crontab, Kubernetes CronJobs, GitHub Actions and many job schedulers, without memorizing the syntax. You see the expression, a plain-English description and the next five run times, so you can confirm the schedule does what you intend before deploying it.",
      "Click a preset such as Every 15 minutes, Every weekday at 9am or First day of every month, or fill in the minute, hour, day of month, month and day of week fields yourself. Each field accepts *, a number, a range like 1-5, a list like 1,15 or a step like */10. Copy the finished expression into your crontab or config file.",
      "For example, 30 2 * * 0 runs at 02:30 every Sunday. Use numbers for months and weekdays, with 0 for Sunday, since names like MON and the value 7 are not accepted here. The next run times use your browser's time zone, but servers often run in UTC, and GitHub Actions schedules always do. Everything is calculated in your browser.",
    ],
    faq: [
      {
        question: "How do I add a cron job on Linux?",
        answer: "Run crontab -e, then add a line with the expression followed by the command, for example 0 9 * * 1-5 /home/user/backup.sh. Save and close the editor, and crontab -l lists your jobs. Use full paths in the command, since cron runs with a minimal environment.",
      },
      {
        question: "How do I run a cron job every 30 seconds?",
        answer: "Standard cron cannot. The smallest interval is one minute, so * * * * * is the most often a job can run. A common workaround is two entries for the same minute, where the second one runs sleep 30 before the command. A systemd timer is another option.",
      },
      {
        question: "What does */5 mean in a cron expression?",
        answer: "It means every 5th value of that field, starting from the lowest. In the minute field, */5 runs at minutes 0, 5, 10 and so on up to 55. A range with a step also works: 0-30/10 matches minutes 0, 10, 20 and 30.",
      },
    ],
  },

  "date-time/cron-parser": {
    about: [
      "A cron expression parser explains an existing cron schedule in plain English and shows when it will run next. It is useful when you inherit a crontab, review a pull request that changes a scheduled job, or debug a CI pipeline or Kubernetes CronJob that runs at the wrong time.",
      "Paste a five-field expression, or click one of the presets to see an example. If the expression is valid, you get a description, the value of each field and the next five run times. If it is not, the error names the field and the problem, such as a value out of range or the wrong number of fields.",
      "One rule trips people up: in standard cron, when both day of month and day of week are restricted, the job runs when either one matches, so 0 0 13 * 5 runs on every 13th and every Friday. The run times listed here only include dates where both match, so check expressions like that against your scheduler's documentation. Parsing happens in your browser.",
    ],
    faq: [
      {
        question: "Why does my cron job run at the wrong hour?",
        answer: "Most often the server's time zone is different from yours, frequently UTC. The run times on this page use your browser's time zone, so convert them to the server's zone. On Linux, timedatectl or date shows the system time zone.",
      },
      {
        question: "Can I use @daily, @hourly or @reboot?",
        answer: "Those shortcuts are supported by many cron implementations but not by this parser, which expects five fields. @hourly is 0 * * * *, @daily and @midnight are 0 0 * * *, @weekly is 0 0 * * 0, @monthly is 0 0 1 * * and @yearly is 0 0 1 1 *. @reboot has no five-field equivalent.",
      },
    ],
  },

  "date-time/leap-year-checker": {
    about: [
      "A leap year checker tells you whether a year has 366 days and a 29 February. Besides answering the question for a single year, it explains which divisibility rule applied, which helps when you are writing or testing date-handling code, planning around a February 29 date, or checking a historical date.",
      "Type a year to see whether it is a leap year, why, and whether February has 28 or 29 days. To list leap years, enter a From and To year; the range can span up to 1,000 years. That is useful for building test cases, counting how many 29 Februaries fall in a period, or checking the years a date-of-birth field must support.",
      "Leap years normally come every four years, but century years only count when divisible by 400. So 2024 and 2028 are leap years, 2000 was one, and 1900 was not. A classic bug is checking only year % 4 == 0, which treats 1900 and 2100 as leap years. The check runs in your browser.",
    ],
    faq: [
      {
        question: "When is the next leap year?",
        answer: "The next leap year is 2028, followed by 2032, 2036 and 2040. Enter a range in the tool to list as many future leap years as you need.",
      },
      {
        question: "How do I check for a leap year in code?",
        answer: "Use (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0, which works in JavaScript, Java, C# and most C-style languages. In Python, calendar.isleap(year) does the same check.",
      },
      {
        question: "How often does February 29 happen?",
        answer: "Leap years come every four years, except century years not divisible by 400, so there are 97 leap years in every 400 years. People born on February 29 usually celebrate on February 28 or March 1 in other years.",
      },
    ],
  },

  "text/character-counter": {
    about: [
      "A character counter shows how many characters a piece of text contains, with and without spaces, so you can stay within limits for posts, meta descriptions, SMS messages, ad headlines, form fields and database columns. It updates as you type, so you can edit until the text fits.",
      "Type or paste text into the box. Set Max length to the limit you are writing for; it starts at 280, the post length on X for standard accounts. A progress bar shows how close you are, and the counter tells you how many characters you are over. The breakdown below counts letters, digits, spaces, punctuation, uppercase and lowercase characters.",
      "The total counts every character, including spaces and line breaks. Letters means the plain English letters A to Z, so accented letters such as e with an acute accent and letters from other alphabets appear in the total but not in the Letters count. Emoji can count as two characters. All counting happens in your browser.",
    ],
    faq: [
      {
        question: "How many characters can an SMS message have?",
        answer: "A single SMS holds 160 characters using the standard GSM character set. If the message contains an emoji or a character outside that set, the whole message switches to Unicode encoding and the limit drops to 70. Longer messages are split into several parts.",
      },
      {
        question: "How long should a meta description be?",
        answer: "Around 150 to 160 characters is a common guideline. Google cuts descriptions off based on pixel width rather than an exact character count, so put the most important words first. Set Max length to 160 to keep track while you write.",
      },
    ],
  },

  "text/diff": {
    about: [
      "A text diff tool compares two pieces of text and shows exactly which lines were added, removed or left unchanged. It saves you from reading two versions side by side, and is useful for checking edits to a document, comparing config files, reviewing code snippets or spotting what changed in a contract or email draft.",
      "Paste the original into the left box and the changed version into the right. The result lists every line, marking added lines with + and removed lines with -, along with a count of each. Turn on Ignore case to treat Hello and hello as the same, or Ignore whitespace to skip differences in indentation, trailing spaces and repeated spaces. Load sample shows an example.",
      "The comparison works on whole lines, so a line with a single changed word appears as one removed line followed by one added line. If every line shows as changed even though the text looks identical, one file probably uses Windows line endings and the other Unix line endings; Ignore whitespace removes that difference. The comparison runs in your browser.",
    ],
    faq: [
      {
        question: "How do I compare two files on Windows or Mac without installing anything?",
        answer: "Open both files in a text editor, copy the contents into the two boxes on this page and read the result. On the command line, fc file1.txt file2.txt works on Windows and diff file1.txt file2.txt works on macOS and Linux.",
      },
      {
        question: "Does Ignore whitespace remove all spaces before comparing?",
        answer: "No. It trims spaces at the start and end of each line and collapses runs of spaces or tabs into one space. Lines that differ only by a space between words, such as \"a b\" and \"ab\", are still shown as different.",
      },
    ],
  },

  "text/case-converter": {
    about: [
      "A case converter changes the capitalization of text without retyping it. Use it to fix text typed with Caps Lock on, turn a sentence into a title, or convert names between the naming styles programmers use, such as camelCase for JavaScript variables, snake_case for Python and SQL columns, kebab-case for URLs and CSS classes, and CONSTANT_CASE for environment variables.",
      "Paste text on the left and choose a style from the dropdown: UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case or CONSTANT_CASE. The converted text appears on the right, ready to copy or download as a text file. For example, user ID number becomes userIdNumber, user_id_number and USER_ID_NUMBER.",
      "Title Case and Sentence case lowercase the rest of each word, so acronyms and names lose their capitals: NASA becomes Nasa, and in Sentence case a name like London becomes london. Title Case also capitalizes small words like of and the. Fix those by hand afterwards. For the coding styles, remove punctuation first, since only spaces, hyphens and underscores split words. Conversion runs in your browser.",
    ],
    faq: [
      {
        question: "How do I change uppercase text to lowercase in Word or Google Docs?",
        answer: "In Microsoft Word, select the text and press Shift + F3 to cycle between lowercase, UPPERCASE and capitalizing each word. In Google Docs, use Format, then Text, then Capitalization. Pasting into this tool also works for any app.",
      },
      {
        question: "When should I use camelCase, snake_case or kebab-case?",
        answer: "Follow the convention of the language or system you are working in. JavaScript and Java use camelCase for variables and PascalCase for classes, Python uses snake_case for functions and variables, CSS classes and URL slugs usually use kebab-case, and constants and environment variables use CONSTANT_CASE.",
      },
    ],
  },

  "numbers/percentage-calculator": {
    about: [
      "A percentage calculator answers the three most common percentage questions: what is X% of a number, what percent one number is of another, and by how much a value went up or down in percent. It covers everyday tasks like working out a discount, a tip, exam marks, a pay rise, a price change or growth in sales.",
      "Choose a mode, then enter two numbers. X% of Y gives an amount, X is what % of Y gives a percentage, and the increase or decrease mode compares an original value with a new one. Each result comes with a plain sentence such as 20% of 150 is 30, so you can check you entered the numbers the right way round.",
      "Percentage change is (new - original) / original x 100, so the starting value matters: going from 80 to 100 is a 25% increase, but going from 100 back to 80 is a 20% decrease. Likewise, a 50% rise followed by a 50% fall leaves you at 75% of where you started. Calculations run in your browser.",
    ],
    faq: [
      {
        question: "How do I calculate the percentage of marks?",
        answer: "Choose X is what % of Y, enter the marks you scored as X and the maximum marks as Y. For example, 432 out of 500 is 86.4%. The formula is marks obtained divided by total marks, multiplied by 100.",
      },
      {
        question: "How do I find the original price before a discount?",
        answer: "Divide the sale price by (1 - discount / 100). For example, if an item costs 120 after a 20% discount, the original price was 120 / 0.8 = 150. You can confirm it with the X% of Y mode: 20% of 150 is 30, and 150 - 30 = 120.",
      },
      {
        question: "What is the difference between a percentage and a percentage point?",
        answer: "A percentage point is the plain difference between two percentages, while a percentage change is relative. If an interest rate goes from 4% to 5%, it rose by 1 percentage point, but that is a 25% increase in the rate itself.",
      },
    ],
  },

  "numbers/scientific-calculator": {
    about: [
      "This online scientific calculator handles the functions a basic calculator lacks: powers, square and cube roots, logarithms, trigonometry and parentheses for multi-step expressions. It suits homework, engineering and physics problems, finance formulas and quick checks while coding, and shows a live preview of the answer as you type.",
      "Type an expression or use the buttons, then press = or Enter. Use ^ for powers, % for the remainder after division, and functions such as sin, cos, tan, asin, acos, atan, sqrt, cbrt, log, ln, exp, abs, round, floor and ceil, plus the constants pi and e. The last 10 calculations are kept in the history panel; click one to reuse its result.",
      "Write multiplication explicitly: 2*pi works, but 2pi or 2(3+4) gives an error. Trigonometry uses degrees, so sin(30) is 0.5. Results are rounded to 10 decimal places, which is why sin(180) shows 0 instead of a tiny floating-point leftover. Powers are evaluated right to left, so 2^3^2 is 2^9, or 512.",
    ],
    faq: [
      {
        question: "Why does -2^2 give 4 instead of -4?",
        answer: "In this calculator, the minus sign is applied to the number before the power, so -2^2 is read as (-2)^2, which is 4. Standard math notation reads it as -(2^2), which is -4. Write -(2^2) when you mean the negative of a square.",
      },
      {
        question: "How do I calculate a logarithm with a different base?",
        answer: "Divide the natural logarithms: log base b of x is ln(x) / ln(b). For example, log base 2 of 8 is ln(8) / ln(2), which gives 3. The log function is base 10 and ln is base e.",
      },
      {
        question: "Does the % key calculate percentages?",
        answer: "No. Here % is the modulo operator, which gives the remainder after division, so 17 % 5 is 2. For percentages, multiply by the percentage divided by 100, for example 150 * 20 / 100 for 20% of 150, or use the Percentage Calculator.",
      },
    ],
  },

  "numbers/bmi-calculator": {
    about: [
      "A BMI calculator works out your body mass index from your height and weight and tells you which weight category it falls into. BMI is a quick screening number used by doctors, health apps and insurance forms to flag whether an adult may be underweight, at a healthy weight, overweight or obese.",
      "Choose Metric to enter weight in kilograms and height in centimeters, or Imperial for pounds and inches. Switching units converts the values you already entered. The result shows your BMI to one decimal place, the category and a marker on the scale from underweight to obese.",
      "BMI is weight in kilograms divided by height in meters squared. For example, 70 kg at 175 cm is 70 / 1.75 squared, about 22.9, which is in the normal range of 18.5 to 24.9. Some guidelines for Asian adults, including India's, use lower cut-offs such as 23 for overweight; this calculator uses the standard WHO categories. Nothing you enter leaves your browser.",
    ],
    faq: [
      {
        question: "How do I enter my height in feet and inches?",
        answer: "Choose Imperial and enter your total height in inches: multiply the feet by 12 and add the remaining inches. For example, 5 feet 9 inches is 5 x 12 + 9 = 69 inches.",
      },
      {
        question: "What is a healthy weight for my height?",
        answer: "Multiply your height in meters squared by 18.5 and by 24.9 to get the normal BMI weight range. For someone 1.75 m tall, that is about 56.7 kg to 76.3 kg. Muscle, frame size and age still matter, so treat it as a guide.",
      },
      {
        question: "Can I use this BMI calculator for children?",
        answer: "No. The categories here are for adults. For children and teenagers, BMI is compared with growth charts for their age and sex and expressed as a percentile, so the same number can mean different things at different ages. A pediatrician or a dedicated child BMI chart should be used.",
      },
    ],
  },

  "numbers/unit-converter": {
    about: [
      "A unit converter changes a measurement from one unit to another, such as meters to feet, kilograms to pounds, Celsius to Fahrenheit, liters to gallons, acres to hectares or km/h to mph. It is useful for recipes, travel, shopping, school work, fitness tracking and engineering tasks where metric and imperial units meet.",
      "Choose a category: length, weight, temperature, volume, area or speed. Then enter a value and pick the From and To units, and the result updates as you type, shown to up to 6 decimal places. Press the swap button to reverse the direction. Weight includes stone and metric tons, area includes hectares and acres, and speed includes knots.",
      "Volume units are US measures: a US gallon is 3.785411784 liters, while the UK imperial gallon is larger at 4.54609 liters, so UK recipes and fuel figures will not match. Some factors are exact by definition, such as 1 mile = 1.609344 km and 1 knot = 1.852 km/h. Conversions are calculated in your browser.",
    ],
    faq: [
      {
        question: "How do I convert Celsius to Fahrenheit by hand?",
        answer: "Multiply the Celsius value by 9/5 (or 1.8) and add 32. For example, 25 degrees Celsius is 25 x 1.8 + 32 = 77 degrees Fahrenheit. To go the other way, subtract 32 and multiply by 5/9.",
      },
      {
        question: "Are the gallons and cups US or UK measures?",
        answer: "They are US measures: US gallons, quarts, pints, cups and fluid ounces. UK imperial pints and gallons are about 20% larger, so convert UK recipe or fuel amounts with that difference in mind.",
      },
      {
        question: "How many pounds are in a stone?",
        answer: "One stone is exactly 14 pounds, or about 6.35 kilograms. Stone is still commonly used for body weight in the UK and Ireland, and you can convert it directly in the weight category.",
      },
    ],
  },

  "numbers/currency-converter": {
    about: [
      "A currency converter shows what an amount in one currency is worth in another, using current exchange rates. It is useful for comparing prices when shopping online, budgeting for travel, estimating freelance or export invoices, and checking roughly how much a bank or payment service is charging you.",
      "Enter an amount, choose the From and To currencies, and the converted amount appears along with the rate for one unit, such as 1 USD in EUR, and the date of the rates. Use the swap button to reverse the direction. Rates are loaded by your browser from the free Frankfurter API, which publishes the European Central Bank's daily reference rates; only the currency code is sent, not the amount.",
      "These are mid-market reference rates, the midpoint between buying and selling prices. Banks, card networks and money transfer services usually add a margin or fee, so the amount you actually receive is often a little lower. On weekends and holidays the rates stay at the last business day's values, and the date shown tells you which day they are from.",
    ],
    faq: [
      {
        question: "Why is my bank's exchange rate different from this one?",
        answer: "Banks and card providers set their own rates, typically the reference rate plus a markup, and some add a separate foreign transaction fee. Compare their rate with the one shown here to see roughly how much the conversion costs you.",
      },
      {
        question: "Why do the rates not change on weekends?",
        answer: "The European Central Bank publishes reference rates only on working days, so there is nothing new on Saturdays, Sundays and its holidays. The tool shows the most recent published rates and the date they were set.",
      },
      {
        question: "Is the amount I enter sent to a server?",
        answer: "No. Your browser downloads the rate table for the selected currency from the Frankfurter API, and the conversion itself is calculated on your device. The amount you type is never part of the request.",
      },
    ],
  },
};
