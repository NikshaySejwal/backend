/**
 * Displays Subtotal / Shipping / Total summary block.
 * Used in both cart.js and checkout.js — extracted to avoid duplication.
 */
export default function OrderSummary({ total, className = '' }) {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex justify-between font-bold">
        <span className="text-charcoal/60">Subtotal</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-bold">
        <span className="text-charcoal/60">Shipping</span>
        <span className="text-sage uppercase text-xs tracking-widest">Free</span>
      </div>
      <div className="pt-4 border-t-2 border-charcoal/5 flex justify-between items-end">
        <span className="font-display text-xl font-black">Total</span>
        <span className="font-display text-3xl font-black text-cedar">
          ${total.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
