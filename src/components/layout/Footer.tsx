import { WORDMARK_SRC, PHONE_DISPLAY, openWhatsApp, handleNavAction } from "@/lib/brand";
import { SocialIcons } from "./Header";

const exploreLinks = [
  { label: "Featured Portfolio", action: "featured" },
  { label: "Complete Catalog", action: "catalog" },
  { label: "Investment Zones", action: "locations" },
  { label: "Development Compare", action: "compare" },
  { label: "Insights", action: "insights" },
];

const guideLinks = [
  "Condo Buying Guide",
  "OFW Buyer's Guide",
  "Pre-Selling Guide",
  "RFO vs Pre-Selling",
  "Financing & Amortization",
];

export function Footer() {
  const navigate = (hash: string) => {
    if (typeof window !== "undefined") window.location.hash = hash.slice(1);
  };

  return (
    <footer className="bg-[color:var(--obsidian)] text-[color:var(--white)]" data-header-theme="dark" style={{ paddingTop: 120 }}>
      <div className="mx-auto max-w-[1280px] px-5 md:px-[5%]">
        {/* Zone 1 — Manifesto */}
        <div className="flex flex-col items-center text-center">
          <span className="eyebrow text-[color:var(--silver)] opacity-60" style={{ fontSize: 10, letterSpacing: "0.3em" }}>
            Cityqlo · DMCI Accredited Advisory
          </span>
          <span aria-hidden className="block mt-6 mb-10" style={{ width: 80, height: 1, background: "var(--graphite)" }} />
          <h2
            className="font-display italic"
            style={{
              fontWeight: 300,
              fontSize: "clamp(36px, 5vw, 56px)",
              color: "var(--accent-gold)",
              lineHeight: 1.2,
            }}
          >
            Find the condo<br />that fits your life.
          </h2>
          <span aria-hidden className="block" style={{ width: 120, height: 1, background: "var(--accent-gold)", margin: "32px auto" }} />
          <p
            className="font-sans"
            style={{
              fontWeight: 300, fontSize: 14, color: "var(--silver)",
              opacity: 0.7, maxWidth: 480, lineHeight: 1.85,
            }}
          >
            Serving Metro Manila buyers and OFWs worldwide with zero pressure, radical honesty, and full DMCI registry access.
          </p>
        </div>

        {/* Zone 2 — Navigation Grid */}
        <div
          className="mt-20 grid gap-12"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}
        >
          {/* Brand */}
          <div>
            <img src={WORDMARK_SRC} alt="Cityqlo" className="logo--white h-9 w-auto object-contain" />
            <p className="mt-5 font-sans text-[13px] leading-7 text-[color:var(--silver)] opacity-70 max-w-xs">
              An independent advisory pairing Metro Manila buyers with the right DMCI Homes development — without the sales-floor pressure.
            </p>
            <div className="mt-6">
              <SocialIcons className="text-[color:var(--silver)]" />
            </div>
          </div>

          {/* Explore */}
          <FooterColumn title="Explore">
            {exploreLinks.map((l) => (
              <li key={l.label}>
                <button
                  onClick={() => handleNavAction(l.action, navigate)}
                  className="text-link text-[color:var(--silver)] hover:text-[color:var(--white)]"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </FooterColumn>

          {/* Guides */}
          <FooterColumn title="Guides">
            {guideLinks.map((label) => (
              <li key={label}>
                <a href="#/guides" className="text-link text-[color:var(--silver)] hover:text-[color:var(--white)]">
                  {label}
                </a>
              </li>
            ))}
          </FooterColumn>

          {/* Contact */}
          <FooterColumn title="Contact">
            <li>
              <a href={`tel:+639170000000`} className="font-sans text-[color:var(--accent-gold)] text-[14px] tracking-[0.06em]">
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <button onClick={openWhatsApp} className="text-link text-[color:var(--silver)] hover:text-[color:var(--white)]">
                Free Consultation
              </button>
            </li>
            <li className="font-sans text-[color:var(--silver)] text-[13px] opacity-70">Metro Manila, PH</li>
            <li className="pt-3">
              <button onClick={openWhatsApp} className="btn-header-ghost w-full">
                Speak with Jerwin →
              </button>
            </li>
          </FooterColumn>
        </div>

        {/* Zone 3 — Advisor Trust Strip */}
        <div
          className="mt-20 bg-[color:var(--charcoal)] flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          style={{ padding: "32px clamp(20px, 5%, 48px)" }}
        >
          <p className="font-display italic" style={{ fontSize: 18, color: "var(--white)", opacity: 0.85, fontWeight: 300 }}>
            Jerwin Daliva — Accredited DMCI Homes Advisor
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="badge-accreditation">DMCI Accredited</span>
            <span className="badge-accreditation">Licensed PH Broker</span>
            <span className="badge-accreditation">OFW Ready</span>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <button onClick={openWhatsApp} className="text-link text-[color:var(--accent-gold)]">
              Consult via WhatsApp →
            </button>
            <a href="#/quiz" className="text-link text-[color:var(--silver)] hover:text-[color:var(--white)]">
              Take the Quiz →
            </a>
          </div>
        </div>
      </div>

      {/* Zone 4 — Bottom Bar */}
      <div
        className="mt-12 border-t border-[color:var(--graphite)]"
        style={{ padding: "24px clamp(20px, 5%, 48px)", paddingBottom: "calc(24px + env(safe-area-inset-bottom) + 64px)" }}
      >
        <div className="mx-auto max-w-[1280px] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-[11px] text-[color:var(--silver)] opacity-45 text-center md:text-left">
            © 2025 Cityqlo. All rights reserved. Not affiliated with DMCI Homes Corporation.
          </p>
          <div className="opacity-60">
            <SocialIcons className="text-[color:var(--silver)]" />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="eyebrow text-[color:var(--silver)] opacity-60 mb-5" style={{ fontSize: 10, letterSpacing: "0.28em" }}>
        {title}
      </h3>
      <ul className="flex flex-col gap-3 text-[13px]">{children}</ul>
    </div>
  );
}
