// @ts-nocheck
import { createFileRoute, Link } from "@tanstack/react-router";
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
  MapPin,
  ArrowRight,
  Sparkles,
  Trophy,
} from "lucide-react";
import { Img } from "@/components/Img";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ADVENTURES } from "@/data/adventures";

export const Route = createFileRoute("/adventures")({
  component: AdventuresPage,
});

const iconMap: Record<string, React.ReactNode> = {
  mountain: <Mountain className="h-7 w-7" />,
  summit: <Mountain className="h-7 w-7" />,
  plane: <Plane className="h-7 w-7" />,
  landmark: <Eye className="h-7 w-7" />,
  trees: <TreePine className="h-7 w-7" />,
  users: <Users className="h-7 w-7" />,
  camera: <Camera className="h-7 w-7" />,
  crown: <Crown className="h-7 w-7" />,
  heart: <Heart className="h-7 w-7" />,
  compass: <Compass className="h-7 w-7" />,
  waves: <Waves className="h-7 w-7" />,
  wind: <Wind className="h-7 w-7" />,
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function AdventuresPage() {
  const totalTrips = ADVENTURES.reduce((sum, a) => sum + a.tripCount, 0);

  return (
    <div className="min-h-screen bg-background">
      <Nav />

      {/* Hero */}
      <section className="relative flex min-h-[75vh] items-center justify-center overflow-hidden bg-dark">
        <div className="absolute inset-0">
          <Img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&h=1080&fit=crop&auto=format"
            alt="Mountain Adventure"
            className="w-full h-full"
            aspectRatio="aspect-auto"
            rounded="rounded-none"
            index={0}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
        <div className="absolute top-1/3 left-1/4 h-[500px] w-[500px] rounded-full bg-secondary/10 blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/3 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[120px]" />

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
              Adventure Awaits
            </motion.span>
            <h1 className="mt-8 font-display text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-[5.5rem] lg:leading-[1.05]">
              Adventure{" "}
              <span className="bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text text-transparent">
                Categories
              </span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-lg text-white/60 leading-relaxed font-sans">
              From adrenaline-pumping peak climbs to serene cultural tours, find the
              perfect adventure that matches your spirit. Every journey is crafted with
              local expertise and unmatched attention to detail.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/plan-my-trip"
                className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-primary to-cyan-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-primary/40 hover:scale-105"
              >
                Plan My Adventure
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/packages"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-medium text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:text-white hover:bg-white/10"
              >
                Browse Packages
              </Link>
            </div>
          </motion.div>
        </div>

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

      {/* Adventures Grid — 12 cards */}
      <section className="relative -mt-24 z-20 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {ADVENTURES.map((adventure, i) => (
            <motion.div key={adventure.id} variants={cardVariants}>
              <Link
                to="/adventures/$slug"
                params={{ slug: adventure.slug }}
                className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-500 hover:shadow-elevated hover:-translate-y-2"
              >
                <div className="relative h-52 overflow-hidden">
                  <Img
                    src={adventure.image}
                    alt={adventure.name}
                    className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-110"
                    aspectRatio="aspect-auto"
                    rounded="rounded-none"
                    index={i}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Icon */}
                  <div className={`absolute top-4 right-4 rounded-xl bg-gradient-to-br ${gradientMap[adventure.icon] || "from-blue-500 to-indigo-600"} p-2.5 text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                    {iconMap[adventure.icon] || <Mountain className="h-7 w-7" />}
                  </div>

                  {/* Title */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-display text-xl font-bold text-white transition-transform duration-300 group-hover:translate-x-1">
                      {adventure.name}
                    </h3>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 font-sans">
                    {adventure.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-semibold text-primary font-sans">
                      {adventure.tripCount} trips
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:gap-2.5 font-sans">
                      Explore
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl bg-dark p-14 sm:p-20"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
          <div className="absolute top-0 left-1/4 h-[300px] w-[300px] rounded-full bg-white/[0.03] blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 h-[250px] w-[250px] rounded-full bg-white/[0.03] blur-[80px]" />
          <div className="relative z-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Adventure Types", value: "12+", desc: "Categories to choose from", icon: Sparkles },
              { label: "Total Trips", value: `${totalTrips}+`, desc: "Curated adventures", icon: Mountain },
              { label: "Destinations", value: "8", desc: "Himalayan regions", icon: MapPin },
              { label: "Years Experience", value: "20+", desc: "Of Himalayan expertise", icon: Trophy },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white/60">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="font-display text-4xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="mt-1.5 text-sm font-semibold text-accent font-sans">{stat.label}</div>
                <div className="mt-1 text-xs text-white/40 font-sans">{stat.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="font-display text-3xl font-bold text-dark sm:text-4xl lg:text-5xl">
            Ready for Your Next Adventure?
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-muted-foreground font-sans leading-relaxed">
            Let us design the perfect adventure based on your interests and experience level.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/plan-my-trip"
              className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-accent to-amber-500 px-9 py-4 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all duration-300 hover:shadow-accent/40 hover:scale-105"
            >
              Plan My Adventure
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-9 py-4 text-sm font-medium text-dark transition-all duration-300 hover:bg-muted hover:border-border/80"
            >
              Browse Packages
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
