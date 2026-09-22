const features = [
  { icon: 'ph:leaf-bold', iconColor: 'text-sage', title: '100% Sustainable Wood', description: 'Every toy is carved from FSC-certified maple, beech, or oak. For every tree harvested, we plant three more.' },
  { icon: 'ph:shield-check-bold', iconColor: 'text-cedar', title: 'Safety Without Compromise', description: 'Independent lab-tested, BPA-free, lead-free, and finished with food-grade oils. Safe for those teething moments.' },
  { icon: 'ph:house-line-bold', iconColor: 'text-orange', title: 'Designed for the Home', description: 'Our toys are as much decor as they are tools for play. Beautiful silhouettes that complement any modern home.' },
];

const reviews = [
  { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', name: 'Sarah J.', title: 'Verified Mom', text: "\"Finally, toys that don't look like an eyesore in my living room! My toddler is obsessed with the building blocks, and I'm obsessed with the safety stats.\"" },
  { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus', name: 'Marcus T.', title: 'Discerning Dad', text: '"The craftsmanship is incredible. These are truly heritage pieces that I know we\'ll be passing down. Also, zero plastic packaging!"' },
];

const TrustSection = () => {
  return (
    <section id="impact" className="py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="absolute -inset-4 bg-maple rounded-[60px] border-4 border-charcoal -rotate-3 -z-10 shadow-[12px_12px_0px_0px_#3A322B]"></div>
            <div className="bg-white border-4 border-charcoal rounded-[48px] p-12 space-y-8">
              {reviews.map((review, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <img src={review.avatar} className="w-16 h-16 rounded-2xl border-2 border-charcoal shadow-lg bg-white shrink-0" alt={review.name} />
                  <div>
                    <p className="text-lg font-bold italic mb-4">{review.text}</p>
                    <p className="font-black text-charcoal">{review.name} <span className="font-medium text-charcoal/50 text-xs ml-2 uppercase">{review.title}</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2 space-y-10">
            <h2 className="font-display text-6xl font-black text-3d leading-[0.9]">Why Parents <br /><span className="text-sage">Choose Woodyz.</span></h2>
            <div className="space-y-6">
              {features.map((f, i) => (
                <div key={i} className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-white border-2 border-charcoal rounded-2xl flex items-center justify-center shrink-0 shadow-[4px_4px_0px_0px_#3A322B]">
                    <iconify-icon icon={f.icon} class={`text-2xl ${f.iconColor}`}></iconify-icon>
                  </div>
                  <div>
                    <h4 className="text-xl font-black mb-1">{f.title}</h4>
                    <p className="text-charcoal/60 font-bold">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
