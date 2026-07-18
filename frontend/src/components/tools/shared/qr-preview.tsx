"use client";

export function QrPreview({ dataUrl, filename, error }: { dataUrl: string | null; filename: string; error?: string | null }) {
  function download() {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = filename;
    a.click();
  }

  return (
    <div className="card flex flex-col items-center gap-3 p-6">
      {error ? (
        <p className="text-sm text-muted">{error}</p>
      ) : dataUrl ? (
        // eslint-disable-next-line @next/next/no-img-element -- local data-URL QR/barcode preview, not an optimizable remote asset
        <img src={dataUrl} alt="Generated code" className="max-w-full" style={{ imageRendering: "pixelated" }} />
      ) : (
        <p className="text-sm text-muted">Fill in the fields above to generate a code.</p>
      )}
      {dataUrl && !error && (
        <button onClick={download} className="btn btn-secondary h-9 px-4 text-sm">
          Download PNG
        </button>
      )}
    </div>
  );
}
