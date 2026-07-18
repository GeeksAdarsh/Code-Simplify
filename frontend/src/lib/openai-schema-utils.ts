import { parseJson } from "@/lib/json-utils";
import type { LintIssue } from "@/lib/docker-utils";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

const SUPPORTED_TYPES = new Set(["string", "number", "integer", "boolean", "object", "array", "null"]);
const SUPPORTED_STRING_FORMATS = new Set(["date-time", "time", "date", "duration", "email", "hostname", "ipv4", "ipv6", "uuid"]);
const UNSUPPORTED_KEYWORDS_STRICT = new Set(["minLength", "maxLength", "pattern", "minimum", "maximum", "multipleOf", "patternProperties", "unevaluatedProperties", "propertyNames", "minItems", "maxItems", "contains"]);

export interface OpenAiSchemaResult {
  issues: LintIssue[];
  propertyCount: number;
  maxDepth: number;
  enumValueCount: number;
}

function walk(node: unknown, path: string, depth: number, state: { issues: LintIssue[]; propertyCount: number; maxDepth: number; enumValueCount: number }, defs: Record<string, unknown>): void {
  state.maxDepth = Math.max(state.maxDepth, depth);

  if (!isPlainObject(node)) return;

  if (typeof node.$ref === "string") {
    const refName = node.$ref.split("/").pop();
    if (refName && defs[refName] !== undefined) {
      walk(defs[refName], `${path} ($ref: ${node.$ref})`, depth, state, defs);
    } else {
      state.issues.push({ severity: "warning", message: `${path}: $ref "${node.$ref}" does not resolve to a local #/$defs entry.` });
    }
    return;
  }

  if (Array.isArray(node.anyOf) || Array.isArray(node.oneOf) || Array.isArray(node.allOf)) {
    const variants = (node.anyOf ?? node.oneOf ?? node.allOf) as unknown[];
    variants.forEach((v, i) => walk(v, `${path}.anyOf[${i}]`, depth, state, defs));
    return;
  }

  const type = node.type;

  if (type === "object") {
    if (node.additionalProperties !== false) {
      state.issues.push({ severity: "error", message: `${path}: strict mode requires "additionalProperties": false on every object.` });
    }
    const properties = isPlainObject(node.properties) ? node.properties : {};
    const propertyKeys = Object.keys(properties);
    state.propertyCount += propertyKeys.length;
    const required = Array.isArray(node.required) ? node.required : [];

    for (const key of propertyKeys) {
      if (!required.includes(key)) {
        state.issues.push({
          severity: "error",
          message: `${path}: property "${key}" is not in "required" \u2014 strict mode requires every property to be listed as required (use a nullable type for optional fields).`,
        });
      }
    }
    for (const key of required) {
      if (!propertyKeys.includes(key)) {
        state.issues.push({ severity: "warning", message: `${path}: "${key}" is listed in "required" but not defined in "properties".` });
      }
    }

    for (const [key, value] of Object.entries(properties)) {
      walk(value, `${path}.${key}`, depth + 1, state, defs);
    }
  } else if (type === "array") {
    if (node.items !== undefined) {
      walk(node.items, `${path}[]`, depth + 1, state, defs);
    } else {
      state.issues.push({ severity: "warning", message: `${path}: array schema has no "items" definition.` });
    }
  } else if (type === "string") {
    if (typeof node.format === "string" && !SUPPORTED_STRING_FORMATS.has(node.format)) {
      state.issues.push({ severity: "warning", message: `${path}: format "${node.format}" may not be supported in OpenAI structured output strict mode.` });
    }
    if (Array.isArray(node.enum)) {
      state.enumValueCount += node.enum.length;
    }
  } else if (Array.isArray(type)) {
    state.issues.push({ severity: "info", message: `${path}: uses a type array (${JSON.stringify(type)}) \u2014 prefer anyOf with distinct schemas for union types in strict mode.` });
  } else if (type !== undefined && !SUPPORTED_TYPES.has(String(type))) {
    state.issues.push({ severity: "error", message: `${path}: type "${type}" is not a supported JSON Schema type.` });
  } else if (type === undefined && !node.$ref) {
    state.issues.push({ severity: "info", message: `${path}: no "type" specified.` });
  }

  for (const keyword of Object.keys(node)) {
    if (UNSUPPORTED_KEYWORDS_STRICT.has(keyword)) {
      state.issues.push({ severity: "warning", message: `${path}: "${keyword}" is a JSON Schema keyword that OpenAI's structured output strict mode may ignore or reject \u2014 verify against current docs.` });
    }
  }
}

export function validateOpenAiSchema(input: string): OpenAiSchemaResult {
  const parsed = parseJson(input);
  if (parsed.error) {
    return { issues: [{ severity: "error", message: parsed.error.message + (parsed.error.line ? ` (line ${parsed.error.line})` : "") }], propertyCount: 0, maxDepth: 0, enumValueCount: 0 };
  }

  const schema = parsed.data;
  const state = { issues: [] as LintIssue[], propertyCount: 0, maxDepth: 1, enumValueCount: 0 };

  if (!isPlainObject(schema)) {
    return { issues: [{ severity: "error", message: "The schema must be a JSON object." }], propertyCount: 0, maxDepth: 0, enumValueCount: 0 };
  }

  const defs = isPlainObject(schema.$defs) ? schema.$defs : isPlainObject(schema.definitions) ? schema.definitions : {};

  if (schema.type !== "object" && !schema.anyOf) {
    state.issues.push({ severity: "warning", message: 'Root schema should be type "object" for OpenAI structured outputs / function calling.' });
  }

  walk(schema, "root", 1, state, defs as Record<string, unknown>);

  if (state.maxDepth > 5) {
    state.issues.push({ severity: "warning", message: `Schema nests ${state.maxDepth} levels deep \u2014 OpenAI structured outputs cap nesting at 5 levels.` });
  }
  if (state.propertyCount > 100) {
    state.issues.push({ severity: "warning", message: `Schema defines ${state.propertyCount} total properties \u2014 OpenAI structured outputs cap this at 100.` });
  }
  if (state.enumValueCount > 500) {
    state.issues.push({ severity: "warning", message: `Schema defines ${state.enumValueCount} total enum values \u2014 OpenAI structured outputs cap this at 500.` });
  }

  return { issues: state.issues, propertyCount: state.propertyCount, maxDepth: state.maxDepth, enumValueCount: state.enumValueCount };
}
