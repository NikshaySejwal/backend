package com.example.woodyzbackend.repository;

import com.example.woodyzbackend.entity.OrderStatusHistory;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderStatusHistoryRepository extends CrudRepository<OrderStatusHistory, Long> {
    List<OrderStatusHistory> findByOrderIdOrderByUpdatedAtAsc(Long orderId);
}
