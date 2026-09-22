import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import axios from 'axios';

export default function CheckoutForm({ totalAmount, onPaymentSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // In a real app, this would be a "Thank You" page
        return_url: window.location.origin + '/checkout/success',
      },
      // For this demo, we'll handle the success manually if possible, 
      // but Stripe usually redirects. 
      // If we want to stay on page, we can use confirmCardPayment instead.
      redirect: 'if_required',
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    } else {
      // Success!
      onPaymentSuccess();
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement className="mb-6" />
      
      {message && (
        <div className="p-4 bg-red-100 border-2 border-red-500 text-red-700 rounded-xl font-bold text-sm">
          {message}
        </div>
      )}

      <button
        disabled={isLoading || !stripe || !elements}
        className={`w-full btn-pop bg-cedar text-white border-4 border-charcoal px-8 py-5 rounded-[24px] font-black text-xl uppercase tracking-widest ${isLoading ? 'opacity-50' : ''}`}
      >
        {isLoading ? 'Processing...' : `Pay $${totalAmount.toFixed(2)}`}
      </button>
    </form>
  );
}
