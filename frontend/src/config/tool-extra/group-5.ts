import type { ToolExtraContent } from "./types";

export const group5: Record<string, ToolExtraContent> = {
  "numbers/percentage-difference": {
    about: [
      "Percentage difference tells you how far apart two numbers are, measured against their average: |A − B| ÷ ((|A| + |B|) ÷ 2) × 100. Because it uses the average, swapping A and B gives the same answer. The calculator also shows percentage change, (B − A) ÷ |A| × 100, which depends on which value came first.",
      "A worked example: comparing a ₹450 price with a ₹500 price, the difference is 50 and the average is 475, so the percentage difference is 50 ÷ 475 × 100 ≈ 10.53%. The percentage change from ₹450 to ₹500 is 50 ÷ 450 × 100 ≈ +11.11%, while going from ₹500 down to ₹450 is −10%. The default values on the page, 80 and 100, give 22.22% difference and +25% change.",
      "Use percentage difference when neither number is the original, such as two lab readings or two shops quoting the same phone. Use percentage change for growth, discounts, or before-and-after figures.",
    ],
    faq: [
      {
        question: "How do I calculate percentage difference between two numbers?",
        answer: "Subtract one number from the other and take the absolute value, divide by the average of the two numbers, then multiply by 100. For 40 and 60 that is 20 ÷ 50 × 100 = 40%.",
      },
      {
        question: "Why does the result show a dash when value A is 0?",
        answer: "Percentage change from zero is undefined because you cannot divide by zero, so the calculator shows a dash instead of a misleading number. If both values are 0, there is no difference to measure.",
      },
      {
        question: "Can percentage difference be more than 100%?",
        answer: "Yes, up to a maximum of 200%. For example, 10 and 90 have a difference of 80 and an average of 50, giving 160%.",
      },
    ],
  },

  "php/beautifier": {
    about: [
      "A PHP beautifier turns code with broken or missing indentation into something you can read again. This one trims each line and re-indents it four spaces per level of {, ( and [ nesting, while skipping braces that appear inside strings and // or /* */ comments. Your line breaks stay where they are, so the diff against the original is easy to review.",
      "A common case is a legacy WordPress plugin or an old include file that was edited over years in different editors, leaving tabs, two-space blocks and flush-left lines mixed together. Paste it in, copy the result, and the structure of every if, foreach and class becomes visible before you start changing logic.",
      "Know the limits before pasting a whole project: switch/case bodies are not given an extra level, # comments are not recognised as comments, and lines inside multi-line strings or heredocs get trimmed like normal code, which can change the string’s contents.",
    ],
    faq: [
      {
        question: "Will beautifying PHP change how my code runs?",
        answer: "For ordinary code, no — only leading whitespace changes. The exception is multi-line strings and heredoc/nowdoc blocks, where leading spaces are part of the value, so check those sections after beautifying.",
      },
      {
        question: "Does it split long lines or put each statement on its own line?",
        answer: "No. It keeps your existing line breaks and only fixes indentation. If several statements sit on one line, they stay on one line.",
      },
      {
        question: "Can I beautify a PHP file that also contains HTML?",
        answer: "Yes. The HTML lines are kept, though they are indented according to any open PHP braces around them, for example inside a foreach loop that outputs markup.",
      },
    ],
  },

  "php/formatter": {
    about: [
      "This PHP formatter is an indentation fixer. It reads your code line by line, counts opening and closing braces, brackets and parentheses, and rewrites each line’s leading whitespace as four spaces per nesting level. Quoted strings and // or /* */ comments are skipped, so a brace inside an echo statement or a comment does not throw the count off.",
      "It is handy when you need to paste a snippet into a Jira ticket, a pull request comment or a Stack Overflow question and the copied code has lost its indentation. It also helps when reviewing a controller written by several people with different tab settings.",
      "A practical tip: if the output looks shifted from some point onward, look just above that point for an unbalanced bracket, a # comment containing a brace, or a heredoc. Those are the cases this lightweight approach does not handle, and they often point to a real typo too.",
    ],
    faq: [
      {
        question: "Does the PHP formatter follow PSR-12?",
        answer: "Only partly. It uses PSR-12’s four-space indentation, but it does not move braces, add spaces around operators or enforce line length the way PHP-CS-Fixer or PHP_CodeSniffer would.",
      },
      {
        question: "Can I change the indent to tabs or two spaces?",
        answer: "No, the output always uses four spaces per level. If your project uses tabs, run your editor’s convert-indentation command after pasting the result.",
      },
    ],
  },

  "python/formatter": {
    about: [
      "Python uses indentation to define blocks, so mixed tabs and spaces or a stray three-space line can cause an IndentationError or, worse, put code in the wrong block. This formatter works out each line’s nesting depth the way Python’s tokenizer does — tabs count to the next multiple of 8 columns — and rewrites everything with four spaces per level.",
      "Typical uses are a script copied from a PDF or chat message, a notebook cell pasted into a .py file, or an old Python 2 file where some functions used tabs. It also strips trailing whitespace and reduces runs of more than two blank lines to two, while leaving triple-quoted strings exactly as they were.",
      "One thing to expect: continuation lines inside brackets that were aligned under an opening parenthesis become a normal one-level indent instead. The code still runs the same, but the visual alignment changes.",
    ],
    faq: [
      {
        question: "How do I fix \"inconsistent use of tabs and spaces in indentation\" in Python?",
        answer: "Paste the code here and copy the output: every indent is rewritten with spaces only, which removes the TabError. Then set your editor to insert spaces when you press Tab so it does not come back.",
      },
      {
        question: "Can it fix code where all indentation was lost?",
        answer: "No. If every line starts at column zero, the information about which lines belong to which block is gone, and no formatter can reliably guess it. The tool needs some indentation, even inconsistent, to work from.",
      },
    ],
  },

  "python/minifier": {
    about: [
      "A Python minifier makes source files smaller without changing what they do. Because indentation is part of Python’s syntax, this tool cannot join lines together. Instead it removes # comments and blank lines and shrinks every indentation level to a single space, keeping the relative nesting Python needs.",
      "This is useful when a script must fit somewhere with tight limits, such as a microcontroller running MicroPython, a cloud function pasted into a web console, or a code field in a config form. As a rough guide, a line nested two levels deep goes from 8 leading spaces to 2.",
      "It is not an obfuscator: variable names, docstrings and string literals are untouched, so savings depend on how many comments and indented lines you had. Note that a shebang line (#!/usr/bin/env python3) and an encoding comment are also removed because they start with #, so add them back if you need them.",
    ],
    faq: [
      {
        question: "Does minifying Python make it run faster?",
        answer: "Not noticeably. Python compiles source to bytecode before running it, and comments and whitespace are discarded at that stage anyway. The benefit is a smaller file, not faster execution.",
      },
      {
        question: "Will a # inside a string be treated as a comment?",
        answer: "No. The minifier tracks single, double and triple-quoted strings, so text like \"#FF0000\" or a URL fragment inside quotes is kept.",
      },
      {
        question: "Can I get the original formatting back after minifying?",
        answer: "You can restore readable indentation by running the output through the Python Formatter, but removed comments and blank lines cannot be recovered, so keep your original file.",
      },
    ],
  },

  "qr-barcode/barcode-reader": {
    about: [
      "A barcode reader turns the bars on a label back into the number or text they encode. Upload a photo or screenshot and the tool uses the ZXing library in your browser to find the barcode, then shows the decoded value and its format name, such as EAN_13 or CODE_128. If the value is a web address, an open-link button appears.",
      "People use it to read the EAN-13 number on a product pack (Indian retail barcodes usually start with 890), check that a shipping label printed correctly, or pull a serial number off a device sticker without typing it by hand. It is also a quick way to test barcodes you generated before sending them to print.",
      "For the best results, crop the image so the barcode fills most of it, keep the bars horizontal, and avoid blur. The tool reads one code per image and accepts image files only, not PDFs.",
    ],
    faq: [
      {
        question: "Can I scan a barcode with my phone camera here?",
        answer: "There is no live camera mode. On a phone, tap the upload area and most browsers will offer to take a photo or choose one from your gallery, which is then decoded.",
      },
      {
        question: "What if my image has several barcodes?",
        answer: "The reader returns a single result per image. Crop the photo to the barcode you want and upload each one separately.",
      },
      {
        question: "Does the barcode tell me the product name or price?",
        answer: "No. A retail barcode stores only a number such as a GTIN; the name and price live in the shop’s database. You can search the decoded number online to find the product.",
      },
    ],
  },

  "random-generators/random-address": {
    about: [
      "This generator produces fictional US-style street addresses in the form “4821 Maple Ave, Springfield, IL 62704”. Each one combines a house number from 100 to 9999, a street name and type, one of 12 common city and state pairs, and a random five-digit ZIP code. They are test data, not real places.",
      "Developers and testers use them to fill checkout and shipping forms, seed a demo database, or check how a long address wraps in an invoice layout or mobile screen. Copy all gives you one address per line, which pastes neatly into a spreadsheet column.",
      "Because the ZIP code is random, it usually will not match the city or state, so these addresses fail any real postal or ZIP lookup validation. That makes them good for testing your error handling, but not for testing a happy path that calls an address verification API. The format is American only; there are no Indian PIN code addresses.",
    ],
    faq: [
      {
        question: "Can I generate random Indian addresses with a PIN code?",
        answer: "Not with this tool. It only produces US-style addresses with a state abbreviation and five-digit ZIP code, so it is best for testing forms that expect that format.",
      },
      {
        question: "How many random addresses can I generate at once?",
        answer: "You can choose 1, 5, 10 or 20 per batch and click Regenerate as many times as you like for more.",
      },
    ],
  },

  "random-generators/random-emoji": {
    about: [
      "The random emoji generator picks emoji from a small curated set of 47 characters: smiley faces, animals, plants and fruit, sports, travel and celebration symbols. Choose 1, 5, 10, 20 or 40 at a time, then copy a single emoji or the whole batch.",
      "It is handy for party games like “tell a story using these five emoji”, choosing a reaction for a Slack or WhatsApp group, picking an icon for a Notion page, or breaking a creative block when naming something. Developers also use the output to check that a database column, API or font handles characters outside the basic Latin range.",
      "Since the set is small, a batch of 40 will usually contain repeats. Selection uses the browser’s crypto.getRandomValues, so picks are unpredictable, though for a fun tool like this that mostly means you will not see the same order twice.",
    ],
    faq: [
      {
        question: "Why does an emoji show as a box or question mark?",
        answer: "That means the device or app you pasted into lacks a font for that character, which is common on older Android versions and some desktop programs. The emoji itself was copied correctly.",
      },
      {
        question: "Does copying an emoji copy an image?",
        answer: "No, it copies a Unicode text character. Each app draws it with its own emoji style, which is why the same emoji looks different on iPhone, Android and Windows.",
      },
      {
        question: "Can I choose a category like only animals or only food?",
        answer: "Not currently. Each emoji is drawn from the full mixed set; regenerate until you get ones that suit your purpose.",
      },
    ],
  },

  "random-generators/random-name": {
    about: [
      "This tool creates fictional full names by pairing a random first name with a random last name. It draws from 50 popular English-language first names and 50 common US surnames, which gives 2,500 possible combinations such as “Nora Mitchell” or “Owen Garcia”. You can generate 1, 5, 10 or 20 at a time.",
      "Names like these are useful when you need realistic-looking placeholder people: filling a staging database, populating a UI mock-up or Figma design, writing sample data for a tutorial, or creating characters for a classroom exercise. Using invented names instead of real customer records keeps personal data out of screenshots and test environments.",
      "The lists are Western, so the tool will not give you Indian names. With only 2,500 combinations, repeats are possible in larger datasets, so add a number or ID column if each record must be unique.",
    ],
    faq: [
      {
        question: "Can I generate only first names or only last names?",
        answer: "The tool always outputs a first and last name together. If you need one part, use Copy all, paste into a spreadsheet and split the column on the space.",
      },
      {
        question: "Can I use these names for characters in a story or game?",
        answer: "Yes. They are ordinary common names combined at random, so you are free to use them anywhere, including fiction and games.",
      },
      {
        question: "Does it generate Indian or other regional names?",
        answer: "No, the name lists are English-language names common in the US and UK. For regional names you would need a different source.",
      },
    ],
  },

  "random-generators/random-nickname": {
    about: [
      "The random nickname generator joins a playful adjective with an animal to make short handles like “WittyOtter”, “CosmicLynx” or “BoldFox”. There are 20 adjectives and 20 animals, so 400 combinations, all written in PascalCase without spaces and between 7 and 12 letters long.",
      "Use it when a game, Discord server, quiz app or classroom tool asks for a display name and you do not want to use your real one. Teachers also use it to give students anonymous names for an online quiz, and developers use the output as friendly placeholder names for demo profiles or anonymous chat users.",
      "Popular combinations may already be taken on large platforms. A simple fix is to add your birth month, a lucky number or a short word to the end, for example “QuietHeron07”, which keeps it readable while making it more likely to be free.",
    ],
    faq: [
      {
        question: "How is a nickname different from the random username generator?",
        answer: "Nicknames are adjective plus animal with no numbers, like “LuckyPanda”, meant as display names. The username generator adds a number from 1 to 999 and uses nouns such as pixel, rocket and wizard, making each result much more likely to be unique.",
      },
      {
        question: "Are the nicknames safe for kids?",
        answer: "Yes. All the words are simple, friendly adjectives and animal names, so there is nothing offensive in the output.",
      },
      {
        question: "Can I get a nickname with spaces or emoji?",
        answer: "The output is always one word with no spaces or symbols. You can add a space between the two words or pair it with an emoji from the Random Emoji Generator yourself.",
      },
    ],
  },

  "random-generators/random-phone-number": {
    about: [
      "This generator creates fake phone numbers for software testing in four formats: United States (+1 (XXX) 555-XXXX), United Kingdom mobile (+44 7XXX XXXXXX), India mobile (+91 followed by 10 digits starting with 7, 8 or 9) and a generic international pattern. They are fictional test data for checking forms, not contact details.",
      "Testers use them to check input masks, country-code dropdowns, length validation and how numbers display in a CRM or invoice. For example, an Indian sign-up form should accept a 10-digit number after +91 and reject a 9-digit one.",
      "Be careful outside the US format. The India and UK numbers follow real mobile patterns, so a generated number may belong to an actual person. Never call or message them, and do not use them in a test environment that sends real SMS or OTP messages; use your provider’s sandbox or your own number for that.",
    ],
    faq: [
      {
        question: "Can I use these numbers to receive an OTP or verify an account?",
        answer: "No. They are not connected to any phone you control, so no code would reach you, and if the number happens to be real the message would go to a stranger.",
      },
      {
        question: "Why don’t generated Indian numbers start with 6?",
        answer: "The tool only uses 7, 8 and 9 as the first digit. Real Indian mobile numbers can also start with 6, so make sure your validation accepts that even though this tool will not produce it.",
      },
    ],
  },

  "random-generators/random-username": {
    about: [
      "The random username generator builds handles from an adjective, a capitalised noun and a number from 1 to 999, for example “cosmicOtter417” or “boldRocket8”. With 20 adjectives and 20 nouns, there are about 400,000 possible results, each between 9 and 16 characters and using only letters and digits.",
      "That format passes the rules most sites set for usernames — letters and numbers only, no spaces, under 20 characters — which makes it useful for creating test accounts in QA, seeding user tables in a staging database, or filling the username column of a CSV import. It also works as a quick suggestion when you are signing up for a forum and do not want your real name visible.",
      "If you need many unique values for a database with a unique constraint, generate a few batches and remove duplicates in a spreadsheet, since repeats are rare but possible.",
    ],
    faq: [
      {
        question: "Can I generate usernames with underscores or my own name in them?",
        answer: "No, the format is fixed as adjective, noun and number. You can edit any result by hand, such as changing “swiftFalcon42” to “swift_falcon_42”.",
      },
      {
        question: "Is a random username good for privacy?",
        answer: "Yes, a handle that has nothing to do with your real name, birth year or city makes it harder to link your accounts across sites. Use a different one for each service if that matters to you.",
      },
      {
        question: "How many usernames can I create at once?",
        answer: "Each batch can be 1, 5, 10 or 20 usernames, and Copy all puts them on separate lines for pasting into a file or spreadsheet.",
      },
    ],
  },

  "security/base64-decode": {
    about: [
      "Base64 decoding turns a string of letters, digits, + and / back into the original bytes, and this tool then reads those bytes as UTF-8 text. For example, “SGVsbG8=” decodes to “Hello” and “4oK5” decodes to the rupee sign ₹. Spaces and line breaks in the input are removed first, so Base64 that was wrapped across several lines in an email or config file still works.",
      "Developers reach for it when debugging: reading the value of a Kubernetes Secret, checking what an HTTP Basic Auth header actually contains, inspecting a Base64 field in an API response, or reading an encoded email part. It is also a quick way to confirm that something which looks scrambled is only encoded, not encrypted.",
      "The output must be valid UTF-8 text. If the Base64 holds an image, PDF or other binary file, you will get an error rather than a download, and a data URL needs its “data:…;base64,” prefix removed before pasting.",
    ],
    faq: [
      {
        question: "Why do I get an error when decoding an image from Base64?",
        answer: "This decoder only shows text, so binary data such as PNG or PDF bytes is rejected as invalid UTF-8. Use the Base64 to Image tool for pictures.",
      },
      {
        question: "What does the = or == at the end of Base64 mean?",
        answer: "It is padding. Base64 works in groups of 3 bytes, and one or two = signs mark that the last group was short. Some systems leave padding off, and this tool decodes either way.",
      },
    ],
  },

  "security/base64-encode": {
    about: [
      "Base64 encoding represents any text as a string built from 64 safe characters (A–Z, a–z, 0–9, + and /), with = used as padding. This tool first converts your text to UTF-8 bytes, so Hindi, Tamil, emoji and symbols like ₹ encode correctly, then outputs standard Base64 as you type.",
      "A typical use is building an HTTP Basic Auth header by hand: “user:pass” encodes to “dXNlcjpwYXNz”, and the header becomes “Authorization: Basic dXNlcjpwYXNz”. Others include putting text values into a Kubernetes Secret, storing small strings in JSON or XML without escaping problems, or preparing test data for an API that expects Base64 fields.",
      "Expect the output to be about one third larger than the input, because every 3 bytes become 4 characters. The tool encodes text you type or paste; it does not take file uploads.",
    ],
    faq: [
      {
        question: "How do I Base64 encode a username and password for Basic Auth?",
        answer: "Join them with a colon, like “admin:secret123”, encode that whole string, and send it as “Authorization: Basic ” followed by the result. Remember that Basic Auth is only safe over HTTPS, since Base64 is easy to reverse.",
      },
      {
        question: "Why is my Base64 output different from another tool’s?",
        answer: "Usually the input differs by invisible characters, such as a trailing newline or a space. Some tools also use the URL-safe variant with - and _ instead of + and /, or omit the = padding.",
      },
    ],
  },

  "security/hmac": {
    about: [
      "An HMAC is a signature made from a message and a shared secret key. Anyone who knows the key can recompute it and confirm that the message was not changed and came from someone holding the key. This generator supports HMAC with SHA-1, SHA-256, SHA-384 and SHA-512 and shows the result in hex or Base64, computed with the browser’s Web Crypto API.",
      "Its most common use is debugging webhooks. Razorpay, for instance, sends an X-Razorpay-Signature header that is the HMAC-SHA256 of the raw request body using your webhook secret; GitHub’s X-Hub-Signature-256 is “sha256=” followed by the same kind of hex value. Paste the exact body and secret here and compare.",
      "Signatures only match when every byte matches, so use the raw body rather than re-formatted JSON. The key is read as plain UTF-8 text; if your provider gives a Base64 or hex key meant to be decoded first, results here will not match.",
    ],
    faq: [
      {
        question: "Why doesn’t my HMAC match the webhook signature?",
        answer: "The usual causes are a body that was parsed and re-serialised (changing spaces or key order), a trailing newline, the wrong algorithm, or comparing hex to Base64. Some providers, like Stripe, also sign a timestamp joined to the body rather than the body alone.",
      },
      {
        question: "What is the difference between HMAC and a plain SHA-256 hash?",
        answer: "A plain hash can be computed by anyone, so it only detects accidental changes. An HMAC needs the secret key, so it also proves the message came from someone who has that key.",
      },
      {
        question: "Can I use HMAC-SHA256 as a password hash?",
        answer: "No. HMAC is fast by design, which suits message signing but makes brute-forcing passwords easy. Use bcrypt or Argon2 for storing passwords.",
      },
    ],
  },

  "security/jwt-decoder": {
    about: [
      "A JSON Web Token has three Base64URL parts separated by dots: a header naming the signing algorithm, a payload of claims such as sub, role and exp, and a signature. This decoder shows the header and payload as formatted JSON, converts iat, nbf and exp into UTC dates, and tells you whether the token has expired.",
      "It is a quick check when an API returns 401 Unauthorized: paste the access token from your browser’s network tab or a mobile app log and see whether it expired, has the wrong audience, or is missing a role claim your backend expects. When you paste an Authorization header, remove the “Bearer ” prefix first.",
      "Signature verification works for HS256, HS384 and HS512 tokens when you enter the shared secret. Tokens signed with RS256 or ES256 (common with Auth0, Firebase and Azure AD) need a public key, which this tool does not accept, so entering a secret for them will always show invalid.",
    ],
    faq: [
      {
        question: "Is it safe to paste a JWT into an online decoder?",
        answer: "With this tool the token is decoded in your browser and not uploaded. Still, a live access token works like a password until it expires, so prefer expired or test tokens and never share real ones in screenshots.",
      },
      {
        question: "Why does my token say \"must have exactly 3 parts\"?",
        answer: "The input probably includes extra text such as “Bearer ”, quotes, or it was cut off when copied. Encrypted tokens (JWE) have five parts and cannot be decoded without the key.",
      },
      {
        question: "Can anyone read the data inside my JWT?",
        answer: "Yes. A standard signed JWT is encoded, not encrypted, so anyone with the token can read its payload. Never put passwords or sensitive personal data in JWT claims.",
      },
    ],
  },

  "security/md5": {
    about: [
      "MD5 turns any input into a fixed 128-bit fingerprint, shown as 32 hex characters. The same text always gives the same hash, and even a one-character change produces a completely different one. For example, “The quick brown fox jumps over the lazy dog” hashes to 9e107d9d372bb6826bd81d3542a419d6. This tool hashes the UTF-8 bytes of the text you type, using a JavaScript implementation in your browser.",
      "MD5 is still widely used where security is not the goal: building cache keys, generating Gravatar URLs from an email address, deduplicating records, checking a download against a published checksum, or matching values stored by an older PHP or MySQL system.",
      "When your hash does not match one made elsewhere, check for hidden characters. Running echo hello | md5sum on Linux hashes “hello” plus a newline; use echo -n to match what you type here. Leading and trailing spaces also change the result.",
    ],
    faq: [
      {
        question: "Can an MD5 hash be decrypted or reversed?",
        answer: "No, hashing is one-way. However, short or common inputs can be found by looking them up in precomputed tables, which is another reason not to use MD5 for passwords.",
      },
      {
        question: "Can I get the MD5 checksum of a file here?",
        answer: "This tool hashes text only. For a file, run certutil -hashfile file.zip MD5 in a Windows command prompt, or md5sum file.zip on Linux and macOS (md5 on macOS).",
      },
    ],
  },

  "security/sha1": {
    about: [
      "SHA-1 produces a 160-bit hash, shown as 40 hex characters or 28 Base64 characters. “The quick brown fox jumps over the lazy dog” gives 2fd4e1c67a2d28fced849ee1bb76e7391b93eb12. This tool hashes the UTF-8 bytes of your text with the browser’s Web Crypto API and updates as you type.",
      "You will still meet SHA-1 in older systems and some current ones: legacy API signatures, OAuth 1.0 HMAC-SHA1 signing, database columns written years ago, and Git commit IDs. It is useful for matching those stored values or for a quick integrity check where nobody is trying to forge a collision.",
      "One thing that surprises people: hashing a file’s text here will not give the Git object ID for that file. Git hashes a header of the form “blob <size>” plus a null byte in front of the content, so use git hash-object to get that value.",
    ],
    faq: [
      {
        question: "Can SHA-1 be decrypted?",
        answer: "No. SHA-1 is a one-way hash, so there is no key to reverse it. Weak or common inputs can be guessed by trying candidates, which is why it should not protect passwords.",
      },
      {
        question: "Why does my SHA-1 differ from the command line result?",
        answer: "Most often the command included a trailing newline, as with echo text | sha1sum. Use echo -n, or check that the text you pasted has no extra spaces or line breaks.",
      },
    ],
  },

  "security/sha256": {
    about: [
      "SHA-256 is part of the SHA-2 family and produces a 256-bit hash, shown as 64 hex characters or 44 Base64 characters. It is the default choice today for integrity checks and signatures. For example, “The quick brown fox jumps over the lazy dog” hashes to d7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592. This tool uses the browser’s Web Crypto API on the UTF-8 bytes of your text.",
      "Developers use it to check that two strings are identical without comparing them directly, create deterministic IDs from content, verify API request signing steps (such as AWS Signature Version 4, which hashes the canonical request with SHA-256), or confirm a value against one computed in Python, Node.js or Java.",
      "To get matching results across tools, compare encodings as well as input. A Base64 result and a hex result of the same hash look nothing alike, and uppercase versus lowercase hex is only a display difference.",
    ],
    faq: [
      {
        question: "How do I verify a file’s SHA-256 checksum on Windows?",
        answer: "This page hashes text, not files. In PowerShell, run Get-FileHash .\\file.iso -Algorithm SHA256 and compare the result with the publisher’s checksum, ignoring letter case.",
      },
      {
        question: "Can two different inputs have the same SHA-256 hash?",
        answer: "In theory yes, since there are more possible inputs than hashes, but no such collision has ever been found, and finding one is far beyond current computing power.",
      },
    ],
  },

  "security/sha512": {
    about: [
      "SHA-512 is the largest member of the SHA-2 family, producing a 512-bit hash: 128 hex characters or 88 Base64 characters. Like SHA-256, any change to the input changes the whole output. This tool computes it with the browser’s Web Crypto API on the UTF-8 bytes of the text you enter.",
      "You will see SHA-512 in Subresource Integrity attributes for scripts loaded from a CDN (integrity=\"sha512-…\" uses the Base64 form), in Linux package checksums, in some payment gateway request signatures that ask for a SHA-512 hash of joined fields, and in systems that want a longer digest for long-term records.",
      "When an integration asks for a SHA-512 hash of several fields joined with a separator such as a pipe (|), build the exact string first — same field order, no extra spaces — then hash it. Most mismatches come from the string, not the algorithm.",
    ],
    faq: [
      {
        question: "Why is the SHA-512 hash so long?",
        answer: "It is 64 bytes, and hex uses two characters per byte, giving 128 characters. Switching the output to Base64 shortens it to 88 characters without changing the hash itself.",
      },
      {
        question: "Can I get SHA-384 here?",
        answer: "This page offers SHA-512 only. SHA-384 is available as an option in the HMAC Generator when you need a keyed hash.",
      },
    ],
  },

  "security/url-decode": {
    about: [
      "URL decoding converts percent-encoded sequences back into readable characters, so %20 becomes a space, %2F becomes /, and %E2%82%B9 becomes ₹. This tool uses JavaScript’s decodeURIComponent, which decodes every %XX sequence, including the ones that represent URL structure such as %3F (?) and %26 (&).",
      "It helps when reading tracking links from marketing emails, redirect URLs buried inside a query parameter, OAuth callback addresses, or server logs where search terms appear as q=chai%20recipe. Decoding the whole thing makes it much easier to see where a link really goes before you click it.",
      "Two things to watch for. A plus sign is left as + rather than turned into a space, because + only means space in HTML form data. And if the output still contains sequences like %20, the text was encoded twice — paste the result in again to decode the second layer.",
    ],
    faq: [
      {
        question: "Why are plus signs not converted to spaces?",
        answer: "In URL percent-encoding a space is %20; using + for spaces is a convention of HTML form submissions. If your data came from a form, replace + with a space before or after decoding.",
      },
      {
        question: "Why do I get an error when my text contains a % sign?",
        answer: "A % must be followed by two hex digits. Plain text like “50% off” is not valid percent-encoding, so either it was never encoded or the % should have been written as %25.",
      },
    ],
  },

  "security/url-encode": {
    about: [
      "URL encoding, also called percent-encoding, replaces characters that are not allowed or have special meaning in a URL with % followed by hex bytes. A space becomes %20, & becomes %26, and non-English text is encoded from its UTF-8 bytes, so ₹ becomes %E2%82%B9. By default this tool uses encodeURIComponent; tick “Encode as full URL” to use encodeURI, which leaves characters like : / ? # & = alone.",
      "Use the default mode for a single value you are putting into a query string. For example, a search for “chai & samosa” must be sent as q=chai%20%26%20samosa; otherwise the & would start a new parameter. The same applies to a shop name in a UPI payment link or a redirect URL passed inside another URL.",
      "Use full-URL mode only when you have a complete address with a few unsafe characters, like spaces in a path. Do not encode a value twice.",
    ],
    faq: [
      {
        question: "What characters are not changed by URL encoding?",
        answer: "In the default mode, letters, digits and - _ . ! ~ * ' ( ) are left as they are. Everything else, including spaces, slashes and Indian-language characters, is percent-encoded.",
      },
      {
        question: "Should I encode the whole URL or just the parameter values?",
        answer: "Encode just the values in most cases, then join them with = and &. Encoding the whole URL in the default mode turns :// into %3A%2F%2F and breaks the link.",
      },
    ],
  },

  "sql/beautifier": {
    about: [
      "A SQL beautifier rewrites a query so that each clause starts on its own line and nested parts are indented, which makes long queries much easier to read. This one uses the open-source sql-formatter library with dialect options for Standard SQL, MySQL, PostgreSQL, SQLite, SQL Server and BigQuery, plus a choice of 2 or 4 space indentation and uppercase, lowercase or preserved keywords.",
      "It is most useful with SQL you did not write by hand. ORMs like Hibernate, Django or Sequelize log queries as one very long line, and BI tools often export them the same way. Beautify the query from the log, and the joins, filters and subqueries become clear enough to spot a missing index or a wrong join condition.",
      "Comments are kept in the output. If the beautifier cannot parse something, it shows an error instead of guessing, which usually points to a typo or a dialect mismatch.",
    ],
    faq: [
      {
        question: "Why does the SQL beautifier show a parse error?",
        answer: "The query contains syntax the chosen dialect does not recognise, which often happens when SQL Server or MySQL-specific code is formatted as Standard SQL. Pick the matching dialect, or look for an unclosed quote or bracket.",
      },
      {
        question: "Can I make all SQL keywords uppercase?",
        answer: "Yes. Set Keywords to UPPERCASE and words like select, from and where are capitalised while table names, column names and string values stay as written.",
      },
    ],
  },

  "sql/formatter": {
    about: [
      "This SQL formatter takes a query in any shape and outputs a consistently laid-out version, with SELECT columns, JOIN conditions and WHERE filters each on their own lines. You pick the dialect (Standard SQL, MySQL, PostgreSQL, SQLite, SQL Server or BigQuery), keyword case and an indent of 2 or 4 spaces, and the result can be copied or downloaded as a .sql file.",
      "Teams use it before code review so that a migration file or a report query follows one style no matter who wrote it, and before pasting a query into a ticket, wiki page or chat so others can read it. It is also handy for comparing two versions of a query: format both the same way and the real differences stand out in a diff.",
      "The formatter checks syntax only as far as it needs to lay out the query. It does not know your schema, so a misspelled column name will still format without complaint.",
    ],
    faq: [
      {
        question: "Can I format Oracle or Snowflake SQL here?",
        answer: "Those dialects are not in the selector. Standard SQL often works for ordinary SELECT, INSERT and UPDATE statements, but vendor-specific syntax may cause a parse error.",
      },
      {
        question: "Does the SQL formatter remove comments?",
        answer: "No, -- and /* */ comments are kept in the formatted output. Use the SQL Minifier if you want comments stripped.",
      },
    ],
  },
};
