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
};

export function getToolContent(categorySlug: string, toolSlug: string): ToolContent | undefined {
  return toolContent[`${categorySlug}/${toolSlug}`];
}
