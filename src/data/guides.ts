export interface Guide {
  id: string;
  name: string;
  role: string;
  experience: string;
  languages: string[];
  specialization: string[];
  rating: number;
  reviews: number;
  bio: string;
  image: string;
}

export const GUIDES: Guide[] = [
  {
    id: "guide-001",
    name: "Pemba Dorje Sherpa",
    role: "Senior Trekking Guide",
    experience: "18 years",
    languages: ["English", "Nepali", "Sherpa", "Japanese"],
    specialization: ["Everest Region", "High Altitude Trekking", "Peak Climbing"],
    rating: 4.9,
    reviews: 487,
    bio: "Born in Namche Bazaar, Pemba has been guiding in the Everest region since 2008. He has summited Everest twice and has extensive experience leading treks and climbing expeditions throughout the Himalayas. His deep knowledge of Sherpa culture and mountain safety makes him one of the most sought-after guides in Nepal.",
    image: "https://i.pravatar.cc/150?img=11"
  },
  {
    id: "guide-002",
    name: "Dawa Nuru Sherpa",
    role: "Climbing Guide & Instructor",
    experience: "14 years",
    languages: ["English", "Nepali", "Sherpa"],
    specialization: ["Peak Climbing", "Technical Mountaineering", "Ice Climbing"],
    rating: 4.9,
    reviews: 234,
    bio: "Dawa is a certified UIAGM mountain guide with extensive experience on Himalayan peaks. He has summited Everest, Lhotse, and Makalu, and has guided over 50 successful peak climbing expeditions. His technical expertise and calm demeanor under pressure make him ideal for challenging climbing routes.",
    image: "https://i.pravatar.cc/150?img=16"
  },
  {
    id: "guide-003",
    name: "Mingma Gyalje Sherpa",
    role: "Trekking & Cultural Guide",
    experience: "12 years",
    languages: ["English", "Nepali", "Tamang", "Hindi"],
    specialization: ["Langtang Region", "Cultural Tours", "Family Treks"],
    rating: 4.8,
    reviews: 312,
    bio: "Mingma specializes in the Langtang and central Nepal regions. His warm personality and extensive knowledge of local cultures make him perfect for cultural tours and family adventures. He is passionate about sustainable tourism and works closely with local communities.",
    image: "https://i.pravatar.cc/150?img=21"
  },
  {
    id: "guide-004",
    name: "Lakpa Tenzing Sherpa",
    role: "Senior Guide & Expedition Leader",
    experience: "22 years",
    languages: ["English", "Nepali", "Sherpa", "French"],
    specialization: ["Everest Expeditions", "Manaslu Circuit", "Remote Treks"],
    rating: 4.9,
    reviews: 523,
    bio: "Lakpa is one of the most experienced guides in Nepal with over two decades of guiding experience. He has led numerous Everest expeditions and has guided treks to some of the most remote corners of the Himalayas. His leadership skills and mountain expertise are unmatched.",
    image: "https://i.pravatar.cc/150?img=26"
  },
  {
    id: "guide-005",
    name: "Nima Diki Sherpa",
    role: "Photography & Luxury Guide",
    experience: "10 years",
    languages: ["English", "Nepali", "Sherpa"],
    specialization: ["Photography Tours", "Luxury Travel", "Annapurna Region"],
    rating: 4.8,
    reviews: 178,
    bio: "Nima combines her passion for photography with her love of the mountains. A talented photographer herself, she specializes in photography expeditions and luxury travel experiences. Her eye for composition and knowledge of the best locations and lighting conditions make her an exceptional guide for photographers.",
    image: "https://i.pravatar.cc/150?img=31"
  },
  {
    id: "guide-006",
    name: "Karma Wangchuk Sherpa",
    role: "Adventure & Safari Guide",
    experience: "8 years",
    languages: ["English", "Nepali", "Tamang"],
    specialization: ["Jungle Safari", "Rafting", "Paragliding", "Day Hiking"],
    rating: 4.7,
    reviews: 156,
    bio: "Karma is a versatile adventure guide with expertise in a wide range of activities. From white-water rafting on the Trisuli River to jungle safaris in Chitwan, he brings energy and enthusiasm to every adventure. His knowledge of wildlife and outdoor activities makes him a favorite among adventurous travelers.",
    image: "https://i.pravatar.cc/150?img=36"
  }
];
