import { Link } from "react-router-dom";
import { motion, useScroll, useSpring } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { TextReveal } from "@/components/ui/text-reveal";
import { FadeIn } from "@/components/ui/fade-in";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { ArrowButton } from "@/components/ui/arrow-button";
import { Container, Crumbs, SectionLabel } from "@/components/site/primitives";
import { PostCard } from "@/components/site/blocks";
import { img, posts, type Post } from "@/data/site";

// Full copy exists for the thermal-break article; others show their summary until migrated.
const toc = [["what", "What is a thermal break?"], ["why", "Why it matters in India"], ["benefits", "Five benefits"], ["choose", "Choosing a system"]];

function ThermalBreakBody() {
  return (
    <>
      <h2 id="what">What is a thermal break?</h2>
      <p>Aluminium conducts heat very efficiently, which is excellent in a radiator and unhelpful in a window frame. A thermal break is an insulating barrier, usually glass-fibre-reinforced polyamide, that separates the inner and outer halves of the profile so heat cannot travel straight through the metal.</p>
      <p>The result is a frame that keeps aluminium's strength and slimness while behaving far more like an insulator.</p>
      <h2 id="why">Why it matters in India</h2>
      <p>In much of India the challenge is keeping heat out. A non-insulated frame warms in the afternoon sun and radiates that heat indoors, working against your air conditioning. Thermally broken frames slow that transfer and help prevent condensation on cooled interiors during humid months.</p>
      <blockquote>Glass gets the attention, but the frame decides how a window performs.</blockquote>
      <h2 id="benefits">Five benefits</h2>
      <ol>
        <li><strong>Lower cooling loads:</strong> less heat conducted through the frame.</li>
        <li><strong>Comfort near the glass:</strong> inner frame surfaces stay closer to room temperature.</li>
        <li><strong>Less condensation:</strong> protecting finishes, sills and interiors.</li>
        <li><strong>Better acoustics:</strong> insulated profiles pair well with laminated double glazing.</li>
        <li><strong>Design freedom:</strong> different colours inside and out on many systems.</li>
      </ol>
      <h2 id="choose">Choosing a system</h2>
      <p>Look for tested performance data for air, water and wind resistance, and for the width of the thermal barrier itself. Cortizo publishes certified values from its PfB Rosenheim-accredited technology centre; our consultants can match those figures to your project's orientation and glazing.</p>
    </>
  );
}

export default function BlogPost({ post }: { post: Post }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  const full = post === posts[0];
  const related = posts.filter((p) => p !== post).slice(0, 3);

  return (
    <>
      <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[55] h-1 origin-left bg-accent" aria-hidden />
      <article>
        <header className="pb-12 pt-32 md:pt-40">
          <Container className="max-w-4xl">
            <Crumbs items={[["Home", "/"], ["Blogs", "/blog"], ["Article"]]} />
            <p className="label-mono mt-10 text-muted-foreground"><span className="text-accent">{post.cat}</span> · {post.date} · {post.read} min read</p>
            <TextReveal as="h1" text={post.title} className="mt-5 text-4xl md:text-7xl" />
            <FadeIn delay={0.3} className="mt-8 text-xl text-muted-foreground">{post.excerpt}</FadeIn>
          </Container>
        </header>
        <div className="mx-auto max-w-[1320px] px-4 md:px-8"><ParallaxImage src={img(post.img)} alt="" className="h-[56svh] rounded-[2rem]" priority /></div>

        <Container className="grid gap-12 py-20 md:py-28 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <SectionLabel>Contents</SectionLabel>
              {full ? (
                <ol className="mt-5 space-y-3 text-sm">
                  {toc.map(([id, t], i) => <li key={id}><a href={`#${id}`} className="flex gap-3 text-muted-foreground hover:text-accent"><span className="label-mono">0{i + 1}</span>{t}</a></li>)}
                </ol>
              ) : <p className="mt-5 text-sm text-muted-foreground">Summary</p>}
              <Link to="/blog" className="label-mono mt-10 inline-flex items-center gap-2 text-muted-foreground hover:text-accent"><ArrowLeft className="size-3.5" /> All articles</Link>
            </div>
          </aside>
          <div className="text-lg leading-relaxed lg:col-span-7 [&_blockquote]:my-12 [&_blockquote]:border-l-2 [&_blockquote]:border-accent [&_blockquote]:pl-6 [&_blockquote]:font-display [&_blockquote]:text-3xl [&_blockquote]:italic [&_h2]:mb-5 [&_h2]:mt-16 [&_h2]:scroll-mt-28 [&_h2]:font-display [&_h2]:text-4xl [&_h2:first-child]:mt-0 [&_li]:border-b [&_li]:py-3 [&_ol]:my-6 [&_p]:mb-5 [&_p]:text-foreground/80">
            {full ? <ThermalBreakBody /> : (
              <>
                <p>{post.excerpt}</p>
                <p className="label-mono rounded-2xl border border-dashed p-5 text-muted-foreground">Full article to be migrated from the current site.</p>
              </>
            )}
            <div className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-[var(--radius)] bg-accent-soft p-8">
              <p className="font-display text-2xl">Want a recommendation for your drawings?</p>
              <ArrowButton to="/contact">Talk to a specialist</ArrowButton>
            </div>
          </div>
        </Container>
      </article>

      <section className="border-t py-20 md:py-28">
        <Container>
          <SectionLabel n="→">Keep reading</SectionLabel>
          <div className="mt-10 grid gap-8 md:grid-cols-3">{related.map((p) => <PostCard key={p.slug} p={p} />)}</div>
        </Container>
      </section>
    </>
  );
}
