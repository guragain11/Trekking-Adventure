export interface FAQ {
  id: string;
  category: "Booking" | "Trekking" | "Permits" | "Weather" | "Safety" | "General";
  question: string;
  answer: string;
}

export const FAQS: FAQ[] = [
  {
    id: "faq-001",
    category: "Booking",
    question: "How do I book a trip with Himalayan Expeditions?",
    answer: "Booking is simple! Browse our packages, select your preferred trip, and click 'Book Now'. You can also contact us directly via email or phone. We require a 30% deposit to secure your booking, with the remaining balance due 30 days before departure. We accept credit cards, bank transfers, and PayPal."
  },
  {
    id: "faq-002",
    category: "Booking",
    question: "What is your cancellation policy?",
    answer: "We understand plans can change. Cancellations made 60+ days before departure receive a full refund minus a $100 processing fee. Cancellations 30-59 days out receive a 50% refund. Within 30 days, no refund is available. We strongly recommend travel insurance to protect your investment."
  },
  {
    id: "faq-003",
    category: "Trekking",
    question: "How fit do I need to be for a trek?",
    answer: "Fitness requirements vary by trek difficulty. Easy treks require basic fitness - you should be able to walk 4-5 hours a day on uneven terrain. Moderate treks require regular exercise and some hiking experience. Challenging and strenuous treks require excellent fitness, cardiovascular endurance, and previous high-altitude trekking experience. We recommend training at least 2-3 months before your trek."
  },
  {
    id: "faq-004",
    category: "Trekking",
    question: "What should I pack for a Himalayan trek?",
    answer: "Essential items include layered clothing (base layers, fleece, down jacket, waterproof shell), sturdy trekking boots, sleeping bag, daypack, sun protection, trekking poles, headlamp, and personal toiletries. We provide a detailed packing list upon booking. Most gear can be rented in Kathmandu if needed."
  },
  {
    id: "faq-005",
    category: "Trekking",
    question: "What is altitude sickness and how can I prevent it?",
    answer: "Altitude sickness (AMS) occurs when ascending too quickly without proper acclimatization. Symptoms include headache, nausea, and fatigue. Prevention includes: ascending gradually, taking acclimatization days, staying hydrated, avoiding alcohol, and listening to your body. Our itineraries are designed with proper acclimatization, and our guides are trained to recognize and manage AMS."
  },
  {
    id: "faq-006",
    category: "Permits",
    question: "What permits do I need for trekking in Nepal?",
    answer: "Most treks require a TIMS (Trekkers' Information Management System) card and national park or conservation area permits. Restricted areas like Upper Mustang and Manaslu require additional special permits. All permit fees are included in our trek prices. We handle all permit arrangements - you just need to bring passport-sized photos and your passport copy."
  },
  {
    id: "faq-007",
    category: "Permits",
    question: "Do I need a visa to visit Nepal?",
    answer: "Most nationalities can obtain a tourist visa on arrival at Tribhuvan International Airport or at land border crossings. Visa fees are $30 for 15 days, $50 for 30 days, and $125 for 90 days. Indian citizens do not need a visa. We recommend checking the latest visa requirements for your nationality before travel."
  },
  {
    id: "faq-008",
    category: "Weather",
    question: "When is the best time to visit Nepal?",
    answer: "The best trekking seasons are autumn (October-November) and spring (March-May). Autumn offers clear skies, stable weather, and excellent mountain views. Spring brings warmer temperatures and rhododendron blooms. Winter treks are possible at lower altitudes but can be very cold. Monsoon season (June-September) is generally avoided due to rain and leeches, though rain shadow areas like Upper Mustang are accessible."
  },
  {
    id: "faq-009",
    category: "Weather",
    question: "What happens if weather affects my trek?",
    answer: "Mountain weather can be unpredictable. If weather prevents safe trekking, our guides will adjust the itinerary or wait for conditions to improve. In extreme cases, helicopter evacuation can be arranged (covered by travel insurance). We monitor weather conditions closely and make safety-based decisions. Flexibility is key in the mountains."
  },
  {
    id: "faq-010",
    category: "Safety",
    question: "How safe is trekking in Nepal?",
    answer: "Nepal is generally very safe for trekkers. Our guides are trained in wilderness first aid and emergency procedures. We carry first aid kits, communication devices, and satellite phones on all treks. We have established relationships with rescue services and hospitals. Following guide instructions and maintaining good health significantly reduces risks."
  },
  {
    id: "faq-011",
    category: "Safety",
    question: "Do I need travel insurance?",
    answer: "Yes, travel insurance is mandatory for all our trips. Your policy must cover high-altitude trekking up to your trek's maximum altitude, emergency helicopter evacuation, and trip cancellation. We can recommend insurance providers that offer appropriate coverage for Himalayan adventures."
  },
  {
    id: "faq-012",
    category: "General",
    question: "What is the accommodation like during treks?",
    answer: "Accommodation varies by region and altitude. In cities, we use comfortable hotels. During treks, we stay in teahouses - basic but clean mountain lodges with private or shared rooms. Higher altitude teahouses are more basic. Our luxury tours feature premium lodges with modern amenities. All accommodations are selected for cleanliness, comfort, and hospitality."
  }
];
