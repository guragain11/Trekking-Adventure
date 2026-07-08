// @ts-nocheck
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Mountain,
  Compass,
  Plane,
  Camera,
  TreePine,
  Users,
  Eye,
  Crown,
  Heart,
  Footprints,
  Waves,
  Wind,
  Star,
  Clock,
  ArrowRight,
  ChevronRight,
  AlertTriangle,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Img } from "@/components/Img";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ADVENTURES } from "@/data/adventures";
import { PACKAGES } from "@/data/packages";

export const Route = createFileRoute("/adventures/$slug")({
  component: AdventureDetailPage,
});

const iconMap: Record<string, React.ReactNode> = {
  mountain: <Mountain className="h-10 w-10" />,
  summit: <Mountain className="h-10 w-10" />,
  plane: <Plane className="h-10 w-10" />,
  landmark: <Eye className="h-10 w-10" />,
  trees: <TreePine className="h-10 w-10" />,
  users: <Users className="h-10 w-10" />,
  camera: <Camera className="h-10 w-10" />,
  crown: <Crown className="h-10 w-10" />,
  heart: <Heart className="h-10 w-10" />,
  compass: <Compass className="h-10 w-10" />,
  waves: <Waves className="h-10 w-10" />,
  wind: <Wind className="h-10 w-10" />,
};

const gradientMap: Record<string, string> = {
  mountain: "from-blue-500 to-indigo-600",
  summit: "from-rose-500 to-pink-600",
  plane: "from-sky-400 to-blue-600",
  landmark: "from-amber-400 to-orange-600",
  trees: "from-emerald-400 to-green-600",
  users: "from-violet-400 to-purple-600",
  camera: "from-pink-400 to-rose-600",
  crown: "from-yellow-400 to-amber-600",
  heart: "from-red-400 to-rose-600",
  compass: "from-teal-400 to-cyan-600",
  waves: "from-blue-400 to-cyan-600",
  wind: "from-slate-400 to-gray-600",
};

const categoryMap: Record<string, string> = {
  trekking: "Trekking",
  "peak-climbing": "Peak Climbing",
  "helicopter-tours": "Helicopter",
  "cultural-tours": "Cultural",
  "jungle-safari": "Safari",
  "family-holidays": "Family",
  "photography-tours": "Photography",
  "luxury-travel": "Luxury",
  "honeymoon-tours": "Luxury",
  "day-hiking": "Trekking",
  rafting: "Trekking",
  paragliding: "Trekking",
};

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

function AdventureDetailPage() {
  const { slug } = useParams({ from: "/adventures/$slug" });
  const adventure = ADVENTURES.find((a) => a.slug === slug);
  const adventureIndex = ADVENTURES.findIndex((a) => a.slug === slug);

  const matchingCategory = categoryMap[slug] || "Trekking";
  const relatedPackages = PACKAGES.filter((pkg) => pkg.category === matchingCategory);

  const relatedAdventures = ADVENTURES.filter((a) => a.slug !== slug).slice(0, 4);

  if (!adventure) {
    return (
      <div className="min-h-screen bg-background">
        <Nav />
        <section className="flex min-h-[60vh] items-center justify-center px-6">
          <div className="max-w-md text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-accent/20 to-amber-500/20">
              <AlertTriangle className="h-10 w-10 text-accent" />
            </div>
            <h1 className="font-display text-3xl font-bold text-dark">
              Adventure Not Found
            </h1>
            <p className="mt-4 text-muted-foreground font-sans leading-relaxed">
              The adventure category you're looking for doesn't exist or has been moved.
            </p>
            <Link
              to="/adventures"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-cyan-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40 hover:scale-105"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              Back to Adventures
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
            src={adventure.image}
            alt={adventure.name}
            className="w-full h-full"
            aspectRatio="aspect-auto"
            rounded="rounded-none"
            index={adventureIndex >= 0 ? adventureIndex : 0}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
        <div className="absolute top-1/3 right-1/4 h-80 w-80 rounded-full bg-white/5 blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/3 h-60 w-60 rounded-full bg-primary/10 blur-[80px]" />

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
            <Link to="/adventures" className="transition-colors hover:text-white/80">
              Adventures
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white/80">{adventure.name}</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-end gap-6"
          >
            <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${gradientMap[adventure.icon] || "from-blue-500 to-indigo-600"} text-white shadow-lg`}>
              {iconMap[adventure.icon] || <Mountain className="h-10 w-10" />}
            </div>
            <div>
              <h1 className="font-display text-5xl font-bold text-white sm:text-6xl lg:text-7xl tracking-tight">
                {adventure.name}
              </h1>
              <div className="mt-4 flex items-center gap-3 text-white/50 text-sm font-sans">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 border border-white/5">
                  <Mountain className="h-4 w-4" />
                  {adventure.tripCount} trips available
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <Compass className="h-3 w-3" />
            Overview
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-dark sm:text-4xl">
            {adventure.name}
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed text-lg font-sans">
            {adventure.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/10 to-cyan-500/10 px-4 py-2 text-sm font-semibold text-primary border border-primary/10">
              {adventure.tripCount} trips
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-secondary/10 to-emerald-500/10 px-4 py-2 text-sm font-semibold text-secondary border border-secondary/10">
              {matchingCategory}
            </span>
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
              {adventure.name} Packages
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

      {relatedPackages.length === 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
          <div className="rounded-3xl border border-border bg-card p-16 text-center shadow-card">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-cyan-500/10">
              <Mountain className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-display text-2xl font-bold text-dark">
              Packages Coming Soon
            </h3>
            <p className="mt-3 text-muted-foreground max-w-md mx-auto font-sans leading-relaxed">
              We're currently curating packages for this adventure category. Check back soon
              or contact us for a custom itinerary.
            </p>
            <Link
              to="/plan-my-trip"
              className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-primary to-cyan-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40 hover:scale-105"
            >
              Plan a Custom Trip
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      )}

      {/* Related Adventures */}
      {relatedAdventures.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-10"
          >
            <h2 className="font-display text-3xl font-bold text-dark sm:text-4xl">
              Related Adventures
            </h2>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {relatedAdventures.map((adv, i) => (
              <motion.div key={adv.id} variants={itemVariants}>
                <Link
                  to="/adventures/$slug"
                  params={{ slug: adv.slug }}
                  className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-500 hover:shadow-elevated hover:-translate-y-1"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Img
                      src={adv.image}
                      alt={adv.name}
                      className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-110"
                      aspectRatio="aspect-auto"
                      rounded="rounded-none"
                      index={ADVENTURES.indexOf(adv)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute top-3 right-3 rounded-lg bg-white/10 p-2 text-white backdrop-blur-sm">
                      {iconMap[adv.icon] ? (
                        <div className="scale-75">{iconMap[adv.icon]}</div>
                      ) : (
                        <Mountain className="h-5 w-5" />
                      )}
                    </div>
                    <div className="absolute bottom-3 left-4 right-4">
                      <h3 className="font-display text-base font-bold text-white transition-transform duration-300 group-hover:translate-x-1">
                        {adv.name}
                      </h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-primary font-sans">
                        {adv.tripCount} trips
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
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/[0.03] rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/[0.03] rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
          <div className="relative z-10">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Explore All Adventures
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-white/50 font-sans leading-relaxed">
              Browse our full collection of adventure categories and find the perfect
              experience for your Himalayan journey.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/adventures"
                className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-primary to-cyan-500 px-9 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-primary/40 hover:scale-105"
              >
                Explore All Adventures
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/plan-my-trip"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-9 py-4 text-sm font-medium text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:text-white hover:bg-white/10"
              >
                Plan a Custom Trip
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
