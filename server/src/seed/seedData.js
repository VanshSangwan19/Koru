export const services = [
  {
    title: "Business Websites",
    description:
      "Professional websites for local businesses and companies that build trust and win customers.",
    icon: "Building2",
    featured: true,
    sortOrder: 1,
  },
  {
    title: "Landing Pages",
    description:
      "High-converting landing pages for products, services and campaigns with clear calls to action.",
    icon: "Target",
    featured: true,
    sortOrder: 2,
  },
  {
    title: "Portfolio Websites",
    description:
      "Personal brands, creators, freelancers and professionals who need to showcase their work.",
    icon: "Palette",
    featured: true,
    sortOrder: 3,
  },
  {
    title: "E-commerce Websites",
    description:
      "Modern online stores with product management and checkout-ready architecture.",
    icon: "ShoppingBag",
    featured: false,
    sortOrder: 4,
  },
  {
    title: "Website Redesign",
    description:
      "Transform outdated websites into modern, responsive experiences that perform.",
    icon: "RefreshCcw",
    featured: false,
    sortOrder: 5,
  },
  {
    title: "Custom Web Apps",
    description:
      "Interactive web applications built around specific business requirements.",
    icon: "Code2",
    featured: false,
    sortOrder: 6,
  },
];

export const projects = [
  {
    title: "Kora",
    slug: "kora",
    category: "Restaurant Website",
    description:
      "A warm, appetite-driven website for a modern restaurant with online reservations.",
    longDescription:
      "Kora is a modern restaurant concept that wanted an online presence as considered as its menu. The site needed to feel inviting, load quickly even on slow connections, and make reservations effortless from any device.",
    problem:
      "The restaurant relied on a single social media page. Menus were delivered as PDFs, reservations happened over phone, and the brand had no real web presence.",
    solution:
      "I designed a focused one-page experience with a photography-first layout, a structured menu section, and a smooth reservation flow. Every section is built for mobile-first browsing since that is how most guests arrive.",
    features: [
      "Menu with categories and descriptions",
      "Online reservation form",
      "Location and hours section",
      "Photo gallery",
      "Google Maps integration",
    ],
    technologies: ["React", "Tailwind CSS", "Vite", "Node.js"],
    image: "",
    gallery: [],
    designDecisions: [
      "Warm, earthy palette to reflect the cuisine",
      "Large editorial imagery with generous whitespace",
      "One clear primary action: reserve a table",
    ],
    results: [
      "Reservations moved from phone calls to the site",
      "Menu updates no longer require re-printing PDFs",
    ],
    concept: true,
    featured: true,
    status: "published",
  },
  {
    title: "NovaFit",
    slug: "novafit",
    category: "Fitness Brand",
    description:
      "A high-energy brand site for a fitness studio with class scheduling.",
    longDescription:
      "NovaFit is a fitness studio that needed more than a page — it needed a site that matched the energy of its training floor. Bold typography, motion and clear class information work together to convert visitors into members.",
    problem:
      "The studio's old site was slow, static, and impossible to update. Members couldn't see the schedule or understand what each class involved.",
    solution:
      "I built a bold, high-contrast site with a class catalog, trainer profiles and a simple schedule. Performance was prioritised so the site stays fast on mobile data.",
    features: [
      "Class catalog with difficulty levels",
      "Trainer profiles",
      "Weekly schedule",
      "Membership pricing section",
      "Fast-loading image handling",
    ],
    technologies: ["React", "Tailwind CSS", "Vite", "MongoDB"],
    image: "",
    gallery: [],
    designDecisions: [
      "Dark theme with a single energetic accent color",
      "Strong, condensed headings for impact",
      "Mobile-first layout for on-the-go visitors",
    ],
    results: [
      "Class schedule is now always up to date",
      "Clear path from visitor to membership inquiry",
    ],
    concept: true,
    featured: true,
    status: "published",
  },
  {
    title: "Velora",
    slug: "velora",
    category: "Fashion Store",
    description:
      "A minimal e-commerce experience for a clothing brand with a clean catalog.",
    longDescription:
      "Velora is a clothing brand concept that needed an online store as refined as its products. The site focuses on large product imagery, a distraction-free shopping flow and a smooth checkout path.",
    problem:
      "The brand sold through marketplaces where it had no control over presentation. It needed its own storefront that looked premium and felt effortless.",
    solution:
      "I created a minimal storefront with a structured product catalog, product detail pages and a cart flow designed around a small product range. The architecture is ready to connect to a real payment provider.",
    features: [
      "Product catalog with categories",
      "Product detail pages",
      "Shopping cart",
      "Checkout-ready architecture",
      "Responsive image loading",
    ],
    technologies: ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB"],
    image: "",
    gallery: [],
    designDecisions: [
      "Neutral palette that lets products stand out",
      "Generous spacing for a premium feel",
      "Fewer products, better presentation",
    ],
    results: [
      "A storefront the brand fully controls",
      "Consistent presentation across all devices",
    ],
    concept: true,
    featured: true,
    status: "published",
  },
  {
    title: "Lumio",
    slug: "lumio",
    category: "SaaS Landing Page",
    description:
      "A conversion-focused landing page for a productivity software product.",
    longDescription:
      "Lumio is a SaaS product concept that needed a landing page that explains a complex product simply and drives sign-ups. The page guides visitors from problem to solution with clear messaging at every step.",
    problem:
      "The product was powerful but hard to explain. Early visitors didn't understand what it did within the first screen, and sign-ups were low.",
    solution:
      "I structured the page around the customer's problem first, then the solution. Feature sections, social proof placement and a strong final CTA create a clear conversion path.",
    features: [
      "Benefit-first hero messaging",
      "Feature showcase sections",
      "Pricing section",
      "FAQ",
      "Prominent sign-up CTA",
    ],
    technologies: ["React", "Tailwind CSS", "Vite"],
    image: "",
    gallery: [],
    designDecisions: [
      "Clean typography for a product that feels technical but approachable",
      "Subtle accent used only for the primary CTA",
      "Long-form scroll designed for conversion, not decoration",
    ],
    results: [
      "The product is explained within the first viewport",
      "Clear, single conversion path to sign-up",
    ],
    concept: true,
    featured: false,
    status: "published",
  },
  {
    title: "UrbanNest",
    slug: "urbannest",
    category: "Real Estate Website",
    description:
      "A polished property platform concept with listing pages and search.",
    longDescription:
      "UrbanNest is a real estate brand concept that needed a platform feel — not just a brochure. The site presents properties with high-quality visuals and makes browsing and inquiry straightforward.",
    problem:
      "Listings were scattered across portals and the brand had no way to present properties in a premium, controlled way.",
    solution:
      "I designed a listing-focused site with property cards, detail pages and an inquiry flow. The layout emphasises imagery and key details while keeping navigation simple.",
    features: [
      "Property listing grid",
      "Property detail pages",
      "Search and filter UI",
      "Inquiry form",
      "Agent/about section",
    ],
    technologies: ["React", "Tailwind CSS", "Node.js", "MongoDB"],
    image: "",
    gallery: [],
    designDecisions: [
      "Clean white space around large property imagery",
      "Consistent card design for easy scanning",
      "Restrained accent to keep focus on the listings",
    ],
    results: [
      "Properties can be presented on-brand",
      "Simpler inquiry path for potential buyers",
    ],
    concept: true,
    featured: false,
    status: "published",
  },
  {
    title: "Arvo",
    slug: "arvo",
    category: "Personal Portfolio",
    description:
      "A focused portfolio site for a designer that lets the work lead.",
    longDescription:
      "Arvo is a personal portfolio concept for a designer who wanted the work to do the talking. The site is intentionally minimal — a clear introduction, a strong body of work, and nothing that distracts from it.",
    problem:
      "The designer's portfolio lived on a template with heavy animations that slowed the site and hid the actual work.",
    solution:
      "I built a fast, typography-led portfolio with a clean project grid and simple case study pages. Every element serves the work.",
    features: [
      "Minimal hero and about",
      "Project grid",
      "Simple case study pages",
      "Contact link",
      "Fast static-style performance",
    ],
    technologies: ["React", "Tailwind CSS", "Vite"],
    image: "",
    gallery: [],
    designDecisions: [
      "Type-led design with a strict grid",
      "No decorative elements that compete with the work",
      "Performance-first approach with minimal JavaScript",
    ],
    results: [
      "The work is the first thing visitors see",
      "Fast load even on modest connections",
    ],
    concept: true,
    featured: false,
    status: "published",
  },
];
