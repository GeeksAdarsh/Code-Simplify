import type { Guide } from "./guide-types";

export const guides: Guide[] = [
  {
    slug: "fix-json-parse-errors",
    title: "How to Fix Common JSON Parse Errors",
    seoTitle: "How to Fix JSON Parse Errors: 8 Common Causes",
    description:
      "Unexpected token, unexpected end of input, bad control character: the eight mistakes behind most JSON parse errors, with broken and fixed examples.",
    updated: "2026-10-14",
    readMinutes: 5,
    tools: [
      { categorySlug: "json", slug: "validator" },
      { categorySlug: "json", slug: "formatter" },
      { categorySlug: "json", slug: "escape-unescape" },
    ],
    sections: [
      {
        heading: "Why JSON parsers are so strict",
        paragraphs: [
          "JSON looks like a JavaScript object, but its grammar is much smaller. RFC 8259 allows exactly six kinds of value: objects, arrays, strings, numbers, true/false, and null. There are no comments, no trailing commas, no single quotes, and no undefined. A parser that meets anything outside that grammar stops at the first bad character and throws.",
          "That is why the error messages look cryptic. JSON.parse in a browser says something like \"Unexpected token } in JSON at position 41\", Python says \"Expecting property name enclosed in double quotes: line 3 column 1\", and many APIs return a plain 400 Bad Request. In every case the parser is pointing at the first character it could not accept, which is often just after the real mistake.",
          "The fastest way to find it is to paste the text into the JSON Validator, which reports the line and column of the first error. Once it parses, run it through the JSON Formatter so the structure is easy to read and the next mistake is easier to spot.",
        ],
      },
      {
        heading: "1–3: Trailing commas, single quotes, and unquoted keys",
        paragraphs: [
          "These three cause most errors, because they are all legal in JavaScript object literals and people copy objects straight out of code. A trailing comma after the last item in an object or array is invalid. Strings and keys must use double quotes, never single quotes. And every key must be a quoted string, even if it is a simple word.",
          "The broken example below has all three problems. The fixed version quotes the key, switches to double quotes, and removes the comma after the last array item.",
        ],
        code: {
          language: "json",
          content: `// Broken
{
  name: 'Asha',
  "roles": ["admin", "editor",],
}

// Fixed
{
  "name": "Asha",
  "roles": ["admin", "editor"]
}`,
        },
      },
      {
        heading: "4: Comments in JSON",
        paragraphs: [
          "JSON has no comment syntax. Both // line comments and /* block */ comments cause a parse error. (The \"Broken\" and \"Fixed\" labels in the example above are there for explanation only; delete them before parsing.)",
          "Some tools accept comments anyway: VS Code settings files and tsconfig.json use a looser format called JSONC, and JSON5 allows comments, single quotes, and trailing commas. Those files are fine for the tool that reads them, but JSON.parse, Python's json module, and most API servers will reject them. If you need to document a JSON file, put the explanation in a separate README or add a field such as \"_comment\" that your code ignores.",
        ],
      },
      {
        heading: "5: Unescaped characters inside strings",
        paragraphs: [
          "Inside a JSON string, a double quote must be written as \\\" and a backslash as \\\\. Raw line breaks and tabs are not allowed either; they must be written as \\n and \\t. This is the error behind \"Bad control character in string literal\" and it usually appears when someone pastes a multi-line message, a Windows file path, or HTML into a value.",
          "A Windows path like C:\\Users\\asha must be stored as \"C:\\\\Users\\\\asha\" in JSON. If you have a long block of text to embed, the JSON Escape/Unescape tool will convert quotes, backslashes, and newlines for you.",
        ],
        code: {
          language: "json",
          content: `// Broken: raw quote and raw newline inside the string
{ "note": "She said "hi"
and left" }

// Fixed
{ "note": "She said \\"hi\\"\\nand left" }`,
        },
      },
      {
        heading: "6–7: Invalid values and numbers",
        paragraphs: [
          "Only true, false, and null are valid literals, and they must be lowercase. True, None, NULL, undefined, and NaN are not JSON. Python developers hit this often when they print a dict with str() instead of json.dumps(): the output uses single quotes and True/None, so it looks like JSON but is not.",
          "Numbers have their own rules. Leading zeros (007), a leading plus sign (+5), a trailing decimal point (5.), hexadecimal (0x1F), and Infinity are all invalid. Very large integers such as 64-bit IDs are technically valid, but JavaScript will silently round anything above 9,007,199,254,740,991, so APIs often send big IDs as strings instead.",
        ],
        list: [
          "Use true, false, null — always lowercase.",
          "Write 7, not 007; 5.0 or 5, not 5.",
          "Send IDs above 2^53 as strings, e.g. \"id\": \"9223372036854775807\".",
        ],
      },
      {
        heading: "8: Not JSON at all — empty bodies, HTML, and BOMs",
        paragraphs: [
          "\"Unexpected end of JSON input\" usually means the string was empty. A fetch that returned 204 No Content, a server that crashed mid-response, or a file that was never written will all produce this. \"Unexpected token < in JSON at position 0\" means the response was HTML, typically a login page, a 404 page, or a proxy error, not the API response you expected.",
          "A less obvious cause is a byte order mark (BOM) at the start of a file saved by some Windows editors. It is invisible but makes the first character invalid. Re-save the file as UTF-8 without BOM, or strip it before parsing.",
          "When debugging an API, log the raw response text and status code before you call JSON.parse. That one step tells you whether you are dealing with a syntax problem or a server problem.",
        ],
        code: {
          language: "javascript",
          content: `const res = await fetch("/api/orders");
const text = await res.text();
console.log(res.status, res.headers.get("content-type"), text.slice(0, 200));
const data = text ? JSON.parse(text) : null;`,
        },
      },
      {
        heading: "A quick checklist",
        paragraphs: [
          "When a parse fails, work through the list below in order. Most files are fixed by the first three items. If the JSON Validator still reports an error, look one or two characters before the position it gives you, since the parser often notices a problem only after it has passed it.",
        ],
        list: [
          "Remove the trailing comma after the last item in every object and array.",
          "Replace single quotes with double quotes and quote every key.",
          "Delete comments.",
          "Escape quotes, backslashes, and newlines inside strings.",
          "Use lowercase true, false, null; remove undefined and NaN.",
          "Check that the input is not empty, not HTML, and has no BOM.",
        ],
      },
    ],
    faq: [
      {
        question: "Can JSON have trailing commas?",
        answer:
          "No. Standard JSON does not allow a comma after the last element of an object or array. JSON5 and JSONC allow it, but JSON.parse and most API servers will reject it.",
      },
      {
        question: "What does \"Unexpected token < in JSON at position 0\" mean?",
        answer:
          "The text you tried to parse starts with <, so it is almost certainly HTML, such as an error page or a login redirect. Check the status code and the raw response body.",
      },
      {
        question: "Is it safe to paste my JSON into an online validator?",
        answer:
          "The CodeSimplify JSON Validator checks your input in the browser and does not upload it. Even so, remove real passwords, tokens, and personal data before pasting into any online tool.",
      },
    ],
  },
  {
    slug: "what-is-jwt-how-to-decode",
    title: "What Is a JWT and How to Decode It Safely",
    seoTitle: "What Is a JWT? How to Decode a JSON Web Token Safely",
    description:
      "A JWT is three Base64URL parts: header, payload, and signature. Learn what each holds, how to decode one, and why decoding is not the same as verifying.",
    updated: "2026-10-14",
    readMinutes: 5,
    tools: [
      { categorySlug: "security", slug: "jwt-decoder" },
      { categorySlug: "security", slug: "jwt-generator" },
      { categorySlug: "security", slug: "base64-decode" },
    ],
    sections: [
      {
        heading: "What a JWT is",
        paragraphs: [
          "A JSON Web Token (JWT, often pronounced \"jot\") is a compact string that carries a set of claims, such as a user ID and an expiry time, along with a signature that proves who issued it. It is defined in RFC 7519 and is widely used for API authentication, single sign-on, and OAuth 2.0 / OpenID Connect ID tokens.",
          "The main idea is that the server does not need to look anything up to trust the token. When a user logs in, the server signs a token and gives it to the client. On each later request the client sends it back, usually in an Authorization: Bearer header, and the server checks the signature. If the signature is valid and the token has not expired, the claims inside can be trusted.",
        ],
      },
      {
        heading: "The three parts of a token",
        paragraphs: [
          "A JWT is three Base64URL-encoded segments joined by dots: header.payload.signature. Base64URL is Base64 with - and _ instead of + and /, and with the = padding removed, so the token is safe in URLs and headers.",
          "Here is a real HS256 token, split onto three lines for readability. The first segment always starts with eyJ, because that is how {\" looks after Base64 encoding, which makes JWTs easy to recognise in logs.",
        ],
        code: {
          language: "text",
          content: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFzaGEiLCJpYXQiOjE3NjA0MDAwMDAsImV4cCI6MTc2MDQwMzYwMH0
.-l12Z4pW2qF_HXVLONXogO24FdCn6CBzuPrmsHjhQo8`,
        },
      },
      {
        heading: "What the decoded header and payload contain",
        paragraphs: [
          "Decoding the first two segments gives plain JSON. The header says which algorithm signed the token. The payload holds the claims. Some claim names are registered by the standard: sub (subject, usually the user ID), iss (issuer), aud (audience), iat (issued at), nbf (not before), and exp (expiry). The time claims are Unix timestamps in seconds, so 1760400000 is 14 October 2025, 00:00 UTC, and exp 1760403600 is one hour later.",
          "Paste a token into the JWT Decoder and it shows the header and payload as formatted JSON and converts the timestamps into readable dates, so you can see at a glance whether a token has expired or was issued for the wrong audience.",
        ],
        code: {
          language: "json",
          content: `// Header
{ "alg": "HS256", "typ": "JWT" }

// Payload
{ "sub": "1234567890", "name": "Asha", "iat": 1760400000, "exp": 1760403600 }`,
        },
      },
      {
        heading: "Decoding is not verifying",
        paragraphs: [
          "This is the most important point about JWTs. The header and payload are only encoded, not encrypted. Anyone who has the token can read them, and anyone can create a token with any payload they like. What they cannot do without the key is produce a valid signature.",
          "So decoding a token tells you what it claims, not whether those claims are true. A decoder, including the one on CodeSimplify, is a debugging tool. Your server must verify the signature with the correct key before trusting anything in the payload, and it must also check exp, nbf, iss, and aud.",
        ],
        list: [
          "Never put passwords, card numbers, or other secrets in a JWT payload; it is readable by anyone.",
          "Pin the expected algorithm on the server. Reject alg \"none\", and do not let a token switch from RS256 to HS256.",
          "Keep tokens short-lived and use refresh tokens for long sessions.",
          "Treat a JWT like a password: do not paste production tokens into tools you do not trust, and do not log them.",
        ],
      },
      {
        heading: "HS256 vs RS256",
        paragraphs: [
          "HS256 uses one shared secret for both signing and verifying (an HMAC with SHA-256). It is simple, but every service that verifies tokens must hold the secret, which also lets it create tokens. RS256 and ES256 use a private key to sign and a public key to verify. Only the auth server can issue tokens, and any service can verify them using the public key, often published at a JWKS URL.",
          "For a single backend, HS256 with a long random secret is fine. When several services or third parties verify tokens, use an asymmetric algorithm.",
        ],
      },
      {
        heading: "Decoding a JWT in code",
        paragraphs: [
          "For quick inspection in a browser console or Node, split on the dots and Base64URL-decode the middle part. For real authentication, use a maintained library such as jose (JavaScript), PyJWT (Python), or jjwt (Java) and call its verify function rather than writing your own.",
          "When a token is rejected, decoding it is usually the first debugging step. Check that exp is in the future, that iss and aud match what the API expects, and that alg in the header matches the algorithm your server is configured for. If all of those look right, the problem is the key: a different secret per environment, a rotated signing key, or a public key fetched from the wrong JWKS URL. To test your own verification code, the JWT Generator can create tokens with a known secret and claims.",
        ],
        code: {
          language: "javascript",
          content: `// Read only — this does NOT verify the signature
const [, payload] = token.split(".");
const claims = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
console.log(claims.sub, new Date(claims.exp * 1000).toISOString());`,
        },
      },
    ],
    faq: [
      {
        question: "Is a JWT encrypted?",
        answer:
          "A normal signed JWT (JWS) is not encrypted; anyone can decode the header and payload. Encrypted tokens exist (JWE), but they are a different format and much less common.",
      },
      {
        question: "Can I decode a JWT without the secret key?",
        answer:
          "Yes. Decoding only reverses the Base64URL encoding, so no key is needed. You need the key, or the public key for RS256, only to verify the signature.",
      },
      {
        question: "Why does my JWT say it is expired?",
        answer:
          "The exp claim is a Unix time in seconds, and the current time is past it. Also check that the server clock is correct; many libraries allow a small leeway of 30–60 seconds for clock skew.",
      },
      {
        question: "Where should I store a JWT in the browser?",
        answer:
          "An HttpOnly, Secure, SameSite cookie is the safest common choice because JavaScript cannot read it, which limits damage from XSS. localStorage is simpler but readable by any script on the page.",
      },
    ],
  },
  {
    slug: "base64-encoding-explained",
    title: "Base64 Encoding Explained: What It Is and When Not to Use It",
    seoTitle: "Base64 Encoding Explained: How It Works and When to Use It",
    description:
      "Base64 turns bytes into 64 safe text characters. See how it works step by step, why output is 33% larger, and why Base64 is encoding, not encryption.",
    updated: "2026-10-14",
    readMinutes: 4,
    tools: [
      { categorySlug: "security", slug: "base64-encode" },
      { categorySlug: "security", slug: "base64-decode" },
    ],
    sections: [
      {
        heading: "What Base64 is for",
        paragraphs: [
          "Base64 is a way of writing arbitrary binary data using only 64 printable characters: A–Z, a–z, 0–9, + and /, with = used for padding. It exists because many systems were built to carry text, not raw bytes. Email (MIME), JSON, XML, HTTP headers, and URLs can all mangle or reject bytes such as 0x00 or line-break characters. Base64 turns any bytes into plain ASCII that passes through these systems unchanged.",
          "Common places you will see it: email attachments, data: URLs for small images in HTML and CSS, the Authorization: Basic header, PEM certificate files, JWTs, and API fields that carry a file inside JSON.",
          "The name comes from the size of the alphabet. Because 64 is 2 to the power of 6, each output character represents exactly 6 bits of input, which keeps the encoding simple and fast. Base64 does not compress or check data; it only changes how the same bytes are written. Decoding gives back the original bytes exactly, which is what makes it useful for transport and useless for secrecy.",
        ],
      },
      {
        heading: "How the encoding works",
        paragraphs: [
          "Base64 takes the input three bytes at a time. Three bytes are 24 bits, which it splits into four groups of 6 bits. Each 6-bit group is a number from 0 to 63, and that number picks one character from the alphabet. So every 3 bytes of input become 4 characters of output.",
          "Take the word \"Hi?\". The bytes are 72, 105, and 63. In binary that is 01001000 01101001 00111111. Regrouped into 6-bit chunks: 010010 000110 100100 111111, which are 18, 6, 36, and 63. In the Base64 alphabet those are S, G, k, and /, so \"Hi?\" encodes to SGk/.",
          "When the input length is not a multiple of three, the encoder pads the last group with zero bits and adds = signs so the output length stays a multiple of four. \"Hi\" (two bytes) becomes aGk= and \"Hello\" (five bytes) becomes SGVsbG8=. You can try any of these in the Base64 Encode tool and reverse them with Base64 Decode.",
        ],
        code: {
          language: "text",
          content: `Text:    H        i        ?
Bytes:   72       105      63
Bits:    01001000 01101001 00111111
6-bit:   010010 000110 100100 111111
Index:   18     6      36     63
Base64:  S      G      k      /`,
        },
      },
      {
        heading: "Base64 is not encryption",
        paragraphs: [
          "Base64 has no key and no secret. Anyone can decode it instantly, and the output often looks recognisable (eyJ at the start means JSON, iVBOR means a PNG image). Encoding a password, API key, or personal data in Base64 hides it from nobody.",
          "This matters in practice. HTTP Basic authentication sends username:password in Base64, which is why it must only be used over HTTPS. Kubernetes Secrets are stored Base64-encoded, which is a formatting choice, not protection; you still need encryption at rest and access control. If you need confidentiality, use real encryption such as AES-GCM, or TLS for data in transit.",
        ],
      },
      {
        heading: "The 33% size cost",
        paragraphs: [
          "Because 3 bytes become 4 characters, Base64 output is about 33% larger than the input, plus a little for padding and any line breaks. A 300 KB image becomes about 400 KB of text.",
          "For that reason, avoid Base64 when a binary-safe option exists. Upload files with multipart/form-data instead of putting them in a JSON field. Serve images as normal files rather than inlining large data: URLs, which also cannot be cached separately by the browser. Inlining is reasonable for tiny icons of a few hundred bytes, where saving a network request is worth the size increase.",
        ],
      },
      {
        heading: "Base64URL and other variants",
        paragraphs: [
          "Standard Base64 uses + and /, which have special meanings in URLs and file names. The Base64URL variant (RFC 4648 section 5) replaces them with - and _, and usually drops the = padding. JWTs, many OAuth parameters, and some file-naming schemes use Base64URL. \"Hi?\" is SGk/ in standard Base64 and SGk_ in Base64URL.",
          "If decoding fails with an \"invalid character\" error, check whether the input is actually Base64URL, whether padding was stripped, or whether line breaks were inserted every 76 characters, as MIME does.",
          "Another frequent surprise is decoded output that looks like random symbols. That usually means the original data was binary, such as an image, a PDF, or compressed bytes, rather than text. Save the decoded result as a file instead of viewing it as a string, or check the first few characters: JVBER is a PDF, /9j/ is a JPEG, and H4sI is gzip.",
        ],
      },
      {
        heading: "Encoding and decoding in code",
        paragraphs: [
          "In browsers, btoa and atob work only on Latin-1 strings and will throw on characters such as ₹ or Hindi text. Convert to UTF-8 bytes first. In Node, Buffer handles this directly. In Python, use the base64 module.",
        ],
        code: {
          language: "javascript",
          content: `// Browser, UTF-8 safe
const bytes = new TextEncoder().encode("₹500");
const b64 = btoa(String.fromCharCode(...bytes));          // "4oK5NTAw"

// Node
Buffer.from("Hello").toString("base64");                  // "SGVsbG8="
Buffer.from("SGVsbG8=", "base64").toString("utf8");      // "Hello"`,
        },
      },
    ],
    faq: [
      {
        question: "Is Base64 secure?",
        answer:
          "No. Base64 is a reversible encoding with no key. Anyone can decode it, so never use it to protect passwords or secrets.",
      },
      {
        question: "Why does Base64 output end with = or ==?",
        answer:
          "The = signs are padding. They appear when the input length is not a multiple of three bytes: one = for two leftover bytes, two == for one leftover byte.",
      },
      {
        question: "How much bigger does Base64 make a file?",
        answer:
          "About 33% larger, because every 3 bytes become 4 characters. Line breaks added by some encoders increase it slightly more.",
      },
    ],
  },
  {
    slug: "url-encoding-explained",
    title: "URL Encoding Explained: %20, encodeURIComponent vs encodeURI",
    seoTitle: "URL Encoding Explained: %20 and encodeURIComponent vs encodeURI",
    description:
      "Why spaces become %20 or +, which characters need percent-encoding, and when to use encodeURIComponent instead of encodeURI, with JavaScript examples.",
    updated: "2026-10-14",
    readMinutes: 4,
    tools: [
      { categorySlug: "security", slug: "url-encode" },
      { categorySlug: "security", slug: "url-decode" },
    ],
    sections: [
      {
        heading: "Why URLs need encoding",
        paragraphs: [
          "A URL can only contain a limited set of ASCII characters, and several of them have a job. In https://example.com/search?q=tea&page=2#top, the / separates path segments, ? starts the query string, & separates parameters, = separates a name from its value, and # starts the fragment. If your data contains one of these characters, the browser or server cannot tell data from structure.",
          "Percent-encoding (RFC 3986) solves this. Any byte that is not safe is written as % followed by its two-digit hexadecimal value. A space is byte 0x20, so it becomes %20. An ampersand is 0x26, so it becomes %26. The URL Encode tool does this conversion for you, and URL Decode reverses it.",
        ],
      },
      {
        heading: "Which characters get encoded",
        paragraphs: [
          "RFC 3986 defines unreserved characters that never need encoding: A–Z, a–z, 0–9, and - . _ ~. Reserved characters such as : / ? # [ ] @ ! $ & ' ( ) * + , ; = have special meaning and must be encoded when they appear inside a value. Everything else, including spaces, quotes, < >, and all non-ASCII characters, must always be encoded.",
          "Non-ASCII text is first converted to UTF-8 bytes, and each byte is percent-encoded. The rupee sign ₹ is three bytes in UTF-8, so ₹500 becomes %E2%82%B9500. Hindi, emoji, and accented letters work the same way, which is why non-English URLs look long when copied out of the address bar.",
        ],
        list: [
          "space → %20 (or + in form data)",
          "& → %26, = → %3D, ? → %3F, # → %23, / → %2F",
          "₹ → %E2%82%B9",
        ],
      },
      {
        heading: "%20 vs + for spaces",
        paragraphs: [
          "Both appear in the wild, and the difference comes from two standards. In the path and in generic URLs, a space is %20. In HTML form submissions using application/x-www-form-urlencoded, a space is written as +, and a literal plus sign must be encoded as %2B.",
          "Most servers decode + as a space only in the query string, not in the path. So /files/my+report.pdf refers to a file literally named my+report.pdf, while ?q=my+report means \"my report\". When in doubt, use %20; it is understood everywhere. JavaScript's URLSearchParams produces +, while encodeURIComponent produces %20; both are correct for query strings.",
        ],
      },
      {
        heading: "encodeURIComponent vs encodeURI",
        paragraphs: [
          "JavaScript has two built-in functions, and using the wrong one is a common bug. encodeURI is meant for a whole URL. It leaves the structural characters : / ? & = # alone so the URL keeps working, and only encodes things like spaces and non-ASCII characters. encodeURIComponent is meant for a single piece, such as one query value or one path segment. It encodes the structural characters too.",
          "The rule of thumb: use encodeURIComponent on every value you insert into a URL, and almost never use encodeURI. If you run encodeURI on a full URL that contains a value like \"chai & samosa\", the & is left as-is and the server sees two parameters instead of one.",
        ],
        code: {
          language: "javascript",
          content: `encodeURI("a/b?c=d#e");            // "a/b?c=d#e"  (unchanged)
encodeURIComponent("a/b?c=d#e");   // "a%2Fb%3Fc%3Dd%23e"

const q = "chai & samosa";
"https://example.com/search?q=" + encodeURIComponent(q);
// https://example.com/search?q=chai%20%26%20samosa

new URLSearchParams({ q }).toString();   // "q=chai+%26+samosa"`,
        },
      },
      {
        heading: "Common URL encoding mistakes",
        paragraphs: [
          "Double encoding happens when an already-encoded string is encoded again: %20 becomes %2520 because the % itself is encoded as %25. If you see %25 in a URL, something encoded twice. Encode raw values exactly once, at the point where you build the URL.",
          "The other frequent problems are building URLs by string concatenation without encoding, and decoding a whole URL before splitting it, which turns an encoded %26 back into & and breaks the parameter boundaries. Parse first, then decode each part. In JavaScript, the URL and URLSearchParams classes handle both directions correctly.",
        ],
        list: [
          "Seeing %2520? The value was encoded twice.",
          "Parameter cut off at &? The value was not encoded.",
          "Plus signs turning into spaces? Encode + as %2B in query values.",
        ],
      },
      {
        heading: "URL encoding is not security",
        paragraphs: [
          "Percent-encoding only makes data safe to transport inside a URL. It does not hide anything and it does not prevent injection on its own. Values in URLs end up in browser history, server logs, and analytics, so never put passwords or tokens in a query string. On the server, still validate and escape input for its destination: parameterised queries for SQL, HTML escaping for pages.",
          "Attackers also use encoding to slip past naive filters, for example writing ../ as %2E%2E%2F to reach files outside a folder. Decode input once, normalise it, and then apply your checks to the decoded value.",
        ],
      },
    ],
    faq: [
      {
        question: "What does %20 mean in a URL?",
        answer:
          "%20 is an encoded space. The space character has hexadecimal byte value 20, and percent-encoding writes unsafe bytes as % followed by their hex value.",
      },
      {
        question: "Should I use encodeURI or encodeURIComponent?",
        answer:
          "Use encodeURIComponent for each value you put into a URL, such as a query parameter or path segment. encodeURI leaves &, =, ? and / unencoded, so it is only suitable for an already-structured full URL.",
      },
      {
        question: "Why is my URL showing %2520?",
        answer:
          "The string was encoded twice. The first pass turned a space into %20, and the second turned the % into %25. Encode raw values only once.",
      },
    ],
  },
  {
    slug: "md5-vs-sha1-vs-sha256",
    title: "MD5 vs SHA-1 vs SHA-256: Which Hash Should You Use?",
    seoTitle: "MD5 vs SHA-1 vs SHA-256: Which Hash Should You Use?",
    description:
      "Compare MD5, SHA-1, SHA-256, and SHA-512 by output size, speed, and security. Learn which is safe for checksums, signatures, and why none suit passwords.",
    updated: "2026-10-14",
    readMinutes: 4,
    tools: [
      { categorySlug: "security", slug: "sha256" },
      { categorySlug: "security", slug: "md5" },
      { categorySlug: "security", slug: "sha1" },
      { categorySlug: "security", slug: "sha512" },
      { categorySlug: "security", slug: "bcrypt" },
    ],
    sections: [
      {
        heading: "What a hash function does",
        paragraphs: [
          "A cryptographic hash function takes input of any size and produces a fixed-size fingerprint called a digest. The same input always gives the same digest, a tiny change in the input changes the digest completely, and it should be infeasible to work backwards from the digest to the input or to find two inputs with the same digest (a collision).",
          "Hashes are used to check that a download was not corrupted, to detect duplicate files, to build cache keys, inside digital signatures and TLS, and in Git to identify commits. Hashing is one-way; it is not encryption, and there is no key to \"decrypt\" a hash.",
        ],
        code: {
          language: "text",
          content: `MD5("hello")     5d41402abc4b2a76b9719d911017c592
SHA-1("hello")   aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d
SHA-256("hello") 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824

MD5("")          d41d8cd98f00b204e9800998ecf8427e
SHA-256("")      e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`,
        },
      },
      {
        heading: "The four algorithms side by side",
        paragraphs: [
          "The main visible difference is digest length. MD5 produces 128 bits (32 hex characters), SHA-1 produces 160 bits (40 hex characters), SHA-256 produces 256 bits (64 hex characters), and SHA-512 produces 512 bits (128 hex characters). SHA-256 and SHA-512 both belong to the SHA-2 family.",
          "You can compare them yourself by pasting the same text into the MD5, SHA-1, SHA-256, and SHA-512 generators on CodeSimplify. Note that hashing works on bytes, so \"hello\" and \"hello\\n\" (with a trailing newline, as many command-line tools add) give different digests. That is the most common reason a hash \"does not match\".",
        ],
        list: [
          "MD5: 128-bit, broken for collisions since 2004. Fine only for non-security checksums.",
          "SHA-1: 160-bit, practical collision shown in 2017 (SHAttered). Deprecated for signatures and certificates.",
          "SHA-256: 256-bit, no known practical attacks. The default choice today.",
          "SHA-512: 512-bit, also secure; often faster than SHA-256 on 64-bit CPUs.",
        ],
      },
      {
        heading: "Why MD5 and SHA-1 are considered broken",
        paragraphs: [
          "For MD5, researchers can now generate two different files with the same digest in seconds on a laptop. Attackers used MD5 collisions to forge a trusted certificate authority certificate in 2008, and the Flame malware used one to fake a Microsoft code-signing certificate in 2012. For SHA-1, Google and CWI published two different PDF files with the same SHA-1 digest in 2017, and attacks have become cheaper since.",
          "\"Broken\" here means collisions are practical. Finding an input that matches a specific existing hash (a preimage attack) is still not practical for either. That is why MD5 is still acceptable for detecting accidental corruption, but not anywhere an attacker could benefit from producing a matching file, such as signatures, certificates, or integrity checks on downloads from untrusted mirrors.",
        ],
      },
      {
        heading: "Which hash to use for what",
        paragraphs: [
          "For any new security-related use, pick SHA-256. It is supported everywhere, it is what TLS certificates, code signing, Bitcoin, and most package managers use, and it has a large safety margin. Use SHA-512 if a standard asks for it or if you want a longer digest. SHA-3 and BLAKE2/BLAKE3 are also sound choices where available.",
          "Keep MD5 or SHA-1 only where you are matching an existing system, such as an old API that expects an MD5 checksum, or for non-adversarial uses like deduplicating your own files or generating cache keys. Git still uses SHA-1 by default with collision detection, and is migrating to SHA-256.",
        ],
        list: [
          "File download checksum: SHA-256.",
          "Digital signatures and certificates: SHA-256 or stronger.",
          "Message authentication with a secret key: HMAC-SHA256, not a plain hash.",
          "Cache keys or dedupe on trusted data: MD5 is acceptable.",
          "Passwords: none of these. Use bcrypt, scrypt, or Argon2.",
        ],
      },
      {
        heading: "Why none of these are for passwords",
        paragraphs: [
          "MD5, SHA-1, SHA-256, and SHA-512 are designed to be fast. A modern GPU can compute billions of SHA-256 hashes per second, so if a database of SHA-256 password hashes leaks, attackers can test enormous wordlists against it very quickly. Unsalted hashes are even worse, because precomputed tables and simple lookups crack common passwords instantly.",
          "Password hashing needs a deliberately slow, salted algorithm: bcrypt, scrypt, or Argon2id. These add a unique random salt per user and a tunable work factor so that each guess costs real time and memory. The CodeSimplify Bcrypt tool lets you generate and check bcrypt hashes to see how the format works.",
        ],
      },
      {
        heading: "Computing a hash from the command line",
        paragraphs: [
          "To verify a download, compute its SHA-256 and compare it with the value published on the official site, ideally over HTTPS. On Windows use certutil or PowerShell; on Linux and macOS use sha256sum or shasum.",
        ],
        code: {
          language: "bash",
          content: `# Windows PowerShell
Get-FileHash .\\setup.exe -Algorithm SHA256

# Linux
sha256sum setup.iso

# macOS
shasum -a 256 setup.iso

# Hash a string without the trailing newline
printf "hello" | sha256sum`,
        },
      },
    ],
    faq: [
      {
        question: "Can an MD5 or SHA-256 hash be decrypted?",
        answer:
          "No. Hashes are one-way and there is nothing to decrypt. Sites that claim to \"decrypt\" MD5 simply look up hashes of common words they have already computed, which only works for weak, unsalted inputs.",
      },
      {
        question: "Is MD5 still safe to use?",
        answer:
          "Only for non-security purposes such as detecting accidental corruption or deduplicating trusted files. Do not use it for signatures, certificates, or passwords.",
      },
      {
        question: "Is SHA-512 more secure than SHA-256?",
        answer:
          "It has a larger output, but SHA-256 is already far beyond practical attack. Either is a good choice; SHA-256 is more widely expected by other systems.",
      },
      {
        question: "Why does my hash not match the expected value?",
        answer:
          "Usually the input bytes differ: a trailing newline, different line endings (CRLF vs LF), a different text encoding, or extra whitespace. Hash the exact same bytes and the digests will match.",
      },
    ],
  },
  {
    slug: "json-vs-yaml-vs-xml",
    title: "JSON vs YAML vs XML: Differences and When to Use Each",
    seoTitle: "JSON vs YAML vs XML: Key Differences and When to Use Each",
    description:
      "The same data in JSON, YAML, and XML, compared on syntax, comments, data types, and tooling, with advice on which format fits APIs, configs, and documents.",
    updated: "2026-10-14",
    readMinutes: 4,
    tools: [
      { categorySlug: "json", slug: "to-yaml" },
      { categorySlug: "yaml", slug: "to-json" },
      { categorySlug: "json", slug: "to-xml" },
      { categorySlug: "xml", slug: "to-json" },
    ],
    sections: [
      {
        heading: "Three ways to write the same data",
        paragraphs: [
          "JSON, YAML, and XML all represent structured data as text: nested records, lists, strings, and numbers. They differ in how much syntax they need, what they can express beyond plain data, and which ecosystems use them. Seeing one record in all three makes the trade-offs clear.",
        ],
        code: {
          language: "text",
          content: `JSON
{
  "service": "orders",
  "port": 8080,
  "debug": false,
  "hosts": ["api1.internal", "api2.internal"]
}

YAML
service: orders
port: 8080
debug: false
hosts:
  - api1.internal
  - api2.internal

XML
<config>
  <service>orders</service>
  <port>8080</port>
  <debug>false</debug>
  <hosts>
    <host>api1.internal</host>
    <host>api2.internal</host>
  </hosts>
</config>`,
        },
      },
      {
        heading: "JSON: the default for APIs",
        paragraphs: [
          "JSON has a tiny grammar: objects, arrays, strings, numbers, booleans, and null. Every mainstream language parses it natively or with a standard library, browsers parse it with JSON.parse, and it maps directly onto the dictionaries and lists that programs already use. That is why almost every REST API, browser storage format, and NoSQL database such as MongoDB uses JSON.",
          "Its weaknesses show up when people edit it by hand. There are no comments, no trailing commas, and every key must be quoted, so large config files become noisy and easy to break. It also has no date type or binary type; dates are usually ISO 8601 strings and binary data is Base64.",
        ],
      },
      {
        heading: "YAML: readable configuration",
        paragraphs: [
          "YAML uses indentation instead of braces and allows comments with #, which is why it is the standard for Kubernetes manifests, Docker Compose, GitHub Actions, Ansible, and many CI systems. It is technically a superset of JSON, so valid JSON is also valid YAML. Anchors (&) and aliases (*) let you reuse blocks, and multi-line strings are easy with | and >.",
          "The flexibility comes with traps. Indentation must use spaces, never tabs, and one wrong space changes the structure. Unquoted values are type-guessed: in YAML 1.1 parsers, no, yes, on, and off become booleans, so a country code NO for Norway can turn into false, and a version 1.10 can become the number 1.1. Quote any string that could be misread. Loading untrusted YAML with a full loader can also execute code in some languages; use safe_load in Python.",
        ],
      },
      {
        heading: "XML: documents, schemas, and older enterprise systems",
        paragraphs: [
          "XML is the most verbose of the three because every element has an opening and closing tag, but it is also the most expressive. It has attributes as well as child elements, namespaces for mixing vocabularies, mixed content (text with inline markup), and mature standards for validation (XSD), querying (XPath), and transformation (XSLT).",
          "You will meet XML in SOAP web services, banking and payment messages, RSS and Atom feeds, sitemaps, SVG images, Office documents (which are zipped XML), Android layouts, and Maven pom.xml files. It is rarely chosen for new web APIs, but it remains the right tool for document-like data and for industries with strict schemas.",
        ],
      },
      {
        heading: "Quick comparison",
        paragraphs: [
          "The points below summarise the practical differences. Size matters less than it seems once responses are compressed with gzip or Brotli, but parse speed and tooling support still favour JSON for high-volume APIs.",
        ],
        list: [
          "Comments: JSON no; YAML yes (#); XML yes (<!-- -->).",
          "Data types: JSON has string, number, boolean, null; YAML adds dates and type guessing; XML is all text unless a schema says otherwise.",
          "Verbosity: YAML is the shortest, JSON is in the middle, XML is the longest.",
          "Schema validation: JSON Schema, YAML usually via JSON Schema, XML via XSD or DTD.",
          "Typical use: JSON for APIs and data exchange; YAML for human-edited config; XML for documents, feeds, and enterprise or legacy integrations.",
        ],
      },
      {
        heading: "Converting between them",
        paragraphs: [
          "JSON and YAML convert cleanly in both directions because they share the same data model. The JSON to YAML tool is handy when you have an API response or a JSON example and need a Kubernetes or CI file, and YAML to JSON helps when a tool or API only accepts JSON. Comments in YAML are lost when converting to JSON, since JSON cannot hold them.",
          "XML conversion needs more care because XML has concepts JSON lacks. Attributes are usually mapped to keys with a prefix such as @ or _, repeated elements become arrays, and a single child element may become an object instead of a one-item array. Check the output of JSON to XML or XML to JSON against what your target system expects, especially for lists with only one item.",
        ],
      },
      {
        heading: "Which one should you pick?",
        paragraphs: [
          "If programs are the main readers and writers, such as API payloads, message queues, or stored documents, use JSON. If people edit the file by hand and need comments, use YAML, and quote ambiguous strings. Use XML when you must integrate with a system or standard that requires it, or when your data is really a document with mixed text and markup. For hand-edited configs where YAML's indentation rules worry you, TOML is another option worth a look.",
        ],
      },
    ],
    faq: [
      {
        question: "Is YAML a superset of JSON?",
        answer:
          "Yes, since YAML 1.2 any valid JSON document is also valid YAML. The reverse is not true, because YAML allows comments, anchors, and unquoted strings.",
      },
      {
        question: "Why is JSON preferred over XML for APIs?",
        answer:
          "JSON maps directly to objects and arrays in most languages, is parsed natively in browsers, and is less verbose. XML is still used where schemas, namespaces, or existing standards like SOAP are required.",
      },
      {
        question: "Can JSON have comments?",
        answer:
          "No. Standard JSON has no comment syntax. If you need comments in a config file, use YAML, TOML, or a JSONC-aware tool.",
      },
    ],
  },
  {
    slug: "uuid-vs-guid-vs-nano-id",
    title: "UUID vs GUID vs Nano ID: Which Unique ID Should You Use?",
    seoTitle: "UUID vs GUID vs Nano ID: Differences and Which to Use",
    description:
      "UUID and GUID are the same 128-bit format; Nano ID is a shorter URL-safe string. Compare versions v1, v4, v7, collision odds, and database performance.",
    updated: "2026-10-14",
    readMinutes: 4,
    tools: [
      { categorySlug: "ids", slug: "uuid-v4" },
      { categorySlug: "ids", slug: "guid" },
      { categorySlug: "ids", slug: "nano-id" },
      { categorySlug: "ids", slug: "uuid-v7" },
    ],
    sections: [
      {
        heading: "Why random IDs instead of 1, 2, 3",
        paragraphs: [
          "Auto-increment integers are simple, but they need one central counter, they reveal how many records you have, and they let anyone guess neighbouring IDs (/orders/1041, /orders/1042). Randomly generated IDs can be created on any server, phone, or browser without coordination, can be merged across databases without clashes, and are not guessable.",
          "The three formats people usually compare are UUID, GUID, and Nano ID. The first two turn out to be the same thing.",
        ],
      },
      {
        heading: "UUID and GUID are the same format",
        paragraphs: [
          "A UUID (Universally Unique Identifier) is a 128-bit value defined in RFC 9562 (which replaced RFC 4122). It is written as 32 hexadecimal digits in five groups, 8-4-4-4-12, for 36 characters including hyphens. GUID (Globally Unique Identifier) is Microsoft's name for the same thing, used in Windows, COM, .NET (System.Guid), and SQL Server (uniqueidentifier).",
          "The only practical differences are presentation. Microsoft tools often show GUIDs in uppercase and sometimes wrapped in braces, and SQL Server stores the first three groups in a different byte order, which matters only if you compare raw bytes. The GUID generator and UUID v4 generator on CodeSimplify produce the same kind of value; pick whichever name your platform uses.",
        ],
        code: {
          language: "text",
          content: `UUID v4:  3f2b8c1e-9a4d-4e7b-b1c2-5d6e7f8a9b0c
                        ^    ^
                        |    variant (8, 9, a, or b)
                        version (4)

GUID:     {3F2B8C1E-9A4D-4E7B-B1C2-5D6E7F8A9B0C}`,
        },
      },
      {
        heading: "UUID versions: v1, v4, and v7",
        paragraphs: [
          "The 13th hex digit tells you the version. Version 1 combines a timestamp with the machine's MAC address, which leaks when and where it was made. Version 4 is 122 random bits plus 6 fixed bits for version and variant, and it is the most widely used. Version 7, standardised in 2024, starts with a 48-bit Unix millisecond timestamp followed by random bits, so IDs created later sort after earlier ones.",
          "That ordering is the reason v7 is gaining ground. Databases such as PostgreSQL and MySQL store primary keys in B-tree indexes. Random v4 values insert at random positions, causing page splits and poor cache use on large tables. Time-ordered v7 values append near the end, like an auto-increment key, while still being generated anywhere.",
        ],
        list: [
          "v1: timestamp + MAC address. Avoid for new systems.",
          "v4: fully random. Good general default.",
          "v7: timestamp-ordered + random. Best for database primary keys.",
        ],
      },
      {
        heading: "Nano ID: shorter and URL-friendly",
        paragraphs: [
          "Nano ID is not a standard but a small, popular library. By default it produces a 21-character string from a 64-character alphabet (A–Z, a–z, 0–9, _ and -), for example V1StGXR8_Z5jdHi6B-myT. Each character carries 6 bits, so 21 characters give 126 random bits, slightly more than UUID v4's 122.",
          "The advantages are length and convenience: 21 characters instead of 36, no hyphens, and safe to use directly in URLs and file names. You can also choose your own alphabet and length, for example 10 characters of digits and uppercase letters for a short invite code, as long as you accept a higher collision chance. The Nano ID generator lets you try different sizes.",
          "The downsides are that Nano IDs have no native database type, so they are stored as text, and they are not time-ordered. Other systems will not recognise them as a standard format.",
        ],
      },
      {
        heading: "Will two IDs ever collide?",
        paragraphs: [
          "With 122 random bits, the chance of any collision is negligible for real-world systems. You would need to generate about 2.7 quintillion (2.7 × 10^18) UUID v4 values before having a 50% chance of a single duplicate. Nano ID's default 21 characters are in the same range.",
          "Collisions in practice come from bad randomness, not from the format. Always use a cryptographically secure source: crypto.randomUUID() in browsers and Node, uuid.uuid4() in Python, Guid.NewGuid() in .NET, or a well-known library. Never build IDs from Math.random(). If you shorten Nano IDs to 8 or 10 characters, the safety margin shrinks quickly, so add a unique constraint in the database.",
        ],
        code: {
          language: "javascript",
          content: `// Browser and Node 19+
const id = crypto.randomUUID();   // e.g. "3f2b8c1e-9a4d-4e7b-b1c2-5d6e7f8a9b0c"

// Nano ID (npm install nanoid)
import { nanoid } from "nanoid";
const shortId = nanoid();         // 21 chars, e.g. "V1StGXR8_Z5jdHi6B-myT"`,
        },
      },
      {
        heading: "Which one to choose",
        paragraphs: [
          "Use UUID v7 for database primary keys in new projects if your language has a library for it. Use UUID v4 when you need a standard, widely recognised ID and ordering does not matter, such as request IDs, idempotency keys, or file names. Say GUID if you are in the Microsoft world; it is the same value. Use Nano ID for public-facing short IDs in URLs, such as shareable links. And keep in mind that a random ID is not a secret: if it grants access, pair it with proper authorisation checks.",
        ],
      },
    ],
    faq: [
      {
        question: "Is a GUID the same as a UUID?",
        answer:
          "Yes. GUID is Microsoft's name for a UUID. Both are 128-bit values in the same 8-4-4-4-12 hex format; Microsoft tools may display them in uppercase or with braces.",
      },
      {
        question: "Can two UUID v4 values be the same?",
        answer:
          "In theory yes, but the probability is negligible with a proper random generator. You would need around 2.7 × 10^18 IDs for a 50% chance of one duplicate.",
      },
      {
        question: "Is Nano ID better than UUID?",
        answer:
          "It is shorter and URL-safe with similar randomness, which suits public links. UUID is a recognised standard with native database types, and v7 sorts by time, which suits primary keys.",
      },
    ],
  },
  {
    slug: "how-emi-is-calculated",
    title: "How EMI Is Calculated: Formula, Example, and the Effect of Prepayment",
    seoTitle: "How EMI Is Calculated: Formula, Example, and Prepayment",
    description:
      "The EMI formula with a worked ₹10 lakh example at 8.5% for 20 years, how each EMI splits into interest and principal, and how prepayment saves interest.",
    updated: "2026-10-14",
    readMinutes: 4,
    tools: [
      { categorySlug: "loan-calculators", slug: "emi-calculator" },
      { categorySlug: "loan-calculators", slug: "loan-prepayment" },
      { categorySlug: "loan-calculators", slug: "home-loan" },
    ],
    sections: [
      {
        heading: "What an EMI is",
        paragraphs: [
          "An EMI, or Equated Monthly Instalment, is the fixed amount you pay the lender every month until a loan is fully repaid. Home loans, car loans, personal loans, and education loans in India are almost always repaid this way. Each EMI covers that month's interest plus a part of the principal, and the amount is set so that the loan reaches exactly zero on the last payment.",
          "Three things decide the EMI: the principal (the amount borrowed), the interest rate, and the tenure (the number of months). Banks quote an annual rate, but interest is charged monthly on the outstanding balance, so the calculation uses the monthly rate.",
        ],
      },
      {
        heading: "The EMI formula",
        paragraphs: [
          "The standard reducing-balance formula is shown below. P is the principal, r is the monthly interest rate (annual rate ÷ 12 ÷ 100), and n is the number of monthly instalments.",
        ],
        code: {
          language: "text",
          content: `EMI = P × r × (1 + r)^n / ((1 + r)^n − 1)

P = principal
r = annual rate ÷ 12 ÷ 100
n = tenure in months`,
        },
      },
      {
        heading: "Worked example: ₹10 lakh at 8.5% for 20 years",
        paragraphs: [
          "Take a home loan of ₹10,00,000 at 8.5% per year for 20 years. The monthly rate r is 8.5 ÷ 12 ÷ 100 = 0.0070833, and n is 20 × 12 = 240 months. (1 + r)^240 works out to about 5.44. Putting these into the formula gives an EMI of about ₹8,678 per month.",
          "Over 240 months you pay ₹8,678 × 240 ≈ ₹20,82,776 in total. Subtract the ₹10,00,000 principal and the total interest is about ₹10,82,776, more than the amount borrowed. This surprises many first-time borrowers, and it is the main reason tenure and prepayment decisions matter so much. You can check any combination of amount, rate, and tenure in the EMI Calculator.",
        ],
        list: [
          "Principal: ₹10,00,000",
          "Rate: 8.5% p.a. (0.70833% per month)",
          "Tenure: 240 months",
          "EMI: ≈ ₹8,678",
          "Total interest: ≈ ₹10,82,776",
          "Total paid: ≈ ₹20,82,776",
        ],
      },
      {
        heading: "How each EMI splits into interest and principal",
        paragraphs: [
          "The EMI stays the same, but its make-up changes every month. Interest is charged on the outstanding balance, so early in the loan most of the EMI goes to interest. In the first month of the example, interest is ₹10,00,000 × 0.0070833 ≈ ₹7,083, and only about ₹1,595 reduces the principal.",
          "As the balance falls, the interest part shrinks and the principal part grows. After five years (60 EMIs) you will have paid about ₹5.2 lakh, yet the outstanding balance is still about ₹8,81,272. This schedule is called the amortisation table, and it is why prepaying early in a loan saves far more than prepaying near the end.",
        ],
      },
      {
        heading: "How prepayment changes the loan",
        paragraphs: [
          "A prepayment is an extra payment toward principal on top of your EMIs. Because it reduces the balance directly, every future month's interest is calculated on a smaller amount. Banks usually let you choose between two options: keep the EMI the same and shorten the tenure, or keep the tenure and lower the EMI.",
          "Continuing the example, suppose you prepay ₹2,00,000 after the 60th EMI, when the balance is about ₹8,81,272. If you keep the EMI at ₹8,678, the remaining 180 months drop to about 116, so the loan ends roughly 5 years 4 months early. Total interest falls from about ₹10,82,776 to about ₹7,19,146, a saving of around ₹3,63,630.",
          "If instead you keep the remaining 15-year tenure, the EMI falls to about ₹6,709 and total interest becomes about ₹9,28,270, a saving of around ₹1,54,506. Reducing tenure saves much more interest; reducing EMI gives more monthly breathing room. The Loan Prepayment calculator shows both options for your own numbers.",
        ],
      },
      {
        heading: "Practical points before you prepay",
        paragraphs: [
          "Under RBI rules, banks and NBFCs cannot charge prepayment or foreclosure penalties on floating-rate loans taken by individuals for non-business purposes. Fixed-rate loans and business loans may still carry a charge, often 2–4% of the amount prepaid, so check your loan agreement.",
          "Also compare the loan rate with what the money could earn elsewhere after tax, and keep an emergency fund before prepaying. For home loans, remember that interest up to ₹2 lakh a year on a self-occupied house can be deducted under Section 24(b) in the old tax regime, which slightly lowers the effective cost of the loan for those who use that regime.",
        ],
        list: [
          "Prepay early in the tenure for the biggest interest saving.",
          "Choose reduced tenure if your budget allows; choose reduced EMI if cash flow is tight.",
          "Confirm in writing that the prepayment went to principal.",
          "On floating rates, a rate rise usually extends tenure rather than raising EMI; ask your bank which it applied.",
        ],
      },
    ],
    faq: [
      {
        question: "What is the EMI for ₹10 lakh at 8.5% for 20 years?",
        answer:
          "About ₹8,678 per month. Over 240 months you pay about ₹20.83 lakh in total, of which about ₹10.83 lakh is interest.",
      },
      {
        question: "Is it better to reduce EMI or tenure after prepayment?",
        answer:
          "Reducing tenure saves more interest because the balance falls faster. Reducing EMI is useful if you want a lower monthly commitment.",
      },
      {
        question: "Why is most of my early EMI going to interest?",
        answer:
          "Interest is charged on the outstanding balance, which is highest at the start. As you repay principal, the interest part shrinks and more of each EMI reduces the loan.",
      },
    ],
  },
  {
    slug: "sip-vs-lump-sum",
    title: "SIP vs Lump Sum Investing: How Returns Are Calculated",
    seoTitle: "SIP vs Lump Sum: How Returns Are Calculated, With Examples",
    description:
      "SIP and lump sum formulas explained with ₹10,000 a month and ₹12 lakh examples at 12%, why the totals differ, and how to choose between the two approaches.",
    updated: "2026-10-14",
    readMinutes: 4,
    tools: [
      { categorySlug: "investment-calculators", slug: "sip-calculator" },
      { categorySlug: "investment-calculators", slug: "lumpsum-calculator" },
      { categorySlug: "investment-calculators", slug: "step-up-sip" },
    ],
    sections: [
      {
        heading: "Two ways to put money into a fund",
        paragraphs: [
          "A Systematic Investment Plan (SIP) invests a fixed amount at regular intervals, usually monthly, into a mutual fund. A lump sum investment puts the whole amount in at once. The fund can be the same in both cases; only the timing of your money changes.",
          "That timing affects both how returns are calculated and what you actually experience. A lump sum is fully exposed to the market from day one. A SIP enters gradually, buying more units when prices are low and fewer when they are high, which is called rupee cost averaging.",
        ],
      },
      {
        heading: "How lump sum returns are calculated",
        paragraphs: [
          "A lump sum grows by simple compounding. If you invest P at an annual return r for t years, the future value is P × (1 + r)^t. For ₹12,00,000 at 12% for 10 years, (1.12)^10 is about 3.1058, so the corpus is about ₹37,27,018. The Lumpsum Calculator applies this formula for any amount, rate, and period.",
        ],
        code: {
          language: "text",
          content: `Lump sum:  FV = P × (1 + r)^t

P = ₹12,00,000, r = 12%, t = 10
FV = 12,00,000 × 3.1058 ≈ ₹37,27,018`,
        },
      },
      {
        heading: "How SIP returns are calculated",
        paragraphs: [
          "A SIP is a series of lump sums, each compounding for a different length of time. The first instalment grows for the full period, the last for only one month. Adding them up gives the future value of an annuity. Most Indian SIP calculators use the formula below, with i as the annual rate divided by 12 and the final (1 + i) term because each instalment is invested at the start of the month.",
          "For ₹10,000 a month at 12% a year for 10 years, i = 0.01 and n = 120. (1.01)^120 is about 3.3004, so the future value is 10,000 × (2.3004 ÷ 0.01) × 1.01 ≈ ₹23,23,391. You invest ₹12,00,000 in total and gain about ₹11,23,391. The SIP Calculator uses the same method.",
          "Some calculators convert 12% a year into an exact monthly rate of about 0.9489% instead of dividing by 12. That gives about ₹22,40,359 for the same SIP. Neither is wrong; they assume slightly different things, so do not be surprised by small differences between sites.",
        ],
        code: {
          language: "text",
          content: `SIP:  FV = A × [((1 + i)^n − 1) / i] × (1 + i)

A = ₹10,000, i = 12% ÷ 12 = 0.01, n = 120
FV ≈ ₹23,23,391  (invested ₹12,00,000)`,
        },
      },
      {
        heading: "Why the lump sum looks so much bigger",
        paragraphs: [
          "In the examples, both invest ₹12 lakh, but the lump sum ends at about ₹37.3 lakh and the SIP at about ₹23.2 lakh. That does not mean lump sum is a better product. The lump sum had all ₹12 lakh working for the full 10 years, while the SIP's money was invested on average for only about five years.",
          "The comparison is fair only if you actually have ₹12 lakh today. Most salaried people do not; they have income each month. For them, the real choice is between investing monthly through a SIP or saving up and investing later, and the SIP usually wins because the money starts compounding sooner.",
        ],
      },
      {
        heading: "Real returns are not a fixed 12%",
        paragraphs: [
          "Both formulas assume a constant return every year. Equity funds do not behave that way; they can fall 20–30% in a year and rise sharply in another. With a lump sum, the entry point matters a lot: investing just before a fall can leave you behind for years. With a SIP, a fall in the early years actually helps, because your instalments buy more units at lower prices.",
          "Because of this, actual SIP performance is measured with XIRR, which accounts for the date of each instalment, rather than the fixed-rate formula. The calculators are for planning, not prediction.",
        ],
      },
      {
        heading: "Which one should you choose?",
        paragraphs: [
          "If you earn monthly and are building wealth over years, a SIP fits naturally and removes the need to time the market. If you receive a large amount at once, such as a bonus, inheritance, or property sale, a lump sum puts it to work immediately, which historically has done better on average in rising markets. If investing it all at once feels risky, a common middle path is to park the money in a liquid or debt fund and move it into equity through a Systematic Transfer Plan (STP) over 6–12 months.",
        ],
        list: [
          "Regular income, long horizon: SIP, and increase it yearly with a step-up SIP.",
          "Large one-time amount, long horizon: lump sum or STP over a few months.",
          "Short horizon under 3 years: neither in equity; consider debt funds or fixed deposits.",
        ],
      },
    ],
    faq: [
      {
        question: "What will ₹10,000 a month in a SIP be worth after 10 years at 12%?",
        answer:
          "About ₹23.2 lakh using the standard SIP formula, on a total investment of ₹12 lakh. Actual results depend on real market returns, which vary year to year.",
      },
      {
        question: "Is SIP better than lump sum?",
        answer:
          "Neither is always better. A lump sum usually ends higher in a steadily rising market because all the money is invested longer; a SIP reduces timing risk and suits monthly income.",
      },
      {
        question: "Are SIP returns guaranteed?",
        answer:
          "No. Mutual fund returns depend on the market. The 12% used in calculators is an assumption for planning, not a promise.",
      },
    ],
  },
  {
    slug: "cagr-vs-xirr-vs-absolute-return",
    title: "CAGR vs XIRR vs Absolute Return Explained",
    seoTitle: "CAGR vs XIRR vs Absolute Return: Differences Explained",
    description:
      "Absolute return, CAGR, and XIRR measure growth differently. See the formulas, a worked rupee example for each, and which one to use for SIPs and lump sums.",
    updated: "2026-10-14",
    readMinutes: 4,
    tools: [
      { categorySlug: "investment-calculators", slug: "cagr-calculator" },
      { categorySlug: "investment-calculators", slug: "xirr-calculator" },
      { categorySlug: "investment-calculators", slug: "roi-calculator" },
    ],
    sections: [
      {
        heading: "Why one number is not enough",
        paragraphs: [
          "Saying an investment \"doubled\" tells you nothing useful until you know how long it took. Doubling in three years is excellent; doubling in fifteen years is below a fixed deposit. And if you added money at different times, as with a SIP, even the idea of \"how long\" becomes unclear. Absolute return, CAGR, and XIRR each answer a different question, and mixing them up is one of the most common mistakes in reading fund statements.",
        ],
      },
      {
        heading: "Absolute return: total growth, ignoring time",
        paragraphs: [
          "Absolute return is the simplest measure: how much your money grew in total, as a percentage of what you put in. If ₹1,00,000 becomes ₹2,00,000, the absolute return is 100%, whether that took one year or twenty.",
          "It is useful for short periods, under a year, where annualising can give misleading numbers, and for seeing total profit at a glance. It is not useful for comparing investments held for different lengths of time. Mutual fund factsheets typically show absolute returns for periods under one year and annualised returns for longer periods.",
        ],
        code: {
          language: "text",
          content: `Absolute return = (Final value − Invested) / Invested × 100

(2,00,000 − 1,00,000) / 1,00,000 × 100 = 100%`,
        },
      },
      {
        heading: "CAGR: the steady yearly rate",
        paragraphs: [
          "Compound Annual Growth Rate is the constant yearly rate that would take your starting value to your ending value over the period. It smooths out the ups and downs into one annual figure, which makes it the standard way to compare a single investment with another over different periods.",
          "If ₹1,00,000 grows to ₹2,00,000 in 5 years, CAGR is (2)^(1/5) − 1 ≈ 14.87% per year. Note that this is lower than the 20% you get by simply dividing 100% by 5 years, because CAGR accounts for compounding: 14.87% compounded for 5 years doubles the money. The CAGR Calculator does this for any start value, end value, and period.",
          "The limitation is that CAGR only works with one amount in and one amount out. It cannot handle additional deposits or withdrawals in between.",
        ],
        code: {
          language: "text",
          content: `CAGR = (Final value / Initial value)^(1 / years) − 1

(2,00,000 / 1,00,000)^(1/5) − 1 = 0.1487 → 14.87% per year`,
        },
      },
      {
        heading: "XIRR: annual return with multiple cash flows",
        paragraphs: [
          "XIRR (Extended Internal Rate of Return) handles real-life investing, where money goes in and out on different dates. It finds the single annual rate at which the present value of all your investments and withdrawals, each discounted by its exact number of days, adds up to zero. There is no closed-form formula; it is solved by trial and error, which is why spreadsheets and calculators do it for you.",
          "Example: you invest ₹1,00,000 on 1 January 2021 and another ₹50,000 on 1 July 2022, and the holding is worth ₹2,10,000 on 1 January 2025. Your absolute return is 40% on ₹1,50,000 invested. A naive CAGR over four years would be about 8.8%, but that wrongly assumes all ₹1,50,000 was invested from the start. XIRR accounts for the second payment being invested for only 2.5 years and gives about 10.0% per year.",
          "Enter each date and amount (investments as negative, current value as positive) in the XIRR Calculator, or use =XIRR(values, dates) in Excel or Google Sheets.",
          "For a SIP, every monthly instalment is a separate negative cash flow, and redemptions or dividends paid out are positive ones. Most mutual fund platforms and the consolidated account statement from CAMS or KFintech already report XIRR for each folio, so you can compare your own calculation with theirs. If the result looks wrong, the usual causes are a sign error (an investment entered as positive) or a missing current value on the final date.",
        ],
        code: {
          language: "text",
          content: `Date          Cash flow
01-01-2021    −1,00,000
01-07-2022      −50,000
01-01-2025    +2,10,000

XIRR ≈ 10.0% per year`,
        },
      },
      {
        heading: "Which measure to use",
        paragraphs: [
          "Match the measure to how the money moved. The same portfolio can show three very different numbers, and each is correct for its own question.",
        ],
        list: [
          "Holding period under a year: absolute return.",
          "One investment, no additions or withdrawals: CAGR.",
          "SIPs, top-ups, partial withdrawals, or dividends paid out: XIRR.",
          "Comparing a fund with its benchmark or category: the fund's CAGR over the same period.",
        ],
      },
      {
        heading: "Common mistakes",
        paragraphs: [
          "Do not compare your SIP's XIRR with a fund's published CAGR and conclude that you underperformed or outperformed the fund. They measure different things: the fund's CAGR assumes a single investment at the start date, while your XIRR reflects when your instalments actually went in.",
          "Be wary of annualised figures over very short periods. A 5% gain in two months annualises to over 30%, which says nothing about what the next year will bring. And remember that all three numbers are before tax unless stated; capital gains tax and expense ratios reduce what you actually keep.",
        ],
      },
    ],
    faq: [
      {
        question: "What is the difference between CAGR and XIRR?",
        answer:
          "CAGR works for one investment with a start and end value. XIRR handles multiple investments and withdrawals on different dates, so it is the right measure for SIPs.",
      },
      {
        question: "Is XIRR the same as IRR?",
        answer:
          "Both find the rate that makes the net present value of cash flows zero. IRR assumes evenly spaced periods; XIRR uses the actual date of each cash flow.",
      },
      {
        question: "Why is my CAGR lower than total return divided by years?",
        answer:
          "Simple division ignores compounding. CAGR is the rate that, compounded each year, reaches the final value, so it is always lower than the simple average for gains over more than one year.",
      },
    ],
  },
  {
    slug: "css-flexbox-vs-grid",
    title: "CSS Flexbox vs Grid: When to Use Which",
    seoTitle: "CSS Flexbox vs Grid: When to Use Which, With Examples",
    description:
      "Flexbox lays out items in one direction; Grid controls rows and columns together. See side-by-side code, common layouts for each, and how to combine them.",
    updated: "2026-10-14",
    readMinutes: 4,
    tools: [
      { categorySlug: "css", slug: "flexbox-generator" },
      { categorySlug: "css", slug: "grid-generator" },
    ],
    sections: [
      {
        heading: "The short answer",
        paragraphs: [
          "Flexbox is a one-dimensional layout system: it arranges items along a single row or a single column and lets them grow, shrink, and wrap based on their content. CSS Grid is a two-dimensional system: you define rows and columns, and items line up in both directions at once.",
          "A useful way to think about it is content-out versus layout-in. With Flexbox, the items' sizes drive the layout. With Grid, you define the layout first and place items into it. Both are supported in every current browser, and most real pages use both.",
        ],
      },
      {
        heading: "How Flexbox works",
        paragraphs: [
          "You set display: flex on a container, and its direct children become flex items. flex-direction chooses the main axis (row or column). justify-content distributes items along that axis, align-items aligns them across it, and gap adds space between them. The flex shorthand on each item controls how it grows and shrinks: flex: 1 means \"take an equal share of the leftover space\".",
          "The example below is a typical navigation bar: a logo on the left, links on the right, all vertically centred. The Flexbox Generator lets you toggle these properties and copy the resulting CSS.",
        ],
        code: {
          language: "css",
          content: `.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.navbar .links {
  display: flex;
  gap: 1.5rem;
}`,
        },
      },
      {
        heading: "How Grid works",
        paragraphs: [
          "With display: grid, you define tracks using grid-template-columns and grid-template-rows. The fr unit divides available space, so 1fr 3fr gives one column a quarter of the width and the other three quarters. Items can span multiple tracks, and grid-template-areas lets you name regions and draw the layout in your CSS.",
          "The example below is a classic page layout with header, sidebar, main content, and footer. Notice that the sidebar and main area line up in both rows and columns, which is exactly what Flexbox cannot guarantee. The Grid Generator helps you build templates like this visually.",
        ],
        code: {
          language: "css",
          content: `.page {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  min-height: 100vh;
  gap: 1rem;
}

header { grid-area: header; }
aside  { grid-area: sidebar; }
main   { grid-area: main; }
footer { grid-area: footer; }`,
        },
      },
      {
        heading: "When to use Flexbox",
        paragraphs: [
          "Reach for Flexbox when you are arranging a line of things and want their content to decide how much space each one takes. It is also the simplest way to centre one element inside another.",
        ],
        list: [
          "Navigation bars, toolbars, and button groups.",
          "Centring an item horizontally and vertically with justify-content: center and align-items: center.",
          "Form rows where an input should stretch and a button should stay its natural width.",
          "Tag or chip lists that wrap onto new lines with flex-wrap: wrap.",
          "Pushing one item to the far end with margin-left: auto.",
        ],
      },
      {
        heading: "When to use Grid",
        paragraphs: [
          "Reach for Grid when items need to line up in both directions, or when you want the layout to stay fixed regardless of content size. A card gallery is the classic case. With Flexbox and wrapping, the last row's cards stretch or leave awkward gaps; with Grid they stay in neat columns.",
          "The repeat(auto-fill, minmax(220px, 1fr)) pattern below creates as many columns as fit, each at least 220px wide, with no media queries needed.",
        ],
        list: [
          "Overall page layout: header, sidebar, content, footer.",
          "Card grids, image galleries, and product listings.",
          "Dashboards with widgets spanning several rows or columns.",
          "Forms where labels and inputs should align in columns.",
          "Overlapping elements by placing them in the same grid cell.",
        ],
        code: {
          language: "css",
          content: `.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.25rem;
}`,
        },
      },
      {
        heading: "Using them together",
        paragraphs: [
          "The choice is not either-or. A common pattern is Grid for the page and the card gallery, and Flexbox inside each card to stack the image, title, and text, with the button pushed to the bottom using margin-top: auto. Grid handles the macro layout; Flexbox handles small components.",
          "For nested grids where child elements must align with the parent's tracks, such as card titles lining up across a row, use subgrid (grid-template-rows: subgrid), which is now supported in all major browsers.",
          "Responsive design often moves between the two. A row of three feature boxes might be a Grid with three columns on desktop, then a single column on mobile with one media query changing grid-template-columns to 1fr. A toolbar might stay as a Flexbox row and simply wrap. Both systems share the same alignment properties (justify-content, align-items, gap), so what you learn in one carries over to the other.",
        ],
      },
      {
        heading: "A quick decision rule",
        paragraphs: [
          "Ask one question: do I need to control rows and columns at the same time? If yes, use Grid. If you only care about one direction, and especially if item sizes should depend on their content, use Flexbox. If you find yourself setting fixed widths on flex items to force them into columns, that is usually a sign the layout wants to be a grid.",
        ],
      },
    ],
    faq: [
      {
        question: "Is CSS Grid better than Flexbox?",
        answer:
          "Neither is better; they solve different problems. Grid is for two-dimensional layouts with rows and columns, Flexbox for arranging items in one direction.",
      },
      {
        question: "Can I use Flexbox inside a Grid?",
        answer:
          "Yes. Any grid item can itself be a flex container, and this combination is very common: Grid for the page structure, Flexbox inside components.",
      },
      {
        question: "How do I centre a div with Flexbox or Grid?",
        answer:
          "With Flexbox, set display: flex, justify-content: center, and align-items: center on the parent. With Grid, display: grid and place-items: center on the parent does the same.",
      },
    ],
  },
  {
    slug: "how-to-create-strong-password",
    title: "How to Create a Strong Password (and What Makes One Weak)",
    seoTitle: "How to Create a Strong Password: Length, Entropy, and Tips",
    description:
      "What actually makes a password strong: length, randomness, and uniqueness. Learn how passwords are cracked, how entropy works, and how to manage many passwords.",
    updated: "2026-10-14",
    readMinutes: 5,
    tools: [
      { categorySlug: "security", slug: "password-generator" },
      { categorySlug: "security", slug: "password-strength" },
    ],
    sections: [
      {
        heading: "How passwords actually get cracked",
        paragraphs: [
          "Most accounts are not broken by someone guessing at a login screen. They are broken in two other ways. The first is credential stuffing: a website you used years ago is breached, your email and password leak, and attackers automatically try the same pair on email, banking, and shopping sites. The second is offline cracking: attackers obtain a database of password hashes and use GPUs to test billions of guesses per second against it.",
          "Offline cracking does not start with random guesses. It starts with lists of real leaked passwords, dictionary words, names, dates, and keyboard patterns, then applies rules such as capitalising the first letter, swapping a for @ and o for 0, and adding 123 or ! at the end. A password that feels clever to a person is often one rule away from a wordlist entry.",
        ],
      },
      {
        heading: "What makes a password weak",
        paragraphs: [
          "A password is weak if it is short, predictable, or reused. Predictable means anything a person would think of: a word, a name, a cricket team, a pet, a birthday, a mobile number, or a pattern on the keyboard. Adding a symbol to a predictable base, like Mumbai@2024, barely helps, because cracking tools try exactly those substitutions first.",
        ],
        list: [
          "Common passwords: 123456, password, qwerty, iloveyou, admin@123.",
          "Personal details: names, dates of birth, phone numbers, vehicle numbers.",
          "Words with obvious substitutions: P@ssw0rd, Ind!a2024.",
          "Short passwords of 8 characters or fewer, even if mixed.",
          "Any password used on more than one site.",
        ],
      },
      {
        heading: "Length and randomness: the idea of entropy",
        paragraphs: [
          "Password strength is measured in bits of entropy: how many guesses an attacker would need if they knew exactly how you generated it. Each bit doubles the work. For a truly random password, entropy is length × log2(size of the character set).",
          "An 8-character password of random lowercase letters has about 37.6 bits, which a GPU rig can exhaust quickly against a fast hash. Twelve random characters from upper, lower, and digits (62 symbols) give about 71 bits. Sixteen random characters from all 94 printable symbols give about 105 bits, which is beyond any practical brute-force attack. Length adds strength faster than complexity does, which is why current NIST guidance focuses on length rather than forced symbol rules.",
          "The formula only applies to random passwords. A 16-character password that is a common phrase with a year on the end has far less real entropy than its length suggests. That is why a generator is better than inventing one. The Password Generator uses your browser's secure random source, and the Password Strength checker estimates how resistant an existing password is to common attacks.",
        ],
        code: {
          language: "text",
          content: `Entropy = length × log2(character set size)

8 lowercase letters        8 × log2(26)  ≈ 37.6 bits
12 chars A–Z a–z 0–9      12 × log2(62)  ≈ 71.5 bits
16 chars, all 94 symbols  16 × log2(94)  ≈ 104.9 bits
5 random Diceware words    5 × log2(7776) ≈ 64.6 bits`,
        },
      },
      {
        heading: "Passphrases for passwords you must remember",
        paragraphs: [
          "For the few passwords you have to type from memory, such as your laptop login or password manager master password, a passphrase works well: several words picked at random, for example from the 7,776-word Diceware list. Five random words give about 64.6 bits and six give about 77.5 bits, and something like \"lantern-orbit-mango-velvet-crisp-harbor\" is easier to remember and type than a jumble of symbols.",
          "The words must be chosen randomly, by dice or a generator, not picked by you. A favourite song lyric or a famous quote is in cracking wordlists.",
        ],
      },
      {
        heading: "Use a password manager for everything else",
        paragraphs: [
          "No one can remember a unique random password for a hundred sites, and reusing passwords is the single biggest risk. A password manager such as Bitwarden, 1Password, KeePassXC, or the one built into your browser or phone solves this. You remember one strong passphrase; the manager generates and stores a unique random password for every site and fills it in for you.",
          "A good default for generated passwords is 16 to 20 characters with all character types enabled. If a site rejects certain symbols, increase the length instead.",
        ],
      },
      {
        heading: "Turn on two-factor authentication",
        paragraphs: [
          "Even a perfect password can be stolen by phishing or malware. Two-factor authentication (2FA) means a stolen password alone is not enough. Authenticator apps (TOTP codes) and passkeys or hardware security keys are much stronger than SMS codes, which can be intercepted through SIM-swap fraud. Enable 2FA first on your email account, since email is used to reset every other password, and then on banking, UPI-linked, and social accounts.",
        ],
        list: [
          "Use a unique password for every account.",
          "Make generated passwords at least 16 characters.",
          "Use a random multi-word passphrase for your master password.",
          "Enable 2FA, preferably with an authenticator app or passkey.",
          "Change a password when a site reports a breach, not on a fixed schedule.",
        ],
      },
    ],
    faq: [
      {
        question: "How long should a password be?",
        answer:
          "At least 12 characters for anything you type by hand, and 16 or more for passwords stored in a password manager. Length matters more than adding symbols.",
      },
      {
        question: "Are online password generators safe?",
        answer:
          "A generator that runs in your browser using the Web Crypto API, like the CodeSimplify Password Generator, never sends the password anywhere. Avoid generators that create passwords on a server.",
      },
      {
        question: "Should I change my passwords regularly?",
        answer:
          "Current NIST guidance says no, unless there is evidence of compromise. Forced regular changes tend to produce weaker, predictable passwords like Summer2025 then Summer2026.",
      },
      {
        question: "Is a passphrase better than a complex password?",
        answer:
          "For passwords you must remember, a passphrase of five or six randomly chosen words is as strong as a short complex password and much easier to type. For everything else, let a password manager generate random passwords.",
      },
    ],
  },
];
