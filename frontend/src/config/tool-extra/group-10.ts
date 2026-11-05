import type { ToolExtraContent } from "./types";

export const group10: Record<string, ToolExtraContent> = {
  "numbers/roman-numeral": {
    about: [
      "This Roman numeral converter turns ordinary numbers into Roman numerals and Roman numerals back into numbers. It is the quick way to check how to write a year such as 2026 (MMXXVI), read the date on a building or in film credits, or number chapters, outlines and clock faces correctly.",
      "Type a whole number from 1 to 3999 in the Number field and the Roman numeral appears next to it, or type a numeral such as XLII and the number appears instead. Lowercase input like mcmxc is accepted. Load sample fills in 2026, Clear empties both fields, and a short message appears under the fields when a value cannot be converted.",
      "Roman numerals use seven symbols, I, V, X, L, C, D and M, and a smaller symbol placed before a larger one is subtracted. Only six subtractive pairs are standard: IV, IX, XL, XC, CD and CM, so 99 is XCIX, not IC. The converter checks that a numeral matches the standard form of its value, so IIII or VV is rejected. Everything runs in your browser.",
    ],
    faq: [
      {
        question: "How do I write a year like 1999 or 2026 in Roman numerals?",
        answer: "Split the year into thousands, hundreds, tens and ones and convert each part. 1999 is M + CM + XC + IX, which gives MCMXCIX, and 2026 is MM + XX + VI, which gives MMXXVI. Typing the year into the Number field does this for you.",
      },
      {
        question: "How do I read a long Roman numeral like MCMLXXXIV?",
        answer: "Read from left to right and add each symbol's value, but when a symbol is smaller than the one after it, subtract it instead. MCMLXXXIV is M (1000) + CM (900) + L (50) + XXX (30) + IV (4), which is 1984. Pasting it into the Roman numeral field gives the same result instantly.",
      },
      {
        question: "Why do some clocks show IIII instead of IV?",
        answer: "Many clock and watch faces use IIII for four by tradition, often said to balance the look of VIII on the opposite side of the dial. It is a design convention rather than the standard form, so this converter expects IV and treats IIII as invalid.",
      },
    ],
  },
  "devops/docker-compose-validator": {
    about: [
      "A Docker Compose validator checks a docker-compose.yml or compose.yaml file for mistakes before you run docker compose up. It catches YAML syntax errors, the most common reason Compose refuses to start, and structural problems such as a missing services section or a service with neither an image nor a build context.",
      "Paste your file, or click Load sample to see a web server, an API and a Postgres database. Each issue is marked as an error, warning or info note, and the tool reports how many services it found. It checks the shape of ports, environment, volumes and depends_on, flags images tagged :latest, and notes keys it does not recognize, which often reveals a typo such as enviroment. Keys starting with x- are treated as extension fields.",
      "A frequent pitfall is leaving port mappings unquoted. Docker's documentation warns that a value like 22:22 can be read by YAML as a base-60 number, so write ports as quoted strings such as \"8080:80\". The file is parsed with a real YAML parser in your browser, so passwords or internal hostnames in your environment section are not uploaded.",
    ],
    faq: [
      {
        question: "How do I fix \"mapping values are not allowed here\" in docker-compose.yml?",
        answer: "This YAML error usually means a colon appears where the parser did not expect one, most often because of inconsistent indentation or a missing space after a colon. Check that every key under a service is indented by the same number of spaces and written as key: value. The validator shows the parser's message with the line and column where it stopped.",
      },
      {
        question: "Should I use a list or a map for environment variables in Compose?",
        answer: "Both are valid. A list uses entries like - NODE_ENV=production, while a map uses NODE_ENV: production, and the validator accepts either. In the list form it expects every entry to contain an equals sign, so a bare - NODE_ENV is flagged as a warning even though Compose would pass that variable through from your shell.",
      },
      {
        question: "Does depends_on wait for my database to be ready?",
        answer: "Not by default. The short form of depends_on only controls start order, so an API container can start before Postgres accepts connections. Use the long form with condition: service_healthy and add a healthcheck to the database service if you need to wait for readiness.",
      },
    ],
  },
  "devops/dockerfile-linter": {
    about: [
      "A Dockerfile linter reads your Dockerfile and points out mistakes and habits that make images larger, slower to rebuild or less secure. It is useful before a code review, or when a build behaves differently on another machine, which is often caused by an unpinned base image.",
      "Paste a Dockerfile or load the small Node.js sample, and each finding shows the line it applies to. The checks are: a missing FROM, instructions before FROM other than ARG, base images with no tag or :latest, the deprecated MAINTAINER instruction, ADD used for plain local files, apt-get install without apt-get update or list cleanup in the same RUN, shell-form CMD and ENTRYPOINT, relative WORKDIR paths, malformed EXPOSE ports, ENV or ARG values that look like secrets, and a missing USER.",
      "Shell form versus exec form matters at shutdown. Docker's documentation notes that CMD npm start runs under /bin/sh -c, which does not pass signals on, so docker stop may wait out its timeout and then kill the container. CMD [\"npm\", \"start\"] runs the process directly and receives SIGTERM. The linter only reads text in your browser; nothing is built or executed.",
    ],
    faq: [
      {
        question: "Why should apt-get update and apt-get install be in the same RUN?",
        answer: "Docker caches each instruction as a layer. If apt-get update has its own RUN, that cached layer is reused on later builds even after you change the install line, so apt-get install can work from an outdated package index and fail or install old versions. RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/* keeps the index fresh and the layer small.",
      },
      {
        question: "When should I use ADD instead of COPY in a Dockerfile?",
        answer: "Use COPY for ordinary files and folders from the build context. ADD is only worth it when you need its extra behavior: fetching a file from a URL or automatically extracting a local tar archive into the image. The linter only flags ADD when the source is neither a URL nor an archive file.",
      },
      {
        question: "How do I run a Docker container as a non-root user?",
        answer: "Create a user in the image and switch to it with USER before the final CMD, for example RUN useradd --create-home appuser followed by USER appuser on Debian-based images. The official Node.js images already include a user named node. Make sure files the app writes to are owned by that user, for example with COPY --chown=appuser:appuser.",
      },
    ],
  },
  "devops/kubernetes-yaml-validator": {
    about: [
      "A Kubernetes YAML validator checks manifest files for errors before you run kubectl apply. It catches YAML syntax mistakes and missing required fields such as apiVersion, kind and metadata.name, which would otherwise surface as an API server rejection or a failed deploy in your CI pipeline.",
      "Paste one or more documents separated by --- and each one is reported separately with its kind and name. Deployments, StatefulSets, DaemonSets and ReplicaSets need a selector matching the pod template labels; Jobs and CronJobs need containers, and a CronJob needs a schedule; Services need ports with a numeric port; Ingresses need rules or a defaultBackend; PersistentVolumeClaims need accessModes and a storage request; and an empty ConfigMap or Secret is flagged.",
      "Every container is checked for a name, an image, a :latest tag and the format of its resource values. CPU is usually written in millicores such as 250m and memory in binary units such as 128Mi or 1Gi, so values like 128mb or 1GB are flagged. Note that M means megabytes (10^6 bytes) while Mi means mebibytes (2^20 bytes). The check runs in your browser.",
    ],
    faq: [
      {
        question: "What is the difference between 500m and 0.5 CPU in Kubernetes?",
        answer: "They are the same amount. Kubernetes measures CPU in cores, and the m suffix means thousandths of a core, so 500m equals 0.5 and 1000m equals 1. On memory, a lowercase m means a thousandth of a byte, so a memory value of 128m is almost certainly a typo for 128Mi.",
      },
      {
        question: "Why does kubectl say \"no matches for kind\"?",
        answer: "The API server does not know that kind at the apiVersion you wrote, for example a Deployment under extensions/v1beta1, which was removed in Kubernetes 1.16. Use apps/v1 for Deployments, StatefulSets and DaemonSets, and networking.k8s.io/v1 for Ingress. This validator checks that apiVersion is present, not which versions your cluster serves.",
      },
      {
        question: "Why is a missing resources block only an info note?",
        answer: "Requests and limits are optional, so a pod without them is valid and will be scheduled. They are worth adding because without requests the scheduler cannot reserve capacity for the pod, and without a memory limit one container can use memory that other pods on the same node need.",
      },
    ],
  },
  "devops/kubernetes-manifest-generator": {
    about: [
      "This Kubernetes manifest generator builds YAML for the four resources most apps need first: a Deployment, a Service, a ConfigMap and a Secret. Instead of copying an old manifest and fixing indentation by hand, you fill in a short form and get a complete file you can save as deployment.yaml or service.yaml.",
      "Pick a resource kind and enter a name and, optionally, a namespace. For a Deployment, set the image, replica count, container port and environment variables, one KEY=value per line; the name also becomes the app label on the Deployment, its selector and its pod template. For a Service, set the app label to select, the service port, the target port and the type. ConfigMaps and Secrets take KEY=value data lines.",
      "To expose a Deployment named web, generate a Service whose pod selector label is also web. The Service port is what other pods connect to, while targetPort must match the containerPort your app listens on, for example port 80 forwarding to targetPort 3000. The YAML is generated in your browser and nothing is sent to a cluster.",
    ],
    faq: [
      {
        question: "Which Kubernetes Service type should I choose?",
        answer: "ClusterIP, the default, gives the Service an internal IP reachable only from inside the cluster, which suits databases and internal APIs. NodePort also opens a port, by default in the 30000-32767 range, on every node. LoadBalancer asks your cloud provider for an external load balancer, the usual choice for public traffic on managed clusters such as EKS, GKE and AKS.",
      },
      {
        question: "How do I apply the generated YAML to my cluster?",
        answer: "Save the output to a file and run kubectl diff -f deployment.yaml to preview what would change, then kubectl apply -f deployment.yaml. If you left the namespace field empty, add -n my-namespace to target a namespace other than your current context's default.",
      },
      {
        question: "How do I change the number of replicas later?",
        answer: "Edit replicas in your saved manifest and apply it again, which keeps the file as the source of truth. For a quick temporary change you can run kubectl scale deployment my-app --replicas=5, but the next apply of the old file will set it back.",
      },
    ],
  },
  "devops/nginx-config-tester": {
    about: [
      "This nginx config tester checks nginx.conf files and server block snippets for the syntax mistakes that make nginx -t fail or stop nginx from reloading. A missing semicolon or an extra closing brace is easy to miss in a long config, and the error nginx prints can point to a line some distance from the real problem.",
      "Paste a full config, a single server block from sites-available or a location snippet, or load the sample reverse-proxy config. The tester tracks nested blocks such as http, server, location and upstream, then reports unclosed or unexpected braces, statements without a terminating semicolon, server blocks with no listen directive, an empty server_name and rewrite rules with no flag. Comments are ignored, but a # inside quotes is kept.",
      "It reads the config line by line, so results are clearest when each directive and closing brace sits on its own line, which is the usual nginx style. A typical catch is a missing semicolon after proxy_pass, which nginx itself often reports as an argument error on the following line. Everything runs in your browser.",
    ],
    faq: [
      {
        question: "How do I test my nginx config from the command line?",
        answer: "Run sudo nginx -t to check the syntax of the main config and every file it includes, or nginx -T to also print the full merged configuration. If the test passes, apply the change with sudo systemctl reload nginx or nginx -s reload, which keeps existing connections open instead of restarting.",
      },
      {
        question: "What do the nginx rewrite flags last, break, redirect and permanent do?",
        answer: "last stops processing the current set of rewrite rules and searches for a new location matching the rewritten URI. break stops processing and stays in the current location. redirect returns a 302 temporary redirect and permanent returns a 301. Without a flag, nginx carries on to the next rewrite directive, which is why the tester points it out.",
      },
      {
        question: "What happens if a server block has no listen directive?",
        answer: "nginx falls back to listening on port 80, or 8000 when it is not running as root, which is rarely what you want for an HTTPS site or a second virtual host. Writing listen 80; or listen 443 ssl; makes the intent explicit, so the tester warns when it is missing.",
      },
    ],
  },
  "cloud/aws-arn-parser": {
    about: [
      "An AWS ARN parser splits an Amazon Resource Name into its parts so you can see exactly which partition, service, region, account and resource it refers to. ARNs appear in IAM policies, CloudFormation and Terraform outputs, CloudTrail logs and AccessDenied error messages, and reading a long one by eye is error-prone.",
      "Paste an ARN, or click one of the sample chips for S3, IAM, Lambda, DynamoDB and EC2 to compare their shapes. The result lists the partition, service, region, account ID, resource type when there is one, and resource ID. An empty region is shown as global and an empty account ID as none. If the text does not start with arn: or has fewer than six colon-separated fields, you get a clear error instead.",
      "Every ARN follows arn:partition:service:region:account-id:resource. For example, arn:aws:lambda:us-east-1:123456789012:function:my-function names a Lambda function in us-east-1 owned by account 123456789012. The partition is aws for standard regions, aws-cn for China and aws-us-gov for GovCloud, which matters when you hard-code ARNs in policies. Parsing is done in your browser.",
    ],
    faq: [
      {
        question: "How do I find the ARN of an AWS resource?",
        answer: "Most resource pages in the AWS console show the ARN in the summary or details section with a copy button. From the CLI, get and describe commands usually include it, for example aws iam get-role --role-name MyRole returns Role.Arn, and aws sts get-caller-identity shows the ARN of the identity you are currently using.",
      },
      {
        question: "Can I use wildcards in an ARN?",
        answer: "In the Resource element of an IAM policy, yes: * matches any run of characters and ? matches a single character, so arn:aws:s3:::my-bucket/* covers every object in a bucket. Wildcards do not work when an API call expects one specific resource ARN. The parser simply shows a * as part of the resource ID.",
      },
    ],
  },
  "cloud/aws-iam-policy-formatter": {
    about: [
      "This IAM policy formatter pretty-prints AWS IAM policy JSON and checks it for mistakes that cause MalformedPolicyDocument errors or grant more access than you meant. It works on identity-based policies and resource policies such as S3 bucket policies, anything with Version and Statement at the top level.",
      "Paste a policy, or load the sample with an S3 read statement and a logging statement, and the formatted version appears on the right with a Copy button. Below it you see the statement count and any issues: an Effect other than Allow or Deny, a statement with no Action or NotAction, a missing Resource, a bare * in Action or Resource, an unexpected Version, and keys that are not standard statement elements, such as a misspelled Condtion.",
      "The Effect check is exact, so \"allow\" in lowercase is reported as an error, matching IAM's case-sensitive handling of that value. Statement can be a single object or an array, and both are accepted. Version is the policy language date, not your own revision number: use \"2012-10-17\", because the older 2008-10-17 version does not support policy variables. Checks run in your browser.",
    ],
    faq: [
      {
        question: "What is the difference between Action and NotAction in an IAM policy?",
        answer: "Action lists the operations a statement applies to. NotAction matches every action except the ones listed, so an Allow with NotAction grants far more than it appears to, including actions AWS adds in the future. NotAction is mostly used in Deny statements, such as denying everything except IAM and STS actions when a request is made without MFA.",
      },
      {
        question: "Why does the formatter not warn about s3:*?",
        answer: "It only warns about a bare * in Action, which grants every action in every service. A service-level wildcard such as s3:* is narrower but still includes destructive actions like s3:DeleteBucket and s3:PutBucketPolicy, so review those by hand and list specific actions where you can.",
      },
      {
        question: "Does an explicit Deny override an Allow in IAM?",
        answer: "Yes. If any applicable policy contains a Deny statement that matches the request, the request is denied no matter how many Allow statements also match. If no statement matches at all, the result is an implicit deny, so access must always be granted by at least one Allow.",
      },
    ],
  },
  "cloud/aws-cron-converter": {
    about: [
      "This AWS cron converter translates standard five-field Unix cron expressions, the kind used by crontab, Kubernetes CronJobs and GitHub Actions, into the six-field cron() format used by Amazon EventBridge, and back again. The two formats look alike but differ enough that pasting one into the other usually fails validation or runs on the wrong days.",
      "Enter an expression and the converted version appears below with a Copy button. Swap flips the direction and carries the current result across, so you can check a round trip. Going to AWS, the tool adds the year field as *, puts ? in the day field you are not using and renumbers day-of-week values. Going back, it accepts the expression with or without the cron() wrapper and drops the year field.",
      "For example, 30 9 * * 1-5, which means 9:30 on weekdays, becomes cron(30 9 ? * 2-6 *) because AWS counts Sunday as 1. Day names such as MON are passed through unchanged. EventBridge rules run in UTC, so convert from your local time first; EventBridge Scheduler lets you set a time zone instead. Conversion happens in your browser.",
    ],
    faq: [
      {
        question: "Why can Unix cron set both day-of-month and day-of-week but AWS cannot?",
        answer: "In Unix cron, setting both fields means the job runs when either one matches, so 0 0 1 * 1 runs on the 1st of every month and on every Monday. AWS cron has no way to express that either-or rule, so one of the two fields must be ?. The converter reports an error in that case; create two AWS schedules if you need both.",
      },
      {
        question: "How do I run an AWS schedule every 5 minutes?",
        answer: "Use cron(0/5 * * * ? *) or the simpler rate(5 minutes). In AWS cron, 0/5 in the minutes field means start at minute 0 and repeat every 5 minutes. A rate expression is easier to read when you only need a fixed interval and do not care about the exact clock time.",
      },
    ],
  },
  "cloud/s3-url-parser": {
    about: [
      "This S3 URL parser breaks an Amazon S3 address into its bucket name, object key and region, and builds every common S3 URL format from those three values. It helps when a script needs s3://bucket/key but you only have an https link, or when you need to turn a key from a log into a URL someone can open.",
      "Paste an s3:// URI, a virtual-hosted-style URL such as https://my-bucket.s3.eu-west-1.amazonaws.com/key, or a path-style URL, and the bucket, key and region appear below. Percent-encoded keys are decoded, so photo%20one.jpg reads as photo one.jpg. In the builder, enter a bucket, key and region to get the s3:// URI, virtual-hosted URL, path-style URL and static website endpoint, each with a Copy button.",
      "When a URL has no region in its hostname, the tool shows us-east-1 as the default, and URLs built for us-east-1 use the global s3.amazonaws.com host. Special characters in keys are percent-encoded segment by segment, keeping the slashes. Some regions use s3-website.region rather than s3-website-region, so confirm the website endpoint in the bucket's properties. Everything runs in your browser.",
    ],
    faq: [
      {
        question: "How do I share a private S3 object with a link?",
        answer: "Create a presigned URL, which carries temporary credentials in its query string, for example aws s3 presign s3://my-bucket/report.pdf --expires-in 3600 for a link valid for one hour. The plain URLs this tool builds only work for objects that are publicly readable; otherwise S3 returns 403 Access Denied.",
      },
      {
        question: "What is the difference between the S3 website endpoint and the REST endpoint?",
        answer: "The REST endpoint, such as my-bucket.s3.us-west-2.amazonaws.com, supports HTTPS and returns XML error responses. The website endpoint serves index.html for folder paths and custom error pages, but only over HTTP and only for publicly readable content. For HTTPS on a static site, put CloudFront in front of the bucket.",
      },
    ],
  },
  "authentication/oauth-url-builder": {
    about: [
      "This OAuth URL builder creates the authorization request URL that starts an OAuth 2.0 or OpenID Connect login, the link that sends a user to Google, Microsoft, Auth0, Okta or your own identity provider to sign in and grant consent. Writing it by hand is error-prone, because every parameter must be named and URL-encoded exactly.",
      "Enter the authorization endpoint, client_id and redirect_uri, then choose a response_type: code, token, id_token or code id_token. Add space-separated scopes, an optional state value and a PKCE code_challenge with S256 or plain; the method is only included when a challenge is present. An audience field covers providers such as Auth0 that use it, and the extra field adds one more parameter such as prompt=consent.",
      "Spaces in the scope are encoded as +, so openid email profile becomes scope=openid+email+profile, which providers decode back to spaces. For new apps, use response_type=code with PKCE; the implicit flow with response_type=token returns tokens in the URL and is discouraged by the OAuth 2.0 Security Best Current Practice. The URL is built in your browser and nothing is sent until you open it.",
    ],
    faq: [
      {
        question: "Why do I get a redirect_uri_mismatch error?",
        answer: "The redirect_uri in the URL must exactly match one of the redirect URIs registered for your client in the provider's console, including the scheme, host, port, path and any trailing slash. http://localhost:3000/callback and http://localhost:3000/callback/ count as different values. Copy the registered value into the field rather than retyping it.",
      },
      {
        question: "Which scopes do I need for OpenID Connect sign-in?",
        answer: "Include openid, which tells the provider you want an ID token. Add profile for the user's name and picture and email for their email address. Access to provider APIs, such as reading a user's calendar, needs additional scopes listed in that provider's documentation.",
      },
      {
        question: "What does the prompt parameter do?",
        answer: "It controls whether the provider shows its login or consent screens. OpenID Connect defines none, which fails instead of showing any screen, login, which forces the user to sign in again, consent, which shows the consent screen even if the user approved your app before, and select_account, which shows an account picker.",
      },
    ],
  },
  "authentication/pkce-generator": {
    about: [
      "A PKCE generator creates the code_verifier and code_challenge pair used in the OAuth 2.0 authorization code flow with Proof Key for Code Exchange. You need one when testing a login flow for a single-page app, mobile app or CLI in Postman, curl or a provider's playground, where you have to supply both values yourself.",
      "A fresh pair is generated when the page opens. Moving the length slider anywhere between 43 and 128 characters, the range RFC 7636 allows, creates a new pair, and Regenerate makes another at the same length. Put the code_challenge in the authorization URL with code_challenge_method=S256, keep the code_verifier, and send it in the token request after the user is redirected back with a code.",
      "The challenge is the SHA-256 hash of the verifier encoded as base64url without padding, so it is always 43 characters long whatever verifier length you choose. You can check a pair in Node.js with crypto.createHash('sha256').update(verifier).digest('base64url'). If the token endpoint returns invalid_grant, the verifier usually does not match the challenge that was sent. Both values are generated in your browser.",
    ],
    faq: [
      {
        question: "How do I send the code_verifier in the token request with curl?",
        answer: "POST form fields to the token endpoint, for example curl -X POST https://auth.example.com/token -d grant_type=authorization_code -d code=AUTH_CODE -d redirect_uri=https://app.example.com/callback -d client_id=CLIENT_ID -d code_verifier=VERIFIER. The redirect_uri must be the same one used in the authorization request.",
      },
      {
        question: "Does PKCE replace the state parameter?",
        answer: "They solve overlapping but different problems. PKCE ensures that only the client that started the flow can redeem the authorization code, while state lets your callback confirm the response belongs to a login your app started and can carry data such as the page to return to. Sending both is common and harmless.",
      },
    ],
  },
  "authentication/totp-generator": {
    about: [
      "This TOTP generator produces time-based one-time passwords, the 6-digit codes shown by authenticator apps for two-factor authentication. Developers use it to test 2FA login flows, check that a server-side TOTP implementation produces the right codes, or create test secrets without enrolling a real phone.",
      "A random 160-bit Base32 secret is created when the page opens; paste your own or click New secret to replace it. The code refreshes automatically, a bar shows how long it stays valid, and clicking the code copies it. Choose 6 or 8 digits, a 30 or 60 second period, and SHA-1, SHA-256 or SHA-512. The issuer and account label go into the otpauth:// URI that authenticator apps import.",
      "Under RFC 6238, each code is an HMAC of the number of periods elapsed since the Unix epoch, truncated to a few digits using the method from RFC 4226 (HOTP). Because both sides compute it from the clock, many servers also accept the code from the window before or after to allow for drift. Spaces and lowercase letters in a pasted secret are handled, and codes are calculated in your browser.",
    ],
    faq: [
      {
        question: "How do I turn the otpauth URI into a QR code?",
        answer: "Copy the otpauth:// URI, paste it into any QR code generator, including the one on this site, and scan the result with your authenticator app. Most apps also offer manual entry, where you type the Base32 secret directly instead of scanning.",
      },
      {
        question: "Why do 8-digit or SHA-256 codes not work in my authenticator app?",
        answer: "Not every app honors the digits, period and algorithm values in the URI; some always use the defaults of 6 digits, 30 seconds and SHA-1. If codes do not match, check what your app supports or stay with the defaults, which are what most services use.",
      },
      {
        question: "What is the difference between TOTP and HOTP?",
        answer: "HOTP (RFC 4226) generates a code from a counter that increases each time a code is used, while TOTP (RFC 6238) replaces that counter with the current time divided by the period. TOTP codes expire on their own, which is why nearly all authenticator apps use it. This tool generates TOTP codes only.",
      },
    ],
  },
  "authentication/api-key-generator": {
    about: [
      "This API key generator creates random secret keys for your own APIs, webhooks, service-to-service authentication and test environments. Each key is a random string with an optional readable prefix, similar in shape to keys issued by services like Stripe, so you do not have to invent a format or rely on a weak source of randomness.",
      "Type a prefix or choose a preset such as sk_live_, sk_test_, pk_live_ or api_, then set the length of the random part from 16 to 64 characters. Pick hexadecimal, URL-safe Base64 or alphanumeric characters, and generate 1, 5, 10 or 20 keys at once. Keys regenerate whenever you change a setting, and you can copy one key or the whole list, one per line.",
      "Strength depends on the character set and length of the random part, not the prefix. Each hex character carries 4 bits of randomness, an alphanumeric character about 5.95 bits and a Base64url character 6 bits, so 32 hex characters give 128 bits, a common minimum for secret keys. On your server, store a hash of each key rather than the key itself. Keys are created in your browser.",
    ],
    faq: [
      {
        question: "Should I hash API keys before storing them?",
        answer: "Yes. Store a hash such as SHA-256 rather than the key itself, and show the full key to the user only once, when it is created. Because a generated key is long and random, a fast hash is enough; slow password hashes like bcrypt are designed for short human-chosen passwords. Keeping the prefix and last few characters in plain text lets users recognize keys in a dashboard.",
      },
      {
        question: "Which character set should I choose for an API key?",
        answer: "Hexadecimal is the safest choice for systems that might mishandle unusual characters, though it needs more characters for the same strength. Base64url packs the most randomness into each character and is safe in URLs and headers, but its - character can stop double-click selection partway through a key. Alphanumeric is a good middle ground that copies cleanly and passes most validation rules.",
      },
    ],
  },
  "webdev/http-status-lookup": {
    about: [
      "This HTTP status code lookup explains what each response code means, from 100 Continue to 511 Network Authentication Required. It is a quick reference when a browser, API client or log shows a number like 422, 429 or 502 and you need to know whether the problem is the request, the server or something in between, such as a proxy or load balancer.",
      "Type a full code to jump to it, or the first one or two digits to list a range: 4 shows every 4xx code and 50 shows 500 to 508. You can also search words in the name, the description or the class, such as timeout, redirect or client error. Each result shows the code, its reason phrase and a one-line explanation, which helps when choosing codes for a REST API as well as when debugging.",
      "The first digit gives the class: 1xx informational, 2xx success, 3xx redirection, 4xx client error and 5xx server error. A common mix-up is 301 and 302 versus 308 and 307: browsers may change a POST into a GET when following 301 or 302, while 307 and 308 keep the original method and body. The full list is built into the page, so searches run in your browser.",
    ],
    faq: [
      {
        question: "What is the difference between 502, 503 and 504?",
        answer: "All three usually come from a proxy, load balancer or gateway in front of your app. 502 Bad Gateway means it received an invalid response from the upstream server, often because the app crashed or closed the connection. 503 Service Unavailable means the service cannot handle requests right now, for example during maintenance or overload, and 504 Gateway Timeout means the upstream did not respond in time.",
      },
      {
        question: "Should an API return 400 or 422 for validation errors?",
        answer: "Use 400 Bad Request when the request itself is malformed, such as invalid JSON or a missing required header. Many APIs use 422 Unprocessable Entity, renamed Unprocessable Content in RFC 9110, when the body is well-formed but fails validation, such as an email field that is not a valid address. Either works as long as your API is consistent and the response body explains the problem.",
      },
      {
        question: "How should a client handle 429 Too Many Requests?",
        answer: "Stop and wait before retrying. If the response includes a Retry-After header, it gives either the number of seconds to wait or a date. If it does not, back off exponentially, for example waiting 1, 2, 4 and then 8 seconds between attempts.",
      },
    ],
  },
  "webdev/mime-type-lookup": {
    about: [
      "A MIME type lookup tells you the media type, also called the content type, for a file extension, and which extensions go with a media type. You need the right value for a Content-Type header, an S3 object's metadata, the accept attribute of a file input, or a server's MIME mapping when a file downloads instead of displaying.",
      "Type an extension with or without the dot, such as png, .png or *.png, or part of a media type such as image/ or openxmlformats, and matching rows show the extension, type and a short description. Words in the description work too, for example font or archive. Leave the box empty to browse the full list of common web, text, image, audio, video, document, archive and font formats.",
      "Some values surprise people. JavaScript is officially text/javascript under RFC 9239, not application/javascript, and SVG is image/svg+xml. The wrong type can break a page: when X-Content-Type-Options: nosniff is set, browsers refuse to apply a stylesheet that is not served as text/css. The table is part of the page, so searches run in your browser.",
    ],
    faq: [
      {
        question: "What Content-Type should I use for a file download?",
        answer: "Use the file's real type when you know it, such as application/pdf, and add Content-Disposition: attachment; filename=\"report.pdf\" to make the browser save the file instead of displaying it. For arbitrary binary data with no specific type, application/octet-stream is the standard fallback.",
      },
      {
        question: "Should JSON be served as application/json or text/json?",
        answer: "Use application/json, the type registered in RFC 8259. text/json and text/x-json are non-standard, and some clients will not parse them as JSON automatically. Adding ; charset=utf-8 is tolerated but has no effect, because JSON exchanged between systems must be UTF-8.",
      },
    ],
  },
  "webdev/mime-detector": {
    about: [
      "A MIME type detector identifies what a file really is by reading its first bytes, known as magic numbers or file signatures, instead of trusting the extension. It helps when a download has no extension, an upload is rejected as the wrong type, or you suspect a file was renamed, for example a ZIP archive saved as .pdf.",
      "Drop a file onto the box or click to pick one. The tool shows the file name, size, the type your browser guessed from the extension, the types matched from the content, and a hex dump of the first 32 bytes. It recognizes common images, PDF, ZIP, gzip, TAR, 7-Zip, RAR, Windows executables, WebAssembly, several audio and video containers, legacy Office files and web fonts.",
      "Signatures are fixed byte patterns: a PNG always begins 89 50 4E 47, a PDF begins with %PDF and a Windows executable with MZ. Formats that share a container match together, so MP4, M4A, many MOV files and HEIC or AVIF images all show as an MP4 container. Plain text formats such as CSV, JSON or HTML have no signature, so no match is expected. Only the first 512 bytes are read, in your browser.",
    ],
    faq: [
      {
        question: "How do I check a file's real type on the command line?",
        answer: "On Linux and macOS, run file myfile, or file --mime-type myfile to print just the media type; it uses the same magic-number approach with a much larger signature database. On Windows, Format-Hex in PowerShell shows the raw bytes, which you can compare with known signatures.",
      },
      {
        question: "Why is my MP3 file not detected?",
        answer: "The detector recognizes MP3 files that start with an ID3 tag, which most music files have. An MP3 without ID3 metadata begins directly with an audio frame header, which this tool does not check for, so it can show no match even though the file plays normally.",
      },
      {
        question: "Can magic bytes prove that an uploaded file is safe?",
        answer: "No. They confirm that the start of the file looks like the claimed format, but an attacker can put a valid header in front of other content, and some files are valid as two formats at once. For uploads, check the signature on the server, limit file sizes, and re-encode or scan files rather than relying on a single check.",
      },
    ],
  },
  "webdev/csp-generator": {
    about: [
      "A CSP generator builds a Content-Security-Policy header, the browser security policy that controls where a page may load scripts, styles, images, fonts and frames from. A good policy is one of the strongest defenses against cross-site scripting, but the syntax is strict and one wrong quote can block your own site, so building it field by field is safer than writing it freehand.",
      "The form starts with a baseline of 'self' for default-src, script-src and style-src, plus data: for images. Edit any of the eleven directive fields, from connect-src for fetch and WebSocket calls to frame-ancestors for who may embed your page, and use the chips to add 'self', 'none', 'unsafe-inline', 'unsafe-eval', data: or https:. Empty fields are left out, and upgrade-insecure-requests is a checkbox that starts on.",
      "For example, a site that loads scripts from a CDN and calls its own API might use default-src 'self'; script-src 'self' https://cdn.example.com; connect-src 'self' https://api.example.com; object-src 'none'; base-uri 'self'. Roll out a new policy with the Content-Security-Policy-Report-Only header first, so violations are logged without blocking anything. The header is assembled in your browser.",
    ],
    faq: [
      {
        question: "How do I add a Content-Security-Policy header in nginx or Express?",
        answer: "In nginx, add add_header Content-Security-Policy \"your-policy\" always; inside the server block, replacing your-policy with the generated value. In Express, set it in middleware with res.setHeader('Content-Security-Policy', policy) or use the helmet package's contentSecurityPolicy option. Hosts such as Netlify and Vercel let you set it in their headers configuration.",
      },
      {
        question: "What is the difference between frame-src and frame-ancestors?",
        answer: "frame-src controls which sites your page may load inside its own iframes. frame-ancestors controls which sites may embed your page in a frame, so frame-ancestors 'none' prevents clickjacking in the same way as X-Frame-Options: DENY. frame-ancestors does not fall back to default-src, so set it explicitly.",
      },
      {
        question: "Why is my Google Fonts stylesheet blocked by CSP?",
        answer: "Every third-party origin must be listed in the directive for its resource type. Google Fonts needs https://fonts.googleapis.com in style-src for the stylesheet and https://fonts.gstatic.com in font-src for the font files. The browser console names the blocked URL and the directive responsible for each violation.",
      },
    ],
  },
  "webdev/cors-header-generator": {
    about: [
      "A CORS header generator produces the Access-Control-* response headers your server must send so that JavaScript on another origin can call your API. Without them the browser blocks the response with the familiar error that no Access-Control-Allow-Origin header is present, even though the server handled the request.",
      "List allowed origins one per line, or use * for any origin, then edit the allowed methods, allowed request headers, optional exposed headers and the preflight cache time in seconds, which defaults to 86400. Tick Allow credentials if requests carry cookies or HTTP authentication. The header block updates as you type, and warnings appear for combinations that browsers reject.",
      "Access-Control-Allow-Origin can hold only one origin or *, never a list. When you enter several origins, the output shows a placeholder: your server must compare the request's Origin header with your list and echo back the matching value, along with Vary: Origin so caches keep the responses separate. The headers are built in your browser.",
    ],
    faq: [
      {
        question: "What is a CORS preflight request?",
        answer: "Before a cross-origin request that uses a method other than GET, HEAD or POST, a custom header such as Authorization, or a Content-Type such as application/json, the browser first sends an OPTIONS request. Your server must answer it with a 2xx status and Access-Control-Allow-Methods and Access-Control-Allow-Headers values that cover the real request, or the browser never sends it.",
      },
      {
        question: "Why is my Access-Control-Max-Age value ignored?",
        answer: "Browsers cap how long they cache a preflight result. Chromium-based browsers such as Chrome and Edge cap it at 7200 seconds (2 hours) and Firefox at 86400 seconds (24 hours). A larger value is reduced to the cap, so 86400 effectively means 2 hours in Chrome.",
      },
      {
        question: "Does CORS protect my API from other servers?",
        answer: "No. CORS is enforced by browsers to decide what scripts on a web page may read. curl, server-side code and mobile apps ignore it entirely, so protect your API with authentication and authorization rather than CORS settings.",
      },
    ],
  },
  "webdev/csp-validator": {
    about: [
      "A CSP validator checks a Content-Security-Policy header for syntax errors and weak settings before you deploy it. A policy can look correct and still fail quietly, because browsers skip parts they cannot understand and only log a console warning, so a quick check catches problems that would otherwise surface as a broken page or a policy that blocks nothing.",
      "Paste the header value without the Content-Security-Policy: name, or load the sample. The validator splits it on semicolons, counts the directives, and reports unquoted keywords such as self as errors. It warns about duplicate directives, deprecated ones like reflected-xss, * sources, and 'unsafe-inline' or 'unsafe-eval' in script-src or default-src, and adds notes for unknown directive names and a missing default-src or script-src.",
      "Duplicate directives are a common copy-paste bug: in script-src 'self'; script-src https://cdn.example.com, browsers use only the first, so the CDN stays blocked. Also, if a page receives two CSP headers, for example one from your app and one from a proxy, the browser enforces both and a resource must pass each one. Analysis runs in your browser.",
    ],
    faq: [
      {
        question: "How do I see which resources my CSP is blocking?",
        answer: "Open the browser's developer tools console and reload the page; each violation lists the blocked URL and the directive responsible. To collect violations from real visitors, add a report-to or report-uri directive pointing at an endpoint you control.",
      },
      {
        question: "What does 'strict-dynamic' do in a CSP?",
        answer: "It tells the browser to trust scripts loaded by a script that is already trusted through a nonce or hash, and to ignore host allowlists such as https: or 'self' in script-src. That makes nonce-based policies practical for sites whose scripts load other scripts, such as tag managers. Like other keywords, it must be written in single quotes.",
      },
      {
        question: "What is a CSP nonce?",
        answer: "A nonce is a random value your server generates for each response and places both in the header, as script-src 'nonce-abc123', and on the matching script tags, as <script nonce=\"abc123\">. Only scripts carrying the current nonce run, which allows legitimate inline scripts without 'unsafe-inline'. The nonce must be unpredictable and change on every page load.",
      },
    ],
  },
  "database/mongodb-query-formatter": {
    about: [
      "This MongoDB query formatter takes a query copied from application code, logs, the profiler or a one-line mongosh command and spreads it over several lines with consistent indentation. Long filters with $and, $or and $in, update documents and multi-stage aggregation pipelines are far easier to read, review and debug when each field and stage sits on its own line.",
      "Paste a query or load the sample, a find with $gt and $in followed by sort and limit. The output uses two-space indentation: each object and array opens a new level, each comma starts a new line, and empty {} or [] stay on one line. Strings keep their exact contents, including spaces or braces inside them. Copy the result or download it as query.js.",
      "Because it works on text rather than parsing JSON, shell syntax such as unquoted keys, single quotes, ObjectId(\"...\") and ISODate(\"...\") passes through as written. Spaces outside strings are not preserved, so write dates as ISODate(...) rather than new Date(...) before formatting. A formatted pipeline also makes it easy to spot a $match placed after $group, which cannot use an index. It runs in your browser.",
    ],
    faq: [
      {
        question: "How do I see the query plan for a MongoDB query?",
        answer: "Append .explain(\"executionStats\") to a find in mongosh, or run db.collection.explain(\"executionStats\").aggregate(pipeline) for a pipeline. The output shows whether an index was used (IXSCAN) or the whole collection was scanned (COLLSCAN), and how many documents were examined compared with how many were returned.",
      },
      {
        question: "What is the difference between find and aggregate in MongoDB?",
        answer: "find returns documents that match a filter, optionally with a projection, sort, skip and limit. aggregate runs a pipeline of stages such as $match, $group, $lookup and $project, so it can reshape documents, join collections and compute totals. Both can be pasted into this formatter.",
      },
    ],
  },
  "database/mongodb-objectid-generator": {
    about: [
      "This MongoDB ObjectId generator creates valid ObjectId values and decodes existing ones. ObjectIds are the default _id type in MongoDB, and you often need realistic ones for seed data, fixtures, unit tests or a manual insert in Compass, or want to know when a document was created from its _id alone.",
      "Choose 1, 5, 10 or 20 IDs and click Regenerate for a fresh batch; each ID has a Copy button. To decode, paste any 24-character hex ObjectId into the second box, and the tool shows the creation time as an ISO 8601 date in UTC, the random value as 10 hex characters and the counter as 6 hex characters. Uppercase hex and surrounding spaces are accepted.",
      "An ObjectId is 12 bytes written as 24 hex characters: a 4-byte timestamp in seconds, a 5-byte random value and a 3-byte counter. An ID starting with 66000000, for example, was created at 2024-03-24T10:27:12Z. Because the timestamp comes first, sorting by _id roughly sorts documents by creation time, to the second. Generation and decoding run in your browser.",
    ],
    faq: [
      {
        question: "How do I query MongoDB documents by creation date using _id?",
        answer: "Build an ObjectId from the date and compare against it. Convert the Unix time in seconds to 8 hex characters and add 16 zeros, for example Math.floor(new Date(\"2025-01-01T00:00:00Z\").getTime() / 1000).toString(16) + \"0000000000000000\", then query { _id: { $gte: ObjectId(\"677485800000000000000000\") } }. This uses the _id index, so it is fast even without a createdAt field.",
      },
      {
        question: "How do I get the timestamp from an ObjectId in code?",
        answer: "In mongosh and the Node.js driver, call getTimestamp() on the ObjectId, which returns a Date. In Python with PyMongo, read the generation_time property of a bson ObjectId. Both decode the first 4 bytes, the same value this tool shows.",
      },
    ],
  },
  "database/redis-command-builder": {
    about: [
      "This Redis command builder helps you write correct redis-cli commands without looking up argument order every time. It covers 27 everyday commands for strings, keys and expiry, hashes, lists, sets, sorted sets and pub/sub, from SET and HGETALL to ZADD, SCAN and PUBLISH.",
      "Pick a command and the form shows a one-line description and a labelled field for each argument, with example placeholders such as session:123 or leaderboard. Optional arguments are marked: SET takes an optional expiry in seconds and adds EX for you, and SCAN takes an optional MATCH pattern. Empty fields are left out, and the finished command updates live with a Copy button.",
      "Values are inserted exactly as typed, so wrap a value that contains spaces in double quotes, as in SET greeting \"hello world\", or redis-cli will treat each word as a separate argument. Key names like user:1 use colons only by convention; Redis treats the whole string as one key. Commands are built in your browser and never touch a Redis server.",
    ],
    faq: [
      {
        question: "How do I set a key that expires in Redis?",
        answer: "Use SET with EX in one command, for example SET session:123 abc EX 3600 to expire after an hour, which this builder produces when you fill in the expiry field. You can add a timeout to an existing key with EXPIRE session:123 3600 and check what is left with TTL, which returns -1 for a key with no expiry and -2 for a key that does not exist.",
      },
      {
        question: "What is the difference between ZRANGE and LRANGE?",
        answer: "LRANGE reads elements from a list by position, in the order they were pushed. ZRANGE reads members of a sorted set by rank, ordered by score from lowest to highest, so ZRANGE leaderboard 0 9 returns the ten lowest scores. For a top-ten leaderboard, add the REV option on Redis 6.2 or later, or use ZREVRANGE.",
      },
      {
        question: "Why does SUBSCRIBE stop redis-cli from accepting commands?",
        answer: "After SUBSCRIBE, the connection switches to subscriber mode and waits for messages, so redis-cli no longer accepts normal commands in that session. Press Ctrl+C to leave, and publish test messages from a second terminal with PUBLISH.",
      },
    ],
  },
  "database/postgresql-formatter": {
    about: [
      "This PostgreSQL formatter turns long or minified SQL into neatly indented, readable queries using PostgreSQL rules for keywords and operators. It is handy for queries copied from logs, pg_stat_statements or ORM debug output, which usually arrive as one long line that is hard to review.",
      "Paste your SQL or load the sample, a join with GROUP BY, HAVING and an interval expression. Choose UPPERCASE, lowercase or Preserve for keywords and 2 or 4 spaces of indentation, and the output updates immediately. Each main clause, such as SELECT, FROM, WHERE and GROUP BY, starts a new line with its contents indented. Copy the result or download it as formatted.sql.",
      "PostgreSQL syntax that generic formatters can mangle is kept intact: :: type casts such as id::text, JSON operators like ->>, positional parameters like $1, and dollar-quoted strings such as $$...$$ used in function bodies. If the input cannot be parsed, the error gives the line and column where parsing stopped, which often points to an unclosed parenthesis. Formatting runs in your browser.",
    ],
    faq: [
      {
        question: "Does changing keyword case affect how PostgreSQL runs a query?",
        answer: "No. SQL keywords are case-insensitive, so SELECT and select behave the same. Identifiers are different: PostgreSQL folds unquoted names to lowercase, so \"UserId\" in double quotes and UserId without quotes refer to different columns. The keyword case option changes keywords only, not your table or column names.",
      },
      {
        question: "How do I see the query plan for a formatted PostgreSQL query?",
        answer: "Put EXPLAIN in front of it to see the plan the planner chose, or EXPLAIN (ANALYZE, BUFFERS) to run the query and show actual row counts, timings and buffer usage. EXPLAIN ANALYZE really executes the statement, so wrap INSERT, UPDATE or DELETE statements in BEGIN and ROLLBACK when you analyze them.",
      },
    ],
  },
};
