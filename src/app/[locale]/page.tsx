import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { HouseName } from '@/components/brand/HouseName';
import { Link } from '@/i18n/navigation';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');

  return (
    <>
      <section className="relative isolate min-h-[min(88vh,52rem)] overflow-hidden">
        <Image
          src="/hero-pizza.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_62%]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-paper/88 via-paper/55 to-paper/10"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto max-w-[1080px] px-6 py-20 md:py-28">
          <p className="text-sm tracking-[0.22em] text-tomato uppercase">{t('kicker')}</p>
          <h1 className="mt-5 max-w-3xl text-6xl leading-[0.95] md:text-8xl">
            <HouseName hero />
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">{t('lead')}</p>
          <div className="mt-10 flex flex-wrap gap-6">
            <Link href="/menu" className="text-tomato">
              {t('ctaMenu')}
            </Link>
            <Link href="/catering" className="text-ink">
              {t('ctaCatering')}
            </Link>
            <Link href="/contact" className="text-ink">
              {t('ctaVisit')}
            </Link>
          </div>
        </div>
      </section>
      <p className="border-y border-line bg-paper/70 py-4 text-center text-sm tracking-[0.2em] text-olive uppercase">
        {t('strip')}
      </p>
      <section className="mx-auto grid max-w-[1080px] gap-8 px-6 py-16 md:grid-cols-2">
        <div className="relative min-h-[18rem] overflow-hidden">
          <Image src="/oven.jpg" alt="" fill className="object-cover" sizes="50vw" />
        </div>
        <div className="relative min-h-[18rem] overflow-hidden">
          <Image src="/cannoli.jpg" alt="" fill className="object-cover" sizes="50vw" />
        </div>
      </section>
      <section className="border-t border-line">
        <div className="mx-auto grid max-w-[1080px] items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-20">
          <div>
            <p className="font-script text-3xl text-tomato">il catering</p>
            <h2 className="mt-2 text-4xl text-ink md:text-5xl">{t('cateringTitle')}</h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">{t('cateringLead')}</p>
            <Link href="/catering" className="mt-8 inline-block text-tomato">
              {t('ctaCatering')}
            </Link>
          </div>
          <div className="relative min-h-[18rem] overflow-hidden">
            <Image src="/banner-src.jpg" alt="" fill className="object-cover" sizes="50vw" />
          </div>
        </div>
      </section>
    </>
  );
}
