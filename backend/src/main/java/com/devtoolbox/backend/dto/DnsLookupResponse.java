package com.devtoolbox.backend.dto;

import java.util.List;

public record DnsLookupResponse(String domain, String type, List<DnsRecordDto> records) {
}
