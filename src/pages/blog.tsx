import * as React from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { TextReveal } from "@/components/ui/text-reveal";
import { FadeIn } from "@/components/ui/fade-in";
import { Container, Crumbs } from "@/components/site/primitives";
import { CtaBlock, PostCard } from "@/components/site/blocks";
import { img, posts } from "@/data/site";
import { cn } from "@/lib/utils";

const cats = ["All", ...new Set(posts.map((p) => p.cat))];

export default function Blog() {
  const [cat, setCat] = React.useState("All");
  const [lead, ...rest] = posts;
  const shown = rest.filter((p) => cat === "All" || p.cat === cat);

  return (
    <>
      <section className="pb-16 pt-32 md:pt-40">
        <Container>
          <Crumbs items={[["Home", "/"], ["Blogs"]]} />
          <div className="mt-8 flex flex-wrap items-end justify-between gap-6 border-b pb-8">
            <TextReveal as="h1" text="The Journal" accent={["Journal"]} className="text-6xl md:text-[9rem]" />
            <FadeIn delay={0.3} className="max-w-xs text-muted-foreground">Field notes on aluminium systems, glazing performance and designing with light.</FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <Link to={`/blog/${lead.slug}`} className="group mt-10 grid gap-8 md:grid-cols-12 md:items-center">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-muted md:col-span-7">
                <img src={img(lead.img)} alt="" className="absolute inset-0 size-full object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-105" />
                <span className="label-mono absolute left-4 top-4 rounded-full bg-accent px-3 py-1.5 text-background">Latest</span>
              </div>
              <div className="md:col-span-5">
                <p className="label-mono text-muted-foreground"><span className="text-accent">{lead.cat}</span> · {lead.date} · {lead.read} min read</p>
                <h2 className="font-display-tight mt-4 text-4xl transition-colors group-hover:text-accent md:text-6xl">{lead.title}</h2>
                <p className="mt-5 text-muted-foreground">{lead.excerpt}</p>
                <span className="mt-8 inline-flex items-center gap-2 font-medium">Read article <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" /></span>
              </div>
            </Link>
          </FadeIn>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div role="toolbar" aria-label="Filter articles" className="mb-10 flex flex-wrap gap-2">
            {cats.map((c) => (
              <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)} className={cn("rounded-full border px-4 py-2 text-sm transition-colors", cat === c ? "border-graphite bg-graphite text-background" : "hover:border-foreground")}>
                {c}
              </button>
            ))}
          </div>
          <motion.div layout className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {shown.map((p) => (
                <motion.div layout key={p.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                  <PostCard p={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </Container>
      </section>

      <CtaBlock title="Have a question? Our specialists answer." accent={["specialists"]} />
    </>
  );
}
