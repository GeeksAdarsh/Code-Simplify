"use client";

import { useCallback } from "react";
import { formatApacheConfig } from "@/lib/apache-utils";
import { ConvertTool, type ConvertResult } from "@/components/tools/shared/convert-tool";

const SAMPLE = `<VirtualHost *:80>
ServerName example.com
DocumentRoot /var/www/example
<Directory /var/www/example>
Options -Indexes +FollowSymLinks
AllowOverride All
Require all granted
</Directory>
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>
</VirtualHost>
`;

export function ApacheConfigFormatterTool() {
  const convert = useCallback((input: string): ConvertResult => {
    try {
      return { output: formatApacheConfig(input) };
    } catch (e) {
      return { output: "", error: e instanceof Error ? e.message : "Could not format this config." };
    }
  }, []);

  return (
    <ConvertTool
      sampleInput={SAMPLE}
      convert={convert}
      inputLabel="Apache config input"
      outputLabel="Formatted output"
      inputPlaceholder="Paste your httpd.conf or .htaccess content here..."
      outputPlaceholder="Formatted config will appear here."
      downloadFilename="httpd.conf"
      downloadMimeType="text/plain"
    />
  );
}
