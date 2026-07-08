// @ts-nocheck
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion, AnimatePresence } from "framer-motion";
import {
  SlidersHorizontal,
  X,
  ChevronDown,
  Star,
  Clock,
  Users,
  Mountain,
  ArrowUpDown,
  Loader2,
  MapPin,
  Search,
  TrendingUp,
  Compass,
  ArrowRight,
} from "lucide-react";

import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Img } from "@/components/Img";
import { WishlistButton } from "@/components/WishlistButton";
import { CompareButton } from "@/components/CompareButton";
import { PACKAGES } from "@/data/packages";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const Route = createFileRoute("/packages")({
  component: PackagesPage,
});

const REGIONS = ["Everest", "Annapurna", "Langtang", "Mustang", "Manaslu", "Kanchenjunga", "Bhutan", "Tibet"] as const;
const CATEGORIES = ["Trekking", "Peak Climbing", "Helicopter", "Cultural", "Safari", "Luxury", "Family", "Photography"] as const;
const DIFFICULTIES = ["Easy", "Moderate", "Challenging", "Strenuous"] as const;

const DURATION_RANGES = [
  { label: "1-7 days", min: 1, max: 7 },
  { label: "8-14 days", min: 8, max: 14 },
  { label: "15-21 days", min: 15, max: 21 },
  { label: "22+ days", min: 22, max: Infinity },
];

const SORT_OPTIONS = [
  { label: "Popular", value: "popular" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Duration", value: "duration" },
  { label: "Newest", value: "newest" },
];

const ITEMS_PER_PAGE = 6;

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

function PackagesPage() {
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 7000]);
  const [selectedDuration, setSelectedDuration] = useState<string>("");
  const [sortBy, setSortBy] = useState("popular");
  const [showCount, setShowCount] = useState(ITEMS_PER_PAGE);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const toggleFilter = useCallback(
    (setter: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
      setter((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      );
    },
    []
  );

  const clearAllFilters = useCallback(() => {
    setSelectedRegions([]);
    setSelectedCategories([]);
    setSelectedDifficulties([]);
    setPriceRange([0, 7000]);
    setSelectedDuration("");
  }, []);

  const activeFilterCount =
    selectedRegions.length +
    selectedCategories.length +
    selectedDifficulties.length +
    (selectedDuration ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 7000 ? 1 : 0);

  const filteredPackages = useMemo(() => {
    let result = [...PACKAGES];

    if (selectedRegions.length > 0) {
      result = result.filter((p) => selectedRegions.includes(p.region));
    }
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }
    if (selectedDifficulties.length > 0) {
      result = result.filter((p) => selectedDifficulties.includes(p.difficulty));
    }
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    if (selectedDuration) {
      const range = DURATION_RANGES.find((r) => r.label === selectedDuration);
      if (range) {
        result = result.filter((p) => p.days >= range.min && p.days <= range.max);
      }
    }

    switch (sortBy) {
      case "newest":
        result.sort((a, b) => b.days - a.days);
        break;
      case "popular":
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "duration":
        result.sort((a, b) => a.days - b.days);
        break;
    }

    return result;
  }, [selectedRegions, selectedCategories, selectedDifficulties, priceRange, selectedDuration, sortBy]);

  const visiblePackages = filteredPackages.slice(0, showCount);
  const hasMore = showCount < filteredPackages.length;

  const activeChips = useMemo(() => {
    const chips: { label: string; onRemove: () => void }[] = [];
    selectedRegions.forEach((r) =>
      chips.push({ label: r, onRemove: () => setSelectedRegions((prev) => prev.filter((v) => v !== r)) })
    );
    selectedCategories.forEach((c) =>
      chips.push({ label: c, onRemove: () => setSelectedCategories((prev) => prev.filter((v) => v !== c)) })
    );
    selectedDifficulties.forEach((d) =>
      chips.push({ label: d, onRemove: () => setSelectedDifficulties((prev) => prev.filter((v) => v !== d)) })
    );
    if (selectedDuration) {
      chips.push({ label: selectedDuration, onRemove: () => setSelectedDuration("") });
    }
    if (priceRange[0] > 0 || priceRange[1] < 7000) {
      chips.push({
        label: `$${priceRange[0].toLocaleString()} - $${priceRange[1].toLocaleString()}`,
        onRemove: () => setPriceRange([0, 7000]),
      });
    }
    return chips;
  }, [selectedRegions, selectedCategories, selectedDifficulties, priceRange, selectedDuration]);

  const difficultyColor = (d: string) => {
    switch (d) {
      case "Easy":
        return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
      case "Moderate":
        return "bg-primary/15 text-primary border-primary/30";
      case "Challenging":
        return "bg-accent/15 text-accent border-accent/30";
      case "Strenuous":
        return "bg-red-500/15 text-red-400 border-red-500/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const regionColor = (r: string) => {
    switch (r) {
      case "Everest":
        return "bg-primary/80";
      case "Annapurna":
        return "bg-accent/80";
      case "Langtang":
        return "bg-emerald-600/80";
      case "Mustang":
        return "bg-amber-600/80";
      case "Manaslu":
        return "bg-violet-600/80";
      case "Kanchenjunga":
        return "bg-rose-600/80";
      case "Bhutan":
        return "bg-sky-600/80";
      case "Tibet":
        return "bg-orange-600/80";
      default:
        return "bg-dark/80";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden bg-dark pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="absolute inset-0">
          <Img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
            alt="Himalayan mountains"
            aspectRatio="aspect-auto"
            rounded="rounded-none"
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-dark/50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(14,116,144,0.2),transparent_70%)]" />
        </div>
        <div className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute bottom-10 right-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 flex items-center gap-2 text-sm text-white/40"
          >
            <Link to="/" className="transition-colors hover:text-white/70">Home</Link>
            <span>/</span>
            <span className="text-white/70">Packages</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white/60">
              <Mountain className="h-3.5 w-3.5 text-accent" />
              Explore All Packages
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-light sm:text-5xl lg:text-6xl">
              Our Trekking{" "}
              <span className="text-gradient">Packages</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-white/50 sm:text-lg">
              From the iconic Everest Base Camp to hidden valleys of Mustang —
              find your perfect Himalayan adventure among our curated collection.
            </p>
          </motion.div>

          {/* Swiper: Featured Packages */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-12"
          >
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="featured-swiper pb-12"
            >
              {PACKAGES.slice(0, 5).map((pkg, i) => (
                <SwiperSlide key={pkg.id}>
                  <Link
                    to="/packages/$slug"
                    params={{ slug: pkg.slug }}
                    className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:border-white/20 hover:bg-white/10"
                  >
                    <div className="relative overflow-hidden">
                      <Img
                        src={pkg.image}
                        alt={pkg.name}
                        aspectRatio="aspect-[16/10]"
                        rounded="rounded-none"
                        index={pkg.id.charCodeAt(pkg.id.length - 1)}
                        className="transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />
                      <div className="absolute left-3 top-3 flex gap-2">
                        <span className="rounded-lg bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                          {pkg.region}
                        </span>
                        {pkg.originalPrice > pkg.price && (
                          <span className="rounded-lg bg-accent px-2.5 py-1 text-[10px] font-bold text-dark">
                            -{Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)}%
                          </span>
                        )}
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="font-display text-lg font-bold text-light drop-shadow-lg">
                          {pkg.name}
                        </h3>
                        <div className="mt-1 flex items-center gap-3 text-xs text-white/60">
                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {pkg.duration}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Star className="h-3 w-3 fill-accent text-accent" />
                            {pkg.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {visiblePackages.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-foreground">
              {filteredPackages.length}
            </span>{" "}
            packages
          </p>

          <div className="flex items-center gap-3">
            <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
              <SheetTrigger asChild>
                <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted lg:hidden">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-dark">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[320px] p-0">
                <SheetHeader className="border-b px-6 py-4">
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="overflow-y-auto px-6 py-4">
                  <FilterContent
                    selectedRegions={selectedRegions}
                    selectedCategories={selectedCategories}
                    selectedDifficulties={selectedDifficulties}
                    priceRange={priceRange}
                    selectedDuration={selectedDuration}
                    toggleFilter={toggleFilter}
                    setSelectedRegions={setSelectedRegions}
                    setSelectedCategories={setSelectedCategories}
                    setSelectedDifficulties={setSelectedDifficulties}
                    setPriceRange={setPriceRange}
                    setSelectedDuration={setSelectedDuration}
                    clearAllFilters={clearAllFilters}
                  />
                </div>
              </SheetContent>
            </Sheet>

            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                <ArrowUpDown className="h-4 w-4" />
                {SORT_OPTIONS.find((o) => o.value === sortBy)?.label}
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${sortOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {sortOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setSortOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-xl border border-border bg-card shadow-elevated"
                    >
                      {SORT_OPTIONS.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSortBy(option.value);
                            setSortOpen(false);
                          }}
                          className={`flex w-full items-center px-4 py-2.5 text-left text-sm transition-colors hover:bg-muted ${
                            sortBy === option.value ? "font-medium text-primary" : "text-foreground"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeChips.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-6 flex flex-wrap items-center gap-2"
          >
            {activeChips.map((chip, i) => (
              <motion.button
                key={chip.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
                onClick={chip.onRemove}
                className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/10"
              >
                {chip.label}
                <X className="h-3 w-3" />
              </motion.button>
            ))}
            <button
              onClick={clearAllFilters}
              className="text-xs font-medium text-muted-foreground underline-offset-2 hover:underline"
            >
              Clear all
            </button>
          </motion.div>
        )}

        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-24 space-y-6 rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold">Filters</h3>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs font-medium text-accent hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>
              <FilterContent
                selectedRegions={selectedRegions}
                selectedCategories={selectedCategories}
                selectedDifficulties={selectedDifficulties}
                priceRange={priceRange}
                selectedDuration={selectedDuration}
                toggleFilter={toggleFilter}
                setSelectedRegions={setSelectedRegions}
                setSelectedCategories={setSelectedCategories}
                setSelectedDifficulties={setSelectedDifficulties}
                setPriceRange={setPriceRange}
                setSelectedDuration={setSelectedDuration}
                clearAllFilters={clearAllFilters}
              />
            </div>
          </aside>

          {/* Package Grid */}
          <div className="flex-1">
            {visiblePackages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 py-20 text-center"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <Search className="h-8 w-8 text-muted-foreground/40" />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold">
                  No packages found
                </h3>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  Try adjusting your filters to discover more Himalayan adventures.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-6 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Clear Filters
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {visiblePackages.map((pkg, i) => (
                  <PackageCard key={pkg.id} pkg={pkg} index={i} />
                ))}
              </div>
            )}

            {hasMore && (
              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => setShowCount((prev) => prev + ITEMS_PER_PAGE)}
                  className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-8 py-3 text-sm font-medium text-foreground shadow-card transition-all duration-300 hover:border-primary/30 hover:shadow-glow"
                >
                  <Loader2 className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                  Load More Packages
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .featured-swiper .swiper-button-next,
        .featured-swiper .swiper-button-prev {
          color: white;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(8px);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.15);
        }
        .featured-swiper .swiper-button-next::after,
        .featured-swiper .swiper-button-prev::after {
          font-size: 14px;
        }
        .featured-swiper .swiper-pagination-bullet {
          background: rgba(255,255,255,0.4);
          opacity: 1;
        }
        .featured-swiper .swiper-pagination-bullet-active {
          background: #14b8a6;
        }
      `}</style>
    </div>
  );
}

function FilterContent({
  selectedRegions,
  selectedCategories,
  selectedDifficulties,
  priceRange,
  selectedDuration,
  toggleFilter,
  setSelectedRegions,
  setSelectedCategories,
  setSelectedDifficulties,
  setPriceRange,
  setSelectedDuration,
  clearAllFilters,
}: {
  selectedRegions: string[];
  selectedCategories: string[];
  selectedDifficulties: string[];
  priceRange: [number, number];
  selectedDuration: string;
  toggleFilter: (setter: React.Dispatch<React.SetStateAction<string[]>>, value: string) => void;
  setSelectedRegions: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedDifficulties: React.Dispatch<React.SetStateAction<string[]>>;
  setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
  setSelectedDuration: React.Dispatch<React.SetStateAction<string>>;
  clearAllFilters: () => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="mb-3 text-sm font-semibold text-foreground">Region</h4>
        <div className="space-y-2.5">
          {REGIONS.map((region) => (
            <label
              key={region}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 text-sm text-foreground transition-colors hover:bg-muted"
            >
              <Checkbox
                checked={selectedRegions.includes(region)}
                onCheckedChange={() => toggleFilter(setSelectedRegions, region)}
              />
              {region}
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-border" />

      <div>
        <h4 className="mb-3 text-sm font-semibold text-foreground">Category</h4>
        <div className="space-y-2.5">
          {CATEGORIES.map((cat) => (
            <label
              key={cat}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 text-sm text-foreground transition-colors hover:bg-muted"
            >
              <Checkbox
                checked={selectedCategories.includes(cat)}
                onCheckedChange={() => toggleFilter(setSelectedCategories, cat)}
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-border" />

      <div>
        <h4 className="mb-3 text-sm font-semibold text-foreground">Difficulty</h4>
        <div className="space-y-2.5">
          {DIFFICULTIES.map((diff) => (
            <label
              key={diff}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 text-sm text-foreground transition-colors hover:bg-muted"
            >
              <Checkbox
                checked={selectedDifficulties.includes(diff)}
                onCheckedChange={() => toggleFilter(setSelectedDifficulties, diff)}
              />
              {diff}
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-border" />

      <div>
        <h4 className="mb-3 text-sm font-semibold text-foreground">
          Price Range
        </h4>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={(v: [number, number]) => setPriceRange(v)}
            min={0}
            max={7000}
            step={100}
          />
          <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>${priceRange[0].toLocaleString()}</span>
            <span>${priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-border" />

      <div>
        <h4 className="mb-3 text-sm font-semibold text-foreground">Duration</h4>
        <div className="space-y-2">
          {DURATION_RANGES.map((range) => (
            <button
              key={range.label}
              onClick={() =>
                setSelectedDuration(selectedDuration === range.label ? "" : range.label)
              }
              className={`flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                selectedDuration === range.label
                  ? "bg-primary/10 text-primary ring-1 ring-primary/30"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <Clock className="mr-2 h-3.5 w-3.5" />
              {range.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function PackageCard({ pkg, index }: { pkg: (typeof PACKAGES)[number]; index: number }) {
  const discount = pkg.originalPrice > pkg.price
    ? Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-500 hover:shadow-elevated hover:-translate-y-1"
    >
      {/* Wishlist & Compare Buttons */}
      <div className="absolute right-3 top-3 z-10 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <WishlistButton packageId={pkg.id} />
        <CompareButton packageId={pkg.id} />
      </div>

      <Link to="/packages/$slug" params={{ slug: pkg.slug }}>
        <div className="relative overflow-hidden">
          <Img
            src={pkg.image}
            alt={pkg.name}
            aspectRatio="aspect-[16/10]"
            rounded="rounded-none"
            index={pkg.id.charCodeAt(pkg.id.length - 1)}
            className="transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />

          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            <span className={`rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm ${regionColor(pkg.region)}`}>
              {pkg.region}
            </span>
            <span className={`rounded-lg border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm ${difficultyColor(pkg.difficulty)}`}>
              {pkg.difficulty}
            </span>
          </div>

          {discount > 0 && (
            <div className="absolute right-3 top-3 rounded-lg bg-accent px-2.5 py-1 text-[10px] font-bold text-dark shadow-accent">
              -{discount}% OFF
            </div>
          )}

          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="font-display text-lg font-bold leading-snug text-light drop-shadow-lg">
              {pkg.name}
            </h3>
          </div>
        </div>

        <div className="p-5">
          <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {pkg.duration}
            </span>
            <span className="inline-flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {pkg.groupSize}
            </span>
            <span className="inline-flex items-center gap-1">
              <Mountain className="h-3.5 w-3.5" />
              {pkg.maxAltitude}
            </span>
          </div>

          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
            {pkg.description}
          </p>

          {/* Highlights preview */}
          <div className="mb-4 flex flex-wrap gap-1.5">
            {pkg.highlights.slice(0, 2).map((h, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 rounded-md bg-emerald-500/5 px-2 py-0.5 text-[10px] text-emerald-500"
              >
                <TrendingUp className="h-2.5 w-2.5" />
                {h.length > 30 ? h.slice(0, 30) + "..." : h}
              </span>
            ))}
          </div>

          <div className="mb-4 flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-accent text-accent" />
              <span className="text-sm font-semibold">{pkg.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">
              ({pkg.reviews.toLocaleString()} reviews)
            </span>
          </div>

          <div className="flex items-end justify-between border-t border-border pt-4">
            <div>
              {discount > 0 && (
                <span className="text-sm text-muted-foreground line-through">
                  ${pkg.originalPrice.toLocaleString()}
                </span>
              )}
              <div className="font-display text-2xl font-bold text-primary">
                ${pkg.price.toLocaleString()}
              </div>
              <span className="text-[10px] text-muted-foreground">per person</span>
            </div>
            <div className="flex gap-2">
              <span className="inline-flex items-center rounded-lg border border-border bg-muted/50 px-3 py-2 text-xs font-medium text-foreground transition-colors group-hover:border-primary/30 group-hover:bg-primary/5 group-hover:text-primary">
                View Details
              </span>
              <span className="inline-flex items-center rounded-lg bg-gradient-accent px-3 py-2 text-xs font-semibold text-white shadow-sm transition-all group-hover:shadow-accent">
                Book Now
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
