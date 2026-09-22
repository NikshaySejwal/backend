import { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Thanks for subscribing with ${email}!`);
      setEmail('');
    }
  };

  return (
    <section id="newsletter" className="px-6 mb-24">
      <div className="max-w-7xl mx-auto bg-cedar border-4 border-charcoal rounded-[64px] p-12 lg:p-24 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-maple rounded-full opacity-10 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-sage rounded-full opacity-10 -translate-x-1/2 translate-y-1/2"></div>
        <div className="relative z-10">
          <h2 className="font-display text-5xl md:text-7xl font-black text-white text-3d mb-6">Join the Playground!</h2>
          <p className="text-xl text-white/80 font-bold mb-10 max-w-2xl mx-auto">Subscribe for play tips, new collections, and get <span className="text-maple">15% OFF</span> your first adventure.</p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="flex-1 px-8 py-5 rounded-[24px] border-4 border-charcoal bg-white font-black text-charcoal focus:outline-none focus:ring-4 focus:ring-maple/50" />
            <button type="submit" className="btn-pop bg-maple text-charcoal border-4 border-charcoal px-10 py-5 rounded-[24px] font-black text-xl uppercase tracking-widest">Subscribe</button>
          </form>
          <p className="text-xs text-white/50 font-bold mt-6 uppercase tracking-[0.2em]">No spam, just pure play.</p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
