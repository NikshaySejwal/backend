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

/**
 * REST controller for managing product reviews.
 * Provides endpoints for customers to read reviews and submit their own.
 * 
 * Connections:
 * - Integrates with `ReviewService` for fetching and storing reviews.
 * - Uses `UserService` to identify the currently authenticated user for review attribution.
 * - Exposed via `/api/reviews/**`.
 */
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @Autowired
    private UserService userService;

    /**
     * Retrieves all reviews associated with a specific product.
     * 
     * @param productId The ID of the product.
     * @return A list of `Review` entities.
     */
    @GetMapping("/product/{productId}")
    public List<Review> getReviewsByProduct(@PathVariable Long productId) {
        return reviewService.getReviewsByProductId(productId);
    }

    /**
     * Retrieves all reviews submitted by the currently authenticated user.
     * 
     * @return A `ResponseEntity` containing the user's reviews, or 401 Unauthorized.
     */
    @GetMapping("/user")
    public ResponseEntity<List<Review>> getReviewsByUser() {
        User currentUser = userService.getCurrentUser();
        if (currentUser == null) return ResponseEntity.status(401).build();
        return ResponseEntity.ok(reviewService.getReviewsByUserId(currentUser.getId()));
    }

    /**
     * Retrieves a summary of reviews for a product, including the average rating.
     * 
     * @param productId The ID of the product.
     * @return A `ReviewSummaryDTO` containing reviews and the calculated average.
     */
    @GetMapping("/product/{productId}/summary")
    public ReviewSummaryDTO getReviewSummary(@PathVariable Long productId) {
        List<Review> reviews = reviewService.getReviewsByProductId(productId);
        double average = reviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0);
        return new ReviewSummaryDTO(reviews, average);
    }

    /**
     * Submits a new review for a product.
     * Automatically associates the review with the authenticated user.
     * 
     * @param review The review details.
     * @return A `ResponseEntity` containing the created `Review`.
     */
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
