import Link from 'next/link';
import StarRating from './ui/StarRating';

const products = [
  {
    id: 1,
    name: 'Wooden Dinosaur Set',
    price: 39,
    badge: 'Bestseller',
    badgeColor: 'bg-orange',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 2,
    name: 'Alphabet Puzzle Board',
    price: 25,
    badge: null,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 3,
    name: 'Farmhouse Activity Kit',
    price: 64,
    badge: null,
    rating: 5,
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 4,
    name: 'Panda Sorting Cube',
    price: 32,
    badge: 'Popular',
    badgeColor: 'bg-sage',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&q=80&w=600',
  },
];

const trustBadges = [
  { icon: 'ph:shield-check-fill', iconColor: 'text-maple', label: '100% Non-Toxic', bg: 'bg-cedar' },
  { icon: 'ph:heart-fill', iconColor: 'text-[#F7D8D8]', label: 'Kid Approved', bg: 'bg-sage' },
  { icon: 'ph:recycle-fill', iconColor: 'text-white', label: 'Zero Plastic', bg: 'bg-orange' },
  { icon: 'ph:hand-heart-fill', iconColor: 'text-maple', label: 'Handcrafted', bg: 'bg-charcoal' },
];



const Bestsellers = () => {
  return (
    <section className="py-24 bg-charcoal text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-20">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="font-display text-6xl font-black tracking-tighter mb-6">Bestsellers &amp; More</h2>
            <p className="text-xl text-white/70 font-medium mb-8">
              Handpicked by experts, loved by little ones. These are the pieces that define the WOODYZ experience.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <Link href="/products" className="px-8 py-3 bg-white text-charcoal rounded-full font-black text-sm uppercase btn-pop no-underline inline-block">
                Shop All Ages
              </Link>
              <button className="px-8 py-3 border-2 border-white/20 hover:border-white rounded-full font-black text-sm uppercase transition-all">
                Mom&apos;s Faves
              </button>
            </div>
          </div>

          {/* Trust Badges Grid */}
          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
            {trustBadges.map((badge, index) => (
              <div key={index} className={`p-6 ${badge.bg} border-2 border-white/20 rounded-[32px] flex flex-col items-center text-center`}>
                <iconify-icon icon={badge.icon} class={`text-4xl ${badge.iconColor} mb-3`}></iconify-icon>
                <span className="text-[10px] font-black uppercase tracking-widest">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group product-card-hover">
              <div className="relative aspect-square bg-cream rounded-[40px] border-4 border-charcoal mb-6 overflow-hidden p-8">
                {product.badge && (
                  <span className={`absolute top-6 left-6 ${product.badgeColor} border-2 border-charcoal px-3 py-1 rounded-full text-[10px] font-black text-white sticker-badge z-10 uppercase tracking-widest`}>
                    {product.badge}
                  </span>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500 mix-blend-multiply"
                />
                <div className="add-btn absolute bottom-6 inset-x-6 opacity-0 translate-y-4 transition-all duration-300">
                  <button className="w-full bg-cedar text-white border-2 border-charcoal py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:bg-cedar/90 transition-colors">
                    Quick Add — ${product.price}
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-black mb-1">{product.name}</h3>
                  <StarRating rating={product.rating} size="text-xs" color="text-maple" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
        <svg className="relative block w-[200%] h-32 text-cream fill-current" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.85,111.45,163.63,115.35,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Bestsellers;
