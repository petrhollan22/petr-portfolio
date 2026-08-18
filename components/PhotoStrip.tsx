import Reveal from './Reveal';

export default function PhotoStrip() {
  const photos = [
    { src: '/images/hustle/profinit.jpg', alt: 'Profinit AI Talents' },
    { src: '/images/projects/bizsim.jpg', alt: 'BIZ SIM CUP' },
    { src: '/images/sports/chess.jpg', alt: 'Rilton Cup' },
    { src: '/images/hustle/plakat.jpg', alt: 'Ambasador FIS' },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 md:gap-3">
      {photos.map((p, i) => (
        <Reveal key={p.src} delay={i * 80} className="aspect-square overflow-hidden rounded-lg group">
          <img
            src={p.src}
            alt={p.alt}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </Reveal>
      ))}
    </div>
  );
}
