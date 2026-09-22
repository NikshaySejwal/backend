package com.example.woodyzbackend.controller;

import com.example.woodyzbackend.entity.User;
import com.example.woodyzbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/{username}")
    public User getUserByUsername(@PathVariable String username) {
        return userService.findByUsername(username);
    }

    @PostMapping("/")
    public User createUser(@RequestBody User user) {
        return userService.saveUser(user);
    }
}
