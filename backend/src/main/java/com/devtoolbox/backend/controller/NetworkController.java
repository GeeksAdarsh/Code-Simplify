package com.devtoolbox.backend.controller;

import java.util.Locale;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devtoolbox.backend.dto.DnsLookupResponse;
import com.devtoolbox.backend.dto.HttpHeaderResponse;
import com.devtoolbox.backend.dto.IpLookupResponse;
import com.devtoolbox.backend.dto.WhoisResponse;
import com.devtoolbox.backend.service.DnsLookupService;
import com.devtoolbox.backend.service.HttpHeaderService;
import com.devtoolbox.backend.service.IpLookupService;
import com.devtoolbox.backend.service.WhoisService;

/**
 * Networking lookups that need real outbound network access (DNS resolution,
 * a raw WHOIS socket, an HTTP fetch, IP geolocation) which browsers cannot
 * perform directly. Every target is validated to reject private/internal
 * addresses before any outbound connection is opened.
 */
@RestController
public class NetworkController {

    private final DnsLookupService dnsLookupService;
    private final WhoisService whoisService;
    private final HttpHeaderService httpHeaderService;
    private final IpLookupService ipLookupService;

    public NetworkController(DnsLookupService dnsLookupService, WhoisService whoisService,
            HttpHeaderService httpHeaderService, IpLookupService ipLookupService) {
        this.dnsLookupService = dnsLookupService;
        this.whoisService = whoisService;
        this.httpHeaderService = httpHeaderService;
        this.ipLookupService = ipLookupService;
    }

    @GetMapping("/api/network/dns")
    public DnsLookupResponse dnsLookup(@RequestParam String domain, @RequestParam(defaultValue = "A") String type) {
        String trimmedDomain = domain == null ? "" : domain.trim();
        if (trimmedDomain.isEmpty()) {
            throw new IllegalArgumentException("Enter a domain name, e.g. example.com");
        }
        String normalizedType = type.toUpperCase(Locale.ROOT);
        return new DnsLookupResponse(trimmedDomain, normalizedType,
                dnsLookupService.lookup(trimmedDomain, normalizedType));
    }

    @GetMapping("/api/network/whois")
    public WhoisResponse whois(@RequestParam String domain) {
        String trimmedDomain = domain == null ? "" : domain.trim().toLowerCase(Locale.ROOT);
        if (trimmedDomain.isEmpty()) {
            throw new IllegalArgumentException("Enter a domain name, e.g. example.com");
        }
        WhoisService.WhoisResult result = whoisService.lookup(trimmedDomain);
        return new WhoisResponse(result.domain(), result.whoisServer(), result.rawText());
    }

    @GetMapping("/api/network/http-headers")
    public HttpHeaderResponse httpHeaders(@RequestParam String url) {
        if (url == null || url.isBlank()) {
            throw new IllegalArgumentException("Enter a URL, e.g. https://example.com");
        }
        return httpHeaderService.fetchHeaders(url);
    }

    @GetMapping("/api/network/ip-lookup")
    public IpLookupResponse ipLookup(@RequestParam String ip) {
        if (ip == null || ip.isBlank()) {
            throw new IllegalArgumentException("Enter an IP address, e.g. 8.8.8.8");
        }
        return ipLookupService.lookup(ip.trim());
    }
}
