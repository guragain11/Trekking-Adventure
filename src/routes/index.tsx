// @ts-nocheck
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { ArrowRight, Star, Clock, Phone, Shield, ChevronLeft, ChevronRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PACKAGES } from "@/data/packages";
import { DESTINATIONS } from "@/data/destinations";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const ease = [0.22, 1, 0.36, 1];

const heroActivities = [
  { id: 1, title: "Heli Tour", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80" },
  { id: 2, title: "Hiking", image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80" },
  { id: 3, title: "Sightseeing Tour", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80" },
  { id: 4, title: "Peak Climbing", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80" },
  { id: 5, title: "Cultural Tour", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80" },
];

function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <Hero />
      <Trips />
      <BestSelling />
      <ShortYetRewarding />
      <Locations />
      <About />
      <Voices />
      <Team />
      <Contact />
      <Footer />
    </div>
  );
}

/* ─── Hero ─────────────────────────────────────────────── */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], ["0%", "20%"]);

  return (
    <section ref={ref} className="relative h-[100vh] min-h-[700px] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <motion.img
          src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920&q=85&auto=format"
          alt="Himalayan peaks at dawn"
          className="h-full w-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
      </motion.div>

      <motion.div style={{ opacity, y: textY }} className="relative z-10 flex h-full items-end pb-20 lg:items-center lg:pb-10">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            {/* Left - Text */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-medium tracking-wider text-white/70 backdrop-blur-sm">
                  <span className="h-1 w-1 rounded-full bg-[#D4A574] animate-pulse" />
                  EST. 2004 · KATHMANDU
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5, ease }}
                className="mt-6 text-[clamp(2.2rem,4.5vw,3.5rem)] font-medium leading-[1.08] tracking-tight text-white"
              >
                Your Perfect{" "}
                <span className="text-[#D4A574]">Trekking Companion</span>{" "}
                For The Himalayas.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.65, ease }}
                className="mt-5 max-w-md text-[15px] leading-[1.7] text-white/60"
              >
                A registered adventure trekking company, transforming trails into 
                timeless memories across Nepal, Bhutan, and Tibet.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8, ease }}
                className="mt-8 flex items-center gap-3"
              >
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/packages"
                    className="group inline-flex items-center gap-2 rounded-full bg-[#D4A574] px-7 py-3.5 text-[13px] font-semibold text-[#0F172A] shadow-[0_4px_14px_rgba(212,165,116,0.4)] transition-all duration-300 hover:bg-[#C4956A] hover:shadow-[0_6px_20px_rgba(212,165,116,0.5)]"
                  >
                    View All Packages
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/plan-my-trip"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-[13px] font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/20"
                  >
                    Book A Trip
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* Right - Carousel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease }}
              className="hidden lg:flex lg:items-end lg:pt-16"
            >
              <HeroCarousel />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = heroActivities.length;

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 3000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Carousel */}
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-5"
          animate={{ x: `-${current * 280}px` }}
          transition={{ duration: 0.5, ease }}
        >
          {heroActivities.map((activity, i) => (
            <motion.div
              key={activity.id}
              className="relative h-[340px] w-[260px] shrink-0 overflow-hidden rounded-2xl"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={activity.image}
                alt={activity.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-[14px] font-medium text-white">{activity.title}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Controls */}
      <div className="mt-8 flex items-center gap-5">
        <div className="flex gap-3">
          <button
            onClick={prev}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all hover:border-white/40 hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all hover:border-white/40 hover:text-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="flex-1">
          <div className="h-1 w-full rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-[#D4A574]"
              animate={{ width: `${((current + 1) / total) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Counter */}
        <div className="text-[16px] font-medium text-[#D4A574]">
          {String(current + 1).padStart(2, "0")}
        </div>
      </div>
    </div>
  );
}

/* ─── Trips ────────────────────────────────────────────── */

function Trips() {
  const featured = PACKAGES.slice(0, 3);

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease }}
          className="text-center"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4A574]">Best Packages</p>
          <h2 className="mt-3 text-[1.75rem] font-medium tracking-tight text-[#111827] lg:text-[2rem]">
            Featured <span className="text-[#D4A574]">Packages</span>
          </h2>
          <p className="mx-auto mt-3 max-w-[500px] text-[14px] leading-relaxed text-[#6B7280]">
            Our Featured Packages can help you find the trip that's perfect for you!
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {featured.map((trip, i) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease }}
            >
              <Link
                to="/packages/$slug"
                params={{ slug: trip.slug }}
                className="group block"
              >
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease }}
                  className="group/card relative overflow-hidden rounded-[20px] bg-white shadow-[0_2px_20px_rgb(0,0,0,0.06)] transition-shadow duration-500 hover:shadow-[0_8px_40px_rgb(0,0,0,0.12)]"
                >
                  <div className="relative aspect-[3/2.5] overflow-hidden">
                    <motion.img
                      src={trip.image}
                      alt={trip.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />

                    <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-[#111827] shadow-sm backdrop-blur-sm">
                      {trip.region}
                    </span>

                    {trip.originalPrice > trip.price && (
                      <span className="absolute right-3 top-3 rounded-full bg-[#E53E3E] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-white shadow-sm">
                        Popular
                      </span>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="text-[16px] font-semibold text-[#111827] transition-colors duration-300 group-hover/card:text-[#0F766E]">
                      {trip.name}
                    </h3>

                    <div className="mt-3 flex items-center gap-4 text-[12px] text-[#6B7280]">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {trip.duration}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-[#D4A574] text-[#D4A574]" />
                        <span className="font-medium text-[#111827]">{trip.rating}</span>
                      </span>
                    </div>

                    <div className="mt-4 border-t border-[#F3F4F6] pt-4">
                      <p className="text-[10px] font-medium uppercase tracking-wider text-[#9CA3AF]">Starting from</p>
                      <div className="mt-1.5 flex items-baseline gap-2">
                        {trip.originalPrice > trip.price && (
                          <span className="text-[14px] text-[#9CA3AF] line-through">${trip.originalPrice.toLocaleString()}</span>
                        )}
                        <span className="text-[22px] font-bold text-[#111827]">${trip.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <Link
            to="/packages"
            className="group inline-flex items-center gap-2 rounded-full bg-[#111827] px-7 py-3.5 text-[13px] font-semibold text-white shadow-[0_4px_14px_rgba(17,24,39,0.3)] transition-all duration-300 hover:bg-[#1F2937] hover:shadow-[0_6px_20px_rgba(17,24,39,0.4)]"
          >
            View All Packages
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── BestSelling ──────────────────────────────────────── */

function BestSelling() {
  const bestSelling = PACKAGES.slice(3, 6);

  return (
    <section className="bg-[#FAFAFA] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease }}
          className="text-center"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4A574]">Best Selling Packages</p>
          <h2 className="mt-3 text-[1.75rem] font-medium tracking-tight text-[#111827] lg:text-[2rem]">
            Best Selling <span className="text-[#D4A574]">Packages</span>
          </h2>
          <p className="mx-auto mt-3 max-w-[540px] text-[14px] leading-relaxed text-[#6B7280]">
            Our Best Selling Himalayan Trekking Packages are waiting for you
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {bestSelling.map((trip, i) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease }}
            >
              <Link
                to="/packages/$slug"
                params={{ slug: trip.slug }}
                className="group block"
              >
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease }}
                  className="group/card relative overflow-hidden rounded-[20px] bg-white shadow-[0_2px_20px_rgb(0,0,0,0.06)] transition-shadow duration-500 hover:shadow-[0_8px_40px_rgb(0,0,0,0.12)]"
                >
                  <div className="relative aspect-[3/2.5] overflow-hidden">
                    <motion.img
                      src={trip.image}
                      alt={trip.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />

                    {trip.difficulty === "Easy" && (
                      <span className="absolute left-3 top-3 rounded-full bg-[#D4A574] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-white shadow-sm">
                        Short and Easy
                      </span>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="text-[16px] font-semibold text-[#111827] transition-colors duration-300 group-hover/card:text-[#0F766E]">
                      {trip.name}
                    </h3>

                    <div className="mt-3 flex items-center justify-between text-[12px] text-[#6B7280]">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {trip.duration}
                      </span>
                      <span className="inline-flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className={`h-3 w-3 ${s <= Math.round(trip.rating) ? "fill-[#D4A574] text-[#D4A574]" : "text-[#E5E7EB]"}`} />
                        ))}
                      </span>
                    </div>

                    <div className="mt-4 border-t border-[#F3F4F6] pt-4">
                      <p className="text-[10px] font-medium uppercase tracking-wider text-[#9CA3AF]">Starting from</p>
                      <div className="mt-1.5 flex items-baseline gap-2">
                        <span className="text-[22px] font-bold text-[#111827]">${trip.price.toLocaleString()}</span>
                        {trip.originalPrice > trip.price && (
                          <span className="text-[14px] text-[#9CA3AF] line-through">${trip.originalPrice.toLocaleString()}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── ShortYetRewarding ────────────────────────────────── */

function ShortYetRewarding() {
  const shortPackages = PACKAGES.filter((p) => p.days <= 7).slice(0, 3);

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease }}
          className="text-center"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4A574]">Short and Rewarding</p>
          <h2 className="mt-3 text-[1.75rem] font-medium tracking-tight text-[#111827] lg:text-[2rem]">
            Short yet <span className="text-[#D4A574]">Rewarding Packages</span>
          </h2>
          <p className="mx-auto mt-3 max-w-[540px] text-[14px] leading-relaxed text-[#6B7280]">
            Our Short and Rewarding Himalayan Trekking Packages are waiting for you
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {shortPackages.map((trip, i) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease }}
            >
              <Link
                to="/packages/$slug"
                params={{ slug: trip.slug }}
                className="group block"
              >
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease }}
                  className="group/card relative overflow-hidden rounded-[20px] bg-white shadow-[0_2px_20px_rgb(0,0,0,0.06)] transition-shadow duration-500 hover:shadow-[0_8px_40px_rgb(0,0,0,0.12)]"
                >
                  <div className="relative aspect-[3/2.5] overflow-hidden">
                    <motion.img
                      src={trip.image}
                      alt={trip.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />
                  </div>

                  <div className="p-5">
                    <h3 className="text-[16px] font-semibold text-[#111827] transition-colors duration-300 group-hover/card:text-[#0F766E]">
                      {trip.name}
                    </h3>

                    <div className="mt-3 flex items-center justify-between text-[12px] text-[#6B7280]">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {trip.duration}
                      </span>
                      <span className="inline-flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className={`h-3 w-3 ${s <= Math.round(trip.rating) ? "fill-[#D4A574] text-[#D4A574]" : "text-[#E5E7EB]"}`} />
                        ))}
                      </span>
                    </div>

                    <div className="mt-4 border-t border-[#F3F4F6] pt-4">
                      <p className="text-[10px] font-medium uppercase tracking-wider text-[#9CA3AF]">Starting from</p>
                      <div className="mt-1.5 flex items-baseline gap-2">
                        <span className="text-[22px] font-bold text-[#111827]">${trip.price.toLocaleString()}</span>
                        {trip.originalPrice > trip.price && (
                          <span className="text-[14px] text-[#9CA3AF] line-through">${trip.originalPrice.toLocaleString()}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Locations ────────────────────────────────────────── */

function Locations() {
  return (
    <section className="bg-[#FAFAFA] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease }}
          className="flex items-end justify-between"
        >
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0F766E]">Destinations</p>
            <h2 className="mt-3 text-[1.75rem] font-medium tracking-tight text-[#111827] lg:text-[2rem]">
              Where we go
            </h2>
          </div>
          <Link
            to="/destinations"
            className="group hidden items-center gap-1.5 text-[13px] font-medium text-[#0F766E] sm:flex"
          >
            All destinations
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {DESTINATIONS.slice(0, 4).map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
            >
              <Link
                to="/destinations/$slug"
                params={{ slug: d.slug }}
                className="group relative block aspect-[3/4] overflow-hidden rounded-[20px] bg-[#E5E7EB] shadow-[0_2px_20px_rgb(0,0,0,0.06)] transition-shadow duration-500 hover:shadow-[0_8px_40px_rgb(0,0,0,0.12)]"
              >
                <img
                  src={d.image}
                  alt={d.name}
                  className="h-full w-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-[16px] font-semibold text-white transition-transform duration-300 group-hover:translate-y-[-2px]">{d.name}</h3>
                  <p className="mt-1.5 text-[12px] text-white/60 transition-colors group-hover:text-white/80">{d.tripCount} trips</p>
                </div>
                <div className="absolute bottom-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/0 text-white/0 transition-all duration-500 group-hover:bg-white group-hover:text-[#111827]">
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <Link
          to="/destinations"
          className="mt-6 flex items-center gap-1.5 text-[13px] font-medium text-[#0F766E] sm:hidden"
        >
          All destinations
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

/* ─── About ────────────────────────────────────────────── */

function About() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0F766E]">About us</p>
            <h2 className="mt-3 text-[1.75rem] font-medium tracking-tight text-[#111827] lg:text-[2rem]">
              Two decades in the mountains
            </h2>
            <p className="mt-5 text-[15px] leading-[1.75] text-[#6B7280]">
              We started in 2004 with a single trekking route and a belief that travel 
              should be personal. Today, we're still a small team — no investors, no 
              call centers. Just people who know these mountains.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { n: "20+", l: "Years" },
                { n: "1,200+", l: "Treks completed" },
                { n: "98%", l: "Return clients" },
                { n: "50+", l: "Local guides" },
              ].map((s, i) => (
                <motion.div
                  key={s.l}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="border-l-2 border-[#0F766E] pl-4 transition-colors duration-300 hover:border-[#D4A574]"
                >
                  <p className="text-[20px] font-medium text-[#111827]">{s.n}</p>
                  <p className="text-[13px] text-[#6B7280]">{s.l}</p>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Link
                to="/about"
                className="mt-8 inline-flex items-center gap-2 text-[13px] font-medium text-[#0F766E] transition-all duration-300 hover:gap-3"
              >
                Learn more about us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=700&q=80&auto=format"
              alt="Sherpa guide"
              className="w-full bg-[#F3F4F6]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute -bottom-4 -left-4 bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
            >
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-[#0F766E]" />
                <div>
                  <p className="text-[13px] font-medium text-[#111827]">Licensed & Insured</p>
                  <p className="text-[11px] text-[#6B7280]">TAAN registered</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Voices ───────────────────────────────────────────── */

function Voices() {
  const reviews = [
    {
      text: "We booked the Everest Base Camp trek and it exceeded every expectation. Pemba knew every teahouse, every shortcut, every story along the way.",
      name: "Sarah M.",
      from: "New York",
    },
    {
      text: "Third time trekking with them. The Annapurna Circuit was different from any other trip — they showed us places you won't find in guidebooks.",
      name: "Marco B.",
      from: "Milan",
    },
    {
      text: "The Bhutan trip was slower, more intentional. We visited monasteries and local families. It felt like traveling with friends, not a tour company.",
      name: "Yuki T.",
      from: "Tokyo",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#0C1222] py-20 lg:py-28">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute left-1/3 top-0 h-[500px] w-[500px] rounded-full bg-[#D4A574]/5 blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-[#0F766E]/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease }}
          className="max-w-lg"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4A574]">Travelers</p>
          <h2 className="mt-3 text-[1.75rem] font-medium tracking-tight text-white lg:text-[2rem]">
            What they say
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease }}
              className="group"
            >
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease }}
                className="rounded-[20px] border border-white/[0.08] bg-white/[0.03] p-7 backdrop-blur-sm transition-all duration-500 hover:border-white/[0.15] hover:bg-white/[0.06]"
              >
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="h-4 w-4 fill-[#D4A574] text-[#D4A574]" />
                  ))}
                </div>
                <p className="mt-5 text-[15px] leading-[1.8] text-white/60 transition-colors duration-300 group-hover:text-white/80">
                  "{r.text}"
                </p>
                <div className="mt-6 border-t border-white/[0.08] pt-5 transition-colors duration-300 group-hover:border-white/[0.15]">
                  <p className="text-[14px] font-semibold text-white/90">{r.name}</p>
                  <p className="mt-0.5 text-[12px] text-white/40">{r.from}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Team ─────────────────────────────────────────────── */

function Team() {
  const team = [
    {
      name: "Bishow Dahal",
      role: "Founder",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&auto=format",
    },
    {
      name: "Panchanga Adhikari",
      role: "CEO/ Co-founder",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&auto=format",
    },
    {
      name: "Pratika Adhikari",
      role: "Customer Care Executive",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&auto=format",
    },
    {
      name: "Bishmita Dahal",
      role: "USA Representative",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&auto=format",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#FAFAFA] py-20 lg:py-28">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute left-1/4 top-0 h-[400px] w-[400px] rounded-full bg-[#D4A574]/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-[#0F766E]/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease }}
            className="max-w-md lg:sticky lg:top-32"
          >
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-8 bg-[#D4A574]" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4A574]">Team</p>
            </div>
            <h2 className="mt-4 text-[1.75rem] font-medium tracking-tight text-[#111827] lg:text-[2.25rem]">
              Meet Our <span className="text-[#D4A574]">Hive</span>
            </h2>
            <p className="mt-4 text-[15px] leading-[1.8] text-[#6B7280]">
              Expertise, Experience and Passion for Travel
            </p>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#D4A574]/30 bg-[#D4A574]/10 px-6 py-3 text-[13px] font-medium text-[#D4A574] transition-all duration-300 hover:border-[#D4A574] hover:bg-[#D4A574]/20"
            >
              View More
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
            className="flex-1 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5"
          >
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease }}
                className="group"
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.4, ease }}
                  className="relative overflow-hidden rounded-[20px] bg-white shadow-[0_4px_30px_rgb(0,0,0,0.06)]"
                >
                  <div className="aspect-[3/4] overflow-hidden">
                    <motion.img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/80 via-[#111827]/10 to-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-70" />

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                      <p className="text-[13px] font-semibold text-white">{member.name}</p>
                      <p className="mt-1 text-[11px] text-[#D4A574]">{member.role}</p>
                    </div>
                  </div>

                  <div className="absolute left-0 top-0 h-[2px] w-0 bg-[#D4A574] transition-all duration-500 group-hover:w-full" />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Contact ──────────────────────────────────────────── */

function Contact() {
  return (
    <section className="bg-[#FAFAFA] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease }}
          >
            <h2 className="text-[2rem] font-medium tracking-tight text-[#111827] lg:text-[2.5rem]">
              Contact <span className="text-[#D4A574]">Us</span>
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-[1.8] text-[#6B7280]">
              Where Will Your Next Trip Take You? Contact Us to Find Out
            </p>

            <div className="mt-10 space-y-8">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#0F766E]/10">
                  <svg className="h-5 w-5 text-[#0F766E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-[#111827]">Email</p>
                  <p className="mt-1 text-[14px] text-[#6B7280]">info@himalayaatelier.com</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#0F766E]/10">
                  <Phone className="h-5 w-5 text-[#0F766E]" />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-[#111827]">Phone</p>
                  <p className="mt-1 text-[14px] text-[#6B7280]">Bishow Dahal: +977 9841203959</p>
                  <p className="text-[14px] text-[#6B7280]">Panchanga Adhikari: +977 9860617338</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#0F766E]/10">
                  <svg className="h-5 w-5 text-[#0F766E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-[#111827]">Address</p>
                  <p className="mt-1 text-[14px] text-[#6B7280]">Bagawan Bahal Marg, Kathmandu 44600, Nepal</p>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-[#E5E7EB] pt-8">
              <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#111827]">Follow Us</p>
              <div className="mt-4 flex gap-3">
                {["facebook", "instagram", "linkedin", "youtube"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111827] text-white transition-all duration-300 hover:bg-[#0F766E]"
                  >
                    {social === "facebook" && (
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                    )}
                    {social === "instagram" && (
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" /></svg>
                    )}
                    {social === "linkedin" && (
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                    )}
                    {social === "youtube" && (
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
            className="relative overflow-hidden rounded-[16px] bg-[#E5E7EB]"
          >
            <div className="aspect-[4/3] w-full sm:aspect-video lg:aspect-[4/3]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.2750374047!2d85.3102033150849!3d27.71202338276827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190d7e7e7e7e%3A0x7e7e7e7e7e7e7e7e!2sThamel%2C%20Kathmandu%2044600%2C%20Nepal!5e0!3m2!1sen!2snp!4v1620000000000!5m2!1sen!2snp"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
