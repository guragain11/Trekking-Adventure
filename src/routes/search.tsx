// @ts-nocheck
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Img } from "@/components/Img";
import { PACKAGES } from "@/data/packages";
import {
  Search,
  MapPin,
  Clock,
  Star,
  Mountain,
  ChevronDown,
  X,
  SlidersHorizontal,
  ArrowUpDown,
  Compass,
  Users,
} from "lucide-react";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: (search.q as string) || "",
  }),
  component: SearchPage,
});

const REGIONS = [...new Set(PACKAGES.map((p) => p.region))];
const CATEGORIES = [...new Set(PACKAGES.map((p) => p.category))];
const DIFFICULTIES = ["Easy", "Moderate", "Challenging", "Strenuous"];

const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under $500", min: 0, max: 500 },
  { label: "$500 – $1,000", min: 500, max: 1000 },
  { label: "$1,000 – $2,000", min: 1000, max: 2000 },
  { label: "$2,000 – $3,000", min: 2000, max: 3000 },
  { label: "Over $3,000", min: 3000, max: Infinity },
];

const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "duration-asc", label: "Duration: Short to Long" },
  { value: "duration-desc", label: "Duration: Long to Short" },
];

const difficultyColor = {
  Easy: "bg-secondary/10 text-secondary",
  Moderate: "bg-primary/10 text-primary",
  Challenging: "bg-accent/10 text-accent",
  Strenuous: "bg-red-500/10 text-red-500",
};

function SearchPage() {
  const { q: initialQuery } = Route.useSearch();
  const navigate = useNavigate({ from: "/search" });

  const [query, setQuery] = useState(initialQuery);
  const [showFilters, setShowFilters] = useState(false);

  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);
  const [priceRange, setPriceRange] = useState(0);
  const [sortBy, setSortBy] = useState("relevance");

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const updateQuery = (val) => {
    setQuery(val);
    navigate({ search: { q: val }, replace: true });
  };

  const toggleFilter = (list, setList, value) => {
    setList((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  };

  const clearFilters = () => {
    setSelectedRegions([]);
    setSelectedCategories([]);
    setSelectedDifficulties([]);
    setPriceRange(0);
    setSortBy("relevance");
  };

  const activeFilterCount =
    selectedRegions.length +
    selectedCategories.length +
    selectedDifficulties.length +
    (priceRange !== 0 ? 1 : 0);

  const results = useMemo(() => {
    let filtered = PACKAGES;

    if (initialQuery.trim()) {
      const q = initialQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.region.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.difficulty.toLowerCase().includes(q),
      );
    }

    if (selectedRegions.length > 0) {
      filtered = filtered.filter((p) => selectedRegions.includes(p.region));
    }
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category));
    }
    if (selectedDifficulties.length > 0) {
      filtered = filtered.filter((p) => selectedDifficulties.includes(p.difficulty));
    }
    if (priceRange !== 0) {
      const range = PRICE_RANGES[priceRange];
      filtered = filtered.filter((p) => p.price >= range.min && p.price <= range.max);
    }

    switch (sortBy) {
      case "price-asc":
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      case "duration-asc":
        filtered = [...filtered].sort((a, b) => a.days - b.days);
        break;
      case "duration-desc":
        filtered = [...filtered].sort((a, b) => b.days - a.days);
        break;
      default:
        if (initialQuery.trim()) {
          const q = initialQuery.toLowerCase();
          filtered = [...filtered].sort((a, b) => {
            const aName = a.name.toLowerCase().includes(q) ? 0 : 1;
            const bName = b.name.toLowerCase().includes(q) ? 0 : 1;
            return aName - bName || b.rating - a.rating;
          });
        }
    }

    return filtered;
  }, [initialQuery, selectedRegions, selectedCategories, selectedDifficulties, priceRange, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <section className="relative overflow-hidden bg-dark pt-32 pb-10 sm:pt-40 sm:pb-14">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-display text-3xl font-bold text-light sm:text-4xl lg:text-5xl">
              Find Your <span className="text-gradient">Adventure</span>
            </h1>
            <p className="mx-auto mt-3 max-w-md font-sans text-sm text-light/60">
              Search through our curated Himalayan experiences
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-8 max-w-2xl"
          >
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground/50" />
              <input
                type="text"
                value={query}
                onChange={(e) => updateQuery(e.target.value)}
                placeholder="Search treks, regions, activities..."
                className="w-full rounded-2xl border border-white/10 bg-white/10 py-4 pl-12 pr-12 font-sans text-base text-light placeholder:text-light/40 backdrop-blur-xl transition-all duration-300 focus:border-accent/50 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
              {query && (
                <button
                  onClick={() => updateQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg p-1 text-light/40 transition-colors hover:text-light"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          <aside className={`w-full shrink-0 lg:w-72 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="sticky top-28 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-foreground">
                  <SlidersHorizontal className="h-4 w-4" /> Filters
                  {activeFilterCount > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-dark">
                      {activeFilterCount}
                    </span>
                  )}
                </h2>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="font-sans text-xs text-primary transition-colors hover:text-primary/80"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <FilterSection title="Region">
                {REGIONS.map((region) => (
                  <label key={region} className="flex items-center gap-2.5 cursor-pointer py-1">
                    <input
                      type="checkbox"
                      checked={selectedRegions.includes(region)}
                      onChange={() => toggleFilter(selectedRegions, setSelectedRegions, region)}
                      className="h-4 w-4 rounded border-border accent-primary"
                    />
                    <span className="font-sans text-sm text-foreground">{region}</span>
                  </label>
                ))}
              </FilterSection>

              <FilterSection title="Category">
                {CATEGORIES.map((cat) => (
                  <label key={cat} className="flex items-center gap-2.5 cursor-pointer py-1">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleFilter(selectedCategories, setSelectedCategories, cat)}
                      className="h-4 w-4 rounded border-border accent-primary"
                    />
                    <span className="font-sans text-sm text-foreground">{cat}</span>
                  </label>
                ))}
              </FilterSection>

              <FilterSection title="Difficulty">
                {DIFFICULTIES.map((diff) => (
                  <label key={diff} className="flex items-center gap-2.5 cursor-pointer py-1">
                    <input
                      type="checkbox"
                      checked={selectedDifficulties.includes(diff)}
                      onChange={() =>
                        toggleFilter(selectedDifficulties, setSelectedDifficulties, diff)
                      }
                      className="h-4 w-4 rounded border-border accent-primary"
                    />
                    <span className="font-sans text-sm text-foreground">{diff}</span>
                  </label>
                ))}
              </FilterSection>

              <FilterSection title="Price Range">
                {PRICE_RANGES.map((range, i) => (
                  <label key={i} className="flex items-center gap-2.5 cursor-pointer py-1">
                    <input
                      type="radio"
                      name="price"
                      checked={priceRange === i}
                      onChange={() => setPriceRange(i)}
                      className="h-4 w-4 border-border accent-primary"
                    />
                    <span className="font-sans text-sm text-foreground">{range.label}</span>
                  </label>
                ))}
              </FilterSection>
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-sans text-sm text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{results.length}</span>{" "}
                  result{results.length !== 1 ? "s" : ""}
                  {initialQuery && (
                    <>
                      {" "}
                      for "<span className="font-semibold text-foreground">{initialQuery}</span>"
                    </>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowFilters((v) => !v)}
                  className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 font-sans text-sm text-foreground transition-colors hover:bg-muted lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-dark">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
                <div className="relative">
                  <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/50" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none rounded-xl border border-border bg-card py-2 pl-9 pr-8 font-sans text-sm text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/50" />
                </div>
              </div>
            </div>

            {results.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center rounded-3xl border border-border bg-card py-20 text-center shadow-card"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <Compass className="h-10 w-10 text-muted-foreground/40" />
                </div>
                <h3 className="mt-6 font-display text-xl font-bold text-foreground">
                  No results found
                </h3>
                <p className="mt-2 max-w-sm font-sans text-sm text-muted-foreground">
                  {initialQuery
                    ? `We couldn't find any packages matching "${initialQuery}". Try different keywords or adjust your filters.`
                    : "Try adjusting your filters to see more results."}
                </p>
                <button
                  onClick={() => {
                    clearFilters();
                    updateQuery("");
                  }}
                  className="mt-6 rounded-xl bg-primary px-6 py-2.5 font-sans text-sm font-medium text-white transition-colors hover:bg-primary/90"
                >
                  Clear all filters
                </button>
              </motion.div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                <AnimatePresence>
                  {results.map((pkg, i) => (
                    <motion.div
                      key={pkg.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: i * 0.05 }}
                      layout
                    >
                      <PackageCard pkg={pkg} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </main>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function FilterSection({ title, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between font-sans text-sm font-semibold text-foreground"
      >
        {title}
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-3 space-y-1">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PackageCard({ pkg }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-300 hover:shadow-luxury hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <Img
          src={pkg.image}
          alt={pkg.name}
          className="w-full transition-transform duration-500 group-hover:scale-105"
          aspectRatio="aspect-[16/10]"
          rounded="rounded-t-2xl rounded-b-none"
          index={0}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="rounded-lg bg-dark/60 backdrop-blur-sm px-2.5 py-1 font-sans text-xs font-medium text-light">
            {pkg.category}
          </span>
          <span
            className={`rounded-lg px-2.5 py-1 font-sans text-xs font-medium backdrop-blur-sm ${difficultyColor[pkg.difficulty]}`}
          >
            {pkg.difficulty}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
          <MapPin className="h-3 w-3 text-light/80" />
          <span className="font-sans text-xs font-medium text-light">{pkg.region}</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-base font-bold text-foreground transition-colors group-hover:text-primary">
          {pkg.name}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 font-sans text-xs leading-relaxed text-muted-foreground">
          {pkg.description}
        </p>
        <div className="mt-4 flex items-center gap-3 font-sans text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {pkg.duration}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {pkg.groupSize}
          </span>
          <span className="flex items-center gap-1">
            <Mountain className="h-3 w-3" />
            {pkg.maxAltitude}
          </span>
        </div>
        <div className="my-4 border-t border-border" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-accent text-accent" />
            <span className="font-sans text-sm font-semibold text-foreground">{pkg.rating}</span>
            <span className="font-sans text-xs text-muted-foreground">({pkg.reviews})</span>
          </div>
          <div className="text-right">
            {pkg.originalPrice > pkg.price && (
              <span className="font-sans text-xs text-muted-foreground line-through">
                ${pkg.originalPrice.toLocaleString()}
              </span>
            )}
            <p>
              <span className="font-display text-lg font-bold text-primary">
                ${pkg.price.toLocaleString()}
              </span>
              <span className="font-sans text-xs text-muted-foreground"> /person</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
