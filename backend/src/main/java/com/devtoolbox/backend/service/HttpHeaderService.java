package com.devtoolbox.backend.service;

import java.io.IOException;
import java.net.InetAddress;
import java.net.URI;
import java.net.UnknownHostException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.devtoolbox.backend.dto.HttpHeaderEntry;
import com.devtoolbox.backend.dto.HttpHeaderResponse;

/**
 * Fetches response headers for a user-supplied URL server-side (browsers can't
 * read cross-origin headers due to CORS). Redirects are never auto-followed and
 * every resolved address is checked against loopback/private/link-local/multicast
 * ranges before connecting, so this can't be used to probe the server's own
 * internal network or cloud metadata endpoints (SSRF).
 */
@Service
public class HttpHeaderService {

    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(8))
            .followRedirects(HttpClient.Redirect.NEVER)
            .build();

    public HttpHeaderResponse fetchHeaders(String rawUrl) {
        URI uri = parseAndValidateUrl(rawUrl);
        validateNotPrivateTarget(uri.getHost());

        try {
            HttpRequest request = HttpRequest.newBuilder(uri)
                    .timeout(Duration.ofSeconds(10))
                    .header("User-Agent", "Mozilla/5.0 (compatible; CodeSimplify-HttpHeaderViewer/1.0)")
                    .GET()
                    .build();

            HttpResponse<Void> response = httpClient.send(request, HttpResponse.BodyHandlers.discarding());

            List<HttpHeaderEntry> headers = new ArrayList<>();
            for (Map.Entry<String, List<String>> entry : response.headers().map().entrySet()) {
                if (entry.getKey().startsWith(":")) {
                    continue; // HTTP/2 pseudo-headers (:status etc.) aren't real response headers.
                }
                headers.add(new HttpHeaderEntry(entry.getKey(), String.join(", ", entry.getValue())));
            }

            String redirectLocation = response.headers().firstValue("Location").orElse(null);

            return new HttpHeaderResponse(uri.toString(), response.statusCode(), statusText(response.statusCode()),
                    headers, redirectLocation);
        } catch (IOException | InterruptedException e) {
            throw new IllegalStateException("Could not fetch " + uri + ": " + e.getMessage());
        }
    }

    private URI parseAndValidateUrl(String rawUrl) {
        URI uri;
        try {
            uri = new URI(rawUrl.trim());
        } catch (Exception e) {
            throw new IllegalArgumentException("Enter a valid URL, e.g. https://example.com");
        }

        if (uri.getScheme() == null
                || !(uri.getScheme().equalsIgnoreCase("http") || uri.getScheme().equalsIgnoreCase("https"))) {
            throw new IllegalArgumentException("Only http:// and https:// URLs are supported");
        }
        if (uri.getHost() == null || uri.getHost().isBlank()) {
            throw new IllegalArgumentException("Enter a valid URL, e.g. https://example.com");
        }
        return uri;
    }

    private void validateNotPrivateTarget(String host) {
        try {
            InetAddress[] addresses = InetAddress.getAllByName(host);
            for (InetAddress address : addresses) {
                if (address.isLoopbackAddress() || address.isLinkLocalAddress() || address.isSiteLocalAddress()
                        || address.isMulticastAddress() || address.isAnyLocalAddress()) {
                    throw new IllegalArgumentException("Refusing to fetch headers for a private/internal address");
                }
            }
        } catch (UnknownHostException e) {
            throw new IllegalArgumentException("Could not resolve host: " + host);
        }
    }

    private String statusText(int code) {
        return switch (code / 100) {
            case 1 -> "Informational";
            case 2 -> "Success";
            case 3 -> "Redirection";
            case 4 -> "Client Error";
            case 5 -> "Server Error";
            default -> "Unknown";
        };
    }
}
