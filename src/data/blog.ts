export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-001",
    slug: "ultimate-guide-everest-base-camp-trek",
    title: "The Ultimate Guide to Everest Base Camp Trek in 2026",
    excerpt: "Everything you need to know about trekking to Everest Base Camp, from preparation and packing to day-by-day expectations. Our comprehensive guide covers fitness requirements, altitude acclimatization, and tips for making the most of your Himalayan adventure.",
    category: "Trekking Guides",
    author: "Pemba Dorje Sherpa",
    date: "2026-01-15",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=400&fit=crop"
  },
  {
    id: "blog-002",
    slug: "best-time-trek-nepal",
    title: "Best Time to Trek in Nepal: A Seasonal Guide",
    excerpt: "Nepal's trekking seasons each offer unique experiences. Learn the pros and cons of autumn, spring, winter, and monsoon trekking, and discover which season is perfect for your Himalayan adventure.",
    category: "Travel Tips",
    author: "Dawa Nuru Sherpa",
    date: "2026-02-08",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=400&fit=crop"
  },
  {
    id: "blog-003",
    slug: "altitude-sickness-prevention",
    title: "Altitude Sickness: Prevention, Symptoms, and Treatment",
    excerpt: "Altitude sickness is the biggest health risk for Himalayan trekkers. This comprehensive guide explains how to prevent AMS, recognize symptoms, and what to do if you or a companion shows signs of altitude illness.",
    category: "Health & Safety",
    author: "Lakpa Tenzing Sherpa",
    date: "2026-03-02",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=800&h=400&fit=crop"
  },
  {
    id: "blog-004",
    slug: "top-10-photography-tips-himalayas",
    title: "Top 10 Photography Tips for Capturing the Himalayas",
    excerpt: "Master mountain photography with these expert tips from our professional guides. Learn about optimal timing, composition techniques, equipment recommendations, and how to capture the perfect Himalayan shot.",
    category: "Photography",
    author: "Nima Diki Sherpa",
    date: "2026-01-28",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=400&fit=crop"
  },
  {
    id: "blog-005",
    slug: "nepali-culture-traditions",
    title: "Understanding Nepali Culture: Traditions and Etiquette",
    excerpt: "Nepal's rich cultural tapestry spans over 100 ethnic groups with unique traditions. Learn about local customs, religious practices, and respectful behavior to enhance your cultural immersion during your visit.",
    category: "Cultural Insights",
    author: "Mingma Gyalje Sherpa",
    date: "2026-02-20",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1553856622-d1b350d58a7f?w=800&h=400&fit=crop"
  },
  {
    id: "blog-006",
    slug: "trekking-packing-list",
    title: "The Complete Himalayan Trekking Packing List",
    excerpt: "Don't know what to pack for your Himalayan trek? Our detailed packing list covers everything from clothing layers and footwear to electronics and personal items, with recommendations for different trek difficulties.",
    category: "Travel Tips",
    author: "Karma Wangchuk Sherpa",
    date: "2026-03-10",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=400&fit=crop"
  }
];
