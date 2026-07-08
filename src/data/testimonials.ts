export interface Testimonial {
  id: string;
  name: string;
  country: string;
  flag: string;
  trip: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
  avatar: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-001",
    name: "Sarah Mitchell",
    country: "United States",
    flag: "🇺🇸",
    trip: "Everest Base Camp Trek",
    rating: 5,
    text: "The Everest Base Camp trek was a life-changing experience. Our guide Pemba was incredibly knowledgeable and supportive, especially during the challenging sections. The itinerary was perfectly paced for acclimatization, and every detail was taken care of. Standing at the foot of Everest was a dream come true. Highly recommend this company for anyone dreaming of the Himalayas!",
    date: "2025-11-15",
    verified: true,
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: "test-002",
    name: "Marcus Weber",
    country: "Germany",
    flag: "🇩🇪",
    trip: "Annapurna Circuit",
    rating: 5,
    text: "The Annapurna Circuit exceeded all my expectations. The diversity of landscapes is incredible - from lush subtropical forests to high-altitude desert. Crossing Thorong La Pass at dawn was unforgettable. Our guide's knowledge of the local culture and history made the journey even more meaningful. The teahouse accommodations were comfortable and the food was surprisingly good.",
    date: "2025-10-28",
    verified: true,
    avatar: "https://i.pravatar.cc/150?img=11"
  },
  {
    id: "test-003",
    name: "Yuki Tanaka",
    country: "Japan",
    flag: "🇯🇵",
    trip: "Upper Mustang Trek",
    rating: 5,
    text: "Upper Mustang is truly a hidden gem. The ancient walled city of Lo Manthang felt like stepping back in time. The landscape is otherworldly - red cliffs, cave dwellings, and Buddhist monasteries everywhere. The restricted area permit means fewer tourists, which adds to the exclusive experience. Our guide was exceptional and the local people were incredibly welcoming.",
    date: "2025-09-12",
    verified: true,
    avatar: "https://i.pravatar.cc/150?img=16"
  },
  {
    id: "test-004",
    name: "Emma Thompson",
    country: "United Kingdom",
    flag: "🇬🇧",
    trip: "Family Nepal Adventure",
    rating: 5,
    text: "We brought our two children (ages 10 and 12) on the Family Adventure trip and it was perfect. The itinerary was well-paced with a mix of activities that kept everyone engaged. The guides were fantastic with kids, making learning about Nepali culture fun and interactive. The jungle safari in Chitwan was a highlight - we saw rhinos and elephants! A truly memorable family holiday.",
    date: "2025-08-20",
    verified: true,
    avatar: "https://i.pravatar.cc/150?img=21"
  },
  {
    id: "test-005",
    name: "Pierre Dubois",
    country: "France",
    flag: "🇫🇷",
    trip: "Island Peak Climbing",
    rating: 5,
    text: "Summiting Island Peak was the achievement of a lifetime. The climbing guides were professional, patient, and safety-focused. The technical training before the climb gave me confidence, and the support on summit day was incredible. The combination of the Everest Base Camp trek with a real climbing experience made this trip truly special.",
    date: "2025-12-03",
    verified: true,
    avatar: "https://i.pravatar.cc/150?img=26"
  },
  {
    id: "test-006",
    name: "Priya Sharma",
    country: "India",
    flag: "🇮🇳",
    trip: "Nepal Luxury Experience",
    rating: 5,
    text: "The Luxury Nepal Experience was beyond our expectations. From the moment we arrived, every detail was perfect. The helicopter flight to Everest Base Camp was breathtaking, and the luxury hotels were exceptional. The private guide was knowledgeable and accommodating. The farewell gala dinner was a beautiful ending to an unforgettable trip. Worth every penny for a special occasion.",
    date: "2025-10-05",
    verified: true,
    avatar: "https://i.pravatar.cc/150?img=31"
  },
  {
    id: "test-007",
    name: "James Wilson",
    country: "Australia",
    flag: "🇦🇺",
    trip: "Langtang Valley Trek",
    rating: 4,
    text: "The Langtang Valley trek was perfect for my first Himalayan experience. The trail is less crowded than Everest or Annapurna, and the scenery is stunning. The Tamang culture is fascinating, and the hospitality at the teahouses was wonderful. The hike to Tserko Ri for sunrise was absolutely worth the early start. A great introduction to trekking in Nepal.",
    date: "2025-11-22",
    verified: true,
    avatar: "https://i.pravatar.cc/150?img=36"
  },
  {
    id: "test-008",
    name: "Anna Kowalski",
    country: "Poland",
    flag: "🇵🇱",
    trip: "Photography Expedition",
    rating: 5,
    text: "As a professional photographer, I was impressed by the attention to detail in this photography expedition. The guide knew exactly where to be at the right time for the best light. The small group size meant we had space to work, and the post-processing sessions were incredibly helpful. I returned home with a portfolio of images I'm truly proud of.",
    date: "2025-09-30",
    verified: true,
    avatar: "https://i.pravatar.cc/150?img=41"
  }
];
