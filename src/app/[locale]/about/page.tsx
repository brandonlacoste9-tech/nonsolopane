import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');

  return (
    <section className="mx-auto max-w-[760px] px-6 py-16 md:py-24">
      <p className="font-script text-3xl text-tomato">la casa</p>
      <h1 className="mt-2 text-5xl text-ink md:text-6xl">{t('title')}</h1>
      <p className="mt-8 text-xl leading-relaxed text-ink">{t('lead')}</p>
      <p className="mt-8 text-lg leading-relaxed text-muted">{t('body')}</p>
      <p className="mt-10 text-sm text-muted">{t('note')}</p>
    </section>
  );
}
