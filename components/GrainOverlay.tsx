export default function GrainOverlay() {
  return (
    <svg
      className="fixed inset-0 w-full h-full pointer-events-none z-[100]"
      aria-hidden="true"
    >
      <filter id="grainFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grainFilter)" opacity="0.04" />
    </svg>
  );
}
