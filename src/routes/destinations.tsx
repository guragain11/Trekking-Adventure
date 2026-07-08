// @ts-nocheck
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  MapPin,
  Compass,
  ArrowRight,
  ChevronRight,
  Globe,
  Mountain,
  Sparkles,
} from "lucide-react";
import { Img } from "@/components/Img";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { DESTINATIONS } from "@/data/destinations";

export const Route = createFileRoute("/destinations")({
  component: DestinationsPage,
});

const mainDestinations = DESTINATIONS.filter((d) =>
  ["nepal", "bhutan", "tibet", "india"].includes(d.slug)
);
const regionalDestinations = DESTINATIONS.filter((d) =>
  ["everest-region", "annapurna-region", "langtang-region", "upper-mustang"].includes(d.slug)
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

function DestinationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />

      {/* Hero */}
      <section className="relative flex min-h-[75vh] items-center justify-center overflow-hidden bg-dark">
        <div className="absolute inset-0">
          <Img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&auto=format"
            alt="Himalayan Peaks"
            className="w-full h-full"
            aspectRatio="aspect-auto"
            rounded="rounded-none"
            index={0}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
        <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-accent/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-medium uppercase tracking-[0.25em] text-white/70 backdrop-blur-sm"
            >
              <Compass className="h-3.5 w-3.5" />
              Explore the Himalayas
            </motion.span>
            <h1 className="mt-8 font-display text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-[5.5rem] lg:leading-[1.05]">
              Discover{" "}
              <span className="bg-gradient-to-r from-accent via-amber-400 to-accent bg-clip-text text-transparent">
                Destinations
              </span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-lg text-white/60 leading-relaxed font-sans">
              From the soaring peaks of Nepal to the ancient kingdoms of Bhutan, each
              destination offers a unique journey through landscapes and cultures unlike
              anywhere on Earth.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/packages"
                className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-accent to-amber-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all duration-300 hover:shadow-accent/40 hover:scale-105"
              >
                Browse Packages
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/plan-my-trip"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-medium text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:text-white hover:bg-white/10"
              >
                Plan Custom Trip
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">Scroll</span>
            <div className="h-10 w-[1px] bg-gradient-to-b from-white/40 to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* Main Destinations Grid — 2x2 */}
      <section className="relative -mt-24 z-20 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 md:grid-cols-2"
        >
          {mainDestinations.map((dest) => (
            <motion.div key={dest.id} variants={cardVariants}>
              <Link
                to="/destinations/$slug"
                params={{ slug: dest.slug }}
                className="group relative block overflow-hidden rounded-3xl transition-all duration-700 hover:-translate-y-2"
              >
                {/* Card Image */}
                <div className="relative h-80 sm:h-[26rem] overflow-hidden rounded-3xl">
                  <Img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full transition-transform duration-[800ms] ease-out group-hover:scale-110"
                    aspectRatio="aspect-auto"
                    rounded="rounded-3xl"
                    index={DESTINATIONS.indexOf(dest)}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Top badge */}
                  <div className="absolute top-5 right-5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 px-4 py-1.5 text-xs font-medium text-white/90 transition-all duration-300 group-hover:bg-white/20 group-hover:scale-105">
                    {dest.tripCount} trips
                  </div>

                  {/* Bottom content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-center gap-2 text-white/50 text-sm mb-2.5 font-sans">
                      <MapPin className="h-3.5 w-3.5" />
                      {dest.country}
                    </div>
                    <h2 className="font-display text-3xl font-bold text-white sm:text-4xl transition-transform duration-500 group-hover:translate-x-1">
                      {dest.name}
                    </h2>
                    <p className="mt-3 text-sm text-white/60 leading-relaxed line-clamp-2 font-sans max-w-md">
                      {dest.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {dest.highlights.slice(0, 3).map((h, i) => (
                        <span
                          key={i}
                          className="rounded-full bg-white/10 backdrop-blur-sm px-3 py-1 text-xs text-white/80 border border-white/5"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 px-6 py-2.5 text-sm font-medium text-white transition-all duration-500 group-hover:bg-white/20 group-hover:gap-3 group-hover:border-white/20">
                      Explore {dest.name}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>

                {/* Bottom glow on hover */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-gradient-to-r from-transparent via-accent to-transparent transition-all duration-700 group-hover:w-3/4" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Regional Destinations — 4-col */}
      <section className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <Sparkles className="h-3 w-3" />
            Featured Regions
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-dark sm:text-4xl lg:text-5xl">
            Regional{" "}
            <span className="bg-gradient-to-r from-primary to-cyan-600 bg-clip-text text-transparent">
              Highlights
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl font-sans leading-relaxed">
            Explore specific trekking regions and discover tailored packages for each area.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {regionalDestinations.map((dest) => (
            <motion.div key={dest.id} variants={cardVariants}>
              <Link
                to="/destinations/$slug"
                params={{ slug: dest.slug }}
                className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-500 hover:shadow-elevated hover:-translate-y-1.5"
              >
                <div className="relative h-48 overflow-hidden">
                  <Img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-110"
                    aspectRatio="aspect-auto"
                    rounded="rounded-none"
                    index={DESTINATIONS.indexOf(dest) + 4}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-display text-xl font-bold text-white transition-transform duration-300 group-hover:translate-x-1">
                      {dest.name}
                    </h3>
                    <span className="text-xs text-white/60 font-sans">{dest.country}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-primary font-sans">
                      {dest.tripCount} trips
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:gap-2.5 font-sans">
                      View Trips
                      <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl bg-dark p-14 text-center sm:p-20"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/[0.03] rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
          <div className="relative z-10">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-amber-500 shadow-lg shadow-accent/25">
              <Mountain className="h-8 w-8 text-white" />
            </div>
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Ready to Explore?
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-white/50 font-sans leading-relaxed">
              Let our expert team craft a bespoke journey tailored to your interests,
              fitness level, and schedule.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/plan-my-trip"
                className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-accent to-amber-500 px-9 py-4 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all duration-300 hover:shadow-accent/40 hover:scale-105"
              >
                Plan a Custom Trip
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/packages"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-9 py-4 text-sm font-medium text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:text-white hover:bg-white/10"
              >
                Browse Packages
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
