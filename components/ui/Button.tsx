import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-turquoise-500 text-navy-950 hover:bg-turquoise-400 shadow-[0_8px_30px_-8px_rgba(16,184,196,0.6)]",
  secondary:
    "bg-white/10 text-white border border-white/30 hover:bg-white/20 backdrop-blur-sm",
  ghost: "bg-transparent text-navy-900 border border-navy-900/20 hover:bg-navy-900/5",
};

export function Button({ href, children, variant = "primary", className = "", external = false }: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-tight transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turquoise-400 ${variantClasses[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
