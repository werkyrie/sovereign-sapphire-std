import { useEffect, useState } from "react";
import { HERO_SLIDES } from "@/lib/properties";

export function Hero() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % HERO_SLIDES.length), 12000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      data-header-theme="dark"
      className="relative bg-[color:var(--obsidian)] text-[color:var(--white)] overflow-hidden"
      style={{ height: "100vh", minHeight: 640 }}
    >
      {/* Slideshow */}
      <div className="absolute inset-0">
        {HERO_SLIDES.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity"
            style={{
              opacity: i === active ? 1 : 0,
              transition: "opacity 2000ms var(--ease-luxury)",
            }}
          >
            <img
              src={src}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                animation: i === active ? "kenburns 14s ease-out forwards" : "none",
              }}
            />
          </div>
        ))}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(26,28,30,0.15) 0%, rgba(26,28,30,0.75) 100%)" }}
        />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="w-full px-[5%] md:px-[5%] py-24">
          <span
            className="eyebrow v3-reveal"
            style={{ color: "var(--logo-blue)", opacity: 0.7, letterSpacing: "0.3em", fontSize: 10 }}
          >
            DMCI Homes · Accredited Advisor
          </span>
          <h1
            className="mt-6 font-display v3-reveal"
            style={{
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: "clamp(48px, 6vw, 80px)",
              lineHeight: 1,
              letterSpacing: "-0.01em",
              color: "var(--white)",
            }}
          >
            Find the condo<br />that fits your life.
          </h1>
          <div
            className="mt-8 v3-reveal"
            style={{ height: 1, width: 200, background: "var(--accent-gold)" }}
          />
          <p
            className="mt-8 font-sans v3-reveal"
            style={{
              fontWeight: 300,
              fontSize: 16,
              lineHeight: 1.9,
              color: "rgba(250,250,249,0.7)",
              maxWidth: 440,
            }}
          >
            An independent advisory pairing Metro Manila buyers and OFWs with the right
            DMCI Homes development — without the sales-floor pressure.
          </p>
          <div className="mt-10 flex flex-wrap gap-8 v3-reveal">
            <a
              href="#properties"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("properties")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-link"
              style={{ color: "var(--white)" }}
            >
              Explore Properties →
            </a>
            <a href="#/quiz" className="text-link" style={{ color: "var(--accent-gold)" }}>
              Take the 60-Second Quiz →
            </a>
          </div>
        </div>
      </div>

      {/* Bottom-left stats */}
      <div
        className="hidden md:flex absolute left-[5%] bottom-10 gap-12 v3-reveal"
        style={{ color: "var(--white)" }}
      >
        {[
          { n: "200+", l: "Buyers Helped" },
          { n: "₱3M–₱20M", l: "Property Range" },
          { n: "OFW Ready", l: "Remote Assistance" },
        ].map((s) => (
          <div key={s.l}>
            <div className="font-display" style={{ fontWeight: 600, fontSize: 24, color: "var(--accent-gold)", lineHeight: 1 }}>
              {s.n}
            </div>
            <div className="mt-2 font-sans" style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(250,250,249,0.7)" }}>
              {s.l}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom-right scroll indicator */}
      <div className="hidden md:flex absolute right-[5%] bottom-10 items-center gap-3" style={{ color: "rgba(250,250,249,0.5)" }}>
        <span
          className="font-sans"
          style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Scroll
        </span>
        <span style={{ display: "block", width: 1, height: 40, background: "rgba(250,250,249,0.5)" }} />
      </div>
    </section>
  );
}
