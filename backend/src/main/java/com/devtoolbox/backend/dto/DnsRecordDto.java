package com.devtoolbox.backend.dto;

public record DnsRecordDto(String type, String name, long ttl, String value) {
}
