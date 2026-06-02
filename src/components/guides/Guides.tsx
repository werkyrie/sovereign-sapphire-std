import { WHATSAPP_URL } from "@/lib/brand";

const GUIDES = [
  {
    id: "condo-buying",
    eyebrow: "ESSENTIAL",
    title: "The Cityqlo Condo Buying Guide",
    blurb: "Reservation fees, DP cadence, turnover inspections — the full sequence from inquiry to keys.",
  },
  {
    id: "ofw-buying",
    eyebrow: "OFW PLAYBOOK",
    title: "Buying from Abroad: The OFW Field Manual",
    blurb: "SPA, document authentication, remote turnover — vet a unit in 48 hours without flying home.",
  },
  {
    id: "pre-selling",
    eyebrow: "PRE-SELLING",
    title: "Pre-Selling Without Regret",
    blurb: "When the discount is real, when it's a financing trap, and how to time the launch window.",
  },
  {
    id: "rfo",
    eyebrow: "RFO",
    title: "Ready-for-Occupancy, Done Right",
    blurb: "The inspection punchlist Jerwin walks with every Cityqlo buyer before turnover signoff.",
  },
  {
    id: "financing",
    eyebrow: "FINANCING",
    title: "Bank vs Pag-IBIG vs In-House",
    blurb: "A side-by-side ledger across the three financing rails, with the numbers that actually matter.",
  },
];

export function Guides() {
  return (
    <div data-header-theme="light" className="bg-[color:var(--pearl)]">
      <section style={{ padding: "120px 5% 60px" }}>
        <div className="mx-auto max-w-[920px] text-center">
          <p className="font-sans uppercase" style={{ fontSize: 10, letterSpacing: "0.3em", color: "rgba(35,90,144,0.7)" }}>
            CITYQLO LIBRARY
          </p>
          <h1 className="mt-5 font-display" style={{ fontWeight: 400, fontSize: "clamp(40px, 6vw, 72px)", color: "var(--ink-text)", lineHeight: 1.1 }}>
            Field guides for serious buyers.
          </h1>
          <p className="mt-6 font-sans mx-auto" style={{ fontSize: 16, color: "var(--ash)", lineHeight: 1.7, maxWidth: 540 }}>
            Plain-language playbooks Jerwin built from a decade of DMCI transactions. Read online or download the PDF.
          </p>
        </div>
      </section>

      <section style={{ padding: "60px 5% 120px" }}>
        <div className="mx-auto max-w-[1080px] grid grid-cols-1 md:grid-cols-2" style={{ gap: 32 }}>
          {GUIDES.map((g) => (
            <article key={g.id} className="bg-white" style={{ border: "1px solid var(--linen)", padding: 32 }}>
              <p className="font-sans uppercase" style={{ fontSize: 10, letterSpacing: "0.25em", color: "var(--accent-teal)" }}>{g.eyebrow}</p>
              <h3 className="mt-4 font-display" style={{ fontWeight: 600, fontSize: 24, color: "var(--ink-text)", lineHeight: 1.3 }}>{g.title}</h3>
              <p className="mt-4 font-sans" style={{ fontSize: 14, color: "var(--ash)", lineHeight: 1.7 }}>{g.blurb}</p>
              <div className="mt-6 flex items-center gap-6">
                <a
                  href={`${WHATSAPP_URL}?text=${encodeURIComponent(`Hi Jerwin, can you send me the Cityqlo guide: ${g.title}?`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="font-sans uppercase"
                  style={{ fontSize: 11, letterSpacing: "0.22em", fontWeight: 600, color: "var(--accent-gold)", borderBottom: "1px solid var(--accent-gold)", paddingBottom: 4 }}
                >
                  Download PDF Guide ↓
                </a>
                <a
                  href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                  className="font-sans" style={{ fontSize: 13, color: "var(--logo-blue)" }}
                >
                  Or read with Jerwin →
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
