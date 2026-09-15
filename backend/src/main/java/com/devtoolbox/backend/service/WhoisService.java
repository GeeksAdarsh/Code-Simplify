package com.devtoolbox.backend.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.nio.charset.StandardCharsets;
import java.util.Locale;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Service;

import com.devtoolbox.backend.util.NetworkInputValidator;

/**
 * WHOIS (RFC 3912) is a plain-text, unauthenticated TCP protocol on port 43 -
 * there is no HTTP/JSON API, so this makes a raw socket connection. We try a
 * small map of well-known registry servers first, then fall back to asking
 * IANA's root WHOIS server which TLD registry to query (the same referral
 * chain a desktop `whois` client follows).
 */
@Service
public class WhoisService {

    private static final int WHOIS_PORT = 43;
    private static final int TIMEOUT_MS = 8000;
    private static final String IANA_WHOIS = "whois.iana.org";

    private static final Map<String, String> KNOWN_SERVERS = Map.ofEntries(
            Map.entry("com", "whois.verisign-grs.com"),
            Map.entry("net", "whois.verisign-grs.com"),
            Map.entry("org", "whois.pir.org"),
            Map.entry("io", "whois.nic.io"),
            Map.entry("dev", "whois.nic.google"),
            Map.entry("app", "whois.nic.google"),
            Map.entry("co", "whois.nic.co"),
            Map.entry("info", "whois.nic.info"),
            Map.entry("biz", "whois.nic.biz"),
            Map.entry("me", "whois.nic.me"),
            Map.entry("us", "whois.nic.us"));

    public record WhoisResult(String domain, String whoisServer, String rawText) {
    }

    public WhoisResult lookup(String domain) {
        String normalizedDomain = NetworkInputValidator.normalizeDomain(domain);
        String tld = extractTld(normalizedDomain);
        String server = KNOWN_SERVERS.getOrDefault(tld, resolveServerFromIana(tld));

        String rawText = query(server, normalizedDomain);

        String referral = extractReferral(rawText);
        if (referral != null && !referral.equalsIgnoreCase(server)) {
            try {
                String referredText = query(referral, normalizedDomain);
                if (!referredText.isBlank()) {
                    return new WhoisResult(normalizedDomain, referral,
                            rawText + "\n\n----- Additional record from " + referral + " -----\n\n" + referredText);
                }
            } catch (RuntimeException ignored) {
                // Fall back to the registry-level response if the referral hop fails.
            }
        }

        return new WhoisResult(normalizedDomain, server, rawText);
    }

    private String extractTld(String domain) {
        int idx = domain.lastIndexOf('.');
        if (idx < 0 || idx == domain.length() - 1) {
            throw new IllegalArgumentException("Enter a domain name including its TLD, e.g. example.com");
        }
        return domain.substring(idx + 1).toLowerCase(Locale.ROOT);
    }

    private String resolveServerFromIana(String tld) {
        String ianaResponse = query(IANA_WHOIS, tld);
        Matcher matcher = Pattern.compile("(?im)^whois:\\s*(\\S+)").matcher(ianaResponse);
        if (matcher.find()) {
            return matcher.group(1);
        }
        throw new IllegalArgumentException("Could not find a WHOIS server for ." + tld);
    }

    private String extractReferral(String rawText) {
        Matcher matcher = Pattern
                .compile("(?im)^\\s*(?:Registrar WHOIS Server|Whois Server|ReferralServer)\\s*:\\s*(?:whois://)?(\\S+)")
                .matcher(rawText);
        if (matcher.find()) {
            return matcher.group(1).replace("/", "");
        }
        return null;
    }

    private String query(String server, String queryText) {
        try (Socket socket = new Socket()) {
            socket.connect(new InetSocketAddress(server, WHOIS_PORT), TIMEOUT_MS);
            socket.setSoTimeout(TIMEOUT_MS);

            try (PrintWriter writer = new PrintWriter(socket.getOutputStream(), true, StandardCharsets.UTF_8);
                    BufferedReader reader = new BufferedReader(
                            new InputStreamReader(socket.getInputStream(), StandardCharsets.UTF_8))) {
                writer.print(queryText + "\r\n");
                writer.flush();

                StringBuilder sb = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    sb.append(line).append('\n');
                }
                return sb.toString();
            }
        } catch (IOException e) {
            throw new IllegalStateException("Could not reach WHOIS server " + server + ": " + e.getMessage());
        }
    }
}
