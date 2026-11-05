import { siteConfig } from "@/config/tools";

export const ORGANIZATION_ID = `${siteConfig.url}/#organization`;
export const WEBSITE_ID = `${siteConfig.url}/#website`;

export const SITE_LOGO = {
  "@type": "ImageObject",
  url: `${siteConfig.url}/logo.png`,
  width: 512,
  height: 512,
};

export const SAME_AS = ["https://x.com/AdarshKuma84627"];

/** schema.org applicationCategory values that Google recognizes. */
const CATEGORY_APP_TYPE: Record<string, string> = {
  css: "DesignApplication",
  colors: "DesignApplication",
  security: "SecurityApplication",
  authentication: "SecurityApplication",
  text: "UtilitiesApplication",
  numbers: "UtilitiesApplication",
  "date-time": "UtilitiesApplication",
  "qr-barcode": "UtilitiesApplication",
  "random-generators": "UtilitiesApplication",
  fun: "EntertainmentApplication",
  "decision-tools": "EntertainmentApplication",
  "business-calculators": "BusinessApplication",
};

export function applicationCategoryFor(categorySlug: string): string {
  if (CATEGORY_APP_TYPE[categorySlug]) return CATEGORY_APP_TYPE[categorySlug];
  if (categorySlug.endsWith("-calculators")) return "FinanceApplication";
  return "DeveloperApplication";
}
