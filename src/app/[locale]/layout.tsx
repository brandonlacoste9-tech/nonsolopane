import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Cormorant_Garamond, Outfit, Italianno } from 'next/font/google';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { AmbiancePlayer } from '@/components/brand/AmbiancePlayer';
import { FlourWash } from '@/components/brand/FlourWash';
import { Mario } from '@/components/brand/Mario';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { ThumbBar } from '@/components/layout/ThumbBar';
import { routing } from '@/i18n/routing';

const heading = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
});

const body = Outfit({
  subsets: ['latin'],
  variable: '--font-body',
});

const script = Italianno({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-script',
});

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: {
      default: t('site'),
      template: `%s · ${t('site')}`,
    },
    description: t('description'),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${heading.variable} ${body.variable} ${script.variable}`}
    >
      <body className="relative flex min-h-dvh flex-col antialiased">
        <NextIntlClientProvider messages={messages}>
          <FlourWash />
          <div className="relative z-10 flex min-h-dvh flex-col">
            <SiteHeader />
            <main id="content" tabIndex={-1} className="flex-1 pb-24 outline-none md:pb-0">
              {children}
            </main>
            <SiteFooter />
            <AmbiancePlayer />
            <Mario />
            <ThumbBar />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
