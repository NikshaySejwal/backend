package com.example.woodyzbackend.service;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final SendGrid sendGrid;

    @Autowired
    public EmailService(SendGrid sendGrid) {
        this.sendGrid = sendGrid;
    }

    public void sendOrderConfirmationEmail(String toEmail, Long orderId) {
        Email from = new Email("noreply@woodyz.com");
        Email to = new Email(toEmail);
        String subject = "Order Confirmation - Woodyz Eco-Toys";
        Content content = new Content("text/plain", 
            "Thank you for your order! Your order ID is: #" + orderId + 
            "\n\nWe are currently preparing your handcrafted treasures for shipment." +
            "\n\nHappy Playing,\nThe Woodyz Team");

        Mail mail = new Mail(from, subject, to, content);

        Request request = new Request();
        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            Response response = sendGrid.api(request);
            System.out.println("Email sent status: " + response.getStatusCode());
        } catch (Exception ex) {
            System.err.println("Error sending email: " + ex.getMessage());
        }
    }
}
