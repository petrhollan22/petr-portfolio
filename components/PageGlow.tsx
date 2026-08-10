export default function PageGlow() {
  return (
    <div
      className="absolute top-[-20%] right-[-10%] w-[60%] h-[140%] pointer-events-none"
      style={{
        background: 'radial-gradient(circle, rgba(230,57,70,0.08) 0%, transparent 70%)',
      }}
      aria-hidden="true"
    />
  );
}
