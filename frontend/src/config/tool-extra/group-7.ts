import type { ToolExtraContent } from "./types";

export const group7: Record<string, ToolExtraContent> = {
  "json/validator": {
    about: [
      "A JSON validator tells you whether a piece of text is valid JSON before you ship it in an API request, a config file or a fixture. Paste it here to check JSON online: the result appears as you type, either a Valid badge or the parser's error message with the line and column where parsing stopped.",
      "For valid input, the summary shows the top-level type (object, array, string, number, boolean or null), the total number of object keys at every level, the total number of array items, and the maximum nesting depth. Those numbers are a quick sanity check that a payload has the shape you expect, for example that a list endpoint really returned 50 items. Use Load invalid example to see what an error report looks like.",
      "Validation uses the browser's own JSON.parse, so the rules are exactly the ones your JavaScript code will apply. That also means two things pass that may surprise you: duplicate keys, where the last value silently wins, and integers larger than 2^53, which are accepted but lose precision when parsed in JavaScript. Everything runs in your browser and nothing is uploaded.",
    ],
    faq: [
      {
        question: "Is a single number or string valid JSON?",
        answer: "Yes. Since RFC 8259, any JSON value can be the top-level value, so 42, \"hello\", true and null are all valid JSON documents. The validator reports their type in the summary. Some older parsers and APIs still expect an object or array at the top level, so check what the receiving side accepts.",
      },
      {
        question: "Does the validator catch duplicate keys?",
        answer: "No. JSON.parse accepts an object like {\"id\": 1, \"id\": 2} and keeps the last value, so it is reported as valid. The JSON standard says key names should be unique, and other parsers may keep the first value or reject the document, so remove duplicates even though validation passes.",
      },
    ],
  },

  "json/diff": {
    about: [
      "A JSON diff tool compares two JSON documents and lists exactly what changed between them. Instead of comparing lines of text, it parses both sides and walks them together, so you can compare JSON online and see added fields, removed fields and changed values even when the two files are formatted differently.",
      "Paste the original into JSON A and the new version into JSON B. Each difference is shown with its path, a label of added, removed or changed, and the old and new values. It is useful for checking what a deploy changed in an API response, reviewing edits to a feature flag or translation file, or confirming that a refactor left a config untouched.",
      "Arrays are compared position by position, which matters when items are inserted. If B adds one element at the start of a 10-item array, every later index shifts, so you can see up to 10 changed entries and one added entry rather than a single insertion. Sort both arrays the same way first if order is not meaningful. The comparison runs in your browser.",
    ],
    faq: [
      {
        question: "How do I read paths like $.tags[2] or $.author.name?",
        answer: "The $ stands for the root of the document. A dot followed by a name steps into an object key, and a number in square brackets steps into an array index, counting from 0. So $.tags[2] is the third item of the tags array, and $.author.name is the name key inside the author object.",
      },
      {
        question: "Is 1.0 different from 1, or 1 different from \"1\"?",
        answer: "1.0 and 1 are the same number once parsed, so they are not reported as a difference. A number and a string are different types, so changing 1 to \"1\" is reported as changed, which is often exactly the bug you are looking for when an API starts returning IDs as strings.",
      },
    ],
  },

  "json/to-csv": {
    about: [
      "A JSON to CSV converter turns an array of JSON objects into a comma-separated table you can open in Excel, Google Sheets or a database import tool. Each object becomes one row and each key becomes a column, so an API response or a MongoDB export can be shared with people who work in spreadsheets.",
      "Paste the JSON and the CSV appears on the right, ready to copy or download as converted.csv. The header row lists every key in the order it is first seen. Nested objects are flattened into columns such as address.city, arrays are written into a single cell as JSON text, null becomes an empty cell, and true and false are written as plain words.",
      "Fields that contain a comma, a double quote or a line break are wrapped in double quotes, and inner quotes are doubled, as the CSV format requires. For example, a name of Lee, Sam is written as \"Lee, Sam\" so it stays in one column. The output always uses commas as the separator. Conversion happens in your browser.",
    ],
    faq: [
      {
        question: "Why do accented characters look wrong when I open the CSV in Excel?",
        answer: "The file is saved as UTF-8 without a byte order mark, and Excel can misread such files when you open them by double-clicking. Import it instead with Data > From Text/CSV and choose UTF-8 as the file origin, or use the JSON to Excel tool to get an .xlsx file directly.",
      },
      {
        question: "Can I get semicolon-separated output?",
        answer: "Not from this tool; the separator is always a comma. If your Excel locale expects semicolons, import the file through Data > From Text/CSV and pick Comma as the delimiter, or run the result through the CSV Formatter tool, which can change the output delimiter.",
      },
    ],
  },

  "json/to-java": {
    about: [
      "JSON to Java generates Java classes, often called POJOs, from a sample JSON document. Instead of writing a model class by hand for every API response, you paste one real response and get a class with private fields plus a getter and setter for each, ready for Jackson, Gson or your own mapping code.",
      "Set the root class name to match your domain, for example OrderResponse, and download the result as a .java file named after it. Each nested object gets its own class named after its key, keys are converted to camelCase field names, and java.util.List is imported when any field is an array. Whole numbers become Integer, decimals become Double, and true or false becomes Boolean.",
      "Types are inferred from the sample only. An array's element type comes from its first item, an empty array becomes List<Object>, and a field that is null in the sample becomes Object, so use a response where every field has a real value. The generated classes have no package line or annotations; add those to fit your project. Generation runs in your browser.",
    ],
    faq: [
      {
        question: "Why doesn't Jackson fill fields from snake_case JSON keys?",
        answer: "The generator turns a key like user_id into a field userId with getUserId(), so Jackson looks for a JSON property called userId and does not match user_id. Add @JsonProperty(\"user_id\") to the field, or configure the ObjectMapper with PropertyNamingStrategies.SNAKE_CASE. With Gson, use @SerializedName(\"user_id\") or FieldNamingPolicy.LOWER_CASE_WITH_UNDERSCORES.",
      },
      {
        question: "Can it generate Java records or Lombok classes?",
        answer: "No, the output is a classic class with fields, getters and setters, which works on any Java version. On Java 16 or later you can turn it into a record by keeping only the field types and names in the record header, or replace the accessors with Lombok's @Data if your project already uses Lombok.",
      },
    ],
  },

  "json/to-typescript": {
    about: [
      "JSON to TypeScript creates TypeScript interfaces from a sample JSON object, so you can type an API response without writing the definitions by hand. Paste a real response and you get one exported interface for the root and one for every nested object, which you can drop into a types.ts file.",
      "Set the root interface name, for example UserResponse, and download the result as a .ts file. Nested objects get interfaces named after their key in PascalCase, so an address field produces an Address interface. Numbers map to number, strings to string, true or false to boolean, arrays to a typed array such as string[], and null values to null.",
      "The shape comes from the sample alone. For arrays, only the first element is inspected, so a key that appears only in later items is left out, and an empty array is typed as unknown[]. Keys are written exactly as they appear, so a key like content-type needs quotes added by hand to be valid TypeScript. The conversion runs in your browser.",
    ],
    faq: [
      {
        question: "Why is a field typed as unknown[]?",
        answer: "The array was empty in your sample, so there was nothing to infer the element type from. Paste a sample where the array has at least one item, or replace unknown[] with the real type, for example Tag[], after generating.",
      },
      {
        question: "Does it merge the fields of different objects in an array?",
        answer: "No. The element type is built from the first item only. If items in the array have different optional fields, put the most complete object first, or add the missing properties to the interface manually and mark them optional with a question mark.",
      },
    ],
  },

  "json/to-dart": {
    about: [
      "JSON to Dart generates Dart model classes from a sample JSON object, which is the usual first step when a Flutter app consumes a REST API. Each class has final fields, a constructor with required named parameters, and a fromJson factory that reads values from a Map<String, dynamic>.",
      "Set the root class name and download the result as a .dart file. Nested objects become their own classes with their own fromJson, and lists of objects are decoded item by item. Whole numbers map to int, decimals to double, true or false to bool, strings to String, and arrays to List<T>. Keys are converted to camelCase field names while fromJson still reads the original key.",
      "Watch numbers that can be whole or decimal. If the sample has \"price\": 10, the field becomes int, and a later response with 10.5 fails at runtime when a double is assigned to it; the reverse can fail too. Use double in that case and read the value with (json['price'] as num).toDouble(). Generation runs entirely in your browser.",
    ],
    faq: [
      {
        question: "How do I make a field nullable?",
        answer: "The generated fields are non-nullable and required, which suits sound null safety in Dart 3. If an API can return null or omit a key, change the type to add a question mark, for example String? nickname, and remove required from that constructor parameter. A field that was null in your sample is generated as dynamic, so give it a real type too.",
      },
      {
        question: "Can I use the output with json_serializable or freezed?",
        answer: "The output is plain Dart with a hand-written fromJson and no annotations or build_runner step, so it works without extra packages. If your project uses json_serializable or freezed, use the generated fields as a starting point and add the annotations and part directives those packages need.",
      },
    ],
  },

  "json/escape-unescape": {
    about: [
      "A JSON escape tool converts plain text into a valid JSON string literal, and unescape converts it back. You need it when text with quotes, backslashes or line breaks has to go inside a JSON value, such as an HTML snippet in a CMS payload, a multi-line SQL query in a config file, or a log message in a test fixture.",
      "In Escape mode, the output is wrapped in double quotes, with every quote written as \\\", every backslash as \\\\, and line breaks and tabs as \\n and \\t. In Unescape mode, paste a string literal including its surrounding double quotes and you get the original text back. Both sides show their size in bytes, and the output can be copied with one click.",
      "A common case is JSON nested inside JSON, such as an event whose body field holds another JSON document as a string. Escaping {\"a\":1} gives \"{\\\"a\\\":1}\", which you can paste as the value. Characters such as \u00e9 or emoji are left as they are, since JSON strings can hold any Unicode text. The conversion runs in your browser.",
    ],
    faq: [
      {
        question: "Why does my unescaped output still contain \\n or \\\"?",
        answer: "The text was escaped twice, which happens when a JSON string is serialized a second time by a logger or message queue. Unescape once, copy the result, add a double quote at the start and end, and unescape again. Repeat until the output reads as normal text.",
      },
      {
        question: "Does escaping change forward slashes or non-English characters?",
        answer: "No. Only double quotes, backslashes and control characters such as newlines and tabs need escaping in JSON, so a URL like https://example.com/a stays as it is, and so do accented letters and emoji. Some other serializers write \\/ or \\u escapes instead, and both forms decode to the same text.",
      },
    ],
  },

  "xml/formatter": {
    about: [
      "An XML formatter, also called an XML beautifier or pretty printer, rewrites minified or messy XML with one element per line and indentation that shows the nesting. It makes SOAP responses, sitemaps, RSS feeds, Maven pom.xml files and Android layouts readable without changing the elements or attributes.",
      "Paste XML on the left and the formatted version appears on the right. Pick 2 spaces, 4 spaces or a tab for indentation. The Format button copies the result back into the input so you can keep editing, and Minify removes the whitespace between tags in the input. Copy the output or download it as formatted.xml.",
      "The input is checked for well-formedness first, and if the parser finds an error, the message is shown and no output is produced. Formatting removes whitespace-only gaps between tags, which is fine for data files but can matter in mixed content such as <p>Hello <b>world</b> <i>again</i></p>, where the space between the two inner tags is dropped. Everything runs in your browser.",
    ],
    faq: [
      {
        question: "How do I pretty print XML from the command line?",
        answer: "With libxml2 installed, run xmllint --format file.xml to print an indented copy, or add --output pretty.xml to save it. It is available on most Linux distributions and macOS. This page gives the same kind of result without installing anything.",
      },
      {
        question: "Why is the output empty?",
        answer: "The formatter only produces output for well-formed XML. Check the error message under the editors; it usually points to an unclosed tag, a mismatched closing tag or an unescaped & character. Fix that line and the formatted XML appears straight away.",
      },
    ],
  },

  "xml/validator": {
    about: [
      "An XML validator checks whether a document is well-formed, meaning it can be parsed at all. Use it to check XML online before you send a SOAP request, publish a sitemap or feed, or commit a config file, because a single unclosed tag makes the whole document unreadable to every XML parser.",
      "Paste the XML and the result appears as you type. A valid document shows the total number of elements and the maximum nesting depth. An invalid one shows the error reported by your browser's XML parser, which usually includes the line and column. Load invalid example shows a document whose closing tag does not match its opening tag.",
      "Two errors catch many people out. HTML entities such as &nbsp; or &copy; are not defined in XML, which only has &amp;, &lt;, &gt;, &quot; and &apos; built in, so use a numeric reference like &#160; instead. And an <?xml ?> declaration must be the very first thing in the file, with no blank line or space before it. The check runs entirely in your browser.",
    ],
    faq: [
      {
        question: "Are XML tag names case-sensitive?",
        answer: "Yes. <Book> and <book> are different elements, so <Book>...</book> is a mismatched tag and the document is not well-formed. Attribute names are case-sensitive too. This is a common problem when XML is written by hand or converted from HTML, which does not care about case.",
      },
      {
        question: "Why does my file fail when the XML declaration looks correct?",
        answer: "The declaration <?xml version=\"1.0\"?> is only allowed at the very start of the document. A blank line, a space, or a second declaration pasted in the middle of the file makes it invalid. Delete everything before <?xml and try again.",
      },
    ],
  },

  "xml/compare": {
    about: [
      "An XML compare tool finds the differences between two XML documents by parsing them rather than comparing raw text. You can compare XML online and get a list of the elements, attributes and values that were added, removed or changed, which is far easier to review than a line diff of two reformatted config files or API responses.",
      "Paste the original into XML A and the new version into XML B. Each difference is listed with a path such as $.config.plan, built from the element names, and attributes appear with an @ prefix, as in $.catalog.book.@id. Use it to review changes to a Maven or .NET config, compare SOAP responses from two environments, or check what an export job changed.",
      "Elements that appear more than once become a list, and lists are compared by position. So if B has two <item> elements where A had one, the whole item entry is reported as changed rather than one item being added. Text is trimmed before comparing, and values are compared as text. Both documents are parsed in your browser.",
    ],
    faq: [
      {
        question: "Why are 1.0 and 1 reported as different?",
        answer: "XML has no number type, so every element and attribute value is compared as text, and \"1.0\" and \"1\" are different strings. Leading and trailing whitespace is trimmed, so <seats> 1 </seats> and <seats>1</seats> count as the same.",
      },
      {
        question: "Does the order of elements matter?",
        answer: "Sibling elements with different names are matched by name, so moving <name> below <plan> is not a difference. Repeated elements with the same name are matched by position, so swapping two <item> elements is reported as changes at both positions.",
      },
    ],
  },

  "yaml/formatter": {
    about: [
      "A YAML formatter re-indents YAML so every level lines up consistently, which is easy to lose in hand-edited Kubernetes manifests, Docker Compose files, GitHub Actions workflows and Helm values. The output is produced by parsing your YAML and writing it out again, so the result is always valid YAML with the same data.",
      "Paste YAML on the left and the formatted version appears on the right. Choose 2 or 4 spaces for indentation, or turn on Compact (flow) style to write everything on one JSON-like line with {} and []. Long strings are never wrapped onto extra lines. The Format button copies the result back into the input, and you can copy or download it as formatted.yaml.",
      "Because the YAML is re-serialized, values are written in their normalized form: 0x1F becomes 31, version: 1.10 becomes 1.1, and quotes that are not needed are dropped. If a value must stay exactly as typed, such as a version number or a ZIP code with a leading zero, quote it in the input. Parsing and formatting happen in your browser.",
    ],
    faq: [
      {
        question: "Why did my anchor names change to &ref_0?",
        answer: "Anchors and aliases are resolved when the YAML is parsed, and the original names are not kept. When the formatter writes the data back, any value that is referenced more than once gets a generated anchor such as &ref_0 and aliases like *ref_0. Rename them afterwards if the names matter to readers.",
      },
      {
        question: "Why did a number in my YAML change?",
        answer: "Unquoted values that look like numbers are parsed as numbers and then written in standard form, so 1.10 becomes 1.1 and 0x1F becomes 31. This is a common source of bugs for version strings and IDs. Wrap them in quotes, for example version: \"1.10\", and the formatter keeps them as strings.",
      },
    ],
  },

  "yaml/validator": {
    about: [
      "A YAML validator checks whether a YAML file parses before a deploy or CI run fails on it. Paste a Kubernetes manifest, a docker-compose.yml, a GitHub Actions workflow or an OpenAPI spec to check YAML online and see either a Valid badge or the exact line and column of the first problem.",
      "Validation runs as you type. For valid YAML, the summary shows the top-level type, the total number of keys, the number of list items and the maximum nesting depth, which helps confirm that indentation put items where you meant. Load invalid example shows an unclosed flow sequence, a typical copy-paste error. Common errors include tabs used for indentation and a key repeated in the same mapping.",
      "This validator checks syntax only, not whether a Kubernetes or Compose file uses the right fields. It parses scalars with YAML 1.2 rules, so only true and false are booleans, while yes, no, on and off stay strings. YAML 1.1 parsers such as PyYAML treat those words as booleans, so quote them if a file is read by both. Everything runs in your browser.",
    ],
    faq: [
      {
        question: "Does the validator flag duplicate keys?",
        answer: "Yes. A mapping that defines the same key twice, such as two image: lines under one container, is reported as a duplicated mapping key error with its line number. Some tools silently keep the last value instead, which can hide a real mistake, so it is worth fixing even if another tool accepts the file.",
      },
      {
        question: "Is the country code NO read as false?",
        answer: "Not here. Under YAML 1.2 rules, which this validator uses, NO, yes and off are plain strings. In YAML 1.1 parsers they become booleans, the so-called Norway problem. If a file may be read by an older parser, quote values like \"NO\" to be safe.",
      },
    ],
  },

  "csv/viewer": {
    about: [
      "A CSV viewer shows comma-separated data as a readable table, so you can open a CSV file online and check its columns without starting Excel or importing it into a database. It is useful for a quick look at a report export, a database dump or a CSV returned by an API.",
      "Paste the CSV and the table appears on the right with a count of rows and columns. If everything lands in one column, change the delimiter to semicolon, which many European Excel exports use, or to tab for TSV files. The first non-empty row is used as the header, and a blank header cell is shown as column1, column2 and so on.",
      "The table has one column per header cell. A row with fewer fields shows empty cells, but values beyond the last header are not displayed, so a sudden mismatch usually means an unquoted comma inside a value. For example, Lee, Sam must be written as \"Lee, Sam\" to stay in one cell. Parsing happens in your browser.",
    ],
    faq: [
      {
        question: "Why is all my data in a single column?",
        answer: "The file uses a different separator than the one selected. Exports from Excel in many European locales use semicolons because the comma is the decimal separator there, and database tools often export tab-separated files. Switch the Delimiter setting and the table splits into columns.",
      },
      {
        question: "Why does an error say there is an unterminated quoted field?",
        answer: "A field opened with a double quote but never closed, so the parser read the rest of the file as part of that one value. Look for a stray quote character, or a quote inside a value that was not doubled. In CSV, a literal quote inside a quoted field must be written as two quotes, as in \"He said \"\"hi\"\"\".",
      },
    ],
  },

  "csv/to-excel": {
    about: [
      "A CSV to Excel converter turns comma, semicolon or tab separated text into a real .xlsx workbook. It avoids the usual problems of opening a CSV in Excel directly, such as broken columns or long numbers and ZIP codes being reformatted, and gives you a file you can email to someone who expects a spreadsheet.",
      "Paste the CSV, choose the delimiter that matches it, and check the preview table. Click Download Excel (.xlsx) to save converted.xlsx with all rows on a single sheet named Sheet1. The first row of the CSV becomes the first row of the sheet. Typical uses are sharing a database export with a non-technical teammate or preparing an import template.",
      "Every cell is written as text, exactly as it appears in the CSV. That keeps values like 02134, 0012 or a 16-digit order number intact, which Excel would otherwise strip or round when opening a CSV. The trade-off is that number columns are text, so convert them in Excel before using SUM or charts. The conversion runs in your browser.",
    ],
    faq: [
      {
        question: "Why are my numbers stored as text in Excel?",
        answer: "The converter writes every cell as text so leading zeros and long IDs are not changed. To turn a column back into numbers, select it and use the warning icon's Convert to Number option, or Data > Text to Columns and click Finish. Formulas such as SUM will then include those cells.",
      },
      {
        question: "Can I name the sheet or create several sheets?",
        answer: "No. The workbook always has one sheet called Sheet1. Rename it in Excel after downloading, or convert each CSV separately and move the sheets into one workbook with Move or Copy.",
      },
    ],
  },

  "csv/cleaner": {
    about: [
      "A CSV cleaner removes the common mess from spreadsheet exports before you import or analyse them: spaces around values, blank rows and repeated rows. It is a quick way to clean CSV data online when a mailing list, product feed or survey export needs tidying and a script would be overkill.",
      "Paste the CSV, pick its delimiter, and choose any of Trim whitespace, Remove empty rows and Remove duplicate rows. The cleaned CSV updates as you change options, along with the number of rows in and out and how many empty and duplicate rows were removed. Copy the result or download it as cleaned.csv.",
      "Trimming runs first, so \"  Jane Doe \" and \"Jane Doe\" are treated as the same value when duplicates are checked. Matching is otherwise exact and case-sensitive, so Jane and jane are different rows; normalize case elsewhere if that matters. The header row is trimmed too when Trim whitespace is on, but it is never removed. Cleaning happens entirely in your browser.",
    ],
    faq: [
      {
        question: "Is duplicate matching case-sensitive?",
        answer: "Yes. Two rows only count as duplicates when every cell matches exactly after optional trimming, so JANE@EXAMPLE.COM and jane@example.com are kept as separate rows. Lowercase the column first, for example in a spreadsheet, if you want to deduplicate email addresses regardless of case.",
      },
      {
        question: "Does the cleaner change quoting or line endings?",
        answer: "The output is written fresh, so only fields that contain the delimiter, a double quote or a line break are wrapped in quotes, and fields that were quoted in the input without needing it lose their quotes. Rows are separated with CRLF line endings, the convention in the CSV specification, RFC 4180, which Excel and most importers read without problems.",
      },
    ],
  },

  "sql/query-builder": {
    about: [
      "An SQL query builder writes a SELECT statement for you from simple form fields. Enter a table, the columns you want and some conditions, and you get a formatted query to paste into a database client, a script or a code review. It is handy when you are learning SQL or just want to write a SELECT query quickly without typos.",
      "Set the table name and a comma-separated column list, or leave the list empty to select *. Tick DISTINCT to drop duplicate rows. Each WHERE condition has a column, an operator (=, !=, >, <, >=, <=, LIKE, IN, IS NULL or IS NOT NULL) and a value, and is joined to the previous one with AND or OR. Add an ORDER BY column with ASC or DESC and a numeric LIMIT.",
      "Conditions are joined in order without parentheses, and SQL evaluates AND before OR. So a = 1 OR b = 2 AND c = 3 means a = 1 OR (b = 2 AND c = 3). Also, choosing = with the value null produces = NULL, which never matches any row; use the IS NULL operator instead. The query is built in your browser.",
    ],
    faq: [
      {
        question: "How do I write a LIKE search?",
        answer: "Choose LIKE as the operator and include the wildcards in the value yourself: % matches any run of characters and _ matches exactly one. For example, the value %@gmail.com finds emails ending in @gmail.com, and Jo% finds names starting with Jo. The value is quoted for you.",
      },
      {
        question: "Why doesn't LIMIT work in SQL Server or Oracle?",
        answer: "LIMIT is supported by MySQL, MariaDB, PostgreSQL and SQLite, but not by SQL Server or Oracle. In SQL Server use SELECT TOP 10 ... or OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY after ORDER BY. In Oracle 12c and later, use FETCH FIRST 10 ROWS ONLY.",
      },
      {
        question: "How do I filter by a list of values?",
        answer: "Pick the IN operator and type the values separated by commas, such as active, pending, trial. Each value is quoted separately, giving status IN ('active', 'pending', 'trial'), while numbers like 1, 2, 3 are left unquoted.",
      },
    ],
  },

  "sql/from-json": {
    about: [
      "JSON to SQL converts a JSON object or an array of objects into SQL INSERT statements. It is a quick way to load an API response, a fixture file or exported data into a table for testing, seeding a development database, or reproducing a bug with real-looking rows.",
      "Paste the JSON, type the target table name in the toolbar, and download the result as insert.sql. Every key becomes a column, numbers are written as-is, true and false as TRUE and FALSE, null as NULL, and strings in single quotes with any single quote doubled, so O'Brien becomes 'O''Brien'. Nested objects and arrays are stored as JSON text in a string literal.",
      "Table and column names are wrapped in backticks, the identifier quoting used by MySQL and MariaDB and also accepted by SQLite. PostgreSQL and SQL Server do not accept backticks, so replace them with double quotes, or square brackets in SQL Server, before running the script. Generating the SQL happens in your browser.",
    ],
    faq: [
      {
        question: "Which databases can run the generated INSERT statements?",
        answer: "The output runs as-is on MySQL, MariaDB and recent versions of SQLite. For PostgreSQL, replace the backticks with double quotes. For SQL Server, replace them with square brackets and change TRUE and FALSE to 1 and 0, since SQL Server has no boolean literals.",
      },
      {
        question: "How can I insert a large number of rows faster?",
        answer: "The tool writes one INSERT per object, which is easy to read but slow when each statement is committed on its own. Put BEGIN; before the statements and COMMIT; after them to run everything in one transaction, which is usually much faster. For very large files, your database's bulk loader, such as COPY in PostgreSQL or LOAD DATA in MySQL, is faster still.",
      },
    ],
  },

  "security/jwt-generator": {
    about: [
      "A JWT generator creates a signed JSON Web Token from claims you choose, so you can test an API, a middleware or an auth flow without logging in through the real app. Type the payload as JSON, enter the shared secret, and a token signed with HMAC appears instantly, ready to paste into an Authorization: Bearer header.",
      "Choose HS256, HS384 or HS512 to sign with SHA-256, SHA-384 or SHA-512. Expires in adds an exp claim 15 minutes, 1 hour, 1 day, 7 days or 30 days from now, or none at all, and the iat checkbox adds the issued-at time. When enabled, they are set at signing time and replace any iat or exp you typed in the payload.",
      "The header and payload are only Base64URL-encoded, so anyone holding the token can read them; never put passwords or other secrets in a claim. The secret is used as plain UTF-8 text. If your server stores its secret as Base64 and decodes it before verifying, the signatures will not match. Signing uses the Web Crypto API in your browser.",
    ],
    faq: [
      {
        question: "Why does my server reject the token with an invalid signature error?",
        answer: "The server must use exactly the same secret and algorithm. Check for a trailing space or newline in either secret, an HS384 or HS512 token sent to a server that only accepts HS256, and a secret that the server Base64-decodes, while this tool uses the text as typed.",
      },
      {
        question: "How long should an HS256 secret be?",
        answer: "The JWA specification, RFC 7518, requires an HMAC key at least as long as the hash output: 256 bits (32 bytes) for HS256, 384 bits for HS384 and 512 bits for HS512. A 64-character hex string from the Random Token generator gives exactly 32 random bytes.",
      },
      {
        question: "What units do iat and exp use?",
        answer: "Both are NumericDate values: whole seconds since 1 January 1970 UTC, not milliseconds. So exp: 1767225600 means 1 January 2026 at 00:00 UTC. If you set exp by hand from JavaScript, use Math.floor(Date.now() / 1000) rather than Date.now().",
      },
    ],
  },

  "security/bcrypt": {
    about: [
      "A bcrypt generator hashes a password with bcrypt, the slow, salted algorithm designed for password storage, and lets you check a password against an existing hash. Developers use it to create a seed user for a test database, reset an admin password by hand, or confirm that a hash from their app is what they expect.",
      "Enter a password, choose the salt rounds between 4 and 14, and click Generate hash. The rounds value is a cost factor: the work is 2 to the power of the rounds, so each step up doubles the time. In the verify section, paste a plain-text password and a hash to see whether they match, which is how a login check works.",
      "A hash such as $2b$10$ followed by 53 characters has three parts: the version, the cost, then a 22-character salt and a 31-character hash, 60 characters in total. bcrypt only uses the first 72 bytes of the input and ignores the rest, so two long passwords with the same first 72 bytes match the same hash. Hashing runs in your browser.",
    ],
    faq: [
      {
        question: "Why does the same password give a different hash every time?",
        answer: "Each hash uses a new random salt, which is stored inside the hash string. That stops attackers from using precomputed tables and hides which users share a password. To check a password, do not compare hashes directly; use the verify section here or bcrypt.compare() in your code, which reads the salt from the stored hash.",
      },
      {
        question: "What is the difference between $2a$, $2b$ and $2y$?",
        answer: "They are revisions of the bcrypt format. $2b$ is the current one and is what this tool produces; $2y$ is what PHP's password_hash() writes; $2a$ is older and still widely found. They produce the same result for normal passwords, and the verify section accepts all three.",
      },
      {
        question: "Is there a maximum password length for bcrypt?",
        answer: "Yes. bcrypt only uses the first 72 bytes of the input, and characters outside basic ASCII take 2 to 4 bytes each in UTF-8. Everything after 72 bytes is ignored, so if you allow very long passphrases, either limit their length or pre-hash them in a way your framework documents.",
      },
    ],
  },

  "security/password-strength": {
    about: [
      "A password strength checker estimates how hard a password would be to guess and explains what makes it weak. Type a password to test it and you get a rating from Very Weak to Very Strong, an entropy estimate in bits, an estimated offline crack time, and specific suggestions to improve it.",
      "The estimate is length multiplied by log2 of the character pool, where lowercase and uppercase letters add 26 each, digits add 10 and symbols add 32. It is reduced for one of the most common leaked passwords, a character repeated three or more times, or a sequence such as 1234, abcd or qwer. Under 28 bits is Very Weak, 60 bits Strong, and 80 bits or more Very Strong.",
      "The formula assumes the characters were chosen at random, so human patterns score higher than they deserve. Summer2024! uses all four character types and comes out at about 72 bits, rated Strong, yet a word plus a year plus ! is one of the first patterns password crackers try. Use a generated password for anything important. Analysis happens in your browser.",
    ],
    faq: [
      {
        question: "Why is a predictable password rated Strong?",
        answer: "The checker only knows a short list of very common passwords, repeated characters and simple sequences. It cannot recognise dictionary words, names, dates or leetspeak like P@ssw0rd, so those score as if they were random. Treat the rating as an upper limit, and prefer passwords from a generator.",
      },
      {
        question: "How many bits of entropy should a password have?",
        answer: "On this checker's scale, 60 bits is Strong and 80 bits is Very Strong. A randomly generated 16-character password using letters, numbers and symbols is well over 80 bits. For a password you must remember, a passphrase of several random words reaches similar strength and is easier to type.",
      },
      {
        question: "Is the crack time the average or the worst case?",
        answer: "It is the time to try every combination at 10 billion guesses per second, which is the worst case for the attacker. On average a brute-force search finds the password in about half that time. Real attacks start with wordlists and patterns, so weak human passwords fall much faster than the estimate.",
      },
    ],
  },

  "security/random-token": {
    about: [
      "A random token generator creates unpredictable strings for API keys, session IDs, password reset links, webhook secrets and one-time codes. Each character comes from the browser's cryptographically secure random number generator, so you can generate a secure random string without opening a terminal or writing a one-off script with your language's crypto library.",
      "Set the length from 4 to 128 characters, pick a format and choose how many tokens to make: 1, 5, 10 or 20. Hexadecimal uses 0-9 and a-f, Base64 adds uppercase letters, + and /, Base64 (URL-safe) swaps those two for - and _, Alphanumeric uses A-Z, a-z and 0-9, and Numeric (PIN) uses digits only. Copy one token or all of them, one per line.",
      "Strength depends on length and format. Each hex character carries 4 bits, a Base64 character 6 bits, an alphanumeric character about 5.95 bits and a digit about 3.32 bits. For 128 bits, the common target for session tokens, use 32 hex, 22 Base64 or alphanumeric, or 39 numeric characters. Tokens are generated on your device and not stored.",
    ],
    faq: [
      {
        question: "Can I decode a Base64 token back into bytes?",
        answer: "Treat it as a string, not as encoded data. The token is cut to the exact length you choose, so it is usually not a complete Base64 value and may not decode cleanly. If you need a key of an exact byte length, use Hexadecimal and set the length to twice the number of bytes, for example 64 characters for a 32-byte key.",
      },
      {
        question: "How should I store API keys made with this tool?",
        answer: "Store a hash of the key, for example SHA-256, rather than the key itself, and compare hashes when a request arrives. Because the key is long and random, a fast hash is enough here, unlike passwords. Show the full key to the user only once when it is created.",
      },
    ],
  },

  "ids/uuid-v1": {
    about: [
      "A UUID v1 generator creates time-based UUIDs as defined in RFC 4122 and its successor RFC 9562. A version 1 UUID combines a 60-bit timestamp, counted in 100-nanosecond intervals since 15 October 1582, with a clock sequence and a 48-bit node ID, so each value records when it was made.",
      "Choose how many to generate, from 1 to 20, and use Uppercase or Include hyphens to match the format your database or API expects. Click Regenerate for a fresh batch, and copy one UUID or the whole list. v1 is mainly needed for systems that already use it, such as older Cassandra schemas built around timeuuid columns.",
      "You can recognise a v1 UUID by the 1 at the start of the third group, as in xxxxxxxx-xxxx-1xxx-xxxx-xxxxxxxxxxxx. The timestamp is split, with its lowest bits first, so v1 strings do not sort in creation order. This generator uses a random node ID and clock sequence instead of your MAC address, and runs in your browser.",
    ],
    faq: [
      {
        question: "Can I get the creation time back from a UUID v1?",
        answer: "Yes. Take the third group without its leading 1, then the second group, then the first, and join them into a 15-digit hex number. That is the count of 100-nanosecond intervals since 15 October 1582. Subtract 122192928000000000 and divide by 10,000 to get Unix time in milliseconds.",
      },
      {
        question: "Why don't UUID v1 values sort by time?",
        answer: "The first group holds the fastest-changing low bits of the timestamp, so sorting the strings orders them by those bits rather than by creation time. RFC 9562 added UUID v6, which reorders the same fields, and UUID v7, which starts with a Unix timestamp, for cases where sortable IDs are needed.",
      },
    ],
  },

  "ids/uuid-v7": {
    about: [
      "A UUID v7 generator creates time-ordered UUIDs as defined in RFC 9562. The first 48 bits are the Unix time in milliseconds and the remaining bits are random apart from the version and variant, so IDs created later sort after earlier ones while staying unique across machines without coordination.",
      "Choose how many to generate, from 1 to 20, toggle Uppercase or Include hyphens, and copy one UUID or the whole batch. v7 is a good default primary key for new tables, event IDs and log records, because new rows are added at the end of a B-tree index instead of at random positions as with UUID v4.",
      "Each value has 74 random bits, and you can spot the version by the 7 at the start of the third group. In this generator, UUIDs created within the same millisecond share a timestamp, but their order within that millisecond is random, because no counter is used. RFC 9562 describes optional counter methods for strict ordering. Generation happens in your browser.",
    ],
    faq: [
      {
        question: "How do I read the timestamp from a UUID v7?",
        answer: "The first 12 hex characters, without hyphens, are the creation time in milliseconds since 1970. In JavaScript: new Date(parseInt(uuid.replace(/-/g, \"\").slice(0, 12), 16)). For example, a UUID starting with 0190 decodes to a moment in mid-2024.",
      },
      {
        question: "Does UUID v7 give ordered indexes in every database?",
        answer: "It works well where UUIDs are compared byte by byte, such as PostgreSQL's uuid type or a BINARY(16) column in MySQL. SQL Server's uniqueidentifier type sorts by the last group of bytes first, so v7 values do not stay in time order there; store them as BINARY(16) if ordering matters.",
      },
    ],
  },

  "ids/random-password": {
    about: [
      "This random password generator creates a new password each time you change an option, using the browser's cryptographically secure random number generator. It is meant for quickly making a password for a new account, a database user, a Wi-Fi network or a test fixture, when you want something strong without thinking up characters yourself.",
      "Choose a length from 6 to 64 and any mix of uppercase, lowercase, numbers and symbols. Exclude ambiguous characters drops i, l, 1, L, o, 0 and O for passwords that will be read aloud or typed from paper. The Recent passwords list keeps the last few results so you can pick one, and it disappears when you leave or reload the page.",
      "With all four sets on, each character is chosen from 88 options: 26 uppercase, 26 lowercase, 10 digits and 26 symbols, so a 16-character password has about 103 bits of entropy. Characters are drawn independently, so a short password is not guaranteed to contain every selected type. Passwords are created on your device and never sent anywhere.",
    ],
    faq: [
      {
        question: "Which symbols can appear in the password?",
        answer: "The symbol set is ! @ # $ % ^ & * ( ) _ + - = [ ] { } | ; : , . < > ?. It leaves out spaces, quotes, backslashes, forward slashes, backticks and tildes, which often cause escaping problems in config files and connection strings. Characters such as $, & and | still need quoting when you paste the password into a shell command.",
      },
      {
        question: "Why doesn't my password contain a number even though Numbers is on?",
        answer: "Every character is picked at random from all the selected sets combined, so with short lengths a set can be missing by chance. If a site requires at least one digit or symbol, click Generate new password until it fits, or use a longer length, which makes a missing set much less likely.",
      },
      {
        question: "How do I generate a random password from the command line?",
        answer: "On macOS or Linux, openssl rand -base64 24 prints 32 random characters from 24 random bytes. In PowerShell 7.2 or later, you can use [Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(24)) for the same result.",
      },
    ],
  },
};
