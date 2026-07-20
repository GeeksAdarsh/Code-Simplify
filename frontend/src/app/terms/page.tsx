import type { Metadata } from "next";
import { siteConfig } from "@/config/tools";

const CONTACT_EMAIL = "adarshsinghzaq12@gmail.com";
const LAST_UPDATED = "July 20, 2026";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms and conditions for using ${siteConfig.name}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="container-page max-w-3xl py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Terms &amp; Conditions</h1>
      <p className="mt-2 text-sm text-muted">Last updated: {LAST_UPDATED}</p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">1. Acceptance of terms</h2>
          <p>
            By accessing or using {siteConfig.name} (&ldquo;the Site&rdquo;), you agree to these Terms &amp;
            Conditions. If you do not agree, please do not use the Site.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">2. Use of the service</h2>
          <p>
            {siteConfig.name} provides free online developer tools for formatting, validating, converting, and
            generating data. The tools are provided &ldquo;as is&rdquo; for personal and commercial use, free of
            charge, without warranty of any kind.
          </p>
          <p className="mt-2">
            You agree not to use the Site to attempt to disrupt, reverse engineer for malicious purposes, or
            gain unauthorized access to any part of the Site or its infrastructure.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">3. No warranty</h2>
          <p>
            While we aim for accuracy and reliability, {siteConfig.name} makes no guarantees that any tool's
            output is error-free or fit for a particular purpose. You are responsible for verifying results
            before relying on them, especially in production or security-sensitive contexts.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">4. Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, {siteConfig.name} and its operator shall not be liable for
            any indirect, incidental, or consequential damages arising from your use of, or inability to use,
            the Site or its tools.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">5. Your content</h2>
          <p>
            Data you enter into a tool is processed locally in your browser and is not transmitted to or
            stored by us (see our{" "}
            <a href="/privacy" className="font-medium text-foreground underline">
              Privacy Policy
            </a>{" "}
            for details). You retain full ownership and responsibility for any content you process using the
            Site.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">6. Third-party advertising</h2>
          <p>
            The Site may display advertisements served by third parties (e.g. Google AdSense) to help fund
            free access to the tools. We are not responsible for the content of third-party ads.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">7. Changes to the service or terms</h2>
          <p>
            We may modify, suspend, or discontinue any part of the Site at any time, and may update these
            Terms periodically. Continued use of the Site after changes constitutes acceptance of the revised
            Terms.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">8. Contact</h2>
          <p>
            Questions about these Terms? Email{" "}
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
