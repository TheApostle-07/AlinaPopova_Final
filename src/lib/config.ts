export const siteConfig = {
  siteName: 'Alina Popova Studio',
  siteTagline: 'Creator Launch Program',
  siteUrl: 'https://alinapopova.com',
  contactEmail: 'support@alinapopova.com',
  whatsappUrl: process.env.NEXT_PUBLIC_WHATSAPP_URL ?? 'https://wa.me/?text=Hello%20Alina%20Popova%20Studio'
};

export type SiteConfig = typeof siteConfig;
