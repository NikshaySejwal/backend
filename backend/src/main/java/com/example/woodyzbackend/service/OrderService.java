package com.example.woodyzbackend.service;

import com.example.woodyzbackend.entity.Order;
import com.example.woodyzbackend.entity.OrderStatusHistory;
import com.example.woodyzbackend.repository.OrderRepository;
import com.example.woodyzbackend.repository.OrderStatusHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private OrderStatusHistoryRepository orderStatusHistoryRepository;

    public Iterable<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Iterable<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    @SuppressWarnings("null")
    public Order getOrderById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    public List<OrderStatusHistory> getOrderHistory(Long orderId) {
        return orderStatusHistoryRepository.findByOrderIdOrderByUpdatedAtAsc(orderId);
    }

    @SuppressWarnings("null")
    public Order saveOrder(Order order) {
        boolean isNew = order.getId() == null;
        Order savedOrder = orderRepository.save(order);
        
        // Record History
        String historyMessage = isNew ? "Order placed successfully!" : "Order status updated to " + order.getStatus();
        orderStatusHistoryRepository.save(new OrderStatusHistory(savedOrder.getId(), savedOrder.getStatus(), historyMessage));

        if (isNew && savedOrder.getCustomerEmail() != null) {
            emailService.sendOrderConfirmationEmail(savedOrder.getCustomerEmail(), savedOrder.getId());
        }
        return savedOrder;
    }
}
