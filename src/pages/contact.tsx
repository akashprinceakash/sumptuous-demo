import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Building2, CheckCircle2, Facebook, Globe, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { TextReveal } from "@/components/ui/text-reveal";
import { FadeIn } from "@/components/ui/fade-in";
import { ArrowButton } from "@/components/ui/arrow-button";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Container, Crumbs, SectionLabel } from "@/components/site/primitives";
import { SectionHead } from "@/components/site/blocks";
import { branches, cities, dealers, products, site } from "@/data/site";
import { cn } from "@/lib/utils";

const roles = ["Homeowner", "Architect", "Builder", "Other"];

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
              <TextReveal as="h1" text="Contact Us" accent={["Us"]} className="mt-8 text-4xl md:text-6xl [&_.text-accent]:text-accent-bright" />
              <p className="mt-6 max-w-sm leading-relaxed text-background/70">Ready to bring your vision to life? Tell us about your project, and we’ll reach out to discuss how we can build something exceptional together.</p>
            </div>
            <ul className="relative mt-12 space-y-1">
              <li className="flex gap-4 p-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-background/10"><MapPin className="size-4" /></span>
                <span>
                  <h2 className="label-mono block font-normal text-background/50">Head Office</h2>
                  <span className="mt-1 block text-sm leading-relaxed">{site.headOffice.join(" ")}</span>
                </span>
              </li>
              {[
                { I: Mail, k: "Email", l: site.email, h: `mailto:${site.email}` },
                { I: Phone, k: "Contact", l: site.phone, h: `tel:${site.phoneRaw}` },
              ].map(({ I, k, l, h }) => (
                <li key={k}>
                  <a href={h} className="group flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-background/5">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-background/10 group-hover:bg-accent-bright group-hover:text-graphite"><I className="size-4" /></span>
                    <span><h2 className="label-mono block font-normal text-background/50">{k}</h2><span className="mt-1 block text-sm">{l}</span></span>
                  </a>
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

              <SectionLabel n="02" className="mt-10">Products</SectionLabel>
              <div className="mt-4 flex flex-wrap gap-2">
                {products.map((p) => {
                  const on = interest.includes(p.name);
                  return (
                    <button key={p.slug} type="button" aria-pressed={on} onClick={() => setInterest((s) => on ? s.filter((x) => x !== p.name) : [...s, p.name])} className={cn("rounded-full border px-3.5 py-1.5 text-sm transition-colors", on ? "border-accent bg-accent text-background" : "hover:border-foreground")}>
                      {p.name}
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
                  <label htmlFor="message" className="label-mono text-muted-foreground">Tell us about your project</label>
                  <textarea id="message" name="message" rows={4} className="mt-2 w-full rounded-xl border bg-background p-4 outline-none transition-colors focus:border-accent" />
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <ArrowButton type="submit" variant="accent">Submit</ArrowButton>
              </div>
            </form>
            <AnimatePresence>
              {sent && (
                <motion.div role="status" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-[2rem] bg-card p-8 text-center">
                  <CheckCircle2 className="size-12 text-accent" strokeWidth={1.2} />
                  <p className="text-3xl font-medium tracking-tight">Thank you</p>
                  <p className="max-w-sm text-muted-foreground">We’ll reach out to discuss how we can build something exceptional together.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </FadeIn>
        </Container>
      </section>

      {/* branches */}
      <section className="pb-20 md:pb-28">
        <Container>
          <SectionHead n="IN" label="Branches" labelAs="h2" titleAs="p" title="Our Presence" />
          <div className="grid gap-2 md:grid-cols-3">
            {branches.map((b) => (
              <SpotlightCard key={b.name} className="p-6 md:p-7">
                <span className="grid size-11 place-items-center rounded-full bg-accent-soft text-accent">{b.contact ? <Building2 className="size-5" strokeWidth={1.5} /> : <Globe className="size-5" strokeWidth={1.5} />}</span>
                <h2 className="mt-6 text-lg font-semibold tracking-tight">{b.name}</h2>
                {b.lines.map((l) => <p key={l} className="mt-2 text-sm leading-relaxed text-muted-foreground">{l}</p>)}
                {b.contact ? (
                  <p className="mt-4 border-t pt-4 text-sm">
                    <span className="block">Contact: {b.contact}</span>
                    <a href={`tel:${b.phone?.replace(/\s/g, "")}`} className="mt-1 block font-medium hover:text-accent">{b.phone}</a>
                  </p>
                ) : null}
              </SpotlightCard>
            ))}
          </div>
          <ul className="mt-8 flex flex-wrap gap-2">
            {cities.map((c) => <li key={c} className="rounded-full border px-4 py-2 text-sm">{c}</li>)}
          </ul>
        </Container>
      </section>

      {/* dealers */}
      <section className="border-y bg-card py-20 md:py-28">
        <Container className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <SectionLabel n="02">Dealers</SectionLabel>
            <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-5xl">Our Partners</h2>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 md:col-span-8">
            {dealers.map((d) => (
              <dl key={d.name} className="grid grid-cols-2 gap-4 rounded-[var(--radius)] border bg-background p-6">
                <div>
                  <dt><h2 className="label-mono font-normal text-muted-foreground">DEALER NAME</h2></dt>
                  <dd><h2 className="mt-2 text-base font-semibold">{d.name}</h2></dd>
                </div>
                <div>
                  <dt><h2 className="label-mono font-normal text-muted-foreground">CITY / REGION</h2></dt>
                  <dd><h2 className="mt-2 text-base font-normal text-muted-foreground">{d.region}</h2></dd>
                </div>
              </dl>
            ))}
          </div>
        </Container>
      </section>

      <section className="px-2 py-2 md:px-3 md:py-3">
        <div className="relative h-[56svh] overflow-hidden rounded-[2rem] bg-muted">
          <iframe title="Map: Sumptuous Building Systems Head Office, Bangalore" src="https://www.google.com/maps?q=Santhosh%20Vihar%2C%20Jakkur%20Road%2C%20Bytarayanapura%2C%20Bangalore%20560064&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="size-full border-0 grayscale" />
          <div className="absolute left-4 top-4 max-w-xs rounded-2xl bg-background/95 p-5 shadow-lg backdrop-blur md:left-8 md:top-8">
            <p className="label-mono text-accent">Head Office</p>
            <p className="mt-2 text-sm leading-relaxed">{site.headOffice.join(" ")}</p>
          </div>
        </div>
      </section>
    </>
  );
}
