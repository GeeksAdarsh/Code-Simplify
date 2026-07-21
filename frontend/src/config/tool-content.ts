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
          "Yes. The JSON Formatter on CodeSimplify is completely free with no usage limits, sign-up, or watermarks.",
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

  "devops/docker-compose-validator": {
    howToUse: [
      "Paste your docker-compose.yml content into the editor.",
      "The tool parses the YAML and checks the top-level structure and every service definition automatically.",
      "Review errors (must fix), warnings (should fix), and suggestions grouped by severity.",
      "Fix the issues in your own file and re-paste to confirm they're resolved.",
    ],
    features: [
      "Checks for required keys like \u201cservices\u201d and flags services missing an image or build context.",
      "Validates port mappings, environment variable formats, volumes, and depends_on syntax.",
      "Flags images pinned to the \u201clatest\u201d tag and obsolete top-level \u201cversion\u201d keys.",
      "Runs entirely client-side using a real YAML parser \u2014 your compose file never leaves your browser.",
    ],
    faq: [
      {
        question: "Does this replace \u201cdocker compose config\u201d?",
        answer: "Not entirely. \u201cdocker compose config\u201d fully resolves your file against the installed Compose CLI's exact schema version. This tool checks YAML structure and common Compose Specification conventions client-side without needing Docker installed, which is great for quick sanity checks but isn't a substitute for the official validator before deploying.",
      },
      {
        question: "Is my docker-compose.yml uploaded anywhere?",
        answer: "No. Parsing and validation both happen in your browser using JavaScript \u2014 nothing is sent to a server.",
      },
      {
        question: "Why does it warn about the \u201cversion\u201d key?",
        answer: "The Compose Specification (used by modern Docker Compose v2+) no longer requires or uses the top-level \u201cversion\u201d field \u2014 it's ignored, so keeping it is harmless but unnecessary.",
      },
    ],
  },
  "devops/dockerfile-linter": {
    howToUse: [
      "Paste your Dockerfile into the editor.",
      "The linter scans every instruction line by line and reports issues as you type.",
      "Errors indicate structural problems (like a missing FROM); warnings and suggestions cover best practices.",
      "Apply the suggested fixes to your real Dockerfile and re-check.",
    ],
    features: [
      "Flags unpinned or \u201clatest\u201d base image tags for reproducible builds.",
      "Warns when ADD is used where COPY would be safer and clearer.",
      "Detects missing USER instructions (containers running as root) and potential secrets in ENV/ARG.",
      "Suggests exec-form CMD/ENTRYPOINT and apt-get cleanup best practices.",
      "Works like a lightweight, browser-based hadolint \u2014 no install required.",
    ],
    faq: [
      {
        question: "Is this as thorough as hadolint?",
        answer: "It covers many of the same high-value checks (base image pinning, ADD vs COPY, root user, shell vs exec form) but hadolint has a much larger, continuously updated rule set backed by ShellCheck. Use this for a fast in-browser check, and hadolint in CI for full coverage.",
      },
      {
        question: "Why does it flag my ENV variable as a possible secret?",
        answer: "Any ENV or ARG whose name contains words like PASSWORD, SECRET, TOKEN, or KEY is flagged, since values baked into image layers or build args can often be extracted later with \u201cdocker history\u201d. Use BuildKit secrets or runtime env vars instead.",
      },
      {
        question: "Does this build or run my Dockerfile?",
        answer: "No. It's purely a static text analysis \u2014 nothing is executed, and your Dockerfile stays in your browser.",
      },
    ],
  },
  "devops/kubernetes-yaml-validator": {
    howToUse: [
      "Paste one or more Kubernetes manifests, separated by \u201c---\u201d, into the editor.",
      "Each document is validated independently for required fields and kind-specific rules.",
      "Review issues per document \u2014 including selector/label mismatches for Deployments and missing ports for Services.",
      "Fix and re-paste to confirm a clean result before applying with kubectl.",
    ],
    features: [
      "Validates apiVersion, kind, and metadata.name on every document.",
      "Checks Deployment/StatefulSet/DaemonSet selector.matchLabels against the pod template's labels.",
      "Validates container definitions (name, image, resource quantity formats) and Service port lists.",
      "Supports multi-document YAML files just like kubectl apply -f.",
    ],
    faq: [
      {
        question: "Does this replace \u201ckubectl apply --dry-run\u201d?",
        answer: "No \u2014 kubectl's dry-run validates against your cluster's actual live API schema (including CRDs) and can catch things this tool can't. This tool is a fast, offline, client-side sanity check you can use without cluster access, ideal for catching typos and structural mistakes early.",
      },
      {
        question: "Why does it say my selector doesn't match my template labels?",
        answer: "A Deployment's pods are selected by spec.selector.matchLabels, which must be a subset of spec.template.metadata.labels. If they don't match, Kubernetes rejects the Deployment outright with an immutable-selector error.",
      },
      {
        question: "Are my manifests uploaded anywhere?",
        answer: "No, validation happens entirely in your browser via a YAML parser \u2014 nothing is sent to a server or cluster.",
      },
    ],
  },
  "devops/kubernetes-manifest-generator": {
    howToUse: [
      "Choose a resource kind: Deployment, Service, ConfigMap, or Secret.",
      "Fill in the name, namespace, and kind-specific fields (image, replicas, ports, or data entries).",
      "The YAML manifest updates live on the right as you type.",
      "Copy the generated YAML directly into your manifests or a kubectl apply -f pipeline.",
    ],
    features: [
      "Generates valid Deployment, Service, ConfigMap, and Secret manifests from a simple form \u2014 no YAML indentation mistakes.",
      "Automatically keeps Deployment selector and pod template labels in sync.",
      "Base64-encodes Secret values automatically to match the Kubernetes Secret format.",
      "Supports environment variables and multiple data entries via simple KEY=value lines.",
    ],
    faq: [
      {
        question: "Is base64 encoding a Secret the same as encrypting it?",
        answer: "No. Kubernetes Secrets store values as base64, which is just an encoding, not encryption \u2014 anyone with read access to the Secret object can decode it instantly. For real secret protection, use encryption at rest, a KMS provider, or an external secrets manager.",
      },
      {
        question: "Can I generate manifests for other resource kinds?",
        answer: "This tool currently covers the four most commonly hand-written kinds: Deployment, Service, ConfigMap, and Secret. For other kinds, use the generated YAML here as a structural starting point and extend it manually.",
      },
      {
        question: "Does this apply the manifest to a cluster?",
        answer: "No, it only generates the YAML text in your browser. You still need to review it and apply it yourself with kubectl or a GitOps pipeline.",
      },
    ],
  },
  "devops/helm-values-formatter": {
    howToUse: [
      "Paste your Helm chart's values.yaml content into the editor.",
      "The formatter re-parses and re-serializes the YAML with consistent indentation.",
      "Adjust the indent width if your chart's conventions differ.",
      "Copy or download the cleaned-up values.yaml.",
    ],
    features: [
      "Normalizes indentation and spacing across an entire values.yaml file.",
      "Preserves data types (strings, numbers, booleans, lists, nested maps) exactly as parsed.",
      "Works for any standard YAML file, not just Helm-specific syntax.",
      "Runs entirely client-side \u2014 your values file is never uploaded.",
    ],
    faq: [
      {
        question: "Does this validate my values against the chart's values.schema.json?",
        answer: "No, this only re-formats valid YAML for consistent style. Schema validation against a chart's values.schema.json requires the chart itself and is best done with \u201chelm lint\u201d or \u201chelm template\u201d.",
      },
      {
        question: "Will it preserve comments in my values.yaml?",
        answer: "No \u2014 like most YAML parsers, re-serializing a parsed document drops comments. If your values.yaml relies heavily on inline documentation comments, keep a backup before formatting.",
      },
      {
        question: "Can I use this for other Helm YAML files, like Chart.yaml?",
        answer: "Yes, it works on any well-formed YAML document, not just values.yaml.",
      },
    ],
  },
  "devops/nginx-config-tester": {
    howToUse: [
      "Paste your nginx.conf (or a server/location block snippet) into the editor.",
      "The tool checks brace balance, semicolons, and common directive mistakes as you type.",
      "Review flagged lines \u2014 such as unclosed blocks or server blocks missing a listen directive.",
      "Fix issues in your real config and test with \u201cnginx -t\u201d before deploying.",
    ],
    features: [
      "Tracks nested block structure (http, server, location, if, upstream) and reports unclosed or mismatched braces with line numbers.",
      "Flags statements missing a terminating semicolon.",
      "Warns when a server {} block has no listen directive.",
      "Flags rewrite directives with no flag (last/break/redirect/permanent).",
    ],
    faq: [
      {
        question: "Does this replace \u201cnginx -t\u201d?",
        answer: "No. \u201cnginx -t\u201d loads your config into the actual nginx binary and validates every directive against the real module set, catching far more than syntax errors. This tool is a fast, offline, browser-based first pass for structural mistakes \u2014 always run \u201cnginx -t\u201d before reloading nginx in production.",
      },
      {
        question: "Can it check if my config actually works?",
        answer: "No, it only checks brace/semicolon syntax and a few common pitfalls. Runtime behavior (upstream health, SSL cert paths, module availability) can only be verified by running nginx itself.",
      },
      {
        question: "Is my configuration uploaded anywhere?",
        answer: "No, the check runs entirely in your browser using JavaScript.",
      },
    ],
  },
  "devops/apache-config-formatter": {
    howToUse: [
      "Paste your httpd.conf, virtual host, or .htaccess content into the editor.",
      "The formatter re-indents nested blocks like <VirtualHost>, <Directory>, and <IfModule> automatically.",
      "Copy or download the cleanly indented result.",
    ],
    features: [
      "Automatically increases indentation inside <Tag>...</Tag> blocks and decreases it on the closing tag.",
      "Leaves directive lines and their values untouched \u2014 only whitespace/indentation changes.",
      "Works for httpd.conf, virtual host files, and .htaccess snippets.",
      "Runs entirely in your browser \u2014 no upload required.",
    ],
    faq: [
      {
        question: "Does this validate my Apache config?",
        answer: "No, this only re-indents the file for readability. Use \u201capachectl configtest\u201d (or \u201chttpd -t\u201d) against the real Apache binary to check for actual syntax and module errors before reloading.",
      },
      {
        question: "Will it work on .htaccess files?",
        answer: "Yes \u2014 .htaccess files use the same directive and <Tag> block syntax as the main Apache config, so the same formatter applies.",
      },
      {
        question: "Does it change directive values or casing?",
        answer: "No, it only adjusts leading whitespace based on block nesting depth; directive names, arguments, and casing are left exactly as you typed them.",
      },
    ],
  },

  "cloud/aws-arn-parser": {
    howToUse: [
      "Paste any AWS ARN (Amazon Resource Name) into the input box.",
      "The tool splits it into partition, service, region, account ID, resource type, and resource ID.",
      "Use the quick-sample buttons to see how ARNs differ across services like S3, IAM, and Lambda.",
    ],
    features: [
      "Handles both slash-separated (arn:aws:s3:::bucket/key) and colon-separated (arn:aws:sns:us-east-1:123456789012:topic:label) resource formats.",
      "Clearly labels each ARN segment for quick debugging in IAM policies, CloudFormation, and logs.",
      "Works for any AWS partition, including aws-cn and aws-us-gov.",
      "Runs entirely client-side with no network requests.",
    ],
    faq: [
      {
        question: "Why does my ARN have no region or account ID?",
        answer: "Global services like S3 (bucket ARNs) and IAM don't include a region, and some resource types (like S3 buckets) don't include an account ID either \u2014 those fields are simply empty by design for that service, not a parsing error.",
      },
      {
        question: "What's the difference between a resource type and resource ID?",
        answer: "Many ARNs separate a resource type prefix from its specific identifier, e.g. \u201crole/lambda-execution-role\u201d has resource type \u201crole\u201d and resource ID \u201clambda-execution-role\u201d. Some ARNs (like S3 object ARNs) have no separate type \u2014 the whole remainder is the resource ID.",
      },
      {
        question: "Does this tool validate that the ARN actually exists in AWS?",
        answer: "No, it only parses the ARN's text structure. It doesn't call any AWS APIs, so it can't confirm the resource exists or that you have access to it.",
      },
    ],
  },
  "cloud/aws-iam-policy-formatter": {
    howToUse: [
      "Paste your IAM policy JSON document into the editor.",
      "The tool formats it with consistent indentation and checks each statement for common mistakes.",
      "Review flagged issues, such as wildcard Resources/Actions or a missing Effect.",
      "Copy the formatted JSON back into your IAM policy, Terraform, or CloudFormation template.",
    ],
    features: [
      "Pretty-prints the policy JSON with 2-space indentation.",
      "Validates that every statement has a valid Effect (\u201cAllow\u201d or \u201cDeny\u201d) and an Action/Resource.",
      "Flags wildcard \u201c*\u201d usage in Action or Resource as a least-privilege risk.",
      "Checks the top-level \u201cVersion\u201d field against the expected \u201c2012-10-17\u201d value.",
    ],
    faq: [
      {
        question: "Does this replace the AWS IAM Policy Simulator?",
        answer: "No. This checks JSON structure and common best-practice issues client-side. The IAM Policy Simulator (and \u201caws iam simulate-principal-policy\u201d) actually evaluates a policy against real actions and resources against your account, which this tool cannot do.",
      },
      {
        question: "Why is a wildcard Resource flagged as a warning, not an error?",
        answer: "A wildcard Resource (\u201c*\u201d) is valid IAM syntax and sometimes necessary (e.g. for account-wide read actions), but it's flagged because it often grants broader access than intended \u2014 AWS's least-privilege guidance recommends scoping Resource to specific ARNs wherever possible.",
      },
      {
        question: "Is my policy document uploaded anywhere?",
        answer: "No, parsing and checks all run locally in your browser using JavaScript.",
      },
    ],
  },
  "cloud/aws-cron-converter": {
    howToUse: [
      "Choose a direction: Unix cron to AWS cron, or AWS cron to Unix cron.",
      "Enter your cron expression in the input field.",
      "The converted expression appears instantly \u2014 copy it into an EventBridge rule or CloudWatch Events schedule.",
    ],
    features: [
      "Converts between standard 5-field Unix cron and AWS's 6-field cron(...) format used by EventBridge and CloudWatch Events.",
      "Automatically maps the day-of-week numbering difference (Unix 0-6 vs AWS 1-7) and inserts the required \u201c?\u201d wildcard.",
      "Flags invalid combinations, like specifying both day-of-month and day-of-week.",
      "Works entirely offline in your browser.",
    ],
    faq: [
      {
        question: "Why does AWS cron need a \u201c?\u201d character?",
        answer: "AWS's scheduler requires exactly one of the day-of-month or day-of-week fields to be \u201c?\u201d (meaning \u201cno specific value\u201d) since specifying both would be ambiguous \u2014 standard Unix cron doesn't have this restriction, so the tool inserts \u201c?\u201d automatically for you.",
      },
      {
        question: "Does AWS cron support seconds?",
        answer: "No, AWS's cron(...) expressions have exactly 6 fields: minute, hour, day-of-month, month, day-of-week, and year \u2014 there's no seconds field. For sub-minute scheduling, use a \u201crate(...)\u201d expression instead.",
      },
      {
        question: "Why is day-of-week numbered differently?",
        answer: "Standard Unix/cron uses 0-6 for Sunday-Saturday (with 7 also meaning Sunday in some implementations), while AWS cron uses 1-7 for Sunday-Saturday. This tool handles the conversion automatically.",
      },
    ],
  },
  "cloud/s3-url-parser": {
    howToUse: [
      "Paste any S3 URL \u2014 s3://, virtual-hosted-style, or path-style \u2014 to break it into bucket, key, and region.",
      "Or enter a bucket, key, and region in the builder section to generate all common S3 URL formats at once.",
      "Copy whichever URL format you need for your use case.",
    ],
    features: [
      "Parses s3:// URIs, virtual-hosted-style URLs (bucket.s3.amazonaws.com), and path-style URLs (s3.amazonaws.com/bucket).",
      "Detects the region embedded in regional S3 endpoints.",
      "Generates s3://, virtual-hosted-style, path-style, and static website endpoint URLs from a bucket and key.",
      "Runs entirely in your browser \u2014 no AWS credentials or API calls needed.",
    ],
    faq: [
      {
        question: "What's the difference between path-style and virtual-hosted-style URLs?",
        answer: "Virtual-hosted-style puts the bucket name in the hostname (bucket.s3.amazonaws.com/key), while path-style puts it in the URL path (s3.amazonaws.com/bucket/key). AWS has deprecated path-style access for new buckets in most regions, so virtual-hosted-style is now the recommended format.",
      },
      {
        question: "Does this check if the bucket or object actually exists?",
        answer: "No, it only parses or builds URL strings based on their format \u2014 it never makes a network request to AWS or checks permissions.",
      },
      {
        question: "Why is my key showing as empty?",
        answer: "If the URL points to a bucket root (no path after the bucket), the key is empty by definition \u2014 this usually means the URL refers to the bucket itself, not a specific object.",
      },
    ],
  },

  "authentication/oauth-url-builder": {
    howToUse: [
      "Enter your provider's authorization endpoint URL, client_id, and redirect_uri.",
      "Set the response_type, scope, and optional state/PKCE parameters.",
      "The full authorization URL is built live as you fill in each field.",
      "Copy the URL and redirect the user's browser to it to start the OAuth flow.",
    ],
    features: [
      "Supports all standard OAuth 2.0 / OpenID Connect authorization request parameters: response_type, scope, state, and PKCE (code_challenge/code_challenge_method).",
      "Lets you add arbitrary extra query parameters some providers require (like prompt or access_type).",
      "URL-encodes every parameter correctly using the browser's native URL API.",
      "Runs entirely client-side \u2014 no client secret required or transmitted, since authorization requests never include one.",
    ],
    faq: [
      {
        question: "Should I include a client secret in this URL?",
        answer: "No \u2014 the OAuth 2.0 authorization request (the URL the user's browser is redirected to) never includes a client secret. Client secrets are only used server-side in the subsequent token exchange request, which this tool doesn't build.",
      },
      {
        question: "What's the \u201cstate\u201d parameter for?",
        answer: "\u201cstate\u201d is an opaque value your app generates and later verifies on the callback, protecting against cross-site request forgery (CSRF) attacks on the OAuth flow. Always generate a fresh random state per login attempt in your real application.",
      },
      {
        question: "Do I need code_challenge if I'm not using PKCE?",
        answer: "No, leave it blank. PKCE (code_challenge/code_challenge_method) is required for public clients (like mobile and single-page apps) under current OAuth best practices, but confidential server-side clients with a client secret may not need it depending on the provider.",
      },
    ],
  },
  "authentication/pkce-generator": {
    howToUse: [
      "A PKCE code_verifier and matching code_challenge are generated automatically on page load.",
      "Adjust the verifier length if your provider requires a specific range (43-128 characters).",
      "Copy the code_challenge into your authorization request, and store the code_verifier to use in the token exchange.",
    ],
    features: [
      "Generates a cryptographically random code_verifier using the Web Crypto API.",
      "Computes the S256 code_challenge as SHA-256(code_verifier), base64url-encoded per RFC 7636.",
      "Uses only characters allowed by the PKCE spec (A-Z, a-z, 0-9, -, ., _, ~).",
      "Runs entirely in your browser \u2014 nothing is sent to a server, which matters since the verifier is effectively a secret.",
    ],
    faq: [
      {
        question: "What is PKCE and why does OAuth need it?",
        answer: "PKCE (Proof Key for Code Exchange, RFC 7636) protects the OAuth 2.0 authorization code flow from interception attacks, especially on public clients (mobile apps, SPAs) that can't securely store a client secret. The client proves it initiated the original request by presenting the code_verifier that hashes to the code_challenge sent earlier.",
      },
      {
        question: "Should I reuse the same code_verifier for every login?",
        answer: "No \u2014 generate a fresh code_verifier/code_challenge pair for every single authorization request. Reusing one defeats the security purpose of PKCE.",
      },
      {
        question: "Can I use \u201cplain\u201d instead of \u201cS256\u201d for code_challenge_method?",
        answer: "Technically yes if your provider supports it, but \u201cplain\u201d sends the code_verifier itself as the challenge, providing much weaker protection. Always use S256 unless you have a specific reason not to.",
      },
    ],
  },
  "authentication/totp-generator": {
    howToUse: [
      "A random Base32 secret and its current 6-digit TOTP code are generated automatically.",
      "Enter your own secret instead if you're testing an existing account, or click \u201cNew secret\u201d for a fresh one.",
      "Watch the code refresh automatically every 30 seconds (or your chosen period) with a countdown indicator.",
      "Copy the otpauth:// URI into a QR code generator to scan it with an authenticator app.",
    ],
    features: [
      "Generates RFC 6238-compliant time-based one-time passwords using the Web Crypto API's HMAC implementation.",
      "Supports SHA-1 (the default used by most apps), SHA-256, and SHA-512 algorithms, plus 6 or 8-digit codes.",
      "Live countdown bar shows exactly when the current code expires.",
      "Builds a standard otpauth:// URI compatible with Google Authenticator, Authy, and 1Password.",
    ],
    faq: [
      {
        question: "Is this compatible with Google Authenticator?",
        answer: "Yes \u2014 it implements the same RFC 6238 TOTP algorithm with SHA-1, 6 digits, and a 30-second period by default, which is exactly what Google Authenticator, Authy, and most 2FA apps use.",
      },
      {
        question: "Is my secret sent anywhere?",
        answer: "No. Code generation uses the Web Crypto API entirely within your browser \u2014 your secret never leaves your device. That said, treat any TOTP secret as sensitive and avoid pasting real production secrets into any online tool you don't fully trust.",
      },
      {
        question: "Why doesn't my code match my authenticator app?",
        answer: "This usually means the algorithm, digit count, or period don't match, or your device's clock is out of sync (TOTP is time-based, so clock drift of more than a step will produce different codes). Double-check both settings match exactly.",
      },
    ],
  },
  "authentication/api-key-generator": {
    howToUse: [
      "Choose a prefix (like sk_live_ or api_) or pick one of the presets.",
      "Set the key length and character set (hex, base64url, or alphanumeric).",
      "Choose how many keys to generate at once.",
      "Copy individual keys or all of them together.",
    ],
    features: [
      "Generates cryptographically secure random keys using the browser's crypto.getRandomValues API.",
      "Supports common prefix conventions used by Stripe-style APIs (sk_live_, pk_test_, etc.) or a fully custom prefix.",
      "Batch-generates up to 20 keys at once for seeding test environments.",
      "Runs entirely client-side \u2014 generated keys are never transmitted anywhere.",
    ],
    faq: [
      {
        question: "Are these keys cryptographically secure?",
        answer: "Yes, the random portion is generated using crypto.getRandomValues, the same cryptographically secure random number generator browsers use for security-sensitive operations \u2014 not Math.random().",
      },
      {
        question: "Can I use a generated key directly in production?",
        answer: "The random string itself is safe to use, but you're responsible for how you store, transmit, and revoke it. Never commit generated keys to source control, and store them in a secrets manager or environment variables.",
      },
      {
        question: "Does the prefix affect the key's security?",
        answer: "No, prefixes are just a convention for humans and tooling to quickly identify a key's type or environment (like Stripe's sk_live_/sk_test_) \u2014 the actual security comes entirely from the random portion's length and entropy.",
      },
    ],
  },

  "webdev/http-status-lookup": {
    howToUse: [
      "Type a status code (like 404) or a keyword (like \u201cnot found\u201d) into the search box.",
      "Matching status codes appear instantly with their official name and description.",
      "Browse the full list by leaving the search box empty.",
    ],
    features: [
      "Covers all standard HTTP status codes from 1xx through 5xx, including less common ones like 418 and 451.",
      "Search by exact code, partial code, or plain-English keywords.",
      "Concise, accurate descriptions based on the HTTP specification.",
      "No network requests \u2014 the full reference is bundled and searched instantly in your browser.",
    ],
    faq: [
      {
        question: "What's the difference between 401 and 403?",
        answer: "401 Unauthorized means authentication is required and either missing or invalid \u2014 the client should try authenticating. 403 Forbidden means the server understood who you are but you don't have permission to access the resource, and re-authenticating won't help.",
      },
      {
        question: "Is 418 \u201cI'm a teapot\u201d a real status code?",
        answer: "Yes, technically \u2014 it originated as an April Fools' joke in RFC 2324 (the Hyper Text Coffee Pot Control Protocol) but remains registered and is occasionally used by APIs for humor or as an easter egg.",
      },
      {
        question: "Which status code should I use for a successful DELETE request?",
        answer: "200 OK (with a response body), or more commonly 204 No Content, since there's often nothing meaningful to return after deleting a resource.",
      },
    ],
  },
  "webdev/mime-type-lookup": {
    howToUse: [
      "Type a file extension (like .png) or a MIME type (like image/png) into the search box.",
      "Matching entries appear instantly in either direction.",
      "Use the result in your Content-Type header, file upload validation, or server configuration.",
    ],
    features: [
      "Covers common document, image, audio, video, archive, font, and web file types.",
      "Search works both ways: extension to MIME type, or MIME type to extension.",
      "Includes short descriptions to disambiguate similar formats.",
      "No network requests \u2014 the reference table is bundled and searched instantly in your browser.",
    ],
    faq: [
      {
        question: "What's the difference between this and the MIME Detector tool?",
        answer: "This tool looks up the standard MIME type associated with a file extension or type name from a reference table. The MIME Detector tool instead inspects an actual file's binary content (magic bytes) to determine its real type, regardless of its extension \u2014 useful when a file might be mislabeled or have no extension.",
      },
      {
        question: "Why do some extensions map to more than one MIME type historically?",
        answer: "Certain formats (like .doc/.xls/.ppt) have both a legacy MIME type and, for newer Office Open XML formats (.docx/.xlsx/.pptx), a different modern MIME type \u2014 the extension alone doesn't always guarantee which one applies.",
      },
      {
        question: "Should I trust the Content-Type header sent by a browser file upload?",
        answer: "Not entirely \u2014 the browser mostly infers it from the file extension, which a user or attacker can fake. For anything security-sensitive, validate the actual file content server-side rather than trusting the reported MIME type.",
      },
    ],
  },
  "webdev/mime-detector": {
    howToUse: [
      "Drag and drop a file onto the drop zone, or click to choose one from your device.",
      "The tool reads the first few hundred bytes of the file locally and checks them against known \u201cmagic byte\u201d signatures.",
      "Compare the detected type against the browser-reported type and the file's extension.",
    ],
    features: [
      "Detects real file type from binary content signatures (magic bytes), not just the file extension.",
      "Covers common image, document, archive, audio, video, and font formats.",
      "Shows a hex dump of the first bytes for manual inspection.",
      "Reads only a small slice of the file locally \u2014 nothing is uploaded anywhere.",
    ],
    faq: [
      {
        question: "Why would a file's extension not match its detected type?",
        answer: "Files are sometimes renamed, corrupted, or intentionally mislabeled (either by mistake or maliciously to bypass extension-based filters). Magic-byte detection looks at the actual file content, which extensions can't fake as easily.",
      },
      {
        question: "Why does it show multiple possible matches for a ZIP-based file?",
        answer: "Many modern formats (.docx, .xlsx, .pptx, .jar, .apk) are actually ZIP archives internally with a specific internal folder structure, so they all share the same ZIP magic bytes at the start of the file. This tool can only confirm it's ZIP-based, not distinguish the specific sub-format from the header alone.",
      },
      {
        question: "Is my file uploaded to a server?",
        answer: "No \u2014 the file is read locally using the browser's File API and only the first 512 bytes are inspected in memory. Nothing is transmitted over the network.",
      },
    ],
  },
  "webdev/csp-generator": {
    howToUse: [
      "Fill in source values for each directive you want to restrict (default-src, script-src, img-src, etc.).",
      "Click the keyword chips to quickly append common values like 'self' or 'unsafe-inline'.",
      "The full Content-Security-Policy header value builds live as you type.",
      "Copy the header value into your server config, meta tag, or HTTP response headers.",
    ],
    features: [
      "Covers all the commonly used CSP directives, including frame-ancestors and form-action.",
      "One-click keyword chips for 'self', 'none', 'unsafe-inline', 'unsafe-eval', data:, and https:.",
      "Optional upgrade-insecure-requests directive with a single checkbox.",
      "Builds the exact header string you can paste directly into an HTTP response or <meta> tag.",
    ],
    faq: [
      {
        question: "Should I set a CSP via a <meta> tag or an HTTP header?",
        answer: "An HTTP response header (Content-Security-Policy) is generally preferred since it's enforced before any HTML is parsed and can't be tampered with by injected content. A <meta http-equiv=\"Content-Security-Policy\"> tag works as a fallback but some directives (like frame-ancestors and report-uri) aren't honored in the meta tag form.",
      },
      {
        question: "What happens if I don't set any directive?",
        answer: "If you omit a directive entirely, browsers fall back to default-src for that resource type. If default-src is also unset, that resource type isn't restricted by CSP at all.",
      },
      {
        question: "Why shouldn't I use 'unsafe-inline' for script-src?",
        answer: "Allowing 'unsafe-inline' permits any inline <script> tag or inline event handler to execute, which defeats much of CSP's protection against cross-site scripting (XSS). Prefer nonces or hashes for legitimate inline scripts instead.",
      },
    ],
  },
  "webdev/cors-header-generator": {
    howToUse: [
      "Enter the origin(s) you want to allow, or use * to allow any origin.",
      "Set the allowed methods, headers, and (optionally) exposed headers and max-age.",
      "Toggle \u201cAllow credentials\u201d if your API needs to accept cookies or Authorization headers cross-origin.",
      "Copy the generated response headers into your server or API gateway configuration.",
    ],
    features: [
      "Generates Access-Control-Allow-Origin, -Methods, -Headers, -Credentials, -Max-Age, and -Expose-Headers together.",
      "Automatically adds a Vary: Origin header when reflecting a specific origin, so caches don't leak cross-origin responses.",
      "Warns when an invalid combination (wildcard origin + credentials) is configured, since browsers reject that combination outright.",
      "Works for single origins, multiple origins, or a wildcard.",
    ],
    faq: [
      {
        question: "Why can't I use * with credentials enabled?",
        answer: "The CORS specification explicitly forbids combining Access-Control-Allow-Origin: * with Access-Control-Allow-Credentials: true \u2014 browsers will reject the response entirely for credentialed requests. You must reflect a specific validated origin instead.",
      },
      {
        question: "What's the difference between Allow-Headers and Expose-Headers?",
        answer: "Access-Control-Allow-Headers lists which request headers the client is allowed to send (relevant to preflight OPTIONS requests). Access-Control-Expose-Headers lists which response headers JavaScript running in the browser is allowed to read from the response \u2014 by default, only a small set of \u201csafe\u201d headers are readable.",
      },
      {
        question: "Do I need CORS headers for same-origin requests?",
        answer: "No, CORS only applies to cross-origin requests (a different scheme, host, or port than the page making the request). Same-origin requests are unaffected by CORS headers entirely.",
      },
    ],
  },
  "webdev/csp-validator": {
    howToUse: [
      "Paste your Content-Security-Policy header value into the box.",
      "The tool splits it into directives and checks each one for common mistakes and weaknesses.",
      "Review errors, warnings, and suggestions, then tighten your policy accordingly.",
    ],
    features: [
      "Flags unquoted keywords like self or none, which browsers treat as literal hostnames instead of special values.",
      "Warns about risky settings like wildcard sources, 'unsafe-inline', and 'unsafe-eval'.",
      "Detects duplicate directives and deprecated/non-standard directive names.",
      "Notes when default-src or script-src are missing, since other directives fall back to them.",
    ],
    faq: [
      {
        question: "Why is 'self' without quotes treated as an error?",
        answer: "In CSP syntax, keywords like 'self', 'none', 'unsafe-inline', and 'unsafe-eval' must be wrapped in single quotes to be recognized as special values. Without quotes, browsers interpret \u201cself\u201d as a literal hostname (which doesn't exist), silently breaking that part of your policy.",
      },
      {
        question: "Is a CSP with warnings still \u201cvalid\u201d?",
        answer: "Yes \u2014 warnings flag policies that are syntactically valid but weaker than best practice (like allowing 'unsafe-inline'). Only errors indicate something browsers will actually misinterpret or ignore.",
      },
      {
        question: "Can this tool test my CSP against my live website?",
        answer: "No, it only statically analyzes the header text you paste in. To see how your CSP behaves in practice, deploy it with Content-Security-Policy-Report-Only first and monitor violation reports.",
      },
    ],
  },

  "database/mongodb-query-formatter": {
    howToUse: [
      "Paste a MongoDB shell query, filter object, or aggregation pipeline into the input box.",
      "The formatter reflows it into a readable, indented structure.",
      "Copy the formatted result back into your code, mongosh, or Compass.",
    ],
    features: [
      "Handles MongoDB's permissive query syntax \u2014 unquoted keys, single-quoted strings, operators like $gt/$in, and constructors like ObjectId(...).",
      "Never evaluates or executes your query \u2014 it's a pure text reflow/reindent, so it's safe for pasting real production queries.",
      "Works on filters, update documents, and full aggregation pipelines with nested stages.",
      "Runs entirely in your browser.",
    ],
    faq: [
      {
        question: "Why not just use a JSON formatter for this?",
        answer: "MongoDB shell syntax is JavaScript-like, not strict JSON \u2014 it allows unquoted keys, single-quoted strings, and special constructors like ObjectId(), ISODate(), and NumberLong(), none of which are valid JSON. A strict JSON parser would reject these, so this tool uses a permissive tokenizer instead.",
      },
      {
        question: "Does this validate that my query is correct?",
        answer: "No, it only re-indents the text for readability \u2014 it doesn't check operator names, field references, or run the query against a real database.",
      },
      {
        question: "Is my query executed anywhere?",
        answer: "No. The formatter only tokenizes and reflows the text \u2014 it never calls eval() or connects to any database.",
      },
    ],
  },
  "database/mongodb-objectid-generator": {
    howToUse: [
      "Generated ObjectIds appear automatically \u2014 choose how many you need and click Regenerate for a fresh batch.",
      "To inspect an existing ObjectId, paste it into the decode box to see its embedded creation timestamp.",
      "Copy any ID for use in test data, seed scripts, or manual document references.",
    ],
    features: [
      "Generates valid 24-character hex ObjectIds following the standard 4-byte timestamp + 5-byte random + 3-byte counter structure.",
      "Decodes any ObjectId back into its creation timestamp, random value, and counter segments.",
      "Uses the browser's cryptographically secure random number generator for the random portion.",
      "Batch-generates up to 20 IDs at once.",
    ],
    faq: [
      {
        question: "Can I predict a document's creation time from its ObjectId?",
        answer: "Yes \u2014 by design, the first 4 bytes of every MongoDB ObjectId encode a Unix timestamp (in seconds) of when it was generated, which is exactly what the decoder in this tool extracts. This is a well-known MongoDB feature, not a vulnerability specific to this tool.",
      },
      {
        question: "Are ObjectIds generated here compatible with a real MongoDB database?",
        answer: "Yes, they follow the exact same 12-byte structure MongoDB drivers use, so they're valid to insert as _id values or reference in queries.",
      },
      {
        question: "Can two generated ObjectIds collide?",
        answer: "It's extremely unlikely \u2014 each ID combines a timestamp, cryptographically random bytes, and an incrementing counter, giving effectively unique values even when generating many IDs within the same second.",
      },
    ],
  },
  "database/redis-command-builder": {
    howToUse: [
      "Select a Redis command from the dropdown (SET, HSET, LPUSH, ZADD, etc.).",
      "Fill in the arguments described for that command \u2014 the tool shows exactly what each one expects.",
      "The fully composed command updates live and can be copied directly into redis-cli.",
    ],
    features: [
      "Covers 25+ of the most commonly used Redis commands across strings, hashes, lists, sets, sorted sets, and pub/sub.",
      "Shows a short description of what each command does before you fill in arguments.",
      "Builds the exact command syntax you'd type into redis-cli, ready to copy and paste.",
      "No Redis connection required \u2014 this only builds command strings, it doesn't execute them.",
    ],
    faq: [
      {
        question: "Does this actually run the command against a Redis server?",
        answer: "No, this only builds the command text \u2014 it never connects to a real Redis instance. You still need to run the generated command yourself via redis-cli or your Redis client library.",
      },
      {
        question: "Why does KEYS include a warning about production use?",
        answer: "KEYS scans the entire keyspace in one blocking operation, which can severely impact performance on a large production database. Redis's own documentation recommends SCAN instead, which iterates incrementally without blocking the server.",
      },
      {
        question: "Can I build multi-argument commands like MSET?",
        answer: "The tool currently focuses on the most common single- and few-argument commands. For commands with a variable number of key-value pairs, build the base command here and manually extend it with additional pairs as needed.",
      },
    ],
  },
  "database/postgresql-formatter": {
    howToUse: [
      "Paste your raw or minified PostgreSQL query into the input box.",
      "The formatter automatically indents and beautifies it using PostgreSQL-aware keyword recognition.",
      "Choose keyword case (uppercase, lowercase, or preserve) and indent width.",
      "Copy the formatted result or download it as a .sql file.",
    ],
    features: [
      "Understands PostgreSQL-specific syntax like RETURNING, ON CONFLICT, and array/JSONB operators.",
      "Customizable keyword casing and indentation to match your team's style guide.",
      "Handles complex queries with CTEs (WITH clauses), window functions, and joins.",
      "Runs entirely in your browser using a real SQL parser \u2014 no data is sent anywhere.",
    ],
    faq: [
      {
        question: "How is this different from the general SQL Formatter?",
        answer: "The general SQL Formatter lets you pick from several dialects (MySQL, SQL Server, BigQuery, etc.), while this tool is pre-configured specifically for PostgreSQL syntax, so PostgreSQL-specific keywords and operators format correctly by default without an extra dialect selection step.",
      },
      {
        question: "Does it validate that my query is syntactically correct?",
        answer: "The formatter will throw a clear error if it can't parse your SQL, which often surfaces syntax mistakes, but it isn't a full PostgreSQL query planner/validator \u2014 some queries that parse fine may still fail against a real database due to semantic issues (missing tables, wrong types, etc.).",
      },
      {
        question: "Is my SQL sent to a server?",
        answer: "No, formatting happens entirely client-side in your browser.",
      },
    ],
  },

  "ai/prompt-formatter": {
    howToUse: [
      "Paste your raw prompt \u2014 copied from a doc, chat, or notes app \u2014 into the input box.",
      "Toggle which cleanup steps to apply: trimming trailing spaces, collapsing blank lines, collapsing repeated spaces, and normalizing smart quotes.",
      "Copy the cleaned-up result and use it in your LLM API call or chat interface.",
    ],
    features: [
      "Trims trailing whitespace and collapses 3+ blank lines down to a single blank line.",
      "Converts smart/curly quotes, en/em dashes, and ellipsis characters copied from Word or Google Docs into plain ASCII equivalents.",
      "Optional space-collapsing for prompts pasted with inconsistent spacing.",
      "Shows before/after character and line counts so you can see exactly what changed.",
    ],
    faq: [
      {
        question: "Why does it matter if my prompt has smart quotes?",
        answer: "Smart/curly quotes (\u201c \u201d \u2018 \u2019) and other typographic characters copied from word processors can occasionally cause subtly different tokenization, break code embedded in a prompt, or look inconsistent when the model echoes them back. Normalizing to plain ASCII quotes avoids these edge cases.",
      },
      {
        question: "Will this change the meaning of my prompt?",
        answer: "No, all the cleanup steps only affect whitespace and punctuation style \u2014 they never rewrite words, remove instructions, or change the semantic content of your prompt.",
      },
      {
        question: "Should I collapse repeated spaces inside code blocks in my prompt?",
        answer: "Be careful \u2014 collapsing spaces will also affect any indentation inside code snippets embedded in your prompt. Leave that option off if your prompt contains code that relies on specific indentation.",
      },
    ],
  },
  "ai/prompt-token-counter": {
    howToUse: [
      "Paste your prompt into the input box.",
      "Choose the model you're targeting \u2014 the tool automatically uses the matching tokenizer encoding.",
      "The exact token count updates live, along with character and word counts and context-window usage.",
    ],
    features: [
      "Uses the real gpt-tokenizer library, a JavaScript port of OpenAI's official tiktoken, for exact token counts \u2014 not a character-based estimate.",
      "Supports both o200k_base (GPT-5, GPT-4o, GPT-4.1, o-series) and cl100k_base (GPT-4, GPT-3.5) encodings.",
      "Shows a context-window usage bar so you can see how close you are to a model's limit.",
      "Runs entirely in your browser \u2014 your prompt is never uploaded anywhere.",
    ],
    faq: [
      {
        question: "Is this an estimate or an exact count?",
        answer: "It's exact \u2014 it uses the same byte-pair encoding algorithm and vocabulary (via the gpt-tokenizer library) that OpenAI's own tokenizer uses, so the count matches exactly what you'd get from tiktoken or the OpenAI API's usage reporting for the selected encoding.",
      },
      {
        question: "Why do different models show different token counts for the same text?",
        answer: "Newer models (GPT-4o, GPT-4.1, GPT-5, o-series) use the o200k_base encoding, which is more efficient for many languages than the older cl100k_base encoding used by GPT-4 and GPT-3.5 \u2014 the same text can tokenize into a different number of tokens depending on which vocabulary is used.",
      },
      {
        question: "Does the token count include the system prompt or chat formatting overhead?",
        answer: "No, this counts only the exact text you paste. Real chat completions add a small number of extra tokens per message for role markers and formatting, which isn't included here.",
      },
    ],
  },
  "ai/openai-schema-validator": {
    howToUse: [
      "Paste your JSON Schema (either standalone, or wrapped in a response_format/function definition) into the editor.",
      "The tool walks every property and reports errors, warnings, and suggestions against OpenAI's structured outputs constraints.",
      "Fix flagged issues \u2014 like missing additionalProperties: false or properties missing from required \u2014 and re-check.",
    ],
    features: [
      "Checks that every object has \"additionalProperties\": false and that every property is listed in \"required\", both mandatory for OpenAI's strict mode.",
      "Flags unsupported JSON Schema keywords (like minLength, pattern, or minimum) that strict mode may ignore.",
      "Tracks total property count, nesting depth, and enum value count against OpenAI's documented limits.",
      "Resolves local $ref/$defs references so nested definitions are checked too.",
    ],
    faq: [
      {
        question: "Why does strict mode require every property to be in \"required\"?",
        answer: "OpenAI's structured outputs strict mode doesn't support truly optional properties \u2014 to make a field effectively optional, you declare its type as a union with null (e.g. [\"string\", \"null\"]) while still including it in \"required\", so the model must always emit the key, just possibly with a null value.",
      },
      {
        question: "Does this guarantee my schema will be accepted by the OpenAI API?",
        answer: "No \u2014 this checks against publicly documented constraints as of the time this tool was built, but OpenAI can add or change structured outputs rules over time. Always test your schema against the real API before relying on it in production, and check OpenAI's current documentation for the latest constraints.",
      },
      {
        question: "Can I validate a schema that isn't for OpenAI?",
        answer: "You can paste any JSON Schema, but the specific checks (additionalProperties, required-for-every-property, nesting/property limits) are tailored to OpenAI's structured outputs strict mode and may not apply to how you're using JSON Schema elsewhere.",
      },
    ],
  },
  "ai/embedding-token-counter": {
    howToUse: [
      "Paste the text you plan to send to an embedding model.",
      "Choose the embedding model \u2014 text-embedding-3-small, -large, or the legacy ada-002.",
      "The tool counts exact tokens and checks the result against that model's 8,191-token input limit.",
    ],
    features: [
      "Uses the exact cl100k_base tokenizer shared by all current OpenAI embedding models, via the gpt-tokenizer library.",
      "Shows a clear pass/fail indicator against the model's maximum input token limit.",
      "Displays a usage bar so you can see how close your text is to the limit at a glance.",
      "Runs entirely in your browser \u2014 your text is never uploaded anywhere.",
    ],
    faq: [
      {
        question: "Why do text-embedding-3-small, -large, and ada-002 all show the same token count?",
        answer: "All three models tokenize input using the same cl100k_base byte-pair encoding \u2014 they differ in output embedding dimensionality and quality, not in how they split text into tokens. The token count (and 8,191-token limit) is identical across them.",
      },
      {
        question: "What happens if my text exceeds the token limit?",
        answer: "The OpenAI embeddings API will reject a request that exceeds a model's maximum input tokens with an error. You'll need to split long text into smaller chunks and generate separate embeddings for each chunk.",
      },
      {
        question: "Does this count tokens the same way as the chat/completion token counter?",
        answer: "Yes \u2014 embedding models and GPT-4/GPT-3.5 chat models share the same cl100k_base tokenizer, so a piece of text will have the same token count whether you're embedding it or sending it as a chat prompt to those models.",
      },
    ],
  },
  "colors/picker": {
    howToUse: [
      "Use the big swatch and \u201cChoose color\u201d control to pick a color visually, or click \u201cPick from screen\u201d to sample any pixel on your screen (Chromium browsers).",
      "Alternatively, type or paste any hex code, rgb(), hsl(), or common color name into the text field.",
      "The card below instantly shows the equivalent HEX, RGB, HSL, HSV, and CMYK values.",
      "Click \u201cCopy\u201d next to any format to copy it to your clipboard.",
    ],
    features: [
      "Five color formats \u2014 HEX, RGB, HSL, HSV, and CMYK \u2014 updated live from a single source of truth.",
      "Optional screen eyedropper using the native browser EyeDropper API (Chrome, Edge, and other Chromium browsers).",
      "Accepts free-form input: hex codes, rgb()/hsl() functions, or common CSS color names.",
      "One-click random color generator for quick inspiration.",
      "Runs entirely client-side \u2014 no color values are ever sent to a server.",
    ],
    faq: [
      {
        question: "Why doesn't the screen eyedropper button appear?",
        answer: "The EyeDropper API that lets a web page sample any pixel on your screen is currently only supported in Chromium-based browsers (Chrome, Edge, Opera, Brave). Firefox and Safari don't support it yet, but you can still paste any color value manually.",
      },
      {
        question: "What color formats can I type into the input box?",
        answer: "You can type hex codes (#0ea5e9 or #09e), rgb()/rgba() functions, hsl()/hsla() functions, or common named colors like \"coral\" or \"steelblue\". The tool parses whatever you enter and shows all five equivalent formats.",
      },
      {
        question: "Is this color picker the same as my operating system's picker?",
        answer: "The visual swatch uses your browser's native color input, which typically opens your OS's own color picker UI, so the picking experience matches what you're used to on your device.",
      },
    ],
  },
  "colors/hex-rgb": {
    howToUse: [
      "Type a hex color (e.g. #0ea5e9) into the HEX field, or an RGB value (e.g. rgb(14, 165, 233)) into the RGB field.",
      "The other field updates instantly, along with a live color preview swatch.",
      "Use \u201cLoad sample\u201d to see an example, or \u201cClear\u201d to start over.",
    ],
    features: [
      "Fully bidirectional \u2014 edit either HEX or RGB and the other updates immediately.",
      "Accepts flexible RGB input: \"14, 165, 233\" or \"rgb(14, 165, 233)\" both work.",
      "Supports 3-digit and 6-digit hex shorthand (#0ea5e9 or #09e-style expansion).",
      "Live color swatch preview so you can visually confirm the result.",
      "100% client-side conversion \u2014 no data leaves your browser.",
    ],
    faq: [
      {
        question: "What's the difference between HEX and RGB color codes?",
        answer: "HEX (#rrggbb) and RGB (rgb(r, g, b)) represent the exact same underlying color \u2014 the red, green, and blue channel values \u2014 just in different notations. HEX uses base-16 digits (00-ff per channel); RGB uses base-10 numbers (0-255 per channel). They're fully interchangeable.",
      },
      {
        question: "Can I enter a 3-digit hex code like #0ea?",
        answer: "Yes. 3-digit shorthand hex codes are automatically expanded (each digit is doubled) to their full 6-digit equivalent before conversion, matching how browsers interpret shorthand hex in CSS.",
      },
      {
        question: "Why is my RGB input not converting?",
        answer: "Make sure each of the three RGB values is between 0 and 255. The field accepts both plain \"r, g, b\" and full \"rgb(r, g, b)\" syntax, but out-of-range numbers will be rejected.",
      },
    ],
  },
  "colors/rgb-hsl": {
    howToUse: [
      "Type an RGB value (e.g. rgb(14, 165, 233)) into the RGB field, or an HSL value (e.g. hsl(199, 89%, 48%)) into the HSL field.",
      "The other field updates instantly, along with a live color preview swatch.",
      "Use \u201cLoad sample\u201d to see an example, or \u201cClear\u201d to start over.",
    ],
    features: [
      "Fully bidirectional \u2014 edit either RGB or HSL and the other updates immediately.",
      "Accepts flexible input for both formats, with or without the rgb()/hsl() function wrapper.",
      "HSL is especially useful for adjusting lightness/saturation while keeping the same hue.",
      "Live color swatch preview so you can visually confirm the result.",
      "100% client-side conversion \u2014 no data leaves your browser.",
    ],
    faq: [
      {
        question: "Why would I use HSL instead of RGB?",
        answer: "HSL (Hue, Saturation, Lightness) separates a color's hue from how light/dark and how saturated it is, making it much easier to create consistent color variations \u2014 e.g. lightening or darkening a color while keeping its hue \u2014 than adjusting individual RGB channels.",
      },
      {
        question: "What ranges are valid for HSL values?",
        answer: "Hue is a degree on the color wheel from 0-360 (with wraparound). Saturation and lightness are percentages from 0% to 100%. Values outside these ranges will be rejected by the converter.",
      },
      {
        question: "Do HSL and RGB represent the exact same colors?",
        answer: "Yes, HSL is just a different coordinate system for describing the same sRGB color space that RGB uses. Converting back and forth (RGB to HSL to RGB) should return you to the same color, aside from minor rounding.",
      },
    ],
  },
  "colors/rgb-cmyk": {
    howToUse: [
      "Type an RGB value (e.g. rgb(14, 165, 233)) into the RGB field, or a CMYK value (e.g. cmyk(94%, 29%, 0%, 9%)) into the CMYK field.",
      "The other field updates instantly, along with a live color preview swatch.",
      "Use \u201cLoad sample\u201d to see an example, or \u201cClear\u201d to start over.",
    ],
    features: [
      "Fully bidirectional \u2014 edit either RGB or CMYK and the other updates immediately.",
      "Uses the standard subtractive CMYK conversion formula used by most design and print software.",
      "Useful for preparing on-screen colors for print workflows, and vice versa.",
      "Live color swatch preview so you can visually confirm the result.",
      "100% client-side conversion \u2014 no data leaves your browser.",
    ],
    faq: [
      {
        question: "Why does the same color look different when printed?",
        answer: "RGB is an additive color model for light-emitting screens, while CMYK is a subtractive model for ink on paper. The conversion here is a mathematical approximation \u2014 actual printed color also depends on your printer, ink, and paper, so always confirm with a physical proof for critical print work.",
      },
      {
        question: "What do the four CMYK letters stand for?",
        answer: "Cyan, Magenta, Yellow, and Key (black). Mixing cyan, magenta, and yellow ink in varying amounts theoretically produces black, but real inks aren't perfect, so a separate black (K) channel is added for true blacks and to reduce ink costs.",
      },
      {
        question: "Can I use this for professional print design?",
        answer: "This uses the standard naive RGB\u2194CMYK formula, which is a good approximation for quick estimates. For professional print work, use your design software's color management with the specific ICC profile of your printer and paper stock for accurate results.",
      },
    ],
  },
  "colors/hex-cmyk": {
    howToUse: [
      "Type a hex color (e.g. #0ea5e9) into the HEX field, or a CMYK value (e.g. cmyk(94%, 29%, 0%, 9%)) into the CMYK field.",
      "The other field updates instantly, along with a live color preview swatch.",
      "Use \u201cLoad sample\u201d to see an example, or \u201cClear\u201d to start over.",
    ],
    features: [
      "Fully bidirectional \u2014 edit either HEX or CMYK and the other updates immediately.",
      "Uses the standard subtractive CMYK conversion formula used by most design and print software.",
      "Handy for taking a brand's hex color and getting a starting CMYK value for print materials.",
      "Live color swatch preview so you can visually confirm the result.",
      "100% client-side conversion \u2014 no data leaves your browser.",
    ],
    faq: [
      {
        question: "Is the HEX to CMYK conversion exact for printing?",
        answer: "It's a mathematical approximation based on the standard naive conversion formula. Real-world printed color depends heavily on your printer, ink set, and paper, so treat this as a useful starting point rather than a guaranteed print-accurate value.",
      },
      {
        question: "Why is my CMYK output showing 0% cyan, magenta, and yellow for black?",
        answer: "Pure black (#000000) converts to 0% C/M/Y and 100% K, since the key (black) channel alone represents it. This matches how most software handles a pure black color.",
      },
      {
        question: "Can I enter CMYK without the % signs?",
        answer: "Yes, the field accepts plain numbers like \"94, 29, 0, 9\" as well as the full \"cmyk(94%, 29%, 0%, 9%)\" syntax \u2014 just make sure each value is between 0 and 100.",
      },
    ],
  },
  "colors/hex-hsv": {
    howToUse: [
      "Type a hex color (e.g. #0ea5e9) into the HEX field, or an HSV value (e.g. hsv(199, 94%, 91%)) into the HSV field.",
      "The other field updates instantly, along with a live color preview swatch.",
      "Use \u201cLoad sample\u201d to see an example, or \u201cClear\u201d to start over.",
    ],
    features: [
      "Fully bidirectional \u2014 edit either HEX or HSV and the other updates immediately.",
      "HSV (also called HSB) is the model used by most color-picker UIs in design software.",
      "Accepts flexible input, with or without the hsv() function wrapper.",
      "Live color swatch preview so you can visually confirm the result.",
      "100% client-side conversion \u2014 no data leaves your browser.",
    ],
    faq: [
      {
        question: "What's the difference between HSV and HSL?",
        answer: "Both separate hue from two other dimensions, but HSV's \"Value\" measures brightness (how close to white/full intensity a color is), while HSL's \"Lightness\" measures how close to black or white it is. HSV is typically what you see in a saturation/brightness square in design tools like Photoshop.",
      },
      {
        question: "Is HSV the same as HSB?",
        answer: "Yes, HSV (Hue, Saturation, Value) and HSB (Hue, Saturation, Brightness) are two names for the exact same color model \u2014 just different naming conventions used by different software.",
      },
      {
        question: "Why do my HSV values need a % sign for saturation and value?",
        answer: "By convention, saturation and value are expressed as percentages from 0-100%, while hue is a plain degree from 0-360. The parser accepts numbers with or without the % sign, but the underlying scale is always 0-100 for S and V.",
      },
    ],
  },
  "colors/gradient-generator": {
    howToUse: [
      "Pick a preset gradient to start quickly, or build your own from scratch.",
      "Choose linear or radial, set the angle or shape, and add up to 6 color stops with adjustable positions.",
      "Watch the live checkerboard preview update instantly as you tweak settings.",
      "Copy the generated CSS (plus a ready-to-use Tailwind arbitrary-value class) or download it as a .css file.",
    ],
    features: [
      "Supports both linear and radial gradients with unlimited angle/shape control.",
      "Up to 6 color stops with individually adjustable position percentages.",
      "One-click presets for common gradient styles (sunset, ocean, violet, and more).",
      "Outputs both plain CSS and an equivalent Tailwind CSS arbitrary-value class.",
      "Live checkerboard preview so you can see transparency and blending accurately.",
    ],
    faq: [
      {
        question: "What's the difference between linear and radial gradients?",
        answer: "A linear gradient transitions colors along a straight line at a chosen angle. A radial gradient transitions colors outward from a center point in a circle or ellipse shape. Both are standard CSS background-image values.",
      },
      {
        question: "Can I use the generated CSS directly in my stylesheet?",
        answer: "Yes \u2014 copy the \"background: ...\" line directly into any CSS rule, or use the provided Tailwind arbitrary-value class (e.g. bg-[linear-gradient(...)]) directly in your JSX/HTML className.",
      },
      {
        question: "How many color stops can I add?",
        answer: "You can add up to 6 color stops per gradient, each with its own color and position (0-100%). Stops are automatically sorted by position when generating the final CSS.",
      },
    ],
  },
  "colors/palette-generator": {
    howToUse: [
      "Pick a base color using the color swatch or by typing a hex code.",
      "Choose a harmony rule \u2014 complementary, analogous, triadic, tetradic, split-complementary, or monochromatic.",
      "The resulting palette swatches appear instantly, along with shade (darker) and tint (lighter) variations of your base color.",
      "Click any swatch to copy its hex code to your clipboard.",
    ],
    features: [
      "Six classic color-theory harmony rules, computed from HSL hue rotation around your base color.",
      "Automatic shade (toward black) and tint (toward white) ladders for building UI color scales.",
      "One-click copy on every swatch \u2014 no manual hex lookup needed.",
      "Random base color button for quick inspiration and exploration.",
      "Runs entirely client-side with instant, deterministic results.",
    ],
    faq: [
      {
        question: "What's the difference between the harmony types?",
        answer: "Complementary uses the color directly opposite on the color wheel (180\u00b0) for high contrast. Analogous uses neighboring hues (\u00b130\u00b0) for a cohesive look. Triadic and tetradic space 3 or 4 hues evenly around the wheel for balanced variety. Split-complementary softens complementary contrast by using the two hues next to the true complement. Monochromatic varies only lightness, keeping one hue.",
      },
      {
        question: "What are \"shades\" and \"tints\" used for?",
        answer: "Shades (mixed toward black) and tints (mixed toward white) of your base color are commonly used to build a full UI color scale \u2014 for example, a design system's blue-100 through blue-900 palette \u2014 while keeping every step recognizably the same hue.",
      },
      {
        question: "Does this guarantee good color contrast for accessibility?",
        answer: "No \u2014 harmony rules are about visual relationships on the color wheel, not accessibility. Use the separate Contrast Checker tool to verify any two colors from your palette meet WCAG contrast requirements before using them together for text and backgrounds.",
      },
    ],
  },
  "colors/contrast-checker": {
    howToUse: [
      "Set your foreground (text) color and background color using the pickers or by typing hex/rgb/hsl values.",
      "The live preview panel shows sample text rendered at your chosen colors.",
      "Check the computed contrast ratio and the pass/fail badges for WCAG AA and AAA, at both normal and large text sizes.",
      "Use \u201cSwap colors\u201d to quickly flip foreground and background.",
    ],
    features: [
      "Calculates the exact WCAG 2.x relative luminance and contrast ratio formula.",
      "Separate pass/fail indicators for AA normal, AA large, AAA normal, and AAA large text thresholds.",
      "Live text preview at your actual chosen colors, including a large/bold text sample.",
      "Accepts hex, rgb(), hsl(), or named colors for either field.",
      "Runs entirely client-side \u2014 instant results with no server round-trip.",
    ],
    faq: [
      {
        question: "What contrast ratio do I need for accessible websites?",
        answer: "WCAG 2.1 AA (the most commonly required standard) requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text (18pt+/24px+ regular, or 14pt+/18.5px+ bold). AAA is a stricter standard requiring 7:1 and 4.5:1 respectively.",
      },
      {
        question: "What counts as \"large text\" for the lower 3:1 threshold?",
        answer: "WCAG defines large text as at least 18 point (typically 24px) for regular weight, or at least 14 point (about 18.5px) for bold weight. Text below these sizes must meet the stricter normal-text thresholds.",
      },
      {
        question: "Why is my contrast ratio different from another tool?",
        answer: "All WCAG-compliant contrast checkers should produce the same result, since the relative luminance and contrast ratio formulas are precisely defined in the WCAG 2.x specification. Small differences can occur if a tool rounds input colors differently or uses non-sRGB color spaces.",
      },
    ],
  },
  "colors/color-blindness-simulator": {
    howToUse: [
      "Review the quick swatch table to see how 8 common colors appear under each type of color vision deficiency.",
      "Upload your own image (e.g. a UI screenshot, chart, or infographic) using the \u201cChoose image\u201d button.",
      "The tool renders four simulated versions side by side \u2014 protanopia, deuteranopia, tritanopia, and achromatopsia \u2014 next to your original.",
      "Use the results to check whether your design still communicates clearly (e.g. via a red/green status indicator) for color-blind users.",
    ],
    features: [
      "Simulates all four major types of color vision deficiency, including full monochromacy (achromatopsia).",
      "Upload any image and see all four simulations rendered instantly using the Canvas API.",
      "Quick reference swatch table for testing individual colors without needing an image.",
      "Images are processed entirely in your browser via canvas pixel manipulation \u2014 nothing is uploaded to a server.",
      "Useful for checking that critical information (charts, status colors, error states) isn't conveyed by color alone.",
    ],
    faq: [
      {
        question: "How common is color blindness?",
        answer: "Red-green color blindness (protanopia and deuteranopia combined) affects roughly 1 in 12 men (about 8%) and 1 in 200 women, making it one of the most common visual impairments designers need to account for. Tritanopia and full achromatopsia are much rarer.",
      },
      {
        question: "Is this simulation medically accurate?",
        answer: "No \u2014 it uses widely-used approximation matrices for visualization purposes and should be treated as a design-review aid, not a clinical or diagnostic tool. Actual color perception varies between individuals even with the same diagnosis.",
      },
      {
        question: "What should I do if my design fails the simulation?",
        answer: "Avoid relying on color alone to convey meaning \u2014 pair colors with icons, patterns, text labels, or position. Increasing contrast and choosing colors that differ in lightness (not just hue) also helps make designs more distinguishable for color-blind users.",
      },
      {
        question: "Is my uploaded image sent to a server?",
        answer: "No. The image is read directly in your browser using the File and Canvas APIs, and all four simulations are rendered locally on <canvas> elements. Nothing is uploaded anywhere.",
      },
    ],
  },
  "qr-barcode/qr-generator": {
    howToUse: [
      "Type or paste any text, URL, or content into the input box.",
      "Choose an error correction level \u2014 higher levels keep the code scannable even if it's partially damaged, at the cost of a denser pattern.",
      "The QR code preview updates instantly on the right.",
      "Click \u201cDownload PNG\u201d to save the generated code as an image.",
    ],
    features: [
      "Generates standard QR codes that scan with any modern phone camera or QR app.",
      "Four selectable error correction levels (L, M, Q, H) matching the official QR specification.",
      "Instant, debounced live preview as you type.",
      "One-click PNG download, ready to print or share.",
      "Runs entirely client-side \u2014 your content never leaves your browser.",
    ],
    faq: [
      {
        question: "Is there a limit to how much text I can encode?",
        answer: "QR codes can hold up to about 4,296 alphanumeric characters at the lowest error correction level, though very long content produces a very dense, harder-to-scan code. For URLs and short text, you have plenty of room.",
      },
      {
        question: "What does the error correction level actually do?",
        answer: "It adds redundant data so the code can still be read even if part of it is dirty, torn, or covered by a logo. Low (L) recovers about 7% of damage, while High (H) recovers up to 30%, at the cost of a denser, more detailed pattern.",
      },
      {
        question: "Can I use this QR code commercially?",
        answer: "Yes. The QR code format itself is open and free to use for any purpose, and the generated PNG belongs entirely to you.",
      },
    ],
  },
  "qr-barcode/qr-scanner": {
    howToUse: [
      "Click the upload area and choose an image file containing a QR code (a screenshot or photo works fine).",
      "The tool automatically decodes the code and displays the embedded text.",
      "If the decoded content is a URL, click \u201cOpen link\u201d to visit it directly.",
      "Use \u201cCopy text\u201d to copy the raw decoded content to your clipboard.",
    ],
    features: [
      "Decodes standard QR codes from any uploaded image file.",
      "Automatically detects when the decoded content is a clickable URL.",
      "Shows the detected barcode format alongside the result.",
      "Runs fully on-device using the ZXing decoding engine \u2014 no image is ever uploaded to a server.",
      "Works with screenshots, phone photos, and cropped images alike.",
    ],
    faq: [
      {
        question: "Why couldn't the tool decode my image?",
        answer: "Decoding works best with a clear, well-lit, in-focus photo of the QR code with good contrast. Try cropping tightly around just the code, increasing the image resolution, or retaking the photo with less glare.",
      },
      {
        question: "Does this work for QR codes only, or other barcodes too?",
        answer: "This tool is tuned for QR codes, but the underlying decoder can also recognize several other 2D and 1D formats. For dedicated barcode support, use the separate Barcode Reader tool.",
      },
      {
        question: "Is my uploaded image sent anywhere?",
        answer: "No. The image is decoded entirely in your browser using JavaScript \u2014 nothing is uploaded to a server at any point.",
      },
    ],
  },
  "qr-barcode/wifi-qr": {
    howToUse: [
      "Enter your Wi-Fi network name (SSID) and password.",
      "Select the security type used by your network (WPA/WPA2/WPA3, WEP, or open/no password).",
      "Optionally mark the network as hidden if it doesn't broadcast its SSID.",
      "Scan the generated QR code with a phone camera to join the network instantly, or download it to print and share.",
    ],
    features: [
      "Generates the standard WIFI: QR code format supported by iOS and Android camera apps.",
      "Supports WPA/WPA2/WPA3, WEP, and open (no password) network types.",
      "Automatically escapes special characters in the SSID and password to keep the QR code valid.",
      "Optional hidden-network flag for networks that don't broadcast their name.",
      "Great for offices, cafes, guest networks, and home Wi-Fi \u2014 no more reading passwords aloud.",
    ],
    faq: [
      {
        question: "Which phones support scanning a Wi-Fi QR code?",
        answer: "Most modern iPhones (iOS 11+) and Android phones (Android 10+) can scan a Wi-Fi QR code directly from the built-in camera app and will prompt to join the network automatically.",
      },
      {
        question: "Is my password safe when I generate this code?",
        answer: "Yes \u2014 the QR code is generated entirely in your browser using JavaScript. Your SSID and password are never sent to any server.",
      },
      {
        question: "Will this work for enterprise (WPA2-Enterprise) Wi-Fi?",
        answer: "No, the WIFI: QR format only supports pre-shared key networks (WPA/WPA2/WPA3-Personal, WEP, or open). Enterprise networks that require a username and certificate aren't supported by this QR format.",
      },
    ],
  },
  "qr-barcode/vcard-qr": {
    howToUse: [
      "Fill in the contact fields: name, organization, title, phone, email, website, and address.",
      "The QR code preview updates instantly as you type.",
      "Scan the code with a phone camera to save the contact directly, or download it as a PNG to add to a business card or email signature.",
    ],
    features: [
      "Generates a standard vCard 3.0 QR code recognized by iOS and Android contact apps.",
      "Supports name, organization, title, phone, email, website, and address fields.",
      "Scanning the code offers to save the contact directly \u2014 no app installation required.",
      "Perfect for digital business cards, conference badges, and email signatures.",
      "Runs entirely client-side; your contact details are never sent to a server.",
    ],
    faq: [
      {
        question: "What is a vCard?",
        answer: "vCard is a standard file format for electronic business cards, supported natively by virtually every phone's contacts app. Encoding a vCard into a QR code lets someone save your details by simply scanning it.",
      },
      {
        question: "Can I include multiple phone numbers or emails?",
        answer: "This tool supports one phone number and one email for simplicity, which covers the vast majority of business card use cases. For more complex vCards, use dedicated vCard-authoring software.",
      },
      {
        question: "Do I need to fill in every field?",
        answer: "No \u2014 only a first or last name is required to generate a code. All other fields are optional and will simply be omitted from the vCard if left blank.",
      },
    ],
  },
  "qr-barcode/barcode-generator": {
    howToUse: [
      "Enter the value you want to encode.",
      "Choose a barcode format \u2014 Code 128 works for almost any text, while EAN-13, EAN-8, UPC-A, and ITF-14 require an exact number of digits.",
      "Toggle whether to display the human-readable text underneath the bars.",
      "Download the generated barcode as a PNG for labels, packaging, or inventory systems.",
    ],
    features: [
      "Supports Code 128, Code 39, Code 93, Codabar, EAN-13, EAN-8, UPC-A, ITF-14, MSI, and Pharmacode formats.",
      "Automatically validates input length and checksum requirements for numeric retail formats.",
      "Optional human-readable text rendered underneath the bars.",
      "Instant live preview as you type or change formats.",
      "One-click PNG download suitable for printing on labels.",
    ],
    faq: [
      {
        question: "Which barcode format should I use?",
        answer: "Use Code 128 for general-purpose alphanumeric data (it's the most flexible). Use EAN-13 or UPC-A for retail products that need to scan at a point of sale, and ITF-14 for shipping cartons. Check with whoever will be scanning the barcode if you're unsure.",
      },
      {
        question: "Why does my EAN-13 or UPC-A value get rejected?",
        answer: "These formats require an exact number of digits (12 for UPC-A, 12-13 for EAN-13) and a valid checksum digit. If you enter one digit fewer than required, the library automatically calculates the checksum; entering the wrong length or non-numeric characters will produce an error.",
      },
      {
        question: "Can I print these barcodes for retail use?",
        answer: "Yes, the generated PNG is suitable for printing, but always test-scan a printed sample with your actual point-of-sale scanner first, since print quality and size affect scannability.",
      },
    ],
  },
  "qr-barcode/barcode-reader": {
    howToUse: [
      "Click the upload area and choose an image containing a barcode.",
      "The tool automatically decodes the barcode and shows its value and detected format.",
      "Use \u201cCopy text\u201d to copy the decoded value to your clipboard.",
    ],
    features: [
      "Decodes Code 128, Code 39, Code 93, Codabar, EAN-8/13, UPC-A/E, ITF, and more.",
      "Displays the detected barcode format alongside the decoded value.",
      "Runs entirely on-device using the ZXing decoding engine \u2014 nothing is uploaded to a server.",
      "Works with product photos, scanned labels, and screenshots.",
    ],
    faq: [
      {
        question: "Why isn't my barcode being detected?",
        answer: "Decoding works best with a straight-on, well-lit, high-contrast photo of the barcode. Try cropping closer to just the barcode, increasing resolution, avoiding glare, and making sure the barcode isn't skewed at a steep angle.",
      },
      {
        question: "Does this support QR codes too?",
        answer: "The underlying decoder can recognize QR codes as well, but for a QR-focused workflow (with automatic link detection) use the dedicated QR Scanner tool.",
      },
      {
        question: "Is my uploaded image stored anywhere?",
        answer: "No. All decoding happens locally in your browser \u2014 the image is never uploaded to any server.",
      },
    ],
  },
  "date-time/unix-timestamp": {
    howToUse: [
      "View the current Unix timestamp, updating live every second, in seconds or milliseconds.",
      "Enter a timestamp in the left panel to convert it to a local date, UTC date, and ISO 8601 string.",
      "Enter a date and time in the right panel to convert it back to a Unix timestamp.",
      "Click \u201cNow\u201d in either panel to instantly fill in the current value.",
    ],
    features: [
      "Live-updating current Unix timestamp in both seconds and milliseconds.",
      "Bidirectional conversion between timestamps and human-readable dates.",
      "Shows results in local time, UTC, and ISO 8601 format simultaneously.",
      "One-click \u201cNow\u201d buttons to grab the current timestamp or date instantly.",
      "Runs entirely in your browser using native JavaScript Date handling.",
    ],
    faq: [
      {
        question: "What is a Unix timestamp?",
        answer: "A Unix timestamp (or epoch time) counts the number of seconds (or milliseconds) that have elapsed since January 1, 1970, 00:00:00 UTC. It's a compact, timezone-independent way to represent a specific moment in time.",
      },
      {
        question: "How do I know if my timestamp is in seconds or milliseconds?",
        answer: "Unix timestamps in seconds for recent dates are 10 digits long (e.g. 1751328000), while millisecond timestamps are 13 digits (e.g. 1751328000000). Toggle the unit switch at the top to match your value.",
      },
      {
        question: "Does this tool account for time zones?",
        answer: "Yes \u2014 a Unix timestamp itself has no time zone since it represents an absolute instant, but the tool shows the equivalent date both in your browser's local time zone and in UTC.",
      },
    ],
  },
  "date-time/date-difference": {
    howToUse: [
      "Pick a start date and an end date using the date pickers.",
      "The tool instantly calculates the difference in years, months, and days, along with total days, weeks, hours, and minutes.",
      "Dates can be entered in either order \u2014 the tool automatically calculates from the earlier to the later date.",
    ],
    features: [
      "Calendar-aware breakdown into years, months, and days, not just raw days.",
      "Also shows total days, total weeks, total hours, and total minutes between the dates.",
      "Automatically handles date order, leap years, and varying month lengths.",
      "Useful for project timelines, contract terms, deadlines, and event planning.",
    ],
    faq: [
      {
        question: "Why does the year/month/day breakdown differ from dividing total days by 365?",
        answer: "Calendar months have different lengths (28-31 days) and years can be leap years (366 days), so a calendar-aware breakdown gives a more accurate and intuitive answer than a simple average-based division.",
      },
      {
        question: "Does this tool include the start or end date in the count?",
        answer: "The calculation measures the elapsed time between the two exact dates (both treated as midnight), so if you want an inclusive day count, add 1 to the total days result.",
      },
      {
        question: "Can I calculate differences that include time of day?",
        answer: "This tool uses whole calendar dates. For calculations that also account for a specific time of day, use the Age Calculator or Unix Timestamp tools with full date-time input.",
      },
    ],
  },
  "date-time/age-calculator": {
    howToUse: [
      "Enter your birth date.",
      "Optionally change the \u201cas of\u201d date \u2014 it defaults to today.",
      "See your exact age in years, months, and days, plus total days, weeks, and months lived, and a countdown to your next birthday.",
    ],
    features: [
      "Calculates exact age in years, months, and days using calendar-aware math.",
      "Shows total days, total weeks, and total months lived.",
      "Calculates days remaining until your next birthday.",
      "Lets you calculate age as of any date, not just today \u2014 useful for eligibility checks or historical calculations.",
    ],
    faq: [
      {
        question: "How is 'next birthday' calculated for someone born on February 29?",
        answer: "The tool uses the birth month and day directly against the calendar, so in non-leap years the next occurrence naturally falls on whatever date your birth month/day combination resolves to under standard JavaScript date handling.",
      },
      {
        question: "Can I calculate someone's age at a specific past or future date?",
        answer: "Yes \u2014 change the \u201cas of\u201d field to any date to calculate age at that point in time, which is useful for verifying age eligibility for contracts, events, or legal requirements.",
      },
      {
        question: "Is my birth date sent anywhere?",
        answer: "No, all calculations happen locally in your browser using JavaScript \u2014 no data is transmitted or stored.",
      },
    ],
  },
  "date-time/timezone-converter": {
    howToUse: [
      "Enter a date and time, and select the time zone that date/time is in.",
      "Choose which time zones you'd like to compare it against by clicking the chips.",
      "See the converted local time and UTC offset for each selected time zone.",
    ],
    features: [
      "Convert any date/time between dozens of common IANA time zones.",
      "Compare a single moment across multiple cities simultaneously.",
      "Shows the current UTC offset (including daylight saving adjustments) for each zone.",
      "Uses your browser's built-in Intl API for accurate, up-to-date time zone rules \u2014 no external service required.",
    ],
    faq: [
      {
        question: "Does this tool account for daylight saving time?",
        answer: "Yes \u2014 it uses the browser's native Intl.DateTimeFormat API, which applies the correct daylight saving rules for each time zone based on the specific date you enter.",
      },
      {
        question: "What does the offset next to each city mean?",
        answer: "It shows that time zone's current UTC offset (e.g. GMT-5) for the date and time you entered, which can change throughout the year due to daylight saving transitions.",
      },
      {
        question: "Can I add a time zone that's not in the list?",
        answer: "The tool includes a curated list of common time zones covering every populated continent. If you need a different one, you can select the closest major city in the same zone, since many cities share identical UTC offsets and rules.",
      },
    ],
  },
  "date-time/cron-generator": {
    howToUse: [
      "Pick a preset schedule to start quickly, or fill in the five fields directly (minute, hour, day of month, month, day of week).",
      "The resulting cron expression, a plain-English description, and the next 5 scheduled run times update instantly.",
      "Copy the generated expression to use in crontab, CI/CD pipelines, or job schedulers.",
    ],
    features: [
      "Ten one-click presets for the most common schedules (every 5 minutes, every weekday at 9am, etc.).",
      "Supports wildcards, ranges, lists, and step values (e.g. */15, 1-5, 1,3,5) in every field.",
      "Generates a clear, plain-English description of what the schedule means.",
      "Calculates and displays the next 5 actual run times based on your local clock.",
    ],
    faq: [
      {
        question: "What do the five fields in a cron expression mean?",
        answer: "In order: minute (0-59), hour (0-23), day of month (1-31), month (1-12), and day of week (0-6, where 0 is Sunday). A field can be a wildcard (*), a specific value, a range (1-5), a list (1,3,5), or a step (*/15).",
      },
      {
        question: "Is this the same cron format used by AWS EventBridge?",
        answer: "No, AWS EventBridge/CloudWatch uses a 6-field cron format with a mandatory year field. Use the dedicated AWS Cron Converter tool to convert between standard 5-field Unix cron and AWS's 6-field format.",
      },
      {
        question: "How accurate are the 'next run times'?",
        answer: "They're calculated by simulating your cron schedule minute-by-minute against your browser's local clock, so they reflect what would actually run on a server configured with that local time zone.",
      },
    ],
  },
  "date-time/cron-parser": {
    howToUse: [
      "Paste or type any 5-field cron expression into the input box.",
      "The tool immediately explains what it means in plain English and breaks down each of the five fields.",
      "See the next 5 times the schedule would actually run, based on the current date and time.",
    ],
    features: [
      "Parses and validates any standard 5-field cron expression, including ranges, lists, and step values.",
      "Generates a clear, human-readable explanation of the schedule.",
      "Shows a per-field breakdown (minute, hour, day of month, month, day of week).",
      "Calculates the next 5 actual run times, capped to a reasonable search window.",
    ],
    faq: [
      {
        question: "Why does the tool say a field is invalid?",
        answer: "Each field has a valid range (e.g. hour must be 0-23). The error message tells you exactly which field and what went wrong \u2014 common mistakes include using a value out of range or an extra/missing field.",
      },
      {
        question: "What if no next run times are found?",
        answer: "This can happen with very restrictive combinations (e.g. February 30th, which never exists) that never actually match a real calendar date. The tool searches up to roughly 4 years ahead before giving up.",
      },
      {
        question: "Does this support Quartz or Spring cron syntax with seconds?",
        answer: "No, this tool parses standard 5-field Unix/crontab syntax (minute hour day month weekday). Quartz-style 6 or 7-field expressions with a seconds field aren't currently supported.",
      },
    ],
  },
  "date-time/leap-year-checker": {
    howToUse: [
      "Enter any year to instantly see whether it's a leap year, along with an explanation of why.",
      "Enter a start and end year to list every leap year within that range.",
    ],
    features: [
      "Instantly checks any year against the standard Gregorian leap year rule.",
      "Explains the exact divisibility rule that determined the result.",
      "Lists all leap years within a custom range of up to 1,000 years.",
      "Useful for calendar systems, date-handling code, and historical research.",
    ],
    faq: [
      {
        question: "What is the rule for determining a leap year?",
        answer: "A year is a leap year if it's divisible by 4, except for century years, which must be divisible by 400 to be a leap year. So 2000 was a leap year, but 1900 and 2100 are not, even though both are divisible by 4.",
      },
      {
        question: "Why do leap years exist?",
        answer: "Earth's orbit around the sun takes about 365.2422 days, not exactly 365. Adding an extra day roughly every 4 years (with the century-year exception) keeps the calendar year synchronized with the astronomical year over long periods.",
      },
      {
        question: "Is year 0 or negative years supported?",
        answer: "The tool applies the standard modulo-based leap year rule to any integer you enter, including historical or hypothetical years, though the Gregorian calendar itself wasn't adopted universally until well after year 0.",
      },
    ],
  },
  "text/word-counter": {
    howToUse: [
      "Type or paste any text into the box.",
      "See live counts of words, characters, sentences, and paragraphs update as you type.",
      "Check the estimated reading time and speaking time for the text.",
    ],
    features: [
      "Live word, character, sentence, and paragraph counts.",
      "Estimated reading time (~200 words/min) and speaking time (~130 words/min).",
      "No account, upload, or server round-trip required \u2014 everything updates instantly as you type.",
      "Useful for essays, articles, social media posts, and speech/presentation prep.",
    ],
    faq: [
      {
        question: "How is reading time calculated?",
        answer: "Reading time is estimated using an average adult silent-reading speed of about 200 words per minute. Actual reading speed varies by content complexity and individual reader, so treat this as a helpful estimate rather than an exact figure.",
      },
      {
        question: "How are sentences counted?",
        answer: "The tool counts groups of text ending in a period, question mark, or exclamation point as sentences. Abbreviations (e.g. \u201cDr.\u201d) or unusual punctuation can occasionally affect the count slightly.",
      },
      {
        question: "Is my text saved or sent anywhere?",
        answer: "No \u2014 all counting happens locally in your browser as you type. Nothing is uploaded or stored.",
      },
    ],
  },
  "text/character-counter": {
    howToUse: [
      "Type or paste text into the box.",
      "Set an optional maximum character limit (e.g. 280 for a tweet) to track how close you are to the limit.",
      "See a full breakdown of letters, digits, spaces, punctuation, and uppercase/lowercase counts.",
    ],
    features: [
      "Live character counts with and without spaces.",
      "Optional configurable max-length tracker with a visual progress bar.",
      "Detailed breakdown: letters, digits, spaces, punctuation, uppercase, and lowercase counts.",
      "Handy for tweets, meta descriptions, SMS messages, and any character-limited field.",
    ],
    faq: [
      {
        question: "Why does the character count change when I change the max length?",
        answer: "It doesn't \u2014 the character count of your text stays the same. Only the progress bar and \u201cover limit\u201d indicator update to reflect your chosen maximum.",
      },
      {
        question: "Does this count emoji or special characters correctly?",
        answer: "The counter counts each JavaScript string character (UTF-16 code unit), which matches how most platforms like Twitter/X count characters. Some complex emoji made of multiple code points may count as more than one character.",
      },
      {
        question: "What's the difference between 'with spaces' and 'without spaces'?",
        answer: "\u201cWith spaces\u201d counts every character including spaces and line breaks. \u201cWithout spaces\u201d excludes all whitespace, useful when a platform's limit only counts visible characters.",
      },
    ],
  },
  "text/line-counter": {
    howToUse: [
      "Paste your text or code into the box.",
      "See the total line count, non-empty and empty line counts, and the longest line's length and position.",
    ],
    features: [
      "Counts total lines, non-empty lines, and empty (blank) lines separately.",
      "Identifies the longest line and its exact character length and line number.",
      "Shows the average line length across the whole text.",
      "Useful for code files, log files, CSV data, and text formatting checks.",
    ],
    faq: [
      {
        question: "Does a trailing newline count as an extra line?",
        answer: "Splitting text by newline characters means a trailing newline creates one additional empty line entry, consistent with how most text editors and the `wc -l` command interpret line counts.",
      },
      {
        question: "What counts as an 'empty' line?",
        answer: "A line is counted as empty if it contains no non-whitespace characters after trimming \u2014 so a line with only spaces or tabs is still counted as empty.",
      },
    ],
  },
  "text/duplicate-line-remover": {
    howToUse: [
      "Paste text containing duplicate lines into the input box.",
      "Choose whether matching should be case-sensitive, whether to trim whitespace before comparing, and whether to keep blank lines.",
      "Copy the deduplicated result from the output box \u2014 the number of removed duplicates is shown above it.",
    ],
    features: [
      "Removes duplicate lines while preserving the original order of first occurrence.",
      "Optional case-sensitive or case-insensitive matching.",
      "Optional whitespace trimming before comparing lines.",
      "Option to always keep blank lines regardless of duplication.",
      "Shows exactly how many duplicate lines were removed.",
    ],
    faq: [
      {
        question: "Does this reorder my lines?",
        answer: "No \u2014 the tool preserves the original order and keeps only the first occurrence of each duplicate line, removing subsequent repeats.",
      },
      {
        question: "What's the difference between case-sensitive and case-insensitive matching?",
        answer: "With case-sensitive matching on, \u201cApple\u201d and \u201capple\u201d are treated as different lines. Turn it off to treat them as duplicates of each other.",
      },
      {
        question: "Can I remove duplicates from a CSV or list of emails?",
        answer: "Yes \u2014 this works great for any line-based list, including CSV rows, email addresses, or URLs, as long as each item is on its own line.",
      },
    ],
  },
  "text/diff": {
    howToUse: [
      "Paste the original text into the left box and the changed text into the right box.",
      "The tool highlights added and removed lines below, with unchanged lines shown for context.",
      "Optionally enable \u201cIgnore case\u201d or \u201cIgnore whitespace\u201d for a looser comparison.",
    ],
    features: [
      "Line-by-line diff using a classic LCS (longest common subsequence) algorithm, the same approach used by most diff tools.",
      "Clearly marks added (+) and removed (\u2212) lines alongside unchanged context.",
      "Optional case-insensitive and whitespace-insensitive comparison modes.",
      "Shows a summary count of added, removed, and unchanged lines.",
      "Great for comparing config files, code snippets, articles, or any two versions of text.",
    ],
    faq: [
      {
        question: "Does this diff work at the word level or only line level?",
        answer: "This tool performs a line-by-line comparison, which is the most common and readable way to diff text and code. For character-level precision within a line, look for a dedicated word-diff tool.",
      },
      {
        question: "Why do minor whitespace changes show up as differences?",
        answer: "By default, the comparison is exact, so trailing spaces or different indentation will show as a change. Enable \u201cIgnore whitespace\u201d to normalize spacing before comparing.",
      },
      {
        question: "Can I diff code files with this tool?",
        answer: "Yes, it works well for comparing any plain text, including source code, configuration files, and JSON/YAML \u2014 though for structured data you may get more meaningful results from the dedicated JSON Diff tool.",
      },
    ],
  },
  "text/case-converter": {
    howToUse: [
      "Paste or type any text into the input box.",
      "Choose a target case from the dropdown \u2014 UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, or CONSTANT_CASE.",
      "Copy or download the converted text.",
    ],
    features: [
      "Supports 9 common case styles used across writing, coding, and URLs.",
      "Correctly detects word boundaries across camelCase, snake_case, kebab-case, and space-separated input, so you can convert between any of them.",
      "Instant conversion with copy and download support.",
      "Useful for renaming variables, formatting headlines, or preparing data for different systems.",
    ],
    faq: [
      {
        question: "Can I convert FROM camelCase or snake_case, not just to it?",
        answer: "Yes \u2014 the tool detects word boundaries in camelCase, PascalCase, snake_case, kebab-case, and space-separated text alike, so you can convert any of these styles into any other.",
      },
      {
        question: "What's the difference between Title Case and Sentence case?",
        answer: "Title Case capitalizes the first letter of every word (\u201cThe Quick Brown Fox\u201d), while Sentence case only capitalizes the first letter of each sentence (\u201cThe quick brown fox.\u201d).",
      },
      {
        question: "Does this handle acronyms correctly when converting from PascalCase?",
        answer: "The word-splitting logic detects transitions from an acronym run into a new capitalized word (e.g. \u201cXMLParser\u201d splits into \u201cXML\u201d and \u201cParser\u201d), which covers the most common acronym patterns.",
      },
    ],
  },
  "text/reverse-text": {
    howToUse: [
      "Paste or type text into the input box.",
      "Choose whether to reverse individual characters, the order of words, or the order of lines.",
      "Copy or download the reversed result.",
    ],
    features: [
      "Three reversal modes: character-by-character, word order, or line order.",
      "Correctly preserves whitespace when reversing word order.",
      "Instant conversion as you type.",
      "Fun for palindrome checks, social media posts, or puzzles \u2014 and useful for testing RTL text handling.",
    ],
    faq: [
      {
        question: "What's the difference between reversing characters and reversing words?",
        answer: "Character reversal flips the entire string backwards, turning \u201chello world\u201d into \u201cdlrow olleh\u201d. Word reversal keeps each word intact but reverses their order, turning it into \u201cworld hello\u201d.",
      },
      {
        question: "Can I reverse the order of lines in a list?",
        answer: "Yes \u2014 select \u201cReverse line order\u201d to flip the order of an entire list or multi-line block while keeping the text within each line unchanged.",
      },
    ],
  },
  "text/slug-generator": {
    howToUse: [
      "Type or paste a title, sentence, or any text into the input box.",
      "Choose whether to use hyphens or underscores as the separator.",
      "Copy the generated URL-friendly slug.",
    ],
    features: [
      "Converts any text into a lowercase, URL-safe slug.",
      "Strips accents/diacritics (e.g. \u00e9 \u2192 e) and special characters automatically.",
      "Choice of hyphen or underscore separators.",
      "Collapses multiple spaces or symbols into a single separator, with no leading/trailing separators.",
    ],
    faq: [
      {
        question: "Why should I use hyphens instead of underscores in a URL slug?",
        answer: "Search engines like Google treat hyphens as word separators but generally don't split words on underscores, so hyphens are the widely recommended default for SEO-friendly URLs. Underscores are still occasionally used for internal identifiers.",
      },
      {
        question: "What happens to accented characters like \u00e9 or \u00f1?",
        answer: "They're automatically normalized to their closest plain ASCII equivalent (\u00e9 \u2192 e, \u00f1 \u2192 n) since URL slugs are conventionally restricted to lowercase letters, numbers, and separators.",
      },
      {
        question: "Will this remove all punctuation?",
        answer: "Yes \u2014 any character that isn't a letter, number, space, or hyphen is stripped out, and remaining whitespace is converted into your chosen separator.",
      },
    ],
  },
  "text/lorem-ipsum": {
    howToUse: [
      "Choose how much text you need and the unit \u2014 words, sentences, or paragraphs.",
      "Optionally start with the classic \u201cLorem ipsum dolor sit amet...\u201d opening.",
      "Click \u201cRegenerate\u201d for a fresh variation, or copy the generated text directly.",
    ],
    features: [
      "Generates placeholder text by word count, sentence count, or paragraph count.",
      "Uses the traditional Latin-derived Lorem Ipsum word bank for authentic-looking filler text.",
      "Optional classic opening sentence for a recognizable start.",
      "Instant regeneration for quick variations when mocking up designs.",
    ],
    faq: [
      {
        question: "Why is Lorem Ipsum used as placeholder text?",
        answer: "Lorem Ipsum has been the standard placeholder text in design and publishing since the 1500s because its irregular, Latin-derived word and letter distribution looks like normal prose without distracting the viewer with readable, meaningful content.",
      },
      {
        question: "Does the generated text mean anything?",
        answer: "No \u2014 it's scrambled, semi-randomized Latin-derived text intended purely to fill layout space and isn't meant to be read as meaningful sentences.",
      },
      {
        question: "Can I generate a specific number of paragraphs for a mockup?",
        answer: "Yes, set the unit to \u201cParagraphs\u201d and enter the exact count you need (up to 50) for consistent, ready-to-paste filler content.",
      },
    ],
  },
  "text/remove-extra-spaces": {
    howToUse: [
      "Paste messy text with extra spaces, tabs, or blank lines into the input box.",
      "Choose which cleanup operations to apply: collapse multiple spaces/tabs, trim each line, and/or remove blank lines entirely.",
      "Copy or download the cleaned-up result.",
    ],
    features: [
      "Collapses multiple consecutive spaces or tabs into a single space.",
      "Trims leading and trailing whitespace from every line.",
      "Optionally removes entirely blank lines from the text.",
      "Great for cleaning up text copied from PDFs, emails, or poorly formatted documents.",
    ],
    faq: [
      {
        question: "Will this affect intentional formatting like code indentation?",
        answer: "Yes \u2014 collapsing spaces and trimming lines will remove leading whitespace used for indentation. Turn off \u201cTrim start/end of each line\u201d if you need to preserve indentation in code snippets.",
      },
      {
        question: "Does this remove line breaks between paragraphs?",
        answer: "Only if you enable \u201cRemove blank lines\u201d \u2014 by default, the tool preserves your line structure and only cleans up spacing within each line.",
      },
    ],
  },
  "text/text-sorter": {
    howToUse: [
      "Paste a list of items, one per line, into the input box.",
      "Choose to sort alphabetically, numerically, or by line length, and pick ascending or descending order.",
      "Optionally remove duplicate or empty lines, and toggle case sensitivity.",
    ],
    features: [
      "Three sort modes: alphabetical, numeric, and by line length.",
      "Ascending or descending order for any mode.",
      "Optional case-sensitive or case-insensitive alphabetical sorting.",
      "Optional automatic removal of duplicate and empty lines.",
      "Great for sorting names, numbers, file lists, or any line-based data.",
    ],
    faq: [
      {
        question: "How does numeric sorting handle non-numeric lines?",
        answer: "Any line that doesn't start with a recognizable number is treated as the value 0 for sorting purposes, so pure numeric lists sort most predictably in numeric mode.",
      },
      {
        question: "What's the difference between alphabetical and length sorting?",
        answer: "Alphabetical sorting orders lines by their text content (like a dictionary), while length sorting orders them purely by how many characters each line has, regardless of content.",
      },
      {
        question: "Can I combine sorting with duplicate removal?",
        answer: "Yes \u2014 enable \u201cRemove duplicates\u201d alongside any sort mode to get a sorted, de-duplicated list in a single step.",
      },
    ],
  },
  "numbers/percentage-calculator": {
    howToUse: [
      "Choose a calculation mode: \u201cX% of Y\u201d, \u201cX is what % of Y\u201d, or \u201c% increase/decrease from X to Y\u201d.",
      "Enter the two numbers for your chosen calculation.",
      "Read the result and the plain-English sentence explaining it.",
    ],
    features: [
      "Three common percentage calculation modes in one tool.",
      "Plain-English sentence explaining exactly what the result means.",
      "Handles both percentage increases and decreases automatically.",
      "Useful for discounts, tips, grades, statistics, and everyday math.",
    ],
    faq: [
      {
        question: "How do I calculate a discount, like 20% off $150?",
        answer: "Use the \u201cX% of Y\u201d mode with X=20 and Y=150 to get the discount amount ($30), then subtract that from the original price to get the final price ($120).",
      },
      {
        question: "What's the difference between 'X is what % of Y' and 'X% of Y'?",
        answer: "\u201cX% of Y\u201d calculates a value from a known percentage (e.g. 20% of 150 = 30). \u201cX is what % of Y\u201d works in reverse \u2014 given two values, it tells you what percentage the first is of the second (e.g. 30 is what % of 150 = 20%).",
      },
      {
        question: "Can this calculate percentage increase and decrease?",
        answer: "Yes, the third mode calculates the percentage change from an original value to a new value, showing a positive result for increases and a negative result for decreases.",
      },
    ],
  },
  "numbers/percentage-difference": {
    howToUse: [
      "Enter two values, A and B.",
      "See both the symmetric percentage difference (order-independent) and the percentage change from A to B (order-dependent).",
    ],
    features: [
      "Calculates the symmetric percentage difference relative to the average of both values.",
      "Also calculates the directional percentage change from A to B.",
      "Clear explanations of what each result means and when to use it.",
      "Useful for comparing prices, measurements, statistics, or any two related numbers.",
    ],
    faq: [
      {
        question: "What's the difference between 'percentage difference' and 'percentage change'?",
        answer: "Percentage difference is symmetric \u2014 it doesn't matter which number you call A or B, and it's calculated relative to the average of the two values. Percentage change is directional \u2014 it measures how much B differs from A specifically, expressed relative to A.",
      },
      {
        question: "Which one should I use to compare two prices?",
        answer: "If you want to know how much a price went up or down from an original value, use percentage change. If you're comparing two unrelated values where neither is the clear \u201coriginal\u201d, use percentage difference instead.",
      },
    ],
  },
  "numbers/scientific-calculator": {
    howToUse: [
      "Type an expression directly into the display, or use the on-screen buttons.",
      "Supports standard arithmetic plus trigonometric, logarithmic, root, and power functions.",
      "Press \u201c=\u201d or Enter to evaluate; previous calculations appear in the history panel and can be reused by clicking them.",
    ],
    features: [
      "Full expression parser supporting +, \u2212, \u00d7, \u00f7, ^ (power), % (modulo), and parentheses.",
      "Trigonometric functions (sin, cos, tan, and their inverses) work in degrees.",
      "Logarithmic (log, ln), root (sqrt, cbrt), and rounding (round, floor, ceil) functions.",
      "Built-in constants pi and e.",
      "Calculation history panel \u2014 click any past result to reuse it.",
    ],
    faq: [
      {
        question: "Are trigonometric functions in degrees or radians?",
        answer: "This calculator uses degrees for sin, cos, tan, and their inverse functions, matching how most everyday and scientific calculators are configured by default.",
      },
      {
        question: "Can I type expressions directly instead of clicking buttons?",
        answer: "Yes \u2014 the display is a live text input, so you can type a full expression like \u201csqrt(144) + 2^5\u201d directly and press Enter to evaluate it.",
      },
      {
        question: "Is this calculator safe from code injection since it evaluates expressions?",
        answer: "Yes \u2014 it uses a custom-built expression parser (not JavaScript's eval), which only recognizes numbers, defined math functions, and arithmetic operators, so it cannot execute arbitrary code.",
      },
    ],
  },
  "numbers/bmi-calculator": {
    howToUse: [
      "Choose metric (kg/cm) or imperial (lb/in) units.",
      "Enter your weight and height.",
      "See your calculated BMI, weight category, and where it falls on the standard BMI scale.",
    ],
    features: [
      "Supports both metric and imperial units, with automatic conversion when switching.",
      "Classifies results into underweight, normal weight, overweight, and obese categories.",
      "Visual scale marker showing exactly where your BMI falls.",
      "Instant calculation as you type, with no data stored or transmitted.",
    ],
    faq: [
      {
        question: "What is BMI and how is it calculated?",
        answer: "Body Mass Index (BMI) is calculated as weight in kilograms divided by height in meters squared (or, in imperial units, weight in pounds divided by height in inches squared, multiplied by 703). It's a widely used general screening measure.",
      },
      {
        question: "Is BMI an accurate measure of health?",
        answer: "BMI is a useful general screening tool but doesn't account for muscle mass, bone density, age, sex, or body composition, so athletes and very muscular individuals can show a misleadingly high BMI. It shouldn't replace a full health assessment from a professional.",
      },
      {
        question: "What are the standard BMI categories?",
        answer: "Underweight is below 18.5, normal weight is 18.5\u201324.9, overweight is 25\u201329.9, and obese is 30 and above, according to World Health Organization guidelines for adults.",
      },
    ],
  },
  "numbers/unit-converter": {
    howToUse: [
      "Choose a category: length, weight, temperature, volume, area, or speed.",
      "Select the \u201cfrom\u201d and \u201cto\u201d units, and enter a value.",
      "The converted result updates instantly. Use the swap button to quickly reverse the conversion direction.",
    ],
    features: [
      "Six unit categories covering length, weight, temperature, volume, area, and speed.",
      "Dozens of common metric and imperial units in each category.",
      "Accurate conversion formulas, including the correct offset-based formula for temperature.",
      "One-click swap button to reverse the conversion direction instantly.",
    ],
    faq: [
      {
        question: "Why does temperature conversion work differently from the other categories?",
        answer: "Unlike length or weight, temperature scales (Celsius, Fahrenheit, Kelvin) don't share a common zero point, so converting between them requires an offset-based formula rather than a simple multiplication factor.",
      },
      {
        question: "How precise are the conversion factors used?",
        answer: "The tool uses internationally standardized conversion factors (e.g. exactly 25.4mm per inch, 0.45359237kg per pound), the same values used in scientific and engineering references.",
      },
      {
        question: "Can I convert between units in different categories, like weight to volume?",
        answer: "No \u2014 unit conversion only makes physical sense within the same category (e.g. length to length), since weight and volume measure fundamentally different physical properties.",
      },
    ],
  },
  "numbers/currency-converter": {
    howToUse: [
      "Enter an amount and select the currency you're converting from and to.",
      "The converted amount updates automatically using live daily exchange rates.",
      "Use the swap button to quickly reverse the conversion direction.",
    ],
    features: [
      "Live exchange rates sourced from the European Central Bank via the free Frankfurter API.",
      "Supports dozens of major world currencies.",
      "Shows the current exchange rate between your selected currencies alongside the converted amount.",
      "Rates refresh once per business day, matching the ECB's official publication schedule.",
    ],
    faq: [
      {
        question: "How current are the exchange rates?",
        answer: "Rates are published once per business day by the European Central Bank and reflect reference rates around 16:00 CET, so they're not real-time trading rates but are updated daily.",
      },
      {
        question: "Can I use this for financial transactions or invoicing?",
        answer: "These rates are indicative reference rates intended for general informational use, not real-time market or transactional rates. For actual financial transactions, use rates provided by your bank or payment processor.",
      },
      {
        question: "Why are some currencies missing from the list?",
        answer: "The tool uses the European Central Bank's published reference rates, which cover roughly 30 major world currencies rather than every currency in circulation globally.",
      },
    ],
  },
  "numbers/decimal-binary": {
    howToUse: [
      "Type a decimal number into the left field, or a binary number into the right field.",
      "The other field updates instantly with the converted value.",
    ],
    features: [
      "Fully bidirectional conversion between decimal (base 10) and binary (base 2).",
      "Validates input to ensure only valid binary digits (0 and 1) are accepted in the binary field.",
      "Instant conversion with no page reload or server round-trip.",
      "Useful for programming, networking, and computer science education.",
    ],
    faq: [
      {
        question: "What is binary and why is it used in computing?",
        answer: "Binary is a base-2 number system using only the digits 0 and 1, directly matching the two electrical states (on/off) that digital circuits use to store and process information, making it the fundamental number system of computing.",
      },
      {
        question: "Can I convert negative numbers?",
        answer: "This tool converts non-negative integers. Negative number representation in binary (such as two's complement) depends on a fixed bit-width, which varies by programming language and platform.",
      },
    ],
  },
  "numbers/decimal-hex": {
    howToUse: [
      "Type a decimal number into the left field, or a hexadecimal number into the right field.",
      "The other field updates instantly with the converted value.",
    ],
    features: [
      "Fully bidirectional conversion between decimal (base 10) and hexadecimal (base 16).",
      "Accepts hex input with or without the 0x prefix, case-insensitively.",
      "Instant conversion with no page reload or server round-trip.",
      "Useful for programming, color codes, memory addresses, and debugging.",
    ],
    faq: [
      {
        question: "Why is hexadecimal commonly used in programming?",
        answer: "Hexadecimal is a compact way to represent binary data \u2014 each hex digit represents exactly 4 bits, so a byte fits neatly into 2 hex digits, making it far easier for humans to read and write than long binary strings.",
      },
      {
        question: "Do I need to include '0x' before a hex number?",
        answer: "No, you can type the hex digits directly (e.g. \u201cff\u201d) without a prefix; the tool interprets the hex field using base 16 regardless of a leading 0x.",
      },
    ],
  },
  "numbers/decimal-octal": {
    howToUse: [
      "Type a decimal number into the left field, or an octal number into the right field.",
      "The other field updates instantly with the converted value.",
    ],
    features: [
      "Fully bidirectional conversion between decimal (base 10) and octal (base 8).",
      "Validates that only valid octal digits (0-7) are accepted in the octal field.",
      "Instant conversion with no page reload or server round-trip.",
      "Useful for Unix file permissions, legacy systems, and computer science education.",
    ],
    faq: [
      {
        question: "Where is octal notation commonly used today?",
        answer: "The most common modern use of octal is representing Unix/Linux file permissions (e.g. chmod 755), where each digit compactly represents a set of read/write/execute permission bits.",
      },
      {
        question: "Why base 8 specifically?",
        answer: "Octal maps cleanly onto binary since each octal digit represents exactly 3 binary bits, which made it a convenient shorthand for binary data on older computer systems before hexadecimal became the more common convention.",
      },
    ],
  },
  "numbers/roman-numeral": {
    howToUse: [
      "Type a whole number between 1 and 3999 into the left field, or a Roman numeral into the right field.",
      "The other field updates instantly with the converted value.",
    ],
    features: [
      "Fully bidirectional conversion between Arabic numbers and standard Roman numerals.",
      "Validates that Roman numeral input follows standard subtractive notation rules.",
      "Supports the full standard range from 1 (I) to 3999 (MMMCMXCIX).",
      "Useful for movie sequels, historical dates, clock faces, and outlines.",
    ],
    faq: [
      {
        question: "Why is there a limit of 3999?",
        answer: "Standard Roman numerals don't have a symbol for numbers 4000 and above using the conventional subtractive notation (I, V, X, L, C, D, M) \u2014 representing larger numbers requires special overline or bracket notation that isn't universally standardized.",
      },
      {
        question: "Can Roman numerals represent zero or negative numbers?",
        answer: "No, the classical Roman numeral system has no symbol for zero and cannot represent negative numbers, which is one of the key limitations that led to its replacement by the Hindu-Arabic numeral system in most contexts.",
      },
      {
        question: "Why does the tool reject some strings that look like Roman numerals?",
        answer: "The tool validates that input follows standard Roman numeral construction rules (like only three consecutive repeated symbols, and correct subtractive pairs like IV instead of IIII), rejecting malformed sequences that don't round-trip to a valid canonical form.",
      },
    ],
  },

  "text/random-word": {
    howToUse: [
      "Choose how many words you want to generate.",
      "Click Regenerate to get a fresh batch of random words.",
      "Click any word, or Copy all, to copy it to your clipboard.",
    ],
    features: [
      "Draws from a curated list of everyday English words.",
      "Generate 1 to 20 words at once.",
      "One click to copy a single word or the entire batch.",
      "Runs 100% in your browser \u2014 no server round-trip.",
    ],
    faq: [
      {
        question: "What can I use a random word generator for?",
        answer: "Common uses include word games (Scrabble, word association), creative brainstorming, naming projects or variables, and generating placeholder content for mockups.",
      },
      {
        question: "Is the word list curated or does it include offensive words?",
        answer: "The word list is a curated set of neutral, everyday English words \u2014 no offensive or inappropriate content.",
      },
    ],
  },

  "text/random-letter": {
    howToUse: [
      "Choose uppercase, lowercase, or mixed case.",
      "Click Regenerate for a new batch of random letters.",
      "Copy any letter, or all of them, with one click.",
    ],
    features: [
      "Picks uniformly from A to Z on every generation.",
      "Uppercase, lowercase, or mixed case output.",
      "Generate up to 20 letters at once.",
    ],
    faq: [
      {
        question: "What is a random letter generator used for?",
        answer: "Common uses include classroom games, deciding random turn order, word games like Hangman, and generating test input for programs that process single characters.",
      },
      {
        question: "Is every letter equally likely to appear?",
        answer: "Yes, each of the 26 letters (A-Z) has an equal chance of being picked on every generation.",
      },
    ],
  },

  "colors/random-color": {
    howToUse: [
      "Choose how many random colors to generate.",
      "Click Regenerate for a fresh set of colors.",
      "Click any swatch to copy its HEX code to your clipboard.",
    ],
    features: [
      "Generates fully random HEX colors, with the RGB equivalent shown alongside.",
      "Visual swatch preview for every color.",
      "One click to copy any color's HEX code.",
      "Runs entirely in your browser.",
    ],
    faq: [
      {
        question: "Are these colors from a curated palette?",
        answer: "No, colors are fully random across the entire RGB color space, unlike the Palette Generator tool which builds harmonious color schemes from a base color.",
      },
      {
        question: "Can I get the RGB value instead of HEX?",
        answer: "Yes, the RGB equivalent is shown under each color swatch alongside its HEX code.",
      },
    ],
  },

  "networking/random-ip": {
    howToUse: [
      "Choose IPv4 or IPv6.",
      "Click Regenerate for a new batch of random addresses.",
      "Copy any address, or all of them, with one click.",
    ],
    features: [
      "Supports both random IPv4 and IPv6 address generation.",
      "Generate 1 to 20 addresses at once.",
      "Useful for populating test data, documentation examples, and demo UIs.",
    ],
    faq: [
      {
        question: "Are these real, working IP addresses?",
        answer: "No. Addresses are generated fully at random and are not checked against real-world allocation, so they may occasionally fall within private or reserved ranges. Use them for test data and documentation, not for real network configuration.",
      },
      {
        question: "Can I use these to look up a location?",
        answer: "No, these are randomly generated and don't correspond to any real device or location. Use the IP Lookup tool if you need to look up a real IP address.",
      },
    ],
  },

  "networking/random-mac-address": {
    howToUse: [
      "Optionally toggle uppercase formatting.",
      "Click Regenerate for a new batch of MAC addresses.",
      "Copy any address, or all of them, with one click.",
    ],
    features: [
      "Sets the locally-administered bit so generated addresses never collide with real vendor-assigned hardware.",
      "Optional uppercase or lowercase hex formatting.",
      "Generate 1 to 20 addresses at once.",
    ],
    faq: [
      {
        question: "Can these MAC addresses conflict with a real device?",
        answer: "It's extremely unlikely. The generator sets the locally-administered bit on every address, which is the standard convention for marking an address as non-vendor-assigned, so it won't match a real manufacturer's registered MAC range.",
      },
      {
        question: "What is a MAC address used for in testing?",
        answer: "Random MAC addresses are commonly used for testing network configuration UIs, populating demo device lists, and documentation examples without exposing real hardware identifiers.",
      },
    ],
  },

  "date-time/random-date": {
    howToUse: [
      "Set the year range you want to generate dates within.",
      "Click Regenerate for a new batch of random dates.",
      "Copy any date, or all of them, with one click.",
    ],
    features: [
      "Custom year range, from any start year to any end year.",
      "Dates are picked uniformly at random across the full range.",
      "Output in ISO YYYY-MM-DD format.",
    ],
    faq: [
      {
        question: "Can I generate dates in the past or future?",
        answer: "Yes, set any start and end year \u2014 past, present, or future \u2014 and dates will be picked uniformly at random within that range.",
      },
      {
        question: "What format are the dates in?",
        answer: "Dates are shown in ISO 8601 format (YYYY-MM-DD), which is easy to parse in most programming languages and spreadsheet tools.",
      },
    ],
  },

  "date-time/random-time": {
    howToUse: [
      "Choose 24-hour or 12-hour (AM/PM) format.",
      "Click Regenerate for a new batch of random times.",
      "Copy any time, or all of them, with one click.",
    ],
    features: [
      "Uniformly random across all 24 hours of the day.",
      "24-hour or 12-hour AM/PM display format.",
      "Includes seconds for precise test values.",
    ],
    faq: [
      {
        question: "Does this generate a date too, or just a time?",
        answer: "Just a time of day. Use the Random Date Generator alongside it if you need a full random date and time.",
      },
    ],
  },

  "random-generators/random-name": {
    howToUse: [
      "Choose how many names to generate.",
      "Click Regenerate for a fresh batch of random names.",
      "Copy any name, or all of them, with one click.",
    ],
    features: [
      "Combines random first and last names from large curated lists.",
      "Generate 1 to 20 names at once.",
      "Useful for mock user data, placeholder content, and demo UIs.",
    ],
    faq: [
      {
        question: "Are these real people's names?",
        answer: "No. Names are randomly combined from common first- and last-name lists purely for placeholder and testing purposes. Any resemblance to a real person is coincidental.",
      },
    ],
  },

  "random-generators/random-username": {
    howToUse: [
      "Click Regenerate for a fresh batch of random usernames.",
      "Copy any username, or all of them, with one click.",
    ],
    features: [
      "Combines a random adjective, noun, and number into a unique-sounding username.",
      "Generate 1 to 20 usernames at once.",
      "Useful for test accounts, demo data, and sign-up form placeholders.",
    ],
    faq: [
      {
        question: "Are these usernames guaranteed to be available on real platforms?",
        answer: "No, availability isn't checked against any real platform. They're designed to look plausible for mock data and testing, not for guaranteed real-world uniqueness.",
      },
    ],
  },

  "random-generators/random-nickname": {
    howToUse: [
      "Click Regenerate for a fresh batch of random nicknames.",
      "Copy any nickname, or all of them, with one click.",
    ],
    features: [
      "Combines a playful adjective with an animal name.",
      "Generate 1 to 20 nicknames at once.",
      "Great for gamertags, avatars, and demo profiles.",
    ],
    faq: [
      {
        question: "Can I use these as a gamertag?",
        answer: "Yes, they're designed to sound catchy and playful, making them a good starting point for a gamertag or online handle \u2014 just check availability on your platform of choice.",
      },
    ],
  },

  "random-generators/random-emoji": {
    howToUse: [
      "Choose how many emoji to generate.",
      "Click Regenerate for a fresh batch.",
      "Click any emoji, or Copy all, to copy it to your clipboard.",
    ],
    features: [
      "Draws from a curated set of faces, animals, food, activities, and objects.",
      "Generate 1 to 40 emoji at once.",
      "One click to copy any emoji or the whole batch.",
    ],
    faq: [
      {
        question: "Will the emoji display the same on every device?",
        answer: "Emoji rendering depends on your operating system and browser, so the exact appearance may vary slightly between devices, even though the underlying character is identical.",
      },
    ],
  },

  "random-generators/random-credit-card": {
    howToUse: [
      "Choose a card network (Visa, Mastercard, Amex, or Discover).",
      "Choose how many test numbers to generate.",
      "Copy any card number to use in your test environment.",
    ],
    features: [
      "Generates Luhn-checksum-valid numbers, just like real card numbers, so they pass basic format validation.",
      "Correct prefix and length per card network.",
      "Includes a random future expiry date and CVC.",
      "Clearly labeled as fake test data \u2014 not usable for real purchases.",
    ],
    faq: [
      {
        question: "Can these numbers be used to make a real purchase?",
        answer: "No. These are randomly generated numbers that only satisfy the Luhn checksum formula used for basic format validation. They are not issued by any bank, are not linked to any real account, and cannot be used for an actual transaction.",
      },
      {
        question: "Why generate fake credit card numbers at all?",
        answer: "Developers use Luhn-valid fake numbers to test checkout flows, payment form validation, and card-type detection logic without using real financial data.",
      },
      {
        question: "Is this legal to use?",
        answer: "Yes, generating and using fake numbers purely for software testing purposes is standard practice (the same technique payment processors like Stripe use for their own published test card numbers). Do not attempt to use them for any real transaction.",
      },
    ],
  },

  "random-generators/random-phone-number": {
    howToUse: [
      "Choose a country / format.",
      "Click Regenerate for a fresh batch of fake numbers.",
      "Copy any number, or all of them, with one click.",
    ],
    features: [
      "US numbers use the 555 exchange, officially reserved by the NANP for fictional use.",
      "Also supports UK, India, and generic international formats.",
      "Useful for test data and form validation testing.",
    ],
    faq: [
      {
        question: "Could a generated US number reach a real person?",
        answer: "No. The 555 exchange (e.g. 555-0100 through 555-0199 and similar) is officially reserved by the North American Numbering Plan specifically so media and software can use fictional numbers without risk of reaching a real subscriber.",
      },
      {
        question: "Are the UK, India, and generic numbers guaranteed unreachable?",
        answer: "They're generated to look plausible for format-validation testing, but unlike the US 555 exchange, there's no universal reserved-for-fiction range in every country, so treat all generated numbers as test data only and never attempt to contact them.",
      },
    ],
  },

  "random-generators/random-address": {
    howToUse: [
      "Choose how many addresses to generate.",
      "Click Regenerate for a fresh batch.",
      "Copy any address, or all of them, with one click.",
    ],
    features: [
      "Combines a random house number, street name, city, state, and ZIP code.",
      "Generate 1 to 20 addresses at once.",
      "Useful for testing shipping forms, checkout flows, and mock data sets.",
    ],
    faq: [
      {
        question: "Are these real addresses?",
        answer: "No. Street names, cities, and house numbers are randomly combined from generic lists and don't correspond to any real property. Any resemblance to a real address is coincidental.",
      },
      {
        question: "Can I use these for shipping something?",
        answer: "No, these are for testing form validation and UI only. Do not use generated addresses for actual shipping or any real-world purpose.",
      },
    ],
  },

  "fun/random-animal": {
    howToUse: ["Choose how many animals to generate.", "Click Regenerate for a fresh batch.", "Copy any animal name, or all of them, with one click."],
    features: ["Draws from 50 wild and domestic animal species.", "Generate 1 to 20 at once.", "No repeats logic \u2014 pure random pick every time."],
    faq: [
      {
        question: "What can I use a random animal generator for?",
        answer: "It's popular for classroom icebreakers, drawing prompts, charades and guessing games, and deciding a theme for a project.",
      },
    ],
  },

  "fun/random-country": {
    howToUse: ["Choose how many countries to generate.", "Click Regenerate for a fresh batch.", "Copy any result, or all of them, with one click."],
    features: ["Includes the country's flag emoji alongside its name.", "Covers roughly 50 countries across every continent.", "Generate 1 to 20 at once."],
    faq: [
      {
        question: "How many countries are in the list?",
        answer: "The generator picks from around 50 well-known countries spanning every continent, not the full list of all 195 UN member states.",
      },
      {
        question: "What can I use this for?",
        answer: "Great for travel bucket lists, \"pick my next trip\" decisions, geography quizzes, and classroom games.",
      },
    ],
  },

  "fun/random-city": {
    howToUse: ["Choose how many cities to generate.", "Click Regenerate for a fresh batch.", "Copy any city, or all of them, with one click."],
    features: ["Draws from major cities across every continent.", "Generate 1 to 20 at once."],
    faq: [
      {
        question: "What can I use a random city generator for?",
        answer: "It's a fun way to get travel inspiration, pick a theme for trivia night, or practice world geography.",
      },
    ],
  },

  "fun/random-food": {
    howToUse: ["Choose how many dishes to generate.", "Click Regenerate for a fresh batch.", "Copy any dish, or all of them, with one click."],
    features: ["Draws from dishes across many world cuisines.", "Generate 1 to 20 at once.", "A quick way to break decision paralysis over what to eat."],
    faq: [
      {
        question: "Can this suggest a recipe too?",
        answer: "No, it only suggests a dish name for inspiration. You'll need to look up a recipe separately once you've picked something.",
      },
    ],
  },

  "fun/random-fruit": {
    howToUse: ["Choose how many fruits to generate.", "Click Regenerate for a fresh batch.", "Copy any fruit, or all of them, with one click."],
    features: ["Draws from 35 common and exotic fruits.", "Generate 1 to 20 at once."],
    faq: [
      {
        question: "What can I use this for?",
        answer: "Handy for classroom games, smoothie or fruit-salad inspiration, and grocery-list ideas.",
      },
    ],
  },

  "fun/random-vegetable": {
    howToUse: ["Choose how many vegetables to generate.", "Click Regenerate for a fresh batch.", "Copy any vegetable, or all of them, with one click."],
    features: ["Draws from a wide variety of common vegetables.", "Generate 1 to 20 at once."],
    faq: [
      {
        question: "What can I use this for?",
        answer: "Great for meal planning, healthy-eating challenges, and classroom nutrition games.",
      },
    ],
  },

  "fun/random-drink": {
    howToUse: ["Choose how many drinks to generate.", "Click Regenerate for a fresh batch.", "Copy any drink, or all of them, with one click."],
    features: ["All suggestions are non-alcoholic beverages.", "Generate 1 to 20 at once."],
    faq: [
      {
        question: "Does this include alcoholic drinks?",
        answer: "No, every suggestion in the list is a non-alcoholic beverage \u2014 coffees, teas, juices, smoothies, and similar drinks.",
      },
    ],
  },

  "fun/random-movie": {
    howToUse: ["Choose how many movies to generate.", "Click Regenerate for a fresh batch.", "Copy any title, or all of them, with one click."],
    features: ["Draws from a curated list of well-known, highly-rated films across genres and decades.", "Generate 1 to 20 at once."],
    faq: [
      {
        question: "Is this list personalized to my taste?",
        answer: "No, it's a fixed curated list of broadly popular films, not a personalized recommendation engine \u2014 it's meant to break decision paralysis, not replace a streaming service's algorithm.",
      },
      {
        question: "Does it tell me where to watch the movie?",
        answer: "No, it only suggests a title. You'll need to check your own streaming services to see where it's available.",
      },
    ],
  },

  "fun/random-tv-show": {
    howToUse: ["Choose how many shows to generate.", "Click Regenerate for a fresh batch.", "Copy any title, or all of them, with one click."],
    features: ["Draws from a curated list of popular, well-reviewed series across genres.", "Generate 1 to 20 at once."],
    faq: [
      {
        question: "Is this list personalized to my taste?",
        answer: "No, it's a fixed curated list of broadly popular shows, meant to help you discover something new when you're not sure what to watch next.",
      },
    ],
  },

  "fun/random-book": {
    howToUse: ["Choose how many books to generate.", "Click Regenerate for a fresh batch.", "Copy any title, or all of them, with one click."],
    features: ["Draws from a curated list of classic and popular titles across genres.", "Generate 1 to 20 at once."],
    faq: [
      {
        question: "Does this include the author's name?",
        answer: "No, only the title is generated. You can search the title to find the author and more details.",
      },
    ],
  },

  "fun/random-game": {
    howToUse: ["Choose how many games to generate.", "Click Regenerate for a fresh batch.", "Copy any title, or all of them, with one click."],
    features: ["Draws from a curated list of popular video games across genres and platforms.", "Generate 1 to 20 at once."],
    faq: [
      {
        question: "Does this check which platform I own?",
        answer: "No, it just suggests a title from a curated list \u2014 you'll need to check availability on your own platform of choice.",
      },
    ],
  },

  "fun/random-pokemon": {
    howToUse: ["Choose how many Pok\u00e9mon to generate.", "Click Regenerate for a fresh batch.", "Copy any name, or all of them, with one click."],
    features: ["Draws from the original 65+ Generation I Pok\u00e9mon lineup.", "Generate 1 to 20 at once."],
    faq: [
      {
        question: "Is this an official Pok\u00e9mon tool?",
        answer: "No, this is an independent, unofficial fan-made generator that simply picks a name from the original Generation I roster for fun. It is not affiliated with, endorsed by, or associated with Nintendo, Game Freak, or The Pok\u00e9mon Company.",
      },
      {
        question: "What can I use this for?",
        answer: "It's a popular way to pick a random starter, settle a debate on which Pok\u00e9mon to catch next, or generate a random team for a challenge run.",
      },
    ],
  },

  "fun/random-dinosaur": {
    howToUse: ["Choose how many dinosaurs to generate.", "Click Regenerate for a fresh batch.", "Copy any name, or all of them, with one click."],
    features: ["Draws from well-known dinosaur species names.", "Generate 1 to 20 at once."],
    faq: [
      {
        question: "What can I use this for?",
        answer: "Popular for classroom science projects, trivia nights, and dinosaur-themed drawing or writing prompts.",
      },
    ],
  },

  "fun/random-bird": {
    howToUse: ["Choose how many birds to generate.", "Click Regenerate for a fresh batch.", "Copy any name, or all of them, with one click."],
    features: ["Draws from a wide variety of well-known bird species.", "Generate 1 to 20 at once."],
    faq: [
      {
        question: "What can I use this for?",
        answer: "Great for birdwatching checklists, classroom science games, and trivia nights.",
      },
    ],
  },

  "fun/random-flag": {
    howToUse: ["Choose how many flags to generate.", "Click Regenerate for a fresh batch of flags with their country names."],
    features: ["Displays each country's flag as a large emoji alongside its name.", "Generate 1 to 20 flags at once.", "Great for a quick flag-guessing game with friends."],
    faq: [
      {
        question: "Why do the flags look slightly different than expected?",
        answer: "Flags are rendered using your device's built-in Unicode flag emoji, so their exact appearance can vary slightly between operating systems and browsers.",
      },
      {
        question: "What can I use this for?",
        answer: "It's a fun way to test your geography knowledge \u2014 generate a flag, guess the country before revealing the name, and see how many you get right.",
      },
    ],
  },

  "decision-tools/spin-wheel": {
    howToUse: [
      "Type your own options into the text box, one per line (at least 2).",
      "Click Spin the Wheel and watch it spin to a random stop.",
      "The winning option is shown below the wheel once it stops.",
    ],
    features: [
      "Fully customizable options \u2014 type anything, from food choices to raffle entries.",
      "Smooth animated spin with a color-coded wheel and pointer.",
      "Each spin lands on a genuinely random segment, weighted equally regardless of label length.",
    ],
    faq: [
      {
        question: "Is every option equally likely to be picked?",
        answer: "Yes, every segment on the wheel is the same size (360\u00b0 divided evenly by the number of options) and the landing segment is chosen with a uniform random number, so every option has an equal chance.",
      },
      {
        question: "Is there a limit to how many options I can add?",
        answer: "There's no hard limit, but wheels with a very large number of options will have smaller, harder-to-read labels. It works best with roughly 2 to 20 options.",
      },
    ],
  },

  "decision-tools/yes-or-no": {
    howToUse: ["Click Ask the Question.", "The tool instantly reveals a random Yes or No.", "Your answer history and tally are tracked below."],
    features: ["Simple 50/50 random Yes or No decision.", "Running tally of Yes vs. No and total questions asked.", "Visual history of your last 20 answers."],
    faq: [
      {
        question: "Is it really a 50/50 chance?",
        answer: "Yes, each answer is chosen with an unbiased random pick between exactly two outcomes, so Yes and No each have a 50% chance on every question.",
      },
      {
        question: "Can I use this for serious decisions?",
        answer: "It's designed for fun, lighthearted decision-making \u2014 use your own judgment for anything important.",
      },
    ],
  },

  "decision-tools/coin-flip": {
    howToUse: ["Click Flip Coin.", "Watch the animated flip.", "The result (Heads or Tails) is shown once it lands, with a running tally below."],
    features: ["Animated 3D-style coin flip.", "Running heads/tails tally and flip history.", "Genuinely random outcome on every flip, not just alternating."],
    faq: [
      {
        question: "Is the coin flip truly random?",
        answer: "Yes, each flip uses your browser's random number generator to pick heads or tails independently every time, just like a real unbiased coin.",
      },
      {
        question: "Can I flip multiple times quickly?",
        answer: "Yes, just click Flip Coin again once the animation finishes \u2014 each flip is tracked in the history below so you can see your streak.",
      },
    ],
  },

  "decision-tools/dice-roller": {
    howToUse: ["Choose a die type (D4 to D20) and how many dice to roll.", "Click Roll.", "See each die's result plus the total if rolling more than one."],
    features: ["Supports standard tabletop die types: D4, D6, D8, D10, D12, and D20.", "Roll up to 6 dice at once.", "Automatic total for multi-dice rolls, handy for board games and tabletop RPGs."],
    faq: [
      {
        question: "Can I use this for tabletop RPGs like D&D?",
        answer: "Yes, it supports all the standard polyhedral dice used in tabletop RPGs (D4, D6, D8, D10, D12, D20) and adds up the total automatically when rolling multiple dice.",
      },
      {
        question: "Is each die roll independent?",
        answer: "Yes, every die is rolled independently with an equal chance of landing on any face, just like physical dice.",
      },
    ],
  },

  "decision-tools/number-picker": {
    howToUse: ["Set your min and max range.", "Optionally enable 'Avoid recent repeats'.", "Click Pick a Number to reveal a single random number."],
    features: ["Custom min/max range.", "Optional avoid-repeats mode using your recent pick history.", "Recent picks list shown below for quick reference."],
    faq: [
      {
        question: "How is this different from the Random Number Generator?",
        answer: "This tool is built for a single quick decision \u2014 one big number, one click \u2014 while the Random Number Generator (in the IDs & Passwords category) is built for generating a batch of multiple numbers at once.",
      },
      {
        question: "What does 'avoid recent repeats' do?",
        answer: "When enabled, the tool tries to avoid picking a number that appears in your recent pick history, as long as your range is large enough to still have unpicked values left.",
      },
    ],
  },

  "decision-tools/team-generator": {
    howToUse: ["Enter participant names, one per line.", "Choose how many teams to create.", "Click Generate Teams to randomly and evenly split everyone into teams."],
    features: ["Splits any list of names into a chosen number of teams as evenly as possible.", "Fully random shuffling on every generation \u2014 click again for a new split.", "Works for classroom groups, sports teams, work groups, and game nights."],
    faq: [
      {
        question: "Will the teams always be the same size?",
        answer: "Teams are as balanced as possible \u2014 if the number of names doesn't divide evenly, some teams will have one more member than others.",
      },
      {
        question: "Can I regenerate if I don't like the split?",
        answer: "Yes, click Generate Teams again for a completely fresh random shuffle at any time.",
      },
    ],
  },

  "decision-tools/random-picker": {
    howToUse: ["Enter your options, one per line.", "Optionally enable 'Remove option after it's picked'.", "Click Pick One to randomly select a single item."],
    features: ["Works with any custom list \u2014 names, prizes, chores, raffle entries, and more.", "Optional no-repeat mode that removes each pick from the pool, like drawing raffle tickets.", "Reset button to restore the full list at any time."],
    faq: [
      {
        question: "How is this different from the Spin Wheel?",
        answer: "Both pick a random item from your list with equal probability. The Random Picker gives an instant text result, while the Spin Wheel adds a visual animated spinning wheel for more suspense \u2014 use whichever fits the moment.",
      },
      {
        question: "Can I draw multiple winners without repeats?",
        answer: "Yes, enable 'Remove option after it's picked' and each pick is removed from the pool, so repeated clicks act like drawing raffle tickets without replacement.",
      },
    ],
  },

  "decision-tools/secret-santa-generator": {
    howToUse: [
      "Enter each participant's name on its own line (at least 2, all unique).",
      "Click Generate Secret Santa Pairs.",
      "Pass the device around \u2014 each person taps only their own card to privately reveal who they're buying a gift for, then taps again to hide it before passing it on.",
    ],
    features: [
      "Guarantees no one is ever assigned to gift themselves.",
      "With 3 or more participants, also avoids mutual pairs so two people can't immediately guess each other's match.",
      "Tap-to-reveal cards let one device be shared without spoiling anyone's assignment.",
    ],
    faq: [
      {
        question: "Does this keep the pairings secret from me, the organizer?",
        answer: "No. Since everything runs in your browser, whoever generates the list can see all the pairs on screen. To keep it a surprise even from the organizer, generate the pairs and immediately hand the device to participants one at a time without looking at the results yourself.",
      },
      {
        question: "What if I have people who shouldn't be paired together (like couples)?",
        answer: "This tool generates a fully random derangement without exclusion rules, so it doesn't currently support excluding specific pairings \u2014 you may need to regenerate and manually check, or swap two assignments yourself if a pairing doesn't work.",
      },
      {
        question: "What's a 'mutual pair' and why does it matter?",
        answer: "A mutual pair is when person A gifts person B, and person B also gifts person A. With 3 or more participants, the generator actively avoids this so that neither person can deduce the other's assignment just by knowing their own.",
      },
    ],
  },

  "loan-calculators/emi-calculator": {
    howToUse: [
      "Enter your loan amount, interest rate, and tenure using the sliders or input fields.",
      "Your EMI, total interest, and total payment update instantly.",
      "Click 'Show yearly amortization schedule' to see a year-by-year principal vs. interest breakdown.",
    ],
    features: [
      "Uses the standard reducing-balance EMI formula that banks and NBFCs use.",
      "Full yearly amortization schedule showing principal, interest, and remaining balance.",
      "Works for any currency and any loan type.",
    ],
    faq: [
      {
        question: "What formula does this use?",
        answer: "EMI = P \u00d7 r \u00d7 (1+r)^n / ((1+r)^n \u2212 1), where P is the principal, r is the monthly interest rate, and n is the number of monthly installments. This is the standard reducing-balance formula used by virtually all lenders.",
      },
      {
        question: "Why is my actual EMI slightly different from the lender's?",
        answer: "Lenders may round the EMI differently, apply processing fees, use a slightly different day-count convention, or charge a floating rate that changes over the loan term \u2014 this calculator assumes a fixed rate for the full tenure.",
      },
    ],
  },

  "loan-calculators/loan-eligibility": {
    howToUse: [
      "Enter your net monthly income and any existing EMIs or financial obligations.",
      "Adjust the FOIR (max EMI-to-income ratio) if you know your lender's specific limit.",
      "See your estimated maximum EMI and loan eligibility instantly.",
    ],
    features: [
      "Uses the FOIR (Fixed Obligation to Income Ratio) method most lenders use to assess eligibility.",
      "Accounts for your existing EMIs and obligations, not just gross income.",
      "Adjustable interest rate and tenure to see how they affect your eligibility.",
    ],
    faq: [
      {
        question: "What is FOIR?",
        answer: "FOIR (Fixed Obligation to Income Ratio) is the percentage of your net monthly income that lenders allow to go toward all fixed obligations combined (existing EMIs plus the new loan's EMI). Most lenders cap this between 40% and 60%.",
      },
      {
        question: "Will I definitely get approved for this amount?",
        answer: "No, this is an estimate based on income alone. Actual approval also depends on your credit score, employment stability, existing relationship with the lender, and their specific underwriting policies.",
      },
    ],
  },

  "loan-calculators/loan-affordability": {
    howToUse: [
      "Enter the monthly EMI amount you're comfortable paying.",
      "Set your expected interest rate and desired tenure.",
      "See the maximum loan amount that fits your budget.",
    ],
    features: [
      "Works backwards from your EMI budget instead of forwards from a loan amount.",
      "Instantly recalculates as you adjust rate or tenure.",
      "Shows a resulting-EMI check so you can confirm the numbers line up.",
    ],
    faq: [
      {
        question: "How is this different from the Loan Eligibility Calculator?",
        answer: "Loan Eligibility estimates what a lender might approve based on your income using the FOIR method. Loan Affordability instead starts from an EMI amount you personally choose to budget, regardless of what a lender might approve \u2014 useful for personal financial planning.",
      },
    ],
  },

  "loan-calculators/loan-comparison": {
    howToUse: [
      "Enter the loan amount, interest rate, and tenure for each offer (up to 4).",
      "Click '+ Add another offer' to compare more than two.",
      "The table below shows EMI, total interest, and total payment for each, with a checkmark on the cheapest.",
    ],
    features: [
      "Compare up to 4 loan offers side by side.",
      "Instantly recalculates all offers as you adjust any field.",
      "Highlights the offer with the lowest total repayment.",
    ],
    faq: [
      {
        question: "Should I always choose the offer with the lowest EMI?",
        answer: "Not necessarily \u2014 a lower EMI often means a longer tenure, which can mean paying significantly more total interest. Compare the 'Total payment' column, not just the EMI, to see the true cost of each offer.",
      },
    ],
  },

  "loan-calculators/loan-prepayment": {
    howToUse: [
      "Enter your outstanding loan amount, interest rate, and remaining tenure.",
      "Enter your prepayment amount and the month you plan to make it.",
      "See your new tenure, interest saved, and revised total interest.",
    ],
    features: [
      "Simulates a one-time lump-sum prepayment applied directly to your principal.",
      "Shows exactly how many months of tenure and how much interest you'll save.",
      "Assumes your EMI stays the same, so your loan simply finishes earlier.",
    ],
    faq: [
      {
        question: "Does prepayment always reduce my tenure, not my EMI?",
        answer: "Most lenders let you choose either outcome. This calculator models the 'reduce tenure' option, which usually saves more total interest than reducing the EMI instead, assuming you can comfortably continue paying the same EMI.",
      },
      {
        question: "Are there any prepayment charges?",
        answer: "This calculator doesn't include prepayment/foreclosure fees, which some lenders charge (especially on fixed-rate loans). Check your loan agreement for any applicable charges before making a prepayment.",
      },
    ],
  },

  "loan-calculators/car-loan": {
    howToUse: [
      "Enter the car's price and adjust the down payment percentage.",
      "Set your interest rate and loan tenure.",
      "See your monthly EMI, total interest, and total payment based on the remaining loan amount.",
    ],
    features: [
      "Built-in down payment slider \u2014 the loan amount automatically adjusts.",
      "Full amortization schedule available on demand.",
      "Sensible default ranges for typical car loan amounts and tenures.",
    ],
    faq: [
      {
        question: "Should I make a larger down payment?",
        answer: "A larger down payment reduces your loan amount, which lowers both your EMI and total interest paid \u2014 try adjusting the down payment slider to see the trade-off for your specific numbers.",
      },
    ],
  },

  "loan-calculators/bike-loan": {
    howToUse: [
      "Enter the bike's price and adjust the down payment percentage.",
      "Set your interest rate and loan tenure.",
      "See your monthly EMI, total interest, and total payment.",
    ],
    features: [
      "Built-in down payment slider sized for typical two-wheeler prices.",
      "Shorter default tenure range that matches how bike loans are typically structured.",
      "Full amortization schedule available on demand.",
    ],
    faq: [
      {
        question: "Why is the default interest rate higher than a car loan?",
        answer: "Two-wheeler loans typically carry a higher interest rate than car or home loans since bikes depreciate faster and loan amounts are smaller, making the loan relatively less profitable for lenders per rupee/dollar lent \u2014 adjust the rate to match your actual offer.",
      },
    ],
  },

  "loan-calculators/home-loan": {
    howToUse: [
      "Enter your home loan amount, interest rate, and tenure.",
      "See your EMI, total interest, and total payment instantly.",
      "Click 'Show yearly amortization schedule' to see how your principal and interest split changes every year over the loan.",
    ],
    features: [
      "Supports long tenures up to 30 years, typical for home loans.",
      "Full yearly amortization schedule \u2014 essential for understanding a home loan's long-term interest cost.",
      "Works with any currency for international home loan planning.",
    ],
    faq: [
      {
        question: "Why does so much of my early EMI go toward interest?",
        answer: "With reducing-balance EMIs, interest is calculated on the outstanding balance each month. Early in a long-tenure loan, the balance is highest, so a larger share of each EMI covers interest \u2014 check the amortization schedule to see this shift toward principal over time.",
      },
      {
        question: "Does this account for tax benefits on home loans?",
        answer: "No, this calculator only computes the EMI and interest breakdown. Tax deductions on home loan interest and principal vary by country and current tax law, so check with a tax advisor separately.",
      },
    ],
  },

  "loan-calculators/education-loan": {
    howToUse: [
      "Enter your education loan amount, interest rate, and repayment tenure.",
      "Set a moratorium (grace) period in months if your loan includes one \u2014 typically your course duration plus 6-12 months.",
      "See your post-moratorium EMI, which accounts for interest that accrued during the moratorium.",
    ],
    features: [
      "Models the moratorium period most education loans include, where interest accrues but no EMI is due.",
      "Automatically adds accrued moratorium interest to your principal before calculating the post-moratorium EMI.",
      "Full amortization schedule available for the repayment period.",
    ],
    faq: [
      {
        question: "What is a moratorium period?",
        answer: "A moratorium (or grace period) is the time during your course (plus often a few months after) when you're not required to pay EMIs. Interest usually still accrues during this period and is added to your principal once repayment begins, which is what this calculator simulates.",
      },
      {
        question: "Can I pay interest during the moratorium to reduce my EMI later?",
        answer: "Many lenders allow this, and it typically results in a lower post-moratorium EMI since the accrued interest won't be capitalized into your principal. This calculator assumes you don't pay during the moratorium \u2014 treat the result as the higher-EMI scenario.",
      },
    ],
  },

  "loan-calculators/personal-loan": {
    howToUse: [
      "Enter your personal loan amount, interest rate, and tenure.",
      "See your monthly EMI, total interest, and total payment instantly.",
    ],
    features: [
      "Default ranges sized for typical unsecured personal loan amounts and shorter tenures.",
      "Full amortization schedule available on demand.",
    ],
    faq: [
      {
        question: "Why are personal loan interest rates usually higher?",
        answer: "Personal loans are typically unsecured (no collateral), which means higher risk for the lender, resulting in higher interest rates compared to secured loans like home or car loans.",
      },
    ],
  },

  "investment-calculators/sip-calculator": {
    howToUse: [
      "Enter your planned monthly SIP amount.",
      "Set your expected annual rate of return and investment duration.",
      "See your projected future value, total invested amount, and wealth gained.",
    ],
    features: [
      "Uses the standard SIP future-value formula assuming monthly compounding.",
      "Visual bar showing the split between invested capital and investment growth.",
      "Works for any currency and duration up to 40 years.",
    ],
    faq: [
      {
        question: "Is the expected return guaranteed?",
        answer: "No. This calculator projects a future value assuming a constant annual return you specify, but actual mutual fund and market returns fluctuate significantly year to year and are never guaranteed.",
      },
      {
        question: "Does this account for expense ratios or exit loads?",
        answer: "No, this is a gross-return projection. Actual returns on real mutual fund investments will be reduced by fund expense ratios and any applicable exit loads or taxes.",
      },
    ],
  },

  "investment-calculators/swp-calculator": {
    howToUse: [
      "Enter your starting investment corpus and desired monthly withdrawal amount.",
      "Set your expected annual return and the number of years to simulate.",
      "See your remaining balance after that period, or when your corpus would run out if withdrawals exceed growth.",
    ],
    features: [
      "Month-by-month simulation of growth and withdrawals, not just a simplified formula.",
      "Clearly flags if your withdrawal rate isn't sustainable at the given return rate.",
      "Useful for retirement income planning from a lumpsum corpus.",
    ],
    faq: [
      {
        question: "What is an SWP?",
        answer: "A Systematic Withdrawal Plan (SWP) is the reverse of a SIP \u2014 instead of investing a fixed amount every month, you withdraw a fixed amount every month from an existing investment corpus, commonly used for generating regular income from mutual fund investments in retirement.",
      },
      {
        question: "What happens if my corpus runs out?",
        answer: "The calculator shows exactly which month your corpus would be depleted at your chosen withdrawal rate and return assumption, so you can adjust your withdrawal amount or increase your starting corpus accordingly.",
      },
    ],
  },

  "investment-calculators/lumpsum-calculator": {
    howToUse: [
      "Enter your one-time investment amount.",
      "Set your expected annual rate of return and investment duration.",
      "See your projected future value and wealth gained.",
    ],
    features: ["Uses standard annual compounding.", "Simple, fast way to project a one-time investment's growth."],
    faq: [
      {
        question: "How is this different from the SIP Calculator?",
        answer: "This calculator projects a single one-time investment growing over time, while the SIP Calculator projects a series of monthly investments \u2014 use whichever matches how you're actually investing.",
      },
    ],
  },

  "investment-calculators/step-up-sip": {
    howToUse: [
      "Enter your starting monthly SIP amount and the annual percentage you plan to increase it by.",
      "Set your expected annual return and investment duration.",
      "See your projected future value compared to a flat SIP of the same starting amount.",
    ],
    features: [
      "Models a monthly SIP that increases by a fixed percentage every 12 months.",
      "Simulated month-by-month for accuracy, not a simplified approximation.",
      "Useful for planning around expected salary increments over time.",
    ],
    faq: [
      {
        question: "Why would I use a step-up SIP instead of a flat SIP?",
        answer: "If your income is likely to grow over time, a step-up SIP lets you start with a comfortable, lower amount today while automatically increasing your investment each year \u2014 typically building meaningfully more wealth than a flat SIP of the same starting amount.",
      },
    ],
  },

  "investment-calculators/cagr-calculator": {
    howToUse: [
      "Enter your investment's initial and final value.",
      "Set the number of years between them.",
      "See the Compound Annual Growth Rate (CAGR).",
    ],
    features: ["Simple, direct CAGR calculation.", "Works for any asset \u2014 stocks, mutual funds, real estate, or business revenue."],
    faq: [
      {
        question: "What's the difference between CAGR and average annual return?",
        answer: "A simple average of yearly returns can be misleading because it ignores compounding and volatility. CAGR shows the single steady annual growth rate that would take your initial value to your final value over the period, which better reflects actual compounded growth.",
      },
    ],
  },

  "investment-calculators/xirr-calculator": {
    howToUse: [
      "Add each cash flow with its date \u2014 use negative amounts for money invested and positive amounts for money received back.",
      "Add as many cash flows as you need (top-ups, partial withdrawals, final redemption).",
      "See your annualized XIRR based on the exact dates entered.",
    ],
    features: [
      "Handles cash flows at any irregular dates and amounts.",
      "Solved numerically (bisection method on the NPV equation) for accuracy.",
      "Ideal for SIPs with varying amounts, top-ups, or partial withdrawals.",
    ],
    faq: [
      {
        question: "Why do I need at least one negative and one positive cash flow?",
        answer: "XIRR calculates the rate of return that makes the net present value of all cash flows equal zero, which requires both money going out (invested, negative) and money coming back (returned, positive) to be mathematically solvable.",
      },
      {
        question: "What if the calculator shows no result?",
        answer: "This can happen if there's no valid interest rate between -99% and 1000% that solves the equation for your specific cash flows \u2014 double check your amounts and signs are correct.",
      },
    ],
  },

  "investment-calculators/irr-calculator": {
    howToUse: [
      "Enter your cash flow for each period, starting with your initial investment as a negative number.",
      "Add as many periods as needed using '+ Add period'.",
      "See the calculated Internal Rate of Return.",
    ],
    features: [
      "Solved numerically (bisection method) for cash flows at regular intervals.",
      "Useful for evaluating projects, business investments, or any series of periodic cash flows.",
    ],
    faq: [
      {
        question: "When should I use IRR instead of XIRR?",
        answer: "Use IRR when your cash flows happen at regular, evenly-spaced intervals (like once a year). Use XIRR when your cash flows happen on irregular, specific dates \u2014 XIRR accounts for the exact time between each cash flow.",
      },
    ],
  },

  "investment-calculators/roi-calculator": {
    howToUse: [
      "Enter your initial investment and final (or current) value.",
      "Optionally enable the annualized return option and enter your holding period.",
      "See your gain/loss, ROI percentage, and annualized return.",
    ],
    features: ["Quick, simple ROI calculation for any investment or purchase.", "Optional annualized (CAGR-based) return calculation."],
    faq: [
      {
        question: "Does ROI account for how long I held the investment?",
        answer: "Basic ROI does not \u2014 a 20% ROI over 1 month is very different from a 20% ROI over 5 years. Enable the annualized return option and enter your holding period to get a time-adjusted comparison.",
      },
    ],
  },

  "investment-calculators/mutual-fund-returns": {
    howToUse: [
      "Enter the number of units you hold, your purchase NAV, and the current NAV (from your fund statement or app).",
      "Optionally enable annualized return and enter your holding period.",
      "See your invested value, current value, absolute return, and annualized return.",
    ],
    features: [
      "Works directly with units and NAV, matching how mutual fund statements report your holdings.",
      "Shows both absolute return and annualized (CAGR) return.",
    ],
    faq: [
      {
        question: "Where do I find my NAV and units?",
        answer: "Your purchase NAV, current NAV, and units held are all shown on your mutual fund account statement or in your investment app/broker portal for each fund you hold.",
      },
    ],
  },

  "investment-calculators/stock-average-price": {
    howToUse: [
      "Add each buy transaction (quantity and price per share) using '+ Add buy transaction'.",
      "Optionally enable the current market price to see your profit or loss.",
      "See your total quantity, average buy price, and total invested amount.",
    ],
    features: [
      "Handles any number of buy transactions across different prices and dates.",
      "Optional live profit/loss calculation against a current market price you enter.",
      "Useful when averaging up or down on a position over multiple purchases.",
    ],
    faq: [
      {
        question: "Does this include brokerage fees or taxes?",
        answer: "No, this calculates the average price based purely on quantity and price per share you enter. Add your brokerage fees to the price per share manually if you want them reflected in your average cost.",
      },
      {
        question: "Can I use this for selling too?",
        answer: "This calculator is built for tracking your average buy (cost) price across purchases. It doesn't currently model partial sells reducing your quantity \u2014 for that, you'd need to manually adjust the remaining quantity after a sale.",
      },
    ],
  },

  "savings-calculators/fd-calculator": {
    howToUse: [
      "Enter the amount you want to deposit and the interest rate offered by your bank.",
      "Choose your compounding frequency (most Indian banks compound FDs quarterly).",
      "Set your tenure in years using the slider.",
      "See your maturity value and total interest earned update instantly.",
    ],
    features: [
      "Supports annual, half-yearly, quarterly, and monthly compounding.",
      "Instant maturity value and interest breakdown.",
      "Works in any currency for international fixed deposit comparisons.",
      "100% client-side \u2014 no data leaves your browser.",
      "Free with no sign-up required.",
    ],
    faq: [
      { question: "How is FD interest calculated?", answer: "FD interest is calculated using standard compound interest: Maturity value = Principal \u00D7 (1 + rate/compoundings)^(compoundings \u00D7 years). Most Indian banks compound FD interest quarterly." },
      { question: "Is FD interest taxable?", answer: "Yes, in India, interest earned on FDs is fully taxable as per your income tax slab, and banks deduct TDS if annual interest exceeds the prescribed threshold." },
      { question: "What's the difference between cumulative and non-cumulative FDs?", answer: "A cumulative FD reinvests interest and pays it all at maturity (what this calculator models). A non-cumulative FD pays out interest periodically (monthly/quarterly) instead of compounding it." },
      { question: "Can I withdraw an FD before maturity?", answer: "Most banks allow premature withdrawal with a penalty (usually 0.5\u20131% reduction in interest rate). Check your bank's specific terms." },
    ],
  },

  "savings-calculators/rd-calculator": {
    howToUse: [
      "Enter your fixed monthly deposit amount.",
      "Set the interest rate offered by your bank.",
      "Choose your tenure in months using the slider.",
      "View your estimated maturity value, total deposits, and interest earned.",
    ],
    features: [
      "Models monthly compounding on a fixed recurring deposit.",
      "Shows total deposited vs. interest earned separately.",
      "Flexible tenure from 3 months to 10 years.",
      "Instant, real-time calculation as you adjust inputs.",
      "Free and works entirely in your browser.",
    ],
    faq: [
      { question: "How is RD maturity value calculated?", answer: "This calculator compounds your fixed monthly deposit at a monthly rate over your chosen tenure. Banks typically use quarterly compounding for RDs, so your actual maturity value may differ slightly." },
      { question: "What's the minimum and maximum RD tenure?", answer: "Most Indian banks offer RD tenures from 6 months to 10 years, with monthly deposit amounts starting as low as \u20B9100\u2013500." },
      { question: "Is RD better than SIP?", answer: "RDs offer fixed, guaranteed returns and are lower risk, while SIPs in mutual funds offer potentially higher but market-linked, variable returns. Choose based on your risk appetite and goals." },
      { question: "Can I close an RD early?", answer: "Yes, but premature closure usually attracts a lower interest rate or penalty, similar to fixed deposits." },
    ],
  },

  "savings-calculators/ppf-calculator": {
    howToUse: [
      "Enter your planned yearly PPF contribution (up to \u20B91.5 lakh per year).",
      "Set the current PPF interest rate (revised quarterly by the government).",
      "Adjust the tenure \u2014 minimum 15 years, extendable in blocks of 5.",
      "View your projected maturity value, total deposits, and interest earned.",
    ],
    features: [
      "Models the standard PPF annual compounding structure.",
      "Supports the full 15-year lock-in plus extensions.",
      "Shows a clear breakdown of principal vs. interest.",
      "Useful for long-term retirement and tax-saving planning.",
      "Free, instant, and fully private \u2014 no data is stored.",
    ],
    faq: [
      { question: "What is the current PPF interest rate?", answer: "The PPF interest rate is set by the Government of India and revised quarterly. Check the current rate on the India Post or your bank's website, then enter it here for an accurate projection." },
      { question: "Is PPF interest taxable?", answer: "No. PPF falls under the EEE (Exempt-Exempt-Exempt) tax category in India \u2014 contributions, interest earned, and maturity proceeds are all tax-free." },
      { question: "Can I withdraw from PPF before 15 years?", answer: "Partial withdrawals are allowed from the 7th financial year onwards, subject to certain limits. Full withdrawal is only allowed at maturity (15 years) or on extension anniversaries." },
      { question: "What is the PPF contribution limit?", answer: "You can contribute a minimum of \u20B9500 and a maximum of \u20B91.5 lakh per financial year across all your PPF accounts." },
    ],
  },

  "savings-calculators/epf-calculator": {
    howToUse: [
      "Enter your current monthly basic salary + DA and existing EPF balance.",
      "Set your employee and employer contribution percentages (typically 12% each).",
      "Enter the current EPF interest rate and your expected annual salary increment.",
      "See your projected EPF corpus at retirement, along with total contributions and interest earned.",
    ],
    features: [
      "Accounts for salary increments compounding your contributions over time.",
      "Combines employee + employer contributions in one projection.",
      "Adjustable interest rate to match the latest EPFO notification.",
      "Clear breakdown of contributions vs. interest earned.",
      "Free, private, and instant \u2014 runs entirely in your browser.",
    ],
    faq: [
      { question: "What is the current EPF interest rate?", answer: "The EPFO announces the EPF interest rate annually, typically in the 8\u20139% range. Check the latest rate on the EPFO website and enter it here." },
      { question: "Is EPF withdrawal taxable?", answer: "EPF withdrawal is tax-free if made after 5 years of continuous service. Withdrawals before that may attract TDS and be added to taxable income, with some exceptions." },
      { question: "What happens to EPF if I change jobs?", answer: "You should transfer your EPF account to your new employer using the UAN (Universal Account Number) portal to keep your continuous service record and avoid tax implications." },
      { question: "Does this include EPS (pension scheme) contributions?", answer: "This is a simplified estimate that combines employee and employer EPF contributions. In practice, a portion of the employer's contribution (8.33%) is diverted to the EPS pension scheme, which isn't modeled separately here." },
    ],
  },

  "savings-calculators/nps-calculator": {
    howToUse: [
      "Enter your planned monthly NPS contribution and expected annual return.",
      "Set the number of years remaining until retirement.",
      "Adjust the portion of your corpus used to buy an annuity (minimum 40% as per rules) and the expected annuity rate.",
      "View your projected corpus, lump sum available, and estimated monthly pension.",
    ],
    features: [
      "Models monthly compounding on your NPS contributions.",
      "Splits your final corpus into lump-sum withdrawal and annuity purchase.",
      "Estimates your resulting monthly pension after retirement.",
      "Adjustable annuity portion and rate to match your NPS plan.",
      "Free and instant \u2014 no account or sign-up needed.",
    ],
    faq: [
      { question: "What is the minimum annuity purchase requirement in NPS?", answer: "As per current rules, you must use at least 40% of your NPS corpus to purchase an annuity at retirement; the remaining amount can be withdrawn as a lump sum (rules may vary by exit age and corpus size)." },
      { question: "Is NPS better than mutual fund SIPs for retirement?", answer: "NPS offers additional tax benefits under Section 80CCD and mandates a disciplined annuity-based payout, while SIPs offer more flexibility and liquidity. Many investors use both for a balanced retirement strategy." },
      { question: "What tax benefits does NPS offer?", answer: "NPS contributions are eligible for tax deduction under Section 80C (up to \u20B91.5 lakh) and an additional \u20B950,000 under Section 80CCD(1B), making it one of the most tax-efficient retirement instruments in India." },
      { question: "How accurate is the estimated monthly pension?", answer: "It's a simplified estimate based on a constant annuity rate. Actual pension amounts depend on the annuity provider, plan type (with/without spouse cover), and prevailing annuity rates at the time of purchase." },
    ],
  },

  "savings-calculators/sukanya-calculator": {
    howToUse: [
      "Enter your planned yearly deposit amount (up to \u20B91.5 lakh).",
      "Set the current Sukanya Samriddhi Yojana interest rate.",
      "Adjust the deposit period (up to 15 years) and total account maturity period (up to 21 years from opening).",
      "View your projected maturity value, total deposits, and interest earned.",
    ],
    features: [
      "Models the full SSY structure: 15 years of deposits, then compounding until 21-year maturity.",
      "Shows principal vs. interest breakdown clearly.",
      "Adjustable interest rate to match the latest government notification.",
      "Useful for planning a girl child's education or marriage fund.",
      "Free, private, and instant.",
    ],
    faq: [
      { question: "Who is eligible to open a Sukanya Samriddhi account?", answer: "The scheme is for the benefit of a girl child below 10 years of age, opened by a parent or legal guardian, with a maximum of two accounts per family (with some exceptions for twins/triplets)." },
      { question: "Is SSY interest tax-free?", answer: "Yes, Sukanya Samriddhi Yojana falls under the EEE tax category \u2014 contributions, interest, and maturity amount are all exempt from tax under Section 80C and related provisions." },
      { question: "Can I withdraw money before maturity?", answer: "Partial withdrawal (up to 50%) is allowed once the girl turns 18 or passes 10th grade, for education expenses. Premature closure is otherwise allowed only in specific circumstances." },
      { question: "What happens after 15 years of deposits?", answer: "You stop making deposits after 15 years, but the account continues to earn interest on the accumulated balance until it matures 21 years after the account was opened." },
    ],
  },

  "retirement-calculators/retirement-calculator": {
    howToUse: [
      "Enter your current monthly expenses, current age, and planned retirement age.",
      "Set your life expectancy and expected inflation rate.",
      "Enter your expected investment returns before and after retirement.",
      "See your required retirement corpus, inflation-adjusted future expenses, and the monthly SIP needed to get there.",
    ],
    features: [
      "Inflates today's expenses to your retirement year automatically.",
      "Calculates a sustainable retirement corpus using real (inflation-adjusted) returns.",
      "Shows the exact monthly SIP required to reach your goal.",
      "Fully adjustable assumptions for personalized planning.",
      "Free, private, and works entirely in your browser.",
    ],
    faq: [
      { question: "How much corpus do I need to retire comfortably?", answer: "It depends on your expenses, expected lifespan post-retirement, inflation, and investment returns. This calculator computes a personalized corpus based on your specific inputs rather than a generic rule of thumb." },
      { question: "Why does inflation matter so much for retirement planning?", answer: "Inflation erodes purchasing power over time \u2014 even a modest 6% inflation roughly doubles expenses every 12 years, so your retirement corpus must be large enough to sustain inflated future expenses, not today's expenses." },
      { question: "What return rate should I assume after retirement?", answer: "Post-retirement, most planners recommend a more conservative, capital-protection-focused portfolio (debt-heavy), hence a lower assumed return (6\u20138%) compared to your working years." },
      { question: "Should I include pension or Social Security in this calculation?", answer: "This calculator focuses on the corpus you need to build yourself. If you'll receive a pension, NPS payout, or other guaranteed income, you can reduce your monthly expense input by that amount for a more accurate result." },
    ],
  },

  "retirement-calculators/fire-calculator": {
    howToUse: [
      "Enter your current annual expenses and your target safe withdrawal rate (commonly 3\u20134%).",
      "Enter your current savings/investments and how much you can save monthly.",
      "Set your expected annual investment return.",
      "See your FIRE number (target corpus) and estimated years until you reach financial independence.",
    ],
    features: [
      "Based on the popular 4% safe withdrawal rule (fully adjustable).",
      "Simulates monthly compounding growth of your existing and future savings.",
      "Shows your exact FIRE number and realistic timeline.",
      "Useful for FIRE movement followers and early-retirement planners.",
      "Free, instant, and requires no sign-up.",
    ],
    faq: [
      { question: "What is a FIRE number?", answer: "Your FIRE number is the investment corpus needed to sustain your lifestyle indefinitely through withdrawals, typically calculated as annual expenses divided by your safe withdrawal rate (e.g., expenses \u00D7 25 for a 4% rate)." },
      { question: "Is the 4% rule still valid?", answer: "The 4% rule (from the Trinity Study) is a widely used guideline, but many planners now recommend a more conservative 3\u20133.5% withdrawal rate for portfolios expected to last 40+ years, especially outside the US market conditions it was based on." },
      { question: "What's the difference between FIRE and normal retirement planning?", answer: "FIRE (Financial Independence, Retire Early) focuses on aggressive saving and a lean, sustainable withdrawal rate to retire well before traditional retirement age, often in your 30s-40s." },
      { question: "Does this account for taxes on withdrawals?", answer: "No, this is a pre-tax corpus estimate. Actual withdrawals may be subject to capital gains tax depending on your investment vehicles and country of residence." },
    ],
  },

  "retirement-calculators/pension-calculator": {
    howToUse: [
      "Enter your planned monthly contribution and expected annual return until retirement.",
      "Set the number of years until retirement and your expected pension payout period.",
      "Enter the expected annuity rate during your payout years.",
      "View your projected corpus at retirement and the resulting estimated monthly pension.",
    ],
    features: [
      "Models monthly compounding growth followed by an annuity-style payout.",
      "Fully adjustable payout period and annuity rate.",
      "Useful for comparing different pension or annuity products.",
      "Instant recalculation as you adjust any input.",
      "Free and completely private.",
    ],
    faq: [
      { question: "What is an annuity rate?", answer: "The annuity rate is the return an insurance company or annuity provider offers on your corpus during the payout phase \u2014 it determines how much monthly pension your accumulated corpus can generate." },
      { question: "Is a pension plan better than investing in mutual funds?", answer: "Pension plans offer guaranteed, predictable income which is valuable for peace of mind, but often at a lower expected return than market-linked mutual funds. Many people use a mix of both for balance." },
      { question: "What happens if I outlive my payout period?", answer: "This depends on your specific pension product. Some annuities pay for a fixed period, others (life annuities) pay for as long as you live \u2014 check your plan's terms." },
      { question: "Can I increase my monthly contribution later?", answer: "Yes, most pension plans and NPS allow you to increase contributions over time. Simply re-run this calculator with updated numbers to see the impact." },
    ],
  },

  "retirement-calculators/future-value": {
    howToUse: [
      "Enter your present value (initial lump sum) and any periodic (yearly) contribution.",
      "Set your expected annual rate of return.",
      "Choose the number of years.",
      "View the future value of your investment, combining both the lump sum growth and contributions.",
    ],
    features: [
      "Combines lump-sum growth and periodic contributions in one calculation.",
      "Uses the standard FV = PV \u00D7 (1+r)^n formula plus an annuity formula for contributions.",
      "Works for any currency and any compounding scenario.",
      "Instant, real-time results.",
      "Free and requires no sign-up.",
    ],
    faq: [
      { question: "What is future value?", answer: "Future value is how much a sum of money today (or a series of contributions) will grow to at a specific point in the future, given a rate of return." },
      { question: "How is future value different from compound interest calculators?", answer: "This is essentially a general-purpose compound interest and annuity calculator \u2014 it combines a one-time initial amount with recurring contributions, unlike simpler tools that only handle one or the other." },
      { question: "Can I use this for any currency?", answer: "Yes, the calculator is currency-agnostic \u2014 just enter your numbers in whichever currency you're working with." },
      { question: "What's a realistic rate of return to assume?", answer: "It depends on the asset class: equity markets have historically returned 10\u201312% annually over long periods, while fixed-income instruments typically return 6\u20138%. Choose a rate that matches your actual investment." },
    ],
  },

  "retirement-calculators/present-value": {
    howToUse: [
      "Enter the future value (target amount) you want to discount to today's value.",
      "Set your discount rate (expected rate of return or inflation rate).",
      "Choose the number of years until that future amount is received.",
      "View the present value \u2014 what that future sum is worth today.",
    ],
    features: [
      "Uses the standard PV = FV / (1+r)^n formula.",
      "Useful for comparing offers, settlements, or goals payable at different times.",
      "Works for any currency and discount rate.",
      "Instant, accurate results with no sign-up.",
      "100% client-side calculation \u2014 nothing is uploaded.",
    ],
    faq: [
      { question: "What is present value used for?", answer: "Present value helps you compare money received at different points in time on an apples-to-apples basis \u2014 useful for evaluating settlements, deferred payments, insurance payouts, or investment goals." },
      { question: "What discount rate should I use?", answer: "Use your expected rate of return if comparing investment opportunities, or the expected inflation rate if you want to know the real purchasing power of a future amount." },
      { question: "How is this different from the Future Value Calculator?", answer: "Future Value projects forward (what will my money grow to?), while Present Value works backward (what is a future amount worth today?). They're inverse operations of the same time-value-of-money concept." },
      { question: "Does a higher discount rate increase or decrease present value?", answer: "A higher discount rate decreases present value \u2014 the same future amount is considered less valuable today when discounted at a higher rate." },
    ],
  },

  "tax-calculators/income-tax-calculator": {
    howToUse: [
      "Enter your gross annual income.",
      "Enter your total deductions (80C, 80D, HRA, etc. \u2014 relevant only for the old regime).",
      "Instantly compare your estimated tax liability under both the new and old tax regimes.",
      "Choose whichever regime results in lower tax for your situation.",
    ],
    features: [
      "Compares new regime vs. old regime tax side by side.",
      "Includes the Section 87A rebate and 4% health & education cess.",
      "Instant recalculation as you adjust income or deductions.",
      "Highlights which regime is more beneficial for you.",
      "Free and completely private \u2014 no financial data leaves your browser.",
    ],
    faq: [
      { question: "Which tax regime should I choose?", answer: "If you have significant deductions (80C investments, home loan interest, HRA), the old regime may result in lower tax. If you have few deductions, the new regime's lower slab rates often work out better. Compare both using this calculator." },
      { question: "Are these tax slabs accurate for the current year?", answer: "This calculator uses representative, illustrative slabs. Tax slabs change with each Union Budget, so always verify the current assessment year's official slabs on the Income Tax Department website or consult a CA before filing." },
      { question: "What is the Section 87A rebate?", answer: "It's a rebate that effectively makes your tax liability zero if your taxable income is below a certain threshold (currently \u20B97 lakh under the new regime), even though slab rates would otherwise apply." },
      { question: "Does this calculator account for capital gains or other income?", answer: "No, this focuses on regular salary/business income taxed at slab rates. Capital gains are taxed separately \u2014 use the Capital Gains Calculator for those." },
    ],
  },

  "tax-calculators/gst-calculator": {
    howToUse: [
      "Enter the amount you want to calculate GST on.",
      "Select the applicable GST rate (5%, 12%, 18%, 28%, or others).",
      "Choose whether your amount excludes GST (add GST) or already includes GST (remove GST).",
      "View the base amount, GST amount, and total amount instantly.",
    ],
    features: [
      "Supports all standard Indian GST slabs.",
      "Two modes: add GST to a base price, or extract GST from a tax-inclusive price.",
      "Instant, accurate calculations with no rounding errors.",
      "Useful for invoicing, shopping, and business calculations.",
      "Free with no usage limits.",
    ],
    faq: [
      { question: "What are the standard GST rates in India?", answer: "The common GST slabs are 0%, 5%, 12%, 18%, and 28%, depending on the goods or service category. Some items also have special rates like 0.25% or 3% (for precious stones and gold)." },
      { question: "How do I remove GST from an MRP?", answer: "Select 'Remove GST' mode and enter the MRP (which already includes GST) \u2014 the calculator will show you the base price before tax and the GST component." },
      { question: "What's the difference between CGST, SGST, and IGST?", answer: "For intra-state transactions, GST is split equally into CGST (Central) and SGST (State). For inter-state transactions, the full rate is charged as IGST (Integrated GST). This calculator shows the total GST \u2014 use the GST Invoice Generator for the CGST/SGST/IGST split." },
      { question: "Is this calculator suitable for filing GST returns?", answer: "This is a quick reference calculator for individual transactions. For actual GST return filing, use GST-compliant accounting software or consult with a tax professional." },
    ],
  },

  "tax-calculators/hra-calculator": {
    howToUse: [
      "Enter your monthly basic salary and HRA received from your employer.",
      "Enter your monthly rent paid.",
      "Select whether you live in a metro city (Delhi, Mumbai, Kolkata, Chennai) or a non-metro city.",
      "View your annual HRA exemption and the taxable portion of your HRA.",
    ],
    features: [
      "Applies the official 3-way minimum rule for HRA exemption.",
      "Accounts for metro (50%) vs. non-metro (40%) basic salary thresholds.",
      "Instant annual exemption and taxable HRA breakdown.",
      "Useful for tax planning and Form 16 verification.",
      "Free and completely private.",
    ],
    faq: [
      { question: "How is HRA exemption calculated?", answer: "HRA exemption is the minimum of: (1) actual HRA received, (2) rent paid minus 10% of basic salary, and (3) 50% of basic salary for metro cities or 40% for non-metro cities." },
      { question: "Can I claim HRA exemption under the new tax regime?", answer: "No, HRA exemption is only available under the old tax regime. If you opt for the new regime, your entire HRA received is taxable." },
      { question: "What if I don't receive HRA but pay rent?", answer: "If you don't receive HRA from your employer, you may be able to claim a deduction under Section 80GG instead, subject to different rules and limits." },
      { question: "Do I need rent receipts to claim HRA exemption?", answer: "Yes, you typically need to submit rent receipts to your employer, and if annual rent exceeds \u20B91 lakh, your landlord's PAN is also required." },
    ],
  },

  "tax-calculators/capital-gains-calculator": {
    howToUse: [
      "Select the asset type: equity, property, or other.",
      "Enter your purchase price, sale price, and the respective purchase and sale dates.",
      "The calculator automatically determines your holding period.",
      "View your capital gain/loss and whether it's classified as short-term or long-term.",
    ],
    features: [
      "Automatically classifies gains as short-term or long-term based on holding period rules.",
      "Different thresholds for equity (12 months) vs. property/other assets (24\u201336 months).",
      "Simple date-based holding period calculation.",
      "Includes guidance on typical applicable tax rates.",
      "Free and works entirely in your browser.",
    ],
    faq: [
      { question: "What's the difference between STCG and LTCG?", answer: "STCG (Short-Term Capital Gains) applies to assets held for less than the specified holding period and is usually taxed at a higher rate or added to your income. LTCG (Long-Term Capital Gains) applies to assets held longer and often gets preferential tax rates." },
      { question: "What is the holding period threshold for equity vs. property?", answer: "For listed equity/equity mutual funds, the LTCG threshold is 12 months. For property and most other assets, it's typically 24\u201336 months, though rules vary and change with tax law updates." },
      { question: "Does this account for indexation benefit?", answer: "No, this calculator shows the raw capital gain without indexation adjustment. Indexation (available for certain LTCG on property/debt funds) can significantly reduce taxable gains \u2014 consult a tax advisor for an indexed calculation." },
      { question: "Are capital gains tax rates the same every year?", answer: "No, capital gains tax rates and rules change periodically with Union Budget announcements. Always verify current rates with the Income Tax Department or a tax professional before filing." },
    ],
  },

  "tax-calculators/tds-calculator": {
    howToUse: [
      "Enter the payment amount on which TDS needs to be deducted.",
      "Select the relevant TDS section (professional fees, rent, contractor payment, etc.) or enter a custom rate.",
      "View the calculated TDS amount and the net payable amount after deduction.",
      "Use this for quick reference before making a payment.",
    ],
    features: [
      "Covers common TDS sections used in everyday transactions.",
      "Custom rate option for any other scenario.",
      "Instant TDS amount and net payable calculation.",
      "Useful for freelancers, businesses, and accounts teams.",
      "Free with no sign-up required.",
    ],
    faq: [
      { question: "What is TDS?", answer: "TDS (Tax Deducted at Source) is a mechanism where the payer deducts tax at the time of making certain payments (salary, rent, professional fees, etc.) and deposits it with the government on behalf of the recipient." },
      { question: "Are these TDS rates accurate for all cases?", answer: "The rates shown are representative rates for common sections. Actual applicable rates can vary based on PAN availability (higher TDS without PAN), recipient type (individual/company), and payment thresholds \u2014 verify with the official TDS rate chart." },
      { question: "What happens if TDS is deducted at a higher rate?", answer: "If excess TDS is deducted, you can claim a refund when filing your income tax return, as TDS is only an advance tax payment, not the final tax liability." },
      { question: "Is TDS applicable on all payments?", answer: "No, TDS applies only to specified categories of payments above certain threshold amounts, as defined under various sections of the Income Tax Act." },
    ],
  },

  "tax-calculators/salary-calculator": {
    howToUse: [
      "Enter your annual CTC (Cost to Company).",
      "Adjust the basic salary percentage and HRA percentage of basic.",
      "Set your employee PF contribution percentage and monthly professional tax.",
      "View your monthly salary breakdown: basic, HRA, allowances, PF, and gross/net salary.",
    ],
    features: [
      "Breaks CTC into standard salary components.",
      "Fully adjustable percentage splits to match your actual offer letter.",
      "Shows both monthly gross and net (pre-tax) salary.",
      "Useful for evaluating job offers and salary structures.",
      "Free, instant, and completely private.",
    ],
    faq: [
      { question: "What's the difference between CTC and take-home salary?", answer: "CTC (Cost to Company) is the total amount your employer spends on you, including basic, allowances, PF contributions, and other benefits. Take-home salary is what actually lands in your bank account after all deductions \u2014 use the Take Home Salary Calculator for that." },
      { question: "Why is my calculated salary different from my actual payslip?", answer: "This calculator uses common industry-standard percentage splits. Actual company salary structures vary in how they allocate basic, HRA, special allowances, and other components \u2014 check your specific offer letter or payslip for exact figures." },
      { question: "What is a typical basic salary percentage?", answer: "Basic salary is commonly structured as 30\u201350% of CTC, though this varies significantly by company and industry." },
      { question: "Does this include income tax deduction?", answer: "No, this tool focuses purely on salary structure breakdown (before tax). Use the Take Home Salary Calculator to see your final in-hand pay after estimated income tax." },
    ],
  },

  "tax-calculators/take-home-salary": {
    howToUse: [
      "Enter your annual CTC.",
      "Adjust basic salary percentage, employee PF percentage, and monthly professional tax.",
      "Choose your tax regime (new or old).",
      "View your estimated gross salary, income tax, PF deduction, and final monthly take-home pay.",
    ],
    features: [
      "Combines salary structuring with an income tax estimate for a realistic take-home figure.",
      "Supports both new and old tax regime calculations.",
      "Clear breakdown of all monthly deductions.",
      "Useful for comparing job offers on an apples-to-apples in-hand basis.",
      "Free and completely private.",
    ],
    faq: [
      { question: "How accurate is the take-home salary estimate?", answer: "This is a close estimate based on standard PF, professional tax, and illustrative income tax slabs. Your actual take-home may vary slightly due to specific employer deductions, additional benefits, or exact tax-saving investments." },
      { question: "Which tax regime results in higher take-home pay?", answer: "It depends on your deductions. If you have significant 80C/80D investments or HRA claims, the old regime might result in higher take-home pay; otherwise, the new regime's lower slabs often win. Try both options to compare." },
      { question: "Does this include bonus or variable pay?", answer: "No, this calculator assumes your entire CTC is paid out as fixed monthly salary. If you have a separate bonus or variable component, calculate that portion's tax impact separately." },
      { question: "What other deductions might reduce my actual take-home pay?", answer: "Additional deductions like gratuity contributions, voluntary PF, health insurance premiums, or loan EMIs deducted at source aren't modeled here and could further reduce your actual in-hand pay." },
    ],
  },

  "currency-calculators/gold-price-calculator": {
    howToUse: [
      "Enter today's 24K gold rate per gram from your local jeweller or a live price source.",
      "Select the purity of your gold (24K, 22K, 18K, or 14K).",
      "Enter the quantity and select your unit (gram, 10 grams, troy ounce, or tola).",
      "Optionally add making charges to see the total cost including labor.",
    ],
    features: [
      "Converts between common purity levels (24K/22K/18K/14K) automatically.",
      "Supports multiple weight units including tola and troy ounce.",
      "Optional making charges calculation.",
      "Instant value calculation as you type.",
      "Free and doesn't require any live API or account.",
    ],
    faq: [
      { question: "Does this fetch live gold rates automatically?", answer: "No, this calculator doesn't connect to any live pricing API. You need to enter the current gold rate per gram yourself, which you can find from your local jeweller, bank, or a financial news website." },
      { question: "What's the difference between 24K, 22K, and 18K gold?", answer: "The 'K' (karat) indicates purity: 24K is 99.9% pure gold, 22K is about 91.6% pure (mixed with other metals for durability), and 18K is 75% pure \u2014 commonly used in jewellery for strength." },
      { question: "What is a tola?", answer: "A tola is a traditional unit of mass used in South Asia for gold and silver, equal to approximately 11.6638 grams." },
      { question: "Are making charges and GST included in the gold value?", answer: "The base gold value doesn't include making charges or GST by default \u2014 you can add an estimated making charge percentage to see the total, but jewellers may also add GST (typically 3%) separately." },
    ],
  },

  "currency-calculators/silver-price-calculator": {
    howToUse: [
      "Enter today's silver rate per gram from your local jeweller or a live price source.",
      "Enter the quantity and select your unit (gram, 10 grams, kilogram, or troy ounce).",
      "Optionally add making charges to see the total cost.",
      "View the calculated weight and silver value instantly.",
    ],
    features: [
      "Supports multiple weight units including kilograms and troy ounces.",
      "Optional making charges calculation for jewellery purchases.",
      "Instant, accurate value calculation.",
      "Works for any currency \u2014 just enter your local silver rate.",
      "Free and completely private.",
    ],
    faq: [
      { question: "Does this fetch live silver rates?", answer: "No, you need to enter the current silver rate per gram yourself from a reliable source like your local jeweller, bank, or financial news website \u2014 this tool doesn't connect to live pricing data." },
      { question: "Why do silver rates fluctuate more than gold?", answer: "Silver has significant industrial demand (electronics, solar panels) in addition to investment demand, which makes its price more volatile compared to gold, which is primarily driven by investment and jewellery demand." },
      { question: "Are making charges and GST included?", answer: "The base silver value doesn't include making charges or GST by default. You can add an estimated making charge percentage; jewellers typically add GST separately on top of the final price." },
      { question: "What unit should I use for silver coins vs. jewellery?", answer: "Silver coins and bars are often priced per gram or per kilogram, while jewellery may be priced per gram or per 10 grams depending on your jeweller's convention." },
    ],
  },

  "business-calculators/gst-invoice-generator": {
    howToUse: [
      "Enter your business name, client name, and invoice number.",
      "Add one or more line items with description, quantity, and unit price.",
      "Select the applicable GST rate and whether the supply is intra-state or inter-state.",
      "View the generated invoice preview with CGST/SGST or IGST breakdown and total.",
    ],
    features: [
      "Automatically splits GST into CGST + SGST (intra-state) or shows full IGST (inter-state).",
      "Supports multiple line items with automatic subtotal calculation.",
      "Clean, readable invoice preview format.",
      "All standard GST slabs supported.",
      "Free and works entirely in your browser.",
    ],
    faq: [
      { question: "Is this invoice GST-filing compliant?", answer: "This generates a simple reference invoice preview showing correct tax calculations, but for official GSTR filing and e-invoicing compliance (with QR codes, IRN, etc.), use dedicated GST-compliant accounting software." },
      { question: "When should I charge CGST + SGST vs. IGST?", answer: "Charge CGST + SGST when the buyer and seller are in the same state (intra-state supply). Charge IGST when they're in different states (inter-state supply) or for exports." },
      { question: "Can I add a discount to this invoice?", answer: "This generator focuses on GST-specific invoicing with the CGST/SGST/IGST split. For invoices with a discount component, use the general Invoice Calculator instead." },
      { question: "What GST rate should I select?", answer: "GST rates depend on the specific goods or services you're billing \u2014 common rates are 5%, 12%, 18%, and 28%. Check the official GST rate schedule for your product/service category." },
    ],
  },

  "business-calculators/profit-margin-calculator": {
    howToUse: [
      "Enter your cost price (what you paid) and selling price (what you charge).",
      "The calculator instantly computes your profit amount.",
      "View both your profit margin (% of selling price) and markup (% of cost price).",
      "Use these figures to compare pricing strategies across products.",
    ],
    features: [
      "Calculates both margin and markup from the same inputs.",
      "Instant, real-time results as you type.",
      "Works in any currency.",
      "Useful for retail, wholesale, and service pricing decisions.",
      "Free with no sign-up required.",
    ],
    faq: [
      { question: "What's the difference between margin and markup?", answer: "Margin is profit as a percentage of the selling price, while markup is profit as a percentage of the cost price. A 50% markup on cost doesn't equal a 50% margin \u2014 they're calculated on different bases." },
      { question: "Which should I use for pricing my products?", answer: "Markup is often used to set a selling price from a known cost (e.g., 'mark up by 40%'), while margin is used to analyze overall profitability from a sales perspective. Both are useful depending on your business context." },
      { question: "What's a good profit margin for a small business?", answer: "It varies widely by industry \u2014 retail often sees 20\u201350% margins, while services can have much higher margins (50\u201380%+). Compare against industry benchmarks for your specific sector." },
      { question: "Does this include taxes or overhead costs?", answer: "No, this calculates margin/markup based purely on cost price and selling price you provide. Include all relevant costs (materials, labor, overhead) in your cost price for an accurate profit picture." },
    ],
  },

  "business-calculators/break-even-calculator": {
    howToUse: [
      "Enter your total fixed costs (rent, salaries, etc. that don't change with sales volume).",
      "Enter your variable cost per unit (materials, packaging, etc.).",
      "Enter your selling price per unit.",
      "View the number of units and revenue needed to break even.",
    ],
    features: [
      "Calculates both break-even units and break-even revenue.",
      "Shows contribution margin per unit for deeper analysis.",
      "Instant recalculation as you adjust costs or pricing.",
      "Useful for startups, product launches, and pricing decisions.",
      "Free and works entirely in your browser.",
    ],
    faq: [
      { question: "What is the break-even point?", answer: "The break-even point is the sales volume (in units or revenue) at which your total revenue exactly equals your total costs \u2014 beyond this point, you start making a profit." },
      { question: "What if my selling price is lower than my variable cost?", answer: "If your price per unit is at or below your variable cost per unit, you lose money on every sale and can never break even, regardless of volume \u2014 the calculator will show an infinite break-even point in this case." },
      { question: "What counts as a fixed cost vs. a variable cost?", answer: "Fixed costs (rent, salaries, insurance) stay the same regardless of how much you sell. Variable costs (raw materials, packaging, shipping) scale directly with each unit sold." },
      { question: "How can I lower my break-even point?", answer: "You can lower your break-even point by reducing fixed costs, reducing variable costs per unit, or increasing your selling price \u2014 try adjusting each input to see the impact." },
    ],
  },

  "business-calculators/discount-calculator": {
    howToUse: [
      "Choose whether you want to find the discounted price or the original price.",
      "Enter the known price (original or discounted) and the discount percentage.",
      "View the calculated result instantly.",
      "Switch modes anytime to solve for a different variable.",
    ],
    features: [
      "Two modes: forward (find sale price) and reverse (find original price).",
      "Instant, accurate calculations with no rounding errors.",
      "Works for any currency and discount percentage.",
      "Useful for shoppers, retailers, and sales planning.",
      "Free with no usage limits.",
    ],
    faq: [
      { question: "How do I calculate the original price from a discounted price?", answer: "Switch to 'Find original price' mode, enter the discounted (final) price and the discount percentage that was applied \u2014 the calculator divides by (1 \u2212 discount%) to reverse the calculation." },
      { question: "Can this handle multiple stacked discounts?", answer: "This calculator handles a single discount percentage at a time. For stacked discounts (e.g., 20% off, then an additional 10% off), apply them one at a time using the result of the first as the input for the second." },
      { question: "Does this include tax on the discounted price?", answer: "No, this calculates the discount only. Add tax separately using the GST or VAT calculator if needed on the final discounted amount." },
      { question: "What's a typical discount range for retail sales?", answer: "Retail discounts commonly range from 10\u201370% depending on the type of sale (seasonal clearance, festival sale, clearance stock, etc.)." },
    ],
  },

  "business-calculators/commission-calculator": {
    howToUse: [
      "Enter the total sale amount.",
      "Set the commission percentage rate.",
      "View the commission earned and the net amount after commission.",
      "Adjust either value to see the impact instantly.",
    ],
    features: [
      "Simple, instant flat-rate commission calculation.",
      "Shows both commission earned and net amount.",
      "Works for any currency and commission rate.",
      "Useful for sales reps, brokers, affiliates, and agents.",
      "Free and completely private.",
    ],
    faq: [
      { question: "How is commission typically calculated?", answer: "Most commission structures use a flat percentage of the sale amount, though some businesses use tiered or graduated rates that increase as sales volume grows \u2014 this calculator models the simple flat-rate case." },
      { question: "Is commission income taxable?", answer: "Yes, commission income is generally taxable as regular income in most jurisdictions. Consult a tax professional for how it's treated in your specific situation (employee vs. self-employed)." },
      { question: "What's a typical real estate commission rate?", answer: "Real estate commission rates vary by market and region, commonly ranging from 1\u20136% of the property sale value, often split between buyer's and seller's agents." },
      { question: "Can I use this for calculating my net proceeds after a broker fee?", answer: "Yes, enter your gross sale amount and the broker's commission percentage to see your net amount after the commission is deducted." },
    ],
  },

  "business-calculators/vat-calculator": {
    howToUse: [
      "Enter the amount you want to calculate VAT on.",
      "Set the applicable VAT rate for your country.",
      "Choose whether your amount excludes VAT (add VAT) or includes VAT (remove VAT).",
      "View the net amount, VAT amount, and gross amount instantly.",
    ],
    features: [
      "Works for any country's VAT rate (UK, EU, and others).",
      "Two modes: add VAT or extract VAT from a gross price.",
      "Instant, accurate calculations.",
      "Useful for invoicing, shopping, and business accounting.",
      "Free with no usage limits.",
    ],
    faq: [
      { question: "What is VAT?", answer: "VAT (Value Added Tax) is a consumption tax charged on goods and services at each stage of production or distribution, ultimately borne by the end consumer, commonly used across the UK, EU, and many other countries." },
      { question: "What's the standard VAT rate in the UK?", answer: "The UK's standard VAT rate is 20%, though reduced rates (5%) and zero rates apply to certain goods and services. Always check the current rate for your specific product category." },
      { question: "How do I remove VAT from a gross price?", answer: "Select 'Remove VAT' mode and enter the VAT-inclusive (gross) price \u2014 the calculator divides by (1 + VAT rate) to find the net price and VAT component." },
      { question: "Is VAT the same as GST?", answer: "VAT and GST (Goods and Services Tax) are conceptually similar consumption taxes used in different countries \u2014 India uses GST terminology, while the UK, EU, and many other regions use VAT." },
    ],
  },

  "business-calculators/invoice-calculator": {
    howToUse: [
      "Add one or more line items with description, quantity, and unit price.",
      "Set an optional discount percentage and your applicable tax rate.",
      "View the subtotal, discount, tax, and final total instantly.",
      "Add or remove line items as needed.",
    ],
    features: [
      "Supports unlimited line items with automatic subtotal calculation.",
      "Optional discount applied before tax.",
      "Generic tax rate field works for any country's tax system.",
      "Instant recalculation as you edit any field.",
      "Free and works entirely in your browser.",
    ],
    faq: [
      { question: "Can I use this for GST invoices in India?", answer: "For India-specific GST invoices with CGST/SGST/IGST breakdown, use the dedicated GST Invoice Generator instead, which handles the specific tax split rules." },
      { question: "Does this calculator save my invoices?", answer: "No, this tool calculates totals in real time in your browser and doesn't save or store any data \u2014 refreshing the page will reset your line items." },
      { question: "Can I apply a discount and tax together?", answer: "Yes, the discount is applied to the subtotal first, and then tax is calculated on the discounted amount, which matches how most real-world invoices are structured." },
      { question: "Is this suitable for any country?", answer: "Yes, since the tax rate is a generic percentage field, you can use this for any country's sales tax, VAT, or GST system by entering the appropriate rate." },
    ],
  },

  "personal-finance-calculators/budget-planner": {
    howToUse: [
      "Enter your monthly income.",
      "Add your expense categories with their respective amounts.",
      "Add, edit, or remove categories as needed to match your actual spending.",
      "View your total expenses, monthly savings, and savings rate instantly.",
    ],
    features: [
      "Fully customizable expense categories.",
      "Instant savings rate calculation.",
      "Useful for applying the 50/30/20 budgeting rule or your own custom framework.",
      "No sign-up or data storage \u2014 everything happens in your browser.",
      "Free and works on any device.",
    ],
    faq: [
      { question: "What is the 50/30/20 budgeting rule?", answer: "It's a popular guideline suggesting you allocate 50% of income to needs (rent, groceries, utilities), 30% to wants (entertainment, dining out), and 20% to savings and debt repayment." },
      { question: "What's considered a good savings rate?", answer: "A savings rate of 20% or higher is generally considered healthy, though FIRE (Financial Independence, Retire Early) followers often aim for 40-50%+ to retire earlier." },
      { question: "Does this track my spending automatically?", answer: "No, this is a planning tool where you manually enter your income and expected/actual expenses. For automatic transaction tracking, you'd need a bank-linked budgeting app." },
      { question: "Can I add unlimited expense categories?", answer: "Yes, you can add as many custom categories as you need to accurately reflect your spending pattern." },
    ],
  },

  "personal-finance-calculators/expense-tracker": {
    howToUse: [
      "Add each expense with a description, category, and amount.",
      "Add as many expenses as you need to track your spending.",
      "View your total spending and a category-wise breakdown with visual bars.",
      "Remove or edit any expense entry as needed.",
    ],
    features: [
      "Category-wise spending breakdown with visual progress bars.",
      "Instant total and percentage calculations.",
      "Simple, distraction-free interface for quick logging.",
      "Works entirely in your browser \u2014 no account needed.",
      "Free with unlimited entries.",
    ],
    faq: [
      { question: "Does this save my expenses permanently?", answer: "No, this tool works in your browser's memory for the current session only \u2014 it doesn't save data permanently. For ongoing expense tracking, note down your totals periodically or use a dedicated expense tracking app." },
      { question: "Can I export my expense data?", answer: "Currently, this tool doesn't support exporting data. It's designed for quick, one-time expense breakdowns and category analysis." },
      { question: "What categories should I use?", answer: "The tool includes common categories like Food, Transport, Housing, Utilities, Entertainment, Shopping, Health, and Other \u2014 pick whichever best matches each expense." },
      { question: "Is this the same as the Budget Planner?", answer: "The Budget Planner compares your income against planned expense categories to calculate a savings rate, while the Expense Tracker logs individual transactions and shows a category-wise spending breakdown." },
    ],
  },

  "personal-finance-calculators/net-worth-calculator": {
    howToUse: [
      "List all your assets (cash, investments, property, vehicles, etc.) with their current values.",
      "List all your liabilities (loans, credit card debt, etc.) with their outstanding balances.",
      "Add or remove items as needed to match your full financial picture.",
      "View your total assets, total liabilities, and overall net worth.",
    ],
    features: [
      "Simple, flexible asset and liability line items.",
      "Instant net worth calculation.",
      "Useful for tracking your financial progress over time.",
      "Works entirely in your browser \u2014 fully private.",
      "Free with unlimited entries.",
    ],
    faq: [
      { question: "What counts as an asset?", answer: "Assets include cash, bank balances, investments (stocks, mutual funds, FDs), real estate, vehicles, and any other items of value you own." },
      { question: "What counts as a liability?", answer: "Liabilities include any outstanding debt: home loans, car loans, personal loans, credit card balances, and any other money you owe." },
      { question: "How often should I calculate my net worth?", answer: "Many financial planners recommend recalculating your net worth quarterly or annually to track your financial progress over time and adjust your savings/investment strategy accordingly." },
      { question: "Is a negative net worth bad?", answer: "A negative net worth (more liabilities than assets) is common early in life, especially with student loans or a large mortgage, and isn't necessarily alarming if you have a clear plan to build assets and pay down debt over time." },
    ],
  },

  "personal-finance-calculators/emergency-fund-calculator": {
    howToUse: [
      "Enter your essential monthly expenses (rent, food, utilities, EMIs, etc.).",
      "Choose your desired months of coverage (typically 3\u20136 months).",
      "Enter your current emergency savings and monthly savings capacity.",
      "View your target fund amount, shortfall, and months needed to reach your goal.",
    ],
    features: [
      "Calculates a personalized emergency fund target.",
      "Shows exactly how much more you need to save and how long it will take.",
      "Adjustable coverage period from 3 to 12 months.",
      "Free, instant, and completely private.",
      "Useful first step before aggressive investing.",
    ],
    faq: [
      { question: "How many months of expenses should my emergency fund cover?", answer: "Most financial planners recommend 3\u20136 months of essential expenses. Freelancers, single-income households, or those in unstable industries may want 9\u201312 months for extra security." },
      { question: "Where should I keep my emergency fund?", answer: "Emergency funds should be kept in easily accessible, low-risk accounts like a savings account, liquid mutual fund, or short-term FD \u2014 not in volatile investments like stocks, since you may need quick access." },
      { question: "Should I include essential expenses or all expenses?", answer: "Use only essential/non-negotiable expenses (rent, groceries, utilities, insurance, minimum debt payments) rather than discretionary spending, since an emergency fund is meant to cover necessities during a crisis." },
      { question: "Should I build an emergency fund before investing?", answer: "Most financial advisors recommend building at least a partial emergency fund before aggressive investing, since it prevents you from having to sell investments at a loss during a financial emergency." },
    ],
  },

  "personal-finance-calculators/debt-payoff-calculator": {
    howToUse: [
      "Add all your debts with their balance, interest rate, and minimum payment.",
      "Enter any extra monthly budget you can put toward debt beyond the minimums.",
      "Choose the snowball (smallest balance first) or avalanche (highest rate first) strategy.",
      "View your total payoff time, total interest paid, and the order debts get eliminated.",
    ],
    features: [
      "Supports both snowball and avalanche payoff strategies.",
      "Simulates month-by-month payoff across multiple debts.",
      "Shows total interest paid and time to become debt-free.",
      "Displays the exact order debts will be paid off in.",
      "Free and completely private.",
    ],
    faq: [
      { question: "What's the difference between snowball and avalanche methods?", answer: "The avalanche method pays off the highest-interest-rate debt first, which minimizes total interest paid. The snowball method pays off the smallest balance first, providing psychological quick wins that can help maintain motivation." },
      { question: "Which method should I choose?", answer: "Avalanche saves you the most money mathematically, but snowball can be more motivating for many people since you eliminate debts faster in the beginning. Choose based on what will keep you most consistent." },
      { question: "Does extra payment go to all debts or just one?", answer: "In both methods, minimum payments are made on all debts, while any extra budget is concentrated on just one debt at a time (based on the chosen strategy) until it's paid off, then rolled onto the next." },
      { question: "What if I can't afford the minimum payments?", answer: "If your total minimum payments exceed your budget, you may need to explore debt consolidation, balance transfer offers, or speak with a credit counselor before this calculator's projections become realistic." },
    ],
  },

  "personal-finance-calculators/credit-card-interest-calculator": {
    howToUse: [
      "Enter your outstanding credit card balance.",
      "Enter the annual interest rate (APR) charged by your card.",
      "Enter the fixed monthly payment you plan to make.",
      "View the months to pay off, total interest paid, and total amount paid.",
    ],
    features: [
      "Simulates monthly compounding credit card interest accurately.",
      "Warns you if your payment doesn't cover accruing interest.",
      "Shows total interest cost, not just the payoff timeline.",
      "Useful for planning faster debt payoff strategies.",
      "Free and completely private.",
    ],
    faq: [
      { question: "Why is credit card interest so expensive?", answer: "Credit cards typically charge 30\u201348% APR in India (or 15\u201330% in many other countries), much higher than other loan types, and interest compounds monthly \u2014 which is why balances can balloon quickly if not paid off." },
      { question: "What happens if I only pay the minimum amount?", answer: "Paying only the minimum (often 2\u20135% of the balance) can take years to pay off and cost significantly more in interest than the original balance \u2014 this calculator shows you exactly how much more." },
      { question: "What does it mean if my payment doesn't cover the interest?", answer: "If your monthly payment is less than or equal to the interest accruing each month, your balance will never decrease (and may even grow) \u2014 the calculator flags this scenario so you know to increase your payment." },
      { question: "How can I pay off my credit card faster?", answer: "Increasing your monthly payment even slightly can dramatically reduce both your payoff time and total interest paid, due to how compounding interest works on a shrinking balance." },
    ],
  },

  "insurance-calculators/life-insurance-calculator": {
    howToUse: [
      "Enter your annual income and how many years of income you want to replace.",
      "Enter your outstanding loans and liabilities.",
      "Enter any existing life insurance cover you already have.",
      "View your recommended additional life insurance cover needed.",
    ],
    features: [
      "Uses the Human Life Value (HLV) method for a quick estimate.",
      "Accounts for existing liabilities and cover.",
      "Simple, fast estimate without lengthy forms.",
      "Useful starting point before consulting an insurance advisor.",
      "Free and completely private.",
    ],
    faq: [
      { question: "How much life insurance do I need?", answer: "A common rule of thumb is 10\u201315x your annual income, but the ideal amount depends on your specific liabilities, dependents, and financial goals \u2014 this calculator gives a more personalized estimate." },
      { question: "What is the Human Life Value method?", answer: "It's an approach that estimates the economic value of a person's life to their dependents by calculating the income they would have earned over a set number of years, adjusted for liabilities and existing cover." },
      { question: "Should I buy term insurance or a whole life/investment-linked policy?", answer: "Term insurance is generally recommended for pure protection needs since it offers the highest cover for the lowest premium. Investment-linked policies mix insurance and investment, often at a lower overall return \u2014 many experts suggest 'buy term, invest the rest.'" },
      { question: "How is this different from the Term Insurance Need Calculator?", answer: "This calculator gives a quick, general HLV-based estimate. The Term Insurance Need Calculator is more detailed, factoring in specific future goals (education, marriage) and existing savings for a more precise sum assured recommendation." },
    ],
  },

  "insurance-calculators/health-insurance-estimator": {
    howToUse: [
      "Enter the age of the eldest member to be covered.",
      "Enter the number of family members to be included in the policy.",
      "Set your desired sum insured amount.",
      "Select your city tier to see a rough estimated annual premium.",
    ],
    features: [
      "Quick, rough premium estimate based on common pricing patterns.",
      "Accounts for age, family size, sum insured, and city tier.",
      "Useful for initial budgeting before requesting real quotes.",
      "Free and instant \u2014 no personal health data required.",
      "Completely private, runs entirely in your browser.",
    ],
    faq: [
      { question: "Is this an actual insurance quote?", answer: "No, this is a rough, ballpark estimate based on typical age-band and city-tier pricing patterns \u2014 it is not a real insurer quote. Actual premiums depend on medical history, specific insurer pricing, and underwriting, so always get quotes directly from insurers." },
      { question: "Why does age affect the premium so much?", answer: "Health insurance premiums increase with age because older individuals statistically have a higher likelihood of health claims, so insurers charge more to cover the increased risk." },
      { question: "Should I buy an individual or family floater policy?", answer: "A family floater policy covers all family members under one shared sum insured, often at a lower combined premium than individual policies, but the sum insured is shared \u2014 evaluate based on your family's health profile and needs." },
      { question: "How much sum insured should I choose?", answer: "Given rising healthcare costs, many experts recommend a minimum of \u20B95\u201310 lakh sum insured for individuals in metro cities, with higher amounts recommended for families or those with existing health conditions." },
    ],
  },

  "insurance-calculators/term-insurance-need-calculator": {
    howToUse: [
      "Enter your annual income and years remaining until retirement.",
      "Enter your outstanding loans and estimated cost of future goals (education, marriage, etc.).",
      "Enter your existing savings/investments and any existing term insurance cover.",
      "View your recommended term insurance sum assured.",
    ],
    features: [
      "Detailed, goal-based need calculation beyond simple income multiples.",
      "Accounts for loans, future goals, savings, and existing cover.",
      "More precise than generic 'X times income' rules of thumb.",
      "Free, instant, and completely private.",
      "Useful before comparing term insurance plans.",
    ],
    faq: [
      { question: "How is this different from a simple income-multiple rule?", answer: "Generic rules like '10x your income' don't account for your specific liabilities, future goals, or existing savings. This calculator factors in all of these for a more personalized and accurate sum assured recommendation." },
      { question: "What counts as a 'future goal' in this calculator?", answer: "Future goals include costs like your children's higher education, wedding expenses, or any other large planned expenditure your family would need to fund even in your absence." },
      { question: "Should I subtract my existing investments from my insurance need?", answer: "Yes, existing savings and investments that your family could use in an emergency reduce the additional insurance cover needed \u2014 this calculator subtracts them automatically." },
      { question: "How often should I recalculate my term insurance need?", answer: "It's a good practice to recalculate every few years or after major life events (marriage, children, a new loan, a salary increase) to ensure your cover stays adequate." },
    ],
  },

  "real-estate-calculators/stamp-duty-calculator": {
    howToUse: [
      "Enter the property value.",
      "Select your state from the dropdown to see the applicable stamp duty rate.",
      "Adjust the registration fee percentage if needed.",
      "View the stamp duty, registration fee, and total charges.",
    ],
    features: [
      "Covers major Indian states with representative stamp duty rates.",
      "Separate stamp duty and registration fee calculation.",
      "Editable rates for custom scenarios.",
      "Instant total transaction cost estimate.",
      "Free and completely private.",
    ],
    faq: [
      { question: "Why do stamp duty rates vary by state?", answer: "Stamp duty is a state subject in India, so each state government sets its own rates, which can also vary based on property type, location (urban/rural), and the owner's gender in some states." },
      { question: "Do women get a stamp duty discount?", answer: "Yes, several Indian states (like Delhi) offer a reduced stamp duty rate for properties registered in a woman's name, as an incentive for female property ownership." },
      { question: "Are these rates always accurate?", answer: "The rates shown are representative reference values that can change with state government notifications. Always verify the current rate on your state's registration/revenue department website before a transaction." },
      { question: "What is the registration fee separate from stamp duty?", answer: "Registration fee is an additional charge (typically 1% of property value) paid to register the property transaction with the government, separate from the stamp duty tax itself." },
    ],
  },

  "real-estate-calculators/rental-yield-calculator": {
    howToUse: [
      "Enter the property's current market value.",
      "Enter the monthly rental income you receive (or expect to receive).",
      "Enter your annual expenses (maintenance, property tax, insurance).",
      "View your gross and net rental yield percentages.",
    ],
    features: [
      "Calculates both gross and net rental yield.",
      "Accounts for annual property-related expenses.",
      "Useful for comparing different property investment options.",
      "Instant, accurate percentage calculations.",
      "Free and works entirely in your browser.",
    ],
    faq: [
      { question: "What is rental yield?", answer: "Rental yield measures the annual rental income as a percentage of the property's value \u2014 it's a key metric for evaluating whether a property investment generates good ongoing cash flow." },
      { question: "What's a good rental yield in India?", answer: "Residential rental yields in India typically range from 2\u20134%, which is relatively low compared to some other countries. Commercial properties often offer higher yields (6\u201310%)." },
      { question: "What's the difference between gross and net yield?", answer: "Gross yield is annual rent divided by property value, without deducting any costs. Net yield subtracts annual expenses (maintenance, tax, insurance) from the rental income first, giving a more realistic return figure." },
      { question: "Does rental yield account for property appreciation?", answer: "No, rental yield only measures the income return from rent. Use the Property ROI Calculator to see a combined return that includes both rental income and capital appreciation." },
    ],
  },

  "real-estate-calculators/mortgage-calculator": {
    howToUse: [
      "Enter the home price and your down payment percentage.",
      "Set the interest rate and loan term.",
      "Enter your annual property tax rate, annual home insurance cost, and any monthly HOA fees.",
      "View your full monthly mortgage payment broken down into principal, interest, taxes, insurance, and HOA (PITI).",
    ],
    features: [
      "Calculates the full PITI (Principal, Interest, Taxes, Insurance) payment, common in US-style mortgages.",
      "Includes optional HOA fee in the total monthly payment.",
      "Accurate reducing-balance EMI formula for principal and interest.",
      "Adjustable down payment, loan term, and rate.",
      "Free and works in any currency.",
    ],
    faq: [
      { question: "What does PITI stand for?", answer: "PITI stands for Principal, Interest, Taxes, and Insurance \u2014 the four components that typically make up a full monthly mortgage payment in markets like the US, where property tax and insurance are often escrowed with the lender." },
      { question: "How is this different from the Home Loan Calculator?", answer: "The Home Loan Calculator focuses on pure EMI (principal + interest), common in India and similar markets. This Mortgage Calculator adds property tax, home insurance, and HOA fees for a fuller US-style monthly payment picture." },
      { question: "What's a typical down payment percentage?", answer: "In the US, conventional mortgages often require 3\u201320% down, with 20% avoiding private mortgage insurance (PMI). This calculator lets you adjust the percentage to see the impact on your monthly payment." },
      { question: "What is an HOA fee?", answer: "HOA (Homeowners Association) fees are recurring charges paid by owners in certain communities or condos to cover shared amenities and maintenance \u2014 common in the US but less so elsewhere." },
    ],
  },

  "real-estate-calculators/property-roi": {
    howToUse: [
      "Enter the purchase price and any purchase costs (stamp duty, renovation, etc.).",
      "Enter your expected annual rental income and annual expenses.",
      "Set your expected annual appreciation rate and holding period.",
      "View your projected sale value, net profit, and total/annualized ROI.",
    ],
    features: [
      "Combines rental income and capital appreciation into one ROI figure.",
      "Accounts for purchase costs and selling costs.",
      "Shows both total and annualized ROI for easy comparison with other investments.",
      "Fully adjustable holding period and appreciation assumptions.",
      "Free and completely private.",
    ],
    faq: [
      { question: "What is a good ROI for a real estate investment?", answer: "It varies by market and risk tolerance, but many investors target an annualized ROI of 10-15%+ when combining rental income and appreciation, to justify the illiquidity and effort of real estate versus other investments." },
      { question: "Does this account for a home loan/mortgage on the property?", answer: "No, this calculates ROI assuming a cash purchase. If you finance the property with a loan, your actual cash-on-cash return will differ due to EMI payments and leverage effects \u2014 factor in your loan payments separately." },
      { question: "How accurate are appreciation rate assumptions?", answer: "Property appreciation varies significantly by location, market cycle, and property type. Use a conservative estimate based on historical trends in your specific area rather than a generic average." },
      { question: "What selling costs should I account for?", answer: "Selling costs typically include broker commission, legal fees, and any capital gains tax \u2014 this calculator lets you set an estimated selling cost percentage to account for these." },
    ],
  },

  "crypto-calculators/crypto-profit-calculator": {
    howToUse: [
      "Enter the quantity of crypto you bought.",
      "Enter your buy price and sell price per unit.",
      "Enter the buy and sell exchange fees (as a percentage).",
      "View your cost basis, sale proceeds, net profit, and ROI after fees.",
    ],
    features: [
      "Accounts for exchange trading fees on both buy and sell sides.",
      "Shows cost basis and sale proceeds separately for transparency.",
      "Instant net profit and ROI percentage calculation.",
      "Works for any cryptocurrency and any currency.",
      "Free and completely private.",
    ],
    faq: [
      { question: "Why do exchange fees matter for profit calculation?", answer: "Trading fees (often 0.1\u20131% per trade) reduce your effective profit on both the buy and sell side \u2014 ignoring them can make your actual returns look better than they really are, especially on frequent trades." },
      { question: "Is crypto profit taxable?", answer: "Yes, in most jurisdictions including India, profits from cryptocurrency trading are taxable (in India, at a flat 30% rate on gains plus applicable cess/surcharge, with no deduction for losses against other income). Check your local tax rules." },
      { question: "Does this account for network/gas fees?", answer: "This calculator focuses on exchange trading fees. If you're also paying blockchain network/gas fees for transfers, factor those into your buy price or as an additional cost separately." },
      { question: "Can I use this for any cryptocurrency?", answer: "Yes, the calculator works with any quantity, price, and currency \u2014 just enter your specific trade details regardless of which coin or token you traded." },
    ],
  },

  "crypto-calculators/mining-profit-calculator": {
    howToUse: [
      "Get your estimated daily coin reward from your mining pool's dashboard or hardware-specific mining calculator.",
      "Enter that reward along with the current coin price.",
      "Enter your mining rig's power consumption and your local electricity cost per kWh.",
      "View your daily and monthly net profit after electricity costs and pool fees.",
    ],
    features: [
      "Calculates daily and monthly mining profitability after real costs.",
      "Accounts for electricity cost and pool fees separately.",
      "Shows the break-even electricity price for your setup.",
      "Works for any cryptocurrency and mining hardware.",
      "Free and completely private.",
    ],
    faq: [
      { question: "Why doesn't this calculator use live network difficulty data?", answer: "Network difficulty changes constantly and requires a live data feed. Instead, this calculator asks for your estimated daily coin reward (available from your mining pool's dashboard or a hardware-specific mining calculator), which already accounts for current difficulty." },
      { question: "What is a pool fee?", answer: "Most miners join a mining pool to combine hashing power for more consistent payouts. Pools typically charge a fee (often 1\u20133%) on your mining rewards for this service." },
      { question: "How do I find my rig's power consumption?", answer: "Check your mining hardware's (GPU/ASIC) specification sheet for its power draw in watts, or measure it directly with a power meter for the most accurate figure." },
      { question: "Is crypto mining still profitable?", answer: "Profitability depends heavily on your electricity cost, hardware efficiency, coin price, and network difficulty \u2014 use this calculator regularly with updated numbers, as conditions can change quickly." },
    ],
  },
};

export function getToolContent(categorySlug: string, toolSlug: string): ToolContent | undefined {
  return toolContent[`${categorySlug}/${toolSlug}`];
}
