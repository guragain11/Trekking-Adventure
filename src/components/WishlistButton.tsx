// @ts-nocheck
import { useState } from "react";
import { Heart } from "lucide-react";

export function WishlistButton({
  packageId,
  className = "",
}: {
  packageId: string;
  className?: string;
}) {
  const [active, setActive] = useState(false);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setActive(!active);
      }}
      className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 ${
        active ? "border-accent/50 bg-accent/20" : ""
      } ${className}`}
    >
      <Heart
        className={`h-4 w-4 transition-colors ${
          active ? "fill-accent text-accent" : "text-white/70"
        }`}
      />
    </button>
  );
}
