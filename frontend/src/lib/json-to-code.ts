export type FieldKind =
  | { kind: "string" }
  | { kind: "integer" }
  | { kind: "float" }
  | { kind: "boolean" }
  | { kind: "null" }
  | { kind: "any" }
  | { kind: "object"; className: string }
  | { kind: "array"; element: FieldKind };

export interface ClassField {
  jsonKey: string;
  type: FieldKind;
}

export interface ClassDef {
  name: string;
  fields: ClassField[];
}

export interface CodeSchema {
  classes: ClassDef[];
  rootType: FieldKind;
}

export function toPascalCase(input: string): string {
  const words = input.replace(/[^a-zA-Z0-9]+/g, " ").trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "Item";
  return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("");
}

export function toCamelCase(input: string): string {
  const pascal = toPascalCase(input);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

function inferFieldKind(value: unknown, classes: ClassDef[], nameHint: string): FieldKind {
  if (value === null) return { kind: "null" };

  if (Array.isArray(value)) {
    if (value.length === 0) return { kind: "array", element: { kind: "any" } };
    return { kind: "array", element: inferFieldKind(value[0], classes, nameHint) };
  }

  if (typeof value === "object") {
    const fields: ClassField[] = Object.entries(value as Record<string, unknown>).map(([key, val]) => ({
      jsonKey: key,
      type: inferFieldKind(val, classes, key),
    }));

    let className = toPascalCase(nameHint);
    let suffix = 2;
    while (classes.some((c) => c.name === className)) {
      className = `${toPascalCase(nameHint)}${suffix++}`;
    }

    classes.push({ name: className, fields });
    return { kind: "object", className };
  }

  if (typeof value === "number") return Number.isInteger(value) ? { kind: "integer" } : { kind: "float" };
  if (typeof value === "boolean") return { kind: "boolean" };
  if (typeof value === "string") return { kind: "string" };
  return { kind: "any" };
}

/** Walks parsed JSON and builds a language-agnostic class schema (nested objects become named classes). */
export function buildCodeSchema(rootName: string, data: unknown): CodeSchema {
  const classes: ClassDef[] = [];
  const rootType = inferFieldKind(data, classes, rootName);
  // Children are discovered (and pushed) before their parent during recursion; reverse so root comes first.
  return { classes: classes.reverse(), rootType };
}

export function renderJava(schema: CodeSchema, rootName: string): string {
  const javaType = (t: FieldKind): string => {
    switch (t.kind) {
      case "string":
        return "String";
      case "integer":
        return "Integer";
      case "float":
        return "Double";
      case "boolean":
        return "Boolean";
      case "object":
        return t.className;
      case "array":
        return `List<${javaType(t.element)}>`;
      default:
        return "Object";
    }
  };

  const needsList = schema.classes.some((c) => c.fields.some((f) => f.type.kind === "array"));
  const header = needsList ? "import java.util.List;\n\n" : "";

  const body = schema.classes
    .map((cls) => {
      const fieldLines = cls.fields
        .map((f) => `    private ${javaType(f.type)} ${toCamelCase(f.jsonKey)};`)
        .join("\n");
      const accessors = cls.fields
        .map((f) => {
          const type = javaType(f.type);
          const prop = toCamelCase(f.jsonKey);
          const cap = toPascalCase(f.jsonKey);
          return `    public ${type} get${cap}() {\n        return ${prop};\n    }\n\n    public void set${cap}(${type} ${prop}) {\n        this.${prop} = ${prop};\n    }`;
        })
        .join("\n\n");
      return `public class ${cls.name} {\n${fieldLines}\n\n${accessors}\n}`;
    })
    .join("\n\n");

  if (schema.classes.length === 0) {
    return `${header}// Root JSON value is a primitive; wrap it in an object to generate a ${toPascalCase(rootName)} class.`;
  }

  return header + body;
}

export function renderCSharp(schema: CodeSchema): string {
  const csType = (t: FieldKind): string => {
    switch (t.kind) {
      case "string":
        return "string";
      case "integer":
        return "int";
      case "float":
        return "double";
      case "boolean":
        return "bool";
      case "object":
        return t.className;
      case "array":
        return `List<${csType(t.element)}>`;
      default:
        return "object";
    }
  };

  const needsList = schema.classes.some((c) => c.fields.some((f) => f.type.kind === "array"));
  const header = needsList ? "using System.Collections.Generic;\n\n" : "";

  const body = schema.classes
    .map((cls) => {
      const props = cls.fields
        .map((f) => `    public ${csType(f.type)} ${toPascalCase(f.jsonKey)} { get; set; }`)
        .join("\n");
      return `public class ${cls.name}\n{\n${props}\n}`;
    })
    .join("\n\n");

  return header + body;
}

export function renderTypeScript(schema: CodeSchema): string {
  const tsType = (t: FieldKind): string => {
    switch (t.kind) {
      case "string":
        return "string";
      case "integer":
      case "float":
        return "number";
      case "boolean":
        return "boolean";
      case "null":
        return "null";
      case "object":
        return t.className;
      case "array":
        return `${tsType(t.element)}[]`;
      default:
        return "unknown";
    }
  };

  return schema.classes
    .map((cls) => {
      const props = cls.fields.map((f) => `  ${f.jsonKey}: ${tsType(f.type)};`).join("\n");
      return `export interface ${cls.name} {\n${props}\n}`;
    })
    .join("\n\n");
}

export function renderKotlin(schema: CodeSchema): string {
  const ktType = (t: FieldKind): string => {
    switch (t.kind) {
      case "string":
        return "String";
      case "integer":
        return "Int";
      case "float":
        return "Double";
      case "boolean":
        return "Boolean";
      case "object":
        return t.className;
      case "array":
        return `List<${ktType(t.element)}>`;
      default:
        return "Any?"
    }
  };

  return schema.classes
    .map((cls) => {
      const props = cls.fields
        .map((f, i) => {
          const comma = i < cls.fields.length - 1 ? "," : "";
          return `    val ${toCamelCase(f.jsonKey)}: ${ktType(f.type)}${comma}`;
        })
        .join("\n");
      return `data class ${cls.name}(\n${props}\n)`;
    })
    .join("\n\n");
}

export function renderDart(schema: CodeSchema): string {
  const dartType = (t: FieldKind): string => {
    switch (t.kind) {
      case "string":
        return "String";
      case "integer":
        return "int";
      case "float":
        return "double";
      case "boolean":
        return "bool";
      case "object":
        return t.className;
      case "array":
        return `List<${dartType(t.element)}>`;
      default:
        return "dynamic";
    }
  };

  const fromJsonValue = (f: ClassField): string => {
    const key = f.jsonKey;
    if (f.type.kind === "object") {
      return `${f.type.className}.fromJson(json['${key}'])`;
    }
    if (f.type.kind === "array" && f.type.element.kind === "object") {
      const elClass = f.type.element.className;
      return `List<${elClass}>.from(json['${key}'].map((x) => ${elClass}.fromJson(x)))`;
    }
    if (f.type.kind === "array") {
      return `List<${dartType(f.type.element)}>.from(json['${key}'])`;
    }
    return `json['${key}']`;
  };

  return schema.classes
    .map((cls) => {
      const fields = cls.fields.map((f) => `  final ${dartType(f.type)} ${toCamelCase(f.jsonKey)};`).join("\n");
      const ctorArgs = cls.fields.map((f) => `required this.${toCamelCase(f.jsonKey)}`).join(", ");
      const fromJsonLines = cls.fields
        .map((f) => `      ${toCamelCase(f.jsonKey)}: ${fromJsonValue(f)},`)
        .join("\n");

      return `class ${cls.name} {\n${fields}\n\n  ${cls.name}({${ctorArgs}});\n\n  factory ${cls.name}.fromJson(Map<String, dynamic> json) {\n    return ${cls.name}(\n${fromJsonLines}\n    );\n  }\n}`;
    })
    .join("\n\n");
}
