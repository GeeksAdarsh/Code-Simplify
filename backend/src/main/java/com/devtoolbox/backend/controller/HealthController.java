package com.devtoolbox.backend.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Basic health check. Heavier tool endpoints (PDF processing, file conversion,
 * OCR, etc.) will be added under /api/{tool} as those tools are implemented.
 */
@RestController
public class HealthController {

    @GetMapping("/api/health")
    public Map<String, Object> health() {
        return Map.of(
                "status", "ok",
                "service", "devtoolbox-backend"
        );
    }
}
