// @ts-nocheck
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Search,
  Clock,
  User,
  ArrowRight,
  BookOpen,
  Tag,
  TrendingUp,
  Mail,
  CheckCircle,
} from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Img } from "@/components/Img";
import { BLOG_POSTS } from "@/data/blog";

export const Route = createFileRoute("/journal")({
  component: JournalPage,
});

const categories = [
  "All",
  "Trekking Guides",
  "Travel Tips",
  "Health & Safety",
  "Photography",
  "Cultural Insights",
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const categoryColors: Record<string, string> = {
  "Trekking Guides": "bg-emerald-50 text-emerald-600 border-emerald-200",
  "Travel Tips": "bg-blue-50 text-blue-600 border-blue-200",
  "Health & Safety": "bg-rose-50 text-rose-600 border-rose-200",
  Photography: "bg-amber-50 text-amber-600 border-amber-200",
  "Cultural Insights": "bg-purple-50 text-purple-600 border-purple-200",
};

const popularPosts = BLOG_POSTS.slice(0, 3);

function JournalPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filtered = BLOG_POSTS.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <div className="min-h-screen bg-light">
      <Nav />

      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Img
            src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&h=1080&fit=crop&auto=format"
            alt="Travel Journal"
            className="w-full h-full"
            aspectRatio="aspect-auto"
            rounded="rounded-none"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2.5"
          >
            <BookOpen className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-sm font-medium text-white/90 tracking-wide">Journal</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Travel{" "}
            <span className="text-gradient">Stories</span>{" "}
            & Guides
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl font-sans text-lg leading-relaxed text-white/70"
          >
            Insider tips, expert guides, and stories from the trail to help you
            plan the perfect Himalayan adventure.
          </motion.p>
        </div>
      </section>

      <section className="px-4 pb-8 bg-white border-b border-border">
        <div className="mx-auto max-w-6xl pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-2"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-5 py-2.5 font-sans text-xs font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-orange-500/20"
                    : "border border-border bg-white text-muted-foreground hover:border-primary/30 hover:text-dark"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="px-4 pb-24 bg-light">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {featured && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-10"
                >
                  <Link
                    to="/journal/$slug"
                    params={{ slug: featured.slug }}
                    className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-card hover:shadow-elevated transition-all duration-500"
                  >
                    <div className="relative aspect-[16/7] overflow-hidden">
                      <Img
                        src={featured.image}
                        alt={featured.title}
                        className="w-full h-full group-hover:scale-105 transition-transform duration-700"
                        aspectRatio="aspect-auto"
                        rounded="rounded-none"
                      />
                      <div className="absolute left-4 top-4">
                        <span
                          className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-semibold ${
                            categoryColors[featured.category] ||
                            "bg-white text-dark border-border"
                          }`}
                        >
                          {featured.category}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>
                    <div className="p-6 sm:p-8">
                      <h2 className="font-display text-2xl font-bold leading-snug text-dark transition-colors duration-300 group-hover:text-primary sm:text-3xl">
                        {featured.title}
                      </h2>
                      <p className="mt-3 font-sans text-sm leading-relaxed text-muted-foreground line-clamp-2">
                        {featured.excerpt}
                      </p>
                      <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <User className="h-3 w-3" />
                          {featured.author}
                        </span>
                        <span>{featured.date}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {featured.readTime}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}

              <motion.div
                key={activeCategory + searchQuery}
                variants={container}
                initial="hidden"
                animate="show"
                className="grid gap-6 sm:grid-cols-2"
              >
                {rest.map((post, i) => (
                  <motion.div key={post.id} variants={item}>
                    <Link
                      to="/journal/$slug"
                      params={{ slug: post.slug }}
                      className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-card hover:shadow-elevated transition-all duration-500"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full group-hover:scale-105 transition-transform duration-700"
                          aspectRatio="aspect-auto"
                          rounded="rounded-none"
                          index={i}
                        />
                        <div className="absolute left-3 top-3">
                          <span
                            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[9px] font-semibold ${
                              categoryColors[post.category] ||
                              "bg-white text-dark border-border"
                            }`}
                          >
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-display text-base font-bold leading-snug text-dark transition-colors duration-300 group-hover:text-primary">
                          {post.title}
                        </h3>
                        <p className="mt-2 font-sans text-xs leading-relaxed text-muted-foreground line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
                          <span>{post.author}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-2.5 w-2.5" />
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl border border-border bg-card p-6 shadow-card"
              >
                <h4 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-dark">
                  Search
                </h4>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl border border-border bg-white py-2.5 pl-10 pr-4 font-sans text-sm text-dark placeholder:text-muted-foreground/40 transition-all duration-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="rounded-2xl border border-border bg-card p-6 shadow-card"
              >
                <h4 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-dark">
                  Categories
                </h4>
                <div className="space-y-2">
                  {categories.slice(1).map((cat) => {
                    const count = BLOG_POSTS.filter(
                      (p) => p.category === cat
                    ).length;
                    return (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left font-sans text-sm text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-dark"
                      >
                        <span className="flex items-center gap-2">
                          <Tag className="h-3 w-3" />
                          {cat}
                        </span>
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium">
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-2xl border border-border bg-card p-6 shadow-card"
              >
                <h4 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-dark">
                  Popular Posts
                </h4>
                <div className="space-y-4">
                  {popularPosts.map((post, i) => (
                    <Link
                      key={post.id}
                      to="/journal/$slug"
                      params={{ slug: post.slug }}
                      className="group flex gap-3"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 font-display text-sm font-bold text-primary">
                        {i + 1}
                      </div>
                      <div>
                        <h5 className="font-sans text-sm font-medium leading-snug text-dark transition-color group-hover:text-primary line-clamp-2">
                          {post.title}
                        </h5>
                        <span className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                          <Clock className="h-2.5 w-2.5" />
                          {post.readTime}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 p-6"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <h4 className="font-display text-base font-bold text-dark">
                  Newsletter
                </h4>
                <p className="mt-1 font-sans text-xs leading-relaxed text-muted-foreground">
                  Get the latest trekking tips and exclusive offers straight to
                  your inbox.
                </p>
                <form onSubmit={handleSubscribe} className="mt-4 space-y-3">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-xl border border-border bg-white py-2.5 px-4 font-sans text-sm text-dark placeholder:text-muted-foreground/40 transition-all duration-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 py-2.5 font-sans text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:shadow-orange-500/30 hover:scale-[1.02]"
                  >
                    {subscribed ? (
                      <span className="flex items-center justify-center gap-1.5">
                        <CheckCircle className="h-4 w-4" />
                        Subscribed!
                      </span>
                    ) : (
                      "Subscribe"
                    )}
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
