export type ToolStatus = "live" | "soon";

export interface Tool {
  /** URL slug, unique within its category */
  slug: string;
  /** Display name, e.g. "JSON Formatter" */
  title: string;
  /** Two or three sentences shown under the heading, and used as the meta description. */
  description: string;
  status: ToolStatus;
  /** Extra keywords to help with on-page SEO / search */
  keywords?: string[];
  /** Longer browser-tab and Google title. The visible heading stays `title`. */
  seoTitle?: string;
}

export interface Category {
  /** URL slug, e.g. "json" */
  slug: string;
  /** Display name, e.g. "JSON" */
  title: string;
  icon: string;
  description: string;
  tools: Tool[];
}

function tool(
  slug: string,
  title: string,
  description: string,
  status: ToolStatus = "soon",
  keywords: string[] = [],
  seoTitle?: string,
): Tool {
  return { slug, title, description, status, keywords, seoTitle };
}

export const categories: Category[] = [
  {
    slug: "json",
    title: "JSON",
    icon: "\u{1F4C4}",
    description:
      "Format, validate, beautify, minify, compare, and convert JSON online. Fast, free, and runs entirely in your browser.",
    tools: [
      tool(
        "formatter",
        "JSON Formatter",
        "Format and beautify messy JSON into clean, readable, indented JSON instantly. Free, no sign-up, runs in your browser.",
        "live",
        ["json formatter", "json beautifier", "pretty print json", "format json online"],
        "JSON Formatter Online — Free, No Upload"
      ),
      tool(
        "validator",
        "JSON Validator",
        "Validate JSON syntax instantly and get precise line and column error locations. Free, no sign-up, runs in your browser.",
        "live",
        ["json validator", "validate json online", "json syntax checker"],
        "JSON Validator Online — Check Syntax, No Upload"
      ),
      tool(
        "beautifier",
        "JSON Beautifier",
        "Beautify JSON with custom indentation and optional alphabetical key sorting. Free, no sign-up, runs in your browser.",
        "live",
        ["json beautifier", "beautify json online", "pretty json"],
        "JSON Beautifier — Pretty Print JSON Online"
      ),
      tool(
        "minifier",
        "JSON Minifier",
        "Minify JSON by removing whitespace to reduce payload size for production. Free, no sign-up, runs in your browser.",
        "live",
        ["json minifier", "minify json online", "compress json"],
        "JSON Minifier — Compress JSON Online"
      ),
      tool(
        "diff",
        "JSON Diff",
        "Compare two JSON documents and get a detailed, path-by-path list of differences. Free, no sign-up, runs in your browser.",
        "live",
        ["json diff", "compare json files", "json diff checker"],
        "JSON Diff — Compare Two JSON Files Online"
      ),
      tool(
        "compare",
        "JSON Compare",
        "Compare two JSON objects side by side in a clear match/differs table. Free, no sign-up, runs in your browser.",
        "live",
        ["json compare", "json comparison tool"],
        "JSON Compare — Side-by-Side JSON Checker"
      ),
      tool(
        "viewer",
        "JSON Viewer",
        "View JSON with syntax highlighting for keys, strings, numbers, and booleans. Free, no sign-up, runs in your browser.",
        "live",
        ["json viewer", "json syntax highlighter"],
        "JSON Viewer — View & Highlight JSON Online"
      ),
      tool(
        "tree-viewer",
        "JSON Tree Viewer",
        "Explore deeply nested JSON as a collapsible, navigable tree structure. Free, no sign-up, runs in your browser.",
        "live",
        ["json tree viewer", "json tree explorer"],
        "JSON Tree Viewer — Collapsible JSON Explorer"
      ),
      tool(
        "to-xml",
        "JSON to XML",
        "Convert JSON data into well-formed XML markup instantly, right in your browser. Free, no sign-up, runs in your browser.",
        "live",
        ["json to xml converter", "convert json to xml"],
        "JSON to XML Converter — Free & Instant"
      ),
      tool(
        "to-yaml",
        "JSON to YAML",
        "Convert JSON into clean, properly indented YAML for configs like Docker Compose, Kubernetes and CI files. Free, no sign-up, runs in your browser.",
        "live",
        ["json to yaml converter", "convert json to yaml"],
        "JSON to YAML Converter — Free & Instant"
      ),
      tool(
        "to-csv",
        "JSON to CSV",
        "Convert a JSON array of objects into a downloadable CSV spreadsheet. Free, no sign-up, runs in your browser.",
        "live",
        ["json to csv converter", "convert json to csv"],
        "JSON to CSV Converter — Download as CSV"
      ),
      tool(
        "to-excel",
        "JSON to Excel",
        "Convert a JSON array of objects into a downloadable Excel (.xlsx) workbook. Free, no sign-up, runs in your browser.",
        "live",
        ["json to excel converter", "json to xlsx"],
        "JSON to Excel Converter — Download .xlsx"
      ),
      tool(
        "to-java",
        "JSON to Java",
        "Generate Java POJO classes with getters and setters from JSON. Free, no sign-up, runs in your browser.",
        "live",
        ["json to java pojo", "json to java class generator"],
        "JSON to Java POJO — Class Generator Online"
      ),
      tool(
        "to-csharp",
        "JSON to C#",
        "Generate C# classes with auto-properties from JSON, with a class for every nested object and inferred types. Free, no sign-up, runs in your browser.",
        "live",
        ["json to c# class generator", "json to csharp"],
        "JSON to C# Class Generator Online"
      ),
      tool(
        "to-php",
        "JSON to PHP",
        "Convert JSON into a native PHP array literal, ready to paste into your code. Free, no sign-up, runs in your browser.",
        "live",
        ["json to php array", "json to php converter"],
        "JSON to PHP Array Converter Online"
      ),
      tool(
        "to-typescript",
        "JSON to TypeScript",
        "Generate TypeScript interfaces from JSON, including nested types. Free, no sign-up, runs in your browser.",
        "live",
        ["json to typescript interface", "json to ts type generator"],
        "JSON to TypeScript Interface Generator"
      ),
      tool(
        "to-kotlin",
        "JSON to Kotlin",
        "Generate Kotlin data classes from JSON, including nested types. Free, no sign-up, runs in your browser.",
        "live",
        ["json to kotlin data class"],
        "JSON to Kotlin Data Class Generator"
      ),
      tool(
        "to-dart",
        "JSON to Dart",
        "Generate Dart classes with fromJson factories from JSON, ready for Flutter. Free, no sign-up, runs in your browser.",
        "live",
        ["json to dart class", "json to flutter model"],
        "JSON to Dart Class Generator for Flutter"
      ),
      tool(
        "escape-unescape",
        "JSON Escape/Unescape",
        "Escape raw text into a safe JSON string literal, or unescape one back to plain text. Free, no sign-up, runs in your browser.",
        "live",
        ["json escape", "json unescape", "escape json string"],
        "JSON Escape & Unescape String Online"
      ),
    ],
  },
  {
    slug: "xml",
    title: "XML",
    icon: "\u{1F4D1}",
    description: "Format, validate, minify, view, compare, and convert XML documents online.",
    tools: [
      tool(
        "formatter",
        "XML Formatter",
        "Format and indent XML into a clean, readable structure with validation. Free, no sign-up, runs in your browser.",
        "live",
        ["xml formatter", "format xml online", "xml beautifier"],
        "XML Formatter Online — Beautify XML in Browser"
      ),
      tool(
        "validator",
        "XML Validator",
        "Validate XML well-formedness instantly and get clear parser error messages. Free, no sign-up, runs in your browser.",
        "live",
        ["xml validator", "validate xml online", "xml syntax checker"],
        "XML Validator — Check XML Syntax Online"
      ),
      tool(
        "minifier",
        "XML Minifier",
        "Minify XML by stripping whitespace to reduce payload size. Free, no sign-up, runs in your browser.",
        "live",
        ["xml minifier", "minify xml online", "compress xml"],
        "XML Minifier — Compress XML Online"
      ),
      tool(
        "to-json",
        "XML to JSON",
        "Convert XML documents into JSON, with attributes and repeated elements handled automatically. Free, no sign-up, runs in your browser.",
        "live",
        ["xml to json converter", "convert xml to json"],
        "XML to JSON Converter — Free & Instant"
      ),
      tool(
        "to-csv",
        "XML to CSV",
        "Convert XML data with repeated elements into a downloadable CSV spreadsheet. Free, no sign-up, runs in your browser.",
        "live",
        ["xml to csv converter", "convert xml to csv"],
        "XML to CSV Converter — Download as CSV"
      ),
      tool(
        "viewer",
        "XML Viewer",
        "View XML with syntax highlighting for tags, attributes, and comments. Free, no sign-up, runs in your browser.",
        "live",
        ["xml viewer", "xml syntax highlighter"],
        "XML Viewer — View & Highlight XML Online"
      ),
      tool(
        "compare",
        "XML Compare",
        "Compare two XML documents and get a detailed, path-by-path list of differences. Free, no sign-up, runs in your browser.",
        "live",
        ["xml compare", "compare xml files", "xml diff"],
        "XML Compare — Diff Two XML Files Online"
      ),
      tool(
        "xpath-tester",
        "XPath Tester",
        "Test XPath expressions against an XML document and see matching nodes instantly. Free, no sign-up, runs in your browser.",
        "live",
        ["xpath tester", "xpath evaluator online"],
        "XPath Tester — Test XPath Online"
      ),
    ],
  },
  {
    slug: "yaml",
    title: "YAML",
    icon: "\u{1F4D8}",
    description: "Format, validate, and convert YAML configuration files online.",
    tools: [
      tool(
        "formatter",
        "YAML Formatter",
        "Format and beautify YAML documents with consistent indentation. Free, no sign-up, runs in your browser.",
        "live",
        ["yaml formatter", "format yaml online", "yaml beautifier"],
        "YAML Formatter Online — Format YAML in Browser"
      ),
      tool(
        "validator",
        "YAML Validator",
        "Validate YAML syntax instantly and get precise line and column error locations. Free, no sign-up, runs in your browser.",
        "live",
        ["yaml validator", "validate yaml online", "yaml syntax checker"],
        "YAML Validator — Check YAML Syntax Online"
      ),
      tool(
        "to-json",
        "YAML to JSON",
        "Convert YAML documents into JSON instantly, right in your browser. Free, no sign-up, runs in your browser.",
        "live",
        ["yaml to json converter", "convert yaml to json"],
        "YAML to JSON Converter — Free & Instant"
      ),
      tool(
        "from-json",
        "JSON to YAML",
        "Convert JSON into clean, properly indented YAML for configs like Docker Compose, Kubernetes and CI files. Free, no sign-up, runs in your browser.",
        "live",
        ["json to yaml converter", "convert json to yaml"],
        "JSON to YAML Converter Online — Free"
      ),
    ],
  },
  {
    slug: "csv",
    title: "CSV",
    icon: "\u{1F4CA}",
    description: "View, format, clean, compare, and convert CSV spreadsheets online.",
    tools: [
      tool(
        "viewer",
        "CSV Viewer",
        "View CSV files as a clean, sortable table right in your browser. Free, no sign-up, runs in your browser.",
        "live",
        ["csv viewer online", "view csv file", "csv table viewer"],
        "CSV Viewer — Open CSV as a Table Online"
      ),
      tool(
        "formatter",
        "CSV Formatter",
        "Reformat messy CSV data with consistent delimiters, quoting, and trimmed whitespace. Free, no sign-up, runs in your browser.",
        "live",
        ["csv formatter", "format csv online", "clean csv delimiters"],
        "CSV Formatter — Clean Up CSV Online"
      ),
      tool(
        "to-json",
        "CSV to JSON",
        "Convert CSV data into a JSON array of objects instantly. Free, no sign-up, runs in your browser.",
        "live",
        ["csv to json converter", "convert csv to json"],
        "CSV to JSON Converter Online — Free & Instant"
      ),
      tool(
        "to-xml",
        "CSV to XML",
        "Convert CSV rows into well-formed XML, using column headers as tag names. Supports comma, semicolon and tab delimiters. Free, runs in your browser.",
        "live",
        ["csv to xml converter", "convert csv to xml"],
        "CSV to XML Converter — Free & Instant"
      ),
      tool(
        "to-excel",
        "CSV to Excel",
        "Convert CSV data into a downloadable Excel (.xlsx) workbook. Free, no sign-up, runs in your browser.",
        "live",
        ["csv to excel converter", "convert csv to xlsx"],
        "CSV to Excel Converter — Download .xlsx"
      ),
      tool(
        "cleaner",
        "CSV Cleaner",
        "Trim whitespace, and remove empty or duplicate rows from messy CSV data. Free, no sign-up, runs in your browser.",
        "live",
        ["csv cleaner", "remove duplicate rows csv", "clean csv data"],
        "CSV Cleaner — Remove Duplicates & Blanks"
      ),
      tool(
        "diff",
        "CSV Diff",
        "Compare two CSV files row by row and highlight every difference. Free, no sign-up, runs in your browser.",
        "live",
        ["csv diff", "compare csv files", "csv comparison tool"],
        "CSV Diff — Compare Two CSV Files Online"
      ),
    ],
  },
  {
    slug: "sql",
    title: "SQL",
    icon: "\u{1F5C4}",
    description: "Format, minify, validate, and convert SQL queries online.",
    tools: [
      tool(
        "formatter",
        "SQL Formatter",
        "Paste a SQL query and get it cleanly indented instantly. Supports MySQL, PostgreSQL, SQL Server, SQLite and BigQuery, with keyword case options. Runs in your browser.",
        "live",
        ["sql formatter", "sql formatter online", "format sql query", "beautify sql"],
        "SQL Formatter Online — Format SQL Queries Free"
      ),
      tool(
        "minifier",
        "SQL Minifier",
        "Minify SQL by stripping comments, line breaks, and extra whitespace. Free, no sign-up, runs in your browser.",
        "live",
        ["sql minifier", "minify sql query", "compress sql"],
        "SQL Minifier — Compress SQL Queries Online"
      ),
      tool(
        "beautifier",
        "SQL Beautifier",
        "Beautify messy SQL into clean, readable, consistently indented queries. Free, no sign-up, runs in your browser.",
        "live",
        ["sql beautifier", "sql pretty print"],
        "SQL Beautifier — Beautify SQL Online"
      ),
      tool(
        "validator",
        "SQL Validator",
        "Validate SQL syntax and catch parse errors before you run your query. Free, no sign-up, runs in your browser.",
        "live",
        ["sql validator", "validate sql syntax", "sql syntax checker"],
        "SQL Validator — Check SQL Syntax Online"
      ),
      tool(
        "query-builder",
        "SQL Query Builder",
        "Visually build SELECT queries with columns, WHERE conditions, sorting, and limits. Free, no sign-up, runs in your browser.",
        "live",
        ["sql query builder", "visual sql builder", "build select query"],
        "SQL Query Builder — Build SELECT Visually"
      ),
      tool(
        "uppercase",
        "SQL Keywords Uppercase",
        "Convert all SQL keywords to UPPERCASE while preserving your original layout. Free, no sign-up, runs in your browser.",
        "live",
        ["sql keywords uppercase", "sql to uppercase"],
        "SQL Keywords to Uppercase Converter"
      ),
      tool(
        "lowercase",
        "SQL Keywords Lowercase",
        "Convert all SQL keywords to lowercase while preserving your original layout. Free, no sign-up, runs in your browser.",
        "live",
        ["sql keywords lowercase", "sql to lowercase"],
        "SQL Keywords to Lowercase Converter"
      ),
      tool(
        "to-json",
        "SQL to JSON",
        "Convert SQL INSERT statements into a clean JSON array of objects. Free, no sign-up, runs in your browser.",
        "live",
        ["sql to json converter", "convert sql insert to json"],
        "SQL to JSON — Convert INSERT Statements"
      ),
      tool(
        "from-json",
        "JSON to SQL",
        "Generate SQL INSERT statements from a JSON object or array. Free, no sign-up, runs in your browser.",
        "live",
        ["json to sql converter", "generate insert statements from json"],
        "JSON to SQL — INSERT Statement Generator"
      ),
    ],
  },
  {
    slug: "security",
    title: "Security",
    icon: "\u{1F510}",
    description: "Encode, decode, hash, and generate secure tokens and passwords online.",
    tools: [
      tool(
        "base64-encode",
        "Base64 Encode",
        "Encode any text (including Unicode and emoji) into Base64. Free, no sign-up, runs in your browser.",
        "live",
        ["base64 encode online", "encode text to base64", "base64 encoder"],
        "Base64 Encode Online — Free Text to Base64"
      ),
      tool(
        "base64-decode",
        "Base64 Decode",
        "Decode Base64 back into readable UTF-8 text, including emoji. Handles padded and unpadded input. Free, no sign-up, runs in your browser.",
        "live",
        ["base64 decode online", "decode base64 to text", "base64 decoder"],
        "Base64 Decode Online — Decode in Your Browser"
      ),
      tool(
        "url-encode",
        "URL Encode",
        "Percent-encode text or full URLs for safe use in query strings and links. Free, no sign-up, runs in your browser.",
        "live",
        ["url encode online", "percent encode text", "uri encode"],
        "URL Encode Online — Percent Encode Text Free"
      ),
      tool(
        "url-decode",
        "URL Decode",
        "Decode percent-encoded (%XX) URL strings back into plain text. Free, no sign-up, runs in your browser.",
        "live",
        ["url decode online", "percent decode", "uri decode"],
        "URL Decode Online — Percent Decode URLs Free"
      ),
      tool(
        "jwt-decoder",
        "JWT Decoder",
        "Decode and inspect JSON Web Tokens, with optional HMAC signature verification. Free, no sign-up, runs in your browser.",
        "live",
        ["jwt decoder online", "decode jwt token", "jwt.io alternative"],
        "JWT Decoder Online — Decode Token in Browser"
      ),
      tool(
        "jwt-generator",
        "JWT Generator",
        "Generate signed JSON Web Tokens with custom claims, expiry, and HMAC secret. Free, no sign-up, runs in your browser.",
        "live",
        ["jwt generator online", "create jwt token", "sign jwt hmac"],
        "JWT Generator — Create Signed Tokens Online"
      ),
      tool(
        "md5",
        "MD5 Generator",
        "Generate MD5 hashes from text, computed entirely in your browser. Free, no sign-up, runs in your browser.",
        "live",
        ["md5 hash generator", "md5 online", "generate md5 checksum"],
        "MD5 Hash Generator Online — Checksum in Browser"
      ),
      tool(
        "sha1",
        "SHA1 Generator",
        "Generate SHA-1 hashes from text using the Web Crypto API. Free, no sign-up, runs in your browser.",
        "live",
        ["sha1 hash generator", "sha1 online", "generate sha1 checksum"],
        "SHA-1 Hash Generator Online — Free"
      ),
      tool(
        "sha256",
        "SHA256 Generator",
        "Generate SHA-256 hashes from text using the Web Crypto API. Free, no sign-up, runs in your browser.",
        "live",
        ["sha256 hash generator", "sha256 online", "generate sha256 checksum"],
        "SHA256 Hash Generator Online — Free Checksum"
      ),
      tool(
        "sha512",
        "SHA512 Generator",
        "Generate SHA-512 hashes from text using the Web Crypto API. Free, no sign-up, runs in your browser.",
        "live",
        ["sha512 hash generator", "sha512 online", "generate sha512 checksum"],
        "SHA-512 Hash Generator Online — Free"
      ),
      tool(
        "hmac",
        "HMAC Generator",
        "Generate HMAC-SHA1/256/384/512 signatures from a message and secret key. Free, no sign-up, runs in your browser.",
        "live",
        ["hmac generator online", "hmac sha256 online", "generate hmac signature"],
        "HMAC Generator — SHA-256, SHA-512 Online"
      ),
      tool(
        "bcrypt",
        "Bcrypt Generator",
        "Hash passwords using bcrypt with adjustable salt rounds, and verify existing hashes. Free, no sign-up, runs in your browser.",
        "live",
        ["bcrypt generator online", "bcrypt hash password", "bcrypt online"],
        "Bcrypt Generator — Hash & Verify Passwords"
      ),
      tool(
        "password-generator",
        "Password Generator",
        "Generate strong, cryptographically random passwords with customizable rules. Free, no sign-up, runs in your browser.",
        "live",
        ["password generator online", "random password generator", "strong password generator"],
        "Strong Password Generator Online — Free & Random"
      ),
      tool(
        "password-strength",
        "Password Strength Checker",
        "Check how strong a password is, with entropy estimate and crack-time analysis. Free, no sign-up, runs in your browser.",
        "live",
        ["password strength checker", "check password strength online", "password entropy calculator"],
        "Password Strength Checker — Crack Time"
      ),
      tool(
        "random-token",
        "Random Token Generator",
        "Generate cryptographically secure random tokens in hex, Base64, or alphanumeric format. Free, no sign-up, runs in your browser.",
        "live",
        ["random token generator", "secure token generator", "api key generator"],
        "Random Token Generator — Hex & Base64"
      ),
    ],
  },
  {
    slug: "ids",
    title: "IDs",
    icon: "\u{1F194}",
    description: "Generate UUIDs, GUIDs, and random identifiers online.",
    tools: [
      tool(
        "uuid-v1",
        "UUID v1",
        "Generate time-based UUID v1 identifiers with a random node ID. Free, no sign-up, runs in your browser.",
        "live",
        ["uuid v1 generator", "generate uuid v1 online", "time-based uuid"],
        "UUID v1 Generator — Time-Based UUIDs"
      ),
      tool(
        "uuid-v4",
        "UUID v4",
        "Generate random UUID v4 (uuidv4) values instantly using crypto.randomUUID(). Create one or a batch, copy in one click. Made in your browser, never stored.",
        "live",
        ["uuid v4", "uuidv4", "uuid v4 generator", "generate uuid online", "random uuid generator"],
        "UUID v4 Generator — Random uuidv4 Online"
      ),
      tool(
        "uuid-v7",
        "UUID v7",
        "Generate sortable, time-ordered UUID v7 identifiers (RFC 9562). Free, no sign-up, runs in your browser.",
        "live",
        ["uuid v7 generator", "time ordered uuid", "sortable uuid"],
        "UUID v7 Generator — Sortable UUIDs Online"
      ),
      tool(
        "guid",
        "GUID Generator",
        "Generate GUIDs with optional uppercase, braces, and hyphen formatting. Free, no sign-up, runs in your browser.",
        "live",
        ["guid generator online", "generate guid", "microsoft guid format"],
        "GUID Generator Online — Free, Bulk"
      ),
      tool(
        "nano-id",
        "Nano ID",
        "Generate compact, URL-safe Nano IDs with a custom length or alphabet. Free, no sign-up, runs in your browser.",
        "live",
        ["nanoid generator", "url safe unique id", "short unique id generator"],
        "Nano ID Generator — Short URL-Safe IDs"
      ),
      tool(
        "random-string",
        "Random String",
        "Generate cryptographically random strings with a custom length and character set. Free, no sign-up, runs in your browser.",
        "live",
        ["random string generator", "generate random string online"],
        "Random String Generator — Custom Length"
      ),
      tool(
        "random-number",
        "Random Number",
        "Generate random numbers within a range, with an optional no-duplicates mode. Free, no sign-up, runs in your browser.",
        "live",
        ["random number generator", "generate random number online"],
        "Random Number Generator — Pick in a Range"
      ),
      tool(
        "random-password",
        "Random Password",
        "Generate strong, random, cryptographically secure passwords. Free, no sign-up, runs in your browser.",
        "live",
        ["random password generator", "generate secure password online"],
        "Random Password Generator — Secure & Free"
      ),
    ],
  },
  {
    slug: "html",
    title: "HTML",
    icon: "\u{1F310}",
    description: "Format, minify, encode, decode, and preview HTML online.",
    tools: [
      tool(
        "formatter",
        "HTML Formatter",
        "Format and indent messy HTML so it is easy to read. Keeps script, style and pre content intact and handles void tags. Free, runs in your browser.",
        "live",
        ["html formatter", "format html online", "html beautifier", "indent html"],
        "HTML Formatter Online — Beautify HTML Code"
      ),
      tool(
        "minifier",
        "HTML Minifier",
        "Minify HTML by removing whitespace and comments to make pages smaller and faster to load. Free, no sign-up, runs in your browser.",
        "live",
        ["html minifier", "minify html online", "compress html"],
        "HTML Minifier — Compress HTML Online"
      ),
      tool(
        "encoder",
        "HTML Encoder",
        "Encode text into HTML entities: & < > \" ' as named entities and non-ASCII characters and emoji as numeric ones. Free, runs in your browser.",
        "live",
        ["html encoder", "html entity encoder", "encode html characters"],
        "HTML Encoder — Text to HTML Entities"
      ),
      tool(
        "decoder",
        "HTML Decoder",
        "Decode named and numeric HTML entities like &amp; &copy; and &#233; back into readable text. Free, no sign-up, runs in your browser.",
        "live",
        ["html decoder", "html entity decoder", "decode html entities"],
        "HTML Decoder — HTML Entities to Text"
      ),
      tool(
        "preview",
        "HTML Preview",
        "Paste HTML, CSS and JavaScript and see it rendered live in a sandboxed frame, with desktop, tablet and mobile widths. Free, runs in your browser.",
        "live",
        ["html preview", "html viewer online", "live html editor"],
        "HTML Preview — Live HTML Viewer Online"
      ),
      tool(
        "escape",
        "HTML Escape",
        "Escape the five HTML special characters (& < > \" ') so text can be safely placed inside HTML. Free, no sign-up, runs in your browser.",
        "live",
        ["html escape", "escape html characters", "html special characters escape"],
        "HTML Escape — Escape Special Characters"
      ),
    ],
  },
  {
    slug: "css",
    title: "CSS",
    icon: "\u{1F3A8}",
    description: "Format, minify, and generate CSS with visual tools.",
    tools: [
      tool(
        "formatter",
        "CSS Formatter",
        "Format and beautify CSS with clean indentation, including @media blocks, comments and strings. One-click minify too. Free, runs in your browser.",
        "live",
        ["css formatter", "format css online", "css beautifier", "indent css"],
        "CSS Formatter — Beautify CSS Online"
      ),
      tool(
        "minifier",
        "CSS Minifier",
        "Minify CSS by removing comments and extra whitespace to shrink your stylesheet, without breaking strings or URLs. Free, runs in your browser.",
        "live",
        ["css minifier", "minify css online", "compress css"],
        "CSS Minifier — Compress CSS Online"
      ),
      tool(
        "beautifier",
        "CSS Beautifier",
        "Beautify minified or messy CSS into readable, consistently indented rules, including nested @media blocks. Free, runs in your browser.",
        "live",
        ["css beautifier", "beautify css online", "pretty css"],
        "CSS Beautifier — Pretty Print CSS Online"
      ),
      tool(
        "grid-generator",
        "CSS Grid Generator",
        "Design CSS Grid layouts visually: set columns, rows and gaps, see a live preview, and copy the grid CSS. Free, no sign-up, runs in your browser.",
        "live",
        ["css grid generator", "css grid layout generator", "grid-template-columns generator"],
        "CSS Grid Generator — Visual Layout Builder"
      ),
      tool(
        "flexbox-generator",
        "Flexbox Generator",
        "Design Flexbox layouts visually: direction, justify-content, align-items, wrap and gap, with a live preview and CSS to copy. Free, in your browser.",
        "live",
        ["flexbox generator", "css flexbox playground", "flex layout generator"],
        "Flexbox Generator — Visual CSS Flex Builder"
      ),
      tool(
        "border-radius-generator",
        "Border Radius Generator",
        "Create CSS border-radius shapes with sliders for each corner, from rounded cards to pills and circles. Live preview and copy-ready CSS. Free.",
        "live",
        ["border radius generator", "css border radius tool", "rounded corners generator"],
        "Border Radius Generator — CSS Corners"
      ),
      tool(
        "box-shadow-generator",
        "Box Shadow Generator",
        "Create CSS box shadows visually: offset, blur, spread, color, opacity and inset, with a live preview and CSS to copy. Free, runs in your browser.",
        "live",
        ["box shadow generator", "css box shadow tool", "box-shadow css generator"],
        "Box Shadow Generator — CSS Shadow Maker"
      ),
      tool(
        "text-shadow-generator",
        "Text Shadow Generator",
        "Create CSS text shadows and glow effects with sliders for offset, blur, color and opacity, and a live preview of your text. Free, in your browser.",
        "live",
        ["text shadow generator", "css text shadow tool", "text-shadow css generator"],
        "Text Shadow Generator — CSS Text Effects"
      ),
      tool(
        "gradient-generator",
        "CSS Gradient Generator",
        "Create linear and radial CSS gradients with up to 5 color stops, a live preview and copy-ready CSS. Free, no sign-up, runs in your browser.",
        "live",
        ["css gradient generator", "linear gradient generator", "radial gradient generator"],
        "CSS Gradient Generator — Linear & Radial"
      ),
      tool(
        "clip-path-generator",
        "CSS Clip Path Generator",
        "Create CSS clip-path shapes: circle, ellipse, inset and polygon presets like triangle, hexagon and star, with a live preview. Free, in your browser.",
        "live",
        ["css clip path generator", "clip-path generator", "css shape generator"],
        "CSS Clip Path Generator — Shape Maker"
      ),
    ],
  },
  {
    slug: "javascript",
    title: "JavaScript",
    icon: "\u26A1",
    description: "Format, minify, obfuscate, and run JavaScript online.",
    tools: [
      tool(
        "formatter",
        "JS Formatter",
        "Format and beautify JavaScript with Prettier, including modern syntax like async/await, classes and modules. Free, no sign-up, runs in your browser.",
        "live",
        ["javascript formatter", "format js online", "js beautifier", "prettier online"],
        "JavaScript Formatter — Prettier Online"
      ),
      tool(
        "minifier",
        "JS Minifier",
        "Minify JavaScript with Terser to shrink file size: removes whitespace and dead code and shortens names. Free, no sign-up, runs in your browser.",
        "live",
        ["javascript minifier", "minify js online", "compress javascript"],
        "JavaScript Minifier — Terser Online"
      ),
      tool(
        "beautifier",
        "JS Beautifier",
        "Beautify minified JavaScript into readable, properly indented code using Prettier. Free, no sign-up, runs in your browser.",
        "live",
        ["js beautifier", "beautify javascript online", "unminify javascript"],
        "JS Beautifier — Unminify JavaScript Online"
      ),
      tool(
        "obfuscator",
        "JS Obfuscator",
        "Obfuscate JavaScript by renaming variables and encoding strings so your code is harder to read. Free, no sign-up, runs in your browser.",
        "live",
        ["javascript obfuscator", "obfuscate js online", "js code protection"],
        "JavaScript Obfuscator Online — Free"
      ),
      tool(
        "deobfuscator",
        "JS Deobfuscator",
        "Deobfuscate JavaScript: decode \\x and \\u escaped strings and reformat minified code into readable source. Free, runs in your browser.",
        "live",
        ["javascript deobfuscator", "deobfuscate js online", "unpack minified js"],
        "JavaScript Deobfuscator — Decode JS Online"
      ),
      tool(
        "playground",
        "JS Playground",
        "Write and run JavaScript online in a sandbox and see console.log output instantly. Free, no sign-up, and your code never leaves the browser.",
        "live",
        ["javascript playground", "run js online", "js code editor online"],
        "JavaScript Playground — Run JS Online"
      ),
    ],
  },
  {
    slug: "typescript",
    title: "TypeScript",
    icon: "\u{1F7E8}",
    description: "Format, run, and convert TypeScript code online.",
    tools: [
      tool(
        "formatter",
        "TS Formatter",
        "Format and beautify TypeScript with Prettier, including interfaces, generics, enums and decorators. Free, no sign-up, runs in your browser.",
        "live",
        ["typescript formatter", "format ts online", "ts beautifier"],
        "TypeScript Formatter — Prettier Online"
      ),
      tool(
        "playground",
        "TS Playground",
        "Write and run TypeScript online: it is compiled with the official compiler and run in a sandbox with console output. Free, runs in your browser.",
        "live",
        ["typescript playground", "run ts online", "typescript online compiler"],
        "TypeScript Playground — Run TS Online"
      ),
      tool(
        "to-js",
        "TS to JS",
        "Convert TypeScript to JavaScript with the official TypeScript compiler. Strips types and compiles enums to clean ES2020. Free, runs in your browser.",
        "live",
        ["typescript to javascript", "ts to js converter", "transpile typescript online"],
        "TypeScript to JavaScript Converter Online"
      ),
    ],
  },
  {
    slug: "java",
    title: "Java",
    icon: "\u2615",
    description: "Format, run, and escape Java code online.",
    tools: [
      tool(
        "formatter",
        "Java Formatter",
        "Format messy Java code with Prettier's Java plugin, from full classes to short snippets. Clear errors for code that doesn't parse. Free, in your browser.",
        "live",
        ["java formatter", "format java online", "java code indenter"],
        "Java Formatter — Format Java Code Online"
      ),
      tool("playground", "Java Playground", "Run and test Java code in the browser."),
      tool(
        "escape-unescape",
        "Java Escape/Unescape",
        "Escape text into a Java string literal or unescape one back, handling quotes, backslashes, \\n, \\t and Unicode escapes. Free, runs in your browser.",
        "live",
        ["java string escape", "escape java string online", "unescape java string"],
        "Java String Escape & Unescape Online"
      ),
    ],
  },
  {
    slug: "python",
    title: "Python",
    icon: "\u{1F40D}",
    description: "Format and minify Python code online.",
    tools: [
      tool(
        "formatter",
        "Python Formatter",
        "Format Python code with Ruff, the fast Black-compatible formatter. Fixes spacing, indentation and line length. Free, no sign-up, runs in your browser.",
        "live",
        ["python formatter", "format python online", "python code indenter"],
        "Python Formatter — Ruff/Black Style Online"
      ),
      tool(
        "minifier",
        "Python Minifier",
        "Minify Python by removing comments and blank lines and shrinking indentation, while keeping strings and docstrings intact. Free, in your browser.",
        "live",
        ["python minifier", "minify python online", "compress python code"],
        "Python Minifier — Compress Python Online"
      ),
    ],
  },
  {
    slug: "php",
    title: "PHP",
    icon: "\u{1F418}",
    description: "Format and beautify PHP code online.",
    tools: [
      tool(
        "formatter",
        "PHP Formatter",
        "Format PHP code with Prettier's PHP plugin for clean, consistent indentation and spacing, with or without the <?php tag. Free, runs in your browser.",
        "live",
        ["php formatter", "format php online", "php code indenter"],
        "PHP Formatter — Format PHP Code Online"
      ),
      tool(
        "beautifier",
        "PHP Beautifier",
        "Beautify messy or one-line PHP into readable code with consistent indentation and spacing, using Prettier's PHP plugin. Free, runs in your browser.",
        "live",
        ["php beautifier", "beautify php online"],
        "PHP Beautifier — Clean Up PHP Code Online"
      ),
    ],
  },
  {
    slug: "rust",
    title: "Rust",
    icon: "\u{1F980}",
    description: "Format Rust source code online.",
    tools: [
      tool(
        "formatter",
        "Rust Formatter",
        "Format Rust code: splits crammed lines, fixes spacing around operators and re-indents blocks. Free, no sign-up, runs in your browser.",
        "live",
        ["rust formatter", "format rust online", "rust code indenter"],
        "Rust Formatter — Format Rust Code Online"
      ),
    ],
  },
  {
    slug: "go",
    title: "Go",
    icon: "\u{1F439}",
    description: "Format Go source code online.",
    tools: [
      tool(
        "formatter",
        "Go Formatter",
        "Format Go code with the real gofmt, compiled to WebAssembly, so output matches go fmt exactly. Free, no sign-up, runs in your browser.",
        "live",
        ["go formatter", "golang formatter online", "format go code"],
        "Go Formatter — gofmt Online"
      ),
    ],
  },
  {
    slug: "markdown",
    title: "Markdown",
    icon: "\u{1F9FE}",
    description: "Preview, format, and convert Markdown documents online.",
    tools: [
      tool(
        "preview",
        "Markdown Preview",
        "Type or paste Markdown and see it rendered live, side by side. Supports GitHub-flavored tables, task lists and code blocks. Free, no sign-up, runs in your browser.",
        "live",
        ["markdown preview", "markdown viewer online", "live markdown editor", "github markdown preview"],
        "Markdown Preview Online — Live Editor & Viewer"
      ),
      tool(
        "to-html",
        "Markdown to HTML",
        "Convert Markdown to clean HTML, with GitHub-flavored tables and fenced code blocks. Ready to paste into a page or CMS. Free, runs in your browser.",
        "live",
        ["markdown to html", "convert markdown to html", "md to html converter"],
        "Markdown to HTML Converter Online"
      ),
      tool(
        "from-html",
        "HTML to Markdown",
        "Convert HTML to clean Markdown with # headings, - bullets and fenced code blocks. Handles links, images, nested lists and quotes. Free, runs in your browser.",
        "live",
        ["html to markdown", "convert html to markdown", "html to md converter"],
        "HTML to Markdown Converter Online"
      ),
      tool(
        "formatter",
        "Markdown Formatter",
        "Clean up Markdown: consistent list bullets, proper heading spacing, no trailing spaces or extra blank lines. Code blocks stay untouched. Free.",
        "live",
        ["markdown formatter", "format markdown online", "clean up markdown"],
        "Markdown Formatter — Clean Up Markdown"
      ),
    ],
  },
  {
    slug: "url",
    title: "URL",
    icon: "\u{1F30D}",
    description: "Parse, validate, and build URLs and query parameters online.",
    tools: [
      tool("parser", "URL Parser", "Break a URL down into its components."),
      tool("validator", "URL Validator", "Validate whether a URL is well-formed."),
      tool("shortener", "URL Shortener Generator", "Generate shortened URLs."),
      tool("query-parser", "Query Parameter Parser", "Parse URL query parameters into key/value pairs."),
      tool("utm-builder", "UTM Builder", "Build UTM-tagged campaign URLs."),
    ],
  },
  {
    slug: "email",
    title: "Email",
    icon: "\u{1F4E7}",
    description: "Validate email addresses and analyze email headers online.",
    tools: [
      tool(
        "validator",
        "Email Validator",
        "Validate email address syntax and catch common typos in domain names. Free, no sign-up, runs in your browser.",
        "live",
        ["email validator", "validate email address", "check email syntax", "email format checker"],
        "Email Validator — Check Email Syntax"
      ),
      tool(
        "header-analyzer",
        "Email Header Analyzer",
        "Analyze raw email headers to trace delivery hops and check SPF/DKIM/DMARC results. Free, no sign-up, runs in your browser.",
        "live",
        ["email header analyzer", "analyze email headers", "spf dkim dmarc checker", "email trace"],
        "Email Header Analyzer — SPF, DKIM, DMARC"
      ),
      tool(
        "signature-generator",
        "Email Signature Generator",
        "Design a professional HTML email signature with live preview. Free, no sign-up, runs in your browser.",
        "live",
        ["email signature generator", "html email signature", "create email signature", "signature maker"],
        "Email Signature Generator — HTML, Free"
      ),
    ],
  },
  {
    slug: "networking",
    title: "Networking",
    icon: "\u{1F310}",
    description: "Look up IPs, DNS, WHOIS, subnets, and analyze HTTP headers and user agents.",
    tools: [
      tool(
        "http-header-viewer",
        "HTTP Header Viewer",
        "Inspect HTTP response headers for any URL, including redirects and security headers. Free, no sign-up, and results are not saved.",
        "live",
        ["http header viewer", "check response headers", "http headers checker", "view website headers"],
        "HTTP Header Checker — View Response Headers"
      ),
      tool(
        "user-agent-parser",
        "User Agent Parser",
        "Parse a User-Agent string into browser, engine, OS, and device info. Free, no sign-up, runs in your browser.",
        "live",
        ["user agent parser", "ua string parser", "browser detector", "parse user agent online"],
        "User Agent Parser — Browser & OS Lookup"
      ),
      tool(
        "ip-lookup",
        "IP Lookup",
        "Look up geolocation, ISP, and organization info for any public IP address. Free, no sign-up, and results are not saved.",
        "live",
        ["ip lookup", "ip geolocation", "find ip location", "what is this ip address"],
        "IP Lookup — IP Address Location & ISP"
      ),
      tool(
        "cidr-calculator",
        "CIDR Calculator",
        "Calculate network, broadcast, and usable host ranges from a CIDR block. Free, no sign-up, runs in your browser.",
        "live",
        ["cidr calculator", "cidr to ip range", "network address calculator", "cidr notation calculator"],
        "CIDR Calculator — IP Range from CIDR"
      ),
      tool(
        "subnet-calculator",
        "Subnet Calculator",
        "Calculate subnet masks, host ranges, and split a network into equal subnets. Free, no sign-up, runs in your browser.",
        "live",
        ["subnet calculator", "ip subnet calculator", "subnet mask calculator", "vlsm calculator"],
        "Subnet Calculator — IPv4 Subnet Masks"
      ),
      tool(
        "port-lookup",
        "Port Lookup",
        "Look up the standard service and protocol for any well-known network port. Free, no sign-up, runs in your browser.",
        "live",
        ["port lookup", "port number lookup", "well known ports list", "what service uses this port"],
        "Port Number Lookup — TCP & UDP Ports"
      ),
      tool(
        "dns-lookup",
        "DNS Lookup",
        "Query A, AAAA, MX, TXT, NS, CNAME, SOA, and CAA records for any domain. Free, no sign-up, and results are not saved.",
        "live",
        ["dns lookup", "dns record checker", "mx record lookup", "check dns records online"],
        "DNS Lookup — Check A, MX, TXT, NS Records"
      ),
      tool(
        "whois-lookup",
        "WHOIS Lookup",
        "Look up domain registration, registrar, and name server info. Free, no sign-up, and results are not saved.",
        "live",
        ["whois lookup", "domain whois checker", "who owns this domain", "domain registration lookup"],
        "WHOIS Lookup — Domain Owner & Registrar"
      ),
      tool("ping-tool", "Ping Tool", "Check host reachability and latency."),
      tool("traceroute", "Traceroute", "Trace the network path to a host."),
      tool(
        "random-ip",
        "Random IP Generator",
        "Generate random IPv4 or IPv6 addresses for test data, demos, and documentation. Free, no sign-up, runs in your browser.",
        "live",
        ["random ip generator", "generate random ip address", "fake ip generator", "random ipv4 generator"],
        "Random IP Address Generator — IPv4 & IPv6"
      ),
      tool(
        "random-mac-address",
        "Random MAC Address Generator",
        "Generate random MAC addresses with the locally-administered bit set, safe for test and demo use. Free, no sign-up, runs in your browser.",
        "live",
        ["random mac address generator", "generate random mac address", "fake mac address generator", "mac address generator online"],
        "Random MAC Address Generator Online"
      ),
    ],
  },
  {
    slug: "colors",
    title: "Colors",
    icon: "\u{1F3A8}",
    description: "Pick, convert, and generate color palettes and gradients online.",
    tools: [
      tool(
        "picker",
        "Color Picker",
        "Pick a color visually or from your screen and get its HEX, RGB, HSL, HSV, and CMYK codes instantly. Free, no sign-up, runs in your browser.",
        "live",
        ["color picker online", "html color picker", "eyedropper tool online", "pick color from screen"],
        "Color Picker Online — HEX RGB HSL Codes"
      ),
      tool(
        "hex-rgb",
        "HEX to RGB Converter",
        "Convert colors between HEX and RGB formats instantly, both ways. Free, no sign-up, runs in your browser.",
        "live",
        ["hex to rgb", "rgb to hex", "hex to rgb converter", "convert hex color to rgb"],
        "HEX to RGB Converter — Color Code Converter"
      ),
      tool(
        "rgb-hsl",
        "RGB to HSL Converter",
        "Convert colors between RGB and HSL formats instantly, both ways. Free, no sign-up, runs in your browser.",
        "live",
        ["rgb to hsl", "hsl to rgb", "rgb to hsl converter", "convert rgb color to hsl"],
        "RGB to HSL Converter — Color Converter"
      ),
      tool(
        "rgb-cmyk",
        "RGB to CMYK Converter",
        "Convert colors between RGB and CMYK formats for screen and print design. Free, no sign-up, runs in your browser.",
        "live",
        ["rgb to cmyk", "cmyk to rgb", "rgb to cmyk converter", "convert rgb to cmyk for print"],
        "RGB to CMYK Converter — For Print Design"
      ),
      tool(
        "hex-cmyk",
        "HEX to CMYK Converter",
        "Convert colors between HEX and CMYK formats for screen and print design. Free, no sign-up, runs in your browser.",
        "live",
        ["hex to cmyk", "cmyk to hex", "hex to cmyk converter", "convert hex color to cmyk"],
        "HEX to CMYK Converter — For Print Design"
      ),
      tool(
        "hex-hsv",
        "HEX to HSV Converter",
        "Convert colors between HEX and HSV (HSB) formats instantly, both ways. Free, no sign-up, runs in your browser.",
        "live",
        ["hex to hsv", "hsv to hex", "hex to hsb converter", "convert hex color to hsv"],
        "HEX to HSV Converter — HSB Color Codes"
      ),
      tool(
        "gradient-generator",
        "Gradient Generator",
        "Design custom linear and radial CSS gradients with live preview and multi-color stops. Free, no sign-up, runs in your browser.",
        "live",
        ["css gradient generator", "linear gradient generator", "radial gradient generator", "gradient maker online"],
        "Color Gradient Generator — CSS Gradients"
      ),
      tool(
        "palette-generator",
        "Palette Generator",
        "Generate complementary, analogous, triadic, and monochromatic color palettes from any base color. Free, no sign-up, runs in your browser.",
        "live",
        ["color palette generator", "color scheme generator", "generate color palette from color", "complementary color generator"],
        "Color Palette Generator — Free Online"
      ),
      tool(
        "contrast-checker",
        "Contrast Checker",
        "Check the WCAG contrast ratio between two colors and see if it passes AA or AAA accessibility standards. Free, no sign-up, runs in your browser.",
        "live",
        ["color contrast checker", "wcag contrast checker", "contrast ratio calculator", "accessibility color checker"],
        "Color Contrast Checker — WCAG AA & AAA"
      ),
      tool(
        "color-blindness-simulator",
        "Color Blindness Simulator",
        "Preview colors and images as seen with protanopia, deuteranopia, tritanopia, or achromatopsia. Free, no sign-up, runs in your browser.",
        "live",
        ["color blindness simulator", "color vision deficiency simulator", "colorblind test image", "protanopia deuteranopia simulator"],
        "Color Blindness Simulator Online"
      ),
      tool(
        "random-color",
        "Random Color Generator",
        "Generate random HEX colors instantly, with the matching RGB value, one click to copy. Free, no sign-up, runs in your browser.",
        "live",
        ["random color generator", "random hex color generator", "generate random color", "random color picker"],
        "Random Color Generator — HEX & RGB"
      ),
    ],
  },
  {
    slug: "images",
    title: "Images",
    icon: "\u{1F5BC}",
    description: "Compress, resize, crop, convert, and encode images online.",
    tools: [
      tool("compressor", "Image Compressor", "Compress images while preserving quality."),
      tool("crop", "Image Crop", "Crop images to a custom area or aspect ratio."),
      tool("resize", "Image Resize", "Resize images to exact dimensions."),
      tool("rotate", "Rotate Image", "Rotate images by any angle."),
      tool("flip", "Flip Image", "Flip images horizontally or vertically."),
      tool("watermark", "Watermark Image", "Add a text or logo watermark to images."),
      tool("png-jpg", "PNG \u2194 JPG", "Convert between PNG and JPG formats."),
      tool("png-webp", "PNG \u2194 WebP", "Convert between PNG and WebP formats."),
      tool("webp-jpg", "WebP \u2194 JPG", "Convert between WebP and JPG formats."),
      tool("svg-optimizer", "SVG Optimizer", "Optimize and minify SVG files."),
      tool("to-base64", "Image to Base64", "Encode an image as a Base64 data URL."),
      tool("from-base64", "Base64 to Image", "Decode a Base64 string back into an image."),
      tool("ico-generator", "ICO Generator", "Generate .ico icon files from images."),
      tool("favicon-generator", "Favicon Generator", "Generate a full favicon set from an image."),
    ],
  },
  {
    slug: "video",
    title: "Video",
    icon: "\u{1F3A5}",
    description: "Compress, trim, and convert video files online.",
    tools: [
      tool("compressor", "Video Compressor", "Compress video files while preserving quality."),
      tool("trim", "Video Trim", "Trim and cut video clips."),
      tool("gif-maker", "GIF Maker", "Create animated GIFs from video or images."),
      tool("mp4-to-gif", "MP4 to GIF", "Convert MP4 video into an animated GIF."),
    ],
  },
  {
    slug: "audio",
    title: "Audio",
    icon: "\u{1F3B5}",
    description: "Convert, cut, and adjust audio files online.",
    tools: [
      tool("converter", "Audio Converter", "Convert audio between formats."),
      tool("cutter", "Audio Cutter", "Trim and cut audio clips."),
      tool("volume-booster", "Volume Booster", "Increase the volume of an audio file."),
    ],
  },
  {
    slug: "qr-barcode",
    title: "QR & Barcode",
    icon: "\u{1F4F1}",
    description: "Generate and scan QR codes and barcodes online.",
    tools: [
      tool(
        "qr-generator",
        "QR Code Generator",
        "Generate a QR code from any text, URL, or content with adjustable error correction and instant PNG download. Free, no sign-up, runs in your browser.",
        "live",
        ["qr code generator", "generate qr code online", "url to qr code", "free qr code generator"],
        "Free QR Code Generator — URL to QR Online"
      ),
      tool(
        "qr-scanner",
        "QR Scanner",
        "Scan and decode QR codes from an uploaded image directly in your browser \u2014 no app or camera required. Free, no sign-up, runs in your browser.",
        "live",
        ["qr code scanner online", "decode qr code from image", "read qr code online", "qr code reader"],
        "QR Code Scanner — Scan from Image Online"
      ),
      tool(
        "wifi-qr",
        "Wi-Fi QR Generator",
        "Generate a QR code that lets phones join a Wi-Fi network instantly by scanning, without typing the password. Free, no sign-up, runs in your browser.",
        "live",
        ["wifi qr code generator", "wifi password qr code", "create wifi qr code", "share wifi with qr code"],
        "Wi-Fi QR Code Generator — Share Wi-Fi"
      ),
      tool(
        "vcard-qr",
        "vCard QR Generator",
        "Generate a QR code containing vCard contact info that phones can scan to save directly to contacts. Free, no sign-up, runs in your browser.",
        "live",
        ["vcard qr code generator", "contact qr code", "business card qr code", "digital business card qr"],
        "vCard QR Code Generator — Contact QR"
      ),
      tool(
        "barcode-generator",
        "Barcode Generator",
        "Generate Code 128, EAN-13, EAN-8, UPC-A, ITF-14, Codabar, and other common 1D barcode formats online. Free, no sign-up, runs in your browser.",
        "live",
        ["barcode generator online", "generate barcode", "code 128 generator", "ean-13 barcode generator"],
        "Barcode Generator — EAN, UPC, Code 128"
      ),
      tool(
        "barcode-reader",
        "Barcode Reader",
        "Decode Code 128, EAN, UPC, and other barcode formats from an uploaded image directly in your browser. Free, no sign-up, runs in your browser.",
        "live",
        ["barcode reader online", "decode barcode from image", "read barcode online", "barcode scanner online"],
        "Barcode Reader — Scan Barcode from Image"
      ),
    ],
  },
  {
    slug: "date-time",
    title: "Date & Time",
    icon: "\u{1F4C5}",
    description: "Convert timestamps, calculate date differences, and work with cron schedules online.",
    tools: [
      tool(
        "unix-timestamp",
        "Unix Timestamp",
        "Convert between Unix timestamps and human-readable dates, in seconds or milliseconds, with a live current timestamp. Free, no sign-up, runs in your browser.",
        "live",
        ["unix timestamp converter", "epoch converter", "timestamp to date", "current unix timestamp"],
        "Unix Timestamp Converter — Epoch to Date Online"
      ),
      tool(
        "date-difference",
        "Date Difference",
        "Calculate the exact difference between two dates in years, months, days, hours, and total days or weeks. Free, no sign-up, runs in your browser.",
        "live",
        ["date difference calculator", "days between dates", "date calculator", "calculate difference between two dates"],
        "Date Difference Calculator — Days Between"
      ),
      tool(
        "age-calculator",
        "Age Calculator",
        "Calculate your exact age in years, months, and days from your birth date, plus days until your next birthday. Free, no sign-up, runs in your browser.",
        "live",
        ["age calculator", "calculate age from date of birth", "how old am i", "birthday countdown calculator"],
        "Age Calculator — Exact Age in Years & Days"
      ),
      tool(
        "timezone-converter",
        "Time Zone Converter",
        "Convert a date and time between any IANA time zones and compare across multiple cities at once. Free, no sign-up, runs in your browser.",
        "live",
        ["time zone converter", "convert time zones online", "world clock converter", "utc to local time converter"],
        "Time Zone Converter — Compare Time Zones"
      ),
      tool(
        "cron-generator",
        "Cron Generator",
        "Visually build cron expressions with presets, a plain-English description, and the next 5 run times. Free, no sign-up, runs in your browser.",
        "live",
        ["cron expression generator", "cron job generator", "build cron expression", "crontab generator"],
        "Cron Expression Generator Online — Crontab Builder"
      ),
      tool(
        "cron-parser",
        "Cron Parser",
        "Parse any cron expression into a plain-English description and see its next 5 scheduled run times. Free, no sign-up, runs in your browser.",
        "live",
        ["cron expression parser", "explain cron expression", "crontab parser", "what does this cron expression mean"],
        "Cron Parser — Cron Expression Explained"
      ),
      tool(
        "leap-year-checker",
        "Leap Year Checker",
        "Check whether any year is a leap year with a clear explanation, plus list all leap years in a range. Free, no sign-up, runs in your browser.",
        "live",
        ["leap year checker", "is this a leap year", "leap year calculator", "list of leap years"],
        "Leap Year Checker — Is It a Leap Year?"
      ),
      tool(
        "random-date",
        "Random Date Generator",
        "Generate a random date within any year range, useful for test data and scheduling mockups. Free, no sign-up, runs in your browser.",
        "live",
        ["random date generator", "generate random date", "random date picker", "random date between two years"],
        "Random Date Generator — Pick a Date"
      ),
      tool(
        "random-time",
        "Random Time Generator",
        "Generate a random time of day in 24-hour or 12-hour AM/PM format. Free, no sign-up, runs in your browser.",
        "live",
        ["random time generator", "generate random time", "random clock time generator", "random time of day"],
        "Random Time Generator — 12h or 24h"
      ),
    ],
  },
  {
    slug: "text",
    title: "Text",
    icon: "\u{1F4DD}",
    description: "Count, clean, diff, and transform text online.",
    tools: [
      tool(
        "word-counter",
        "Word Counter",
        "Count words, characters, sentences, and paragraphs in any text, with estimated reading and speaking time. Free, no sign-up, runs in your browser.",
        "live",
        ["word counter online", "count words in text", "word count tool", "reading time calculator"],
        "Word Counter Online — Count Words & Characters"
      ),
      tool(
        "character-counter",
        "Character Counter",
        "Count characters in your text with a live limit tracker and a full breakdown of letters, digits, and spaces. Free, no sign-up, runs in your browser.",
        "live",
        ["character counter online", "count characters in text", "character count tool", "letter counter"],
        "Character Counter — Count Characters Online"
      ),
      tool(
        "line-counter",
        "Line Counter",
        "Count total, empty, and non-empty lines in a block of text, plus find the longest line and average line length. Free, no sign-up, runs in your browser.",
        "live",
        ["line counter online", "count lines in text", "count lines of text", "line count tool"],
        "Line Counter — Count Lines in Text Online"
      ),
      tool(
        "duplicate-line-remover",
        "Duplicate Line Remover",
        "Remove duplicate lines from any list or text block, with case-sensitivity and whitespace-trimming options. Free, no sign-up, runs in your browser.",
        "live",
        ["remove duplicate lines", "duplicate line remover online", "delete duplicate lines", "unique lines tool"],
        "Remove Duplicate Lines Online — Free"
      ),
      tool(
        "diff",
        "Text Diff",
        "Compare two blocks of text side by side and highlight added, removed, and unchanged lines instantly. Free, no sign-up, runs in your browser.",
        "live",
        ["text diff tool", "compare two texts online", "text comparison tool", "diff checker online"],
        "Text Diff — Compare Two Texts Online"
      ),
      tool(
        "case-converter",
        "Case Converter",
        "Convert text between UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case, and more. Free, no sign-up, runs in your browser.",
        "live",
        ["case converter online", "text case converter", "camel case converter", "convert to title case"],
        "Case Converter — Upper, Lower, Title Case"
      ),
      tool(
        "reverse-text",
        "Reverse Text",
        "Reverse the characters, word order, or line order of any text instantly. Free, no sign-up, runs in your browser.",
        "live",
        ["reverse text online", "reverse text generator", "flip text online", "backwards text generator"],
        "Reverse Text Generator — Flip Text Online"
      ),
      tool(
        "slug-generator",
        "Slug Generator",
        "Convert any title or text into a clean, URL-friendly slug with hyphens or underscores. Free, no sign-up, runs in your browser.",
        "live",
        ["slug generator online", "url slug generator", "text to slug", "generate url friendly slug"],
        "Slug Generator — URL Slug from Title"
      ),
      tool(
        "lorem-ipsum",
        "Lorem Ipsum",
        "Generate placeholder Lorem Ipsum text by words, sentences, or paragraphs for mockups and designs. Free, no sign-up, runs in your browser.",
        "live",
        ["lorem ipsum generator", "generate placeholder text", "dummy text generator", "lorem ipsum text"],
        "Lorem Ipsum Generator — Placeholder Text"
      ),
      tool(
        "remove-extra-spaces",
        "Remove Extra Spaces",
        "Remove extra spaces, tabs, and blank lines from text, collapsing whitespace into clean, readable content. Free, no sign-up, runs in your browser.",
        "live",
        ["remove extra spaces online", "remove whitespace from text", "clean up text spacing", "trim extra spaces"],
        "Remove Extra Spaces Online — Clean Text"
      ),
      tool(
        "text-sorter",
        "Text Sorter",
        "Sort lines of text alphabetically, numerically, or by length, with options to remove duplicates and blanks. Free, no sign-up, runs in your browser.",
        "live",
        ["sort lines of text", "text sorter online", "alphabetize list online", "sort list alphabetically"],
        "Sort Lines Alphabetically — Text Sorter"
      ),
      tool(
        "random-word",
        "Random Word Generator",
        "Generate random English words instantly \u2014 useful for word games, brainstorming, and test data. Free, no sign-up, runs in your browser.",
        "live",
        ["random word generator", "generate random word", "random word picker", "word generator online"],
        "Random Word Generator — Free Online"
      ),
      tool(
        "random-letter",
        "Random Letter Generator",
        "Generate a random letter from A to Z, in uppercase, lowercase, or mixed case. Free, no sign-up, runs in your browser.",
        "live",
        ["random letter generator", "generate random letter", "random alphabet generator", "pick random letter a-z"],
        "Random Letter Generator — A to Z"
      ),
    ],
  },
  {
    slug: "numbers",
    title: "Numbers",
    icon: "\u{1F4B0}",
    description: "Calculate percentages, convert number bases, and run everyday numeric calculators online.",
    tools: [
      tool(
        "percentage-calculator",
        "Percentage Calculator",
        "Calculate percentages, find what percent one number is of another, or calculate percentage increase/decrease. Free, no sign-up, runs in your browser.",
        "live",
        ["percentage calculator", "calculate percentage online", "percentage increase calculator", "what percent is x of y"],
        "Percentage Calculator — Percent of a Number"
      ),
      tool(
        "percentage-difference",
        "Percentage Difference",
        "Calculate the percentage difference and percentage change between any two numbers. Free, no sign-up, runs in your browser.",
        "live",
        ["percentage difference calculator", "percent change calculator", "calculate percentage difference between two numbers", "percentage variance calculator"],
        "Percentage Difference Calculator Online"
      ),
      tool(
        "scientific-calculator",
        "Scientific Calculator",
        "A full scientific calculator with trigonometric, logarithmic, and power functions, plus calculation history. Free, no sign-up, runs in your browser.",
        "live",
        ["scientific calculator online", "online calculator with functions", "free scientific calculator", "trigonometry calculator online"],
        "Scientific Calculator Online — Free"
      ),
      tool(
        "bmi-calculator",
        "BMI Calculator",
        "Calculate your Body Mass Index (BMI) from your height and weight in metric or imperial units. Free, no sign-up, runs in your browser.",
        "live",
        ["bmi calculator", "calculate body mass index", "bmi calculator online", "healthy weight calculator"],
        "BMI Calculator — Body Mass Index Online"
      ),
      tool(
        "unit-converter",
        "Unit Converter",
        "Convert between units of length, weight, temperature, volume, area, and speed instantly. Free, no sign-up, runs in your browser.",
        "live",
        ["unit converter online", "convert units of measurement", "metric to imperial converter", "length weight temperature converter"],
        "Unit Converter — Length, Weight & More"
      ),
      tool(
        "currency-converter",
        "Currency Converter",
        "Convert between world currencies using live, daily-updated exchange rates from the European Central Bank. Free, no sign-up, runs in your browser.",
        "live",
        ["currency converter online", "live exchange rate converter", "convert currency online", "foreign exchange calculator"],
        "Currency Converter — Live Exchange Rates"
      ),
      tool(
        "decimal-binary",
        "Decimal \u2194 Binary",
        "Convert numbers between decimal (base 10) and binary (base 2) instantly, both directions. Free, no sign-up, runs in your browser.",
        "live",
        ["decimal to binary converter", "binary to decimal converter", "convert decimal to binary", "binary converter online"],
        "Decimal to Binary Converter Online"
      ),
      tool(
        "decimal-hex",
        "Decimal \u2194 Hex",
        "Convert numbers between decimal (base 10) and hexadecimal (base 16) instantly, both directions. Free, no sign-up, runs in your browser.",
        "live",
        ["decimal to hex converter", "hex to decimal converter", "convert decimal to hexadecimal", "hexadecimal converter online"],
        "Decimal to Hex Converter Online"
      ),
      tool(
        "decimal-octal",
        "Decimal \u2194 Octal",
        "Convert numbers between decimal (base 10) and octal (base 8) instantly, both directions. Free, no sign-up, runs in your browser.",
        "live",
        ["decimal to octal converter", "octal to decimal converter", "convert decimal to octal", "octal converter online"],
        "Decimal to Octal Converter Online"
      ),
      tool(
        "roman-numeral",
        "Roman Numeral Converter",
        "Convert numbers to Roman numerals and Roman numerals back to numbers, from 1 to 3999. Free, no sign-up, runs in your browser.",
        "live",
        ["roman numeral converter", "convert to roman numerals", "roman numeral to number", "roman numeral generator"],
        "Roman Numeral Converter — Numbers to Roman"
      ),
    ],
  },
  {
    slug: "regex",
    title: "Regex",
    icon: "\u{1F50D}",
    description: "Test, generate, and learn regular expressions online.",
    tools: [
      tool("tester", "Regex Tester", "Test regular expressions against sample text in real time."),
      tool("generator", "Regex Generator", "Generate a regular expression from a description or examples."),
      tool("cheat-sheet", "Regex Cheat Sheet", "Quick reference for regular expression syntax."),
    ],
  },
  {
    slug: "apis",
    title: "APIs",
    icon: "\u{1F517}",
    description: "Build, test, and explore HTTP and GraphQL APIs online.",
    tools: [
      tool("curl-generator", "cURL Generator", "Generate a cURL command from request details."),
      tool("rest-request-builder", "REST Request Builder", "Build and send REST API requests."),
      tool("json-api-tester", "JSON API Tester", "Test JSON APIs and inspect responses."),
      tool("graphql-playground", "GraphQL Playground", "Explore and test GraphQL queries."),
    ],
  },
  {
    slug: "misc",
    title: "Miscellaneous",
    icon: "\u{1F4E6}",
    description: "Generators and utilities for SEO, sitemaps, fake data, and more.",
    tools: [
      tool("sitemap-generator", "Sitemap Generator", "Generate an XML sitemap for a website."),
      tool("robots-txt-generator", "robots.txt Generator", "Generate a robots.txt file."),
      tool("open-graph-generator", "Open Graph Generator", "Generate Open Graph meta tags."),
      tool("meta-tag-generator", "Meta Tag Generator", "Generate common HTML meta tags."),
      tool("schema-markup-generator", "Schema Markup Generator", "Generate schema.org structured data markup."),
      tool("uuid-bulk-generator", "UUID Bulk Generator", "Generate many UUIDs at once."),
      tool("fake-data-generator", "Fake Data Generator", "Generate realistic fake data for testing."),
      tool("lorem-image-generator", "Lorem Image Generator", "Generate placeholder images."),
      tool("device-resolution-checker", "Device Resolution Checker", "Check your device's screen resolution."),
      tool("screen-resolution-checker", "Screen Resolution Checker", "Check your current screen resolution."),
    ],
  },
  {
    slug: "devops",
    title: "DevOps",
    icon: "\u{1F6E0}\u{FE0F}",
    description: "Validate and generate Docker, Kubernetes, Nginx, and Apache configuration files online.",
    tools: [
      tool(
        "docker-compose-validator",
        "Docker Compose Validator",
        "Validate a docker-compose.yml file's structure, services, ports, and volumes. Free, no sign-up, runs in your browser.",
        "live",
        ["docker compose validator", "validate docker-compose.yml", "docker compose syntax checker", "compose file linter"],
        "Docker Compose Validator Online"
      ),
      tool(
        "dockerfile-linter",
        "Dockerfile Linter",
        "Lint a Dockerfile for common mistakes, security issues, and best-practice violations. Free, no sign-up, runs in your browser.",
        "live",
        ["dockerfile linter", "dockerfile best practices checker", "docker build linter", "hadolint alternative online"],
        "Dockerfile Linter — Check Best Practices"
      ),
      tool(
        "kubernetes-yaml-validator",
        "Kubernetes YAML Validator",
        "Validate Kubernetes manifests for required fields, selector/label matching, and resource formats. Free, no sign-up, runs in your browser.",
        "live",
        ["kubernetes yaml validator", "k8s manifest validator", "validate kubernetes yaml online", "kubectl dry run alternative"],
        "Kubernetes YAML Validator Online"
      ),
      tool(
        "kubernetes-manifest-generator",
        "Kubernetes Manifest Generator",
        "Generate Deployment, Service, ConfigMap, and Secret YAML manifests from a simple form. Free, no sign-up, runs in your browser.",
        "live",
        ["kubernetes manifest generator", "generate k8s yaml", "deployment yaml generator", "kubernetes service yaml generator"],
        "Kubernetes YAML Generator — Deployments"
      ),
      tool(
        "helm-values-formatter",
        "Helm Values Formatter",
        "Format and re-indent a Helm values.yaml file consistently. Free, no sign-up, runs in your browser.",
        "live",
        ["helm values formatter", "format values.yaml", "helm yaml formatter", "helm chart values beautifier"],
        "Helm values.yaml Formatter Online"
      ),
      tool(
        "nginx-config-tester",
        "Nginx Config Tester",
        "Check an nginx configuration for brace, semicolon, and common directive mistakes. Free, no sign-up, runs in your browser.",
        "live",
        ["nginx config tester", "nginx config syntax checker", "validate nginx.conf online", "nginx -t alternative"],
        "Nginx Config Checker — Find Syntax Errors"
      ),
      tool(
        "apache-config-formatter",
        "Apache Config Formatter",
        "Format Apache httpd.conf and .htaccess files with consistent block indentation. Free, no sign-up, runs in your browser.",
        "live",
        ["apache config formatter", "format httpd.conf", "htaccess formatter", "apache virtualhost formatter"],
        "Apache Config Formatter — .htaccess"
      ),
    ],
  },
  {
    slug: "cloud",
    title: "Cloud",
    icon: "\u2601\u{FE0F}",
    description: "Parse and generate AWS ARNs, IAM policies, cron schedules, and S3 URLs online.",
    tools: [
      tool(
        "aws-arn-parser",
        "AWS ARN Parser",
        "Break an AWS ARN down into partition, service, region, account ID, and resource. Free, no sign-up, runs in your browser.",
        "live",
        ["aws arn parser", "parse arn online", "aws resource name breakdown", "arn format checker"],
        "AWS ARN Parser — Decode ARN Online"
      ),
      tool(
        "aws-iam-policy-formatter",
        "AWS IAM Policy Formatter",
        "Format an IAM policy document and check statements for common mistakes. Free, no sign-up, runs in your browser.",
        "live",
        ["aws iam policy formatter", "iam policy validator", "format iam policy json", "aws policy checker"],
        "AWS IAM Policy Formatter & Checker"
      ),
      tool(
        "aws-cron-converter",
        "AWS Cron Converter",
        "Convert between standard Unix cron and AWS's 6-field EventBridge/CloudWatch cron format. Free, no sign-up, runs in your browser.",
        "live",
        ["aws cron converter", "cloudwatch cron expression", "eventbridge cron format", "unix cron to aws cron"],
        "AWS Cron Expression Converter Online"
      ),
      tool(
        "s3-url-parser",
        "S3 URL Parser",
        "Parse S3 URLs into bucket, key, and region, or build S3 URLs from bucket and key. Free, no sign-up, runs in your browser.",
        "live",
        ["s3 url parser", "parse s3 bucket url", "s3 url generator", "s3 path style vs virtual hosted"],
        "S3 URL Parser — Bucket, Key & Region"
      ),
    ],
  },
  {
    slug: "authentication",
    title: "Authentication",
    icon: "\u{1F511}",
    description: "Build OAuth URLs and generate PKCE pairs, TOTP codes, and API keys online.",
    tools: [
      tool(
        "oauth-url-builder",
        "OAuth URL Builder",
        "Build an OAuth 2.0 authorization URL with client ID, scope, state, and PKCE parameters. Free, no sign-up, runs in your browser.",
        "live",
        ["oauth url builder", "oauth 2.0 authorization url generator", "build oauth login url", "oauth query params generator"],
        "OAuth 2.0 URL Generator — With PKCE"
      ),
      tool(
        "pkce-generator",
        "PKCE Generator",
        "Generate a PKCE code_verifier and code_challenge pair for OAuth 2.0 authorization code flow. Free, no sign-up, runs in your browser.",
        "live",
        ["pkce generator", "code verifier code challenge generator", "oauth pkce online", "generate code challenge s256"],
        "PKCE Generator — Code Verifier & Challenge"
      ),
      tool(
        "totp-generator",
        "TOTP Generator",
        "Generate live, time-based one-time passwords (RFC 6238) from a Base32 secret. Free, no sign-up, runs in your browser.",
        "live",
        ["totp generator", "time based one time password generator", "google authenticator code generator online", "2fa code generator"],
        "TOTP Generator — 2FA Codes Online"
      ),
      tool(
        "api-key-generator",
        "API Key Generator",
        "Generate cryptographically random API keys with a custom prefix and length. Free, no sign-up, runs in your browser.",
        "live",
        ["api key generator", "generate secret key online", "random api key generator", "sk_live key generator"],
        "API Key Generator — Secure Random Keys"
      ),
    ],
  },
  {
    slug: "webdev",
    title: "Web Development",
    icon: "\u{1F30D}",
    description: "Look up HTTP status codes and MIME types, and generate CSP and CORS headers online.",
    tools: [
      tool(
        "http-status-lookup",
        "HTTP Status Code Lookup",
        "Look up the meaning of any HTTP status code, from 100 to 511. Free, no sign-up, runs in your browser.",
        "live",
        ["http status code lookup", "http status codes list", "what does status code 404 mean", "http response code reference"],
        "HTTP Status Codes — Lookup & Meaning"
      ),
      tool(
        "mime-type-lookup",
        "MIME Type Lookup",
        "Look up the MIME type for a file extension, or the extension for a MIME type. Free, no sign-up, runs in your browser.",
        "live",
        ["mime type lookup", "file extension to mime type", "content-type lookup", "mime types list"],
        "MIME Type Lookup — File Extension List"
      ),
      tool(
        "mime-detector",
        "MIME Detector",
        "Detect a file's real MIME type from its content (magic bytes), not just its extension. Free, no sign-up, runs in your browser.",
        "live",
        ["mime detector", "detect file type from content", "magic bytes checker", "file signature lookup"],
        "MIME Type Detector — Check File Type"
      ),
      tool(
        "csp-generator",
        "CSP Generator",
        "Build a Content-Security-Policy header with a form for each directive. Free, no sign-up, runs in your browser.",
        "live",
        ["csp generator", "content security policy generator", "build csp header", "csp header builder online"],
        "CSP Generator — Content-Security-Policy"
      ),
      tool(
        "cors-header-generator",
        "CORS Header Generator",
        "Generate Access-Control-Allow-Origin and related CORS response headers. Free, no sign-up, runs in your browser.",
        "live",
        ["cors header generator", "access-control-allow-origin generator", "generate cors headers", "cors config builder"],
        "CORS Header Generator Online"
      ),
      tool(
        "csp-validator",
        "CSP Validator",
        "Validate a Content-Security-Policy header and flag unsafe or misconfigured directives. Free, no sign-up, runs in your browser.",
        "live",
        ["csp validator", "content security policy checker", "validate csp header online", "csp header analyzer"],
        "CSP Validator — Check Your CSP Header"
      ),
    ],
  },
  {
    slug: "database",
    title: "Database",
    icon: "\u{1F5C3}\u{FE0F}",
    description: "Format MongoDB queries and PostgreSQL SQL, generate ObjectIds, and build Redis commands online.",
    tools: [
      tool(
        "mongodb-query-formatter",
        "MongoDB Query Formatter",
        "Pretty-print MongoDB shell queries, filters, and aggregation pipelines. Free, no sign-up, runs in your browser.",
        "live",
        ["mongodb query formatter", "format mongo query online", "mongodb pretty print", "aggregation pipeline formatter"],
        "MongoDB Query Formatter — Pretty Print"
      ),
      tool(
        "mongodb-objectid-generator",
        "MongoDB ObjectId Generator",
        "Generate valid MongoDB ObjectIds and decode their embedded creation timestamp. Free, no sign-up, runs in your browser.",
        "live",
        ["mongodb objectid generator", "generate objectid online", "decode objectid timestamp", "bson objectid generator"],
        "MongoDB ObjectId Generator & Decoder"
      ),
      tool(
        "redis-command-builder",
        "Redis Command Builder",
        "Build common Redis CLI commands like SET, HSET, LPUSH, and ZADD from a form. Free, no sign-up, runs in your browser.",
        "live",
        ["redis command builder", "redis cli command generator", "build redis command online", "redis syntax helper"],
        "Redis Command Builder — CLI Generator"
      ),
      tool(
        "postgresql-formatter",
        "PostgreSQL Formatter",
        "Format PostgreSQL queries with proper indentation and keyword casing. Free, no sign-up, runs in your browser.",
        "live",
        ["postgresql formatter", "format postgres query", "postgresql sql beautifier", "pretty print postgresql"],
        "PostgreSQL Formatter — Format SQL Online"
      ),
    ],
  },
  {
    slug: "ai",
    title: "AI",
    icon: "\u{1F9E0}",
    description: "Clean up prompts, count GPT tokens, and validate OpenAI structured output schemas online.",
    tools: [
      tool(
        "prompt-formatter",
        "Prompt Formatter",
        "Clean up LLM prompts by trimming whitespace, collapsing blank lines, and normalizing smart quotes. Free, no sign-up, runs in your browser.",
        "live",
        ["prompt formatter", "clean up chatgpt prompt", "format llm prompt online", "prompt cleanup tool"],
        "Prompt Formatter — Clean Up LLM Prompts"
      ),
      tool(
        "prompt-token-counter",
        "Prompt Token Counter",
        "Count the exact number of GPT tokens in a prompt using OpenAI's real tokenizer. Free, no sign-up, runs in your browser.",
        "live",
        ["prompt token counter", "gpt token counter", "count openai tokens", "chatgpt token calculator"],
        "GPT Token Counter — Count Prompt Tokens"
      ),
      tool(
        "openai-schema-validator",
        "OpenAI JSON Schema Validator",
        "Validate a JSON Schema against OpenAI's structured outputs and strict function-calling constraints. Free, no sign-up, runs in your browser.",
        "live",
        ["openai json schema validator", "structured outputs validator", "openai strict mode schema checker", "function calling schema validator"],
        "OpenAI JSON Schema Validator — Strict Mode"
      ),
      tool(
        "embedding-token-counter",
        "Embedding Token Counter",
        "Count tokens for OpenAI embedding models and check against the 8,191-token input limit. Free, no sign-up, runs in your browser.",
        "live",
        ["embedding token counter", "text-embedding-3 token limit", "openai embedding token count", "embedding input limit checker"],
        "Embedding Token Counter — OpenAI Models"
      ),
    ],
  },
  {
    slug: "random-generators",
    title: "Random Generators",
    icon: "\u{1F3B2}",
    description: "Generate random names, usernames, emoji, and fake test data for mockups, demos, and testing.",
    tools: [
      tool(
        "random-name",
        "Random Name Generator",
        "Generate random fictional full names for mock data, placeholders, and test accounts. Free, no sign-up, runs in your browser.",
        "live",
        ["random name generator", "fake name generator", "generate random name", "random full name generator"],
        "Random Name Generator — Fake Full Names"
      ),
      tool(
        "random-username",
        "Random Username Generator",
        "Generate unique-sounding random usernames by combining adjectives, nouns, and numbers. Free, no sign-up, runs in your browser.",
        "live",
        ["random username generator", "generate random username", "unique username generator", "username idea generator"],
        "Random Username Generator — Free"
      ),
      tool(
        "random-nickname",
        "Random Nickname Generator",
        "Generate playful random nicknames and gamertags by combining adjectives with animal names. Free, no sign-up, runs in your browser.",
        "live",
        ["random nickname generator", "gamertag generator", "generate random nickname", "cool nickname generator"],
        "Random Nickname Generator — Gamertags"
      ),
      tool(
        "random-emoji",
        "Random Emoji Generator",
        "Generate random emoji from a curated set of faces, animals, food, and objects. Free, no sign-up, runs in your browser.",
        "live",
        ["random emoji generator", "generate random emoji", "random emoji picker", "emoji generator online"],
        "Random Emoji Generator — Free Online"
      ),
      tool(
        "random-credit-card",
        "Random Credit Card Number Generator",
        "Generate Luhn-valid test card numbers for Visa, Mastercard, Amex and Discover, with expiry date and CVV security code. For testing payment forms only; not real cards.",
        "live",
        ["credit card generator", "random credit card generator", "fake credit card generator", "test credit card number with cvv", "luhn valid card number generator"],
        "Credit Card Generator — Test Numbers with CVV"
      ),
      tool(
        "random-phone-number",
        "Random Phone Number Generator",
        "Generate fake phone numbers for testing, using officially reserved fictional ranges where available. Free, no sign-up, runs in your browser.",
        "live",
        ["random phone number generator", "fake phone number generator", "generate random phone number", "test phone number generator"],
        "Random Phone Number Generator — Fake"
      ),
      tool(
        "random-address",
        "Random Address Generator",
        "Generate random US-style addresses with street, city, state and ZIP code for testing forms, checkout flows and mock data. Free, in bulk, not real locations.",
        "live",
        ["random address generator", "fake address generator", "generate random address", "test address generator"],
        "Random Address Generator — Fake US Addresses"
      ),
    ],
  },
  {
    slug: "fun",
    title: "Fun & Trivia",
    icon: "\u{1F389}",
    description: "Fun random generators for animals, countries, movies, games, and more \u2014 great for icebreakers, trivia, and deciding what's next.",
    tools: [
      tool(
        "random-animal",
        "Random Animal Generator",
        "Generate a random animal from a list of 50 wild and domestic species \u2014 fun for games and icebreakers. Free, no sign-up, runs in your browser.",
        "live",
        ["random animal generator", "generate random animal", "random animal picker", "animal name generator"],
        "Random Animal Generator — Free Online"
      ),
      tool(
        "random-country",
        "Random Country Generator",
        "Generate a random country complete with its flag emoji \u2014 great for travel inspiration and geography quizzes. Free, no sign-up, runs in your browser.",
        "live",
        ["random country generator", "generate random country", "random country picker", "pick a random country"],
        "Random Country Generator — With Flags"
      ),
      tool(
        "random-city",
        "Random City Generator",
        "Generate a random major city from around the world for travel ideas and geography practice. Free, no sign-up, runs in your browser.",
        "live",
        ["random city generator", "generate random city", "random city picker", "pick a random city"],
        "Random City Generator — World Cities"
      ),
      tool(
        "random-food",
        "Random Food Generator",
        "Can't decide what to eat? Generate a random dish from around the world for dinner inspiration. Free, no sign-up, runs in your browser.",
        "live",
        ["random food generator", "what should i eat generator", "generate random food", "random meal generator"],
        "Random Food Generator — What to Eat?"
      ),
      tool(
        "random-fruit",
        "Random Fruit Generator",
        "Generate a random fruit from a list of 35 fruits from around the world. Free, no sign-up, runs in your browser.",
        "live",
        ["random fruit generator", "generate random fruit", "random fruit picker", "fruit name generator"],
        "Random Fruit Generator — Free Online"
      ),
      tool(
        "random-vegetable",
        "Random Vegetable Generator",
        "Generate a random vegetable \u2014 handy for meal planning and healthy-eating challenges. Free, no sign-up, runs in your browser.",
        "live",
        ["random vegetable generator", "generate random vegetable", "random vegetable picker", "vegetable name generator"],
        "Random Vegetable Generator — Free Online"
      ),
      tool(
        "random-drink",
        "Random Drink Generator",
        "Generate a random non-alcoholic drink or beverage idea in seconds. Free, no sign-up, runs in your browser.",
        "live",
        ["random drink generator", "generate random drink", "random beverage generator", "what should i drink generator"],
        "Random Drink Generator — Free Online"
      ),
      tool(
        "random-movie",
        "Random Movie Generator",
        "Generate a random movie from a curated list of well-known films across genres \u2014 perfect for deciding what to watch. Free, no sign-up, runs in your browser.",
        "live",
        ["random movie generator", "what movie should i watch generator", "generate random movie", "movie picker online"],
        "Random Movie Generator — What to Watch?"
      ),
      tool(
        "random-tv-show",
        "Random TV Show Generator",
        "Generate a random TV show from a curated list of popular series across genres \u2014 great for your next binge. Free, no sign-up, runs in your browser.",
        "live",
        ["random tv show generator", "what show should i watch generator", "generate random tv show", "tv show picker online"],
        "Random TV Show Generator — What to Watch"
      ),
      tool(
        "random-book",
        "Random Book Generator",
        "Generate a random book from a curated list of classic and popular titles \u2014 a fun way to find your next read. Free, no sign-up, runs in your browser.",
        "live",
        ["random book generator", "what book should i read generator", "generate random book", "book picker online"],
        "Random Book Generator — What to Read?"
      ),
      tool(
        "random-game",
        "Random Game Generator",
        "Generate a random video game from a curated list across genres and platforms \u2014 great for deciding what to play. Free, no sign-up, runs in your browser.",
        "live",
        ["random game generator", "what game should i play generator", "generate random video game", "game picker online"],
        "Random Video Game Generator — Free"
      ),
      tool(
        "random-pokemon",
        "Random Pokemon Generator",
        "Generate a random Pokemon from the original Generation I lineup \u2014 a fun, unofficial fan tool. Free, no sign-up, runs in your browser.",
        "live",
        ["random pokemon generator", "generate random pokemon", "random pokemon picker", "pokemon name generator"],
        "Random Pokemon Generator — Gen 1"
      ),
      tool(
        "random-dinosaur",
        "Random Dinosaur Generator",
        "Generate a random dinosaur species name \u2014 fun for classroom projects and trivia nights. Free, no sign-up, runs in your browser.",
        "live",
        ["random dinosaur generator", "generate random dinosaur", "random dinosaur picker", "dinosaur name generator"],
        "Random Dinosaur Generator — Free Online"
      ),
      tool(
        "random-bird",
        "Random Bird Generator",
        "Generate a random bird species name \u2014 great for birdwatching lists and trivia games. Free, no sign-up, runs in your browser.",
        "live",
        ["random bird generator", "generate random bird", "random bird picker", "bird name generator"],
        "Random Bird Generator — Free Online"
      ),
      tool(
        "random-flag",
        "Random Flag Generator",
        "Generate random country flags with their names \u2014 fun for geography quizzes and flag-guessing games. Free, no sign-up, runs in your browser.",
        "live",
        ["random flag generator", "generate random flag", "random country flag generator", "flag guessing game"],
        "Random Flag Generator — Flag Quiz"
      ),
    ],
  },
  {
    slug: "decision-tools",
    title: "Decision Tools",
    icon: "\u{1F3AF}",
    description: "Spin a wheel, flip a coin, roll dice, or generate teams and Secret Santa pairs \u2014 quick tools for making decisions.",
    tools: [
      tool(
        "spin-wheel",
        "Spin Wheel",
        "Create a custom spinning wheel from your own list of options and let it randomly pick a winner. Free, no sign-up, runs in your browser.",
        "live",
        ["spin the wheel", "random wheel spinner", "wheel of names", "decision wheel online"],
        "Spin the Wheel — Random Name Picker"
      ),
      tool(
        "yes-or-no",
        "Yes or No Generator",
        "Get an instant random Yes or No answer to any question \u2014 with a running history and tally. Free, no sign-up, runs in your browser.",
        "live",
        ["yes or no generator", "random yes or no", "yes no wheel", "decision maker yes or no"],
        "Yes or No Generator — Random Answer"
      ),
      tool(
        "coin-flip",
        "Coin Flip",
        "Flip a virtual coin online with an animated flip, plus a running heads/tails tally. Free, no sign-up, runs in your browser.",
        "live",
        ["coin flip online", "flip a coin", "heads or tails generator", "virtual coin flip"],
        "Coin Flip — Heads or Tails Online"
      ),
      tool(
        "dice-roller",
        "Dice Roller",
        "Roll one or more virtual dice online \u2014 D4, D6, D8, D10, D12, or D20, with an automatic total. Free, no sign-up, runs in your browser.",
        "live",
        ["dice roller online", "roll a dice", "virtual dice roller", "roll dice online"],
        "Dice Roller — Roll D6, D20 & More Online"
      ),
      tool(
        "number-picker",
        "Number Picker",
        "Pick a single random number from any range \u2014 a quick decision-maker with an option to avoid recent repeats. Free, no sign-up, runs in your browser.",
        "live",
        ["random number picker", "pick a random number", "number picker wheel", "spin a number generator"],
        "Random Number Picker — Free Online"
      ),
      tool(
        "team-generator",
        "Team Generator",
        "Randomly split a list of names into balanced teams for games, classrooms, or work groups. Free, no sign-up, runs in your browser.",
        "live",
        ["random team generator", "team generator online", "split into random teams", "group generator online"],
        "Random Team Generator — Split Into Teams"
      ),
      tool(
        "random-picker",
        "Random Picker",
        "Pick one random item from your own custom list, with an option to remove picks so nothing repeats. Free, no sign-up, runs in your browser.",
        "live",
        ["random picker online", "pick random item from list", "random choice generator", "random name picker"],
        "Random Picker — Pick from a List Online"
      ),
      tool(
        "secret-santa-generator",
        "Secret Santa Generator",
        "Generate random Secret Santa gift-giving pairs from a list of names, with private tap-to-reveal cards. Free, no sign-up, runs in your browser.",
        "live",
        ["secret santa generator", "secret santa name picker", "secret santa pairing generator", "gift exchange generator"],
        "Secret Santa Generator — Free Online"
      ),
    ],
  },
  {
    slug: "loan-calculators",
    title: "Loan Calculators",
    icon: "\u{1F3E6}",
    description: "Calculate EMI, check loan eligibility, compare offers, and plan prepayments for home, car, education, and personal loans.",
    tools: [
      tool(
        "emi-calculator",
        "EMI Calculator",
        "Calculate your monthly loan EMI, total interest, and total payment using the standard reducing-balance formula. Free, no sign-up, runs in your browser.",
        "live",
        ["emi calculator", "loan emi calculator", "calculate emi online", "monthly installment calculator"],
        "EMI Calculator Online — Home Loan Monthly EMI"
      ),
      tool(
        "loan-eligibility",
        "Loan Eligibility Calculator",
        "Estimate how much loan you're eligible for based on your income, existing EMIs, and the lender's FOIR limit. Free, no sign-up, runs in your browser.",
        "live",
        ["loan eligibility calculator", "how much loan can i get", "loan eligibility check", "max loan amount calculator"],
        "Loan Eligibility Calculator — By Salary"
      ),
      tool(
        "loan-affordability",
        "Loan Affordability Calculator",
        "Work backwards from your monthly EMI budget to see how much loan you can comfortably afford. Free, no sign-up, runs in your browser.",
        "live",
        ["loan affordability calculator", "how much loan can i afford", "affordable loan amount calculator", "emi budget calculator"],
        "Loan Affordability Calculator — By EMI"
      ),
      tool(
        "loan-comparison",
        "Loan Comparison Calculator",
        "Compare two or more loan offers side by side by EMI, total interest, and total repayment. Free, no sign-up, runs in your browser.",
        "live",
        ["loan comparison calculator", "compare loan offers", "compare emi rates", "best loan offer calculator"],
        "Loan Comparison Calculator — Compare EMIs"
      ),
      tool(
        "loan-prepayment",
        "Loan Prepayment Calculator",
        "See how much time and interest a lump-sum loan prepayment can save you. Free, no sign-up, runs in your browser.",
        "live",
        ["loan prepayment calculator", "part payment calculator", "prepayment interest saved calculator", "foreclosure calculator"],
        "Loan Prepayment Calculator — Save Interest"
      ),
      tool(
        "car-loan",
        "Car Loan Calculator",
        "Calculate your car loan EMI including down payment, with a full amortization schedule. Free, no sign-up, runs in your browser.",
        "live",
        ["car loan calculator", "car loan emi calculator", "auto loan calculator", "vehicle loan emi calculator"],
        "Car Loan EMI Calculator — Free Online"
      ),
      tool(
        "bike-loan",
        "Bike Loan Calculator",
        "Calculate your two-wheeler loan EMI including down payment, with a full amortization schedule. Free, no sign-up, runs in your browser.",
        "live",
        ["bike loan calculator", "bike loan emi calculator", "two wheeler loan calculator", "motorcycle loan calculator"],
        "Bike Loan EMI Calculator — Two-Wheeler"
      ),
      tool(
        "home-loan",
        "Home Loan Calculator",
        "Calculate your home loan EMI, total interest, and a full yearly amortization schedule. Free, no sign-up, runs in your browser.",
        "live",
        ["home loan calculator", "home loan emi calculator", "mortgage emi calculator", "housing loan calculator"],
        "Home Loan EMI Calculator — Amortization"
      ),
      tool(
        "education-loan",
        "Education Loan Calculator",
        "Calculate your education loan EMI, including an optional moratorium (grace) period during your studies. Free, no sign-up, runs in your browser.",
        "live",
        ["education loan calculator", "student loan emi calculator", "education loan emi with moratorium", "study loan calculator"],
        "Education Loan EMI Calculator"
      ),
      tool(
        "personal-loan",
        "Personal Loan Calculator",
        "Calculate your personal loan EMI, total interest, and total payment. Free, no sign-up, runs in your browser.",
        "live",
        ["personal loan calculator", "personal loan emi calculator", "calculate personal loan emi", "unsecured loan calculator"],
        "Personal Loan EMI Calculator — Free"
      ),
    ],
  },
  {
    slug: "investment-calculators",
    title: "Investment Calculators",
    icon: "\u{1F4C8}",
    description: "Project SIP and lumpsum returns, calculate CAGR, XIRR, IRR, and ROI, and track mutual fund and stock gains.",
    tools: [
      tool(
        "sip-calculator",
        "SIP Calculator",
        "Estimate the future value of a monthly SIP investment based on your expected rate of return. Free, no sign-up, runs in your browser.",
        "live",
        ["sip calculator", "sip return calculator", "mutual fund sip calculator", "monthly sip calculator"],
        "SIP Calculator India — Mutual Fund Returns Online"
      ),
      tool(
        "swp-calculator",
        "SWP Calculator",
        "See how long your investment corpus will last with a Systematic Withdrawal Plan, or your balance after N years. Free, no sign-up, runs in your browser.",
        "live",
        ["swp calculator", "systematic withdrawal plan calculator", "swp return calculator", "monthly withdrawal plan calculator"],
        "SWP Calculator — Systematic Withdrawal"
      ),
      tool(
        "lumpsum-calculator",
        "Lumpsum Calculator",
        "Estimate the future value of a one-time lumpsum investment at a given rate of return. Free, no sign-up, runs in your browser.",
        "live",
        ["lumpsum calculator", "lumpsum investment calculator", "lumpsum return calculator", "one time investment calculator"],
        "Lumpsum Calculator — Mutual Fund Returns"
      ),
      tool(
        "step-up-sip",
        "Step-up SIP Calculator",
        "Estimate SIP returns when you increase your monthly investment by a fixed percentage every year. Free, no sign-up, runs in your browser.",
        "live",
        ["step up sip calculator", "top up sip calculator", "increasing sip calculator", "annual step up sip calculator"],
        "Step-up SIP Calculator — Top-up SIP"
      ),
      tool(
        "cagr-calculator",
        "CAGR Calculator",
        "Calculate the Compound Annual Growth Rate between an initial and final investment value. Free, no sign-up, runs in your browser.",
        "live",
        ["cagr calculator", "compound annual growth rate calculator", "calculate cagr online", "annual growth rate calculator"],
        "CAGR Calculator — Annual Growth Rate"
      ),
      tool(
        "xirr-calculator",
        "XIRR Calculator",
        "Calculate the annualized return (XIRR) of investments with irregular cash flows and dates. Free, no sign-up, runs in your browser.",
        "live",
        ["xirr calculator", "xirr calculator online", "calculate xirr", "irregular cash flow return calculator"],
        "XIRR Calculator — Returns on Irregular SIPs"
      ),
      tool(
        "irr-calculator",
        "IRR Calculator",
        "Calculate the Internal Rate of Return for a series of regular periodic cash flows. Free, no sign-up, runs in your browser.",
        "live",
        ["irr calculator", "internal rate of return calculator", "calculate irr online", "irr calculator online"],
        "IRR Calculator — Internal Rate of Return"
      ),
      tool(
        "roi-calculator",
        "ROI Calculator",
        "Calculate your Return on Investment, with an optional annualized return based on your holding period. Free, no sign-up, runs in your browser.",
        "live",
        ["roi calculator", "return on investment calculator", "calculate roi online", "roi percentage calculator"],
        "ROI Calculator — Return on Investment"
      ),
      tool(
        "mutual-fund-returns",
        "Mutual Fund Returns Calculator",
        "Calculate your mutual fund's absolute and annualized returns from units held and NAV values. Free, no sign-up, runs in your browser.",
        "live",
        ["mutual fund returns calculator", "mutual fund return calculator", "nav return calculator", "mutual fund profit calculator"],
        "Mutual Fund Returns Calculator — NAV"
      ),
      tool(
        "stock-average-price",
        "Stock Average Price Calculator",
        "Calculate your average buy price across multiple stock purchases, plus profit or loss at the current price. Free, no sign-up, runs in your browser.",
        "live",
        ["stock average price calculator", "average share price calculator", "average down calculator stocks", "stock cost average calculator"],
        "Stock Average Calculator — Avg Buy Price"
      ),
    ],
  },
  {
    slug: "savings-calculators",
    title: "Savings Calculators",
    icon: "\u{1F4B0}",
    description: "Project maturity values for fixed deposits, recurring deposits, PPF, EPF, NPS, and Sukanya Samriddhi accounts.",
    tools: [
      tool(
        "fd-calculator",
        "FD Calculator",
        "Calculate the maturity value and interest earned on a Fixed Deposit with your choice of compounding frequency. Free, no sign-up, runs in your browser.",
        "live",
        ["fd calculator", "fixed deposit calculator", "fd maturity calculator", "fd interest calculator"],
        "FD Calculator — Fixed Deposit Interest"
      ),
      tool(
        "rd-calculator",
        "RD Calculator",
        "Calculate the maturity value of a Recurring Deposit based on your monthly deposit, interest rate, and tenure. Free, no sign-up, runs in your browser.",
        "live",
        ["rd calculator", "recurring deposit calculator", "rd maturity calculator", "rd interest calculator"],
        "RD Calculator — Recurring Deposit Maturity"
      ),
      tool(
        "ppf-calculator",
        "PPF Calculator",
        "Calculate your Public Provident Fund maturity value based on yearly contributions and the current interest rate. Free, no sign-up, runs in your browser.",
        "live",
        ["ppf calculator", "public provident fund calculator", "ppf maturity calculator", "ppf interest calculator"],
        "PPF Calculator — Maturity & Interest"
      ),
      tool(
        "epf-calculator",
        "EPF Calculator",
        "Estimate your Employee Provident Fund corpus at retirement based on your salary, contributions, and annual increments. Free, no sign-up, runs in your browser.",
        "live",
        ["epf calculator", "employee provident fund calculator", "epf maturity calculator", "pf calculator"],
        "EPF Calculator — PF Balance at Retirement"
      ),
      tool(
        "nps-calculator",
        "NPS Calculator",
        "Estimate your National Pension Scheme corpus at retirement and the resulting monthly pension from annuitization. Free, no sign-up, runs in your browser.",
        "live",
        ["nps calculator", "national pension scheme calculator", "nps maturity calculator", "nps pension calculator"],
        "NPS Calculator — Pension & Corpus"
      ),
      tool(
        "sukanya-calculator",
        "Sukanya Samriddhi Calculator",
        "Calculate the maturity value of a Sukanya Samriddhi Yojana account based on yearly deposits and the current interest rate. Free, no sign-up, runs in your browser.",
        "live",
        ["sukanya samriddhi calculator", "ssy calculator", "sukanya samriddhi yojana calculator", "girl child savings scheme calculator"],
        "Sukanya Samriddhi Yojana Calculator"
      ),
    ],
  },
  {
    slug: "retirement-calculators",
    title: "Retirement Calculators",
    icon: "\u{1F3D6}\uFE0F",
    description: "Plan your retirement corpus, financial independence (FIRE) timeline, pension payouts, and general time-value-of-money calculations.",
    tools: [
      tool(
        "retirement-calculator",
        "Retirement Calculator",
        "Estimate the retirement corpus you'll need and the monthly SIP required to build it, adjusted for inflation. Free, no sign-up, runs in your browser.",
        "live",
        ["retirement calculator", "retirement corpus calculator", "retirement planning calculator", "how much do i need to retire"],
        "Retirement Calculator — Corpus Planner"
      ),
      tool(
        "fire-calculator",
        "FIRE Calculator",
        "Calculate your Financial Independence, Retire Early (FIRE) number and estimate how many years until you reach it. Free, no sign-up, runs in your browser.",
        "live",
        ["fire calculator", "financial independence calculator", "fire number calculator", "retire early calculator"],
        "FIRE Calculator — Retire Early Number"
      ),
      tool(
        "pension-calculator",
        "Pension Calculator",
        "Estimate your retirement corpus and the monthly pension it can generate based on your contributions and annuity rate. Free, no sign-up, runs in your browser.",
        "live",
        ["pension calculator", "monthly pension calculator", "pension corpus calculator", "retirement pension calculator"],
        "Pension Calculator — Monthly Pension"
      ),
      tool(
        "future-value",
        "Future Value Calculator",
        "Calculate the future value of a present sum plus optional periodic contributions at a given rate of return. Free, no sign-up, runs in your browser.",
        "live",
        ["future value calculator", "fv calculator", "future value of money calculator", "compound interest future value"],
        "Future Value Calculator — FV Online"
      ),
      tool(
        "present-value",
        "Present Value Calculator",
        "Calculate the present value of a future sum of money, discounted at your chosen rate of return. Free, no sign-up, runs in your browser.",
        "live",
        ["present value calculator", "pv calculator", "present value of money calculator", "discounted value calculator"],
        "Present Value Calculator — PV Online"
      ),
    ],
  },
  {
    slug: "tax-calculators",
    title: "Tax Calculators",
    icon: "\u{1F4CB}",
    description: "Estimate income tax, GST, HRA exemption, capital gains, TDS, and salary/take-home pay for India.",
    tools: [
      tool(
        "income-tax-calculator",
        "Income Tax Calculator",
        "Estimate your income tax liability under both the new and old tax regimes and see which one saves you more. Free, no sign-up, runs in your browser.",
        "live",
        ["income tax calculator", "income tax calculator india", "new vs old tax regime calculator", "tax calculator india"],
        "Income Tax Calculator India — New vs Old Regime"
      ),
      tool(
        "gst-calculator",
        "GST Calculator",
        "Add or remove GST from an amount at any standard GST rate (5%, 12%, 18%, 28%). Free, no sign-up, runs in your browser.",
        "live",
        ["gst calculator", "gst calculator india", "add gst calculator", "remove gst calculator"],
        "GST Calculator India — Inclusive & Exclusive"
      ),
      tool(
        "hra-calculator",
        "HRA Calculator",
        "Calculate your House Rent Allowance (HRA) tax exemption based on your salary, HRA received, and rent paid. Free, no sign-up, runs in your browser.",
        "live",
        ["hra calculator", "hra exemption calculator", "house rent allowance calculator", "hra tax exemption calculator"],
        "HRA Exemption Calculator — Free Online"
      ),
      tool(
        "capital-gains-calculator",
        "Capital Gains Calculator",
        "Calculate your capital gain and check whether it qualifies as short-term or long-term based on your holding period. Free, no sign-up, runs in your browser.",
        "live",
        ["capital gains calculator", "capital gains tax calculator", "ltcg calculator", "stcg calculator"],
        "Capital Gains Calculator — STCG & LTCG"
      ),
      tool(
        "tds-calculator",
        "TDS Calculator",
        "Calculate TDS (Tax Deducted at Source) and net payable amount for common payment types and sections. Free, no sign-up, runs in your browser.",
        "live",
        ["tds calculator", "tds calculator india", "tax deducted at source calculator", "tds rate calculator"],
        "TDS Calculator — Tax Deducted at Source"
      ),
      tool(
        "salary-calculator",
        "Salary Calculator",
        "Break down your annual CTC into salary components: basic, HRA, allowances, PF, and gross/net monthly salary. Free, no sign-up, runs in your browser.",
        "live",
        ["salary calculator", "ctc calculator", "salary breakup calculator", "ctc to salary calculator"],
        "Salary Calculator — CTC Breakup"
      ),
      tool(
        "take-home-salary",
        "Take Home Salary Calculator",
        "Calculate your final in-hand monthly salary after PF, professional tax, and estimated income tax deductions. Free, no sign-up, runs in your browser.",
        "live",
        ["take home salary calculator", "in hand salary calculator", "net salary calculator", "ctc to in hand salary calculator"],
        "Take Home Salary Calculator — In-Hand Pay"
      ),
    ],
  },
  {
    slug: "currency-calculators",
    title: "Currency & Metals Calculators",
    icon: "\u{1FA99}",
    description: "Calculate the value of gold and silver based on live market rates, purity, and weight.",
    tools: [
      tool(
        "gold-price-calculator",
        "Gold Price Calculator",
        "Calculate the value of your gold based on today's rate, purity (24K/22K/18K/14K), and weight. Free, no sign-up, runs in your browser.",
        "live",
        ["gold price calculator", "gold rate calculator", "gold value calculator", "22k to 24k gold calculator"],
        "Gold Price Calculator — 24K, 22K, 18K"
      ),
      tool(
        "silver-price-calculator",
        "Silver Price Calculator",
        "Calculate the value of your silver based on today's rate and weight in grams, kilograms, or ounces. Free, no sign-up, runs in your browser.",
        "live",
        ["silver price calculator", "silver rate calculator", "silver value calculator", "silver weight calculator"],
        "Silver Price Calculator — By Weight"
      ),
    ],
  },
  {
    slug: "business-calculators",
    title: "Business Calculators",
    icon: "\u{1F4BC}",
    description: "Generate GST invoices and calculate profit margin, break-even point, discounts, commission, VAT, and general invoices.",
    tools: [
      tool(
        "gst-invoice-generator",
        "GST Invoice Generator",
        "Generate a simple GST invoice with line items, CGST/SGST or IGST split, and a live total preview. Free, no sign-up, runs in your browser.",
        "live",
        ["gst invoice generator", "gst invoice maker", "gst bill generator", "gst invoice format"],
        "GST Invoice Generator — Free Online"
      ),
      tool(
        "profit-margin-calculator",
        "Profit Margin Calculator",
        "Calculate your profit, profit margin percentage, and markup percentage from cost price and selling price. Free, no sign-up, runs in your browser.",
        "live",
        ["profit margin calculator", "margin calculator", "markup calculator", "profit percentage calculator"],
        "Profit Margin Calculator — Margin & Markup"
      ),
      tool(
        "break-even-calculator",
        "Break-even Calculator",
        "Calculate the number of units and revenue needed to break even based on fixed costs, variable costs, and price. Free, no sign-up, runs in your browser.",
        "live",
        ["break even calculator", "break even point calculator", "break even analysis calculator", "break even units calculator"],
        "Break-Even Calculator — Units & Revenue"
      ),
      tool(
        "discount-calculator",
        "Discount Calculator",
        "Calculate a discounted price from a percentage off, or work backwards to find the original price. Free, no sign-up, runs in your browser.",
        "live",
        ["discount calculator", "percentage off calculator", "sale price calculator", "discount percentage calculator"],
        "Discount Calculator — Percent Off Price"
      ),
      tool(
        "commission-calculator",
        "Commission Calculator",
        "Calculate commission earned on a sale amount at a given commission percentage rate. Free, no sign-up, runs in your browser.",
        "live",
        ["commission calculator", "sales commission calculator", "commission percentage calculator", "broker commission calculator"],
        "Commission Calculator — Sales Commission"
      ),
      tool(
        "vat-calculator",
        "VAT Calculator",
        "Add or remove VAT from an amount at any VAT rate \u2014 useful for UK, EU, and other VAT-based tax systems. Free, no sign-up, runs in your browser.",
        "live",
        ["vat calculator", "add vat calculator", "remove vat calculator", "vat calculator uk"],
        "VAT Calculator — Add or Remove VAT"
      ),
      tool(
        "invoice-calculator",
        "Invoice Calculator",
        "Calculate an invoice total from line items with an optional discount and tax rate. Free, no sign-up, runs in your browser.",
        "live",
        ["invoice calculator", "invoice total calculator", "invoice generator", "invoice tax calculator"],
        "Invoice Calculator — Totals, Tax & Discount"
      ),
    ],
  },
  {
    slug: "personal-finance-calculators",
    title: "Personal Finance Calculators",
    icon: "\u{1F4B5}",
    description: "Plan your budget, track expenses, calculate net worth, build an emergency fund, and pay off debt faster.",
    tools: [
      tool(
        "budget-planner",
        "Budget Planner",
        "Plan your monthly budget by comparing your income against custom expense categories and see your savings rate. Free, no sign-up, runs in your browser.",
        "live",
        ["budget planner", "monthly budget calculator", "budget calculator", "50 30 20 rule calculator"],
        "Budget Planner — Monthly Budget Online"
      ),
      tool(
        "expense-tracker",
        "Expense Tracker",
        "Log individual expenses by category and see a visual breakdown of where your money goes. Free, no sign-up, runs in your browser.",
        "live",
        ["expense tracker", "expense tracker online", "expense calculator", "spending tracker"],
        "Expense Tracker — Track Spending Online"
      ),
      tool(
        "net-worth-calculator",
        "Net Worth Calculator",
        "Calculate your net worth by listing your assets and liabilities. Free, no sign-up, runs in your browser.",
        "live",
        ["net worth calculator", "net worth calculator online", "personal net worth calculator", "assets and liabilities calculator"],
        "Net Worth Calculator — Assets & Debts"
      ),
      tool(
        "emergency-fund-calculator",
        "Emergency Fund Calculator",
        "Calculate your target emergency fund based on your essential expenses and desired months of coverage. Free, no sign-up, runs in your browser.",
        "live",
        ["emergency fund calculator", "emergency fund goal calculator", "how much emergency fund do i need", "rainy day fund calculator"],
        "Emergency Fund Calculator — Free"
      ),
      tool(
        "debt-payoff-calculator",
        "Debt Payoff Calculator",
        "Compare the snowball and avalanche debt payoff strategies to see how fast you can become debt-free. Free, no sign-up, runs in your browser.",
        "live",
        ["debt payoff calculator", "debt snowball calculator", "debt avalanche calculator", "debt free calculator"],
        "Debt Payoff Calculator — Snowball vs Avalanche"
      ),
      tool(
        "credit-card-interest-calculator",
        "Credit Card Interest Calculator",
        "Calculate how long it will take to pay off a credit card balance and the total interest you'll pay. Free, no sign-up, runs in your browser.",
        "live",
        ["credit card interest calculator", "credit card payoff calculator", "credit card debt calculator", "minimum payment calculator"],
        "Credit Card Interest Calculator"
      ),
    ],
  },
  {
    slug: "insurance-calculators",
    title: "Insurance Calculators",
    icon: "\u{1F6E1}\uFE0F",
    description: "Estimate how much life insurance, term insurance, and health insurance coverage you need.",
    tools: [
      tool(
        "life-insurance-calculator",
        "Life Insurance Calculator",
        "Estimate how much life insurance cover you need based on your income, liabilities, and existing cover. Free, no sign-up, runs in your browser.",
        "live",
        ["life insurance calculator", "life insurance need calculator", "how much life insurance do i need", "human life value calculator"],
        "Life Insurance Calculator — Cover Needed"
      ),
      tool(
        "health-insurance-estimator",
        "Health Insurance Estimator",
        "Get a rough estimate of your annual health insurance premium based on age, family size, and sum insured. Free, no sign-up, runs in your browser.",
        "live",
        ["health insurance estimator", "health insurance premium calculator", "mediclaim calculator", "health insurance cost calculator"],
        "Health Insurance Premium Estimator"
      ),
      tool(
        "term-insurance-need-calculator",
        "Term Insurance Need Calculator",
        "Calculate the ideal term insurance sum assured based on income replacement, loans, goals, and existing savings. Free, no sign-up, runs in your browser.",
        "live",
        ["term insurance need calculator", "term insurance calculator", "sum assured calculator", "how much term insurance do i need"],
        "Term Insurance Calculator — Cover Needed"
      ),
    ],
  },
  {
    slug: "real-estate-calculators",
    title: "Real Estate Calculators",
    icon: "\u{1F3E1}",
    description: "Calculate stamp duty, rental yield, mortgage payments (PITI), and property investment ROI.",
    tools: [
      tool(
        "stamp-duty-calculator",
        "Stamp Duty Calculator",
        "Calculate stamp duty and registration charges on a property based on its value and state. Free, no sign-up, runs in your browser.",
        "live",
        ["stamp duty calculator", "stamp duty calculator india", "property registration charges calculator", "stamp duty and registration calculator"],
        "Stamp Duty Calculator — India by State"
      ),
      tool(
        "rental-yield-calculator",
        "Rental Yield Calculator",
        "Calculate the gross and net rental yield of a property based on its value, rent, and expenses. Free, no sign-up, runs in your browser.",
        "live",
        ["rental yield calculator", "rental yield calculator india", "property yield calculator", "gross yield calculator"],
        "Rental Yield Calculator — Gross & Net"
      ),
      tool(
        "mortgage-calculator",
        "Mortgage Calculator",
        "Calculate your full monthly mortgage payment including principal, interest, property tax, insurance, and HOA (PITI). Free, no sign-up, runs in your browser.",
        "live",
        ["mortgage calculator", "mortgage payment calculator", "piti calculator", "home mortgage calculator"],
        "Mortgage Calculator — Monthly PITI Payment"
      ),
      tool(
        "property-roi",
        "Property ROI Calculator",
        "Calculate the total and annualized ROI of a property investment including rental income and appreciation. Free, no sign-up, runs in your browser.",
        "live",
        ["property roi calculator", "real estate roi calculator", "property investment calculator", "real estate return calculator"],
        "Property ROI Calculator — Real Estate"
      ),
    ],
  },
  {
    slug: "crypto-calculators",
    title: "Crypto Calculators",
    icon: "\u{20BF}",
    description: "Calculate cryptocurrency trading profit/loss and mining profitability after fees and electricity costs.",
    tools: [
      tool(
        "crypto-profit-calculator",
        "Crypto Profit Calculator",
        "Calculate your net profit and ROI on a crypto trade after accounting for buy and sell exchange fees. Free, no sign-up, runs in your browser.",
        "live",
        ["crypto profit calculator", "crypto profit loss calculator", "bitcoin profit calculator", "crypto roi calculator"],
        "Crypto Profit Calculator — With Fees"
      ),
      tool(
        "mining-profit-calculator",
        "Mining Profit Calculator",
        "Calculate your daily and monthly crypto mining profit after electricity costs and pool fees. Free, no sign-up, runs in your browser.",
        "live",
        ["mining profit calculator", "crypto mining calculator", "bitcoin mining profit calculator", "mining profitability calculator"],
        "Crypto Mining Profit Calculator"
      ),
    ],
  },
];

export function getAllTools() {
  return categories.flatMap((category) =>
    category.tools.map((t) => ({ ...t, categorySlug: category.slug, categoryTitle: category.title }))
  );
}

export function getCategory(categorySlug: string) {
  return categories.find((c) => c.slug === categorySlug);
}

/** Categories with only their live tools, skipping any category that has no live tools yet. */
export function getLiveCategories(): Category[] {
  return categories
    .map((c) => ({ ...c, tools: c.tools.filter((t) => t.status === "live") }))
    .filter((c) => c.tools.length > 0);
}

export function getTool(categorySlug: string, toolSlug: string) {
  const category = getCategory(categorySlug);
  const found = category?.tools.find((t) => t.slug === toolSlug);
  return found ? { tool: found, category } : undefined;
}

/** Hand-picked flagship tools shown in the homepage's "Popular tools" section. */
const featuredToolRefs: { categorySlug: string; slug: string }[] = [
  { categorySlug: "json", slug: "formatter" },
  { categorySlug: "security", slug: "password-generator" },
  { categorySlug: "security", slug: "base64-encode" },
  { categorySlug: "ids", slug: "uuid-v4" },
  { categorySlug: "colors", slug: "picker" },
  { categorySlug: "qr-barcode", slug: "qr-generator" },
  { categorySlug: "text", slug: "word-counter" },
  { categorySlug: "numbers", slug: "unit-converter" },
  { categorySlug: "markdown", slug: "preview" },
  { categorySlug: "security", slug: "jwt-decoder" },
  { categorySlug: "loan-calculators", slug: "emi-calculator" },
  { categorySlug: "decision-tools", slug: "spin-wheel" },
];

/** Resolves the curated flagship tool list, skipping any ref that is missing or not live. */
export function getFeaturedTools() {
  return featuredToolRefs
    .map(({ categorySlug, slug }) => {
      const found = getTool(categorySlug, slug);
      if (!found || found.tool.status !== "live") return undefined;
      return { ...found.tool, categorySlug, categoryTitle: found.category!.title };
    })
    .filter((t): t is NonNullable<typeof t> => t !== undefined);
}

export function toolHref(categorySlug: string, toolSlug: string) {
  return `/${categorySlug}/${toolSlug}`;
}

export const siteConfig = {
  name: "CodeSimplify",
  tagline: "Free online developer tools",
  description:
    "CodeSimplify is a free collection of online developer tools \u2014 format, validate, convert, and generate JSON, XML, YAML, CSV, SQL, and more, all in your browser.",
  url: "https://codesimplify.org",
};
