// @ts-nocheck
import { Link } from "@tanstack/react-router";
import { Mountain, MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0C1222]">
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4A574]/30 to-transparent" />

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      {/* Floating orbs */}
      <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-[#D4A574]/5 blur-[100px]" />
      <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-[#0F766E]/5 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10">
        {/* Newsletter */}
        <div className="mb-16 flex flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#D4A574]"
          >
            Newsletter
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-[1.25rem] font-medium text-white"
          >
            Stories from the trail
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-2 max-w-sm text-[13px] text-white/40"
          >
            Trek updates, travel tips, and behind-the-scenes from our team in Kathmandu.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-5 flex w-full max-w-md gap-0"
          >
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 border border-r-0 border-white/10 bg-white/[0.03] px-5 py-3.5 text-[13px] text-white placeholder-white/25 outline-none transition-all focus:border-[#D4A574]/40 focus:bg-white/[0.05]"
            />
            <button className="group flex items-center gap-2 border border-[#D4A574]/40 bg-[#D4A574]/10 px-6 py-3.5 text-[12px] font-medium text-[#D4A574] transition-all hover:bg-[#D4A574]/20">
              Subscribe
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </motion.div>
        </div>

        {/* Main grid */}
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-4"
          >
            <Link to="/" className="group inline-flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center border border-white/10 bg-white/5 transition-all duration-300 group-hover:border-[#D4A574]/30 group-hover:bg-[#D4A574]/10">
                <Mountain className="h-5 w-5 text-[#D4A574] transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div>
                <span className="text-[16px] font-medium text-white">Himalaya</span>
                <span className="ml-1 text-[16px] font-light text-white/40 transition-colors group-hover:text-white/60">Atelier</span>
              </div>
            </Link>
            <p className="mt-5 max-w-[280px] text-[13px] leading-[1.8] text-white/40">
              Handcrafted trekking expeditions and cultural journeys 
              across Nepal, Bhutan, and Tibet since 2004.
            </p>
            <div className="mt-6 flex gap-2">
              {[
                { n: "Instagram", i: "IG", c: "hover:border-pink-500/30 hover:text-pink-400" },
                { n: "Facebook", i: "FB", c: "hover:border-blue-500/30 hover:text-blue-400" },
                { n: "YouTube", i: "YT", c: "hover:border-red-500/30 hover:text-red-400" },
                { n: "Twitter", i: "X", c: "hover:border-sky-500/30 hover:text-sky-400" },
              ].map((s) => (
                <a
                  key={s.n}
                  href="#"
                  aria-label={s.n}
                  className={`flex h-9 w-9 items-center justify-center border border-white/10 bg-white/[0.02] text-[10px] font-semibold tracking-wider text-white/30 transition-all duration-300 ${s.c}`}
                >
                  {s.i}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          {[
            {
              title: "Trips",
              delay: 0.15,
              links: [
                { l: "All Packages", to: "/packages" },
                { l: "Everest Region", to: "/destinations/everest-base-camp" },
                { l: "Annapurna", to: "/destinations/annapurna-circuit" },
                { l: "Langtang", to: "/destinations/langtang-valley" },
                { l: "Bhutan", to: "/destinations/bhutan" },
              ],
            },
            {
              title: "Adventures",
              delay: 0.2,
              links: [
                { l: "Peak Climbing", to: "/adventures" },
                { l: "Rafting", to: "/adventures" },
                { l: "Paragliding", to: "/adventures" },
                { l: "Mountain Biking", to: "/adventures" },
                { l: "Jungle Safari", to: "/adventures" },
              ],
            },
          ].map((col) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: col.delay }}
              className="lg:col-span-2"
            >
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/20">{col.title}</h4>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.l}>
                    <Link to={l.to} className="group/link flex items-center text-[13px] text-white/45 transition-all duration-200 hover:text-white/80">
                      <span className="inline-block transition-transform duration-200 group-hover/link:translate-x-1">{l.l}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="lg:col-span-4"
          >
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/20">Contact</h4>
            <ul className="mt-5 space-y-3">
              <li>
                <div className="group flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/10 bg-white/[0.02] transition-all duration-300 group-hover:border-[#D4A574]/30 group-hover:bg-[#D4A574]/5">
                    <MapPin className="h-4 w-4 text-white/30 transition-colors group-hover:text-[#D4A574]" />
                  </div>
                  <div className="pt-1">
                    <p className="text-[13px] text-white/55">Thamel, Kathmandu</p>
                    <p className="text-[12px] text-white/30">44600, Nepal</p>
                  </div>
                </div>
              </li>
              <li>
                <a href="tel:+9771234567890" className="group flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/10 bg-white/[0.02] transition-all duration-300 group-hover:border-[#D4A574]/30 group-hover:bg-[#D4A574]/5">
                    <Phone className="h-4 w-4 text-white/30 transition-colors group-hover:text-[#D4A574]" />
                  </div>
                  <span className="text-[13px] text-white/55 transition-colors group-hover:text-white/80">+977 1 234 567 890</span>
                </a>
              </li>
              <li>
                <a href="mailto:hello@himalayaatelier.com" className="group flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/10 bg-white/[0.02] transition-all duration-300 group-hover:border-[#D4A574]/30 group-hover:bg-[#D4A574]/5">
                    <Mail className="h-4 w-4 text-white/30 transition-colors group-hover:text-[#D4A574]" />
                  </div>
                  <span className="text-[13px] text-white/55 transition-colors group-hover:text-white/80">hello@himalayaatelier.com</span>
                </a>
              </li>
              <li>
                <a href="https://wa.me/97798000000" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#25D366]/15 bg-[#25D366]/[0.03] transition-all duration-300 group-hover:border-[#25D366]/40 group-hover:bg-[#25D366]/10">
                    <svg className="h-4 w-4 text-[#25D366]/50 transition-colors group-hover:text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </div>
                  <span className="text-[13px] text-[#25D366]/50 transition-colors group-hover:text-[#25D366]">Chat on WhatsApp</span>
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="relative mt-16 border-t border-white/[0.04] pt-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
            <div className="flex flex-wrap items-center gap-3 text-[11px] text-white/20">
              <span>© 2024 Himalaya Atelier</span>
              <span className="text-white/10">·</span>
              <span>Licensed & TAAN Registered</span>
              <span className="text-white/10">·</span>
              <span>Kathmandu, Nepal</span>
            </div>
            <div className="flex gap-5 text-[11px] text-white/20">
              <a href="#" className="transition-colors hover:text-[#D4A574]/60">Privacy</a>
              <a href="#" className="transition-colors hover:text-[#D4A574]/60">Terms</a>
              <a href="#" className="transition-colors hover:text-[#D4A574]/60">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
