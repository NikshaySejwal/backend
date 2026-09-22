package com.example.woodyzbackend.controller;

import com.example.woodyzbackend.dto.ReviewSummaryDTO;
import com.example.woodyzbackend.entity.Review;
import com.example.woodyzbackend.entity.User;
import com.example.woodyzbackend.service.ReviewService;
import com.example.woodyzbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @Autowired
    private UserService userService;

    @GetMapping("/product/{productId}")
    public List<Review> getReviewsByProduct(@PathVariable Long productId) {
        return reviewService.getReviewsByProductId(productId);
    }

    @GetMapping("/user")
    public ResponseEntity<List<Review>> getReviewsByUser() {
        User currentUser = userService.getCurrentUser();
        if (currentUser == null) return ResponseEntity.status(401).build();
        return ResponseEntity.ok(reviewService.getReviewsByUserId(currentUser.getId()));
    }

    @GetMapping("/product/{productId}/summary")
    public ReviewSummaryDTO getReviewSummary(@PathVariable Long productId) {
        List<Review> reviews = reviewService.getReviewsByProductId(productId);
        double average = reviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0);
        return new ReviewSummaryDTO(reviews, average);
    }

    @PostMapping("/")
    public ResponseEntity<Review> createReview(@RequestBody Review review) {
        User currentUser = userService.getCurrentUser();
        if (currentUser != null) {
            review.setUserId(currentUser.getId());
            review.setUsername(currentUser.getUsername());
        } else {
            // Optional: Support anonymous reviews or require login
            review.setUsername("Anonymous Explorer");
        }
        return ResponseEntity.ok(reviewService.saveReview(review));
    }
}
