package com.example.woodyzbackend.service;

import com.example.woodyzbackend.entity.User;
import com.example.woodyzbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @SuppressWarnings("null")
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @SuppressWarnings("null")
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public User getCurrentUser() {
        org.springframework.security.core.Authentication authentication = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getPrincipal())) {
            return null;
        }
        return findByUsername(authentication.getName());
    }
}
