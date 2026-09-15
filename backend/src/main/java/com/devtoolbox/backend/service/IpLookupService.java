package com.devtoolbox.backend.service;

import java.io.IOException;
import java.net.InetAddress;
import java.net.URI;
import java.net.UnknownHostException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

import org.springframework.stereotype.Service;

import com.devtoolbox.backend.dto.IpLookupResponse;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Geolocation for an arbitrary IP requires a maintained GeoIP database, which
 * is impractical to ship with this project. This proxies to ip-api.com's free,
 * no-key JSON endpoint (45 req/min, non-commercial use) from the server so the
 * browser never talks to a third party directly. Swap this for a paid provider
 * or a self-hosted database before any commercial/production launch at scale.
 */
@Service
public class IpLookupService {

    private static final String FIELDS =
            "status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query";

    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(8))
            .build();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public IpLookupResponse lookup(String ip) {
        validateIp(ip);

        try {
            URI uri = URI.create("http://ip-api.com/json/" + ip + "?fields=" + FIELDS);
            HttpRequest request = HttpRequest.newBuilder(uri)
                    .timeout(Duration.ofSeconds(10))
                    .GET()
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            IpLookupResponse result = objectMapper.readValue(response.body(), IpLookupResponse.class);

            if (result.status() != null && "fail".equalsIgnoreCase(result.status())) {
                throw new IllegalArgumentException(
                        result.message() != null ? result.message() : "Lookup failed for " + ip);
            }

            return result;
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Could not reach the geolocation service: request interrupted");
        } catch (IOException e) {
            throw new IllegalStateException("Could not reach the geolocation service: " + e.getMessage());
        }
    }

    private void validateIp(String ip) {
        try {
            InetAddress address = InetAddress.getByName(ip);
            if (address.isLoopbackAddress() || address.isSiteLocalAddress() || address.isLinkLocalAddress()
                    || address.isAnyLocalAddress() || address.isMulticastAddress()) {
                throw new IllegalArgumentException("Enter a public IP address");
            }
        } catch (UnknownHostException e) {
            throw new IllegalArgumentException("Enter a valid IP address");
        }
    }
}
