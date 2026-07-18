interface DataTableProps {
  headers: string[];
  rows: string[][];
  maxRows?: number;
}

export function DataTable({ headers, rows, maxRows = 200 }: DataTableProps) {
  const visibleRows = rows.slice(0, maxRows);

  return (
    <div className="overflow-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="sticky top-0 border-b border-border bg-surface text-left">
            {headers.map((h, i) => (
              <th key={i} className="whitespace-nowrap px-2 py-1.5 font-medium">
                {h || `column${i + 1}`}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visibleRows.map((row, i) => (
            <tr key={i} className="border-b border-border last:border-b-0">
              {headers.map((_, colIndex) => (
                <td key={colIndex} className="whitespace-nowrap px-2 py-1.5 text-muted">
                  {row[colIndex] ?? ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length > maxRows && (
        <p className="px-2 py-2 text-xs text-muted">
          Showing {maxRows} of {rows.length} rows.
        </p>
      )}
    </div>
  );
}
