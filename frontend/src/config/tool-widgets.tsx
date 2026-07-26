"use client";

import type { ReactNode } from "react";
import dynamic from "next/dynamic";

/** Shown briefly while a tool's client bundle loads (each tool is code-split into its own chunk). */
function ToolWidgetLoading() {
  return (
    <div className="flex h-64 items-center justify-center rounded-xl border border-border bg-surface text-sm text-muted">
      Loading tool&hellip;
    </div>
  );
}

const JsonFormatterTool = dynamic(() => import("@/components/tools/json-formatter-tool").then((m) => m.JsonFormatterTool), { ssr: false, loading: ToolWidgetLoading });
const JsonValidatorTool = dynamic(() => import("@/components/tools/json-validator-tool").then((m) => m.JsonValidatorTool), { ssr: false, loading: ToolWidgetLoading });
const JsonMinifierTool = dynamic(() => import("@/components/tools/json-minifier-tool").then((m) => m.JsonMinifierTool), { ssr: false, loading: ToolWidgetLoading });
const JsonDiffTool = dynamic(() => import("@/components/tools/json-diff-tool").then((m) => m.JsonDiffTool), { ssr: false, loading: ToolWidgetLoading });
const JsonCompareTool = dynamic(() => import("@/components/tools/json-compare-tool").then((m) => m.JsonCompareTool), { ssr: false, loading: ToolWidgetLoading });
const JsonViewerTool = dynamic(() => import("@/components/tools/json-viewer-tool").then((m) => m.JsonViewerTool), { ssr: false, loading: ToolWidgetLoading });
const JsonTreeViewerTool = dynamic(() => import("@/components/tools/json-tree-viewer-tool").then((m) => m.JsonTreeViewerTool), { ssr: false, loading: ToolWidgetLoading });
const JsonToXmlTool = dynamic(() => import("@/components/tools/json-to-xml-tool").then((m) => m.JsonToXmlTool), { ssr: false, loading: ToolWidgetLoading });
const JsonToYamlTool = dynamic(() => import("@/components/tools/json-to-yaml-tool").then((m) => m.JsonToYamlTool), { ssr: false, loading: ToolWidgetLoading });
const JsonToCsvTool = dynamic(() => import("@/components/tools/json-to-csv-tool").then((m) => m.JsonToCsvTool), { ssr: false, loading: ToolWidgetLoading });
const JsonToExcelTool = dynamic(() => import("@/components/tools/json-to-excel-tool").then((m) => m.JsonToExcelTool), { ssr: false, loading: ToolWidgetLoading });
const JsonToJavaTool = dynamic(() => import("@/components/tools/json-to-java-tool").then((m) => m.JsonToJavaTool), { ssr: false, loading: ToolWidgetLoading });
const JsonToCSharpTool = dynamic(() => import("@/components/tools/json-to-csharp-tool").then((m) => m.JsonToCSharpTool), { ssr: false, loading: ToolWidgetLoading });
const JsonToPhpTool = dynamic(() => import("@/components/tools/json-to-php-tool").then((m) => m.JsonToPhpTool), { ssr: false, loading: ToolWidgetLoading });
const JsonToTypeScriptTool = dynamic(() => import("@/components/tools/json-to-typescript-tool").then((m) => m.JsonToTypeScriptTool), { ssr: false, loading: ToolWidgetLoading });
const JsonToKotlinTool = dynamic(() => import("@/components/tools/json-to-kotlin-tool").then((m) => m.JsonToKotlinTool), { ssr: false, loading: ToolWidgetLoading });
const JsonToDartTool = dynamic(() => import("@/components/tools/json-to-dart-tool").then((m) => m.JsonToDartTool), { ssr: false, loading: ToolWidgetLoading });
const JsonEscapeUnescapeTool = dynamic(() => import("@/components/tools/json-escape-unescape-tool").then((m) => m.JsonEscapeUnescapeTool), { ssr: false, loading: ToolWidgetLoading });
const XmlFormatterTool = dynamic(() => import("@/components/tools/xml-formatter-tool").then((m) => m.XmlFormatterTool), { ssr: false, loading: ToolWidgetLoading });
const XmlValidatorTool = dynamic(() => import("@/components/tools/xml-validator-tool").then((m) => m.XmlValidatorTool), { ssr: false, loading: ToolWidgetLoading });
const XmlMinifierTool = dynamic(() => import("@/components/tools/xml-minifier-tool").then((m) => m.XmlMinifierTool), { ssr: false, loading: ToolWidgetLoading });
const XmlToJsonTool = dynamic(() => import("@/components/tools/xml-to-json-tool").then((m) => m.XmlToJsonTool), { ssr: false, loading: ToolWidgetLoading });
const XmlToCsvTool = dynamic(() => import("@/components/tools/xml-to-csv-tool").then((m) => m.XmlToCsvTool), { ssr: false, loading: ToolWidgetLoading });
const XmlViewerTool = dynamic(() => import("@/components/tools/xml-viewer-tool").then((m) => m.XmlViewerTool), { ssr: false, loading: ToolWidgetLoading });
const XmlCompareTool = dynamic(() => import("@/components/tools/xml-compare-tool").then((m) => m.XmlCompareTool), { ssr: false, loading: ToolWidgetLoading });
const XPathTesterTool = dynamic(() => import("@/components/tools/xpath-tester-tool").then((m) => m.XPathTesterTool), { ssr: false, loading: ToolWidgetLoading });
const YamlFormatterTool = dynamic(() => import("@/components/tools/yaml-formatter-tool").then((m) => m.YamlFormatterTool), { ssr: false, loading: ToolWidgetLoading });
const YamlValidatorTool = dynamic(() => import("@/components/tools/yaml-validator-tool").then((m) => m.YamlValidatorTool), { ssr: false, loading: ToolWidgetLoading });
const YamlToJsonTool = dynamic(() => import("@/components/tools/yaml-to-json-tool").then((m) => m.YamlToJsonTool), { ssr: false, loading: ToolWidgetLoading });
const CsvViewerTool = dynamic(() => import("@/components/tools/csv-viewer-tool").then((m) => m.CsvViewerTool), { ssr: false, loading: ToolWidgetLoading });
const CsvFormatterTool = dynamic(() => import("@/components/tools/csv-formatter-tool").then((m) => m.CsvFormatterTool), { ssr: false, loading: ToolWidgetLoading });
const CsvToJsonTool = dynamic(() => import("@/components/tools/csv-to-json-tool").then((m) => m.CsvToJsonTool), { ssr: false, loading: ToolWidgetLoading });
const CsvToXmlTool = dynamic(() => import("@/components/tools/csv-to-xml-tool").then((m) => m.CsvToXmlTool), { ssr: false, loading: ToolWidgetLoading });
const CsvToExcelTool = dynamic(() => import("@/components/tools/csv-to-excel-tool").then((m) => m.CsvToExcelTool), { ssr: false, loading: ToolWidgetLoading });
const CsvCleanerTool = dynamic(() => import("@/components/tools/csv-cleaner-tool").then((m) => m.CsvCleanerTool), { ssr: false, loading: ToolWidgetLoading });
const CsvDiffTool = dynamic(() => import("@/components/tools/csv-diff-tool").then((m) => m.CsvDiffTool), { ssr: false, loading: ToolWidgetLoading });
const SqlFormatterTool = dynamic(() => import("@/components/tools/sql-formatter-tool").then((m) => m.SqlFormatterTool), { ssr: false, loading: ToolWidgetLoading });
const SqlMinifierTool = dynamic(() => import("@/components/tools/sql-minifier-tool").then((m) => m.SqlMinifierTool), { ssr: false, loading: ToolWidgetLoading });
const SqlValidatorTool = dynamic(() => import("@/components/tools/sql-validator-tool").then((m) => m.SqlValidatorTool), { ssr: false, loading: ToolWidgetLoading });
const SqlQueryBuilderTool = dynamic(() => import("@/components/tools/sql-query-builder-tool").then((m) => m.SqlQueryBuilderTool), { ssr: false, loading: ToolWidgetLoading });
const SqlKeywordCaseTool = dynamic(() => import("@/components/tools/sql-keyword-case-tool").then((m) => m.SqlKeywordCaseTool), { ssr: false, loading: ToolWidgetLoading });
const SqlToJsonTool = dynamic(() => import("@/components/tools/sql-to-json-tool").then((m) => m.SqlToJsonTool), { ssr: false, loading: ToolWidgetLoading });
const JsonToSqlTool = dynamic(() => import("@/components/tools/json-to-sql-tool").then((m) => m.JsonToSqlTool), { ssr: false, loading: ToolWidgetLoading });
const Base64EncodeTool = dynamic(() => import("@/components/tools/base64-encode-tool").then((m) => m.Base64EncodeTool), { ssr: false, loading: ToolWidgetLoading });
const Base64DecodeTool = dynamic(() => import("@/components/tools/base64-decode-tool").then((m) => m.Base64DecodeTool), { ssr: false, loading: ToolWidgetLoading });
const UrlEncodeTool = dynamic(() => import("@/components/tools/url-encode-tool").then((m) => m.UrlEncodeTool), { ssr: false, loading: ToolWidgetLoading });
const UrlDecodeTool = dynamic(() => import("@/components/tools/url-decode-tool").then((m) => m.UrlDecodeTool), { ssr: false, loading: ToolWidgetLoading });
const JwtDecoderTool = dynamic(() => import("@/components/tools/jwt-decoder-tool").then((m) => m.JwtDecoderTool), { ssr: false, loading: ToolWidgetLoading });
const JwtGeneratorTool = dynamic(() => import("@/components/tools/jwt-generator-tool").then((m) => m.JwtGeneratorTool), { ssr: false, loading: ToolWidgetLoading });
const Md5GeneratorTool = dynamic(() => import("@/components/tools/md5-generator-tool").then((m) => m.Md5GeneratorTool), { ssr: false, loading: ToolWidgetLoading });
const Sha1GeneratorTool = dynamic(() => import("@/components/tools/sha1-generator-tool").then((m) => m.Sha1GeneratorTool), { ssr: false, loading: ToolWidgetLoading });
const Sha256GeneratorTool = dynamic(() => import("@/components/tools/sha256-generator-tool").then((m) => m.Sha256GeneratorTool), { ssr: false, loading: ToolWidgetLoading });
const Sha512GeneratorTool = dynamic(() => import("@/components/tools/sha512-generator-tool").then((m) => m.Sha512GeneratorTool), { ssr: false, loading: ToolWidgetLoading });
const HmacGeneratorTool = dynamic(() => import("@/components/tools/hmac-generator-tool").then((m) => m.HmacGeneratorTool), { ssr: false, loading: ToolWidgetLoading });
const BcryptGeneratorTool = dynamic(() => import("@/components/tools/bcrypt-generator-tool").then((m) => m.BcryptGeneratorTool), { ssr: false, loading: ToolWidgetLoading });
const PasswordGeneratorTool = dynamic(() => import("@/components/tools/password-generator-tool").then((m) => m.PasswordGeneratorTool), { ssr: false, loading: ToolWidgetLoading });
const PasswordStrengthTool = dynamic(() => import("@/components/tools/password-strength-tool").then((m) => m.PasswordStrengthTool), { ssr: false, loading: ToolWidgetLoading });
const RandomTokenGeneratorTool = dynamic(() => import("@/components/tools/random-token-generator-tool").then((m) => m.RandomTokenGeneratorTool), { ssr: false, loading: ToolWidgetLoading });
const UuidGeneratorTool = dynamic(() => import("@/components/tools/uuid-generator-tool").then((m) => m.UuidGeneratorTool), { ssr: false, loading: ToolWidgetLoading });
const GuidGeneratorTool = dynamic(() => import("@/components/tools/guid-generator-tool").then((m) => m.GuidGeneratorTool), { ssr: false, loading: ToolWidgetLoading });
const NanoIdTool = dynamic(() => import("@/components/tools/nano-id-tool").then((m) => m.NanoIdTool), { ssr: false, loading: ToolWidgetLoading });
const RandomStringTool = dynamic(() => import("@/components/tools/random-string-tool").then((m) => m.RandomStringTool), { ssr: false, loading: ToolWidgetLoading });
const RandomNumberTool = dynamic(() => import("@/components/tools/random-number-tool").then((m) => m.RandomNumberTool), { ssr: false, loading: ToolWidgetLoading });
const HtmlFormatterTool = dynamic(() => import("@/components/tools/html-formatter-tool").then((m) => m.HtmlFormatterTool), { ssr: false, loading: ToolWidgetLoading });
const HtmlMinifierTool = dynamic(() => import("@/components/tools/html-minifier-tool").then((m) => m.HtmlMinifierTool), { ssr: false, loading: ToolWidgetLoading });
const HtmlEncoderTool = dynamic(() => import("@/components/tools/html-encoder-tool").then((m) => m.HtmlEncoderTool), { ssr: false, loading: ToolWidgetLoading });
const HtmlDecoderTool = dynamic(() => import("@/components/tools/html-decoder-tool").then((m) => m.HtmlDecoderTool), { ssr: false, loading: ToolWidgetLoading });
const HtmlPreviewTool = dynamic(() => import("@/components/tools/html-preview-tool").then((m) => m.HtmlPreviewTool), { ssr: false, loading: ToolWidgetLoading });
const HtmlEscapeTool = dynamic(() => import("@/components/tools/html-escape-tool").then((m) => m.HtmlEscapeTool), { ssr: false, loading: ToolWidgetLoading });
const CssFormatterTool = dynamic(() => import("@/components/tools/css-formatter-tool").then((m) => m.CssFormatterTool), { ssr: false, loading: ToolWidgetLoading });
const CssMinifierTool = dynamic(() => import("@/components/tools/css-minifier-tool").then((m) => m.CssMinifierTool), { ssr: false, loading: ToolWidgetLoading });
const CssGridGeneratorTool = dynamic(() => import("@/components/tools/css-grid-generator-tool").then((m) => m.CssGridGeneratorTool), { ssr: false, loading: ToolWidgetLoading });
const CssFlexboxGeneratorTool = dynamic(() => import("@/components/tools/css-flexbox-generator-tool").then((m) => m.CssFlexboxGeneratorTool), { ssr: false, loading: ToolWidgetLoading });
const CssBorderRadiusGeneratorTool = dynamic(() => import("@/components/tools/css-border-radius-generator-tool").then((m) => m.CssBorderRadiusGeneratorTool), { ssr: false, loading: ToolWidgetLoading });
const CssBoxShadowGeneratorTool = dynamic(() => import("@/components/tools/css-box-shadow-generator-tool").then((m) => m.CssBoxShadowGeneratorTool), { ssr: false, loading: ToolWidgetLoading });
const CssTextShadowGeneratorTool = dynamic(() => import("@/components/tools/css-text-shadow-generator-tool").then((m) => m.CssTextShadowGeneratorTool), { ssr: false, loading: ToolWidgetLoading });
const CssGradientGeneratorTool = dynamic(() => import("@/components/tools/css-gradient-generator-tool").then((m) => m.CssGradientGeneratorTool), { ssr: false, loading: ToolWidgetLoading });
const CssClipPathGeneratorTool = dynamic(() => import("@/components/tools/css-clip-path-generator-tool").then((m) => m.CssClipPathGeneratorTool), { ssr: false, loading: ToolWidgetLoading });
const JsFormatterTool = dynamic(() => import("@/components/tools/js-formatter-tool").then((m) => m.JsFormatterTool), { ssr: false, loading: ToolWidgetLoading });
const JsMinifierTool = dynamic(() => import("@/components/tools/js-minifier-tool").then((m) => m.JsMinifierTool), { ssr: false, loading: ToolWidgetLoading });
const JsObfuscatorTool = dynamic(() => import("@/components/tools/js-obfuscator-tool").then((m) => m.JsObfuscatorTool), { ssr: false, loading: ToolWidgetLoading });
const JsDeobfuscatorTool = dynamic(() => import("@/components/tools/js-deobfuscator-tool").then((m) => m.JsDeobfuscatorTool), { ssr: false, loading: ToolWidgetLoading });
const JsPlaygroundTool = dynamic(() => import("@/components/tools/js-playground-tool").then((m) => m.JsPlaygroundTool), { ssr: false, loading: ToolWidgetLoading });
const TsFormatterTool = dynamic(() => import("@/components/tools/ts-formatter-tool").then((m) => m.TsFormatterTool), { ssr: false, loading: ToolWidgetLoading });
const TsPlaygroundTool = dynamic(() => import("@/components/tools/ts-playground-tool").then((m) => m.TsPlaygroundTool), { ssr: false, loading: ToolWidgetLoading });
const TsToJsTool = dynamic(() => import("@/components/tools/ts-to-js-tool").then((m) => m.TsToJsTool), { ssr: false, loading: ToolWidgetLoading });
const JavaFormatterTool = dynamic(() => import("@/components/tools/java-formatter-tool").then((m) => m.JavaFormatterTool), { ssr: false, loading: ToolWidgetLoading });
const JavaEscapeUnescapeTool = dynamic(() => import("@/components/tools/java-escape-unescape-tool").then((m) => m.JavaEscapeUnescapeTool), { ssr: false, loading: ToolWidgetLoading });
const PythonFormatterTool = dynamic(() => import("@/components/tools/python-formatter-tool").then((m) => m.PythonFormatterTool), { ssr: false, loading: ToolWidgetLoading });
const PythonMinifierTool = dynamic(() => import("@/components/tools/python-minifier-tool").then((m) => m.PythonMinifierTool), { ssr: false, loading: ToolWidgetLoading });
const PhpFormatterTool = dynamic(() => import("@/components/tools/php-formatter-tool").then((m) => m.PhpFormatterTool), { ssr: false, loading: ToolWidgetLoading });
const RustFormatterTool = dynamic(() => import("@/components/tools/rust-formatter-tool").then((m) => m.RustFormatterTool), { ssr: false, loading: ToolWidgetLoading });
const GoFormatterTool = dynamic(() => import("@/components/tools/go-formatter-tool").then((m) => m.GoFormatterTool), { ssr: false, loading: ToolWidgetLoading });
const MarkdownPreviewTool = dynamic(() => import("@/components/tools/markdown-preview-tool").then((m) => m.MarkdownPreviewTool), { ssr: false, loading: ToolWidgetLoading });
const MarkdownToHtmlTool = dynamic(() => import("@/components/tools/markdown-to-html-tool").then((m) => m.MarkdownToHtmlTool), { ssr: false, loading: ToolWidgetLoading });
const HtmlToMarkdownTool = dynamic(() => import("@/components/tools/html-to-markdown-tool").then((m) => m.HtmlToMarkdownTool), { ssr: false, loading: ToolWidgetLoading });
const MarkdownFormatterTool = dynamic(() => import("@/components/tools/markdown-formatter-tool").then((m) => m.MarkdownFormatterTool), { ssr: false, loading: ToolWidgetLoading });
const EmailValidatorTool = dynamic(() => import("@/components/tools/email-validator-tool").then((m) => m.EmailValidatorTool), { ssr: false, loading: ToolWidgetLoading });
const EmailHeaderAnalyzerTool = dynamic(() => import("@/components/tools/email-header-analyzer-tool").then((m) => m.EmailHeaderAnalyzerTool), { ssr: false, loading: ToolWidgetLoading });
const EmailSignatureGeneratorTool = dynamic(() => import("@/components/tools/email-signature-generator-tool").then((m) => m.EmailSignatureGeneratorTool), { ssr: false, loading: ToolWidgetLoading });
const HttpHeaderViewerTool = dynamic(() => import("@/components/tools/http-header-viewer-tool").then((m) => m.HttpHeaderViewerTool), { ssr: false, loading: ToolWidgetLoading });
const UserAgentParserTool = dynamic(() => import("@/components/tools/user-agent-parser-tool").then((m) => m.UserAgentParserTool), { ssr: false, loading: ToolWidgetLoading });
const IpLookupTool = dynamic(() => import("@/components/tools/ip-lookup-tool").then((m) => m.IpLookupTool), { ssr: false, loading: ToolWidgetLoading });
const CidrCalculatorTool = dynamic(() => import("@/components/tools/cidr-calculator-tool").then((m) => m.CidrCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const SubnetCalculatorTool = dynamic(() => import("@/components/tools/subnet-calculator-tool").then((m) => m.SubnetCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const PortLookupTool = dynamic(() => import("@/components/tools/port-lookup-tool").then((m) => m.PortLookupTool), { ssr: false, loading: ToolWidgetLoading });
const DnsLookupTool = dynamic(() => import("@/components/tools/dns-lookup-tool").then((m) => m.DnsLookupTool), { ssr: false, loading: ToolWidgetLoading });
const WhoisLookupTool = dynamic(() => import("@/components/tools/whois-lookup-tool").then((m) => m.WhoisLookupTool), { ssr: false, loading: ToolWidgetLoading });
const DockerComposeValidatorTool = dynamic(() => import("@/components/tools/docker-compose-validator-tool").then((m) => m.DockerComposeValidatorTool), { ssr: false, loading: ToolWidgetLoading });
const DockerfileLinterTool = dynamic(() => import("@/components/tools/dockerfile-linter-tool").then((m) => m.DockerfileLinterTool), { ssr: false, loading: ToolWidgetLoading });
const K8sYamlValidatorTool = dynamic(() => import("@/components/tools/k8s-yaml-validator-tool").then((m) => m.K8sYamlValidatorTool), { ssr: false, loading: ToolWidgetLoading });
const K8sManifestGeneratorTool = dynamic(() => import("@/components/tools/k8s-manifest-generator-tool").then((m) => m.K8sManifestGeneratorTool), { ssr: false, loading: ToolWidgetLoading });
const NginxConfigTesterTool = dynamic(() => import("@/components/tools/nginx-config-tester-tool").then((m) => m.NginxConfigTesterTool), { ssr: false, loading: ToolWidgetLoading });
const ApacheConfigFormatterTool = dynamic(() => import("@/components/tools/apache-config-formatter-tool").then((m) => m.ApacheConfigFormatterTool), { ssr: false, loading: ToolWidgetLoading });
const AwsArnParserTool = dynamic(() => import("@/components/tools/aws-arn-parser-tool").then((m) => m.AwsArnParserTool), { ssr: false, loading: ToolWidgetLoading });
const AwsIamPolicyFormatterTool = dynamic(() => import("@/components/tools/aws-iam-policy-formatter-tool").then((m) => m.AwsIamPolicyFormatterTool), { ssr: false, loading: ToolWidgetLoading });
const AwsCronConverterTool = dynamic(() => import("@/components/tools/aws-cron-converter-tool").then((m) => m.AwsCronConverterTool), { ssr: false, loading: ToolWidgetLoading });
const S3UrlParserTool = dynamic(() => import("@/components/tools/s3-url-parser-tool").then((m) => m.S3UrlParserTool), { ssr: false, loading: ToolWidgetLoading });
const OAuthUrlBuilderTool = dynamic(() => import("@/components/tools/oauth-url-builder-tool").then((m) => m.OAuthUrlBuilderTool), { ssr: false, loading: ToolWidgetLoading });
const PkceGeneratorTool = dynamic(() => import("@/components/tools/pkce-generator-tool").then((m) => m.PkceGeneratorTool), { ssr: false, loading: ToolWidgetLoading });
const TotpGeneratorTool = dynamic(() => import("@/components/tools/totp-generator-tool").then((m) => m.TotpGeneratorTool), { ssr: false, loading: ToolWidgetLoading });
const ApiKeyGeneratorTool = dynamic(() => import("@/components/tools/api-key-generator-tool").then((m) => m.ApiKeyGeneratorTool), { ssr: false, loading: ToolWidgetLoading });
const HttpStatusLookupTool = dynamic(() => import("@/components/tools/http-status-lookup-tool").then((m) => m.HttpStatusLookupTool), { ssr: false, loading: ToolWidgetLoading });
const MimeTypeLookupTool = dynamic(() => import("@/components/tools/mime-type-lookup-tool").then((m) => m.MimeTypeLookupTool), { ssr: false, loading: ToolWidgetLoading });
const MimeDetectorTool = dynamic(() => import("@/components/tools/mime-detector-tool").then((m) => m.MimeDetectorTool), { ssr: false, loading: ToolWidgetLoading });
const CspGeneratorTool = dynamic(() => import("@/components/tools/csp-generator-tool").then((m) => m.CspGeneratorTool), { ssr: false, loading: ToolWidgetLoading });
const CorsHeaderGeneratorTool = dynamic(() => import("@/components/tools/cors-header-generator-tool").then((m) => m.CorsHeaderGeneratorTool), { ssr: false, loading: ToolWidgetLoading });
const CspValidatorTool = dynamic(() => import("@/components/tools/csp-validator-tool").then((m) => m.CspValidatorTool), { ssr: false, loading: ToolWidgetLoading });
const MongoQueryFormatterTool = dynamic(() => import("@/components/tools/mongo-query-formatter-tool").then((m) => m.MongoQueryFormatterTool), { ssr: false, loading: ToolWidgetLoading });
const MongoObjectIdGeneratorTool = dynamic(() => import("@/components/tools/mongo-objectid-generator-tool").then((m) => m.MongoObjectIdGeneratorTool), { ssr: false, loading: ToolWidgetLoading });
const RedisCommandBuilderTool = dynamic(() => import("@/components/tools/redis-command-builder-tool").then((m) => m.RedisCommandBuilderTool), { ssr: false, loading: ToolWidgetLoading });
const PostgresqlFormatterTool = dynamic(() => import("@/components/tools/postgresql-formatter-tool").then((m) => m.PostgresqlFormatterTool), { ssr: false, loading: ToolWidgetLoading });
const PromptFormatterTool = dynamic(() => import("@/components/tools/prompt-formatter-tool").then((m) => m.PromptFormatterTool), { ssr: false, loading: ToolWidgetLoading });
const PromptTokenCounterTool = dynamic(() => import("@/components/tools/prompt-token-counter-tool").then((m) => m.PromptTokenCounterTool), { ssr: false, loading: ToolWidgetLoading });
const OpenAiSchemaValidatorTool = dynamic(() => import("@/components/tools/openai-schema-validator-tool").then((m) => m.OpenAiSchemaValidatorTool), { ssr: false, loading: ToolWidgetLoading });
const EmbeddingTokenCounterTool = dynamic(() => import("@/components/tools/embedding-token-counter-tool").then((m) => m.EmbeddingTokenCounterTool), { ssr: false, loading: ToolWidgetLoading });
const ColorPickerTool = dynamic(() => import("@/components/tools/color-picker-tool").then((m) => m.ColorPickerTool), { ssr: false, loading: ToolWidgetLoading });
const HexRgbTool = dynamic(() => import("@/components/tools/hex-rgb-tool").then((m) => m.HexRgbTool), { ssr: false, loading: ToolWidgetLoading });
const RgbHslTool = dynamic(() => import("@/components/tools/rgb-hsl-tool").then((m) => m.RgbHslTool), { ssr: false, loading: ToolWidgetLoading });
const RgbCmykTool = dynamic(() => import("@/components/tools/rgb-cmyk-tool").then((m) => m.RgbCmykTool), { ssr: false, loading: ToolWidgetLoading });
const HexCmykTool = dynamic(() => import("@/components/tools/hex-cmyk-tool").then((m) => m.HexCmykTool), { ssr: false, loading: ToolWidgetLoading });
const HexHsvTool = dynamic(() => import("@/components/tools/hex-hsv-tool").then((m) => m.HexHsvTool), { ssr: false, loading: ToolWidgetLoading });
const ColorGradientGeneratorTool = dynamic(() => import("@/components/tools/color-gradient-generator-tool").then((m) => m.ColorGradientGeneratorTool), { ssr: false, loading: ToolWidgetLoading });
const PaletteGeneratorTool = dynamic(() => import("@/components/tools/palette-generator-tool").then((m) => m.PaletteGeneratorTool), { ssr: false, loading: ToolWidgetLoading });
const ContrastCheckerTool = dynamic(() => import("@/components/tools/contrast-checker-tool").then((m) => m.ContrastCheckerTool), { ssr: false, loading: ToolWidgetLoading });
const ColorBlindnessSimulatorTool = dynamic(() => import("@/components/tools/color-blindness-simulator-tool").then((m) => m.ColorBlindnessSimulatorTool), { ssr: false, loading: ToolWidgetLoading });
const QrGeneratorTool = dynamic(() => import("@/components/tools/qr-generator-tool").then((m) => m.QrGeneratorTool), { ssr: false, loading: ToolWidgetLoading });
const QrScannerTool = dynamic(() => import("@/components/tools/qr-scanner-tool").then((m) => m.QrScannerTool), { ssr: false, loading: ToolWidgetLoading });
const WifiQrTool = dynamic(() => import("@/components/tools/wifi-qr-tool").then((m) => m.WifiQrTool), { ssr: false, loading: ToolWidgetLoading });
const VCardQrTool = dynamic(() => import("@/components/tools/vcard-qr-tool").then((m) => m.VCardQrTool), { ssr: false, loading: ToolWidgetLoading });
const BarcodeGeneratorTool = dynamic(() => import("@/components/tools/barcode-generator-tool").then((m) => m.BarcodeGeneratorTool), { ssr: false, loading: ToolWidgetLoading });
const BarcodeReaderTool = dynamic(() => import("@/components/tools/barcode-reader-tool").then((m) => m.BarcodeReaderTool), { ssr: false, loading: ToolWidgetLoading });
const UnixTimestampTool = dynamic(() => import("@/components/tools/unix-timestamp-tool").then((m) => m.UnixTimestampTool), { ssr: false, loading: ToolWidgetLoading });
const DateDifferenceTool = dynamic(() => import("@/components/tools/date-difference-tool").then((m) => m.DateDifferenceTool), { ssr: false, loading: ToolWidgetLoading });
const AgeCalculatorTool = dynamic(() => import("@/components/tools/age-calculator-tool").then((m) => m.AgeCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const TimezoneConverterTool = dynamic(() => import("@/components/tools/timezone-converter-tool").then((m) => m.TimezoneConverterTool), { ssr: false, loading: ToolWidgetLoading });
const CronGeneratorTool = dynamic(() => import("@/components/tools/cron-generator-tool").then((m) => m.CronGeneratorTool), { ssr: false, loading: ToolWidgetLoading });
const CronParserTool = dynamic(() => import("@/components/tools/cron-parser-tool").then((m) => m.CronParserTool), { ssr: false, loading: ToolWidgetLoading });
const LeapYearCheckerTool = dynamic(() => import("@/components/tools/leap-year-checker-tool").then((m) => m.LeapYearCheckerTool), { ssr: false, loading: ToolWidgetLoading });
const WordCounterTool = dynamic(() => import("@/components/tools/word-counter-tool").then((m) => m.WordCounterTool), { ssr: false, loading: ToolWidgetLoading });
const CharacterCounterTool = dynamic(() => import("@/components/tools/character-counter-tool").then((m) => m.CharacterCounterTool), { ssr: false, loading: ToolWidgetLoading });
const LineCounterTool = dynamic(() => import("@/components/tools/line-counter-tool").then((m) => m.LineCounterTool), { ssr: false, loading: ToolWidgetLoading });
const DuplicateLineRemoverTool = dynamic(() => import("@/components/tools/duplicate-line-remover-tool").then((m) => m.DuplicateLineRemoverTool), { ssr: false, loading: ToolWidgetLoading });
const TextDiffTool = dynamic(() => import("@/components/tools/text-diff-tool").then((m) => m.TextDiffTool), { ssr: false, loading: ToolWidgetLoading });
const CaseConverterTool = dynamic(() => import("@/components/tools/case-converter-tool").then((m) => m.CaseConverterTool), { ssr: false, loading: ToolWidgetLoading });
const ReverseTextTool = dynamic(() => import("@/components/tools/reverse-text-tool").then((m) => m.ReverseTextTool), { ssr: false, loading: ToolWidgetLoading });
const SlugGeneratorTool = dynamic(() => import("@/components/tools/slug-generator-tool").then((m) => m.SlugGeneratorTool), { ssr: false, loading: ToolWidgetLoading });
const LoremIpsumTool = dynamic(() => import("@/components/tools/lorem-ipsum-tool").then((m) => m.LoremIpsumTool), { ssr: false, loading: ToolWidgetLoading });
const RemoveExtraSpacesTool = dynamic(() => import("@/components/tools/remove-extra-spaces-tool").then((m) => m.RemoveExtraSpacesTool), { ssr: false, loading: ToolWidgetLoading });
const TextSorterTool = dynamic(() => import("@/components/tools/text-sorter-tool").then((m) => m.TextSorterTool), { ssr: false, loading: ToolWidgetLoading });
const PercentageCalculatorTool = dynamic(() => import("@/components/tools/percentage-calculator-tool").then((m) => m.PercentageCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const PercentageDifferenceTool = dynamic(() => import("@/components/tools/percentage-difference-tool").then((m) => m.PercentageDifferenceTool), { ssr: false, loading: ToolWidgetLoading });
const ScientificCalculatorTool = dynamic(() => import("@/components/tools/scientific-calculator-tool").then((m) => m.ScientificCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const BmiCalculatorTool = dynamic(() => import("@/components/tools/bmi-calculator-tool").then((m) => m.BmiCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const UnitConverterTool = dynamic(() => import("@/components/tools/unit-converter-tool").then((m) => m.UnitConverterTool), { ssr: false, loading: ToolWidgetLoading });
const CurrencyConverterTool = dynamic(() => import("@/components/tools/currency-converter-tool").then((m) => m.CurrencyConverterTool), { ssr: false, loading: ToolWidgetLoading });
const DecimalBinaryTool = dynamic(() => import("@/components/tools/decimal-binary-tool").then((m) => m.DecimalBinaryTool), { ssr: false, loading: ToolWidgetLoading });
const DecimalHexTool = dynamic(() => import("@/components/tools/decimal-hex-tool").then((m) => m.DecimalHexTool), { ssr: false, loading: ToolWidgetLoading });
const DecimalOctalTool = dynamic(() => import("@/components/tools/decimal-octal-tool").then((m) => m.DecimalOctalTool), { ssr: false, loading: ToolWidgetLoading });
const RomanNumeralTool = dynamic(() => import("@/components/tools/roman-numeral-tool").then((m) => m.RomanNumeralTool), { ssr: false, loading: ToolWidgetLoading });
const RandomWordTool = dynamic(() => import("@/components/tools/random-word-tool").then((m) => m.RandomWordTool), { ssr: false, loading: ToolWidgetLoading });
const RandomLetterTool = dynamic(() => import("@/components/tools/random-letter-tool").then((m) => m.RandomLetterTool), { ssr: false, loading: ToolWidgetLoading });
const RandomColorTool = dynamic(() => import("@/components/tools/random-color-tool").then((m) => m.RandomColorTool), { ssr: false, loading: ToolWidgetLoading });
const RandomIpTool = dynamic(() => import("@/components/tools/random-ip-tool").then((m) => m.RandomIpTool), { ssr: false, loading: ToolWidgetLoading });
const RandomMacAddressTool = dynamic(() => import("@/components/tools/random-mac-address-tool").then((m) => m.RandomMacAddressTool), { ssr: false, loading: ToolWidgetLoading });
const RandomDateTool = dynamic(() => import("@/components/tools/random-date-tool").then((m) => m.RandomDateTool), { ssr: false, loading: ToolWidgetLoading });
const RandomTimeTool = dynamic(() => import("@/components/tools/random-time-tool").then((m) => m.RandomTimeTool), { ssr: false, loading: ToolWidgetLoading });
const RandomNameTool = dynamic(() => import("@/components/tools/random-name-tool").then((m) => m.RandomNameTool), { ssr: false, loading: ToolWidgetLoading });
const RandomUsernameTool = dynamic(() => import("@/components/tools/random-username-tool").then((m) => m.RandomUsernameTool), { ssr: false, loading: ToolWidgetLoading });
const RandomNicknameTool = dynamic(() => import("@/components/tools/random-nickname-tool").then((m) => m.RandomNicknameTool), { ssr: false, loading: ToolWidgetLoading });
const RandomEmojiTool = dynamic(() => import("@/components/tools/random-emoji-tool").then((m) => m.RandomEmojiTool), { ssr: false, loading: ToolWidgetLoading });
const RandomCreditCardTool = dynamic(() => import("@/components/tools/random-credit-card-tool").then((m) => m.RandomCreditCardTool), { ssr: false, loading: ToolWidgetLoading });
const RandomPhoneNumberTool = dynamic(() => import("@/components/tools/random-phone-number-tool").then((m) => m.RandomPhoneNumberTool), { ssr: false, loading: ToolWidgetLoading });
const RandomAddressTool = dynamic(() => import("@/components/tools/random-address-tool").then((m) => m.RandomAddressTool), { ssr: false, loading: ToolWidgetLoading });
const RandomAnimalTool = dynamic(() => import("@/components/tools/random-animal-tool").then((m) => m.RandomAnimalTool), { ssr: false, loading: ToolWidgetLoading });
const RandomCountryTool = dynamic(() => import("@/components/tools/random-country-tool").then((m) => m.RandomCountryTool), { ssr: false, loading: ToolWidgetLoading });
const RandomCityTool = dynamic(() => import("@/components/tools/random-city-tool").then((m) => m.RandomCityTool), { ssr: false, loading: ToolWidgetLoading });
const RandomFoodTool = dynamic(() => import("@/components/tools/random-food-tool").then((m) => m.RandomFoodTool), { ssr: false, loading: ToolWidgetLoading });
const RandomFruitTool = dynamic(() => import("@/components/tools/random-fruit-tool").then((m) => m.RandomFruitTool), { ssr: false, loading: ToolWidgetLoading });
const RandomVegetableTool = dynamic(() => import("@/components/tools/random-vegetable-tool").then((m) => m.RandomVegetableTool), { ssr: false, loading: ToolWidgetLoading });
const RandomDrinkTool = dynamic(() => import("@/components/tools/random-drink-tool").then((m) => m.RandomDrinkTool), { ssr: false, loading: ToolWidgetLoading });
const RandomMovieTool = dynamic(() => import("@/components/tools/random-movie-tool").then((m) => m.RandomMovieTool), { ssr: false, loading: ToolWidgetLoading });
const RandomTvShowTool = dynamic(() => import("@/components/tools/random-tv-show-tool").then((m) => m.RandomTvShowTool), { ssr: false, loading: ToolWidgetLoading });
const RandomBookTool = dynamic(() => import("@/components/tools/random-book-tool").then((m) => m.RandomBookTool), { ssr: false, loading: ToolWidgetLoading });
const RandomGameTool = dynamic(() => import("@/components/tools/random-game-tool").then((m) => m.RandomGameTool), { ssr: false, loading: ToolWidgetLoading });
const RandomPokemonTool = dynamic(() => import("@/components/tools/random-pokemon-tool").then((m) => m.RandomPokemonTool), { ssr: false, loading: ToolWidgetLoading });
const RandomDinosaurTool = dynamic(() => import("@/components/tools/random-dinosaur-tool").then((m) => m.RandomDinosaurTool), { ssr: false, loading: ToolWidgetLoading });
const RandomBirdTool = dynamic(() => import("@/components/tools/random-bird-tool").then((m) => m.RandomBirdTool), { ssr: false, loading: ToolWidgetLoading });
const RandomFlagTool = dynamic(() => import("@/components/tools/random-flag-tool").then((m) => m.RandomFlagTool), { ssr: false, loading: ToolWidgetLoading });
const SpinWheelTool = dynamic(() => import("@/components/tools/spin-wheel-tool").then((m) => m.SpinWheelTool), { ssr: false, loading: ToolWidgetLoading });
const YesOrNoTool = dynamic(() => import("@/components/tools/yes-or-no-tool").then((m) => m.YesOrNoTool), { ssr: false, loading: ToolWidgetLoading });
const CoinFlipTool = dynamic(() => import("@/components/tools/coin-flip-tool").then((m) => m.CoinFlipTool), { ssr: false, loading: ToolWidgetLoading });
const DiceRollerTool = dynamic(() => import("@/components/tools/dice-roller-tool").then((m) => m.DiceRollerTool), { ssr: false, loading: ToolWidgetLoading });
const NumberPickerTool = dynamic(() => import("@/components/tools/number-picker-tool").then((m) => m.NumberPickerTool), { ssr: false, loading: ToolWidgetLoading });
const TeamGeneratorTool = dynamic(() => import("@/components/tools/team-generator-tool").then((m) => m.TeamGeneratorTool), { ssr: false, loading: ToolWidgetLoading });
const RandomPickerTool = dynamic(() => import("@/components/tools/random-picker-tool").then((m) => m.RandomPickerTool), { ssr: false, loading: ToolWidgetLoading });
const SecretSantaTool = dynamic(() => import("@/components/tools/secret-santa-tool").then((m) => m.SecretSantaTool), { ssr: false, loading: ToolWidgetLoading });
const LoanEmiTool = dynamic(() => import("@/components/tools/loan-emi-tool").then((m) => m.LoanEmiTool), { ssr: false, loading: ToolWidgetLoading });
const LoanEligibilityTool = dynamic(() => import("@/components/tools/loan-eligibility-tool").then((m) => m.LoanEligibilityTool), { ssr: false, loading: ToolWidgetLoading });
const LoanAffordabilityTool = dynamic(() => import("@/components/tools/loan-affordability-tool").then((m) => m.LoanAffordabilityTool), { ssr: false, loading: ToolWidgetLoading });
const LoanComparisonTool = dynamic(() => import("@/components/tools/loan-comparison-tool").then((m) => m.LoanComparisonTool), { ssr: false, loading: ToolWidgetLoading });
const LoanPrepaymentTool = dynamic(() => import("@/components/tools/loan-prepayment-tool").then((m) => m.LoanPrepaymentTool), { ssr: false, loading: ToolWidgetLoading });
const SipCalculatorTool = dynamic(() => import("@/components/tools/sip-calculator-tool").then((m) => m.SipCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const FdCalculatorTool = dynamic(() => import("@/components/tools/fd-calculator-tool").then((m) => m.FdCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const RdCalculatorTool = dynamic(() => import("@/components/tools/rd-calculator-tool").then((m) => m.RdCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const PpfCalculatorTool = dynamic(() => import("@/components/tools/ppf-calculator-tool").then((m) => m.PpfCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const EpfCalculatorTool = dynamic(() => import("@/components/tools/epf-calculator-tool").then((m) => m.EpfCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const NpsCalculatorTool = dynamic(() => import("@/components/tools/nps-calculator-tool").then((m) => m.NpsCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const SukanyaCalculatorTool = dynamic(() => import("@/components/tools/sukanya-calculator-tool").then((m) => m.SukanyaCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const RetirementCalculatorTool = dynamic(() => import("@/components/tools/retirement-calculator-tool").then((m) => m.RetirementCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const FireCalculatorTool = dynamic(() => import("@/components/tools/fire-calculator-tool").then((m) => m.FireCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const PensionCalculatorTool = dynamic(() => import("@/components/tools/pension-calculator-tool").then((m) => m.PensionCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const FutureValueCalculatorTool = dynamic(() => import("@/components/tools/future-value-calculator-tool").then((m) => m.FutureValueCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const PresentValueCalculatorTool = dynamic(() => import("@/components/tools/present-value-calculator-tool").then((m) => m.PresentValueCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const IncomeTaxCalculatorTool = dynamic(() => import("@/components/tools/income-tax-calculator-tool").then((m) => m.IncomeTaxCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const GstCalculatorTool = dynamic(() => import("@/components/tools/gst-calculator-tool").then((m) => m.GstCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const HraCalculatorTool = dynamic(() => import("@/components/tools/hra-calculator-tool").then((m) => m.HraCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const CapitalGainsCalculatorTool = dynamic(() => import("@/components/tools/capital-gains-calculator-tool").then((m) => m.CapitalGainsCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const TdsCalculatorTool = dynamic(() => import("@/components/tools/tds-calculator-tool").then((m) => m.TdsCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const SalaryCalculatorTool = dynamic(() => import("@/components/tools/salary-calculator-tool").then((m) => m.SalaryCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const TakeHomeSalaryTool = dynamic(() => import("@/components/tools/take-home-salary-tool").then((m) => m.TakeHomeSalaryTool), { ssr: false, loading: ToolWidgetLoading });
const GoldPriceCalculatorTool = dynamic(() => import("@/components/tools/gold-price-calculator-tool").then((m) => m.GoldPriceCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const SilverPriceCalculatorTool = dynamic(() => import("@/components/tools/silver-price-calculator-tool").then((m) => m.SilverPriceCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const GstInvoiceGeneratorTool = dynamic(() => import("@/components/tools/gst-invoice-generator-tool").then((m) => m.GstInvoiceGeneratorTool), { ssr: false, loading: ToolWidgetLoading });
const ProfitMarginCalculatorTool = dynamic(() => import("@/components/tools/profit-margin-calculator-tool").then((m) => m.ProfitMarginCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const BreakEvenCalculatorTool = dynamic(() => import("@/components/tools/break-even-calculator-tool").then((m) => m.BreakEvenCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const DiscountCalculatorTool = dynamic(() => import("@/components/tools/discount-calculator-tool").then((m) => m.DiscountCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const CommissionCalculatorTool = dynamic(() => import("@/components/tools/commission-calculator-tool").then((m) => m.CommissionCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const VatCalculatorTool = dynamic(() => import("@/components/tools/vat-calculator-tool").then((m) => m.VatCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const InvoiceCalculatorTool = dynamic(() => import("@/components/tools/invoice-calculator-tool").then((m) => m.InvoiceCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const BudgetPlannerTool = dynamic(() => import("@/components/tools/budget-planner-tool").then((m) => m.BudgetPlannerTool), { ssr: false, loading: ToolWidgetLoading });
const ExpenseTrackerTool = dynamic(() => import("@/components/tools/expense-tracker-tool").then((m) => m.ExpenseTrackerTool), { ssr: false, loading: ToolWidgetLoading });
const NetWorthCalculatorTool = dynamic(() => import("@/components/tools/net-worth-calculator-tool").then((m) => m.NetWorthCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const EmergencyFundCalculatorTool = dynamic(() => import("@/components/tools/emergency-fund-calculator-tool").then((m) => m.EmergencyFundCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const DebtPayoffCalculatorTool = dynamic(() => import("@/components/tools/debt-payoff-calculator-tool").then((m) => m.DebtPayoffCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const CreditCardInterestCalculatorTool = dynamic(() => import("@/components/tools/credit-card-interest-calculator-tool").then((m) => m.CreditCardInterestCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const LifeInsuranceCalculatorTool = dynamic(() => import("@/components/tools/life-insurance-calculator-tool").then((m) => m.LifeInsuranceCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const HealthInsuranceEstimatorTool = dynamic(() => import("@/components/tools/health-insurance-estimator-tool").then((m) => m.HealthInsuranceEstimatorTool), { ssr: false, loading: ToolWidgetLoading });
const TermInsuranceNeedCalculatorTool = dynamic(() => import("@/components/tools/term-insurance-need-calculator-tool").then((m) => m.TermInsuranceNeedCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const StampDutyCalculatorTool = dynamic(() => import("@/components/tools/stamp-duty-calculator-tool").then((m) => m.StampDutyCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const RentalYieldCalculatorTool = dynamic(() => import("@/components/tools/rental-yield-calculator-tool").then((m) => m.RentalYieldCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const MortgageCalculatorTool = dynamic(() => import("@/components/tools/mortgage-calculator-tool").then((m) => m.MortgageCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const PropertyRoiCalculatorTool = dynamic(() => import("@/components/tools/property-roi-calculator-tool").then((m) => m.PropertyRoiCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const CryptoProfitCalculatorTool = dynamic(() => import("@/components/tools/crypto-profit-calculator-tool").then((m) => m.CryptoProfitCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const MiningProfitCalculatorTool = dynamic(() => import("@/components/tools/mining-profit-calculator-tool").then((m) => m.MiningProfitCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const SwpCalculatorTool = dynamic(() => import("@/components/tools/swp-calculator-tool").then((m) => m.SwpCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const LumpsumCalculatorTool = dynamic(() => import("@/components/tools/lumpsum-calculator-tool").then((m) => m.LumpsumCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const StepUpSipTool = dynamic(() => import("@/components/tools/step-up-sip-tool").then((m) => m.StepUpSipTool), { ssr: false, loading: ToolWidgetLoading });
const CagrCalculatorTool = dynamic(() => import("@/components/tools/cagr-calculator-tool").then((m) => m.CagrCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const XirrCalculatorTool = dynamic(() => import("@/components/tools/xirr-calculator-tool").then((m) => m.XirrCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const IrrCalculatorTool = dynamic(() => import("@/components/tools/irr-calculator-tool").then((m) => m.IrrCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const RoiCalculatorTool = dynamic(() => import("@/components/tools/roi-calculator-tool").then((m) => m.RoiCalculatorTool), { ssr: false, loading: ToolWidgetLoading });
const MutualFundReturnsTool = dynamic(() => import("@/components/tools/mutual-fund-returns-tool").then((m) => m.MutualFundReturnsTool), { ssr: false, loading: ToolWidgetLoading });
const StockAveragePriceTool = dynamic(() => import("@/components/tools/stock-average-price-tool").then((m) => m.StockAveragePriceTool), { ssr: false, loading: ToolWidgetLoading });

/**
 * Maps "category/tool" slugs to their interactive widget component.
 * Add an entry here each time a tool's functionality is implemented.
 */
export const toolWidgets: Record<string, () => ReactNode> = {
  "json/formatter": () => <JsonFormatterTool />,
  "json/beautifier": () => <JsonFormatterTool />,
  "json/validator": () => <JsonValidatorTool />,
  "json/minifier": () => <JsonMinifierTool />,
  "json/diff": () => <JsonDiffTool />,
  "json/compare": () => <JsonCompareTool />,
  "json/viewer": () => <JsonViewerTool />,
  "json/tree-viewer": () => <JsonTreeViewerTool />,
  "json/to-xml": () => <JsonToXmlTool />,
  "json/to-yaml": () => <JsonToYamlTool />,
  "json/to-csv": () => <JsonToCsvTool />,
  "json/to-excel": () => <JsonToExcelTool />,
  "json/to-java": () => <JsonToJavaTool />,
  "json/to-csharp": () => <JsonToCSharpTool />,
  "json/to-php": () => <JsonToPhpTool />,
  "json/to-typescript": () => <JsonToTypeScriptTool />,
  "json/to-kotlin": () => <JsonToKotlinTool />,
  "json/to-dart": () => <JsonToDartTool />,
  "json/escape-unescape": () => <JsonEscapeUnescapeTool />,
  "xml/formatter": () => <XmlFormatterTool />,
  "xml/validator": () => <XmlValidatorTool />,
  "xml/minifier": () => <XmlMinifierTool />,
  "xml/to-json": () => <XmlToJsonTool />,
  "xml/to-csv": () => <XmlToCsvTool />,
  "xml/viewer": () => <XmlViewerTool />,
  "xml/compare": () => <XmlCompareTool />,
  "xml/xpath-tester": () => <XPathTesterTool />,
  "yaml/formatter": () => <YamlFormatterTool />,
  "yaml/validator": () => <YamlValidatorTool />,
  "yaml/to-json": () => <YamlToJsonTool />,
  "yaml/from-json": () => <JsonToYamlTool />,
  "csv/viewer": () => <CsvViewerTool />,
  "csv/formatter": () => <CsvFormatterTool />,
  "csv/to-json": () => <CsvToJsonTool />,
  "csv/to-xml": () => <CsvToXmlTool />,
  "csv/to-excel": () => <CsvToExcelTool />,
  "csv/cleaner": () => <CsvCleanerTool />,
  "csv/diff": () => <CsvDiffTool />,
  "sql/formatter": () => <SqlFormatterTool />,
  "sql/beautifier": () => <SqlFormatterTool />,
  "sql/minifier": () => <SqlMinifierTool />,
  "sql/validator": () => <SqlValidatorTool />,
  "sql/query-builder": () => <SqlQueryBuilderTool />,
  "sql/uppercase": () => <SqlKeywordCaseTool targetCase="upper" />,
  "sql/lowercase": () => <SqlKeywordCaseTool targetCase="lower" />,
  "sql/to-json": () => <SqlToJsonTool />,
  "sql/from-json": () => <JsonToSqlTool />,
  "security/base64-encode": () => <Base64EncodeTool />,
  "security/base64-decode": () => <Base64DecodeTool />,
  "security/url-encode": () => <UrlEncodeTool />,
  "security/url-decode": () => <UrlDecodeTool />,
  "security/jwt-decoder": () => <JwtDecoderTool />,
  "security/jwt-generator": () => <JwtGeneratorTool />,
  "security/md5": () => <Md5GeneratorTool />,
  "security/sha1": () => <Sha1GeneratorTool />,
  "security/sha256": () => <Sha256GeneratorTool />,
  "security/sha512": () => <Sha512GeneratorTool />,
  "security/hmac": () => <HmacGeneratorTool />,
  "security/bcrypt": () => <BcryptGeneratorTool />,
  "security/password-generator": () => <PasswordGeneratorTool />,
  "security/password-strength": () => <PasswordStrengthTool />,
  "security/random-token": () => <RandomTokenGeneratorTool />,
  "ids/uuid-v1": () => <UuidGeneratorTool version="v1" />,
  "ids/uuid-v4": () => <UuidGeneratorTool version="v4" />,
  "ids/uuid-v7": () => <UuidGeneratorTool version="v7" />,
  "ids/guid": () => <GuidGeneratorTool />,
  "ids/nano-id": () => <NanoIdTool />,
  "ids/random-string": () => <RandomStringTool />,
  "ids/random-number": () => <RandomNumberTool />,
  "ids/random-password": () => <PasswordGeneratorTool />,
  "html/formatter": () => <HtmlFormatterTool />,
  "html/minifier": () => <HtmlMinifierTool />,
  "html/encoder": () => <HtmlEncoderTool />,
  "html/decoder": () => <HtmlDecoderTool />,
  "html/preview": () => <HtmlPreviewTool />,
  "html/escape": () => <HtmlEscapeTool />,
  "css/formatter": () => <CssFormatterTool />,
  "css/minifier": () => <CssMinifierTool />,
  "css/beautifier": () => <CssFormatterTool />,
  "css/grid-generator": () => <CssGridGeneratorTool />,
  "css/flexbox-generator": () => <CssFlexboxGeneratorTool />,
  "css/border-radius-generator": () => <CssBorderRadiusGeneratorTool />,
  "css/box-shadow-generator": () => <CssBoxShadowGeneratorTool />,
  "css/text-shadow-generator": () => <CssTextShadowGeneratorTool />,
  "css/gradient-generator": () => <CssGradientGeneratorTool />,
  "css/clip-path-generator": () => <CssClipPathGeneratorTool />,
  "javascript/formatter": () => <JsFormatterTool />,
  "javascript/minifier": () => <JsMinifierTool />,
  "javascript/beautifier": () => <JsFormatterTool />,
  "javascript/obfuscator": () => <JsObfuscatorTool />,
  "javascript/deobfuscator": () => <JsDeobfuscatorTool />,
  "javascript/playground": () => <JsPlaygroundTool />,
  "typescript/formatter": () => <TsFormatterTool />,
  "typescript/playground": () => <TsPlaygroundTool />,
  "typescript/to-js": () => <TsToJsTool />,
  "java/formatter": () => <JavaFormatterTool />,
  "java/escape-unescape": () => <JavaEscapeUnescapeTool />,
  "python/formatter": () => <PythonFormatterTool />,
  "python/minifier": () => <PythonMinifierTool />,
  "php/formatter": () => <PhpFormatterTool />,
  "php/beautifier": () => <PhpFormatterTool />,
  "rust/formatter": () => <RustFormatterTool />,
  "go/formatter": () => <GoFormatterTool />,
  "markdown/preview": () => <MarkdownPreviewTool />,
  "markdown/to-html": () => <MarkdownToHtmlTool />,
  "markdown/from-html": () => <HtmlToMarkdownTool />,
  "markdown/formatter": () => <MarkdownFormatterTool />,
  "email/validator": () => <EmailValidatorTool />,
  "email/header-analyzer": () => <EmailHeaderAnalyzerTool />,
  "email/signature-generator": () => <EmailSignatureGeneratorTool />,
  "networking/http-header-viewer": () => <HttpHeaderViewerTool />,
  "networking/user-agent-parser": () => <UserAgentParserTool />,
  "networking/ip-lookup": () => <IpLookupTool />,
  "networking/cidr-calculator": () => <CidrCalculatorTool />,
  "networking/subnet-calculator": () => <SubnetCalculatorTool />,
  "networking/port-lookup": () => <PortLookupTool />,
  "networking/dns-lookup": () => <DnsLookupTool />,
  "networking/whois-lookup": () => <WhoisLookupTool />,
  "devops/docker-compose-validator": () => <DockerComposeValidatorTool />,
  "devops/dockerfile-linter": () => <DockerfileLinterTool />,
  "devops/kubernetes-yaml-validator": () => <K8sYamlValidatorTool />,
  "devops/kubernetes-manifest-generator": () => <K8sManifestGeneratorTool />,
  "devops/helm-values-formatter": () => <YamlFormatterTool />,
  "devops/nginx-config-tester": () => <NginxConfigTesterTool />,
  "devops/apache-config-formatter": () => <ApacheConfigFormatterTool />,
  "cloud/aws-arn-parser": () => <AwsArnParserTool />,
  "cloud/aws-iam-policy-formatter": () => <AwsIamPolicyFormatterTool />,
  "cloud/aws-cron-converter": () => <AwsCronConverterTool />,
  "cloud/s3-url-parser": () => <S3UrlParserTool />,
  "authentication/oauth-url-builder": () => <OAuthUrlBuilderTool />,
  "authentication/pkce-generator": () => <PkceGeneratorTool />,
  "authentication/totp-generator": () => <TotpGeneratorTool />,
  "authentication/api-key-generator": () => <ApiKeyGeneratorTool />,
  "webdev/http-status-lookup": () => <HttpStatusLookupTool />,
  "webdev/mime-type-lookup": () => <MimeTypeLookupTool />,
  "webdev/mime-detector": () => <MimeDetectorTool />,
  "webdev/csp-generator": () => <CspGeneratorTool />,
  "webdev/cors-header-generator": () => <CorsHeaderGeneratorTool />,
  "webdev/csp-validator": () => <CspValidatorTool />,
  "database/mongodb-query-formatter": () => <MongoQueryFormatterTool />,
  "database/mongodb-objectid-generator": () => <MongoObjectIdGeneratorTool />,
  "database/redis-command-builder": () => <RedisCommandBuilderTool />,
  "database/postgresql-formatter": () => <PostgresqlFormatterTool />,
  "ai/prompt-formatter": () => <PromptFormatterTool />,
  "ai/prompt-token-counter": () => <PromptTokenCounterTool />,
  "ai/openai-schema-validator": () => <OpenAiSchemaValidatorTool />,
  "ai/embedding-token-counter": () => <EmbeddingTokenCounterTool />,
  "colors/picker": () => <ColorPickerTool />,
  "colors/hex-rgb": () => <HexRgbTool />,
  "colors/rgb-hsl": () => <RgbHslTool />,
  "colors/rgb-cmyk": () => <RgbCmykTool />,
  "colors/hex-cmyk": () => <HexCmykTool />,
  "colors/hex-hsv": () => <HexHsvTool />,
  "colors/gradient-generator": () => <ColorGradientGeneratorTool />,
  "colors/palette-generator": () => <PaletteGeneratorTool />,
  "colors/contrast-checker": () => <ContrastCheckerTool />,
  "colors/color-blindness-simulator": () => <ColorBlindnessSimulatorTool />,
  "qr-barcode/qr-generator": () => <QrGeneratorTool />,
  "qr-barcode/qr-scanner": () => <QrScannerTool />,
  "qr-barcode/wifi-qr": () => <WifiQrTool />,
  "qr-barcode/vcard-qr": () => <VCardQrTool />,
  "qr-barcode/barcode-generator": () => <BarcodeGeneratorTool />,
  "qr-barcode/barcode-reader": () => <BarcodeReaderTool />,
  "date-time/unix-timestamp": () => <UnixTimestampTool />,
  "date-time/date-difference": () => <DateDifferenceTool />,
  "date-time/age-calculator": () => <AgeCalculatorTool />,
  "date-time/timezone-converter": () => <TimezoneConverterTool />,
  "date-time/cron-generator": () => <CronGeneratorTool />,
  "date-time/cron-parser": () => <CronParserTool />,
  "date-time/leap-year-checker": () => <LeapYearCheckerTool />,
  "text/word-counter": () => <WordCounterTool />,
  "text/character-counter": () => <CharacterCounterTool />,
  "text/line-counter": () => <LineCounterTool />,
  "text/duplicate-line-remover": () => <DuplicateLineRemoverTool />,
  "text/diff": () => <TextDiffTool />,
  "text/case-converter": () => <CaseConverterTool />,
  "text/reverse-text": () => <ReverseTextTool />,
  "text/slug-generator": () => <SlugGeneratorTool />,
  "text/lorem-ipsum": () => <LoremIpsumTool />,
  "text/remove-extra-spaces": () => <RemoveExtraSpacesTool />,
  "text/text-sorter": () => <TextSorterTool />,
  "numbers/percentage-calculator": () => <PercentageCalculatorTool />,
  "numbers/percentage-difference": () => <PercentageDifferenceTool />,
  "numbers/scientific-calculator": () => <ScientificCalculatorTool />,
  "numbers/bmi-calculator": () => <BmiCalculatorTool />,
  "numbers/unit-converter": () => <UnitConverterTool />,
  "numbers/currency-converter": () => <CurrencyConverterTool />,
  "numbers/decimal-binary": () => <DecimalBinaryTool />,
  "numbers/decimal-hex": () => <DecimalHexTool />,
  "numbers/decimal-octal": () => <DecimalOctalTool />,
  "numbers/roman-numeral": () => <RomanNumeralTool />,
  "text/random-word": () => <RandomWordTool />,
  "text/random-letter": () => <RandomLetterTool />,
  "colors/random-color": () => <RandomColorTool />,
  "networking/random-ip": () => <RandomIpTool />,
  "networking/random-mac-address": () => <RandomMacAddressTool />,
  "date-time/random-date": () => <RandomDateTool />,
  "date-time/random-time": () => <RandomTimeTool />,
  "random-generators/random-name": () => <RandomNameTool />,
  "random-generators/random-username": () => <RandomUsernameTool />,
  "random-generators/random-nickname": () => <RandomNicknameTool />,
  "random-generators/random-emoji": () => <RandomEmojiTool />,
  "random-generators/random-credit-card": () => <RandomCreditCardTool />,
  "random-generators/random-phone-number": () => <RandomPhoneNumberTool />,
  "random-generators/random-address": () => <RandomAddressTool />,
  "fun/random-animal": () => <RandomAnimalTool />,
  "fun/random-country": () => <RandomCountryTool />,
  "fun/random-city": () => <RandomCityTool />,
  "fun/random-food": () => <RandomFoodTool />,
  "fun/random-fruit": () => <RandomFruitTool />,
  "fun/random-vegetable": () => <RandomVegetableTool />,
  "fun/random-drink": () => <RandomDrinkTool />,
  "fun/random-movie": () => <RandomMovieTool />,
  "fun/random-tv-show": () => <RandomTvShowTool />,
  "fun/random-book": () => <RandomBookTool />,
  "fun/random-game": () => <RandomGameTool />,
  "fun/random-pokemon": () => <RandomPokemonTool />,
  "fun/random-dinosaur": () => <RandomDinosaurTool />,
  "fun/random-bird": () => <RandomBirdTool />,
  "fun/random-flag": () => <RandomFlagTool />,
  "decision-tools/spin-wheel": () => <SpinWheelTool />,
  "decision-tools/yes-or-no": () => <YesOrNoTool />,
  "decision-tools/coin-flip": () => <CoinFlipTool />,
  "decision-tools/dice-roller": () => <DiceRollerTool />,
  "decision-tools/number-picker": () => <NumberPickerTool />,
  "decision-tools/team-generator": () => <TeamGeneratorTool />,
  "decision-tools/random-picker": () => <RandomPickerTool />,
  "decision-tools/secret-santa-generator": () => <SecretSantaTool />,
  "loan-calculators/emi-calculator": () => <LoanEmiTool defaultAmount={2000000} defaultRate={9.5} defaultTenureYears={20} />,
  "loan-calculators/loan-eligibility": () => <LoanEligibilityTool />,
  "loan-calculators/loan-affordability": () => <LoanAffordabilityTool />,
  "loan-calculators/loan-comparison": () => <LoanComparisonTool />,
  "loan-calculators/loan-prepayment": () => <LoanPrepaymentTool />,
  "loan-calculators/car-loan": () => (
    <LoanEmiTool amountLabel="Car price" defaultAmount={1000000} defaultRate={9} defaultTenureYears={7} maxTenureYears={10} showDownPayment />
  ),
  "loan-calculators/bike-loan": () => (
    <LoanEmiTool amountLabel="Bike price" defaultAmount={120000} defaultRate={11} defaultTenureYears={3} maxTenureYears={6} showDownPayment />
  ),
  "loan-calculators/home-loan": () => (
    <LoanEmiTool amountLabel="Home loan amount" defaultAmount={4000000} defaultRate={8.5} defaultTenureYears={20} maxTenureYears={30} />
  ),
  "loan-calculators/education-loan": () => (
    <LoanEmiTool amountLabel="Education loan amount" defaultAmount={1000000} defaultRate={10} defaultTenureYears={10} maxTenureYears={15} showMoratorium />
  ),
  "loan-calculators/personal-loan": () => (
    <LoanEmiTool amountLabel="Personal loan amount" defaultAmount={500000} defaultRate={13} defaultTenureYears={5} maxTenureYears={7} />
  ),
  "investment-calculators/sip-calculator": () => <SipCalculatorTool />,
  "investment-calculators/swp-calculator": () => <SwpCalculatorTool />,
  "investment-calculators/lumpsum-calculator": () => <LumpsumCalculatorTool />,
  "investment-calculators/step-up-sip": () => <StepUpSipTool />,
  "investment-calculators/cagr-calculator": () => <CagrCalculatorTool />,
  "investment-calculators/xirr-calculator": () => <XirrCalculatorTool />,
  "investment-calculators/irr-calculator": () => <IrrCalculatorTool />,
  "investment-calculators/roi-calculator": () => <RoiCalculatorTool />,
  "investment-calculators/mutual-fund-returns": () => <MutualFundReturnsTool />,
  "investment-calculators/stock-average-price": () => <StockAveragePriceTool />,
  "savings-calculators/fd-calculator": () => <FdCalculatorTool />,
  "savings-calculators/rd-calculator": () => <RdCalculatorTool />,
  "savings-calculators/ppf-calculator": () => <PpfCalculatorTool />,
  "savings-calculators/epf-calculator": () => <EpfCalculatorTool />,
  "savings-calculators/nps-calculator": () => <NpsCalculatorTool />,
  "savings-calculators/sukanya-calculator": () => <SukanyaCalculatorTool />,
  "retirement-calculators/retirement-calculator": () => <RetirementCalculatorTool />,
  "retirement-calculators/fire-calculator": () => <FireCalculatorTool />,
  "retirement-calculators/pension-calculator": () => <PensionCalculatorTool />,
  "retirement-calculators/future-value": () => <FutureValueCalculatorTool />,
  "retirement-calculators/present-value": () => <PresentValueCalculatorTool />,
  "tax-calculators/income-tax-calculator": () => <IncomeTaxCalculatorTool />,
  "tax-calculators/gst-calculator": () => <GstCalculatorTool />,
  "tax-calculators/hra-calculator": () => <HraCalculatorTool />,
  "tax-calculators/capital-gains-calculator": () => <CapitalGainsCalculatorTool />,
  "tax-calculators/tds-calculator": () => <TdsCalculatorTool />,
  "tax-calculators/salary-calculator": () => <SalaryCalculatorTool />,
  "tax-calculators/take-home-salary": () => <TakeHomeSalaryTool />,
  "currency-calculators/gold-price-calculator": () => <GoldPriceCalculatorTool />,
  "currency-calculators/silver-price-calculator": () => <SilverPriceCalculatorTool />,
  "business-calculators/gst-invoice-generator": () => <GstInvoiceGeneratorTool />,
  "business-calculators/profit-margin-calculator": () => <ProfitMarginCalculatorTool />,
  "business-calculators/break-even-calculator": () => <BreakEvenCalculatorTool />,
  "business-calculators/discount-calculator": () => <DiscountCalculatorTool />,
  "business-calculators/commission-calculator": () => <CommissionCalculatorTool />,
  "business-calculators/vat-calculator": () => <VatCalculatorTool />,
  "business-calculators/invoice-calculator": () => <InvoiceCalculatorTool />,
  "personal-finance-calculators/budget-planner": () => <BudgetPlannerTool />,
  "personal-finance-calculators/expense-tracker": () => <ExpenseTrackerTool />,
  "personal-finance-calculators/net-worth-calculator": () => <NetWorthCalculatorTool />,
  "personal-finance-calculators/emergency-fund-calculator": () => <EmergencyFundCalculatorTool />,
  "personal-finance-calculators/debt-payoff-calculator": () => <DebtPayoffCalculatorTool />,
  "personal-finance-calculators/credit-card-interest-calculator": () => <CreditCardInterestCalculatorTool />,
  "insurance-calculators/life-insurance-calculator": () => <LifeInsuranceCalculatorTool />,
  "insurance-calculators/health-insurance-estimator": () => <HealthInsuranceEstimatorTool />,
  "insurance-calculators/term-insurance-need-calculator": () => <TermInsuranceNeedCalculatorTool />,
  "real-estate-calculators/stamp-duty-calculator": () => <StampDutyCalculatorTool />,
  "real-estate-calculators/rental-yield-calculator": () => <RentalYieldCalculatorTool />,
  "real-estate-calculators/mortgage-calculator": () => <MortgageCalculatorTool />,
  "real-estate-calculators/property-roi": () => <PropertyRoiCalculatorTool />,
  "crypto-calculators/crypto-profit-calculator": () => <CryptoProfitCalculatorTool />,
  "crypto-calculators/mining-profit-calculator": () => <MiningProfitCalculatorTool />,
};

/**
 * Renders the widget for a given "category/tool" pair.
 * This must be rendered as a Component (e.g. `<ToolWidget .../>`) from a Server Component,
 * rather than calling `getToolWidget()` directly \u2014 this file is a Client Component
 * (required for `next/dynamic(..., { ssr: false })`), and Server Components can only
 * render functions from Client Component modules as JSX, not call them directly.
 */
export function ToolWidget({ categorySlug, toolSlug }: { categorySlug: string; toolSlug: string }): ReactNode {
  const render = toolWidgets[`${categorySlug}/${toolSlug}`];
  return render ? render() : null;
}
