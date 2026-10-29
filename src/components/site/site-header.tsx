import * as React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import { nav, products, site } from "@/data/site";
import { cn } from "@/lib/utils";
import { Logo } from "./primitives";

/** Floating glass pill. Products opens a card of all twelve systems beneath it. */
export function SiteHeader() {
  const [hidden, setHidden] = React.useState(false);
  const [solid, setSolid] = React.useState(false);
  const [panel, setPanel] = React.useState(false);
  const [sheet, setSheet] = React.useState(false);
  const { pathname } = useLocation();
  const { scrollY } = useScroll();
  const closeTimer = React.useRef<number>();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 24);
    setHidden(y > prev && y > 480 && !panel);
  });

  React.useEffect(() => { setPanel(false); setSheet(false); }, [pathname]);
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setPanel(false); setSheet(false); } };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, []);
  React.useEffect(() => {
    document.documentElement.style.overflow = sheet ? "hidden" : "";
  }, [sheet]);

  const openPanel = () => { window.clearTimeout(closeTimer.current); setPanel(true); };
  const closePanel = () => { closeTimer.current = window.setTimeout(() => setPanel(false), 160); };

  return (
    <>
      <motion.header
        animate={{ y: hidden ? -110 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-3 z-50 px-3 md:top-5"
      >
        <div
          className={cn(
            "mx-auto flex h-14 max-w-6xl items-center gap-4 rounded-full border pl-5 pr-2 transition-all duration-500",
            solid ? "border-border bg-background/80 shadow-[0_10px_40px_-20px_rgba(22,24,26,.35)] backdrop-blur-xl" : "border-transparent bg-background/55 backdrop-blur-md",
          )}
        >
          <Link to="/" aria-label="Sumptuous Building Systems, home" className="shrink-0"><Logo className="w-32" /></Link>

          <nav aria-label="Primary" className="mx-auto hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {nav.map((n) =>
                n.to === "/products" ? (
                  <li key={n.to} onMouseEnter={openPanel} onMouseLeave={closePanel}>
                    <NavLink
                      to={n.to}
                      aria-expanded={panel}
                      onFocus={openPanel}
                      className={({ isActive }) => cn("flex items-center gap-1 rounded-full px-3.5 py-2 text-sm transition-colors hover:bg-muted", (isActive || panel) && "bg-muted")}
                    >
                      {n.label}
                      <ChevronDown className={cn("size-3.5 transition-transform duration-300", panel && "rotate-180")} />
                    </NavLink>
                  </li>
                ) : (
                  <li key={n.to}>
                    <NavLink
                      to={n.to}
                      end
                      className={({ isActive }) => cn("block rounded-full px-3.5 py-2 text-sm transition-colors hover:bg-muted", isActive && "bg-graphite text-background hover:bg-graphite")}
                    >
                      {n.label}
                    </NavLink>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-1.5 lg:ml-0">
            <a href={`tel:${site.phoneRaw}`} aria-label={`Call ${site.phone}`} className="grid size-10 place-items-center rounded-full transition-colors hover:bg-muted">
              <Phone className="size-4" />
            </a>
            <Link to="/contact" className="hidden h-10 items-center gap-1.5 rounded-full bg-accent px-4 text-sm font-medium text-background transition-colors hover:bg-graphite sm:inline-flex">
              REACH OUT <ArrowUpRight className="size-4" />
            </Link>
            <button type="button" onClick={() => setSheet(true)} aria-label="Open menu" aria-expanded={sheet} className="grid size-10 place-items-center rounded-full bg-graphite text-background lg:hidden">
              <Menu className="size-4" />
            </button>
          </div>
        </div>

        {/* products panel */}
        <AnimatePresence>
          {panel && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={openPanel}
              onMouseLeave={closePanel}
              className="mx-auto mt-2 hidden max-w-6xl overflow-hidden rounded-[1.75rem] border bg-background/95 p-2 shadow-[0_30px_80px_-30px_rgba(22,24,26,.45)] backdrop-blur-xl lg:block"
            >
              <div className="grid grid-cols-[1fr_3fr] gap-2">
                <div className="flex flex-col justify-between rounded-[1.4rem] bg-graphite p-6 text-background">
                  <div>
                    <p className="label-mono text-accent-bright">Products</p>
                    <p className="font-display-tight mt-4 text-2xl">High Performance Windows for <em>Sustainable</em> Habitats</p>
                  </div>
                  <Link to="/products" className="label-mono inline-flex items-center gap-2 text-accent-bright hover:text-background">
                    View all products <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
                <ul className="grid grid-cols-3 gap-1">
                  {products.map((p) => (
                    <li key={p.slug}>
                      <Link to={`/${p.slug}`} className="group flex items-center gap-3 rounded-2xl p-2.5 transition-colors hover:bg-muted">
                        <span className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-muted">
                          <img src={`/images/${p.img}.webp`} alt="" className="size-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-medium leading-snug">{p.name}</span>
                          <span className="label-mono block truncate text-[0.6rem] text-muted-foreground">{p.partner}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* mobile sheet */}
      <AnimatePresence>
        {sheet && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-graphite text-background lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0 round 0 0 2rem 2rem)" }}
            animate={{ clipPath: "inset(0 0 0% 0 round 0 0 0rem 0rem)" }}
            exit={{ clipPath: "inset(0 0 100% 0 round 0 0 2rem 2rem)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex h-20 items-center justify-between px-5">
              <Logo light className="w-32" />
              <button type="button" onClick={() => setSheet(false)} aria-label="Close menu" className="grid size-10 place-items-center rounded-full bg-background text-graphite">
                <X className="size-4" />
              </button>
            </div>
            <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center px-5">
              {nav.map((n, i) => (
                <motion.div key={n.to} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                  <NavLink to={n.to} className={({ isActive }) => cn("flex items-baseline gap-4 border-b border-background/10 py-3 font-display-tight text-4xl", isActive && "italic text-accent-bright")}>
                    <span className="label-mono text-background/40">{String(i + 1).padStart(2, "0")}</span>
                    {n.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <div className="label-mono space-y-1 px-5 pb-8 text-background/60">
              <a href={`mailto:${site.email}`} className="block">{site.email}</a>
              <a href={`tel:${site.phoneRaw}`} className="block">{site.phone}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
