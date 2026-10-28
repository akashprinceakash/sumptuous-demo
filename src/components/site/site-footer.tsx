import * as React from "react";
import { Link } from "react-router-dom";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { nav, products, site } from "@/data/site";
import { Logo } from "./primitives";

/** Inset graphite card footer with a newsletter field and the full sitemap. */
export function SiteFooter() {
  const [msg, setMsg] = React.useState("");
  return (
    <footer className="p-2 md:p-3">
      <div className="relative overflow-hidden rounded-[2rem] bg-graphite px-5 pb-6 pt-14 text-background md:px-12 md:pt-20">
        <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 size-[36rem] rounded-full" style={{ background: "radial-gradient(circle, rgba(44,92,76,.45), transparent 65%)" }} />
        <div className="relative grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Logo light className="w-48" />
            <p className="mt-8 max-w-sm text-background/70">Premium façade &amp; fenestration from Europe's finest makers, specified and installed across India.</p>
            <form
              className="mt-8 flex max-w-sm items-center gap-2 rounded-full border border-background/15 p-1.5 pl-5"
              onSubmit={(e) => {
                e.preventDefault();
                const input = e.currentTarget.elements.namedItem("email") as HTMLInputElement;
                setMsg(input.checkValidity() ? "Thank you, you're on the list." : "Please enter a valid email.");
              }}
              noValidate
            >
              <label htmlFor="ft-email" className="sr-only">Email</label>
              <input id="ft-email" name="email" type="email" required placeholder="Email for the journal" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-background/40" />
              <button type="submit" aria-label="Subscribe" className="grid size-9 place-items-center rounded-full bg-accent-bright text-graphite transition-transform hover:rotate-45">
                <ArrowUpRight className="size-4" />
              </button>
            </form>
            <p role="status" className="label-mono mt-3 h-4 text-accent-bright">{msg}</p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <FooterCol title="Explore" links={nav.map((n) => [n.label, n.to])} />
            <FooterCol title="Systems" links={products.slice(0, 6).map((p) => [p.short, `/${p.slug}`])} />
            <FooterCol title="More" links={products.slice(6).map((p) => [p.short, `/${p.slug}`])} />
            <div>
              <p className="label-mono mb-4 text-background/45">Studio</p>
              <ul className="space-y-2.5 text-sm text-background/80">
                <li><a href={`tel:${site.phoneRaw}`} className="hover:text-accent-bright">{site.phone}</a></li>
                <li><a href={`mailto:${site.email}`} className="break-all hover:text-accent-bright">{site.email}</a></li>
                <li>{site.city}</li>
                <li className="flex flex-wrap gap-x-3 gap-y-1 pt-2">
                  <a href={site.social.instagram} target="_blank" rel="noopener" className="hover:text-accent-bright">Instagram</a>
                  <a href={site.social.facebook} target="_blank" rel="noopener" className="hover:text-accent-bright">Facebook</a>
                  <a href={site.social.linkedin} target="_blank" rel="noopener" className="hover:text-accent-bright">LinkedIn</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="relative mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-background/10 pt-6">
          <p className="label-mono text-background/45">© {new Date().getFullYear()} {site.name}</p>
          <p className="label-mono text-background/45">{site.tagline}</p>
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
