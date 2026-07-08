// @ts-nocheck
import { useState } from "react";
import { Mountain } from "lucide-react";

const GRADIENTS = [
  "from-cyan-600 to-blue-800",
  "from-emerald-600 to-teal-800",
  "from-amber-500 to-orange-700",
  "from-rose-500 to-pink-700",
  "from-violet-600 to-purple-800",
  "from-sky-500 to-indigo-700",
];

export function Img({
  src,
  alt,
  className = "",
  aspectRatio = "aspect-[4/3]",
  rounded = "rounded-2xl",
  index = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  rounded?: string;
  index?: number;
}) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (error || !src) {
    const gradient = GRADIENTS[index % GRADIENTS.length];
    return (
      <div className={`relative flex items-center justify-center bg-gradient-to-br ${gradient} ${aspectRatio} ${rounded} ${className}`}>
        <Mountain className="h-12 w-12 text-white/30" />
        <span className="absolute bottom-4 left-4 right-4 text-sm font-medium text-white/60">{alt}</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${aspectRatio} ${rounded} ${className}`}>
      {!loaded && (
        <div className={`absolute inset-0 bg-gradient-to-br ${GRADIENTS[index % GRADIENTS.length]} animate-pulse`} />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`h-full w-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
