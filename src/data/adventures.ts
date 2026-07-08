export interface Adventure {
  id: string;
  slug: string;
  name: string;
  icon: string;
  description: string;
  tripCount: number;
  image: string;
}

export const ADVENTURES: Adventure[] = [
  {
    id: "adv-001",
    slug: "trekking",
    name: "Trekking",
    icon: "mountain",
    description: "Embark on epic journeys through the world's most stunning mountain landscapes. From beginner-friendly walks to challenging high-altitude expeditions, our treks take you through ancient villages, pristine forests, and breathtaking mountain vistas.",
    tripCount: 85,
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop"
  },
  {
    id: "adv-002",
    slug: "peak-climbing",
    name: "Peak Climbing",
    icon: "summit",
    description: "Challenge yourself with guided climbing expeditions to Himalayan peaks. Whether you're a beginner looking to climb your first 6,000m peak or an experienced mountaineer seeking new challenges, we offer safe and professional climbing experiences.",
    tripCount: 24,
    image: "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=400&h=300&fit=crop"
  },
  {
    id: "adv-003",
    slug: "helicopter-tours",
    name: "Helicopter Tours",
    icon: "plane",
    description: "Experience the Himalayas from above with our exclusive helicopter tours. Fly to Everest Base Camp, circle the world's highest peaks, or enjoy scenic flights over dramatic valleys and ancient monasteries.",
    tripCount: 12,
    image: "https://images.unsplash.com/photo-1478827536114-da961b7f86d2?w=400&h=300&fit=crop"
  },
  {
    id: "adv-004",
    slug: "cultural-tours",
    name: "Cultural Tours",
    icon: "landmark",
    description: "Immerse yourself in the rich cultural tapestry of the Himalayan region. Visit ancient temples, monasteries, and palaces while experiencing traditional festivals, crafts, and local hospitality.",
    tripCount: 38,
    image: "https://images.unsplash.com/photo-1553856622-d1b350d58a7f?w=400&h=300&fit=crop"
  },
  {
    id: "adv-005",
    slug: "jungle-safari",
    name: "Jungle Safari",
    icon: "trees",
    description: "Discover the incredible wildlife of South Asia's national parks. Search for Bengal tigers, one-horned rhinoceros, elephants, and hundreds of bird species in their natural habitats.",
    tripCount: 28,
    image: "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=400&h=300&fit=crop"
  },
  {
    id: "adv-006",
    slug: "family-holidays",
    name: "Family Holidays",
    icon: "users",
    description: "Create unforgettable family memories with our specially designed family adventures. Safe, fun, and educational experiences that cater to all ages, from easy treks to cultural workshops and wildlife encounters.",
    tripCount: 18,
    image: "https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=400&h=300&fit=crop"
  },
  {
    id: "adv-007",
    slug: "photography-tours",
    name: "Photography Tours",
    icon: "camera",
    description: "Capture the beauty of the Himalayas with our photography-focused expeditions. Led by professional mountain photographers, these tours optimize locations, timing, and conditions for stunning results.",
    tripCount: 15,
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop"
  },
  {
    id: "adv-008",
    slug: "luxury-travel",
    name: "Luxury Travel",
    icon: "crown",
    description: "Experience the Himalayas in ultimate comfort and style. Our luxury itineraries feature five-star accommodations, private transfers, helicopter flights, and exclusive experiences for discerning travelers.",
    tripCount: 11,
    image: "https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=400&h=300&fit=crop"
  },
  {
    id: "adv-009",
    slug: "honeymoon-tours",
    name: "Honeymoon Tours",
    icon: "heart",
    description: "Begin your journey together in the most romantic settings the Himalayas have to offer. From luxury resorts with mountain views to private cultural experiences, we create magical moments for couples.",
    tripCount: 14,
    image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=400&h=300&fit=crop"
  },
  {
    id: "adv-010",
    slug: "day-hiking",
    name: "Day Hiking",
    icon: "compass",
    description: "Perfect for those with limited time, our day hikes offer incredible mountain experiences in just a few hours. Walk through charming villages, visit ancient temples, and enjoy stunning views without multi-day commitments.",
    tripCount: 32,
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop"
  },
  {
    id: "adv-011",
    slug: "rafting",
    name: "Rafting",
    icon: "waves",
    description: "Experience the thrill of white-water rafting on Nepal's legendary rivers. From gentle float trips suitable for families to adrenaline-pumping rapids for thrill-seekers, we offer rafting adventures for all levels.",
    tripCount: 22,
    image: "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=400&h=300&fit=crop"
  },
  {
    id: "adv-012",
    slug: "paragliding",
    name: "Paragliding",
    icon: "wind",
    description: "Soar like a Himalayan eagle with tandem paragliding flights. Launch from mountain ridges and glide over valleys with the world's highest peaks as your backdrop. An unforgettable aerial adventure.",
    tripCount: 16,
    image: "https://images.unsplash.com/photo-1478827536114-da961b7f86d2?w=400&h=300&fit=crop"
  }
];
