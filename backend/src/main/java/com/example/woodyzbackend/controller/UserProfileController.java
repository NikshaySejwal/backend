package com.example.woodyzbackend.controller;

import com.example.woodyzbackend.dto.UserProfileDTO;
import com.example.woodyzbackend.entity.User;
import com.example.woodyzbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserProfileController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<UserProfileDTO> getUserProfile() {
        User currentUser = userService.getCurrentUser();
        if (currentUser == null) {
            return ResponseEntity.status(401).build();
        }
        UserProfileDTO userProfileDTO = new UserProfileDTO(currentUser.getUsername(), currentUser.getEmail(), currentUser.getRole());
        return ResponseEntity.ok(userProfileDTO);
    }
}
