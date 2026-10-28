import * as React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { NumberTicker } from "@/components/ui/number-ticker";
import { img } from "@/data/site";
import { Container, SectionLabel } from "./primitives";

const ease = [0.16, 1, 0.3, 1] as const;

/** Circular text badge that turns slowly (CSS, compositor only). */
function Seal() {
  const text = "EUROPE · TO · INDIA · SINCE · 25+ · YEARS · ";
  return (
    <div className="relative grid size-32 place-items-center rounded-full bg-accent text-background shadow-xl md:size-36">
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full animate-[spin_22s_linear_infinite]">
        <defs><path id="seal-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
        <text style={{ font: "500 7px 'JetBrains Mono', monospace", letterSpacing: "0.8px" }} fill="currentColor">
          <textPath href="#seal-circle">{text}</textPath>
        </text>
      </svg>
      <ArrowUpRight className="size-7" strokeWidth={1.4} />
    </div>
  );
}

const stats = [
  { n: 25, s: "+", l: "Years of expertise", d: "In façade & fenestration since the beginning." },
  { n: 500, s: "+", l: "Projects delivered", d: "Villas, towers, campuses and heritage homes." },
  { n: 10, s: "", l: "Partner brands", d: "Spain, Italy, Belgium and Australia." },
  { n: 13, s: "", l: "Cities served", d: "From Bengaluru to Delhi and Mumbai." },
];

export function StudioSection() {
  const imgRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section className="relative py-20 md:py-28">
      <Container>
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 md:mb-14">
          <SectionLabel n="01">The studio</SectionLabel>
          <p className="label-mono text-muted-foreground">Bengaluru · Est. 25+ years ago</p>
        </div>

        <div className="grid gap-10 md:grid-cols-12 md:gap-6">
          {/* spec-table stats */}
          <dl className="grid grid-cols-2 grid-rows-2 border-l border-t md:col-span-7">
            {stats.map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.08, ease }}
                className="group flex flex-col justify-between gap-6 border-b border-r p-5 transition-colors duration-500 hover:bg-card md:p-7"
              >
                <dt className="label-mono flex items-center justify-between text-muted-foreground">
                  <span>{s.l}</span><span className="text-accent">0{i + 1}</span>
                </dt>
                <dd>
                  <span className="font-display-tight block text-5xl md:text-6xl">
                    <NumberTicker value={s.n} /><span className="text-accent">{s.s}</span>
                  </span>
                  <span className="mt-2 block text-sm text-muted-foreground">{s.d}</span>
                </dd>
              </motion.div>
            ))}
          </dl>

          {/* image card with seal */}
          <div className="relative md:col-span-4 md:col-start-9">
            <div ref={imgRef} className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius)] bg-muted">
              <motion.img
                src={img("u-architect-drawing")}
                alt="Specification drawings being marked up by hand"
                loading="lazy"
                decoding="async"
                style={{ y: imgY }}
                className="absolute inset-x-0 -top-[6%] h-[112%] w-full object-cover will-change-transform"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-graphite/80 to-transparent p-5 pt-16 text-background">
                <p className="label-mono text-accent-bright">Specified by hand</p>
                <p className="mt-1 text-sm text-background/80">Every opening drawn, checked and matched to its system.</p>
              </div>
            </div>
            <Link to="/about" aria-label="Read our story" className="absolute -left-4 bottom-24 transition-transform duration-500 hover:scale-105 md:-left-16">
              <Seal />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
