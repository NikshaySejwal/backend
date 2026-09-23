package com.example.woodyzbackend.controller;

import com.example.woodyzbackend.entity.Order;
import com.example.woodyzbackend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping
    public Iterable<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id, Authentication authentication) {
        Order order = orderService.getOrderById(id);
        if (order == null || !orderService.canAccessOrder(order, authentication)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(order);
    }

    @GetMapping("/user/{userId}")
    public Iterable<Order> getUserOrders(@PathVariable Long userId) {
        return orderService.getOrdersForCurrentUser();
    }

    @GetMapping("/{id}/history")
    public ResponseEntity<Iterable<com.example.woodyzbackend.entity.OrderStatusHistory>> getOrderHistory(@PathVariable Long id, Authentication authentication) {
        Order order = orderService.getOrderById(id);
        if (order == null || !orderService.canAccessOrder(order, authentication)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(orderService.getOrderHistory(id));
    }

    @PostMapping("/")
    public Order createOrder(@RequestBody Order order, Authentication authentication) {
        return orderService.saveCustomerOrder(order, authentication);
    }
}
