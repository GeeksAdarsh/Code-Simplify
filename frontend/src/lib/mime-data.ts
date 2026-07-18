export interface MimeInfo {
  extension: string;
  mimeType: string;
  description: string;
}

export const MIME_TYPES: MimeInfo[] = [
  { extension: ".html", mimeType: "text/html", description: "HTML document" },
  { extension: ".htm", mimeType: "text/html", description: "HTML document" },
  { extension: ".css", mimeType: "text/css", description: "Cascading Style Sheet" },
  { extension: ".js", mimeType: "text/javascript", description: "JavaScript source" },
  { extension: ".mjs", mimeType: "text/javascript", description: "JavaScript ES module" },
  { extension: ".json", mimeType: "application/json", description: "JSON data" },
  { extension: ".xml", mimeType: "application/xml", description: "XML document" },
  { extension: ".txt", mimeType: "text/plain", description: "Plain text file" },
  { extension: ".csv", mimeType: "text/csv", description: "Comma-separated values" },
  { extension: ".md", mimeType: "text/markdown", description: "Markdown document" },
  { extension: ".yaml", mimeType: "application/yaml", description: "YAML document" },
  { extension: ".yml", mimeType: "application/yaml", description: "YAML document" },

  { extension: ".png", mimeType: "image/png", description: "PNG image" },
  { extension: ".jpg", mimeType: "image/jpeg", description: "JPEG image" },
  { extension: ".jpeg", mimeType: "image/jpeg", description: "JPEG image" },
  { extension: ".gif", mimeType: "image/gif", description: "GIF image" },
  { extension: ".webp", mimeType: "image/webp", description: "WebP image" },
  { extension: ".svg", mimeType: "image/svg+xml", description: "SVG vector image" },
  { extension: ".ico", mimeType: "image/x-icon", description: "Icon file" },
  { extension: ".bmp", mimeType: "image/bmp", description: "Bitmap image" },
  { extension: ".tif", mimeType: "image/tiff", description: "TIFF image" },
  { extension: ".tiff", mimeType: "image/tiff", description: "TIFF image" },
  { extension: ".avif", mimeType: "image/avif", description: "AVIF image" },
  { extension: ".heic", mimeType: "image/heic", description: "HEIC image" },

  { extension: ".mp3", mimeType: "audio/mpeg", description: "MP3 audio" },
  { extension: ".wav", mimeType: "audio/wav", description: "WAV audio" },
  { extension: ".ogg", mimeType: "audio/ogg", description: "Ogg audio" },
  { extension: ".flac", mimeType: "audio/flac", description: "FLAC audio" },
  { extension: ".m4a", mimeType: "audio/mp4", description: "MPEG-4 audio" },

  { extension: ".mp4", mimeType: "video/mp4", description: "MP4 video" },
  { extension: ".webm", mimeType: "video/webm", description: "WebM video" },
  { extension: ".avi", mimeType: "video/x-msvideo", description: "AVI video" },
  { extension: ".mov", mimeType: "video/quicktime", description: "QuickTime video" },
  { extension: ".mkv", mimeType: "video/x-matroska", description: "Matroska video" },

  { extension: ".pdf", mimeType: "application/pdf", description: "PDF document" },
  { extension: ".doc", mimeType: "application/msword", description: "Microsoft Word (legacy)" },
  { extension: ".docx", mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", description: "Microsoft Word document" },
  { extension: ".xls", mimeType: "application/vnd.ms-excel", description: "Microsoft Excel (legacy)" },
  { extension: ".xlsx", mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", description: "Microsoft Excel spreadsheet" },
  { extension: ".ppt", mimeType: "application/vnd.ms-powerpoint", description: "Microsoft PowerPoint (legacy)" },
  { extension: ".pptx", mimeType: "application/vnd.openxmlformats-officedocument.presentationml.presentation", description: "Microsoft PowerPoint presentation" },
  { extension: ".rtf", mimeType: "application/rtf", description: "Rich Text Format" },

  { extension: ".zip", mimeType: "application/zip", description: "ZIP archive" },
  { extension: ".gz", mimeType: "application/gzip", description: "Gzip archive" },
  { extension: ".tar", mimeType: "application/x-tar", description: "TAR archive" },
  { extension: ".7z", mimeType: "application/x-7z-compressed", description: "7-Zip archive" },
  { extension: ".rar", mimeType: "application/vnd.rar", description: "RAR archive" },

  { extension: ".woff", mimeType: "font/woff", description: "Web Open Font Format" },
  { extension: ".woff2", mimeType: "font/woff2", description: "Web Open Font Format 2" },
  { extension: ".ttf", mimeType: "font/ttf", description: "TrueType font" },
  { extension: ".otf", mimeType: "font/otf", description: "OpenType font" },
  { extension: ".eot", mimeType: "application/vnd.ms-fontobject", description: "Embedded OpenType font" },

  { extension: ".wasm", mimeType: "application/wasm", description: "WebAssembly binary" },
  { extension: ".exe", mimeType: "application/x-msdownload", description: "Windows executable" },
  { extension: ".apk", mimeType: "application/vnd.android.package-archive", description: "Android app package" },
  { extension: ".sql", mimeType: "application/sql", description: "SQL script" },
  { extension: ".sh", mimeType: "application/x-sh", description: "Shell script" },
];

export function findMimeByQuery(query: string): MimeInfo[] {
  const q = query.trim().toLowerCase().replace(/^\*?\./, ".");
  if (!q) return MIME_TYPES;
  return MIME_TYPES.filter(
    (m) => m.extension.includes(q.startsWith(".") ? q : `.${q}`) || m.mimeType.toLowerCase().includes(q) || m.description.toLowerCase().includes(q)
  );
}

export interface MagicSignature {
  mimeType: string;
  description: string;
  offset: number;
  bytes: (number | null)[];
}

export const MAGIC_SIGNATURES: MagicSignature[] = [
  { mimeType: "image/png", description: "PNG image", offset: 0, bytes: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a] },
  { mimeType: "image/jpeg", description: "JPEG image", offset: 0, bytes: [0xff, 0xd8, 0xff] },
  { mimeType: "image/gif", description: "GIF image", offset: 0, bytes: [0x47, 0x49, 0x46, 0x38] },
  { mimeType: "image/bmp", description: "Bitmap image", offset: 0, bytes: [0x42, 0x4d] },
  { mimeType: "image/webp", description: "WebP image", offset: 8, bytes: [0x57, 0x45, 0x42, 0x50] },
  { mimeType: "image/x-icon", description: "Icon file", offset: 0, bytes: [0x00, 0x00, 0x01, 0x00] },
  { mimeType: "application/pdf", description: "PDF document", offset: 0, bytes: [0x25, 0x50, 0x44, 0x46] },
  { mimeType: "application/zip", description: "ZIP archive (also .docx/.xlsx/.jar/.apk, which are ZIP-based)", offset: 0, bytes: [0x50, 0x4b, 0x03, 0x04] },
  { mimeType: "application/gzip", description: "Gzip archive", offset: 0, bytes: [0x1f, 0x8b] },
  { mimeType: "application/x-tar", description: "TAR archive", offset: 257, bytes: [0x75, 0x73, 0x74, 0x61, 0x72] },
  { mimeType: "application/x-7z-compressed", description: "7-Zip archive", offset: 0, bytes: [0x37, 0x7a, 0xbc, 0xaf, 0x27, 0x1c] },
  { mimeType: "application/vnd.rar", description: "RAR archive", offset: 0, bytes: [0x52, 0x61, 0x72, 0x21, 0x1a, 0x07] },
  { mimeType: "application/x-msdownload", description: "Windows executable / DLL", offset: 0, bytes: [0x4d, 0x5a] },
  { mimeType: "application/wasm", description: "WebAssembly binary", offset: 0, bytes: [0x00, 0x61, 0x73, 0x6d] },
  { mimeType: "audio/mpeg", description: "MP3 audio (with ID3 tag)", offset: 0, bytes: [0x49, 0x44, 0x33] },
  { mimeType: "audio/flac", description: "FLAC audio", offset: 0, bytes: [0x66, 0x4c, 0x61, 0x43] },
  { mimeType: "audio/wav", description: "WAV audio", offset: 8, bytes: [0x57, 0x41, 0x56, 0x45] },
  { mimeType: "video/mp4", description: "MP4 video/audio container", offset: 4, bytes: [0x66, 0x74, 0x79, 0x70] },
  { mimeType: "video/x-matroska", description: "Matroska video (MKV/WebM)", offset: 0, bytes: [0x1a, 0x45, 0xdf, 0xa3] },
  { mimeType: "video/x-msvideo", description: "AVI video", offset: 8, bytes: [0x41, 0x56, 0x49, 0x20] },
  { mimeType: "application/msword", description: "MS Office legacy document (doc/xls/ppt, OLE Compound File)", offset: 0, bytes: [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1] },
  { mimeType: "font/woff", description: "WOFF font", offset: 0, bytes: [0x77, 0x4f, 0x46, 0x46] },
  { mimeType: "font/woff2", description: "WOFF2 font", offset: 0, bytes: [0x77, 0x4f, 0x46, 0x32] },
  { mimeType: "font/ttf", description: "TrueType/OpenType font", offset: 0, bytes: [0x00, 0x01, 0x00, 0x00, 0x00] },
];

export function detectMimeFromBytes(bytes: Uint8Array): MagicSignature[] {
  return MAGIC_SIGNATURES.filter((sig) => {
    if (bytes.length < sig.offset + sig.bytes.length) return false;
    return sig.bytes.every((b, i) => b === null || bytes[sig.offset + i] === b);
  });
}

export function bytesToHexPreview(bytes: Uint8Array, count = 32): string {
  return Array.from(bytes.slice(0, count))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(" ");
}
