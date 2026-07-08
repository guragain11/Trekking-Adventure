// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Img } from "@/components/Img";
import { PACKAGES } from "@/data/packages";
import {
  Mountain,
  ArrowRight,
  ArrowLeft,
  Check,
  Phone,
  Mail,
  Users,
  Calendar,
  CreditCard,
  Shield,
  Clock,
  Award,
  Star,
  Plus,
  Trash2,
  MapPin,
  ChevronDown,
  Compass,
  Sparkles,
  Heart,
  Loader2,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/plan-my-trip")({
  component: PlanMyTripPage,
});

const STEPS = [
  { id: 1, label: "Your Details", icon: Users },
  { id: 2, label: "Select Package", icon: Compass },
  { id: 3, label: "Trip Dates", icon: Calendar },
  { id: 4, label: "Travelers", icon: Users },
  { id: 5, label: "Preferences", icon: Heart },
  { id: 6, label: "Payment", icon: CreditCard },
  { id: 7, label: "Review", icon: CheckCircle2 },
];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 4 }, (_, i) => CURRENT_YEAR + i);

const ACCOMMODATION_OPTIONS = [
  { value: "budget", label: "Budget Teahouse", price: 0, desc: "Basic shared rooms" },
  {
    value: "standard",
    label: "Standard Teahouse",
    price: 25,
    desc: "Private rooms, attached bath",
  },
  { value: "luxury", label: "Luxury Lodge", price: 80, desc: "Premium amenities, hot shower" },
  { value: "5star", label: "5-Star Hotel", price: 200, desc: "Full-service luxury" },
  { value: "camping", label: "Camping", price: 15, desc: "Tent accommodation on trail" },
  { value: "teahouse", label: "Teahouse", price: 10, desc: "Traditional mountain inn" },
];

const INTERESTS = [
  { value: "photography", label: "Photography", icon: "📷" },
  { value: "culture", label: "Culture & Heritage", icon: "🏛️" },
  { value: "wildlife", label: "Wildlife", icon: "🦌" },
  { value: "meditation", label: "Meditation & Yoga", icon: "🧘" },
  { value: "food", label: "Local Cuisine", icon: "🍜" },
  { value: "adventure", label: "Adventure Sports", icon: "🏔️" },
];

const FITNESS_LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];

const createEmptyTraveler = () => ({
  firstName: "",
  lastName: "",
  age: "",
  nationality: "",
  passport: "",
  dietary: "",
  medical: "",
});

const STORAGE_KEY = "himalaya-booking-data";

function PlanMyTripPage() {
  const [step, setStep] = useState(1);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          /* ignore */
        }
      }
    }
    return {
      fullName: "",
      email: "",
      phone: "",
      country: "",
      selectedPackage: null,
      month: "",
      year: "",
      flexibleDates: false,
      travelers: [createEmptyTraveler()],
      fitnessLevel: "",
      accommodation: "",
      interests: [],
      notes: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvv: "",
      cardName: "",
      promoCode: "",
      savePayment: false,
      acceptTerms: false,
    };
  });

  useEffect(() => {
    const toSave = { ...formData };
    delete toSave.cardCvv;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  }, [formData]);

  const update = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const selectedPkg = useMemo(
    () => PACKAGES.find((p) => p.id === formData.selectedPackage),
    [formData.selectedPackage],
  );

  const travelerCount = formData.travelers.length;

  const totalCost = useMemo(() => {
    if (!selectedPkg) return 0;
    const base = selectedPkg.price * travelerCount;
    const accOption = ACCOMMODATION_OPTIONS.find((a) => a.value === formData.accommodation);
    const accCost = accOption ? accOption.price * travelerCount : 0;
    return base + accCost;
  }, [selectedPkg, travelerCount, formData.accommodation]);

  const validateStep = useCallback(() => {
    const errs = {};
    switch (step) {
      case 1:
        if (!formData.fullName.trim()) errs.fullName = "Full name is required";
        if (!formData.email.trim()) errs.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = "Invalid email";
        if (!formData.phone.trim()) errs.phone = "Phone is required";
        if (!formData.country.trim()) errs.country = "Country is required";
        break;
      case 2:
        if (!formData.selectedPackage) errs.selectedPackage = "Please select a package";
        break;
      case 3:
        if (!formData.month) errs.month = "Month is required";
        if (!formData.year) errs.year = "Year is required";
        break;
      case 4:
        formData.travelers.forEach((t, i) => {
          if (!t.firstName.trim()) errs[`traveler_${i}_firstName`] = "Required";
          if (!t.lastName.trim()) errs[`traveler_${i}_lastName`] = "Required";
          if (!t.age || Number(t.age) < 1 || Number(t.age) > 100)
            errs[`traveler_${i}_age`] = "Valid age required";
          if (!t.nationality.trim()) errs[`traveler_${i}_nationality`] = "Required";
          if (!t.passport.trim()) errs[`traveler_${i}_passport`] = "Required";
        });
        break;
      case 5:
        if (!formData.fitnessLevel) errs.fitnessLevel = "Select fitness level";
        if (!formData.accommodation) errs.accommodation = "Select accommodation";
        break;
      case 6:
        if (!formData.cardNumber.replace(/\s/g, "").match(/^\d{16}$/))
          errs.cardNumber = "Valid card number required";
        if (!formData.cardExpiry.match(/^\d{2}\/\d{2}$/)) errs.cardExpiry = "MM/YY format required";
        if (!formData.cardCvv.match(/^\d{3,4}$/)) errs.cardCvv = "Valid CVV required";
        if (!formData.cardName.trim()) errs.cardName = "Name on card required";
        break;
      case 7:
        if (!formData.acceptTerms) errs.acceptTerms = "You must accept the terms";
        break;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [step, formData]);

  const next = useCallback(() => {
    if (validateStep()) {
      setStep((s) => Math.min(s + 1, 7));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [validateStep]);

  const prev = useCallback(() => {
    setStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const confirmBooking = useCallback(() => {
    if (!validateStep()) return;
    const id =
      "HA-" +
      Date.now().toString(36).toUpperCase() +
      Math.random().toString(36).substring(2, 6).toUpperCase();
    setBookingId(id);
    setBookingConfirmed(true);
    localStorage.removeItem(STORAGE_KEY);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [validateStep]);

  const addTraveler = () => update("travelers", [...formData.travelers, createEmptyTraveler()]);
  const removeTraveler = (idx) => {
    if (formData.travelers.length <= 1) return;
    update(
      "travelers",
      formData.travelers.filter((_, i) => i !== idx),
    );
  };
  const updateTraveler = (idx, field, value) => {
    const updated = [...formData.travelers];
    updated[idx] = { ...updated[idx], [field]: value };
    update("travelers", updated);
  };

  const formatCardNumber = (val) => {
    const digits = val.replace(/\D/g, "").substring(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  if (bookingConfirmed) {
    return (
      <div className="min-h-screen bg-background">
        <Nav />
        <div className="flex min-h-screen items-center justify-center px-4 pt-24 pb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl"
          >
            <div className="rounded-3xl border border-border bg-card p-8 shadow-luxury text-center sm:p-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-primary"
              >
                <CheckCircle2 className="h-10 w-10 text-white" />
              </motion.div>
              <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
                Booking Confirmed!
              </h1>
              <p className="mt-3 text-muted-foreground">
                Your Himalayan adventure is booked. Get ready for the journey of a lifetime.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-muted px-6 py-3">
                <span className="text-sm text-muted-foreground">Booking ID:</span>
                <span className="font-display text-lg font-bold text-primary">{bookingId}</span>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-border bg-background p-4">
                  <Mail className="mx-auto h-5 w-5 text-accent" />
                  <p className="mt-2 text-xs text-muted-foreground">Confirmation sent to</p>
                  <p className="text-sm font-medium text-foreground truncate">{formData.email}</p>
                </div>
                <div className="rounded-2xl border border-border bg-background p-4">
                  <Calendar className="mx-auto h-5 w-5 text-accent" />
                  <p className="mt-2 text-xs text-muted-foreground">Trip Date</p>
                  <p className="text-sm font-medium text-foreground">
                    {formData.month} {formData.year}
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-background p-4">
                  <Users className="mx-auto h-5 w-5 text-accent" />
                  <p className="mt-2 text-xs text-muted-foreground">Travelers</p>
                  <p className="text-sm font-medium text-foreground">
                    {travelerCount} person{travelerCount > 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <div className="mt-8 rounded-2xl border border-border bg-muted/50 p-6 text-left">
                <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  What Happens Next
                </h3>
                <ul className="mt-4 space-y-3">
                  {[
                    "You'll receive a detailed itinerary via email within 24 hours",
                    "Our travel coordinator will contact you to finalize arrangements",
                    "Pre-departure briefing 2 weeks before your trip",
                    "Emergency support line available 24/7 during your trek",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <section className="relative overflow-hidden bg-dark pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute top-0 left-1/2 h-64 w-[500px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-sans text-xs font-medium uppercase tracking-widest text-accent">
              <Sparkles className="h-3 w-3" /> Plan Your Adventure
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold text-light sm:text-5xl lg:text-6xl">
              Plan My <span className="text-gradient">Trip</span>
            </h1>
            <p className="mx-auto mt-4 max-w-lg font-sans text-base text-light/60">
              Tell us about your dream Himalayan adventure and we'll craft the perfect itinerary.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-9">
            <StepIndicator step={step} />
            <div className="mt-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  {step === 1 && (
                    <StepDetails formData={formData} update={update} errors={errors} />
                  )}
                  {step === 2 && (
                    <StepPackage formData={formData} update={update} errors={errors} />
                  )}
                  {step === 3 && <StepDates formData={formData} update={update} errors={errors} />}
                  {step === 4 && (
                    <StepTravelers
                      formData={formData}
                      updateTraveler={updateTraveler}
                      addTraveler={addTraveler}
                      removeTraveler={removeTraveler}
                      errors={errors}
                    />
                  )}
                  {step === 5 && (
                    <StepPreferences formData={formData} update={update} errors={errors} />
                  )}
                  {step === 6 && (
                    <StepPayment
                      formData={formData}
                      update={update}
                      errors={errors}
                      formatCardNumber={formatCardNumber}
                    />
                  )}
                  {step === 7 && (
                    <StepReview
                      formData={formData}
                      update={update}
                      selectedPkg={selectedPkg}
                      totalCost={totalCost}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-8 flex items-center justify-between">
              {step > 1 ? (
                <button
                  onClick={prev}
                  className="group flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 font-sans text-sm font-medium text-foreground transition-all duration-300 hover:bg-muted"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />{" "}
                  Back
                </button>
              ) : (
                <div />
              )}
              {step < 7 ? (
                <button
                  onClick={next}
                  className="group flex items-center gap-2 rounded-xl bg-gradient-primary px-8 py-3 font-sans text-sm font-semibold text-white shadow-luxury transition-all duration-300 hover:shadow-accent hover:scale-105"
                >
                  Continue{" "}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              ) : (
                <button
                  onClick={confirmBooking}
                  className="group flex items-center gap-2 rounded-xl bg-gradient-accent px-8 py-3 font-sans text-sm font-semibold text-white shadow-luxury transition-all duration-300 hover:shadow-accent hover:scale-105"
                >
                  <Shield className="h-4 w-4" /> Confirm & Pay
                </button>
              )}
            </div>
          </div>

          <aside className="mt-10 lg:col-span-3 lg:mt-0">
            <div className="sticky top-28 space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Booking Summary
                </h3>
                <div className="mt-4 space-y-3">
                  {selectedPkg ? (
                    <>
                      <Img
                        src={selectedPkg.image}
                        alt={selectedPkg.name}
                        className="w-full"
                        aspectRatio="aspect-[16/9]"
                      />
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-sans text-sm font-medium text-foreground">
                            {selectedPkg.name}
                          </p>
                          <p className="font-sans text-xs text-muted-foreground">
                            {selectedPkg.duration} · {selectedPkg.difficulty}
                          </p>
                        </div>
                        <span className="font-sans text-sm font-bold text-primary">
                          ${selectedPkg.price.toLocaleString()}
                        </span>
                      </div>
                      {formData.month && formData.year && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" />
                          {formData.month} {formData.year}
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-3.5 w-3.5" />
                        {travelerCount} traveler{travelerCount > 1 ? "s" : ""}
                      </div>
                    </>
                  ) : (
                    <p className="font-sans text-sm text-muted-foreground">
                      No package selected yet
                    </p>
                  )}
                  <div className="border-t border-border pt-3">
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-sm text-muted-foreground">Total</span>
                      <span className="font-display text-xl font-bold text-foreground">
                        ${totalCost.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  What's Included
                </h3>
                <ul className="mt-3 space-y-2">
                  {(
                    selectedPkg?.includes?.slice(0, 5) || [
                      "Airport transfers",
                      "All accommodations",
                      "Expert local guides",
                      "Meals on trek",
                      "Permits & fees",
                    ]
                  ).map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Check className="mt-0.5 h-3 w-3 shrink-0 text-secondary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-accent/20 bg-accent/5 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                    <Shield className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-sans text-sm font-semibold text-foreground">
                      Secure Booking
                    </p>
                    <p className="font-sans text-xs text-muted-foreground">
                      SSL encrypted & 100% safe
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-sans text-sm font-semibold text-foreground">
                      Best Price Guarantee
                    </p>
                    <p className="font-sans text-xs text-muted-foreground">
                      We match any competitor's price
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/10">
                    <Clock className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-sans text-sm font-semibold text-foreground">
                      Free Cancellation
                    </p>
                    <p className="font-sans text-xs text-muted-foreground">
                      Cancel up to 30 days before
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function StepIndicator({ step }) {
  return (
    <div className="hidden sm:block">
      <div className="relative flex items-center justify-between">
        <div className="absolute left-0 right-0 top-5 h-0.5 bg-muted" />
        <motion.div
          className="absolute left-0 top-5 h-0.5 bg-gradient-primary origin-left"
          initial={{ width: "0%" }}
          animate={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
        {STEPS.map((s) => {
          const Icon = s.icon;
          const isActive = step === s.id;
          const isCompleted = step > s.id;
          return (
            <div key={s.id} className="relative z-10 flex flex-col items-center">
              <motion.div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  isCompleted
                    ? "border-primary bg-primary text-white"
                    : isActive
                      ? "border-accent bg-accent text-white shadow-accent"
                      : "border-border bg-card text-muted-foreground"
                }`}
                animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.4 }}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
              </motion.div>
              <span
                className={`mt-2 font-sans text-xs font-medium whitespace-nowrap ${isActive ? "text-accent" : isCompleted ? "text-primary" : "text-muted-foreground"}`}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FormField({ label, icon: Icon, error, children }) {
  return (
    <div>
      <label className="mb-1.5 block font-sans text-sm font-medium text-foreground">{label}</label>
      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
        )}
        {children}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 font-sans text-xs text-red-500"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

function StepDetails({ formData, update, errors }) {
  const inputCls = (hasIcon) =>
    `w-full rounded-xl border border-border bg-background py-3 ${hasIcon ? "pl-11" : "pl-4"} pr-4 font-sans text-sm text-foreground placeholder:text-muted-foreground/40 transition-all duration-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20`;

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <Users className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">Your Details</h2>
          <p className="font-sans text-sm text-muted-foreground">
            Tell us who's booking this adventure
          </p>
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Full Name" icon={Users} error={errors.fullName}>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            placeholder="John Smith"
            className={inputCls(true)}
          />
        </FormField>
        <FormField label="Email Address" icon={Mail} error={errors.email}>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="john@example.com"
            className={inputCls(true)}
          />
        </FormField>
        <FormField label="Phone Number" icon={Phone} error={errors.phone}>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+1 234 567 890"
            className={inputCls(true)}
          />
        </FormField>
        <FormField label="Country" icon={MapPin} error={errors.country}>
          <input
            type="text"
            value={formData.country}
            onChange={(e) => update("country", e.target.value)}
            placeholder="United States"
            className={inputCls(true)}
          />
        </FormField>
      </div>
    </div>
  );
}

function StepPackage({ formData, update, errors }) {
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...new Set(PACKAGES.map((p) => p.category))];
  const filtered = filter === "All" ? PACKAGES : PACKAGES.filter((p) => p.category === filter);

  const difficultyColor = {
    Easy: "bg-secondary/10 text-secondary",
    Moderate: "bg-primary/10 text-primary",
    Challenging: "bg-accent/10 text-accent",
    Strenuous: "bg-red-500/10 text-red-500",
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <Compass className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">Select Package</h2>
          <p className="font-sans text-sm text-muted-foreground">
            Choose your dream Himalayan adventure
          </p>
        </div>
      </div>
      {errors.selectedPackage && (
        <p className="mb-4 rounded-xl bg-red-500/10 px-4 py-2 font-sans text-sm text-red-500">
          {errors.selectedPackage}
        </p>
      )}
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`rounded-lg px-4 py-2 font-sans text-xs font-medium transition-all duration-200 ${
              filter === cat
                ? "bg-primary text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((pkg) => {
          const isSelected = formData.selectedPackage === pkg.id;
          return (
            <motion.button
              key={pkg.id}
              onClick={() => update("selectedPackage", pkg.id)}
              whileHover={{ y: -2 }}
              className={`group relative w-full rounded-2xl border-2 p-0 text-left transition-all duration-300 overflow-hidden ${
                isSelected
                  ? "border-primary shadow-card"
                  : "border-border hover:border-primary/30 hover:shadow-card"
              }`}
            >
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="absolute top-3 right-3 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-primary"
                >
                  <Check className="h-3.5 w-3.5 text-white" />
                </motion.div>
              )}
              <Img
                src={pkg.image}
                alt={pkg.name}
                className="w-full"
                aspectRatio="aspect-[16/9]"
                rounded="rounded-t-2xl rounded-b-none"
              />
              <div className="p-5">
                <h3 className="font-display text-base font-bold text-foreground truncate">
                  {pkg.name}
                </h3>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-muted px-2 py-0.5 font-sans text-xs text-muted-foreground">
                    {pkg.category}
                  </span>
                  <span
                    className={`rounded-md px-2 py-0.5 font-sans text-xs font-medium ${difficultyColor[pkg.difficulty]}`}
                  >
                    {pkg.difficulty}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-3 font-sans text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {pkg.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {pkg.region}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                    <span className="font-sans text-xs font-semibold text-foreground">
                      {pkg.rating}
                    </span>
                    <span className="font-sans text-xs text-muted-foreground">
                      ({pkg.reviews})
                    </span>
                  </div>
                  <div>
                    {pkg.originalPrice > pkg.price && (
                      <span className="mr-2 font-sans text-xs text-muted-foreground line-through">
                        ${pkg.originalPrice.toLocaleString()}
                      </span>
                    )}
                    <span className="font-display text-lg font-bold text-primary">
                      ${pkg.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function StepDates({ formData, update, errors }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <Calendar className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">Trip Dates</h2>
          <p className="font-sans text-sm text-muted-foreground">When would you like to travel?</p>
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Month" icon={Calendar} error={errors.month}>
          <div className="relative">
            <select
              value={formData.month}
              onChange={(e) => update("month", e.target.value)}
              className="w-full appearance-none rounded-xl border border-border bg-background py-3 pl-11 pr-10 font-sans text-sm text-foreground transition-all duration-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Select month</option>
              {MONTHS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
          </div>
        </FormField>
        <FormField label="Year" icon={Calendar} error={errors.year}>
          <div className="relative">
            <select
              value={formData.year}
              onChange={(e) => update("year", e.target.value)}
              className="w-full appearance-none rounded-xl border border-border bg-background py-3 pl-11 pr-10 font-sans text-sm text-foreground transition-all duration-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Select year</option>
              {YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
          </div>
        </FormField>
      </div>
      <div className="mt-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.flexibleDates}
            onChange={(e) => update("flexibleDates", e.target.checked)}
            className="h-4 w-4 rounded border-border accent-primary"
          />
          <div>
            <span className="font-sans text-sm font-medium text-foreground">
              I'm flexible with dates
            </span>
            <p className="font-sans text-xs text-muted-foreground">
              We'll find the best availability within your preferred month
            </p>
          </div>
        </label>
      </div>
      {formData.month && formData.year && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 rounded-xl bg-primary/5 border border-primary/20 p-4"
        >
          <p className="font-sans text-sm text-primary">
            <Check className="mr-1 inline h-4 w-4" />
            Selected:{" "}
            <strong>
              {formData.month} {formData.year}
            </strong>
            {formData.flexibleDates && " (Flexible)"}
          </p>
        </motion.div>
      )}
    </div>
  );
}

function StepTravelers({ formData, updateTraveler, addTraveler, removeTraveler, errors }) {
  const inputCls =
    "w-full rounded-xl border border-border bg-background py-3 pl-4 pr-4 font-sans text-sm text-foreground placeholder:text-muted-foreground/40 transition-all duration-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-foreground">Travelers</h2>
            <p className="font-sans text-sm text-muted-foreground">Add details for each traveler</p>
          </div>
        </div>
        <button
          onClick={addTraveler}
          className="flex items-center gap-1.5 rounded-xl bg-primary/10 px-4 py-2 font-sans text-xs font-medium text-primary transition-all hover:bg-primary/20"
        >
          <Plus className="h-3.5 w-3.5" /> Add
        </button>
      </div>
      <div className="space-y-6">
        {formData.travelers.map((traveler, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl border ${idx === 0 ? "border-primary/20 bg-primary/5" : "border-border bg-background"} p-5`}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-sm font-semibold text-foreground">
                Traveler {idx + 1}{" "}
                {idx === 0 && (
                  <span className="text-xs font-normal text-muted-foreground">(Lead)</span>
                )}
              </h3>
              {idx > 0 && (
                <button
                  onClick={() => removeTraveler(idx)}
                  className="flex items-center gap-1 rounded-lg px-2 py-1 font-sans text-xs text-red-500 transition-colors hover:bg-red-500/10"
                >
                  <Trash2 className="h-3 w-3" /> Remove
                </button>
              )}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block font-sans text-xs font-medium text-muted-foreground">
                  First Name *
                </label>
                <input
                  type="text"
                  value={traveler.firstName}
                  onChange={(e) => updateTraveler(idx, "firstName", e.target.value)}
                  placeholder="First name"
                  className={inputCls}
                />
                {errors[`traveler_${idx}_firstName`] && (
                  <p className="mt-1 font-sans text-xs text-red-500">
                    {errors[`traveler_${idx}_firstName`]}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-1 block font-sans text-xs font-medium text-muted-foreground">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={traveler.lastName}
                  onChange={(e) => updateTraveler(idx, "lastName", e.target.value)}
                  placeholder="Last name"
                  className={inputCls}
                />
                {errors[`traveler_${idx}_lastName`] && (
                  <p className="mt-1 font-sans text-xs text-red-500">
                    {errors[`traveler_${idx}_lastName`]}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-1 block font-sans text-xs font-medium text-muted-foreground">
                  Age *
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={traveler.age}
                  onChange={(e) => updateTraveler(idx, "age", e.target.value)}
                  placeholder="Age"
                  className={inputCls}
                />
                {errors[`traveler_${idx}_age`] && (
                  <p className="mt-1 font-sans text-xs text-red-500">
                    {errors[`traveler_${idx}_age`]}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-1 block font-sans text-xs font-medium text-muted-foreground">
                  Nationality *
                </label>
                <input
                  type="text"
                  value={traveler.nationality}
                  onChange={(e) => updateTraveler(idx, "nationality", e.target.value)}
                  placeholder="Nationality"
                  className={inputCls}
                />
                {errors[`traveler_${idx}_nationality`] && (
                  <p className="mt-1 font-sans text-xs text-red-500">
                    {errors[`traveler_${idx}_nationality`]}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-1 block font-sans text-xs font-medium text-muted-foreground">
                  Passport Number *
                </label>
                <input
                  type="text"
                  value={traveler.passport}
                  onChange={(e) => updateTraveler(idx, "passport", e.target.value)}
                  placeholder="Passport number"
                  className={inputCls}
                />
                {errors[`traveler_${idx}_passport`] && (
                  <p className="mt-1 font-sans text-xs text-red-500">
                    {errors[`traveler_${idx}_passport`]}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-1 block font-sans text-xs font-medium text-muted-foreground">
                  Dietary Requirements
                </label>
                <input
                  type="text"
                  value={traveler.dietary}
                  onChange={(e) => updateTraveler(idx, "dietary", e.target.value)}
                  placeholder="e.g., Vegetarian, Vegan"
                  className={inputCls}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block font-sans text-xs font-medium text-muted-foreground">
                  Medical Conditions
                </label>
                <input
                  type="text"
                  value={traveler.medical}
                  onChange={(e) => updateTraveler(idx, "medical", e.target.value)}
                  placeholder="Any conditions we should know about"
                  className={inputCls}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function StepPreferences({ formData, update, errors }) {
  const toggleInterest = (interest) => {
    const current = formData.interests || [];
    const next = current.includes(interest)
      ? current.filter((i) => i !== interest)
      : [...current, interest];
    update("interests", next);
  };
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <Heart className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">Preferences</h2>
          <p className="font-sans text-sm text-muted-foreground">
            Help us customize your perfect trip
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="mb-3 font-display text-sm font-semibold text-foreground">Fitness Level *</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {FITNESS_LEVELS.map((level) => (
            <button
              key={level}
              onClick={() => update("fitnessLevel", level)}
              className={`rounded-xl border-2 px-4 py-3 font-sans text-sm font-medium transition-all duration-200 ${
                formData.fitnessLevel === level
                  ? "border-primary bg-primary/5 text-primary shadow-card"
                  : "border-border bg-background text-muted-foreground hover:border-primary/30"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
        {errors.fitnessLevel && (
          <p className="mt-2 font-sans text-xs text-red-500">{errors.fitnessLevel}</p>
        )}
      </div>

      <div className="mb-8">
        <h3 className="mb-3 font-display text-sm font-semibold text-foreground">
          Accommodation Type *
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {ACCOMMODATION_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => update("accommodation", opt.value)}
              className={`group flex items-center justify-between rounded-xl border-2 p-4 text-left transition-all duration-200 ${
                formData.accommodation === opt.value
                  ? "border-primary bg-primary/5 shadow-card"
                  : "border-border bg-background hover:border-primary/30"
              }`}
            >
              <div>
                <p className="font-sans text-sm font-medium text-foreground">{opt.label}</p>
                <p className="font-sans text-xs text-muted-foreground">{opt.desc}</p>
              </div>
              <span
                className={`font-sans text-sm font-bold ${opt.price === 0 ? "text-secondary" : "text-primary"}`}
              >
                {opt.price === 0 ? "Included" : `+$${opt.price}/night`}
              </span>
            </button>
          ))}
        </div>
        {errors.accommodation && (
          <p className="mt-2 font-sans text-xs text-red-500">{errors.accommodation}</p>
        )}
      </div>

      <div className="mb-8">
        <h3 className="mb-3 font-display text-sm font-semibold text-foreground">
          Special Interests
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {INTERESTS.map((interest) => {
            const selected = (formData.interests || []).includes(interest.value);
            return (
              <button
                key={interest.value}
                onClick={() => toggleInterest(interest.value)}
                className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all duration-200 ${
                  selected
                    ? "border-accent bg-accent/5 shadow-card"
                    : "border-border bg-background hover:border-accent/30"
                }`}
              >
                <span className="text-lg">{interest.icon}</span>
                <span className="font-sans text-sm font-medium text-foreground">
                  {interest.label}
                </span>
                {selected && <Check className="ml-auto h-4 w-4 text-accent" />}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="mb-2 block font-sans text-sm font-semibold text-foreground">
          Additional Notes
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => update("notes", e.target.value)}
          rows={4}
          placeholder="Any special requirements, celebrations, dietary needs, or questions..."
          className="w-full rounded-xl border border-border bg-background px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground/40 transition-all duration-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
        />
      </div>
    </div>
  );
}

function StepPayment({ formData, update, errors, formatCardNumber }) {
  const inputCls =
    "w-full rounded-xl border border-border bg-background py-3 pl-11 pr-4 font-sans text-sm text-foreground placeholder:text-muted-foreground/40 transition-all duration-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

  const detectCardBrand = (num) => {
    const n = num.replace(/\s/g, "");
    if (/^4/.test(n)) return "Visa";
    if (/^5[1-5]/.test(n)) return "Mastercard";
    if (/^3[47]/.test(n)) return "Amex";
    if (/^6(?:011|5)/.test(n)) return "Discover";
    return null;
  };

  const cardBrand = detectCardBrand(formData.cardNumber);

  const brandColors = {
    Visa: "bg-blue-600",
    Mastercard: "bg-red-500",
    Amex: "bg-emerald-600",
    Discover: "bg-orange-500",
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <CreditCard className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">Payment Details</h2>
          <p className="font-sans text-sm text-muted-foreground">Secure payment processing</p>
        </div>
      </div>

      <div className="mb-6 rounded-xl bg-secondary/5 border border-secondary/20 p-4">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-secondary" />
          <p className="font-sans text-sm font-medium text-secondary">
            Your payment is secured with 256-bit SSL encryption
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <FormField label="Name on Card" icon={CreditCard} error={errors.cardName}>
          <input
            type="text"
            value={formData.cardName}
            onChange={(e) => update("cardName", e.target.value)}
            placeholder="John Smith"
            className={inputCls}
          />
        </FormField>
        <FormField label="Card Number" icon={CreditCard} error={errors.cardNumber}>
          <div className="relative">
            <input
              type="text"
              value={formData.cardNumber}
              onChange={(e) => update("cardNumber", formatCardNumber(e.target.value))}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className={`${inputCls} pr-20`}
            />
            {cardBrand && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`absolute right-3 top-1/2 -translate-y-1/2 rounded-md ${brandColors[cardBrand]} px-2 py-0.5 font-sans text-[10px] font-bold text-white`}
              >
                {cardBrand}
              </motion.span>
            )}
          </div>
        </FormField>
        <div className="grid grid-cols-2 gap-5">
          <FormField label="Expiry Date" icon={Clock} error={errors.cardExpiry}>
            <input
              type="text"
              value={formData.cardExpiry}
              onChange={(e) => {
                let val = e.target.value.replace(/\D/g, "").substring(0, 4);
                if (val.length >= 2) val = val.substring(0, 2) + "/" + val.substring(2);
                update("cardExpiry", val);
              }}
              placeholder="MM/YY"
              maxLength={5}
              className={inputCls}
            />
          </FormField>
          <FormField label="CVV" icon={Shield} error={errors.cardCvv}>
            <input
              type="text"
              value={formData.cardCvv}
              onChange={(e) => update("cardCvv", e.target.value.replace(/\D/g, "").substring(0, 4))}
              placeholder="123"
              maxLength={4}
              className={inputCls}
            />
          </FormField>
        </div>
        <FormField label="Promo Code" icon={Sparkles} error={null}>
          <input
            type="text"
            value={formData.promoCode}
            onChange={(e) => update("promoCode", e.target.value.toUpperCase())}
            placeholder="Enter code"
            className={inputCls}
          />
        </FormField>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.savePayment}
            onChange={(e) => update("savePayment", e.target.checked)}
            className="h-4 w-4 rounded border-border accent-primary"
          />
          <span className="font-sans text-sm text-foreground">
            Save payment details for future bookings
          </span>
        </label>
      </div>
    </div>
  );
}

function StepReview({ formData, update, selectedPkg, totalCost }) {
  const accOption = ACCOMMODATION_OPTIONS.find((a) => a.value === formData.accommodation);

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <CheckCircle2 className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">Review Booking</h2>
          <p className="font-sans text-sm text-muted-foreground">
            Please review your booking details
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-2xl border border-border bg-background p-5">
          <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Your Details
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 font-sans text-sm">
            <div>
              <span className="text-muted-foreground">Name:</span>{" "}
              <span className="ml-2 font-medium text-foreground">{formData.fullName}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Email:</span>{" "}
              <span className="ml-2 font-medium text-foreground">{formData.email}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Phone:</span>{" "}
              <span className="ml-2 font-medium text-foreground">{formData.phone}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Country:</span>{" "}
              <span className="ml-2 font-medium text-foreground">{formData.country}</span>
            </div>
          </div>
        </div>

        {selectedPkg && (
          <div className="rounded-2xl border border-border bg-background p-5">
            <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Package
            </h3>
            <div className="flex items-start gap-4">
              <Img
                src={selectedPkg.image}
                alt={selectedPkg.name}
                className="w-20 shrink-0"
                aspectRatio="aspect-square"
                rounded="rounded-xl"
              />
              <div>
                <p className="font-sans text-sm font-bold text-foreground">{selectedPkg.name}</p>
                <p className="font-sans text-xs text-muted-foreground">
                  {selectedPkg.duration} · {selectedPkg.region} · {selectedPkg.difficulty}
                </p>
                <p className="mt-1 font-display text-lg font-bold text-primary">
                  ${selectedPkg.price.toLocaleString()}{" "}
                  <span className="text-xs font-normal text-muted-foreground">per person</span>
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-border bg-background p-5">
          <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Trip Details
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 font-sans text-sm">
            <div>
              <span className="text-muted-foreground">Dates:</span>{" "}
              <span className="ml-2 font-medium text-foreground">
                {formData.month} {formData.year}
                {formData.flexibleDates ? " (Flexible)" : ""}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Travelers:</span>{" "}
              <span className="ml-2 font-medium text-foreground">{formData.travelers.length}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Fitness:</span>{" "}
              <span className="ml-2 font-medium text-foreground">{formData.fitnessLevel}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Accommodation:</span>{" "}
              <span className="ml-2 font-medium text-foreground">{accOption?.label || "—"}</span>
            </div>
            {formData.interests.length > 0 && (
              <div className="sm:col-span-2">
                <span className="text-muted-foreground">Interests:</span>{" "}
                <span className="ml-2 font-medium text-foreground">
                  {formData.interests.join(", ")}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-background p-5">
          <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Travelers
          </h3>
          {formData.travelers.map((t, i) => (
            <div key={i} className="flex items-center gap-3 py-2 font-sans text-sm">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                {i + 1}
              </span>
              <span className="font-medium text-foreground">
                {t.firstName} {t.lastName}
              </span>
              <span className="text-muted-foreground">
                · {t.age} yrs · {t.nationality}
              </span>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-accent/20 bg-accent/5 p-5">
          <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Cost Breakdown
          </h3>
          <div className="space-y-3 font-sans text-sm">
            {selectedPkg && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Package ({formData.travelers.length} × ${selectedPkg.price.toLocaleString()})
                </span>
                <span className="font-medium text-foreground">
                  ${(selectedPkg.price * formData.travelers.length).toLocaleString()}
                </span>
              </div>
            )}
            {accOption && accOption.price > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {accOption.label} upgrade ({formData.travelers.length} × ${accOption.price})
                </span>
                <span className="font-medium text-foreground">
                  ${(accOption.price * formData.travelers.length).toLocaleString()}
                </span>
              </div>
            )}
            <div className="border-t border-border pt-2" />
            <div className="flex justify-between">
              <span className="font-semibold text-foreground">Total</span>
              <span className="font-display text-xl font-bold text-primary">
                ${totalCost.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <label className="flex items-start gap-3 cursor-pointer rounded-xl border border-border bg-background p-4">
          <input
            type="checkbox"
            checked={formData.acceptTerms}
            onChange={(e) => update("acceptTerms", e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-primary"
          />
          <span className="font-sans text-sm text-muted-foreground">
            I agree to the{" "}
            <a href="#" className="text-primary hover:underline">
              Terms & Conditions
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:underline">
              Cancellation Policy
            </a>
            . I understand that a confirmation email will be sent to my provided email address.
          </span>
        </label>
      </div>
    </div>
  );
}
