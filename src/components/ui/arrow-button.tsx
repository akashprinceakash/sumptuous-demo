import * as React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "dark" | "light" | "outline" | "accent";
const styles: Record<Variant, string> = {
  dark: "bg-graphite text-background",
  light: "bg-background text-foreground",
  outline: "border border-current",
  accent: "bg-accent text-background",
};
const dot: Record<Variant, string> = {
  dark: "bg-background text-graphite",
  light: "bg-graphite text-background",
  outline: "bg-current [&>svg]:text-background",
  accent: "bg-background text-accent",
};

/** Pill button whose circular arrow slides from the right edge to the left on hover. */
export function ArrowButton({
  to, href, children, variant = "dark", className, type, onClick,
}: {
  to?: string; href?: string; children: React.ReactNode; variant?: Variant;
  className?: string; type?: "submit" | "button"; onClick?: () => void;
}) {
  const inner = (
    <>
      <span className="relative z-10 pl-6 pr-14 transition-[padding] duration-500 ease-out-expo group-hover/btn:pl-14 group-hover/btn:pr-6">
        {children}
      </span>
      <span className={cn(
        "absolute right-1.5 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full transition-[right] duration-500 ease-out-expo group-hover/btn:right-[calc(100%-2.625rem)]",
        dot[variant],
      )}>
        <ArrowUpRight className="size-4 transition-transform duration-500 group-hover/btn:rotate-45" />
      </span>
    </>
  );
  const cls = cn("group/btn relative inline-flex h-12 items-center overflow-hidden whitespace-nowrap rounded-full text-sm font-medium", styles[variant], className);
  if (to) return <Link to={to} className={cls}>{inner}</Link>;
  if (href) return <a href={href} className={cls}>{inner}</a>;
  return <button type={type ?? "button"} onClick={onClick} className={cls}>{inner}</button>;
}
