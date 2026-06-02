import { ZONES } from "@/lib/properties";

export function Locations() {
  return (
    <section
      id="locations"
      data-header-theme="light"
      className="bg-[color:var(--pearl)]"
      style={{ paddingTop: 120, paddingBottom: 120 }}
    >
      <div className="mx-auto max-w-[1280px] px-5 md:px-[5%]">
        <div className="flex items-end justify-between gap-6 mb-12">
          <div>
            <span className="eyebrow text-[color:var(--ash)]">Where to live</span>
            <h2
              className="mt-3 font-display italic"
              style={{ fontWeight: 300, fontSize: "clamp(36px, 5vw, 64px)", color: "var(--ink-text)", lineHeight: 1.05 }}
            >
              Investment Zones
            </h2>
          </div>
          <span className="hidden md:block font-sans uppercase" style={{ fontSize: 10, letterSpacing: "0.25em", color: "var(--ash)" }}>
            Scroll →
          </span>
        </div>
      </div>

      <div
        className="snap-scroll-x flex gap-6 overflow-x-auto px-5 md:px-[5%] pb-8"
        style={{ scrollSnapType: "x mandatory", scrollPaddingLeft: "5%" }}
      >
        {ZONES.map((z) => (
          <button
            key={z.slug}
            onClick={() => {
              window.dispatchEvent(new CustomEvent("cityqlo:filter-location", { detail: z.name.toUpperCase() }));
              document.getElementById("properties")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="relative shrink-0 overflow-hidden group text-left"
            style={{
              width: 380, maxWidth: "85vw", height: 520,
              scrollSnapAlign: "start",
              outline: "1px solid transparent",
              transition: "outline-color 400ms var(--ease-luxury)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.outlineColor = "var(--accent-gold)")}
            onMouseLeave={(e) => (e.currentTarget.style.outlineColor = "transparent")}
          >
            <img src={z.image} alt={z.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms]" loading="lazy" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(26,28,30,0.1) 0%, rgba(26,28,30,0.85) 100%)" }} />
            <div className="absolute inset-0 flex flex-col justify-between p-8 text-[color:var(--white)]">
              <span
                className="self-start font-sans uppercase"
                style={{
                  fontSize: 10, letterSpacing: "0.18em", color: "var(--accent-gold)",
                  border: "1px solid var(--accent-gold)", padding: "5px 11px", borderRadius: 2,
                }}
              >
                {z.count} Developments
              </span>
              <div>
                <h3 className="font-display italic" style={{ fontWeight: 300, fontSize: 44, color: "var(--white)", lineHeight: 1 }}>
                  {z.name}
                </h3>
                <div className="mt-3 flex items-center justify-between text-[12px]">
                  <span className="font-display" style={{ fontWeight: 600, color: "var(--accent-gold)" }}>{z.avgPriceLabel}</span>
                  <span className="font-sans uppercase" style={{ letterSpacing: "0.18em", color: "rgba(250,250,249,0.75)" }}>
                    {z.rfoCount} RFO · {z.preCount} Pre-Sell
                  </span>
                </div>
                <a
                  href={`#/locations/${z.slug}`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-link mt-5 inline-flex"
                  style={{ color: "var(--accent-gold)" }}
                >
                  Explore Area →
                </a>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
