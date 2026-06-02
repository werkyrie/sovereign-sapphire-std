import { useEffect, useState } from "react";
import {
  PROPERTIES,
  LOCATION_FILTERS,
  type LocationFilter,
  type Property,
} from "@/lib/properties";

type Mode = "featured" | "catalog";

function waLink(p: Property) {
  const msg = `Hi Jerwin, I'm interested in ${p.name} in ${p.location}. Please send available units and pricing.`;
  return `https://wa.me/639170000000?text=${encodeURIComponent(msg)}`;
}

export function Properties() {
  const [mode, setMode] = useState<Mode>("featured");
  const [filter, setFilter] = useState<LocationFilter>("ALL");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Catalog toggle from header / locations panel
  useEffect(() => {
    const onToggle = (e: Event) => {
      const detail = (e as CustomEvent).detail as string;
      if (detail === "featured") setMode("featured");
      else if (detail === "catalog") setMode("catalog");
    };
    const onLoc = (e: Event) => {
      const v = (e as CustomEvent).detail as string;
      const upper = v.toUpperCase();
      if ((LOCATION_FILTERS as readonly string[]).includes(upper)) {
        setFilter(upper as LocationFilter);
        setMode("featured");
      }
    };
    window.addEventListener("cityqlo:catalog-toggle", onToggle);
    window.addEventListener("cityqlo:filter-location", onLoc);
    return () => {
      window.removeEventListener("cityqlo:catalog-toggle", onToggle);
      window.removeEventListener("cityqlo:filter-location", onLoc);
    };
  }, []);

  // Skeleton on first render
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const byFilter = (p: Property) =>
    filter === "ALL" || p.location.toUpperCase() === filter;

  const featured = PROPERTIES.filter((p) => p.featured).filter(byFilter).slice(0, 6);

  const catalog = PROPERTIES.filter(byFilter).filter((p) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.area.toLowerCase().includes(q)
    );
  });

  return (
    <section
      id="properties"
      data-header-theme="light"
      className="bg-[color:var(--pearl)]"
      style={{ paddingTop: 120, paddingBottom: 120 }}
    >
      <div className="mx-auto max-w-[1280px] px-5 md:px-[5%]">
        {/* Section controls */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 border-b border-[color:var(--linen)] pb-6">
          <div id="featured-portfolio" className="flex gap-8" role="tablist">
            <button
              onClick={() => setMode("featured")}
              role="tab"
              aria-selected={mode === "featured"}
              className="font-sans uppercase pb-3"
              style={{
                fontSize: 12,
                letterSpacing: "0.2em",
                fontWeight: 400,
                color: mode === "featured" ? "var(--accent-gold)" : "var(--silver)",
                borderBottom: mode === "featured" ? "1px solid var(--accent-gold)" : "1px solid transparent",
              }}
            >
              [ Featured Portfolio ]
            </button>
            <button
              id="complete-catalog"
              onClick={() => setMode("catalog")}
              role="tab"
              aria-selected={mode === "catalog"}
              className="font-sans uppercase pb-3"
              style={{
                fontSize: 12,
                letterSpacing: "0.2em",
                fontWeight: 400,
                color: mode === "catalog" ? "var(--accent-gold)" : "var(--silver)",
                borderBottom: mode === "catalog" ? "1px solid var(--accent-gold)" : "1px solid transparent",
              }}
            >
              [ Complete Catalog ]
            </button>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {LOCATION_FILTERS.map((loc, i) => (
              <button
                key={loc}
                onClick={() => setFilter(loc)}
                className="font-sans uppercase transition-colors"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.22em",
                  color: filter === loc ? "var(--accent-gold)" : "var(--ash)",
                }}
              >
                {loc}{i < LOCATION_FILTERS.length - 1 && <span className="ml-5 text-[color:var(--linen)]">·</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Mode 1 — Featured */}
        {mode === "featured" && (
          <div className="mt-16 space-y-24">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <PropertySkeleton key={i} reverse={i % 2 === 1} />)
              : featured.length === 0
              ? <EmptyState onClear={() => setFilter("ALL")} />
              : featured.map((p, i) => <PropertyCard key={p.id} property={p} index={i + 1} reverse={i % 2 === 1} />)}
          </div>
        )}

        {/* Mode 2 — Catalog */}
        {mode === "catalog" && (
          <div className="mt-12">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search developments, locations…"
              className="catalog-search w-full md:w-2/3 lg:w-1/2"
            />

            <div className="mt-10 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--linen)" }}>
                    {["Development", "Location", "Type", "Est. Starting", "Status", "Action"].map((h) => (
                      <th
                        key={h}
                        className="font-sans uppercase py-4 pr-6"
                        style={{ fontSize: 10, letterSpacing: "0.22em", color: "var(--ash)", fontWeight: 400 }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {catalog.length === 0 ? (
                    <tr>
                      <td colSpan={6}>
                        <EmptyState onClear={() => { setFilter("ALL"); setSearch(""); }} />
                      </td>
                    </tr>
                  ) : (
                    catalog.map((p) => (
                      <tr key={p.id} className="align-middle transition-colors hover:bg-[color:var(--bone)]" style={{ borderBottom: "1px solid var(--linen)" }}>
                        <td className="py-5 pr-6">
                          <a href={`#/property-detail/${p.id}`} className="font-display" style={{ fontWeight: 600, fontSize: 18, color: "var(--ink-text)" }}>
                            {p.name}
                          </a>
                        </td>
                        <td className="py-5 pr-6 font-sans" style={{ fontSize: 13, color: "var(--ash)" }}>{p.location} · {p.area}</td>
                        <td className="py-5 pr-6 font-sans" style={{ fontSize: 13, color: "var(--ash)" }}>{p.type}</td>
                        <td className="py-5 pr-6 font-display" style={{ fontWeight: 600, fontSize: 18, color: "var(--ink-text)" }}>{p.priceLabel}</td>
                        <td className="py-5 pr-6">
                          <span className={p.status === "rfo" ? "badge-rfo" : "badge-preselling"}>
                            {p.status === "rfo" ? "RFO" : "Pre-Selling"}
                          </span>
                        </td>
                        <td className="py-5 pr-6">
                          <a href={waLink(p)} target="_blank" rel="noopener noreferrer" className="text-link" style={{ color: "var(--logo-blue)" }}>
                            Inquire →
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Prestige Sourcing Banner */}
            <div
              className="mt-16 text-center"
              style={{
                background: "var(--obsidian)",
                border: "1px solid var(--accent-gold)",
                padding: "48px 40px",
                color: "var(--white)",
              }}
            >
              <span className="eyebrow" style={{ color: "var(--accent-gold)", letterSpacing: "0.3em" }}>Prestige Sourcing</span>
              <h3 className="mt-4 font-display italic" style={{ fontWeight: 300, fontSize: "clamp(24px, 3vw, 36px)", color: "var(--white)" }}>
                Looking for a development not listed?
              </h3>
              <p className="mt-4 font-sans mx-auto" style={{ fontSize: 14, color: "rgba(250,250,249,0.7)", maxWidth: 540, lineHeight: 1.85 }}>
                Cityqlo carries the full DMCI registry, including pre-launch and resale units that never reach a brochure. Tell us what you want — we'll source it.
              </p>
              <a
                href="https://wa.me/639170000000?text=Hi%20Jerwin%2C%20I%27m%20sourcing%20a%20specific%20DMCI%20development.%20Can%20we%20talk%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-header-ghost mt-8"
              >
                Request Sourcing →
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function PropertyCard({ property, index, reverse }: { property: Property; index: number; reverse: boolean }) {
  return (
    <article className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center v3-reveal ${reverse ? "md:[direction:rtl]" : ""}`}>
      <a
        href={`#/property-detail/${property.id}`}
        className="block relative overflow-hidden group"
        style={{ aspectRatio: "3/2", direction: "ltr" }}
      >
        <img
          src={property.image}
          alt={property.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform"
          style={{ transitionDuration: "800ms", transitionTimingFunction: "var(--ease-luxury)" }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
        <span
          className="absolute bottom-3 left-5 font-display pointer-events-none"
          style={{ fontWeight: 200, fontSize: "clamp(80px, 10vw, 140px)", color: "rgba(250,250,249,0.10)", lineHeight: 1 }}
        >
          {String(index).padStart(2, "0")}
        </span>
      </a>

      <div className="md:py-10" style={{ direction: "ltr" }}>
        <span className={property.status === "rfo" ? "badge-rfo" : "badge-preselling"}>
          {property.status === "rfo" ? "RFO" : "Pre-Selling"}
        </span>
        <h3 className="mt-5 font-display" style={{ fontWeight: 600, fontSize: "clamp(28px, 3.6vw, 42px)", color: "var(--ink-text)", lineHeight: 1.1 }}>
          {property.name}
        </h3>
        <div className="mt-2 font-sans" style={{ fontSize: 13, color: "var(--ash)" }}>
          {property.location} · {property.area} <span style={{ color: "var(--accent-gold)" }}>↗</span>
        </div>
        <div className="mt-6 font-display" style={{ fontWeight: 300, fontSize: "clamp(26px, 3vw, 34px)", color: "var(--ink-text)" }}>
          From {property.priceLabel}
        </div>
        <p className="mt-4 font-sans" style={{ fontWeight: 300, fontSize: 15, lineHeight: 1.85, color: "var(--ash)" }}>
          {property.teaser}
        </p>
        <a
          href={`#/property-detail/${property.id}`}
          className="text-link mt-6 inline-flex"
          style={{ color: "var(--logo-blue)" }}
        >
          View Full Details →
        </a>
      </div>
    </article>
  );
}

function PropertySkeleton({ reverse }: { reverse: boolean }) {
  return (
    <div className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${reverse ? "md:[direction:rtl]" : ""}`}>
      <div className="shimmer" style={{ aspectRatio: "3/2", direction: "ltr" }} />
      <div className="space-y-4" style={{ direction: "ltr" }}>
        <div className="shimmer" style={{ height: 16, width: 100 }} />
        <div className="shimmer" style={{ height: 36, width: "70%" }} />
        <div className="shimmer" style={{ height: 12, width: "40%" }} />
        <div className="shimmer" style={{ height: 28, width: "30%", marginTop: 18 }} />
        <div className="shimmer" style={{ height: 12, width: "90%" }} />
        <div className="shimmer" style={{ height: 12, width: "85%" }} />
      </div>
    </div>
  );
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="text-center py-20">
      <p className="font-display italic" style={{ fontSize: 22, color: "var(--ink-text)" }}>
        No developments match your current filters.
      </p>
      <p className="mt-3 font-sans uppercase" style={{ fontSize: 10, letterSpacing: "0.25em", color: "var(--ash)" }}>
        Try adjusting your search or location filter
      </p>
      <div className="mx-auto mt-6" style={{ width: 120, height: 1, background: "var(--accent-gold)" }} />
      <button onClick={onClear} className="text-link mt-6" style={{ color: "var(--logo-blue)" }}>
        Browse all properties →
      </button>
    </div>
  );
}
