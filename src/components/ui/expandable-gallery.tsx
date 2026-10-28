import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export type GalleryItem = { title: string; meta: string; img: string };

/** Row of narrow panels; the hovered one opens wide to show the image and caption. */
export function ExpandableGallery({ items, className }: { items: GalleryItem[]; className?: string }) {
  const [open, setOpen] = React.useState(0);
  return (
    <div className={cn("flex h-[120svh] flex-col gap-2 md:h-[70svh] md:min-h-[460px] md:flex-row", className)}>
      {items.map((it, i) => (
        <motion.button
          type="button"
          key={it.title}
          onMouseEnter={() => setOpen(i)}
          onFocus={() => setOpen(i)}
          onClick={() => setOpen(i)}
          aria-expanded={open === i}
          animate={{ flexGrow: open === i ? 6 : 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative min-h-14 basis-0 overflow-hidden rounded-2xl bg-muted text-left"
        >
          <img src={it.img} alt={it.title} loading="lazy" className="absolute inset-0 size-full object-cover" />
          <div className={cn(
            "absolute inset-0 bg-gradient-to-t from-graphite/85 via-graphite/10 to-transparent transition-opacity duration-500",
            open === i ? "opacity-100" : "opacity-60",
          )} />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-background">
            <motion.div
              animate={{ opacity: open === i ? 1 : 0, y: open === i ? 0 : 16 }}
              transition={{ duration: 0.5, delay: open === i ? 0.25 : 0 }}
            >
              <p className="label-mono text-accent-bright">{it.meta}</p>
              <p className="font-display-tight mt-2 text-3xl md:text-4xl">{it.title}</p>
            </motion.div>
            <span className="label-mono shrink-0 opacity-80">{String(i + 1).padStart(2, "0")}</span>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
