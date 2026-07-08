// @ts-nocheck
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Clock,
  User,
  ChevronRight,
  Share2,
  BookOpen,
  ArrowRight,
  Calendar,
  Tag,
} from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Img } from "@/components/Img";
import { BLOG_POSTS } from "@/data/blog";

export const Route = createFileRoute("/journal/$slug")({
  component: BlogDetailPage,
});

const placeholderParagraphs = [
  "The Himalayas stand as the world's greatest mountain range, a place where the earth reaches toward the sky with snow-capped peaks that have inspired adventurers, spiritual seekers, and dreamers for millennia. Trekking through these ancient landscapes is more than just physical exertion — it's a journey into the heart of nature's most magnificent creation.",
  "Every step along the trail reveals new wonders: from the lush rhododendron forests of the lower altitudes to the stark, moon-like landscapes of the high passes. The air grows thinner, the views more dramatic, and the sense of accomplishment more profound with each passing day. This is the essence of Himalayan trekking — a transformative experience that stays with you long after you've returned home.",
  "Our guides, born and raised in these mountains, bring an unparalleled depth of knowledge to every expedition. They share stories of Sherpa traditions, point out medicinal plants used for centuries, and guide you safely through challenging terrain. Their expertise isn't just professional — it's deeply personal, rooted in generations of mountain culture.",
  "Whether you're a first-time trekker or a seasoned mountaineer, the Himalayas offer something for everyone. The key is proper preparation, respectful engagement with local communities, and a willingness to let the mountains teach you about yourself. In this guide, we'll cover everything you need to know to make your Himalayan dream a reality.",
  "From choosing the right route and season to packing essentials and understanding altitude acclimatization, we've distilled decades of experience into practical advice. Our goal is simple: to help you have the safest, most rewarding experience possible in the world's greatest mountain range.",
];

const categoryColors: Record<string, string> = {
  "Trekking Guides": "bg-emerald-50 text-emerald-600 border-emerald-200",
  "Travel Tips": "bg-blue-50 text-blue-600 border-blue-200",
  "Health & Safety": "bg-rose-50 text-rose-600 border-rose-200",
  Photography: "bg-amber-50 text-amber-600 border-amber-200",
  "Cultural Insights": "bg-purple-50 text-purple-600 border-purple-200",
};

function BlogDetailPage() {
  const { slug } = Route.useParams();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-light">
        <Nav />
        <div className="flex min-h-[60vh] items-center justify-center px-4">
          <div className="text-center">
            <h1 className="font-display text-4xl font-bold text-dark">Post Not Found</h1>
            <p className="mt-4 font-sans text-muted-foreground">
              The article you're looking for doesn't exist.
            </p>
            <Link
              to="/journal"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-3 font-sans text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all duration-300 hover:shadow-orange-500/40"
            >
              Back to Journal
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedPosts = BLOG_POSTS.filter(
    (p) => p.id !== post.id && p.category === post.category
  ).slice(0, 3);

  const allRelated = relatedPosts.length > 0
    ? relatedPosts
    : BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 3);

  const authorInitials = post.author
    .split(" ")
    .map((n) => n[0])
    .filter((_, i, arr) => i === 0 || i === arr.length - 1)
    .join("");

  return (
    <div className="min-h-screen bg-light">
      <Nav />

      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Img
            src={post.image}
            alt={post.title}
            className="w-full h-full"
            aspectRatio="aspect-auto"
            rounded="rounded-none"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

        <div className="relative z-10 mx-auto w-full max-w-4xl px-4 pb-16 pt-24">
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex items-center gap-2 font-sans text-xs text-white/60"
          >
            <Link to="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/journal" className="transition-colors hover:text-white">
              Blog
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white/80">{post.title}</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${
              categoryColors[post.category] || "bg-white text-dark border-border"
            }`}>
              {post.category}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            {post.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/70"
          >
            <span className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
          </motion.div>
        </div>
      </section>

      <section className="px-4 pb-20 bg-white">
        <div className="mx-auto max-w-3xl pt-12">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="prose-custom"
          >
            <p className="mb-8 font-sans text-lg leading-relaxed text-dark font-medium">
              {post.excerpt}
            </p>

            {placeholderParagraphs.map((paragraph, i) => (
              <p
                key={i}
                className="mb-6 font-sans text-base leading-[1.8] text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
          </motion.article>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 flex items-center gap-4 border-t border-border pt-8"
          >
            <span className="flex items-center gap-2 font-sans text-sm text-muted-foreground">
              <Share2 className="h-4 w-4" />
              Share this article
            </span>
            <div className="flex gap-2">
              {["Twitter", "Facebook", "LinkedIn", "Copy Link"].map((platform) => (
                <button
                  key={platform}
                  className="rounded-full border border-border bg-white px-4 py-1.5 font-sans text-xs text-muted-foreground transition-all duration-300 hover:border-primary/30 hover:text-primary hover:shadow-sm"
                >
                  {platform}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-12 flex gap-5 rounded-2xl border border-border bg-card p-6 shadow-card"
          >
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-lg font-bold text-white shadow-lg shadow-orange-500/20">
              {authorInitials}
            </div>
            <div>
              <h4 className="font-display text-lg font-bold text-dark">{post.author}</h4>
              <p className="mt-0.5 font-sans text-xs text-primary font-medium">
                Himalaya Atelier Guide
              </p>
              <p className="mt-2 font-sans text-sm leading-relaxed text-muted-foreground">
                Born and raised in the Himalayas, {post.author.split(" ")[0]}{" "}
                brings over a decade of guiding experience to every expedition.
                Passionate about sharing the beauty and culture of the mountains
                with travelers from around the world.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {allRelated.length > 0 && (
        <section className="px-4 pb-24 bg-light">
          <div className="mx-auto max-w-6xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8 font-display text-2xl font-bold text-dark"
            >
              Related{" "}
              <span className="text-gradient">Articles</span>
            </motion.h2>

            <motion.div
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.1 } },
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {allRelated.map((rp, i) => (
                <motion.div
                  key={rp.id}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: "easeOut" },
                    },
                  }}
                >
                  <Link
                    to="/journal/$slug"
                    params={{ slug: rp.slug }}
                    className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-card hover:shadow-elevated transition-all duration-500"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Img
                        src={rp.image}
                        alt={rp.title}
                        className="w-full h-full group-hover:scale-105 transition-transform duration-700"
                        aspectRatio="aspect-auto"
                        rounded="rounded-none"
                        index={i}
                      />
                    </div>
                    <div className="p-5">
                      <div className="mb-2">
                        <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[9px] font-semibold ${
                          categoryColors[rp.category] || "bg-muted text-muted-foreground border-border"
                        }`}>
                          {rp.category}
                        </span>
                      </div>
                      <h3 className="font-display text-base font-bold leading-snug text-dark transition-colors duration-300 group-hover:text-primary">
                        {rp.title}
                      </h3>
                      <p className="mt-2 font-sans text-xs leading-relaxed text-muted-foreground line-clamp-2">
                        {rp.excerpt}
                      </p>
                      <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
                        <span>{rp.author}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-2.5 w-2.5" />
                          {rp.readTime}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-10 text-center"
            >
              <Link
                to="/journal"
                className="group inline-flex items-center gap-2 rounded-xl border border-border bg-white px-6 py-3 font-sans text-sm font-medium text-dark shadow-sm transition-all duration-300 hover:border-primary/30 hover:text-primary hover:shadow-md"
              >
                <ArrowRight className="h-4 w-4 rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
                Back to Journal
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
