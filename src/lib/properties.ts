export type PropertyStatus = "rfo" | "pre-selling";

export type Property = {
  id: string;
  name: string;
  location: string;       // City
  area: string;           // District / neighborhood
  type: string;           // Studio · 1BR · 2BR
  startingPrice: number;  // PHP
  priceLabel: string;     // "₱3.8M"
  status: PropertyStatus;
  teaser: string;
  image: string;
  featured?: boolean;
};

// Curated DMCI portfolio (sample data — wire to backend in a later phase)
export const PROPERTIES: Property[] = [
  {
    id: "lumiere-residences",
    name: "Lumiere Residences",
    location: "Pasig",
    area: "Shaw Boulevard",
    type: "Studio · 1BR · 2BR",
    startingPrice: 6_200_000,
    priceLabel: "₱6.2M",
    status: "rfo",
    teaser: "Twin towers on Shaw with EDSA access in seven minutes — a steady-yield rental favorite.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
    featured: true,
  },
  {
    id: "infina-towers",
    name: "Infina Towers",
    location: "Quezon City",
    area: "Aurora Boulevard",
    type: "1BR · 2BR · 3BR",
    startingPrice: 5_400_000,
    priceLabel: "₱5.4M",
    status: "pre-selling",
    teaser: "Three towers minutes from Anonas LRT — a quiet pre-selling window before the Aurora corridor matures.",
    image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1600&q=80",
    featured: true,
  },
  {
    id: "satori-residences",
    name: "Satori Residences",
    location: "Pasig",
    area: "Santolan",
    type: "1BR · 2BR · 3BR",
    startingPrice: 4_800_000,
    priceLabel: "₱4.8M",
    status: "rfo",
    teaser: "A garden-courtyard development walking distance from the Santolan LRT terminus.",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1600&q=80",
    featured: true,
  },
  {
    id: "fortis-residences",
    name: "Fortis Residences",
    location: "Mandaluyong",
    area: "Chino Roces",
    type: "Studio · 1BR · 2BR",
    startingPrice: 7_900_000,
    priceLabel: "₱7.9M",
    status: "pre-selling",
    teaser: "Corner-lot single-tower address bridging Mandaluyong and Makati's diplomatic strip.",
    image: "https://images.unsplash.com/photo-1551038247-3d9af20df552?auto=format&fit=crop&w=1600&q=80",
    featured: true,
  },
  {
    id: "verawood-residences",
    name: "Verawood Residences",
    location: "Taguig",
    area: "Acacia Estates",
    type: "2BR · 3BR",
    startingPrice: 8_400_000,
    priceLabel: "₱8.4M",
    status: "rfo",
    teaser: "Family-scaled units inside Acacia Estates — resort amenities, no through-traffic.",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80",
    featured: true,
  },
  {
    id: "sage-residences",
    name: "Sage Residences",
    location: "Mandaluyong",
    area: "Shaw Boulevard",
    type: "Studio · 1BR · 2BR",
    startingPrice: 11_200_000,
    priceLabel: "₱11.2M",
    status: "pre-selling",
    teaser: "Two-tower flagship at the Mandaluyong–Pasig spine — early-bird allocations close in 2026.",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1600&q=80",
    featured: true,
  },
  {
    id: "kai-garden-residences",
    name: "Kai Garden Residences",
    location: "Mandaluyong",
    area: "Boni Avenue",
    type: "1BR · 2BR",
    startingPrice: 9_300_000,
    priceLabel: "₱9.3M",
    status: "pre-selling",
    teaser: "Japanese-inflected residential gardens, walking distance to Boni MRT.",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "lattice-at-parklinks",
    name: "Lattice at Parklinks",
    location: "Pasig",
    area: "Parklinks",
    type: "1BR · 2BR · 3BR",
    startingPrice: 13_500_000,
    priceLabel: "₱13.5M",
    status: "pre-selling",
    teaser: "Anchor address inside Parklinks — Ortigas East's greenest master-planned district.",
    image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "the-celandine",
    name: "The Celandine",
    location: "Quezon City",
    area: "Roosevelt Avenue",
    type: "1BR · 2BR · 3BR",
    startingPrice: 6_900_000,
    priceLabel: "₱6.9M",
    status: "rfo",
    teaser: "Five towers beside Balintawak MRT — strong yield for OFW landlords renting to North-EDSA workers.",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "prisma-residences",
    name: "Prisma Residences",
    location: "Pasig",
    area: "Bagong Ilog",
    type: "Studio · 1BR · 2BR",
    startingPrice: 5_100_000,
    priceLabel: "₱5.1M",
    status: "rfo",
    teaser: "Riverside towers with direct C5 access — a working-pro favorite for BGC commutes.",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80",
  },
];

export const LOCATION_FILTERS = ["ALL", "PASIG", "QUEZON CITY", "TAGUIG", "MANDALUYONG"] as const;
export type LocationFilter = (typeof LOCATION_FILTERS)[number];

export type Zone = {
  slug: string;
  name: string;
  count: number;
  image: string;
  avgPriceLabel: string;
  rfoCount: number;
  preCount: number;
};

export const ZONES: Zone[] = [
  {
    slug: "pasig",
    name: "Pasig",
    count: 14,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    avgPriceLabel: "₱6.8M avg",
    rfoCount: 8,
    preCount: 6,
  },
  {
    slug: "quezon-city",
    name: "Quezon City",
    count: 11,
    image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80",
    avgPriceLabel: "₱5.9M avg",
    rfoCount: 7,
    preCount: 4,
  },
  {
    slug: "mandaluyong",
    name: "Mandaluyong",
    count: 9,
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1200&q=80",
    avgPriceLabel: "₱9.1M avg",
    rfoCount: 3,
    preCount: 6,
  },
  {
    slug: "taguig",
    name: "Taguig",
    count: 6,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    avgPriceLabel: "₱8.7M avg",
    rfoCount: 4,
    preCount: 2,
  },
  {
    slug: "las-pinas",
    name: "Las Piñas",
    count: 5,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80",
    avgPriceLabel: "₱4.2M avg",
    rfoCount: 4,
    preCount: 1,
  },
  {
    slug: "paranaque",
    name: "Parañaque",
    count: 7,
    image: "https://images.unsplash.com/photo-1551038247-3d9af20df552?auto=format&fit=crop&w=1200&q=80",
    avgPriceLabel: "₱5.4M avg",
    rfoCount: 5,
    preCount: 2,
  },
  {
    slug: "manila",
    name: "Manila",
    count: 4,
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=80",
    avgPriceLabel: "₱4.8M avg",
    rfoCount: 2,
    preCount: 2,
  },
];

export const HERO_SLIDES = [
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2400&q=80",
  "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=2400&q=80",
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=2400&q=80",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=2400&q=80",
];

export const TESTIMONIALS = [
  {
    quote:
      "Jerwin walked me through three developments over WhatsApp video before I ever flew home. Zero pressure, complete honesty about which units would actually fit my family.",
    name: "Maria Santos",
    detail: "OFW Buyer, Dubai · Lumiere Residences, 2BR",
  },
  {
    quote:
      "I'd been ghosted by two other agents. Cityqlo sent me the floor plan, amortization schedule, and turnover photos within the hour — and told me the unit I wanted was a bad investment.",
    name: "Andre Cruz",
    detail: "First-Time Buyer, Pasig · Satori Residences, 1BR",
  },
  {
    quote:
      "We bought from Riyadh with full confidence. Jerwin even attended the turnover on our behalf and sent a 40-minute walkthrough video.",
    name: "Liza & Marc Reyes",
    detail: "OFW Family, Saudi Arabia · Verawood Residences, 3BR",
  },
];

export const GUIDES = [
  {
    eyebrow: "ADVISORY GUIDE",
    title: "The First-Time Condo Buyer's Field Manual",
    blurb: "Reservation fees, DP cadence, turnover checks — what nobody on a sales floor explains.",
  },
  {
    eyebrow: "OFW PLAYBOOK",
    title: "Buying a DMCI Unit Without Flying Home",
    blurb: "SPA, document authentication, and how to vet a unit remotely in 48 hours.",
  },
  {
    eyebrow: "MARKET LENS",
    title: "RFO vs Pre-Selling in 2026 Metro Manila",
    blurb: "When the discount is real, when it's a financing trap, and which districts are mispriced.",
  },
  {
    eyebrow: "FINANCING",
    title: "Amortization, Bank vs Pag-IBIG vs In-House",
    blurb: "A side-by-side ledger across the three financing rails — with the numbers that actually matter.",
  },
];
