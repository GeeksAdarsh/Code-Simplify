import type { ToolExtraContent } from "./types";

export const group1: Record<string, ToolExtraContent> = {
  "colors/random-color": {
    about: [
      "A HEX color code such as #3A7BD5 is three pairs of hexadecimal digits, one pair each for red, green, and blue. Each pair ranges from 00 to FF (0 to 255), so there are 256 × 256 × 256 = 16,777,216 possible colors. This generator draws three random bytes from your browser’s crypto.getRandomValues source and turns them into a HEX code, showing the rgb() version underneath.",
      "Random colors are handy when you need distinct placeholder colors fast: tagging categories in a prototype, giving chart series temporary fills, coloring user avatars in a mock-up, or breaking out of a creative rut when picking an accent color.",
      "Practical tip: because the colors are not filtered for readability, some will be very dark or very light. If you plan to put text on a color you pick here, check it with a contrast checker before shipping it, and use the Palette Generator if you need colors that work together as a set.",
    ],
    faq: [
      {
        question: "How many different random colors are possible?",
        answer: "There are 16,777,216 possible 24-bit HEX colors (256 values for each of red, green, and blue), and each one has an equal chance of being generated.",
      },
      {
        question: "Can I generate more than one random color at a time?",
        answer: "Yes. Use the How many menu to generate 1, 4, 8, 16, or 24 colors at once, then click Regenerate for a new set.",
      },
      {
        question: "Can two swatches in the same batch be the same color?",
        answer: "It is technically possible because each color is picked independently, but with over 16 million options the chance of a repeat in a batch of 24 is tiny.",
      },
    ],
  },

  "css/beautifier": {
    about: [
      "A CSS beautifier takes stylesheet code that has been squashed onto one line, or written with inconsistent spacing, and re-indents it so each selector, declaration, and closing brace sits on its own line. Rules inside @media and @supports blocks get an extra level of indentation, which makes the nesting visible at a glance.",
      "The most common reason to beautify CSS is to read code you did not write: a minified stylesheet from a production site, a WordPress theme file, or CSS copied out of the browser’s DevTools. Beautified CSS is also easier to review in a pull request, because each property change shows up as a separate line in the diff.",
      "Example: paste .btn{color:#fff;background:#0070f3}.btn:hover{background:#0059c1} and you get two clearly separated rule blocks with one property per line. Pick 2 spaces, 4 spaces, or a tab to match your editor, then copy the result or download it as a .css file.",
    ],
    faq: [
      {
        question: "Why is my CSS all on one line?",
        answer: "Production stylesheets are usually minified by build tools to reduce file size, which removes line breaks and indentation. Beautifying restores a readable layout without changing any rules.",
      },
      {
        question: "Does the CSS beautifier fix syntax errors?",
        answer: "No. It only changes whitespace and line breaks. A missing brace or semicolon will still be there after beautifying, though the new indentation often makes it easier to spot.",
      },
      {
        question: "Can I beautify CSS copied from browser DevTools?",
        answer: "Yes. Paste the copied rules into the input box and the beautified version appears in the output panel, ready to copy.",
      },
    ],
  },

  "css/border-radius-generator": {
    about: [
      "The CSS border-radius property rounds the corners of an element’s box. With four values, as this generator outputs, they apply clockwise starting from the top-left: top-left, top-right, bottom-right, bottom-left. So border-radius: 24px 24px 0px 0px rounds only the top two corners, a common look for cards with an image header or for tabs.",
      "Designers use rounded corners to make buttons, cards, modals, and avatars feel softer and to match a design system’s radius scale. Seeing the shape live helps because the same radius looks very different on a small button versus a large panel.",
      "This tool works in pixels from 0 to 150px per corner. Tip: to make a pill-shaped button, any radius of at least half the element’s height works, so a 40px-tall button needs 20px or more. Developers often write 9999px in their own CSS for pills because it stays fully rounded regardless of height.",
    ],
    faq: [
      {
        question: "What order are the four border-radius values in?",
        answer: "Top-left, top-right, bottom-right, bottom-left, going clockwise from the top-left corner. This is the same order the generator uses in its output.",
      },
      {
        question: "Should I use px or % for border-radius?",
        answer: "Pixels give the same curve on every element size, which suits buttons and cards. Percentages scale with the element, so 50% on a square makes a circle but on a rectangle produces an ellipse. This generator outputs px values.",
      },
    ],
  },

  "css/box-shadow-generator": {
    about: [
      "The CSS box-shadow property draws a shadow around an element’s box. Its values go in this order: an optional inset keyword, horizontal offset, vertical offset, blur radius, spread radius, and color. For example, 4px 4px 16px 0px rgba(10, 10, 10, 0.25) places a soft shadow slightly below and to the right of the box, which is this generator’s starting point.",
      "Shadows are mainly used to show elevation: cards, dropdown menus, modals, and floating buttons look raised above the page. Inset shadows go the other way and make an input field or pressed button look sunken.",
      "A useful trick is negative spread. A value like 0px 8px 6px -6px pulls the shadow in on all sides, so it shows mainly along the bottom edge, giving a shadow under the box without darkening its sides. The sliders here allow offsets and spread from −50px to 50px and blur up to 100px, and the color is exported as rgba() so the opacity you set is kept.",
    ],
    faq: [
      {
        question: "What is an inset box shadow?",
        answer: "Adding the inset keyword draws the shadow inside the element’s border instead of outside it, making the surface look pressed in. Tick the Inset shadow box to try it.",
      },
      {
        question: "Does box-shadow take up space in the layout?",
        answer: "No. A shadow is painted outside the box without changing its size or pushing neighbouring elements, though it can be cut off if a parent has overflow: hidden.",
      },
    ],
  },

  "css/clip-path-generator": {
    about: [
      "CSS clip-path hides every part of an element that falls outside a shape you define. The visible area can be a circle(), ellipse(), inset() rectangle, or a polygon() made of points. Percentages are measured against the element’s own box, so polygon(50% 0%, 0% 100%, 100% 100%) is a triangle with its tip at the top center on any size of element.",
      "Clip paths are popular for hero images with slanted or angled edges, hexagon or circular profile photos, ribbon and arrow badges, and section dividers, all without editing the image in a graphics program.",
      "This generator offers adjustable circle, ellipse, and inset shapes (with an optional rounded-corner value on inset) plus nine fixed polygon presets. Tip: clip-path also cuts off the element’s own box-shadow, because the shadow sits outside the clipped area. If you want a shadow that follows the clipped shape, wrap the element in a parent and apply filter: drop-shadow() to that parent instead.",
    ],
    faq: [
      {
        question: "Can I click the hidden part of a clipped element?",
        answer: "No. Browsers only register clicks and hovers inside the visible clipped shape, so the cut-away corners pass clicks through to whatever is underneath.",
      },
      {
        question: "Can I edit the points of a polygon preset?",
        answer: "The presets are fixed in this tool, but the output is plain polygon() coordinates in percentages, so you can copy the CSS and adjust any point by hand.",
      },
    ],
  },

  "css/flexbox-generator": {
    about: [
      "Flexbox is a CSS layout mode for arranging items in a single row or column. You set display: flex on a container, and properties like flex-direction, justify-content, align-items, flex-wrap, and gap decide how the children line up and share space. It is the usual choice for navigation bars, button groups, toolbars, and centering content.",
      "Remembering which property does what is the hard part, especially because justify-content and align-items swap their visual direction when you change flex-direction from row to column. A live preview makes those relationships obvious faster than reading documentation.",
      "Example: to push a logo to the left and menu links to the right in a header, use flex-direction: row with justify-content: space-between and align-items: center. Use the Items slider (1 to 10 boxes) with flex-wrap: wrap to see how items move onto a new line when they run out of room, then copy the .flex-container CSS.",
    ],
    faq: [
      {
        question: "How do I center a div with flexbox?",
        answer: "Set the parent to display: flex with justify-content: center and align-items: center. The parent needs a height larger than the child for vertical centering to be visible.",
      },
      {
        question: "Should I use flexbox or CSS grid?",
        answer: "Flexbox suits one-dimensional layouts where items flow along a single row or column. Grid is better when you need to control rows and columns at the same time, such as a card gallery or page layout.",
      },
    ],
  },

  "css/formatter": {
    about: [
      "Formatting CSS means applying a consistent layout to a stylesheet: one declaration per line, a uniform indent inside each rule, and a line break after every closing brace. The rules themselves stay the same; only the whitespace changes, so the browser treats the formatted file exactly like the original.",
      "Developers format CSS when they inherit a messy codebase, before committing changes so diffs stay clean, or when pasting styles into a bug ticket or documentation where others need to read them. It is also helpful when debugging a layout issue in minified CSS pulled from a live site.",
      "This formatter shows the byte size of both the input and output, offers 2-space, 4-space, or tab indentation, and has a Format button that replaces your input with the formatted result so you can keep editing it. A Minify button runs the reverse operation, which is useful when you want to check how much space a production build would save.",
    ],
    faq: [
      {
        question: "Is a CSS formatter the same as a CSS linter?",
        answer: "No. A formatter only adjusts whitespace and indentation, while a linter such as Stylelint checks for problems like invalid properties, duplicate selectors, or style-guide violations.",
      },
      {
        question: "Should I use tabs or spaces to indent CSS?",
        answer: "Either works; browsers ignore indentation. Most teams pick whatever their editor or Prettier config already uses, and 2 spaces is the most common default in web projects.",
      },
    ],
  },

  "css/gradient-generator": {
    about: [
      "A CSS gradient is an image generated by the browser that blends between two or more colors. linear-gradient() blends along a straight line at an angle, and radial-gradient() spreads outward from the center as a circle or ellipse. Each color stop has a position from 0% to 100%, which sets where along the line that color is fully reached.",
      "Gradients are used for hero section backgrounds, buttons, overlays that darken the bottom of a photo so white text stays readable, and subtle page backgrounds. Because the browser draws them, they need no image file to download.",
      "On the angle slider, 0deg runs bottom to top and 90deg runs left to right, so the default linear-gradient(90deg, #111111 0%, #4a4a4a 100%) fades from dark on the left to grey on the right. Tip: put two stops at the same position, such as red at 50% and blue at 50%, and you get a sharp edge instead of a blend, which is how CSS stripes are made.",
    ],
    faq: [
      {
        question: "What does the angle in linear-gradient mean?",
        answer: "It is the direction the gradient travels: 0deg goes from bottom to top, 90deg from left to right, 180deg from top to bottom, and 270deg from right to left.",
      },
      {
        question: "Can I add a transparent color stop?",
        answer: "The color pickers here produce solid HEX colors. After copying, you can replace a stop with transparent or an rgba() value by hand to fade into the background.",
      },
    ],
  },

  "css/grid-generator": {
    about: [
      "CSS Grid is a two-dimensional layout system: you define columns and rows on a container, and its children are placed into the resulting cells. This generator writes grid-template-columns and grid-template-rows using repeat(n, 1fr), where fr means one fraction of the free space, so repeat(4, 1fr) gives four equal columns.",
      "Grid is the natural fit for product galleries, dashboards with tiles, image grids, and page layouts with a sidebar and main area. The column-gap and row-gap values add spacing between cells without margin hacks on the children.",
      "You can set 1 to 8 columns, 1 to 6 rows, and gaps up to 48px. One thing to know: rows written as 1fr only stretch to fill space when the container has a set height. Without a height there is no free space to share, so the rows are sized from their content and end up as tall as the tallest one. If you want fixed-height rows, change the copied value to something like repeat(3, 120px).",
    ],
    faq: [
      {
        question: "What does 1fr mean in CSS grid?",
        answer: "fr stands for fraction. After fixed sizes and gaps are taken out, the remaining space is split among fr tracks, so 1fr 1fr gives two equal columns and 2fr 1fr makes the first twice as wide.",
      },
      {
        question: "How do I make a grid responsive?",
        answer: "A common approach is grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)), which fits as many 200px-plus columns as the screen allows. You can swap it into the generated CSS in place of the fixed column count.",
      },
    ],
  },

  "css/minifier": {
    about: [
      "CSS minification removes characters a browser does not need to read your styles: comments, line breaks, indentation, the spaces around braces, colons, semicolons, and commas, and the last semicolon before each closing brace. The rules behave the same, but the file is smaller, so it downloads and parses faster.",
      "You would minify CSS before deploying a site without a build tool, before pasting styles into a CMS field or email template that has a size limit, or to shrink an inline <style> block. The byte counts above each panel show how much you saved.",
      "This is a whitespace-and-comment minifier. It does not rewrite values, so #ffffff stays #ffffff and duplicate rules are not merged. Text inside quotes, such as content: \"a; b\", is left untouched. Note that all comments are removed, including /*! license */ comments that some libraries ask you to keep, so add those back by hand if your license requires it.",
    ],
    faq: [
      {
        question: "How much smaller does minified CSS get?",
        answer: "It depends on how much whitespace and how many comments the original has. A heavily commented, indented stylesheet shrinks far more than one that is already compact, and the tool shows the exact byte counts of input and output so you can compare.",
      },
      {
        question: "Can I un-minify CSS later?",
        answer: "Yes, run it through the CSS Formatter or CSS Beautifier to restore indentation and line breaks. Removed comments cannot be recovered, so keep your original source file.",
      },
    ],
  },

  "css/text-shadow-generator": {
    about: [
      "The CSS text-shadow property draws a shadow behind the glyphs of text. It takes a horizontal offset, a vertical offset, a blur radius, and a color, such as 2px 2px 4px rgba(10, 10, 10, 0.5). Unlike box-shadow, it has no spread value and no inset option, which is why this generator only shows offset, blur, color, and opacity controls.",
      "Text shadows are used to add depth to large headings, create neon or glow effects, and keep white text readable on top of busy photos where a background color would look heavy.",
      "You can type your own preview text, change the font size from 12px to 80px, and set offsets from −30px to 30px with up to 40px of blur. Tip for text over images: a dark shadow with zero offset and a small blur, for example 0px 0px 6px rgba(0, 0, 0, 0.6), outlines the letters evenly and improves legibility without an obvious drop shadow.",
    ],
    faq: [
      {
        question: "What is the difference between text-shadow and box-shadow?",
        answer: "text-shadow follows the shape of each letter, while box-shadow follows the rectangular box of the element. box-shadow also supports spread and inset, which text-shadow does not.",
      },
      {
        question: "Can text-shadow hurt readability?",
        answer: "Yes, large offsets or heavy blur on body text can make it look fuzzy. Keep strong effects for headings and check that the text still has enough contrast with its background.",
      },
    ],
  },

  "csv/diff": {
    about: [
      "A CSV diff compares two versions of a spreadsheet-style file and lists what changed. This tool reads the first row of each file as column headers, turns every following row into a set of named fields, and compares the two files row by row and column by column. Each difference is labelled added, removed, or changed, with a path like row[0].role pointing to the exact cell.",
      "Typical uses include checking what a script changed in an export, comparing yesterday’s and today’s product price list, verifying a data migration, or reviewing edits a colleague made to a shared file before importing it.",
      "Row numbers in the results start at 0 and do not count the header row, so row[0] is the first data row. Values are compared as exact text, which means \"Delhi\" and \"Delhi \" with a trailing space count as different. If you see noise from stray spaces, clean both files with the CSV Formatter’s trim option first, then compare again.",
    ],
    faq: [
      {
        question: "Is the CSV comparison case-sensitive?",
        answer: "Yes. Values are compared exactly, so \"Pune\" and \"pune\" show up as a changed cell.",
      },
      {
        question: "Does this CSV diff tool upload my files?",
        answer: "No. Both CSVs are parsed and compared in your browser, so the data stays on your device.",
      },
    ],
  },

  "csv/formatter": {
    about: [
      "A CSV formatter reads comma-separated data and writes it back out in a clean, consistent form. This one parses the input the way RFC 4180 describes, so quoted fields, delimiters inside quotes, line breaks inside quotes, and doubled quotes (\"\") are handled correctly. It then re-quotes only the fields that need it and joins rows with standard CRLF line endings.",
      "The delimiter switch is the part people use most. Spreadsheet programs in many European locales save CSV with semicolons because the comma is used as a decimal separator, while most databases and APIs expect commas. Converting between the two by hand with find-and-replace breaks any value that contains the separator.",
      "Example: a row like 3,\"Lee, Sam\",Product Manager converted to semicolons becomes 3;Lee, Sam;Product Manager, because the comma no longer needs protecting. Blank lines are dropped from the output, and if a quote is never closed the tool shows an error instead of guessing.",
    ],
    faq: [
      {
        question: "Why does my CSV open in a single column in Excel?",
        answer: "Excel uses your system’s list separator. If your region expects semicolons and the file uses commas (or the reverse), everything lands in one column. Reformat it here with the delimiter your Excel expects.",
      },
      {
        question: "Does the formatter fix rows with missing columns?",
        answer: "No. Each row is rewritten with the fields it already has, so a short row stays short. Add the missing values in the source data if every row needs the same number of columns.",
      },
    ],
  },

  "csv/to-json": {
    about: [
      "CSV to JSON conversion turns a table into an array of objects. The header row supplies the keys, and each data row becomes one object, so the line 1,Jane Doe,Engineer under the headers id,name,role becomes {\"id\": \"1\", \"name\": \"Jane Doe\", \"role\": \"Engineer\"}. The output is pretty-printed with two-space indentation.",
      "Developers convert CSV to JSON to seed a database, build a mock API response, load spreadsheet data into a JavaScript app, or prepare a fixture file for tests. Product and operations teams use it to hand a spreadsheet to an engineer in a format their code can read directly.",
      "A few rules to know before converting. Empty header cells become column1, column2, and so on. If two columns share the same header, the later column overwrites the earlier one in each object, so rename duplicates first. A row with fewer fields than the header gets empty strings for the missing keys, and fields beyond the last header are dropped.",
    ],
    faq: [
      {
        question: "Can I convert Excel to JSON with this tool?",
        answer: "Save or export the sheet as CSV from Excel or Google Sheets first, then paste the CSV here. The tool does not read .xlsx files directly.",
      },
      {
        question: "What does the JSON output look like?",
        answer: "A single JSON array where each element is an object for one CSV row, with keys taken from the header row and all values as strings.",
      },
    ],
  },

  "csv/to-xml": {
    about: [
      "This converter turns tabular CSV data into an XML document. The output starts with an XML declaration, wraps everything in a <rows> root element, and writes each data row as a <row> element containing one child element per column, named after the header. Characters like &, <, and > in your data are escaped so the file stays well-formed.",
      "XML is still the expected input for many older enterprise systems, SOAP services, accounting and ERP imports, and some e-commerce product feeds. Converting a spreadsheet export to XML saves building the markup by hand when one of these systems is the destination.",
      "Plan your headers before converting. XML tag names must start with a letter or underscore and cannot contain spaces, so a header like First Name or 2024 Sales is replaced with a generic <item> tag. Renaming those headers to first_name and sales_2024 in the CSV first gives you meaningful element names in the output.",
    ],
    faq: [
      {
        question: "Why are some of my columns named <item> in the XML?",
        answer: "Their headers are not valid XML tag names, usually because they contain spaces or start with a number. Rename the header in the CSV, for example Unit Price to unit_price, and convert again.",
      },
      {
        question: "Can I change the <rows> and <row> element names?",
        answer: "Not in the tool itself. The output is plain text, so you can rename them with find-and-replace after copying or downloading the XML.",
      },
    ],
  },

  "date-time/random-date": {
    about: [
      "A random date generator picks calendar dates at random between two points in time. Here you enter a start year and an end year, and the tool chooses dates spread evenly between 1 January of the start year and 31 December of the end year, printing them in ISO 8601 form (YYYY-MM-DD).",
      "Random dates are mostly used as test data: filling a date-of-birth field in a demo database, checking that a report sorts and filters by date correctly, or generating order dates for a sample dashboard. Teachers also use them for date-arithmetic exercises, and writers use them to pick a date for a story.",
      "Generate 1, 5, 10, or 20 dates at a time and use Copy all to get them as one date per line, ready to paste into a spreadsheet column. Tip: the YYYY-MM-DD format sorts correctly as plain text and is recognised as a date by Excel, Google Sheets, SQL, and most programming languages.",
    ],
    faq: [
      {
        question: "Can I generate a random date between two specific dates, not just years?",
        answer: "The range is set by whole years only. For a narrower window, set the same start and end year and filter out dates outside the months you need.",
      },
      {
        question: "Are leap days like 29 February included?",
        answer: "Yes. Dates are picked from the real calendar, so 29 February can appear in leap years within your range and never in other years.",
      },
    ],
  },

  "date-time/random-time": {
    about: [
      "This tool generates random times of day. The hour (0–23), minute (0–59), and second (0–59) are each picked independently, which gives 24 × 60 × 60 = 86,400 possible times, every one equally likely. Output is shown either as 24-hour time like 19:05:42 or as 12-hour time like 07:05:42 PM.",
      "Developers use random times to test time pickers, scheduling logic, log viewers, and sorting by timestamp. They are also useful for setting an unpredictable reminder, choosing a random check-in time for a habit tracker, or creating practice questions for time-conversion exercises.",
      "Remember how the two formats map to each other: midnight (00:00 in 24-hour time) is 12 AM, and noon (12:00) is 12 PM. Hours in 12-hour mode are zero-padded, so 7 in the evening appears as 07, not 7. Use Copy all to grab a whole batch, one time per line.",
    ],
    faq: [
      {
        question: "Is 12 AM midnight or noon?",
        answer: "12 AM is midnight (00:00 in 24-hour time) and 12 PM is noon (12:00). The generator follows this convention in 12-hour mode.",
      },
      {
        question: "Can I limit random times to a range, such as office hours?",
        answer: "Not currently. Times are always spread across the full 24 hours, so generate a batch and keep the ones that fall within your range.",
      },
      {
        question: "How many random times can I generate at once?",
        answer: "Choose 1, 5, 10, or 20 per batch from the How many menu, and click Regenerate as often as you like.",
      },
    ],
  },

  "decision-tools/coin-flip": {
    about: [
      "A coin flip is the simplest fair decision: two outcomes, each with a 50% chance. This virtual coin picks heads or tails using your browser’s crypto.getRandomValues random source, then plays a short spinning animation before showing the result.",
      "People flip a coin to settle a tie, decide who goes first in a game or match, choose between two restaurants, or split a chore. Teachers also use repeated flips to demonstrate probability, since students can watch the heads and tails counts move toward an even split over many flips.",
      "Each flip is independent, so a run of five heads does not make tails more likely next time; thinking otherwise is known as the gambler’s fallacy. The tally and the H/T history under the coin show your most recent 20 flips, which is enough to see streaks happen naturally.",
    ],
    faq: [
      {
        question: "What are the odds of getting heads twice in a row?",
        answer: "One in four, or 25%, because each flip has a 1/2 chance and 1/2 × 1/2 = 1/4. Three heads in a row is 1/8, or 12.5%.",
      },
      {
        question: "Does the tally count every flip I make?",
        answer: "The tally and history cover your most recent 20 flips. Older flips drop off the list as new ones are added.",
      },
    ],
  },

  "decision-tools/dice-roller": {
    about: [
      "A dice roller simulates physical dice. Choose a die with 4, 6, 8, 10, 12, or 20 sides (written D4 to D20 in tabletop games) and roll up to six at once. Each die shows a random face from 1 to its number of sides, and when you roll more than one, the total is added up for you. Six-sided dice are drawn with pips; the others show the number.",
      "It is useful when the physical dice are missing from a board game like Ludo or Monopoly, for tabletop RPG sessions played over a video call, or for classroom probability lessons.",
      "With two six-sided dice, totals range from 2 to 12, but they are not equally likely. A total of 7 can be made six ways out of 36 combinations, so it comes up about one roll in six, while 2 or 12 each happen only once in 36. The average roll of a single die is (sides + 1) ÷ 2, so 3.5 for a D6 and 10.5 for a D20.",
    ],
    faq: [
      {
        question: "Can I roll a D100 or add modifiers like +3?",
        answer: "Not directly. The roller supports D4, D6, D8, D10, D12, and D20 without modifiers; add any bonus to the shown total yourself, or roll two D10s and read them as tens and units for a percentile roll.",
      },
      {
        question: "Are online dice rolls fair?",
        answer: "Each die here uses the browser’s crypto.getRandomValues source to choose a face, giving every side an equal chance and making every roll independent of the last.",
      },
    ],
  },

  "decision-tools/number-picker": {
    about: [
      "A number picker draws one whole number from a range you choose, with both ends included, so a range of 1 to 100 can return 1, 100, or anything in between. If you type the larger number into Min by mistake, the picker still works because it uses the lower value as the start of the range.",
      "It works well for lucky draws where entries are numbered, choosing a page or question number at random, picking a student by roll number, or settling a guess-the-number game.",
      "The Avoid recent repeats option checks the new number against your recent picks and redraws if it matches. The history it checks holds the last 30 picks, so in a large range a number from much earlier can still come up again. For a raffle with up to about 30 tickets, this is close to drawing without replacement. For a bigger draw where nobody may win twice, the Random Picker with remove-after-pick is a better fit.",
    ],
    faq: [
      {
        question: "Can the number picker choose decimals or negative numbers?",
        answer: "It picks whole numbers only. Negative ranges work, for example −10 to 10, but decimal min and max values are rounded inward to whole numbers.",
      },
      {
        question: "Are the minimum and maximum included?",
        answer: "Yes, both ends of the range can be picked, so 1 to 6 behaves like a six-sided die.",
      },
    ],
  },

  "decision-tools/random-picker": {
    about: [
      "A random picker chooses one item from a list you type in, one entry per line. Blank lines are ignored and spaces around each entry are trimmed, so you can paste a column straight from a spreadsheet or a chat message. Every remaining line has the same chance of being picked.",
      "Common uses include drawing a giveaway winner from a list of commenters, choosing who presents first in a meeting, assigning a chore, picking a movie for the night, or selecting a random question from a quiz bank.",
      "With remove-after-pick turned on, each winner leaves the pool and a counter shows how many options remain, which is how you draw first, second, and third prizes without anyone winning twice. Editing the list starts a fresh pool. A practical tip: if you list the same name twice, it gets two chances, which is a simple way to give someone a weighted entry, such as an extra ticket for a referral.",
    ],
    faq: [
      {
        question: "How do I pick a random name from a list?",
        answer: "Paste the names into the options box, one per line, and click Pick One. Turn on remove-after-pick if you need several different names.",
      },
      {
        question: "Can I give some options a higher chance?",
        answer: "Yes, by repeating them. An option listed three times is three times as likely to be picked as one listed once.",
      },
    ],
  },

  "decision-tools/spin-wheel": {
    about: [
      "A spin wheel turns a list of options into a colored wheel with one equal slice per option, then spins it to land on a winner. The winning slice is chosen with a random number before the animation starts; the roughly three-and-a-half-second spin just shows the result in a way everyone can watch.",
      "Wheels are popular in classrooms for picking a student, on live streams for giveaways, at office events for prizes, and at home for deciding what to eat or which game to play. Seeing the wheel slow down builds anticipation in a way a plain text result does not.",
      "Long labels are shortened on the wheel itself after 14 characters, but the full text is shown when the winner is announced. Slices cycle through eight colors, so with more than eight options colors repeat. Tip: to give an option a bigger chance, enter it more than once, since each line becomes its own slice.",
    ],
    faq: [
      {
        question: "Can I remove the winner and spin again?",
        answer: "The wheel does not remove winners automatically. Delete the winning line from the options box before the next spin, and the wheel redraws with the remaining slices.",
      },
      {
        question: "Can I use this as a wheel of names?",
        answer: "Yes. Type or paste one name per line and spin; it works the same way for names, prizes, tasks, or any other text.",
      },
    ],
  },

  "decision-tools/team-generator": {
    about: [
      "A random team generator splits a list of people into groups without anyone choosing sides. This tool shuffles the names with a Fisher–Yates shuffle, then deals them out one at a time to each team in turn, like dealing cards. That keeps team sizes within one person of each other.",
      "Teachers use it to form project groups, sports coaches to pick sides for a practice match, managers to mix people from different departments for a workshop, and friends to set up quiz or game-night teams. Random allocation also avoids the awkwardness of the last person being picked.",
      "Example: 10 names split into 3 teams gives one team of 4 and two teams of 3. You need at least as many names as teams. The split is purely random and does not balance by skill, so if fairness matters for a competitive game, check the result and click Generate Teams again or make small swaps by hand.",
    ],
    faq: [
      {
        question: "How do I divide a class into random groups?",
        answer: "Paste the student names one per line, set the number of groups, and click Generate Teams. Each group appears in its own card that you can share or read out.",
      },
      {
        question: "Can I keep certain people together or apart?",
        answer: "Not automatically, since every split is fully random. Regenerate until you get an acceptable split, or adjust the teams manually afterward.",
      },
    ],
  },

  "decision-tools/yes-or-no": {
    about: [
      "A yes or no generator gives a random answer to a question with only two outcomes. Each click picks Yes or No with equal probability, using the browser’s crypto.getRandomValues source, and colors the answer green or red so it is clear at a glance.",
      "It is a quick way to break indecision on small things: whether to order dessert, go for a walk now or later, or watch one more episode. It also works as a party game or a prompt for journaling, where your reaction to the answer tells you what you actually wanted.",
      "That reaction is the real tip. If you feel relieved or disappointed when the answer appears, that feeling is useful information, and many people use a random yes or no exactly for this reason. The tally and Y/N history below the answer cover your last 20 questions.",
    ],
    faq: [
      {
        question: "Is the yes or no generator the same as flipping a coin?",
        answer: "Mathematically, yes. Both are a 50/50 random choice between two outcomes; this tool simply labels them Yes and No instead of heads and tails.",
      },
      {
        question: "Does it remember my previous answers?",
        answer: "It shows a tally and history of your last 20 answers while the page is open. Nothing is saved, so reloading the page starts fresh.",
      },
    ],
  },
};
