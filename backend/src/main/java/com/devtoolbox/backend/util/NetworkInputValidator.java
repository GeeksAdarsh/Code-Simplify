package com.devtoolbox.backend.util;

import java.util.Locale;
import java.util.regex.Pattern;

/**
 * Shared validation for user-supplied network lookup targets.
 * Rejects control characters and malformed hostnames before any outbound connection.
 */
public final class NetworkInputValidator {

    private static final Pattern DOMAIN_PATTERN = Pattern.compile(
            "^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.)+[a-z]{2,63}$",
            Pattern.CASE_INSENSITIVE);

    private NetworkInputValidator() {
    }

    public static String normalizeDomain(String domain) {
        if (domain == null) {
            throw new IllegalArgumentException("Enter a domain name, e.g. example.com");
        }
        String trimmed = domain.trim().toLowerCase(Locale.ROOT);
        if (trimmed.isEmpty() || trimmed.contains("\r") || trimmed.contains("\n") || trimmed.contains(" ")
                || trimmed.contains("\t")) {
            throw new IllegalArgumentException("Enter a domain name, e.g. example.com");
        }
        if (!DOMAIN_PATTERN.matcher(trimmed).matches()) {
            throw new IllegalArgumentException("Enter a valid domain name, e.g. example.com");
        }
        return trimmed;
    }
}
