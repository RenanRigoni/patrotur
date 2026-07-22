"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface RouteMotifProps {
  className?: string;
  strokeClassName?: string;
  variant?: "hero" | "divider";
}

const PATHS: Record<NonNullable<RouteMotifProps["variant"]>, string> = {
  hero: "M2 90 C 90 10, 180 170, 280 60 S 460 10, 540 80",
  divider: "M0 40 C 150 -10, 300 90, 450 30 S 750 -10, 900 40",
};

export function RouteMotif({ className = "", strokeClassName = "stroke-turquoise-300", variant = "hero" }: RouteMotifProps) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const d = PATHS[variant];

  return (
    <svg
      ref={ref}
      viewBox={variant === "hero" ? "0 0 560 180" : "0 0 900 80"}
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <motion.path
        d={d}
        strokeWidth={2}
        strokeLinecap="round"
        className={strokeClassName}
        stroke="currentColor"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          isInView
            ? { pathLength: 1, opacity: 1 }
            : { pathLength: 0, opacity: 0 }
        }
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      />
      {[0.06, 0.5, 0.94].map((offset, index) => (
        <motion.circle
          key={offset}
          r={4}
          className="fill-turquoise-400"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ delay: 0.4 + index * 0.5, duration: 0.4 }}
          cx={offset * (variant === "hero" ? 560 : 900)}
          cy={variant === "hero" ? (index === 1 ? 100 : index === 0 ? 90 : 75) : 30}
        />
      ))}
    </svg>
  );
}
