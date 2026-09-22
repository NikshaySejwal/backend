import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative px-6 py-12 lg:py-24 overflow-hidden">
      {/* Animated Blobs */}
      <div className="floating-blob w-96 h-96 bg-maple top-0 -left-20"></div>
      <div className="floating-blob w-80 h-80 bg-sage bottom-20 -right-10" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div className="space-y-10 z-10">
          <div className="inline-flex items-center gap-2 bg-white border-2 border-charcoal px-4 py-2 rounded-full sticker-badge">
            <iconify-icon icon="ph:sparkle-fill" class="text-maple text-lg"></iconify-icon>
            <span className="text-[10px] font-black uppercase tracking-wider">New: Forest Friends Collection</span>
          </div>

          <h1 className="font-display text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter text-3d">
            Crafting Smiles, <br />
            <span className="text-cedar">Decorating Homes.</span>
          </h1>

          <p className="text-xl md:text-2xl font-medium text-charcoal/80 max-w-lg leading-relaxed">
            Playful wooden treasures designed for{' '}
            <span className="text-sage border-b-4 border-sage/30">happy little explorers</span>.
            Timeless, sustainable, and handcrafted to last generations.
          </p>

          <div className="flex flex-wrap gap-6 pt-4">
            <Link
              href="/products"
              id="hero-shop-cta"
              className="btn-pop bg-maple text-charcoal border-2 border-charcoal px-10 py-5 rounded-3xl font-black text-xl flex items-center gap-3 no-underline"
            >
              Explore Shop
              <iconify-icon icon="ph:arrow-right-bold"></iconify-icon>
            </Link>
            <Link
              href="#impact"
              id="hero-impact-cta"
              className="btn-pop bg-white text-charcoal border-2 border-charcoal px-10 py-5 rounded-3xl font-black text-xl no-underline"
            >
              Our Impact
            </Link>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-6 pt-6">
            <div className="flex -space-x-3">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" className="w-12 h-12 rounded-full border-2 border-charcoal shadow-md bg-white" alt="User" />
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aria" className="w-12 h-12 rounded-full border-2 border-charcoal shadow-md bg-white" alt="User" />
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Milo" className="w-12 h-12 rounded-full border-2 border-charcoal shadow-md bg-white" alt="User" />
              <div className="w-12 h-12 rounded-full bg-sage border-2 border-charcoal shadow-md flex items-center justify-center text-white text-[10px] font-black">+5k</div>
            </div>
            <p className="text-sm font-bold opacity-70">
              Loved by <span className="text-charcoal">12,000+ Happy Moms</span> worldwide
            </p>
          </div>
        </div>

        {/* Right: Hero Image */}
        <div className="relative flex justify-center">
          <div className="absolute -inset-4 bg-sage rounded-[60px] border-4 border-charcoal rotate-3 -z-10 shadow-[12px_12px_0px_0px_#3A322B]"></div>
          <div className="relative bg-white rounded-[48px] border-4 border-charcoal p-2 overflow-hidden w-full max-w-lg shadow-2xl group">
            <img
              src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800"
              alt="Happy family playing with wooden toys"
              className="w-full h-full object-cover rounded-[40px] group-hover:scale-105 transition-transform duration-700"
            />

            {/* Floating Trust Badge */}
            <div className="absolute -bottom-6 -right-6 p-6 bg-orange border-4 border-charcoal rounded-[32px] sticker-badge z-20 shadow-xl">
              <div className="flex flex-col items-center gap-1 text-white">
                <iconify-icon icon="ph:medal-fill" class="text-4xl"></iconify-icon>
                <span className="text-[10px] font-black uppercase tracking-tighter">Mom&apos;s Choice 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
