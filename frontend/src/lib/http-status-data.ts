export interface HttpStatusInfo {
  code: number;
  category: "1xx Informational" | "2xx Success" | "3xx Redirection" | "4xx Client Error" | "5xx Server Error";
  name: string;
  description: string;
}

export const HTTP_STATUS_CODES: HttpStatusInfo[] = [
  { code: 100, category: "1xx Informational", name: "Continue", description: "The server has received the request headers and the client should proceed to send the request body." },
  { code: 101, category: "1xx Informational", name: "Switching Protocols", description: "The requester has asked the server to switch protocols, and the server has agreed (e.g. HTTP to WebSocket)." },
  { code: 102, category: "1xx Informational", name: "Processing", description: "The server has received and is processing the request, but no response is available yet (WebDAV)." },
  { code: 103, category: "1xx Informational", name: "Early Hints", description: "Used to return some response headers before the final HTTP message, e.g. to preload resources." },

  { code: 200, category: "2xx Success", name: "OK", description: "The request has succeeded." },
  { code: 201, category: "2xx Success", name: "Created", description: "The request succeeded and a new resource was created as a result." },
  { code: 202, category: "2xx Success", name: "Accepted", description: "The request has been accepted for processing, but processing has not been completed." },
  { code: 203, category: "2xx Success", name: "Non-Authoritative Information", description: "The returned metadata is from a local or third-party copy, not the origin server." },
  { code: 204, category: "2xx Success", name: "No Content", description: "The server successfully processed the request but is not returning any content." },
  { code: 205, category: "2xx Success", name: "Reset Content", description: "Tells the client to reset the document view that sent this request." },
  { code: 206, category: "2xx Success", name: "Partial Content", description: "Used with range requests to deliver only part of a resource." },

  { code: 300, category: "3xx Redirection", name: "Multiple Choices", description: "The request has more than one possible response; the agent should choose one." },
  { code: 301, category: "3xx Redirection", name: "Moved Permanently", description: "The resource has been permanently moved to a new URL given in the Location header." },
  { code: 302, category: "3xx Redirection", name: "Found", description: "The resource temporarily resides at a different URL (commonly used for temporary redirects)." },
  { code: 303, category: "3xx Redirection", name: "See Other", description: "The response can be found at another URL using a GET request." },
  { code: 304, category: "3xx Redirection", name: "Not Modified", description: "Indicates the cached version of the resource is still valid; no body is returned." },
  { code: 307, category: "3xx Redirection", name: "Temporary Redirect", description: "Like 302 Found, but guarantees the method and body will not change on the redirected request." },
  { code: 308, category: "3xx Redirection", name: "Permanent Redirect", description: "Like 301 Moved Permanently, but guarantees the method and body will not change." },

  { code: 400, category: "4xx Client Error", name: "Bad Request", description: "The server cannot process the request due to a client error (malformed syntax, invalid parameters, etc.)." },
  { code: 401, category: "4xx Client Error", name: "Unauthorized", description: "Authentication is required and has failed or has not yet been provided." },
  { code: 402, category: "4xx Client Error", name: "Payment Required", description: "Reserved for future use, e.g. digital payment systems." },
  { code: 403, category: "4xx Client Error", name: "Forbidden", description: "The server understood the request but refuses to authorize it." },
  { code: 404, category: "4xx Client Error", name: "Not Found", description: "The requested resource could not be found on the server." },
  { code: 405, category: "4xx Client Error", name: "Method Not Allowed", description: "The request method is not supported for the requested resource." },
  { code: 406, category: "4xx Client Error", name: "Not Acceptable", description: "The requested resource can't generate content matching the Accept headers sent." },
  { code: 407, category: "4xx Client Error", name: "Proxy Authentication Required", description: "The client must authenticate with a proxy before the request can proceed." },
  { code: 408, category: "4xx Client Error", name: "Request Timeout", description: "The server timed out waiting for the request." },
  { code: 409, category: "4xx Client Error", name: "Conflict", description: "The request conflicts with the current state of the target resource." },
  { code: 410, category: "4xx Client Error", name: "Gone", description: "The resource requested is permanently unavailable and has no forwarding address." },
  { code: 411, category: "4xx Client Error", name: "Length Required", description: "The server refuses to accept the request without a defined Content-Length header." },
  { code: 412, category: "4xx Client Error", name: "Precondition Failed", description: "One or more conditions in the request header fields evaluated to false." },
  { code: 413, category: "4xx Client Error", name: "Payload Too Large", description: "The request entity is larger than limits defined by the server." },
  { code: 414, category: "4xx Client Error", name: "URI Too Long", description: "The URI requested by the client is longer than the server is willing to interpret." },
  { code: 415, category: "4xx Client Error", name: "Unsupported Media Type", description: "The media format of the requested data is not supported by the server." },
  { code: 416, category: "4xx Client Error", name: "Range Not Satisfiable", description: "The range specified by the Range header field cannot be fulfilled." },
  { code: 417, category: "4xx Client Error", name: "Expectation Failed", description: "The expectation given in the Expect request header could not be met." },
  { code: 418, category: "4xx Client Error", name: "I'm a teapot", description: "An April Fools' joke from RFC 2324 \u2014 a teapot cannot brew coffee." },
  { code: 422, category: "4xx Client Error", name: "Unprocessable Entity", description: "The request was well-formed but contains semantic errors (WebDAV; widely used by REST APIs)." },
  { code: 423, category: "4xx Client Error", name: "Locked", description: "The resource being accessed is locked (WebDAV)." },
  { code: 425, category: "4xx Client Error", name: "Too Early", description: "The server is unwilling to risk processing a request that might be replayed." },
  { code: 426, category: "4xx Client Error", name: "Upgrade Required", description: "The server refuses to perform the request using the current protocol." },
  { code: 428, category: "4xx Client Error", name: "Precondition Required", description: "The origin server requires the request to be conditional." },
  { code: 429, category: "4xx Client Error", name: "Too Many Requests", description: "The user has sent too many requests in a given amount of time (rate limiting)." },
  { code: 431, category: "4xx Client Error", name: "Request Header Fields Too Large", description: "The server refuses to process the request because header fields are too large." },
  { code: 451, category: "4xx Client Error", name: "Unavailable For Legal Reasons", description: "The resource is unavailable due to a legal demand (e.g. government-mandated blocking)." },

  { code: 500, category: "5xx Server Error", name: "Internal Server Error", description: "A generic error message given when an unexpected condition was encountered." },
  { code: 501, category: "5xx Server Error", name: "Not Implemented", description: "The server does not support the functionality required to fulfill the request." },
  { code: 502, category: "5xx Server Error", name: "Bad Gateway", description: "The server, while acting as a gateway or proxy, received an invalid response from the upstream server." },
  { code: 503, category: "5xx Server Error", name: "Service Unavailable", description: "The server is not ready to handle the request, often due to maintenance or overload." },
  { code: 504, category: "5xx Server Error", name: "Gateway Timeout", description: "The server, while acting as a gateway or proxy, did not get a response in time from the upstream server." },
  { code: 505, category: "5xx Server Error", name: "HTTP Version Not Supported", description: "The server does not support the HTTP protocol version used in the request." },
  { code: 507, category: "5xx Server Error", name: "Insufficient Storage", description: "The server is unable to store the representation needed to complete the request (WebDAV)." },
  { code: 508, category: "5xx Server Error", name: "Loop Detected", description: "The server detected an infinite loop while processing the request (WebDAV)." },
  { code: 511, category: "5xx Server Error", name: "Network Authentication Required", description: "The client needs to authenticate to gain network access, e.g. a captive portal." },
];

export function findHttpStatus(query: string): HttpStatusInfo[] {
  const q = query.trim().toLowerCase();
  if (!q) return HTTP_STATUS_CODES;
  const asNumber = Number(q);
  if (!Number.isNaN(asNumber)) {
    return HTTP_STATUS_CODES.filter((s) => s.code === asNumber || String(s.code).startsWith(q));
  }
  return HTTP_STATUS_CODES.filter((s) => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || s.category.toLowerCase().includes(q));
}
