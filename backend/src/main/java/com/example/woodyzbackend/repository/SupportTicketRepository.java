package com.example.woodyzbackend.repository;

import com.example.woodyzbackend.entity.SupportTicket;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupportTicketRepository extends CrudRepository<SupportTicket, Long> {
    java.util.List<SupportTicket> findByUserId(Long userId);
}
