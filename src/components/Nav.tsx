// @ts-nocheck
import { Link, useMatch } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, Mountain, ArrowRight, Phone, Check } from "lucide-react";

const navLinks = [
  { label: "Trips", to: "/packages" },
  { label: "Destinations", to: "/destinations" },
  { label: "About", to: "/about" },
  { label: "Journal", to: "/journal" },
  { label: "Contact", to: "/contact" },
];

function InquiryModal({ open, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", phone: "" });
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-md rounded-[20px] bg-white p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {submitted ? (
              <div className="flex flex-col items-center py-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0F766E]/10">
                  <Check className="h-8 w-8 text-[#0F766E]" />
                </div>
                <h3 className="mt-4 text-[20px] font-semibold text-[#111827]">Thank You!</h3>
                <p className="mt-2 text-[14px] text-[#6B7280]">We'll get back to you soon.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="text-[20px] font-semibold text-[#111827]">Plan Your Trip</h3>
                  <button
                    onClick={onClose}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-[#6B7280] hover:bg-[#F3F4F6]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-2 text-[14px] text-[#6B7280]">
                  Fill in your details and we'll get back to you shortly.
                </p>
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="text-[13px] font-medium text-[#374151]">Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="mt-1.5 w-full rounded-[10px] border border-[#E5E7EB] px-4 py-3 text-[14px] text-[#111827] outline-none transition-colors focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-[13px] font-medium text-[#374151]">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="mt-1.5 w-full rounded-[10px] border border-[#E5E7EB] px-4 py-3 text-[14px] text-[#111827] outline-none transition-colors focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="text-[13px] font-medium text-[#374151]">Phone</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="mt-1.5 w-full rounded-[10px] border border-[#E5E7EB] px-4 py-3 text-[14px] text-[#111827] outline-none transition-colors focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                      placeholder="+977 9800000000"
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-2 w-full rounded-full bg-[#111827] px-6 py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#1F2937]"
                  >
                    Submit Inquiry
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open || inquiryOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open, inquiryOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-[0_1px_3px_rgb(0,0,0,0.04)]"
            : "bg-gradient-to-b from-black/40 via-black/20 to-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-10">
          <a href="/" onClick={() => window.scrollTo({ top: 0, behavior: "instant" })} className="flex items-center gap-3">
            <Mountain className={`h-6 w-6 transition-colors duration-500 ${scrolled ? "text-[#0F766E]" : "text-[#F5F0E8]"}`} />
            <span className={`text-[19px] font-semibold tracking-tight transition-colors duration-500 ${scrolled ? "text-[#111827]" : "text-[#F5F0E8]"}`}>
              Himalaya Atelier
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <NavLink key={l.to} {...l} scrolled={scrolled} />
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="tel:+9779800000000"
              className={`hidden items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-medium transition-all duration-300 sm:inline-flex ${
                scrolled
                  ? "text-[#4B5563] hover:bg-[#F3F4F6] hover:text-[#111827]"
                  : "text-[#F5F0E8]/90 hover:bg-white/10 hover:text-[#F5F0E8]"
              }`}
            >
              <Phone className="h-4 w-4" />
              <span className="hidden md:inline">Call Now</span>
            </a>

            <a
              href="https://wa.me/9779800000000"
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-medium transition-all duration-300 sm:inline-flex ${
                scrolled
                  ? "text-[#25D366] hover:bg-[#25D366]/10"
                  : "text-[#25D366] hover:bg-[#25D366]/10"
              }`}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span className="hidden md:inline">WhatsApp</span>
            </a>

            <button
              onClick={() => setInquiryOpen(true)}
              className={`rounded-full px-4 py-2 text-[12px] font-semibold transition-all duration-300 inline-flex sm:px-5 sm:py-2.5 sm:text-[13px] lg:px-6 ${
                scrolled
                  ? "bg-[#111827] text-white hover:bg-[#1F2937] hover:shadow-lg"
                  : "bg-[#F5F0E8] text-[#111827] hover:bg-white hover:shadow-lg"
              }`}
            >
              Plan a trip
            </button>

            <button
              onClick={() => setOpen(!open)}
              className={`flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 lg:hidden ${
                scrolled ? "text-[#111827] hover:bg-[#F3F4F6]" : "text-[#F5F0E8] hover:bg-white/10"
              }`}
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <InquiryModal open={inquiryOpen} onClose={() => setInquiryOpen(false)} />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-white lg:hidden"
          >
            <div className="flex h-[72px] items-center justify-between px-6">
              <a href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
                <Mountain className="h-6 w-6 text-[#0F766E]" />
                <span className="text-[19px] font-semibold text-[#111827]">Himalaya Atelier</span>
              </a>
              <button
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full text-[#111827] hover:bg-[#F3F4F6]"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="px-6 pt-6">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-[#F3F4F6] py-4 text-[18px] font-medium text-[#111827] transition-colors hover:text-[#0F766E]"
                  >
                    {l.label}
                    <ArrowRight className="h-4 w-4 text-[#D1D5DB]" />
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="mt-8 space-y-3"
              >
                <a
                  href="tel:+9779800000000"
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-[#111827] px-6 py-3.5 text-[14px] font-medium text-[#111827] transition-colors hover:bg-[#111827] hover:text-white"
                >
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>
                <button
                  onClick={() => { setOpen(false); setInquiryOpen(true); }}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#111827] px-6 py-3.5 text-[14px] font-medium text-white transition-colors hover:bg-[#1F2937]"
                >
                  Plan a trip
                  <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href="https://wa.me/9779800000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-[#25D366] px-6 py-3.5 text-[14px] font-medium text-[#25D366] transition-colors hover:bg-[#25D366] hover:text-white"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  WhatsApp us
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ label, to, scrolled }) {
  const match = useMatch({ to, fuzzy: to !== "/contact" });
  const isActive = !!match;

  return (
    <Link
      to={to}
      className={`relative px-4 py-2 text-[15px] font-medium transition-all duration-300 ${
        isActive
          ? scrolled ? "text-[#111827]" : "text-[#F5F0E8]"
          : scrolled ? "text-[#4B5563] hover:text-[#111827]" : "text-[#F5F0E8]/80 hover:text-[#F5F0E8]"
      }`}
    >
      {label}
    </Link>
  );
}
