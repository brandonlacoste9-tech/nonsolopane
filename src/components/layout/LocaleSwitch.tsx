'use client';

import { useLocale } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import { Link } from '@/i18n/navigation';

const locales = [
  { id: 'en', label: 'EN' },
  { id: 'fr', label: 'FR' },
] as const;

export function LocaleSwitch() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav aria-label="Language" className="flex items-center gap-3">
      {locales.map((item) => (
        <Link
          key={item.id}
          href={pathname}
          locale={item.id}
          className={
            item.id === locale
              ? 'text-sm tracking-wide text-tomato'
              : 'text-sm tracking-wide text-ink hover:text-tomato'
          }
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
