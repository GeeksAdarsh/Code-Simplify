export type ToolStatus = "live" | "soon";

export interface Tool {
  /** URL slug, unique within its category */
  slug: string;
  /** Display name, e.g. "JSON Formatter" */
  title: string;
  /** Short one-line description used in cards, nav, and meta description fallback */
  description: string;
  status: ToolStatus;
  /** Extra keywords to help with on-page SEO / search */
  keywords?: string[];
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
  keywords: string[] = []
): Tool {
  return { slug, title, description, status, keywords };
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
        "Format and beautify messy JSON into clean, readable, indented JSON instantly.",
        "live",
        ["json formatter", "json beautifier", "pretty print json", "format json online"]
      ),
      tool(
        "validator",
        "JSON Validator",
        "Validate JSON syntax instantly and get precise line and column error locations.",
        "live",
        ["json validator", "validate json online", "json syntax checker"]
      ),
      tool(
        "beautifier",
        "JSON Beautifier",
        "Beautify JSON with custom indentation and optional alphabetical key sorting.",
        "live",
        ["json beautifier", "beautify json online", "pretty json"]
      ),
      tool(
        "minifier",
        "JSON Minifier",
        "Minify JSON by removing whitespace to reduce payload size for production.",
        "live",
        ["json minifier", "minify json online", "compress json"]
      ),
      tool(
        "diff",
        "JSON Diff",
        "Compare two JSON documents and get a detailed, path-by-path list of differences.",
        "live",
        ["json diff", "compare json files", "json diff checker"]
      ),
      tool(
        "compare",
        "JSON Compare",
        "Compare two JSON objects side by side in a clear match/differs table.",
        "live",
        ["json compare", "json comparison tool"]
      ),
      tool(
        "viewer",
        "JSON Viewer",
        "View JSON with syntax highlighting for keys, strings, numbers, and booleans.",
        "live",
        ["json viewer", "json syntax highlighter"]
      ),
      tool(
        "tree-viewer",
        "JSON Tree Viewer",
        "Explore deeply nested JSON as a collapsible, navigable tree structure.",
        "live",
        ["json tree viewer", "json tree explorer"]
      ),
      tool(
        "to-xml",
        "JSON to XML",
        "Convert JSON data into well-formed XML markup instantly, right in your browser.",
        "live",
        ["json to xml converter", "convert json to xml"]
      ),
      tool(
        "to-yaml",
        "JSON to YAML",
        "Convert JSON data into clean, properly indented YAML.",
        "live",
        ["json to yaml converter", "convert json to yaml"]
      ),
      tool(
        "to-csv",
        "JSON to CSV",
        "Convert a JSON array of objects into a downloadable CSV spreadsheet.",
        "live",
        ["json to csv converter", "convert json to csv"]
      ),
      tool(
        "to-excel",
        "JSON to Excel",
        "Convert a JSON array of objects into a downloadable Excel (.xlsx) workbook.",
        "live",
        ["json to excel converter", "json to xlsx"]
      ),
      tool(
        "to-java",
        "JSON to Java",
        "Generate Java POJO classes with getters and setters from JSON.",
        "live",
        ["json to java pojo", "json to java class generator"]
      ),
      tool(
        "to-csharp",
        "JSON to C#",
        "Generate C# classes with auto-properties from JSON.",
        "live",
        ["json to c# class generator", "json to csharp"]
      ),
      tool(
        "to-php",
        "JSON to PHP",
        "Convert JSON into a native PHP array literal, ready to paste into your code.",
        "live",
        ["json to php array", "json to php converter"]
      ),
      tool(
        "to-typescript",
        "JSON to TypeScript",
        "Generate TypeScript interfaces from JSON, including nested types.",
        "live",
        ["json to typescript interface", "json to ts type generator"]
      ),
      tool(
        "to-kotlin",
        "JSON to Kotlin",
        "Generate Kotlin data classes from JSON, including nested types.",
        "live",
        ["json to kotlin data class"]
      ),
      tool(
        "to-dart",
        "JSON to Dart",
        "Generate Dart classes with fromJson factories from JSON, ready for Flutter.",
        "live",
        ["json to dart class", "json to flutter model"]
      ),
      tool(
        "escape-unescape",
        "JSON Escape/Unescape",
        "Escape raw text into a safe JSON string literal, or unescape one back to plain text.",
        "live",
        ["json escape", "json unescape", "escape json string"]
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
        "Format and indent XML into a clean, readable structure with validation.",
        "live",
        ["xml formatter", "format xml online", "xml beautifier"]
      ),
      tool(
        "validator",
        "XML Validator",
        "Validate XML well-formedness instantly and get clear parser error messages.",
        "live",
        ["xml validator", "validate xml online", "xml syntax checker"]
      ),
      tool(
        "minifier",
        "XML Minifier",
        "Minify XML by stripping whitespace to reduce payload size.",
        "live",
        ["xml minifier", "minify xml online", "compress xml"]
      ),
      tool(
        "to-json",
        "XML to JSON",
        "Convert XML documents into JSON, with attributes and repeated elements handled automatically.",
        "live",
        ["xml to json converter", "convert xml to json"]
      ),
      tool(
        "to-csv",
        "XML to CSV",
        "Convert XML data with repeated elements into a downloadable CSV spreadsheet.",
        "live",
        ["xml to csv converter", "convert xml to csv"]
      ),
      tool(
        "viewer",
        "XML Viewer",
        "View XML with syntax highlighting for tags, attributes, and comments.",
        "live",
        ["xml viewer", "xml syntax highlighter"]
      ),
      tool(
        "compare",
        "XML Compare",
        "Compare two XML documents and get a detailed, path-by-path list of differences.",
        "live",
        ["xml compare", "compare xml files", "xml diff"]
      ),
      tool(
        "xpath-tester",
        "XPath Tester",
        "Test XPath expressions against an XML document and see matching nodes instantly.",
        "live",
        ["xpath tester", "xpath evaluator online"]
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
        "Format and beautify YAML documents with consistent indentation.",
        "live",
        ["yaml formatter", "format yaml online", "yaml beautifier"]
      ),
      tool(
        "validator",
        "YAML Validator",
        "Validate YAML syntax instantly and get precise line and column error locations.",
        "live",
        ["yaml validator", "validate yaml online", "yaml syntax checker"]
      ),
      tool(
        "to-json",
        "YAML to JSON",
        "Convert YAML documents into JSON instantly, right in your browser.",
        "live",
        ["yaml to json converter", "convert yaml to json"]
      ),
      tool(
        "from-json",
        "JSON to YAML",
        "Convert JSON data into clean, properly indented YAML.",
        "live",
        ["json to yaml converter", "convert json to yaml"]
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
        "View CSV files as a clean, sortable table right in your browser.",
        "live",
        ["csv viewer online", "view csv file", "csv table viewer"]
      ),
      tool(
        "formatter",
        "CSV Formatter",
        "Reformat messy CSV data with consistent delimiters, quoting, and trimmed whitespace.",
        "live",
        ["csv formatter", "format csv online", "clean csv delimiters"]
      ),
      tool(
        "to-json",
        "CSV to JSON",
        "Convert CSV data into a JSON array of objects instantly.",
        "live",
        ["csv to json converter", "convert csv to json"]
      ),
      tool(
        "to-xml",
        "CSV to XML",
        "Convert CSV rows into well-formed XML documents.",
        "live",
        ["csv to xml converter", "convert csv to xml"]
      ),
      tool(
        "to-excel",
        "CSV to Excel",
        "Convert CSV data into a downloadable Excel (.xlsx) workbook.",
        "live",
        ["csv to excel converter", "convert csv to xlsx"]
      ),
      tool(
        "cleaner",
        "CSV Cleaner",
        "Trim whitespace, and remove empty or duplicate rows from messy CSV data.",
        "live",
        ["csv cleaner", "remove duplicate rows csv", "clean csv data"]
      ),
      tool(
        "diff",
        "CSV Diff",
        "Compare two CSV files row by row and highlight every difference.",
        "live",
        ["csv diff", "compare csv files", "csv comparison tool"]
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
        "Format and beautify SQL queries with proper indentation across MySQL, PostgreSQL, SQL Server, and more.",
        "live",
        ["sql formatter online", "format sql query", "beautify sql"]
      ),
      tool(
        "minifier",
        "SQL Minifier",
        "Minify SQL by stripping comments, line breaks, and extra whitespace.",
        "live",
        ["sql minifier", "minify sql query", "compress sql"]
      ),
      tool(
        "beautifier",
        "SQL Beautifier",
        "Beautify messy SQL into clean, readable, consistently indented queries.",
        "live",
        ["sql beautifier", "sql pretty print"]
      ),
      tool(
        "validator",
        "SQL Validator",
        "Validate SQL syntax and catch parse errors before you run your query.",
        "live",
        ["sql validator", "validate sql syntax", "sql syntax checker"]
      ),
      tool(
        "query-builder",
        "SQL Query Builder",
        "Visually build SELECT queries with columns, WHERE conditions, sorting, and limits.",
        "live",
        ["sql query builder", "visual sql builder", "build select query"]
      ),
      tool(
        "uppercase",
        "SQL Keywords Uppercase",
        "Convert all SQL keywords to UPPERCASE while preserving your original layout.",
        "live",
        ["sql keywords uppercase", "sql to uppercase"]
      ),
      tool(
        "lowercase",
        "SQL Keywords Lowercase",
        "Convert all SQL keywords to lowercase while preserving your original layout.",
        "live",
        ["sql keywords lowercase", "sql to lowercase"]
      ),
      tool(
        "to-json",
        "SQL to JSON",
        "Convert SQL INSERT statements into a clean JSON array of objects.",
        "live",
        ["sql to json converter", "convert sql insert to json"]
      ),
      tool(
        "from-json",
        "JSON to SQL",
        "Generate SQL INSERT statements from a JSON object or array.",
        "live",
        ["json to sql converter", "generate insert statements from json"]
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
        "Encode any text (including Unicode and emoji) into Base64.",
        "live",
        ["base64 encode online", "encode text to base64", "base64 encoder"]
      ),
      tool(
        "base64-decode",
        "Base64 Decode",
        "Decode Base64 back into readable UTF-8 text.",
        "live",
        ["base64 decode online", "decode base64 to text", "base64 decoder"]
      ),
      tool(
        "url-encode",
        "URL Encode",
        "Percent-encode text or full URLs for safe use in query strings and links.",
        "live",
        ["url encode online", "percent encode text", "uri encode"]
      ),
      tool(
        "url-decode",
        "URL Decode",
        "Decode percent-encoded (%XX) URL strings back into plain text.",
        "live",
        ["url decode online", "percent decode", "uri decode"]
      ),
      tool(
        "jwt-decoder",
        "JWT Decoder",
        "Decode and inspect JSON Web Tokens, with optional HMAC signature verification.",
        "live",
        ["jwt decoder online", "decode jwt token", "jwt.io alternative"]
      ),
      tool(
        "jwt-generator",
        "JWT Generator",
        "Generate signed JSON Web Tokens with custom claims, expiry, and HMAC secret.",
        "live",
        ["jwt generator online", "create jwt token", "sign jwt hmac"]
      ),
      tool(
        "md5",
        "MD5 Generator",
        "Generate MD5 hashes from text, computed entirely in your browser.",
        "live",
        ["md5 hash generator", "md5 online", "generate md5 checksum"]
      ),
      tool(
        "sha1",
        "SHA1 Generator",
        "Generate SHA-1 hashes from text using the Web Crypto API.",
        "live",
        ["sha1 hash generator", "sha1 online", "generate sha1 checksum"]
      ),
      tool(
        "sha256",
        "SHA256 Generator",
        "Generate SHA-256 hashes from text using the Web Crypto API.",
        "live",
        ["sha256 hash generator", "sha256 online", "generate sha256 checksum"]
      ),
      tool(
        "sha512",
        "SHA512 Generator",
        "Generate SHA-512 hashes from text using the Web Crypto API.",
        "live",
        ["sha512 hash generator", "sha512 online", "generate sha512 checksum"]
      ),
      tool(
        "hmac",
        "HMAC Generator",
        "Generate HMAC-SHA1/256/384/512 signatures from a message and secret key.",
        "live",
        ["hmac generator online", "hmac sha256 online", "generate hmac signature"]
      ),
      tool(
        "bcrypt",
        "Bcrypt Generator",
        "Hash passwords using bcrypt with adjustable salt rounds, and verify existing hashes.",
        "live",
        ["bcrypt generator online", "bcrypt hash password", "bcrypt online"]
      ),
      tool(
        "password-generator",
        "Password Generator",
        "Generate strong, cryptographically random passwords with customizable rules.",
        "live",
        ["password generator online", "random password generator", "strong password generator"]
      ),
      tool(
        "password-strength",
        "Password Strength Checker",
        "Check how strong a password is, with entropy estimate and crack-time analysis.",
        "live",
        ["password strength checker", "check password strength online", "password entropy calculator"]
      ),
      tool(
        "random-token",
        "Random Token Generator",
        "Generate cryptographically secure random tokens in hex, Base64, or alphanumeric format.",
        "live",
        ["random token generator", "secure token generator", "api key generator"]
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
        "Generate time-based UUID v1 identifiers with a random node ID.",
        "live",
        ["uuid v1 generator", "generate uuid v1 online", "time-based uuid"]
      ),
      tool(
        "uuid-v4",
        "UUID v4",
        "Generate random, cryptographically secure UUID v4 identifiers.",
        "live",
        ["uuid v4 generator", "generate uuid online", "random uuid generator"]
      ),
      tool(
        "uuid-v7",
        "UUID v7",
        "Generate sortable, time-ordered UUID v7 identifiers (RFC 9562).",
        "live",
        ["uuid v7 generator", "time ordered uuid", "sortable uuid"]
      ),
      tool(
        "guid",
        "GUID Generator",
        "Generate GUIDs with optional uppercase, braces, and hyphen formatting.",
        "live",
        ["guid generator online", "generate guid", "microsoft guid format"]
      ),
      tool(
        "nano-id",
        "Nano ID",
        "Generate compact, URL-safe Nano IDs with a custom length or alphabet.",
        "live",
        ["nanoid generator", "url safe unique id", "short unique id generator"]
      ),
      tool(
        "random-string",
        "Random String",
        "Generate cryptographically random strings with a custom length and character set.",
        "live",
        ["random string generator", "generate random string online"]
      ),
      tool(
        "random-number",
        "Random Number",
        "Generate random numbers within a range, with an optional no-duplicates mode.",
        "live",
        ["random number generator", "generate random number online"]
      ),
      tool(
        "random-password",
        "Random Password",
        "Generate strong, random, cryptographically secure passwords.",
        "live",
        ["random password generator", "generate secure password online"]
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
        "Format and indent HTML markup.",
        "live",
        ["html formatter", "format html online", "html beautifier", "indent html"]
      ),
      tool(
        "minifier",
        "HTML Minifier",
        "Minify HTML by removing whitespace and comments.",
        "live",
        ["html minifier", "minify html online", "compress html"]
      ),
      tool(
        "encoder",
        "HTML Encoder",
        "Encode text into HTML entities.",
        "live",
        ["html encoder", "html entity encoder", "encode html characters"]
      ),
      tool(
        "decoder",
        "HTML Decoder",
        "Decode HTML entities back into text.",
        "live",
        ["html decoder", "html entity decoder", "decode html entities"]
      ),
      tool(
        "preview",
        "HTML Preview",
        "Live-preview rendered HTML.",
        "live",
        ["html preview", "html viewer online", "live html editor"]
      ),
      tool(
        "escape",
        "HTML Escape",
        "Escape HTML special characters.",
        "live",
        ["html escape", "escape html characters", "html special characters escape"]
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
        "Format and beautify CSS.",
        "live",
        ["css formatter", "format css online", "css beautifier", "indent css"]
      ),
      tool(
        "minifier",
        "CSS Minifier",
        "Minify CSS to reduce file size.",
        "live",
        ["css minifier", "minify css online", "compress css"]
      ),
      tool(
        "beautifier",
        "CSS Beautifier",
        "Beautify CSS with consistent style.",
        "live",
        ["css beautifier", "beautify css online", "pretty css"]
      ),
      tool(
        "grid-generator",
        "CSS Grid Generator",
        "Visually design CSS Grid layouts.",
        "live",
        ["css grid generator", "css grid layout generator", "grid-template-columns generator"]
      ),
      tool(
        "flexbox-generator",
        "Flexbox Generator",
        "Visually design Flexbox layouts.",
        "live",
        ["flexbox generator", "css flexbox playground", "flex layout generator"]
      ),
      tool(
        "border-radius-generator",
        "Border Radius Generator",
        "Design custom border-radius shapes.",
        "live",
        ["border radius generator", "css border radius tool", "rounded corners generator"]
      ),
      tool(
        "box-shadow-generator",
        "Box Shadow Generator",
        "Design CSS box shadows visually.",
        "live",
        ["box shadow generator", "css box shadow tool", "box-shadow css generator"]
      ),
      tool(
        "text-shadow-generator",
        "Text Shadow Generator",
        "Design CSS text shadows visually.",
        "live",
        ["text shadow generator", "css text shadow tool", "text-shadow css generator"]
      ),
      tool(
        "gradient-generator",
        "CSS Gradient Generator",
        "Design linear and radial CSS gradients.",
        "live",
        ["css gradient generator", "linear gradient generator", "radial gradient generator"]
      ),
      tool(
        "clip-path-generator",
        "CSS Clip Path Generator",
        "Design custom CSS clip-path shapes.",
        "live",
        ["css clip path generator", "clip-path generator", "css shape generator"]
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
        "Format and beautify JavaScript code.",
        "live",
        ["javascript formatter", "format js online", "js beautifier", "prettier online"]
      ),
      tool(
        "minifier",
        "JS Minifier",
        "Minify JavaScript to reduce file size.",
        "live",
        ["javascript minifier", "minify js online", "compress javascript"]
      ),
      tool(
        "beautifier",
        "JS Beautifier",
        "Beautify minified JavaScript.",
        "live",
        ["js beautifier", "beautify javascript online", "unminify javascript"]
      ),
      tool(
        "obfuscator",
        "JS Obfuscator",
        "Obfuscate JavaScript source code.",
        "live",
        ["javascript obfuscator", "obfuscate js online", "js code protection"]
      ),
      tool(
        "deobfuscator",
        "JS Deobfuscator",
        "Deobfuscate and clean up JavaScript.",
        "live",
        ["javascript deobfuscator", "deobfuscate js online", "unpack minified js"]
      ),
      tool(
        "playground",
        "JS Playground",
        "Run and test JavaScript in the browser.",
        "live",
        ["javascript playground", "run js online", "js code editor online"]
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
        "Format and beautify TypeScript code.",
        "live",
        ["typescript formatter", "format ts online", "ts beautifier"]
      ),
      tool(
        "playground",
        "TS Playground",
        "Run and test TypeScript in the browser.",
        "live",
        ["typescript playground", "run ts online", "typescript online compiler"]
      ),
      tool(
        "to-js",
        "TS to JS",
        "Transpile TypeScript into JavaScript.",
        "live",
        ["typescript to javascript", "ts to js converter", "transpile typescript online"]
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
        "Format and beautify Java code.",
        "live",
        ["java formatter", "format java online", "java code indenter"]
      ),
      tool("playground", "Java Playground", "Run and test Java code in the browser."),
      tool(
        "escape-unescape",
        "Java Escape/Unescape",
        "Escape or unescape Java strings.",
        "live",
        ["java string escape", "escape java string online", "unescape java string"]
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
        "Format and beautify Python code.",
        "live",
        ["python formatter", "format python online", "python code indenter"]
      ),
      tool(
        "minifier",
        "Python Minifier",
        "Minify Python source code.",
        "live",
        ["python minifier", "minify python online", "compress python code"]
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
        "Format and beautify PHP code.",
        "live",
        ["php formatter", "format php online", "php code indenter"]
      ),
      tool(
        "beautifier",
        "PHP Beautifier",
        "Beautify PHP with consistent style.",
        "live",
        ["php beautifier", "beautify php online"]
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
        "Format and beautify Rust code.",
        "live",
        ["rust formatter", "format rust online", "rust code indenter"]
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
        "Format and beautify Go code.",
        "live",
        ["go formatter", "golang formatter online", "format go code"]
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
        "Live-preview rendered Markdown.",
        "live",
        ["markdown preview", "markdown viewer online", "live markdown editor"]
      ),
      tool(
        "to-html",
        "Markdown to HTML",
        "Convert Markdown into HTML.",
        "live",
        ["markdown to html", "convert markdown to html", "md to html converter"]
      ),
      tool(
        "from-html",
        "HTML to Markdown",
        "Convert HTML into Markdown.",
        "live",
        ["html to markdown", "convert html to markdown", "html to md converter"]
      ),
      tool(
        "formatter",
        "Markdown Formatter",
        "Format and clean up Markdown.",
        "live",
        ["markdown formatter", "format markdown online", "clean up markdown"]
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
        "Validate email address syntax and catch common typos in domain names.",
        "live",
        ["email validator", "validate email address", "check email syntax", "email format checker"]
      ),
      tool(
        "header-analyzer",
        "Email Header Analyzer",
        "Analyze raw email headers to trace delivery hops and check SPF/DKIM/DMARC results.",
        "live",
        ["email header analyzer", "analyze email headers", "spf dkim dmarc checker", "email trace"]
      ),
      tool(
        "signature-generator",
        "Email Signature Generator",
        "Design a professional HTML email signature with live preview.",
        "live",
        ["email signature generator", "html email signature", "create email signature", "signature maker"]
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
        "Inspect HTTP response headers for any URL, including redirects and security headers.",
        "live",
        ["http header viewer", "check response headers", "http headers checker", "view website headers"]
      ),
      tool(
        "user-agent-parser",
        "User Agent Parser",
        "Parse a User-Agent string into browser, engine, OS, and device info.",
        "live",
        ["user agent parser", "ua string parser", "browser detector", "parse user agent online"]
      ),
      tool(
        "ip-lookup",
        "IP Lookup",
        "Look up geolocation, ISP, and organization info for any public IP address.",
        "live",
        ["ip lookup", "ip geolocation", "find ip location", "what is this ip address"]
      ),
      tool(
        "cidr-calculator",
        "CIDR Calculator",
        "Calculate network, broadcast, and usable host ranges from a CIDR block.",
        "live",
        ["cidr calculator", "cidr to ip range", "network address calculator", "cidr notation calculator"]
      ),
      tool(
        "subnet-calculator",
        "Subnet Calculator",
        "Calculate subnet masks, host ranges, and split a network into equal subnets.",
        "live",
        ["subnet calculator", "ip subnet calculator", "subnet mask calculator", "vlsm calculator"]
      ),
      tool(
        "port-lookup",
        "Port Lookup",
        "Look up the standard service and protocol for any well-known network port.",
        "live",
        ["port lookup", "port number lookup", "well known ports list", "what service uses this port"]
      ),
      tool(
        "dns-lookup",
        "DNS Lookup",
        "Query A, AAAA, MX, TXT, NS, CNAME, SOA, and CAA records for any domain.",
        "live",
        ["dns lookup", "dns record checker", "mx record lookup", "check dns records online"]
      ),
      tool(
        "whois-lookup",
        "WHOIS Lookup",
        "Look up domain registration, registrar, and name server info.",
        "live",
        ["whois lookup", "domain whois checker", "who owns this domain", "domain registration lookup"]
      ),
      tool("ping-tool", "Ping Tool", "Check host reachability and latency."),
      tool("traceroute", "Traceroute", "Trace the network path to a host."),
      tool(
        "random-ip",
        "Random IP Generator",
        "Generate random IPv4 or IPv6 addresses for test data, demos, and documentation.",
        "live",
        ["random ip generator", "generate random ip address", "fake ip generator", "random ipv4 generator"]
      ),
      tool(
        "random-mac-address",
        "Random MAC Address Generator",
        "Generate random MAC addresses with the locally-administered bit set, safe for test and demo use.",
        "live",
        ["random mac address generator", "generate random mac address", "fake mac address generator", "mac address generator online"]
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
        "Pick a color visually or from your screen and get its HEX, RGB, HSL, HSV, and CMYK codes instantly.",
        "live",
        ["color picker online", "html color picker", "eyedropper tool online", "pick color from screen"]
      ),
      tool(
        "hex-rgb",
        "HEX to RGB Converter",
        "Convert colors between HEX and RGB formats instantly, both ways.",
        "live",
        ["hex to rgb", "rgb to hex", "hex to rgb converter", "convert hex color to rgb"]
      ),
      tool(
        "rgb-hsl",
        "RGB to HSL Converter",
        "Convert colors between RGB and HSL formats instantly, both ways.",
        "live",
        ["rgb to hsl", "hsl to rgb", "rgb to hsl converter", "convert rgb color to hsl"]
      ),
      tool(
        "rgb-cmyk",
        "RGB to CMYK Converter",
        "Convert colors between RGB and CMYK formats for screen and print design.",
        "live",
        ["rgb to cmyk", "cmyk to rgb", "rgb to cmyk converter", "convert rgb to cmyk for print"]
      ),
      tool(
        "hex-cmyk",
        "HEX to CMYK Converter",
        "Convert colors between HEX and CMYK formats for screen and print design.",
        "live",
        ["hex to cmyk", "cmyk to hex", "hex to cmyk converter", "convert hex color to cmyk"]
      ),
      tool(
        "hex-hsv",
        "HEX to HSV Converter",
        "Convert colors between HEX and HSV (HSB) formats instantly, both ways.",
        "live",
        ["hex to hsv", "hsv to hex", "hex to hsb converter", "convert hex color to hsv"]
      ),
      tool(
        "gradient-generator",
        "Gradient Generator",
        "Design custom linear and radial CSS gradients with live preview and multi-color stops.",
        "live",
        ["css gradient generator", "linear gradient generator", "radial gradient generator", "gradient maker online"]
      ),
      tool(
        "palette-generator",
        "Palette Generator",
        "Generate complementary, analogous, triadic, and monochromatic color palettes from any base color.",
        "live",
        ["color palette generator", "color scheme generator", "generate color palette from color", "complementary color generator"]
      ),
      tool(
        "contrast-checker",
        "Contrast Checker",
        "Check the WCAG contrast ratio between two colors and see if it passes AA or AAA accessibility standards.",
        "live",
        ["color contrast checker", "wcag contrast checker", "contrast ratio calculator", "accessibility color checker"]
      ),
      tool(
        "color-blindness-simulator",
        "Color Blindness Simulator",
        "Preview colors and images as seen with protanopia, deuteranopia, tritanopia, or achromatopsia.",
        "live",
        ["color blindness simulator", "color vision deficiency simulator", "colorblind test image", "protanopia deuteranopia simulator"]
      ),
      tool(
        "random-color",
        "Random Color Generator",
        "Generate random HEX colors instantly, with the matching RGB value, one click to copy.",
        "live",
        ["random color generator", "random hex color generator", "generate random color", "random color picker"]
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
        "Generate a QR code from any text, URL, or content with adjustable error correction and instant PNG download.",
        "live",
        ["qr code generator", "generate qr code online", "url to qr code", "free qr code generator"]
      ),
      tool(
        "qr-scanner",
        "QR Scanner",
        "Scan and decode QR codes from an uploaded image directly in your browser \u2014 no app or camera required.",
        "live",
        ["qr code scanner online", "decode qr code from image", "read qr code online", "qr code reader"]
      ),
      tool(
        "wifi-qr",
        "Wi-Fi QR Generator",
        "Generate a QR code that lets phones join a Wi-Fi network instantly by scanning, without typing the password.",
        "live",
        ["wifi qr code generator", "wifi password qr code", "create wifi qr code", "share wifi with qr code"]
      ),
      tool(
        "vcard-qr",
        "vCard QR Generator",
        "Generate a QR code containing vCard contact info that phones can scan to save directly to contacts.",
        "live",
        ["vcard qr code generator", "contact qr code", "business card qr code", "digital business card qr"]
      ),
      tool(
        "barcode-generator",
        "Barcode Generator",
        "Generate Code 128, EAN-13, EAN-8, UPC-A, ITF-14, Codabar, and other common 1D barcode formats online.",
        "live",
        ["barcode generator online", "generate barcode", "code 128 generator", "ean-13 barcode generator"]
      ),
      tool(
        "barcode-reader",
        "Barcode Reader",
        "Decode Code 128, EAN, UPC, and other barcode formats from an uploaded image directly in your browser.",
        "live",
        ["barcode reader online", "decode barcode from image", "read barcode online", "barcode scanner online"]
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
        "Convert between Unix timestamps and human-readable dates, in seconds or milliseconds, with a live current timestamp.",
        "live",
        ["unix timestamp converter", "epoch converter", "timestamp to date", "current unix timestamp"]
      ),
      tool(
        "date-difference",
        "Date Difference",
        "Calculate the exact difference between two dates in years, months, days, hours, and total days or weeks.",
        "live",
        ["date difference calculator", "days between dates", "date calculator", "calculate difference between two dates"]
      ),
      tool(
        "age-calculator",
        "Age Calculator",
        "Calculate your exact age in years, months, and days from your birth date, plus days until your next birthday.",
        "live",
        ["age calculator", "calculate age from date of birth", "how old am i", "birthday countdown calculator"]
      ),
      tool(
        "timezone-converter",
        "Time Zone Converter",
        "Convert a date and time between any IANA time zones and compare across multiple cities at once.",
        "live",
        ["time zone converter", "convert time zones online", "world clock converter", "utc to local time converter"]
      ),
      tool(
        "cron-generator",
        "Cron Generator",
        "Visually build cron expressions with presets, a plain-English description, and the next 5 run times.",
        "live",
        ["cron expression generator", "cron job generator", "build cron expression", "crontab generator"]
      ),
      tool(
        "cron-parser",
        "Cron Parser",
        "Parse any cron expression into a plain-English description and see its next 5 scheduled run times.",
        "live",
        ["cron expression parser", "explain cron expression", "crontab parser", "what does this cron expression mean"]
      ),
      tool(
        "leap-year-checker",
        "Leap Year Checker",
        "Check whether any year is a leap year with a clear explanation, plus list all leap years in a range.",
        "live",
        ["leap year checker", "is this a leap year", "leap year calculator", "list of leap years"]
      ),
      tool(
        "random-date",
        "Random Date Generator",
        "Generate a random date within any year range, useful for test data and scheduling mockups.",
        "live",
        ["random date generator", "generate random date", "random date picker", "random date between two years"]
      ),
      tool(
        "random-time",
        "Random Time Generator",
        "Generate a random time of day in 24-hour or 12-hour AM/PM format.",
        "live",
        ["random time generator", "generate random time", "random clock time generator", "random time of day"]
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
        "Count words, characters, sentences, and paragraphs in any text, with estimated reading and speaking time.",
        "live",
        ["word counter online", "count words in text", "word count tool", "reading time calculator"]
      ),
      tool(
        "character-counter",
        "Character Counter",
        "Count characters in your text with a live limit tracker and a full breakdown of letters, digits, and spaces.",
        "live",
        ["character counter online", "count characters in text", "character count tool", "letter counter"]
      ),
      tool(
        "line-counter",
        "Line Counter",
        "Count total, empty, and non-empty lines in a block of text, plus find the longest line and average line length.",
        "live",
        ["line counter online", "count lines in text", "count lines of text", "line count tool"]
      ),
      tool(
        "duplicate-line-remover",
        "Duplicate Line Remover",
        "Remove duplicate lines from any list or text block, with case-sensitivity and whitespace-trimming options.",
        "live",
        ["remove duplicate lines", "duplicate line remover online", "delete duplicate lines", "unique lines tool"]
      ),
      tool(
        "diff",
        "Text Diff",
        "Compare two blocks of text side by side and highlight added, removed, and unchanged lines instantly.",
        "live",
        ["text diff tool", "compare two texts online", "text comparison tool", "diff checker online"]
      ),
      tool(
        "case-converter",
        "Case Converter",
        "Convert text between UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case, and more.",
        "live",
        ["case converter online", "text case converter", "camel case converter", "convert to title case"]
      ),
      tool(
        "reverse-text",
        "Reverse Text",
        "Reverse the characters, word order, or line order of any text instantly.",
        "live",
        ["reverse text online", "reverse text generator", "flip text online", "backwards text generator"]
      ),
      tool(
        "slug-generator",
        "Slug Generator",
        "Convert any title or text into a clean, URL-friendly slug with hyphens or underscores.",
        "live",
        ["slug generator online", "url slug generator", "text to slug", "generate url friendly slug"]
      ),
      tool(
        "lorem-ipsum",
        "Lorem Ipsum",
        "Generate placeholder Lorem Ipsum text by words, sentences, or paragraphs for mockups and designs.",
        "live",
        ["lorem ipsum generator", "generate placeholder text", "dummy text generator", "lorem ipsum text"]
      ),
      tool(
        "remove-extra-spaces",
        "Remove Extra Spaces",
        "Remove extra spaces, tabs, and blank lines from text, collapsing whitespace into clean, readable content.",
        "live",
        ["remove extra spaces online", "remove whitespace from text", "clean up text spacing", "trim extra spaces"]
      ),
      tool(
        "text-sorter",
        "Text Sorter",
        "Sort lines of text alphabetically, numerically, or by length, with options to remove duplicates and blanks.",
        "live",
        ["sort lines of text", "text sorter online", "alphabetize list online", "sort list alphabetically"]
      ),
      tool(
        "random-word",
        "Random Word Generator",
        "Generate random English words instantly \u2014 useful for word games, brainstorming, and test data.",
        "live",
        ["random word generator", "generate random word", "random word picker", "word generator online"]
      ),
      tool(
        "random-letter",
        "Random Letter Generator",
        "Generate a random letter from A to Z, in uppercase, lowercase, or mixed case.",
        "live",
        ["random letter generator", "generate random letter", "random alphabet generator", "pick random letter a-z"]
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
        "Calculate percentages, find what percent one number is of another, or calculate percentage increase/decrease.",
        "live",
        ["percentage calculator", "calculate percentage online", "percentage increase calculator", "what percent is x of y"]
      ),
      tool(
        "percentage-difference",
        "Percentage Difference",
        "Calculate the percentage difference and percentage change between any two numbers.",
        "live",
        ["percentage difference calculator", "percent change calculator", "calculate percentage difference between two numbers", "percentage variance calculator"]
      ),
      tool(
        "scientific-calculator",
        "Scientific Calculator",
        "A full scientific calculator with trigonometric, logarithmic, and power functions, plus calculation history.",
        "live",
        ["scientific calculator online", "online calculator with functions", "free scientific calculator", "trigonometry calculator online"]
      ),
      tool(
        "bmi-calculator",
        "BMI Calculator",
        "Calculate your Body Mass Index (BMI) from your height and weight in metric or imperial units.",
        "live",
        ["bmi calculator", "calculate body mass index", "bmi calculator online", "healthy weight calculator"]
      ),
      tool(
        "unit-converter",
        "Unit Converter",
        "Convert between units of length, weight, temperature, volume, area, and speed instantly.",
        "live",
        ["unit converter online", "convert units of measurement", "metric to imperial converter", "length weight temperature converter"]
      ),
      tool(
        "currency-converter",
        "Currency Converter",
        "Convert between world currencies using live, daily-updated exchange rates from the European Central Bank.",
        "live",
        ["currency converter online", "live exchange rate converter", "convert currency online", "foreign exchange calculator"]
      ),
      tool(
        "decimal-binary",
        "Decimal \u2194 Binary",
        "Convert numbers between decimal (base 10) and binary (base 2) instantly, both directions.",
        "live",
        ["decimal to binary converter", "binary to decimal converter", "convert decimal to binary", "binary converter online"]
      ),
      tool(
        "decimal-hex",
        "Decimal \u2194 Hex",
        "Convert numbers between decimal (base 10) and hexadecimal (base 16) instantly, both directions.",
        "live",
        ["decimal to hex converter", "hex to decimal converter", "convert decimal to hexadecimal", "hexadecimal converter online"]
      ),
      tool(
        "decimal-octal",
        "Decimal \u2194 Octal",
        "Convert numbers between decimal (base 10) and octal (base 8) instantly, both directions.",
        "live",
        ["decimal to octal converter", "octal to decimal converter", "convert decimal to octal", "octal converter online"]
      ),
      tool(
        "roman-numeral",
        "Roman Numeral Converter",
        "Convert numbers to Roman numerals and Roman numerals back to numbers, from 1 to 3999.",
        "live",
        ["roman numeral converter", "convert to roman numerals", "roman numeral to number", "roman numeral generator"]
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
        "Validate a docker-compose.yml file's structure, services, ports, and volumes.",
        "live",
        ["docker compose validator", "validate docker-compose.yml", "docker compose syntax checker", "compose file linter"]
      ),
      tool(
        "dockerfile-linter",
        "Dockerfile Linter",
        "Lint a Dockerfile for common mistakes, security issues, and best-practice violations.",
        "live",
        ["dockerfile linter", "dockerfile best practices checker", "docker build linter", "hadolint alternative online"]
      ),
      tool(
        "kubernetes-yaml-validator",
        "Kubernetes YAML Validator",
        "Validate Kubernetes manifests for required fields, selector/label matching, and resource formats.",
        "live",
        ["kubernetes yaml validator", "k8s manifest validator", "validate kubernetes yaml online", "kubectl dry run alternative"]
      ),
      tool(
        "kubernetes-manifest-generator",
        "Kubernetes Manifest Generator",
        "Generate Deployment, Service, ConfigMap, and Secret YAML manifests from a simple form.",
        "live",
        ["kubernetes manifest generator", "generate k8s yaml", "deployment yaml generator", "kubernetes service yaml generator"]
      ),
      tool(
        "helm-values-formatter",
        "Helm Values Formatter",
        "Format and re-indent a Helm values.yaml file consistently.",
        "live",
        ["helm values formatter", "format values.yaml", "helm yaml formatter", "helm chart values beautifier"]
      ),
      tool(
        "nginx-config-tester",
        "Nginx Config Tester",
        "Check an nginx configuration for brace, semicolon, and common directive mistakes.",
        "live",
        ["nginx config tester", "nginx config syntax checker", "validate nginx.conf online", "nginx -t alternative"]
      ),
      tool(
        "apache-config-formatter",
        "Apache Config Formatter",
        "Format Apache httpd.conf and .htaccess files with consistent block indentation.",
        "live",
        ["apache config formatter", "format httpd.conf", "htaccess formatter", "apache virtualhost formatter"]
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
        "Break an AWS ARN down into partition, service, region, account ID, and resource.",
        "live",
        ["aws arn parser", "parse arn online", "aws resource name breakdown", "arn format checker"]
      ),
      tool(
        "aws-iam-policy-formatter",
        "AWS IAM Policy Formatter",
        "Format an IAM policy document and check statements for common mistakes.",
        "live",
        ["aws iam policy formatter", "iam policy validator", "format iam policy json", "aws policy checker"]
      ),
      tool(
        "aws-cron-converter",
        "AWS Cron Converter",
        "Convert between standard Unix cron and AWS's 6-field EventBridge/CloudWatch cron format.",
        "live",
        ["aws cron converter", "cloudwatch cron expression", "eventbridge cron format", "unix cron to aws cron"]
      ),
      tool(
        "s3-url-parser",
        "S3 URL Parser",
        "Parse S3 URLs into bucket, key, and region, or build S3 URLs from bucket and key.",
        "live",
        ["s3 url parser", "parse s3 bucket url", "s3 url generator", "s3 path style vs virtual hosted"]
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
        "Build an OAuth 2.0 authorization URL with client ID, scope, state, and PKCE parameters.",
        "live",
        ["oauth url builder", "oauth 2.0 authorization url generator", "build oauth login url", "oauth query params generator"]
      ),
      tool(
        "pkce-generator",
        "PKCE Generator",
        "Generate a PKCE code_verifier and code_challenge pair for OAuth 2.0 authorization code flow.",
        "live",
        ["pkce generator", "code verifier code challenge generator", "oauth pkce online", "generate code challenge s256"]
      ),
      tool(
        "totp-generator",
        "TOTP Generator",
        "Generate live, time-based one-time passwords (RFC 6238) from a Base32 secret.",
        "live",
        ["totp generator", "time based one time password generator", "google authenticator code generator online", "2fa code generator"]
      ),
      tool(
        "api-key-generator",
        "API Key Generator",
        "Generate cryptographically random API keys with a custom prefix and length.",
        "live",
        ["api key generator", "generate secret key online", "random api key generator", "sk_live key generator"]
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
        "Look up the meaning of any HTTP status code, from 100 to 511.",
        "live",
        ["http status code lookup", "http status codes list", "what does status code 404 mean", "http response code reference"]
      ),
      tool(
        "mime-type-lookup",
        "MIME Type Lookup",
        "Look up the MIME type for a file extension, or the extension for a MIME type.",
        "live",
        ["mime type lookup", "file extension to mime type", "content-type lookup", "mime types list"]
      ),
      tool(
        "mime-detector",
        "MIME Detector",
        "Detect a file's real MIME type from its content (magic bytes), not just its extension.",
        "live",
        ["mime detector", "detect file type from content", "magic bytes checker", "file signature lookup"]
      ),
      tool(
        "csp-generator",
        "CSP Generator",
        "Build a Content-Security-Policy header with a form for each directive.",
        "live",
        ["csp generator", "content security policy generator", "build csp header", "csp header builder online"]
      ),
      tool(
        "cors-header-generator",
        "CORS Header Generator",
        "Generate Access-Control-Allow-Origin and related CORS response headers.",
        "live",
        ["cors header generator", "access-control-allow-origin generator", "generate cors headers", "cors config builder"]
      ),
      tool(
        "csp-validator",
        "CSP Validator",
        "Validate a Content-Security-Policy header and flag unsafe or misconfigured directives.",
        "live",
        ["csp validator", "content security policy checker", "validate csp header online", "csp header analyzer"]
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
        "Pretty-print MongoDB shell queries, filters, and aggregation pipelines.",
        "live",
        ["mongodb query formatter", "format mongo query online", "mongodb pretty print", "aggregation pipeline formatter"]
      ),
      tool(
        "mongodb-objectid-generator",
        "MongoDB ObjectId Generator",
        "Generate valid MongoDB ObjectIds and decode their embedded creation timestamp.",
        "live",
        ["mongodb objectid generator", "generate objectid online", "decode objectid timestamp", "bson objectid generator"]
      ),
      tool(
        "redis-command-builder",
        "Redis Command Builder",
        "Build common Redis CLI commands like SET, HSET, LPUSH, and ZADD from a form.",
        "live",
        ["redis command builder", "redis cli command generator", "build redis command online", "redis syntax helper"]
      ),
      tool(
        "postgresql-formatter",
        "PostgreSQL Formatter",
        "Format PostgreSQL queries with proper indentation and keyword casing.",
        "live",
        ["postgresql formatter", "format postgres query", "postgresql sql beautifier", "pretty print postgresql"]
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
        "Clean up LLM prompts by trimming whitespace, collapsing blank lines, and normalizing smart quotes.",
        "live",
        ["prompt formatter", "clean up chatgpt prompt", "format llm prompt online", "prompt cleanup tool"]
      ),
      tool(
        "prompt-token-counter",
        "Prompt Token Counter",
        "Count the exact number of GPT tokens in a prompt using OpenAI's real tokenizer.",
        "live",
        ["prompt token counter", "gpt token counter", "count openai tokens", "chatgpt token calculator"]
      ),
      tool(
        "openai-schema-validator",
        "OpenAI JSON Schema Validator",
        "Validate a JSON Schema against OpenAI's structured outputs and strict function-calling constraints.",
        "live",
        ["openai json schema validator", "structured outputs validator", "openai strict mode schema checker", "function calling schema validator"]
      ),
      tool(
        "embedding-token-counter",
        "Embedding Token Counter",
        "Count tokens for OpenAI embedding models and check against the 8,191-token input limit.",
        "live",
        ["embedding token counter", "text-embedding-3 token limit", "openai embedding token count", "embedding input limit checker"]
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
        "Generate random fictional full names for mock data, placeholders, and test accounts.",
        "live",
        ["random name generator", "fake name generator", "generate random name", "random full name generator"]
      ),
      tool(
        "random-username",
        "Random Username Generator",
        "Generate unique-sounding random usernames by combining adjectives, nouns, and numbers.",
        "live",
        ["random username generator", "generate random username", "unique username generator", "username idea generator"]
      ),
      tool(
        "random-nickname",
        "Random Nickname Generator",
        "Generate playful random nicknames and gamertags by combining adjectives with animal names.",
        "live",
        ["random nickname generator", "gamertag generator", "generate random nickname", "cool nickname generator"]
      ),
      tool(
        "random-emoji",
        "Random Emoji Generator",
        "Generate random emoji from a curated set of faces, animals, food, and objects.",
        "live",
        ["random emoji generator", "generate random emoji", "random emoji picker", "emoji generator online"]
      ),
      tool(
        "random-credit-card",
        "Random Credit Card Number Generator",
        "Generate fake, Luhn-valid credit card numbers for testing checkout forms and payment validators. Not real, not usable for purchases.",
        "live",
        ["random credit card generator", "fake credit card generator", "test credit card number generator", "luhn valid card number generator"]
      ),
      tool(
        "random-phone-number",
        "Random Phone Number Generator",
        "Generate fake phone numbers for testing, using officially reserved fictional ranges where available.",
        "live",
        ["random phone number generator", "fake phone number generator", "generate random phone number", "test phone number generator"]
      ),
      tool(
        "random-address",
        "Random Address Generator",
        "Generate fake street addresses for testing forms and mock data. Not real locations.",
        "live",
        ["random address generator", "fake address generator", "generate random address", "test address generator"]
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
        "Generate a random animal from a list of 50 wild and domestic species \u2014 fun for games and icebreakers.",
        "live",
        ["random animal generator", "generate random animal", "random animal picker", "animal name generator"]
      ),
      tool(
        "random-country",
        "Random Country Generator",
        "Generate a random country complete with its flag emoji \u2014 great for travel inspiration and geography quizzes.",
        "live",
        ["random country generator", "generate random country", "random country picker", "pick a random country"]
      ),
      tool(
        "random-city",
        "Random City Generator",
        "Generate a random major city from around the world for travel ideas and geography practice.",
        "live",
        ["random city generator", "generate random city", "random city picker", "pick a random city"]
      ),
      tool(
        "random-food",
        "Random Food Generator",
        "Can't decide what to eat? Generate a random dish from around the world for dinner inspiration.",
        "live",
        ["random food generator", "what should i eat generator", "generate random food", "random meal generator"]
      ),
      tool(
        "random-fruit",
        "Random Fruit Generator",
        "Generate a random fruit from a list of 35 fruits from around the world.",
        "live",
        ["random fruit generator", "generate random fruit", "random fruit picker", "fruit name generator"]
      ),
      tool(
        "random-vegetable",
        "Random Vegetable Generator",
        "Generate a random vegetable \u2014 handy for meal planning and healthy-eating challenges.",
        "live",
        ["random vegetable generator", "generate random vegetable", "random vegetable picker", "vegetable name generator"]
      ),
      tool(
        "random-drink",
        "Random Drink Generator",
        "Generate a random non-alcoholic drink or beverage idea in seconds.",
        "live",
        ["random drink generator", "generate random drink", "random beverage generator", "what should i drink generator"]
      ),
      tool(
        "random-movie",
        "Random Movie Generator",
        "Generate a random movie from a curated list of well-known films across genres \u2014 perfect for deciding what to watch.",
        "live",
        ["random movie generator", "what movie should i watch generator", "generate random movie", "movie picker online"]
      ),
      tool(
        "random-tv-show",
        "Random TV Show Generator",
        "Generate a random TV show from a curated list of popular series across genres \u2014 great for your next binge.",
        "live",
        ["random tv show generator", "what show should i watch generator", "generate random tv show", "tv show picker online"]
      ),
      tool(
        "random-book",
        "Random Book Generator",
        "Generate a random book from a curated list of classic and popular titles \u2014 a fun way to find your next read.",
        "live",
        ["random book generator", "what book should i read generator", "generate random book", "book picker online"]
      ),
      tool(
        "random-game",
        "Random Game Generator",
        "Generate a random video game from a curated list across genres and platforms \u2014 great for deciding what to play.",
        "live",
        ["random game generator", "what game should i play generator", "generate random video game", "game picker online"]
      ),
      tool(
        "random-pokemon",
        "Random Pokemon Generator",
        "Generate a random Pokemon from the original Generation I lineup \u2014 a fun, unofficial fan tool.",
        "live",
        ["random pokemon generator", "generate random pokemon", "random pokemon picker", "pokemon name generator"]
      ),
      tool(
        "random-dinosaur",
        "Random Dinosaur Generator",
        "Generate a random dinosaur species name \u2014 fun for classroom projects and trivia nights.",
        "live",
        ["random dinosaur generator", "generate random dinosaur", "random dinosaur picker", "dinosaur name generator"]
      ),
      tool(
        "random-bird",
        "Random Bird Generator",
        "Generate a random bird species name \u2014 great for birdwatching lists and trivia games.",
        "live",
        ["random bird generator", "generate random bird", "random bird picker", "bird name generator"]
      ),
      tool(
        "random-flag",
        "Random Flag Generator",
        "Generate random country flags with their names \u2014 fun for geography quizzes and flag-guessing games.",
        "live",
        ["random flag generator", "generate random flag", "random country flag generator", "flag guessing game"]
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
        "Create a custom spinning wheel from your own list of options and let it randomly pick a winner.",
        "live",
        ["spin the wheel", "random wheel spinner", "wheel of names", "decision wheel online"]
      ),
      tool(
        "yes-or-no",
        "Yes or No Generator",
        "Get an instant random Yes or No answer to any question \u2014 with a running history and tally.",
        "live",
        ["yes or no generator", "random yes or no", "yes no wheel", "decision maker yes or no"]
      ),
      tool(
        "coin-flip",
        "Coin Flip",
        "Flip a virtual coin online with an animated flip, plus a running heads/tails tally.",
        "live",
        ["coin flip online", "flip a coin", "heads or tails generator", "virtual coin flip"]
      ),
      tool(
        "dice-roller",
        "Dice Roller",
        "Roll one or more virtual dice online \u2014 D4, D6, D8, D10, D12, or D20, with an automatic total.",
        "live",
        ["dice roller online", "roll a dice", "virtual dice roller", "roll dice online"]
      ),
      tool(
        "number-picker",
        "Number Picker",
        "Pick a single random number from any range \u2014 a quick decision-maker with an option to avoid recent repeats.",
        "live",
        ["random number picker", "pick a random number", "number picker wheel", "spin a number generator"]
      ),
      tool(
        "team-generator",
        "Team Generator",
        "Randomly split a list of names into balanced teams for games, classrooms, or work groups.",
        "live",
        ["random team generator", "team generator online", "split into random teams", "group generator online"]
      ),
      tool(
        "random-picker",
        "Random Picker",
        "Pick one random item from your own custom list, with an option to remove picks so nothing repeats.",
        "live",
        ["random picker online", "pick random item from list", "random choice generator", "random name picker"]
      ),
      tool(
        "secret-santa-generator",
        "Secret Santa Generator",
        "Generate random Secret Santa gift-giving pairs from a list of names, with private tap-to-reveal cards.",
        "live",
        ["secret santa generator", "secret santa name picker", "secret santa pairing generator", "gift exchange generator"]
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
        "Calculate your monthly loan EMI, total interest, and total payment using the standard reducing-balance formula.",
        "live",
        ["emi calculator", "loan emi calculator", "calculate emi online", "monthly installment calculator"]
      ),
      tool(
        "loan-eligibility",
        "Loan Eligibility Calculator",
        "Estimate how much loan you're eligible for based on your income, existing EMIs, and the lender's FOIR limit.",
        "live",
        ["loan eligibility calculator", "how much loan can i get", "loan eligibility check", "max loan amount calculator"]
      ),
      tool(
        "loan-affordability",
        "Loan Affordability Calculator",
        "Work backwards from your monthly EMI budget to see how much loan you can comfortably afford.",
        "live",
        ["loan affordability calculator", "how much loan can i afford", "affordable loan amount calculator", "emi budget calculator"]
      ),
      tool(
        "loan-comparison",
        "Loan Comparison Calculator",
        "Compare two or more loan offers side by side by EMI, total interest, and total repayment.",
        "live",
        ["loan comparison calculator", "compare loan offers", "compare emi rates", "best loan offer calculator"]
      ),
      tool(
        "loan-prepayment",
        "Loan Prepayment Calculator",
        "See how much time and interest a lump-sum loan prepayment can save you.",
        "live",
        ["loan prepayment calculator", "part payment calculator", "prepayment interest saved calculator", "foreclosure calculator"]
      ),
      tool(
        "car-loan",
        "Car Loan Calculator",
        "Calculate your car loan EMI including down payment, with a full amortization schedule.",
        "live",
        ["car loan calculator", "car loan emi calculator", "auto loan calculator", "vehicle loan emi calculator"]
      ),
      tool(
        "bike-loan",
        "Bike Loan Calculator",
        "Calculate your two-wheeler loan EMI including down payment, with a full amortization schedule.",
        "live",
        ["bike loan calculator", "bike loan emi calculator", "two wheeler loan calculator", "motorcycle loan calculator"]
      ),
      tool(
        "home-loan",
        "Home Loan Calculator",
        "Calculate your home loan EMI, total interest, and a full yearly amortization schedule.",
        "live",
        ["home loan calculator", "home loan emi calculator", "mortgage emi calculator", "housing loan calculator"]
      ),
      tool(
        "education-loan",
        "Education Loan Calculator",
        "Calculate your education loan EMI, including an optional moratorium (grace) period during your studies.",
        "live",
        ["education loan calculator", "student loan emi calculator", "education loan emi with moratorium", "study loan calculator"]
      ),
      tool(
        "personal-loan",
        "Personal Loan Calculator",
        "Calculate your personal loan EMI, total interest, and total payment.",
        "live",
        ["personal loan calculator", "personal loan emi calculator", "calculate personal loan emi", "unsecured loan calculator"]
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
        "Estimate the future value of a monthly SIP investment based on your expected rate of return.",
        "live",
        ["sip calculator", "sip return calculator", "mutual fund sip calculator", "monthly sip calculator"]
      ),
      tool(
        "swp-calculator",
        "SWP Calculator",
        "See how long your investment corpus will last with a Systematic Withdrawal Plan, or your balance after N years.",
        "live",
        ["swp calculator", "systematic withdrawal plan calculator", "swp return calculator", "monthly withdrawal plan calculator"]
      ),
      tool(
        "lumpsum-calculator",
        "Lumpsum Calculator",
        "Estimate the future value of a one-time lumpsum investment at a given rate of return.",
        "live",
        ["lumpsum calculator", "lumpsum investment calculator", "lumpsum return calculator", "one time investment calculator"]
      ),
      tool(
        "step-up-sip",
        "Step-up SIP Calculator",
        "Estimate SIP returns when you increase your monthly investment by a fixed percentage every year.",
        "live",
        ["step up sip calculator", "top up sip calculator", "increasing sip calculator", "annual step up sip calculator"]
      ),
      tool(
        "cagr-calculator",
        "CAGR Calculator",
        "Calculate the Compound Annual Growth Rate between an initial and final investment value.",
        "live",
        ["cagr calculator", "compound annual growth rate calculator", "calculate cagr online", "annual growth rate calculator"]
      ),
      tool(
        "xirr-calculator",
        "XIRR Calculator",
        "Calculate the annualized return (XIRR) of investments with irregular cash flows and dates.",
        "live",
        ["xirr calculator", "xirr calculator online", "calculate xirr", "irregular cash flow return calculator"]
      ),
      tool(
        "irr-calculator",
        "IRR Calculator",
        "Calculate the Internal Rate of Return for a series of regular periodic cash flows.",
        "live",
        ["irr calculator", "internal rate of return calculator", "calculate irr online", "irr calculator online"]
      ),
      tool(
        "roi-calculator",
        "ROI Calculator",
        "Calculate your Return on Investment, with an optional annualized return based on your holding period.",
        "live",
        ["roi calculator", "return on investment calculator", "calculate roi online", "roi percentage calculator"]
      ),
      tool(
        "mutual-fund-returns",
        "Mutual Fund Returns Calculator",
        "Calculate your mutual fund's absolute and annualized returns from units held and NAV values.",
        "live",
        ["mutual fund returns calculator", "mutual fund return calculator", "nav return calculator", "mutual fund profit calculator"]
      ),
      tool(
        "stock-average-price",
        "Stock Average Price Calculator",
        "Calculate your average buy price across multiple stock purchases, plus profit or loss at the current price.",
        "live",
        ["stock average price calculator", "average share price calculator", "average down calculator stocks", "stock cost average calculator"]
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
