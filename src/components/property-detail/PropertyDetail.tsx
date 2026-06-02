import { useEffect } from "react";
import { getProperty } from "@/lib/property-detail";
import { MediaViewer } from "./MediaViewer";
import { InvestmentToolkit } from "./InvestmentToolkit";
import { WhatsAppFAB } from "./WhatsAppFAB";

export function PropertyDetail({ id }: { id: string }) {
  const data = getProperty(id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [id]);

  if (!data) {
    return (
      <div className="flex items-center justify-center" style={{ minHeight: "70vh" }} data-header-theme="light">
        <div className="state-error">
          The development you're looking for isn't in our active registry.
          <span className="state-error-label">Cityqlo · property registry</span>
          <div className="mt-8 text-center">
            <a href="#/" className="btn-primary">Browse Properties</a>
          </div>
        </div>
      </div>
    );
  }

  const { property, detail } = data;

  return (
    <>
      {/* Immersive Header */}
      <section
        data-header-theme="dark"
        className="relative w-full text-[color:var(--white)]"
        style={{ height: "65vh", minHeight: 480 }}
      >
        <img src={property.image} alt={property.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(26,28,30,0.1) 0%, rgba(26,28,30,0.75) 100%)" }} />
        <div className="absolute bottom-10 left-5 md:left-[5%] right-5 md:right-[5%] flex items-end justify-between gap-6">
          <div>
            <span className={property.status === "rfo" ? "badge-rfo" : "badge-preselling"} style={{ background: "rgba(26,28,30,0.4)" }}>
              {property.status === "rfo" ? "RFO" : "Pre-Selling"}
            </span>
            <h1 className="mt-4 font-display italic" style={{ fontWeight: 600, fontSize: "clamp(40px, 6vw, 80px)", lineHeight: 1, color: "var(--white)" }}>
              {property.name}
            </h1>
            <div className="mt-3 font-sans" style={{ fontSize: 13, color: "rgba(250,250,249,0.8)", letterSpacing: "0.05em" }}>
              {property.location} · {property.area} <span style={{ color: "var(--accent-gold)" }}>↗</span>
            </div>
          </div>
          <div className="hidden md:block text-right">
            <div className="font-sans uppercase" style={{ fontSize: 10, letterSpacing: "0.25em", color: "rgba(250,250,249,0.65)" }}>From</div>
            <div className="mt-1 font-display" style={{ fontWeight: 300, fontSize: 44, color: "var(--accent-gold)", lineHeight: 1 }}>
              {property.priceLabel}
            </div>
          </div>
        </div>
      </section>

      {/* Specs Grid Bar */}
      <section data-header-theme="light" className="bg-[color:var(--pearl)] border-b border-[color:var(--linen)]">
        <div className="mx-auto max-w-[1280px] px-5 md:px-[5%] py-10 grid grid-cols-2 md:grid-cols-4 gap-y-6">
          {[
            { v: detail.unitConfigurations, l: "Unit Configurations" },
            { v: detail.sizeRange, l: "Size Range" },
            { v: detail.dpTerms, l: "DP Terms" },
            { v: `★ ${detail.resortIndex.toFixed(1)}`, l: "Resort Index" },
          ].map((s, i) => (
            <div key={s.l} className="relative px-4 md:px-6">
              {i > 0 && (
                <span aria-hidden className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2" style={{ color: "var(--accent-gold)" }}>·</span>
              )}
              <div className="font-display" style={{ fontWeight: 600, fontSize: 22, color: "var(--ink-text)", lineHeight: 1.1 }}>
                {s.v}
              </div>
              <div className="mt-2 font-sans uppercase" style={{ fontSize: 10, letterSpacing: "0.22em", color: "var(--ash)" }}>
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Body: media viewer + toolkit */}
      <section data-header-theme="light" className="bg-[color:var(--pearl)]" style={{ paddingTop: 80, paddingBottom: 120 }}>
        <div className="mx-auto max-w-[1280px] px-5 md:px-[5%] grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
          <div>
            <span className="eyebrow text-[color:var(--ash)]">The Development</span>
            <h2 className="mt-3 font-display italic" style={{ fontWeight: 300, fontSize: "clamp(28px, 3.4vw, 44px)", color: "var(--ink-text)", lineHeight: 1.1 }}>
              {property.teaser}
            </h2>
            <div className="mt-10">
              <MediaViewer property={property} detail={detail} />
            </div>
          </div>
          <div className="lg:sticky lg:top-28 self-start">
            <InvestmentToolkit property={property} />
          </div>
        </div>
      </section>

      <WhatsAppFAB propertyName={property.name} />
    </>
  );
}
