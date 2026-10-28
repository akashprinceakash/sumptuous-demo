import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  /** Words to set in the italic accent colour. */
  accent?: string[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
};

/**
 * Words rise out of a mask one after another when scrolled into view.
 * Transform and opacity only: blur filters on every word made scrolling heavy.
 */
export function TextReveal({ text, accent = [], as = "h2", className, delay = 0 }: Props) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const words = text.split(" ");
  return (
    <Tag
      className={cn("font-display-tight", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ staggerChildren: 0.05, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((w, i) => {
        const isAccent = accent.includes(w.replace(/[.,:;!?]/g, ""));
        return (
          <React.Fragment key={i}>
            <span aria-hidden className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top">
              <motion.span
                className={cn("inline-block will-change-transform", isAccent && "italic text-accent")}
                variants={{
                  hidden: reduce ? { opacity: 0 } : { y: "105%" },
                  show: { opacity: 1, y: "0%", transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
                }}
              >
                {w}
              </motion.span>
            </span>
            {i < words.length - 1 ? " " : null}
          </React.Fragment>
        );
      })}
    </Tag>
  );
}
