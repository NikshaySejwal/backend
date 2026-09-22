import Link from 'next/link';

const AnnouncementBar = () => {
  const items = [
    { icon: 'ph:seal-check-fill', iconColor: 'text-maple', text: 'CE Certified Safety' },
    { icon: 'ph:tree-evergreen-fill', iconColor: 'text-sage', text: 'FSC Sustainable Sourcing' },
    { icon: 'ph:paint-brush-broad-fill', iconColor: 'text-orange', text: 'Non-Toxic Plant-Based Dyes' },
  ];

  // Double the items for infinite scroll effect
  const doubledItems = [...items, ...items];

  return (
    <div className="bg-charcoal text-white py-2 overflow-hidden border-b-2 border-charcoal relative z-50">
      <div className="safety-bar-animation flex gap-16 whitespace-nowrap">
        {doubledItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2 px-4">
            <iconify-icon icon={item.icon} class={item.iconColor}></iconify-icon>
            <span className="text-[10px] font-black tracking-widest uppercase">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementBar;
