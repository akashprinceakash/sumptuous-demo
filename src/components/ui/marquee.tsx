import * as React from "react";
import { cn } from "@/lib/utils";

type Props = React.ComponentProps<"div"> & {
  reverse?: boolean;
  pauseOnHover?: boolean;
  /** Seconds per loop. */
  duration?: number;
  repeat?: number;
};

/** Infinite horizontal loop; content is repeated so the seam never shows. */
export function Marquee({ className, reverse, pauseOnHover = true, duration = 40, repeat = 2, children, style, ...props }: Props) {
  return (
    <div
      {...props}
      style={{ "--duration": `${duration}s`, "--gap": "1.5rem", ...style } as React.CSSProperties}
      className={cn("group flex overflow-hidden [gap:var(--gap)]", className)}
    >
      {Array.from({ length: repeat }, (_, i) => (
        <div
          key={i}
          aria-hidden={i > 0}
          className={cn(
            "flex shrink-0 justify-around [gap:var(--gap)]",
            reverse ? "animate-marquee-reverse" : "animate-marquee",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
