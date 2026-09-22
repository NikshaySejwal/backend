package com.example.woodyzbackend.service;

import com.example.woodyzbackend.entity.SupportTicket;
import com.example.woodyzbackend.repository.SupportTicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SupportTicketService {
    @Autowired
    private SupportTicketRepository supportTicketRepository;

    public Iterable<SupportTicket> getAllTickets() {
        return supportTicketRepository.findAll();
    }

    public java.util.List<SupportTicket> getTicketsByUserId(Long userId) {
        return supportTicketRepository.findByUserId(userId);
    }

    @SuppressWarnings("null")
    public SupportTicket getTicketById(Long id) {
        return supportTicketRepository.findById(id).orElse(null);
    }

    @SuppressWarnings("null")
    public SupportTicket saveTicket(SupportTicket ticket) {
        return supportTicketRepository.save(ticket);
    }
}
