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
        "Format and beautify messy JSON into clean, readable, indented JSON instantly. Paste messy text and this json formatter rewrites it so it is easy to read. Formatting happens in your browser and is not uploaded.",
        "live",
        ["json formatter", "json beautifier", "pretty print json", "format json online"],
        "Free JSON Formatter Online — No Upload, Runs in Browser"
      ),
      tool(
        "validator",
        "JSON Validator",
        "Validate JSON syntax instantly and get precise line and column error locations. Paste your input and this json validator shows whether it is valid, and where to fix it. Checking happens in your browser.",
        "live",
        ["json validator", "validate json online", "json syntax checker"],
        "JSON Validator Online — Check Syntax, No Upload"
      ),
      tool(
        "beautifier",
        "JSON Beautifier",
        "Beautify JSON with custom indentation and optional alphabetical key sorting. Paste messy text and this json beautifier rewrites it so it is easy to read. Formatting happens in your browser and is not uploaded.",
        "live",
        ["json beautifier", "beautify json online", "pretty json"],
        "JSON Beautifier Online — Beautify JSON with custom indentation"
      ),
      tool(
        "minifier",
        "JSON Minifier",
        "Minify JSON by removing whitespace to reduce payload size for production. Paste readable text and this json minifier returns a smaller version you can copy. Nothing is uploaded.",
        "live",
        ["json minifier", "minify json online", "compress json"],
        "JSON Minifier Online — Minify JSON by removing whitespace"
      ),
      tool(
        "diff",
        "JSON Diff",
        "Compare two JSON documents and get a detailed, path-by-path list of differences. This json diff shows the result on the page as you work. Free to use, with no account. Your input is handled on this page and is not sent to a server.",
        "live",
        ["json diff", "compare json files", "json diff checker"],
        "JSON Diff Online — Compare two JSON documents and get a detailed"
      ),
      tool(
        "compare",
        "JSON Compare",
        "Compare two JSON objects side by side in a clear match/differs table. This json compare shows the result on the page as you work. Free to use, with no account. Your input is handled on this page and is not sent to a server.",
        "live",
        ["json compare", "json comparison tool"],
        "JSON Compare Online — Compare two JSON objects side by side"
      ),
      tool(
        "viewer",
        "JSON Viewer",
        "View JSON with syntax highlighting for keys, strings, numbers, and booleans. This json viewer shows the result on the page as you work. Open it on any device. The result is calculated locally and is not stored.",
        "live",
        ["json viewer", "json syntax highlighter"],
        "JSON Viewer Online — View JSON with syntax highlighting"
      ),
      tool(
        "tree-viewer",
        "JSON Tree Viewer",
        "Explore deeply nested JSON as a collapsible, navigable tree structure. This json tree viewer shows the result on the page as you work. Free to use, with no account. Your input is handled on this page and is not sent to a server.",
        "live",
        ["json tree viewer", "json tree explorer"],
        "JSON Tree Viewer Online — Explore deeply nested JSON as"
      ),
      tool(
        "to-xml",
        "JSON to XML",
        "Convert JSON data into well-formed XML markup instantly, right in your browser. Paste the source and this json to xml converter shows the result next to it. The work stays in your browser and is not uploaded.",
        "live",
        ["json to xml converter", "convert json to xml"],
        "JSON to XML Online — Convert JSON data into well-formed XML markup"
      ),
      tool(
        "to-yaml",
        "JSON to YAML",
        "Convert JSON data into clean, properly indented YAML. Paste the source and this json to yaml converter shows the result next to it. The work stays in your browser and is not uploaded.",
        "live",
        ["json to yaml converter", "convert json to yaml"],
        "JSON to YAML Online — Convert JSON data"
      ),
      tool(
        "to-csv",
        "JSON to CSV",
        "Convert a JSON array of objects into a downloadable CSV spreadsheet. Paste the source and this json to csv converter shows the result next to it. The work stays in your browser and is not uploaded.",
        "live",
        ["json to csv converter", "convert json to csv"],
        "JSON to CSV Online — Convert a JSON array of objects"
      ),
      tool(
        "to-excel",
        "JSON to Excel",
        "Convert a JSON array of objects into a downloadable Excel (.xlsx) workbook. Paste the source and this json to excel converter shows the result next to it. The work stays in your browser and is not uploaded.",
        "live",
        ["json to excel converter", "json to xlsx"],
        "JSON to Excel Online — Convert a JSON array of objects"
      ),
      tool(
        "to-java",
        "JSON to Java",
        "Generate Java POJO classes with getters and setters from JSON. Paste the source and this json to java pojo shows the result next to it. The work stays in your browser and is not uploaded.",
        "live",
        ["json to java pojo", "json to java class generator"],
        "JSON to Java Online — Generate Java POJO classes with getters"
      ),
      tool(
        "to-csharp",
        "JSON to C#",
        "Generate C# classes with auto-properties from JSON. Paste the source and this json to c# class generator shows the result next to it. The work stays in your browser and is not uploaded.",
        "live",
        ["json to c# class generator", "json to csharp"],
        "JSON to C# Online — Generate C# classes with auto-properties"
      ),
      tool(
        "to-php",
        "JSON to PHP",
        "Convert JSON into a native PHP array literal, ready to paste into your code. Paste the source and this json to php array shows the result next to it. The work stays in your browser and is not uploaded.",
        "live",
        ["json to php array", "json to php converter"],
        "JSON to PHP Online — Convert JSON into a native PHP array literal"
      ),
      tool(
        "to-typescript",
        "JSON to TypeScript",
        "Generate TypeScript interfaces from JSON, including nested types. Paste the source and this json to typescript interface shows the result next to it. The work stays in your browser and is not uploaded.",
        "live",
        ["json to typescript interface", "json to ts type generator"],
        "JSON to TypeScript Online — Generate TypeScript interfaces"
      ),
      tool(
        "to-kotlin",
        "JSON to Kotlin",
        "Generate Kotlin data classes from JSON, including nested types. Paste the source and this json to kotlin data class shows the result next to it. The work stays in your browser and is not uploaded.",
        "live",
        ["json to kotlin data class"],
        "JSON to Kotlin Online — Generate Kotlin data classes"
      ),
      tool(
        "to-dart",
        "JSON to Dart",
        "Generate Dart classes with fromJson factories from JSON, ready for Flutter. Paste the source and this json to dart class shows the result next to it. The work stays in your browser and is not uploaded.",
        "live",
        ["json to dart class", "json to flutter model"],
        "JSON to Dart Online — Generate Dart classes with fromJson factories"
      ),
      tool(
        "escape-unescape",
        "JSON Escape/Unescape",
        "Escape raw text into a safe JSON string literal, or unescape one back to plain text. Paste the source and this json escape shows the result next to it. The work stays in your browser and is not uploaded.",
        "live",
        ["json escape", "json unescape", "escape json string"],
        "JSON Escape/Unescape Online — Escape raw text into a safe JSON"
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
        "Format and indent XML into a clean, readable structure with validation. Paste messy text and this xml formatter rewrites it so it is easy to read. Formatting happens in your browser and is not uploaded.",
        "live",
        ["xml formatter", "format xml online", "xml beautifier"],
        "XML Formatter Online — Beautify XML in Browser"
      ),
      tool(
        "validator",
        "XML Validator",
        "Validate XML well-formedness instantly and get clear parser error messages. Paste your input and this xml validator shows whether it is valid, and where to fix it. Checking happens in your browser.",
        "live",
        ["xml validator", "validate xml online", "xml syntax checker"],
        "XML Validator Online — Validate XML well-formedness instantly"
      ),
      tool(
        "minifier",
        "XML Minifier",
        "Minify XML by stripping whitespace to reduce payload size. Paste readable text and this xml minifier returns a smaller version you can copy. Nothing is uploaded.",
        "live",
        ["xml minifier", "minify xml online", "compress xml"],
        "XML Minifier Online — Minify XML by stripping whitespace"
      ),
      tool(
        "to-json",
        "XML to JSON",
        "Convert XML documents into JSON, with attributes and repeated elements handled automatically. Paste the source and this xml to json converter shows the result next to it. The work stays in your browser and is not uploaded.",
        "live",
        ["xml to json converter", "convert xml to json"],
        "XML to JSON Online — Convert XML documents"
      ),
      tool(
        "to-csv",
        "XML to CSV",
        "Convert XML data with repeated elements into a downloadable CSV spreadsheet. Paste the source and this xml to csv converter shows the result next to it. The work stays in your browser and is not uploaded.",
        "live",
        ["xml to csv converter", "convert xml to csv"],
        "XML to CSV Online — Convert XML data with repeated elements"
      ),
      tool(
        "viewer",
        "XML Viewer",
        "View XML with syntax highlighting for tags, attributes, and comments. This xml viewer shows the result on the page as you work. Open it on any device. The result is calculated locally and is not stored.",
        "live",
        ["xml viewer", "xml syntax highlighter"],
        "XML Viewer Online — View XML with syntax highlighting"
      ),
      tool(
        "compare",
        "XML Compare",
        "Compare two XML documents and get a detailed, path-by-path list of differences. This xml compare shows the result on the page as you work. Free to use, with no account. Your input is handled on this page and is not sent to a server.",
        "live",
        ["xml compare", "compare xml files", "xml diff"],
        "XML Compare Online — Compare two XML documents and get a detailed"
      ),
      tool(
        "xpath-tester",
        "XPath Tester",
        "Test XPath expressions against an XML document and see matching nodes instantly. This xpath tester shows the result on the page as you work. No sign-up and no upload. You can use it with private data and it never leaves the page.",
        "live",
        ["xpath tester", "xpath evaluator online"],
        "XPath Tester Online — Test XPath expressions against an XML document"
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
        "Format and beautify YAML documents with consistent indentation. Paste messy text and this yaml formatter rewrites it so it is easy to read. Formatting happens in your browser and is not uploaded.",
        "live",
        ["yaml formatter", "format yaml online", "yaml beautifier"],
        "YAML Formatter Online — Format YAML in Browser"
      ),
      tool(
        "validator",
        "YAML Validator",
        "Validate YAML syntax instantly and get precise line and column error locations. Paste your input and this yaml validator shows whether it is valid, and where to fix it. Checking happens in your browser.",
        "live",
        ["yaml validator", "validate yaml online", "yaml syntax checker"],
        "YAML Validator Online — Validate YAML syntax instantly"
      ),
      tool(
        "to-json",
        "YAML to JSON",
        "Convert YAML documents into JSON instantly, right in your browser. Paste the source and this yaml to json converter shows the result next to it. The work stays in your browser and is not uploaded.",
        "live",
        ["yaml to json converter", "convert yaml to json"],
        "YAML to JSON Online — Convert YAML documents into JSON instantly"
      ),
      tool(
        "from-json",
        "JSON to YAML",
        "Convert JSON data into clean, properly indented YAML. Paste the source and this json to yaml converter shows the result next to it. The work stays in your browser and is not uploaded.",
        "live",
        ["json to yaml converter", "convert json to yaml"],
        "JSON to YAML Online — Convert JSON data"
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
        "View CSV files as a clean, sortable table right in your browser. This csv viewer online shows the result on the page as you work. Open it on any device. The result is calculated locally and is not stored.",
        "live",
        ["csv viewer online", "view csv file", "csv table viewer"],
        "CSV Viewer Online — View CSV files as a clean"
      ),
      tool(
        "formatter",
        "CSV Formatter",
        "Reformat messy CSV data with consistent delimiters, quoting, and trimmed whitespace. Paste messy text and this csv formatter rewrites it so it is easy to read. Formatting happens in your browser and is not uploaded.",
        "live",
        ["csv formatter", "format csv online", "clean csv delimiters"],
        "CSV Formatter Online — Reformat messy CSV data"
      ),
      tool(
        "to-json",
        "CSV to JSON",
        "Convert CSV data into a JSON array of objects instantly. Paste the source and this csv to json converter shows the result next to it. The work stays in your browser and is not uploaded.",
        "live",
        ["csv to json converter", "convert csv to json"],
        "CSV to JSON Converter Online — Free & Instant"
      ),
      tool(
        "to-xml",
        "CSV to XML",
        "Convert CSV rows into well-formed XML documents. Paste the source and this csv to xml converter shows the result next to it. The work stays in your browser and is not uploaded.",
        "live",
        ["csv to xml converter", "convert csv to xml"],
        "CSV to XML Online — Convert CSV rows into well-formed XML documents"
      ),
      tool(
        "to-excel",
        "CSV to Excel",
        "Convert CSV data into a downloadable Excel (.xlsx) workbook. Paste the source and this csv to excel converter shows the result next to it. The work stays in your browser and is not uploaded.",
        "live",
        ["csv to excel converter", "convert csv to xlsx"],
        "CSV to Excel Online — Convert CSV data into a downloadable Excel"
      ),
      tool(
        "cleaner",
        "CSV Cleaner",
        "Trim whitespace, and remove empty or duplicate rows from messy CSV data. This csv cleaner shows the result on the page as you work. Open it on any device. The result is calculated locally and is not stored.",
        "live",
        ["csv cleaner", "remove duplicate rows csv", "clean csv data"],
        "CSV Cleaner Online — Trim whitespace"
      ),
      tool(
        "diff",
        "CSV Diff",
        "Compare two CSV files row by row and highlight every difference. This csv diff shows the result on the page as you work. Free to use, with no account. Your input is handled on this page and is not sent to a server.",
        "live",
        ["csv diff", "compare csv files", "csv comparison tool"],
        "CSV Diff Online — Compare two CSV files row by row"
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
        "Format and beautify SQL queries with proper indentation across MySQL, PostgreSQL, SQL Server, and more. Paste messy text and this sql formatter online rewrites it so it is easy to read. Formatting happens in your browser and is not uploaded.",
        "live",
        ["sql formatter online", "format sql query", "beautify sql"],
        "SQL Formatter Online — Beautify SQL Queries"
      ),
      tool(
        "minifier",
        "SQL Minifier",
        "Minify SQL by stripping comments, line breaks, and extra whitespace. Paste readable text and this sql minifier returns a smaller version you can copy. Nothing is uploaded.",
        "live",
        ["sql minifier", "minify sql query", "compress sql"],
        "SQL Minifier Online — Minify SQL by stripping comments, line breaks"
      ),
      tool(
        "beautifier",
        "SQL Beautifier",
        "Beautify messy SQL into clean, readable, consistently indented queries. Paste messy text and this sql beautifier rewrites it so it is easy to read. Formatting happens in your browser and is not uploaded.",
        "live",
        ["sql beautifier", "sql pretty print"],
        "SQL Beautifier Online — Beautify messy SQL into clean, readable"
      ),
      tool(
        "validator",
        "SQL Validator",
        "Validate SQL syntax and catch parse errors before you run your query. Paste your input and this sql validator shows whether it is valid, and where to fix it. Checking happens in your browser.",
        "live",
        ["sql validator", "validate sql syntax", "sql syntax checker"],
        "SQL Validator Online — Validate SQL syntax and catch parse errors"
      ),
      tool(
        "query-builder",
        "SQL Query Builder",
        "Visually build SELECT queries with columns, WHERE conditions, sorting, and limits. This sql query builder shows the result on the page as you work. Open it on any device. The result is calculated locally and is not stored.",
        "live",
        ["sql query builder", "visual sql builder", "build select query"],
        "SQL Query Builder Online — Visually build SELECT queries"
      ),
      tool(
        "uppercase",
        "SQL Keywords Uppercase",
        "Convert all SQL keywords to UPPERCASE while preserving your original layout. This sql keywords uppercase shows the result on the page as you work. Open it on any device. The result is calculated locally and is not stored.",
        "live",
        ["sql keywords uppercase", "sql to uppercase"],
        "SQL Keywords Uppercase Online — Convert all SQL keywords"
      ),
      tool(
        "lowercase",
        "SQL Keywords Lowercase",
        "Convert all SQL keywords to lowercase while preserving your original layout. This sql keywords lowercase shows the result on the page as you work. Free to use, with no account. Your input is handled on this page and is not sent to a server.",
        "live",
        ["sql keywords lowercase", "sql to lowercase"],
        "SQL Keywords Lowercase Online — Convert all SQL keywords"
      ),
      tool(
        "to-json",
        "SQL to JSON",
        "Convert SQL INSERT statements into a clean JSON array of objects. Paste the source and this sql to json converter shows the result next to it. The work stays in your browser and is not uploaded.",
        "live",
        ["sql to json converter", "convert sql insert to json"],
        "SQL to JSON Online — Convert SQL INSERT statements into a clean JSON"
      ),
      tool(
        "from-json",
        "JSON to SQL",
        "Generate SQL INSERT statements from a JSON object or array. Paste the source and this json to sql converter shows the result next to it. The work stays in your browser and is not uploaded.",
        "live",
        ["json to sql converter", "generate insert statements from json"],
        "JSON to SQL Online — Generate SQL INSERT statements from a JSON"
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
        "Encode any text (including Unicode and emoji) into Base64. Paste the source and this base64 encode online shows the result next to it. The work stays in your browser and is not uploaded.",
        "live",
        ["base64 encode online", "encode text to base64", "base64 encoder"],
        "Base64 Encode Online — Free Text to Base64"
      ),
      tool(
        "base64-decode",
        "Base64 Decode",
        "Decode Base64 back into readable UTF-8 text. Paste the source and this base64 decode online shows the result next to it. The work stays in your browser and is not uploaded.",
        "live",
        ["base64 decode online", "decode base64 to text", "base64 decoder"],
        "Base64 Decode Online — Decode in Your Browser"
      ),
      tool(
        "url-encode",
        "URL Encode",
        "Percent-encode text or full URLs for safe use in query strings and links. Paste the source and this url encode online shows the result next to it. The work stays in your browser and is not uploaded.",
        "live",
        ["url encode online", "percent encode text", "uri encode"],
        "URL Encode Online — Percent Encode Text Free"
      ),
      tool(
        "url-decode",
        "URL Decode",
        "Decode percent-encoded (%XX) URL strings back into plain text. Paste the source and this url decode online shows the result next to it. The work stays in your browser and is not uploaded.",
        "live",
        ["url decode online", "percent decode", "uri decode"],
        "URL Decode Online — Percent Decode URLs Free"
      ),
      tool(
        "jwt-decoder",
        "JWT Decoder",
        "Decode and inspect JSON Web Tokens, with optional HMAC signature verification. Paste the source and this jwt decoder online shows the result next to it. The work stays in your browser and is not uploaded.",
        "live",
        ["jwt decoder online", "decode jwt token", "jwt.io alternative"],
        "JWT Decoder Online — Decode Token in Browser"
      ),
      tool(
        "jwt-generator",
        "JWT Generator",
        "Generate signed JSON Web Tokens with custom claims, expiry, and HMAC secret. Use this jwt generator online to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["jwt generator online", "create jwt token", "sign jwt hmac"],
        "JWT Generator Online — Generate signed JSON Web Tokens"
      ),
      tool(
        "md5",
        "MD5 Generator",
        "Generate MD5 hashes from text, computed entirely in your browser. Use this md5 hash generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["md5 hash generator", "md5 online", "generate md5 checksum"],
        "MD5 Hash Generator Online — Checksum in Browser"
      ),
      tool(
        "sha1",
        "SHA1 Generator",
        "Generate SHA-1 hashes from text using the Web Crypto API. Use this sha1 hash generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["sha1 hash generator", "sha1 online", "generate sha1 checksum"],
        "SHA1 Generator Online — Generate SHA-1 hashes from text using"
      ),
      tool(
        "sha256",
        "SHA256 Generator",
        "Generate SHA-256 hashes from text using the Web Crypto API. Use this sha256 hash generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["sha256 hash generator", "sha256 online", "generate sha256 checksum"],
        "SHA256 Hash Generator Online — Free Checksum"
      ),
      tool(
        "sha512",
        "SHA512 Generator",
        "Generate SHA-512 hashes from text using the Web Crypto API. Use this sha512 hash generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["sha512 hash generator", "sha512 online", "generate sha512 checksum"],
        "SHA512 Generator Online — Generate SHA-512 hashes from text using"
      ),
      tool(
        "hmac",
        "HMAC Generator",
        "Generate HMAC-SHA1/256/384/512 signatures from a message and secret key. Use this hmac generator online to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["hmac generator online", "hmac sha256 online", "generate hmac signature"],
        "HMAC Generator Online — Generate HMAC-SHA1/256/384/512 signatures"
      ),
      tool(
        "bcrypt",
        "Bcrypt Generator",
        "Hash passwords using bcrypt with adjustable salt rounds, and verify existing hashes. Use this bcrypt generator online to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["bcrypt generator online", "bcrypt hash password", "bcrypt online"],
        "Bcrypt Generator Online — Hash passwords using bcrypt"
      ),
      tool(
        "password-generator",
        "Password Generator",
        "Generate strong, cryptographically random passwords with customizable rules. Use this password generator online to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["password generator online", "random password generator", "strong password generator"],
        "Strong Password Generator Online — Free & Random"
      ),
      tool(
        "password-strength",
        "Password Strength Checker",
        "Check how strong a password is, with entropy estimate and crack-time analysis. Use this password strength checker to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["password strength checker", "check password strength online", "password entropy calculator"],
        "Password Strength Checker Online — Check how strong a password is"
      ),
      tool(
        "random-token",
        "Random Token Generator",
        "Generate cryptographically secure random tokens in hex, Base64, or alphanumeric format. Use this random token generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["random token generator", "secure token generator", "api key generator"],
        "Random Token Generator Online — Generate cryptographically secure"
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
        "Generate time-based UUID v1 identifiers with a random node ID. Use this uuid v1 generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["uuid v1 generator", "generate uuid v1 online", "time-based uuid"],
        "UUID v1 Online — Generate time-based UUID v1 identifiers"
      ),
      tool(
        "uuid-v4",
        "UUID v4",
        "Generate random, cryptographically secure UUID v4 identifiers. Use this uuid v4 generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["uuid v4 generator", "generate uuid online", "random uuid generator"],
        "UUID Generator Online — Free UUID v4"
      ),
      tool(
        "uuid-v7",
        "UUID v7",
        "Generate sortable, time-ordered UUID v7 identifiers (RFC 9562). Use this uuid v7 generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["uuid v7 generator", "time ordered uuid", "sortable uuid"],
        "UUID v7 Online — Generate sortable"
      ),
      tool(
        "guid",
        "GUID Generator",
        "Generate GUIDs with optional uppercase, braces, and hyphen formatting. Use this guid generator online to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["guid generator online", "generate guid", "microsoft guid format"],
        "GUID Generator Online — Generate GUIDs with optional uppercase"
      ),
      tool(
        "nano-id",
        "Nano ID",
        "Generate compact, URL-safe Nano IDs with a custom length or alphabet. This nanoid generator shows the result on the page as you work. It runs in your browser, so what you paste stays on your device and is not uploaded.",
        "live",
        ["nanoid generator", "url safe unique id", "short unique id generator"],
        "Nano ID Online — Generate compact"
      ),
      tool(
        "random-string",
        "Random String",
        "Generate cryptographically random strings with a custom length and character set. Use this random string generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["random string generator", "generate random string online"],
        "Random String Online — Generate cryptographically random strings"
      ),
      tool(
        "random-number",
        "Random Number",
        "Generate random numbers within a range, with an optional no-duplicates mode. Use this random number generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["random number generator", "generate random number online"],
        "Random Number Online — Generate random numbers within a range"
      ),
      tool(
        "random-password",
        "Random Password",
        "Generate strong, random, cryptographically secure passwords. Use this random password generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["random password generator", "generate secure password online"],
        "Random Password Online — Generate strong, random"
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
        "Format and indent HTML markup. Paste messy text and this html formatter rewrites it so it is easy to read. Formatting happens in your browser and is not uploaded.",
        "live",
        ["html formatter", "format html online", "html beautifier", "indent html"],
        "HTML Formatter Online — Beautify HTML Code"
      ),
      tool(
        "minifier",
        "HTML Minifier",
        "Minify HTML by removing whitespace and comments. Paste readable text and this html minifier returns a smaller version you can copy. Nothing is uploaded.",
        "live",
        ["html minifier", "minify html online", "compress html"],
        "HTML Minifier Online — Minify HTML by removing whitespace"
      ),
      tool(
        "encoder",
        "HTML Encoder",
        "Encode text into HTML entities. Paste the source and this html encoder shows the result next to it. The work stays in your browser and is not uploaded.",
        "live",
        ["html encoder", "html entity encoder", "encode html characters"],
        "HTML Encoder Online — Encode text into HTML entities"
      ),
      tool(
        "decoder",
        "HTML Decoder",
        "Decode HTML entities back into text. Paste the source and this html decoder shows the result next to it. The work stays in your browser and is not uploaded.",
        "live",
        ["html decoder", "html entity decoder", "decode html entities"],
        "HTML Decoder Online — Decode HTML entities back"
      ),
      tool(
        "preview",
        "HTML Preview",
        "Live-preview rendered HTML. This html preview shows the result on the page as you work. It runs in your browser, so what you paste stays on your device and is not uploaded.",
        "live",
        ["html preview", "html viewer online", "live html editor"],
        "HTML Preview Online — Live-preview rendered HTML"
      ),
      tool(
        "escape",
        "HTML Escape",
        "Escape HTML special characters. Paste the source and this html escape shows the result next to it. The work stays in your browser and is not uploaded.",
        "live",
        ["html escape", "escape html characters", "html special characters escape"],
        "HTML Escape Online — Escape HTML special characters"
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
        "Format and beautify CSS. Paste messy text and this css formatter rewrites it so it is easy to read. Formatting happens in your browser and is not uploaded.",
        "live",
        ["css formatter", "format css online", "css beautifier", "indent css"],
        "CSS Formatter Online — Format and beautify CSS"
      ),
      tool(
        "minifier",
        "CSS Minifier",
        "Minify CSS to reduce file size. Paste readable text and this css minifier returns a smaller version you can copy. Nothing is uploaded.",
        "live",
        ["css minifier", "minify css online", "compress css"],
        "CSS Minifier Online — Minify CSS to reduce file size"
      ),
      tool(
        "beautifier",
        "CSS Beautifier",
        "Beautify CSS with consistent style. Paste messy text and this css beautifier rewrites it so it is easy to read. Formatting happens in your browser and is not uploaded.",
        "live",
        ["css beautifier", "beautify css online", "pretty css"],
        "CSS Beautifier Online — Beautify CSS with consistent style"
      ),
      tool(
        "grid-generator",
        "CSS Grid Generator",
        "Visually design CSS Grid layouts. Use this css grid generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["css grid generator", "css grid layout generator", "grid-template-columns generator"],
        "CSS Grid Generator Online — Visually design CSS Grid layouts"
      ),
      tool(
        "flexbox-generator",
        "Flexbox Generator",
        "Visually design Flexbox layouts. Use this flexbox generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["flexbox generator", "css flexbox playground", "flex layout generator"],
        "Flexbox Generator Online — Visually design Flexbox layouts"
      ),
      tool(
        "border-radius-generator",
        "Border Radius Generator",
        "Design custom border-radius shapes. Use this border radius generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["border radius generator", "css border radius tool", "rounded corners generator"],
        "Border Radius Generator Online — Design custom border-radius shapes"
      ),
      tool(
        "box-shadow-generator",
        "Box Shadow Generator",
        "Design CSS box shadows visually. Use this box shadow generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["box shadow generator", "css box shadow tool", "box-shadow css generator"],
        "Box Shadow Generator Online — Design CSS box shadows visually"
      ),
      tool(
        "text-shadow-generator",
        "Text Shadow Generator",
        "Design CSS text shadows visually. Use this text shadow generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["text shadow generator", "css text shadow tool", "text-shadow css generator"],
        "Text Shadow Generator Online — Design CSS text shadows visually"
      ),
      tool(
        "gradient-generator",
        "CSS Gradient Generator",
        "Design linear and radial CSS gradients. Use this css gradient generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["css gradient generator", "linear gradient generator", "radial gradient generator"],
        "CSS Gradient Generator Online — Design linear and radial CSS"
      ),
      tool(
        "clip-path-generator",
        "CSS Clip Path Generator",
        "Design custom CSS clip-path shapes. Use this css clip path generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["css clip path generator", "clip-path generator", "css shape generator"],
        "CSS Clip Path Generator Online — Design custom CSS clip-path shapes"
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
        "Format and beautify JavaScript code. Paste messy text and this javascript formatter rewrites it so it is easy to read. Formatting happens in your browser and is not uploaded.",
        "live",
        ["javascript formatter", "format js online", "js beautifier", "prettier online"],
        "JS Formatter Online — Format and beautify JavaScript code"
      ),
      tool(
        "minifier",
        "JS Minifier",
        "Minify JavaScript to reduce file size. Paste readable text and this javascript minifier returns a smaller version you can copy. Nothing is uploaded.",
        "live",
        ["javascript minifier", "minify js online", "compress javascript"],
        "JS Minifier Online — Minify JavaScript to reduce file size"
      ),
      tool(
        "beautifier",
        "JS Beautifier",
        "Beautify minified JavaScript. Paste messy text and this js beautifier rewrites it so it is easy to read. Formatting happens in your browser and is not uploaded.",
        "live",
        ["js beautifier", "beautify javascript online", "unminify javascript"],
        "JS Beautifier Online — Beautify minified JavaScript"
      ),
      tool(
        "obfuscator",
        "JS Obfuscator",
        "Obfuscate JavaScript source code. This javascript obfuscator shows the result on the page as you work. It runs in your browser, so what you paste stays on your device and is not uploaded.",
        "live",
        ["javascript obfuscator", "obfuscate js online", "js code protection"],
        "JS Obfuscator Online — Obfuscate JavaScript source code"
      ),
      tool(
        "deobfuscator",
        "JS Deobfuscator",
        "Deobfuscate and clean up JavaScript. This javascript deobfuscator shows the result on the page as you work. Free to use, with no account. Your input is handled on this page and is not sent to a server.",
        "live",
        ["javascript deobfuscator", "deobfuscate js online", "unpack minified js"],
        "JS Deobfuscator Online — Deobfuscate and clean up JavaScript"
      ),
      tool(
        "playground",
        "JS Playground",
        "Run and test JavaScript in the browser. This javascript playground shows the result on the page as you work. No sign-up and no upload. You can use it with private data and it never leaves the page.",
        "live",
        ["javascript playground", "run js online", "js code editor online"],
        "JS Playground Online — Run and test JavaScript in the browser"
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
        "Format and beautify TypeScript code. Paste messy text and this typescript formatter rewrites it so it is easy to read. Formatting happens in your browser and is not uploaded.",
        "live",
        ["typescript formatter", "format ts online", "ts beautifier"],
        "TS Formatter Online — Format and beautify TypeScript code"
      ),
      tool(
        "playground",
        "TS Playground",
        "Run and test TypeScript in the browser. This typescript playground shows the result on the page as you work. No sign-up and no upload. You can use it with private data and it never leaves the page.",
        "live",
        ["typescript playground", "run ts online", "typescript online compiler"],
        "TS Playground Online — Run and test TypeScript in the browser"
      ),
      tool(
        "to-js",
        "TS to JS",
        "Transpile TypeScript into JavaScript. Paste the source and this typescript to javascript shows the result next to it. The work stays in your browser and is not uploaded.",
        "live",
        ["typescript to javascript", "ts to js converter", "transpile typescript online"],
        "TS to JS Online — Transpile TypeScript"
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
        "Format and beautify Java code. Paste messy text and this java formatter rewrites it so it is easy to read. Formatting happens in your browser and is not uploaded.",
        "live",
        ["java formatter", "format java online", "java code indenter"],
        "Java Formatter Online — Format and beautify Java code"
      ),
      tool("playground", "Java Playground", "Run and test Java code in the browser."),
      tool(
        "escape-unescape",
        "Java Escape/Unescape",
        "Escape or unescape Java strings. Paste the source and this java string escape shows the result next to it. The work stays in your browser and is not uploaded.",
        "live",
        ["java string escape", "escape java string online", "unescape java string"],
        "Java Escape/Unescape Online — Escape or unescape Java strings"
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
        "Format and beautify Python code. Paste messy text and this python formatter rewrites it so it is easy to read. Formatting happens in your browser and is not uploaded.",
        "live",
        ["python formatter", "format python online", "python code indenter"],
        "Python Formatter Online — Format and beautify Python code"
      ),
      tool(
        "minifier",
        "Python Minifier",
        "Minify Python source code. Paste readable text and this python minifier returns a smaller version you can copy. Nothing is uploaded.",
        "live",
        ["python minifier", "minify python online", "compress python code"],
        "Python Minifier Online — Minify Python source code"
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
        "Format and beautify PHP code. Paste messy text and this php formatter rewrites it so it is easy to read. Formatting happens in your browser and is not uploaded.",
        "live",
        ["php formatter", "format php online", "php code indenter"],
        "PHP Formatter Online — Format and beautify PHP code"
      ),
      tool(
        "beautifier",
        "PHP Beautifier",
        "Beautify PHP with consistent style. Paste messy text and this php beautifier rewrites it so it is easy to read. Formatting happens in your browser and is not uploaded.",
        "live",
        ["php beautifier", "beautify php online"],
        "PHP Beautifier Online — Beautify PHP with consistent style"
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
        "Format and beautify Rust code. Paste messy text and this rust formatter rewrites it so it is easy to read. Formatting happens in your browser and is not uploaded.",
        "live",
        ["rust formatter", "format rust online", "rust code indenter"],
        "Rust Formatter Online — Format and beautify Rust code"
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
        "Format and beautify Go code. Paste messy text and this go formatter rewrites it so it is easy to read. Formatting happens in your browser and is not uploaded.",
        "live",
        ["go formatter", "golang formatter online", "format go code"],
        "Go Formatter Online — Format and beautify Go code"
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
        "Live-preview rendered Markdown. This markdown preview shows the result on the page as you work. It runs in your browser, so what you paste stays on your device and is not uploaded.",
        "live",
        ["markdown preview", "markdown viewer online", "live markdown editor"],
        "Markdown Preview Online — Live-preview rendered Markdown"
      ),
      tool(
        "to-html",
        "Markdown to HTML",
        "Convert Markdown into HTML. Paste the source and this markdown to html shows the result next to it. The work stays in your browser and is not uploaded.",
        "live",
        ["markdown to html", "convert markdown to html", "md to html converter"],
        "Markdown to HTML Online — Convert Markdown"
      ),
      tool(
        "from-html",
        "HTML to Markdown",
        "Convert HTML into Markdown. Paste the source and this html to markdown shows the result next to it. The work stays in your browser and is not uploaded.",
        "live",
        ["html to markdown", "convert html to markdown", "html to md converter"],
        "HTML to Markdown Online — Convert HTML"
      ),
      tool(
        "formatter",
        "Markdown Formatter",
        "Format and clean up Markdown. Paste messy text and this markdown formatter rewrites it so it is easy to read. Formatting happens in your browser and is not uploaded.",
        "live",
        ["markdown formatter", "format markdown online", "clean up markdown"],
        "Markdown Formatter Online — Format and clean up Markdown"
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
        "Validate email address syntax and catch common typos in domain names. Paste your input and this email validator shows whether it is valid, and where to fix it. Checking happens in your browser.",
        "live",
        ["email validator", "validate email address", "check email syntax", "email format checker"],
        "Email Validator Online — Validate email address syntax"
      ),
      tool(
        "header-analyzer",
        "Email Header Analyzer",
        "Analyze raw email headers to trace delivery hops and check SPF/DKIM/DMARC results. This email header analyzer shows the result on the page as you work. Open it on any device. The result is calculated locally and is not stored.",
        "live",
        ["email header analyzer", "analyze email headers", "spf dkim dmarc checker", "email trace"],
        "Email Header Analyzer Online — Analyze raw email headers"
      ),
      tool(
        "signature-generator",
        "Email Signature Generator",
        "Design a professional HTML email signature with live preview. Use this email signature generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["email signature generator", "html email signature", "create email signature", "signature maker"],
        "Email Signature Generator Online — Design a professional HTML email"
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
        "Inspect HTTP response headers for any URL, including redirects and security headers. This http header viewer checks public records through our server. The answer is shown on the page and is not saved.",
        "live",
        ["http header viewer", "check response headers", "http headers checker", "view website headers"],
        "HTTP Header Viewer Online — Inspect HTTP response headers"
      ),
      tool(
        "user-agent-parser",
        "User Agent Parser",
        "Parse a User-Agent string into browser, engine, OS, and device info. This user agent parser shows the result on the page as you work. Free to use, with no account. Your input is handled on this page and is not sent to a server.",
        "live",
        ["user agent parser", "ua string parser", "browser detector", "parse user agent online"],
        "User Agent Parser Online — Parse a User-Agent string"
      ),
      tool(
        "ip-lookup",
        "IP Lookup",
        "Look up geolocation, ISP, and organization info for any public IP address. This ip lookup checks public records through our server. The answer is shown on the page and is not saved.",
        "live",
        ["ip lookup", "ip geolocation", "find ip location", "what is this ip address"],
        "IP Lookup Online — Look up geolocation, ISP"
      ),
      tool(
        "cidr-calculator",
        "CIDR Calculator",
        "Calculate network, broadcast, and usable host ranges from a CIDR block. Type your numbers into this cidr calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["cidr calculator", "cidr to ip range", "network address calculator", "cidr notation calculator"],
        "CIDR Calculator Online — Calculate network, broadcast"
      ),
      tool(
        "subnet-calculator",
        "Subnet Calculator",
        "Calculate subnet masks, host ranges, and split a network into equal subnets. Type your numbers into this subnet calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["subnet calculator", "ip subnet calculator", "subnet mask calculator", "vlsm calculator"],
        "Subnet Calculator Online — Calculate subnet masks, host ranges"
      ),
      tool(
        "port-lookup",
        "Port Lookup",
        "Look up the standard service and protocol for any well-known network port. This port lookup shows the result on the page as you work. Open it on any device. The result is calculated locally and is not stored.",
        "live",
        ["port lookup", "port number lookup", "well known ports list", "what service uses this port"],
        "Port Lookup Online — Look up the standard service and protocol"
      ),
      tool(
        "dns-lookup",
        "DNS Lookup",
        "Query A, AAAA, MX, TXT, NS, CNAME, SOA, and CAA records for any domain. This dns lookup checks public records through our server. The answer is shown on the page and is not saved.",
        "live",
        ["dns lookup", "dns record checker", "mx record lookup", "check dns records online"],
        "DNS Lookup Online — Query A, AAAA, MX, TXT, NS, CNAME, SOA"
      ),
      tool(
        "whois-lookup",
        "WHOIS Lookup",
        "Look up domain registration, registrar, and name server info. This whois lookup checks public records through our server. The answer is shown on the page and is not saved.",
        "live",
        ["whois lookup", "domain whois checker", "who owns this domain", "domain registration lookup"],
        "WHOIS Lookup Online — Look up domain registration, registrar"
      ),
      tool("ping-tool", "Ping Tool", "Check host reachability and latency."),
      tool("traceroute", "Traceroute", "Trace the network path to a host."),
      tool(
        "random-ip",
        "Random IP Generator",
        "Generate random IPv4 or IPv6 addresses for test data, demos, and documentation. Use this random ip generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["random ip generator", "generate random ip address", "fake ip generator", "random ipv4 generator"],
        "Random IP Generator Online — Generate random IPv4 or IPv6 addresses"
      ),
      tool(
        "random-mac-address",
        "Random MAC Address Generator",
        "Generate random MAC addresses with the locally-administered bit set, safe for test and demo use. Use this random mac address generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["random mac address generator", "generate random mac address", "fake mac address generator", "mac address generator online"],
        "Random MAC Address Generator Online — Generate random MAC addresses"
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
        "Pick a color visually or from your screen and get its HEX, RGB, HSL, HSV, and CMYK codes instantly. Use this color picker online to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["color picker online", "html color picker", "eyedropper tool online", "pick color from screen"],
        "Color Picker Online — HEX RGB HSL Codes"
      ),
      tool(
        "hex-rgb",
        "HEX to RGB Converter",
        "Convert colors between HEX and RGB formats instantly, both ways. Paste the source and this hex to rgb shows the result next to it. The work stays in your browser and is not uploaded.",
        "live",
        ["hex to rgb", "rgb to hex", "hex to rgb converter", "convert hex color to rgb"],
        "HEX to RGB Converter Online — Convert colors between HEX"
      ),
      tool(
        "rgb-hsl",
        "RGB to HSL Converter",
        "Convert colors between RGB and HSL formats instantly, both ways. Paste the source and this rgb to hsl shows the result next to it. The work stays in your browser and is not uploaded.",
        "live",
        ["rgb to hsl", "hsl to rgb", "rgb to hsl converter", "convert rgb color to hsl"],
        "RGB to HSL Converter Online — Convert colors between RGB"
      ),
      tool(
        "rgb-cmyk",
        "RGB to CMYK Converter",
        "Convert colors between RGB and CMYK formats for screen and print design. Paste the source and this rgb to cmyk shows the result next to it. The work stays in your browser and is not uploaded.",
        "live",
        ["rgb to cmyk", "cmyk to rgb", "rgb to cmyk converter", "convert rgb to cmyk for print"],
        "RGB to CMYK Converter Online — Convert colors between RGB"
      ),
      tool(
        "hex-cmyk",
        "HEX to CMYK Converter",
        "Convert colors between HEX and CMYK formats for screen and print design. Paste the source and this hex to cmyk shows the result next to it. The work stays in your browser and is not uploaded.",
        "live",
        ["hex to cmyk", "cmyk to hex", "hex to cmyk converter", "convert hex color to cmyk"],
        "HEX to CMYK Converter Online — Convert colors between HEX"
      ),
      tool(
        "hex-hsv",
        "HEX to HSV Converter",
        "Convert colors between HEX and HSV (HSB) formats instantly, both ways. Paste the source and this hex to hsv shows the result next to it. The work stays in your browser and is not uploaded.",
        "live",
        ["hex to hsv", "hsv to hex", "hex to hsb converter", "convert hex color to hsv"],
        "HEX to HSV Converter Online — Convert colors between HEX"
      ),
      tool(
        "gradient-generator",
        "Gradient Generator",
        "Design custom linear and radial CSS gradients with live preview and multi-color stops. Use this css gradient generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["css gradient generator", "linear gradient generator", "radial gradient generator", "gradient maker online"],
        "Gradient Generator Online — Design custom linear and radial CSS"
      ),
      tool(
        "palette-generator",
        "Palette Generator",
        "Generate complementary, analogous, triadic, and monochromatic color palettes from any base color. Use this color palette generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["color palette generator", "color scheme generator", "generate color palette from color", "complementary color generator"],
        "Palette Generator Online — Generate complementary, analogous"
      ),
      tool(
        "contrast-checker",
        "Contrast Checker",
        "Check the WCAG contrast ratio between two colors and see if it passes AA or AAA accessibility standards. Paste your input and this color contrast checker shows whether it is valid, and where to fix it. Checking happens in your browser.",
        "live",
        ["color contrast checker", "wcag contrast checker", "contrast ratio calculator", "accessibility color checker"],
        "Contrast Checker Online — Check the WCAG contrast ratio between two"
      ),
      tool(
        "color-blindness-simulator",
        "Color Blindness Simulator",
        "Preview colors and images as seen with protanopia, deuteranopia, tritanopia, or achromatopsia. This color blindness simulator shows the result on the page as you work. Free to use, with no account. Your input is handled on this page and is not sent to a server.",
        "live",
        ["color blindness simulator", "color vision deficiency simulator", "colorblind test image", "protanopia deuteranopia simulator"],
        "Color Blindness Simulator Online — Preview colors and images as seen"
      ),
      tool(
        "random-color",
        "Random Color Generator",
        "Generate random HEX colors instantly, with the matching RGB value, one click to copy. Use this random color generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["random color generator", "random hex color generator", "generate random color", "random color picker"],
        "Random Color Generator Online — Generate random HEX colors instantly"
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
        "Generate a QR code from any text, URL, or content with adjustable error correction and instant PNG download. Use this qr code generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["qr code generator", "generate qr code online", "url to qr code", "free qr code generator"],
        "Free QR Code Generator — URL to QR Online"
      ),
      tool(
        "qr-scanner",
        "QR Scanner",
        "Scan and decode QR codes from an uploaded image directly in your browser \u2014 no app or camera required. This qr code scanner online shows the result on the page as you work. Open it on any device. The result is calculated locally and is not stored.",
        "live",
        ["qr code scanner online", "decode qr code from image", "read qr code online", "qr code reader"],
        "QR Scanner Online — Scan and decode QR codes from an uploaded image"
      ),
      tool(
        "wifi-qr",
        "Wi-Fi QR Generator",
        "Generate a QR code that lets phones join a Wi-Fi network instantly by scanning, without typing the password. Use this wifi qr code generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["wifi qr code generator", "wifi password qr code", "create wifi qr code", "share wifi with qr code"],
        "Wi-Fi QR Generator Online — Generate a QR code that lets phones join"
      ),
      tool(
        "vcard-qr",
        "vCard QR Generator",
        "Generate a QR code containing vCard contact info that phones can scan to save directly to contacts. Use this vcard qr code generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["vcard qr code generator", "contact qr code", "business card qr code", "digital business card qr"],
        "vCard QR Generator Online — Generate a QR code containing vCard"
      ),
      tool(
        "barcode-generator",
        "Barcode Generator",
        "Generate Code 128, EAN-13, EAN-8, UPC-A, ITF-14, Codabar, and other common 1D barcode formats online. Use this barcode generator online to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["barcode generator online", "generate barcode", "code 128 generator", "ean-13 barcode generator"],
        "Barcode Generator Online — Generate Code 128, EAN-13, EAN-8, UPC-A"
      ),
      tool(
        "barcode-reader",
        "Barcode Reader",
        "Decode Code 128, EAN, UPC, and other barcode formats from an uploaded image directly in your browser. This barcode reader online shows the result on the page as you work. It runs in your browser, so what you paste stays on your device and is not uploaded.",
        "live",
        ["barcode reader online", "decode barcode from image", "read barcode online", "barcode scanner online"],
        "Barcode Reader Online — Decode Code 128, EAN, UPC"
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
        "Convert between Unix timestamps and human-readable dates, in seconds or milliseconds, with a live current timestamp. This unix timestamp converter shows the result on the page as you work. Free to use, with no account. Your input is handled on this page and is not sent to a server.",
        "live",
        ["unix timestamp converter", "epoch converter", "timestamp to date", "current unix timestamp"],
        "Unix Timestamp Converter — Epoch to Date Online"
      ),
      tool(
        "date-difference",
        "Date Difference",
        "Calculate the exact difference between two dates in years, months, days, hours, and total days or weeks. This date difference calculator shows the result on the page as you work. It runs in your browser, so what you paste stays on your device and is not uploaded.",
        "live",
        ["date difference calculator", "days between dates", "date calculator", "calculate difference between two dates"],
        "Date Difference Online — Calculate the exact difference between two"
      ),
      tool(
        "age-calculator",
        "Age Calculator",
        "Calculate your exact age in years, months, and days from your birth date, plus days until your next birthday. Type your numbers into this age calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["age calculator", "calculate age from date of birth", "how old am i", "birthday countdown calculator"],
        "Age Calculator Online — Calculate your exact age in years, months"
      ),
      tool(
        "timezone-converter",
        "Time Zone Converter",
        "Convert a date and time between any IANA time zones and compare across multiple cities at once. Paste the source and this time zone converter shows the result next to it. The work stays in your browser and is not uploaded.",
        "live",
        ["time zone converter", "convert time zones online", "world clock converter", "utc to local time converter"],
        "Time Zone Converter Online — Convert a date and time between"
      ),
      tool(
        "cron-generator",
        "Cron Generator",
        "Visually build cron expressions with presets, a plain-English description, and the next 5 run times. Use this cron expression generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["cron expression generator", "cron job generator", "build cron expression", "crontab generator"],
        "Cron Expression Generator Online — Crontab Builder"
      ),
      tool(
        "cron-parser",
        "Cron Parser",
        "Parse any cron expression into a plain-English description and see its next 5 scheduled run times. This cron expression parser shows the result on the page as you work. Open it on any device. The result is calculated locally and is not stored.",
        "live",
        ["cron expression parser", "explain cron expression", "crontab parser", "what does this cron expression mean"],
        "Cron Parser Online — Parse any cron expression into a plain-English"
      ),
      tool(
        "leap-year-checker",
        "Leap Year Checker",
        "Check whether any year is a leap year with a clear explanation, plus list all leap years in a range. Paste your input and this leap year checker shows whether it is valid, and where to fix it. Checking happens in your browser.",
        "live",
        ["leap year checker", "is this a leap year", "leap year calculator", "list of leap years"],
        "Leap Year Checker Online — Check whether any year is a leap year"
      ),
      tool(
        "random-date",
        "Random Date Generator",
        "Generate a random date within any year range, useful for test data and scheduling mockups. Use this random date generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["random date generator", "generate random date", "random date picker", "random date between two years"],
        "Random Date Generator Online — Generate a random date within"
      ),
      tool(
        "random-time",
        "Random Time Generator",
        "Generate a random time of day in 24-hour or 12-hour AM/PM format. Use this random time generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["random time generator", "generate random time", "random clock time generator", "random time of day"],
        "Random Time Generator Online — Generate a random time of day"
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
        "Count words, characters, sentences, and paragraphs in any text, with estimated reading and speaking time. This word counter online shows the result on the page as you work. Free to use, with no account. Your input is handled on this page and is not sent to a server.",
        "live",
        ["word counter online", "count words in text", "word count tool", "reading time calculator"],
        "Word Counter Online — Count Words & Characters"
      ),
      tool(
        "character-counter",
        "Character Counter",
        "Count characters in your text with a live limit tracker and a full breakdown of letters, digits, and spaces. This character counter online shows the result on the page as you work. It runs in your browser, so what you paste stays on your device and is not uploaded.",
        "live",
        ["character counter online", "count characters in text", "character count tool", "letter counter"],
        "Character Counter Online — Count characters in your text with a live"
      ),
      tool(
        "line-counter",
        "Line Counter",
        "Count total, empty, and non-empty lines in a block of text, plus find the longest line and average line length. This line counter online shows the result on the page as you work. No sign-up and no upload. You can use it with private data and it never leaves the page.",
        "live",
        ["line counter online", "count lines in text", "count lines of text", "line count tool"],
        "Line Counter Online — Count total, empty"
      ),
      tool(
        "duplicate-line-remover",
        "Duplicate Line Remover",
        "Remove duplicate lines from any list or text block, with case-sensitivity and whitespace-trimming options. This remove duplicate lines shows the result on the page as you work. No sign-up and no upload. You can use it with private data and it never leaves the page.",
        "live",
        ["remove duplicate lines", "duplicate line remover online", "delete duplicate lines", "unique lines tool"],
        "Duplicate Line Remover Online — Remove duplicate lines from any list"
      ),
      tool(
        "diff",
        "Text Diff",
        "Compare two blocks of text side by side and highlight added, removed, and unchanged lines instantly. This text diff tool shows the result on the page as you work. Free to use, with no account. Your input is handled on this page and is not sent to a server.",
        "live",
        ["text diff tool", "compare two texts online", "text comparison tool", "diff checker online"],
        "Text Diff Online — Compare two blocks of text side by side"
      ),
      tool(
        "case-converter",
        "Case Converter",
        "Convert text between UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case, and more. Paste the source and this case converter online shows the result next to it. The work stays in your browser and is not uploaded.",
        "live",
        ["case converter online", "text case converter", "camel case converter", "convert to title case"],
        "Case Converter Online — Convert text between UPPERCASE, lowercase"
      ),
      tool(
        "reverse-text",
        "Reverse Text",
        "Reverse the characters, word order, or line order of any text instantly. This reverse text online shows the result on the page as you work. It runs in your browser, so what you paste stays on your device and is not uploaded.",
        "live",
        ["reverse text online", "reverse text generator", "flip text online", "backwards text generator"],
        "Reverse Text Online — Reverse the characters, word order"
      ),
      tool(
        "slug-generator",
        "Slug Generator",
        "Convert any title or text into a clean, URL-friendly slug with hyphens or underscores. Use this slug generator online to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["slug generator online", "url slug generator", "text to slug", "generate url friendly slug"],
        "Slug Generator Online — Convert any title or text into a clean"
      ),
      tool(
        "lorem-ipsum",
        "Lorem Ipsum",
        "Generate placeholder Lorem Ipsum text by words, sentences, or paragraphs for mockups and designs. This lorem ipsum generator shows the result on the page as you work. Open it on any device. The result is calculated locally and is not stored.",
        "live",
        ["lorem ipsum generator", "generate placeholder text", "dummy text generator", "lorem ipsum text"],
        "Lorem Ipsum Online — Generate placeholder Lorem Ipsum text"
      ),
      tool(
        "remove-extra-spaces",
        "Remove Extra Spaces",
        "Remove extra spaces, tabs, and blank lines from text, collapsing whitespace into clean, readable content. This remove extra spaces online shows the result on the page as you work. No sign-up and no upload. You can use it with private data and it never leaves the page.",
        "live",
        ["remove extra spaces online", "remove whitespace from text", "clean up text spacing", "trim extra spaces"],
        "Remove Extra Spaces Online — Remove extra spaces, tabs"
      ),
      tool(
        "text-sorter",
        "Text Sorter",
        "Sort lines of text alphabetically, numerically, or by length, with options to remove duplicates and blanks. This sort lines of text shows the result on the page as you work. No sign-up and no upload. You can use it with private data and it never leaves the page.",
        "live",
        ["sort lines of text", "text sorter online", "alphabetize list online", "sort list alphabetically"],
        "Text Sorter Online — Sort lines of text alphabetically, numerically"
      ),
      tool(
        "random-word",
        "Random Word Generator",
        "Generate random English words instantly \u2014 useful for word games, brainstorming, and test data. Use this random word generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["random word generator", "generate random word", "random word picker", "word generator online"],
        "Random Word Generator Online — Generate random English words"
      ),
      tool(
        "random-letter",
        "Random Letter Generator",
        "Generate a random letter from A to Z, in uppercase, lowercase, or mixed case. Use this random letter generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["random letter generator", "generate random letter", "random alphabet generator", "pick random letter a-z"],
        "Random Letter Generator Online — Generate a random letter"
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
        "Calculate percentages, find what percent one number is of another, or calculate percentage increase/decrease. Type your numbers into this percentage calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["percentage calculator", "calculate percentage online", "percentage increase calculator", "what percent is x of y"],
        "Percentage Calculator Online — Calculate percentages"
      ),
      tool(
        "percentage-difference",
        "Percentage Difference",
        "Calculate the percentage difference and percentage change between any two numbers. This percentage difference calculator shows the result on the page as you work. It runs in your browser, so what you paste stays on your device and is not uploaded.",
        "live",
        ["percentage difference calculator", "percent change calculator", "calculate percentage difference between two numbers", "percentage variance calculator"],
        "Percentage Difference Online — Calculate the percentage difference"
      ),
      tool(
        "scientific-calculator",
        "Scientific Calculator",
        "A full scientific calculator with trigonometric, logarithmic, and power functions, plus calculation history. Type your numbers into this scientific calculator online and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["scientific calculator online", "online calculator with functions", "free scientific calculator", "trigonometry calculator online"],
        "Scientific Calculator Online — A full scientific calculator"
      ),
      tool(
        "bmi-calculator",
        "BMI Calculator",
        "Calculate your Body Mass Index (BMI) from your height and weight in metric or imperial units. Type your numbers into this bmi calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["bmi calculator", "calculate body mass index", "bmi calculator online", "healthy weight calculator"],
        "BMI Calculator Online — Calculate your Body Mass Index (BMI)"
      ),
      tool(
        "unit-converter",
        "Unit Converter",
        "Convert between units of length, weight, temperature, volume, area, and speed instantly. Paste the source and this unit converter online shows the result next to it. The work stays in your browser and is not uploaded.",
        "live",
        ["unit converter online", "convert units of measurement", "metric to imperial converter", "length weight temperature converter"],
        "Unit Converter Online — Convert between units of length, weight"
      ),
      tool(
        "currency-converter",
        "Currency Converter",
        "Convert between world currencies using live, daily-updated exchange rates from the European Central Bank. Paste the source and this currency converter online shows the result next to it. The work stays in your browser and is not uploaded.",
        "live",
        ["currency converter online", "live exchange rate converter", "convert currency online", "foreign exchange calculator"],
        "Currency Converter Online — Convert between world currencies using"
      ),
      tool(
        "decimal-binary",
        "Decimal \u2194 Binary",
        "Convert numbers between decimal (base 10) and binary (base 2) instantly, both directions. This decimal to binary converter shows the result on the page as you work. Free to use, with no account. Your input is handled on this page and is not sent to a server.",
        "live",
        ["decimal to binary converter", "binary to decimal converter", "convert decimal to binary", "binary converter online"],
        "Decimal ↔ Binary Online — Convert numbers between decimal (base 10)"
      ),
      tool(
        "decimal-hex",
        "Decimal \u2194 Hex",
        "Convert numbers between decimal (base 10) and hexadecimal (base 16) instantly, both directions. This decimal to hex converter shows the result on the page as you work. No sign-up and no upload. You can use it with private data and it never leaves the page.",
        "live",
        ["decimal to hex converter", "hex to decimal converter", "convert decimal to hexadecimal", "hexadecimal converter online"],
        "Decimal ↔ Hex Online — Convert numbers between decimal (base 10)"
      ),
      tool(
        "decimal-octal",
        "Decimal \u2194 Octal",
        "Convert numbers between decimal (base 10) and octal (base 8) instantly, both directions. This decimal to octal converter shows the result on the page as you work. No sign-up and no upload. You can use it with private data and it never leaves the page.",
        "live",
        ["decimal to octal converter", "octal to decimal converter", "convert decimal to octal", "octal converter online"],
        "Decimal ↔ Octal Online — Convert numbers between decimal (base 10)"
      ),
      tool(
        "roman-numeral",
        "Roman Numeral Converter",
        "Convert numbers to Roman numerals and Roman numerals back to numbers, from 1 to 3999. Paste the source and this roman numeral converter shows the result next to it. The work stays in your browser and is not uploaded.",
        "live",
        ["roman numeral converter", "convert to roman numerals", "roman numeral to number", "roman numeral generator"],
        "Roman Numeral Converter Online — Convert numbers to Roman numerals"
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
        "Validate a docker-compose.yml file's structure, services, ports, and volumes. Paste your input and this docker compose validator shows whether it is valid, and where to fix it. Checking happens in your browser.",
        "live",
        ["docker compose validator", "validate docker-compose.yml", "docker compose syntax checker", "compose file linter"],
        "Docker Compose Validator Online — Validate a docker-compose.yml"
      ),
      tool(
        "dockerfile-linter",
        "Dockerfile Linter",
        "Lint a Dockerfile for common mistakes, security issues, and best-practice violations. This dockerfile linter shows the result on the page as you work. Free to use, with no account. Your input is handled on this page and is not sent to a server.",
        "live",
        ["dockerfile linter", "dockerfile best practices checker", "docker build linter", "hadolint alternative online"],
        "Dockerfile Linter Online — Lint a Dockerfile for common mistakes"
      ),
      tool(
        "kubernetes-yaml-validator",
        "Kubernetes YAML Validator",
        "Validate Kubernetes manifests for required fields, selector/label matching, and resource formats. Paste your input and this kubernetes yaml validator shows whether it is valid, and where to fix it. Checking happens in your browser.",
        "live",
        ["kubernetes yaml validator", "k8s manifest validator", "validate kubernetes yaml online", "kubectl dry run alternative"],
        "Kubernetes YAML Validator Online — Validate Kubernetes manifests"
      ),
      tool(
        "kubernetes-manifest-generator",
        "Kubernetes Manifest Generator",
        "Generate Deployment, Service, ConfigMap, and Secret YAML manifests from a simple form. Use this kubernetes manifest generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["kubernetes manifest generator", "generate k8s yaml", "deployment yaml generator", "kubernetes service yaml generator"],
        "Kubernetes Manifest Generator Online — Generate Deployment, Service"
      ),
      tool(
        "helm-values-formatter",
        "Helm Values Formatter",
        "Format and re-indent a Helm values.yaml file consistently. Paste messy text and this helm values formatter rewrites it so it is easy to read. Formatting happens in your browser and is not uploaded.",
        "live",
        ["helm values formatter", "format values.yaml", "helm yaml formatter", "helm chart values beautifier"],
        "Helm Values Formatter Online — Format and re-indent a Helm"
      ),
      tool(
        "nginx-config-tester",
        "Nginx Config Tester",
        "Check an nginx configuration for brace, semicolon, and common directive mistakes. This nginx config tester shows the result on the page as you work. No sign-up and no upload. You can use it with private data and it never leaves the page.",
        "live",
        ["nginx config tester", "nginx config syntax checker", "validate nginx.conf online", "nginx -t alternative"],
        "Nginx Config Tester Online — Check an nginx configuration"
      ),
      tool(
        "apache-config-formatter",
        "Apache Config Formatter",
        "Format Apache httpd.conf and .htaccess files with consistent block indentation. Paste messy text and this apache config formatter rewrites it so it is easy to read. Formatting happens in your browser and is not uploaded.",
        "live",
        ["apache config formatter", "format httpd.conf", "htaccess formatter", "apache virtualhost formatter"],
        "Apache Config Formatter Online — Format Apache httpd.conf"
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
        "Break an AWS ARN down into partition, service, region, account ID, and resource. This aws arn parser shows the result on the page as you work. No sign-up and no upload. You can use it with private data and it never leaves the page.",
        "live",
        ["aws arn parser", "parse arn online", "aws resource name breakdown", "arn format checker"],
        "AWS ARN Parser Online — Break an AWS ARN down"
      ),
      tool(
        "aws-iam-policy-formatter",
        "AWS IAM Policy Formatter",
        "Format an IAM policy document and check statements for common mistakes. Paste messy text and this aws iam policy formatter rewrites it so it is easy to read. Formatting happens in your browser and is not uploaded.",
        "live",
        ["aws iam policy formatter", "iam policy validator", "format iam policy json", "aws policy checker"],
        "AWS IAM Policy Formatter Online — Format an IAM policy document"
      ),
      tool(
        "aws-cron-converter",
        "AWS Cron Converter",
        "Convert between standard Unix cron and AWS's 6-field EventBridge/CloudWatch cron format. Paste the source and this aws cron converter shows the result next to it. The work stays in your browser and is not uploaded.",
        "live",
        ["aws cron converter", "cloudwatch cron expression", "eventbridge cron format", "unix cron to aws cron"],
        "AWS Cron Converter Online — Convert between standard Unix cron"
      ),
      tool(
        "s3-url-parser",
        "S3 URL Parser",
        "Parse S3 URLs into bucket, key, and region, or build S3 URLs from bucket and key. This s3 url parser shows the result on the page as you work. Open it on any device. The result is calculated locally and is not stored.",
        "live",
        ["s3 url parser", "parse s3 bucket url", "s3 url generator", "s3 path style vs virtual hosted"],
        "S3 URL Parser Online — Parse S3 URLs into bucket, key"
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
        "Build an OAuth 2.0 authorization URL with client ID, scope, state, and PKCE parameters. This oauth url builder shows the result on the page as you work. No sign-up and no upload. You can use it with private data and it never leaves the page.",
        "live",
        ["oauth url builder", "oauth 2.0 authorization url generator", "build oauth login url", "oauth query params generator"],
        "OAuth URL Builder Online — Build an OAuth 2.0 authorization URL"
      ),
      tool(
        "pkce-generator",
        "PKCE Generator",
        "Generate a PKCE code_verifier and code_challenge pair for OAuth 2.0 authorization code flow. Use this pkce generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["pkce generator", "code verifier code challenge generator", "oauth pkce online", "generate code challenge s256"],
        "PKCE Generator Online — Generate a PKCE code_verifier"
      ),
      tool(
        "totp-generator",
        "TOTP Generator",
        "Generate live, time-based one-time passwords (RFC 6238) from a Base32 secret. Use this totp generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["totp generator", "time based one time password generator", "google authenticator code generator online", "2fa code generator"],
        "TOTP Generator Online — Generate live"
      ),
      tool(
        "api-key-generator",
        "API Key Generator",
        "Generate cryptographically random API keys with a custom prefix and length. Use this api key generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["api key generator", "generate secret key online", "random api key generator", "sk_live key generator"],
        "API Key Generator Online — Generate cryptographically random API"
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
        "Look up the meaning of any HTTP status code, from 100 to 511. This http status code lookup shows the result on the page as you work. It runs in your browser, so what you paste stays on your device and is not uploaded.",
        "live",
        ["http status code lookup", "http status codes list", "what does status code 404 mean", "http response code reference"],
        "HTTP Status Code Lookup Online — Look up the meaning of any HTTP"
      ),
      tool(
        "mime-type-lookup",
        "MIME Type Lookup",
        "Look up the MIME type for a file extension, or the extension for a MIME type. This mime type lookup shows the result on the page as you work. It runs in your browser, so what you paste stays on your device and is not uploaded.",
        "live",
        ["mime type lookup", "file extension to mime type", "content-type lookup", "mime types list"],
        "MIME Type Lookup Online — Look up the MIME type for a file extension"
      ),
      tool(
        "mime-detector",
        "MIME Detector",
        "Detect a file's real MIME type from its content (magic bytes), not just its extension. This mime detector shows the result on the page as you work. No sign-up and no upload. You can use it with private data and it never leaves the page.",
        "live",
        ["mime detector", "detect file type from content", "magic bytes checker", "file signature lookup"],
        "MIME Detector Online — Detect a file's real MIME type"
      ),
      tool(
        "csp-generator",
        "CSP Generator",
        "Build a Content-Security-Policy header with a form for each directive. Use this csp generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["csp generator", "content security policy generator", "build csp header", "csp header builder online"],
        "CSP Generator Online — Build a Content-Security-Policy header"
      ),
      tool(
        "cors-header-generator",
        "CORS Header Generator",
        "Generate Access-Control-Allow-Origin and related CORS response headers. Use this cors header generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["cors header generator", "access-control-allow-origin generator", "generate cors headers", "cors config builder"],
        "CORS Header Generator Online — Generate Access-Control-Allow-Origin"
      ),
      tool(
        "csp-validator",
        "CSP Validator",
        "Validate a Content-Security-Policy header and flag unsafe or misconfigured directives. Paste your input and this csp validator shows whether it is valid, and where to fix it. Checking happens in your browser.",
        "live",
        ["csp validator", "content security policy checker", "validate csp header online", "csp header analyzer"],
        "CSP Validator Online — Validate a Content-Security-Policy header"
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
        "Pretty-print MongoDB shell queries, filters, and aggregation pipelines. Paste messy text and this mongodb query formatter rewrites it so it is easy to read. Formatting happens in your browser and is not uploaded.",
        "live",
        ["mongodb query formatter", "format mongo query online", "mongodb pretty print", "aggregation pipeline formatter"],
        "MongoDB Query Formatter Online — Pretty-print MongoDB shell queries"
      ),
      tool(
        "mongodb-objectid-generator",
        "MongoDB ObjectId Generator",
        "Generate valid MongoDB ObjectIds and decode their embedded creation timestamp. Use this mongodb objectid generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["mongodb objectid generator", "generate objectid online", "decode objectid timestamp", "bson objectid generator"],
        "MongoDB ObjectId Generator Online — Generate valid MongoDB ObjectIds"
      ),
      tool(
        "redis-command-builder",
        "Redis Command Builder",
        "Build common Redis CLI commands like SET, HSET, LPUSH, and ZADD from a form. This redis command builder shows the result on the page as you work. No sign-up and no upload. You can use it with private data and it never leaves the page.",
        "live",
        ["redis command builder", "redis cli command generator", "build redis command online", "redis syntax helper"],
        "Redis Command Builder Online — Build common Redis CLI commands like"
      ),
      tool(
        "postgresql-formatter",
        "PostgreSQL Formatter",
        "Format PostgreSQL queries with proper indentation and keyword casing. Paste messy text and this postgresql formatter rewrites it so it is easy to read. Formatting happens in your browser and is not uploaded.",
        "live",
        ["postgresql formatter", "format postgres query", "postgresql sql beautifier", "pretty print postgresql"],
        "PostgreSQL Formatter Online — Format PostgreSQL queries"
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
        "Clean up LLM prompts by trimming whitespace, collapsing blank lines, and normalizing smart quotes. Paste messy text and this prompt formatter rewrites it so it is easy to read. Formatting happens in your browser and is not uploaded.",
        "live",
        ["prompt formatter", "clean up chatgpt prompt", "format llm prompt online", "prompt cleanup tool"],
        "Prompt Formatter Online — Clean up LLM prompts"
      ),
      tool(
        "prompt-token-counter",
        "Prompt Token Counter",
        "Count the exact number of GPT tokens in a prompt using OpenAI's real tokenizer. Use this prompt token counter to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["prompt token counter", "gpt token counter", "count openai tokens", "chatgpt token calculator"],
        "Prompt Token Counter Online — Count the exact number of GPT tokens"
      ),
      tool(
        "openai-schema-validator",
        "OpenAI JSON Schema Validator",
        "Validate a JSON Schema against OpenAI's structured outputs and strict function-calling constraints. Paste your input and this openai json schema validator shows whether it is valid, and where to fix it. Checking happens in your browser.",
        "live",
        ["openai json schema validator", "structured outputs validator", "openai strict mode schema checker", "function calling schema validator"],
        "OpenAI JSON Schema Validator Online — Validate a JSON Schema against"
      ),
      tool(
        "embedding-token-counter",
        "Embedding Token Counter",
        "Count tokens for OpenAI embedding models and check against the 8,191-token input limit. Use this embedding token counter to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["embedding token counter", "text-embedding-3 token limit", "openai embedding token count", "embedding input limit checker"],
        "Embedding Token Counter Online — Count tokens for OpenAI embedding"
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
        "Generate random fictional full names for mock data, placeholders, and test accounts. Use this random name generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["random name generator", "fake name generator", "generate random name", "random full name generator"],
        "Random Name Generator Online — Generate random fictional full names"
      ),
      tool(
        "random-username",
        "Random Username Generator",
        "Generate unique-sounding random usernames by combining adjectives, nouns, and numbers. Use this random username generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["random username generator", "generate random username", "unique username generator", "username idea generator"],
        "Random Username Generator Online — Generate unique-sounding random"
      ),
      tool(
        "random-nickname",
        "Random Nickname Generator",
        "Generate playful random nicknames and gamertags by combining adjectives with animal names. Use this random nickname generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["random nickname generator", "gamertag generator", "generate random nickname", "cool nickname generator"],
        "Random Nickname Generator Online — Generate playful random nicknames"
      ),
      tool(
        "random-emoji",
        "Random Emoji Generator",
        "Generate random emoji from a curated set of faces, animals, food, and objects. Use this random emoji generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["random emoji generator", "generate random emoji", "random emoji picker", "emoji generator online"],
        "Random Emoji Generator Online — Generate random emoji from a curated"
      ),
      tool(
        "random-credit-card",
        "Random Credit Card Number Generator",
        "Generate fake, Luhn-valid credit card numbers for testing checkout forms and payment validators. Not real, not usable for purchases.",
        "live",
        ["random credit card generator", "fake credit card generator", "test credit card number generator", "luhn valid card number generator"],
        "Random Credit Card Number Generator Online — Generate fake"
      ),
      tool(
        "random-phone-number",
        "Random Phone Number Generator",
        "Generate fake phone numbers for testing, using officially reserved fictional ranges where available. Use this random phone number generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["random phone number generator", "fake phone number generator", "generate random phone number", "test phone number generator"],
        "Random Phone Number Generator Online — Generate fake phone numbers"
      ),
      tool(
        "random-address",
        "Random Address Generator",
        "Generate fake street addresses for testing forms and mock data. Not real locations.",
        "live",
        ["random address generator", "fake address generator", "generate random address", "test address generator"],
        "Random Address Generator Online — Generate fake street addresses"
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
        "Generate a random animal from a list of 50 wild and domestic species \u2014 fun for games and icebreakers. Use this random animal generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["random animal generator", "generate random animal", "random animal picker", "animal name generator"],
        "Random Animal Generator Online — Generate a random animal"
      ),
      tool(
        "random-country",
        "Random Country Generator",
        "Generate a random country complete with its flag emoji \u2014 great for travel inspiration and geography quizzes. Use this random country generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["random country generator", "generate random country", "random country picker", "pick a random country"],
        "Random Country Generator Online — Generate a random country complete"
      ),
      tool(
        "random-city",
        "Random City Generator",
        "Generate a random major city from around the world for travel ideas and geography practice. Use this random city generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["random city generator", "generate random city", "random city picker", "pick a random city"],
        "Random City Generator Online — Generate a random major city"
      ),
      tool(
        "random-food",
        "Random Food Generator",
        "Can't decide what to eat? Generate a random dish from around the world for dinner inspiration. Use this random food generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["random food generator", "what should i eat generator", "generate random food", "random meal generator"],
        "Random Food Generator Online — Can't decide what to eat? Generate"
      ),
      tool(
        "random-fruit",
        "Random Fruit Generator",
        "Generate a random fruit from a list of 35 fruits from around the world. Use this random fruit generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["random fruit generator", "generate random fruit", "random fruit picker", "fruit name generator"],
        "Random Fruit Generator Online — Generate a random fruit from a list"
      ),
      tool(
        "random-vegetable",
        "Random Vegetable Generator",
        "Generate a random vegetable \u2014 handy for meal planning and healthy-eating challenges. Use this random vegetable generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["random vegetable generator", "generate random vegetable", "random vegetable picker", "vegetable name generator"],
        "Random Vegetable Generator Online — Generate a random vegetable"
      ),
      tool(
        "random-drink",
        "Random Drink Generator",
        "Generate a random non-alcoholic drink or beverage idea in seconds. Use this random drink generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["random drink generator", "generate random drink", "random beverage generator", "what should i drink generator"],
        "Random Drink Generator Online — Generate a random non-alcoholic"
      ),
      tool(
        "random-movie",
        "Random Movie Generator",
        "Generate a random movie from a curated list of well-known films across genres \u2014 perfect for deciding what to watch. Use this random movie generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["random movie generator", "what movie should i watch generator", "generate random movie", "movie picker online"],
        "Random Movie Generator Online — Generate a random movie"
      ),
      tool(
        "random-tv-show",
        "Random TV Show Generator",
        "Generate a random TV show from a curated list of popular series across genres \u2014 great for your next binge. Use this random tv show generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["random tv show generator", "what show should i watch generator", "generate random tv show", "tv show picker online"],
        "Random TV Show Generator Online — Generate a random TV show"
      ),
      tool(
        "random-book",
        "Random Book Generator",
        "Generate a random book from a curated list of classic and popular titles \u2014 a fun way to find your next read. Use this random book generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["random book generator", "what book should i read generator", "generate random book", "book picker online"],
        "Random Book Generator Online — Generate a random book from a curated"
      ),
      tool(
        "random-game",
        "Random Game Generator",
        "Generate a random video game from a curated list across genres and platforms \u2014 great for deciding what to play. Use this random game generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["random game generator", "what game should i play generator", "generate random video game", "game picker online"],
        "Random Game Generator Online — Generate a random video game"
      ),
      tool(
        "random-pokemon",
        "Random Pokemon Generator",
        "Generate a random Pokemon from the original Generation I lineup \u2014 a fun, unofficial fan tool. Use this random pokemon generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["random pokemon generator", "generate random pokemon", "random pokemon picker", "pokemon name generator"],
        "Random Pokemon Generator Online — Generate a random Pokemon"
      ),
      tool(
        "random-dinosaur",
        "Random Dinosaur Generator",
        "Generate a random dinosaur species name \u2014 fun for classroom projects and trivia nights. Use this random dinosaur generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["random dinosaur generator", "generate random dinosaur", "random dinosaur picker", "dinosaur name generator"],
        "Random Dinosaur Generator Online — Generate a random dinosaur"
      ),
      tool(
        "random-bird",
        "Random Bird Generator",
        "Generate a random bird species name \u2014 great for birdwatching lists and trivia games. Use this random bird generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["random bird generator", "generate random bird", "random bird picker", "bird name generator"],
        "Random Bird Generator Online — Generate a random bird species name"
      ),
      tool(
        "random-flag",
        "Random Flag Generator",
        "Generate random country flags with their names \u2014 fun for geography quizzes and flag-guessing games. Use this random flag generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["random flag generator", "generate random flag", "random country flag generator", "flag guessing game"],
        "Random Flag Generator Online — Generate random country flags"
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
        "Create a custom spinning wheel from your own list of options and let it randomly pick a winner. Use this spin the wheel to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["spin the wheel", "random wheel spinner", "wheel of names", "decision wheel online"],
        "Spin Wheel Online — Create a custom spinning wheel from your own"
      ),
      tool(
        "yes-or-no",
        "Yes or No Generator",
        "Get an instant random Yes or No answer to any question \u2014 with a running history and tally. Use this yes or no generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["yes or no generator", "random yes or no", "yes no wheel", "decision maker yes or no"],
        "Yes or No Generator Online — Get an instant random Yes or No answer"
      ),
      tool(
        "coin-flip",
        "Coin Flip",
        "Flip a virtual coin online with an animated flip, plus a running heads/tails tally. Use this coin flip online to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["coin flip online", "flip a coin", "heads or tails generator", "virtual coin flip"],
        "Coin Flip Online — Flip a virtual coin online with an animated flip"
      ),
      tool(
        "dice-roller",
        "Dice Roller",
        "Roll one or more virtual dice online \u2014 D4, D6, D8, D10, D12, or D20, with an automatic total. Use this dice roller online to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["dice roller online", "roll a dice", "virtual dice roller", "roll dice online"],
        "Dice Roller Online — Roll one or more virtual dice online — D4, D6"
      ),
      tool(
        "number-picker",
        "Number Picker",
        "Pick a single random number from any range \u2014 a quick decision-maker with an option to avoid recent repeats. Use this random number picker to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["random number picker", "pick a random number", "number picker wheel", "spin a number generator"],
        "Number Picker Online — Pick a single random number from any range"
      ),
      tool(
        "team-generator",
        "Team Generator",
        "Randomly split a list of names into balanced teams for games, classrooms, or work groups. Use this random team generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["random team generator", "team generator online", "split into random teams", "group generator online"],
        "Team Generator Online — Randomly split a list of names"
      ),
      tool(
        "random-picker",
        "Random Picker",
        "Pick one random item from your own custom list, with an option to remove picks so nothing repeats. Use this random picker online to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["random picker online", "pick random item from list", "random choice generator", "random name picker"],
        "Random Picker Online — Pick one random item from your own custom"
      ),
      tool(
        "secret-santa-generator",
        "Secret Santa Generator",
        "Generate random Secret Santa gift-giving pairs from a list of names, with private tap-to-reveal cards. Use this secret santa generator to create a new result in one click. It is made in your browser and is not stored.",
        "live",
        ["secret santa generator", "secret santa name picker", "secret santa pairing generator", "gift exchange generator"],
        "Secret Santa Generator Online — Generate random Secret Santa"
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
        "Calculate your monthly loan EMI, total interest, and total payment using the standard reducing-balance formula. Type your numbers into this emi calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["emi calculator", "loan emi calculator", "calculate emi online", "monthly installment calculator"],
        "EMI Calculator Online — Home Loan Monthly EMI"
      ),
      tool(
        "loan-eligibility",
        "Loan Eligibility Calculator",
        "Estimate how much loan you're eligible for based on your income, existing EMIs, and the lender's FOIR limit. Type your numbers into this loan eligibility calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["loan eligibility calculator", "how much loan can i get", "loan eligibility check", "max loan amount calculator"],
        "Loan Eligibility Calculator Online — Estimate how much loan you're"
      ),
      tool(
        "loan-affordability",
        "Loan Affordability Calculator",
        "Work backwards from your monthly EMI budget to see how much loan you can comfortably afford. Type your numbers into this loan affordability calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["loan affordability calculator", "how much loan can i afford", "affordable loan amount calculator", "emi budget calculator"],
        "Loan Affordability Calculator Online — Work backwards"
      ),
      tool(
        "loan-comparison",
        "Loan Comparison Calculator",
        "Compare two or more loan offers side by side by EMI, total interest, and total repayment. Type your numbers into this loan comparison calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["loan comparison calculator", "compare loan offers", "compare emi rates", "best loan offer calculator"],
        "Loan Comparison Calculator Online — Compare two or more loan offers"
      ),
      tool(
        "loan-prepayment",
        "Loan Prepayment Calculator",
        "See how much time and interest a lump-sum loan prepayment can save you. Type your numbers into this loan prepayment calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["loan prepayment calculator", "part payment calculator", "prepayment interest saved calculator", "foreclosure calculator"],
        "Loan Prepayment Calculator Online — See how much time and interest"
      ),
      tool(
        "car-loan",
        "Car Loan Calculator",
        "Calculate your car loan EMI including down payment, with a full amortization schedule. Type your numbers into this car loan calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["car loan calculator", "car loan emi calculator", "auto loan calculator", "vehicle loan emi calculator"],
        "Car Loan Calculator Online — Calculate your car loan EMI including"
      ),
      tool(
        "bike-loan",
        "Bike Loan Calculator",
        "Calculate your two-wheeler loan EMI including down payment, with a full amortization schedule. Type your numbers into this bike loan calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["bike loan calculator", "bike loan emi calculator", "two wheeler loan calculator", "motorcycle loan calculator"],
        "Bike Loan Calculator Online — Calculate your two-wheeler loan EMI"
      ),
      tool(
        "home-loan",
        "Home Loan Calculator",
        "Calculate your home loan EMI, total interest, and a full yearly amortization schedule. Type your numbers into this home loan calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["home loan calculator", "home loan emi calculator", "mortgage emi calculator", "housing loan calculator"],
        "Home Loan Calculator Online — Calculate your home loan EMI"
      ),
      tool(
        "education-loan",
        "Education Loan Calculator",
        "Calculate your education loan EMI, including an optional moratorium (grace) period during your studies. Type your numbers into this education loan calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["education loan calculator", "student loan emi calculator", "education loan emi with moratorium", "study loan calculator"],
        "Education Loan Calculator Online — Calculate your education loan EMI"
      ),
      tool(
        "personal-loan",
        "Personal Loan Calculator",
        "Calculate your personal loan EMI, total interest, and total payment. Type your numbers into this personal loan calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["personal loan calculator", "personal loan emi calculator", "calculate personal loan emi", "unsecured loan calculator"],
        "Personal Loan Calculator Online — Calculate your personal loan EMI"
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
        "Estimate the future value of a monthly SIP investment based on your expected rate of return. Type your numbers into this sip calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["sip calculator", "sip return calculator", "mutual fund sip calculator", "monthly sip calculator"],
        "SIP Calculator India — Mutual Fund Returns Online"
      ),
      tool(
        "swp-calculator",
        "SWP Calculator",
        "See how long your investment corpus will last with a Systematic Withdrawal Plan, or your balance after N years. Type your numbers into this swp calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["swp calculator", "systematic withdrawal plan calculator", "swp return calculator", "monthly withdrawal plan calculator"],
        "SWP Calculator Online — See how long your investment corpus will"
      ),
      tool(
        "lumpsum-calculator",
        "Lumpsum Calculator",
        "Estimate the future value of a one-time lumpsum investment at a given rate of return. Type your numbers into this lumpsum calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["lumpsum calculator", "lumpsum investment calculator", "lumpsum return calculator", "one time investment calculator"],
        "Lumpsum Calculator Online — Estimate the future value of a one-time"
      ),
      tool(
        "step-up-sip",
        "Step-up SIP Calculator",
        "Estimate SIP returns when you increase your monthly investment by a fixed percentage every year. Type your numbers into this step up sip calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["step up sip calculator", "top up sip calculator", "increasing sip calculator", "annual step up sip calculator"],
        "Step-up SIP Calculator Online — Estimate SIP returns when you"
      ),
      tool(
        "cagr-calculator",
        "CAGR Calculator",
        "Calculate the Compound Annual Growth Rate between an initial and final investment value. Type your numbers into this cagr calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["cagr calculator", "compound annual growth rate calculator", "calculate cagr online", "annual growth rate calculator"],
        "CAGR Calculator Online — Calculate the Compound Annual Growth Rate"
      ),
      tool(
        "xirr-calculator",
        "XIRR Calculator",
        "Calculate the annualized return (XIRR) of investments with irregular cash flows and dates. Type your numbers into this xirr calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["xirr calculator", "xirr calculator online", "calculate xirr", "irregular cash flow return calculator"],
        "XIRR Calculator Online — Calculate the annualized return (XIRR)"
      ),
      tool(
        "irr-calculator",
        "IRR Calculator",
        "Calculate the Internal Rate of Return for a series of regular periodic cash flows. Type your numbers into this irr calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["irr calculator", "internal rate of return calculator", "calculate irr online", "irr calculator online"],
        "IRR Calculator Online — Calculate the Internal Rate of Return"
      ),
      tool(
        "roi-calculator",
        "ROI Calculator",
        "Calculate your Return on Investment, with an optional annualized return based on your holding period. Type your numbers into this roi calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["roi calculator", "return on investment calculator", "calculate roi online", "roi percentage calculator"],
        "ROI Calculator Online — Calculate your Return on Investment"
      ),
      tool(
        "mutual-fund-returns",
        "Mutual Fund Returns Calculator",
        "Calculate your mutual fund's absolute and annualized returns from units held and NAV values. Type your numbers into this mutual fund returns calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["mutual fund returns calculator", "mutual fund return calculator", "nav return calculator", "mutual fund profit calculator"],
        "Mutual Fund Returns Calculator Online — Calculate your mutual fund's"
      ),
      tool(
        "stock-average-price",
        "Stock Average Price Calculator",
        "Calculate your average buy price across multiple stock purchases, plus profit or loss at the current price. Type your numbers into this stock average price calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["stock average price calculator", "average share price calculator", "average down calculator stocks", "stock cost average calculator"],
        "Stock Average Price Calculator Online — Calculate your average buy"
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
        "Calculate the maturity value and interest earned on a Fixed Deposit with your choice of compounding frequency. Type your numbers into this fd calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["fd calculator", "fixed deposit calculator", "fd maturity calculator", "fd interest calculator"],
        "FD Calculator Online — Calculate the maturity value"
      ),
      tool(
        "rd-calculator",
        "RD Calculator",
        "Calculate the maturity value of a Recurring Deposit based on your monthly deposit, interest rate, and tenure. Type your numbers into this rd calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["rd calculator", "recurring deposit calculator", "rd maturity calculator", "rd interest calculator"],
        "RD Calculator Online — Calculate the maturity value of a Recurring"
      ),
      tool(
        "ppf-calculator",
        "PPF Calculator",
        "Calculate your Public Provident Fund maturity value based on yearly contributions and the current interest rate. Type your numbers into this ppf calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["ppf calculator", "public provident fund calculator", "ppf maturity calculator", "ppf interest calculator"],
        "PPF Calculator Online — Calculate your Public Provident Fund"
      ),
      tool(
        "epf-calculator",
        "EPF Calculator",
        "Estimate your Employee Provident Fund corpus at retirement based on your salary, contributions, and annual increments. Type your numbers into this epf calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["epf calculator", "employee provident fund calculator", "epf maturity calculator", "pf calculator"],
        "EPF Calculator Online — Estimate your Employee Provident Fund corpus"
      ),
      tool(
        "nps-calculator",
        "NPS Calculator",
        "Estimate your National Pension Scheme corpus at retirement and the resulting monthly pension from annuitization. Type your numbers into this nps calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["nps calculator", "national pension scheme calculator", "nps maturity calculator", "nps pension calculator"],
        "NPS Calculator Online — Estimate your National Pension Scheme corpus"
      ),
      tool(
        "sukanya-calculator",
        "Sukanya Samriddhi Calculator",
        "Calculate the maturity value of a Sukanya Samriddhi Yojana account based on yearly deposits and the current interest rate. Type your numbers into this sukanya samriddhi calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["sukanya samriddhi calculator", "ssy calculator", "sukanya samriddhi yojana calculator", "girl child savings scheme calculator"],
        "Sukanya Samriddhi Calculator Online — Calculate the maturity value"
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
        "Estimate the retirement corpus you'll need and the monthly SIP required to build it, adjusted for inflation. Type your numbers into this retirement calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["retirement calculator", "retirement corpus calculator", "retirement planning calculator", "how much do i need to retire"],
        "Retirement Calculator Online — Estimate the retirement corpus you'll"
      ),
      tool(
        "fire-calculator",
        "FIRE Calculator",
        "Calculate your Financial Independence, Retire Early (FIRE) number and estimate how many years until you reach it. Type your numbers into this fire calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["fire calculator", "financial independence calculator", "fire number calculator", "retire early calculator"],
        "FIRE Calculator Online — Calculate your Financial Independence"
      ),
      tool(
        "pension-calculator",
        "Pension Calculator",
        "Estimate your retirement corpus and the monthly pension it can generate based on your contributions and annuity rate. Type your numbers into this pension calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["pension calculator", "monthly pension calculator", "pension corpus calculator", "retirement pension calculator"],
        "Pension Calculator Online — Estimate your retirement corpus"
      ),
      tool(
        "future-value",
        "Future Value Calculator",
        "Calculate the future value of a present sum plus optional periodic contributions at a given rate of return. Type your numbers into this future value calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["future value calculator", "fv calculator", "future value of money calculator", "compound interest future value"],
        "Future Value Calculator Online — Calculate the future value"
      ),
      tool(
        "present-value",
        "Present Value Calculator",
        "Calculate the present value of a future sum of money, discounted at your chosen rate of return. Type your numbers into this present value calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["present value calculator", "pv calculator", "present value of money calculator", "discounted value calculator"],
        "Present Value Calculator Online — Calculate the present value"
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
        "Estimate your income tax liability under both the new and old tax regimes and see which one saves you more. Type your numbers into this income tax calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["income tax calculator", "income tax calculator india", "new vs old tax regime calculator", "tax calculator india"],
        "Income Tax Calculator India — New vs Old Regime"
      ),
      tool(
        "gst-calculator",
        "GST Calculator",
        "Add or remove GST from an amount at any standard GST rate (5%, 12%, 18%, 28%). Type your numbers into this gst calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["gst calculator", "gst calculator india", "add gst calculator", "remove gst calculator"],
        "GST Calculator India — Inclusive & Exclusive"
      ),
      tool(
        "hra-calculator",
        "HRA Calculator",
        "Calculate your House Rent Allowance (HRA) tax exemption based on your salary, HRA received, and rent paid. Type your numbers into this hra calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["hra calculator", "hra exemption calculator", "house rent allowance calculator", "hra tax exemption calculator"],
        "HRA Calculator Online — Calculate your House Rent Allowance (HRA)"
      ),
      tool(
        "capital-gains-calculator",
        "Capital Gains Calculator",
        "Calculate your capital gain and check whether it qualifies as short-term or long-term based on your holding period. Type your numbers into this capital gains calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["capital gains calculator", "capital gains tax calculator", "ltcg calculator", "stcg calculator"],
        "Capital Gains Calculator Online — Calculate your capital gain"
      ),
      tool(
        "tds-calculator",
        "TDS Calculator",
        "Calculate TDS (Tax Deducted at Source) and net payable amount for common payment types and sections. Type your numbers into this tds calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["tds calculator", "tds calculator india", "tax deducted at source calculator", "tds rate calculator"],
        "TDS Calculator Online — Calculate TDS (Tax Deducted at Source)"
      ),
      tool(
        "salary-calculator",
        "Salary Calculator",
        "Break down your annual CTC into salary components: basic, HRA, allowances, PF, and gross/net monthly salary. Type your numbers into this salary calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["salary calculator", "ctc calculator", "salary breakup calculator", "ctc to salary calculator"],
        "Salary Calculator Online — Break down your annual CTC"
      ),
      tool(
        "take-home-salary",
        "Take Home Salary Calculator",
        "Calculate your final in-hand monthly salary after PF, professional tax, and estimated income tax deductions. Type your numbers into this take home salary calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["take home salary calculator", "in hand salary calculator", "net salary calculator", "ctc to in hand salary calculator"],
        "Take Home Salary Calculator Online — Calculate your final in-hand"
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
        "Calculate the value of your gold based on today's rate, purity (24K/22K/18K/14K), and weight. Type your numbers into this gold price calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["gold price calculator", "gold rate calculator", "gold value calculator", "22k to 24k gold calculator"],
        "Gold Price Calculator Online — Calculate the value of your gold"
      ),
      tool(
        "silver-price-calculator",
        "Silver Price Calculator",
        "Calculate the value of your silver based on today's rate and weight in grams, kilograms, or ounces. Type your numbers into this silver price calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["silver price calculator", "silver rate calculator", "silver value calculator", "silver weight calculator"],
        "Silver Price Calculator Online — Calculate the value of your silver"
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
        "Generate a simple GST invoice with line items, CGST/SGST or IGST split, and a live total preview. Type your numbers into this gst invoice generator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["gst invoice generator", "gst invoice maker", "gst bill generator", "gst invoice format"],
        "GST Invoice Generator Online — Generate a simple GST invoice"
      ),
      tool(
        "profit-margin-calculator",
        "Profit Margin Calculator",
        "Calculate your profit, profit margin percentage, and markup percentage from cost price and selling price. Type your numbers into this profit margin calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["profit margin calculator", "margin calculator", "markup calculator", "profit percentage calculator"],
        "Profit Margin Calculator Online — Calculate your profit"
      ),
      tool(
        "break-even-calculator",
        "Break-even Calculator",
        "Calculate the number of units and revenue needed to break even based on fixed costs, variable costs, and price. Type your numbers into this break even calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["break even calculator", "break even point calculator", "break even analysis calculator", "break even units calculator"],
        "Break-even Calculator Online — Calculate the number of units"
      ),
      tool(
        "discount-calculator",
        "Discount Calculator",
        "Calculate a discounted price from a percentage off, or work backwards to find the original price. Type your numbers into this discount calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["discount calculator", "percentage off calculator", "sale price calculator", "discount percentage calculator"],
        "Discount Calculator Online — Calculate a discounted price"
      ),
      tool(
        "commission-calculator",
        "Commission Calculator",
        "Calculate commission earned on a sale amount at a given commission percentage rate. Type your numbers into this commission calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["commission calculator", "sales commission calculator", "commission percentage calculator", "broker commission calculator"],
        "Commission Calculator Online — Calculate commission earned on a sale"
      ),
      tool(
        "vat-calculator",
        "VAT Calculator",
        "Add or remove VAT from an amount at any VAT rate \u2014 useful for UK, EU, and other VAT-based tax systems. Type your numbers into this vat calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["vat calculator", "add vat calculator", "remove vat calculator", "vat calculator uk"],
        "VAT Calculator Online — Add or remove VAT from an amount at any VAT"
      ),
      tool(
        "invoice-calculator",
        "Invoice Calculator",
        "Calculate an invoice total from line items with an optional discount and tax rate. Type your numbers into this invoice calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["invoice calculator", "invoice total calculator", "invoice generator", "invoice tax calculator"],
        "Invoice Calculator Online — Calculate an invoice total"
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
        "Plan your monthly budget by comparing your income against custom expense categories and see your savings rate. This budget planner shows the result on the page as you work. Open it on any device. The result is calculated locally and is not stored.",
        "live",
        ["budget planner", "monthly budget calculator", "budget calculator", "50 30 20 rule calculator"],
        "Budget Planner Online — Plan your monthly budget by comparing"
      ),
      tool(
        "expense-tracker",
        "Expense Tracker",
        "Log individual expenses by category and see a visual breakdown of where your money goes. This expense tracker shows the result on the page as you work. No sign-up and no upload. You can use it with private data and it never leaves the page.",
        "live",
        ["expense tracker", "expense tracker online", "expense calculator", "spending tracker"],
        "Expense Tracker Online — Log individual expenses by category"
      ),
      tool(
        "net-worth-calculator",
        "Net Worth Calculator",
        "Calculate your net worth by listing your assets and liabilities. Type your numbers into this net worth calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["net worth calculator", "net worth calculator online", "personal net worth calculator", "assets and liabilities calculator"],
        "Net Worth Calculator Online — Calculate your net worth"
      ),
      tool(
        "emergency-fund-calculator",
        "Emergency Fund Calculator",
        "Calculate your target emergency fund based on your essential expenses and desired months of coverage. Type your numbers into this emergency fund calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["emergency fund calculator", "emergency fund goal calculator", "how much emergency fund do i need", "rainy day fund calculator"],
        "Emergency Fund Calculator Online — Calculate your target emergency"
      ),
      tool(
        "debt-payoff-calculator",
        "Debt Payoff Calculator",
        "Compare the snowball and avalanche debt payoff strategies to see how fast you can become debt-free. Type your numbers into this debt payoff calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["debt payoff calculator", "debt snowball calculator", "debt avalanche calculator", "debt free calculator"],
        "Debt Payoff Calculator Online — Compare the snowball"
      ),
      tool(
        "credit-card-interest-calculator",
        "Credit Card Interest Calculator",
        "Calculate how long it will take to pay off a credit card balance and the total interest you'll pay. Type your numbers into this credit card interest calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["credit card interest calculator", "credit card payoff calculator", "credit card debt calculator", "minimum payment calculator"],
        "Credit Card Interest Calculator Online — Calculate how long it will"
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
        "Estimate how much life insurance cover you need based on your income, liabilities, and existing cover. Type your numbers into this life insurance calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["life insurance calculator", "life insurance need calculator", "how much life insurance do i need", "human life value calculator"],
        "Life Insurance Calculator Online — Estimate how much life insurance"
      ),
      tool(
        "health-insurance-estimator",
        "Health Insurance Estimator",
        "Get a rough estimate of your annual health insurance premium based on age, family size, and sum insured. This health insurance estimator shows the result on the page as you work. It runs in your browser, so what you paste stays on your device and is not uploaded.",
        "live",
        ["health insurance estimator", "health insurance premium calculator", "mediclaim calculator", "health insurance cost calculator"],
        "Health Insurance Estimator Online — Get a rough estimate"
      ),
      tool(
        "term-insurance-need-calculator",
        "Term Insurance Need Calculator",
        "Calculate the ideal term insurance sum assured based on income replacement, loans, goals, and existing savings. Type your numbers into this term insurance need calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["term insurance need calculator", "term insurance calculator", "sum assured calculator", "how much term insurance do i need"],
        "Term Insurance Need Calculator Online — Calculate the ideal term"
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
        "Calculate stamp duty and registration charges on a property based on its value and state. Type your numbers into this stamp duty calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["stamp duty calculator", "stamp duty calculator india", "property registration charges calculator", "stamp duty and registration calculator"],
        "Stamp Duty Calculator Online — Calculate stamp duty"
      ),
      tool(
        "rental-yield-calculator",
        "Rental Yield Calculator",
        "Calculate the gross and net rental yield of a property based on its value, rent, and expenses. Type your numbers into this rental yield calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["rental yield calculator", "rental yield calculator india", "property yield calculator", "gross yield calculator"],
        "Rental Yield Calculator Online — Calculate the gross and net rental"
      ),
      tool(
        "mortgage-calculator",
        "Mortgage Calculator",
        "Calculate your full monthly mortgage payment including principal, interest, property tax, insurance, and HOA (PITI). Type your numbers into this mortgage calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["mortgage calculator", "mortgage payment calculator", "piti calculator", "home mortgage calculator"],
        "Mortgage Calculator Online — Calculate your full monthly mortgage"
      ),
      tool(
        "property-roi",
        "Property ROI Calculator",
        "Calculate the total and annualized ROI of a property investment including rental income and appreciation. Type your numbers into this property roi calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["property roi calculator", "real estate roi calculator", "property investment calculator", "real estate return calculator"],
        "Property ROI Calculator Online — Calculate the total"
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
        "Calculate your net profit and ROI on a crypto trade after accounting for buy and sell exchange fees. Type your numbers into this crypto profit calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["crypto profit calculator", "crypto profit loss calculator", "bitcoin profit calculator", "crypto roi calculator"],
        "Crypto Profit Calculator Online — Calculate your net profit"
      ),
      tool(
        "mining-profit-calculator",
        "Mining Profit Calculator",
        "Calculate your daily and monthly crypto mining profit after electricity costs and pool fees. Type your numbers into this mining profit calculator and the result updates on the page. The math stays in your browser and is not uploaded.",
        "live",
        ["mining profit calculator", "crypto mining calculator", "bitcoin mining profit calculator", "mining profitability calculator"],
        "Mining Profit Calculator Online — Calculate your daily"
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
