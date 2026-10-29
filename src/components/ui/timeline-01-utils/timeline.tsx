"use client";

import * as React from "react";
import { motion, useScroll, useSpring } from "motion/react";

export type TimelineItem = {
  title: string;
  description?: string;
  date?: string;
  image?: string;
};

/**
 * Rows of milestones inside the block's ruled frame. The date column stays
 * pinned while its row scrolls past, and the rule beside it fills with
 * scroll progress. Only transforms animate, so it stays on the compositor.
 */
export default function Timeline({ items, itemAs: ItemTag = "h3" }: { items: TimelineItem[]; itemAs?: "h3" | "p" }) {
  const ref = React.useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 75%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 260, damping: 50 });

  return (
    <ol ref={ref} className="relative">
      {/* progress rule along the date column */}
      <div aria-hidden className="absolute bottom-0 left-6 top-0 w-px bg-border md:left-[13.5rem] lg:left-[15.5rem]">
        <motion.div style={{ scaleY: fill }} className="h-full w-px origin-top bg-accent" />
      </div>

      {items.map((item, i) => (
        <li key={item.title} className="relative grid border-b border-border last:border-b-0 md:grid-cols-[13.5rem_1fr] lg:grid-cols-[15.5rem_1fr]">
          <div className="pl-12 pr-6 pt-10 md:pl-10 md:pt-14 lg:pl-16">
            <div className="md:sticky md:top-28">
              {/* with no date the step number itself is the marker */}
              {item.date ? <span className="label-mono text-muted-foreground">{String(i + 1).padStart(2, "0")}</span> : null}
              <p className="mt-2 text-3xl font-medium tracking-tight text-foreground md:text-4xl">{item.date || String(i + 1).padStart(2, "0")}</p>
            </div>
          </div>

          {/* node on the rule */}
          <span aria-hidden className="absolute left-6 top-12 grid size-3 -translate-x-1/2 place-items-center rounded-full border border-accent bg-background md:left-[13.5rem] md:top-[4.1rem] lg:left-[15.5rem]">
            <span className="size-1 rounded-full bg-accent" />
          </span>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-6 px-6 pb-10 pl-12 pt-4 md:grid-cols-[1fr_1.1fr] md:items-start md:gap-10 md:px-10 md:py-14 lg:px-16"
          >
            <div className="max-w-md">
              <ItemTag className="text-xl font-medium leading-snug tracking-tight text-foreground md:text-2xl">{item.title}</ItemTag>
              {item.description ? <p className="mt-3 text-base leading-relaxed text-muted-foreground">{item.description}</p> : null}
            </div>
            {item.image ? (
              <div className="overflow-hidden rounded-xl border border-border bg-muted">
                <img src={item.image} alt="" loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover transition-transform duration-700 hover:scale-[1.03]" />
              </div>
            ) : null}
          </motion.div>
        </li>
      ))}
    </ol>
  );
}
