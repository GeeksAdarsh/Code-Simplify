import type { FaqItem } from "@/components/faq-section";

export interface ToolContent {
  howToUse: string[];
  features: string[];
  faq: FaqItem[];
}

export const toolContent: Record<string, ToolContent> = {
  "json/formatter": {
    howToUse: [
      "Paste or type your raw, minified, or messy JSON into the input box on the left.",
      "The formatter automatically validates and beautifies it in real time \u2014 no button required.",
      "Choose 2 spaces, 4 spaces, or tabs for indentation, and optionally sort object keys alphabetically.",
      "Copy the formatted result or download it as a .json file.",
    ],
    features: [
      "Runs 100% in your browser \u2014 your JSON never leaves your device.",
      "Instant validation with precise line and column error reporting.",
      "Customizable indentation: 2 spaces, 4 spaces, or tabs.",
      "One-click minify to compress JSON for production use.",
      "Optional alphabetical key sorting for consistent diffs.",
      "Free, unlimited, and works on any device \u2014 no sign-up required.",
    ],
    faq: [
      {
        question: "Is this JSON formatter free to use?",
        answer:
          "Yes. The JSON Formatter on DevToolbox is completely free with no usage limits, sign-up, or watermarks.",
      },
      {
        question: "Is my JSON data uploaded to a server?",
        answer:
          "No. All formatting and validation happens locally in your browser using JavaScript. Your data is never sent over the network, making it safe to use with sensitive or private JSON.",
      },
      {
        question: "Can I format very large JSON files?",
        answer:
          "Yes, the formatter can handle large JSON documents. Since parsing happens in your browser, performance depends on your device, but typical API responses and config files format instantly.",
      },
      {
        question: "What's the difference between formatting and minifying?",
        answer:
          "Formatting (beautifying) adds indentation and line breaks to make JSON human-readable. Minifying removes all unnecessary whitespace to produce the smallest possible file size, ideal for production APIs.",
      },
      {
        question: "How do I fix a JSON syntax error?",
        answer:
          "If your JSON is invalid, the tool shows the exact line and column of the first error. Common issues include trailing commas, unquoted keys, single quotes instead of double quotes, and missing brackets.",
      },
    ],
  },

  "json/validator": {
    howToUse: [
      "Paste the JSON you want to check into the input box.",
      "Validation runs automatically as you type \u2014 no need to click a button.",
      "If the JSON is valid, you'll see a summary of its type, key count, and depth.",
      "If it's invalid, you'll see the exact line and column where parsing failed.",
    ],
    features: [
      "Real-time validation with no page reloads or uploads.",
      "Pinpoints the exact line and column of syntax errors.",
      "Shows quick structural stats (keys, items, depth) for valid JSON.",
      "100% client-side \u2014 your data never leaves your browser.",
      "Free with no rate limits or account required.",
    ],
    faq: [
      {
        question: "What does 'valid JSON' actually mean?",
        answer:
          "Valid JSON follows the strict JSON specification: double-quoted keys and strings, no trailing commas, no comments, and correctly matched brackets/braces. This validator checks against that exact spec using the browser's native JSON parser.",
      },
      {
        question: "Why does my JSON fail validation even though it looks correct?",
        answer:
          "The most common causes are trailing commas after the last item, single quotes instead of double quotes, unquoted object keys, or JavaScript-style comments \u2014 none of which are allowed in strict JSON.",
      },
      {
        question: "Can I validate JSON with comments?",
        answer:
          "Standard JSON does not support comments. If your file has comments (like JSONC or JSON5), remove them first, or use a JSON5-aware tool.",
      },
      {
        question: "Is there a size limit?",
        answer:
          "There's no artificial limit \u2014 validation happens locally in your browser, so very large files are only limited by your device's memory.",
      },
    ],
  },

  "json/beautifier": {
    howToUse: [
      "Paste minified or messy JSON into the input box on the left.",
      "The beautifier automatically re-indents it into clean, readable JSON.",
      "Adjust indentation (2 spaces, 4 spaces, or tabs) and optionally sort keys alphabetically.",
      "Copy the beautified result or download it as a .json file.",
    ],
    features: [
      "Instantly restores readability to minified or single-line JSON.",
      "Customizable indentation to match your team's style guide.",
      "Optional alphabetical key sorting for consistent, diff-friendly output.",
      "Runs entirely in your browser \u2014 nothing is uploaded.",
      "Free, unlimited, no sign-up required.",
    ],
    faq: [
      {
        question: "What's the difference between 'Beautifier' and 'Formatter'?",
        answer:
          "They perform the same underlying operation \u2014 re-indenting JSON for readability. \"Beautify\" and \"format\" are used interchangeably across the industry, so both tools behave identically.",
      },
      {
        question: "Can I beautify JSON that has syntax errors?",
        answer:
          "No, the JSON must be valid to be beautified. If there's a syntax error, the tool will show you exactly where it is so you can fix it first.",
      },
      {
        question: "Does beautifying change the data?",
        answer:
          "No. Beautifying only changes whitespace and formatting \u2014 the underlying data, key order (unless you enable sorting), and values are preserved exactly.",
      },
    ],
  },

  "json/minifier": {
    howToUse: [
      "Paste your formatted or readable JSON into the input box.",
      "The minified, whitespace-free version appears instantly on the right.",
      "Compare input vs. output byte size to see exactly how much you saved.",
      "Copy the minified JSON or download it as a .json file.",
    ],
    features: [
      "Strips all unnecessary whitespace and line breaks.",
      "Shows exact byte size for both input and output so you can measure savings.",
      "Ideal for shrinking API responses, config files, and embedded JSON.",
      "Runs entirely client-side \u2014 no server round-trip.",
      "Free and unlimited.",
    ],
    faq: [
      {
        question: "Does minifying JSON lose any data?",
        answer:
          "No. Minifying only removes whitespace (spaces, tabs, newlines) between tokens \u2014 it never changes keys, values, or structure.",
      },
      {
        question: "How much smaller will my JSON get?",
        answer:
          "It depends on how heavily indented the original was, but minifying typically reduces size by 15\u201335% for nicely formatted JSON.",
      },
      {
        question: "Should I minify JSON before sending it over an API?",
        answer:
          "If bandwidth matters, yes \u2014 minified JSON transmits faster. Most production APIs return minified JSON by default and only pretty-print for debugging.",
      },
    ],
  },

  "json/diff": {
    howToUse: [
      "Paste the original JSON into the \"JSON A\" box and the changed version into \"JSON B\".",
      "The tool compares them recursively, field by field and array item by array item.",
      "Each difference is listed with its exact path and whether it was added, removed, or changed.",
      "Use this to review API response changes, config drift, or data migrations.",
    ],
    features: [
      "Deep, recursive comparison \u2014 not just a surface-level string diff.",
      "Clearly labels each change as added, removed, or changed with its JSON path.",
      "Handles nested objects and arrays of any depth.",
      "Runs entirely in your browser for privacy.",
      "Free with no file size limits beyond your browser's memory.",
    ],
    faq: [
      {
        question: "How is this different from a plain text diff?",
        answer:
          "A text diff compares line by line, which breaks down when JSON is reformatted or keys are reordered. This tool parses both documents and compares their actual data structure, so formatting differences don't produce false positives.",
      },
      {
        question: "Does key order matter?",
        answer:
          "No. Since objects are compared by key rather than by position, reordering keys in an object does not count as a difference.",
      },
      {
        question: "How are array differences reported?",
        answer:
          "Array items are compared by index. If an array grew or shrank, the extra items are reported as added or removed at that index; if an item at the same index changed, it's reported as changed.",
      },
    ],
  },

  "json/compare": {
    howToUse: [
      "Paste one JSON object into box A and another into box B.",
      "The tool compares every top-level field and shows a match/differs table.",
      "Scan the table for a quick, at-a-glance summary of which fields changed.",
      "Use JSON Diff instead if you need a deep, nested field-by-field breakdown.",
    ],
    features: [
      "Quick side-by-side comparison table, ideal for flat or shallow objects.",
      "Clear match/differs status per field.",
      "Shows both values inline for fast visual scanning.",
      "Runs entirely in your browser \u2014 nothing is uploaded.",
      "Free and unlimited.",
    ],
    faq: [
      {
        question: "When should I use Compare instead of Diff?",
        answer:
          "Use Compare for a quick, table-style overview of which top-level fields match or differ. Use JSON Diff when you need a detailed, recursive breakdown of every nested change with exact paths.",
      },
      {
        question: "What happens if a field is nested?",
        answer:
          "A nested field still shows as \"differs\" if anything inside it changed, but the table won't expand into sub-fields \u2014 switch to JSON Diff for that level of detail.",
      },
      {
        question: "Can I compare JSON arrays at the root?",
        answer:
          "This tool is optimized for comparing two JSON objects. For root-level arrays, JSON Diff will give you more useful, index-by-index results.",
      },
    ],
  },

  "json/viewer": {
    howToUse: [
      "Paste any JSON into the input box on the left.",
      "A syntax-highlighted, indented view appears automatically on the right.",
      "Toggle line wrapping to control how long lines are displayed.",
      "Use this to visually review API responses or config files without editing them.",
    ],
    features: [
      "Color-coded syntax highlighting for keys, strings, numbers, booleans, and null.",
      "Automatic formatting for readability \u2014 no manual indentation needed.",
      "Optional line wrapping for long values.",
      "Runs entirely in your browser for privacy.",
      "Free with no sign-up required.",
    ],
    faq: [
      {
        question: "What's the difference between Viewer and Formatter?",
        answer:
          "The Formatter is an editing tool focused on producing a re-formatted output you'll copy or download. The Viewer is a read-only, syntax-highlighted display meant for quickly reading and visually scanning JSON.",
      },
      {
        question: "Can I edit the highlighted output?",
        answer:
          "The highlighted panel is read-only by design. Edit your JSON in the input box on the left \u2014 the highlighted view updates automatically.",
      },
      {
        question: "Does this support very large JSON files?",
        answer:
          "Yes, though extremely large files (tens of thousands of lines) may render more slowly since highlighting happens in your browser.",
      },
    ],
  },

  "json/tree-viewer": {
    howToUse: [
      "Paste your JSON into the input box on the left.",
      "A collapsible tree appears on the right, mirroring the JSON's structure.",
      "Click the +/\u2212 icon next to any object or array to expand or collapse it.",
      "Use \"Expand all\" or \"Collapse all\" to control the whole tree at once.",
    ],
    features: [
      "Collapsible, navigable tree for exploring deeply nested JSON.",
      "Shows item/key counts for collapsed nodes so you know what's inside.",
      "One-click expand all / collapse all.",
      "Syntax-highlighted values by type.",
      "Runs entirely client-side \u2014 your data stays private.",
    ],
    faq: [
      {
        question: "Why use a tree view instead of plain formatted text?",
        answer:
          "Deeply nested JSON (like large API responses) can be hard to scan as flat text. A tree view lets you collapse sections you don't care about and focus only on the parts you're investigating.",
      },
      {
        question: "Can I collapse just one section instead of everything?",
        answer:
          "Yes \u2014 click the +/\u2212 toggle next to any individual object or array to collapse or expand just that branch.",
      },
      {
        question: "Does collapsing lose any data?",
        answer:
          "No. Collapsing is purely a display state \u2014 the underlying JSON in the input box is never modified.",
      },
    ],
  },

  "json/to-xml": {
    howToUse: [
      "Paste your JSON into the input box on the left.",
      "The equivalent XML markup is generated automatically on the right.",
      "Objects become nested elements, arrays repeat the same element tag, and primitives become element text.",
      "Copy the XML or download it as an .xml file.",
    ],
    features: [
      "Automatic, sensible mapping from JSON structure to nested XML elements.",
      "Handles nested objects and arrays of any depth.",
      "Produces a valid XML declaration and well-formed markup.",
      "Runs entirely in your browser \u2014 no data is uploaded.",
      "Free and unlimited.",
    ],
    faq: [
      {
        question: "How are JSON arrays represented in XML?",
        answer:
          "Each array item is output as a repeated element using the same tag name as the array's key (or \"item\" at the root), since XML doesn't have a native array type.",
      },
      {
        question: "What happens to JSON keys that aren't valid XML tag names?",
        answer:
          "Keys containing characters not allowed in XML element names are replaced with a generic \"item\" tag so the output always remains well-formed.",
      },
      {
        question: "Does the conversion support XML attributes?",
        answer:
          "This converter maps every JSON key to a nested child element rather than an XML attribute, keeping the mapping simple and predictable for any input shape.",
      },
    ],
  },

  "json/to-yaml": {
    howToUse: [
      "Paste your JSON into the input box on the left.",
      "The equivalent YAML is generated automatically on the right.",
      "Copy the YAML or download it as a .yaml file.",
      "Use this when migrating config files from JSON to YAML (e.g. for Kubernetes, Docker Compose, or CI pipelines).",
    ],
    features: [
      "Clean, properly indented YAML output.",
      "Correctly handles nested objects, arrays, strings, numbers, booleans, and null.",
      "Great for converting JSON config/data files into YAML for tools that prefer it.",
      "Runs entirely client-side \u2014 no data leaves your browser.",
      "Free and unlimited.",
    ],
    faq: [
      {
        question: "Is the generated YAML guaranteed to round-trip back to identical JSON?",
        answer:
          "Yes \u2014 converting the output YAML back to JSON will reproduce the same data, since the converter preserves types (strings, numbers, booleans, null) and structure exactly.",
      },
      {
        question: "Why would I convert JSON to YAML?",
        answer:
          "Many DevOps tools \u2014 Kubernetes manifests, Docker Compose, GitHub Actions, Ansible \u2014 use YAML as their configuration format, even though the underlying data is often easier to generate or edit as JSON first.",
      },
      {
        question: "Does it support YAML anchors or comments?",
        answer:
          "No \u2014 since JSON has no concept of anchors or comments, the output is plain, straightforward YAML without either feature.",
      },
    ],
  },

  "json/to-csv": {
    howToUse: [
      "Paste a JSON array of objects into the input box on the left.",
      "The equivalent CSV table is generated automatically on the right, with headers taken from all object keys.",
      "Nested objects are flattened using dot notation (e.g. author.name); nested arrays are kept as JSON strings.",
      "Copy the CSV or download it as a .csv file to open in Excel, Sheets, or any spreadsheet app.",
    ],
    features: [
      "Automatically builds a header row from the union of all object keys.",
      "Flattens nested objects with dot-notation column names.",
      "Properly escapes commas, quotes, and newlines per the CSV spec.",
      "Works with a single JSON object too \u2014 it's treated as a one-row table.",
      "Runs entirely in your browser \u2014 no data is uploaded.",
    ],
    faq: [
      {
        question: "What JSON shape works best for this converter?",
        answer:
          "An array of objects with a similar shape works best, since each object becomes one CSV row and its keys become columns \u2014 similar to rows in a database table.",
      },
      {
        question: "What happens to deeply nested arrays or objects?",
        answer:
          "Nested objects are flattened into dot-notation columns (e.g. address.city). Nested arrays don't flatten cleanly into columns, so they're kept as a raw JSON string in a single cell.",
      },
      {
        question: "What if my objects have different keys?",
        answer:
          "The header row includes every key found across all objects. Rows missing a particular key simply have an empty cell in that column.",
      },
    ],
  },

  "json/to-excel": {
    howToUse: [
      "Paste a JSON array of objects into the input box.",
      "A live preview table appears on the right so you can check the columns before exporting.",
      "Click \"Download Excel (.xlsx)\" to save it as a real, spreadsheet-app-compatible workbook.",
      "Open the downloaded file directly in Excel, Google Sheets, or Numbers.",
    ],
    features: [
      "Generates a genuine .xlsx workbook, not just a renamed CSV.",
      "Live preview table before you download.",
      "Automatically flattens nested objects into columns.",
      "Runs entirely in your browser \u2014 your data is never uploaded to a server.",
      "Free and unlimited.",
    ],
    faq: [
      {
        question: "Is this a real Excel file or just a CSV renamed to .xlsx?",
        answer:
          "It's a genuine Excel workbook (.xlsx) generated in your browser, with proper worksheet structure \u2014 not a CSV with a different extension.",
      },
      {
        question: "Can I export more than one sheet?",
        answer:
          "Currently this tool exports your JSON to a single worksheet named \"Sheet1\". For multi-sheet workbooks, export each dataset separately and combine them in Excel.",
      },
      {
        question: "What happens with deeply nested JSON?",
        answer:
          "Nested objects are flattened into dot-notation columns (e.g. address.city), the same way as the JSON to CSV tool, so every value ends up in its own column.",
      },
    ],
  },

  "json/to-java": {
    howToUse: [
      "Paste a sample JSON object into the input box.",
      "Set the root class name (defaults to \"Root\").",
      "Java POJO classes \u2014 including nested static-style classes for nested objects \u2014 are generated automatically with private fields and public getters/setters.",
      "Copy the code or download it as a .java file.",
    ],
    features: [
      "Infers Java types automatically: String, Integer, Double, Boolean, and List<T>.",
      "Generates a separate class for every nested object in your JSON.",
      "Produces idiomatic POJOs with encapsulated fields and standard getters/setters.",
      "Custom root class naming.",
      "Runs entirely in your browser \u2014 no data is uploaded.",
    ],
    faq: [
      {
        question: "Does it use Jackson or Gson annotations?",
        answer:
          "No, the generated POJOs are plain Java classes with standard getters and setters. Most JSON libraries (Jackson, Gson) can map JSON to these classes automatically without any annotations, using field name matching.",
      },
      {
        question: "What Java type is used for numbers?",
        answer:
          "Whole numbers become Integer and decimal numbers become Double. If you need long or BigDecimal precision, adjust the generated field types manually.",
      },
      {
        question: "How are nested objects handled?",
        answer:
          "Each nested object becomes its own top-level class named after the JSON key (e.g. an \"address\" field becomes a class called Address), referenced from the parent class.",
      },
    ],
  },

  "json/to-csharp": {
    howToUse: [
      "Paste a sample JSON object into the input box.",
      "Set the root class name (defaults to \"Root\").",
      "C# classes with auto-implemented properties are generated for the root object and every nested object.",
      "Copy the code or download it as a .cs file.",
    ],
    features: [
      "Infers C# types automatically: string, int, double, bool, and List<T>.",
      "Generates auto-property syntax (public string Name { get; set; }).",
      "A dedicated class for every nested object.",
      "Custom root class naming.",
      "Runs entirely in your browser \u2014 no data is uploaded.",
    ],
    faq: [
      {
        question: "Will this work directly with System.Text.Json or Newtonsoft.Json?",
        answer:
          "Yes. Both libraries can deserialize JSON into these classes by default, matching properties by name (case-insensitively for System.Text.Json with the right options).",
      },
      {
        question: "Are the properties nullable?",
        answer:
          "The generated properties use non-nullable value types (int, double, bool) by default. If a field can be null in your data, change the type to a nullable form (e.g. int?) manually.",
      },
      {
        question: "How are JSON arrays represented?",
        answer:
          "Arrays are generated as List<T> from System.Collections.Generic, where T is the inferred element type (a primitive or another generated class).",
      },
    ],
  },

  "json/to-php": {
    howToUse: [
      "Paste your JSON into the input box on the left.",
      "The equivalent native PHP array (using short array syntax) is generated automatically on the right.",
      "Copy the code or download it as a .php file.",
      "Paste the array directly into your PHP source, or adapt it into a function return value.",
    ],
    features: [
      "Uses modern PHP short array syntax ([...]) instead of the older array(...) syntax.",
      "Correctly handles nested arrays, associative arrays, strings, numbers, booleans, and null.",
      "Properly escapes single quotes and backslashes in strings.",
      "Runs entirely in your browser \u2014 no data is uploaded.",
      "Free and unlimited.",
    ],
    faq: [
      {
        question: "Does this generate PHP classes instead of arrays?",
        answer:
          "No \u2014 this tool converts JSON into a plain PHP array literal, which is the most common way to work with JSON data in PHP. If you need typed classes, use a PHP DTO generator or write them manually based on the structure.",
      },
      {
        question: "Why short array syntax ([...]) instead of array(...)?",
        answer:
          "Short array syntax has been standard in PHP since 5.4 and is used almost universally in modern PHP code. It's more concise and equally valid.",
      },
      {
        question: "Are JSON object keys preserved exactly?",
        answer:
          "Yes. JSON object keys become PHP associative array keys (as single-quoted strings), preserving the exact key names from your JSON.",
      },
    ],
  },

  "json/to-typescript": {
    howToUse: [
      "Paste a sample JSON object into the input box.",
      "Set the root interface name (defaults to \"Root\").",
      "TypeScript interfaces are generated for the root object and every nested object.",
      "Copy the code or download it as a .ts file and import it into your project.",
    ],
    features: [
      "Infers precise TypeScript types: string, number, boolean, and typed arrays.",
      "Generates a separate, named interface for every nested object.",
      "Exports every interface (export interface Root { ... }) for easy importing.",
      "Custom root interface naming.",
      "Runs entirely in your browser \u2014 no data is uploaded.",
    ],
    faq: [
      {
        question: "Does this generate types or interfaces?",
        answer:
          "It generates interfaces (export interface Name { ... }). Interfaces and type aliases are largely interchangeable for object shapes in TypeScript, so you can convert them if your codebase prefers type aliases.",
      },
      {
        question: "How are optional or nullable fields handled?",
        answer:
          "Fields that are null in your sample JSON are typed as null. If a field can sometimes be missing in real data, mark it optional manually (e.g. name?: string) after generating.",
      },
      {
        question: "Can I use this output directly with fetch or axios responses?",
        answer:
          "Yes \u2014 paste a real API response as your sample JSON, and the generated interface can be used to type the response, e.g. const data: Root = await res.json().",
      },
    ],
  },

  "json/to-kotlin": {
    howToUse: [
      "Paste a sample JSON object into the input box.",
      "Set the root data class name (defaults to \"Root\").",
      "Kotlin data classes are generated for the root object and every nested object.",
      "Copy the code or download it as a .kt file.",
    ],
    features: [
      "Generates idiomatic Kotlin data class syntax with val properties.",
      "Infers types: String, Int, Double, Boolean, and List<T>.",
      "A dedicated data class for every nested object.",
      "Custom root class naming.",
      "Runs entirely in your browser \u2014 no data is uploaded.",
    ],
    faq: [
      {
        question: "Will this work with kotlinx.serialization or Gson?",
        answer:
          "Yes. Add the appropriate annotation (@Serializable for kotlinx.serialization) to each class if required by your library; Gson works with these plain data classes out of the box.",
      },
      {
        question: "Why data class instead of a regular class?",
        answer:
          "Data classes automatically generate equals(), hashCode(), toString(), and copy(), which is exactly what you want for simple JSON model objects.",
      },
      {
        question: "Are properties mutable (var) or immutable (val)?",
        answer:
          "Properties are generated as val (immutable), which is the idiomatic Kotlin default for data models. Change to var manually if you need to mutate them after creation.",
      },
    ],
  },

  "json/to-dart": {
    howToUse: [
      "Paste a sample JSON object into the input box.",
      "Set the root class name (defaults to \"Root\").",
      "Dart classes are generated with final fields, a constructor, and a fromJson factory for the root object and every nested object.",
      "Copy the code or download it as a .dart file for your Flutter project.",
    ],
    features: [
      "Generates final fields with a named constructor, matching common Flutter/Dart conventions.",
      "Includes a fromJson factory constructor for decoding API responses.",
      "Handles nested objects and lists of nested objects in fromJson.",
      "Custom root class naming.",
      "Runs entirely in your browser \u2014 no data is uploaded.",
    ],
    faq: [
      {
        question: "Does this generate toJson() as well as fromJson()?",
        answer:
          "This tool generates the fromJson factory, which is what you need to decode API responses. Add a toJson() method manually if you also need to serialize instances back to JSON.",
      },
      {
        question: "Will this work with Flutter's http package?",
        answer:
          "Yes \u2014 decode the response body with jsonDecode(), then pass the resulting Map to YourClass.fromJson() to get a typed Dart object.",
      },
      {
        question: "How are lists of nested objects handled?",
        answer:
          "For a field that's an array of objects, fromJson generates a List<T>.from(json['key'].map((x) => T.fromJson(x))) call so nested items are decoded correctly too.",
      },
    ],
  },

  "json/escape-unescape": {
    howToUse: [
      "Choose \"Escape\" to convert raw text into a JSON-safe string literal, or \"Unescape\" to decode one back to plain text.",
      "Type or paste your text into the input box.",
      "The converted result appears instantly on the right.",
      "Copy the output and paste it wherever you need \u2014 inside a JSON document, a config file, or your source code.",
    ],
    features: [
      "Escape mode wraps and escapes raw text into a valid JSON string literal (handles quotes, backslashes, newlines, tabs).",
      "Unescape mode decodes a JSON string literal back into readable plain text.",
      "Works whether or not your escaped input includes the surrounding double quotes.",
      "Runs entirely in your browser \u2014 no data is uploaded.",
      "Free and unlimited.",
    ],
    faq: [
      {
        question: "What does \"escaping\" a string actually do?",
        answer:
          "Escaping converts special characters (like quotes, backslashes, and newlines) into their backslash-prefixed JSON equivalents (\\\", \\\\, \\n) so the text can be safely embedded as a JSON string value.",
      },
      {
        question: "Do I need to include the surrounding quotes when unescaping?",
        answer:
          "No \u2014 you can paste the escaped text with or without the surrounding double quotes; the tool detects and handles both cases automatically.",
      },
      {
        question: "Is this the same as URL encoding?",
        answer:
          "No. JSON escaping only handles characters that are special within a JSON string literal (quotes, backslashes, control characters). For encoding text to be safely used inside a URL, use a URL Encode tool instead.",
      },
    ],
  },

  "xml/formatter": {
    howToUse: [
      "Paste your raw or minified XML into the input box on the left.",
      "Click \"Format\" to re-indent it into clean, readable XML \u2014 or edit the input and click Format again anytime.",
      "Choose 2 spaces, 4 spaces, or tabs for indentation.",
      "Copy the formatted result or download it as an .xml file.",
    ],
    features: [
      "Validates XML well-formedness and reports parser errors clearly.",
      "Customizable indentation: 2 spaces, 4 spaces, or tabs.",
      "One-click Minify to strip whitespace back out for production use.",
      "Runs entirely in your browser \u2014 your XML never leaves your device.",
      "Free, unlimited, and works on any device.",
    ],
    faq: [
      {
        question: "Is my XML data uploaded anywhere?",
        answer:
          "No. Formatting, validation, and minifying all happen locally in your browser using the built-in DOMParser \u2014 your XML is never sent over the network.",
      },
      {
        question: "What does \"well-formed\" XML mean?",
        answer:
          "Well-formed XML has properly matched and nested tags, a single root element, correctly quoted attribute values, and valid character encoding \u2014 the baseline requirement before XML can even be parsed.",
      },
      {
        question: "Can I format XML that includes a DOCTYPE or processing instructions?",
        answer:
          "Yes, standard XML declarations (<?xml ... ?>) and processing instructions are preserved and placed on their own line during formatting.",
      },
      {
        question: "What's the difference between formatting and minifying?",
        answer:
          "Formatting adds indentation and line breaks for readability. Minifying removes all unnecessary whitespace between tags to produce the smallest possible file size for production use.",
      },
    ],
  },

  "xml/validator": {
    howToUse: [
      "Paste the XML you want to check into the input box.",
      "Validation runs automatically as you type using the browser's built-in XML parser.",
      "If it's valid, you'll see the total element count and maximum nesting depth.",
      "If it's invalid, you'll see the parser's exact error message.",
    ],
    features: [
      "Real-time well-formedness validation with no page reloads or uploads.",
      "Uses the browser's native, standards-compliant XML parser.",
      "Shows quick structural stats (element count, depth) for valid XML.",
      "100% client-side \u2014 your data never leaves your browser.",
      "Free with no rate limits or account required.",
    ],
    faq: [
      {
        question: "What does 'well-formed XML' mean?",
        answer:
          "Well-formed XML has a single root element, properly matched and nested opening/closing tags, correctly quoted attribute values, and valid escaping of special characters like & and <.",
      },
      {
        question: "Does this check my XML against a schema (XSD/DTD)?",
        answer:
          "No, this validates well-formedness only \u2014 that the XML syntax itself is correct. It does not check the document against a specific schema or DTD.",
      },
      {
        question: "Why does my XML fail even though it looks fine?",
        answer:
          "Common causes are unescaped & or < characters inside text content, mismatched or unclosed tags, and multiple root elements (XML requires exactly one).",
      },
    ],
  },

  "xml/minifier": {
    howToUse: [
      "Paste your formatted or readable XML into the input box.",
      "The whitespace-free, single-line version appears instantly on the right.",
      "Compare input vs. output byte size to see exactly how much you saved.",
      "Copy the minified XML or download it as an .xml file.",
    ],
    features: [
      "Strips all unnecessary whitespace between tags.",
      "Shows exact byte size for both input and output so you can measure savings.",
      "Validates your XML first so you know it's well-formed before minifying.",
      "Runs entirely client-side \u2014 no server round-trip.",
      "Free and unlimited.",
    ],
    faq: [
      {
        question: "Does minifying XML change any data?",
        answer:
          "No. Minifying only removes whitespace between tags \u2014 it never changes element names, attributes, or text content.",
      },
      {
        question: "Is whitespace inside text content preserved?",
        answer:
          "Yes. This minifier only removes whitespace that sits between tags (e.g. indentation and line breaks), not whitespace that's part of an element's actual text content.",
      },
      {
        question: "Should I minify XML before sending it over an API?",
        answer:
          "If bandwidth or storage matters, yes \u2014 minified XML transmits and stores more efficiently than pretty-printed XML.",
      },
    ],
  },

  "xml/to-json": {
    howToUse: [
      "Paste your XML document into the input box on the left.",
      "The equivalent JSON is generated automatically on the right.",
      "Element attributes become @attribute keys, repeated child elements become arrays.",
      "Copy the JSON or download it as a .json file.",
    ],
    features: [
      "Automatic, predictable mapping from XML structure to JSON.",
      "Handles attributes, nested elements, and repeated (array-like) elements.",
      "Preserves mixed text content using a #text key when needed.",
      "Runs entirely in your browser \u2014 no data is uploaded.",
      "Free and unlimited.",
    ],
    faq: [
      {
        question: "How are XML attributes represented in the JSON output?",
        answer:
          "Each attribute becomes a key prefixed with @ (e.g. id=\"1\" becomes \"@id\": \"1\"), keeping attributes clearly distinguishable from child elements.",
      },
      {
        question: "What happens with repeated elements, like multiple <item> tags?",
        answer:
          "When the same element name appears more than once under a parent, the converter automatically groups them into a JSON array instead of overwriting the value.",
      },
      {
        question: "Is this conversion reversible?",
        answer:
          "The mapping is designed to be lossless for typical data-oriented XML (attributes, nested elements, repeated elements), so you can convert the JSON back to a similar XML structure if needed.",
      },
    ],
  },

  "xml/to-csv": {
    howToUse: [
      "Paste XML that contains a list of repeated elements (like multiple <employee> records) into the input box.",
      "The converter finds the repeated element group and turns each one into a CSV row.",
      "Copy the CSV or download it as a .csv file to open in Excel, Sheets, or any spreadsheet app.",
    ],
    features: [
      "Automatically detects the repeated element group to use as table rows.",
      "Flattens nested child elements and attributes into columns.",
      "Properly escapes commas, quotes, and newlines per the CSV spec.",
      "Runs entirely in your browser \u2014 no data is uploaded.",
    ],
    faq: [
      {
        question: "What XML structure works best for this converter?",
        answer:
          "XML with a parent element containing several repeated child elements of the same name (e.g. a list of <employee> records) works best, since each repeated element becomes one CSV row.",
      },
      {
        question: "What happens if there's no repeated element group?",
        answer:
          "If the XML doesn't contain any repeated elements, the tool falls back to exporting the document as a single-row CSV.",
      },
      {
        question: "Are XML attributes included in the CSV columns?",
        answer:
          "Yes \u2014 attributes are included as their own columns (prefixed with @), alongside columns for child element values.",
      },
    ],
  },

  "xml/viewer": {
    howToUse: [
      "Paste any XML into the input box on the left.",
      "A syntax-highlighted, indented view appears automatically on the right.",
      "Toggle line wrapping to control how long lines are displayed.",
      "Use this to visually review API responses, RSS feeds, or config files without editing them.",
    ],
    features: [
      "Color-coded syntax highlighting for tags, attribute names, attribute values, and comments.",
      "Automatic formatting for readability \u2014 no manual indentation needed.",
      "Optional line wrapping for long values.",
      "Runs entirely in your browser for privacy.",
      "Free with no sign-up required.",
    ],
    faq: [
      {
        question: "What's the difference between Viewer and Formatter?",
        answer:
          "The Formatter is an editing tool focused on producing a re-formatted output you'll copy or download. The Viewer is a read-only, syntax-highlighted display meant for quickly reading and visually scanning XML.",
      },
      {
        question: "Can I edit the highlighted output?",
        answer:
          "The highlighted panel is read-only by design. Edit your XML in the input box on the left \u2014 the highlighted view updates automatically.",
      },
      {
        question: "Does this work with XML comments and CDATA sections?",
        answer:
          "Comments (<!-- ... -->) are highlighted distinctly from tags. CDATA sections are preserved as part of the element's text content.",
      },
    ],
  },

  "xml/compare": {
    howToUse: [
      "Paste the original XML into the \"XML A\" box and the changed version into \"XML B\".",
      "Both documents are parsed and compared recursively, element by element and attribute by attribute.",
      "Each difference is listed with its exact path and whether it was added, removed, or changed.",
      "Use this to review config changes, API response differences, or document revisions.",
    ],
    features: [
      "Deep, recursive comparison based on parsed XML structure, not raw text.",
      "Clearly labels each change as added, removed, or changed with its path.",
      "Handles nested elements, attributes, and repeated elements.",
      "Runs entirely in your browser for privacy.",
      "Free with no file size limits beyond your browser's memory.",
    ],
    faq: [
      {
        question: "How is this different from a plain text diff?",
        answer:
          "A text diff compares line by line, which breaks down when XML is reformatted or attributes are reordered. This tool parses both documents into a structured form and compares the actual data, so formatting differences don't produce false positives.",
      },
      {
        question: "Does attribute order matter?",
        answer:
          "No. Attributes are compared by name rather than by position, so reordering attributes on an element does not count as a difference.",
      },
      {
        question: "Are XML comments included in the comparison?",
        answer:
          "No, comments are not part of the data model used for comparison \u2014 only elements, attributes, and text content are compared.",
      },
    ],
  },

  "xml/xpath-tester": {
    howToUse: [
      "Paste your XML document into the top box.",
      "Type an XPath expression (e.g. //book/title) into the expression field.",
      "Matching results appear instantly below as you type.",
      "Refine your expression and watch the results update in real time.",
    ],
    features: [
      "Uses the browser's native, standards-compliant XPath engine.",
      "Supports element, attribute, string, number, and boolean XPath expressions.",
      "Shows the exact number of matches and each matched node's markup.",
      "Runs entirely in your browser \u2014 no data is uploaded.",
      "Free and unlimited.",
    ],
    faq: [
      {
        question: "What XPath version is supported?",
        answer:
          "This tool uses your browser's built-in XPath 1.0 engine (via the standard document.evaluate API), which covers the vast majority of everyday XPath expressions.",
      },
      {
        question: "Can I select attributes with XPath?",
        answer:
          "Yes \u2014 use an expression like //book/@id to select the id attribute of every <book> element; results will show the attribute name and value.",
      },
      {
        question: "Why does my expression return no results?",
        answer:
          "Double-check element names are case-sensitive and match your XML exactly, and that your XML doesn't use namespaces that require prefixing in the expression (this tool doesn't perform namespace resolution).",
      },
    ],
  },

  "yaml/formatter": {
    howToUse: [
      "Paste your YAML into the input box on the left.",
      "Click \"Format\" to re-indent it with consistent spacing, or just keep editing \u2014 the output updates live.",
      "Choose 2 or 4 spaces for indentation, and optionally switch to compact (flow) style for a more JSON-like layout.",
      "Copy the formatted result or download it as a .yaml file.",
    ],
    features: [
      "Instantly restores consistent indentation to messy or hand-edited YAML.",
      "Toggle between standard block style and compact flow style.",
      "Customizable indentation: 2 or 4 spaces.",
      "Validates YAML syntax and reports precise error locations.",
      "Runs entirely in your browser \u2014 your YAML never leaves your device.",
    ],
    faq: [
      {
        question: "Is my YAML data uploaded anywhere?",
        answer:
          "No. Parsing and formatting happen locally in your browser using the js-yaml library \u2014 your data is never sent over the network.",
      },
      {
        question: "What's the difference between block style and flow style?",
        answer:
          "Block style is the familiar indentation-based YAML layout most config files use. Flow style is a more compact, JSON-like syntax using [] and {} \u2014 useful when you want a denser representation of the same data.",
      },
      {
        question: "Will formatting change my data or comments?",
        answer:
          "Formatting re-serializes the parsed data, so the underlying values are preserved exactly, but YAML comments are not preserved since they aren't part of the parsed data model.",
      },
    ],
  },

  "yaml/validator": {
    howToUse: [
      "Paste the YAML you want to check into the input box.",
      "Validation runs automatically as you type using the js-yaml parser.",
      "If it's valid, you'll see a summary of its type, key count, and depth.",
      "If it's invalid, you'll see the exact line and column where parsing failed.",
    ],
    features: [
      "Real-time validation with no page reloads or uploads.",
      "Pinpoints the exact line and column of syntax errors.",
      "Shows quick structural stats (keys, items, depth) for valid YAML.",
      "100% client-side \u2014 your data never leaves your browser.",
      "Free with no rate limits or account required.",
    ],
    faq: [
      {
        question: "Why does my YAML fail validation even though it looks correct?",
        answer:
          "The most common cause is inconsistent indentation \u2014 YAML is whitespace-sensitive, so mixing tabs and spaces, or misaligning list items under a key, will cause a parse error.",
      },
      {
        question: "Does this support multiple YAML documents in one file (separated by ---)?",
        answer:
          "This validator checks the first document in the input. For files with multiple --- separated documents, validate each one individually for the clearest results.",
      },
      {
        question: "Are tabs allowed in YAML?",
        answer:
          "No \u2014 the YAML specification disallows tab characters for indentation. Use spaces only, which is what this validator (and the Formatter's indentation options) expect.",
      },
    ],
  },

  "yaml/to-json": {
    howToUse: [
      "Paste your YAML into the input box on the left.",
      "The equivalent JSON is generated automatically on the right.",
      "Copy the JSON or download it as a .json file.",
      "Use this when migrating config files from YAML to JSON, or to feed YAML-based config into a JSON-only tool.",
    ],
    features: [
      "Accurate conversion powered by the widely-used js-yaml parser.",
      "Correctly handles nested mappings, sequences, strings, numbers, booleans, and null.",
      "Great for converting YAML config/data files into JSON for tools that prefer it.",
      "Runs entirely client-side \u2014 no data leaves your browser.",
      "Free and unlimited.",
    ],
    faq: [
      {
        question: "Does this support YAML anchors and aliases (&/*)?",
        answer:
          "Yes \u2014 the underlying parser resolves anchors and aliases, so the resulting JSON contains the fully expanded data with any referenced values inlined.",
      },
      {
        question: "What happens to YAML comments?",
        answer:
          "Comments are discarded during conversion, since JSON has no equivalent concept and comments aren't part of the parsed data.",
      },
      {
        question: "Can I convert a YAML file with multiple documents?",
        answer:
          "This tool converts the first document in the input. Split multi-document YAML files (separated by ---) and convert each one separately if you need all of them as JSON.",
      },
    ],
  },

  "yaml/from-json": {
    howToUse: [
      "Paste your JSON into the input box on the left.",
      "The equivalent YAML is generated automatically on the right.",
      "Copy the YAML or download it as a .yaml file.",
      "Use this when writing config files for tools that expect YAML \u2014 Kubernetes, Docker Compose, GitHub Actions, Ansible, and more.",
    ],
    features: [
      "Clean, properly indented YAML output powered by the widely-used js-yaml library.",
      "Correctly handles nested objects, arrays, strings, numbers, booleans, and null.",
      "Same reliable conversion engine as our JSON to YAML tool, presented here for YAML-first workflows.",
      "Runs entirely client-side \u2014 no data leaves your browser.",
      "Free and unlimited.",
    ],
    faq: [
      {
        question: "Why would I write my config as JSON first and convert to YAML?",
        answer:
          "JSON is often easier to generate programmatically or paste from an API response. Converting to YAML afterward gives you a config file in the format your deployment tool expects, without hand-writing YAML indentation.",
      },
      {
        question: "Is the output guaranteed to be valid YAML?",
        answer:
          "Yes \u2014 the output is generated by a standards-compliant YAML serializer, so as long as your input is valid JSON, the resulting YAML will always be valid.",
      },
      {
        question: "Does this preserve number and boolean types?",
        answer:
          "Yes. Numbers, booleans, and null are emitted as native YAML types (not quoted strings), so the round-tripped data matches your original JSON's types exactly.",
      },
    ],
  },
  "csv/viewer": {
    howToUse: [
      "Paste your raw CSV data into the input box on the left.",
      "The tool automatically parses it and renders a clean, scrollable table on the right.",
      "Switch the delimiter to semicolon or tab if your file uses a different separator.",
      "Use this to quickly inspect exported data, spreadsheet dumps, or API CSV responses without opening Excel.",
    ],
    features: [
      "Handles quoted fields, embedded commas, and multi-line cells correctly (RFC 4180-compliant parsing).",
      "Supports comma, semicolon, and tab delimiters for international and TSV-style files.",
      "Shows row and column counts at a glance.",
      "Runs 100% in your browser \u2014 your data never leaves your device.",
      "Free, unlimited, and works on any device.",
    ],
    faq: [
      {
        question: "Can this tool handle CSV files with commas inside quoted fields?",
        answer:
          "Yes. The parser follows the RFC 4180 CSV standard, correctly handling quoted fields that contain commas, newlines, or escaped double quotes.",
      },
      {
        question: "Does it support semicolon-separated or tab-separated files?",
        answer:
          "Yes. Use the delimiter selector to switch between comma, semicolon, and tab \u2014 useful for European CSV exports and TSV files.",
      },
      {
        question: "Is there a row limit?",
        answer:
          "The viewer renders up to 200 rows in the preview table for performance, but parses your entire file, so row and column counts always reflect the full dataset.",
      },
    ],
  },
  "csv/formatter": {
    howToUse: [
      "Paste messy or inconsistently formatted CSV data into the input box.",
      "Choose the input delimiter (comma, semicolon, or tab) that matches your source data.",
      "Optionally enable whitespace trimming to clean up padded cells.",
      "Choose your desired output delimiter and copy or download the reformatted CSV.",
    ],
    features: [
      "Normalizes quoting \u2014 only wraps fields in quotes when required (commas, quotes, or newlines present).",
      "Trims leading/trailing whitespace from every cell with one click.",
      "Convert between comma, semicolon, and tab delimited formats in the same step.",
      "Runs entirely client-side for instant results and full privacy.",
      "Free and unlimited.",
    ],
    faq: [
      {
        question: "Can I convert a semicolon-delimited CSV to comma-delimited?",
        answer:
          "Yes. Set the input delimiter to semicolon and the output delimiter to comma (or vice versa), and the tool rewrites every row using the new separator.",
      },
      {
        question: "Will this remove extra spaces around values?",
        answer:
          "Yes, when the \"Trim whitespace\" option is enabled, leading and trailing spaces are stripped from every header and cell value.",
      },
      {
        question: "Does it fix broken quoting?",
        answer:
          "The formatter re-serializes every field with correct, minimal quoting based on its content, which fixes most inconsistent or unnecessary quoting issues from the original file.",
      },
    ],
  },
  "csv/to-json": {
    howToUse: [
      "Paste your CSV data, using the first row as column headers.",
      "The equivalent JSON array of objects is generated automatically on the right.",
      "Select the delimiter that matches your CSV (comma, semicolon, or tab).",
      "Copy the JSON or download it as a .json file for use in your app or API.",
    ],
    features: [
      "Converts each CSV row into a JSON object keyed by the header row.",
      "Automatically generates fallback keys (column1, column2, ...) for missing headers.",
      "Supports comma, semicolon, and tab delimited source files.",
      "Runs 100% client-side \u2014 your data is never uploaded.",
      "Free and unlimited.",
    ],
    faq: [
      {
        question: "What if my CSV doesn't have a header row?",
        answer:
          "The first row is always treated as headers. If your data has no header row, add a placeholder header row before converting, or the first data row will be used as keys.",
      },
      {
        question: "Are numbers and booleans converted to their JSON types?",
        answer:
          "No, all CSV values are text by nature, so every field is output as a JSON string. You can further process the output if you need typed values.",
      },
      {
        question: "Can I convert a TSV (tab-separated) file?",
        answer: "Yes, select the Tab option in the delimiter dropdown before converting.",
      },
    ],
  },
  "csv/to-xml": {
    howToUse: [
      "Paste your CSV data into the input box, with headers on the first row.",
      "The tool converts each row into a <row> element inside a <rows> root, with one child element per column.",
      "Select the correct delimiter for your source file.",
      "Copy or download the resulting XML document.",
    ],
    features: [
      "Wraps each CSV row in its own XML element, using column headers as child tag names.",
      "Escapes special XML characters (&, <, >, quotes) automatically.",
      "Supports comma, semicolon, and tab delimited input.",
      "Runs entirely in your browser for speed and privacy.",
      "Free and unlimited.",
    ],
    faq: [
      {
        question: "What XML structure does this produce?",
        answer:
          "The output wraps all rows in a <rows> root element, with each row rendered as a <row> element containing one child element per CSV column, named after the header.",
      },
      {
        question: "What happens if a header isn't a valid XML tag name?",
        answer:
          "Headers with invalid characters are replaced with a generic <item> tag so the output always remains well-formed XML.",
      },
      {
        question: "Is this safe for CSV exports containing special characters?",
        answer:
          "Yes, all values are automatically XML-escaped, so ampersands, angle brackets, and quotes in your data won't break the resulting document.",
      },
    ],
  },
  "csv/to-excel": {
    howToUse: [
      "Paste your CSV data into the input box on the left.",
      "Preview the parsed table on the right to confirm it looks correct.",
      "Select the delimiter that matches your source file if it isn't comma-separated.",
      "Click \"Download Excel (.xlsx)\" to save it as a spreadsheet file.",
    ],
    features: [
      "Generates a real .xlsx workbook using the industry-standard SheetJS library.",
      "Live table preview before you download.",
      "Supports comma, semicolon, and tab delimited CSV sources.",
      "100% client-side conversion \u2014 no file is ever uploaded to a server.",
      "Free and unlimited, with no row limits.",
    ],
    faq: [
      {
        question: "Does the downloaded file open in Microsoft Excel and Google Sheets?",
        answer:
          "Yes. The generated .xlsx file is a standard Excel Open XML workbook, fully compatible with Microsoft Excel, Google Sheets, LibreOffice Calc, and Apple Numbers.",
      },
      {
        question: "Is my CSV data uploaded anywhere?",
        answer:
          "No. Both parsing and the .xlsx file generation happen entirely in your browser using JavaScript \u2014 your data never leaves your device.",
      },
      {
        question: "Can I convert large CSV files?",
        answer:
          "Yes, though very large files (tens of thousands of rows) will take longer to render in the preview table depending on your device's performance. The conversion itself has no hard row limit.",
      },
    ],
  },
  "csv/cleaner": {
    howToUse: [
      "Paste your messy CSV data into the input box on the left.",
      "Toggle \"Trim whitespace\" to strip padding from every cell.",
      "Toggle \"Remove empty rows\" to drop rows where every cell is blank.",
      "Toggle \"Remove duplicate rows\" to keep only the first occurrence of each unique row.",
      "Copy or download the cleaned CSV, and check the summary for how many rows were removed.",
    ],
    features: [
      "Removes fully empty rows in one click.",
      "Deduplicates rows based on their full content.",
      "Trims leading and trailing whitespace from every field.",
      "Shows a before/after row count summary so you know exactly what changed.",
      "Runs entirely client-side \u2014 your data is never uploaded.",
    ],
    faq: [
      {
        question: "How does duplicate detection work?",
        answer:
          "A row is considered a duplicate if every cell value exactly matches a previously seen row (after trimming, if enabled). Only the first occurrence is kept.",
      },
      {
        question: "Will this remove rows that are only partially empty?",
        answer:
          "No, \"Remove empty rows\" only removes rows where every single cell is empty. Rows with at least one non-empty cell are kept.",
      },
      {
        question: "Can I clean tab-separated or semicolon-separated files?",
        answer: "Yes, select the appropriate delimiter before cleaning \u2014 the same delimiter is used for the output.",
      },
    ],
  },
  "csv/diff": {
    howToUse: [
      "Paste the original CSV into the left box and the changed version into the right box.",
      "Differences are calculated automatically, row by row and column by column.",
      "Each difference shows whether a row was added, removed, or had a changed value, along with the old and new values.",
      "Select the delimiter that matches your files if they aren't comma-separated.",
    ],
    features: [
      "Row-level and cell-level diffing \u2014 pinpoints exactly which column changed in which row.",
      "Clearly labels added, removed, and changed rows.",
      "Supports comma, semicolon, and tab delimited files.",
      "Runs 100% client-side for instant results and full privacy.",
      "Free and unlimited.",
    ],
    faq: [
      {
        question: "How are rows matched between the two files?",
        answer:
          "Rows are compared by their position (row index) after parsing. If rows are reordered, they may show as changed rather than moved \u2014 sort both files consistently before comparing for best results.",
      },
      {
        question: "What do \"added\" and \"removed\" mean here?",
        answer:
          "\"Added\" means a row or field exists in CSV B but not in CSV A. \"Removed\" means it existed in CSV A but is missing from CSV B. \"Changed\" means the same field has a different value in each file.",
      },
      {
        question: "Can I compare CSVs with different column sets?",
        answer:
          "Yes. Columns that exist in one file but not the other will show up as added or removed fields in the diff results.",
      },
    ],
  },
  "sql/formatter": {
    howToUse: [
      "Paste your raw or minified SQL query into the input box on the left.",
      "Choose your SQL dialect (MySQL, PostgreSQL, SQL Server, BigQuery, SQLite, or standard SQL).",
      "Pick a keyword case (UPPERCASE, lowercase, or preserve as-is) and indent width.",
      "Copy the formatted query or download it as a .sql file.",
    ],
    features: [
      "Powered by the widely-used sql-formatter engine, supporting 6+ major SQL dialects.",
      "Consistent indentation for SELECT, JOIN, WHERE, GROUP BY, and subqueries.",
      "Configurable keyword casing and indent width.",
      "Runs 100% in your browser \u2014 your queries never leave your device.",
      "Free and unlimited.",
    ],
    faq: [
      {
        question: "Which SQL dialects are supported?",
        answer:
          "Standard SQL, MySQL, PostgreSQL, SQLite, SQL Server (T-SQL), and BigQuery are available in the dialect selector, each with dialect-specific syntax handling.",
      },
      {
        question: "Will formatting change the meaning of my query?",
        answer:
          "No. Formatting only changes whitespace, indentation, and optionally keyword casing \u2014 the query logic and results are completely unaffected.",
      },
      {
        question: "Can it format multiple statements at once?",
        answer: "Yes, paste multiple semicolon-separated statements and each will be formatted with proper spacing between them.",
      },
    ],
  },
  "sql/minifier": {
    howToUse: [
      "Paste your formatted SQL query into the input box.",
      "The tool strips comments, line breaks, and extra whitespace automatically.",
      "Copy the minified query or download it as a .sql file.",
      "Use this to shrink SQL embedded in application code, migration scripts, or command-line tools.",
    ],
    features: [
      "Removes single-line (--) and block (/* */) comments.",
      "Collapses all whitespace and line breaks while keeping string literals intact.",
      "Preserves query correctness \u2014 only formatting is affected, not logic.",
      "Runs entirely client-side for instant results.",
      "Free and unlimited.",
    ],
    faq: [
      {
        question: "Does minifying remove content inside string literals?",
        answer:
          "No. The minifier is comment- and string-aware, so whitespace collapsing never touches the contents of quoted string values.",
      },
      {
        question: "Why would I minify a SQL query?",
        answer:
          "Minified SQL is easier to embed as a single-line string in application code, environment variables, or CLI commands where multi-line strings are inconvenient.",
      },
      {
        question: "Is this safe to use on production queries?",
        answer: "Yes, minifying only affects whitespace and comments \u2014 the executed query logic remains identical.",
      },
    ],
  },
  "sql/beautifier": {
    howToUse: [
      "Paste your raw or minified SQL query into the input box on the left.",
      "Choose your SQL dialect, keyword case, and indent width.",
      "The beautified query updates instantly on the right.",
      "Copy the result or download it as a .sql file.",
    ],
    features: [
      "Same reliable formatting engine as our SQL Formatter, tuned for readability.",
      "Supports MySQL, PostgreSQL, SQL Server, BigQuery, SQLite, and standard SQL.",
      "Configurable keyword casing and indentation.",
      "Runs 100% client-side \u2014 nothing is uploaded.",
      "Free and unlimited.",
    ],
    faq: [
      {
        question: "What's the difference between the Formatter and Beautifier tools?",
        answer:
          "They use the same underlying engine and produce identical results \u2014 both names are offered since developers search for either term when looking to clean up SQL.",
      },
      {
        question: "Can I beautify deeply nested subqueries?",
        answer: "Yes, nested subqueries, CTEs (WITH clauses), and JOINs are all indented consistently based on their nesting depth.",
      },
      {
        question: "Is my SQL sent to a server?",
        answer: "No, all beautification happens locally in your browser using JavaScript.",
      },
    ],
  },
  "sql/validator": {
    howToUse: [
      "Paste your SQL query into the input box.",
      "The validator parses it instantly and reports whether it's syntactically valid.",
      "If invalid, you'll see a precise error message describing the problem.",
      "If valid, you'll see the statement count and keyword count for a quick sanity check.",
    ],
    features: [
      "Full grammar-based SQL parsing, not just simple pattern matching.",
      "Detects unmatched parentheses, missing clauses, and malformed syntax.",
      "Shows statement and keyword counts for valid queries.",
      "Runs 100% in your browser for instant feedback and full privacy.",
      "Free and unlimited.",
    ],
    faq: [
      {
        question: "Does this check if tables and columns actually exist?",
        answer:
          "No, this is a syntax validator only \u2014 it checks that your SQL is grammatically well-formed, not whether referenced tables or columns exist in a real database.",
      },
      {
        question: "Which SQL grammar does it validate against?",
        answer: "It validates against standard SQL grammar, which covers the vast majority of common query syntax across dialects.",
      },
      {
        question: "Can I validate multiple statements separated by semicolons?",
        answer: "Yes, paste as many semicolon-terminated statements as you like \u2014 the statement count reflects how many were found.",
      },
    ],
  },
  "sql/query-builder": {
    howToUse: [
      "Enter your table name and the columns you want to select.",
      "Add one or more WHERE conditions using the column, operator, and value fields, joined with AND/OR.",
      "Optionally set an ORDER BY column and direction, and a row LIMIT.",
      "The generated, properly formatted SQL SELECT statement updates live on the right \u2014 copy or download it.",
    ],
    features: [
      "No SQL knowledge required \u2014 build valid SELECT queries entirely through form fields.",
      "Supports DISTINCT, multiple WHERE conditions with AND/OR, IN lists, IS NULL checks, ORDER BY, and LIMIT.",
      "Automatically quotes string values and leaves numbers/booleans unquoted.",
      "Output is auto-formatted for readability.",
      "Free and unlimited, runs entirely in your browser.",
    ],
    faq: [
      {
        question: "Can I build queries with multiple WHERE conditions?",
        answer: "Yes, click \"Add condition\" to add as many conditions as needed, each joined to the previous one with AND or OR.",
      },
      {
        question: "Does it support JOINs or subqueries?",
        answer:
          "The visual builder currently focuses on single-table SELECT queries. For JOINs or subqueries, write the SQL directly and use our SQL Formatter to clean it up.",
      },
      {
        question: "Are values automatically escaped?",
        answer: "Yes, text values are wrapped in quotes with embedded quotes escaped, while numbers and booleans are left unquoted.",
      },
    ],
  },
  "sql/uppercase": {
    howToUse: [
      "Paste your SQL query into the input box, in any keyword case.",
      "Every reserved SQL keyword (SELECT, FROM, WHERE, JOIN, ORDER BY, and 100+ others) is converted to UPPERCASE automatically.",
      "Table names, column names, string literals, and comments are left completely untouched.",
      "Copy the result or download it as a .sql file.",
    ],
    features: [
      "Recognizes 100+ reserved SQL keywords across common dialects.",
      "String- and comment-aware \u2014 never modifies quoted values or comment text.",
      "Preserves your original query layout and indentation exactly.",
      "Runs entirely client-side for instant results.",
      "Free and unlimited.",
    ],
    faq: [
      {
        question: "Will this change my table or column names?",
        answer:
          "No, only reserved SQL keywords are affected. Identifiers like table and column names keep their original casing, even if they happen to match a keyword-like word.",
      },
      {
        question: "Does it reformat indentation too?",
        answer:
          "No, this tool only changes keyword casing and leaves all whitespace, line breaks, and indentation exactly as you wrote them. Use the SQL Formatter if you also want reflowed indentation.",
      },
      {
        question: "Are string literals affected?",
        answer: "No, the tool is string- and comment-aware, so text inside quotes or comments is never modified.",
      },
    ],
  },
  "sql/lowercase": {
    howToUse: [
      "Paste your SQL query into the input box, in any keyword case.",
      "Every reserved SQL keyword is converted to lowercase automatically.",
      "Table names, column names, string literals, and comments are left completely untouched.",
      "Copy the result or download it as a .sql file.",
    ],
    features: [
      "Recognizes 100+ reserved SQL keywords across common dialects.",
      "String- and comment-aware \u2014 never modifies quoted values or comment text.",
      "Preserves your original query layout and indentation exactly.",
      "Runs entirely client-side for instant results.",
      "Free and unlimited.",
    ],
    faq: [
      {
        question: "Why would I want lowercase SQL keywords?",
        answer:
          "Many style guides (and personal preferences) favor lowercase keywords for a cleaner, less shouty look \u2014 this tool converts existing queries to match that style instantly.",
      },
      {
        question: "Will this affect data type names like VARCHAR or INT?",
        answer: "Yes, common data type keywords are included in the recognized keyword list and will be lowercased along with clause keywords.",
      },
      {
        question: "Is my query data sent anywhere?",
        answer: "No, the conversion happens entirely in your browser using JavaScript.",
      },
    ],
  },
  "sql/to-json": {
    howToUse: [
      "Paste one or more INSERT INTO ... VALUES statements into the input box.",
      "The tool extracts the column names and every value tuple automatically.",
      "The equivalent JSON array of objects is generated on the right.",
      "Copy the JSON or download it as a .json file.",
    ],
    features: [
      "Supports multiple VALUES tuples in a single INSERT statement, and multiple INSERT statements at once.",
      "Automatically converts SQL NULL, TRUE/FALSE, numbers, and quoted strings into their native JSON types.",
      "Handles escaped quotes inside string literals correctly.",
      "Runs 100% client-side \u2014 your SQL never leaves your browser.",
      "Free and unlimited.",
    ],
    faq: [
      {
        question: "What SQL statement formats are supported?",
        answer:
          "This tool parses standard INSERT INTO table (col1, col2) VALUES (...), (...); statements, including multiple statements and multiple value tuples per statement.",
      },
      {
        question: "Can it convert SELECT query results?",
        answer:
          "No, it's designed for INSERT statements specifically. If you have tabular SELECT results, export them as CSV and use our CSV to JSON tool instead.",
      },
      {
        question: "How are NULL and boolean values handled?",
        answer: "SQL NULL becomes JSON null, and TRUE/FALSE become native JSON booleans, matching their actual data types.",
      },
    ],
  },
  "sql/from-json": {
    howToUse: [
      "Paste a JSON object or array of objects into the input box.",
      "Enter your target table name in the toolbar.",
      "One INSERT INTO statement is generated per JSON object, using all keys found across the array as columns.",
      "Copy the SQL or download it as a .sql file to run against your database.",
    ],
    features: [
      "Generates one INSERT statement per JSON object, safe for running individually or in a batch.",
      "Automatically escapes single quotes in string values to prevent broken syntax.",
      "Converts JSON null, true/false, and numbers into their correct SQL literal forms.",
      "Union of all keys across the array is used as the column list, so missing fields become NULL.",
      "Runs entirely client-side \u2014 free and unlimited.",
    ],
    faq: [
      {
        question: "What happens if some objects are missing certain fields?",
        answer:
          "The column list is built from the union of every key found across all objects. Objects missing a given key will have NULL inserted for that column.",
      },
      {
        question: "Are nested objects or arrays supported as values?",
        answer:
          "Nested objects and arrays are serialized to a JSON string literal so the INSERT statement remains valid \u2014 consider flattening your data first for structured columns.",
      },
      {
        question: "Does this run the INSERT statements against a database?",
        answer:
          "No, this tool only generates the SQL text. Copy the output and run it using your own database client, migration tool, or ORM.",
      },
    ],
  },
  "security/base64-encode": {
    howToUse: [
      "Type or paste any text into the input box on the left.",
      "The Base64-encoded result appears instantly on the right.",
      "Copy the result or download it as a text file.",
      "Works with Unicode text, emoji, and special characters, not just plain ASCII.",
    ],
    features: [
      "Correctly handles Unicode text (emoji, accented characters, non-Latin scripts) via UTF-8 encoding.",
      "Runs entirely client-side using the browser's native btoa API \u2014 nothing is uploaded.",
      "Instant, real-time encoding as you type.",
      "Free and unlimited.",
    ],
    faq: [
      {
        question: "What is Base64 encoding used for?",
        answer:
          "Base64 converts binary or text data into an ASCII string, commonly used for embedding data in JSON, URLs, email attachments, and HTTP Basic Auth headers.",
      },
      {
        question: "Does this handle emoji and non-English text correctly?",
        answer:
          "Yes, the input is first converted to UTF-8 bytes before Base64 encoding, so emoji and international characters round-trip correctly.",
      },
      {
        question: "Is Base64 the same as encryption?",
        answer:
          "No. Base64 is an encoding scheme, not encryption \u2014 anyone can decode it instantly. Never use it to protect sensitive data.",
      },
    ],
  },
  "security/base64-decode": {
    howToUse: [
      "Paste your Base64-encoded string into the input box on the left.",
      "The decoded, human-readable text appears instantly on the right.",
      "Copy the result or download it as a text file.",
      "Invalid or malformed Base64 shows a clear error message.",
    ],
    features: [
      "Correctly decodes UTF-8 text, including emoji and international characters.",
      "Handles both padded and unpadded Base64 strings, and strips accidental whitespace.",
      "Clear error messages for invalid input.",
      "Runs entirely in your browser \u2014 free and unlimited.",
    ],
    faq: [
      {
        question: "What happens if I paste invalid Base64?",
        answer: "You'll see a clear error message explaining that the input isn't valid Base64, instead of garbled output.",
      },
      {
        question: "Can this decode Base64 that was encoded elsewhere (not by this tool)?",
        answer: "Yes, it decodes any standard Base64 string, regardless of what tool or language originally encoded it.",
      },
      {
        question: "Does it support Base64URL (with - and _ instead of + and /)?",
        answer:
          "This decoder expects standard Base64 with +/ characters. For Base64URL-encoded tokens like JWTs, use our JWT Decoder tool instead.",
      },
    ],
  },
  "security/url-encode": {
    howToUse: [
      "Type or paste text \u2014 or a full URL \u2014 into the input box.",
      "The percent-encoded result appears instantly on the right.",
      "Toggle \"Encode as full URL\" to keep structural characters like :/?# untouched (encodeURI behavior) instead of encoding everything (encodeURIComponent behavior).",
      "Copy the encoded result for use in query strings, form data, or API requests.",
    ],
    features: [
      "Two encoding modes: full-string component encoding, or URL-safe encoding that preserves URL structure.",
      "Correctly handles spaces, symbols, and Unicode characters.",
      "Runs entirely in your browser using native JavaScript encoding functions.",
      "Free and unlimited.",
    ],
    faq: [
      {
        question: "What's the difference between the two encoding modes?",
        answer:
          "Component encoding (default) escapes every special character, ideal for encoding a single query parameter value. Full URL encoding preserves characters like :, /, ?, and # so an entire URL still works as a URL.",
      },
      {
        question: "Why do spaces become %20 or +?",
        answer:
          "Percent-encoding represents a space as %20. Some systems (like HTML form submissions) use + instead \u2014 this tool follows the standard %20 convention used in URIs.",
      },
      {
        question: "Can I encode an entire URL with query parameters?",
        answer:
          "Yes, enable \"Encode as full URL\" to encode special characters in the text while leaving the URL's structural characters intact.",
      },
    ],
  },
  "security/url-decode": {
    howToUse: [
      "Paste a percent-encoded string (containing %XX sequences) into the input box.",
      "The decoded, human-readable text appears instantly on the right.",
      "Copy the result for use elsewhere.",
      "Malformed percent-encoding shows a clear error message.",
    ],
    features: [
      "Decodes any valid percent-encoded (URI-encoded) string.",
      "Handles Unicode characters encoded as multi-byte UTF-8 sequences.",
      "Clear error messages for malformed %XX sequences.",
      "Runs entirely client-side \u2014 free and unlimited.",
    ],
    faq: [
      {
        question: "What does a %XX sequence mean?",
        answer:
          "Each %XX is a hexadecimal byte value \u2014 for example, %20 represents a space character and %26 represents an ampersand (&).",
      },
      {
        question: "Can this decode a full URL with a query string?",
        answer: "Yes, paste the entire URL and any percent-encoded segments within it will be decoded back to readable text.",
      },
      {
        question: "What if the input has a malformed %XX sequence?",
        answer: "You'll see an error message indicating the percent-encoding is invalid, rather than silently producing incorrect output.",
      },
    ],
  },
  "security/jwt-decoder": {
    howToUse: [
      "Paste your JSON Web Token (header.payload.signature) into the input box.",
      "The decoded header and payload appear instantly as formatted JSON.",
      "Common claims like iat, nbf, and exp are translated into human-readable dates, with an expired/not-expired indicator.",
      "Optionally enter the HMAC secret to verify the token's signature (for HS256/HS384/HS512 tokens).",
    ],
    features: [
      "Instantly decodes the header and payload without needing the secret key.",
      "Optional client-side signature verification for HMAC-signed tokens.",
      "Human-readable timestamps for iat, nbf, and exp claims, with expiry status.",
      "Runs 100% in your browser \u2014 your tokens and secrets are never sent anywhere.",
      "Free and unlimited.",
    ],
    faq: [
      {
        question: "Do I need the secret key to decode a JWT?",
        answer:
          "No. The header and payload of a JWT are just Base64URL-encoded JSON, not encrypted, so they can be decoded without any secret. The secret is only needed to verify the signature.",
      },
      {
        question: "Is my secret key sent to a server when I verify a signature?",
        answer: "No, signature verification uses your browser's built-in Web Crypto API and happens entirely locally.",
      },
      {
        question: "Why does it say the token is expired?",
        answer:
          "If the token's exp claim (a Unix timestamp) is earlier than the current time, the tool flags it as expired \u2014 this is a standard JWT expiration check.",
      },
    ],
  },
  "security/jwt-generator": {
    howToUse: [
      "Edit the JSON payload with your desired claims (e.g. sub, name, role).",
      "Choose an algorithm (HS256, HS384, or HS512) and an expiry duration.",
      "Enter your secret key.",
      "The signed JWT is generated instantly \u2014 copy it for use in your application or API testing.",
    ],
    features: [
      "Supports HS256, HS384, and HS512 HMAC signing algorithms.",
      "Automatically adds iat (issued at) and exp (expiry) claims based on your settings.",
      "Real-time signing using the Web Crypto API \u2014 no server round-trip.",
      "Free and unlimited, with your secret never leaving your browser.",
    ],
    faq: [
      {
        question: "Is this safe to use with real production secrets?",
        answer:
          "The signing happens entirely in your browser and nothing is transmitted over the network, but as a best practice, avoid pasting production secrets into any online tool \u2014 use a placeholder secret for testing when possible.",
      },
      {
        question: "Can I generate RS256 (RSA-signed) tokens?",
        answer:
          "This generator currently supports HMAC-based algorithms (HS256/384/512) only. RSA and ECDSA signing require key pair management and are not yet supported.",
      },
      {
        question: "What claims should I include in my payload?",
        answer:
          "Common claims include sub (subject/user ID), name, role, iat (issued at), and exp (expiry). You're free to add any custom claims your application needs.",
      },
    ],
  },
  "security/md5": {
    howToUse: [
      "Type or paste any text into the input box.",
      "The MD5 hash is computed instantly and shown below.",
      "Switch between hex and Base64 encoding, and toggle uppercase hex output.",
      "Copy the hash for use in checksums, cache keys, or legacy system compatibility.",
    ],
    features: [
      "Pure JavaScript MD5 implementation, computed entirely in your browser.",
      "Supports hex and Base64 output encoding.",
      "Instant, real-time hashing as you type.",
      "Free and unlimited.",
    ],
    faq: [
      {
        question: "Is MD5 secure for passwords?",
        answer:
          "No. MD5 is cryptographically broken and far too fast to compute, making it unsuitable for password storage. Use bcrypt for passwords \u2014 MD5 is only appropriate for non-security checksums like detecting accidental file corruption.",
      },
      {
        question: "Why isn't MD5 available in the browser's native Web Crypto API?",
        answer:
          "Web Crypto intentionally omits MD5 and SHA-1 for signing/security use because they're considered broken. This tool implements the MD5 algorithm directly in JavaScript for compatibility and legacy use cases.",
      },
      {
        question: "Will the same input always produce the same MD5 hash?",
        answer: "Yes, MD5 is deterministic \u2014 identical input always produces an identical 128-bit hash.",
      },
    ],
  },
  "security/sha1": {
    howToUse: [
      "Type or paste any text into the input box.",
      "The SHA-1 hash is computed instantly using your browser's native Web Crypto API.",
      "Switch between hex and Base64 encoding, and toggle uppercase hex output.",
      "Copy the hash for checksums or legacy compatibility (e.g. Git object hashes).",
    ],
    features: [
      "Computed using the browser's native, hardware-accelerated Web Crypto API.",
      "Supports hex and Base64 output encoding.",
      "Instant, real-time hashing as you type.",
      "Free and unlimited, fully client-side.",
    ],
    faq: [
      {
        question: "Is SHA-1 secure?",
        answer:
          "SHA-1 is considered cryptographically weak for security-critical applications (collisions have been demonstrated) and has been deprecated for digital signatures and TLS certificates. It's still fine for non-adversarial checksums and is used internally by Git.",
      },
      {
        question: "What should I use instead of SHA-1 for security purposes?",
        answer: "Use SHA-256 or SHA-512 for security-sensitive hashing, and bcrypt specifically for password storage.",
      },
      {
        question: "How long is a SHA-1 hash?",
        answer: "SHA-1 produces a 160-bit (20-byte) digest, shown as 40 hex characters or its Base64 equivalent.",
      },
    ],
  },
  "security/sha256": {
    howToUse: [
      "Type or paste any text into the input box.",
      "The SHA-256 hash is computed instantly using your browser's native Web Crypto API.",
      "Switch between hex and Base64 encoding, and toggle uppercase hex output.",
      "Copy the hash for checksums, data integrity verification, or blockchain-style applications.",
    ],
    features: [
      "Computed using the browser's native, hardware-accelerated Web Crypto API.",
      "Supports hex and Base64 output encoding.",
      "Instant, real-time hashing as you type.",
      "Free and unlimited, fully client-side \u2014 your text is never uploaded.",
    ],
    faq: [
      {
        question: "What is SHA-256 commonly used for?",
        answer:
          "SHA-256 is widely used for data integrity checksums, digital signatures, certificate fingerprints, password hashing (combined with salting), and blockchain proof-of-work (e.g. Bitcoin).",
      },
      {
        question: "How long is a SHA-256 hash?",
        answer: "SHA-256 produces a 256-bit (32-byte) digest, shown as 64 hex characters or its Base64 equivalent.",
      },
      {
        question: "Should I use SHA-256 to hash passwords directly?",
        answer:
          "No, plain SHA-256 is too fast and lacks built-in salting, making it vulnerable to brute-force and rainbow table attacks. Use bcrypt for password storage instead.",
      },
    ],
  },
  "security/sha512": {
    howToUse: [
      "Type or paste any text into the input box.",
      "The SHA-512 hash is computed instantly using your browser's native Web Crypto API.",
      "Switch between hex and Base64 encoding, and toggle uppercase hex output.",
      "Copy the hash for high-security checksums or data integrity verification.",
    ],
    features: [
      "Computed using the browser's native, hardware-accelerated Web Crypto API.",
      "Supports hex and Base64 output encoding.",
      "Produces a longer, higher-security digest than SHA-256.",
      "Free and unlimited, fully client-side.",
    ],
    faq: [
      {
        question: "How is SHA-512 different from SHA-256?",
        answer:
          "SHA-512 produces a longer 512-bit (64-byte) digest and generally performs faster on 64-bit systems, offering a larger security margin at the cost of a longer output.",
      },
      {
        question: "Which should I use, SHA-256 or SHA-512?",
        answer:
          "Both are currently considered secure. SHA-256 is more common and produces a shorter hash, while SHA-512 offers extra headroom for very long-term security requirements.",
      },
      {
        question: "Is SHA-512 suitable for hashing passwords?",
        answer:
          "Not on its own \u2014 like SHA-256, it's too fast for password storage without proper salting and iteration. Use bcrypt for passwords instead.",
      },
    ],
  },
  "security/hmac": {
    howToUse: [
      "Enter the message you want to sign and your secret key.",
      "Choose the underlying hash algorithm (SHA-1, SHA-256, SHA-384, or SHA-512).",
      "The HMAC signature is computed instantly and shown in hex or Base64.",
      "Use this to verify webhook payloads, sign API requests, or generate message authentication codes.",
    ],
    features: [
      "Supports HMAC-SHA1, HMAC-SHA256, HMAC-SHA384, and HMAC-SHA512.",
      "Computed using the browser's native Web Crypto API for speed and correctness.",
      "Hex and Base64 output encoding.",
      "Your message and secret never leave your browser.",
    ],
    faq: [
      {
        question: "What is HMAC used for?",
        answer:
          "HMAC (Hash-based Message Authentication Code) combines a secret key with a hash function to verify both the integrity and authenticity of a message \u2014 commonly used to verify webhook signatures (e.g. Stripe, GitHub) and sign API requests.",
      },
      {
        question: "Which HMAC algorithm should I use?",
        answer:
          "HMAC-SHA256 is the most widely used and is a safe default. Use whichever algorithm matches what the service or API you're integrating with expects.",
      },
      {
        question: "Is my secret key exposed to any server?",
        answer: "No, the HMAC computation runs entirely in your browser using the Web Crypto API.",
      },
    ],
  },
  "security/bcrypt": {
    howToUse: [
      "Enter a password and choose the number of salt rounds (higher is slower but more secure).",
      "Click \"Generate hash\" to compute the bcrypt hash.",
      "Use the verify section to check whether a plain-text password matches an existing bcrypt hash.",
      "Copy the generated hash for storing in your database's password column.",
    ],
    features: [
      "Full bcrypt implementation (via the widely-used bcryptjs library) running entirely in your browser.",
      "Adjustable salt rounds (cost factor) from 4 to 14.",
      "Built-in password verification against an existing hash.",
      "Your password is never sent to a server \u2014 hashing happens locally.",
    ],
    faq: [
      {
        question: "Why does bcrypt take longer than MD5 or SHA-256?",
        answer:
          "Bcrypt is intentionally slow and configurable (via salt rounds) to make brute-force and dictionary attacks impractical \u2014 this is exactly why it's the recommended choice for password storage.",
      },
      {
        question: "What salt rounds value should I use?",
        answer:
          "10-12 rounds is a common default for production systems in 2026, balancing security and server load. Higher values are more secure but slower to compute on every login.",
      },
      {
        question: "Does bcrypt include the salt in the output hash?",
        answer:
          "Yes, a bcrypt hash string encodes the algorithm version, cost factor, and salt together, so you only need to store the single hash string \u2014 no separate salt column required.",
      },
    ],
  },
  "security/password-generator": {
    howToUse: [
      "Adjust the length slider and toggle which character sets to include (uppercase, lowercase, numbers, symbols).",
      "Optionally exclude ambiguous characters (i, l, 1, L, o, 0, O) for easier manual transcription.",
      "A new password is generated automatically as you change any option, or click \"Generate new password\" for a fresh one.",
      "Copy the password, and check its strength meter for a quick sanity check.",
    ],
    features: [
      "Uses your browser's cryptographically secure random number generator (crypto.getRandomValues), not Math.random.",
      "Fully customizable length (6-64 characters) and character sets.",
      "Optional exclusion of visually ambiguous characters.",
      "Built-in strength indicator with entropy estimate.",
      "Free, unlimited, and generated entirely on your device.",
    ],
    faq: [
      {
        question: "Are these passwords truly random and secure?",
        answer:
          "Yes, passwords are generated using the Web Crypto API's cryptographically secure random number generator, the same class of randomness used for cryptographic keys \u2014 not the weaker Math.random().",
      },
      {
        question: "What password length is recommended?",
        answer:
          "12-16 characters with all character sets enabled is a strong baseline for most accounts in 2026. Use 20+ characters for highly sensitive accounts like your password manager master password.",
      },
      {
        question: "Are generated passwords stored anywhere?",
        answer: "No, passwords are generated and displayed entirely in your browser and are never transmitted or stored on any server.",
      },
    ],
  },
  "security/password-strength": {
    howToUse: [
      "Type a password into the input field \u2014 click \"Show\" to reveal it as you type.",
      "The strength meter, label, and estimated entropy update in real time.",
      "Review the feedback list for specific suggestions to improve the password.",
      "Check the estimated offline crack time for a concrete sense of how strong (or weak) the password is.",
    ],
    features: [
      "Real-time entropy calculation based on character set diversity and length.",
      "Detects common passwords, repeated characters, and sequential/keyboard patterns.",
      "Estimated crack time under a realistic offline brute-force scenario.",
      "Actionable, specific feedback rather than a vague score.",
      "Your password is analyzed entirely in your browser and never transmitted anywhere.",
    ],
    faq: [
      {
        question: "How is the strength score calculated?",
        answer:
          "The tool estimates entropy (bits of randomness) based on password length and character variety, then reduces that estimate when it detects common passwords, repeated characters, or predictable sequences like \"1234\" or \"qwerty\".",
      },
      {
        question: "Is my password sent anywhere for analysis?",
        answer: "No, all analysis happens locally in your browser using JavaScript \u2014 your password is never transmitted or logged.",
      },
      {
        question: "What does the estimated crack time mean?",
        answer:
          "It's a rough estimate of how long an offline attacker with significant computing power (10 billion guesses per second) would take to brute-force your password, assuming no other information about it.",
      },
    ],
  },
  "security/random-token": {
    howToUse: [
      "Choose your desired token length and output format (hex, Base64, Base64 URL-safe, alphanumeric, or numeric PIN).",
      "Select how many tokens to generate at once.",
      "Tokens are generated instantly \u2014 copy an individual token or copy all of them at once.",
      "Use these for API keys, session tokens, password reset links, or verification codes.",
    ],
    features: [
      "Uses your browser's cryptographically secure random number generator (crypto.getRandomValues).",
      "Five output formats: hex, Base64, URL-safe Base64, alphanumeric, and numeric-only (for PINs/OTPs).",
      "Generate multiple tokens at once, with individual or bulk copy.",
      "Free, unlimited, and generated entirely on your device.",
    ],
    faq: [
      {
        question: "Are these tokens suitable for use as API keys or session identifiers?",
        answer:
          "Yes, tokens are generated with a cryptographically secure random source, making them suitable for API keys, session tokens, CSRF tokens, and similar security-sensitive identifiers.",
      },
      {
        question: "What format should I use for a URL-safe token (e.g. in a password reset link)?",
        answer:
          "Use the \"Base64 (URL-safe)\" format \u2014 it avoids characters like + and / that need extra encoding when placed directly in a URL.",
      },
      {
        question: "Can I generate a numeric one-time password (OTP)?",
        answer: "Yes, select the \"Numeric (PIN)\" format and set the length to 6 for a typical 6-digit OTP code.",
      },
    ],
  },
  "ids/uuid-v1": {
    howToUse: [
      "Choose how many UUIDs you want to generate and your formatting preferences.",
      "UUID v1 identifiers are generated instantly, combining the current timestamp with a random node ID.",
      "Copy an individual UUID or copy the entire batch at once.",
      "Toggle uppercase or remove hyphens if your target system requires a different format.",
    ],
    features: [
      "RFC 4122-compliant UUID v1 structure with a 60-bit timestamp component.",
      "Uses a random, privacy-preserving node ID (with the multicast bit set) instead of your real MAC address.",
      "Batch generation with individual or bulk copy.",
      "Runs entirely in your browser \u2014 free and unlimited.",
    ],
    faq: [
      {
        question: "Does this use my computer's real MAC address?",
        answer:
          "No. For privacy, this generator uses a randomly generated 48-bit node ID with the multicast bit set, which is the standard approach used by modern UUID v1 implementations instead of exposing your real network hardware address.",
      },
      {
        question: "When should I use UUID v1 instead of UUID v4?",
        answer:
          "UUID v1 embeds a timestamp, so UUIDs generated later sort after ones generated earlier (roughly), which can be useful for legacy systems that expect this behavior. For most new applications, UUID v4 or UUID v7 is recommended.",
      },
      {
        question: "Are UUID v1 values generated here unique?",
        answer:
          "Yes, the combination of a millisecond-precision timestamp, a random clock sequence, and a random node ID makes collisions astronomically unlikely.",
      },
    ],
  },
  "ids/uuid-v4": {
    howToUse: [
      "Choose how many UUIDs you want to generate.",
      "UUID v4 identifiers \u2014 128-bit random values \u2014 are generated instantly.",
      "Copy an individual UUID or copy the entire batch at once.",
      "Toggle uppercase or remove hyphens if your target system requires a different format.",
    ],
    features: [
      "Uses the browser's native, cryptographically secure crypto.randomUUID() API where available.",
      "RFC 4122-compliant version and variant bits.",
      "Batch generation with individual or bulk copy.",
      "Free, unlimited, and generated entirely on your device.",
    ],
    faq: [
      {
        question: "How unique is a UUID v4?",
        answer:
          "A UUID v4 has 122 random bits, giving roughly 5.3 x 10^36 possible values. Collisions are so unlikely that they're not a practical concern even at massive scale.",
      },
      {
        question: "Is UUID v4 suitable for database primary keys?",
        answer:
          "Yes, UUID v4 is a very common choice for primary keys, especially in distributed systems where IDs need to be generated independently without a central counter. If insertion order/index locality matters, consider UUID v7 instead.",
      },
      {
        question: "Are these UUIDs generated securely?",
        answer:
          "Yes, they use the Web Crypto API's cryptographically secure random number generator, not Math.random(), so they're suitable for security-sensitive use cases too.",
      },
    ],
  },
  "ids/uuid-v7": {
    howToUse: [
      "Choose how many UUIDs you want to generate.",
      "UUID v7 identifiers are generated instantly, combining a millisecond-precision timestamp with random bits.",
      "Copy an individual UUID or copy the entire batch at once.",
      "Generate a few in a row and notice how they sort in increasing order \u2014 that's the key benefit of v7.",
    ],
    features: [
      "RFC 9562-compliant UUID v7 structure with a 48-bit big-endian millisecond timestamp.",
      "Time-ordered: UUIDs generated later always sort after ones generated earlier.",
      "Better database index locality than UUID v4 while still being globally unique.",
      "Runs entirely in your browser \u2014 free and unlimited.",
    ],
    faq: [
      {
        question: "Why would I use UUID v7 instead of UUID v4?",
        answer:
          "UUID v7 embeds a timestamp in its most significant bits, so IDs are naturally sortable by creation time. This gives much better B-tree index locality in databases compared to the fully random UUID v4, reducing index fragmentation.",
      },
      {
        question: "Does UUID v7 leak sensitive information?",
        answer:
          "It embeds the creation timestamp (to millisecond precision), which is slightly more information than UUID v4 reveals. This is rarely a concern, but worth knowing if your IDs are ever exposed publicly.",
      },
      {
        question: "Is UUID v7 an official standard?",
        answer:
          "Yes, UUID v7 is defined in RFC 9562 (published 2024), which also formally deprecated some older guidance and codified UUID v6, v7, and v8.",
      },
    ],
  },
  "ids/guid": {
    howToUse: [
      "Choose how many GUIDs you want to generate.",
      "Toggle uppercase, braces {}, and hyphen formatting to match your target platform's conventions.",
      "GUIDs are generated instantly using the same secure random process as UUID v4.",
      "Copy an individual GUID or copy the entire batch at once.",
    ],
    features: [
      "Supports Microsoft-style formatting with braces, e.g. {3F2504E0-4F89-11D3-9A0C-0305E82C3301}.",
      "Optional uppercase output and hyphen removal for other platform conventions.",
      "Uses the same cryptographically secure random generation as UUID v4 \u2014 GUID and UUID v4 are the same underlying format.",
      "Free, unlimited, and generated entirely in your browser.",
    ],
    faq: [
      {
        question: "What's the difference between a GUID and a UUID?",
        answer:
          "They're the same underlying 128-bit format \u2014 \"GUID\" (Globally Unique Identifier) is Microsoft's terminology, while \"UUID\" (Universally Unique Identifier) is the term used in RFC 4122 and most other ecosystems.",
      },
      {
        question: "Why would I want braces around my GUID?",
        answer:
          "Some Windows APIs and .NET's Guid.ToString(\"B\") format expect GUIDs wrapped in curly braces \u2014 enable the braces option to match that convention exactly.",
      },
      {
        question: "Can I generate a GUID without hyphens?",
        answer: "Yes, disable \"Include hyphens\" to get a compact 32-character hexadecimal string with no separators.",
      },
    ],
  },
  "ids/nano-id": {
    howToUse: [
      "Adjust the length slider (default 21 characters, matching the standard Nano ID size).",
      "Optionally enable a custom alphabet if you need to restrict output to specific characters.",
      "Nano IDs are generated instantly using a cryptographically secure random source.",
      "Copy an individual ID or copy the entire batch at once.",
    ],
    features: [
      "Powered by the widely-used, security-audited nanoid library.",
      "URL-safe by default (uses A-Z, a-z, 0-9, _, and - \u2014 no encoding needed in URLs).",
      "Customizable length and alphabet.",
      "Much shorter than a UUID while maintaining a comparably low collision probability.",
    ],
    faq: [
      {
        question: "How does Nano ID compare to UUID?",
        answer:
          "The default 21-character Nano ID has a collision probability comparable to a 36-character UUID v4, but is roughly 40% shorter and uses a URL-safe character set by default \u2014 no encoding needed when used in URLs.",
      },
      {
        question: "Is Nano ID cryptographically secure?",
        answer:
          "Yes, it uses your browser's Web Crypto API (crypto.getRandomValues) as its random source, the same class of randomness used for cryptographic keys.",
      },
      {
        question: "Can I use my own set of characters?",
        answer: "Yes, enable \"Custom alphabet\" and enter exactly the characters you want IDs to be built from.",
      },
    ],
  },
  "ids/random-string": {
    howToUse: [
      "Choose the length and character set (letters, numbers, hex, or a custom set of characters).",
      "Random strings are generated instantly using a cryptographically secure random source.",
      "Copy an individual string or copy the entire batch at once.",
      "Use this for test data, temporary identifiers, verification codes, or placeholder values.",
    ],
    features: [
      "Five built-in character set presets, plus fully custom character pools.",
      "Adjustable length from 1 to 128 characters.",
      "Uses your browser's cryptographically secure random number generator.",
      "Free, unlimited, and generated entirely on your device.",
    ],
    faq: [
      {
        question: "What's the difference between this and the Password Generator?",
        answer:
          "Both use secure randomness, but this tool is aimed at general-purpose strings (test data, IDs, codes) with simpler character-set presets, while the Password Generator is tuned specifically for strong, memorable-length passwords with symbol options.",
      },
      {
        question: "Can I restrict output to only certain characters?",
        answer: "Yes, select \"Custom characters\" and enter exactly the set of characters you want the generator to pick from.",
      },
      {
        question: "Are duplicate characters allowed within a single string?",
        answer: "Yes, each character position is chosen independently, so the same character can appear multiple times in one string.",
      },
    ],
  },
  "ids/random-number": {
    howToUse: [
      "Enter your desired minimum and maximum values (inclusive).",
      "Choose how many numbers to generate.",
      "Enable \"No duplicates\" if you need a unique set of numbers, such as for a lottery draw or randomized sample.",
      "Copy an individual number or copy the entire batch at once.",
    ],
    features: [
      "Uses your browser's cryptographically secure random number generator, not Math.random().",
      "Optional no-duplicates mode using an unbiased Fisher-Yates shuffle.",
      "Supports negative ranges and any integer bounds.",
      "Free, unlimited, and generated entirely on your device.",
    ],
    faq: [
      {
        question: "Is Math.random() used anywhere in this tool?",
        answer:
          "No, all randomness comes from the Web Crypto API's crypto.getRandomValues(), which is designed to be unpredictable and suitable for security-sensitive use cases.",
      },
      {
        question: "What happens if I ask for more unique numbers than fit in my range?",
        answer:
          "The tool detects this and shows a warning, since a range like [1, 10] can only produce 10 unique values \u2014 reduce the count or widen the range to proceed.",
      },
      {
        question: "Can I generate negative numbers?",
        answer: "Yes, enter a negative minimum value \u2014 the tool correctly handles ranges that span negative to positive numbers.",
      },
    ],
  },
  "ids/random-password": {
    howToUse: [
      "Adjust the length slider and toggle which character sets to include.",
      "A new password is generated automatically as you change any option.",
      "Copy the password and check its strength meter for a quick sanity check.",
      "Use the \"Recent passwords\" list if you need to generate and compare a few options quickly.",
    ],
    features: [
      "Uses your browser's cryptographically secure random number generator (crypto.getRandomValues).",
      "Fully customizable length (6-64 characters) and character sets.",
      "Optional exclusion of visually ambiguous characters (i, l, 1, L, o, 0, O).",
      "Built-in strength indicator with entropy estimate.",
      "Free, unlimited, and generated entirely on your device.",
    ],
    faq: [
      {
        question: "Is this the same as the Password Generator in the Security category?",
        answer:
          "Yes, it's the identical secure generator, listed here under the IDs category as well since \"random password\" is a common way people search for this exact tool.",
      },
      {
        question: "What password length is recommended?",
        answer:
          "12-16 characters with all character sets enabled is a strong baseline for most accounts. Use 20+ characters for highly sensitive accounts like a password manager's master password.",
      },
      {
        question: "Are generated passwords stored anywhere?",
        answer: "No, passwords are generated and displayed entirely in your browser and are never transmitted or stored on any server.",
      },
    ],
  },
  "html/formatter": {
    howToUse: [
      "Paste minified or messy HTML markup into the input box, or load the sample.",
      "Click \"Format\" to indent nested tags and place each element on its own line.",
      "Choose 2 spaces, 4 spaces, or a tab as your indent style.",
      "Copy the formatted output or download it as an .html file.",
    ],
    features: [
      "Preserves the raw content of <script>, <style>, <pre>, and <textarea> tags exactly.",
      "Automatically detects void elements (<br>, <img>, <input>, etc.) so they aren't given a false closing indent.",
      "Supports doctype declarations and HTML comments.",
      "Runs entirely in your browser \u2014 your markup is never uploaded anywhere.",
    ],
    faq: [
      {
        question: "Will formatting change how my page renders?",
        answer:
          "No, formatting only adds whitespace between tags for readability. Browsers ignore insignificant whitespace between elements, so the rendered page is unaffected.",
      },
      {
        question: "Does it reformat JavaScript inside <script> tags?",
        answer:
          "No, content inside <script>, <style>, <pre>, and <textarea> is left untouched so you don't end up with broken indentation inside code blocks.",
      },
      {
        question: "Can I switch straight to minified output?",
        answer: "Yes, use the \"Minify\" button to instantly collapse the current input to a single compact line.",
      },
    ],
  },
  "html/minifier": {
    howToUse: [
      "Paste your HTML into the input box, or load the sample.",
      "The minified output \u2014 with comments and unnecessary whitespace removed \u2014 appears instantly on the right.",
      "Copy the result or download it as a ready-to-deploy .html file.",
    ],
    features: [
      "Strips HTML comments while preserving conditional comments (<!--[if ...]-->).",
      "Collapses whitespace between tags without breaking your markup.",
      "Leaves <script>, <style>, <pre>, and <textarea> contents completely untouched.",
      "Client-side only \u2014 nothing is ever sent to a server.",
    ],
    faq: [
      {
        question: "Will minifying break my layout?",
        answer:
          "Minifying only removes whitespace and comments that don't affect rendering. Content inside whitespace-sensitive tags like <pre> is preserved exactly.",
      },
      {
        question: "How much smaller will my file get?",
        answer:
          "It depends on how much indentation and how many comments your source has \u2014 typically 10-30% smaller for hand-formatted markup.",
      },
      {
        question: "Should I minify HTML in production?",
        answer:
          "Many sites do, since it slightly reduces page weight. For larger savings, pair it with gzip/Brotli compression on your server, which handles most of the heavy lifting.",
      },
    ],
  },
  "html/encoder": {
    howToUse: [
      "Type or paste plain text containing special characters, accents, or symbols.",
      "The output shows the text with unsafe and non-ASCII characters converted to HTML entities.",
      "Copy the encoded text and safely embed it inside HTML markup.",
    ],
    features: [
      "Encodes the five HTML-unsafe characters (& < > \" ') as named entities.",
      "Converts every non-ASCII character (accents, emoji, currency symbols, etc.) to a numeric entity (&#NNN;).",
      "Correctly handles multi-byte Unicode characters and emoji using code-point iteration.",
      "Free, unlimited, and entirely client-side.",
    ],
    faq: [
      {
        question: "How is this different from HTML Escape?",
        answer:
          "HTML Escape only converts the five reserved characters (& < > \" ') needed to safely embed text in HTML. HTML Encoder goes further and also converts every non-ASCII character to a numeric entity, which is useful for maximizing compatibility with older systems or strict encodings.",
      },
      {
        question: "Will encoded text look different when rendered?",
        answer:
          "No, browsers decode HTML entities automatically when rendering, so encoded text displays identically to the original \u2014 it only differs in the raw source.",
      },
      {
        question: "Can I encode emoji?",
        answer: "Yes, the encoder iterates by Unicode code point, so emoji and other multi-byte characters are encoded correctly as a single numeric entity each.",
      },
    ],
  },
  "html/decoder": {
    howToUse: [
      "Paste text containing HTML entities, such as &amp;, &lt;, or &#233;.",
      "The decoded, human-readable text appears instantly on the right.",
      "Copy the plain text output for use elsewhere.",
    ],
    features: [
      "Decodes both named entities (&amp;, &copy;, &hearts;, etc.) and numeric entities (&#233;, &#x2665;).",
      "Uses the browser's own HTML parser for 100% accurate, spec-compliant decoding.",
      "Handles hundreds of named entities without needing a manual lookup table.",
      "Runs entirely on your device \u2014 no data is transmitted.",
    ],
    faq: [
      {
        question: "Does it support hexadecimal entities like &#x2665;?",
        answer: "Yes, both decimal (&#9829;) and hexadecimal (&#x2665;) numeric entity formats are decoded correctly.",
      },
      {
        question: "What if my text has no entities at all?",
        answer: "It will pass through unchanged \u2014 the decoder only transforms recognizable entity patterns.",
      },
      {
        question: "Is this safe to use on untrusted input?",
        answer:
          "The decoding itself only extracts text content and does not execute any embedded scripts, since it relies on setting textContent-equivalent HTML parsing rather than rendering the markup live.",
      },
    ],
  },
  "html/preview": {
    howToUse: [
      "Type or paste HTML (including inline <style> and <script>) into the editor on the left, or load the sample.",
      "The live preview on the right updates instantly as you type.",
      "Switch the viewport selector to preview at tablet or mobile widths.",
      "On small screens, use the Code/Preview toggle to switch between editing and viewing.",
    ],
    features: [
      "Renders full HTML documents, including embedded CSS and JavaScript, in a sandboxed iframe.",
      "Instant, debounce-free live updates as you type.",
      "Responsive viewport presets (full width, tablet, mobile) to check layouts quickly.",
      "Nothing is uploaded \u2014 your HTML is rendered entirely inside your own browser.",
    ],
    faq: [
      {
        question: "Is it safe to preview HTML with <script> tags?",
        answer:
          "The preview renders in a sandboxed iframe that blocks access to your page's cookies, storage, and top-level navigation, so scripts in the preview run in an isolated context.",
      },
      {
        question: "Can I preview a full page with CSS?",
        answer: "Yes, paste a complete document including <head>, <style>, and <body> \u2014 the iframe renders it exactly as a browser would.",
      },
      {
        question: "Does this send my HTML anywhere?",
        answer: "No, the preview uses the iframe's srcDoc attribute to render locally; your markup never leaves your browser.",
      },
    ],
  },
  "html/escape": {
    howToUse: [
      "Type or paste raw text that may contain HTML-unsafe characters.",
      "The output shows the text with & < > \" ' converted to their corresponding named entities.",
      "Copy the escaped text and safely insert it into HTML attributes or content.",
    ],
    features: [
      "Escapes exactly the five characters that are unsafe to place directly in HTML: & < > \" '.",
      "Minimal, predictable output ideal for templating engines and server-side rendering.",
      "Fast, lightweight, and processed entirely in your browser.",
    ],
    faq: [
      {
        question: "Why escape only five characters instead of everything?",
        answer:
          "These five characters are the only ones that are structurally unsafe in HTML \u2014 escaping them prevents markup injection while keeping the rest of your text (including accented letters) untouched and easy to read in the source.",
      },
      {
        question: "Should I use this to prevent XSS?",
        answer:
          "Escaping these characters is a core part of XSS prevention when inserting untrusted text into HTML, but always use your framework's built-in escaping (e.g. templating auto-escape) for production code rather than a manual step.",
      },
      {
        question: "How do I reverse this?",
        answer: "Use the HTML Decoder tool to convert escaped entities back into their original characters.",
      },
    ],
  },
  "css/formatter": {
    howToUse: [
      "Paste minified or messy CSS into the input box, or load the sample.",
      "Click \"Format\" to indent selectors, declarations, and nested at-rules like @media.",
      "Choose your preferred indent size (2 spaces, 4 spaces, or a tab).",
      "Copy the formatted output or download it as a .css file.",
    ],
    features: [
      "Correctly handles nested rules such as @media and @supports blocks.",
      "Preserves comments and string literals (e.g. content: \"a;b\") without corrupting them.",
      "One-click Minify button to instantly collapse the current input.",
      "Runs entirely client-side \u2014 your stylesheets are never uploaded.",
    ],
    faq: [
      {
        question: "Does formatting change how my styles apply?",
        answer: "No, formatting only changes whitespace and indentation. The computed styles applied to your page are completely unaffected.",
      },
      {
        question: "Can it handle SCSS or LESS syntax?",
        answer:
          "This formatter targets plain CSS. Nesting, variables, and mixins specific to SCSS/LESS may not format perfectly \u2014 compile to plain CSS first for best results.",
      },
      {
        question: "Are comments preserved?",
        answer: "Yes, /* ... */ comments are kept in place and printed on their own line at the correct indentation level.",
      },
    ],
  },
  "css/minifier": {
    howToUse: [
      "Paste your CSS into the input box, or load the sample.",
      "The minified output \u2014 with comments and whitespace removed \u2014 appears instantly.",
      "Copy the result or download it as a production-ready .css file.",
    ],
    features: [
      "Strips comments and collapses all unnecessary whitespace.",
      "Preserves string literals so content values and quoted URLs are never corrupted.",
      "Removes trailing semicolons before closing braces for a slightly smaller output.",
      "Client-side only \u2014 nothing is sent to a server.",
    ],
    faq: [
      {
        question: "Is minified CSS still valid?",
        answer: "Yes, minifying only removes characters that don't affect how rules are parsed \u2014 the resulting CSS is fully valid.",
      },
      {
        question: "Will this affect selectors with spaces, like descendant combinators?",
        answer:
          "The minifier focuses on whitespace around braces, colons, semicolons, and commas. As with most simple CSS minifiers, unusual selector spacing edge cases should be spot-checked after minifying.",
      },
      {
        question: "Should I minify CSS for production?",
        answer: "Yes, smaller CSS means faster page loads. Pair it with gzip/Brotli compression on your server for maximum savings.",
      },
    ],
  },
  "css/beautifier": {
    howToUse: [
      "Paste minified or inconsistent CSS into the input box.",
      "Click \"Format\" to apply consistent indentation and line breaks.",
      "Adjust the indent size to match your project's style guide.",
    ],
    features: [
      "Identical formatting engine to the CSS Formatter, offered under the name most developers search for.",
      "Consistent, readable output for style guides and code reviews.",
      "Handles nested at-rules, comments, and string literals correctly.",
    ],
    faq: [
      {
        question: "What's the difference between this and CSS Formatter?",
        answer: "None \u2014 \"Beautifier\" and \"Formatter\" are the same underlying tool, listed separately since both terms are common search queries.",
      },
      {
        question: "Can I go back to minified CSS afterward?",
        answer: "Yes, use the CSS Minifier tool, or the Minify button inside this tool, to collapse the beautified CSS again.",
      },
    ],
  },
  "css/grid-generator": {
    howToUse: [
      "Set the number of columns and rows using the sliders.",
      "Adjust column gap and row gap independently.",
      "Choose justify-items and align-items to control how cells fill their tracks.",
      "Copy the generated CSS and apply the .grid-container class to your markup.",
    ],
    features: [
      "Live visual preview with numbered grid cells that update instantly.",
      "Generates clean grid-template-columns / grid-template-rows using the repeat() shorthand.",
      "Independent column-gap and row-gap control.",
      "Covers the most common CSS Grid properties needed for everyday layouts.",
    ],
    faq: [
      {
        question: "Can I create asymmetric column widths, like 2fr 1fr?",
        answer:
          "This generator focuses on equal-width grids using repeat(n, 1fr) for simplicity. Once copied, you can manually edit the grid-template-columns value to use custom track sizes.",
      },
      {
        question: "Does the generated CSS work in all modern browsers?",
        answer: "Yes, CSS Grid is supported in all current versions of Chrome, Firefox, Safari, and Edge.",
      },
      {
        question: "How do I control where a specific item goes?",
        answer: "Add grid-column and grid-row properties to individual child elements once you've applied the generated container styles.",
      },
    ],
  },
  "css/flexbox-generator": {
    howToUse: [
      "Choose a flex-direction (row, row-reverse, column, or column-reverse).",
      "Pick justify-content and align-items values to control spacing and alignment.",
      "Adjust flex-wrap and gap, and preview with a variable number of items.",
      "Copy the generated CSS and apply the .flex-container class to your markup.",
    ],
    features: [
      "Live visual preview that reflows instantly as you change any option.",
      "Covers all core flex container properties: direction, justify-content, align-items, wrap, and gap.",
      "Adjustable item count so you can see how wrapping behaves with more or fewer children.",
      "No frameworks required \u2014 pure, framework-agnostic CSS output.",
    ],
    faq: [
      {
        question: "Does this generate styles for the flex items too?",
        answer:
          "This generator focuses on the flex container. For individual items, add properties like flex-grow, flex-shrink, or flex-basis directly to your child elements as needed.",
      },
      {
        question: "What's the difference between justify-content and align-items?",
        answer:
          "justify-content controls alignment along the main axis (horizontal for row, vertical for column), while align-items controls alignment along the cross axis.",
      },
      {
        question: "Is Flexbox supported in older browsers?",
        answer: "Yes, Flexbox has been supported in all major browsers since around 2015, making it safe to use in virtually any modern project.",
      },
    ],
  },
  "css/border-radius-generator": {
    howToUse: [
      "Drag the corner sliders to adjust each corner's radius, or link them to move together.",
      "Pick a preview box color to visualize the shape clearly.",
      "Copy the generated border-radius declaration into your stylesheet.",
    ],
    features: [
      "Independent control over all four corners, or a single linked slider for uniform rounding.",
      "Live preview box that updates in real time.",
      "Supports radii up to 150px, enough to create fully circular or pill-shaped elements.",
    ],
    faq: [
      {
        question: "How do I make a perfect circle?",
        answer: "Link all corners and set the radius to at least half of the element's width and height (e.g. 50% or a value \u2265 half the box size).",
      },
      {
        question: "Can each corner have a different radius?",
        answer: "Yes, uncheck \"Link all corners\" to adjust the top-left, top-right, bottom-right, and bottom-left radii independently.",
      },
      {
        question: "Does border-radius work with border and box-shadow together?",
        answer: "Yes, border-radius rounds the entire box including its border and any box-shadow, so they all follow the same curve.",
      },
    ],
  },
  "css/box-shadow-generator": {
    howToUse: [
      "Adjust offset-X, offset-Y, blur radius, and spread radius using the sliders.",
      "Pick a shadow color and opacity, and toggle inset if you want an inner shadow.",
      "Copy the generated box-shadow declaration into your stylesheet.",
    ],
    features: [
      "Full control over offset, blur, spread, color, opacity, and inset shadows.",
      "Live preview box with a checkerboard backdrop so semi-transparent shadows are easy to see.",
      "Outputs a single, ready-to-use box-shadow value with an rgba() color.",
    ],
    faq: [
      {
        question: "What's the difference between blur and spread?",
        answer:
          "Blur radius softens the shadow's edges the way a light diffuser would, while spread radius expands or contracts the shadow's size before blurring is applied.",
      },
      {
        question: "How do I create a subtle card shadow?",
        answer: "Try a small offset (2-4px), a moderate blur (12-20px), zero spread, and a low opacity (0.1-0.25) for a soft, realistic elevation effect.",
      },
      {
        question: "Can I stack multiple shadows?",
        answer: "This generator outputs one shadow layer at a time. Copy the value, then manually add a comma-separated second box-shadow value for layered effects.",
      },
    ],
  },
  "css/text-shadow-generator": {
    howToUse: [
      "Type your own preview text and adjust the font size.",
      "Set offset-X, offset-Y, and blur radius for the shadow.",
      "Pick a shadow color, opacity, and text color.",
      "Copy the generated text-shadow declaration into your stylesheet.",
    ],
    features: [
      "Live text preview with your own custom sample text.",
      "Full control over offset, blur, color, and opacity.",
      "Great for headings, glowing text effects, or subtle depth on light backgrounds.",
    ],
    faq: [
      {
        question: "Can I create a glow effect instead of a drop shadow?",
        answer: "Yes, set offset-X and offset-Y to 0 and increase the blur radius \u2014 this produces an even glow around the text in every direction.",
      },
      {
        question: "Does text-shadow affect layout or spacing?",
        answer: "No, text-shadow is purely visual and never affects the text's box size or surrounding layout.",
      },
      {
        question: "Can I apply multiple shadows to the same text?",
        answer: "This generator outputs a single shadow layer. Copy the value and add additional comma-separated text-shadow values manually for layered effects like embossing.",
      },
    ],
  },
  "css/gradient-generator": {
    howToUse: [
      "Choose Linear or Radial gradient type.",
      "For linear gradients, set the angle; for radial gradients, choose circle or ellipse.",
      "Add, remove, and reposition color stops, adjusting each stop's color and position.",
      "Copy the generated background declaration into your stylesheet.",
    ],
    features: [
      "Supports both linear-gradient() and radial-gradient() with unlimited practical color stops (up to 5).",
      "Live preview box that updates instantly as you adjust angle, shape, or stops.",
      "Color stops are automatically sorted by position for a clean, predictable gradient.",
    ],
    faq: [
      {
        question: "What's the difference between linear and radial gradients?",
        answer:
          "Linear gradients transition colors along a straight line at a chosen angle, while radial gradients transition colors outward from a center point in a circle or ellipse shape.",
      },
      {
        question: "How many color stops can I add?",
        answer: "You can add up to 5 color stops per gradient, and remove down to a minimum of 2.",
      },
      {
        question: "Can I use this gradient as a text effect?",
        answer:
          "Yes, apply the generated gradient as a background, then add background-clip: text and color: transparent to your text element to create a gradient text effect.",
      },
    ],
  },
  "css/clip-path-generator": {
    howToUse: [
      "Choose a shape: adjustable circle, ellipse, and inset, or a fixed polygon preset (triangle, hexagon, star, and more).",
      "For circle, ellipse, and inset, fine-tune the sliders to adjust size and position.",
      "Copy the generated clip-path declaration into your stylesheet.",
    ],
    features: [
      "Three fully adjustable shapes (circle, ellipse, inset) with live sliders.",
      "Nine ready-made polygon presets, including triangle, hexagon, star, and a chat message bubble.",
      "Live preview box that instantly reflects the current shape.",
    ],
    faq: [
      {
        question: "Which browsers support clip-path?",
        answer: "clip-path is supported in all current versions of Chrome, Firefox, Safari, and Edge for the basic-shape values used by this generator.",
      },
      {
        question: "Can I animate clip-path changes?",
        answer:
          "Yes, clip-path can be transitioned with CSS as long as both the before and after values use the same shape function (e.g. animating between two polygon() values with the same number of points).",
      },
      {
        question: "Does clip-path affect layout space?",
        answer: "No, clip-path only changes what's visible \u2014 the element's box model, margins, and layout footprint stay exactly the same.",
      },
    ],
  },
  "javascript/formatter": {
    howToUse: [
      "Paste minified or messy JavaScript into the input box, or load the sample.",
      "The formatted output appears automatically as you type (with a short debounce).",
      "Copy the formatted code or download it as a .js file.",
    ],
    features: [
      "Powered by Prettier's official standalone build \u2014 the same formatter used by millions of JS projects.",
      "Understands modern syntax: arrow functions, destructuring, async/await, classes, JSX-free ES modules, and more.",
      "Produces consistent, opinionated formatting with 2-space indentation and double quotes.",
      "Runs entirely in your browser via WebAssembly-free pure JS \u2014 nothing is uploaded.",
    ],
    faq: [
      {
        question: "Is this the same as running Prettier locally?",
        answer: "Yes, it uses prettier/standalone with the Babel parser plugin, so output matches what you'd get from Prettier's CLI or editor integration for plain JavaScript.",
      },
      {
        question: "Does it support TypeScript syntax?",
        answer: "No, use the TS Formatter tool for TypeScript \u2014 it uses TypeScript's own parser plugin for accurate type-aware formatting.",
      },
      {
        question: "Why does formatting take a moment?",
        answer: "The formatter loads a full JavaScript parser and pretty-printer on first use, so there's a small delay while it initializes and analyzes your code's syntax tree.",
      },
    ],
  },
  "javascript/minifier": {
    howToUse: [
      "Paste your JavaScript into the input box, or load the sample.",
      "The minified output appears automatically, shrinking whitespace, comments, and local variable names.",
      "Copy the result or download it as a production-ready .js file.",
    ],
    features: [
      "Powered by Terser, the industry-standard minifier used by webpack, Vite, and Rollup.",
      "Compresses logic (e.g. removing dead code, simplifying expressions) in addition to renaming variables.",
      "Reports a clear syntax error message if your code can't be parsed.",
      "Runs entirely client-side \u2014 your source code is never transmitted anywhere.",
    ],
    faq: [
      {
        question: "Will minifying break my code?",
        answer: "Terser is designed to produce behaviorally identical output. As with any minifier, avoid relying on function/variable names via reflection (e.g. Function.prototype.name) since those may be renamed.",
      },
      {
        question: "How much smaller will my file get?",
        answer: "Typically 40-70% smaller than formatted source, depending on how much whitespace, comments, and long variable names your original code has.",
      },
      {
        question: "Does this also obfuscate my code?",
        answer: "It renames local variables and removes comments, which provides some obscurity, but for stronger obfuscation (top-level renaming and string encoding) use the JS Obfuscator tool.",
      },
    ],
  },
  "javascript/beautifier": {
    howToUse: [
      "Paste minified or inconsistently formatted JavaScript into the input box.",
      "The beautified output appears automatically with consistent indentation and line breaks.",
      "Copy the result or download it as a .js file.",
    ],
    features: [
      "Identical formatting engine to the JS Formatter, offered under the name most developers search for.",
      "Turns single-line minified code into fully readable, properly indented source.",
      "Powered by Prettier's standalone build running entirely in your browser.",
    ],
    faq: [
      {
        question: "What's the difference between this and JS Formatter?",
        answer: "None \u2014 \"Beautifier\" and \"Formatter\" are the same underlying tool, listed separately since both terms are common search queries.",
      },
      {
        question: "Can I re-minify afterward?",
        answer: "Yes, use the JS Minifier tool to collapse the beautified code back down for production use.",
      },
    ],
  },
  "javascript/obfuscator": {
    howToUse: [
      "Paste your JavaScript source code into the input box, or load the sample.",
      "The obfuscated output appears automatically \u2014 variable names are shortened, whitespace is removed, and string literals are hex-encoded.",
      "Copy the result or download it as a .js file.",
    ],
    features: [
      "Renames local and top-level variables/functions using Terser's mangler.",
      "Encodes string literals as \\xNN / \\uNNNN escape sequences so text isn't visible at a glance.",
      "Leaves template literals and comments-adjacent logic untouched to reduce the risk of breaking your code.",
      "Runs entirely client-side \u2014 your source code is never uploaded.",
    ],
    faq: [
      {
        question: "Is obfuscated code fully secure?",
        answer: "No \u2014 obfuscation only deters casual reading and copying. Anyone with enough time and a JavaScript console can still deobfuscate, debug, or reverse-engineer the logic, since the code must still run in the browser.",
      },
      {
        question: "Will this break code that other scripts depend on?",
        answer: "It can \u2014 top-level function/variable names are renamed, so if other scripts call your functions by name (e.g. via a global object), test carefully after obfuscating or keep those specific names unchanged manually.",
      },
      {
        question: "How do I reverse this?",
        answer: "Use the JS Deobfuscator tool to reformat the code and decode the string literals back into readable text (variable names cannot be recovered, since that information is discarded).",
      },
    ],
  },
  "javascript/deobfuscator": {
    howToUse: [
      "Paste minified or lightly obfuscated JavaScript into the input box, or load the sample.",
      "The tool decodes hex/unicode-escaped strings and reformats the code with proper indentation.",
      "Copy the cleaned-up result or download it as a .js file.",
    ],
    features: [
      "Decodes \\xNN and \\uNNNN escape sequences inside string literals back into readable text.",
      "Reformats minified, single-line code into fully indented, readable source using Prettier.",
      "Leaves template literals untouched to avoid corrupting embedded expressions.",
      "Runs entirely client-side \u2014 your code is never uploaded.",
    ],
    faq: [
      {
        question: "Can this undo any obfuscation tool?",
        answer: "No \u2014 it's a best-effort readability tool. It reverses simple string-escaping and reformats layout, but it cannot recover original variable names or reverse control-flow flattening used by heavy-duty commercial obfuscators, since that information is permanently discarded.",
      },
      {
        question: "Is this safe to run on untrusted code?",
        answer: "The tool only parses and reformats text \u2014 it never executes the code you paste, so viewing obfuscated/malicious JavaScript source here is safe.",
      },
      {
        question: "Does it work on code minified by Terser or UglifyJS?",
        answer: "Yes, minified output from any standard JS minifier can be reformatted for readability, though renamed variables will remain short and non-descriptive.",
      },
    ],
  },
  "javascript/playground": {
    howToUse: [
      "Write or paste JavaScript code in the editor, or load the sample.",
      "Click \"Run\" to execute it in a sandboxed environment.",
      "View console.log/warn/error/info output in the console panel on the right.",
      "Click \"Run\" again anytime to re-execute with a fresh, isolated environment.",
    ],
    features: [
      "Executes your code inside a sandboxed iframe with no access to your page's cookies or storage.",
      "Captures console.log, console.info, console.warn, and console.error output, including objects and errors.",
      "Each run starts in a fresh execution context, so leftover global state never leaks between runs.",
      "Nothing is sent to a server \u2014 your code runs entirely inside your own browser.",
    ],
    faq: [
      {
        question: "Is it safe to run untrusted code here?",
        answer: "The code runs in a sandboxed iframe with a unique, isolated origin and no access to your top-level page, cookies, or local storage, which limits what it can affect.",
      },
      {
        question: "What happens if my code has an infinite loop?",
        answer: "The sandboxed frame may become unresponsive. Reload the page if this happens \u2014 always test loops with a bounded iteration count first.",
      },
      {
        question: "Can I use modern syntax like async/await or classes?",
        answer: "Yes, the code runs in a real browser JavaScript engine, so all modern ES features supported by your browser are available.",
      },
    ],
  },
  "typescript/formatter": {
    howToUse: [
      "Paste your TypeScript code into the input box, or load the sample.",
      "The formatted output appears automatically as you type.",
      "Copy the formatted code or download it as a .ts file.",
    ],
    features: [
      "Powered by Prettier's TypeScript parser plugin, based on the official TypeScript compiler's parser.",
      "Understands interfaces, generics, enums, decorators, and all modern TypeScript syntax.",
      "Produces consistent, opinionated formatting with 2-space indentation.",
      "Runs entirely in your browser \u2014 nothing is uploaded.",
    ],
    faq: [
      {
        question: "Does this check my types?",
        answer: "No, this only formats syntax \u2014 it does not perform type-checking. Use your IDE or `tsc --noEmit` for full type validation.",
      },
      {
        question: "Can I format .tsx files with JSX?",
        answer: "This tool targets plain TypeScript syntax. JSX-heavy React components may format correctly in most cases, but for guaranteed accuracy, use a dedicated React/TSX formatter setup.",
      },
    ],
  },
  "typescript/playground": {
    howToUse: [
      "Write or paste TypeScript code in the editor, or load the sample.",
      "Click \"Run\" to transpile it to JavaScript and execute it in a sandboxed environment.",
      "View console output in the panel on the right, or see a transpilation error if your syntax is invalid.",
    ],
    features: [
      "Transpiles TypeScript to JavaScript using the official TypeScript compiler, then runs it in a sandboxed iframe.",
      "Supports interfaces, enums, generics, and type annotations (all stripped or compiled away before execution).",
      "Captures console.log, console.warn, console.error, and console.info output.",
      "Nothing is sent to a server \u2014 transpilation and execution both happen entirely in your browser.",
    ],
    faq: [
      {
        question: "Does this catch type errors?",
        answer: "No, transpileModule performs no type-checking \u2014 it only strips types and compiles syntax down to JavaScript. Invalid types will still run if the resulting JavaScript is valid.",
      },
      {
        question: "Is it safe to run untrusted code here?",
        answer: "The transpiled code runs in a sandboxed iframe with a unique, isolated origin and no access to your top-level page, cookies, or local storage.",
      },
      {
        question: "Can I use enums and decorators?",
        answer: "Enums are fully supported. Decorators are experimental in the underlying compiler settings and may not transpile correctly in all cases.",
      },
    ],
  },
  "typescript/to-js": {
    howToUse: [
      "Paste your TypeScript code into the input box, or load the sample.",
      "The equivalent JavaScript appears automatically, with type annotations stripped and modern syntax preserved.",
      "Copy the result or download it as a .js file.",
    ],
    features: [
      "Uses the official TypeScript compiler's transpileModule API for accurate, spec-compliant output.",
      "Strips interfaces, type annotations, and generics while compiling enums and other runtime constructs correctly.",
      "Targets modern ES2020 output by default, preserving template literals, arrow functions, and classes.",
      "Runs entirely client-side \u2014 your source code is never uploaded.",
    ],
    faq: [
      {
        question: "Does this validate my TypeScript types first?",
        answer: "No, transpileModule intentionally skips type-checking for speed \u2014 it only strips types and compiles syntax. Use the TS Playground or your IDE to catch type errors.",
      },
      {
        question: "What JavaScript target does it compile to?",
        answer: "ES2020 by default, which supports optional chaining, nullish coalescing, and other modern syntax supported by all current browsers and Node.js versions.",
      },
      {
        question: "Are comments preserved?",
        answer: "Yes, comments are preserved in the output by default so the transpiled code remains readable.",
      },
    ],
  },
  "java/formatter": {
    howToUse: [
      "Paste your Java code into the input box, or load the sample.",
      "Click \"Convert\" (or just look at the output panel) to see it re-indented based on brace nesting.",
      "Copy the formatted output or download it as a .java file.",
    ],
    features: [
      "Re-indents code based on brace ({}), bracket ([]), and parenthesis (()) nesting depth.",
      "Correctly skips over string literals, character literals, and both // and /* */ comments when counting nesting.",
      "Preserves your original line breaks rather than aggressively reflowing every statement.",
      "Runs entirely client-side \u2014 your source code is never uploaded.",
    ],
    faq: [
      {
        question: "Does this fully reformat my code like an IDE would?",
        answer: "No, this is a lightweight re-indenter, not a full AST-based pretty-printer. It fixes indentation based on nesting depth but keeps your existing line breaks and statement layout as-is.",
      },
      {
        question: "Does it handle nested classes and lambdas?",
        answer: "Yes, since indentation is driven purely by brace/bracket/paren depth, nested classes, methods, and lambda bodies are indented correctly regardless of complexity.",
      },
      {
        question: "What about Java 15+ text blocks (\"\"\"...\"\"\")?",
        answer: "Multi-line text blocks are a known edge case and may not be indented perfectly, since the formatter treats quotes using traditional single-line string rules.",
      },
    ],
  },
  "java/escape-unescape": {
    howToUse: [
      "Switch between Escape and Unescape mode using the toggle.",
      "In Escape mode, type or paste raw text to convert it into a valid Java string literal.",
      "In Unescape mode, paste an escaped Java string to decode it back into raw text.",
      "Copy the result for use in your Java source code.",
    ],
    features: [
      "Escapes backslashes, double quotes, and whitespace control characters (\\n, \\r, \\t, \\b, \\f) exactly as javac expects.",
      "Escapes other non-printable characters using \\uXXXX Unicode escapes.",
      "Unescape mode understands all of the above plus single-quote escapes, and tolerates surrounding double quotes.",
      "Fast, client-side, and works on strings of any length.",
    ],
    faq: [
      {
        question: "Can I paste a full \"quoted\" Java string to unescape it?",
        answer: "Yes, surrounding double quotes are automatically detected and stripped before decoding, so you can paste the literal exactly as it appears in your source code.",
      },
      {
        question: "Does the escaped output include the surrounding quotes?",
        answer: "Yes, Escape mode wraps its output in double quotes so you can paste it directly into your Java source as a complete string literal.",
      },
      {
        question: "Are Unicode characters like accents handled?",
        answer: "Yes, characters outside the printable ASCII control range are preserved as literal Unicode text, matching how modern Java source files (UTF-8) typically handle non-ASCII content.",
      },
    ],
  },
  "python/formatter": {
    howToUse: [
      "Paste your Python code into the input box, or load the sample.",
      "The formatted output appears automatically, with consistent 4-space indentation.",
      "Copy the result or download it as a .py file.",
    ],
    features: [
      "Uses the same indentation-stack algorithm Python's own tokenizer relies on to determine nesting depth.",
      "Fixes mixed tabs/spaces and inconsistent indent widths (e.g. 2-space and 3-space blocks in the same file).",
      "Leaves content inside triple-quoted strings (docstrings) completely untouched.",
      "Runs entirely client-side \u2014 your source code is never uploaded.",
    ],
    faq: [
      {
        question: "Is this the same as Black or autopep8?",
        answer: "No, this is a lightweight indentation normalizer, not a full AST-based formatter. It fixes tabs/spaces and indent-width inconsistencies but doesn't reformat operator spacing, line length, or quote style the way Black does.",
      },
      {
        question: "Will it break my docstrings?",
        answer: "No, lines inside triple-quoted strings (''' or \"\"\") are detected and copied through completely unchanged, so multi-line docstrings and text blocks are always preserved exactly.",
      },
      {
        question: "What if my file mixes tabs and spaces inconsistently?",
        answer: "Tabs are expanded to a fixed width (8 columns, the Python convention) purely for measuring relative indentation, then every level is re-emitted using clean 4-space indents.",
      },
    ],
  },
  "python/minifier": {
    howToUse: [
      "Paste your Python code into the input box, or load the sample.",
      "The minified output appears automatically \u2014 comments and blank lines removed, indentation shrunk to 1 space per level.",
      "Copy the result or download it as a .py file.",
    ],
    features: [
      "Strips # comments and blank lines while correctly leaving string literals containing '#' untouched.",
      "Shrinks every indentation level down to a single space, since Python only requires consistent relative nesting.",
      "Preserves triple-quoted strings (docstrings) exactly, without stripping their content.",
      "Runs entirely client-side \u2014 nothing is uploaded.",
    ],
    faq: [
      {
        question: "Why can't this put everything on one line like a JS minifier?",
        answer: "Python uses indentation, not braces, to define code blocks, so removing line breaks would destroy the program's structure. Shrinking indentation width is the safe equivalent of minifying whitespace for Python.",
      },
      {
        question: "Is the output still valid, runnable Python?",
        answer: "Yes, since only the width of each indentation level changes (not the relative nesting), the resulting file behaves identically to the original.",
      },
      {
        question: "Are docstrings removed?",
        answer: "No, only # comments are stripped. Triple-quoted string literals (including docstrings) are real Python expressions and are preserved so runtime behavior doesn't change.",
      },
    ],
  },
  "php/formatter": {
    howToUse: [
      "Paste your PHP code into the input box, or load the sample.",
      "The formatted output appears automatically, re-indented based on brace nesting depth.",
      "Copy the result or download it as a .php file.",
    ],
    features: [
      "Re-indents code based on brace/bracket/parenthesis nesting (4-space indent).",
      "Correctly skips over single- and double-quoted strings and both // and /* */ comments when counting nesting.",
      "Preserves your existing line breaks rather than aggressively reflowing every statement.",
      "Runs entirely client-side \u2014 your source code is never uploaded.",
    ],
    faq: [
      {
        question: "Does this fully reformat my code like PHP-CS-Fixer would?",
        answer: "No, this is a lightweight re-indenter, not a full AST-based pretty-printer. It fixes indentation based on nesting depth but keeps your existing statement layout as-is.",
      },
      {
        question: "Are heredoc/nowdoc blocks supported?",
        answer: "Heredoc (<<<EOT ... EOT;) and nowdoc syntax are a known edge case and may not be indented perfectly, since the formatter uses simple quote-based string detection rather than full PHP lexing.",
      },
      {
        question: "Does it work on files with mixed HTML and PHP?",
        answer: "The formatter processes the entire file as text, so HTML outside <?php ?> tags is preserved as-is (it has no braces to affect indentation depth).",
      },
    ],
  },
  "php/beautifier": {
    howToUse: [
      "Paste your PHP code into the input box, or load the sample.",
      "The beautified output appears automatically with consistent indentation.",
      "Copy the result or download it as a .php file.",
    ],
    features: [
      "Identical formatting engine to the PHP Formatter, offered under the name most developers search for.",
      "Turns inconsistently indented PHP into cleanly nested, readable source.",
    ],
    faq: [
      {
        question: "What's the difference between this and PHP Formatter?",
        answer: "None \u2014 \"Beautifier\" and \"Formatter\" are the same underlying tool, listed separately since both terms are common search queries.",
      },
    ],
  },
  "rust/formatter": {
    howToUse: [
      "Paste your Rust code into the input box, or load the sample.",
      "The formatted output appears automatically, re-indented based on brace nesting depth.",
      "Copy the result or download it as a .rs file.",
    ],
    features: [
      "Re-indents code based on brace/bracket/parenthesis nesting (4-space indent, matching rustfmt's default).",
      "Distinguishes char literals ('a', '\\n', '\\u{1F600}') from lifetime annotations ('a, 'static) so lifetimes are never mistaken for unterminated strings.",
      "Correctly skips over double-quoted strings and both // and /* */ comments when counting nesting.",
      "Runs entirely client-side \u2014 your source code is never uploaded.",
    ],
    faq: [
      {
        question: "Is this a replacement for rustfmt?",
        answer: "No, this is a lightweight brace-based re-indenter, not a full syntax-aware formatter. For canonical Rust formatting, always run rustfmt locally or in CI \u2014 use this tool for quick cleanup when you don't have a Rust toolchain handy.",
      },
      {
        question: "Are raw strings (r\"...\") handled correctly?",
        answer: "Raw strings and byte strings are a known edge case, since the formatter uses simplified quote-scanning rather than full Rust lexing. Double-check output involving raw strings before committing.",
      },
      {
        question: "How does it tell lifetimes apart from char literals?",
        answer: "It looks ahead for a closing quote a few characters after any single quote \u2014 char literals like 'a' or '\\n' have one nearby, while lifetimes like 'a or 'static don't, so they're left alone.",
      },
    ],
  },
  "go/formatter": {
    howToUse: [
      "Paste your Go code into the input box, or load the sample.",
      "The formatted output appears automatically, re-indented based on brace nesting depth.",
      "Copy the result or download it as a .go file.",
    ],
    features: [
      "Re-indents code based on brace/bracket/parenthesis nesting depth.",
      "Correctly skips over string and char literals and both // and /* */ comments when counting nesting.",
      "Runs entirely client-side \u2014 your source code is never uploaded.",
    ],
    faq: [
      {
        question: "Is this the same as gofmt?",
        answer: "No, gofmt is a full syntax-aware formatter that also uses tabs for indentation by default. This tool is a lightweight, space-based re-indenter for quick cleanup when you don't have a Go toolchain handy \u2014 always run gofmt before committing Go code.",
      },
      {
        question: "Does it handle backtick raw strings?",
        answer: "Yes, content inside backtick-delimited raw string literals is skipped over and left untouched when counting brace depth.",
      },
    ],
  },
  "markdown/preview": {
    howToUse: [
      "Type or paste Markdown into the editor, or load the sample.",
      "The rendered preview on the right updates instantly as you type.",
      "Supports headings, bold/italic, lists, links, images, code fences, blockquotes, and tables (GitHub-flavored Markdown).",
    ],
    features: [
      "Powered by the marked library for fast, spec-compliant Markdown parsing.",
      "Renders in a sandboxed iframe with scripts disabled, so embedded HTML in your Markdown can't execute code.",
      "Includes a clean, readable default stylesheet for headings, code blocks, tables, and blockquotes.",
      "Nothing is uploaded \u2014 rendering happens entirely inside your browser.",
    ],
    faq: [
      {
        question: "Does it support GitHub-flavored Markdown (tables, task lists)?",
        answer: "Yes, GFM extensions like tables and fenced code blocks are supported via marked's built-in GFM mode.",
      },
      {
        question: "Can I preview Markdown with embedded HTML?",
        answer: "Raw HTML in your Markdown is parsed and rendered, but the preview frame has scripts disabled, so any embedded <script> tags will not execute.",
      },
      {
        question: "Can I export the rendered result?",
        answer: "Use the Markdown to HTML tool to get a copyable/downloadable HTML file instead of just a live preview.",
      },
    ],
  },
  "markdown/to-html": {
    howToUse: [
      "Paste your Markdown into the input box, or load the sample.",
      "The equivalent HTML appears automatically as you type.",
      "Copy the result or download it as an .html file.",
    ],
    features: [
      "Powered by the marked library, supporting GitHub-flavored Markdown (tables, fenced code blocks, etc.).",
      "Produces clean, semantic HTML output ready to drop into a page or CMS.",
      "Runs entirely client-side \u2014 your Markdown is never uploaded.",
    ],
    faq: [
      {
        question: "Is the output sanitized?",
        answer: "No, raw HTML embedded in your Markdown is passed through as-is. If you plan to render untrusted user-submitted Markdown on a live site, sanitize the output with a library like DOMPurify first.",
      },
      {
        question: "Does it support tables and task lists?",
        answer: "Yes, GitHub-flavored Markdown tables and other GFM extensions are enabled by default.",
      },
      {
        question: "Can I convert the HTML back to Markdown later?",
        answer: "Yes, use the HTML to Markdown tool to convert it back, though minor formatting differences (like exact whitespace) may not round-trip perfectly.",
      },
    ],
  },
  "markdown/from-html": {
    howToUse: [
      "Paste your HTML into the input box, or load the sample.",
      "The equivalent Markdown appears automatically.",
      "Copy the result or download it as a .md file.",
    ],
    features: [
      "Powered by Turndown, a well-tested HTML-to-Markdown converter used across many open-source tools.",
      "Uses ATX-style headings (#), dash (-) bullets, and fenced code blocks for clean, consistent output.",
      "Handles nested lists, links, images, blockquotes, and inline formatting (bold, italic, code).",
      "Runs entirely client-side using your browser's own HTML parser \u2014 nothing is uploaded.",
    ],
    faq: [
      {
        question: "Does it handle complex nested HTML like tables?",
        answer: "Yes, common structures including tables, nested lists, and blockquotes are converted, though highly complex or non-semantic HTML (e.g. div-based layouts) may not always translate perfectly to Markdown.",
      },
      {
        question: "What happens to inline styles and classes?",
        answer: "They're dropped, since Markdown has no equivalent \u2014 only the semantic structure and text content are preserved.",
      },
      {
        question: "Can I convert a full webpage?",
        answer: "Yes, paste the page's HTML (e.g. from 'View Source' or dev tools) \u2014 the converter processes the entire input, though extremely large documents may take a moment.",
      },
    ],
  },
  "markdown/formatter": {
    howToUse: [
      "Paste your Markdown into the input box, or load the sample.",
      "The cleaned-up output appears automatically \u2014 consistent bullets, spaced headings, and no extra blank lines.",
      "Copy the result or download it as a .md file.",
    ],
    features: [
      "Normalizes unordered list bullets (*, +) to a consistent \u201c-\u201d marker.",
      "Ensures exactly one space after ATX heading hashes (##Title \u2192 ## Title).",
      "Strips trailing whitespace and collapses multiple consecutive blank lines down to one.",
      "Leaves fenced code blocks (``` or ~~~) completely untouched, so code samples are never altered.",
    ],
    faq: [
      {
        question: "Will this change my code blocks?",
        answer: "No, content between fenced code block markers is detected and passed through completely unchanged, even if it looks like a list or heading.",
      },
      {
        question: "Does it reformat tables or reflow paragraph text?",
        answer: "No, this tool focuses on whitespace and marker consistency \u2014 it doesn't realign table columns or wrap/reflow paragraph text.",
      },
      {
        question: "Why normalize bullets to a dash?",
        answer: "Mixing *, +, and - bullet markers in the same list can render as separate lists in some Markdown renderers. Standardizing on one marker avoids that pitfall.",
      },
    ],
  },
  "email/validator": {
    howToUse: [
      "Type or paste an email address into the input box.",
      "The tool validates it in real time and shows the local part, domain, and any issues found.",
      "If the domain looks like a typo of a popular provider (e.g. \u201cgmial.com\u201d), a suggested correction is shown.",
    ],
    features: [
      "Checks local-part and domain length limits, invalid characters, and consecutive/leading/trailing dots.",
      "Validates domain labels and top-level domain format, including bracketed IP-literal domains.",
      "Suggests corrections for common typos of popular email providers using edit-distance matching.",
      "Runs entirely in your browser \u2014 addresses are never sent to a server.",
    ],
    faq: [
      {
        question: "Does this check if the email address actually exists?",
        answer: "No. This validates syntax only \u2014 whether the address is well-formed per email format rules. Confirming a mailbox actually exists and accepts mail requires an SMTP verification step or sending a confirmation email, which this tool intentionally doesn't do.",
      },
      {
        question: "Why does it flag some unusual-looking but technically valid addresses?",
        answer: "The validator favors practical, real-world email formats. Some rarely used but technically legal constructs (e.g. certain quoted local parts) may be flagged \u2014 if in doubt, stick to letters, digits, dots, underscores, and hyphens before the @.",
      },
      {
        question: "Is my email address uploaded anywhere?",
        answer: "No, validation happens entirely with JavaScript in your browser and nothing is transmitted over the network.",
      },
    ],
  },
  "email/header-analyzer": {
    howToUse: [
      "In your email client, open the message and find \u201cShow Original\u201d, \u201cView Source\u201d, or \u201cShow Headers\u201d.",
      "Copy the full raw header block (or the entire message source) and paste it into the box.",
      "The tool extracts key fields, checks SPF/DKIM/DMARC results, and reconstructs the delivery path hop by hop.",
    ],
    features: [
      "Extracts From, To, Subject, Date, Message-ID, and Reply-To at a glance.",
      "Parses every \u201cReceived:\u201d header into a chronological hop-by-hop delivery path with per-hop delay.",
      "Reads Authentication-Results / Received-SPF headers to show SPF, DKIM, and DMARC pass/fail status.",
      "Handles folded (multi-line) headers correctly, just like a real mail parser.",
      "Runs entirely in your browser \u2014 pasted headers are never sent to a server.",
    ],
    faq: [
      {
        question: "Where do I find raw email headers?",
        answer: "Most webmail clients have a \u201cShow Original\u201d or \u201cView Source\u201d option in the message's \u2018\u2026\u2019 menu. Desktop clients like Outlook or Apple Mail usually call it \u201cView Source\u201d or \u201cShow Raw Message\u201d.",
      },
      {
        question: "Why are there multiple \u201cReceived:\u201d headers?",
        answer: "Each mail server that handles a message prepends its own Received header at the top, so the topmost header is the most recent hop and the bottommost is closest to the original sender. This tool reverses that order to show the path chronologically.",
      },
      {
        question: "What does an SPF/DKIM/DMARC \u201cpass\u201d mean?",
        answer: "SPF checks the sending server is authorized for the sender's domain, DKIM verifies a cryptographic signature wasn't tampered with, and DMARC ties both together with a domain policy. All three passing is a strong signal the message isn't spoofed \u2014 but their absence doesn't automatically mean a message is malicious.",
      },
    ],
  },
  "email/signature-generator": {
    howToUse: [
      "Fill in your name, title, company, and contact details on the left.",
      "Optionally add social profile links, a logo/photo URL, and pick an accent color.",
      "Preview updates live \u2014 copy the generated HTML into your email client's signature settings, or use the plain-text fallback.",
    ],
    features: [
      "Generates an email-client-friendly, table-based HTML signature (no external CSS dependencies).",
      "Live preview rendered exactly as the copied HTML will look.",
      "Includes a plain-text fallback version for clients that don't render HTML signatures.",
      "Optional logo/photo via URL \u2014 no uploads, so there's nothing to host yourself beyond the image.",
      "Runs entirely in your browser \u2014 your details are never sent to a server.",
    ],
    faq: [
      {
        question: "Why does the logo need a URL instead of an upload?",
        answer: "Email signatures reference images by URL; the image has to be hosted somewhere your recipients' mail clients can fetch it from. Uploading a file here wouldn't give you a stable public URL, so this tool asks for a URL to an image you already host (e.g. on your company website or an image host).",
      },
      {
        question: "How do I install this signature in Gmail/Outlook/Apple Mail?",
        answer: "Copy the HTML signature, then paste it into your client's signature editor (most support pasting rich text directly). In Gmail: Settings \u2192 General \u2192 Signature. In Outlook: File \u2192 Options \u2192 Mail \u2192 Signatures. In Apple Mail: Settings \u2192 Signatures (drag-and-drop paste works best there).",
      },
      {
        question: "Will the signature look the same in every email client?",
        answer: "It's built with an email-safe HTML table layout for broad compatibility, but rendering can still vary slightly between clients (especially older Outlook versions). Always send yourself a test email after installing it.",
      },
    ],
  },
  "networking/http-header-viewer": {
    howToUse: [
      "Enter a full URL, including https:// or http://, and click \u201cFetch headers\u201d.",
      "The response status code, status text, and every response header are listed.",
      "Redirects are shown (with their Location) but never automatically followed.",
    ],
    features: [
      "Shows every response header returned by the server, including caching, security, and CDN headers.",
      "Displays HTTP status code and status text at a glance.",
      "Surfaces redirect targets without silently following them, so you can inspect each hop yourself.",
      "Server-side fetch avoids browser CORS restrictions that would otherwise hide cross-origin headers.",
    ],
    faq: [
      {
        question: "Why can't this just run entirely in my browser?",
        answer: "Browsers enforce CORS, which blocks JavaScript from reading most response headers for cross-origin requests unless the target server explicitly allows it. This tool's backend makes the request server-side instead, so it can read the full header set regardless of CORS.",
      },
      {
        question: "Can I use this to probe internal or private servers?",
        answer: "No. The backend resolves the target hostname and refuses to connect to loopback, private (RFC 1918), link-local, or multicast addresses \u2014 including cloud metadata endpoints \u2014 as a safety measure against misuse.",
      },
      {
        question: "Does it follow redirects automatically?",
        answer: "No, redirects are intentionally not auto-followed. If the response is a 3xx, the Location header is shown so you can decide whether to check that URL separately.",
      },
    ],
  },
  "networking/user-agent-parser": {
    howToUse: [
      "Your current browser's User-Agent string is loaded automatically \u2014 or paste any other User-Agent to parse it.",
      "The tool extracts the browser, rendering engine, operating system, and device type.",
      "Try the sample strings to see how mobile, desktop, and bot user agents differ.",
    ],
    features: [
      "Detects major browsers (Chrome, Firefox, Safari, Edge, Opera, Samsung Internet, and more).",
      "Identifies the rendering engine (Blink, Gecko, WebKit, Trident) and its version where available.",
      "Detects operating system and version, including Windows build-to-name mapping.",
      "Classifies device type as Desktop, Mobile, Tablet, or Bot/crawler.",
      "Runs entirely in your browser \u2014 no User-Agent strings are sent anywhere.",
    ],
    faq: [
      {
        question: "Is User-Agent parsing 100% accurate?",
        answer: "No parser can be perfectly accurate \u2014 User-Agent strings are inconsistent across vendors, frequently spoofed, and increasingly \u201cfrozen\u201d by browsers for privacy. This tool uses common, well-tested patterns that correctly handle the vast majority of real-world browsers.",
      },
      {
        question: "Why does my browser show a generic or unexpected result?",
        answer: "Some browsers (e.g. Chrome-based ones) intentionally reduce or freeze User-Agent details for privacy (User-Agent Reduction). Use the Sec-CH-UA client hints instead if you need precise browser detection in production code.",
      },
      {
        question: "Can I trust User-Agent for security decisions?",
        answer: "No \u2014 the header is fully client-controlled and trivially spoofable. Never use it as an access-control or security mechanism; it's only useful for analytics and progressive-enhancement decisions.",
      },
    ],
  },
  "networking/ip-lookup": {
    howToUse: [
      "Enter a public IPv4 or IPv6 address and click \u201cLookup\u201d.",
      "The tool returns approximate geolocation, ISP, organization, and network (AS) information.",
      "Private, loopback, and reserved addresses are rejected since they have no public geolocation.",
    ],
    features: [
      "Returns country, region, city, ZIP/postal code, timezone, and approximate coordinates.",
      "Shows the ISP, hosting organization, and autonomous system (AS) that owns the IP block.",
      "Server-side lookup keeps the query off a third party from your browser's perspective.",
      "Rejects private/internal addresses up front with a clear error message.",
    ],
    faq: [
      {
        question: "How accurate is IP geolocation?",
        answer: "IP geolocation is generally accurate at the country level, usually accurate at the region/city level, but can be off by many miles \u2014 especially for mobile carriers, VPNs, and corporate networks where many users share a small pool of IPs.",
      },
      {
        question: "Can this be used to find someone's exact home address?",
        answer: "No. IP geolocation only approximates the location of the ISP's network infrastructure that assigned the address, not the physical location of a specific device or person.",
      },
      {
        question: "Why was my IP address rejected?",
        answer: "Private (10.x, 172.16\u201331.x, 192.168.x), loopback (127.x), and link-local (169.254.x) addresses aren't routable on the public internet and have no meaningful geolocation, so the lookup refuses them.",
      },
    ],
  },
  "networking/cidr-calculator": {
    howToUse: [
      "Enter an IPv4 address with a CIDR prefix, e.g. 192.168.1.0/24.",
      "The tool instantly computes the network address, broadcast address, usable host range, and more.",
      "Change the prefix length to see how the address space shrinks or grows.",
    ],
    features: [
      "Calculates network address, broadcast address, subnet mask, and wildcard mask.",
      "Shows the first and last usable host address and total/usable address counts.",
      "Classifies the address by legacy IP class and flags RFC 1918 private ranges.",
      "Runs entirely in your browser \u2014 instant results with no network calls.",
    ],
    faq: [
      {
        question: "What does the \u201c/24\u201d in an address mean?",
        answer: "The number after the slash is the CIDR prefix length \u2014 the number of leading bits that make up the network portion of the address. A /24 means the first 24 bits (three octets) identify the network, leaving 8 bits (256 addresses) for hosts.",
      },
      {
        question: "Why are there no usable hosts for /31 and /32?",
        answer: "A /32 is a single host address with no room for a network/broadcast pair. A /31 is a special case (RFC 3021) used for point-to-point links where both addresses are usable as host addresses without a separate broadcast address \u2014 this tool reports 0 usable hosts for both for simplicity.",
      },
      {
        question: "Does this support IPv6?",
        answer: "Not yet \u2014 this calculator currently supports IPv4 CIDR notation only.",
      },
    ],
  },
  "networking/subnet-calculator": {
    howToUse: [
      "Enter an IPv4 address, then provide either a CIDR prefix (e.g. 24) or a dotted subnet mask (e.g. 255.255.255.0).",
      "Review the network details \u2014 network/broadcast address, usable range, and total hosts.",
      "Optionally split the network into equal subnets by count or by hosts needed per subnet.",
    ],
    features: [
      "Accepts either CIDR prefix notation or a dotted-decimal subnet mask as input.",
      "Calculates network address, broadcast address, subnet/wildcard masks, and usable host range.",
      "Splits a network into N equal subnets, or automatically sizes subnets to fit a target host count (VLSM-style).",
      "Lists every resulting subnet with its network, broadcast, and usable range in a table.",
    ],
    faq: [
      {
        question: "What's the difference between this and the CIDR Calculator?",
        answer: "The CIDR Calculator analyzes a single network block. The Subnet Calculator adds the ability to split that block into multiple smaller subnets \u2014 either an exact count or sized to fit a target number of hosts per subnet.",
      },
      {
        question: "How does \u201chosts needed per subnet\u201d work?",
        answer: "Enter the number of usable host addresses each subnet must support, and the tool finds the smallest subnet size (largest prefix) that can accommodate that many hosts, then splits your network into that many equal-sized subnets.",
      },
      {
        question: "Is there a limit to how many subnets can be listed?",
        answer: "Yes, the table caps at a few thousand rows to keep the page responsive. If you need an extremely large number of tiny subnets, consider working with a larger base prefix.",
      },
    ],
  },
  "networking/port-lookup": {
    howToUse: [
      "Type a port number (e.g. 443) or a service/keyword (e.g. \u201cssh\u201d, \u201cdatabase\u201d) into the search box.",
      "Matching entries from the well-known and commonly used ports list appear instantly.",
      "Clear the search to browse the full reference table.",
    ],
    features: [
      "Covers well-known ports (0\u20131023) plus many commonly used registered ports for popular software.",
      "Search by exact port number or by service name/keyword.",
      "Shows protocol (TCP/UDP/both) and a short description for each entry.",
      "Purely a reference lookup \u2014 it never scans, probes, or connects to any live host.",
    ],
    faq: [
      {
        question: "Does this scan my network or a remote host?",
        answer: "No. This is a static reference table of what each port number conventionally means \u2014 it makes no network connections at all. For scanning open ports on a real host you'd need a dedicated port-scanning tool (and permission to scan that host).",
      },
      {
        question: "What's the difference between a well-known and a registered port?",
        answer: "Well-known ports (0\u20131023) are reserved by IANA for common core protocols like HTTP and SSH. Registered ports (1024\u201349151) are assigned to specific applications on request but aren't restricted to privileged processes \u2014 this table includes common examples of both.",
      },
      {
        question: "Why do some ports list both TCP and UDP?",
        answer: "Some protocols, like DNS, use UDP for typical queries but fall back to TCP for larger responses or zone transfers, so both protocols are commonly associated with the same port number.",
      },
    ],
  },
  "networking/dns-lookup": {
    howToUse: [
      "Enter a domain name and choose a DNS record type (A, AAAA, MX, TXT, NS, CNAME, SOA, or CAA).",
      "Click \u201cLookup\u201d to query that record type directly from DNS.",
      "Results show every matching record along with its TTL (time-to-live in seconds).",
    ],
    features: [
      "Supports the most commonly needed record types: A, AAAA, MX, TXT, NS, CNAME, SOA, and CAA.",
      "Shows each record's TTL so you can see how long resolvers will cache it.",
      "Server-side resolution using a real DNS client library, not a cached or approximate result.",
    ],
    faq: [
      {
        question: "Why can't this run entirely in my browser?",
        answer: "Browsers have no API for making raw DNS queries \u2014 all DNS resolution a browser does is handled invisibly by the operating system for the page's own requests. This tool's backend performs a real DNS query using a dedicated DNS client library.",
      },
      {
        question: "Why do I see no results for a record type?",
        answer: "An empty result means that domain has no records of the selected type \u2014 for example, most domains have no CAA or TXT records unless explicitly configured. This isn't necessarily an error.",
      },
      {
        question: "What does TTL mean?",
        answer: "TTL (time-to-live) is the number of seconds a DNS resolver is allowed to cache that record before re-querying the authoritative server. Lower TTLs mean changes propagate faster but increase query load.",
      },
    ],
  },
  "networking/whois-lookup": {
    howToUse: [
      "Enter a domain name (including its TLD, e.g. example.com) and click \u201cLookup\u201d.",
      "The tool queries the appropriate WHOIS server for that TLD and displays the raw registration record.",
      "For some TLDs, it automatically follows a referral to a more specific registry/registrar WHOIS server.",
    ],
    features: [
      "Automatically resolves which WHOIS server to query for a given TLD, with an IANA-referral fallback for TLDs not in the built-in list.",
      "Follows one referral hop (e.g. from a thin registry to the sponsoring registrar) when present.",
      "Shows registrar, creation/expiry/update dates, name servers, and domain status codes as returned by the registry.",
    ],
    faq: [
      {
        question: "Why can't this run entirely in my browser?",
        answer: "WHOIS (RFC 3912) is a plain-text protocol over a raw TCP socket on port 43 \u2014 there's no HTTP/JSON API and browsers have no way to open arbitrary raw sockets. This tool's backend opens that socket connection server-side.",
      },
      {
        question: "Why is some information missing or redacted?",
        answer: "Many registrars redact registrant contact details (name, address, email) by default under privacy regulations like GDPR, replacing them with a privacy proxy service or omitting them entirely. This is normal and not a limitation of this tool.",
      },
      {
        question: "Why does the result look different for .com versus other TLDs?",
        answer: "Each domain registry runs its own WHOIS server with its own output format \u2014 there's no single standardized WHOIS response format across TLDs, so field names and structure can vary noticeably between registries.",
      },
    ],
  },
};

export function getToolContent(categorySlug: string, toolSlug: string): ToolContent | undefined {
  return toolContent[`${categorySlug}/${toolSlug}`];
}
