// @ts-nocheck
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Mountain,
  MapPin,
  Award,
  Users,
  Globe,
  Heart,
  Clock,
  Shield,
  Target,
  Eye,
  ArrowRight,
  Star,
  ChevronRight,
  Calendar,
  Flag,
  Trophy,
  Compass,
  Sparkles,
  Quote,
} from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Img } from "@/components/Img";
import { AnimatedCounter } from "@/components/AnimatedCounter";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

const milestones = [
  {
    year: "2004",
    title: "The Beginning",
    description:
      "Founded by a group of passionate Sherpa guides in Kathmandu with a vision to share the beauty of the Himalayas with the world.",
    icon: Flag,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop&auto=format",
  },
  {
    year: "2010",
    title: "500th Trip Completed",
    description:
      "Reached the milestone of 500 successful trips, building a reputation for safety, excellence, and unforgettable experiences.",
    icon: Mountain,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop&auto=format",
  },
  {
    year: "2015",
    title: "Expanded to Bhutan",
    description:
      "Expanded operations to include Bhutan and Tibet, offering travelers even more incredible Himalayan destinations.",
    icon: Globe,
    image: "https://images.unsplash.com/photo-1553856622-d1b350d58a7f?w=600&h=400&fit=crop&auto=format",
  },
  {
    year: "2020",
    title: "1000+ Travelers",
    description:
      "Surpassed 1000 travelers served, with a growing team of expert guides and an expanding portfolio of unique experiences.",
    icon: Users,
    image: "https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=600&h=400&fit=crop&auto=format",
  },
  {
    year: "2024",
    title: "Award-Winning Agency",
    description:
      "Recognized as Nepal's premier trekking agency, winning multiple industry awards for excellence in adventure tourism.",
    icon: Trophy,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&auto=format",
  },
];

const stats = [
  { value: 20, suffix: "+", label: "Years Experience", icon: Clock },
  { value: 1000, suffix: "+", label: "Trips Completed", icon: Mountain },
  { value: 15, suffix: "+", label: "Countries Served", icon: Globe },
  { value: 98, suffix: "%", label: "Satisfaction Rate", icon: Heart },
  { value: 50, suffix: "+", label: "Expert Guides", icon: Users },
  { value: 24, suffix: "/7", label: "Support Available", icon: Shield },
];

const awards = [
  {
    title: "Nepal Tourism Board Excellence Award",
    year: "2023",
    description:
      "Recognized for outstanding contribution to sustainable tourism in Nepal.",
  },
  {
    title: "TripAdvisor Travelers' Choice",
    year: "2022-2024",
    description:
      "Consistently rated among the top 10% of travel experiences worldwide.",
  },
  {
    title: "Lonely Planet Top Pick",
    year: "2023",
    description:
      "Featured as a recommended tour operator for Himalayan adventures.",
  },
  {
    title: "World Travel Awards Nominee",
    year: "2024",
    description:
      "Nominated for Asia's Leading Adventure Tour Operator.",
  },
];

const teamMembers = [
  {
    name: "Tenzing Norgay Sherpa",
    role: "Founder & CEO",
    bio: "With 30+ years in the Himalayas, Tenzing founded the company with a dream of sharing his homeland with the world.",
    image: "https://i.pravatar.cc/300?img=11",
  },
  {
    name: "Dorji Sherpa",
    role: "Head of Operations",
    bio: "Dorji ensures every expedition runs smoothly, from logistics to safety protocols and guide training.",
    image: "https://i.pravatar.cc/300?img=16",
  },
  {
    name: "Mingma Lhamu Sherpa",
    role: "Lead Cultural Guide",
    bio: "Mingma brings Nepal's rich cultural heritage to life with her deep knowledge of traditions and history.",
    image: "https://i.pravatar.cc/300?img=21",
  },
  {
    name: "Pasang Diki Sherpa",
    role: "Safety Director",
    bio: "A certified wilderness first responder, Pasang develops and oversees all safety procedures and training.",
    image: "https://i.pravatar.cc/300?img=31",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function AboutPage() {
  return (
    <div className="min-h-screen bg-light">
      <Nav />

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&auto=format"
            alt="Himalaya Atelier Team"
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
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="text-sm font-medium text-white/90 tracking-wide font-sans">Since 2004</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Our{" "}
            <span className="bg-gradient-to-r from-accent via-amber-400 to-accent bg-clip-text text-transparent">
              Story
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl font-sans text-lg leading-relaxed text-white/70"
          >
            Born in the shadow of the world's greatest peaks, Himalaya Atelier was
            founded by Sherpa guides who believed the mountains deserved to be
            shared with respectful, curious travelers. Two decades later, that
            belief still guides every journey we craft.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="px-4 py-28 bg-white">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-14 text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <Target className="h-3 w-3" />
              Purpose
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold text-dark sm:text-4xl lg:text-5xl">
              Our{" "}
              <span className="bg-gradient-to-r from-primary to-cyan-600 bg-clip-text text-transparent">
                Purpose
              </span>
            </h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-8 md:grid-cols-2"
          >
            {[
              {
                icon: Target,
                title: "Our Mission",
                gradient: "from-accent to-orange-600",
                text: "To create transformative Himalayan experiences that connect travelers with the extraordinary landscapes, cultures, and people of the world's greatest mountain range — while preserving it for generations to come.",
              },
              {
                icon: Eye,
                title: "Our Vision",
                gradient: "from-primary to-cyan-600",
                text: "To be the most trusted and respected Himalayan travel company, known for our unwavering commitment to safety, cultural sensitivity, sustainable practices, and the kind of authentic experiences that change lives.",
              },
            ].map((card) => (
              <motion.div
                key={card.title}
                variants={item}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-10 shadow-card transition-all duration-500 hover:shadow-elevated hover:-translate-y-1"
              >
                <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${card.gradient} shadow-lg`}>
                  <card.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-display text-2xl font-bold text-dark">{card.title}</h3>
                <p className="mt-4 font-sans text-base leading-relaxed text-muted-foreground">
                  {card.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="px-4 py-28 bg-light">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16 text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              <Sparkles className="h-3 w-3" />
              By The Numbers
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold text-dark sm:text-4xl lg:text-5xl">
              Numbers That{" "}
              <span className="bg-gradient-to-r from-accent via-amber-400 to-accent bg-clip-text text-transparent">
                Speak
              </span>
            </h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={item}
                className="group bg-card rounded-2xl border border-border p-6 text-center shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
              >
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-cyan-500/10 transition-colors duration-300 group-hover:from-primary/20 group-hover:to-cyan-500/20">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="font-display text-2xl font-bold text-primary sm:text-3xl">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-1.5 font-sans text-xs text-muted-foreground leading-tight">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-4 py-28 bg-white">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16 text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <Calendar className="h-3 w-3" />
              Milestones
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold text-dark sm:text-4xl lg:text-5xl">
              Our{" "}
              <span className="bg-gradient-to-r from-primary to-cyan-600 bg-clip-text text-transparent">
                Journey
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg font-sans text-muted-foreground leading-relaxed">
              Two decades of turning Himalayan dreams into reality
            </p>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent md:left-1/2 md:-translate-x-px" />

            {milestones.map((ms, i) => (
              <motion.div
                key={ms.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className={`relative mb-14 flex items-start gap-8 md:mb-16 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-6 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-2 border-primary bg-white shadow-elevated md:left-1/2">
                  <ms.icon className="h-5 w-5 text-primary" />
                </div>

                {/* Content */}
                <div
                  className={`ml-16 flex-1 md:ml-0 ${
                    i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                  }`}
                >
                  <div className="mb-4 overflow-hidden rounded-2xl shadow-card">
                    <Img
                      src={ms.image}
                      alt={ms.title}
                      className="h-52 w-full transition-transform duration-700 hover:scale-105"
                      aspectRatio="aspect-auto"
                      rounded="rounded-2xl"
                      index={i}
                    />
                  </div>
                  <div className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/10 to-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-primary border border-primary/10`}>
                    <Calendar className="h-3 w-3" />
                    {ms.year}
                  </div>
                  <h3 className="mt-3 font-display text-xl font-bold text-dark">
                    {ms.title}
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-muted-foreground">
                    {ms.description}
                  </p>
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden flex-1 md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Certifications */}
      <section className="px-4 py-28 bg-light">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16 text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              <Award className="h-3 w-3" />
              Recognition
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold text-dark sm:text-4xl lg:text-5xl">
              Awards &{" "}
              <span className="bg-gradient-to-r from-accent via-amber-400 to-accent bg-clip-text text-transparent">
                Recognition
              </span>
            </h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {awards.map((award) => (
              <motion.div
                key={award.title}
                variants={item}
                className="group bg-card overflow-hidden rounded-2xl border border-border p-8 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
              >
                <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 shadow-lg shadow-orange-500/20 transition-transform duration-300 group-hover:scale-110">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div className="mb-2 font-sans text-xs font-semibold uppercase tracking-wider text-primary">
                  {award.year}
                </div>
                <h3 className="font-display text-lg font-bold text-dark leading-snug">
                  {award.title}
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-muted-foreground">
                  {award.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="px-4 py-28 bg-white">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16 text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <Users className="h-3 w-3" />
              Our People
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold text-dark sm:text-4xl lg:text-5xl">
              Meet the{" "}
              <span className="bg-gradient-to-r from-primary to-cyan-600 bg-clip-text text-transparent">
                Team
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg font-sans text-muted-foreground leading-relaxed">
              The passionate people behind every unforgettable journey
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.name}
                variants={item}
                className="group bg-card overflow-hidden rounded-3xl border border-border p-8 text-center shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative mx-auto mb-6 h-28 w-28">
                  <div className="h-full w-full overflow-hidden rounded-full border-4 border-primary/10 shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:border-primary/30">
                    <Img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full"
                      aspectRatio="aspect-square"
                      rounded="rounded-full"
                      index={0}
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-cyan-600 border-2 border-white shadow-lg">
                    <Award className="h-3.5 w-3.5 text-white" />
                  </div>
                </div>
                <h3 className="font-display text-lg font-bold text-dark">{member.name}</h3>
                <div className="mt-1.5 font-sans text-sm font-semibold text-primary">
                  {member.role}
                </div>
                <p className="mt-3 font-sans text-sm leading-relaxed text-muted-foreground">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-28 bg-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="absolute top-0 left-1/3 h-[400px] w-[400px] rounded-full bg-white/[0.03] blur-[120px]" />
        <div className="absolute bottom-0 right-1/3 h-[300px] w-[300px] rounded-full bg-white/[0.03] blur-[100px]" />
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
                <Compass className="h-8 w-8 text-white" />
              </div>
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                Ready to Trek With Us?
              </h2>
              <p className="mx-auto mt-5 max-w-lg font-sans text-white/60 leading-relaxed">
                Join over 1,000 travelers who have discovered the magic of the
                Himalayas with our expert Sherpa guides.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  to="/packages"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-accent to-amber-500 px-9 py-4 font-sans text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all duration-300 hover:shadow-accent/40 hover:scale-105"
                >
                  Explore Packages
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 bg-white/5 px-9 py-4 font-sans text-sm font-medium text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:text-white hover:bg-white/10"
                >
                  Contact Us
                  <ChevronRight className="h-4 w-4" />
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
