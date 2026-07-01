export type IntakeOption = {
  value: string;
  label: string;
  description?: string;
};

export const COMPANY_BUSINESS_CATEGORIES: IntakeOption[] = [
  { value: 'beauty_skincare', label: 'Beauty / skincare' },
  { value: 'fashion_apparel', label: 'Fashion / apparel' },
  { value: 'wellness_fitness', label: 'Wellness / fitness' },
  { value: 'health_clinics', label: 'Health / clinics' },
  { value: 'education_coaching', label: 'Education / coaching' },
  { value: 'real_estate_interiors', label: 'Real estate / interiors' },
  { value: 'food_beverage', label: 'Food / beverage' },
  { value: 'tech_saas', label: 'Tech / app / SaaS' },
  { value: 'jewellery_luxury', label: 'Jewellery / luxury' },
  { value: 'local_service', label: 'Local service business' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'personal_brand', label: 'Personal brand' },
  { value: 'event_experience', label: 'Event / experience' },
  { value: 'other', label: 'Other' }
];

export const COMPANY_GOALS: IntakeOption[] = [
  { value: 'content_volume', label: 'Get more content' },
  { value: 'trust', label: 'Build buyer trust' },
  { value: 'leads', label: 'Get more leads' },
  { value: 'sales', label: 'Get more sales' },
  { value: 'awareness', label: 'Build brand awareness' },
  { value: 'product_launch', label: 'Launch a product' },
  { value: 'promote_offer', label: 'Promote an offer' },
  { value: 'social_proof', label: 'Build social proof' },
  { value: 'ugc', label: 'Get UGC content' },
  { value: 'instagram_campaign', label: 'Run Instagram campaigns' },
  { value: 'youtube_campaign', label: 'Run YouTube campaigns' },
  { value: 'livestream', label: 'Run livestream selling' },
  { value: 'social_growth', label: 'Improve social media presence' },
  { value: 'ads', label: 'Create ad creatives' },
  { value: 'creator_campaign', label: 'Build a creator campaign' },
  { value: 'monetization', label: 'Monetize content or audience' },
  { value: 'content_engine', label: 'Build a recurring content engine' },
  { value: 'follow_up_system', label: 'Build a follow-up system' },
  { value: 'full_package', label: 'Build a full campaign package' },
  { value: 'not_sure', label: 'Not sure - recommend the best path' }
];

export const COMPANY_PLATFORMS: IntakeOption[] = [
  { value: 'instagram', label: 'Instagram' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'youtube_live', label: 'YouTube Live' },
  { value: 'instagram_live', label: 'Instagram Live' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'website', label: 'Website / landing page' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'marketplace', label: 'Amazon / marketplace' },
  { value: 'ecommerce', label: 'Shopify / e-commerce' },
  { value: 'offline_online', label: 'Offline + online campaign' },
  { value: 'all_platforms', label: 'All major platforms' },
  { value: 'not_sure', label: 'Not sure - suggest the best path' }
];

export const MONETIZATION_TARGETS: IntakeOption[] = [
  { value: 'products', label: 'Products' },
  { value: 'services', label: 'Services' },
  { value: 'course_coaching', label: 'Course / coaching' },
  { value: 'personal_brand', label: 'Personal brand' },
  { value: 'community', label: 'Community' },
  { value: 'livestream_audience', label: 'Livestream audience' },
  { value: 'youtube_audience', label: 'YouTube audience' },
  { value: 'instagram_audience', label: 'Instagram audience' },
  { value: 'ecommerce_store', label: 'E-commerce store' },
  { value: 'local_leads', label: 'Local business leads' },
  { value: 'app_software', label: 'App / software' },
  { value: 'event_workshop', label: 'Event / workshop' },
  { value: 'not_sure', label: 'I am not sure yet' }
];

export const COMPANY_SERVICE_GROUPS: Array<{ title: string; options: IntakeOption[] }> = [
  {
    title: 'Content creation',
    options: [
      { value: 'ugc_videos', label: 'UGC videos' },
      { value: 'instagram_reels', label: 'Instagram Reels' },
      { value: 'youtube_shorts', label: 'YouTube Shorts' },
      { value: 'product_demo_videos', label: 'Product demo videos' },
      { value: 'testimonial_videos', label: 'Testimonial-style videos' },
      { value: 'founder_content', label: 'Founder / personal brand content' },
      { value: 'ad_creatives', label: 'Ad creatives' },
      { value: 'editing', label: 'Editing only' },
      { value: 'content_calendar', label: 'Content calendar' }
    ]
  },
  {
    title: 'Livestream and live selling',
    options: [
      { value: 'instagram_live', label: 'Instagram Live' },
      { value: 'youtube_live', label: 'YouTube Live' },
      { value: 'product_demo_live', label: 'Product demo live' },
      { value: 'live_shopping', label: 'Live shopping' },
      { value: 'launch_live', label: 'Launch live' },
      { value: 'founder_qa', label: 'Founder Q&A' },
      { value: 'webinar_live', label: 'Webinar-style live' },
      { value: 'live_host', label: 'Host / anchor for live' }
    ]
  },
  {
    title: 'Campaign management',
    options: [
      { value: 'creator_shortlisting', label: 'Creator shortlisting' },
      { value: 'scriptwriting', label: 'Script / hook writing' },
      { value: 'creator_coordination', label: 'Creator coordination' },
      { value: 'campaign_strategy', label: 'Campaign strategy' },
      { value: 'usage_rights_management', label: 'Usage rights management' },
      { value: 'paid_ads_planning', label: 'Paid ad creative planning' },
      { value: 'reporting', label: 'Reporting' },
      { value: 'full_execution', label: 'Full campaign execution' }
    ]
  },
  {
    title: 'Social growth and monetization',
    options: [
      { value: 'instagram_growth', label: 'Instagram growth system' },
      { value: 'youtube_growth', label: 'YouTube growth system' },
      { value: 'lead_funnel', label: 'Lead funnel' },
      { value: 'whatsapp_follow_up', label: 'WhatsApp follow-up system' },
      { value: 'landing_page', label: 'Landing page / campaign page' },
      { value: 'monetization_strategy', label: 'Monetization strategy' },
      { value: 'social_management', label: 'Social media management' }
    ]
  }
];

export const COMPANY_TALENT_NEEDS: IntakeOption[] = [
  { value: 'female_creator', label: 'Female creator' },
  { value: 'male_creator', label: 'Male creator' },
  { value: 'live_host', label: 'Livestream host' },
  { value: 'presenter', label: 'Product demo presenter' },
  { value: 'ugc_creator', label: 'UGC creator' },
  { value: 'model', label: 'Model' },
  { value: 'anchor', label: 'Anchor / presenter' },
  { value: 'voiceover', label: 'Voiceover artist' },
  { value: 'video_editor', label: 'Video editor' },
  { value: 'scriptwriter', label: 'Scriptwriter' },
  { value: 'photographer', label: 'Photographer' },
  { value: 'videographer', label: 'Videographer' },
  { value: 'social_manager', label: 'Social media manager' },
  { value: 'campaign_manager', label: 'Campaign manager' },
  { value: 'not_sure', label: 'Not sure - recommend a talent mix' }
];

export const BUDGET_RANGES: IntakeOption[] = [
  { value: 'under_25000', label: 'Under Rs 25,000' },
  { value: '25000_50000', label: 'Rs 25,000-Rs 50,000' },
  { value: '50000_100000', label: 'Rs 50,000-Rs 1,00,000' },
  { value: '100000_250000', label: 'Rs 1,00,000-Rs 2,50,000' },
  { value: '250000_500000', label: 'Rs 2,50,000-Rs 5,00,000' },
  { value: '500000_plus', label: 'Rs 5,00,000+' },
  { value: 'not_sure', label: 'Not sure yet' }
];

export const TIMELINES: IntakeOption[] = [
  { value: 'immediately', label: 'Immediately' },
  { value: 'this_week', label: 'This week' },
  { value: 'this_month', label: 'This month' },
  { value: 'next_month', label: 'Next month' },
  { value: 'planning', label: 'Planning stage only' }
];

export const USAGE_RIGHTS: IntakeOption[] = [
  { value: 'organic_only', label: 'Organic posting only' },
  { value: 'paid_ads', label: 'Paid ads usage' },
  { value: 'whitelisting', label: 'Whitelisting / creator handle usage' },
  { value: 'long_term', label: 'Long-term usage' },
  { value: 'not_sure', label: 'Not sure - explain the options' }
];

export const CREATOR_ROLES: IntakeOption[] = [
  { value: 'ugc_creator', label: 'UGC Creator' },
  { value: 'model', label: 'Model / Campaign Talent' },
  { value: 'live_host', label: 'Livestream Host' },
  { value: 'presenter', label: 'Presenter / Anchor' },
  { value: 'influencer', label: 'Influencer / Social Creator' },
  { value: 'video_editor', label: 'Video Editor' },
  { value: 'scriptwriter', label: 'Scriptwriter / Hook Writer' },
  { value: 'photographer', label: 'Photographer' },
  { value: 'videographer', label: 'Videographer' },
  { value: 'social_manager', label: 'Social Media Manager' },
  { value: 'voiceover', label: 'Voiceover Artist' },
  { value: 'makeup_stylist', label: 'Makeup / Styling Artist' },
  { value: 'campaign_coordinator', label: 'Campaign Coordinator' },
  { value: 'graphic_designer', label: 'Graphic Designer' },
  { value: 'motion_designer', label: 'Motion Designer' },
  { value: 'other', label: 'Other creative role' }
];

export const CREATOR_FORMATS: IntakeOption[] = [
  { value: 'instagram_reels', label: 'Instagram Reels' },
  { value: 'instagram_stories', label: 'Instagram Stories' },
  { value: 'instagram_live', label: 'Instagram Live' },
  { value: 'youtube_shorts', label: 'YouTube Shorts' },
  { value: 'youtube_live', label: 'YouTube Live' },
  { value: 'youtube_video', label: 'YouTube videos' },
  { value: 'ugc_video', label: 'UGC videos' },
  { value: 'product_demo', label: 'Product demos' },
  { value: 'brand_shoot', label: 'Brand shoots' },
  { value: 'live_shopping', label: 'Live shopping' },
  { value: 'webinar', label: 'Webinars' },
  { value: 'event', label: 'Events' },
  { value: 'editing_only', label: 'Editing only' },
  { value: 'writing_only', label: 'Writing only' },
  { value: 'behind_scenes', label: 'Behind-the-scenes roles' }
];

export const CREATOR_CATEGORIES: IntakeOption[] = [
  { value: 'beauty', label: 'Beauty' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'wellness', label: 'Wellness' },
  { value: 'fitness', label: 'Fitness' },
  { value: 'education', label: 'Education' },
  { value: 'tech', label: 'Tech' },
  { value: 'apps', label: 'Apps' },
  { value: 'food', label: 'Food' },
  { value: 'jewellery', label: 'Jewellery' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'real_estate', label: 'Real estate / interiors' },
  { value: 'local_business', label: 'Local businesses' },
  { value: 'open_to_suitable_work', label: 'Not sure / open to suitable work' },
  { value: 'other', label: 'Other' }
];

export const CREATOR_AVAILABILITY: IntakeOption[] = [
  { value: 'remote', label: 'Available for remote work' },
  { value: 'studio', label: 'Available for studio / on-location work' },
  { value: 'travel', label: 'Can travel if required' },
  { value: 'weekday', label: 'Usually available on weekdays' },
  { value: 'weekend', label: 'Usually available on weekends' },
  { value: 'evening', label: 'Usually available in evenings' },
  { value: 'urgent_available', label: 'Available for urgent work when suitable' }
];

export const CREATOR_EXPERIENCE: IntakeOption[] = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'some_experience', label: 'Some experience' },
  { value: 'experienced', label: 'Experienced' },
  { value: 'professional', label: 'Professional' }
];

export const flatCompanyServices = COMPANY_SERVICE_GROUPS.flatMap((group) => group.options);

export const labelsFor = (values: string[], options: IntakeOption[]) => values
  .map((value) => options.find((option) => option.value === value)?.label ?? value.replaceAll('_', ' '));

export type CompanyBriefRoutingInput = {
  goals: string[];
  platforms: string[];
  services: string[];
  talentNeeds: string[];
  budgetRange: string;
};

export const recommendCompanyPackage = ({ goals, platforms, services, talentNeeds, budgetRange }: CompanyBriefRoutingInput) => {
  const hasLive = goals.includes('livestream') || platforms.includes('youtube_live') || platforms.includes('instagram_live') || services.some((service) => ['instagram_live', 'youtube_live', 'product_demo_live', 'live_shopping', 'launch_live', 'live_host'].includes(service));
  const hasRecurringScope = goals.includes('content_engine') || goals.includes('full_package') || services.includes('content_calendar') || services.includes('social_management') || platforms.includes('all_platforms') || ['250000_500000', '500000_plus'].includes(budgetRange);
  const hasLaunchScope = goals.includes('product_launch') || goals.includes('awareness') || goals.includes('creator_campaign') || talentNeeds.filter((talent) => ['female_creator', 'male_creator', 'ugc_creator', 'model', 'presenter'].includes(talent)).length >= 2 || ['50000_100000', '100000_250000'].includes(budgetRange);
  const hasUgcScope = goals.includes('ugc') || services.some((service) => ['ugc_videos', 'instagram_reels', 'youtube_shorts', 'product_demo_videos', 'testimonial_videos'].includes(service)) || talentNeeds.includes('ugc_creator');

  if (platforms.includes('not_sure') || talentNeeds.includes('not_sure') || budgetRange === 'not_sure') return 'Strategy Call / Campaign Diagnosis';
  if (hasRecurringScope) return 'Monthly Creator Marketing Engine';
  if (hasLive) return 'Livestream Sales Sprint';
  if (hasLaunchScope) return 'Creator Launch Campaign';
  if (hasUgcScope || budgetRange === '25000_50000') return 'UGC Starter Pack';
  return 'Strategy Call / Campaign Diagnosis';
};
