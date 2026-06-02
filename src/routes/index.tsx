import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { Properties } from "@/components/home/Properties";
import { StatsCounter } from "@/components/home/StatsCounter";
import { Testimonials } from "@/components/home/Testimonials";
import { Locations } from "@/components/home/Locations";
import { Advisor } from "@/components/home/Advisor";
import { GUIDES } from "@/lib/properties";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cityqlo — DMCI Homes Advisory · Find the condo that fits your life" },
      { name: "description", content: "Independent DMCI Homes accredited advisory pairing Metro Manila buyers and OFWs with the right condominium — zero pressure, radical honesty." },
      { property: "og:title", content: "Cityqlo — The Sovereign Sapphire Standard" },
      { property: "og:description", content: "Find the condo that fits your life. DMCI accredited advisory for Metro Manila and OFW buyers." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Condo Matchmaker Strip */}
      <section
        data-header-theme="light"
        className="bg-[color:var(--pearl)] border-y border-[color:var(--linen)]"
        style={{ padding: "40px 5%", minHeight: 80 }}
      >
        <div className="mx-auto max-w-[1280px] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <p className="font-sans" style={{ fontSize: 15, color: "var(--ink-text)", fontWeight: 400 }}>
            Not sure where to start? Answer 7 questions and get personalized condo recommendations.
          </p>
          <a href="#/quiz" className="btn-header-ghost shrink-0">Start Matching →</a>
        </div>
      </section>

      {/* 3. Trust Strip */}
      <section
        data-header-theme="dark"
        className="bg-[color:var(--obsidian)] text-[color:var(--white)]"
        style={{ paddingTop: 96, paddingBottom: 96 }}
      >
        <div className="mx-auto max-w-[1280px] px-5 md:px-[5%] grid grid-cols-1 md:grid-cols-3 gap-y-12">
          {[
            { n: "DMCI", l: "Accredited Advisor" },
            { n: "200+", l: "Families Helped" },
            { n: "0", l: "Zero Pressure Guarantee" },
          ].map((c, i) => (
            <div key={c.l} className="text-center px-6" style={{ borderRight: i < 2 ? "1px solid var(--graphite)" : "none" }}>
              <div className="font-display" style={{ fontWeight: 600, fontSize: "clamp(48px, 6vw, 84px)", color: "var(--accent-gold)", lineHeight: 1 }}>
                {c.n}
              </div>
              <div className="mt-4 font-sans uppercase" style={{ fontSize: 11, letterSpacing: "0.22em", color: "var(--silver)" }}>
                {c.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Accreditation Badge Row */}
      <section
        data-header-theme="light"
        className="bg-[color:var(--pearl)]"
        style={{ paddingTop: 56, paddingBottom: 56 }}
      >
        <div className="mx-auto max-w-[1280px] px-5 md:px-[5%] flex flex-wrap justify-center items-center gap-x-3 gap-y-3">
          {["DMCI Accredited Salesperson", "Licensed Real Estate Broker PH", "OFW Friendly Advisory"].map((b, i) => (
            <span key={b} className="contents">
              <span className="badge-accreditation">{b}</span>
              {i < 2 && <span aria-hidden style={{ color: "var(--accent-gold)" }}>·</span>}
            </span>
          ))}
        </div>
      </section>

      {/* 5. Properties */}
      <Properties />

      {/* 6. Stats Counter */}
      <StatsCounter />

      {/* 7. Testimonials */}
      <Testimonials />

      {/* 8. Locations */}
      <Locations />

      {/* 9. Guarantee Pillars */}
      <section
        data-header-theme="light"
        className="bg-[color:var(--bone)]"
        style={{ paddingTop: 120, paddingBottom: 120 }}
      >
        <div className="mx-auto max-w-[1280px] px-5 md:px-[5%]">
          <span className="eyebrow text-[color:var(--ash)]">Our Promise</span>
          <h2 className="mt-4 font-display italic" style={{ fontWeight: 300, fontSize: "clamp(32px, 4vw, 52px)", color: "var(--ink-text)", lineHeight: 1.05, maxWidth: 760 }}>
            Three pillars we will not negotiate.
          </h2>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { t: "Zero Pressure", d: "No sales-floor scripts. No fake-urgency reservation fees. You decide on your timeline — even if that's a year." },
              { t: "Radical Honesty", d: "We will tell you which towers are mispriced, which floor plans don't work, and which OFW financing rails fail at closing." },
              { t: "OFW Ready", d: "Document logistics, SPA execution, remote turnover walkthroughs — engineered for buyers in nine time zones." },
            ].map((p, i) => (
              <div key={p.t} className="border-t border-[color:var(--linen)] pt-8 v3-reveal">
                <div className="font-display" style={{ fontWeight: 600, fontSize: 14, color: "var(--accent-gold)", letterSpacing: "0.04em" }}>
                  0{i + 1}
                </div>
                <h3 className="mt-3 font-display" style={{ fontWeight: 600, fontSize: 28, color: "var(--ink-text)", lineHeight: 1.15 }}>
                  {p.t}
                </h3>
                <p className="mt-4 font-sans" style={{ fontWeight: 300, fontSize: 15, lineHeight: 1.85, color: "var(--ash)" }}>
                  {p.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Buyer Intelligence Resources */}
      <section
        data-header-theme="light"
        className="bg-[color:var(--pearl)]"
        style={{ paddingTop: 120, paddingBottom: 120 }}
      >
        <div className="mx-auto max-w-[1280px] px-5 md:px-[5%]">
          <div className="flex items-end justify-between gap-6">
            <div>
              <span className="eyebrow text-[color:var(--ash)]">Buyer Intelligence</span>
              <h2 className="mt-4 font-display italic" style={{ fontWeight: 300, fontSize: "clamp(32px, 4vw, 52px)", color: "var(--ink-text)", lineHeight: 1.05 }}>
                Read before you reserve.
              </h2>
            </div>
            <a href="#/guides" className="hidden md:inline-flex text-link" style={{ color: "var(--logo-blue)" }}>
              All Guides →
            </a>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {GUIDES.map((g) => (
              <a
                key={g.title}
                href="#/guides"
                className="block bg-white border border-[color:var(--linen)] transition-all v3-reveal"
                style={{ padding: 32, borderRadius: 2 }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.borderColor = "var(--accent-gold)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "var(--linen)";
                }}
              >
                <span className="font-sans uppercase" style={{ fontSize: 10, letterSpacing: "0.25em", color: "var(--logo-blue)", fontWeight: 400 }}>
                  {g.eyebrow}
                </span>
                <h3 className="mt-4 font-display" style={{ fontWeight: 400, fontSize: 24, color: "var(--ink-text)", lineHeight: 1.3 }}>
                  {g.title}
                </h3>
                <p className="mt-4 font-sans" style={{ fontWeight: 300, fontSize: 14, lineHeight: 1.75, color: "var(--ash)" }}>
                  {g.blurb}
                </p>
                <div className="mt-6 text-link" style={{ color: "var(--logo-blue)", fontSize: 13 }}>
                  Read Guide →
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Advisor */}
      <Advisor />

      {/* 12. CTA */}
      <section
        data-header-theme="light"
        className="bg-[color:var(--pearl)]"
        style={{ paddingTop: 140, paddingBottom: 140 }}
      >
        <div className="mx-auto max-w-[980px] px-5 md:px-[5%] text-center">
          <span className="eyebrow text-[color:var(--ash)]">The next step</span>
          <h2
            className="mt-6 font-display italic"
            style={{ fontWeight: 300, fontSize: "clamp(48px, 7vw, 88px)", color: "var(--ink-text)", lineHeight: 1, letterSpacing: "-0.01em" }}
          >
            One condo. <br /> The right one.
          </h2>
          <div className="mx-auto mt-10" style={{ width: 120, height: 1, background: "var(--accent-gold)" }} />
          <p className="mt-8 mx-auto font-sans" style={{ maxWidth: 540, fontWeight: 300, fontSize: 16, lineHeight: 1.9, color: "var(--ash)" }}>
            Tell us how you live, where you work, and what you're willing to commute through.
            We'll come back with three real options and the math behind each.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-x-10 gap-y-4">
            <a href="https://wa.me/639170000000" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Speak with Jerwin
            </a>
            <a href="#/quiz" className="text-link" style={{ color: "var(--accent-gold)", alignSelf: "center" }}>
              Take the 60-Second Quiz →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
