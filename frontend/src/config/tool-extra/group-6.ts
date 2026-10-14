import type { ToolExtraContent } from "./types";

export const group6: Record<string, ToolExtraContent> = {
  "sql/lowercase": {
    about: [
      "SQL keywords are the reserved words that give a query its structure: SELECT, FROM, WHERE, JOIN, GROUP BY and so on. Databases treat them as case-insensitive, so select and SELECT run exactly the same. Casing is purely a style choice, and many teams that write SQL next to Python or JavaScript prefer lowercase because it reads more like ordinary code.",
      "This tool walks through your query, skips anything inside quotes or comments, and lowercases the words on its built-in keyword list. For example, SELECT COUNT(*) FROM Orders WHERE Status = 'OPEN' becomes select count(*) from Orders where Status = 'OPEN' — the table name, the column name and the string value keep their original case.",
      "One thing to watch: the list also includes data types and common functions such as DATE, YEAR, TEXT and COUNT. An unquoted column literally named Date or Year will be lowercased too. If a name must keep its exact casing, wrap it in double quotes or backticks and the tool will leave it alone.",
    ],
    faq: [
      {
        question: "Are SQL keywords case-sensitive?",
        answer: "No. Standard SQL and mainstream databases such as MySQL, PostgreSQL, SQL Server, SQLite and Oracle treat keywords case-insensitively, so changing their case never changes what the query does.",
      },
      {
        question: "Will it lowercase function names like COUNT or COALESCE?",
        answer: "Yes, the functions on its keyword list — COUNT, SUM, AVG, MIN, MAX, COALESCE, CAST and CONVERT — are lowercased. Other functions, such as NOW() or UPPER(), are not on the list and keep the case you typed.",
      },
      {
        question: "Does it handle MySQL backtick identifiers?",
        answer: "Yes. Text inside backticks, single quotes or double quotes is treated as a quoted value and never changed, so `Order` or \"UserName\" keep their case.",
      },
    ],
  },

  "sql/minifier": {
    about: [
      "Minifying SQL means rewriting a query onto a single line with comments and surplus whitespace removed. The database parses the compact version exactly as it would the formatted one, because SQL ignores whitespace between tokens.",
      "Typical reasons are pasting a query into a JSON config, an environment variable, a shell command or a log search box that doesn't accept line breaks. The tool also tidies spacing around commas and parentheses, so a multi-line SELECT with a -- comment after each column collapses to something like SELECT u.id, u.name, o.total FROM users u INNER JOIN orders o ON o.user_id = u.id.",
      "Keep the readable version in source control and minify only the copy you embed. Every comment is removed, including optimizer hints written as /*+ ... */ and MySQL's /*! ... */ conditional comments, so add those back by hand if your query depends on them.",
    ],
    faq: [
      {
        question: "Does it remove MySQL # comments?",
        answer: "No. Only -- line comments and /* */ block comments are recognised. A # comment would end up on the same line as the code after it and swallow it, so change # comments to -- before minifying.",
      },
      {
        question: "Does minifying SQL make queries run faster?",
        answer: "No. The database discards whitespace and comments before it plans the query, so execution speed is the same. The only gain is a shorter string to store or send.",
      },
      {
        question: "Can I undo SQL minification?",
        answer: "Removed comments can't be recovered, but you can restore a readable layout by pasting the minified query into the SQL Formatter or SQL Beautifier.",
      },
    ],
  },

  "sql/to-json": {
    about: [
      "SQL dumps and seed files store data as INSERT statements: a table name, a list of columns and one or more tuples of values. Converting them to JSON gives you an array of objects, one per row and keyed by column name, that you can load into a JavaScript app, a document database, an API mock or a test fixture.",
      "For example, INSERT INTO users (id, name, active) VALUES (1, 'Jane', true); becomes [{\"id\": 1, \"name\": \"Jane\", \"active\": true}]. Plain numbers become JSON numbers, NULL becomes null, TRUE and FALSE become booleans, and doubled single quotes such as 'O''Brien' are unescaped to O'Brien.",
      "The parser expects the column list to be written out and each statement to end with a semicolon; INSERT INTO users VALUES (...) without column names is not recognised. Values it can't classify, such as NOW() or CURRENT_TIMESTAMP, are kept as text strings in the output.",
    ],
    faq: [
      {
        question: "What happens if I paste INSERT statements for several tables?",
        answer: "All rows are combined into one JSON array in the order they appear. If you need a separate array per table, convert each table's statements on their own.",
      },
      {
        question: "Why is my INSERT statement not detected?",
        answer: "Check that it has an explicit column list in parentheses after the table name and that it ends with a semicolon — both are required for the statement to be found.",
      },
      {
        question: "Are dates converted to a JSON date type?",
        answer: "JSON has no date type, so quoted dates like '2024-05-01' come through as plain strings. Parse them in your application if you need real date objects.",
      },
    ],
  },

  "sql/uppercase": {
    about: [
      "Writing keywords in capitals is the oldest and still most common SQL convention. It dates from plain-text terminals without syntax highlighting, when uppercase was the easiest way to tell the language's own words apart from table and column names. Many style guides, textbooks and code reviewers still expect it.",
      "The converter only touches words on its keyword list, which covers clauses, operators, join types, transaction commands, common data types and aggregate functions. A query like select id, name from customers where city = 'paris' order by name comes out as SELECT id, name FROM customers WHERE city = 'paris' ORDER BY name, with the string 'paris' left as it was.",
      "Because indentation and line breaks are kept exactly as typed, it's handy when you want to normalise case in a reviewed migration without creating a noisy diff. If you also want consistent indentation, run the result through the SQL Formatter afterwards.",
    ],
    faq: [
      {
        question: "Is uppercase or lowercase SQL better?",
        answer: "Neither runs faster or differently, since databases ignore keyword case. Pick one style and apply it consistently: uppercase is traditional and stands out in plain text, while lowercase is common where SQL lives inside application code.",
      },
      {
        question: "Why didn't a particular keyword get converted?",
        answer: "The tool uses a fixed list of common keywords, so rarer or dialect-specific words such as MERGE, PIVOT or ILIKE are left as written. Words inside comments and quoted strings are also skipped on purpose.",
      },
      {
        question: "Does it work with stored procedures and multiple statements?",
        answer: "Yes, it processes the whole input at once, however many statements it contains. Procedural words that aren't on its list, such as DECLARE or LOOP, keep their original case.",
      },
    ],
  },

  "sql/validator": {
    about: [
      "A SQL validator checks whether a query is syntactically well-formed before you run it against a real database. It's a quick way to catch typos, an unclosed parenthesis or a stray quote in a query you've been editing by hand, especially when you don't have a database console open.",
      "This tool parses your input with the open-source sql-formatter library using its generic SQL grammar. If parsing fails, you see the parser's error message; if it succeeds, you see how many statements and keywords were found. Try the built-in invalid example, SELECT * FROM users WHERE (id = 1; — the missing closing parenthesis is reported as an error.",
      "Treat a pass as \"looks well-formed\" rather than proof the query will run. A parser built for formatting is fairly lenient, and it can't know whether tables exist, whether column types match, or whether a dialect-specific function is supported. Running the query with EXPLAIN on a test database is the definitive check.",
    ],
    faq: [
      {
        question: "Can a SQL validator detect SQL injection?",
        answer: "No. Injection risk comes from how your application builds the query string, not from the SQL syntax itself. Use parameterised queries or prepared statements instead of concatenating user input.",
      },
      {
        question: "Does it validate MySQL- or PostgreSQL-specific syntax?",
        answer: "It uses a generic SQL grammar, so syntax shared by most databases works best. Dialect-only features may be flagged as errors or may slip through, so confirm those against your actual database.",
      },
      {
        question: "Is my query sent to a server for validation?",
        answer: "No. Parsing happens in your browser, so queries that contain real table names or sample data stay on your device.",
      },
    ],
  },

  "text/duplicate-line-remover": {
    about: [
      "A duplicate line remover goes through text one line at a time and drops any line it has already seen, keeping the first occurrence where it was. It's the browser equivalent of running a file through awk '!seen[$0]++' on the command line, without needing a terminal.",
      "Common uses are cleaning an email list before an import, merging keyword lists, removing repeated log entries, or tidying URLs pasted from several sources. With a list such as apple, banana, apple, cherry, Banana, the default settings remove only the second apple; switch off Case-sensitive and Banana goes too, because it now matches banana.",
      "Trim whitespace is on by default, so \"apple \" with a trailing space counts as a duplicate of \"apple\", and the lines you keep are trimmed in the output. Keep blank lines is also on by default, which preserves paragraph gaps; untick it and repeated empty lines are removed as well.",
    ],
    faq: [
      {
        question: "How is this different from sort -u?",
        answer: "Sorting-based methods change the order of your lines. This tool keeps lines in their original order, which matters for ranked lists, logs and anything chronological.",
      },
      {
        question: "Which copy is kept when duplicates differ only in case?",
        answer: "The first one. With case-sensitive matching off, if \"Apple\" appears before \"apple\", the output keeps \"Apple\" and drops the later line.",
      },
      {
        question: "Is there a limit on how many lines I can paste?",
        answer: "The tool has no built-in line limit. Very large inputs are limited only by your browser's memory and how responsive the editor stays.",
      },
    ],
  },

  "text/line-counter": {
    about: [
      "A line counter tells you how many lines a block of text contains, how many are blank, and how long the longest one is. A line is everything between two line breaks, so a paragraph that wraps across your screen but has no break in it still counts as a single line.",
      "Developers use it to size up a code file or diff, check that a CSV export has the expected number of rows (the header row counts too), or find lines that break a style rule such as an 80- or 120-character limit. The longest-line stat includes the line number, so you can jump straight to it in your editor.",
      "The average line length is the total number of characters divided by the number of lines, including empty ones, so lots of blank lines pull the average down. For an average of content lines only, remove blank lines first with the Remove Extra Spaces tool.",
    ],
    faq: [
      {
        question: "Why is my line count different from wc -l?",
        answer: "wc -l counts newline characters, while this tool counts the pieces between them, which is always one more. A file that ends with a newline therefore shows an extra empty line here.",
      },
      {
        question: "How do I count lines of code without comments?",
        answer: "This tool counts every line as it is and doesn't recognise comments in any language. For a lines-of-code figure that excludes comments and blanks, use a dedicated tool such as cloc on your project.",
      },
      {
        question: "Is line length measured in characters or bytes?",
        answer: "In characters, not bytes. Most accented letters count as one character, while some emoji count as two because of how JavaScript stores them.",
      },
    ],
  },

  "text/lorem-ipsum": {
    about: [
      "Lorem ipsum is dummy text used to fill a layout before the real copy is ready. It comes from a passage of Cicero's De finibus bonorum et malorum, written in 45 BC, with words cut and altered so it no longer reads as proper Latin. Its natural mix of short and long words shows how type will look without drawing attention to what the text says.",
      "Designers and developers drop it into wireframes, website templates, email designs, CMS test pages and print mockups. This generator builds text from a bank of 70 classic lorem ipsum words. Sentences contain 6 to 15 words and paragraphs 3 to 6 sentences, so the result looks like varied prose rather than one repeated block.",
      "Choose the Words unit when you need a fixed length, for example 12 words to test whether a card title wraps. And swap in real copy before launch: placeholder text left on a live page gives visitors nothing to read.",
    ],
    faq: [
      {
        question: "What does lorem ipsum mean in English?",
        answer: "It doesn't translate cleanly. \"Lorem\" is a fragment of the Latin word dolorem (pain), and the original passage is about pursuing pleasure and avoiding pain, but the scrambled filler version has no real meaning.",
      },
      {
        question: "Is the generated text different every time?",
        answer: "Yes, words are picked at random on each generation, so Regenerate gives a new variation. With \"Start with Lorem ipsum\" on, the text always opens with the familiar \"Lorem ipsum\" words.",
      },
      {
        question: "Should I leave lorem ipsum on a live website?",
        answer: "No. Placeholder text gives visitors nothing useful and can be treated as thin content by search engines and ad networks, so replace it with real copy before publishing.",
      },
    ],
  },

  "text/random-letter": {
    about: [
      "A random letter generator picks letters from the 26-letter English alphabet with no pattern, so every letter has the same chance of appearing. This tool uses the browser's crypto.getRandomValues() function rather than Math.random(), and you can ask for 1, 5, 10 or 20 letters at a time in uppercase, lowercase or a random mix.",
      "Teachers use it for alphabet and phonics practice, and it's a quick way to pick the starting letter in games like Scattergories, where everyone must name an animal, a city and a food beginning with, say, R. Developers use it to make test input for code that handles single characters or initials.",
      "Each letter is picked independently, so the same letter can appear twice in a batch, just as a die can land on six twice in a row. If you need letters without repeats, generate a larger batch and skip the duplicates.",
    ],
    faq: [
      {
        question: "Does it include accented letters or other alphabets?",
        answer: "No. It only produces the 26 basic Latin letters A–Z, without accented letters such as É or Ñ and without letters from other scripts.",
      },
      {
        question: "How does mixed case work?",
        answer: "In mixed mode, each letter is chosen first and then independently given a 50/50 chance of being uppercase or lowercase.",
      },
      {
        question: "Is the random letter truly random?",
        answer: "It comes from the browser's cryptographic random number generator, which is unpredictable for practical purposes and more than enough for games and classrooms. It isn't a certified source for draws with legal requirements.",
      },
    ],
  },

  "text/random-word": {
    about: [
      "A random word generator gives you words you didn't choose yourself, which is surprisingly useful for breaking a creative block. This one draws from a curated list of about 100 evocative English nouns and adjectives — words like ember, glacier, juniper, saffron and zenith — and returns 1, 5, 10 or 20 at a time.",
      "Writers use the words as story or poem prompts, designers use them as starting points for mood boards, and developers use them to name projects, branches, servers or test fixtures. Joining two results, such as cedar and falcon, gives a memorable codename like cedar-falcon.",
      "Because the list is small and themed, it isn't suited to games that need rare or long dictionary words. It also shouldn't be used to build passphrases: with roughly 100 possible words, each word adds under 7 bits of randomness, far less than a dedicated passphrase generator's word list provides.",
    ],
    faq: [
      {
        question: "Can I use it for Pictionary or charades?",
        answer: "Many of the words are concrete things you can draw or act out, such as anchor, bridge, comet or lantern, so it works for casual rounds. Generate a batch of 20 and pick the ones that suit your group.",
      },
      {
        question: "Can I filter by word length or starting letter?",
        answer: "No, there are no filters for length, starting letter or part of speech. Every word in the list has an equal chance on each pick.",
      },
      {
        question: "Can the same word appear twice in one batch?",
        answer: "Yes. Each word is picked independently from about 100 options, so a repeat in a batch of 20 is quite likely; click Regenerate for a fresh set.",
      },
    ],
  },

  "text/remove-extra-spaces": {
    about: [
      "Extra whitespace sneaks into text all the time: double spaces after full stops, tabs from a spreadsheet, indentation from an email reply, or the ragged spacing you get when copying from a PDF. This tool cleans it up with three switches: collapse runs of spaces and tabs into one space, trim the start and end of each line, and optionally delete blank lines.",
      "The first two are on by default and blank-line removal is off, so paragraph breaks survive unless you ask otherwise. For example, \"   Total:    42   units   \" becomes \"Total: 42 units\".",
      "Line breaks themselves are never merged into spaces, so the tool won't join a hard-wrapped paragraph into one line. Collapsing only targets ordinary spaces and tabs: non-breaking spaces in the middle of a line, which are common in text copied from web pages and Word documents, are left in place.",
    ],
    faq: [
      {
        question: "How do I remove double spaces after a period?",
        answer: "Leave \"Collapse multiple spaces/tabs\" on. Any run of two or more spaces, including the double space many people type after a full stop, becomes a single space.",
      },
      {
        question: "Will it join my text into one paragraph?",
        answer: "No. Line breaks are kept. \"Remove blank lines\" only deletes lines that are empty or contain nothing but whitespace.",
      },
      {
        question: "Does it convert tabs to spaces?",
        answer: "Yes, with collapsing on, every tab — even a single one — is replaced by one space. That's handy for prose but will break tab-separated data, so turn the option off for spreadsheet text.",
      },
    ],
  },

  "text/reverse-text": {
    about: [
      "Reversing text means writing it back to front. This tool has three modes: Reverse characters turns \"stressed\" into \"desserts\", Reverse word order turns \"one two three\" into \"three two one\", and Reverse line order flips a multi-line list so the last line comes first.",
      "Character reversal is handy for palindrome checks (\"racecar\" reads the same either way), puzzles and mirror-writing effects. Line reversal is the practical one for developers: it turns an oldest-first log or changelog into newest-first, much like the tac command on Linux.",
      "Character mode reverses by Unicode code point, so most single emoji survive. Characters built from several code points — flags, family emoji, or letters with a separate combining accent — can come out scrambled because their parts are reversed too. Word mode keeps punctuation attached to its word, so \"Hello, world!\" becomes \"world! Hello,\".",
    ],
    faq: [
      {
        question: "Is reversed text the same as upside-down or mirrored text?",
        answer: "No. Reversing only changes the order of characters; it doesn't flip the letters themselves. Upside-down text relies on special look-alike Unicode characters, which this tool doesn't produce.",
      },
      {
        question: "How does word reversal treat multiple lines?",
        answer: "Line breaks count as gaps between words, so word mode reverses the order across the whole text rather than line by line. To flip words within each line separately, process one line at a time.",
      },
      {
        question: "How do I check if a phrase is a palindrome?",
        answer: "Lowercase it and remove spaces and punctuation, then reverse the characters and compare. \"Never odd or even\" only matches itself once it has become \"neveroddoreven\".",
      },
    ],
  },

  "text/slug-generator": {
    about: [
      "A slug is the readable part at the end of a URL that identifies a page, such as how-to-make-cold-brew in example.com/blog/how-to-make-cold-brew. Good slugs are short, lowercase and use only letters, numbers and hyphens, so they're easy to read, share and type, and they avoid the %20-style encoding that spaces and symbols trigger.",
      "This generator lowercases your text, strips accents (café becomes cafe), drops punctuation and symbols, and joins the remaining words with hyphens or underscores. The sample title \"10 Best Developer Tools You Should Try in 2026!\" becomes 10-best-developer-tools-you-should-try-in-2026.",
      "For cleaner URLs, trim the result to the key words; developer-tools-2026 says nearly as much as the full sentence. Once a page is published, avoid changing its slug, and if you must, set up a 301 redirect from the old URL so existing links keep working.",
    ],
    faq: [
      {
        question: "What happens to Chinese, Arabic or Cyrillic text?",
        answer: "It is removed, because the generator keeps only the letters a–z and the digits 0–9. German ß is dropped as well rather than turned into ss, so transliterate such titles first or write the slug by hand.",
      },
      {
        question: "Is an ampersand turned into \"and\"?",
        answer: "No, symbols such as &, @ and + are simply removed, so \"Salt & Pepper\" becomes salt-pepper. Type the word \"and\" in your title if you want it in the slug.",
      },
      {
        question: "How long should a URL slug be?",
        answer: "There's no fixed limit, but three to six meaningful words is a common guideline. Shorter slugs are easier to read in search results and less likely to be cut off.",
      },
    ],
  },

  "text/text-sorter": {
    about: [
      "A text sorter reorders lines — names, tags, file paths, numbers — so they're easier to scan, compare or merge. This tool sorts one item per line alphabetically, numerically or by line length, in ascending or descending order, with optional removal of duplicates and empty lines.",
      "Alphabetical mode uses your browser's locale-aware comparison, so accented letters sort next to their plain versions instead of after Z. It is not a natural sort, though: file10 comes before file2 because the characters are compared one at a time. When every line starts with a number, Numeric mode sorts 2, 10, 100 by value instead of as text.",
      "Numeric mode reads the number at the start of each line, so \"12 apples\" sorts as 12, but values like \"$5\" or \"1,200\" don't parse cleanly: $5 is treated as 0 and 1,200 as 1. Strip currency symbols and thousands separators first for accurate results.",
    ],
    faq: [
      {
        question: "How do I sort a list from Z to A?",
        answer: "Choose Alphabetical as the sort mode and set Order to Descending.",
      },
      {
        question: "Does case-sensitive sorting put capitals first?",
        answer: "Not necessarily. The browser's locale rules usually place a lowercase word just before the same word in capitals, unlike ASCII-based sorts that put every capitalised line ahead of all lowercase ones.",
      },
      {
        question: "Can I sort numbers that have decimals or negative signs?",
        answer: "Yes. Numeric mode understands values such as -3, 0.5 and 12.75 and orders them by their actual value.",
      },
    ],
  },

  "text/word-counter": {
    about: [
      "A word counter counts words plus the related figures writers check most: characters, sentences and paragraphs, along with estimates of how long the text takes to read or say aloud. Students use it for essay limits, bloggers for article length, and speakers to size a talk — at about 130 words per minute, a five-minute speech is around 650 words.",
      "Here a word is anything separated by spaces or line breaks. That means \"well-known\" and \"e-mail\" each count as one word, \"don't\" is one word, and a number like 2,500 counts too. Paragraphs are blocks separated by a blank line, so a single line break inside a block doesn't start a new paragraph.",
      "Counts can differ slightly from Microsoft Word or Google Docs, which have their own rules for dashes, symbols and URLs. If you're working to a strict limit set by a school or publisher, check with the tool they specify.",
    ],
    faq: [
      {
        question: "How many pages is 1,000 words?",
        answer: "Roughly two pages single-spaced or four pages double-spaced in a 12-point font, though margins and font choice change this.",
      },
      {
        question: "Does the character count include spaces?",
        answer: "Yes. The Characters figure counts every character, including spaces and line breaks. For a count without spaces or a limit tracker, use the Character Counter tool.",
      },
      {
        question: "Are numbers and symbols counted as words?",
        answer: "Any group of characters between spaces counts, so a number like 2026, a standalone & and a dash typed with spaces around it each count as one word.",
      },
    ],
  },

  "typescript/formatter": {
    about: [
      "A TypeScript formatter rewrites code with consistent indentation, spacing, line breaks and punctuation without changing what it does. This tool runs Prettier, the formatter most TypeScript projects already use in their editor or CI, with its TypeScript parser, two-space indentation, double quotes and semicolons.",
      "It's useful for cleaning up code pasted from a chat, a squashed one-line snippet or a generated file before you read or share it. For example, interface User{id:number;name:string} becomes a four-line interface with each property on its own indented line, ending in a semicolon. Lines longer than Prettier's default width of 80 characters are wrapped.",
      "Because the code has to be parsed first, a syntax error such as a missing brace stops formatting and shows the parser's message, which also makes this a quick syntax check. If your project uses other settings, such as single quotes or no semicolons, run Prettier locally with your .prettierrc so the output matches your codebase.",
    ],
    faq: [
      {
        question: "What formatting options does it use?",
        answer: "Prettier's defaults with semicolons, double quotes and a two-space indent. These settings are fixed in this tool, so there are no toggles for tabs or single quotes.",
      },
      {
        question: "Does formatting remove comments?",
        answer: "No. Prettier keeps your comments and moves them along with the code they belong to; only layout and punctuation style change.",
      },
      {
        question: "Is Prettier the same as ESLint?",
        answer: "No. Prettier only handles layout, while ESLint with typescript-eslint finds code-quality problems such as unused variables. Many projects run both.",
      },
    ],
  },

  "typescript/to-js": {
    about: [
      "TypeScript is JavaScript with a type system on top. Most browsers and JavaScript runtimes execute plain JavaScript, so TypeScript has to be compiled: the types are erased and a few TypeScript-only features are turned into ordinary code. This tool does that with the official TypeScript compiler's transpileModule function.",
      "Pure type syntax disappears: const total: number = 5; becomes const total = 5;, and interfaces and type aliases vanish entirely. Features that exist at runtime are compiled instead: an enum becomes an object built inside a small function, and a constructor parameter like private name: string becomes a plain this.name = name assignment.",
      "Output targets ES2020 and keeps import and export statements as ES modules. It's a handy way to see what your code really ships as, or to turn a TypeScript snippet into JavaScript for a project without a build step. Because each input is converted on its own, imports that are only used as types are dropped.",
    ],
    faq: [
      {
        question: "Can I convert JavaScript back to TypeScript?",
        answer: "Plain JavaScript is already valid TypeScript, so you can rename a .js file to .ts. Adding types back is manual work, since the original annotations are discarded during conversion.",
      },
      {
        question: "Does it make code compatible with old browsers?",
        answer: "Only down to ES2020. Nothing is rewritten for very old browsers such as Internet Explorer; use a bundler or Babel with a lower target for that.",
      },
    ],
  },

  "xml/minifier": {
    about: [
      "XML minification removes the indentation and line breaks between tags that make a document readable to people but mean nothing to most programs that consume it. The result is a single compact line, which saves bytes in API payloads, SOAP messages, sitemaps and XML stored in databases.",
      "Before minifying, the tool parses your input with the browser's XML parser, so you get an error rather than a broken result if a tag isn't closed. The XML declaration, comments and CDATA sections are kept. The sample two-book catalog, spread over twelve indented lines, becomes one line beginning <?xml version=\"1.0\" encoding=\"UTF-8\"?><catalog><book id=\"1\">.",
      "One caution applies to document-style XML such as XHTML, where a space between two inline elements matters. In <p><b>Hello</b> <i>world</i></p>, the space between </b> and <i> is removed, so the text reads \"Helloworld\". For data-oriented XML this never matters.",
    ],
    faq: [
      {
        question: "Are XML comments removed when minifying?",
        answer: "No. This minifier only removes whitespace between tags, so comments, the XML declaration and processing instructions stay in the output. Delete comments by hand if you don't want them shipped.",
      },
      {
        question: "Is minifying XML worth it if my server uses gzip?",
        answer: "The gain is smaller, because compression already shrinks repeated whitespace efficiently. Minifying still helps where XML is stored or sent uncompressed, such as database columns, message queues or size-limited fields.",
      },
    ],
  },

  "xml/to-csv": {
    about: [
      "CSV is the simplest format for tabular data and opens directly in Excel, Google Sheets and database import tools. XML is hierarchical, so converting it means deciding which elements are the rows. This tool parses your XML, finds the first group of repeated elements — for example every <employee> inside <employees> — and turns each one into a CSV row.",
      "Child elements become columns, attributes become columns prefixed with @, and nested elements are flattened with dot notation, so <address><city>Paris</city></address> inside each record becomes a column named address.city. The two-employee sample produces the header row @id,name,role followed by one line per employee.",
      "If a record contains its own repeated children, such as several <phone> elements, that cell holds a JSON-style array like [\"555-1234\",\"555-5678\"] rather than separate columns. Values are exported as the text that appears in the XML, and cells containing commas, quotes or line breaks are quoted per the CSV rules.",
    ],
    faq: [
      {
        question: "Can I open the converted CSV in Excel?",
        answer: "Yes. Download the .csv file and open it in Excel, or import it into Google Sheets. If accented characters look garbled in Excel, import it through Data > From Text/CSV and choose UTF-8 as the encoding.",
      },
      {
        question: "What if my XML has several different repeated groups?",
        answer: "Only the first repeated group found is used as rows. To export another group, paste just that section with a wrapping parent element and convert it separately.",
      },
    ],
  },

  "xml/to-json": {
    about: [
      "XML and JSON both represent structured data, but most modern APIs, JavaScript code and document databases work with JSON. Converting XML responses, RSS feeds or legacy config files to JSON makes them easier to inspect and use in code.",
      "There's no single official mapping, so this tool follows a widely used convention. The root element becomes the top-level key, attributes become keys starting with @, and text inside an element that has attributes goes under #text. So <price currency=\"USD\">29.99</price> becomes \"price\": {\"@currency\": \"USD\", \"#text\": \"29.99\"}, while a plain <price>29.99</price> becomes \"price\": \"29.99\".",
      "Two quirks are worth knowing. All values stay strings, because XML has no number or boolean types, so convert them in your code if needed. And an element only becomes an array when it repeats: a list with one <item> gives an object, while a list with two gives an array, so code reading the JSON should handle both shapes.",
    ],
    faq: [
      {
        question: "What happens to XML namespaces?",
        answer: "Element and attribute names keep their prefixes, so <atom:link> becomes an \"atom:link\" key, and xmlns declarations appear as @xmlns attributes.",
      },
      {
        question: "Are XML comments and CDATA kept?",
        answer: "Comments are dropped. CDATA content is treated as ordinary text, so it appears as the element's string value.",
      },
      {
        question: "Why is text missing from some elements?",
        answer: "If an element contains both text and child elements, as in <p>Hello <b>world</b></p>, only the child elements are kept and the loose text is dropped. The converter is designed for data-style XML rather than document markup.",
      },
    ],
  },

  "xml/viewer": {
    about: [
      "An XML viewer displays a document as indented, colour-coded markup you can actually read, rather than a wall of angle brackets. It's for looking, not changing: open a SOAP response, an RSS or Atom feed, a sitemap.xml, an Android layout or a Maven pom.xml and see its structure at a glance.",
      "Paste the XML on the left and a highlighted, re-indented copy appears on the right, even if the original was minified onto one line. The input is checked with the browser's XML parser first; if something is wrong, such as a missing closing tag, the parser's error message is shown below so you can find and fix it.",
      "A raw & in text is one of the most common reasons XML fails to parse. Write it as &amp;, and write < as &lt;, inside text and attribute values. The byte count above the input is also useful when checking a payload against a size limit.",
    ],
    faq: [
      {
        question: "What does an \"undefined entity\" error mean in XML?",
        answer: "XML only predefines five named entities: &amp;, &lt;, &gt;, &quot; and &apos;. HTML names such as &nbsp; or &copy; aren't valid in plain XML, so use numeric references like &#160; instead.",
      },
      {
        question: "How do I view an XML file on my phone?",
        answer: "Open this page in your phone's browser and paste the XML. It works the same on mobile, and the content isn't uploaded anywhere.",
      },
    ],
  },

  "xml/xpath-tester": {
    about: [
      "XPath is a query language for picking parts out of an XML document using path-like expressions. It's used in XSLT, XML Schema, Selenium and Playwright locators, web scrapers and command-line tools like xmllint. Testing an expression here shows exactly what it matches before you put it in code.",
      "A few building blocks cover most needs: // searches at any depth, / steps to a direct child, @ selects an attribute, and square brackets filter. Against the sample catalog, //book/title returns both titles, //book[@id='2']/title returns only CodeSimplify Guide, //book[price > 20]/title returns Learning XML, and count(//book) returns the number 2.",
      "Results show the matched markup for elements, name=\"value\" for attributes, and a single value for expressions that return a number, string or boolean. Positions in XPath start at 1, not 0, so //book[1] selects the first book.",
    ],
    faq: [
      {
        question: "How do I match elements that use a default namespace?",
        answer: "This tester doesn't register namespaces, so a plain name like //item won't match elements under a default xmlns. Use local-name() instead, for example //*[local-name()='item'].",
      },
      {
        question: "What is the difference between / and // in XPath?",
        answer: "A single slash moves to direct children only, so /catalog/book matches book elements directly under the root catalog. A double slash searches all descendants, so //title finds title elements at any depth.",
      },
      {
        question: "How do I select an element by its text in XPath?",
        answer: "Use text() in a predicate, such as //title[text()='Learning XML'], or contains() for a partial match, such as //title[contains(., 'XML')].",
      },
    ],
  },

  "yaml/from-json": {
    about: [
      "YAML expresses the same data as JSON — objects, arrays, strings, numbers, booleans and null — but uses indentation instead of braces and brackets, and doesn't need quotes around most strings. That makes it the usual format for files people edit by hand, such as Kubernetes manifests, Docker Compose files, GitHub Actions workflows and Ansible playbooks.",
      "This converter parses your JSON and writes YAML with two-space indentation using the js-yaml library. Objects become indented key: value lines and arrays become lists of - items, so {\"tags\": [\"json\", \"tools\"]} becomes tags: followed by the lines - json and - tools. Long strings stay on one line rather than being folded.",
      "Strings that YAML would otherwise read as another type are quoted automatically, so the string \"true\" or \"123\" stays a string instead of turning into a boolean or number. JSON has no comments, so add any explanatory # comments to the YAML after converting.",
    ],
    faq: [
      {
        question: "Is YAML a superset of JSON?",
        answer: "Since YAML 1.2, practically all valid JSON is also valid YAML, so most YAML parsers can read JSON directly. Converting is still worthwhile when people will read or edit the file.",
      },
      {
        question: "How are empty objects and arrays shown in YAML?",
        answer: "They're written in compact flow style as {} and [], since there's nothing to indent.",
      },
    ],
  },

  "yaml/to-json": {
    about: [
      "YAML is popular for configuration because it's easy to read, but many tools, APIs and programming languages handle JSON more readily. Converting YAML to JSON is also a good way to see exactly how a parser interprets your file: indentation mistakes that are hard to spot in YAML become obvious once the nesting is shown with braces.",
      "This converter uses the js-yaml parser and prints JSON with two-space indentation. If the YAML is invalid, you'll see the parser's message along with the line and column where it stopped. Watch for values YAML types on its own: version: 1.0 becomes the number 1 in JSON. Quote any value that must stay text, as in version: \"1.0\".",
      "Keys within a mapping must be unique, and js-yaml reports an error for a duplicated key, a common slip in long config files where the same setting is defined twice. Converting is also a quick way to feed a docker-compose.yml or CI workflow into JSON tools such as jq or a JSON Schema validator.",
    ],
    faq: [
      {
        question: "Why does YAML turn my value into a number or boolean?",
        answer: "Unquoted values are typed by their content, so 42 becomes a number, true becomes a boolean, and null or ~ becomes null. Wrap the value in quotes to keep it as a string.",
      },
      {
        question: "What is the difference between YAML and JSON?",
        answer: "Both describe the same kinds of data. JSON uses braces, brackets and mandatory quotes and is strict and compact, while YAML uses indentation, allows comments and is easier to edit by hand.",
      },
    ],
  },
};
