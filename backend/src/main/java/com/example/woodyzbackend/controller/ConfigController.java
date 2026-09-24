package com.example.woodyzbackend.controller;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Provides live developer/operator configuration information. Restricted to
 * ADMIN via SecurityConfig.
 */
@RestController
@RequestMapping("/api/config")
public class ConfigController {

    @Value("${app.frontendOrigin:http://localhost:3000}")
    private String frontendOrigin;

    @Value("${spring.cache.type:simple}")
    private String cacheType;

    @Value("${spring.jpa.hibernate.ddl-auto:update}")
    private String ddlAuto;

    @Value("${spring.datasource.url:}")
    private String datasourceUrl;

    @GetMapping
    public Map<String, Object> getConfig() {
        Map<String, Object> config = new LinkedHashMap<>();
        config.put("frontendOrigin", frontendOrigin);
        config.put("cacheType", cacheType);
        config.put("ddlAuto", ddlAuto);
        // Mask credentials in the datasource URL
        config.put("datasourceUrl", datasourceUrl.replaceAll("password=[^&;]*", "password=***"));
        config.put("javaVersion", System.getProperty("java.version"));
        return config;
    }
}
