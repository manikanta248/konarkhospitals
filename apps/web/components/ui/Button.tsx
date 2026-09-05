import Link from "next/link";
import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "inverse";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary: "bg-brand-600 text-white hover:bg-brand-700 shadow-sm",
  secondary: "bg-accent-600 text-white hover:bg-accent-700 shadow-sm",
  outline: "border border-ink-200 text-ink-800 hover:border-brand-400 hover:text-brand-700 bg-white",
  ghost: "text-ink-700 hover:bg-ink-50",
  inverse: "bg-white text-brand-700 hover:bg-brand-50 shadow-sm",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm rounded-lg gap-1.5",
  md: "h-11 px-5 text-[15px] rounded-lg gap-2",
  lg: "h-12 px-7 text-base rounded-xl gap-2",
};

const base =
  "inline-flex items-center justify-center font-medium transition-colors duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  icon?: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  icon,
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={clsx(base, variantClasses[variant], sizeClasses[size], className)} {...props}>
      {children}
      {icon}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  icon,
  external,
}: CommonProps & { href: string; external?: boolean }) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(base, variantClasses[variant], sizeClasses[size], className)}
      >
        {children}
        {icon}
      </a>
    );
  }
  return (
    <Link href={href} className={clsx(base, variantClasses[variant], sizeClasses[size], className)}>
      {children}
      {icon}
    </Link>
  );
}
