import { Mountain } from "lucide-react";

const PALETTE = [
  "from-primary/80 to-primary/40",
  "from-accent/80 to-accent/40",
  "from-secondary/80 to-secondary/40",
  "from-primary/60 to-secondary/40",
  "from-accent/60 to-primary/40",
  "from-secondary/60 to-accent/40",
];

export function PlaceholderImg({
  alt,
  className = "",
  index = 0,
  aspect = "aspect-[4/3]",
  src,
  label,
  seed,
  text,
  ...rest
}: {
  alt: string;
  className?: string;
  index?: number;
  aspect?: string;
  src?: string;
  label?: string;
  seed?: string;
  text?: string;
  [key: string]: unknown;
}) {
  const gradient = PALETTE[index % PALETTE.length];
  return (
    <div
      className={`relative flex items-center justify-center bg-gradient-to-br ${gradient} ${aspect} ${className}`}
      role="img"
      aria-label={alt}
    >
      <Mountain className="h-10 w-10 text-white/40" />
      <span className="absolute bottom-3 left-3 right-3 text-xs font-medium text-white/70 leading-tight">
        {label || text || alt}
      </span>
    </div>
  );
}
