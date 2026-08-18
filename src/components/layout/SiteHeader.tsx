import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { LocaleSwitch } from '@/components/layout/LocaleSwitch';

const navItems = [
  { href: '/menu', key: 'menu' },
  { href: '/catering', key: 'catering' },
  { href: '/about', key: 'about' },
  { href: '/contact', key: 'contact' },
] as const;

export async function SiteHeader() {
  const t = await getTranslations('nav');

  return (
    <header className="relative border-b border-line bg-paper/85">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-4 focus:z-50 focus:bg-paper focus:px-3 focus:py-2 focus:text-sm focus:text-tomato"
      >
        {t('skip')}
      </a>
      <div className="italia-stripe w-full" aria-hidden="true" />
      <div className="mx-auto flex max-w-[1080px] flex-wrap items-center justify-between gap-x-8 gap-y-4 px-6 py-5">
        <Link href="/" className="flex shrink-0 items-center gap-3.5">
          <Image
            src="/logo-round.png"
            alt="Non Solo Pane"
            width={176}
            height={176}
            sizes="88px"
            priority
            unoptimized
            className="h-[72px] w-[72px] rounded-full shadow-[0_0_0_1px_rgba(20,16,12,0.08)] md:h-[88px] md:w-[88px]"
          />
          <span className="leading-[1.05]">
            <span className="block font-heading text-[1.65rem] text-ink md:text-[2rem]">
              Non Solo Pane
            </span>
            <span className="font-script text-2xl leading-none text-tomato">dal 2002</span>
          </span>
        </Link>
        <nav aria-label="Primary" className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm tracking-wide text-ink hover:text-tomato"
            >
              {t(item.key)}
            </Link>
          ))}
          <LocaleSwitch />
        </nav>
      </div>
    </header>
  );
}
