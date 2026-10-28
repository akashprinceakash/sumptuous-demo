import * as React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Image that drifts against the scroll inside a clipped frame. The image is
 * only as much taller than its frame as the drift needs, so it is never
 * blown up past its resolution, and only its transform changes per frame.
 */
export function ParallaxImage({
  src, alt, className, strength = 6, priority,
}: { src: string; alt: string; className?: string; strength?: number; priority?: boolean }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);
  return (
    <div ref={ref} className={cn("relative overflow-hidden bg-muted", className)}>
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        style={{ y, top: `-${strength}%`, height: `${100 + strength * 2}%` }}
        className="absolute inset-x-0 w-full object-cover will-change-transform"
      />
    </div>
  );
}
