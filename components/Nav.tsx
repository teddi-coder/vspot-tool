'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import HedgehogMark from './HedgehogMark';
import SunriseMark from './SunriseMark';

const tabs = [
  { label: 'Ad Creatives', href: '/', active: true },
  { label: 'Campaign Performance', href: '/campaign-performance', active: false },
  { label: 'Email Hub', href: '/email-hub', active: true },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="bg-[#1B1918] text-[#F1F1F1]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between py-5">
          <div className="flex items-center gap-3">
            <SunriseMark />
            <div>
              <div
                className="text-xl font-light tracking-tight"
                style={{ fontFamily: "'Fraunces', Georgia, serif" }}
              >
                The V Spot
              </div>
              <div className="text-[10px] text-[#F1F1F1]/50 font-light tracking-wide mt-0.5">
                Marketing tools — powered by Hedgehog Marketing
              </div>
            </div>
          </div>
          <HedgehogMark />
        </div>

        <nav className="flex gap-1 -mb-px">
          {tabs.map((tab) => {
            const isCurrent = tab.href === '/' ? pathname === '/' : pathname.startsWith(tab.href);
            return (
              <TabItem
                key={tab.href}
                label={tab.label}
                href={tab.href}
                isCurrent={isCurrent}
                isEnabled={tab.active}
              />
            );
          })}
        </nav>
      </div>
    </header>
  );
}

function TabItem({
  label,
  href,
  isCurrent,
  isEnabled,
}: {
  label: string;
  href: string;
  isCurrent: boolean;
  isEnabled: boolean;
}) {
  const base =
    'px-4 py-3 text-sm font-medium rounded-t-md flex items-center gap-2 transition-colors';

  if (!isEnabled) {
    return (
      <span className={`${base} text-[#F1F1F1]/30 cursor-default`}>
        {label}
        <span className="text-[9px] font-medium tracking-wide bg-[#F1F1F1]/10 text-[#7DD3FC] px-1.5 py-0.5 rounded-full">
          SOON
        </span>
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={`${base} ${
        isCurrent
          ? 'bg-[#F1F1F1] text-[#1B1918]'
          : 'text-[#F1F1F1]/70 hover:text-[#F1F1F1] hover:bg-[#F1F1F1]/10'
      }`}
    >
      {label}
    </Link>
  );
}
