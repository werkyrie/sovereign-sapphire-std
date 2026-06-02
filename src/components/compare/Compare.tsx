import { useState } from "react";
import { PROPERTIES } from "@/lib/properties";

const ROWS = [
  { key: "location", label: "Location" },
  { key: "price", label: "Starting Price" },
  { key: "status", label: "RFO Date" },
  { key: "target", label: "Target Buyer" },
  { key: "demand", label: "Rental Demand" },
] as const;

function cellFor(key: typeof ROWS[number]["key"], p: typeof PROPERTIES[number]) {
  switch (key) {
    case "location": return `${p.location} · ${p.area}`;
    case "price": return p.priceLabel;
    case "status": return p.status === "rfo" ? "Ready for Occupancy" : "Pre-Selling · 2027";
    case "target":
      if (p.startingPrice < 5_000_000) return "Solo professionals · OFW starter";
      if (p.startingPrice < 9_000_000) return "Couples · small families";
      return "Established families · investors";
    case "demand":
      if (p.location === "Pasig" || p.location === "Taguig") return "High · steady";
      if (p.location === "Mandaluyong") return "High · pre-selling premium";
      return "Moderate · improving";
  }
}

export function Compare() {
  const [picks, setPicks] = useState<string[]>(() => PROPERTIES.slice(0, 3).map((p) => p.id));
  const items = picks.map((id) => PROPERTIES.find((p) => p.id === id)!).filter(Boolean);

  const togglePick = (id: string, idx: number) => {
    const next = [...picks];
    next[idx] = id;
    setPicks(next);
  };

  return (
    <div data-header-theme="light" className="bg-[color:var(--pearl)]" style={{ padding: "96px 5%", minHeight: "60vh" }}>
      <div className="mx-auto max-w-[1280px]">
        <p className="font-sans uppercase text-center" style={{ fontSize: 10, letterSpacing: "0.3em", color: "rgba(35,90,144,0.7)" }}>
          SIDE-BY-SIDE
        </p>
        <h1 className="mt-4 font-display text-center" style={{ fontWeight: 400, fontSize: "clamp(40px, 6vw, 64px)", color: "var(--ink-text)" }}>
          Development Comparison
        </h1>
        <p className="mt-5 font-sans text-center mx-auto" style={{ maxWidth: 560, fontSize: 14, color: "var(--ash)", lineHeight: 1.7 }}>
          Pick up to three DMCI developments to weigh against each other. No marketing speak — only the numbers we'd want a friend to see.
        </p>

        <div className="mt-16 overflow-x-auto">
          <table className="w-full bg-white" style={{ border: "1px solid var(--linen)", borderCollapse: "separate", borderSpacing: 0, minWidth: 720 }}>
            <thead>
              <tr>
                <th style={{ padding: 24, borderBottom: "1px solid var(--linen)", textAlign: "left", width: 200, background: "var(--pearl)" }} />
                {items.map((p, i) => (
                  <th key={p.id + i} style={{ padding: 20, borderBottom: "1px solid var(--linen)", background: i === 0 ? "rgba(212,160,23,0.04)" : "white", borderLeft: i === 0 ? "1px solid var(--accent-gold)" : "1px solid var(--linen)", borderRight: i === 0 ? "1px solid var(--accent-gold)" : undefined }}>
                    <select
                      value={p.id}
                      onChange={(e) => togglePick(e.target.value, i)}
                      className="w-full font-display"
                      style={{ fontWeight: 600, fontSize: 18, color: "var(--ink-text)", background: "transparent", border: 0, cursor: "pointer" }}
                    >
                      {PROPERTIES.map((pp) => (<option key={pp.id} value={pp.id}>{pp.name}</option>))}
                    </select>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.key}>
                  <td style={{ padding: "18px 24px", borderBottom: "1px solid var(--linen)", background: "var(--pearl)" }}>
                    <span className="font-sans uppercase" style={{ fontSize: 11, letterSpacing: "0.22em", color: "var(--ash)", fontWeight: 500 }}>{row.label}</span>
                  </td>
                  {items.map((p, i) => (
                    <td key={p.id + row.key} style={{
                      padding: "18px 20px",
                      borderBottom: "1px solid var(--linen)",
                      borderLeft: i === 0 ? "1px solid var(--accent-gold)" : "1px solid var(--linen)",
                      borderRight: i === 0 ? "1px solid var(--accent-gold)" : undefined,
                      background: i === 0 ? "rgba(212,160,23,0.04)" : "white",
                    }}>
                      <span className="font-sans" style={{ fontSize: 14, color: "var(--ink-text)", lineHeight: 1.5 }}>
                        {cellFor(row.key, p)}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td style={{ padding: 24, background: "var(--pearl)" }} />
                {items.map((p, i) => (
                  <td key={"cta" + p.id + i} style={{
                    padding: 20,
                    background: i === 0 ? "rgba(212,160,23,0.04)" : "white",
                    borderLeft: i === 0 ? "1px solid var(--accent-gold)" : "1px solid var(--linen)",
                    borderRight: i === 0 ? "1px solid var(--accent-gold)" : undefined,
                  }}>
                    <a href={`#/property-detail/${p.id}`} className="font-sans uppercase" style={{ fontSize: 11, letterSpacing: "0.22em", color: "var(--logo-blue)", fontWeight: 600 }}>
                      View Detail →
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-12 text-center font-display italic" style={{ fontWeight: 300, fontSize: 18, color: "var(--ash)" }}>
          Need help deciding? <a href="https://wa.me/639170000000" target="_blank" rel="noopener noreferrer" className="text-link" style={{ color: "var(--accent-gold)" }}>Chat with Jerwin →</a>
        </p>
      </div>
    </div>
  );
}
