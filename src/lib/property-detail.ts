import { PROPERTIES, type Property } from "@/lib/properties";

export type Amenity = { label: string; icon: string };

export type UnitPlan = {
  type: string;            // "Studio" | "1BR" | "2BR" | "3BR"
  sizeRange: string;       // "28–35 sqm"
  pdfUrl?: string;         // only render download if present
  planImage?: string;      // floor plan image url
};

export type PropertyDetail = {
  unitConfigurations: string;
  sizeRange: string;
  dpTerms: string;
  resortIndex: number;     // 0-5
  photos: string[];
  videoUrl?: string;
  walkthrough360Url?: string;
  units: UnitPlan[];
  amenities: Amenity[];
};

// Lucide-style stroke SVG names — rendered inline by the viewer
const AMENITY_CORE: Amenity[] = [
  { label: "Resort-Style Pool", icon: "waves" },
  { label: "Fitness Center", icon: "dumbbell" },
  { label: "Function Hall", icon: "users" },
  { label: "Children's Playground", icon: "smile" },
  { label: "24/7 Security", icon: "shield" },
  { label: "Landscaped Gardens", icon: "trees" },
  { label: "Covered Parking", icon: "car" },
  { label: "Backup Generator", icon: "zap" },
  { label: "Concierge Lobby", icon: "concierge" },
];

const PHOTOS_BASE = [
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1800&q=80",
];

const BLUEPRINT = "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80";

function detailsFor(p: Property): PropertyDetail {
  const isLumiere = p.id === "lumiere-residences";
  return {
    unitConfigurations: p.type,
    sizeRange: "28–84 sqm",
    dpTerms: p.status === "pre-selling" ? "0% Pre-selling" : "Spot DP / Bank",
    resortIndex: 4.8,
    photos: [p.image, ...PHOTOS_BASE],
    videoUrl: isLumiere ? undefined : undefined, // placeholder shown for all
    walkthrough360Url: undefined,
    units: parseUnits(p.type).map((u, i) => ({
      type: u,
      sizeRange: ["28–32 sqm", "34–42 sqm", "52–68 sqm", "72–84 sqm"][i] ?? "—",
      planImage: BLUEPRINT,
      pdfUrl: isLumiere ? "https://example.com/lumiere-floorplan.pdf" : undefined,
    })),
    amenities: AMENITY_CORE,
  };
}

function parseUnits(typeStr: string): string[] {
  return typeStr.split(/[·,]/).map((s) => s.trim()).filter(Boolean);
}

export function getProperty(id: string): { property: Property; detail: PropertyDetail } | null {
  const p = PROPERTIES.find((x) => x.id === id);
  if (!p) return null;
  return { property: p, detail: detailsFor(p) };
}
