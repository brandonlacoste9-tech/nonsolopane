type Props = {
  className?: string;
  onDark?: boolean;
  hero?: boolean;
};

export function HouseName({ className = '', onDark = false, hero = false }: Props) {
  const soloClass = onDark ? 'text-white' : hero ? 'name-solo name-solo-hero' : 'name-solo';

  return (
    <span className={className} aria-label="Non Solo Pane">
      <span className={onDark ? 'text-[oklch(0.78_0.14_145)]' : 'text-[oklch(0.48_0.15_145)]'}>
        Non
      </span>{' '}
      <span className={soloClass}>Solo</span>{' '}
      <span className={onDark ? 'text-[oklch(0.68_0.17_28)]' : 'text-[oklch(0.5_0.18_28)]'}>
        Pane
      </span>
    </span>
  );
}
