"use client";

import { useState } from "react";
import { splitIntoTeams } from "@/lib/decision-utils";

const SAMPLE_NAMES = "Alex\nJordan\nTaylor\nMorgan\nCasey\nRiley\nSam\nJamie";

export function TeamGeneratorTool() {
  const [namesText, setNamesText] = useState(SAMPLE_NAMES);
  const [teamCount, setTeamCount] = useState(2);
  const [teams, setTeams] = useState<string[][]>([]);

  const names = namesText
    .split("\n")
    .map((n) => n.trim())
    .filter(Boolean);

  function generate() {
    if (names.length < teamCount) return;
    setTeams(splitIntoTeams(names, teamCount));
  }

  return (
    <div>
      <div className="card p-4">
        <label className="mb-1 block text-xs font-medium text-muted">Names (one per line)</label>
        <textarea
          value={namesText}
          onChange={(e) => setNamesText(e.target.value)}
          rows={8}
          className="w-full rounded border border-border bg-background px-3 py-2 text-sm outline-none"
        />
        <div className="mt-3 flex flex-wrap items-end gap-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-muted">Number of teams</label>
            <input
              type="number"
              min={2}
              max={Math.max(2, names.length)}
              value={teamCount}
              onChange={(e) => setTeamCount(Number(e.target.value))}
              className="w-24 rounded border border-border bg-background px-2.5 py-1.5 text-sm outline-none"
            />
          </div>
          <button onClick={generate} disabled={names.length < teamCount} className="btn btn-primary h-9 px-4 text-sm disabled:opacity-50">
            Generate Teams
          </button>
          <p className="text-xs text-muted">{names.length} names entered</p>
        </div>
        {names.length < teamCount && <p className="mt-2 text-xs text-muted">Enter at least {teamCount} names to form {teamCount} teams.</p>}
      </div>

      {teams.length > 0 && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {teams.map((team, i) => (
            <div key={i} className="card p-4">
              <h3 className="mb-2 text-sm font-semibold">Team {i + 1}</h3>
              <ul className="space-y-1">
                {team.map((name, j) => (
                  <li key={j} className="text-sm text-muted">
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
