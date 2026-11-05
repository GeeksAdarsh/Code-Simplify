import type { ToolExtraContent } from "./types";

export const group8: Record<string, ToolExtraContent> = {
  "javascript/obfuscator": {
    about: [
      "A JavaScript obfuscator makes source code hard to read while keeping it runnable. This one passes your code through Terser, the minifier used by many build tools, with compression and top-level name mangling turned on. It then rewrites every quoted string as \\x and \\u escape sequences, so messages, URLs and labels no longer appear as plain text in the file.",
      "Paste a script or load the sample and the obfuscated version appears a moment later; there are no settings to tune. Copy the result or download it as obfuscated.js. People use it to discourage casual copying of a widget or bookmarklet, to hide simple strings from anyone skimming view-source, or to ship a small script without readable comments and whitespace.",
      "Example: in the sample, calculateTotal and its variables are renamed to single letters, and \"Total: $\" becomes \"\\x54\\x6f\\x74...\". Because compression is on, Terser may also inline constants and drop code that can never run, so test the output before you ship it. Your code is processed in the browser and is not uploaded.",
    ],
    faq: [
      {
        question: "What is the difference between minifying and obfuscating JavaScript?",
        answer: "Minifying removes whitespace and comments and shortens names to make the file smaller. Obfuscating aims to make the code harder for people to understand. This tool does a minify pass and then encodes strings, which makes the output a little larger than plain minified code, because every character in a string becomes 4 or 6 characters.",
      },
      {
        question: "Can I use obfuscation to hide an API key in front-end code?",
        answer: "No. Hex-escaped strings are decoded instantly by any JavaScript engine, so typing the variable into the browser console or watching the Network tab reveals the key. Keep secrets on a server and have the browser call your own endpoint instead.",
      },
    ],
  },

  "javascript/deobfuscator": {
    about: [
      "A JavaScript deobfuscator, sometimes called an unminifier or JS beautifier, turns a compressed one-line script back into something a person can read. It decodes \\xNN and \\uNNNN escapes inside quoted strings, so hidden URLs and messages become visible again, and then reformats the whole file with Prettier.",
      "Paste a minified bundle, a script copied from a page, or the output of an obfuscator, and the readable version appears in the output pane; copy it or download it as deobfuscated.js. The result uses 2-space indentation, semicolons and double quotes. It is useful for reviewing a suspicious snippet, debugging a third-party script without source maps, or learning how a minified library works.",
      "Example: console.log(\"\\x54\\x6f\\x74\\x61\\x6c\") becomes console.log(\"Total\") on its own indented line. Short names like a, b and c stay as they are, so the quickest way to understand the result is to rename variables in your editor as you work out what they hold. If the input has a syntax error, an error is shown instead of output. Everything runs in your browser.",
    ],
    faq: [
      {
        question: "How do I unminify JavaScript in Chrome DevTools?",
        answer: "Open the Sources panel, select the file, and click the {} (Pretty print) button at the bottom of the editor. That fixes the layout but leaves escaped strings as they are, which is the extra step this tool handles.",
      },
      {
        question: "Why are some strings still unreadable after deobfuscating?",
        answer: "Only single- and double-quoted strings with \\xNN or four-digit \\uNNNN escapes are decoded. Template literals are left untouched, code point escapes in the \\u{...} form are not supported, and strings built at runtime with String.fromCharCode, atob or array lookups stay hidden, because the tool never runs the code.",
      },
    ],
  },

  "javascript/playground": {
    about: [
      "This JavaScript playground is an online JS console where you can write code, run it and see the output without installing Node.js or opening DevTools. Your code runs in a hidden, sandboxed iframe, and anything passed to console.log, console.info, console.warn or console.error shows up in the console panel next to the editor.",
      "Write code or load the sample, then click Run. Each run starts a fresh iframe, so variables from the previous run are gone, Clear console empties the output without touching your code, and Clear resets both. It is handy for testing an array method, checking a regular expression, trying a snippet from documentation, or practising for a coding interview.",
      "Objects and arrays are printed as indented JSON, so some values look different from a browser console: a Map or Set prints as {}, and functions and undefined properties are left out of objects. Log [...myMap] or Object.fromEntries(myMap) to see a Map's contents. Uncaught errors appear in the console with their message, and the code runs only in your browser.",
    ],
    faq: [
      {
        question: "Can I use await or import statements in the playground?",
        answer: "Not at the top level. Your code is wrapped in a regular function before it runs, so a top-level await is a syntax error and import or export statements do not work. Put async code inside an async function and call it, for example (async () => { const x = await somePromise; console.log(x); })();",
      },
      {
        question: "Do setTimeout and promises work?",
        answer: "Yes. Timers and promises keep running after your code finishes, and their console output appears when they fire. Clicking Run again or Clear replaces the iframe, which stops anything that is still pending.",
      },
    ],
  },

  "typescript/playground": {
    about: [
      "The TypeScript playground lets you write TypeScript and run it straight away in the browser. When you click Run, the code is compiled to JavaScript with the official TypeScript compiler's transpileModule function, targeting ES2020, and the result runs in a sandboxed iframe with its console output shown beside the editor.",
      "Write code or load the sample, which uses an interface, a typed function and an enum, then click Run. Types are stripped rather than checked, so code with a type error still runs as long as the JavaScript it produces is valid. Use it to see how enums behave at runtime, test generic functions with real values, or try a snippet from the TypeScript handbook.",
      "Enums are one of the few TypeScript features that produce runtime code. enum Direction { Up, Down } compiles to an object with both name-to-number and number-to-name entries, so Direction.Up is 0 and Direction[0] is \"Up\", while interfaces and type aliases disappear entirely. Compilation and execution both happen in your browser.",
    ],
    faq: [
      {
        question: "Can I import npm packages or use top-level await?",
        answer: "No. The compiled code runs inside a regular function in an isolated iframe, so import statements, export statements and top-level await do not work. Write self-contained code, and wrap async logic in an async function that you call at the end.",
      },
      {
        question: "Which JavaScript version does my TypeScript compile to?",
        answer: "ES2020. Syntax that ES2020 already supports, such as optional chaining, nullish coalescing, async/await and classes, is kept as written, and TypeScript-only syntax like type annotations, interfaces and access modifiers is removed or compiled away.",
      },
    ],
  },

  "java/formatter": {
    about: [
      "This Java formatter, also called a Java beautifier, reformats Java source code using Prettier with prettier-plugin-java. It parses the code and prints it again from scratch, so messy indentation, code crammed onto one line and inconsistent spacing are all fixed in one pass without changing what the code does.",
      "Paste a full file, a single class, one method or a few statements, and the formatted result appears in the output pane; copy it or download it as Formatted.java. If the input is not a complete file, the tool wraps it in a temporary class, and if needed a method, formats it, and removes the wrapper so you get back only your own code. It is useful for tidying a snippet before a code review, a forum question or documentation.",
      "The output uses 4-space indentation and a 100-character line width, so long method chains and argument lists are broken across lines. This is Prettier's own style, which differs in places from IntelliJ defaults and from the Google Java Style Guide, which uses 2-space indentation. Formatting runs entirely in your browser.",
    ],
    faq: [
      {
        question: "How do I format Java code in IntelliJ IDEA, Eclipse or VS Code?",
        answer: "In IntelliJ IDEA, use Code > Reformat Code or press Ctrl + Alt + L (Cmd + Option + L on Mac). In Eclipse, press Ctrl + Shift + F or use Source > Format. In VS Code with the Java extension installed, press Shift + Alt + F.",
      },
      {
        question: "Why did the formatter put my method arguments on separate lines?",
        answer: "When a statement would be longer than 100 characters, Prettier breaks it, usually by putting each argument or each chained call on its own line. Shorter calls stay on one line. Your original line breaks are not kept, because the layout is rebuilt from the parsed code.",
      },
    ],
  },

  "java/escape-unescape": {
    about: [
      "A Java string escaper turns raw text into a valid Java string literal you can paste into source code, and the unescaper turns an escaped literal back into plain text. In Escape mode, backslashes, double quotes, newlines, carriage returns, tabs, backspace and form feed become \\\\, \\\", \\n, \\r, \\t, \\b and \\f, other control characters become \\uXXXX escapes, and the result is wrapped in double quotes.",
      "Choose Escape or Unescape with the toggle, then type or paste into the left pane; the right pane updates as you type and Copy puts the result on your clipboard. Load sample fills in an example for the current mode. Common uses are embedding a JSON payload, SQL query or multi-line message in a unit test, and decoding a string copied from a log or stack trace.",
      "Example: He said \"hi\" followed by a line break becomes \"He said \\\"hi\\\"\\n\". Line breaks are written as \\n rather than \\u000a on purpose, because the Java compiler converts \\u escapes before it reads string literals, so \\u000a inside quotes becomes a real line break and fails to compile. Accented letters and emoji are kept as they are, and both directions run in your browser.",
    ],
    faq: [
      {
        question: "How do I write a multi-line string in Java without escaping?",
        answer: "Use a text block, available as a standard feature since Java 15. Start it with three double quotes followed by a line break and end it with three double quotes. Inside a text block, line breaks are kept and ordinary double quotes do not need a backslash.",
      },
      {
        question: "What happens to escape sequences the unescaper does not recognise?",
        answer: "It decodes \\n, \\r, \\t, \\b, \\f, \\\\, \\\", \\' and \\uXXXX. For any other backslash sequence it drops the backslash and keeps the next character, so octal escapes such as \\0 or \\101 are not converted to the characters they stand for.",
      },
    ],
  },

  "rust/formatter": {
    about: [
      "This Rust formatter is a lightweight, browser-based tidier for Rust code, not a port of rustfmt. It splits code crammed onto one line so each statement and block gets its own line, normalizes spacing around commas, colons and operators such as =, == and ->, and re-indents everything by brace depth with 4 spaces, the same indent width rustfmt uses by default.",
      "Paste Rust code or load the sample, and the result appears in the output pane; copy it or download it as formatted.rs. Lines are broken after { and ; and before }, but never inside parentheses or square brackets, so function arguments and array expressions like [0; 5] stay on one line. It helps when a snippet from a chat, issue or forum post arrives on one line and you do not have cargo at hand.",
      "Because it works line by line instead of parsing Rust, it does not wrap long lines, reorder use statements, or apply rustfmt's rules for method chains and match arms. Spacing around <, >, & and * is left alone because those characters also appear in generics, references and dereferences. For the official style, run cargo fmt before committing; this page runs entirely in your browser.",
    ],
    faq: [
      {
        question: "How do I run rustfmt on my project?",
        answer: "rustfmt is installed with most rustup toolchains; if it is missing, run rustup component add rustfmt. Then run cargo fmt in the project root to format every file, or cargo fmt --check in CI to fail the build when files need formatting. Style options go in a rustfmt.toml file.",
      },
      {
        question: "Is the output always valid Rust?",
        answer: "Usually, because only whitespace and line breaks change outside strings, char literals and comments. One known edge case is raw strings such as r#\"...\"#, whose contents can be re-spaced. Run cargo check on the result if anything looks off.",
      },
    ],
  },

  "email/validator": {
    about: [
      "This email validator checks whether an email address is correctly formatted, the same kind of syntax check a sign-up form should run before accepting an address. It splits the address into the local part before the @ and the domain after it, checks each against the rules for email addresses, and lists every problem it finds in plain language.",
      "Type or paste an address and the result updates as you type; Load valid example and Load invalid example show what passing and failing addresses look like. Checks include the 254-character limit for the whole address, 64 characters for the local part, 63 characters per domain label, and a top-level domain made of letters only. When a valid address uses a domain one or two typos away from a major provider such as gmail.com or outlook.com, a clickable correction appears.",
      "Example: jordan.lee+newsletter@example.com is valid, because + is allowed in the local part, while john..doe@@gmial,com fails because of the double dot, the second @ and a comma where the domain needs a dot. Passing this check does not prove the mailbox exists; only a confirmation email can show that. Validation runs in your browser.",
    ],
    faq: [
      {
        question: "Is an email address with a plus sign valid?",
        answer: "Yes. The + character is allowed in the local part, and Gmail and many other providers deliver name+anything@ to the same inbox as name@, which is useful for filtering sign-ups. Some websites still reject + by mistake, but the address itself is valid.",
      },
      {
        question: "What regex should I use to validate email addresses?",
        answer: "No practical regular expression covers every address the standards allow. A simple pattern such as /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/ catches most typos without rejecting real addresses, and an HTML input with type=\"email\" gives you a similar built-in browser check. Confirm the address by sending an email.",
      },
      {
        question: "Are email addresses case sensitive?",
        answer: "The domain part is not: Example.COM and example.com are the same. The standards allow a mail server to treat the local part as case sensitive, but almost every provider ignores case, so storing and comparing addresses in lowercase is a safe default.",
      },
    ],
  },

  "email/header-analyzer": {
    about: [
      "An email header analyzer reads the raw headers of a message and turns them into something you can follow: who sent it, which servers handled it, how long each step took, and whether it passed SPF, DKIM and DMARC. It helps you work out why an email was delayed, why it landed in spam, or whether it might be a phishing attempt.",
      "Paste the headers or the whole message source; reading stops at the first blank line, where headers end and the body begins, and folded lines are joined back together. You get a summary of From, To, Subject, Date, Message-ID and Reply-To, badges for SPF, DKIM and DMARC, a numbered delivery path with the time between hops, and a table of every header. Load sample headers shows a typical message sent through a mailing service.",
      "Pitfall: hop delays are calculated from timestamps that each server writes with its own clock, so a negative or unusually large delay usually means one clock is wrong. Also compare the From and Reply-To addresses, since replies sent to an unrelated domain are a common phishing trick. Parsing happens in your browser.",
    ],
    faq: [
      {
        question: "How can I tell from the headers if an email is spoofed?",
        answer: "Start with the DMARC result. dmarc=pass means the domain in the From address matched a domain that passed SPF or DKIM, which is hard to fake. A fail, or no authentication results at all on a message claiming to be from a large company, is a warning sign, as is an origin server that has nothing to do with the sender.",
      },
      {
        question: "Why did my email take so long to arrive?",
        answer: "Look for the hop with the largest delay in the delivery path. A delay at the first hops usually points to the sender's mail queue or a mailing service throttling sends, while a delay near the end often comes from spam filtering or greylisting at the receiving server.",
      },
      {
        question: "Can I trust every Received header?",
        answer: "No. Each server adds its header at the top, and a sender can insert fake Received lines before the message leaves them. Only the headers added by servers you trust, such as your own mail provider's, are reliable; anything below those could be forged.",
      },
    ],
  },

  "email/signature-generator": {
    about: [
      "This email signature generator builds an HTML signature from a simple form with your name, job title, company, email, phone, website, optional address and links to LinkedIn, Twitter/X and GitHub. The layout uses a table with inline styles, the approach most email clients display reliably, and a matching plain-text version is created alongside it.",
      "Fill in the fields and the live preview updates as you type. The accent color sets the link color and, when there is no logo, a vertical bar to the left of your details, while a logo or photo URL adds a 72-pixel-wide image on the left. Links typed without http:// or https:// get https:// added automatically. Copy HTML copies the code and Copy text copies the plain-text version.",
      "Copy HTML gives you HTML source code, which suits clients that accept signature HTML. Editors such as Gmail's signature box expect formatted content instead, so for those, select the signature in the live preview, copy it and paste it in. Host the logo on HTTPS, since some clients block images until the recipient allows them. The signature is generated in your browser.",
    ],
    faq: [
      {
        question: "Why does my signature show HTML code instead of the design?",
        answer: "The HTML source was pasted into an editor that expects formatted text. Copy the signature from the live preview instead and paste that, or use your client's HTML option if it has one, such as the Use HTML checkbox in Thunderbird's signature settings.",
      },
      {
        question: "What should a professional email signature include?",
        answer: "Your name, job title, company and one or two ways to reach you, such as a phone number and website, are enough for most people. Keep it to a few short lines, use one accent color, and add only the social links you actually want people to use.",
      },
    ],
  },

  "networking/http-header-viewer": {
    about: [
      "An HTTP header viewer shows the response headers a web server sends back for a URL, together with the status code. It is a quick way to check caching headers like Cache-Control and ETag, security headers like Strict-Transport-Security and Content-Security-Policy, cookies, compression, and which server or CDN is answering, without opening DevTools or a terminal.",
      "Enter a full http:// or https:// URL and click Fetch headers or press Enter. The request is sent through the site's server and the result is not saved; you see the status code, its category such as Success or Redirection, the Location of any redirect, and a table of every header. Common uses are confirming a 301 redirect, checking that HSTS is set after enabling HTTPS, and debugging why a CDN is not caching a page.",
      "The request comes from a server with its own user agent and no cookies, so the headers can differ from what your browser receives, especially on sites that vary by country, device or login. The page body is downloaded and thrown away, and a header sent more than once, such as Set-Cookie, appears in one row with its values joined by commas.",
    ],
    faq: [
      {
        question: "How do I check HTTP headers with curl?",
        answer: "curl -I https://example.com sends a HEAD request and prints the headers. Some servers answer HEAD differently from GET, so to see the headers of a normal GET request use curl -s -D - -o /dev/null https://example.com (use -o NUL on Windows). This tool sends a GET request.",
      },
      {
        question: "What is the difference between a 301 and a 302 redirect?",
        answer: "A 301 is a permanent redirect: browsers may cache it and search engines move ranking to the new URL. A 302 is temporary, so the original URL stays the one that is indexed. 308 and 307 are the permanent and temporary versions that also guarantee the request method, such as POST, is kept.",
      },
      {
        question: "Which security headers should a website send?",
        answer: "A good baseline is Strict-Transport-Security to force HTTPS, Content-Security-Policy to limit where scripts and other resources load from, X-Content-Type-Options: nosniff, a Referrer-Policy, and frame-ancestors in the CSP or X-Frame-Options to prevent clickjacking. Fetch your own site here to see which ones are missing.",
      },
    ],
  },

  "networking/user-agent-parser": {
    about: [
      "A user agent parser breaks a User-Agent string into the parts you care about: browser and version, rendering engine, operating system and device type. The string your browser sends with every request is full of historical tokens like Mozilla/5.0 and KHTML, like Gecko, so a parser saves you decoding it by hand.",
      "When the page opens, your own browser's User-Agent is filled in and parsed automatically. Paste any other string, for example from a server log or analytics export, or try the three samples: Chrome on Windows, Safari on iPhone and Googlebot. The result also says whether the string looks like a bot, and lists the tokens inside the first pair of parentheses, which usually hold platform details.",
      "Version numbers are less precise than they look. Windows 10 and 11 both send Windows NT 10.0, so the tool shows 10 / 11, current Chrome reports only its major version followed by .0.0.0, and browsers on a Mac report macOS 10.15.7 even on newer releases. iPads on iPadOS 13 or later request desktop sites by default and identify as a Mac. Parsing runs in your browser.",
    ],
    faq: [
      {
        question: "How do I find my browser's user agent?",
        answer: "Open this page and it is shown at the top. In code, read navigator.userAgent in the browser console, or open DevTools, go to the Network tab, click any request and look for User-Agent under the request headers.",
      },
      {
        question: "How do I change my user agent in Chrome?",
        answer: "Open DevTools, open the menu, choose More tools > Network conditions, and under User agent untick Use browser default. Pick a preset or paste a custom string. The change applies only while DevTools is open on that tab.",
      },
      {
        question: "Why are curl and Python requests shown as bots?",
        answer: "The parser marks strings containing names of common automated clients as bots, including curl, Wget, python-requests, axios, PostmanRuntime and HeadlessChrome, along with crawlers such as Googlebot and Bingbot. These are not browsers driven by a person, so they are usually excluded from analytics.",
      },
    ],
  },

  "networking/ip-lookup": {
    about: [
      "An IP lookup tool, also called an IP geolocation lookup, shows where an IP address is located and who operates it. Enter a public IPv4 or IPv6 address to see the country, region, city, postal code, time zone, approximate coordinates, ISP, organization, and the autonomous system (AS) that announces the address block.",
      "Type an address such as 8.8.8.8 and click Lookup or press Enter. The query is sent through the site's server to an IP geolocation service and the result is not saved. Loopback, private, link-local and multicast addresses are refused because they are not unique on the internet. People use it to check where a suspicious login came from, identify the hosting provider behind an address in server logs, or confirm that a VPN changes their apparent location.",
      "Example: 8.8.8.8 is Google's public DNS resolver and shows Google's network, AS15169. Addresses like this one are anycast, meaning the same IP is served from many locations, so the city shown is only where the address is registered. The same caution applies to mobile networks and VPNs, where the location usually reflects the provider's network rather than the user.",
    ],
    faq: [
      {
        question: "How do I find my own public IP address?",
        answer: "This tool looks up an address you enter rather than detecting yours. Search for \"what is my IP\" in a search engine, or run curl https://api.ipify.org in a terminal. Your router's status page also shows its WAN address, though some ISPs share one public address between many customers, so it can differ.",
      },
      {
        question: "What is an ASN?",
        answer: "An Autonomous System Number identifies a network that runs its own routing on the internet, such as an ISP, a cloud provider or a large company. ASNs are assigned by regional internet registries, and the AS shown in a lookup tells you which network is responsible for the address.",
      },
    ],
  },

  "networking/cidr-calculator": {
    about: [
      "A CIDR calculator works out the details of an IPv4 network from CIDR notation such as 10.0.0.0/16. From one line of input it shows the network address, broadcast address, subnet mask, wildcard mask, first and last usable host, total and usable address counts, the legacy address class, and whether the range is private.",
      "Type an address with a prefix and the results update as you type. You can enter any address inside a block, such as 192.168.1.77/24, and the tool finds the network it belongs to; if you leave out the prefix, /24 is assumed. It is commonly used when planning a VPC or VLAN, writing firewall rules or cloud security groups, and checking which range a host address falls into.",
      "The math: a /n prefix leaves 32 - n host bits, so the block holds 2^(32 - n) addresses, and the usable hosts are that number minus two for the network and broadcast addresses. A /24 has 256 addresses and 254 usable hosts, and a /26 has 64 and 62. The wildcard mask is the inverse of the subnet mask, the form used in Cisco ACLs and OSPF statements. Calculations run in your browser.",
    ],
    faq: [
      {
        question: "How do I find the network address from an IP and prefix?",
        answer: "Apply a bitwise AND between the address and the subnet mask. For 192.168.1.77/26 the mask is 255.255.255.192, and 77 AND 192 is 64, so the network is 192.168.1.64 and the broadcast address is 192.168.1.127.",
      },
      {
        question: "What are the private IP address ranges?",
        answer: "RFC 1918 reserves 10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16 for private networks, and they are not routed on the public internet. This calculator also marks the loopback range 127.0.0.0/8 and the link-local range 169.254.0.0/16 as private, since neither is publicly reachable.",
      },
    ],
  },

  "networking/subnet-calculator": {
    about: [
      "This subnet calculator analyzes an IPv4 network and splits it into smaller subnets. Enter an address with either a CIDR prefix or a dotted subnet mask, and it shows the network and broadcast addresses, the usable host range and host counts, then lists every subnet you get when you divide the block.",
      "Switch between CIDR and Mask input with the toggle; a dotted mask is accepted only if it is a valid, contiguous mask such as 255.255.255.192. Under Split this network into subnets, choose Number of equal subnets or Hosts needed per subnet and enter a value to see the new prefix and a table of subnets with their network, broadcast and usable range. It is used to carve an office range into VLANs, plan cloud VPC subnets, and practise subnetting for exams like CCNA.",
      "Subnets always come in powers of two. Asking for 5 equal subnets of a /24 gives 8 subnets of /27, because 2 extra bits make only 4 subnets and 3 bits make 8. Hosts needed works the other way: 50 hosts needs a /26 with 62 usable addresses, and the whole network is divided into subnets of that size. Everything is calculated in your browser.",
    ],
    faq: [
      {
        question: "How do I convert a subnet mask to CIDR notation?",
        answer: "Count the 1 bits in the mask. Each 255 octet is 8 bits, and the last octet adds 0 for 0, 1 for 128, 2 for 192, 3 for 224, 4 for 240, 5 for 248, 6 for 252, 7 for 254 or 8 for 255. So 255.255.255.192 is 8 + 8 + 8 + 2 = /26; you can also type the mask in Mask mode and read the CIDR notation from the results.",
      },
      {
        question: "Why is my subnet mask rejected?",
        answer: "A subnet mask must be a run of 1 bits followed only by 0 bits. A mask like 255.255.0.255 or 255.255.255.100 breaks that rule, so it is not a real subnet mask. Valid octets after the first non-255 octet must be 0.",
      },
    ],
  },

  "networking/port-lookup": {
    about: [
      "A port lookup tells you which service normally uses a TCP or UDP port number, and which port a service uses by default. This reference covers well-known ports such as 22 for SSH, 53 for DNS and 443 for HTTPS, plus common defaults for databases, message brokers, dev servers and admin tools, such as 5432 for PostgreSQL and 6379 for Redis.",
      "Type a port number to find an exact match, or a word such as mysql, mail, vpn or database to search service names and descriptions. The result count updates as you type, and an empty box shows the whole table with the protocol, service and a short description of each port. It is useful when reading firewall rules, netstat output or a security scan report, or when choosing a port for a new service.",
      "Port numbers are conventions, not guarantees: any program can listen on any port, so traffic on 443 is not necessarily HTTPS. IANA divides ports into well-known (0 to 1023), registered (1024 to 49151) and dynamic or ephemeral (49152 to 65535), the last range being what operating systems typically pick for the client side of a connection. The table is built into the page and searching contacts no host.",
    ],
    faq: [
      {
        question: "Which port should I use for SMTP: 25, 465 or 587?",
        answer: "Port 25 is for server-to-server mail relay and is often blocked for outgoing traffic by ISPs and cloud providers. Mail clients and apps sending through a provider should use 587 with STARTTLS or 465 with implicit TLS, whichever the provider documents.",
      },
      {
        question: "How do I check which program is using a port?",
        answer: "On Windows, run netstat -ano | findstr :8080 and look up the process ID shown in the last column in Task Manager. On macOS or Linux, run lsof -i :8080, or on Linux ss -ltnp, which lists listening TCP ports with the owning process.",
      },
    ],
  },

  "networking/dns-lookup": {
    about: [
      "A DNS lookup tool queries the Domain Name System for a domain's records so you can see where it points without using dig or nslookup. Choose A for IPv4 addresses, AAAA for IPv6, MX for mail servers, TXT for SPF and verification strings, NS for name servers, CNAME for aliases, SOA for zone details, or CAA for which certificate authorities may issue certificates.",
      "Enter a domain such as example.com, pick a record type and click Lookup or press Enter. The query is sent through the site's server and its DNS resolver, nothing is saved, and each record comes back with its type, name, TTL and value. Typical uses are checking that a new A record is live, confirming MX records after moving email, and finding the TXT record a service asked you to add.",
      "Values are shown in zone-file form: an MX record like 10 mail.example.com. starts with a priority, where lower numbers are tried first, and the trailing dot marks a fully qualified name. Because answers come from a caching resolver, the TTL shown is often the time left on the cached copy, so it can be lower than the value set at your DNS provider. Names containing underscores, such as _dmarc records, are not accepted.",
    ],
    faq: [
      {
        question: "How do I do a DNS lookup from the command line?",
        answer: "On any system, nslookup -type=MX example.com queries a specific record type. On macOS and Linux, dig example.com MX +short gives a compact answer. In Windows PowerShell, use Resolve-DnsName example.com -Type MX.",
      },
      {
        question: "Why does my DNS change not show up yet?",
        answer: "Resolvers keep serving the old record until its TTL runs out, so a record with a TTL of 3600 can take up to an hour to update everywhere. Changing name servers at your registrar can take longer. Lowering the TTL a day before a planned change makes the switch faster.",
      },
      {
        question: "How do I check a domain's SPF record?",
        answer: "Select TXT and look up the domain; the SPF record is the TXT value that starts with v=spf1. A domain should publish only one SPF record, because receivers treat more than one as an error and SPF checks then fail.",
      },
    ],
  },

  "networking/whois-lookup": {
    about: [
      "A WHOIS lookup shows the public registration record for a domain name: the registrar, when it was created, when it expires, when it was last updated, its name servers, and status codes such as clientTransferProhibited. It is the quickest way to check whether a domain is taken, when it is due for renewal, or which registrar manages it.",
      "Enter a domain with its extension, such as example.com, and click Lookup or press Enter. The site's server queries the registry's WHOIS server for that extension, using a built-in list for common ones like .com, .org and .io and asking IANA for the rest, then follows a referral to the registrar's WHOIS server when one is given. The raw text is shown with the server that answered, Copy puts it on your clipboard, and lookups are not saved.",
      "Status codes starting with client are set by the registrar and those starting with server by the registry. clientTransferProhibited is a normal lock against unauthorized transfers, while pendingDelete means the domain is about to be released. Subdomains are not registered separately, so look up example.com rather than www.example.com.",
    ],
    faq: [
      {
        question: "How do I check when a domain expires?",
        answer: "Look for a line such as Registry Expiry Date or Registrar Registration Expiration Date in the result. The date is usually given in UTC in a form like 2026-08-14T04:00:00Z. If you own the domain, the registrar's dashboard shows the same date and your renewal settings.",
      },
      {
        question: "What is the difference between WHOIS and RDAP?",
        answer: "WHOIS is an old plain-text protocol with no fixed output format. RDAP is its replacement: it returns structured JSON over HTTPS and supports access controls for private data. ICANN has moved generic top-level domains to RDAP, so some registrars now return less over WHOIS or have stopped offering it.",
      },
    ],
  },

  "colors/picker": {
    about: [
      "This online color picker lets you choose a color visually, sample one from your screen, or paste a value you already have, and shows the same color as HEX, RGB, HSL, HSV and CMYK. Each format has its own Copy button, so you can grab a CSS value, a design-tool value or a rough print value without converting by hand.",
      "Choose color opens your browser's native color dialog and Random color picks a new one. Pick from screen, shown only in browsers that support the EyeDropper API such as Chrome and Edge, lets you click any pixel on your screen. The text box accepts hex codes, rgb() and hsl() values written with commas, and a set of common CSS color names such as coral or steelblue. It is handy for matching a brand color from a screenshot or moving a color between CSS and design software.",
      "Transparency is not kept: an 8-digit hex code or an rgba() value is treated as the solid color, so add the alpha back in your CSS. The space-separated syntax, such as rgb(14 165 233), is not recognised here, so use commas. CMYK is calculated with a simple formula, fine as a starting point for print but not a replacement for a printer's color profile. Everything runs in your browser.",
    ],
    faq: [
      {
        question: "How do I get the color code from an image or website?",
        answer: "In Chrome or Edge, open the image or page in one window, click Pick from screen here, and click the pixel you want. In Firefox, the DevTools color picker in the Rules view also has an eyedropper, and you can paste the value it gives you into the text box.",
      },
      {
        question: "Which color format should I use in CSS?",
        answer: "Hex, rgb() and hsl() all describe the same sRGB colors and work in every modern browser. Hex is the most compact, and hsl() is easiest to adjust by hand. HSV and CMYK are not valid CSS color formats, so use them only in design tools or code that expects them.",
      },
    ],
  },

  "colors/hex-rgb": {
    about: [
      "A HEX to RGB converter translates a hex color code like #0ea5e9 into its red, green and blue values, rgb(14, 165, 233), and converts RGB back to hex. Hex is what you usually copy from a design file or stylesheet, while RGB values are what many APIs, graphics libraries and theme settings expect.",
      "Type in either field and the other updates as you type, with a preview swatch beside them. The HEX field accepts codes with or without the #, in 3-, 4-, 6- or 8-digit form, and the RGB field takes three numbers from 0 to 255, with or without rgb( ). Load sample fills both fields with an example and Clear resets them.",
      "Each pair of hex digits is a base-16 number from 00 to ff. For #0ea5e9, 0e is (0 × 16) + 14 = 14, a5 is (10 × 16) + 5 = 165 and e9 is (14 × 16) + 9 = 233. If you enter a code with transparency, such as #0ea5e980, the alpha digits are dropped and only the solid color is converted. Conversion happens in your browser.",
    ],
    faq: [
      {
        question: "How do I convert HEX to RGB in JavaScript?",
        answer: "Parse the six digits as one number and shift out each channel: const n = parseInt(\"0ea5e9\", 16); const rgb = [(n >> 16) & 255, (n >> 8) & 255, n & 255]; gives [14, 165, 233]. Expand 3-digit codes first by doubling each digit.",
      },
      {
        question: "How do I convert RGB to hex in Excel or Google Sheets?",
        answer: "With red, green and blue in cells A1, B1 and C1, use =DEC2HEX(A1,2)&DEC2HEX(B1,2)&DEC2HEX(C1,2) and add a # in front if you need it. The second argument pads each value to two digits, so 14 becomes 0E rather than E.",
      },
      {
        question: "What do the last two digits of an 8-digit hex code mean?",
        answer: "They are the alpha channel, or opacity: 00 is fully transparent and ff is fully opaque, so 80 is about 50 percent. Browsers support #rrggbbaa in CSS, but this converter ignores the alpha and converts only the color.",
      },
    ],
  },

  "colors/rgb-hsl": {
    about: [
      "An RGB to HSL converter turns red, green and blue values into hue, saturation and lightness, and converts HSL back to RGB. HSL describes color the way people tend to think about it, which color it is, how vivid it is and how light or dark it is, so it is a popular format for CSS themes and design systems.",
      "Type an RGB value in the first field or an HSL value in the second and the other updates instantly with a color preview. You can write rgb(14, 165, 233) or just 14, 165, 233, and hsl(199, 89%, 48%) or 199, 89, 48, and the output is rounded to whole numbers. A common use is building hover and disabled states: keep the hue and saturation of a brand color and change only the lightness.",
      "Lightness is the average of the largest and smallest of the R, G and B values on a 0 to 1 scale, saturation depends on the gap between them, and hue is an angle on the color wheel where 0 is red, 120 is green and 240 is blue. Because HSL output is rounded, converting back can change a channel by a few units, which is not visible. Runs in your browser.",
    ],
    faq: [
      {
        question: "How do I make a color lighter or darker using HSL?",
        answer: "Keep the hue and saturation and change only the lightness. hsl(199, 89%, 48%) becomes a lighter tint at hsl(199, 89%, 65%) and a darker shade at hsl(199, 89%, 35%). You can use these values directly in CSS.",
      },
      {
        question: "Can I paste the modern CSS syntax like hsl(199 89% 48%)?",
        answer: "Yes. The HSL and RGB fields read the numbers in what you type, so space-separated values work as well as commas, and an alpha value after a slash is ignored. The output is written in the comma form, which every browser accepts.",
      },
    ],
  },

  "colors/rgb-cmyk": {
    about: [
      "An RGB to CMYK converter turns screen colors, made of red, green and blue light, into the cyan, magenta, yellow and black ink percentages used in print, and converts CMYK back to RGB. It gives you a starting point when a logo or brand color defined for the web has to go onto business cards, flyers or packaging.",
      "Enter RGB as rgb(14, 165, 233) or three numbers from 0 to 255, or CMYK as cmyk(94%, 29%, 0%, 9%) or four numbers from 0 to 100, and the other field and the preview swatch update immediately. Percentages are rounded to whole numbers. Use it to fill in CMYK fields on a print order, sanity-check values a printer sent you, or preview roughly how a CMYK spec looks on screen.",
      "The formula: with R', G' and B' as the channels divided by 255, K = 1 - max(R', G', B') and C = (1 - R' - K) / (1 - K), and likewise for M and Y. Because black is taken out first, at least one of C, M and Y is always 0, while real print separations usually mix all four inks. Many CMYK values map to the same RGB color, so a round trip can return different numbers. Runs in your browser.",
    ],
    faq: [
      {
        question: "What is rich black in CMYK?",
        answer: "Rich black adds cyan, magenta and yellow under 100% black to get a deeper black on large areas, for example 60% C, 40% M, 40% Y and 100% K. This converter returns plain black, 0% C, M and Y with 100% K, for rgb(0, 0, 0). Ask your printer for their preferred recipe, and keep small text in plain black.",
      },
      {
        question: "Why do CMYK values from Photoshop or Illustrator differ from this converter?",
        answer: "Design software converts through an ICC color profile for a specific press and paper, such as a coated FOGRA or SWOP profile, which applies ink limits and its own black generation. This converter uses the plain mathematical formula, so its numbers are a reasonable estimate rather than press-ready values.",
      },
    ],
  },

  "colors/hex-cmyk": {
    about: [
      "A HEX to CMYK converter takes a web color code such as #0ea5e9 and gives you approximate cyan, magenta, yellow and black percentages for print, and converts CMYK back to hex. It saves a step when a brand guide lists only hex codes and a printer asks for CMYK.",
      "Type a hex code with or without the #, in 3- or 6-digit form, or CMYK as cmyk(94%, 29%, 0%, 9%) or four numbers from 0 to 100. The other field and a color swatch update as you type, Load sample fills in #0ea5e9, and Clear empties both fields. It suits quick jobs like stationery, stickers and slides sent to a print shop.",
      "Example: #ff8800, a bright orange, converts to cmyk(0%, 47%, 100%, 0%). Screens can show some saturated colors that ink on paper cannot reproduce, especially vivid blues, greens and oranges, so the print can look duller than the screen. For an exact match, ask the printer for a proof or use a Pantone spot color. Everything runs in your browser.",
    ],
    faq: [
      {
        question: "How do I convert HEX to CMYK by hand?",
        answer: "Convert the hex code to RGB, divide each channel by 255, and set K = 1 - the largest of the three. Then C = (1 - R - K) / (1 - K), and the same for M with green and Y with blue. For #0ea5e9 that gives about 94% C, 29% M, 0% Y and 9% K.",
      },
      {
        question: "What is the CMYK value of white?",
        answer: "#ffffff converts to cmyk(0%, 0%, 0%, 0%), meaning no ink at all. In print, white areas are simply the paper, so on colored or off-white stock they take on the paper's color unless the printer uses white ink.",
      },
    ],
  },

  "colors/hex-hsv": {
    about: [
      "A HEX to HSV converter turns a hex color code into hue, saturation and value, also called HSB, and converts HSV back to hex. HSV is the model behind the square-and-slider color pickers in Photoshop and many other design tools and UI libraries, so it is the format you need to reproduce a hex color in one of those pickers.",
      "Enter a hex code with or without the #, or an HSV value such as hsv(199, 94%, 91%) or 199, 94, 91, and the other field updates along with a preview swatch. Hue is in degrees and wraps around, so 360 is the same as 0, while saturation and value run from 0 to 100. Developers use it with image processing and graphics code that works in HSV, and designers use it to match colors across tools.",
      "Value is the largest of the R, G and B channels as a percentage, and saturation is S = (max - min) / max. So #0ea5e9 has V = 233 / 255, about 91%, and S = (233 - 14) / 233, about 94%. Watch the scale in other software: OpenCV stores 8-bit hue as 0 to 179 and saturation and value as 0 to 255, so convert before using these numbers there. Runs in your browser.",
    ],
    faq: [
      {
        question: "How do I convert HSV to hex in Python?",
        answer: "Use the built-in colorsys module: colorsys.hsv_to_rgb(h, s, v) takes values from 0 to 1, so divide hue by 360 and saturation and value by 100. Multiply the results by 255, round them, and format each with '{:02x}' to build the hex code.",
      },
      {
        question: "Why does changing the hue do nothing for gray colors?",
        answer: "When saturation is 0, as with white, black and every gray, there is no color for the hue to describe, so any hue gives the same result. This converter reports a hue of 0 for those colors.",
      },
    ],
  },
};
