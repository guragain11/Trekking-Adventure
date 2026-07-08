// @ts-nocheck
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Star,
  MapPin,
  Globe,
  Filter,
  ChevronRight,
  ArrowRight,
  Mountain,
  Users,
  Award,
  Mail,
  Phone,
  Sparkles,
  Quote,
  Clock,
} from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Img } from "@/components/Img";
import { GUIDES } from "@/data/guides";

export const Route = createFileRoute("/guides")({
  component: GuidesPage,
});

const specializations = [
  "All",
  ...Array.from(new Set(GUIDES.flatMap((g) => g.specialization))),
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`h-3.5 w-3.5 ${
            s <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

function GuidesPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? GUIDES
      : GUIDES.filter((g) => g.specialization.includes(activeFilter));

  return (
    <div className="min-h-screen bg-light">
      <Nav />

      {/* Hero */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&h=1080&fit=crop&auto=format"
            alt="Himalayan Guides"
            className="w-full h-full"
            aspectRatio="aspect-auto"
            rounded="rounded-none"
            index={0}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
        <div className="absolute top-1/4 left-1/3 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[150px]" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2.5"
          >
            <Users className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-sm font-medium text-white/90 tracking-wide font-sans">Our Team</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Meet Our{" "}
            <span className="bg-gradient-to-r from-accent via-amber-400 to-accent bg-clip-text text-transparent">
              Guides
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl font-sans text-lg leading-relaxed text-white/70"
          >
            Our guides are the heart of every journey. Born and raised in the
            Himalayas, they bring unmatched expertise, local knowledge, and
            genuine passion to every expedition.
          </motion.p>
        </div>
      </section>

      {/* Filter */}
      <section className="px-4 pb-14 bg-white border-b border-border sticky top-0 z-30">
        <div className="mx-auto max-w-6xl pt-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-3"
          >
            <div className="flex h-9 items-center gap-2 rounded-full border border-border bg-muted px-4 text-xs font-semibold text-muted-foreground">
              <Filter className="h-3.5 w-3.5" />
              Filter:
            </div>
            {specializations.map((spec) => (
              <button
                key={spec}
                onClick={() => setActiveFilter(spec)}
                className={`rounded-full px-4 py-2 font-sans text-xs font-semibold transition-all duration-300 ${
                  activeFilter === spec
                    ? "bg-gradient-to-r from-accent to-amber-500 text-white shadow-lg shadow-accent/20"
                    : "border border-border bg-white text-muted-foreground hover:border-primary/30 hover:text-dark"
                }`}
              >
                {spec}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="px-4 pb-28 bg-light">
        <div className="mx-auto max-w-6xl">
          <motion.div
            key={activeFilter}
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((guide, i) => (
              <motion.div
                key={guide.id}
                variants={item}
                className="group bg-card overflow-hidden rounded-3xl border border-border shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-2"
              >
                {/* Avatar */}
                <div className="relative flex justify-center pt-10 pb-4 bg-gradient-to-b from-primary/5 to-transparent">
                  <div className="relative">
                    <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl">
                      <Img
                        src={guide.image}
                        alt={guide.name}
                        className="h-full w-full"
                        aspectRatio="aspect-square"
                        rounded="rounded-full"
                        index={i}
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-cyan-600 border-2 border-white shadow-lg">
                      <Award className="h-3.5 w-3.5 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-7 pt-3 text-center">
                  <h3 className="font-display text-xl font-bold text-dark">{guide.name}</h3>
                  <p className="mt-1.5 font-sans text-sm font-semibold text-primary">
                    {guide.role}
                  </p>
                  <p className="mt-1 font-sans text-xs text-muted-foreground">
                    {guide.experience} experience
                  </p>

                  {/* Rating */}
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <StarRating rating={guide.rating} />
                    <span className="font-sans text-xs text-muted-foreground">
                      {guide.rating} ({guide.reviews} reviews)
                    </span>
                  </div>

                  {/* Languages */}
                  <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                    {guide.languages.map((lang) => (
                      <span
                        key={lang}
                        className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-[10px] font-semibold text-muted-foreground border border-border/50"
                      >
                        <Globe className="h-2.5 w-2.5" />
                        {lang}
                      </span>
                    ))}
                  </div>

                  {/* Specializations */}
                  <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                    {guide.specialization.map((spec) => (
                      <span
                        key={spec}
                        className="rounded-full bg-gradient-to-r from-primary/10 to-cyan-500/10 px-3 py-1 text-[10px] font-bold text-primary border border-primary/10"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Bio */}
                  <p className="mt-5 font-sans text-xs leading-relaxed text-muted-foreground line-clamp-3">
                    {guide.bio}
                  </p>

                  {/* Button */}
                  <button className="mt-6 inline-flex items-center gap-2 rounded-xl border border-border bg-white px-6 py-2.5 font-sans text-xs font-semibold text-dark shadow-sm transition-all duration-300 hover:border-primary/30 hover:text-primary hover:shadow-md hover:-translate-y-0.5 group/btn">
                    <Mail className="h-3.5 w-3.5" />
                    Contact Guide
                    <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-28 bg-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="absolute top-0 left-1/4 h-[400px] w-[400px] rounded-full bg-white/[0.03] blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-white/[0.03] blur-[100px]" />
        <div className="relative z-10 mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-14 text-center sm:p-20"
          >
            <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative z-10">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-amber-500 shadow-lg shadow-accent/25">
                <Mountain className="h-8 w-8 text-white" />
              </div>
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                Want to Become a Guide?
              </h2>
              <p className="mx-auto mt-5 max-w-lg font-sans text-white/60 leading-relaxed">
                We're always looking for passionate, experienced individuals who
                share our love for the Himalayas and commitment to excellence.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-accent to-amber-500 px-9 py-4 font-sans text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all duration-300 hover:shadow-accent/40 hover:scale-105"
                >
                  Apply Now
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 bg-white/5 px-9 py-4 font-sans text-sm font-medium text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:text-white hover:bg-white/10"
                >
                  Learn About Us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
