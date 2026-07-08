// @ts-nocheck
import { useState } from "react";
import { GitCompareArrows } from "lucide-react";

export function CompareButton({
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
        active ? "border-primary/50 bg-primary/20" : ""
      } ${className}`}
    >
      <GitCompareArrows
        className={`h-4 w-4 transition-colors ${
          active ? "fill-primary text-primary" : "text-white/70"
        }`}
      />
    </button>
  );
}
