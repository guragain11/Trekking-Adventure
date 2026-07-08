// @ts-nocheck
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useCallback } from "react";
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
  Search,
  MapPin,
  ArrowRight,
} from "lucide-react";

import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Img } from "@/components/Img";
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
];

const ITEMS_PER_PAGE = 6;

const ease = [0.22, 1, 0.36, 1];

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

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0C1222] pt-[104px] pb-16 sm:pt-[136px] sm:pb-20">
        <div className="absolute inset-0">
          <Img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
            alt="Himalayan mountains"
            aspectRatio="aspect-auto"
            rounded="rounded-none"
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C1222] via-[#0C1222]/80 to-[#0C1222]/50" />
        </div>
        <div className="absolute left-1/4 top-20 h-72 w-72 rounded-full bg-[#0F766E]/5 blur-[120px]" />
        <div className="absolute bottom-10 right-1/4 h-96 w-96 rounded-full bg-[#D4A574]/5 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease }}
            className="mb-6 flex items-center gap-2 text-[13px] text-white/40"
          >
            <Link to="/" className="transition-colors hover:text-white/70">Home</Link>
            <span>/</span>
            <span className="text-white/70">Packages</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-8 bg-[#D4A574]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4A574]">Explore</span>
            </div>
            <h1 className="mt-4 font-display text-[2rem] font-medium tracking-tight text-white sm:text-[2.5rem] lg:text-[3rem]">
              All Trekking{" "}
              <span className="text-[#D4A574]">Packages</span>
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/50">
              From Everest Base Camp to hidden valleys of Mustang — find your perfect Himalayan adventure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
        {/* Top Bar */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[14px] text-[#6B7280]">
            Showing{" "}
            <span className="font-semibold text-[#111827]">{visiblePackages.length}</span>{" "}
            of{" "}
            <span className="font-semibold text-[#111827]">{filteredPackages.length}</span>{" "}
            packages
          </p>

          <div className="flex items-center gap-3">
            <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
              <SheetTrigger asChild>
                <button className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-5 py-2.5 text-[13px] font-medium text-[#111827] shadow-[0_2px_8px_rgb(0,0,0,0.04)] transition-all hover:shadow-[0_4px_16px_rgb(0,0,0,0.08)] lg:hidden">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0F766E] text-[10px] font-bold text-white">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[320px] p-0">
                <SheetHeader className="border-b border-[#F3F4F6] px-6 py-4">
                  <SheetTitle className="font-display text-[16px] font-semibold text-[#111827]">Filters</SheetTitle>
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
                className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-5 py-2.5 text-[13px] font-medium text-[#111827] shadow-[0_2px_8px_rgb(0,0,0,0.04)] transition-all hover:shadow-[0_4px_16px_rgb(0,0,0,0.08)]"
              >
                <ArrowUpDown className="h-4 w-4 text-[#6B7280]" />
                {SORT_OPTIONS.find((o) => o.value === sortBy)?.label}
                <ChevronDown className={`h-3.5 w-3.5 text-[#6B7280] transition-transform ${sortOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {sortOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setSortOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15, ease }}
                      className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-[16px] border border-[#E5E7EB] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                    >
                      {SORT_OPTIONS.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSortBy(option.value);
                            setSortOpen(false);
                          }}
                          className={`flex w-full items-center px-4 py-2.5 text-left text-[13px] transition-colors hover:bg-[#FAFAFA] ${
                            sortBy === option.value ? "font-medium text-[#0F766E]" : "text-[#111827]"
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
                transition={{ delay: i * 0.03, ease }}
                onClick={chip.onRemove}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#0F766E]/20 bg-[#0F766E]/5 px-3 py-1 text-[12px] font-medium text-[#0F766E] transition-colors hover:bg-[#0F766E]/10"
              >
                {chip.label}
                <X className="h-3 w-3" />
              </motion.button>
            ))}
            <button
              onClick={clearAllFilters}
              className="text-[12px] font-medium text-[#6B7280] underline-offset-2 hover:underline"
            >
              Clear all
            </button>
          </motion.div>
        )}

        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-24 space-y-6 rounded-[20px] border border-[#F3F4F6] bg-white p-6 shadow-[0_2px_20px_rgb(0,0,0,0.04)]">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-[16px] font-semibold text-[#111827]">Filters</h3>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-[12px] font-medium text-[#0F766E] hover:underline"
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
                className="flex flex-col items-center justify-center rounded-[20px] border border-dashed border-[#E5E7EB] bg-white py-20 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F3F4F6]">
                  <Search className="h-7 w-7 text-[#9CA3AF]" />
                </div>
                <h3 className="mt-6 font-display text-[18px] font-semibold text-[#111827]">
                  No packages found
                </h3>
                <p className="mt-2 max-w-sm text-[14px] text-[#6B7280]">
                  Try adjusting your filters to discover more Himalayan adventures.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-6 rounded-full bg-[#0F766E] px-6 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-[#0D6B63]"
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
                  className="group inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-8 py-3 text-[13px] font-medium text-[#111827] shadow-[0_2px_12px_rgb(0,0,0,0.06)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                >
                  Load More Packages
                  <ArrowRight className="h-4 w-4 text-[#6B7280] transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
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
        <h4 className="mb-3 text-[13px] font-semibold text-[#111827]">Region</h4>
        <div className="space-y-2">
          {REGIONS.map((region) => (
            <label
              key={region}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 text-[13px] text-[#374151] transition-colors hover:bg-[#FAFAFA]"
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

      <div className="border-t border-[#F3F4F6]" />

      <div>
        <h4 className="mb-3 text-[13px] font-semibold text-[#111827]">Category</h4>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <label
              key={cat}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 text-[13px] text-[#374151] transition-colors hover:bg-[#FAFAFA]"
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

      <div className="border-t border-[#F3F4F6]" />

      <div>
        <h4 className="mb-3 text-[13px] font-semibold text-[#111827]">Difficulty</h4>
        <div className="space-y-2">
          {DIFFICULTIES.map((diff) => (
            <label
              key={diff}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 text-[13px] text-[#374151] transition-colors hover:bg-[#FAFAFA]"
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

      <div className="border-t border-[#F3F4F6]" />

      <div>
        <h4 className="mb-3 text-[13px] font-semibold text-[#111827]">Price Range</h4>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={(v: [number, number]) => setPriceRange(v)}
            min={0}
            max={7000}
            step={100}
          />
          <div className="mt-2 flex items-center justify-between text-[12px] text-[#9CA3AF]">
            <span>${priceRange[0].toLocaleString()}</span>
            <span>${priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-[#F3F4F6]" />

      <div>
        <h4 className="mb-3 text-[13px] font-semibold text-[#111827]">Duration</h4>
        <div className="space-y-2">
          {DURATION_RANGES.map((range) => (
            <button
              key={range.label}
              onClick={() =>
                setSelectedDuration(selectedDuration === range.label ? "" : range.label)
              }
              className={`flex w-full items-center rounded-lg px-3 py-2 text-[13px] font-medium transition-all ${
                selectedDuration === range.label
                  ? "bg-[#0F766E]/10 text-[#0F766E] ring-1 ring-[#0F766E]/30"
                  : "text-[#374151] hover:bg-[#FAFAFA]"
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

  const difficultyColor = (d: string) => {
    switch (d) {
      case "Easy": return "bg-emerald-50 text-emerald-600 border-emerald-200";
      case "Moderate": return "bg-[#0F766E]/10 text-[#0F766E] border-[#0F766E]/20";
      case "Challenging": return "bg-[#D4A574]/10 text-[#D4A574] border-[#D4A574]/20";
      case "Strenuous": return "bg-red-50 text-red-500 border-red-200";
      default: return "bg-[#F3F4F6] text-[#6B7280] border-[#E5E7EB]";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease }}
    >
      <Link
        to="/packages/$slug"
        params={{ slug: pkg.slug }}
        className="group block overflow-hidden rounded-[20px] bg-white shadow-[0_2px_20px_rgb(0,0,0,0.06)] transition-all duration-500 hover:shadow-[0_8px_40px_rgb(0,0,0,0.12)]"
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
              {pkg.region}
            </span>
            <span className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm ${difficultyColor(pkg.difficulty)}`}>
              {pkg.difficulty}
            </span>
          </div>

          {discount > 0 && (
            <div className="absolute right-4 top-4 rounded-full bg-[#D4A574] px-3 py-1 text-[10px] font-bold text-white">
              -{discount}% OFF
            </div>
          )}

          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="font-display text-[18px] font-semibold leading-snug text-white drop-shadow-lg">
              {pkg.name}
            </h3>
          </div>
        </div>

        <div className="p-5">
          <div className="mb-3 flex items-center gap-4 text-[12px] text-[#6B7280]">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {pkg.duration}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" />
              {pkg.groupSize}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Mountain className="h-3.5 w-3.5" />
              {pkg.maxAltitude}
            </span>
          </div>

          <p className="mb-4 line-clamp-2 text-[13px] leading-relaxed text-[#6B7280]">
            {pkg.description}
          </p>

          <div className="mb-4 flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-[#D4A574] text-[#D4A574]" />
              <span className="text-[13px] font-semibold text-[#111827]">{pkg.rating}</span>
            </div>
            <span className="text-[12px] text-[#9CA3AF]">
              ({pkg.reviews.toLocaleString()} reviews)
            </span>
          </div>

          <div className="flex items-end justify-between border-t border-[#F3F4F6] pt-4">
            <div>
              {discount > 0 && (
                <span className="text-[13px] text-[#9CA3AF] line-through">
                  ${pkg.originalPrice.toLocaleString()}
                </span>
              )}
              <div className="font-display text-[22px] font-bold text-[#111827]">
                ${pkg.price.toLocaleString()}
              </div>
              <span className="text-[10px] text-[#9CA3AF]">per person</span>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#111827] px-5 py-2.5 text-[12px] font-semibold text-white transition-all duration-300 group-hover:bg-[#0F766E]">
              View Details
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
