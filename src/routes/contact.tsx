// @ts-nocheck
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Send,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  ChevronDown,
  CheckCircle,
  AlertTriangle,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
} from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Img } from "@/components/Img";
import { FAQS } from "@/data/faq";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

const contactInfo = [
  {
    icon: MapPin,
    title: "Office Address",
    lines: ["Thamel, Kathmandu 44600", "Nepal"],
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Phone,
    title: "Phone",
    lines: ["+977 1 234 567 890", "+977 984 123 4567"],
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["hello@himalayaatelier.com", "bookings@himalayaatelier.com"],
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    lines: ["+977 984 123 4567"],
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: Clock,
    title: "Office Hours",
    lines: ["Sun - Fri: 9:00 AM - 6:00 PM (NPT)", "Saturday: 10:00 AM - 2:00 PM"],
    color: "from-violet-500 to-purple-600",
  },
];

const subjects = [
  "General Inquiry",
  "Trek Booking",
  "Custom Trip",
  "Group Booking",
  "Partnership",
  "Feedback",
  "Other",
];

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const faqsToShow = FAQS.slice(0, 6);

  return (
    <div className="min-h-screen bg-light">
      <Nav />

      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Img
            src="https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=1920&h=1080&fit=crop&auto=format"
            alt="Contact Himalaya Atelier"
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
            <MessageCircle className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-sm font-medium text-white/90 tracking-wide">Contact</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Get in{" "}
            <span className="text-gradient">Touch</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl font-sans text-lg leading-relaxed text-white/70"
          >
            Have questions about a trek? Want to plan a custom trip? We'd love to
            hear from you.
          </motion.p>
        </div>
      </section>

      <section className="px-4 pb-24 bg-white">
        <div className="mx-auto max-w-6xl pt-12">
          <div className="grid gap-10 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
                <h2 className="font-display text-2xl font-bold text-dark">
                  Send Us a Message
                </h2>
                <p className="mt-2 font-sans text-sm text-muted-foreground">
                  Fill out the form and we'll get back to you within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div>
                    <label className="mb-1.5 block font-sans text-xs font-medium text-muted-foreground">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full rounded-xl border border-border bg-white px-4 py-3 font-sans text-sm text-dark placeholder:text-muted-foreground/40 transition-all duration-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block font-sans text-xs font-medium text-muted-foreground">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full rounded-xl border border-border bg-white px-4 py-3 font-sans text-sm text-dark placeholder:text-muted-foreground/40 transition-all duration-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block font-sans text-xs font-medium text-muted-foreground">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 234 567 890"
                      className="w-full rounded-xl border border-border bg-white px-4 py-3 font-sans text-sm text-dark placeholder:text-muted-foreground/40 transition-all duration-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block font-sans text-xs font-medium text-muted-foreground">
                      Subject *
                    </label>
                    <div className="relative">
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full appearance-none rounded-xl border border-border bg-white px-4 py-3 pr-10 font-sans text-sm text-dark transition-all duration-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
                      >
                        <option value="" className="bg-white">
                          Select a subject
                        </option>
                        {subjects.map((s) => (
                          <option key={s} value={s} className="bg-white">
                            {s}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block font-sans text-xs font-medium text-muted-foreground">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us about your dream Himalayan adventure..."
                      className="w-full resize-none rounded-xl border border-border bg-white px-4 py-3 font-sans text-sm text-dark placeholder:text-muted-foreground/40 transition-all duration-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
                    />
                  </div>

                  <button
                    type="submit"
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 py-3.5 font-sans text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all duration-300 hover:shadow-orange-500/40 hover:scale-[1.02]"
                  >
                    {submitted ? (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        Message Sent!
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {contactInfo.map((info) => (
                <div
                  key={info.title}
                  className="group flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:shadow-elevated"
                >
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${info.color} shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                    <info.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold text-dark">
                      {info.title}
                    </h4>
                    {info.lines.map((line, i) => (
                      <p
                        key={i}
                        className="mt-0.5 font-sans text-sm text-muted-foreground"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}

              <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
                <h4 className="mb-3 font-display text-sm font-bold text-dark">
                  Follow Us
                </h4>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="group flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white text-muted-foreground transition-all duration-300 hover:border-primary/30 hover:bg-primary/10 hover:text-primary hover:shadow-sm"
                    >
                      <social.icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 bg-light">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-64 overflow-hidden rounded-2xl border border-border bg-card shadow-card sm:h-80"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="mx-auto h-12 w-12 text-primary/30" />
                <p className="mt-3 font-sans text-sm text-muted-foreground">
                  Thamel, Kathmandu, Nepal
                </p>
                <p className="mt-1 font-sans text-xs text-muted-foreground/50">
                  Google Maps integration
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 pb-24 bg-white">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="font-display text-3xl font-bold text-dark sm:text-4xl">
              Frequently Asked{" "}
              <span className="text-gradient">Questions</span>
            </h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-3"
          >
            {faqsToShow.map((faq) => (
              <motion.div
                key={faq.id}
                variants={item}
                className="overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-card"
              >
                <button
                  onClick={() =>
                    setOpenFaq(openFaq === faq.id ? null : faq.id)
                  }
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <h4 className="font-sans text-sm font-medium text-dark">
                    {faq.question}
                  </h4>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ${
                      openFaq === faq.id ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openFaq === faq.id ? "auto" : 0,
                    opacity: openFaq === faq.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-border px-5 pb-5 pt-4">
                    <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
