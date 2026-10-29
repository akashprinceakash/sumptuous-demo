import * as React from "react";
import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type Tag = "h2" | "h3" | "h4" | "h5" | "h6" | "p";
export type AccordionItem = { q: string; a: string; qtag?: Tag; atag?: Tag };

/**
 * Questions keep the heading tag they have on the live page, and every answer stays in the markup
 * (collapsed, not removed) so the full FAQ text is in the pre-rendered HTML.
 */
export function Accordion({ items, qtag = "h3" }: { items: AccordionItem[]; qtag?: Tag }) {
  const [open, setOpen] = React.useState<number | null>(0);
  const id = React.useId();
  return (
    <div className="divide-y border-y">
      {items.map((it, i) => {
        const isOpen = open === i;
        const Q = it.qtag ?? qtag;
        const A = it.atag ?? "p";
        return (
          <div key={it.q}>
            <Q className="m-0">
              <button
                type="button"
                id={`${id}-q${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-a${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-medium md:text-xl"
              >
                {it.q}
                <span aria-hidden className={cn(
                  "grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-500",
                  isOpen && "rotate-45 border-accent bg-accent text-background",
                )}>
                  <Plus className="size-4" />
                </span>
              </button>
            </Q>
            <motion.div
              id={`${id}-a${i}`}
              role="region"
              aria-labelledby={`${id}-q${i}`}
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
              style={isOpen ? undefined : { height: 0, opacity: 0 }}
            >
              <A className="max-w-2xl pb-6 text-base font-normal text-muted-foreground">{it.a}</A>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
