import QRCode from "qrcode";
import JsBarcode from "jsbarcode";

export interface QrOptions {
  errorCorrectionLevel?: "L" | "M" | "Q" | "H";
  margin?: number;
  width?: number;
  darkColor?: string;
  lightColor?: string;
}

export async function generateQrDataUrl(text: string, options: QrOptions = {}): Promise<string> {
  return QRCode.toDataURL(text, {
    errorCorrectionLevel: options.errorCorrectionLevel ?? "M",
    margin: options.margin ?? 2,
    width: options.width ?? 320,
    color: {
      dark: options.darkColor ?? "#000000",
      light: options.lightColor ?? "#ffffff",
    },
  });
}

export type WifiSecurity = "WPA" | "WEP" | "nopass";

export function buildWifiQrString(ssid: string, password: string, security: WifiSecurity, hidden: boolean): string {
  const escape = (v: string) => v.replace(/([\\;,:"])/g, "\\$1");
  const parts = [`WIFI:T:${security}`, `S:${escape(ssid)}`];
  if (security !== "nopass") parts.push(`P:${escape(password)}`);
  if (hidden) parts.push("H:true");
  return parts.join(";") + ";;";
}

export interface VCardFields {
  firstName: string;
  lastName: string;
  organization?: string;
  title?: string;
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
}

export function buildVCardString(fields: VCardFields): string {
  const lines = ["BEGIN:VCARD", "VERSION:3.0"];
  lines.push(`N:${fields.lastName};${fields.firstName};;;`);
  lines.push(`FN:${[fields.firstName, fields.lastName].filter(Boolean).join(" ")}`);
  if (fields.organization) lines.push(`ORG:${fields.organization}`);
  if (fields.title) lines.push(`TITLE:${fields.title}`);
  if (fields.phone) lines.push(`TEL;TYPE=CELL:${fields.phone}`);
  if (fields.email) lines.push(`EMAIL:${fields.email}`);
  if (fields.website) lines.push(`URL:${fields.website}`);
  if (fields.address) lines.push(`ADR;TYPE=HOME:;;${fields.address};;;;`);
  lines.push("END:VCARD");
  return lines.join("\n");
}

export type BarcodeFormatId =
  | "CODE128"
  | "CODE39"
  | "EAN13"
  | "EAN8"
  | "UPC"
  | "ITF14"
  | "MSI"
  | "pharmacode"
  | "codabar";

export const BARCODE_FORMATS: { value: BarcodeFormatId; label: string }[] = [
  { value: "CODE128", label: "Code 128 (general purpose)" },
  { value: "CODE39", label: "Code 39" },
  { value: "EAN13", label: "EAN-13 (retail, 13 digits)" },
  { value: "EAN8", label: "EAN-8 (8 digits)" },
  { value: "UPC", label: "UPC-A (12 digits)" },
  { value: "ITF14", label: "ITF-14 (shipping, 14 digits)" },
  { value: "codabar", label: "Codabar" },
  { value: "MSI", label: "MSI" },
  { value: "pharmacode", label: "Pharmacode" },
];

export async function generateBarcodeDataUrl(
  value: string,
  format: BarcodeFormatId,
  options: { displayValue?: boolean; height?: number; width?: number } = {},
): Promise<string> {
  const canvas = document.createElement("canvas");
  let isValid = true;

  JsBarcode(canvas, value, {
    format,
    displayValue: options.displayValue ?? true,
    height: options.height ?? 80,
    width: options.width ?? 2,
    margin: 10,
    background: "#ffffff",
    lineColor: "#000000",
    valid: (valid) => {
      isValid = valid;
    },
  });

  if (!isValid) throw new Error(`"${value}" is not a valid value for the ${format} barcode format.`);
  return canvas.toDataURL("image/png");
}

export interface DecodedResult {
  text: string;
  format: string;
}

export async function decodeImageDataUrl(dataUrl: string): Promise<DecodedResult> {
  const { BrowserMultiFormatReader } = await import("@zxing/browser");
  const { BarcodeFormat } = await import("@zxing/library");
  const reader = new BrowserMultiFormatReader();
  const result = await reader.decodeFromImageElement(dataUrl);
  return { text: result.getText(), format: BarcodeFormat[result.getBarcodeFormat()] };
}

export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error ?? new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}
