// Content for Sumptuous Building Systems.
// Sourced from website.pptx, Brochure.pdf and the live sumptuousindia.com navigation.
// Anything marked PLACEHOLDER needs real client content before launch.
import {
  ArrowUpFromLine, Bug, Columns3, DoorOpen, Fence, Grid3x3, Landmark,
  Layers, LayoutDashboard, PanelsTopLeft, Sun, TreePine, type LucideIcon,
} from "lucide-react";

export const site = {
  name: "Sumptuous Building Systems",
  tagline: "We bring the world's best to you",
  phone: "+91 98440 10135",
  phoneRaw: "+919844010135",
  email: "info@sumptuousindia.com",
  city: "Bengaluru, Karnataka", // PLACEHOLDER: confirm full studio address
  social: {
    instagram: "https://www.instagram.com/sumptuousbuildingsystems",
    facebook: "https://www.facebook.com/profile.php?id=100095629957860",
    linkedin: "https://www.linkedin.com/company/142881339/",
  },
};

export const nav = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Cortizo", to: "/cortizo-in-india" },
  { label: "Products", to: "/products" },
  { label: "Projects", to: "/projects" },
  { label: "Blogs", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export const img = (name: string) => `/images/${name}.webp`;

export type Partner = { name: string; country: string; code: string; url: string; note: string };
export const partners: Partner[] = [
  { name: "Cortizo", country: "Spain", code: "ES", url: "https://www.cortizo.com/", note: "150+ systems · 9 European plants" },
  { name: "Joy Window Systems", country: "Italy", code: "IT", url: "https://www.joywindows.com/", note: "Wood, bronze & steel, made in Italy" },
  { name: "Claudio Zorzi", country: "Italy", code: "IT", url: "https://www.joywindows.com/", note: "Italian artisanal joinery" },
  { name: "Albertgenau", country: "Spain", code: "ES", url: "https://en.albertgenau.com/", note: "Vertiflex guillotine & bioclimatic" },
  { name: "Bettio", country: "Italy", code: "IT", url: "https://www.bettio.it/", note: "Neoscenica® & ANIMA21® screens" },
  { name: "Pronema", country: "Italy", code: "IT", url: "https://www.pronema.it/it/", note: "Screens, blinds, awnings, pergolas" },
  { name: "Renson", country: "Belgium", code: "BE", url: "https://renson.net/en", note: "Ventilation & solar shading" },
  { name: "MC Slide", country: "Italy", code: "IT", url: "https://www.mcslide.it", note: "Sliding glass partitions" },
  { name: "Smartech", country: "Australia", code: "AU", url: "https://www.smartechdoorsystems.com.au/", note: "Vertically moving doors & walls" },
  { name: "Tempio · Mayor", country: "Spain", code: "ES", url: "https://tempio.es/", note: "Ceramic ventilated façades" },
];

export type Product = {
  slug: string; title: string; short: string; partner: string; origin: string; icon: LucideIcon;
  /** High-resolution photo for full-width slots (indicative stock until project photography is supplied). */
  hero: string;
  img: string; img2: string; lede: string; body: string; features: string[]; specs: [string, string][];
};

export const products: Product[] = [
  {
    slug: "aluminium-windows-and-doors", hero: "v-glass-living", title: "Aluminium Doors, Windows & Façade", short: "Aluminium", partner: "Cortizo", origin: "Padrón, Spain", icon: PanelsTopLeft,
    img: "cortizo-villa", img2: "hero-guillotine",
    lede: "Slim European profiles engineered for vast spans of glass, tested in a PfB Rosenheim-certified technology centre.",
    body: "Cortizo is a global leader in the façade and fenestration industry, headquartered in Padrón, Spain. With over 150 systems and 9 manufacturing plants across Europe, Cortizo pairs precise engineering with an unparalleled anodising range of 13 colours and 110 finishes.",
    features: ["Hinged windows & doors", "Lift-and-slide & minimal sliding", "Curtain wall & structural glazing", "Thermal-break profiles", "Sunscreen & handrail systems", "13 colours · 110 finishes"],
    specs: [["Systems", "150+"], ["Plants", "9 in Europe"], ["Finishes", "110"], ["Certification", "PfB Rosenheim"]],
  },
  {
    slug: "solid-wood-doors-and-windows", hero: "v-timber-lodge", title: "Solid Wood Doors & Windows", short: "Solid Wood", partner: "Joy Window Systems & Claudio Zorzi", origin: "Made in Italy", icon: TreePine,
    img: "wood-warm", img2: "joy-classic-arch",
    lede: "Conceived, designed and crafted in Italy, where artisanal joinery meets modern performance.",
    body: "Experience the epitome of Italian design and craftsmanship. Each piece blends timeless tradition with cutting-edge technology, reinventing the classics while embracing modernity: the fusion of heritage and innovation that defines the Made in Italy spirit.",
    features: ["Contemporary, Classic & Minimal lines", "Engineered hardwood sections", "Concealed hardware options", "High-performance glazing units", "Custom profiles & mouldings", "Hand-finished surfaces"],
    specs: [["Origin", "Italy"], ["Lines", "Contemporary · Classic · Minimal"], ["Finish", "Bespoke"], ["Makers", "Joy · Claudio Zorzi"]],
  },
  {
    slug: "steel-windows-and-doors-in-india", hero: "v-steel-bedroom", title: "Steel Windows & Doors", short: "Steel", partner: "Joy Window Systems · Steel Line", origin: "Made in Italy", icon: Grid3x3,
    img: "steel-grade", img2: "partition-mono",
    lede: "The razor-thin sightlines of steel, in stainless and carbon, for interiors and façades with an industrial soul.",
    body: "The Joy Steel Line brings a slenderness only steel can achieve, in stainless steel and carbon steel, to doors, windows and internal screens. Profiles are drawn and finished in Italy for buildings that want a precise, architectural frame.",
    features: ["Stainless steel profiles", "Carbon steel profiles", "Ultra-slim sightlines", "Thermally broken options", "Pivot, hinged & fixed lights", "Internal steel screens"],
    specs: [["Material", "Stainless · Carbon"], ["Origin", "Italy"], ["Use", "Façade & interior"], ["Line", "Joy Steel Line"]],
  },
  {
    slug: "wood-aluandwood-bronzewindowsanddoorsinindia", hero: "v-timber-dusk", title: "Wood-Alu / Wood-Bronze Windows & Doors", short: "Wood-Alu / Bronze", partner: "Joy Window Systems", origin: "Made in Italy", icon: Layers,
    img: "bronze-grade", img2: "wood-warm",
    lede: "Warm timber inside, weatherproof aluminium or living bronze outside: two materials, one window.",
    body: "Wood cladded with aluminium or bronze gives interiors the warmth of solid timber while the exterior shell resists sun, rain and time. Bronze develops a natural patina; aluminium holds a crisp powder-coated or anodised finish.",
    features: ["Wood cladded with aluminium", "Wood cladded with bronze", "Bronze: Contemporary · Classic · Minimal", "Natural patina finishes", "Low-maintenance exteriors", "Italian hardware"],
    specs: [["Inside", "Solid wood"], ["Outside", "Aluminium · Bronze"], ["Origin", "Italy"], ["Lines", "3 design families"]],
  },
  {
    slug: "guillotine-windows-motorized-solutions", hero: "v-open-deck", title: "Guillotine Windows: Motorised Solutions", short: "Guillotine", partner: "Albertgenau · Vertiflex", origin: "Spain", icon: ArrowUpFromLine,
    img: "hero-guillotine", img2: "pronema-terrace",
    lede: "Vertiflex: frameless panels that glide up or down at the click of a remote, opening a room to the horizon.",
    body: "Available with 2, 3 or 4 panels, Vertiflex runs on a sophisticated chain mechanism powered by a Somfy motor or an exclusive Albertgenau motor. Choose models where panels collect at the top or the bottom, with tilting panels for easy and safe cleaning.",
    features: ["2, 3 or 4 frameless panels", "Somfy or Albertgenau motor", "Collect at top or bottom", "Tilting panels for cleaning", "Remote & smart-home control", "Veranda & bioclimatic systems"],
    specs: [["Panels", "2 · 3 · 4"], ["Drive", "Chain + motor"], ["Control", "Remote"], ["System", "Vertiflex"]],
  },
  {
    slug: "railings-fixed-plungeable-railing", hero: "v-balconies", title: "Railings: Fixed & Plungeable", short: "Railings", partner: "Wind-dam", origin: "Europe", icon: Fence,
    img: "railing-terrace", img2: "winddam-render",
    lede: "A retractable glass railing that rises with the wind and disappears for the view, with a single movement.",
    body: "Designed for the safety of children in high-rise apartments and for spaces exposed to wind, sand and noise. The glass height is raised or lowered with a single movement to suit the weather or your preference.",
    features: ["Retractable glass height", "Single-movement operation", "Wind, sand & noise shield", "Child-safe for high-rises", "Fixed frameless options", "Terrace & hospitality use"],
    specs: [["Type", "Fixed · Plungeable"], ["Glass", "Toughened laminated"], ["Use", "Balcony · Terrace"], ["System", "Wind-dam"]],
  },
  {
    slug: "mosquito-screens-india", hero: "v-bright-bedroom", title: "Mosquito Screens: Manual & Motorised", short: "Mosquito Screens", partner: "Bettio · Pronema · Renson", origin: "Italy & Belgium", icon: Bug,
    img: "bettio-dancer", img2: "renson-detail",
    lede: "Screens so refined they read as part of the architecture, effective even against bedbugs.",
    body: "Bettio's Neoscenica® adapts to any installation and integrates ANIMA21®, the patented windproof system. Pronema protects against sun, heat, insects and pollen; Renson combines ventilation, solar shading and screens into one healthy-home package.",
    features: ["Bettio Neoscenica® & ANIMA21®", "Windproof patented guides", "Pronema technical & roller blinds", "Renson ventilation devices", "Manual or motorised", "Doors, windows & glass curtains"],
    specs: [["Brands", "Bettio · Pronema · Renson"], ["Drive", "Manual · Motorised"], ["Origin", "Italy · Belgium"], ["Extras", "Pollen · sun · heat"]],
  },
  {
    slug: "internal-partitions-fixed-framed-frameless", hero: "u-glazed-corridor", title: "Internal Partitions: Fixed, Framed & Frameless", short: "Partitions", partner: "MC Slide", origin: "Italy", icon: Columns3,
    img: "mcslide-lounge", img2: "partition-mono",
    lede: "Sliding glass that divides space without dividing light.",
    body: "MC Slide is synonymous with excellence in sliding glass technology. Its customisable systems combine design, functionality and performance, born from a thorough understanding of materials and ongoing research into comfort, safety and durability.",
    features: ["Fixed glass partitions", "Framed sliding systems", "Frameless sliding glass", "Soft-close & synchro motion", "Acoustic glass options", "Custom finishes"],
    specs: [["Types", "Fixed · Framed · Frameless"], ["Origin", "Italy"], ["Use", "Home · Office · Hospitality"], ["Maker", "MC Slide"]],
  },
  {
    slug: "pergolas-skylights-india", hero: "v-pool-villa", title: "Pergolas & Skylights", short: "Pergolas", partner: "Renson · Pronema · Albertgenau", origin: "Belgium, Italy & Spain", icon: Sun,
    img: "pronema-awning", img2: "renson-louvre",
    lede: "Outdoor rooms with adjustable louvres, awnings and skylights that answer to sun and rain.",
    body: "Renson combines ventilation, solar shading, aluminium cladding and outdoor solutions into one package. Pronema adds awnings and pergolas; Albertgenau brings bioclimatic verandas that turn terraces into year-round retreats.",
    features: ["Bioclimatic louvred roofs", "Retractable awnings", "Skylights & glass roofs", "Integrated lighting & heating", "Rain & wind sensors", "Side screens & glass curtains"],
    specs: [["Brands", "Renson · Pronema · Albertgenau"], ["Roof", "Louvre · Fabric · Glass"], ["Control", "Motorised"], ["Use", "Terrace · Garden"]],
  },
  {
    slug: "garage-door-systems-india", hero: "v-garage-house", title: "Entry Doors & Garage Systems", short: "Entry Doors", partner: "Smartech", origin: "Australia", icon: DoorOpen,
    img: "smartech-lift", img2: "smartech-garage",
    lede: "Vertically moving doors, windows and walls that tilt, fold and lift with ease.",
    body: "Smartech creates tilting, folding and lifting aluminium window, door and wall systems, including façade garage doors. Climate-smart and double-glazing ready, each architecturally designed system is elegant, strong and easy to operate.",
    features: ["Tilting & lifting doors", "Folding window walls", "Façade garage doors", "Double-glazing options", "Climate-smart design", "Residential & commercial"],
    specs: [["Motion", "Tilt · Fold · Lift"], ["Material", "Aluminium"], ["Glazing", "Double-glazed"], ["Maker", "Smartech"]],
  },
  {
    slug: "ventilated-facade-systems-india", hero: "v-cladding-windows", title: "Ventilated Façade Systems", short: "Ventilated Façade", partner: "Tempio · Mayor Cerámica", origin: "Spain", icon: LayoutDashboard,
    img: "tempio-facade", img2: "tempio-green",
    lede: "Design ceramics for the building envelope: a breathing skin that protects, insulates and expresses.",
    body: "Mayor Cerámica is a leading producer of design ceramic materials for outdoor building solutions, including ventilated façades. Its varied portfolio anticipates and satisfies the requirements of architects, in design, quality and safety.",
    features: ["Ceramic façade panels", "Ventilated air cavity", "Concealed fixing systems", "Large-format & extruded pieces", "Glazed & textured colours", "Fire & weather resistant"],
    specs: [["Material", "Ceramic"], ["System", "Tempio"], ["Origin", "Spain"], ["Maker", "Mayor Cerámica"]],
  },
  {
    slug: "windows-georgian", hero: "v-arched-interior", title: "Georgian Windows", short: "Georgian", partner: "Joy Window Systems", origin: "Made in Italy", icon: Landmark,
    img: "joy-classic-arch", img2: "wood-warm",
    lede: "Classical proportions, glazing bars and arched heads, re-engineered for modern performance.",
    body: "Georgian windows bring the rhythm of divided lights and arched openings to heritage homes and new classical architecture, crafted in wood, bronze or steel with today's glazing, seals and hardware.",
    features: ["Divided-light glazing bars", "Arched & radius heads", "Wood, bronze or steel", "Heritage mouldings", "Modern sealed units", "Classic Italian hardware"],
    specs: [["Style", "Georgian · Classical"], ["Material", "Wood · Bronze · Steel"], ["Origin", "Italy"], ["Heads", "Square · Arched"]],
  },
];

// PLACEHOLDER imagery: product photography stands in until project photos are supplied
export const projects = [
  { name: "BNR Hills Residence", type: "Residence", city: "Bengaluru", img: "v-dark-house", products: "Aluminium · Sliding" },
  { name: "Urban Century", type: "Multi-residential", city: "Bengaluru", img: "v-white-tower", products: "Aluminium façade" },
  { name: "Fair Field Mansion", type: "Residence", city: "Bengaluru", img: "v-mansion", products: "Georgian · Wood" },
  { name: "Urban Rise", type: "Multi-residential", city: "Bengaluru", img: "v-dark-cladding", products: "Ventilated façade" },
  { name: "BSK 6th Stage", type: "Residence", city: "Bengaluru", img: "v-tree-house", products: "Slimline aluminium" },
  { name: "Kaman Residence", type: "Residence", city: "Bengaluru", img: "v-arched-villa", products: "Screens · Pergola" },
  { name: "Veena Raju", type: "Residence", city: "Bengaluru", img: "v-garden-house", products: "Partitions" },
  { name: "Shivmoga", type: "Residence", city: "Shivamogga", img: "v-brick-house", products: "Entry systems" },
  { name: "Vijay Nagar Residence", type: "Residence", city: "Mysuru", img: "v-porch-house", products: "Railings" },
];

export const cities = ["Bengaluru", "Calicut", "Chandigarh", "Chennai", "Delhi", "Hyderabad", "Madurai", "Mangalore", "Mumbai", "Mysore", "Pune", "Raipur", "Trichy"];

export type Post = { slug: string; title: string; date: string; read: number; cat: string; excerpt: string; img: string };
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
export const posts: Post[] = ([
  ["Benefits of Thermal Break Aluminium Systems in India", "Jun 19", 5, "Performance", "How a polyamide barrier inside the frame improves insulation, comfort and durability in the Indian climate.", "v-white-villa"],
  ["Cortizo vs Traditional Aluminium Systems: Which Is Better for Modern Buildings?", "Jun 18", 4, "Cortizo", "European engineered systems compared with conventional aluminium frames on strength, sealing and finish.", "v-cladding-windows"],
  ["Why Cortizo is the Best Aluminium System for Luxury Villas in India", "Jun 17", 4, "Cortizo", "Premium systems for homes that value looks, efficiency and longevity.", "v-arched-villa"],
  ["Cortizo Aluminium Systems for Commercial Buildings and Offices", "Jun 17", 4, "Commercial", "Curtain walls and façades for office towers, campuses and retail.", "v-white-tower"],
  ["Advantages of Slimline Aluminium Sliding Doors in Modern Architecture", "Jun 17", 5, "Design", "Slim profiles that flood interiors with light and dissolve the line between in and out.", "v-open-deck"],
  ["How Cortizo Aluminium Windows Improve Energy Efficiency", "Jun 12", 4, "Performance", "Insulation, sealing and glazing choices that lower cooling bills.", "v-glass-living"],
  ["What Kinds of Aluminium Doors and Windows Come Under Cortizo?", "Jun 12", 5, "Cortizo", "A tour of the Cortizo range, from hinged and sliding to handrails and sunscreens.", "v-balconies"],
  ["Black Aluminium Windows: A Stylish and Smart Choice for Modern Spaces", "Jun 10", 4, "Design", "Why black frames have become the architect's favourite.", "v-steel-bedroom"],
  ["Why Double Glazed Windows Are Becoming Essential for Modern Homes", "Jun 9", 4, "Performance", "Comfort, efficiency and quiet: what double glazing really delivers.", "v-bright-bedroom"],
  ["Top 5 Cortizo Window Systems for Luxury Villas in India", "Jun 9", 5, "Cortizo", "Ventilation, light and security: five systems worth specifying.", "v-pool-villa"],
  ["Where to Buy Cortizo Windows in India: A Complete Buyer's Guide", "Jun 4", 5, "Guides", "What to look for in an authorised, experienced supplier.", "v-garage-house"],
  ["How to Maintain Cortizo Aluminium Windows in India", "Jun 4", 4, "Guides", "Simple care routines that keep finishes and hardware performing for decades.", "v-double-height"],
] as const).map(([title, date, read, cat, excerpt, img]) => ({ slug: slugify(title), title, date, read, cat, excerpt, img }));

// PLACEHOLDER: replace with real, attributed client quotes before launch
export const testimonials = [
  { q: "The glass simply disappears. Every room now opens to the garden, and the system has run flawlessly through two monsoons.", who: "Homeowner", where: "Private residence, Bengaluru" },
  { q: "Specification support was meticulous: profiles, finishes and hardware resolved before a single opening was cut.", who: "Principal architect", where: "Architectural practice" },
  { q: "Their team understands European systems and Indian sites. That combination is rare.", who: "Project director", where: "Residential developer" },
  { q: "From the first drawing to handover, one accountable team. The Vertiflex windows are the talk of every dinner.", who: "Homeowner", where: "Villa, Mysuru" },
  { q: "Finish quality on the anodised profiles is exactly what we saw in the sample room in Spain.", who: "Interior designer", where: "Design studio, Mumbai" },
];
