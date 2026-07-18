package com.devtoolbox.backend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record IpLookupResponse(
        String status,
        String message,
        String country,
        String countryCode,
        String region,
        String regionName,
        String city,
        String zip,
        Double lat,
        Double lon,
        String timezone,
        String isp,
        String org,
        String as,
        String query) {
}
