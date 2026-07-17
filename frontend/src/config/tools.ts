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
      tool("viewer", "CSV Viewer", "View CSV files as a formatted table."),
      tool("formatter", "CSV Formatter", "Format and clean up CSV data."),
      tool("to-json", "CSV to JSON", "Convert CSV data into JSON."),
      tool("to-xml", "CSV to XML", "Convert CSV data into XML."),
      tool("to-excel", "CSV to Excel", "Convert CSV into an Excel workbook."),
      tool("cleaner", "CSV Cleaner", "Clean and normalize messy CSV data."),
      tool("diff", "CSV Diff", "Compare two CSV files and highlight differences."),
    ],
  },
  {
    slug: "sql",
    title: "SQL",
    icon: "\u{1F5C4}",
    description: "Format, minify, validate, and convert SQL queries online.",
    tools: [
      tool("formatter", "SQL Formatter", "Format and beautify SQL queries."),
      tool("minifier", "SQL Minifier", "Minify SQL by removing whitespace and comments."),
      tool("beautifier", "SQL Beautifier", "Beautify SQL with consistent style."),
      tool("validator", "SQL Validator", "Validate SQL syntax."),
      tool("query-builder", "SQL Query Builder", "Build SQL queries visually."),
      tool("uppercase", "SQL Keywords Uppercase", "Convert SQL keywords to uppercase."),
      tool("lowercase", "SQL Keywords Lowercase", "Convert SQL keywords to lowercase."),
      tool("to-json", "SQL to JSON", "Convert SQL result sets into JSON."),
      tool("from-json", "JSON to SQL", "Generate SQL insert statements from JSON."),
    ],
  },
  {
    slug: "security",
    title: "Security",
    icon: "\u{1F510}",
    description: "Encode, decode, hash, and generate secure tokens and passwords online.",
    tools: [
      tool("base64-encode", "Base64 Encode", "Encode text or files into Base64."),
      tool("base64-decode", "Base64 Decode", "Decode Base64 back into text or files."),
      tool("url-encode", "URL Encode", "Percent-encode text for safe use in URLs."),
      tool("url-decode", "URL Decode", "Decode percent-encoded URL strings."),
      tool("jwt-decoder", "JWT Decoder", "Decode and inspect JSON Web Tokens."),
      tool("jwt-generator", "JWT Generator", "Generate signed JSON Web Tokens."),
      tool("md5", "MD5 Generator", "Generate MD5 hashes from text."),
      tool("sha1", "SHA1 Generator", "Generate SHA-1 hashes from text."),
      tool("sha256", "SHA256 Generator", "Generate SHA-256 hashes from text."),
      tool("sha512", "SHA512 Generator", "Generate SHA-512 hashes from text."),
      tool("hmac", "HMAC Generator", "Generate HMAC signatures with a secret key."),
      tool("bcrypt", "Bcrypt Generator", "Hash passwords using bcrypt."),
      tool("password-generator", "Password Generator", "Generate strong, random passwords."),
      tool("password-strength", "Password Strength Checker", "Check how strong a password is."),
      tool("random-token", "Random Token Generator", "Generate cryptographically random tokens."),
    ],
  },
  {
    slug: "ids",
    title: "IDs",
    icon: "\u{1F194}",
    description: "Generate UUIDs, GUIDs, and random identifiers online.",
    tools: [
      tool("uuid-v1", "UUID v1", "Generate time-based UUID v1 identifiers."),
      tool("uuid-v4", "UUID v4", "Generate random UUID v4 identifiers."),
      tool("uuid-v7", "UUID v7", "Generate sortable, time-ordered UUID v7 identifiers."),
      tool("guid", "GUID Generator", "Generate GUIDs."),
      tool("nano-id", "Nano ID", "Generate compact, URL-safe Nano IDs."),
      tool("random-string", "Random String", "Generate random strings."),
      tool("random-number", "Random Number", "Generate random numbers within a range."),
      tool("random-password", "Random Password", "Generate random secure passwords."),
    ],
  },
  {
    slug: "html",
    title: "HTML",
    icon: "\u{1F310}",
    description: "Format, minify, encode, decode, and preview HTML online.",
    tools: [
      tool("formatter", "HTML Formatter", "Format and indent HTML markup."),
      tool("minifier", "HTML Minifier", "Minify HTML by removing whitespace and comments."),
      tool("encoder", "HTML Encoder", "Encode text into HTML entities."),
      tool("decoder", "HTML Decoder", "Decode HTML entities back into text."),
      tool("preview", "HTML Preview", "Live-preview rendered HTML."),
      tool("escape", "HTML Escape", "Escape HTML special characters."),
    ],
  },
  {
    slug: "css",
    title: "CSS",
    icon: "\u{1F3A8}",
    description: "Format, minify, and generate CSS with visual tools.",
    tools: [
      tool("formatter", "CSS Formatter", "Format and beautify CSS."),
      tool("minifier", "CSS Minifier", "Minify CSS to reduce file size."),
      tool("beautifier", "CSS Beautifier", "Beautify CSS with consistent style."),
      tool("grid-generator", "CSS Grid Generator", "Visually design CSS Grid layouts."),
      tool("flexbox-generator", "Flexbox Generator", "Visually design Flexbox layouts."),
      tool("border-radius-generator", "Border Radius Generator", "Design custom border-radius shapes."),
      tool("box-shadow-generator", "Box Shadow Generator", "Design CSS box shadows visually."),
      tool("text-shadow-generator", "Text Shadow Generator", "Design CSS text shadows visually."),
      tool("gradient-generator", "CSS Gradient Generator", "Design linear and radial CSS gradients."),
      tool("clip-path-generator", "CSS Clip Path Generator", "Design custom CSS clip-path shapes."),
    ],
  },
  {
    slug: "javascript",
    title: "JavaScript",
    icon: "\u26A1",
    description: "Format, minify, obfuscate, and run JavaScript online.",
    tools: [
      tool("formatter", "JS Formatter", "Format and beautify JavaScript code."),
      tool("minifier", "JS Minifier", "Minify JavaScript to reduce file size."),
      tool("beautifier", "JS Beautifier", "Beautify minified JavaScript."),
      tool("obfuscator", "JS Obfuscator", "Obfuscate JavaScript source code."),
      tool("deobfuscator", "JS Deobfuscator", "Deobfuscate and clean up JavaScript."),
      tool("playground", "JS Playground", "Run and test JavaScript in the browser."),
    ],
  },
  {
    slug: "typescript",
    title: "TypeScript",
    icon: "\u{1F7E8}",
    description: "Format, run, and convert TypeScript code online.",
    tools: [
      tool("formatter", "TS Formatter", "Format and beautify TypeScript code."),
      tool("playground", "TS Playground", "Run and test TypeScript in the browser."),
      tool("to-js", "TS to JS", "Transpile TypeScript into JavaScript."),
    ],
  },
  {
    slug: "java",
    title: "Java",
    icon: "\u2615",
    description: "Format, run, and escape Java code online.",
    tools: [
      tool("formatter", "Java Formatter", "Format and beautify Java code."),
      tool("playground", "Java Playground", "Run and test Java code in the browser."),
      tool("escape-unescape", "Java Escape/Unescape", "Escape or unescape Java strings."),
    ],
  },
  {
    slug: "python",
    title: "Python",
    icon: "\u{1F40D}",
    description: "Format and minify Python code online.",
    tools: [
      tool("formatter", "Python Formatter", "Format and beautify Python code."),
      tool("minifier", "Python Minifier", "Minify Python source code."),
    ],
  },
  {
    slug: "php",
    title: "PHP",
    icon: "\u{1F418}",
    description: "Format and beautify PHP code online.",
    tools: [
      tool("formatter", "PHP Formatter", "Format and beautify PHP code."),
      tool("beautifier", "PHP Beautifier", "Beautify PHP with consistent style."),
    ],
  },
  {
    slug: "rust",
    title: "Rust",
    icon: "\u{1F980}",
    description: "Format Rust source code online.",
    tools: [tool("formatter", "Rust Formatter", "Format and beautify Rust code.")],
  },
  {
    slug: "go",
    title: "Go",
    icon: "\u{1F439}",
    description: "Format Go source code online.",
    tools: [tool("formatter", "Go Formatter", "Format and beautify Go code.")],
  },
  {
    slug: "markdown",
    title: "Markdown",
    icon: "\u{1F9FE}",
    description: "Preview, format, and convert Markdown documents online.",
    tools: [
      tool("preview", "Markdown Preview", "Live-preview rendered Markdown."),
      tool("to-html", "Markdown to HTML", "Convert Markdown into HTML."),
      tool("from-html", "HTML to Markdown", "Convert HTML into Markdown."),
      tool("formatter", "Markdown Formatter", "Format and clean up Markdown."),
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
      tool("validator", "Email Validator", "Validate email address syntax."),
      tool("header-analyzer", "Email Header Analyzer", "Analyze raw email headers for routing and spam info."),
      tool("signature-generator", "Email Signature Generator", "Design a professional email signature."),
    ],
  },
  {
    slug: "networking",
    title: "Networking",
    icon: "\u{1F310}",
    description: "Look up IPs, DNS, WHOIS, subnets, and analyze HTTP headers and user agents.",
    tools: [
      tool("http-header-viewer", "HTTP Header Viewer", "Inspect HTTP response headers for any URL."),
      tool("user-agent-parser", "User Agent Parser", "Parse a User-Agent string into browser/OS/device info."),
      tool("ip-lookup", "IP Lookup", "Look up geolocation and ownership info for an IP address."),
      tool("cidr-calculator", "CIDR Calculator", "Calculate CIDR ranges and subnet details."),
      tool("subnet-calculator", "Subnet Calculator", "Calculate subnet masks and host ranges."),
      tool("port-lookup", "Port Lookup", "Look up common services for a network port."),
      tool("dns-lookup", "DNS Lookup", "Query DNS records for a domain."),
      tool("whois-lookup", "WHOIS Lookup", "Look up domain registration/WHOIS info."),
      tool("ping-tool", "Ping Tool", "Check host reachability and latency."),
      tool("traceroute", "Traceroute", "Trace the network path to a host."),
    ],
  },
  {
    slug: "colors",
    title: "Colors",
    icon: "\u{1F3A8}",
    description: "Pick, convert, and generate color palettes and gradients online.",
    tools: [
      tool("picker", "Color Picker", "Pick colors and get their codes in multiple formats."),
      tool("hex-rgb", "HEX \u2194 RGB", "Convert between HEX and RGB color formats."),
      tool("rgb-hsl", "RGB \u2194 HSL", "Convert between RGB and HSL color formats."),
      tool("rgb-cmyk", "RGB \u2194 CMYK", "Convert between RGB and CMYK color formats."),
      tool("hex-cmyk", "HEX \u2194 CMYK", "Convert between HEX and CMYK color formats."),
      tool("hex-hsv", "HEX \u2194 HSV", "Convert between HEX and HSV color formats."),
      tool("gradient-generator", "Gradient Generator", "Design custom color gradients."),
      tool("palette-generator", "Palette Generator", "Generate harmonious color palettes."),
      tool("contrast-checker", "Contrast Checker", "Check color contrast ratios for accessibility."),
      tool("color-blindness-simulator", "Color Blindness Simulator", "Preview colors as seen with color blindness."),
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
      tool("qr-generator", "QR Code Generator", "Generate a QR code from text, a URL, or contact info."),
      tool("qr-scanner", "QR Scanner", "Scan and decode QR codes from an image."),
      tool("wifi-qr", "Wi-Fi QR Generator", "Generate a QR code that connects to a Wi-Fi network."),
      tool("vcard-qr", "vCard QR Generator", "Generate a QR code containing vCard contact info."),
      tool("barcode-generator", "Barcode Generator", "Generate common barcode formats."),
      tool("barcode-reader", "Barcode Reader", "Decode barcodes from an image."),
    ],
  },
  {
    slug: "date-time",
    title: "Date & Time",
    icon: "\u{1F4C5}",
    description: "Convert timestamps, calculate date differences, and work with cron schedules online.",
    tools: [
      tool("unix-timestamp", "Unix Timestamp", "Convert between Unix timestamps and human-readable dates."),
      tool("date-difference", "Date Difference", "Calculate the difference between two dates."),
      tool("age-calculator", "Age Calculator", "Calculate exact age from a birth date."),
      tool("timezone-converter", "Time Zone Converter", "Convert times between time zones."),
      tool("cron-generator", "Cron Generator", "Build cron expressions visually."),
      tool("cron-parser", "Cron Parser", "Parse and explain cron expressions in plain English."),
      tool("leap-year-checker", "Leap Year Checker", "Check whether a year is a leap year."),
    ],
  },
  {
    slug: "text",
    title: "Text",
    icon: "\u{1F4DD}",
    description: "Count, clean, diff, and transform text online.",
    tools: [
      tool("word-counter", "Word Counter", "Count words in a block of text."),
      tool("character-counter", "Character Counter", "Count characters in a block of text."),
      tool("line-counter", "Line Counter", "Count lines in a block of text."),
      tool("duplicate-line-remover", "Duplicate Line Remover", "Remove duplicate lines from text."),
      tool("diff", "Text Diff", "Compare two blocks of text and highlight differences."),
      tool("case-converter", "Case Converter", "Convert text between upper, lower, title, and camel case."),
      tool("reverse-text", "Reverse Text", "Reverse the characters or words in text."),
      tool("slug-generator", "Slug Generator", "Generate a URL-friendly slug from text."),
      tool("lorem-ipsum", "Lorem Ipsum", "Generate placeholder Lorem Ipsum text."),
      tool("remove-extra-spaces", "Remove Extra Spaces", "Remove extra whitespace from text."),
      tool("text-sorter", "Text Sorter", "Sort lines of text alphabetically or numerically."),
    ],
  },
  {
    slug: "numbers",
    title: "Numbers",
    icon: "\u{1F4B0}",
    description: "Calculate percentages, convert number bases, and run everyday numeric calculators online.",
    tools: [
      tool("percentage-calculator", "Percentage Calculator", "Calculate percentages of a value."),
      tool("percentage-difference", "Percentage Difference", "Calculate the percentage difference between two numbers."),
      tool("scientific-calculator", "Scientific Calculator", "Perform advanced scientific calculations."),
      tool("bmi-calculator", "BMI Calculator", "Calculate your Body Mass Index."),
      tool("unit-converter", "Unit Converter", "Convert between common units of measurement."),
      tool("currency-converter", "Currency Converter", "Convert between world currencies using live exchange rates."),
      tool("decimal-binary", "Decimal \u2194 Binary", "Convert between decimal and binary."),
      tool("decimal-hex", "Decimal \u2194 Hex", "Convert between decimal and hexadecimal."),
      tool("decimal-octal", "Decimal \u2194 Octal", "Convert between decimal and octal."),
      tool("roman-numeral", "Roman Numeral Converter", "Convert between numbers and Roman numerals."),
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
];

export function getAllTools() {
  return categories.flatMap((category) =>
    category.tools.map((t) => ({ ...t, categorySlug: category.slug, categoryTitle: category.title }))
  );
}

export function getCategory(categorySlug: string) {
  return categories.find((c) => c.slug === categorySlug);
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
  name: "DevToolbox",
  tagline: "Free online developer tools",
  description:
    "DevToolbox is a free collection of online developer tools \u2014 format, validate, convert, and generate JSON, XML, YAML, CSV, SQL, and more, all in your browser.",
  url: "https://devtoolbox.example.com",
};
