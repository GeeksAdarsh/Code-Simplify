package com.devtoolbox.backend.dto;

public record WhoisResponse(String domain, String whoisServer, String rawText) {
}
