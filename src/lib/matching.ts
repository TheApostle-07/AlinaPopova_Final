import type { ApplicationRecord, CompanyBriefRecord } from '@/lib/database';

const talentRoleMap: Record<string, string[]> = {
  female_creator: ['ugc_creator', 'model', 'influencer', 'presenter'],
  male_creator: ['ugc_creator', 'model', 'influencer', 'presenter'],
  live_host: ['live_host', 'presenter'],
  presenter: ['presenter', 'live_host'],
  ugc_creator: ['ugc_creator', 'influencer'],
  model: ['model'],
  anchor: ['presenter', 'live_host'],
  voiceover: ['voiceover'],
  video_editor: ['video_editor', 'motion_designer'],
  scriptwriter: ['scriptwriter'],
  photographer: ['photographer'],
  videographer: ['videographer'],
  social_manager: ['social_manager', 'campaign_coordinator'],
  campaign_manager: ['campaign_coordinator', 'social_manager']
};

const platformFormatMap: Record<string, string[]> = {
  instagram: ['instagram_reels', 'instagram_stories', 'instagram_live'],
  youtube: ['youtube_shorts', 'youtube_video', 'youtube_live'],
  youtube_live: ['youtube_live', 'live_shopping', 'product_demo'],
  instagram_live: ['instagram_live', 'live_shopping', 'product_demo'],
  ecommerce: ['ugc_video', 'product_demo', 'live_shopping'],
  marketplace: ['ugc_video', 'product_demo'],
  offline_online: ['event', 'brand_shoot', 'product_demo']
};

const serviceFormatMap: Record<string, string[]> = {
  ugc_videos: ['ugc_video'],
  instagram_reels: ['instagram_reels'],
  youtube_shorts: ['youtube_shorts'],
  product_demo_videos: ['product_demo'],
  testimonial_videos: ['ugc_video'],
  editing: ['editing_only'],
  instagram_live: ['instagram_live'],
  youtube_live: ['youtube_live'],
  product_demo_live: ['product_demo'],
  live_shopping: ['live_shopping'],
  launch_live: ['instagram_live', 'youtube_live', 'event'],
  webinar_live: ['webinar'],
  scriptwriting: ['writing_only'],
  social_management: ['behind_scenes']
};

const categoryMap: Record<string, string[]> = {
  beauty_skincare: ['beauty'],
  fashion_apparel: ['fashion'],
  wellness_fitness: ['wellness', 'fitness'],
  health_clinics: ['wellness'],
  education_coaching: ['education'],
  real_estate_interiors: ['real_estate'],
  food_beverage: ['food'],
  tech_saas: ['tech', 'apps'],
  jewellery_luxury: ['jewellery', 'luxury'],
  local_service: ['local_business'],
  ecommerce: ['beauty', 'fashion', 'food', 'tech'],
  personal_brand: ['education', 'wellness', 'tech']
};

const overlap = (left: string[], right: string[]) => left.filter((value) => right.includes(value));

const requiredRoleTags = (brief: CompanyBriefRecord) => brief.talentNeeds.flatMap((need) => talentRoleMap[need] ?? []);
const requiredFormatTags = (brief: CompanyBriefRecord) => [
  ...brief.platforms.flatMap((platform) => platformFormatMap[platform] ?? []),
  ...brief.services.flatMap((service) => serviceFormatMap[service] ?? [])
];
const requiredCategoryTags = (brief: CompanyBriefRecord) => categoryMap[brief.businessCategory] ?? [];

export type CreatorMatch = {
  creator: ApplicationRecord;
  score: number;
  reasons: string[];
};

export const getCreatorMatches = (brief: CompanyBriefRecord, creators: ApplicationRecord[]): CreatorMatch[] => {
  const expectedRoles = [...new Set(requiredRoleTags(brief))];
  const expectedFormats = [...new Set(requiredFormatTags(brief))];
  const expectedCategories = [...new Set(requiredCategoryTags(brief))];

  return creators
    .filter((creator) => !['rejected', 'rejected_safety', 'not_selected', 'paused'].includes(creator.status))
    .map((creator) => {
      const roleMatches = overlap(creator.roleTags, expectedRoles);
      const formatMatches = overlap(creator.formatTags, expectedFormats);
      const categoryMatches = overlap(creator.categoryTags, expectedCategories);
      const reasons = [
        roleMatches.length > 0 ? `${roleMatches.length} role match${roleMatches.length > 1 ? 'es' : ''}` : '',
        formatMatches.length > 0 ? `${formatMatches.length} format match${formatMatches.length > 1 ? 'es' : ''}` : '',
        categoryMatches.length > 0 ? `${categoryMatches.length} category match${categoryMatches.length > 1 ? 'es' : ''}` : '',
        creator.availabilityTags.includes('remote') ? 'remote-ready' : ''
      ].filter(Boolean);
      const score = roleMatches.length * 5 + formatMatches.length * 3 + categoryMatches.length * 2 + (creator.experienceLevel === 'professional' ? 2 : creator.experienceLevel === 'experienced' ? 1 : 0);
      return { creator, score, reasons };
    })
    .filter((match) => match.score > 0)
    .sort((a, b) => b.score - a.score || new Date(b.creator.submittedAt).getTime() - new Date(a.creator.submittedAt).getTime())
    .slice(0, 8);
};
