import * as React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1320px] px-4 md:px-8", className)}>{children}</div>;
}

/** "(03) Process": the numbered annotation that opens every section. */
/** `as` sets the tag where the live page uses a heading for the same label (e.g. "Recent Posts" is an H2). */
export function SectionLabel({ n, children, className, as: T = "p" }: { n?: string; children: React.ReactNode; className?: string; as?: "p" | "h1" | "h2" | "h3" }) {
  return (
    // the "(01)" counter sits outside the tag so a heading's text is exactly the live wording
    <div className={cn("label-mono flex items-center gap-3 text-muted-foreground", className)}>
      {n ? <span aria-hidden className="text-accent">({n})</span> : null}
      <T className="m-0 text-[length:inherit] font-normal">{children}</T>
    </div>
  );
}

export function Crumbs({ items, className }: { items: [string, string?][]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="label-mono flex flex-wrap items-center gap-1.5 text-muted-foreground">
        {items.map(([label, to], i) => (
          <li key={label} className="flex items-center gap-1.5">
            {i > 0 ? <ChevronRight className="size-3 opacity-50" /> : null}
            {to ? <Link to={to} className="hover:text-accent">{label}</Link> : <span aria-current="page" className="text-foreground">{label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Logo({ className, light }: { className?: string; light?: boolean }) {
  return (
    <svg viewBox="0 0 232 58" role="img" aria-label="Sumptuous Building Systems" className={cn("h-auto w-40", light ? "text-background" : "text-foreground", className)}>
      <defs>
        <linearGradient id="sbs-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F4E2AE" />
          <stop offset=".42" stopColor="#C39A4E" />
          <stop offset=".72" stopColor="#7E5822" />
          <stop offset="1" stopColor="#E6C784" />
        </linearGradient>
      </defs>
      <ellipse cx="27" cy="27" rx="22" ry="16.5" transform="rotate(-26 27 27)" fill="none" stroke="url(#sbs-ring)" strokeWidth="4.6" />
      <text x="15" y="40" fill="currentColor" style={{ font: "italic 400 42px 'Instrument Serif', serif" }}>S</text>
      <text x="43" y="37" fill="currentColor" style={{ font: "italic 400 32px 'Instrument Serif', serif" }}>umptuous</text>
      <text x="104" y="52" fill="currentColor" opacity=".75" style={{ font: "600 6.2px 'Plus Jakarta Sans', sans-serif", letterSpacing: "2.2px" }}>BUILDING SYSTEMS</text>
    </svg>
  );
}
