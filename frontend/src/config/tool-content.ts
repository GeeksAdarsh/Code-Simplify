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
};

export function getToolContent(categorySlug: string, toolSlug: string): ToolContent | undefined {
  return toolContent[`${categorySlug}/${toolSlug}`];
}
