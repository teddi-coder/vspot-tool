export type Creative = {
  id: string;
  title: string;
  format: string;
  platform: string[];
  dimensions: string;
  placement: string[];
  status: 'in_review' | 'approved' | 'archived';
  keyMessage: string;
  primaryCopy: string;
  headline: string;
  cta: string;
  landingPage: string;
  strategyNote: string;
  previewComponent: string;
};

export const creatives: Creative[] = [
  {
    id: 'notes-checklist',
    title: 'iPhone Notes — swap checklist',
    format: 'iPhone Notes app (dark mode)',
    platform: ['Meta', 'Instagram'],
    dimensions: '1080 × 1350px',
    placement: ['Feed', 'Stories'],
    status: 'in_review',
    keyMessage:
      'A checklist of everyday beauty products being swapped for cleaner alternatives — positioning The V Spot as the destination for the switch.',
    primaryCopy: 'Making the switch to non-toxic beauty? You\'re in the right place.',
    headline: 'Vegan beauty, properly done',
    cta: 'Shop Now',
    landingPage: 'thevspot.com.au/collections/all',
    strategyNote:
      'Best for cold audiences in the eco/vegan interest bucket. Pairs well with a collections landing page.',
    previewComponent: 'NotesPreview',
  },
  {
    id: 'imessage-recommendation',
    title: 'iMessage — friend recommendation',
    format: 'iMessage thread (dark mode)',
    platform: ['Meta', 'Instagram'],
    dimensions: '1080 × 1350px',
    placement: ['Feed', 'Stories'],
    status: 'in_review',
    keyMessage:
      'Two friends discussing Axiology lipstick, with one recommending The V Spot — social proof through a familiar conversation format.',
    primaryCopy: 'Your friends are already shopping here.',
    headline: 'Axiology, NOTO & more at The V Spot',
    cta: 'Shop Now',
    landingPage: 'thevspot.com.au/collections/all',
    strategyNote:
      'Works across cold and warm. Test against an Axiology-specific collection page for warm retargeting.',
    previewComponent: 'IMessagePreview',
  },
  {
    id: 'reddit-discovery',
    title: 'Reddit thread — community discovery',
    format: 'Reddit post + comments (dark mode)',
    platform: ['Meta', 'Instagram'],
    dimensions: '1080 × 1350px',
    placement: ['Feed'],
    status: 'in_review',
    keyMessage:
      'A community post asking if everyone already knows about The V Spot, with affirming comments — FOMO-driven social proof.',
    primaryCopy: 'Most people find out through a friend. Now you know.',
    headline: 'The V Spot — vegan beauty worth switching for',
    cta: 'Shop Now',
    landingPage: 'thevspot.com.au/collections/all',
    strategyNote:
      'Strongest FOMO signal of the four. Best for cold awareness — the community format builds instant trust with new audiences.',
    previewComponent: 'RedditPreview',
  },
  {
    id: 'google-search',
    title: 'Google search — research moment',
    format: 'Google search results (dark mode)',
    platform: ['Meta', 'Instagram'],
    dimensions: '1080 × 1350px',
    placement: ['Feed'],
    status: 'in_review',
    keyMessage:
      'A Google search for "is my moisturiser actually vegan" with a featured snippet crediting The V Spot — meeting the audience at the moment of research.',
    primaryCopy: 'You already had the question. Here\'s the answer.',
    headline: 'Actually vegan. Actually verified.',
    cta: 'Learn More',
    landingPage: 'thevspot.com.au/pages/about',
    strategyNote:
      'Best for cold audiences in the research/consideration phase. Land on an educational page rather than straight to shop.',
    previewComponent: 'GoogleSearchPreview',
  },
];
