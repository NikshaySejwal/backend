package com.example.woodyzbackend.controller;

import com.example.woodyzbackend.service.StripeService;
import com.example.woodyzbackend.dto.CheckoutItemRequest;
import com.example.woodyzbackend.entity.Product;
import com.example.woodyzbackend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private StripeService stripeService;

    @Autowired
    private ProductRepository productRepository;

    @PostMapping("/create-payment-intent")
    public ResponseEntity<Map<String, String>> createPaymentIntent(@RequestBody Map<String, Object> data) {
        try {
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> rawItems = (List<Map<String, Object>>) data.get("items");
            if (rawItems == null || rawItems.isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
            double amount = 0;
            for (Map<String, Object> rawItem : rawItems) {
                Long productId = Long.valueOf(rawItem.get("productId").toString());
                int quantity = Integer.parseInt(rawItem.get("quantity").toString());
                if (quantity < 1 || quantity > 100) {
                    return ResponseEntity.badRequest().build();
                }
                Product product = productRepository.findById(productId).orElse(null);
                if (product == null) {
                    return ResponseEntity.badRequest().build();
                }
                amount += product.getPrice() * quantity;
            }
            String currency = "usd";
            
            String clientSecret = stripeService.createPaymentIntent(amount, currency);
            
            Map<String, String> response = new HashMap<>();
            response.put("clientSecret", clientSecret);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Unable to create payment intent");
            return ResponseEntity.badRequest().body(error);
        }
    }
}
