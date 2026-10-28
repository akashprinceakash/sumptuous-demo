import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, Instagram, Facebook, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { TextReveal } from "@/components/ui/text-reveal";
import { FadeIn } from "@/components/ui/fade-in";
import { ArrowButton } from "@/components/ui/arrow-button";
import { Accordion } from "@/components/ui/accordion";
import { Container, Crumbs, SectionLabel } from "@/components/site/primitives";
import { SectionHead } from "@/components/site/blocks";
import { products, site } from "@/data/site";
import { cn } from "@/lib/utils";

const roles = ["Homeowner", "Architect", "Builder", "Other"];
const faqs = [
  { q: "Do you supply and install outside Bengaluru?", a: "Yes. We work across India, with projects in more than a dozen cities including Mumbai, Delhi, Chennai, Hyderabad and Pune." },
  { q: "Are Cortizo systems imported or fabricated locally?", a: "Profiles and hardware come from Cortizo's European plants; fabrication and installation follow Cortizo specifications under our supervision." },
  { q: "How early should we involve you in a project?", a: "Ideally at design development, so profiles, glass sizes and structural openings can be coordinated before construction drawings are frozen." },
  { q: "Do you offer after-sales service?", a: "Yes. We provide handover documentation, maintenance guidance and service support for the life of the installation." },
];

function Field({ id, label, error, ...props }: React.ComponentProps<"input"> & { id: string; label: string; error?: string }) {
  return (
    <div>
      <label htmlFor={id} className="label-mono text-muted-foreground">{label}</label>
      <input id={id} name={id} {...props} className={cn("mt-2 h-12 w-full rounded-xl border bg-background px-4 outline-none transition-colors focus:border-accent", error && "border-red-400")} />
      <p className="mt-1 h-4 text-xs text-red-500">{error}</p>
    </div>
  );
}

export default function Contact() {
  const [role, setRole] = React.useState(roles[0]);
  const [interest, setInterest] = React.useState<string[]>([]);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [sent, setSent] = React.useState(false);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const next: Record<string, string> = {};
    for (const name of ["name", "phone", "email"]) {
      const el = f.elements.namedItem(name) as HTMLInputElement;
      if (!el.value.trim()) next[name] = "Required";
      else if (!el.checkValidity()) next[name] = "Please check this field";
    }
    setErrors(next);
    // Front-end only: connect to your CRM or form endpoint here.
    if (!Object.keys(next).length) setSent(true);
  };

  return (
    <>
      <section className="pb-20 pt-32 md:pt-40">
        <Container className="grid gap-4 lg:grid-cols-12">
          {/* info panel */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-graphite p-8 text-background md:p-12 lg:col-span-5">
            <div aria-hidden className="pointer-events-none absolute -bottom-32 -left-32 size-96 rounded-full" style={{ background: "radial-gradient(circle, rgba(44,92,76,.6), transparent 65%)" }} />
            <div className="relative">
              <Crumbs items={[["Home", "/"], ["Contact"]]} className="[&_*]:text-background/60" />
              <TextReveal as="h1" text="Let's talk about your openings." accent={["openings."]} className="mt-8 text-5xl md:text-7xl [&_.text-accent]:text-accent-bright" />
              <p className="mt-6 max-w-sm text-background/65">Share drawings, a site photo or simply an idea. A specialist will respond within one working day.</p>
            </div>
            <ul className="relative mt-16 space-y-1">
              {[
                { I: Phone, l: site.phone, h: `tel:${site.phoneRaw}` },
                { I: Mail, l: site.email, h: `mailto:${site.email}` },
                { I: MapPin, l: site.city },
              ].map(({ I, l, h }) => (
                <li key={l}>
                  {h ? (
                    <a href={h} className="group flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-background/5">
                      <span className="grid size-10 place-items-center rounded-full bg-background/10 group-hover:bg-accent-bright group-hover:text-graphite"><I className="size-4" /></span>{l}
                    </a>
                  ) : (
                    <span className="flex items-center gap-4 p-3"><span className="grid size-10 place-items-center rounded-full bg-background/10"><I className="size-4" /></span>{l}</span>
                  )}
                </li>
              ))}
              <li className="flex gap-2 p-3">
                {[[Instagram, site.social.instagram, "Instagram"], [Facebook, site.social.facebook, "Facebook"], [Linkedin, site.social.linkedin, "LinkedIn"]].map(([I, h, l]) => {
                  const Icon = I as typeof Instagram;
                  return <a key={l as string} href={h as string} target="_blank" rel="noopener" aria-label={l as string} className="grid size-10 place-items-center rounded-full border border-background/15 transition-colors hover:bg-background hover:text-graphite"><Icon className="size-4" /></a>;
                })}
              </li>
            </ul>
          </div>

          {/* form */}
          <FadeIn delay={0.2} className="relative lg:col-span-7">
            <form onSubmit={submit} noValidate className="h-full rounded-[2rem] border bg-card p-6 md:p-10">
              <SectionLabel n="01">I am a</SectionLabel>
              <div role="radiogroup" aria-label="I am a" className="mt-4 inline-flex flex-wrap gap-1 rounded-full bg-muted p-1">
                {roles.map((r) => (
                  <button key={r} type="button" role="radio" aria-checked={role === r} onClick={() => setRole(r)} className="relative rounded-full px-4 py-2 text-sm">
                    {role === r && <motion.span layoutId="role-pill" className="absolute inset-0 rounded-full bg-background shadow-sm" transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />}
                    <span className="relative">{r}</span>
                  </button>
                ))}
              </div>

              <SectionLabel n="02" className="mt-10">Interested in</SectionLabel>
              <div className="mt-4 flex flex-wrap gap-2">
                {products.map((p) => {
                  const on = interest.includes(p.short);
                  return (
                    <button key={p.slug} type="button" aria-pressed={on} onClick={() => setInterest((s) => on ? s.filter((x) => x !== p.short) : [...s, p.short])} className={cn("rounded-full border px-3.5 py-1.5 text-sm transition-colors", on ? "border-accent bg-accent text-background" : "hover:border-foreground")}>
                      {p.short}
                    </button>
                  );
                })}
              </div>

              <SectionLabel n="03" className="mt-10">Your details</SectionLabel>
              <div className="mt-4 grid gap-x-4 sm:grid-cols-2">
                <Field id="name" label="Full name" autoComplete="name" required error={errors.name} />
                <Field id="phone" label="Phone" type="tel" autoComplete="tel" pattern="[0-9+ ()-]{8,}" required error={errors.phone} />
                <div className="sm:col-span-2"><Field id="email" label="Email" type="email" autoComplete="email" required error={errors.email} /></div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="label-mono text-muted-foreground">Project notes</label>
                  <textarea id="message" name="message" rows={4} className="mt-2 w-full rounded-xl border bg-background p-4 outline-none transition-colors focus:border-accent" />
                </div>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <p className="label-mono text-muted-foreground">We never share your details.</p>
                <ArrowButton type="submit" variant="accent">Send enquiry</ArrowButton>
              </div>
            </form>
            <AnimatePresence>
              {sent && (
                <motion.div role="status" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-[2rem] bg-card p-8 text-center">
                  <CheckCircle2 className="size-12 text-accent" strokeWidth={1.2} />
                  <p className="font-display-tight text-5xl">Thank you, <em className="text-accent">{role.toLowerCase()}</em>.</p>
                  <p className="max-w-sm text-muted-foreground">A specialist will call you within one working day.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </FadeIn>
        </Container>
      </section>

      <section className="px-2 md:px-3">
        <div className="relative h-[60svh] overflow-hidden rounded-[2rem] bg-muted">
          <iframe title="Map: Sumptuous Building Systems, Bengaluru" src="https://www.google.com/maps?q=Bengaluru%2C%20Karnataka&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="size-full border-0 grayscale" />
          <div className="absolute left-4 top-4 rounded-2xl bg-background/95 p-5 shadow-lg backdrop-blur md:left-8 md:top-8">
            <p className="label-mono text-accent">Studio</p>
            <p className="font-display mt-2 text-2xl">{site.city}</p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <Container className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5"><SectionHead n="FAQ" label="Before you ask" title="Common questions." accent={["questions."]} /></div>
          <div className="md:col-span-7"><Accordion items={faqs} /></div>
        </Container>
      </section>
    </>
  );
}
