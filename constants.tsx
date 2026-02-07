
import { ContentItem } from './types';

export const COLORS = {
  primary: '#E4FF1A', // Bright Lime/Yellow from the user's prompt
  background: '#050a14',
  deepBlue: '#0B1221',
  text: '#FFFFFF',
  textSecondary: '#A0AEC0',
};

export const MOCK_VIDEOS: ContentItem[] = [
  {
    id: '1',
    type: 'video',
    title: 'The Philosophy of Stoicism',
    description: 'A deep dive into how ancient wisdom can help modern anxiety. #philosophy #mindfulness',
    creator: {
      name: 'Marcus Aurelius Fan',
      handle: '@stoic_mind',
      avatar: 'https://picsum.photos/seed/1/100/100',
    },
    mediaUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000',
    stats: { likes: 12400, comments: 450, shares: 890 },
    vettingStatus: 'vetted',
    mindfulScore: 9.5
  },
  {
    id: '2',
    type: 'video',
    title: 'Quantum Physics Explained',
    description: 'Understanding the observer effect in less than 60 seconds. #science #physics',
    creator: {
      name: 'Dr. Quantum',
      handle: '@science_daily',
      avatar: 'https://picsum.photos/seed/2/100/100',
    },
    mediaUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000',
    stats: { likes: 45000, comments: 1200, shares: 5600 },
    vettingStatus: 'vetted',
    mindfulScore: 9.8
  },
  {
    id: '3',
    type: 'video',
    title: 'How to Build a Second Brain',
    description: 'A practical guide to digital organization and personal knowledge management. #productivity',
    creator: {
      name: 'Tiago Forte',
      handle: '@tiago_f',
      avatar: 'https://picsum.photos/seed/3/100/100',
    },
    mediaUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1000',
    stats: { likes: 8900, comments: 230, shares: 450 },
    vettingStatus: 'vetted',
    mindfulScore: 9.0
  },
  {
    id: '4',
    type: 'video',
    title: 'Why We Sleep',
    description: 'The science behind dreaming and why 8 hours is non-negotiable. #health #science',
    creator: {
      name: 'Sleep Lab',
      handle: '@neuro_science',
      avatar: 'https://picsum.photos/seed/4/100/100',
    },
    mediaUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=1000',
    stats: { likes: 5200, comments: 110, shares: 320 },
    vettingStatus: 'vetted',
    mindfulScore: 8.8
  }
];
