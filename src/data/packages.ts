export interface Package {
  id: string;
  slug: string;
  name: string;
  region: "Everest" | "Annapurna" | "Langtang" | "Mustang" | "Manaslu" | "Kanchenjunga" | "Bhutan" | "Tibet";
  category: "Trekking" | "Peak Climbing" | "Helicopter" | "Cultural" | "Safari" | "Luxury" | "Family" | "Photography";
  duration: string;
  days: number;
  difficulty: "Easy" | "Moderate" | "Challenging" | "Strenuous";
  maxAltitude: string;
  groupSize: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  description: string;
  highlights: string[];
  includes: string[];
  excludes: string[];
  itinerary: { day: number; title: string; description: string; altitude?: string; accommodation?: string }[];
  image: string;
  gallery: string[];
}

export const PACKAGES: Package[] = [
  {
    id: "pkg-001",
    slug: "everest-base-camp-trek",
    name: "Everest Base Camp Trek",
    region: "Everest",
    category: "Trekking",
    duration: "14 Days",
    days: 14,
    difficulty: "Challenging",
    maxAltitude: "5,364m (17,598ft)",
    groupSize: "2-16",
    price: 1650,
    originalPrice: 1950,
    rating: 4.9,
    reviews: 847,
    description: "The Everest Base Camp Trek is the quintessential Himalayan adventure, taking you through Sherpa villages, ancient monasteries, and breathtaking mountain landscapes to the foot of the world's highest peak. Walk in the footsteps of legendary mountaineers and experience the warm hospitality of the Khumbu region.",
    highlights: [
      "Stand at the base of Mount Everest (8,849m)",
      "Visit the legendary Tengboche Monastery",
      "Experience authentic Sherpa culture and hospitality",
      "Scenic mountain flight to Lukla",
      "Panoramic views of Lhotse, Nuptse, and Ama Dablam",
      "Sunrise from Kala Patthar (5,545m)",
      "Explore Namche Bazaar, the gateway to Everest"
    ],
    includes: [
      "Airport transfers",
      "Domestic flights (Kathmandu-Lukla-Kathmandu)",
      "All accommodations (hotels and teahouses)",
      "All meals during the trek",
      "Experienced English-speaking guide",
      "Porter service",
      "TIMS and Sagarmatha National Park permits",
      "First aid medical kit",
      "Sleeping bag (can be returned after trek)"
    ],
    excludes: [
      "International airfare",
      "Nepal visa fee",
      "Travel insurance",
      "Personal expenses",
      "Tips for guide and porters",
      "Extra meals in Kathmandu",
      "Hot showers and charging fees on trek"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Kathmandu", description: "Arrive at Tribhuvan International Airport. Transfer to hotel in Thamel. Welcome dinner and trek briefing.", accommodation: "Hotel in Kathmandu" },
      { day: 2, title: "Fly to Lukla, Trek to Phakding", description: "Early morning scenic flight to Lukla (2,860m). Begin trekking through pine forests along the Dudh Koshi River to Phakding.", altitude: "2,610m", accommodation: "Teahouse" },
      { day: 3, title: "Phakding to Namche Bazaar", description: "Cross suspension bridges and climb steeply to Namche Bazaar, the gateway to Everest. First views of the mighty peak.", altitude: "3,440m", accommodation: "Teahouse" },
      { day: 4, title: "Acclimatization Day in Namche Bazaar", description: "Rest day for acclimatization. Hike to Everest View Hotel for panoramic views. Visit the Sherpa Culture Museum.", altitude: "3,440m", accommodation: "Teahouse" },
      { day: 5, title: "Namche to Tengboche", description: "Trek through rhododendron forests with stunning views of Ama Dablam. Visit the famous Tengboche Monastery.", altitude: "3,870m", accommodation: "Teahouse" },
      { day: 6, title: "Tengboche to Dingboche", description: "Descend through forests and cross the Imja Khola. Ascend to the beautiful valley of Dingboche.", altitude: "4,410m", accommodation: "Teahouse" },
      { day: 7, title: "Acclimatization Day in Dingboche", description: "Hike to Nangkartshang Peak (5,083m) for incredible views of Makalu, Lhotse, and Ama Dablam.", altitude: "4,410m", accommodation: "Teahouse" },
      { day: 8, title: "Dingboche to Lobuche", description: "Trek past the Dughla memorial cairns and along the lateral moraine of the Khumbu Glacier.", altitude: "4,940m", accommodation: "Teahouse" },
      { day: 9, title: "Lobuche to Gorak Shep, Trek to Everest Base Camp", description: "Trek to Gorak Shep and continue to Everest Base Camp (5,364m). Stand at the foot of the world's highest mountain.", altitude: "5,364m", accommodation: "Teahouse" },
      { day: 10, title: "Gorak Shep to Kala Patthar, Descend to Pheriche", description: "Early morning hike to Kala Patthar (5,545m) for sunrise over Everest. Descend to Pheriche.", altitude: "5,545m", accommodation: "Teahouse" },
      { day: 11, title: "Pheriche to Namche Bazaar", description: "Long descent through familiar terrain back to Namche Bazaar. Celebrate trek completion.", altitude: "3,440m", accommodation: "Teahouse" },
      { day: 12, title: "Namche Bazaar to Lukla", description: "Final day of trekking. Descend to Lukla through familiar villages and forests.", altitude: "2,860m", accommodation: "Teahouse" },
      { day: 13, title: "Fly to Kathmandu", description: "Morning flight back to Kathmandu. Free time for shopping and sightseeing. Farewell dinner.", accommodation: "Hotel in Kathmandu" },
      { day: 14, title: "Departure Day", description: "Transfer to airport for your onward journey. Namaste!" }
    ],
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop&auto=format"
    ]
  },
  {
    id: "pkg-002",
    slug: "annapurna-circuit",
    name: "Annapurna Circuit",
    region: "Annapurna",
    category: "Trekking",
    duration: "18 Days",
    days: 18,
    difficulty: "Challenging",
    maxAltitude: "5,416m (17,769ft)",
    groupSize: "2-14",
    price: 1850,
    originalPrice: 2200,
    rating: 4.8,
    reviews: 623,
    description: "The Annapurna Circuit is one of the world's greatest long-distance treks, circumnavigating the entire Annapurna massif through diverse landscapes from subtropical forests to high-altitude desert. Cross the legendary Thorong La Pass and experience the cultural diversity of Nepal's middle hills.",
    highlights: [
      "Cross the iconic Thorong La Pass (5,416m)",
      "Trek through diverse ecosystems from tropical to alpine",
      "Visit the sacred Muktinath Temple (3,800m)",
      "Experience traditional Gurung and Thakali culture",
      "Soak in natural hot springs at Tatopani",
      "Walk through the deepest gorge in the world (Kali Gandaki)",
      "Stunning views of Annapurna I, Dhaulagiri, and Machhapuchhre"
    ],
    includes: [
      "Airport transfers",
      "All accommodations (hotels and teahouses)",
      "All meals during the trek",
      "English-speaking trekking guide",
      "Porter service",
      "ACAP and TIMS permits",
      "First aid medical kit",
      "Trekking map"
    ],
    excludes: [
      "International airfare",
      "Nepal visa fee",
      "Travel insurance",
      "Personal expenses",
      "Tips for guide and porters",
      "Extra meals in cities",
      "Hot showers and charging fees on trek"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Kathmandu", description: "Airport pickup and transfer to hotel. Welcome meeting and trek briefing.", accommodation: "Hotel in Kathmandu" },
      { day: 2, title: "Drive to Besisahar", description: "Scenic drive along the Prithvi Highway to Besisahar, the starting point of the circuit.", altitude: "760m", accommodation: "Guesthouse" },
      { day: 3, title: "Besisahar to Bahundanda", description: "Trek through rice terraces and subtropical forests to Bahundanda.", altitude: "1,310m", accommodation: "Teahouse" },
      { day: 4, title: "Bahundanda to Chamje", description: "Continue along the Marsyangdi River through villages and waterfalls.", altitude: "1,430m", accommodation: "Teahouse" },
      { day: 5, title: "Chamje to Dharapani", description: "Enter the Manang district and trek through narrow valleys with Annapurna views.", altitude: "1,860m", accommodation: "Teahouse" },
      { day: 6, title: "Dharapani to Chame", description: "Trek through apple orchards and pine forests to the district headquarters of Manang.", altitude: "2,670m", accommodation: "Teahouse" },
      { day: 7, title: "Chame to Pisang", description: "Walk through deep forests with stunning views of Annapurna II and Paungda Danda rock face.", altitude: "3,200m", accommodation: "Teahouse" },
      { day: 8, title: "Pisang to Manang", description: "Trek along high ridges with panoramic views of the Annapurna range.", altitude: "3,540m", accommodation: "Teahouse" },
      { day: 9, title: "Acclimatization Day in Manang", description: "Rest day with optional hike to Ice Lake (4,600m) or Gangapurna Lake for acclimatization.", altitude: "3,540m", accommodation: "Teahouse" },
      { day: 10, title: "Manang to Yak Kharka", description: "Trek through the Marsyangdi Valley past juniper and scrub forests.", altitude: "4,018m", accommodation: "Teahouse" },
      { day: 11, title: "Yak Kharka to Thorong Phedi", description: "Final approach to Thorong La Pass base. Prepare for the big crossing.", altitude: "4,525m", accommodation: "Teahouse" },
      { day: 12, title: "Cross Thorong La Pass to Muktinath", description: "Early start to cross the legendary Thorong La Pass (5,416m). Descend to sacred Muktinath.", altitude: "5,416m", accommodation: "Teahouse" },
      { day: 13, title: "Muktinath to Jomsom", description: "Visit Muktinath Temple and descend through the windy Kali Gandaki valley.", altitude: "2,720m", accommodation: "Teahouse" },
      { day: 14, title: "Jomsom to Tatopani", description: "Trek through the deepest gorge in the world and soak in natural hot springs.", altitude: "1,190m", accommodation: "Teahouse" },
      { day: 15, title: "Tatopani to Ghorepani", description: "Steep climb through rhododendron forests to the viewpoint village of Ghorepani.", altitude: "2,860m", accommodation: "Teahouse" },
      { day: 16, title: "Ghorepani to Poon Hill to Tadapani", description: "Pre-dawn hike to Poon Hill (3,210m) for sunrise over the Himalayas. Continue to Tadapani.", altitude: "3,210m", accommodation: "Teahouse" },
      { day: 17, title: "Tadapani to Ghandruk to Nayapul, Drive to Pokhara", description: "Descend to Ghandruk and continue to Nayapul. Drive to Pokhara.", accommodation: "Hotel in Pokhara" },
      { day: 18, title: "Pokhara to Kathmandu, Departure", description: "Free morning in Pokhara. Drive or fly to Kathmandu. Departure transfer." }
    ],
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=300&fit=crop&auto=format"
    ]
  },
  {
    id: "pkg-003",
    slug: "langtang-valley-trek",
    name: "Langtang Valley Trek",
    region: "Langtang",
    category: "Trekking",
    duration: "10 Days",
    days: 10,
    difficulty: "Moderate",
    maxAltitude: "4,984m (16,352ft)",
    groupSize: "2-12",
    price: 950,
    originalPrice: 1150,
    rating: 4.7,
    reviews: 389,
    description: "The Langtang Valley Trek offers a perfect introduction to Himalayan trekking with stunning mountain scenery, rich Tamang culture, and diverse flora. Known as the 'Valley of Glaciers', Langtang is the closest major trekking region to Kathmandu, making it ideal for those with limited time.",
    highlights: [
      "Close-up views of Langtang Lirung (7,227m)",
      "Experience traditional Tamang hospitality",
      "Trek through pristine forests of rhododendron and bamboo",
      "Visit the sacred Kyanjin Gompa monastery",
      "Panoramic views of the Langtang range",
      "Less crowded than Everest and Annapurna regions",
      "Taste local yak cheese at Kyanjin dairy"
    ],
    includes: [
      "Airport transfers",
      "All accommodations",
      "All meals during the trek",
      "Experienced trekking guide",
      "Porter service",
      "Langtang National Park permit",
      "TIMS card",
      "Trekking map"
    ],
    excludes: [
      "International airfare",
      "Nepal visa fee",
      "Travel insurance",
      "Personal expenses",
      "Tips for guide and porters",
      "Extra meals in Kathmandu",
      "Hot showers on trek"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Kathmandu", description: "Airport pickup and hotel transfer. Trek briefing and permit arrangements.", accommodation: "Hotel in Kathmandu" },
      { day: 2, title: "Drive to Syabrubesi", description: "Scenic drive through winding mountain roads to the trailhead at Syabrubesi.", altitude: "1,550m", accommodation: "Guesthouse" },
      { day: 3, title: "Syabrubesi to Lama Hotel", description: "Trek through oak and rhododendron forests along the Langtang Khola.", altitude: "2,380m", accommodation: "Teahouse" },
      { day: 4, title: "Lama Hotel to Langtang Village", description: "Continue up the valley with views of Langtang Lirung growing larger.", altitude: "3,430m", accommodation: "Teahouse" },
      { day: 5, title: "Langtang Village to Kyanjin Gompa", description: "Trek through yak pastures to Kyanjin Gompa with stunning mountain backdrop.", altitude: "3,870m", accommodation: "Teahouse" },
      { day: 6, title: "Explore Kyanjin Gompa", description: "Day hike to Tserko Ri (4,984m) or Kyanjin Ri (4,773m) for panoramic views. Visit the monastery.", altitude: "3,870m", accommodation: "Teahouse" },
      { day: 7, title: "Kyanjin Gompa to Lama Hotel", description: "Descend back through the valley to Lama Hotel.", altitude: "2,380m", accommodation: "Teahouse" },
      { day: 8, title: "Lama Hotel to Thulo Syabru", description: "Trek to the traditional Tamang village of Thulo Syabru.", altitude: "2,260m", accommodation: "Teahouse" },
      { day: 9, title: "Thulo Syabru to Dhunche, Drive to Kathmandu", description: "Final trek to Dhunche and drive back to Kathmandu.", accommodation: "Hotel in Kathmandu" },
      { day: 10, title: "Departure Day", description: "Free morning in Kathmandu. Transfer to airport." }
    ],
    image: "https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=800&h=600&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=400&h=300&fit=crop&auto=format"
    ]
  },
  {
    id: "pkg-004",
    slug: "upper-mustang-trek",
    name: "Upper Mustang Trek",
    region: "Mustang",
    category: "Trekking",
    duration: "14 Days",
    days: 14,
    difficulty: "Moderate",
    maxAltitude: "4,010m (13,156ft)",
    groupSize: "2-10",
    price: 2400,
    originalPrice: 2800,
    rating: 4.9,
    reviews: 203,
    description: "Upper Mustang, the former Kingdom of Lo, is one of the most remote and culturally preserved regions in Nepal. This restricted area trek takes you through a dramatic landscape of eroded cliffs, ancient cave dwellings, and medieval walled cities. Experience a culture that has remained virtually unchanged for centuries.",
    highlights: [
      "Visit the ancient walled city of Lo Manthang",
      "Explore mysterious cave dwellings and sky caves",
      "Experience authentic Tibetan Buddhist culture",
      "Trek through dramatic red and ochre cliff formations",
      "Visit the sacred Choser Caves",
      "See the stunning Dhakmar red cliffs",
      "Restricted area with limited permits (exclusive experience)"
    ],
    includes: [
      "Airport transfers",
      "All accommodations",
      "All meals during trek",
      "Licensed trekking guide",
      "Porter service",
      "Upper Mustang restricted area permit ($500 pp)",
      "ACAP permit",
      "TIMS card"
    ],
    excludes: [
      "International airfare",
      "Nepal visa fee",
      "Travel insurance",
      "Personal expenses",
      "Tips for guide and porters",
      "Extra meals in cities"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Kathmandu", description: "Airport pickup and hotel transfer. Briefing about the trek.", accommodation: "Hotel in Kathmandu" },
      { day: 2, title: "Fly to Pokhara", description: "Flight to Pokhara with stunning mountain views. Free afternoon by the lake.", accommodation: "Hotel in Pokhara" },
      { day: 3, title: "Fly to Jomsom, Trek to Kagbeni", description: "Early morning flight to Jomsom. Trek to the medieval village of Kagbeni.", altitude: "2,810m", accommodation: "Teahouse" },
      { day: 4, title: "Kagbeni to Chele", description: "Enter the restricted area and trek through the Kali Gandaki gorge.", altitude: "3,050m", accommodation: "Teahouse" },
      { day: 5, title: "Chele to Syangboche", description: "Cross high passes with views of Annapurna and Nilgiri.", altitude: "3,475m", accommodation: "Teahouse" },
      { day: 6, title: "Syangboche to Ghami", description: "Trek through a dramatic landscape of eroded cliffs and mani walls.", altitude: "3,520m", accommodation: "Teahouse" },
      { day: 7, title: "Ghami to Tsarang", description: "Visit the impressive Tsarang Monastery and dzong (fortress).", altitude: "3,560m", accommodation: "Teahouse" },
      { day: 8, title: "Tsarang to Lo Manthang", description: "Arrive at the walled capital of the former Kingdom of Lo.", altitude: "3,840m", accommodation: "Teahouse" },
      { day: 9, title: "Explore Lo Manthang", description: "Full day exploring the ancient city, monasteries, and royal palace.", altitude: "3,840m", accommodation: "Teahouse" },
      { day: 10, title: "Lo Manthang to Dhi", description: "Alternative return route through the eastern valley.", altitude: "3,400m", accommodation: "Teahouse" },
      { day: 11, title: "Dhi to Yara", description: "Trek through stunning red cliff formations of Dhakmar.", altitude: "3,650m", accommodation: "Teahouse" },
      { day: 12, title: "Yara to Ghami", description: "Return to Ghami via the old trade route.", altitude: "3,520m", accommodation: "Teahouse" },
      { day: 13, title: "Ghami to Jomsom", description: "Trek back to Jomsom through familiar terrain.", altitude: "2,720m", accommodation: "Teahouse" },
      { day: 14, title: "Fly to Pokhara, Fly to Kathmandu", description: "Morning flight to Pokhara and onward to Kathmandu. Departure transfer." }
    ],
    image: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=800&h=600&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=400&h=300&fit=crop&auto=format"
    ]
  },
  {
    id: "pkg-005",
    slug: "manaslu-circuit",
    name: "Manaslu Circuit",
    region: "Manaslu",
    category: "Trekking",
    duration: "16 Days",
    days: 16,
    difficulty: "Challenging",
    maxAltitude: "5,106m (16,752ft)",
    groupSize: "2-12",
    price: 1750,
    originalPrice: 2100,
    rating: 4.8,
    reviews: 312,
    description: "The Manaslu Circuit is often called the new Annapurna Circuit, offering pristine wilderness, challenging high passes, and rich Tibetan culture without the crowds. This restricted area trek circles the world's eighth-highest peak and crosses the dramatic Larkya La Pass.",
    highlights: [
      "Cross the spectacular Larkya La Pass (5,106m)",
      "Circle the world's eighth-highest peak (8,163m)",
      "Experience remote Tibetan Buddhist culture",
      "Trek through untouched wilderness",
      "Visit the ancient town of Sama Gaon",
      "See stunning views of Manaslu and surrounding peaks",
      "Less crowded than Annapurna and Everest regions"
    ],
    includes: [
      "Airport transfers",
      "All accommodations",
      "All meals during trek",
      "Licensed trekking guide",
      "Porter service",
      "Manaslu restricted area permit",
      "MCAP permit",
      "TIMS card"
    ],
    excludes: [
      "International airfare",
      "Nepal visa fee",
      "Travel insurance",
      "Personal expenses",
      "Tips for guide and porters"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Kathmandu", description: "Airport pickup and hotel transfer. Trek briefing.", accommodation: "Hotel in Kathmandu" },
      { day: 2, title: "Drive to Soti Khola", description: "Long drive along rough mountain roads to the trailhead.", altitude: "700m", accommodation: "Guesthouse" },
      { day: 3, title: "Soti Khola to Machha Khola", description: "Trek through subtropical forests along the Budhi Gandaki River.", altitude: "930m", accommodation: "Teahouse" },
      { day: 4, title: "Machha Khola to Jagat", description: "Continue through narrow gorges with waterfalls and suspension bridges.", altitude: "1,340m", accommodation: "Teahouse" },
      { day: 5, title: "Jagat to Deng", description: "Enter the restricted area and trek through a dramatic valley.", altitude: "1,804m", accommodation: "Teahouse" },
      { day: 6, title: "Deng to Namrung", description: "Climb through forests with views of Manaslu North opening up.", altitude: "2,660m", accommodation: "Teahouse" },
      { day: 7, title: "Namrung to Samagaon", description: "Trek to the base of Manaslu with incredible mountain views.", altitude: "3,530m", accommodation: "Teahouse" },
      { day: 8, title: "Acclimatization Day in Samagaon", description: "Rest day with optional hike to Birendra Lake or Pungyen Gompa.", altitude: "3,530m", accommodation: "Teahouse" },
      { day: 9, title: "Samagaon to Samdo", description: "Trek through high-altitude pastures to the Tibetan border village.", altitude: "3,860m", accommodation: "Teahouse" },
      { day: 10, title: "Samdo to Dharamsala", description: "Trek to the base camp of Larkya La Pass.", altitude: "4,460m", accommodation: "Teahouse" },
      { day: 11, title: "Cross Larkya La to Bimthang", description: "Early start to cross the dramatic Larkya La Pass (5,106m). Long descent to Bimthang.", altitude: "5,106m", accommodation: "Teahouse" },
      { day: 12, title: "Bimthang to Dharapani", description: "Descend through beautiful forests with views of Manaslu and Himlung Himal.", altitude: "1,860m", accommodation: "Teahouse" },
      { day: 13, title: "Dharapani to Besisahar", description: "Trek to the road head at Besisahar.", altitude: "760m", accommodation: "Guesthouse" },
      { day: 14, title: "Drive to Kathmandu", description: "Long drive back to Kathmandu. Farewell dinner.", accommodation: "Hotel in Kathmandu" },
      { day: 15, title: "Free Day in Kathmandu", description: "Free day for shopping and sightseeing.", accommodation: "Hotel in Kathmandu" },
      { day: 16, title: "Departure Day", description: "Transfer to airport for onward journey." }
    ],
    image: "https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=800&h=600&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=300&fit=crop&auto=format"
    ]
  },
  {
    id: "pkg-006",
    slug: "island-peak-climbing",
    name: "Island Peak Climbing",
    region: "Everest",
    category: "Peak Climbing",
    duration: "18 Days",
    days: 18,
    difficulty: "Strenuous",
    maxAltitude: "6,189m (20,305ft)",
    groupSize: "2-8",
    price: 2800,
    originalPrice: 3200,
    rating: 4.9,
    reviews: 156,
    description: "Island Peak (Imja Tse) is one of Nepal's most popular trekking peaks, offering an achievable summit for fit trekkers with basic mountaineering skills. Combining the classic Everest Base Camp trek with a technical summit attempt, this adventure provides the ultimate Himalayan experience.",
    highlights: [
      "Summit a 6,000m+ Himalayan peak",
      "Combine Everest Base Camp trek with peak climbing",
      "Learn basic mountaineering techniques",
      "Experience technical climbing on ice and snow",
      "Incredible summit views of Everest, Lhotse, and Makalu",
      "Professional climbing guides and equipment",
      "Internationally recognized climbing achievement"
    ],
    includes: [
      "Airport transfers",
      "Domestic flights (Kathmandu-Lukla-Kathmandu)",
      "All accommodations",
      "All meals during trek and climb",
      "Climbing guide (UIAGM certified)",
      "Climbing permit and national park fees",
      "Technical climbing equipment",
      "Fixed ropes and safety gear",
      "Porter service",
      "Trekking guide for approach trek"
    ],
    excludes: [
      "International airfare",
      "Nepal visa fee",
      "Travel insurance (must cover climbing)",
      "Personal climbing gear",
      "Personal expenses",
      "Tips for guides and porters"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Kathmandu", description: "Airport pickup and hotel transfer. Gear check and climbing briefing.", accommodation: "Hotel in Kathmandu" },
      { day: 2, title: "Fly to Lukla, Trek to Phakding", description: "Scenic flight to Lukla. Begin trekking to Phakding.", altitude: "2,610m", accommodation: "Teahouse" },
      { day: 3, title: "Phakding to Namche Bazaar", description: "Trek to Namche Bazaar, gateway to Everest.", altitude: "3,440m", accommodation: "Teahouse" },
      { day: 4, title: "Acclimatization in Namche", description: "Rest day with optional hikes for acclimatization.", altitude: "3,440m", accommodation: "Teahouse" },
      { day: 5, title: "Namche to Tengboche", description: "Trek to Tengboche with views of Ama Dablam.", altitude: "3,870m", accommodation: "Teahouse" },
      { day: 6, title: "Tengboche to Dingboche", description: "Continue to Dingboche in the Imja Valley.", altitude: "4,410m", accommodation: "Teahouse" },
      { day: 7, title: "Acclimatization in Dingboche", description: "Hike to Nangkartshang Peak for acclimatization.", altitude: "4,410m", accommodation: "Teahouse" },
      { day: 8, title: "Dingboche to Lobuche", description: "Trek to Lobuche along the Khumbu Glacier.", altitude: "4,940m", accommodation: "Teahouse" },
      { day: 9, title: "Lobuche to Gorak Shep to EBC", description: "Trek to Everest Base Camp.", altitude: "5,364m", accommodation: "Teahouse" },
      { day: 10, title: "Kala Patthar Sunrise, Trek to Chukhung", description: "Sunrise from Kala Patthar. Descend to Chukhung.", altitude: "5,545m", accommodation: "Teahouse" },
      { day: 11, title: "Chukhung to Island Peak Base Camp", description: "Trek to base camp and begin climbing preparation.", altitude: "5,087m", accommodation: "Tent" },
      { day: 12, title: "Climbing Training and Acclimatization", description: "Practice climbing techniques: crampons, ice axes, fixed ropes.", altitude: "5,087m", accommodation: "Tent" },
      { day: 13, title: "Base Camp to High Camp", description: "Ascend to high camp on the mountain.", altitude: "5,600m", accommodation: "Tent" },
      { day: 14, title: "Summit Day", description: "Early morning summit attempt. Reach the top of Island Peak (6,189m).", altitude: "6,189m", accommodation: "Tent" },
      { day: 15, title: "Descend to Chukhung", description: "Descend to Chukhung after successful summit.", altitude: "4,410m", accommodation: "Teahouse" },
      { day: 16, title: "Chukhung to Namche Bazaar", description: "Long descent to Namche Bazaar.", altitude: "3,440m", accommodation: "Teahouse" },
      { day: 17, title: "Namche to Lukla", description: "Final trek day to Lukla.", altitude: "2,860m", accommodation: "Teahouse" },
      { day: 18, title: "Fly to Kathmandu, Departure", description: "Flight back to Kathmandu. Departure transfer." }
    ],
    image: "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800&h=600&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=400&h=300&fit=crop&auto=format"
    ]
  },
  {
    id: "pkg-007",
    slug: "everest-helicopter-tour",
    name: "Everest Helicopter Tour",
    region: "Everest",
    category: "Helicopter",
    duration: "1 Day",
    days: 1,
    difficulty: "Easy",
    maxAltitude: "5,545m (18,192ft)",
    groupSize: "1-5",
    price: 999,
    originalPrice: 1200,
    rating: 4.8,
    reviews: 423,
    description: "Experience the ultimate Himalayan adventure with a helicopter flight to Everest Base Camp. This exclusive tour offers breathtaking aerial views of the world's highest peaks and a landing at Kala Patthar or Everest Base Camp. Perfect for those with limited time or unable to trek.",
    highlights: [
      "Aerial views of Mount Everest and surrounding peaks",
      "Land at Kala Patthar (5,545m) or Everest Base Camp",
      "Scenic flight over the Khumbu region",
      "Champagne breakfast at Everest View Hotel",
      "Expert pilot with high-altitude experience",
      "Small group size for personalized experience",
      "Complete the trip in a single day"
    ],
    includes: [
      "Hotel pickup and drop-off in Kathmandu",
      "Domestic flight to Lukla (if needed)",
      "Helicopter tour with experienced pilot",
      "Landing at Kala Patthar or Everest Base Camp",
      "Champagne breakfast at Everest View Hotel",
      "All permits and fees",
      "Emergency oxygen on board",
      "Certificate of achievement"
    ],
    excludes: [
      "International airfare",
      "Nepal visa fee",
      "Travel insurance",
      "Personal expenses",
      "Tips"
    ],
    itinerary: [
      { day: 1, title: "Everest Helicopter Tour", description: "Early morning pickup from hotel in Kathmandu. Flight to Lukla or directly to Everest region. Helicopter tour with landing at Kala Patthar or Everest Base Camp. Champagne breakfast with panoramic mountain views. Return flight to Kathmandu with aerial views of the Himalayas. Drop off at hotel." }
    ],
    image: "https://images.unsplash.com/photo-1478827536114-da961b7f86d2?w=800&h=600&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1478827536114-da961b7f86d2?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1478827536114-da961b7f86d2?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1478827536114-da961b7f86d2?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop&auto=format"
    ]
  },
  {
    id: "pkg-008",
    slug: "kathmandu-valley-cultural-tour",
    name: "Kathmandu Valley Cultural Tour",
    region: "Everest",
    category: "Cultural",
    duration: "7 Days",
    days: 7,
    difficulty: "Easy",
    maxAltitude: "1,400m (4,593ft)",
    groupSize: "2-15",
    price: 650,
    originalPrice: 800,
    rating: 4.7,
    reviews: 278,
    description: "Discover the cultural treasures of the Kathmandu Valley, a UNESCO World Heritage Site. Explore ancient temples, palaces, and stupas while experiencing the vibrant traditions of Nepal. This comprehensive tour covers all major cultural sites with expert guides.",
    highlights: [
      "Visit all seven UNESCO World Heritage Sites",
      "Explore the medieval city of Bhaktapur",
      "Witness traditional Newari architecture",
      "Experience living Hindu and Buddhist traditions",
      "Watch traditional crafts and rituals",
      "Sunrise view from Nagarkot",
      "Authentic Nepali cuisine experiences"
    ],
    includes: [
      "Airport transfers",
      "All accommodations",
      "Daily breakfast",
      "Expert cultural guide",
      "All entrance fees and permits",
      "Private vehicle for all transfers",
      "Farewell dinner with cultural show"
    ],
    excludes: [
      "International airfare",
      "Nepal visa fee",
      "Travel insurance",
      "Lunch and dinner (except farewell dinner)",
      "Personal expenses",
      "Tips"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Kathmandu", description: "Airport pickup and transfer to heritage hotel in Patan. Welcome dinner.", accommodation: "Heritage Hotel in Patan" },
      { day: 2, title: "Kathmandu Durbar Square & Swayambhunath", description: "Explore Kathmandu Durbar Square and the ancient monkey temple Swayambhunath.", accommodation: "Heritage Hotel in Patan" },
      { day: 3, title: "Patan & Boudhanath", description: "Tour Patan Durbar Square and the great stupa of Boudhanath.", accommodation: "Heritage Hotel in Patan" },
      { day: 4, title: "Bhaktapur", description: "Full day in the medieval city of Bhaktapur, exploring pottery squares and temples.", accommodation: "Heritage Hotel in Patan" },
      { day: 5, title: "Pashupatinath & Nagarkot", description: "Visit the sacred Pashupatinath Temple and drive to Nagarkot for sunset views.", accommodation: "Resort in Nagarkot" },
      { day: 6, title: "Nagarkot Sunrise & Changu Narayan", description: "Wake for sunrise over the Himalayas. Visit Changu Narayan Temple, the oldest in the valley.", accommodation: "Heritage Hotel in Patan" },
      { day: 7, title: "Departure Day", description: "Free morning for shopping. Transfer to airport." }
    ],
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1553856622-d1b350d58a7f?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1553856622-d1b350d58a7f?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1553856622-d1b350d58a7f?w=400&h=300&fit=crop&auto=format"
    ]
  },
  {
    id: "pkg-009",
    slug: "chitwan-jungle-safari",
    name: "Chitwan Jungle Safari",
    region: "Annapurna",
    category: "Safari",
    duration: "4 Days",
    days: 4,
    difficulty: "Easy",
    maxAltitude: "150m (492ft)",
    groupSize: "2-12",
    price: 350,
    originalPrice: 450,
    rating: 4.6,
    reviews: 534,
    description: "Experience the wild side of Nepal with a jungle safari in Chitwan National Park, a UNESCO World Heritage Site. Search for Bengal tigers, one-horned rhinoceros, and elephants in their natural habitat. Enjoy canoe rides, nature walks, and authentic Tharu cultural performances.",
    highlights: [
      "Search for Bengal tigers and one-horned rhinoceros",
      "Jungle safari in 4x4 vehicles",
      "Canoe ride on the Rapti River",
      "Visit the elephant breeding center",
      "Guided nature walks with naturalists",
      "Traditional Tharu cultural dance performance",
      "Bird watching in over 500 species"
    ],
    includes: [
      "Airport/bus station transfers",
      "All accommodations",
      "All meals",
      "Jungle activities (safari, canoe, nature walk)",
      "National Park entry fees",
      "Experienced naturalist guide",
      "Cultural program",
      "Elephant bathing experience"
    ],
    excludes: [
      "Transportation to Chitwan",
      "Personal expenses",
      "Tips",
      "Alcoholic beverages",
      "Optional activities"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Chitwan", description: "Arrive in Chitwan and check into jungle lodge. Afternoon canoe ride and nature walk. Evening Tharu cultural program.", accommodation: "Jungle Lodge" },
      { day: 2, title: "Full Day Jungle Safari", description: "Full day jungle activities: morning jeep safari, visit elephant breeding center, bird watching, and nature walk.", accommodation: "Jungle Lodge" },
      { day: 3, title: "Jungle Safari & Tharu Village", description: "Morning jungle activities. Afternoon visit to Tharu village and museum. Sunset by the river.", accommodation: "Jungle Lodge" },
      { day: 4, title: "Departure Day", description: "Early morning bird watching. Breakfast and departure." }
    ],
    image: "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=800&h=600&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=400&h=300&fit=crop&auto=format"
    ]
  },
  {
    id: "pkg-010",
    slug: "nepal-luxury-experience",
    name: "Nepal Luxury Experience",
    region: "Everest",
    category: "Luxury",
    duration: "12 Days",
    days: 12,
    difficulty: "Easy",
    maxAltitude: "3,880m (12,730ft)",
    groupSize: "2-8",
    price: 5500,
    originalPrice: 6500,
    rating: 4.9,
    reviews: 89,
    description: "Experience Nepal in ultimate comfort and style. This luxury itinerary combines the best of Nepal's cultural heritage and mountain scenery with five-star accommodations, private transfers, helicopter flights, and exclusive experiences. Perfect for discerning travelers who want the Himalayan experience without sacrificing comfort.",
    highlights: [
      "Stay at luxury heritage hotels and jungle lodges",
      "Private helicopter flight to Everest Base Camp",
      "Exclusive cultural experiences and private tours",
      "Personal butler service at select properties",
      "Gourmet dining experiences with local cuisine",
      "Private guided tours with expert historians",
      "Spa treatments and wellness experiences"
    ],
    includes: [
      "VIP airport meet and greet",
      "All luxury accommodations",
      "All meals at luxury restaurants",
      "Private helicopter flight to Everest",
      "Private vehicle for all transfers",
      "Personal guide and driver",
      "All entrance fees and permits",
      "Spa treatments",
      "Farewell gala dinner"
    ],
    excludes: [
      "International airfare",
      "Nepal visa fee",
      "Travel insurance",
      "Personal shopping",
      "Premium alcoholic beverages",
      "Optional experiences"
    ],
    itinerary: [
      { day: 1, title: "VIP Arrival in Kathmandu", description: "VIP airport meet and greet. Private transfer to Dwarika's Hotel. Welcome champagne and spa treatment.", accommodation: "Dwarika's Hotel" },
      { day: 2, title: "Private Cultural Tour", description: "Private guided tour of Kathmandu's UNESCO sites with a historian. Lunch at a heritage restaurant.", accommodation: "Dwarika's Hotel" },
      { day: 3, title: "Bhaktapur & Nagarkot", description: "Private tour of Bhaktapur. Drive to Nagarkot for sunset. Overnight at luxury resort.", accommodation: "Club Himalaya Nagarkot" },
      { day: 4, title: "Helicopter to Everest Base Camp", description: "Early morning helicopter flight to Everest Base Camp. Landing at Kala Patthar. Breakfast with Everest views.", accommodation: "Dwarika's Hotel" },
      { day: 5, title: "Patan & Boudhanath", description: "Private tour of Patan and Boudhanath. Exclusive monastery visit. Dinner at a rooftop restaurant.", accommodation: "Dwarika's Hotel" },
      { day: 6, title: "Fly to Pokhara", description: "Private flight to Pokhara. Check into lakeside luxury resort. Sunset boat ride.", accommodation: "Tiger Mountain Pokhara" },
      { day: 7, title: "Pokhara Sightseeing", description: "Sunrise from Sarangkot. Visit World Peace Pagoda, Devi's Fall, and Gupteshwor Cave. Spa afternoon.", accommodation: "Tiger Mountain Pokhara" },
      { day: 8, title: "Pokhara Leisure Day", description: "Free day for optional activities: paragliding, ultra-light flight, or spa treatments.", accommodation: "Tiger Mountain Pokhara" },
      { day: 9, title: "Fly to Chitwan", description: "Flight to Chitwan. Check into luxury jungle lodge. Afternoon nature activities.", accommodation: "Tiger Tops" },
      { day: 10, title: "Chitwan Luxury Safari", description: "Exclusive jeep safari with expert naturalist. Private Tharu cultural experience. Bush dinner.", accommodation: "Tiger Tops" },
      { day: 11, title: "Chitwan to Kathmandu", description: "Morning activities. Fly back to Kathmandu. Farewell gala dinner at a premier restaurant.", accommodation: "Dwarika's Hotel" },
      { day: 12, title: "VIP Departure", description: "Free morning for private shopping. VIP airport transfer." }
    ],
    image: "https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=800&h=600&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=400&h=300&fit=crop&auto=format"
    ]
  },
  {
    id: "pkg-011",
    slug: "family-nepal-adventure",
    name: "Family Nepal Adventure",
    region: "Langtang",
    category: "Family",
    duration: "10 Days",
    days: 10,
    difficulty: "Easy",
    maxAltitude: "3,200m (10,499ft)",
    groupSize: "4-10",
    price: 1200,
    originalPrice: 1500,
    rating: 4.8,
    reviews: 167,
    description: "A carefully designed family adventure that combines easy trekking, cultural experiences, and wildlife encounters. Suitable for children aged 8 and above, this itinerary offers a perfect balance of activity and relaxation, with comfortable accommodations and child-friendly guides.",
    highlights: [
      "Easy, child-friendly trekking routes",
      "Interactive cultural workshops for families",
      "Wildlife spotting in Chitwan",
      "Family-friendly accommodations throughout",
      "Expert guides trained in family travel",
      "Educational experiences about Nepali culture",
      "Safe and comfortable for all ages"
    ],
    includes: [
      "Airport transfers",
      "All family-friendly accommodations",
      "All meals",
      "Family-friendly guide",
      "Porter service for trek",
      "All activities and entrance fees",
      "Cultural workshop materials",
      "First aid and emergency support"
    ],
    excludes: [
      "International airfare",
      "Nepal visa fee",
      "Travel insurance",
      "Personal expenses",
      "Optional activities"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Kathmandu", description: "Airport pickup and family-friendly hotel. Welcome meeting and orientation.", accommodation: "Family Hotel in Kathmandu" },
      { day: 2, title: "Kathmandu Family Sightseeing", description: "Interactive tour of Kathmandu Durbar Square. Family cooking class.", accommodation: "Family Hotel in Kathmandu" },
      { day: 3, title: "Drive to Chitwan", description: "Scenic drive to Chitwan. Afternoon elephant bathing and nature walk.", accommodation: "Family Jungle Lodge" },
      { day: 4, title: "Chitwan Family Safari", description: "Jeep safari in search of rhinos and tigers. Canoe ride. Cultural program.", accommodation: "Family Jungle Lodge" },
      { day: 5, title: "Chitwan to Pokhara", description: "Drive to Pokhara. Afternoon boating on Phewa Lake.", accommodation: "Family Hotel in Pokhara" },
      { day: 6, title: "Pokhara Family Activities", description: "Sunrise from Sarangkot. Visit Davis Falls, Gupteshwor Cave. Paragliding for adventurous family members.", accommodation: "Family Hotel in Pokhara" },
      { day: 7, title: "Drive to Syabrubesi", description: "Scenic drive to Langtang region trailhead.", accommodation: "Family Guesthouse" },
      { day: 8, title: "Easy Family Trek", description: "Gentle trek through villages and forests. Meet local families. Picnic lunch.", altitude: "2,000m", accommodation: "Family Teahouse" },
      { day: 9, title: "Trek and Return", description: "Morning exploration. Return to Kathmandu with stops at scenic viewpoints.", accommodation: "Family Hotel in Kathmandu" },
      { day: 10, title: "Departure Day", description: "Free morning. Transfer to airport." }
    ],
    image: "https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=800&h=600&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=400&h=300&fit=crop&auto=format"
    ]
  },
  {
    id: "pkg-012",
    slug: "photography-expedition",
    name: "Photography Expedition",
    region: "Annapurna",
    category: "Photography",
    duration: "14 Days",
    days: 14,
    difficulty: "Moderate",
    maxAltitude: "4,200m (13,780ft)",
    groupSize: "4-8",
    price: 2100,
    originalPrice: 2500,
    rating: 4.9,
    reviews: 112,
    description: "A specialized photography expedition designed for serious photographers seeking to capture the beauty of the Himalayas. Led by an experienced mountain photographer, this trip focuses on prime locations, optimal lighting conditions, and technical guidance to ensure you return with stunning images.",
    highlights: [
      "Led by a professional mountain photographer",
      "Optimized itineraries for golden hour shooting",
      "Access to restricted photography locations",
      "Technical workshops on mountain photography",
      "Small group size for personal attention",
      "Post-processing sessions",
      "Portfolio review and critique sessions"
    ],
    includes: [
      "Airport transfers",
      "All accommodations",
      "All meals",
      "Professional photography guide",
      "Porter service",
      "All permits and fees",
      "Post-processing workshops",
      "Photography portfolio review"
    ],
    excludes: [
      "International airfare",
      "Nepal visa fee",
      "Travel insurance",
      "Camera equipment",
      "Personal expenses",
      "Tips"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Kathmandu", description: "Airport pickup. Evening photography orientation and gear check.", accommodation: "Hotel in Kathmandu" },
      { day: 2, title: "Kathmandu Photo Walk", description: "Dawn shoot at Boudhanath Stupa. Afternoon shoot at Pashupatinath. Evening post-processing session.", accommodation: "Hotel in Kathmandu" },
      { day: 3, title: "Fly to Pokhara", description: "Morning flight. Afternoon shoot of Phewa Lake and Annapurna reflections. Sunset shoot at World Peace Pagoda.", accommodation: "Hotel in Pokhara" },
      { day: 4, title: "Sarangkot Sunrise & Drive to Ghandruk", description: "Pre-dawn shoot at Sarangkot for Annapurna sunrise. Drive to Ghandruk.", accommodation: "Teahouse in Ghandruk" },
      { day: 5, title: "Ghandruk to Ghorepani", description: "Trek through villages and forests. Golden hour shoot of terraced hills.", accommodation: "Teahouse in Ghorepani" },
      { day: 6, title: "Poon Hill Sunrise", description: "Pre-dawn hike to Poon Hill (3,210m) for sunrise photography. Afternoon explore villages.", accommodation: "Teahouse in Ghorepani" },
      { day: 7, title: "Ghorepani to Tadapani", description: "Trek through rhododendron forests. Afternoon village portraits.", accommodation: "Teahouse in Tadapani" },
      { day: 8, title: "Tadapani to Chhomrong", description: "Descend to the Modi Khola valley. Photography of traditional Gurung villages.", accommodation: "Teahouse in Chhomrong" },
      { day: 9, title: "Chhomrong to Sinuwa", description: "Trek through bamboo forests. Afternoon wildlife and macro photography.", accommodation: "Teahouse in Sinuwa" },
      { day: 10, title: "Sinuwa to Deurali", description: "Enter the Annapurna Sanctuary. Dramatic mountain photography.", accommodation: "Teahouse in Deurali" },
      { day: 11, title: "Deurali to Annapurna Base Camp", description: "Trek to ABC. Afternoon and sunset photography of Annapurna I.", accommodation: "Teahouse at ABC" },
      { day: 12, title: "Annapurna Base Camp Sunrise", description: "Pre-dawn shoot for ABC sunrise. Morning exploration. Descend to Bamboo.", accommodation: "Teahouse in Bamboo" },
      { day: 13, title: "Bamboo to Nayapul, Drive to Pokhara", description: "Final trek day. Drive to Pokhara. Evening portfolio review session.", accommodation: "Hotel in Pokhara" },
      { day: 14, title: "Pokhara to Kathmandu, Departure", description: "Flight to Kathmandu. Departure transfer." }
    ],
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=400&h=300&fit=crop&auto=format"
    ]
  }
];
