import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { TextReveal } from "@/components/ui/text-reveal";
import { FadeIn } from "@/components/ui/fade-in";
import { Container, Crumbs } from "@/components/site/primitives";
import { CtaBlock, PostCard } from "@/components/site/blocks";
import { img, posts } from "@/data/site";

// Live blog index ("All Posts"): titles, excerpts, dates and read times as published.
export default function Blog({ page = 1 }: { page?: number }) {
  const list = posts.filter((p) => (p.page ?? 1) === page);
  // page 1 features its newest post; page 2 is a plain grid
  const lead = page === 1 ? list[0] : undefined;
  const rest = lead ? list.slice(1) : list;
  return (
    <>
      <section className="pb-12 pt-32 md:pt-40">
        <Container>
          <Crumbs items={[["Home", "/"], ["Blogs"]]} />
          <div className="mt-8 border-b pb-8">
            <TextReveal as="h1" text="All Posts" accent={["Posts"]} className="text-4xl md:text-6xl" />
          </div>

          {lead ? <FadeIn delay={0.2}>
            <Link to={`/post/${lead.slug}`} className="group mt-10 grid gap-8 md:grid-cols-12 md:items-center">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-muted md:col-span-7">
                <img src={img(lead.img)} alt="" className="absolute inset-0 size-full object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-105" />
              </div>
              <div className="md:col-span-5">
                <p className="label-mono text-muted-foreground">{lead.date} · {lead.read}</p>
                <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-tight transition-colors group-hover:text-accent md:text-4xl">{lead.title}</h2>
                <p className="mt-4 line-clamp-4 text-base leading-relaxed text-muted-foreground">{lead.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-medium">Read more <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" /></span>
              </div>
            </Link>
          </FadeIn> : null}
        </Container>
      </section>

      <section className="bg-card border-y py-16 md:py-24">
        <Container>
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <FadeIn key={p.slug} delay={(i % 3) * 0.05}><PostCard p={p} as="h2" /></FadeIn>
            ))}
          </div>
          {/* the live blog pages 20 posts per page: /blog and /blog/page/2 */}
          <nav aria-label="Blog pages" className="mt-16 flex justify-center gap-2">
            {[1, 2].map((n) => (
              <Link key={n} to={n === 1 ? "/blog" : `/blog/page/${n}`} aria-current={n === page ? "page" : undefined} className={`grid size-11 place-items-center rounded-full border text-sm font-medium transition-colors ${n === page ? "bg-graphite text-background" : "hover:bg-muted"}`}>{n}</Link>
            ))}
          </nav>
        </Container>
      </section>

      <CtaBlock />
    </>
  );
}
