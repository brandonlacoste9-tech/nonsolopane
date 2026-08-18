import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { house } from '@/content/house';

export async function SiteFooter() {
  const t = await getTranslations('footer');
  const nav = await getTranslations('nav');

  return (
    <footer className="mt-auto border-t border-line bg-olive text-[oklch(0.93_0.02_88)]">
      <div className="italia-stripe w-full" aria-hidden="true" />
      <div className="mx-auto grid max-w-[1080px] gap-8 px-6 py-14 md:grid-cols-2">
        <div>
          <p className="font-heading text-3xl">Non Solo Pane</p>
          <p className="mt-2 font-script text-2xl text-brass">dal 2002</p>
          <p className="mt-4 text-sm text-[oklch(0.82_0.03_88)]">{t('line')}</p>
        </div>
        <address className="not-italic text-sm leading-relaxed">
          {house.addressLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          <span className="block">{house.postal}</span>
          <a href={house.phoneHref} className="mt-3 block text-brass">
            {house.phone}
          </a>
          <a href={`mailto:${house.email}`} className="mt-1 block text-brass">
            {house.email}
          </a>
          <Link href="/catering" className="mt-4 mr-4 inline-block text-brass">
            {nav('catering')}
          </Link>
          <a href={house.instagram} className="mt-4 mr-4 inline-block text-brass">
            Instagram
          </a>
          <a href={house.facebook} className="mt-4 inline-block text-brass">
            Facebook
          </a>
        </address>
      </div>
    </footer>
  );
}
