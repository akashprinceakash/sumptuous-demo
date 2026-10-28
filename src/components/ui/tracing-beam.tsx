import * as React from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

/** Vertical rail beside content whose fill follows scroll progress. */
export function TracingBeam({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 400, damping: 90 });
  return (
    <div ref={ref} className={cn("relative pl-10 md:pl-16", className)}>
      <div className="absolute left-3 top-0 h-full w-px bg-border md:left-5" aria-hidden>
        <motion.div style={{ scaleY }} className="h-full w-px origin-top bg-gradient-to-b from-accent to-accent-bright" />
      </div>
      {children}
    </div>
  );
}
