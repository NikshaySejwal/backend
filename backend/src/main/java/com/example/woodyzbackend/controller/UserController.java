package com.example.woodyzbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.woodyzbackend.entity.User;
import com.example.woodyzbackend.service.UserService;

/**
 * REST controller for managing user accounts. Provides endpoints for retrieving
 * user details by username and creating new users.
 *
 * Connections: - Integrates with `UserService` for user-related business logic
 * and persistence. - Exposed via `/api/users/**`.
 */
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * Retrieves a user by their username.
     *
     * @param username The username to look up.
     * @return The requested `User` entity.
     */
    @GetMapping("/{username}")
    public User getUserByUsername(@PathVariable String username) {
        return userService.findByUsername(username);
    }

    /**
     * Creates a new user in the system.
     *
     * @param user The user details to save.
     * @return The created `User` entity.
     */
    @PostMapping("/")
    public User createUser(@RequestBody User user) {
        return userService.saveUser(user);
    }
}
