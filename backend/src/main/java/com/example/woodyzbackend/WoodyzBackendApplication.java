package com.example.woodyzbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.beans.factory.annotation.Value;

@SpringBootApplication
@EnableCaching
public class WoodyzBackendApplication {
    @Value("${app.frontendOrigin}")
    private String frontendOrigin;

    public static void main(String[] args) {
        SpringApplication.run(WoodyzBackendApplication.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(@org.springframework.lang.NonNull CorsRegistry registry) {
                registry.addMapping("/**")
                    .allowedOrigins(frontendOrigin)
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*");
            }
        };
    }
}
