package com.devtoolbox.backend.dto;

import java.util.List;

public record HttpHeaderResponse(
        String url,
        int statusCode,
        String statusText,
        List<HttpHeaderEntry> headers,
        String redirectLocation) {
}
