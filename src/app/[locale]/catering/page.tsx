import { getTranslations, setRequestLocale } from 'next-intl/server';
import { house } from '@/content/house';

type Props = {
  params: Promise<{ locale: string }>;
};

const offers = [
  { title: 'pizza', note: 'pizzaNote' },
  { title: 'pasta', note: 'pastaNote' },
  { title: 'panini', note: 'paniniNote' },
  { title: 'bakery', note: 'bakeryNote' },
] as const;

export default async function CateringPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('catering');

  return (
    <section className="mx-auto max-w-[760px] px-6 py-16 md:py-24">
      <p className="font-script text-3xl text-tomato">{t('kicker')}</p>
      <h1 className="mt-2 text-5xl text-ink md:text-6xl">{t('title')}</h1>
      <p className="mt-8 text-xl leading-relaxed text-ink">{t('lead')}</p>
      <p className="mt-6 text-lg leading-relaxed text-muted">{t('body')}</p>
      <h2 className="mt-14 text-3xl text-olive">{t('offersTitle')}</h2>
      <ul className="mt-6 divide-y divide-line">
        {offers.map((offer) => (
          <li key={offer.title} className="py-4">
            <span className="block font-heading text-xl text-ink">{t(offer.title)}</span>
            <span className="mt-1 block text-sm text-muted">{t(offer.note)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-10 text-sm text-muted">{t('note')}</p>
      <div className="mt-10 flex flex-wrap gap-6">
        <a href={house.phoneHref} className="text-tomato">
          {t('ctaCall')}
        </a>
        <a
          href={`mailto:${house.email}?subject=${encodeURIComponent(t('mailSubject'))}`}
          className="text-ink"
        >
          {t('ctaEmail')}
        </a>
      </div>
    </section>
  );
}
