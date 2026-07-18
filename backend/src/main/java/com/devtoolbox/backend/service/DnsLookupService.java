package com.devtoolbox.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Set;

import org.springframework.stereotype.Service;
import org.xbill.DNS.Lookup;
import org.xbill.DNS.Record;
import org.xbill.DNS.TextParseException;
import org.xbill.DNS.Type;

import com.devtoolbox.backend.dto.DnsRecordDto;

@Service
public class DnsLookupService {

    private static final Set<String> SUPPORTED_TYPES = Set.of("A", "AAAA", "MX", "TXT", "NS", "CNAME", "SOA", "CAA");

    public List<DnsRecordDto> lookup(String domain, String recordType) {
        String type = (recordType == null || recordType.isBlank() ? "A" : recordType).toUpperCase(Locale.ROOT);
        if (!SUPPORTED_TYPES.contains(type)) {
            throw new IllegalArgumentException(
                    "Unsupported record type: " + type + ". Supported: " + String.join(", ", SUPPORTED_TYPES));
        }

        int dnsType = Type.value(type);
        if (dnsType < 0) {
            throw new IllegalArgumentException("Unsupported record type: " + type);
        }

        try {
            Lookup lookup = new Lookup(domain, dnsType);
            lookup.run();

            int result = lookup.getResult();
            if (result == Lookup.HOST_NOT_FOUND || result == Lookup.TYPE_NOT_FOUND) {
                return List.of();
            }
            if (result != Lookup.SUCCESSFUL) {
                throw new IllegalStateException("DNS lookup failed: " + lookup.getErrorString());
            }

            Record[] records = lookup.getAnswers();
            if (records == null) {
                return List.of();
            }

            List<DnsRecordDto> resultList = new ArrayList<>();
            for (Record record : records) {
                resultList.add(new DnsRecordDto(
                        Type.string(record.getType()),
                        record.getName().toString(),
                        record.getTTL(),
                        record.rdataToString()));
            }
            return resultList;
        } catch (TextParseException e) {
            throw new IllegalArgumentException("Invalid domain name: " + domain);
        }
    }
}
