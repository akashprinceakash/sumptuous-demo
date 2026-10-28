import * as React from "react";
import { cn } from "@/lib/utils";

/** Card whose surface lights up under the cursor. */
export function SpotlightCard({
  className, children, color = "rgba(44, 92, 76, 0.16)", ...props
}: React.ComponentProps<"div"> & { color?: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className={cn("group/spot relative overflow-hidden rounded-[var(--radius)] border bg-card", className)}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{ background: `radial-gradient(420px circle at var(--x) var(--y), ${color}, transparent 60%)` }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
