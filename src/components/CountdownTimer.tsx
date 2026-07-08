// @ts-nocheck
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CountdownTimerProps {
  targetDate: Date;
  className?: string;
}

export function CountdownTimer({ targetDate, className = "" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = Math.max(0, targetDate.getTime() - Date.now());
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Sec", value: timeLeft.seconds },
  ];

  return (
    <div className={`flex gap-3 ${className}`}>
      {units.map((u) => (
        <div key={u.label} className="flex flex-col items-center">
          <motion.div
            key={u.value}
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center"
          >
            <span className="text-2xl font-display font-bold text-white tabular-nums">
              {String(u.value).padStart(2, "0")}
            </span>
          </motion.div>
          <span className="text-[10px] text-white/60 mt-1.5 uppercase tracking-wider font-medium">{u.label}</span>
        </div>
      ))}
    </div>
  );
}
