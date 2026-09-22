package com.example.woodyzbackend.controller;

import com.example.woodyzbackend.entity.SupportTicket;
import com.example.woodyzbackend.entity.User;
import com.example.woodyzbackend.service.SupportTicketService;
import com.example.woodyzbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/support")
public class SupportTicketController {
    @Autowired
    private SupportTicketService supportTicketService;

    @Autowired
    private UserService userService;

    @GetMapping
    public Iterable<SupportTicket> getAllTickets() {
        return supportTicketService.getAllTickets();
    }

    @GetMapping("/user")
    public ResponseEntity<Iterable<SupportTicket>> getTicketsByUser() {
        User currentUser = userService.getCurrentUser();
        if (currentUser == null) return ResponseEntity.status(401).build();
        return ResponseEntity.ok(supportTicketService.getTicketsByUserId(currentUser.getId()));
    }

    @PostMapping("/")
    public ResponseEntity<SupportTicket> createTicket(@RequestBody SupportTicket ticket) {
        User currentUser = userService.getCurrentUser();
        if (currentUser != null) {
            ticket.setUserId(currentUser.getId());
            ticket.setUsername(currentUser.getUsername());
        } else {
            ticket.setUsername("Guest Explorer");
        }
        return ResponseEntity.ok(supportTicketService.saveTicket(ticket));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<SupportTicket> updateStatus(@PathVariable Long id, @RequestBody String status) {
        SupportTicket ticket = supportTicketService.getTicketById(id);
        if (ticket == null) return ResponseEntity.notFound().build();
        ticket.setStatus(status.replace("\"", "")); // Clean quotes if sent as string
        return ResponseEntity.ok(supportTicketService.saveTicket(ticket));
    }
}
