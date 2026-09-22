package com.example.woodyzbackend.dto;

import com.example.woodyzbackend.entity.Review;
import java.util.List;

public class ReviewSummaryDTO {
    private List<Review> reviews;
    private double averageRating;

    public ReviewSummaryDTO(List<Review> reviews, double averageRating) {
        this.reviews = reviews;
        this.averageRating = averageRating;
    }

    public List<Review> getReviews() { return reviews; }
    public double getAverageRating() { return averageRating; }
}
