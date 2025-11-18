import Image from 'next/image';

export const LogoWordmark = () => (
  <div className="relative h-10 w-32 sm:h-12 sm:w-40">
    <Image src="/AP_Logo_2.png" alt="Alina Popova Studio" fill className="object-contain" priority />
  </div>
);
