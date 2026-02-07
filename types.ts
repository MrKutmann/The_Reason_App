
export interface ContentItem {
  id: string;
  type: 'video' | 'photo' | 'post';
  title: string;
  description: string;
  creator: {
    name: string;
    handle: string;
    avatar: string;
  };
  mediaUrl: string;
  stats: {
    likes: number;
    comments: number;
    shares: number;
  };
  mindfulScore?: number;
  vettingStatus: 'pending' | 'vetted' | 'rejected';
}

export type FeedCategory = 'All' | 'Photos' | 'Videos' | 'Posts';
