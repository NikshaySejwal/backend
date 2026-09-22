package com.example.woodyzbackend.controller;

import com.example.woodyzbackend.entity.Order;
import com.example.woodyzbackend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public Order getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id);
    }

    @GetMapping("/user/{userId}")
    public Iterable<Order> getUserOrders(@PathVariable Long userId) {
        return orderService.getOrdersByUserId(userId);
    }

    @GetMapping("/{id}/history")
    public Iterable<com.example.woodyzbackend.entity.OrderStatusHistory> getOrderHistory(@PathVariable Long id) {
        return orderService.getOrderHistory(id);
    }

    @PostMapping("/")
    public Order createOrder(@RequestBody Order order) {
        return orderService.saveOrder(order);
    }
}
