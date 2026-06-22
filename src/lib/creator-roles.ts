export type CreatorRoleCategory =
  | 'on-camera'
  | 'live-presenting'
  | 'editing-writing'
  | 'production'
  | 'campaign-support';

export type RoleQuestion = {
  id: string;
  label: string;
  helper?: string;
  type: 'choices' | 'text';
  options?: string[];
  placeholder?: string;
};

export type CreatorRole = {
  value: string;
  title: string;
  category: CreatorRoleCategory;
  description: string;
  tags: string[];
  applicationLabel: string;
  questions: RoleQuestion[];
};

export const CREATOR_ROLE_CATEGORIES: Array<{ value: 'all' | CreatorRoleCategory; label: string }> = [
  { value: 'all', label: 'All roles' },
  { value: 'on-camera', label: 'On-camera' },
  { value: 'live-presenting', label: 'Live and presenting' },
  { value: 'editing-writing', label: 'Editing and writing' },
  { value: 'production', label: 'Production' },
  { value: 'campaign-support', label: 'Campaign support' }
];

export const CREATOR_ROLE_CATALOG: CreatorRole[] = [
  {
    value: 'ugc_creator',
    title: 'UGC Creator',
    category: 'on-camera',
    description: 'Create product-led videos, demos, unboxings, testimonials, and problem-solution content for brands.',
    tags: ['Product videos', 'Reels / Shorts', 'Demo content'],
    applicationLabel: 'Apply as UGC Creator',
    questions: [
      { id: 'formats', label: 'Comfortable formats', type: 'choices', options: ['Product demo', 'Unboxing', 'Testimonial-style video', 'Problem-solution video', 'App walkthrough', 'Lifestyle video'] },
      { id: 'camera', label: 'Can you record and speak on camera?', type: 'choices', options: ['Comfortable with both', 'Can record with guidance', 'Prefer voiceover or hands-only content'] },
      { id: 'sample', label: 'Sample video link', helper: 'Optional. A phone-shot sample is welcome.', type: 'text', placeholder: 'Example: https://drive.google.com/your-sample' }
    ]
  },
  {
    value: 'model',
    title: 'Model / Campaign Talent',
    category: 'on-camera',
    description: 'Join brand shoots, lifestyle campaigns, product visuals, beauty, fashion, jewellery, and campaign content.',
    tags: ['Brand shoots', 'Product modelling', 'Lifestyle visuals'],
    applicationLabel: 'Apply as Model',
    questions: [
      { id: 'campaignTypes', label: 'Comfortable campaign types', type: 'choices', options: ['Fashion', 'Beauty / skincare', 'Jewellery', 'Lifestyle', 'Product holding', 'Catalogue-style shoot'] },
      { id: 'locations', label: 'Comfortable locations', type: 'choices', options: ['Studio', 'Outdoor', 'Brand location', 'Remote / self-shot'] },
      { id: 'shootExperience', label: 'Previous shoot experience', type: 'text', placeholder: 'Example: New to shoots, beauty catalogue work, or lifestyle campaigns' }
    ]
  },
  {
    value: 'live_host',
    title: 'Livestream Host',
    category: 'live-presenting',
    description: 'Host Instagram Live, YouTube Live, product demos, live shopping sessions, launches, and Q&A formats.',
    tags: ['YouTube Live', 'Instagram Live', 'Product demos'],
    applicationLabel: 'Apply as Live Host',
    questions: [
      { id: 'liveFormats', label: 'Comfortable live formats', type: 'choices', options: ['Instagram Live', 'YouTube Live', 'Live shopping', 'Product demo live', 'Q&A', 'Launch session'] },
      { id: 'liveSkills', label: 'Live hosting confidence', type: 'choices', options: ['Comfortable reading scripts', 'Can explain products', 'Have hosted live before', 'Open to practice sessions'] },
      { id: 'device', label: 'Internet and device setup', type: 'text', placeholder: 'Example: Reliable Wi-Fi, phone with tripod, or laptop setup' }
    ]
  },
  {
    value: 'presenter',
    title: 'Presenter / Anchor',
    category: 'live-presenting',
    description: 'Present products, explain offers, host interviews, deliver announcements, and guide scripted brand videos.',
    tags: ['Explainers', 'Hosting', 'Brand videos'],
    applicationLabel: 'Apply as Presenter',
    questions: [
      { id: 'presenterFormats', label: 'Comfortable formats', type: 'choices', options: ['Product explainers', 'Brand videos', 'Interviews', 'Announcements', 'Event hosting', 'Webinar-style hosting'] },
      { id: 'teleprompter', label: 'Script and teleprompter comfort', type: 'choices', options: ['Comfortable with both', 'Comfortable with scripts', 'Can learn with guidance'] },
      { id: 'sample', label: 'Sample speaking video', type: 'text', placeholder: 'Example: https://youtube.com/your-sample' }
    ]
  },
  {
    value: 'video_editor',
    title: 'Video Editor',
    category: 'editing-writing',
    description: 'Edit Reels, Shorts, UGC, captions, hooks, ad creatives, product videos, and livestream clips.',
    tags: ['Reels editing', 'Captions', 'Clip repurposing'],
    applicationLabel: 'Apply as Video Editor',
    questions: [
      { id: 'editingTypes', label: 'Editing types', type: 'choices', options: ['Reels', 'Shorts', 'UGC edits', 'Captions', 'Ad creatives', 'Livestream clips', 'YouTube videos'] },
      { id: 'software', label: 'Software you use', type: 'choices', options: ['CapCut', 'Premiere Pro', 'Final Cut Pro', 'DaVinci Resolve', 'After Effects', 'Other'] },
      { id: 'turnaround', label: 'Typical turnaround time', type: 'text', placeholder: 'Example: 24-48 hours for a short-form edit' }
    ]
  },
  {
    value: 'scriptwriter',
    title: 'Scriptwriter / Hook Writer',
    category: 'editing-writing',
    description: 'Write hooks, UGC scripts, captions, livestream talking points, product angles, and campaign messages.',
    tags: ['Hooks', 'Scripts', 'Captions'],
    applicationLabel: 'Apply as Writer',
    questions: [
      { id: 'writingTypes', label: 'Writing types', type: 'choices', options: ['UGC scripts', 'Hooks', 'Captions', 'Ad scripts', 'Product demo scripts', 'Livestream talking points', 'YouTube intros'] },
      { id: 'research', label: 'Research and product learning', type: 'choices', options: ['Comfortable researching products', 'Comfortable working from a brief', 'Prefer clear source material'] },
      { id: 'sample', label: 'Sample link or writing sample', type: 'text', placeholder: 'Example: Google Doc, Notion page, or portfolio link' }
    ]
  },
  {
    value: 'photographer',
    title: 'Photographer / Videographer',
    category: 'production',
    description: 'Shoot product visuals, creator content, event coverage, behind-the-scenes, reels, and campaign assets.',
    tags: ['Product shoots', 'Creator shoots', 'Events'],
    applicationLabel: 'Apply as Photographer / Videographer',
    questions: [
      { id: 'productionTypes', label: 'Work types', type: 'choices', options: ['Product photography', 'Portraits', 'Fashion', 'Lifestyle', 'Reels production', 'Events', 'Behind-the-scenes'] },
      { id: 'gear', label: 'Gear available', type: 'text', placeholder: 'Optional. Example: Mirrorless camera, phone rig, lights, or audio kit' },
      { id: 'turnaround', label: 'Typical turnaround time', type: 'text', placeholder: 'Example: Edited photo set within 3 days' }
    ]
  },
  {
    value: 'social_manager',
    title: 'Social Media Manager',
    category: 'campaign-support',
    description: 'Support content calendars, posting plans, captions, campaign coordination, community, and reporting.',
    tags: ['Calendar', 'Captions', 'Reporting'],
    applicationLabel: 'Apply as Social Manager',
    questions: [
      { id: 'socialSkills', label: 'Skills', type: 'choices', options: ['Calendar planning', 'Captions', 'Scheduling', 'Community replies', 'Reporting', 'Campaign coordination', 'Content ideas'] },
      { id: 'socialTools', label: 'Tools you use', type: 'choices', options: ['Meta Business Suite', 'Canva', 'Notion', 'Google Sheets', 'Other'] },
      { id: 'accounts', label: 'Past account or work sample', type: 'text', placeholder: 'Optional. Example: portfolio, public account, or case study link' }
    ]
  },
  {
    value: 'graphic_designer',
    title: 'Designer / Motion Artist',
    category: 'editing-writing',
    description: 'Create thumbnails, carousels, campaign graphics, motion assets, ad visuals, and social creatives.',
    tags: ['Thumbnails', 'Carousels', 'Motion'],
    applicationLabel: 'Apply as Designer',
    questions: [
      { id: 'designSkills', label: 'Skills', type: 'choices', options: ['Thumbnails', 'Carousels', 'Ad graphics', 'Campaign visuals', 'Motion graphics', 'Logo animation', 'Kinetic typography'] },
      { id: 'designTools', label: 'Tools you use', type: 'choices', options: ['Canva', 'Photoshop', 'Illustrator', 'Figma', 'After Effects', 'Other'] },
      { id: 'turnaround', label: 'Typical turnaround time', type: 'text', placeholder: 'Example: 1-2 days for a carousel or thumbnail set' }
    ]
  },
  {
    value: 'voiceover',
    title: 'Voiceover Artist',
    category: 'live-presenting',
    description: 'Record voiceovers for product explainers, ads, reels, YouTube content, and multilingual narration.',
    tags: ['Narration', 'Ads', 'Explainers'],
    applicationLabel: 'Apply as Voiceover Artist',
    questions: [
      { id: 'voiceStyle', label: 'Voice styles', type: 'choices', options: ['Warm', 'Energetic', 'Premium', 'Educational', 'Conversational'] },
      { id: 'audioSetup', label: 'Audio setup', type: 'text', placeholder: 'Optional. Example: Treated room, USB mic, or studio access' },
      { id: 'sample', label: 'Sample voice link', type: 'text', placeholder: 'Example: Drive, SoundCloud, or portfolio link' }
    ]
  },
  {
    value: 'makeup_stylist',
    title: 'Makeup / Styling Artist',
    category: 'production',
    description: 'Support campaign shoots with beauty looks, creator grooming, fashion styling, and shoot preparation.',
    tags: ['Styling', 'Grooming', 'Beauty looks'],
    applicationLabel: 'Apply as Stylist',
    questions: [
      { id: 'stylingSkills', label: 'Skills', type: 'choices', options: ['Makeup', 'Hair', 'Wardrobe styling', 'Shoot prep', 'Grooming'] },
      { id: 'categories', label: 'Categories', type: 'choices', options: ['Beauty', 'Fashion', 'Lifestyle', 'Bridal-style', 'Product shoot support'] },
      { id: 'kit', label: 'Kit or travel notes', type: 'text', placeholder: 'Optional. Example: Personal kit available and can travel locally' }
    ]
  },
  {
    value: 'campaign_coordinator',
    title: 'Campaign Coordinator',
    category: 'campaign-support',
    description: 'Help manage briefs, schedules, creator communication, deliverables, approvals, and campaign tracking.',
    tags: ['Coordination', 'Scheduling', 'Approvals'],
    applicationLabel: 'Apply as Coordinator',
    questions: [
      { id: 'coordinationSkills', label: 'Skills', type: 'choices', options: ['Scheduling', 'Creator communication', 'Brief management', 'Approvals', 'Delivery tracking', 'Reporting'] },
      { id: 'coordinationTools', label: 'Tools you use', type: 'choices', options: ['Google Sheets', 'Notion', 'Trello', 'WhatsApp coordination', 'Email'] },
      { id: 'experience', label: 'Relevant experience', type: 'text', placeholder: 'Optional. Example: managed event schedules or creator deliverables' }
    ]
  }
];

export const getCreatorRole = (value: string | null | undefined) => CREATOR_ROLE_CATALOG.find((role) => role.value === value);
