import type { Metadata } from "next";
import { siteConfig } from "@/config/tools";

const CONTACT_EMAIL = "adarshsinghzaq12@gmail.com";
const LAST_UPDATED = "July 20, 2026";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${siteConfig.name} — how we handle data, analytics, and cookies.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="container-page max-w-3xl py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted">Last updated: {LAST_UPDATED}</p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">1. Your tool data</h2>
          <p>
            The core tools on {siteConfig.name} (formatters, validators, converters, generators, etc.) run
            entirely in your browser using client-side JavaScript. Any text, code, JSON, files, or other
            content you paste or upload into a tool is processed locally on your device and is never
            transmitted to, or stored on, our servers.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">2. Analytics</h2>
          <p>
            We use <strong>Google Analytics</strong> and <strong>Microsoft Clarity</strong> to understand
            aggregate site usage &mdash; which pages are visited, how long people stay, and general navigation
            patterns. These services may use cookies or similar technologies and may collect information such
            as your approximate location (city/country level), device and browser type, and pages visited.
            This data is used solely to improve {siteConfig.name} and is not used to identify you personally.
          </p>
          <p className="mt-2">
            You can opt out of Google Analytics tracking using the{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline"
            >
              Google Analytics Opt-out Browser Add-on
            </a>
            , or by using your browser's tracking-protection or ad-blocking features.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">3. Advertising</h2>
          <p>
            {siteConfig.name} may display ads served by third-party advertising networks, such as Google
            AdSense. These networks may use cookies to serve ads based on your prior visits to this or other
            websites. You can learn more about how Google uses data and control your ad personalization
            settings at{" "}
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline"
            >
              Google's advertising policy page
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">4. Cookies</h2>
          <p>
            Cookies used on this site are limited to those set by the analytics and advertising services
            described above. We do not use cookies to store accounts or personal profiles, since{" "}
            {siteConfig.name} does not require sign-up or logins.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">5. Third-party links</h2>
          <p>
            Some pages may link to third-party sites (e.g. our GitHub or social profiles). We are not
            responsible for the privacy practices of those external sites.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">6. Children's privacy</h2>
          <p>{siteConfig.name} is not directed at children under 13, and we do not knowingly collect personal information from children.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">7. Changes to this policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an
            updated revision date.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">8. Contact</h2>
          <p>
            Questions about this policy? Email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-foreground underline">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
