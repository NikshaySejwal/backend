package com.example.woodyzbackend.repository;

import com.example.woodyzbackend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Iterable<Order> findByUserId(Long userId);
}
