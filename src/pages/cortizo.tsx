import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowUpRight, BadgeCheck, Building, Building2, Check, DoorOpen, Hotel, Columns3, LayoutPanelTop, PanelsTopLeft, Home as HomeIcon } from "lucide-react";
import { TextReveal } from "@/components/ui/text-reveal";
import { FadeIn } from "@/components/ui/fade-in";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { ArrowButton } from "@/components/ui/arrow-button";
import { Container, Crumbs, SectionLabel } from "@/components/site/primitives";
import { CtaBlock, FaqBlock, PostCard, SectionHead } from "@/components/site/blocks";
import { cortizoPages, img, posts } from "@/data/site";

// Wording from the live Cortizo page (sumptuousindia.com/cortizo-in-india).
const features = [
  { h: "Premium Cortizo Sliding Systems in India", p: "At Sumptuous Building Systems, we deliver advanced Cortizo in India solutions designed for modern homes, luxury villas, and commercial projects. Cortizo sliding systems are known for their sleek European design, smooth functionality, and superior thermal insulation, making them ideal for large panoramic openings and contemporary architecture.", img: "u-villa-sliding" },
  { h: "High-Performance Cortizo Aluminium Windows", p: "Our premium range of Cortizo in India aluminium windows combines aesthetics with durability for long-lasting performance. Designed with cutting-edge European engineering, these systems provide excellent sound insulation, weather resistance, and energy efficiency. Sumptuous Building Systems ensures every installation is tailored to enhance natural light, ventilation, and modern architectural appeal.", img: "v-glass-living" },
  { h: "Elegant Cortizo Aluminium Doors for Modern Spaces", p: "Enhance your residential or commercial space with premium Cortizo in India aluminium doors designed for durability, advanced security, and effortless functionality. From sliding doors to slimline panoramic systems, Cortizo products are engineered to create luxurious and spacious interiors while maintaining exceptional structural performance. These systems are an excellent choice for luxury architectural developments and contemporary construction projects throughout India.", img: "v-open-deck" },
  { h: "Slim Line Aluminium Windows in India", p: "Slim line aluminium windows in India are an ideal choice for modern homes and luxury spaces, offering a sleek design, larger glass views, and maximum natural light. Known for their durability, low maintenance, and contemporary appearance, these premium aluminium window systems enhance both aesthetics and performance while providing excellent strength, weather resistance, and energy efficiency for residential and commercial projects.", img: "v-steel-bedroom" },
];

const whyCortizo = ["European engineering & quality", "Slim profiles & modern aesthetics", "Thermal insulation & energy efficiency", "High durability & corrosion resistance", "Ideal for luxury villas & premium apartments"];
const applications = [
  { icon: HomeIcon, t: "Luxury Villas" },
  { icon: Building2, t: "High-rise Apartments" },
  { icon: Building, t: "Commercial Buildings" },
  { icon: Hotel, t: "Resorts & Hotels" },
];
const systems = [
  { icon: Columns3, t: "Cortizo Sliding Doors" },
  { icon: PanelsTopLeft, t: "Cortizo Casement Windows" },
  { icon: DoorOpen, t: "Cortizo Lift & Slide Systems" },
  { icon: LayoutPanelTop, t: "Cortizo Facade Systems" },
];
const whySumptuous = ["Authorized supplier network", "Expert installation", "Custom design solutions", "Pan India service"];

/** `variant="1"` renders /cortizo-in-india-1, the older copy the live site keeps indexed with its own headings. */
export default function Cortizo({ variant }: { variant?: "1" }) {
  return (
    <>
      <section className="bg-drafting relative pb-10 pt-32 md:pt-40">
        <Container className="text-center">
          <Crumbs items={[["Home", "/"], ["Cortizo"]]} className="flex justify-center" />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="label-mono mt-10 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1.5 text-accent">
            <BadgeCheck className="size-3.5" /> Certified Cortizo Fabricator
          </motion.p>
          {variant === "1" ? <h2 className="label-mono mt-6 font-normal text-muted-foreground">CORTIZO IN INDIA</h2> : null}
          <TextReveal as="h1" text={variant === "1" ? "CORTIZO IN INDIA" : "Cortizo in India"} accent={["India", "INDIA"]} className="mx-auto mt-6 max-w-4xl text-4xl md:text-7xl" />
          <FadeIn delay={0.4} className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Cortizo is a premium European aluminium system brand known for high-performance windows, sliding doors, and facade systems. At Sumptuous India, we bring Cortizo aluminium solutions to India, offering world-class design, durability, and energy efficiency for residential and commercial spaces.
          </FadeIn>
          <FadeIn delay={0.5} className="mt-10 flex flex-wrap justify-center gap-2">
            <ArrowButton to="/contact">Contact Us</ArrowButton>
          </FadeIn>
        </Container>
        <Container className="relative mt-14">
          <ParallaxImage src={img("v-white-villa")} alt="Minimal white villa with large aluminium glazing" className="h-[56svh] rounded-[2rem]" strength={6} priority />
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <SectionHead n="01" label="Cortizo in India" title={variant === "1" ? "Premium Cortizo Aluminium Systems in India For Luxury Modern Architecture" : "Premium Cortizo Aluminium Systems in India for Luxury Modern Architecture"} accent={["Luxury"]} />
          <div className="space-y-16 md:space-y-24">
            {features.map((f, i) => (
              <div key={f.h} className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
                <ParallaxImage src={img(f.img)} alt="" className={`aspect-[4/3] rounded-[var(--radius)] md:col-span-6 ${i % 2 ? "md:order-2" : ""}`} strength={5} />
                <FadeIn className="md:col-span-6">
                  <span className="label-mono text-accent">0{i + 1}</span>
                  {variant === "1"
                    ? <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">{f.h}</h2>
                    : <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">{f.h}</h3>}
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">{f.p}</p>
                </FadeIn>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y bg-card py-20 md:py-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel n="02" as="h2">Why Choose Cortizo in India</SectionLabel>
            <ul className="mt-6 divide-y border-y">
              {whyCortizo.map((w) => (
                <li key={w} className="flex items-center gap-4 py-4 text-base font-medium">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent-soft text-accent"><Check className="size-3.5" /></span>{w}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-10 lg:col-span-6 lg:col-start-7">
            <div>
              <SectionLabel n="03" as="h2">Applications:</SectionLabel>
              <div className="mt-6 grid grid-cols-2 gap-2">
                {applications.map(({ icon: Icon, t }) => (
                  <SpotlightCard key={t} className="flex items-center gap-3 p-5"><Icon className="size-5 shrink-0 text-accent" strokeWidth={1.4} /><span className="font-medium">{t}</span></SpotlightCard>
                ))}
              </div>
            </div>
            <div>
              <SectionLabel n="04" as="h2">Cortizo Systems We Offer</SectionLabel>
              <div className="mt-6 grid grid-cols-2 gap-2">
                {systems.map(({ icon: Icon, t }) => (
                  <SpotlightCard key={t} className="flex items-center gap-3 p-5"><Icon className="size-5 shrink-0 text-accent" strokeWidth={1.4} /><span className="font-medium">{t}</span></SpotlightCard>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid overflow-hidden rounded-[2rem] bg-graphite text-background lg:grid-cols-2">
            <div className="flex flex-col justify-between gap-12 p-8 md:p-14">
              <div>
                <BadgeCheck className="size-6 text-accent-bright" />
                <TextReveal as="h3" text="Certified Cortizo Fabricator" accent={["Fabricator"]} className="mt-4 text-4xl md:text-5xl [&_.text-accent]:text-accent-bright" />
                <div className="mt-6 space-y-4 text-background/70">
                  <p>Sumptuous Building Systems is officially certified by Cortizo as an authorized fabricator for premium aluminium windows, doors, and façade systems. Our certification reflects a commitment to international quality standards, precision engineering, and modern architectural excellence. We deliver innovative aluminium solutions designed for durability, aesthetics, and long-term performance.</p>
                  <p>With advanced fabrication expertise and trusted Cortizo systems, we provide customized solutions for residential, commercial, and large-scale architectural projects across India. Our focus on quality craftsmanship, contemporary design, and customer satisfaction helps us create spaces that combine elegance, strength, and functionality.</p>
                </div>
              </div>
              <div>
                <h2 className="label-mono font-normal text-background/50">Why Choose Sumptuous India</h2>
                <ul className="mt-4 grid grid-cols-2 gap-2">
                  {whySumptuous.map((w) => <li key={w} className="rounded-xl border border-background/15 px-4 py-3 text-sm">{w}</li>)}
                </ul>
              </div>
            </div>
            <ParallaxImage src={img("v-white-tower")} alt="Facade with deep-set aluminium windows" className="min-h-[50svh]" />
          </div>
        </Container>
      </section>

      <section className="pb-20 md:pb-28">
        <Container>
          <div className="mb-12 max-w-3xl">
            <SectionLabel n="05">Cortizo Windows Supplier</SectionLabel>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight md:text-4xl">Premium Cortizo Windows Supplier in India for Modern Luxury Spaces</h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>Looking for a trusted Cortizo windows supplier in India for your residential or commercial project? Cortizo offers premium aluminium window systems designed for modern architecture, luxury villas, and high-end spaces. Known for sleek designs, durability, thermal insulation, and superior performance, Cortizo windows combine aesthetics with functionality.</p>
              <p>Choosing the right Cortizo windows supplier in India ensures access to genuine aluminium systems, expert guidance, and customized solutions for sliding windows, minimal windows, and contemporary façades. Cortizo systems are ideal for creating elegant, energy-efficient, and long-lasting spaces with a modern architectural appeal.</p>
            </div>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {posts.filter((p) => /cortizo/i.test(p.title)).slice(0, 3).map((p, i) => <FadeIn key={p.slug} delay={i * 0.08}><PostCard p={p} /></FadeIn>)}
          </div>
        </Container>
      </section>

      <section className="border-t py-20 md:py-28">
        <Container>
          {variant === "1" ? <h2 className="mb-8 text-2xl font-semibold tracking-tight md:text-4xl">Explore Our Premium Cortizo Aluminium Systems</h2> : null}
          <div className="grid gap-2 sm:grid-cols-2">
            {cortizoPages.map((c, i) => (
              <FadeIn key={c.slug} delay={i * 0.06}>
                <Link to={`/${c.slug}`} className="group relative flex min-h-72 flex-col justify-end overflow-hidden rounded-[var(--radius)] bg-graphite p-6 text-background md:min-h-80">
                  <img src={img(c.img)} alt="" loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover opacity-55 transition-all duration-[1.2s] ease-out-expo group-hover:scale-105 group-hover:opacity-70" />
                  <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/30 to-transparent" />
                  <div className="relative">
                    <h2 className="max-w-md text-xl font-semibold leading-snug tracking-tight md:text-2xl">{variant === "1" ? c.altTitle : c.title}</h2>
                    <span className="label-mono mt-5 inline-flex items-center gap-2 text-accent-bright">View More <ArrowUpRight className="size-3.5 transition-transform group-hover:rotate-45" /></span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <FaqBlock slug="cortizo-in-india" className="border-t" />
      <CtaBlock />
    </>
  );
}
