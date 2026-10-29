// Site content for Sumptuous Building Systems.
// All visible wording is taken from the live sumptuousindia.com pages (October 2026);
// partner origins and product photography come from the company deck and brochure.
// Long-form pages and blog articles live in live-pages.json / live-posts.json; per-URL head tags in seo.json.
import {
  ArrowUpFromLine, Bug, Columns3, DoorOpen, Fence, Grid3x3, Landmark,
  Layers, LayoutDashboard, PanelsTopLeft, Sun, TreePine, type LucideIcon,
} from "lucide-react";
import postIndex from "./live-posts-index.json";

export const site = {
  name: "Sumptuous Building Systems",
  tagline: "Delivering The World’s Finest Fenestration Solutions",
  phone: "+91 9844010135",
  phoneRaw: "+919844010135",
  email: "info@sumptuousindia.com",
  city: "Bangalore",
  headOffice: ["#369, 1st Floor, Santhosh Vihar", "Phase I, Jakkur Road,", "Bytarayanapura,", "Bangalore- 560064"],
  social: {
    instagram: "https://www.instagram.com/sumptuousbuildingsystems",
    facebook: "https://www.facebook.com/profile.php?id=100095629957860",
    linkedin: "https://www.linkedin.com/company/142881339/",
  },
};

export const branches = [
  { name: "Hyderabad Branch", lines: ["#45, Jubilee Hills, Telangana 500033"], contact: "Pavan Teegala", phone: "+91 80195 93872" },
  { name: "Punjab Branch", lines: ["Ludhiana: #1891 / 1, Circuit House Road, Maharaj Nagar, Ludhiana, Punjab – 141001"], contact: "Rajeev Sharma", phone: "+91 97801 94473" },
  { name: "International Branches", lines: ["International operations across Oman and Dubai."] },
];

export const dealers = [
  { name: "XL - Team Work", region: "Kerala" },
  { name: "Mega Window", region: "Raipur" },
  { name: "Monolith Window", region: "Pune/Mumbai" },
  { name: "Hi-tech alluminiums", region: "Surat" },
];

export const nav = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Cortizo", to: "/cortizo-in-india" },
  { label: "Products", to: "/products" },
  { label: "Projects", to: "/projects" },
  { label: "Blogs", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

// Live footer links (the FAQ page lives at /accessibility-statement on the live site).
export const legal = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms & Conditions", to: "/terms-and-conditions" },
  { label: "FAQ", to: "/accessibility-statement" },
];

// City landing pages: in the live sitemap and indexed, though not linked from the live menu.
export const landingPages = [
  { slug: "cortizo-bangalore", title: "Cortizo Supplier Bangalore | Luxury Aluminium Window Systems", img: "v-white-villa" },
  { slug: "cortizo-supplier-chennai", title: "Cortizo Dealer Chennai | Premium Aluminium Windows & Doors", img: "u-glass-towers" },
  { slug: "cortizo-suppllier-hyderabad", title: "Cortizo Windows Hyderabad | Premium Aluminium Systems Supplier", img: "v-dark-house" },
];

// Live Cortizo page cards, each with a "View More" link to its own page.
export const cortizoPages = [
  { slug: "cortizo-windows-india", title: "Cortizo Windows India | Premium Aluminium Window Systems", altTitle: "Cortizo Windows IN India Premium Aluminium Window Systems", img: "v-glass-living" },
  { slug: "cortizo-doors-india", title: "Cortizo Doors India | Premium Aluminium Door Systems for Modern Spaces", altTitle: "Cortizo DOORS IN India Premium Aluminium door Systems", img: "v-open-deck" },
  { slug: "cortizo-sliding-systems", title: "Cortizo Sliding Systems for Modern Homes & Offices | Sumptuous", altTitle: "Cortizo Sliding Systems for Modern Homes & Offices | Sumptuous", img: "u-villa-sliding" },
  { slug: "cortizo-minimal-windows", title: "Cortizo Minimal Windows Smart Aluminium Window Systems for Modern Homes", altTitle: "Cortizo Minimal Windows Smart Aluminium Window Systems", img: "v-steel-bedroom" },
];

export const img = (name: string) => `/images/${name}.webp`;

// "Our partner brands include Cortizo, Albert Genau, Joy Windows, Bettio, Tempio, MC Slide, OPK,
// Pronema, Renson, Smartech Door Systems and Wind-Dam" (live home page). Origins from the deck.
export type Partner = { name: string; country?: string; code?: string; url?: string };
export const partners: Partner[] = [
  { name: "Cortizo", country: "Spain", code: "ES", url: "https://www.cortizo.com/" },
  { name: "Albert Genau", country: "Spain", code: "ES", url: "https://en.albertgenau.com/" },
  { name: "Joy Windows", country: "Italy", code: "IT", url: "https://www.joywindows.com/" },
  { name: "Bettio", country: "Italy", code: "IT", url: "https://www.bettio.it/" },
  { name: "Tempio", country: "Spain", code: "ES", url: "https://tempio.es/" },
  { name: "MC Slide", country: "Italy", code: "IT", url: "https://www.mcslide.it" },
  { name: "OPK", url: "https://www.opkeurope.com/en/" },
  { name: "Pronema", country: "Italy", code: "IT", url: "https://www.pronema.it/it/" },
  { name: "Renson", country: "Belgium", code: "BE", url: "https://renson.net/en" },
  { name: "Smartech Door Systems", country: "Australia", code: "AU", url: "https://www.smartechdoorsystems.com.au/" },
  { name: "Wind-Dam" },
];

export type Product = {
  slug: string;
  /** Name as it appears in the live Products menu. */
  name: string;
  /** Opening paragraph of the live product page. */
  intro: string;
  partner: string;
  origin: string;
  icon: LucideIcon;
  /** High-resolution photo for full-width slots (indicative stock until project photography is supplied). */
  hero: string;
  img: string;
  img2: string;
};

export const products: Product[] = [
  { slug: "aluminium-windows-and-doors", name: "Aluminum Door’s ,Windows & Facade", partner: "Cortizo", origin: "Spain", icon: PanelsTopLeft, hero: "v-glass-living", img: "cortizo-villa", img2: "hero-guillotine",
    intro: "Our aluminium doors, windows and facade systems are designed to deliver superior performance, durability and modern aesthetics, making them ideal for premium residential and commercial architectural projects across India." },
  { slug: "solid-wood-doors-and-windows", name: "Solid Wood Door’s & Windows", partner: "Joy Windows", origin: "Italy", icon: TreePine, hero: "v-timber-lodge", img: "wood-warm", img2: "joy-classic-arch",
    intro: "Our solid wood doors and windows are crafted to deliver timeless elegance, durability and natural aesthetics, making them ideal for luxury residential and premium architectural projects across India." },
  { slug: "steel-windows-and-doors-in-india", name: "Steel Windows & Doors", partner: "Joy Windows", origin: "Italy", icon: Grid3x3, hero: "v-steel-bedroom", img: "steel-grade", img2: "partition-mono",
    intro: "Our steel windows and doors are designed to deliver exceptional strength, slim profiles and modern aesthetics, making them ideal for premium residential and commercial architectural projects." },
  { slug: "wood-aluandwood-bronzewindowsanddoorsinindia", name: "Wood Alu/ Wood Bronze -Windows & Doors", partner: "Joy Windows", origin: "Italy", icon: Layers, hero: "v-timber-dusk", img: "bronze-grade", img2: "wood-warm",
    intro: "Our Wood-Alu and Wood-Bronze windows and doors are designed to combine natural wood aesthetics with the strength and durability of metal, making them ideal for luxury residential and high-end architectural projects." },
  { slug: "guillotine-windows-motorized-solutions", name: "Guillotine windows- Motorized Solution’s", partner: "Albert Genau", origin: "Spain", icon: ArrowUpFromLine, hero: "v-open-deck", img: "hero-guillotine", img2: "pronema-terrace",
    intro: "Our motorised guillotine windows are designed for modern architecture, offering seamless vertical movement, panoramic views and premium aesthetics." },
  { slug: "railings-fixed-plungeable-railing", name: "Railing’s – Fixed & Plunge able Railing’", partner: "Wind-Dam", origin: "Europe", icon: Fence, hero: "v-balconies", img: "railing-terrace", img2: "winddam-render",
    intro: "Our fixed and plungeable glass railing systems are designed to offer unobstructed views, safety and modern aesthetics for premium residential and commercial projects." },
  { slug: "mosquito-screens-india", name: "Mosquito Screens- Manual & Motorized", partner: "Bettio · Pronema · Renson", origin: "Italy & Belgium", icon: Bug, hero: "v-bright-bedroom", img: "bettio-dancer", img2: "renson-detail",
    intro: "Our manual and motorized mosquito screens are designed to provide effective insect protection, seamless functionality and modern aesthetics, making them ideal for residential and commercial spaces across India." },
  { slug: "internal-partitions-fixed-framed-frameless", name: "Internal Partition’s", partner: "MC Slide", origin: "Italy", icon: Columns3, hero: "u-glazed-corridor", img: "mcslide-lounge", img2: "partition-mono",
    intro: "Our internal partition systems are designed to create functional, flexible and modern spaces, offering fixed, framed and frameless solutions with sleek aesthetics and durable performance for residential and commercial interiors." },
  { slug: "pergolas-skylights-india", name: "Pergola’s & Skylight’s", partner: "Renson · Pronema", origin: "Belgium & Italy", icon: Sun, hero: "v-pool-villa", img: "pronema-awning", img2: "renson-louvre",
    intro: "Our pergolas and skylight systems are designed to enhance natural light, outdoor comfort and modern aesthetics, making them ideal for premium residential and commercial architectural spaces." },
  { slug: "garage-door-systems-india", name: "Entry Door’s", partner: "Smartech Door Systems", origin: "Australia", icon: DoorOpen, hero: "v-garage-house", img: "smartech-lift", img2: "smartech-garage",
    intro: "Our garage door systems are designed to deliver security, durability and seamless automation, making them ideal for residential and commercial spaces requiring reliable and modern access solutions." },
  { slug: "ventilated-facade-systems-india", name: "Ventilated Façade Systems", partner: "Tempio", origin: "Spain", icon: LayoutDashboard, hero: "v-cladding-windows", img: "tempio-facade", img2: "tempio-green",
    intro: "Our ventilated façade systems are designed to enhance thermal efficiency, weather protection and modern aesthetics, making them ideal for high-performance residential and commercial buildings across India." },
  { slug: "windows-georgian", name: "Georigan Windows", partner: "Joy Windows", origin: "Italy", icon: Landmark, hero: "v-arched-interior", img: "joy-classic-arch", img2: "wood-warm",
    intro: "Heritage aesthetics meet cutting-edge performance. Crafted beautifully in premium Aluminium, Wood, and Steel." },
];

// Projects from the live Projects page; descriptions and locations where the live site gives them.
// Imagery is indicative stock until project photography is supplied.
/** `slug` is the live URL: /portfolio-collections/our-portfolio/<slug>. */
export type Project = { slug: string; name: string; city?: string; text?: string; img: string };
export const projectPath = (p: Project) => `/portfolio-collections/our-portfolio/${p.slug}`;

export const projects: Project[] = [
  { slug: "untitled-project", name: "Fair Field Mansion", img: "v-mansion", text: "A unique blend of Italian craftsmanship, Teak wood, and White Marble brings unparalleled luxury and sophistication to this stunning house." },
  { slug: "magnolia-meadows", name: "Urban Century", img: "v-white-tower", text: "A 20-acre urban oasis, this luxury project brings the jungle to the city, perfectly complemented by Cortizo windows that deliver safety, security, and stunning looks." },
  { slug: "the-scheindorf", name: "BNR Hills Residence", city: "Jubilee Hills, Hyderabad", img: "v-dark-house", text: "Situated in the heart of Jubilee Hills, Hyderabad, this project boasts stunning Italian Steel Windows and Cortizo Spain aluminium systems, blending elegance with innovation." },
  { slug: "urban-rise", name: "Urban Rise", img: "v-dark-cladding" },
  { slug: "bsk-6th-stage", name: "BSK 6th Stage", city: "Bangalore", img: "v-tree-house" },
  { slug: "kaman-residence", name: "Kaman Residence", img: "v-arched-villa" },
  { slug: "veena-raju", name: "Veena Raju", city: "Defence colony Indranagar", img: "v-garden-house" },
  { slug: "shivmoga", name: "Shivmoga", city: "Shivmoga", img: "v-brick-house" },
  { slug: "vijay-nagar-recidence", name: "Vijay Nagar Recidence", img: "v-porch-house" },
];

export const cities = ["Calicut", "Chandigarh", "Chennai", "Delhi", "Hyderabad", "Madurai", "Mangalore", "Mumbai", "Mysore", "Pune", "Raipur", "Trichy"];

// Live home page: "Why Choose Sumptuous India" and "OUR UNIQUE APPROACH"
export const whyChoose = [
  "Trusted partner for global aluminium system brands including Cortizo and more.",
  "Premium quality materials with international standards.",
  "Customised solutions for residential and commercial projects.",
  "Expertise in aluminium windows, doors and facade systems.",
  "End-to-end support from consultation to execution.",
  "Designed for durability, performance and modern aesthetics.",
];
export const uniqueApproach = "What sets us apart is our unique ability to understand your specific needs and carefully curate solutions from our European partners, who are best-in-industry. We blend their expertise with your vision, selecting systems that perfectly balance aesthetics, functionality, and budget, delivering tailored solutions that elevate your spaces with elegance and innovation.";

// Live blog: all 33 posts in the order the blog lists them; the last 13 are on /blog/page/2.
const postImages = ["v-white-villa", "v-cladding-windows", "v-arched-villa", "v-white-tower", "v-open-deck", "v-glass-living", "v-balconies", "v-steel-bedroom",
  "u-villa-white", "v-double-height", "v-bright-bedroom", "v-pool-villa", "u-glass-towers", "v-garage-house", "u-living-glass", "u-house-dusk",
  "v-dark-cladding", "u-living-clerestory", "u-villa-sliding", "u-modern-house"];
export type Post = { slug: string; title: string; excerpt: string; date: string; read: string; img: string; page?: number };
export const posts: Post[] = (postIndex as Omit<Post, "img">[]).map((p, i) => ({ ...p, img: postImages[i % postImages.length] }));

// Live home page testimonials ("Trusted & Appreciated · See What Our Clients Say about Us")
export const testimonials: { q: string[]; who: string; where?: string }[] = [
  { q: ["I had a very positive experience working with Sumptuous Building Systems on the installation of Cortizo windows for my residence. Their technical understanding of the product and execution on-site were both impressive, ensuring that the entire process was handled smoothly and efficiently. The Cortizo windows themselves stand out for their excellent aesthetics, sturdy build quality, and smooth operation. They are particularly well-suited for large window spans, offering a sleek and modern design without compromising on performance. The noise insulation is also a significant advantage, creating a noticeably quieter indoor environment.", "Overall, I would highly recommend both Mr Ranjeet for his professionalism and technical expertise, and Cortizo windows for anyone looking to achieve large panoramic openings with a clean, premium finish."], who: "Subramanya Jayaprakash", where: "basavanagudi, Bangalore" },
  { q: ["I had cortizo windows installed by Sumptuous systems and the team did a wonderful job from product description to site visit and installation His polite professional conduct and timely installation was exceptional. Would definitely recommend him."], who: "Dr Murali GS", where: "Jakkur" },
  { q: ["We are very happy with the quality of products and the professionalism of Sumptuous Building Systems. Their team is responsive, reliable, and pays great attention to detail. The service was smooth and timely, and the overall experience was excellent. Highly recommended"], who: "Sonal Naren", where: "Shivmoga" },
  { q: ["We have installed the windows and movable glass doors from Sumptuous Building Systems at our residence .It has been 3years since installation….and I guess it’s one of the best decisions we have made for our homeThe designs are futuristic and technology incorporated is one of the finest around, functioning of the products are impeccable and absolutely user friendly .After sales servicing is very prompt and efficient .I have recommended it to family and friends and they too have been highly satisfied with the products .Overall would want to say it been a worthwhile investment and a great experience!!!!Wishing Ranjeet and his team all the very best and a great future ahead!!!!"], who: "Veena Keshava Raju", where: "Defence colony Indranagar" },
  { q: ["Sumptuous Building Systems has consistently demonstrated exceptional service quality, responsiveness, and execution. Their team brings strong technical expertise, clear and structured communication, and a high level of professionalism throughout the engagement. What truly distinguishes them is their proactive approach and meticulous attention to detail, ensuring seamless coordination and reliable outcomes. We highly recommend Sumptuous Building Systems for dependable and high-quality glass solutions. Mr Ranjeeth has been an exceptional person on keeping the clients happy throughout."], who: "K.S.Sunil Gupta & K.S.Archana Gupta" },
  { q: ["I am extremely happy with the quality of products and the professionalism of the team. Their services are reliable, timely, and well executed. The team is very responsive and pays great attention to detail. Overall, it has been a wonderful experience, and I would definitely recommend them to others."], who: "Reshma Naveen" },
  { q: ["We had a truly wonderful experience working with Sumptuous Systems on the windows for our newly constructed home. The Cortizo windows provide stunning panoramic views that have quickly become one of the highlights of the house. Ranjeet and his team went above and beyond to deliver a flawless result, making the entire process an absolute pleasure. We would recommend them without a second thought!"], who: "Abhishek E S", where: "JP Nagar Bangalore" },
  { q: ["Sumptuous team provided exceptional workmanship and one of the best customer experiences in Bangalore. The windows and doors were installed seamlessly, on time, and with great attention to detail."], who: "Dr Anand Saint Philomena Hospital", where: "Sahakar Nagar Bangalore" },
  { q: ["Cortizo Systems, installed by Sumptuous Building System’s Bangalore for our Residence @ Indiranagar, which included Door’s/Windows & Terrace Glass room. The work was carried out with great precision and meticulous attention to detail, and the entire project was delivered on time. We are also very pleased with their after-sales service, which has been prompt and reliable."], who: "Ankit Gupta", where: "Indiranagar, Bangalore" },
];
