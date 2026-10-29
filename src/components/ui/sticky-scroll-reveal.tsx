import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type StickyItem = { title: string; eyebrow: string; body: string; img: string; to: string };

/** Copy scrolls on the left; the pinned image on the right wipes to whichever item is centred. */
export function StickyScrollReveal({ items }: { items: StickyItem[] }) {
  const [active, setActive] = React.useState(0);
  const refs = React.useRef<(HTMLDivElement | null)[]>([]);

  React.useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i)); }),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid gap-10 md:grid-cols-2 md:gap-16">
      <div>
        {items.map((it, i) => (
          <div
            key={it.title}
            ref={(el) => { refs.current[i] = el; }}
            data-i={i}
            className={cn(
              "flex flex-col justify-center border-t py-12 transition-opacity duration-700 md:min-h-[80svh]",
              active === i ? "opacity-100" : "md:opacity-25",
            )}
          >
            <span className="label-mono text-accent">{it.eyebrow}</span>
            <p className="font-display-tight mt-4 text-4xl md:text-6xl">{it.title}</p>
            <p className="mt-6 max-w-md text-muted-foreground">{it.body}</p>
            <Link to={it.to} className="group mt-8 inline-flex w-fit items-center gap-2 text-sm font-medium">
              <span className="border-b border-current pb-0.5">Know More</span>
              <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
            </Link>
            <img src={it.img} alt="" className="mt-8 aspect-[4/3] w-full rounded-2xl object-cover md:hidden" loading="lazy" />
          </div>
        ))}
      </div>
      <div className="relative hidden md:block">
        <div className="sticky top-[12svh] h-[76svh] overflow-hidden rounded-[var(--radius)] bg-muted">
          <AnimatePresence initial={false}>
            <motion.img
              key={active}
              src={items[active].img}
              alt=""
              initial={{ clipPath: "inset(100% 0% 0% 0%)", scale: 1.15 }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
              transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0 size-full object-cover"
            />
          </AnimatePresence>
          <div className="label-mono absolute bottom-4 left-4 rounded-full bg-background/85 px-3 py-1.5 backdrop-blur">
            {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </div>
        </div>
      </div>
    </div>
  );
}
