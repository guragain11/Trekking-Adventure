// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface Region {
  name: string;
  slug: string;
  tripCount: number;
  bestSeason: string;
  x: number;
  y: number;
}

const regions: Region[] = [
  { name: "Everest", slug: "everest", tripCount: 24, bestSeason: "Mar-May, Sep-Nov", x: 280, y: 120 },
  { name: "Annapurna", slug: "annapurna", tripCount: 31, bestSeason: "Oct-Nov, Mar-Apr", x: 140, y: 180 },
  { name: "Langtang", slug: "langtang", tripCount: 18, bestSeason: "Oct-May", x: 210, y: 130 },
  { name: "Mustang", slug: "mustang", tripCount: 12, bestSeason: "May-Oct", x: 100, y: 110 },
  { name: "Manaslu", slug: "manaslu", tripCount: 15, bestSeason: "Mar-May, Sep-Nov", x: 170, y: 160 },
  { name: "Dolpo", slug: "dolpo", tripCount: 8, bestSeason: "Jun-Sep", x: 70, y: 90 },
  { name: "Kanchenjunga", slug: "kanchenjunga", tripCount: 10, bestSeason: "Mar-May, Oct-Nov", x: 310, y: 160 },
  { name: "Makalu", slug: "makalu", tripCount: 7, bestSeason: "Apr-May, Oct-Nov", x: 300, y: 140 },
];

export function NepalMap() {
  const [hoveredRegion, setHoveredRegion] = useState<Region | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto" onMouseMove={handleMouseMove}>
      <svg
        viewBox="0 0 350 250"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Nepal outline */}
        <path
          d="M50,80 L70,60 L100,50 L130,45 L160,50 L190,40 L220,45 L250,55 L280,50 L310,60 L330,80 L340,110 L330,140 L320,160 L310,180 L290,200 L260,210 L230,215 L200,210 L170,215 L140,220 L110,215 L80,200 L60,180 L50,150 L45,120 Z"
          fill="url(#nepalGradient)"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1"
          className="transition-all duration-300"
        />

        {/* Gradient definitions */}
        <defs>
          <linearGradient id="nepalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.15)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Region markers */}
        {regions.map((region) => (
          <g
            key={region.slug}
            className="cursor-pointer"
            onMouseEnter={() => setHoveredRegion(region)}
            onMouseLeave={() => setHoveredRegion(null)}
            onClick={() => navigate(`/destinations/${region.slug}`)}
          >
            {/* Outer glow circle */}
            <motion.circle
              cx={region.x}
              cy={region.y}
              r={hoveredRegion?.slug === region.slug ? 15 : 8}
              fill="rgba(255,255,255,0.2)"
              className="pointer-events-none"
              initial={false}
              animate={{
                scale: hoveredRegion?.slug === region.slug ? 1.5 : 1,
                opacity: hoveredRegion?.slug === region.slug ? 0.6 : 0.3,
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Inner dot */}
            <motion.circle
              cx={region.x}
              cy={region.y}
              r={hoveredRegion?.slug === region.slug ? 6 : 4}
              fill="white"
              filter={hoveredRegion?.slug === region.slug ? "url(#glow)" : ""}
              initial={false}
              animate={{
                scale: hoveredRegion?.slug === region.slug ? 1.3 : 1,
              }}
              transition={{ duration: 0.2 }}
            />

            {/* Pulse animation */}
            {hoveredRegion?.slug === region.slug && (
              <motion.circle
                cx={region.x}
                cy={region.y}
                r={4}
                fill="none"
                stroke="white"
                strokeWidth={2}
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </g>
        ))}
      </svg>

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredRegion && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed z-50 pointer-events-none"
            style={{
              left: mousePosition.x + 15,
              top: mousePosition.y + 15,
            }}
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-3 shadow-2xl">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="font-display text-sm font-semibold text-white">
                  {hoveredRegion.name}
                </span>
              </div>
              <div className="space-y-1 text-xs text-white/70">
                <p>{hoveredRegion.tripCount} trips available</p>
                <p>Best: {hoveredRegion.bestSeason}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Region labels for mobile */}
      <div className="absolute inset-0 hidden md:block pointer-events-none">
        {regions.map((region) => (
          <div
            key={region.slug}
            className="absolute text-[10px] font-medium text-white/50 pointer-events-none"
            style={{
              left: `${(region.x / 350) * 100}%`,
              top: `${(region.y / 250) * 100 + 8}%`,
              transform: "translateX(-50%)",
            }}
          >
            {region.name}
          </div>
        ))}
      </div>
    </div>
  );
}
