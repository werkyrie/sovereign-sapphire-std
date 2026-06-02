import jerwinAsset from "@/assets/jerwin.jpg.asset.json";

export function Advisor() {
  return (
    <section
      id="advisor"
      data-header-theme="dark"
      className="bg-[color:var(--obsidian)] text-[color:var(--white)] grid md:grid-cols-[45%_55%]"
      style={{ minHeight: "100vh" }}
    >
      <div className="relative" style={{ minHeight: 320 }}>
        <img
          src={jerwinAsset.url}
          alt="Jerwin Daliva, Accredited DMCI Homes Advisor"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "contrast(1.05) brightness(0.95)" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(26,28,30,0) 60%, rgba(26,28,30,0.5) 100%)" }} />
        <span
          className="absolute bottom-6 left-6 font-sans uppercase"
          style={{ fontSize: 10, letterSpacing: "0.3em", color: "var(--accent-gold)" }}
        >
          Accredited DMCI Homes Advisor
        </span>
      </div>

      <div className="flex flex-col justify-center px-8 md:px-16 py-16 md:py-24">
        <span className="eyebrow" style={{ color: "var(--silver)" }}>The Advisor</span>
        <h2
          className="mt-5 font-display italic"
          style={{ fontWeight: 300, fontSize: "clamp(40px, 6vw, 64px)", color: "var(--white)", lineHeight: 1.05 }}
        >
          Jerwin Daliva
        </h2>
        <div className="mt-3 font-sans" style={{ fontSize: 13, color: "var(--silver)", letterSpacing: "0.05em" }}>
          DMCI Accredited Advisor · Licensed PH Real Estate Broker
        </div>
        <p
          className="mt-8 font-display italic"
          style={{ fontWeight: 300, fontSize: "clamp(20px, 2.2vw, 24px)", lineHeight: 1.75, color: "rgba(250,250,249,0.8)", maxWidth: 620 }}
        >
          “I will tell you when the unit you've fallen in love with is the wrong one.
          That promise is the entire business.”
        </p>
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
          <a
            href="https://wa.me/639170000000"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
            style={{ color: "#25D366" }}
          >
            Consult via WhatsApp →
          </a>
          <a href="#/quiz" className="text-link" style={{ color: "var(--accent-gold)" }}>
            Take the Condo Quiz →
          </a>
        </div>
      </div>
    </section>
  );
}
