export function FlourWash() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.16]"
      style={{
        backgroundImage: 'url(/wash-bread.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      aria-hidden="true"
    />
  );
}
