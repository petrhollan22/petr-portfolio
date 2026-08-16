'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Zpět nahoru"
      className="fixed bottom-24 right-5 z-30 w-11 h-11 rounded-full bg-red-600 hover:bg-red-500 text-white shadow-lg flex items-center justify-center transition-all hover:-translate-y-0.5"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
