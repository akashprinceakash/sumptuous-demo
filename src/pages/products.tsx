import * as React from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, LayoutGrid, List } from "lucide-react";
import { TextReveal } from "@/components/ui/text-reveal";
import { FadeIn } from "@/components/ui/fade-in";
import { Marquee } from "@/components/ui/marquee";
import { Container, Crumbs } from "@/components/site/primitives";
import { CtaBlock, ProductTile } from "@/components/site/blocks";
import { img, products, site } from "@/data/site";
import { cn } from "@/lib/utils";

export default function Products() {
  const [view, setView] = React.useState<"grid" | "list">("grid");
  const [hover, setHover] = React.useState<number | null>(null);

  return (
    <>
      <section className="pb-12 pt-32 md:pt-40">
        <Container>
          <Crumbs items={[["Home", "/"], ["Products"]]} />
          <div className="mt-8 flex flex-wrap items-end justify-between gap-8">
            <TextReveal as="h1" text="High Performance Windows for Sustainable Habitats" accent={["Sustainable"]} className="max-w-4xl text-4xl md:text-6xl" />
            <FadeIn delay={0.3} className="flex items-center gap-1 rounded-full border bg-card p-1">
              {(["grid", "list"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setView(v)}
                  aria-pressed={view === v}
                  aria-label={`${v} view`}
                  className={cn("label-mono inline-flex items-center gap-2 rounded-full px-4 py-2 transition-colors", view === v ? "bg-graphite text-background" : "hover:bg-muted")}
                >
                  {v === "grid" ? <LayoutGrid className="size-3.5" /> : <List className="size-3.5" />} {v}
                </button>
              ))}
            </FadeIn>
          </div>
          <FadeIn delay={0.4} className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">{site.tagline}</FadeIn>
        </Container>
      </section>

      <section className="pb-20 md:pb-28">
        <Container>
          <AnimatePresence mode="wait">
            {view === "grid" ? (
              <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((p, i) => (
                  <FadeIn key={p.slug} delay={(i % 3) * 0.06}><ProductTile p={p} index={i} /></FadeIn>
                ))}
              </motion.div>
            ) : (
              <motion.ul key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative border-t" onMouseLeave={() => setHover(null)}>
                {products.map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <li key={p.slug} onMouseEnter={() => setHover(i)}>
                      <Link to={`/${p.slug}`} className={cn("group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 border-b py-5 transition-opacity duration-300 md:grid-cols-[3.5rem_2fr_1fr_auto] md:py-6", hover !== null && hover !== i && "opacity-35")}>
                        <span className="label-mono text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                        <span className="text-xl font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-2 md:text-3xl">{p.name}</span>
                        <span className="label-mono hidden items-center gap-2 text-muted-foreground md:inline-flex"><Icon className="size-4" strokeWidth={1.4} />{p.partner}</span>
                        <span className="grid size-10 place-items-center rounded-full border transition-all duration-500 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-background"><ArrowUpRight className="size-4" /></span>
                      </Link>
                    </li>
                  );
                })}
                <AnimatePresence>
                  {hover !== null && (
                    <motion.li
                      aria-hidden
                      key="preview"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1, top: `${(hover / products.length) * 100}%` }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="pointer-events-none absolute right-24 hidden aspect-[4/3] w-72 -translate-y-1/3 overflow-hidden rounded-2xl shadow-2xl xl:block"
                    >
                      <img src={img(products[hover].hero)} alt="" className="size-full object-cover" />
                    </motion.li>
                  )}
                </AnimatePresence>
              </motion.ul>
            )}
          </AnimatePresence>
        </Container>
      </section>

      <section aria-label="Products" className="border-y py-7">
        <Marquee duration={60} reverse>
          {products.map((p) => <span key={p.slug} className="whitespace-nowrap px-6 font-serif text-4xl italic text-foreground/80 md:text-5xl">{p.name} <span className="text-accent">✦</span></span>)}
        </Marquee>
      </section>

      <CtaBlock />
    </>
  );
}
