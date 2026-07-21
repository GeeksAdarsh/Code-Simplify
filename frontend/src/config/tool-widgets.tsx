import type { ReactNode } from "react";
import { JsonFormatterTool } from "@/components/tools/json-formatter-tool";
import { JsonValidatorTool } from "@/components/tools/json-validator-tool";
import { JsonMinifierTool } from "@/components/tools/json-minifier-tool";
import { JsonDiffTool } from "@/components/tools/json-diff-tool";
import { JsonCompareTool } from "@/components/tools/json-compare-tool";
import { JsonViewerTool } from "@/components/tools/json-viewer-tool";
import { JsonTreeViewerTool } from "@/components/tools/json-tree-viewer-tool";
import { JsonToXmlTool } from "@/components/tools/json-to-xml-tool";
import { JsonToYamlTool } from "@/components/tools/json-to-yaml-tool";
import { JsonToCsvTool } from "@/components/tools/json-to-csv-tool";
import { JsonToExcelTool } from "@/components/tools/json-to-excel-tool";
import { JsonToJavaTool } from "@/components/tools/json-to-java-tool";
import { JsonToCSharpTool } from "@/components/tools/json-to-csharp-tool";
import { JsonToPhpTool } from "@/components/tools/json-to-php-tool";
import { JsonToTypeScriptTool } from "@/components/tools/json-to-typescript-tool";
import { JsonToKotlinTool } from "@/components/tools/json-to-kotlin-tool";
import { JsonToDartTool } from "@/components/tools/json-to-dart-tool";
import { JsonEscapeUnescapeTool } from "@/components/tools/json-escape-unescape-tool";
import { XmlFormatterTool } from "@/components/tools/xml-formatter-tool";
import { XmlValidatorTool } from "@/components/tools/xml-validator-tool";
import { XmlMinifierTool } from "@/components/tools/xml-minifier-tool";
import { XmlToJsonTool } from "@/components/tools/xml-to-json-tool";
import { XmlToCsvTool } from "@/components/tools/xml-to-csv-tool";
import { XmlViewerTool } from "@/components/tools/xml-viewer-tool";
import { XmlCompareTool } from "@/components/tools/xml-compare-tool";
import { XPathTesterTool } from "@/components/tools/xpath-tester-tool";
import { YamlFormatterTool } from "@/components/tools/yaml-formatter-tool";
import { YamlValidatorTool } from "@/components/tools/yaml-validator-tool";
import { YamlToJsonTool } from "@/components/tools/yaml-to-json-tool";
import { CsvViewerTool } from "@/components/tools/csv-viewer-tool";
import { CsvFormatterTool } from "@/components/tools/csv-formatter-tool";
import { CsvToJsonTool } from "@/components/tools/csv-to-json-tool";
import { CsvToXmlTool } from "@/components/tools/csv-to-xml-tool";
import { CsvToExcelTool } from "@/components/tools/csv-to-excel-tool";
import { CsvCleanerTool } from "@/components/tools/csv-cleaner-tool";
import { CsvDiffTool } from "@/components/tools/csv-diff-tool";
import { SqlFormatterTool } from "@/components/tools/sql-formatter-tool";
import { SqlMinifierTool } from "@/components/tools/sql-minifier-tool";
import { SqlValidatorTool } from "@/components/tools/sql-validator-tool";
import { SqlQueryBuilderTool } from "@/components/tools/sql-query-builder-tool";
import { SqlKeywordCaseTool } from "@/components/tools/sql-keyword-case-tool";
import { SqlToJsonTool } from "@/components/tools/sql-to-json-tool";
import { JsonToSqlTool } from "@/components/tools/json-to-sql-tool";
import { Base64EncodeTool } from "@/components/tools/base64-encode-tool";
import { Base64DecodeTool } from "@/components/tools/base64-decode-tool";
import { UrlEncodeTool } from "@/components/tools/url-encode-tool";
import { UrlDecodeTool } from "@/components/tools/url-decode-tool";
import { JwtDecoderTool } from "@/components/tools/jwt-decoder-tool";
import { JwtGeneratorTool } from "@/components/tools/jwt-generator-tool";
import { Md5GeneratorTool } from "@/components/tools/md5-generator-tool";
import { Sha1GeneratorTool } from "@/components/tools/sha1-generator-tool";
import { Sha256GeneratorTool } from "@/components/tools/sha256-generator-tool";
import { Sha512GeneratorTool } from "@/components/tools/sha512-generator-tool";
import { HmacGeneratorTool } from "@/components/tools/hmac-generator-tool";
import { BcryptGeneratorTool } from "@/components/tools/bcrypt-generator-tool";
import { PasswordGeneratorTool } from "@/components/tools/password-generator-tool";
import { PasswordStrengthTool } from "@/components/tools/password-strength-tool";
import { RandomTokenGeneratorTool } from "@/components/tools/random-token-generator-tool";
import { UuidGeneratorTool } from "@/components/tools/uuid-generator-tool";
import { GuidGeneratorTool } from "@/components/tools/guid-generator-tool";
import { NanoIdTool } from "@/components/tools/nano-id-tool";
import { RandomStringTool } from "@/components/tools/random-string-tool";
import { RandomNumberTool } from "@/components/tools/random-number-tool";
import { HtmlFormatterTool } from "@/components/tools/html-formatter-tool";
import { HtmlMinifierTool } from "@/components/tools/html-minifier-tool";
import { HtmlEncoderTool } from "@/components/tools/html-encoder-tool";
import { HtmlDecoderTool } from "@/components/tools/html-decoder-tool";
import { HtmlPreviewTool } from "@/components/tools/html-preview-tool";
import { HtmlEscapeTool } from "@/components/tools/html-escape-tool";
import { CssFormatterTool } from "@/components/tools/css-formatter-tool";
import { CssMinifierTool } from "@/components/tools/css-minifier-tool";
import { CssGridGeneratorTool } from "@/components/tools/css-grid-generator-tool";
import { CssFlexboxGeneratorTool } from "@/components/tools/css-flexbox-generator-tool";
import { CssBorderRadiusGeneratorTool } from "@/components/tools/css-border-radius-generator-tool";
import { CssBoxShadowGeneratorTool } from "@/components/tools/css-box-shadow-generator-tool";
import { CssTextShadowGeneratorTool } from "@/components/tools/css-text-shadow-generator-tool";
import { CssGradientGeneratorTool } from "@/components/tools/css-gradient-generator-tool";
import { CssClipPathGeneratorTool } from "@/components/tools/css-clip-path-generator-tool";
import { JsFormatterTool } from "@/components/tools/js-formatter-tool";
import { JsMinifierTool } from "@/components/tools/js-minifier-tool";
import { JsObfuscatorTool } from "@/components/tools/js-obfuscator-tool";
import { JsDeobfuscatorTool } from "@/components/tools/js-deobfuscator-tool";
import { JsPlaygroundTool } from "@/components/tools/js-playground-tool";
import { TsFormatterTool } from "@/components/tools/ts-formatter-tool";
import { TsPlaygroundTool } from "@/components/tools/ts-playground-tool";
import { TsToJsTool } from "@/components/tools/ts-to-js-tool";
import { JavaFormatterTool } from "@/components/tools/java-formatter-tool";
import { JavaEscapeUnescapeTool } from "@/components/tools/java-escape-unescape-tool";
import { PythonFormatterTool } from "@/components/tools/python-formatter-tool";
import { PythonMinifierTool } from "@/components/tools/python-minifier-tool";
import { PhpFormatterTool } from "@/components/tools/php-formatter-tool";
import { RustFormatterTool } from "@/components/tools/rust-formatter-tool";
import { GoFormatterTool } from "@/components/tools/go-formatter-tool";
import { MarkdownPreviewTool } from "@/components/tools/markdown-preview-tool";
import { MarkdownToHtmlTool } from "@/components/tools/markdown-to-html-tool";
import { HtmlToMarkdownTool } from "@/components/tools/html-to-markdown-tool";
import { MarkdownFormatterTool } from "@/components/tools/markdown-formatter-tool";
import { EmailValidatorTool } from "@/components/tools/email-validator-tool";
import { EmailHeaderAnalyzerTool } from "@/components/tools/email-header-analyzer-tool";
import { EmailSignatureGeneratorTool } from "@/components/tools/email-signature-generator-tool";
import { HttpHeaderViewerTool } from "@/components/tools/http-header-viewer-tool";
import { UserAgentParserTool } from "@/components/tools/user-agent-parser-tool";
import { IpLookupTool } from "@/components/tools/ip-lookup-tool";
import { CidrCalculatorTool } from "@/components/tools/cidr-calculator-tool";
import { SubnetCalculatorTool } from "@/components/tools/subnet-calculator-tool";
import { PortLookupTool } from "@/components/tools/port-lookup-tool";
import { DnsLookupTool } from "@/components/tools/dns-lookup-tool";
import { WhoisLookupTool } from "@/components/tools/whois-lookup-tool";
import { DockerComposeValidatorTool } from "@/components/tools/docker-compose-validator-tool";
import { DockerfileLinterTool } from "@/components/tools/dockerfile-linter-tool";
import { K8sYamlValidatorTool } from "@/components/tools/k8s-yaml-validator-tool";
import { K8sManifestGeneratorTool } from "@/components/tools/k8s-manifest-generator-tool";
import { NginxConfigTesterTool } from "@/components/tools/nginx-config-tester-tool";
import { ApacheConfigFormatterTool } from "@/components/tools/apache-config-formatter-tool";
import { AwsArnParserTool } from "@/components/tools/aws-arn-parser-tool";
import { AwsIamPolicyFormatterTool } from "@/components/tools/aws-iam-policy-formatter-tool";
import { AwsCronConverterTool } from "@/components/tools/aws-cron-converter-tool";
import { S3UrlParserTool } from "@/components/tools/s3-url-parser-tool";
import { OAuthUrlBuilderTool } from "@/components/tools/oauth-url-builder-tool";
import { PkceGeneratorTool } from "@/components/tools/pkce-generator-tool";
import { TotpGeneratorTool } from "@/components/tools/totp-generator-tool";
import { ApiKeyGeneratorTool } from "@/components/tools/api-key-generator-tool";
import { HttpStatusLookupTool } from "@/components/tools/http-status-lookup-tool";
import { MimeTypeLookupTool } from "@/components/tools/mime-type-lookup-tool";
import { MimeDetectorTool } from "@/components/tools/mime-detector-tool";
import { CspGeneratorTool } from "@/components/tools/csp-generator-tool";
import { CorsHeaderGeneratorTool } from "@/components/tools/cors-header-generator-tool";
import { CspValidatorTool } from "@/components/tools/csp-validator-tool";
import { MongoQueryFormatterTool } from "@/components/tools/mongo-query-formatter-tool";
import { MongoObjectIdGeneratorTool } from "@/components/tools/mongo-objectid-generator-tool";
import { RedisCommandBuilderTool } from "@/components/tools/redis-command-builder-tool";
import { PostgresqlFormatterTool } from "@/components/tools/postgresql-formatter-tool";
import { PromptFormatterTool } from "@/components/tools/prompt-formatter-tool";
import { PromptTokenCounterTool } from "@/components/tools/prompt-token-counter-tool";
import { OpenAiSchemaValidatorTool } from "@/components/tools/openai-schema-validator-tool";
import { EmbeddingTokenCounterTool } from "@/components/tools/embedding-token-counter-tool";
import { ColorPickerTool } from "@/components/tools/color-picker-tool";
import { HexRgbTool } from "@/components/tools/hex-rgb-tool";
import { RgbHslTool } from "@/components/tools/rgb-hsl-tool";
import { RgbCmykTool } from "@/components/tools/rgb-cmyk-tool";
import { HexCmykTool } from "@/components/tools/hex-cmyk-tool";
import { HexHsvTool } from "@/components/tools/hex-hsv-tool";
import { ColorGradientGeneratorTool } from "@/components/tools/color-gradient-generator-tool";
import { PaletteGeneratorTool } from "@/components/tools/palette-generator-tool";
import { ContrastCheckerTool } from "@/components/tools/contrast-checker-tool";
import { ColorBlindnessSimulatorTool } from "@/components/tools/color-blindness-simulator-tool";
import { QrGeneratorTool } from "@/components/tools/qr-generator-tool";
import { QrScannerTool } from "@/components/tools/qr-scanner-tool";
import { WifiQrTool } from "@/components/tools/wifi-qr-tool";
import { VCardQrTool } from "@/components/tools/vcard-qr-tool";
import { BarcodeGeneratorTool } from "@/components/tools/barcode-generator-tool";
import { BarcodeReaderTool } from "@/components/tools/barcode-reader-tool";
import { UnixTimestampTool } from "@/components/tools/unix-timestamp-tool";
import { DateDifferenceTool } from "@/components/tools/date-difference-tool";
import { AgeCalculatorTool } from "@/components/tools/age-calculator-tool";
import { TimezoneConverterTool } from "@/components/tools/timezone-converter-tool";
import { CronGeneratorTool } from "@/components/tools/cron-generator-tool";
import { CronParserTool } from "@/components/tools/cron-parser-tool";
import { LeapYearCheckerTool } from "@/components/tools/leap-year-checker-tool";
import { WordCounterTool } from "@/components/tools/word-counter-tool";
import { CharacterCounterTool } from "@/components/tools/character-counter-tool";
import { LineCounterTool } from "@/components/tools/line-counter-tool";
import { DuplicateLineRemoverTool } from "@/components/tools/duplicate-line-remover-tool";
import { TextDiffTool } from "@/components/tools/text-diff-tool";
import { CaseConverterTool } from "@/components/tools/case-converter-tool";
import { ReverseTextTool } from "@/components/tools/reverse-text-tool";
import { SlugGeneratorTool } from "@/components/tools/slug-generator-tool";
import { LoremIpsumTool } from "@/components/tools/lorem-ipsum-tool";
import { RemoveExtraSpacesTool } from "@/components/tools/remove-extra-spaces-tool";
import { TextSorterTool } from "@/components/tools/text-sorter-tool";
import { PercentageCalculatorTool } from "@/components/tools/percentage-calculator-tool";
import { PercentageDifferenceTool } from "@/components/tools/percentage-difference-tool";
import { ScientificCalculatorTool } from "@/components/tools/scientific-calculator-tool";
import { BmiCalculatorTool } from "@/components/tools/bmi-calculator-tool";
import { UnitConverterTool } from "@/components/tools/unit-converter-tool";
import { CurrencyConverterTool } from "@/components/tools/currency-converter-tool";
import { DecimalBinaryTool } from "@/components/tools/decimal-binary-tool";
import { DecimalHexTool } from "@/components/tools/decimal-hex-tool";
import { DecimalOctalTool } from "@/components/tools/decimal-octal-tool";
import { RomanNumeralTool } from "@/components/tools/roman-numeral-tool";
import { RandomWordTool } from "@/components/tools/random-word-tool";
import { RandomLetterTool } from "@/components/tools/random-letter-tool";
import { RandomColorTool } from "@/components/tools/random-color-tool";
import { RandomIpTool } from "@/components/tools/random-ip-tool";
import { RandomMacAddressTool } from "@/components/tools/random-mac-address-tool";
import { RandomDateTool } from "@/components/tools/random-date-tool";
import { RandomTimeTool } from "@/components/tools/random-time-tool";
import { RandomNameTool } from "@/components/tools/random-name-tool";
import { RandomUsernameTool } from "@/components/tools/random-username-tool";
import { RandomNicknameTool } from "@/components/tools/random-nickname-tool";
import { RandomEmojiTool } from "@/components/tools/random-emoji-tool";
import { RandomCreditCardTool } from "@/components/tools/random-credit-card-tool";
import { RandomPhoneNumberTool } from "@/components/tools/random-phone-number-tool";
import { RandomAddressTool } from "@/components/tools/random-address-tool";
import { RandomAnimalTool } from "@/components/tools/random-animal-tool";
import { RandomCountryTool } from "@/components/tools/random-country-tool";
import { RandomCityTool } from "@/components/tools/random-city-tool";
import { RandomFoodTool } from "@/components/tools/random-food-tool";
import { RandomFruitTool } from "@/components/tools/random-fruit-tool";
import { RandomVegetableTool } from "@/components/tools/random-vegetable-tool";
import { RandomDrinkTool } from "@/components/tools/random-drink-tool";
import { RandomMovieTool } from "@/components/tools/random-movie-tool";
import { RandomTvShowTool } from "@/components/tools/random-tv-show-tool";
import { RandomBookTool } from "@/components/tools/random-book-tool";
import { RandomGameTool } from "@/components/tools/random-game-tool";
import { RandomPokemonTool } from "@/components/tools/random-pokemon-tool";
import { RandomDinosaurTool } from "@/components/tools/random-dinosaur-tool";
import { RandomBirdTool } from "@/components/tools/random-bird-tool";
import { RandomFlagTool } from "@/components/tools/random-flag-tool";

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
};

export function getToolWidget(categorySlug: string, toolSlug: string): ReactNode | undefined {
  const render = toolWidgets[`${categorySlug}/${toolSlug}`];
  return render?.();
}
