// @ts-nocheck
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  MapPin,
  Calendar,
  Star,
  Clock,
  Mountain,
  ArrowRight,
  ChevronRight,
  Compass,
  AlertTriangle,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Img } from "@/components/Img";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { DESTINATIONS } from "@/data/destinations";
import { PACKAGES } from "@/data/packages";

export const Route = createFileRoute("/destinations/$slug")({
  component: DestinationDetailPage,
});

const difficultyColor: Record<string, string> = {
  Easy: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  Moderate: "bg-primary/10 text-primary border-primary/20",
  Challenging: "bg-accent/10 text-accent border-accent/20",
  Strenuous: "bg-rose-500/10 text-rose-500 border-rose-500/20",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function DestinationDetailPage() {
  const { slug } = useParams({ from: "/destinations/$slug" });
  const destination = DESTINATIONS.find((d) => d.slug === slug);
  const destIndex = DESTINATIONS.findIndex((d) => d.slug === slug);

  const relatedPackages = PACKAGES.filter((pkg) => {
    if (!destination) return false;
    const regionMap: Record<string, string[]> = {
      nepal: ["Everest", "Annapurna", "Langtang", "Mustang", "Manaslu", "Kanchenjunga"],
      bhutan: ["Bhutan"],
      tibet: ["Tibet"],
      india: ["Everest", "Annapurna"],
      "everest-region": ["Everest"],
      "annapurna-region": ["Annapurna"],
      "langtang-region": ["Langtang"],
      "upper-mustang": ["Mustang"],
    };
    return regionMap[destination.slug]?.includes(pkg.region);
  });

  const relatedDestinations = DESTINATIONS.filter(
    (d) => d.slug !== slug && (destination?.country === d.country || DESTINATIONS.indexOf(d) < 4)
  ).slice(0, 3);

  if (!destination) {
    return (
      <div className="min-h-screen bg-background">
        <Nav />
        <section className="flex min-h-[60vh] items-center justify-center px-6">
          <div className="max-w-md text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-accent/20 to-amber-500/20">
              <AlertTriangle className="h-10 w-10 text-accent" />
            </div>
            <h1 className="font-display text-3xl font-bold text-dark">
              Destination Not Found
            </h1>
            <p className="mt-4 text-muted-foreground font-sans leading-relaxed">
              The destination you're looking for doesn't exist or has been moved.
            </p>
            <Link
              to="/destinations"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-cyan-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40 hover:scale-105"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              Back to Destinations
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Nav />

      {/* Hero */}
      <section className="relative flex min-h-[65vh] items-end overflow-hidden bg-dark">
        <div className="absolute inset-0">
          <Img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full"
            aspectRatio="aspect-auto"
            rounded="rounded-none"
            index={destIndex}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
        <div className="absolute top-1/4 left-1/3 h-80 w-80 rounded-full bg-white/5 blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 h-60 w-60 rounded-full bg-primary/10 blur-[80px]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-36 lg:px-8">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10 flex items-center gap-2 text-sm text-white/50 font-sans"
          >
            <Link to="/" className="transition-colors hover:text-white/80">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/destinations" className="transition-colors hover:text-white/80">
              Destinations
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white/80">{destination.name}</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-2 text-white/50 text-sm mb-4 font-sans">
              <MapPin className="h-4 w-4" />
              {destination.country}
            </div>
            <h1 className="font-display text-5xl font-bold text-white sm:text-6xl lg:text-7xl tracking-tight">
              {destination.name}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-5 text-white/50 text-sm font-sans">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 border border-white/5">
                <Mountain className="h-4 w-4" />
                {destination.tripCount} trips
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 border border-white/5">
                <Calendar className="h-4 w-4" />
                {destination.bestSeason}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview + Quick Facts */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <Compass className="h-3 w-3" />
              Overview
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold text-dark sm:text-4xl">
              {destination.name}
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed text-lg font-sans">
              {destination.description}
            </p>
            <div className="mt-8">
              <h3 className="font-display text-lg font-bold text-dark mb-3">Best Season</h3>
              <span className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-primary/10 to-cyan-500/10 px-5 py-2.5 text-sm font-medium text-primary border border-primary/10">
                <Calendar className="h-4 w-4" />
                {destination.bestSeason}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-3xl border border-border bg-card p-8 shadow-card"
          >
            <h3 className="font-display text-lg font-bold text-dark mb-5">Quick Facts</h3>
            <div className="space-y-4">
              {[
                { label: "Country", value: destination.country },
                { label: "Available Trips", value: destination.tripCount },
                { label: "Best Season", value: destination.bestSeason },
              ].map((fact) => (
                <div key={fact.label}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground font-sans">{fact.label}</span>
                    <span className="text-sm font-semibold text-dark font-sans">{fact.value}</span>
                  </div>
                  <div className="mt-3 h-px bg-border" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Highlights */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            <Sparkles className="h-3 w-3" />
            Highlights
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-dark sm:text-4xl">
            What Makes It Special
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {destination.highlights.map((highlight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:shadow-elevated hover:-translate-y-0.5"
              >
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-cyan-500/10 transition-colors duration-300 group-hover:from-primary/20 group-hover:to-cyan-500/20">
                  <Compass className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm text-dark leading-relaxed font-sans">{highlight}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Packages */}
      {relatedPackages.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-10"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <TrendingUp className="h-3 w-3" />
              Packages
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold text-dark sm:text-4xl">
              Packages in {destination.name}
            </h2>
            <p className="mt-3 text-muted-foreground font-sans">
              {relatedPackages.length} {relatedPackages.length === 1 ? "package" : "packages"} available
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {relatedPackages.map((pkg, i) => (
              <motion.div key={pkg.id} variants={itemVariants}>
                <Link
                  to="/packages/$slug"
                  params={{ slug: pkg.slug }}
                  className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-500 hover:shadow-elevated hover:-translate-y-1.5"
                >
                  <div className="relative overflow-hidden">
                    <Img
                      src={pkg.image}
                      alt={pkg.name}
                      aspectRatio="aspect-[16/10]"
                      className="w-full transition-transform duration-700 ease-out group-hover:scale-110"
                      rounded="rounded-none"
                      index={i}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute top-4 right-4 rounded-full bg-white/95 backdrop-blur-sm px-3.5 py-1.5 text-xs font-bold text-dark shadow-lg">
                      ${pkg.price.toLocaleString()}
                    </div>
                    {pkg.originalPrice > pkg.price && (
                      <div className="absolute top-4 left-4 rounded-full bg-gradient-to-r from-accent to-amber-500 px-3.5 py-1.5 text-xs font-bold text-white shadow-lg shadow-accent/25">
                        Save ${(pkg.originalPrice - pkg.price).toLocaleString()}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${difficultyColor[pkg.difficulty]}`}>
                        {pkg.difficulty}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                      <span className="font-sans">{pkg.region}</span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-dark group-hover:text-primary transition-colors duration-300">
                      {pkg.name}
                    </h3>
                    <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground font-sans">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {pkg.duration}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        {pkg.rating} ({pkg.reviews})
                      </span>
                    </div>
                    <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all duration-300">
                      View Details
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}

      {/* Plan a Custom Trip CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl bg-dark p-14 text-center sm:p-20"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/[0.03] rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/[0.03] rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
          <div className="relative z-10">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Plan a Custom Trip to {destination.name}
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-white/50 font-sans leading-relaxed">
              Our expert team will design a personalized itinerary based on your interests,
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
                to="/destinations"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-9 py-4 text-sm font-medium text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:text-white hover:bg-white/10"
              >
                Explore All Destinations
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Related Destinations */}
      {relatedDestinations.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-10"
          >
            <h2 className="font-display text-3xl font-bold text-dark sm:text-4xl">
              Related Destinations
            </h2>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-5 sm:grid-cols-3"
          >
            {relatedDestinations.map((dest, i) => (
              <motion.div key={dest.id} variants={itemVariants}>
                <Link
                  to="/destinations/$slug"
                  params={{ slug: dest.slug }}
                  className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-500 hover:shadow-elevated hover:-translate-y-1"
                >
                  <div className="relative h-44 overflow-hidden">
                    <Img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-110"
                      aspectRatio="aspect-auto"
                      rounded="rounded-none"
                      index={DESTINATIONS.indexOf(dest) + 8}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-display text-lg font-bold text-white transition-transform duration-300 group-hover:translate-x-1">
                        {dest.name}
                      </h3>
                      <span className="text-xs text-white/60 font-sans">{dest.country}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground font-sans">
                        {dest.tripCount} trips
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-all duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}

      <Footer />
    </div>
  );
}
