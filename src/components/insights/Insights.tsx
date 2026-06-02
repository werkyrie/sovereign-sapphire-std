type Article = {
  id: string;
  category: string;
  title: string;
  blurb: string;
  image: string;
  featured?: boolean;
};

const ARTICLES: Article[] = [
  {
    id: "kapitolyo-guide",
    category: "Neighborhood Guides",
    title: "Living in Kapitolyo: Complete Condo Buyer's Guide",
    blurb: "Why this Pasig pocket has quietly become the city's strongest rental yield corridor.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
    featured: true,
  },
  {
    id: "ofw-areas",
    category: "OFW Playbook",
    title: "Best Areas for OFWs Returning to Manila",
    blurb: "Five districts that balance turnover quality, rental income, and family-mode liveability.",
    image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "rfo-vs-pre",
    category: "Market Lens",
    title: "RFO vs Pre-Selling in 2026 — The Honest Math",
    blurb: "When the pre-selling discount is real, and when it quietly becomes a financing trap.",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "ortigas-corridor",
    category: "Neighborhood Guides",
    title: "The Mandaluyong–Ortigas Corridor: What's Next",
    blurb: "Three masterplans, two MRT extensions, one of the most underrated condo plays in NCR.",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "financing-rails",
    category: "Financing",
    title: "Bank, Pag-IBIG, In-House: A Side-by-Side Ledger",
    blurb: "The three financing rails, the true monthly cost of each, and when to pick which.",
    image: "https://images.unsplash.com/photo-1551038247-3d9af20df552?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "turnover-checklist",
    category: "Advisory",
    title: "The 47-Item Turnover Inspection Checklist",
    blurb: "What sales agents won't print — the punchlist Jerwin walks with every Cityqlo buyer.",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80",
  },
];

export function Insights() {
  const [featured, ...rest] = ARTICLES;
  return (
    <div data-header-theme="light" className="bg-[color:var(--pearl)]">
      {/* Hero — 50/50 split */}
      <section className="grid grid-cols-1 lg:grid-cols-2" style={{ minHeight: 480 }}>
        <div data-header-theme="dark" className="flex items-center" style={{ background: "var(--obsidian)", padding: "80px 5%" }}>
          <div>
            <p className="font-sans uppercase" style={{ fontSize: 10, letterSpacing: "0.3em", color: "rgba(212,160,23,0.8)" }}>
              CITYQLO JOURNAL
            </p>
            <h1 className="mt-5 font-display" style={{ fontWeight: 400, fontSize: "clamp(40px, 6vw, 72px)", color: "var(--white)", lineHeight: 1.05 }}>
              Property Intelligence
            </h1>
            <p className="mt-6 font-sans" style={{ fontSize: 15, color: "rgba(250,250,249,0.75)", maxWidth: 460, lineHeight: 1.7 }}>
              Field-tested briefings on Metro Manila's condo market — written for buyers, not for sales floors.
            </p>
          </div>
        </div>
        <div className="relative" style={{ minHeight: 320, background: "var(--bone)" }}>
          <img src={featured.image} alt={featured.title} className="absolute inset-0 w-full h-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: "96px 5%" }}>
        <div className="mx-auto max-w-[1280px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 48 }}>
          {rest.map((a) => (
            <article key={a.id} className="group">
              <div className="overflow-hidden bg-[color:var(--bone)]" style={{ height: 280 }}>
                <img
                  src={a.image} alt={a.title}
                  className="w-full h-full object-cover"
                  style={{ transition: "transform 800ms var(--ease-luxury)" }}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                />
              </div>
              <span
                className="font-sans uppercase mt-5 inline-flex"
                style={{
                  fontSize: 10, letterSpacing: "0.22em",
                  border: "1px solid var(--accent-teal)", color: "var(--accent-teal)",
                  padding: "4px 10px", borderRadius: 2,
                }}
              >
                {a.category}
              </span>
              <h3 className="mt-4 font-display" style={{ fontWeight: 600, fontSize: 22, color: "var(--ink-text)", lineHeight: 1.3 }}>
                {a.title}
              </h3>
              <p className="mt-3 font-sans" style={{ fontSize: 14, color: "var(--ash)", lineHeight: 1.6 }}>{a.blurb}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
