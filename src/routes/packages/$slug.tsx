// @ts-nocheck
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Star,
  Clock,
  Users,
  Mountain,
  MapPin,
  Calendar,
  Check,
  X,
  Compass,
  Shield,
  Headphones,
  CreditCard,
  RefreshCw,
  ArrowRight,
  Tent,
  Backpack,
  Heart,
  Share2,
  Mail,
  Phone,
} from "lucide-react";

import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Img } from "@/components/Img";
import { PACKAGES } from "@/data/packages";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/packages/$slug")({
  component: PackageDetailPage,
});

const ease = [0.22, 1, 0.36, 1];

const EQUIPMENT_CHECKLIST = [
  "Down jacket",
  "Thermal base layers",
  "Waterproof shell jacket",
  "Trekking pants (2-3 pairs)",
  "Trekking boots (broken-in)",
  "Camp sandals",
  "Warm hat & sun hat",
  "UV sunglasses",
  "Trekking poles",
  "Daypack (30-40L)",
  "Sleeping bag (-15°C rated)",
  "Headlamp + spare batteries",
  "Water bottle + purification",
  "Sunscreen SPF 50+",
  "Lip balm with SPF",
  "First aid kit",
];

function PackageDetailPage() {
  const { slug } = useParams({ from: "/packages/$slug" });
  const pkg = PACKAGES.find((p) => p.slug === slug);

  const [travelDate, setTravelDate] = useState("");
  const [groupSize, setGroupSize] = useState(2);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const relatedPackages = useMemo(() => {
    if (!pkg) return [];
    return PACKAGES.filter((p) => p.region === pkg.region && p.slug !== pkg.slug).slice(0, 6);
  }, [pkg]);

  const averageRating = pkg ? pkg.rating : 0;
  const ratingBreakdown = useMemo(() => {
    if (!pkg) return [];
    const total = pkg.reviews;
    return [
      { stars: 5, count: Math.round(total * 0.78), pct: 78 },
      { stars: 4, count: Math.round(total * 0.15), pct: 15 },
      { stars: 3, count: Math.round(total * 0.04), pct: 4 },
      { stars: 2, count: Math.round(total * 0.02), pct: 2 },
      { stars: 1, count: Math.round(total * 0.01), pct: 1 },
    ];
  }, [pkg]);

  if (!pkg) {
    return (
      <div className="min-h-screen bg-[#FAFAFA]">
        <Nav />
        <div className="flex min-h-[70vh] flex-col items-center justify-center px-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F3F4F6]">
            <Mountain className="h-8 w-8 text-[#9CA3AF]" />
          </div>
          <h1 className="mt-6 font-display text-[24px] font-semibold text-[#111827]">Package Not Found</h1>
          <p className="mt-3 max-w-md text-center text-[14px] text-[#6B7280]">
            The package you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/packages"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0F766E] px-6 py-3 text-[13px] font-medium text-white transition-colors hover:bg-[#0D6B63]"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            Back to Packages
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const discount = pkg.originalPrice > pkg.price
    ? Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)
    : 0;

  const difficultyColor = (d: string) => {
    switch (d) {
      case "Easy": return "bg-emerald-50 text-emerald-600";
      case "Moderate": return "bg-[#0F766E]/10 text-[#0F766E]";
      case "Challenging": return "bg-[#D4A574]/10 text-[#D4A574]";
      case "Strenuous": return "bg-red-50 text-red-500";
      default: return "bg-[#F3F4F6] text-[#6B7280]";
    }
  };

  const galleryImages = pkg.gallery && pkg.gallery.length > 0
    ? pkg.gallery
    : [pkg.image, pkg.image, pkg.image];

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0C1222] pt-[104px] pb-16 sm:pt-[136px] sm:pb-20">
        <div className="absolute inset-0">
          <Img
            src={pkg.image}
            alt={pkg.name}
            aspectRatio="aspect-auto"
            rounded="rounded-none"
            index={pkg.id.charCodeAt(pkg.id.length - 1)}
            className="h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C1222] via-[#0C1222]/70 to-[#0C1222]/40" />
        </div>
        <div className="absolute left-1/4 top-20 h-72 w-72 rounded-full bg-[#0F766E]/5 blur-[120px]" />
        <div className="absolute bottom-10 right-1/4 h-96 w-96 rounded-full bg-[#D4A574]/5 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease }}
            className="mb-8 flex items-center gap-2 text-[13px] text-white/40"
          >
            <Link to="/" className="transition-colors hover:text-white/70">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/packages" className="transition-colors hover:text-white/70">Packages</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white/70">{pkg.name}</span>
          </motion.nav>

          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="rounded-full bg-white/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/80 backdrop-blur-sm">
                  {pkg.region}
                </span>
                <span className="rounded-full bg-white/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/80 backdrop-blur-sm">
                  {pkg.category}
                </span>
                <span className={`rounded-full px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm ${difficultyColor(pkg.difficulty)}`}>
                  {pkg.difficulty}
                </span>
              </div>

              <h1 className="font-display text-[2rem] font-medium tracking-tight text-white sm:text-[2.5rem] lg:text-[3rem]">
                {pkg.name}
              </h1>

              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/50">
                {pkg.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(averageRating)
                            ? "fill-[#D4A574] text-[#D4A574]"
                            : "text-white/20"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[14px] font-semibold text-white">{averageRating}</span>
                  <span className="text-[13px] text-white/40">({pkg.reviews.toLocaleString()} reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-white/50">
                  <Clock className="h-4 w-4" />
                  {pkg.duration}
                </div>
                <div className="flex items-center gap-2 text-[13px] text-white/50">
                  <Mountain className="h-4 w-4" />
                  Max {pkg.maxAltitude}
                </div>
                <div className="flex items-center gap-2 text-[13px] text-white/50">
                  <Users className="h-4 w-4" />
                  Group {pkg.groupSize}
                </div>
              </div>
            </motion.div>

            {/* Hero Booking Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              className="hidden lg:block"
            >
              <div className="rounded-[20px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <div className="mb-4">
                  {discount > 0 && (
                    <span className="mr-2 text-[14px] text-white/30 line-through">
                      ${pkg.originalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="font-display text-[2rem] font-bold text-white">
                    ${pkg.price.toLocaleString()}
                  </span>
                  <span className="text-[14px] text-white/40"> / person</span>
                </div>
                {discount > 0 && (
                  <span className="mb-4 inline-flex items-center rounded-full bg-[#D4A574]/20 px-3 py-1 text-[11px] font-bold text-[#D4A574]">
                    Save {discount}%
                  </span>
                )}

                <div className="my-4 border-t border-white/10" />

                <div className="space-y-3">
                  <div>
                    <label className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-white/40">Travel Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                      <input
                        type="date"
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-[13px] text-white placeholder:text-white/30 focus:border-[#D4A574]/50 focus:outline-none focus:ring-1 focus:ring-[#D4A574]/30"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-white/40">Group Size</label>
                    <select
                      value={groupSize}
                      onChange={(e) => setGroupSize(Number(e.target.value))}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] text-white focus:border-[#D4A574]/50 focus:outline-none focus:ring-1 focus:ring-[#D4A574]/30"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 16].map((n) => (
                        <option key={n} value={n} className="bg-[#0C1222] text-white">
                          {n} {n === 1 ? "person" : "people"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <Link
                  to="/plan-my-trip"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#D4A574] py-3.5 text-[13px] font-bold text-white shadow-[0_4px_20px_rgb(212,165,116,0.3)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(212,165,116,0.5)] hover:scale-[1.02]"
                >
                  Book Now — ${(pkg.price * groupSize).toLocaleString()}
                </Link>
                <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-white/10 py-3 text-[13px] font-medium text-white/60 transition-all hover:border-white/20 hover:text-white/80">
                  <Mail className="h-4 w-4" />
                  Send Inquiry
                </button>

                <div className="my-4 border-t border-white/10" />

                <div className="space-y-3">
                  <TrustBadge icon={<Headphones className="h-4 w-4" />} text="24/7 Support" />
                  <TrustBadge icon={<RefreshCw className="h-4 w-4" />} text="Free Cancellation" />
                  <TrustBadge icon={<Shield className="h-4 w-4" />} text="Secure Payment" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 -mt-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease }}
        >
          <Swiper
            modules={[Navigation, Pagination, Thumbs]}
            spaceBetween={12}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            className="gallery-main rounded-[20px] overflow-hidden border border-[#F3F4F6] shadow-[0_8px_40px_rgb(0,0,0,0.12)]"
          >
            {galleryImages.map((img, i) => (
              <SwiperSlide key={i}>
                <Img
                  src={img}
                  alt={`${pkg.name} - Image ${i + 1}`}
                  aspectRatio="aspect-[21/9]"
                  rounded="rounded-none"
                  index={i}
                  className="w-full"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={12}
            slidesPerView={4}
            watchSlidesProgress
            className="gallery-thumbs mt-3"
          >
            {galleryImages.map((img, i) => (
              <SwiperSlide key={i}>
                <div className="cursor-pointer overflow-hidden rounded-[12px] border-2 border-transparent transition-all duration-300 hover:border-[#0F766E]/50 [&.swiper-slide-thumb-active]:border-[#0F766E]">
                  <Img
                    src={img}
                    alt={`Thumbnail ${i + 1}`}
                    aspectRatio="aspect-[16/10]"
                    rounded="rounded-none"
                    index={i}
                    className="w-full opacity-60 transition-opacity [&.swiper-slide-thumb-active]:opacity-100"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </section>

      {/* Main Content + Sidebar */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          <div className="space-y-12">
            {/* Overview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[1px] w-8 bg-[#D4A574]" />
                <h2 className="font-display text-[20px] font-semibold text-[#111827]">Overview</h2>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <OverviewCard icon={<Star className="h-5 w-5 text-[#D4A574]" />} label="Rating" value={`${pkg.rating} / 5`} sub={`${pkg.reviews.toLocaleString()} reviews`} />
                <OverviewCard icon={<Clock className="h-5 w-5 text-[#0F766E]" />} label="Duration" value={pkg.duration} sub={`${pkg.days} days`} />
                <OverviewCard icon={<Mountain className="h-5 w-5 text-[#0F766E]" />} label="Max Altitude" value={pkg.maxAltitude} />
                <OverviewCard icon={<Users className="h-5 w-5 text-[#0F766E]" />} label="Group Size" value={`${pkg.groupSize} people`} />
                <OverviewCard icon={<MapPin className="h-5 w-5 text-[#D4A574]" />} label="Region" value={pkg.region} />
                <OverviewCard icon={<Compass className="h-5 w-5 text-[#0F766E]" />} label="Difficulty" value={pkg.difficulty} />
              </div>
            </motion.div>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[1px] w-8 bg-[#D4A574]" />
                <h2 className="font-display text-[20px] font-semibold text-[#111827]">Highlights</h2>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {pkg.highlights.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, ease }}
                    className="flex items-start gap-3 rounded-[16px] border border-[#F3F4F6] bg-white p-4"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0F766E]/10">
                      <Check className="h-3.5 w-3.5 text-[#0F766E]" />
                    </div>
                    <span className="text-[14px] leading-relaxed text-[#374151]">{h}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Itinerary */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[1px] w-8 bg-[#D4A574]" />
                <h2 className="font-display text-[20px] font-semibold text-[#111827]">Day-by-Day Itinerary</h2>
              </div>
              <Accordion type="multiple" className="space-y-3">
                {pkg.itinerary.map((day, i) => (
                  <AccordionItem
                    key={day.day}
                    value={`day-${day.day}`}
                    className="overflow-hidden rounded-[16px] border border-[#F3F4F6] bg-white"
                  >
                    <AccordionTrigger className="px-5 py-4 hover:no-underline">
                      <div className="flex items-center gap-4">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0F766E] text-[11px] font-bold text-white">
                          {day.day}
                        </span>
                        <div className="text-left">
                          <h4 className="font-display text-[14px] font-semibold text-[#111827]">{day.title}</h4>
                          {day.altitude && (
                            <span className="text-[12px] text-[#9CA3AF]">
                              Altitude: {day.altitude}
                            </span>
                          )}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-5">
                      <div className="ml-13 border-l-2 border-[#0F766E]/20 pl-9">
                        <p className="text-[14px] leading-relaxed text-[#6B7280]">
                          {day.description}
                        </p>
                        {day.accommodation && (
                          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#FAFAFA] px-3 py-1.5 text-[12px] text-[#6B7280]">
                            <Tent className="h-3.5 w-3.5" />
                            {day.accommodation}
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>

            {/* Included / Not Included */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease }}
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-[20px] border border-[#F3F4F6] bg-white p-6">
                  <h3 className="mb-4 font-display text-[16px] font-semibold text-[#0F766E]">
                    What's Included
                  </h3>
                  <ul className="space-y-3">
                    {pkg.includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-[13px] text-[#374151]">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0F766E]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-[20px] border border-[#F3F4F6] bg-white p-6">
                  <h3 className="mb-4 font-display text-[16px] font-semibold text-red-500">
                    What's Not Included
                  </h3>
                  <ul className="space-y-3">
                    {pkg.excludes.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-[13px] text-[#374151]">
                        <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Equipment */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[1px] w-8 bg-[#D4A574]" />
                <h2 className="font-display text-[20px] font-semibold text-[#111827]">Equipment Checklist</h2>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {EQUIPMENT_CHECKLIST.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03, ease }}
                    className="flex items-center gap-3 rounded-[12px] border border-[#F3F4F6] bg-white px-4 py-3 text-[13px] text-[#374151]"
                  >
                    <Backpack className="h-4 w-4 shrink-0 text-[#0F766E]" />
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[1px] w-8 bg-[#D4A574]" />
                <h2 className="font-display text-[20px] font-semibold text-[#111827]">Reviews</h2>
              </div>
              <div className="rounded-[20px] border border-[#F3F4F6] bg-white p-6">
                <div className="grid gap-8 sm:grid-cols-[200px_1fr]">
                  <div className="text-center">
                    <div className="font-display text-[40px] font-bold text-[#111827]">{averageRating}</div>
                    <div className="mt-1 flex items-center justify-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(averageRating) ? "fill-[#D4A574] text-[#D4A574]" : "text-[#E5E7EB]"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="mt-1 text-[13px] text-[#6B7280]">
                      {pkg.reviews.toLocaleString()} reviews
                    </p>
                    <div className="mt-4 space-y-2">
                      {ratingBreakdown.map((rb) => (
                        <div key={rb.stars} className="flex items-center gap-2 text-[12px]">
                          <span className="w-8 text-right text-[#9CA3AF]">{rb.stars}★</span>
                          <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#F3F4F6]">
                            <div
                              className="h-full rounded-full bg-[#D4A574]"
                              style={{ width: `${rb.pct}%` }}
                            />
                          </div>
                          <span className="w-8 text-[#9CA3AF]">{rb.pct}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        name: "Sarah M.",
                        country: "United States",
                        date: "Nov 2025",
                        rating: 5,
                        text: "Absolutely incredible experience! The guides were knowledgeable, the views were breathtaking, and the whole trip was perfectly organized. This was a life-changing adventure.",
                      },
                      {
                        name: "James L.",
                        country: "United Kingdom",
                        date: "Oct 2025",
                        rating: 5,
                        text: "Our guide Pemba was exceptional — his knowledge of the mountains and local culture made the trek so much more meaningful. Every detail was taken care of.",
                      },
                      {
                        name: "Yuki T.",
                        country: "Japan",
                        date: "Sep 2025",
                        rating: 4,
                        text: "Great trek overall. The itinerary was well-paced with proper acclimatization days. The teahouse accommodations were comfortable. Highly recommended for first-time trekkers.",
                      },
                    ].map((review, i) => (
                      <div key={i} className="border-b border-[#F3F4F6] pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[14px] font-semibold text-[#111827]">{review.name}</span>
                            <span className="ml-2 text-[12px] text-[#9CA3AF]">{review.country}</span>
                          </div>
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, j) => (
                              <Star
                                key={j}
                                className={`h-3 w-3 ${
                                  j < review.rating ? "fill-[#D4A574] text-[#D4A574]" : "text-[#E5E7EB]"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="mt-1 text-[12px] text-[#9CA3AF]">{review.date}</p>
                        <p className="mt-2 text-[14px] leading-relaxed text-[#6B7280]">{review.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Related Packages */}
            {relatedPackages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-[1px] w-8 bg-[#D4A574]" />
                  <h2 className="font-display text-[20px] font-semibold text-[#111827]">
                    More in {pkg.region}
                  </h2>
                </div>
                <Swiper
                  modules={[Navigation, Pagination]}
                  spaceBetween={20}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                  breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                  }}
                  className="related-swiper pb-12"
                >
                  {relatedPackages.map((rp) => (
                    <SwiperSlide key={rp.id}>
                      <Link
                        to="/packages/$slug"
                        params={{ slug: rp.slug }}
                        className="group block overflow-hidden rounded-[20px] bg-white shadow-[0_2px_20px_rgb(0,0,0,0.06)] transition-all duration-500 hover:shadow-[0_8px_40px_rgb(0,0,0,0.12)]"
                      >
                        <div className="relative overflow-hidden">
                          <Img
                            src={rp.image}
                            alt={rp.name}
                            aspectRatio="aspect-[16/10]"
                            rounded="rounded-none"
                            index={rp.id.charCodeAt(rp.id.length - 1)}
                            className="transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute bottom-3 left-3 right-3">
                            <h4 className="font-display text-[14px] font-semibold text-white drop-shadow-lg">
                              {rp.name}
                            </h4>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="mb-2 flex items-center gap-1.5">
                            <Star className="h-3.5 w-3.5 fill-[#D4A574] text-[#D4A574]" />
                            <span className="text-[13px] font-semibold text-[#111827]">{rp.rating}</span>
                            <span className="text-[12px] text-[#9CA3AF]">({rp.reviews})</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[12px] text-[#6B7280]">
                              {rp.duration} · {rp.difficulty}
                            </span>
                            <span className="font-display text-[18px] font-bold text-[#111827]">
                              ${rp.price.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </motion.div>
            )}
          </div>

          {/* Sticky Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <div className="rounded-[20px] border border-[#F3F4F6] bg-white p-6 shadow-[0_2px_20px_rgb(0,0,0,0.06)]">
                <Img
                  src={pkg.image}
                  alt={pkg.name}
                  aspectRatio="aspect-[16/10]"
                  rounded="rounded-[12px]"
                  index={pkg.id.charCodeAt(pkg.id.length - 1)}
                  className="mb-4 w-full"
                />

                <div className="mb-2 flex items-baseline gap-2">
                  {discount > 0 && (
                    <span className="text-[14px] text-[#9CA3AF] line-through">
                      ${pkg.originalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="font-display text-[28px] font-bold text-[#111827]">
                    ${pkg.price.toLocaleString()}
                  </span>
                  <span className="text-[13px] text-[#6B7280]">/ person</span>
                </div>
                {discount > 0 && (
                  <span className="mb-4 inline-flex items-center rounded-full bg-[#0F766E]/10 px-3 py-1 text-[11px] font-bold text-[#0F766E]">
                    Save {discount}%
                  </span>
                )}

                <div className="my-4 border-t border-[#F3F4F6]" />

                <div className="space-y-3">
                  <div>
                    <label className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-[#9CA3AF]">Travel Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
                      <input
                        type="date"
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        className="w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] py-2.5 pl-10 pr-4 text-[13px] text-[#111827] focus:border-[#0F766E] focus:outline-none focus:ring-1 focus:ring-[#0F766E]/30"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-[#9CA3AF]">Group Size</label>
                    <select
                      value={groupSize}
                      onChange={(e) => setGroupSize(Number(e.target.value))}
                      className="w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-2.5 text-[13px] text-[#111827] focus:border-[#0F766E] focus:outline-none focus:ring-1 focus:ring-[#0F766E]/30"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 16].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "person" : "people"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between rounded-xl bg-[#FAFAFA] px-4 py-3">
                  <span className="text-[13px] text-[#6B7280]">
                    Total ({groupSize} {groupSize === 1 ? "person" : "people"})
                  </span>
                  <span className="font-display text-[20px] font-bold text-[#111827]">
                    ${(pkg.price * groupSize).toLocaleString()}
                  </span>
                </div>

                <Link
                  to="/plan-my-trip"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#D4A574] py-3.5 text-[13px] font-bold text-white shadow-[0_4px_20px_rgb(212,165,116,0.3)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(212,165,116,0.5)] hover:scale-[1.02]"
                >
                  Book Now
                </Link>
                <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-[#E5E7EB] py-3 text-[13px] font-medium text-[#6B7280] transition-all hover:bg-[#FAFAFA] hover:text-[#111827]">
                  <Mail className="h-4 w-4" />
                  Send Inquiry
                </button>

                <div className="my-4 border-t border-[#F3F4F6]" />

                <div className="space-y-3">
                  <TrustBadge icon={<Headphones className="h-4 w-4" />} text="24/7 Support" />
                  <TrustBadge icon={<RefreshCw className="h-4 w-4" />} text="Free Cancellation up to 30 days" />
                  <TrustBadge icon={<Shield className="h-4 w-4" />} text="Secure Payment Processing" />
                  <TrustBadge icon={<CreditCard className="h-4 w-4" />} text="Pay 30% now, rest before departure" />
                </div>

                <div className="my-4 border-t border-[#F3F4F6]" />

                <div className="flex items-center justify-center gap-4">
                  <button className="flex items-center gap-1.5 text-[12px] text-[#9CA3AF] transition-colors hover:text-[#0F766E]">
                    <Heart className="h-3.5 w-3.5" />
                    Save
                  </button>
                  <button className="flex items-center gap-1.5 text-[12px] text-[#9CA3AF] transition-colors hover:text-[#0F766E]">
                    <Share2 className="h-3.5 w-3.5" />
                    Share
                  </button>
                  <button className="flex items-center gap-1.5 text-[12px] text-[#9CA3AF] transition-colors hover:text-[#0F766E]">
                    <Phone className="h-3.5 w-3.5" />
                    Call
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E5E7EB] bg-white/95 px-4 py-3 backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div>
            <div className="font-display text-[18px] font-bold text-[#111827]">
              ${pkg.price.toLocaleString()}
              <span className="text-[12px] font-normal text-[#9CA3AF]">/ person</span>
            </div>
            {discount > 0 && (
              <span className="text-[10px] font-bold text-[#0F766E]">Save {discount}%</span>
            )}
          </div>
          <div className="flex gap-2">
            <button className="rounded-full border border-[#E5E7EB] px-4 py-2.5 text-[12px] font-medium text-[#6B7280] transition-colors hover:bg-[#FAFAFA]">
              Inquiry
            </button>
            <Link
              to="/plan-my-trip"
              className="rounded-full bg-[#D4A574] px-6 py-2.5 text-[12px] font-bold text-white shadow-[0_4px_16px_rgb(212,165,116,0.3)]"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>

      <div className="h-20 lg:hidden" />

      <Footer />

      <style>{`
        .gallery-main .swiper-button-next,
        .gallery-main .swiper-button-prev {
          color: white;
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(8px);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.15);
        }
        .gallery-main .swiper-button-next::after,
        .gallery-main .swiper-button-prev::after {
          font-size: 16px;
        }
        .gallery-main .swiper-pagination-bullet {
          background: rgba(255,255,255,0.5);
          opacity: 1;
        }
        .gallery-main .swiper-pagination-bullet-active {
          background: #D4A574;
        }
        .gallery-thumbs .swiper-slide-thumb-active img {
          opacity: 1 !important;
        }
        .related-swiper .swiper-button-next,
        .related-swiper .swiper-button-prev {
          color: #111827;
          background: white;
          border: 1px solid #E5E7EB;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgb(0,0,0,0.08);
        }
        .related-swiper .swiper-button-next::after,
        .related-swiper .swiper-button-prev::after {
          font-size: 14px;
        }
        .related-swiper .swiper-pagination-bullet {
          background: #9CA3AF;
          opacity: 0.3;
        }
        .related-swiper .swiper-pagination-bullet-active {
          background: #0F766E;
          opacity: 1;
        }
      `}</style>
    </div>
  );
}

function OverviewCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-[16px] border border-[#F3F4F6] bg-white p-4">
      <div className="mb-2">{icon}</div>
      <p className="text-[11px] font-medium uppercase tracking-wider text-[#9CA3AF]">{label}</p>
      <p className="mt-0.5 font-display text-[14px] font-semibold text-[#111827]">{value}</p>
      {sub && <p className="text-[12px] text-[#9CA3AF]">{sub}</p>}
    </div>
  );
}

function TrustBadge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0F766E]/10 text-[#0F766E]">
        {icon}
      </div>
      <span className="text-[12px] text-[#6B7280]">{text}</span>
    </div>
  );
}
