import { PROPERTIES, ZONES } from "@/lib/properties";

const COPY: Record<string, { headline: string; overview: string }> = {
  pasig: {
    headline: "Pasig — The Quietly Compounding Address",
    overview:
      "Pasig has become Metro Manila's most underwritten condo play. The Ortigas-East spine, the maturing Kapitolyo restaurant district, and the C-5 commute window into BGC give it a structural rental floor most buyers don't recognise yet.",
  },
  "quezon-city": {
    headline: "Quezon City — Yield Belt of the North",
    overview:
      "QC's MRT/LRT redundancy and a deep employer base (call centres, hospitals, government) underwrite the strongest occupancy in the region. The price-to-rent ratio here remains the friendliest in NCR for first-time landlords.",
  },
  mandaluyong: {
    headline: "Mandaluyong — The Bridge Premium",
    overview:
      "Sitting between Ortigas and Makati, Mandaluyong consistently transacts at a pre-selling premium that holds at turnover. Limited supply and a tight commercial corridor keep absorption fast.",
  },
  taguig: {
    headline: "Taguig — The BGC Halo Effect",
    overview:
      "Acacia Estates, McKinley, and the new south BGC extension benefit from the highest-paying tenant pool in the country. Yield is lower than QC, but appreciation has been the most consistent in the past decade.",
  },
  "las-pinas": { headline: "Las Piñas — Family-Scaled Value", overview: "Affordable entry-level units with strong school catchments." },
  paranaque: { headline: "Parañaque — Aerotropolis Adjacent", overview: "NAIA-side demand from aviation, BPO, and PEZA workers." },
  manila: { headline: "Manila — The University Belt Play", overview: "Compact studios with structural rental demand from medicine and law students." },
};

export function LocationDetail({ slug }: { slug: string }) {
  const zone = ZONES.find((z) => z.slug === slug);
  const copy = COPY[slug] ?? { headline: "Metro Manila Location", overview: "A curated DMCI corridor." };
  const list = zone ? PROPERTIES.filter((p) => p.location.toLowerCase().replace(/\s+/g, "-") === slug) : [];

  if (!zone) {
    return (
      <div className="flex items-center justify-center" style={{ minHeight: "60vh" }} data-header-theme="light">
        <div className="state-error">
          That location isn't in our active registry yet.
          <span className="state-error-label">Cityqlo · locations</span>
          <div className="mt-8 text-center"><a href="#/" className="btn-primary">Browse Locations</a></div>
        </div>
      </div>
    );
  }

  return (
    <div data-header-theme="light" className="bg-[color:var(--pearl)]">
      {/* Hero */}
      <section data-header-theme="dark" className="relative w-full" style={{ height: "55vh", minHeight: 420 }}>
        <img src={zone.image} alt={zone.name} className="absolute inset-0 w-full h-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(26,28,30,0.1), rgba(26,28,30,0.7))" }} />
        <div className="absolute bottom-10 left-5 md:left-[5%] right-5">
          <p className="font-sans uppercase" style={{ fontSize: 10, letterSpacing: "0.3em", color: "rgba(212,160,23,0.85)" }}>CITYQLO LOCATIONS</p>
          <h1 className="mt-3 font-display italic" style={{ fontWeight: 600, fontSize: "clamp(48px, 8vw, 96px)", color: "var(--white)", lineHeight: 1 }}>
            {zone.name}
          </h1>
        </div>
      </section>

      {/* Overview */}
      <section style={{ padding: "96px 5%" }}>
        <div className="mx-auto max-w-[920px]">
          <h2 className="font-display" style={{ fontWeight: 400, fontSize: "clamp(28px, 4vw, 44px)", color: "var(--ink-text)", lineHeight: 1.25 }}>
            {copy.headline}
          </h2>
          <p className="mt-6 font-sans" style={{ fontSize: 16, color: "var(--ink-text)", lineHeight: 1.8 }}>{copy.overview}</p>

          <div className="mt-10 grid grid-cols-3" style={{ gap: 0, borderTop: "1px solid var(--linen)", borderBottom: "1px solid var(--linen)" }}>
            {[
              { v: zone.count, l: "Active Developments" },
              { v: zone.avgPriceLabel, l: "Median Entry" },
              { v: `${zone.rfoCount} · ${zone.preCount}`, l: "RFO · Pre-Selling" },
            ].map((s, i) => (
              <div key={s.l} style={{ padding: "24px 16px", borderLeft: i === 0 ? undefined : "1px solid var(--linen)" }}>
                <div className="font-display" style={{ fontWeight: 600, fontSize: 22, color: "var(--ink-text)" }}>{s.v}</div>
                <div className="mt-2 font-sans uppercase" style={{ fontSize: 10, letterSpacing: "0.22em", color: "var(--ash)" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lifestyle Grid */}
      <section className="bg-[color:var(--bone)]" style={{ padding: "80px 5%" }}>
        <div className="mx-auto max-w-[1280px] grid grid-cols-1 md:grid-cols-3" style={{ gap: 48 }}>
          {[
            { h: "Schools", body: "Top private and STEM-track schools within a 15-minute window." },
            { h: "Shopping & Dining", body: "Two anchor malls and the district's strongest restaurant strip." },
            { h: "Transportation", body: "MRT/LRT access, EDSA, and the C-5 commute corridor." },
          ].map((s) => (
            <div key={s.h}>
              <h3 className="font-display" style={{ fontWeight: 600, fontSize: 24, color: "var(--ink-text)" }}>{s.h}</h3>
              <p className="mt-3 font-sans" style={{ fontSize: 14, color: "var(--ash)", lineHeight: 1.7 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Property List */}
      <section style={{ padding: "96px 5%" }}>
        <div className="mx-auto max-w-[1280px]">
          <h2 className="font-display" style={{ fontWeight: 400, fontSize: "clamp(28px, 4vw, 44px)", color: "var(--ink-text)" }}>
            Developments in {zone.name}
          </h2>
          {list.length === 0 ? (
            <p className="mt-6 font-sans" style={{ fontSize: 14, color: "var(--ash)" }}>
              We're still curating active inventory for this corridor.
            </p>
          ) : (
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 32 }}>
              {list.map((p) => (
                <a key={p.id} href={`#/property-detail/${p.id}`} className="block group">
                  <div className="overflow-hidden bg-[color:var(--bone)]" style={{ height: 240 }}>
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                  </div>
                  <h3 className="mt-4 font-display" style={{ fontWeight: 600, fontSize: 20, color: "var(--ink-text)" }}>{p.name}</h3>
                  <p className="mt-1 font-sans" style={{ fontSize: 12, color: "var(--ash)" }}>{p.area}</p>
                  <p className="mt-2 font-display" style={{ fontWeight: 300, fontSize: 18, color: "var(--ink-text)" }}>{p.priceLabel}</p>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
