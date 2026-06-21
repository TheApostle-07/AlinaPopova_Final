import Image from 'next/image';

export const LogoWordmark = () => (
  <span className="flex items-center gap-3">
    <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-xl border border-black/[0.06] bg-[#282527] sm:h-10 sm:w-10">
      <Image src="/AP_Logo_2.png" alt="Alina Popova Studio logo" fill sizes="40px" className="object-cover" priority />
    </span>
    <span className="min-w-0 leading-tight">
      <span className="block whitespace-nowrap text-[15px] font-semibold text-espresso sm:text-base">Alina Popova Studio</span>
      <span className="hidden whitespace-nowrap text-xs font-medium text-cocoa sm:block">Creator Marketing Studio</span>
    </span>
  </span>
);
