import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white border-t-4 border-charcoal pt-24 pb-12 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Column */}
          <div className="space-y-8">
            <Link href="/" id="footer-logo" className="flex items-center gap-3 no-underline">
              <div className="w-12 h-12 bg-cedar border-2 border-charcoal rounded-2xl flex items-center justify-center shadow-[4px_4px_0px_0px_#3A322B]">
                <iconify-icon icon="ph:horse-bold" class="text-white text-3xl"></iconify-icon>
              </div>
              <span className="font-display text-4xl font-black tracking-tighter text-charcoal">Woodyz</span>
            </Link>
            <p className="text-charcoal/60 font-bold leading-relaxed">
              Crafting Childhood Smiles, Decorating Modern Homes. Sustainable toys for happy little explorers everywhere.
            </p>
            <div className="flex gap-4">
              <a href="#" id="footer-social-ig" className="w-12 h-12 bg-cream border-2 border-charcoal rounded-2xl flex items-center justify-center btn-pop">
                <iconify-icon icon="ph:instagram-logo-bold" class="text-xl"></iconify-icon>
              </a>
              <a href="#" id="footer-social-pi" className="w-12 h-12 bg-cream border-2 border-charcoal rounded-2xl flex items-center justify-center btn-pop">
                <iconify-icon icon="ph:pinterest-logo-bold" class="text-xl"></iconify-icon>
              </a>
              <a href="#" id="footer-social-fb" className="w-12 h-12 bg-cream border-2 border-charcoal rounded-2xl flex items-center justify-center btn-pop">
                <iconify-icon icon="ph:facebook-logo-bold" class="text-xl"></iconify-icon>
              </a>
            </div>
          </div>

          {/* Shop Collection */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-10 text-cedar">Shop Collection</h4>
            <ul className="space-y-4 font-black text-sm uppercase tracking-widest list-none p-0">
              <li><Link href="/products" id="foot-shop-1" className="hover:text-cedar text-charcoal no-underline">Building Sets</Link></li>
              <li><Link href="/products" id="foot-shop-2" className="hover:text-cedar text-charcoal no-underline">Learning Puzzles</Link></li>
              <li><Link href="/products" id="foot-shop-3" className="hover:text-cedar text-charcoal no-underline">Musical Toys</Link></li>
              <li><Link href="/products" id="foot-shop-4" className="hover:text-cedar text-charcoal no-underline">Nursery Decor</Link></li>
              <li><Link href="#" id="foot-shop-5" className="hover:text-cedar text-charcoal no-underline">Gift Card</Link></li>
            </ul>
          </div>

          {/* Our Story */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-10 text-cedar">Our Story</h4>
            <ul className="space-y-4 font-black text-sm uppercase tracking-widest list-none p-0">
              <li><Link href="#" id="foot-story-1" className="hover:text-cedar text-charcoal no-underline">Sustainability</Link></li>
              <li><Link href="#" id="foot-story-2" className="hover:text-cedar text-charcoal no-underline">Craftsmanship</Link></li>
              <li><Link href="#" id="foot-story-3" className="hover:text-cedar text-charcoal no-underline">Safety Reports</Link></li>
              <li><Link href="#" id="foot-story-4" className="hover:text-cedar text-charcoal no-underline">The Journal</Link></li>
              <li><Link href="#" id="foot-story-5" className="hover:text-cedar text-charcoal no-underline">Stockists</Link></li>
            </ul>
          </div>

          {/* Studio Info */}
          <div className="bg-cream border-4 border-charcoal rounded-[40px] p-8">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-6 text-cedar">Visit our Studio</h4>
            <p className="font-black text-sm mb-4">123 Woodhaven Way<br />Portland, OR 97201</p>
            <p className="font-black text-sm text-sage">hello@woodyztoys.com</p>
            <div className="mt-8 flex gap-2 items-center">
              <iconify-icon icon="ph:clock-bold" class="text-xl"></iconify-icon>
              <span className="text-[10px] font-black uppercase tracking-wider">M-F: 9am - 5pm</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t-2 border-charcoal/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 italic">&copy; 2024 Woodyz Toy Company. Handcrafted Memories.</p>
          <div className="flex gap-10 text-[10px] font-black uppercase tracking-widest opacity-40">
            <a href="#" id="foot-legal-1" className="hover:opacity-100 transition-opacity text-charcoal no-underline">Privacy Policy</a>
            <a href="#" id="foot-legal-2" className="hover:opacity-100 transition-opacity text-charcoal no-underline">Terms of Service</a>
            <a href="#" id="foot-legal-3" className="hover:opacity-100 transition-opacity text-charcoal no-underline">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
