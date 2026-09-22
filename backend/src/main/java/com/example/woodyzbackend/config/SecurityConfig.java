package com.example.woodyzbackend.config;

import com.example.woodyzbackend.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
            .authorizeRequests()
                .antMatchers("/api/auth/**").permitAll()
                .antMatchers(org.springframework.http.HttpMethod.GET, "/api/products/**").permitAll()
                .antMatchers(org.springframework.http.HttpMethod.GET, "/api/reviews/product/**").permitAll()
                .antMatchers(org.springframework.http.HttpMethod.POST, "/api/reviews/").permitAll() 
                .antMatchers(org.springframework.http.HttpMethod.GET, "/api/reviews/user").authenticated()
                .antMatchers(org.springframework.http.HttpMethod.POST, "/api/support/").permitAll()
                .antMatchers(org.springframework.http.HttpMethod.GET, "/api/support/user").authenticated()
                .antMatchers(org.springframework.http.HttpMethod.GET, "/api/support/**").hasRole("ADMIN")
                .antMatchers(org.springframework.http.HttpMethod.PUT, "/api/support/**").hasRole("ADMIN")
                .antMatchers(org.springframework.http.HttpMethod.POST, "/api/products/**").hasRole("ADMIN")
                .antMatchers(org.springframework.http.HttpMethod.PUT, "/api/products/**").hasRole("ADMIN")
                .antMatchers(org.springframework.http.HttpMethod.DELETE, "/api/products/**").hasRole("ADMIN")
                .antMatchers("/api/analytics/**").hasRole("ADMIN")
                .antMatchers("/api/orders/**").permitAll()
                .anyRequest().authenticated();

        // Add JWT filter
        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
