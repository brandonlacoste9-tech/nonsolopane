import { getTranslations, setRequestLocale } from 'next-intl/server';
import { menu } from '@/content/house';
import type { Locale } from '@/i18n/routing';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function MenuPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('menu');
  const lang = locale as Locale;

  return (
    <div className="relative isolate min-h-full overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/wash-bread.jpg)' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-paper/42"
        aria-hidden="true"
      />
      <section className="relative mx-auto max-w-[760px] px-6 py-16 md:py-24">
        <p className="font-script text-3xl text-tomato">il menu</p>
        <h1 className="mt-2 text-5xl text-ink md:text-6xl">{t('title')}</h1>
        <p className="mt-6 max-w-xl text-lg text-muted">{t('lead')}</p>
        <div className="mt-14">
          {menu.map((section) => (
            <article key={section.id} className="mt-12 first:mt-0">
              <h2 className="text-3xl text-olive">{t(section.id)}</h2>
              <ul className="mt-5 divide-y divide-line">
                {section.items.map((item) => (
                  <li
                    key={item.name.en}
                    className="flex items-baseline justify-between gap-6 py-3"
                  >
                    <span>
                      <span className="block font-heading text-xl text-ink">
                        {item.name[lang]}
                      </span>
                      {'note' in item && item.note ? (
                        <span className="mt-1 block text-sm text-muted">{item.note[lang]}</span>
                      ) : null}
                    </span>
                    <span className="shrink-0 text-sm text-tomato">
                      {'price' in item && item.price ? item.price : t('ask')}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
