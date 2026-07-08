export interface Destination {
  id: string;
  slug: string;
  name: string;
  country: string;
  tripCount: number;
  description: string;
  highlights: string[];
  bestSeason: string;
  image: string;
}

export const DESTINATIONS: Destination[] = [
  {
    id: "dest-001",
    slug: "nepal",
    name: "Nepal",
    country: "Nepal",
    tripCount: 156,
    description: "Nepal is a landlocked country in South Asia, nestled in the heart of the Himalayas. Home to eight of the world's fourteen highest peaks, including Mount Everest, Nepal offers an incredible diversity of landscapes, cultures, and experiences. From ancient temples and vibrant festivals to world-class trekking and wildlife safaris, Nepal is a destination that captivates every traveler.",
    highlights: [
      "Home to Mount Everest and 8 of 14 eight-thousanders",
      "Rich cultural heritage with over 100 ethnic groups",
      "World-class trekking and mountaineering",
      "Ancient temples and UNESCO World Heritage Sites",
      "Diverse wildlife including Bengal tigers and rhinoceros",
      "Warm hospitality and affordable prices"
    ],
    bestSeason: "October - November, March - May",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop&auto=format"
  },
  {
    id: "dest-002",
    slug: "bhutan",
    name: "Bhutan",
    country: "Bhutan",
    tripCount: 42,
    description: "Bhutan, known as the 'Land of the Thunder Dragon', is a Buddhist kingdom in the Himalayas renowned for its pristine environment, vibrant culture, and commitment to Gross National Happiness. With its dramatic landscapes, ancient monasteries, and colorful festivals, Bhutan offers a unique and authentic travel experience.",
    highlights: [
      "Pristine environment and carbon-negative country",
      "Ancient Buddhist monasteries and fortresses",
      "Vibrant traditional festivals (Tshechus)",
      "Stunning Himalayan landscapes",
      "Unique architecture and traditional dress",
      "Exclusive tourism policy limiting visitor numbers"
    ],
    bestSeason: "March - May, September - November",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format"
  },
  {
    id: "dest-003",
    slug: "tibet",
    name: "Tibet",
    country: "China",
    tripCount: 28,
    description: "Tibet, the 'Roof of the World', is a plateau region with an average elevation of over 4,500 meters. Home to ancient Buddhist monasteries, breathtaking landscapes, and a unique cultural heritage, Tibet offers travelers an otherworldly experience. From the shores of sacred lakes to the foot of Mount Everest's north side, Tibet is a land of profound beauty and spirituality.",
    highlights: [
      "Visit the iconic Potala Palace in Lhasa",
      "Explore ancient Buddhist monasteries",
      "See Mount Everest from the north side",
      "Visit sacred lakes Yamdrok and Namtso",
      "Experience unique Tibetan Buddhist culture",
      "Travel the world's highest road"
    ],
    bestSeason: "May - October",
    image: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=800&h=600&fit=crop&auto=format"
  },
  {
    id: "dest-004",
    slug: "india",
    name: "India",
    country: "India",
    tripCount: 34,
    description: "India's Himalayan regions offer incredible diversity, from the lush valleys of Himachal Pradesh to the stark beauty of Ladakh and the spiritual atmosphere of Uttarakhand. Experience world-class trekking, ancient temples, vibrant culture, and warm hospitality in one of the world's most fascinating countries.",
    highlights: [
      "Diverse Himalayan landscapes",
      "Ancient temples and spiritual sites",
      "World-class trekking in Ladakh and Himachal",
      "Vibrant culture and festivals",
      "Delicious cuisine from street food to fine dining",
      "Affordable luxury accommodations"
    ],
    bestSeason: "March - May, September - November",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format"
  },
  {
    id: "dest-005",
    slug: "everest-region",
    name: "Everest Region",
    country: "Nepal",
    tripCount: 89,
    description: "The Everest region, also known as the Khumbu, is the most famous trekking destination in the world. Home to the legendary Mount Everest, this region offers iconic treks through Sherpa villages, past ancient monasteries, and through some of the most dramatic mountain scenery on Earth.",
    highlights: [
      "Trek to Everest Base Camp (5,364m)",
      "Visit Tengboche Monastery",
      "Experience authentic Sherpa culture",
      "Sunrise from Kala Patthar (5,545m)",
      "Scenic flights to Lukla",
      "Views of four 8,000m+ peaks"
    ],
    bestSeason: "October - November, March - May",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop&auto=format"
  },
  {
    id: "dest-006",
    slug: "annapurna-region",
    name: "Annapurna Region",
    country: "Nepal",
    tripCount: 112,
    description: "The Annapurna region is the most diverse and popular trekking area in Nepal, offering everything from subtropical forests to high-altitude desert. With the world's deepest gorge, sacred temples, and some of the best mountain views, Annapurna provides unforgettable experiences for trekkers of all levels.",
    highlights: [
      "Annapurna Circuit - one of the world's greatest treks",
      "Annapurna Base Camp trek",
      "Poon Hill sunrise viewpoint",
      "Deep gorges and diverse ecosystems",
      "Traditional Gurung and Thakali culture",
      "Muktinath sacred temple"
    ],
    bestSeason: "October - November, March - May",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop&auto=format"
  },
  {
    id: "dest-007",
    slug: "langtang-region",
    name: "Langtang Region",
    country: "Nepal",
    tripCount: 45,
    description: "The Langtang region is the closest major trekking area to Kathmandu, making it perfect for those with limited time. Known as the 'Valley of Glaciers', Langtang offers stunning mountain scenery, rich Tamang culture, and pristine forests without the crowds of the more popular regions.",
    highlights: [
      "Closest trekking region to Kathmandu",
      "Views of Langtang Lirung (7,227m)",
      "Authentic Tamang culture",
      "Kyanjin Gompa monastery and dairy",
      "Tserko Ri panoramic viewpoint",
      "Fewer crowds than Everest and Annapurna"
    ],
    bestSeason: "October - November, March - May",
    image: "https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=800&h=600&fit=crop&auto=format"
  },
  {
    id: "dest-008",
    slug: "upper-mustang",
    name: "Upper Mustang",
    country: "Nepal",
    tripCount: 18,
    description: "Upper Mustang, the former Kingdom of Lo, is one of the most remote and culturally preserved regions in Nepal. This restricted area features dramatic red cliff formations, ancient cave dwellings, and a medieval walled city. A land that time forgot, Upper Mustang offers a truly unique and exclusive travel experience.",
    highlights: [
      "Ancient walled city of Lo Manthang",
      "Mysterious cave dwellings and sky caves",
      "Preserved Tibetan Buddhist culture",
      "Dramatic red and ochre cliff formations",
      "Restricted area with limited permits",
      "Unique desert-like landscape in the Himalayas"
    ],
    bestSeason: "March - November",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop&auto=format"
  }
];
