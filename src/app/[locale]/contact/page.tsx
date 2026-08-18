import { getTranslations, setRequestLocale } from 'next-intl/server';
import { house } from '@/content/house';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');

  return (
    <section className="mx-auto max-w-[760px] px-6 py-16 md:py-24">
      <p className="font-script text-3xl text-tomato">dorval</p>
      <h1 className="mt-2 text-5xl text-ink md:text-6xl">{t('title')}</h1>
      <address className="mt-10 not-italic text-lg leading-relaxed text-ink">
        {house.addressLines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
        <span className="block">{house.postal}</span>
        <a href={house.phoneHref} className="mt-4 block text-tomato">
          {house.phone}
        </a>
        <a href={`mailto:${house.email}`} className="mt-1 block text-tomato">
          {house.email}
        </a>
      </address>
      <h2 className="mt-12 text-3xl text-olive">{t('hoursTitle')}</h2>
      <p className="mt-4 text-lg text-ink">{t('hours')}</p>
      <p className="mt-3 text-sm text-muted">{t('hoursNote')}</p>
      <div className="mt-10 flex flex-wrap gap-6">
        <a href={house.mapUrl} className="text-tomato">
          {t('map')}
        </a>
        <a href={house.orderUrl} className="text-ink">
          {t('order')}
        </a>
        <a href={house.instagram} className="text-ink">
          Instagram
        </a>
        <a href={house.facebook} className="text-ink">
          Facebook
        </a>
      </div>
    </section>
  );
}
