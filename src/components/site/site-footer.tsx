import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { cities, legal, nav, products, site } from "@/data/site";
import { Logo } from "./primitives";

/**
 * Inset graphite card footer. Carries everything the live footer has, with the same H3s:
 * "Our Presence" (twelve cities), "Head Office", and "Menu" (Privacy Policy, Terms & Conditions, FAQ).
 */
export function SiteFooter() {
  return (
    <footer className="p-2 md:p-3">
      <div className="relative overflow-hidden rounded-[2rem] bg-graphite px-5 pb-6 pt-14 text-background md:px-12 md:pt-20">
        <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 size-[36rem] rounded-full" style={{ background: "radial-gradient(circle, rgba(44,92,76,.45), transparent 65%)" }} />
        <div className="relative grid gap-12 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <Logo light className="w-48" />
            <p className="mt-8 max-w-sm text-xl font-medium leading-snug tracking-tight">{site.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-x-4 gap-y-1 text-sm text-background/70">
              <a href={site.social.instagram} target="_blank" rel="noopener" className="hover:text-accent-bright">Instagram</a>
              <a href={site.social.facebook} target="_blank" rel="noopener" className="hover:text-accent-bright">Facebook</a>
              <a href={site.social.linkedin} target="_blank" rel="noopener" className="hover:text-accent-bright">LinkedIn</a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <FooterCol title="Menu" links={nav.map((n) => [n.label, n.to])} />
            <FooterCol title="Products" links={products.map((p) => [p.name, `/${p.slug}`])} />
            <div>
              <h3 className="label-mono mb-4 font-normal text-background/45">Our Presence</h3>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-background/80">
                {cities.map((c) => <li key={c}>{c}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="label-mono mb-4 font-normal text-background/45">Head Office</h3>
              <address className="text-sm not-italic leading-relaxed text-background/80">
                {site.headOffice.map((l) => <span key={l} className="block">{l}</span>)}
              </address>
              <ul className="mt-4 space-y-1.5 text-sm text-background/80">
                <li><a href={`mailto:${site.email}`} className="break-all hover:text-accent-bright">{site.email}</a></li>
                <li><a href={`tel:${site.phoneRaw}`} className="hover:text-accent-bright">{site.phone}</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="relative mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-background/10 pt-6">
          <p className="label-mono text-background/45">© {new Date().getFullYear()} {site.name}</p>
          <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-background/70">
            <h3 className="label-mono font-normal text-background/45">Menu</h3>
            {legal.map((l) => <Link key={l.to} to={l.to} className="hover:text-accent-bright">{l.label}</Link>)}
          </nav>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="label-mono inline-flex items-center gap-2 text-background/70 hover:text-accent-bright">
            Back to top <ArrowUp className="size-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[][] }) {
  return (
    <div>
      <p className="label-mono mb-4 text-background/45">{title}</p>
      <ul className="space-y-2.5 text-sm text-background/80">
        {links.map(([label, to]) => (
          <li key={to}><Link to={to} className="transition-colors hover:text-accent-bright">{label}</Link></li>
        ))}
      </ul>
    </div>
  );
}
