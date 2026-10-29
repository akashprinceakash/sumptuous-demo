import * as React from "react";
import { Link, Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import Lenis from "lenis";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Container } from "@/components/site/primitives";
import { ArrowButton } from "@/components/ui/arrow-button";
import { cortizoPages, landingPages, legal, posts, products, projects } from "@/data/site";
import { applySeo } from "@/lib/seo";
import Home from "@/pages/home";

// Every other page is split into its own chunk so the first visit only downloads Home.
const About = React.lazy(() => import("@/pages/about"));
const Cortizo = React.lazy(() => import("@/pages/cortizo"));
const Products = React.lazy(() => import("@/pages/products"));
const ProductDetail = React.lazy(() => import("@/pages/product-detail"));
const Projects = React.lazy(() => import("@/pages/projects"));
const Blog = React.lazy(() => import("@/pages/blog"));
const BlogPost = React.lazy(() => import("@/pages/blog-post"));
const Contact = React.lazy(() => import("@/pages/contact"));
const ProjectDetail = React.lazy(() => import("@/pages/project-detail"));
const ArticlePage = React.lazy(() => import("@/pages/live-page").then((m) => ({ default: m.ArticlePage })));
const LegalPage = React.lazy(() => import("@/pages/live-page").then((m) => ({ default: m.LegalPage })));

// Product pages live at the site root, matching the current URLs (e.g. /windows-georgian).
function ProductRoute() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  return product ? <ProductDetail product={product} /> : <NotFound />;
}

function PostRoute() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);
  return post ? <BlogPost post={post} /> : <NotFound />;
}

function ProjectRoute() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  return project ? <ProjectDetail project={project} /> : <NotFound />;
}

// Older links in this template used /blog/<slug>; the live site serves posts at /post/<slug>.
function OldPostRoute() {
  const { slug } = useParams();
  return <Navigate to={`/post/${slug}`} replace />;
}

function NotFound() {
  return (
    <section className="grid min-h-svh place-items-center pt-24">
      <Container className="text-center">
        <p className="font-display-tight text-[10rem] leading-none text-accent md:text-[16rem]">404</p>
        <p className="mt-4 text-xl">Page not found.</p>
        <div className="mt-10 flex justify-center gap-2">
          <ArrowButton to="/">Back home</ArrowButton>
          <Link to="/products" className="inline-flex h-12 items-center rounded-full border px-6 text-sm">Products</Link>
        </div>
      </Container>
    </section>
  );
}

// The first page is pre-rendered HTML, so it shows at once; the wipe and fade run on later navigations.
let firstPage = true;

/** Each route fades up out of a soft blur while a verdigris panel wipes past. */
function Page({ children }: { children: React.ReactNode }) {
  const [first] = React.useState(() => firstPage);
  React.useEffect(() => { firstPage = false; }, []);
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[70] origin-bottom bg-accent"
        initial={first ? false : { scaleY: 1 }}
        animate={{ scaleY: 0, transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] } }}
        exit={{ scaleY: 0 }}
        style={{ originY: 0 }}
      />
      <motion.main
        id="main"
        initial={first ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] } }}
        exit={{ opacity: 0, transition: { duration: 0.25 } }}
      >
        <React.Suspense fallback={<div className="min-h-svh" />}>{children}</React.Suspense>
      </motion.main>
    </>
  );
}

export default function App() {
  const location = useLocation();
  const lenis = React.useRef<Lenis | null>(null);

  React.useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const l = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
    lenis.current = l;
    let id = requestAnimationFrame(function raf(t) { l.raf(t); id = requestAnimationFrame(raf); });
    return () => { cancelAnimationFrame(id); l.destroy(); };
  }, []);

  // the pre-rendered page already carries its tags; later navigations swap them
  const seoPath = React.useRef(location.pathname);
  React.useEffect(() => {
    if (seoPath.current !== location.pathname) applySeo(location.pathname);
    seoPath.current = location.pathname;
  }, [location.pathname]);

  return (
    <>
      <a href="#main" className="fixed left-4 top-[-4rem] z-[80] rounded-full bg-accent px-4 py-2 text-background focus:top-4">Skip to content</a>
      <SiteHeader />
      <AnimatePresence
        mode="wait"
        onExitComplete={() => { lenis.current?.scrollTo(0, { immediate: true }); window.scrollTo(0, 0); }}
      >
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Page><Home /></Page>} />
          <Route path="/about" element={<Page><About /></Page>} />
          <Route path="/cortizo-in-india" element={<Page><Cortizo /></Page>} />
          <Route path="/products" element={<Page><Products /></Page>} />
          <Route path="/projects" element={<Page><Projects /></Page>} />
          <Route path="/blog" element={<Page><Blog /></Page>} />
          <Route path="/blog/page/2" element={<Page><Blog page={2} /></Page>} />
          <Route path="/post/:slug" element={<Page><PostRoute /></Page>} />
          <Route path="/blog/:slug" element={<OldPostRoute />} />
          <Route path="/portfolio-collections/our-portfolio" element={<Page><Projects /></Page>} />
          <Route path="/portfolio-collections/our-portfolio/:slug" element={<Page><ProjectRoute /></Page>} />
          {/* duplicates the live site keeps indexed: an older home page and a copy of the Cortizo page */}
          <Route path="/home-1" element={<Page><Home /></Page>} />
          <Route path="/cortizo-in-india-1" element={<Page><Cortizo variant="1" /></Page>} />
          {[...cortizoPages, ...landingPages].map((c) => <Route key={c.slug} path={`/${c.slug}`} element={<Page><ArticlePage slug={c.slug} /></Page>} />)}
          {legal.map((l) => <Route key={l.to} path={l.to} element={<Page><LegalPage slug={l.to.slice(1)} /></Page>} />)}
          <Route path="/contact" element={<Page><Contact /></Page>} />
          <Route path="/:slug" element={<Page><ProductRoute /></Page>} />
          <Route path="*" element={<Page><NotFound /></Page>} />
        </Routes>
      </AnimatePresence>
      <SiteFooter />
    </>
  );
}
