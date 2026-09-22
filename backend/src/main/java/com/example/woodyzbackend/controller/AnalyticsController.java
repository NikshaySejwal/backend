package com.example.woodyzbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.woodyzbackend.repository.OrderRepository;
import com.example.woodyzbackend.repository.ProductRepository;
import com.example.woodyzbackend.repository.ReviewRepository;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @GetMapping("/summary")
    public Map<String, Object> getSummary() {
        Map<String, Object> summary = new HashMap<>();
        summary.put("totalOrders", orderRepository.count());
        summary.put("totalProducts", productRepository.count());
        summary.put("totalReviews", reviewRepository.count());
        summary.put("totalRevenue", orderRepository.findAll().stream().mapToDouble(o -> o.getTotalAmount()).sum());
        return summary;
    }
}
