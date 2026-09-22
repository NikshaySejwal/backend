package com.example.woodyzbackend.service;

import com.example.woodyzbackend.entity.Review;
import com.example.woodyzbackend.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    public List<Review> getReviewsByProductId(Long productId) {
        return reviewRepository.findByProductId(productId);
    }

    public List<Review> getReviewsByUserId(Long userId) {
        return reviewRepository.findByUserId(userId);
    }

    @SuppressWarnings("null")
    public Review saveReview(Review review) {
        return reviewRepository.save(review);
    }
}
