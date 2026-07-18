"use client";

import { useCallback } from "react";
import { ConvertTool, type ConvertResult } from "@/components/tools/shared/convert-tool";
import { formatRust } from "@/lib/rust-utils";

const SAMPLE_RUST = `struct Greeter {
name: String,
}
impl Greeter {
fn new(name: &str) -> Self {
Greeter { name: name.to_string() }
}
fn greet(&self) -> String {
if self.name.is_empty() {
return "Hello, stranger!".to_string();
}
format!("Hello, {}!", self.name)
}
}
fn main() {
let g = Greeter::new("World");
println!("{}", g.greet());
}`;

export function RustFormatterTool() {
  const convert = useCallback((input: string): ConvertResult => {
    return { output: formatRust(input, 4) };
  }, []);

  return (
    <div>
      <ConvertTool
        sampleInput={SAMPLE_RUST}
        convert={convert}
        inputLabel="Rust input"
        outputLabel="Formatted output"
        inputPlaceholder="Paste your Rust code here to fix its indentation..."
        outputPlaceholder="Formatted Rust will appear here."
        downloadFilename="formatted.rs"
        downloadMimeType="text/rust"
      />
      <p className="mt-2 text-xs text-muted">
        This formatter re-indents your code based on brace/bracket/parenthesis nesting depth (4-space indent). It
        distinguishes char literals ('a', '\\n') from lifetime annotations ('a) so lifetimes don't get mistaken for
        unterminated strings. Raw strings (r&quot;...&quot;) are a known edge case and may not be handled perfectly.
      </p>
    </div>
  );
}
