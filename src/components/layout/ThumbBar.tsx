import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { house } from '@/content/house';

export async function ThumbBar() {
  const t = await getTranslations('home');

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 md:hidden">
      <div className="flex items-center justify-around px-3 py-3 text-sm">
        <a href={house.phoneHref} className="text-ink">
          {house.phone}
        </a>
        <a href={house.orderUrl} className="text-ink">
          Uber Eats
        </a>
        <Link href="/menu" className="text-tomato">
          {t('ctaMenu')}
        </Link>
      </div>
    </div>
  );
}
