package com.example.woodyzbackend.service;

import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
public class StripeService {

    @Value("${stripe.api.key}")
    private String stripeApiKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeApiKey;
    }

    public String createPaymentIntent(double amount, String currency) throws Exception {
        if (stripeApiKey == null || stripeApiKey.startsWith("sk_test_mock")) {
            return "pi_mock_secret_" + System.currentTimeMillis();
        }
        // Stripe expects amount in cents
        long amountInCents = (long) (amount * 100);

        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(amountInCents)
                .setCurrency(currency)
                .setAutomaticPaymentMethods(
                        PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                .setEnabled(true)
                                .build()
                )
                .build();

        PaymentIntent intent = PaymentIntent.create(params);
        return intent.getClientSecret();
    }

    public boolean isPaid(String paymentIntentId, double expectedAmount) throws Exception {
        PaymentIntent intent = PaymentIntent.retrieve(paymentIntentId);
        long expectedCents = Math.round(expectedAmount * 100);
        return "succeeded".equals(intent.getStatus()) && intent.getAmount() == expectedCents;
    }
}
