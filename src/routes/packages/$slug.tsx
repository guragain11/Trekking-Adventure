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
  Printer,
  Mail,
  Camera,
  Award,
  Leaf,
  Globe,
} from "lucide-react";

import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Img } from "@/components/Img";
import { WishlistButton } from "@/components/WishlistButton";
import { CompareButton } from "@/components/CompareButton";
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

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

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
      <div className="min-h-screen bg-background text-foreground">
        <Nav />
        <div className="flex min-h-[70vh] flex-col items-center justify-center px-4">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
            <Mountain className="h-10 w-10 text-muted-foreground/40" />
          </div>
          <h1 className="mt-6 font-display text-3xl font-bold">Package Not Found</h1>
          <p className="mt-3 max-w-md text-center text-muted-foreground">
            The package you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/packages"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
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
      case "Easy":
        return "bg-emerald-500/20 text-emerald-400";
      case "Moderate":
        return "bg-primary/20 text-primary";
      case "Challenging":
        return "bg-accent/20 text-accent";
      case "Strenuous":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const galleryImages = pkg.gallery && pkg.gallery.length > 0
    ? pkg.gallery
    : [pkg.image, pkg.image, pkg.image];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      {/* Hero: Full-bleed Image with Overlay */}
      <section className="relative overflow-hidden bg-dark pt-28 pb-16 sm:pt-36 sm:pb-24">
        <div className="absolute inset-0">
          <Img
            src={pkg.image}
            alt={pkg.name}
            aspectRatio="aspect-auto"
            rounded="rounded-none"
            index={pkg.id.charCodeAt(pkg.id.length - 1)}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-dark/30" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(14,116,144,0.12),transparent_70%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8 flex items-center gap-2 text-sm text-white/40"
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
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="rounded-lg bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white/80 backdrop-blur-sm">
                  {pkg.region}
                </span>
                <span className="rounded-lg bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white/80 backdrop-blur-sm">
                  {pkg.category}
                </span>
                <span className={`rounded-lg px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-sm ${difficultyColor(pkg.difficulty)}`}>
                  {pkg.difficulty}
                </span>
              </div>

              <h1 className="font-display text-3xl font-bold tracking-tight text-light sm:text-4xl lg:text-5xl">
                {pkg.name}
              </h1>

              <p className="mt-4 max-w-xl text-white/50 leading-relaxed">
                {pkg.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(averageRating)
                            ? "fill-accent text-accent"
                            : "text-white/20"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-white">{averageRating}</span>
                  <span className="text-sm text-white/40">({pkg.reviews.toLocaleString()} reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/50">
                  <Clock className="h-4 w-4" />
                  {pkg.duration}
                </div>
                <div className="flex items-center gap-2 text-sm text-white/50">
                  <Mountain className="h-4 w-4" />
                  Max {pkg.maxAltitude}
                </div>
                <div className="flex items-center gap-2 text-sm text-white/50">
                  <Users className="h-4 w-4" />
                  Group {pkg.groupSize}
                </div>
              </div>
            </motion.div>

            {/* Hero Booking Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <div className="mb-4">
                  {discount > 0 && (
                    <span className="mr-2 text-sm text-white/30 line-through">
                      ${pkg.originalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="font-display text-4xl font-bold text-light">
                    ${pkg.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-white/40"> / person</span>
                </div>
                {discount > 0 && (
                  <span className="mb-4 inline-flex items-center rounded-lg bg-accent/20 px-3 py-1 text-xs font-bold text-accent">
                    Save {discount}%
                  </span>
                )}

                <div className="my-4 border-t border-white/10" />

                <div className="space-y-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-white/50">Travel Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                      <input
                        type="date"
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-light placeholder:text-white/30 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-white/50">Group Size</label>
                    <select
                      value={groupSize}
                      onChange={(e) => setGroupSize(Number(e.target.value))}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-light focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 16].map((n) => (
                        <option key={n} value={n} className="bg-dark text-light">
                          {n} {n === 1 ? "person" : "people"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <Link
                  to="/plan-my-trip"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-accent py-3.5 text-sm font-bold text-white shadow-glow transition-all duration-300 hover:shadow-accent hover:scale-[1.02]"
                >
                  Book Now — ${(pkg.price * groupSize).toLocaleString()}
                </Link>
                <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-sm font-medium text-white/60 transition-all hover:border-white/20 hover:text-white/80">
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

      {/* Image Gallery Swiper */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Swiper
            modules={[Navigation, Pagination, Thumbs]}
            spaceBetween={12}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            className="gallery-main rounded-2xl overflow-hidden border border-border shadow-elevated"
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
                <div className="cursor-pointer overflow-hidden rounded-xl border-2 border-transparent transition-all duration-300 hover:border-primary/50 [&.swiper-slide-thumb-active]:border-primary">
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
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          <div className="space-y-12">
            {/* Overview Cards */}
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="mb-6 font-display text-2xl font-bold">Overview</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <OverviewCard icon={<Star className="h-5 w-5 text-accent" />} label="Rating" value={`${pkg.rating} / 5`} sub={`${pkg.reviews.toLocaleString()} reviews`} />
                <OverviewCard icon={<Clock className="h-5 w-5 text-primary" />} label="Duration" value={pkg.duration} sub={`${pkg.days} days`} />
                <OverviewCard icon={<Mountain className="h-5 w-5 text-emerald-400" />} label="Max Altitude" value={pkg.maxAltitude} />
                <OverviewCard icon={<Users className="h-5 w-5 text-primary" />} label="Group Size" value={`${pkg.groupSize} people`} />
                <OverviewCard icon={<MapPin className="h-5 w-5 text-accent" />} label="Region" value={pkg.region} />
                <OverviewCard icon={<Compass className="h-5 w-5 text-emerald-400" />} label="Difficulty" value={pkg.difficulty} />
              </div>
            </motion.div>

            {/* Highlights */}
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="mb-6 font-display text-2xl font-bold">Highlights</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {pkg.highlights.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                    </div>
                    <span className="text-sm leading-relaxed">{h}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Day-by-Day Itinerary */}
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="mb-6 font-display text-2xl font-bold">Day-by-Day Itinerary</h2>
              <Accordion type="multiple" className="space-y-3">
                {pkg.itinerary.map((day, i) => (
                  <AccordionItem
                    key={day.day}
                    value={`day-${day.day}`}
                    className="overflow-hidden rounded-xl border border-border bg-card"
                  >
                    <AccordionTrigger className="px-5 py-4 hover:no-underline">
                      <div className="flex items-center gap-4">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-primary text-xs font-bold text-white">
                          {day.day}
                        </span>
                        <div className="text-left">
                          <h4 className="font-display text-sm font-semibold">{day.title}</h4>
                          {day.altitude && (
                            <span className="text-xs text-muted-foreground">
                              Altitude: {day.altitude}
                            </span>
                          )}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-5">
                      <div className="ml-13 border-l-2 border-primary/20 pl-9">
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {day.description}
                        </p>
                        {day.accommodation && (
                          <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-muted px-3 py-1.5 text-xs text-muted-foreground">
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
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="mb-4 font-display text-lg font-semibold text-emerald-400">
                    What's Included
                  </h3>
                  <ul className="space-y-3">
                    {pkg.includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="mb-4 font-display text-lg font-semibold text-red-400">
                    What's Not Included
                  </h3>
                  <ul className="space-y-3">
                    {pkg.excludes.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Equipment Checklist */}
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="mb-6 font-display text-2xl font-bold">Equipment Checklist</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {EQUIPMENT_CHECKLIST.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03 }}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm"
                  >
                    <Backpack className="h-4 w-4 shrink-0 text-primary" />
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Reviews */}
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="mb-6 font-display text-2xl font-bold">Reviews</h2>
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="grid gap-8 sm:grid-cols-[200px_1fr]">
                  <div className="text-center">
                    <div className="font-display text-5xl font-bold text-foreground">{averageRating}</div>
                    <div className="mt-1 flex items-center justify-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(averageRating) ? "fill-accent text-accent" : "text-muted-foreground/30"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {pkg.reviews.toLocaleString()} reviews
                    </p>
                    <div className="mt-4 space-y-2">
                      {ratingBreakdown.map((rb) => (
                        <div key={rb.stars} className="flex items-center gap-2 text-xs">
                          <span className="w-8 text-right text-muted-foreground">{rb.stars}★</span>
                          <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                            <div
                              className="h-full rounded-full bg-accent"
                              style={{ width: `${rb.pct}%` }}
                            />
                          </div>
                          <span className="w-8 text-muted-foreground">{rb.pct}%</span>
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
                      <div key={i} className="border-b border-border pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-semibold">{review.name}</span>
                            <span className="ml-2 text-xs text-muted-foreground">{review.country}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, j) => (
                              <Star
                                key={j}
                                className={`h-3 w-3 ${
                                  j < review.rating ? "fill-accent text-accent" : "text-muted-foreground/20"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">{review.date}</p>
                        <p className="mt-2 text-sm leading-relaxed">{review.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Related Packages Swiper */}
            {relatedPackages.length > 0 && (
              <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <h2 className="mb-6 font-display text-2xl font-bold">
                  More in {pkg.region}
                </h2>
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
                        className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated"
                      >
                        <div className="relative overflow-hidden">
                          <Img
                            src={rp.image}
                            alt={rp.name}
                            aspectRatio="aspect-[16/10]"
                            rounded="rounded-none"
                            index={rp.id.charCodeAt(rp.id.length - 1)}
                            className="transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent" />
                          <div className="absolute bottom-3 left-3 right-3">
                            <h4 className="font-display text-sm font-bold text-light drop-shadow-lg">
                              {rp.name}
                            </h4>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="mb-2 flex items-center gap-2">
                            <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                            <span className="text-xs font-semibold">{rp.rating}</span>
                            <span className="text-xs text-muted-foreground">({rp.reviews})</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              {rp.duration} · {rp.difficulty}
                            </span>
                            <span className="font-display text-lg font-bold text-primary">
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
              <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <Img
                  src={pkg.image}
                  alt={pkg.name}
                  aspectRatio="aspect-[16/10]"
                  rounded="rounded-xl"
                  index={pkg.id.charCodeAt(pkg.id.length - 1)}
                  className="mb-4 w-full"
                />

                <div className="mb-2 flex items-baseline gap-2">
                  {discount > 0 && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${pkg.originalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="font-display text-3xl font-bold text-primary">
                    ${pkg.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-muted-foreground">/ person</span>
                </div>
                {discount > 0 && (
                  <span className="mb-4 inline-flex items-center rounded-lg bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400">
                    Save {discount}%
                  </span>
                )}

                <div className="my-4 border-t border-border" />

                <div className="space-y-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">Travel Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="date"
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">Group Size</label>
                    <select
                      value={groupSize}
                      onChange={(e) => setGroupSize(Number(e.target.value))}
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 16].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "person" : "people"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between rounded-xl bg-muted/50 px-4 py-3">
                  <span className="text-sm text-muted-foreground">
                    Total ({groupSize} {groupSize === 1 ? "person" : "people"})
                  </span>
                  <span className="font-display text-xl font-bold text-foreground">
                    ${(pkg.price * groupSize).toLocaleString()}
                  </span>
                </div>

                <Link
                  to="/plan-my-trip"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-accent py-3.5 text-sm font-bold text-white shadow-glow transition-all duration-300 hover:shadow-accent hover:scale-[1.02]"
                >
                  Book Now
                </Link>
                <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-border py-3 text-sm font-medium text-foreground transition-all hover:bg-muted">
                  Send Inquiry
                </button>

                <div className="my-4 border-t border-border" />

                <div className="space-y-3">
                  <TrustBadge icon={<Headphones className="h-4 w-4" />} text="24/7 Support" />
                  <TrustBadge icon={<RefreshCw className="h-4 w-4" />} text="Free Cancellation up to 30 days" />
                  <TrustBadge icon={<Shield className="h-4 w-4" />} text="Secure Payment Processing" />
                  <TrustBadge icon={<CreditCard className="h-4 w-4" />} text="Pay 30% now, rest before departure" />
                </div>

                <div className="my-4 border-t border-border" />

                <div className="flex items-center justify-center gap-4">
                  <button className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary">
                    <Heart className="h-3.5 w-3.5" />
                    Save
                  </button>
                  <button className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary">
                    <Share2 className="h-3.5 w-3.5" />
                    Share
                  </button>
                  <button className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary">
                    <Printer className="h-3.5 w-3.5" />
                    Print
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 px-4 py-3 backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div>
            <div className="font-display text-xl font-bold text-primary">
              ${pkg.price.toLocaleString()}
              <span className="text-xs font-normal text-muted-foreground">/ person</span>
            </div>
            {discount > 0 && (
              <span className="text-[10px] font-bold text-emerald-400">Save {discount}%</span>
            )}
          </div>
          <div className="flex gap-2">
            <button className="rounded-xl border border-border px-4 py-2.5 text-xs font-medium text-foreground transition-colors hover:bg-muted">
              Inquiry
            </button>
            <Link
              to="/plan-my-trip"
              className="rounded-xl bg-gradient-accent px-6 py-2.5 text-xs font-bold text-white shadow-glow"
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
          background: #14b8a6;
        }
        .gallery-thumbs .swiper-slide-thumb-active img {
          opacity: 1 !important;
        }
        .related-swiper .swiper-button-next,
        .related-swiper .swiper-button-prev {
          color: hsl(var(--foreground));
          background: hsl(var(--card));
          border: 1px solid hsl(var(--border));
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        .related-swiper .swiper-button-next::after,
        .related-swiper .swiper-button-prev::after {
          font-size: 14px;
        }
        .related-swiper .swiper-pagination-bullet {
          background: hsl(var(--muted-foreground));
          opacity: 0.3;
        }
        .related-swiper .swiper-pagination-bullet-active {
          background: hsl(var(--primary));
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
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-2">{icon}</div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-0.5 font-display text-sm font-bold">{value}</p>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}

function TrustBadge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <span className="text-xs text-muted-foreground">{text}</span>
    </div>
  );
}
