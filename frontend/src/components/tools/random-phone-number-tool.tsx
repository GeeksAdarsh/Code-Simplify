"use client";

import { useCallback, useState } from "react";
import { BatchGeneratorTool } from "@/components/tools/shared/batch-generator-tool";
import { generateRandomPhoneNumber, type PhoneCountry } from "@/lib/random-utils";

const COUNTRIES: { value: PhoneCountry; label: string }[] = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "in", label: "India" },
  { value: "generic", label: "Generic international" },
];

export function RandomPhoneNumberTool() {
  const [country, setCountry] = useState<PhoneCountry>("us");
  const generate = useCallback(() => generateRandomPhoneNumber(country), [country]);

  return (
    <div>
      <div className="card border-foreground/20 bg-surface p-4 text-sm">
        <p className="font-semibold">\u26A0\uFE0F Fake test data only</p>
        <p className="mt-1 text-muted">
          US numbers use the 555 exchange, which is officially reserved by the NANP for fictional use in
          testing and media. These are not real, working phone numbers.
        </p>
      </div>

      <div className="mt-4">
        <BatchGeneratorTool
          generate={generate}
          controls={
            <div>
              <label className="mb-1 block text-xs font-medium text-muted">Country / format</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value as PhoneCountry)}
                className="rounded border border-border bg-background px-2.5 py-1.5 text-sm"
              >
                {COUNTRIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          }
        />
      </div>
    </div>
  );
}
