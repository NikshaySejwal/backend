import { useEffect, useState } from 'react';

const CONSENT_KEY = 'woodyz-cookie-consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(CONSENT_KEY)) setVisible(true);
  }, []);

  const choose = (value) => {
    localStorage.setItem(CONSENT_KEY, value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside className="fixed bottom-4 left-4 right-4 z-[110] mx-auto max-w-3xl bg-white border-4 border-charcoal rounded-3xl p-5 shadow-[8px_8px_0px_0px_#3A322B]" aria-label="Cookie preferences">
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:justify-between">
        <p className="text-sm font-bold text-charcoal/75">WOODYZ uses essential browser storage for shopping and account features. Optional analytics is not loaded unless configured and accepted.</p>
        <div className="flex shrink-0 gap-3">
          <button type="button" onClick={() => choose('rejected')} className="px-4 py-3 rounded-xl border-2 border-charcoal font-black text-xs uppercase tracking-widest">Reject optional</button>
          <button type="button" onClick={() => choose('accepted')} className="px-4 py-3 rounded-xl bg-cedar text-white border-2 border-charcoal font-black text-xs uppercase tracking-widest">Accept optional</button>
        </div>
      </div>
    </aside>
  );
}
