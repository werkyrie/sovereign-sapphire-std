import { useEffect, useState } from "react";
import { WORDMARK_SRC, NAV_LINKS, PHONE_DISPLAY, openWhatsApp, handleNavAction } from "@/lib/brand";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeAction, setActiveAction] = useState<string | null>(null);

  // Scroll state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Section theme observer
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-header-theme]");
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const t = (e.target as HTMLElement).dataset.headerTheme as "light" | "dark";
            setTheme(t === "dark" ? "dark" : "light");
          }
        }
      },
      { rootMargin: "-1px 0px -98% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Listen for catalog toggle to update active link
  useEffect(() => {
    const handler = (e: Event) => setActiveAction((e as CustomEvent).detail as string);
    window.addEventListener("cityqlo:catalog-toggle", handler);
    return () => window.removeEventListener("cityqlo:catalog-toggle", handler);
  }, []);

  // Body lock on menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navigate = (hash: string) => {
    if (typeof window === "undefined") return;
    if (hash.startsWith("#/")) {
      // Hash route navigation — emit page transition then update location
      const overlay = document.getElementById("page-transition");
      if (overlay) {
        overlay.classList.remove("is-entering");
        // force reflow
        void overlay.offsetWidth;
        overlay.classList.add("is-entering");
      }
      window.location.hash = hash.slice(1);
    }
  };

  const onNavClick = (action: string) => {
    setActiveAction(action);
    handleNavAction(action, navigate);
    setMenuOpen(false);
  };

  const logoClass = theme === "dark" ? "logo--white" : "logo--brand";
  const headerBg = scrolled
    ? theme === "dark"
      ? "bg-[color:var(--glass-dark)]"
      : "bg-[color:var(--glass-light)]"
    : "bg-transparent";
  const textColor = theme === "dark" ? "text-[color:var(--white)]" : "text-[color:var(--ink-text)]";

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-[1000] transition-[background,border-color] duration-300 ${headerBg} ${textColor} ${scrolled ? "border-b border-[rgba(35,90,144,0.08)] backdrop-blur-2xl backdrop-saturate-150" : ""}`}
      >
        <div className="mx-auto flex items-center justify-between px-5 md:px-[5%] h-[72px] md:h-[88px]">
          {/* Left: Wordmark */}
          <a href="#/" aria-label="Cityqlo home" className="flex items-center">
            <img
              src={WORDMARK_SRC}
              alt="Cityqlo"
              className={`${logoClass} h-8 md:h-11 w-auto object-contain`}
            />
          </a>

          {/* Center: Desktop nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((l) => (
              <button
                key={l.action}
                onClick={() => onNavClick(l.action)}
                className={`nav-link ${activeAction === l.action ? "is-active" : ""}`}
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* Right: Phone + CTA (desktop) / Menu (mobile) */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href={`tel:+639170000000`}
              className="font-sans text-[13px] tracking-[0.08em] text-[color:var(--accent-gold)] hover:opacity-80 transition-opacity"
            >
              {PHONE_DISPLAY}
            </a>
            <button className="btn-header-ghost" onClick={openWhatsApp}>
              Free Consult
            </button>
          </div>

          {/* Mobile menu trigger */}
          <button
            className="lg:hidden flex items-center gap-3"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span
              className="font-sans uppercase"
              style={{ fontSize: 10, letterSpacing: "0.25em", fontWeight: 400 }}
            >
              {menuOpen ? "Close" : "Menu"}
            </span>
            <span className={`arch-glyph ${menuOpen ? "is-open" : ""}`} aria-hidden="true">
              <span className="line line-1" />
              <span className="line line-2" />
              <span className="dot" />
            </span>
          </button>
        </div>
      </header>

      {/* Full-screen mobile overlay (N-6: no Quiz, no CTA button) */}
      <div
        className={`fixed inset-0 z-[1001] bg-[color:var(--obsidian)] text-[color:var(--white)] transition-transform duration-[600ms] lg:hidden`}
        style={{
          transform: menuOpen ? "translateX(0%)" : "translateX(100%)",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        aria-hidden={!menuOpen}
      >
        <div className="flex items-center justify-between h-[72px] px-5">
          <img src={WORDMARK_SRC} alt="Cityqlo" className="logo--white h-9 w-auto object-contain" />
          <button onClick={() => setMenuOpen(false)} className="flex items-center gap-3">
            <span className="font-sans uppercase" style={{ fontSize: 10, letterSpacing: "0.25em" }}>
              Close
            </span>
            <span className="arch-glyph is-open" aria-hidden="true">
              <span className="line line-1" />
              <span className="line line-2" />
              <span className="dot" />
            </span>
          </button>
        </div>

        <nav className="flex flex-col items-center justify-center px-6" style={{ minHeight: "calc(100vh - 240px)" }}>
          {NAV_LINKS.map((l, i) => (
            <button
              key={l.action}
              onClick={() => onNavClick(l.action)}
              className="w-full max-w-md text-center py-6 border-b border-[color:var(--graphite)] italic font-display"
              style={{
                fontWeight: 300,
                fontSize: "clamp(32px, 8vw, 52px)",
                lineHeight: 1.05,
                color: "var(--white)",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 600ms ${100 + i * 60}ms var(--ease-luxury), transform 600ms ${100 + i * 60}ms var(--ease-luxury), color 350ms var(--ease-luxury)`,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-gold)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--white)")}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 inset-x-0 px-6 pb-10 pt-6 flex flex-col items-center gap-5">
          <a href={`tel:+639170000000`} className="text-[color:var(--accent-gold)] font-sans text-sm tracking-[0.1em]">
            {PHONE_DISPLAY}
          </a>
          <SocialIcons className="text-[color:var(--silver)]" />
        </div>
      </div>
    </>
  );
}

export function SocialIcons({ className = "" }: { className?: string }) {
  const items = [
    { label: "Instagram", href: "https://instagram.com/", d: "M16 3H8a5 5 0 0 0-5 5v8a5 5 0 0 0 5 5h8a5 5 0 0 0 5-5V8a5 5 0 0 0-5-5Zm-4 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm5-9a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" },
    { label: "Facebook", href: "https://facebook.com/", d: "M14 9V7a1 1 0 0 1 1-1h2V3h-3a4 4 0 0 0-4 4v2H8v3h2v9h4v-9h2.5l.5-3h-3Z" },
    { label: "TikTok", href: "https://tiktok.com/", d: "M14 3h3a5 5 0 0 0 5 5v3a8 8 0 0 1-5-1.75V15a6 6 0 1 1-6-6v3a3 3 0 1 0 3 3V3Z" },
    { label: "WhatsApp", href: "https://wa.me/639170000000", d: "M12 3a9 9 0 0 0-7.7 13.7L3 21l4.4-1.2A9 9 0 1 0 12 3Zm5 12.4c-.2.6-1.2 1.2-1.7 1.2-.4 0-1 .1-3.3-.9-2.8-1.2-4.5-4-4.6-4.1-.1-.2-1-1.4-1-2.7 0-1.2.7-1.8 1-2 .2-.3.6-.4.8-.4h.6c.2 0 .5 0 .7.5l1 2.3c.1.2.1.4 0 .6l-.4.5c-.2.2-.3.4-.1.7.2.4.9 1.5 2 2.4 1.4 1.2 2.6 1.6 3 1.8.3.1.5.1.6-.1l.7-.8c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.3Z" },
  ];
  return (
    <div className={`flex items-center gap-5 ${className}`}>
      {items.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className="transition-colors duration-300 hover:text-[color:var(--accent-gold)]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d={s.d} /></svg>
        </a>
      ))}
    </div>
  );
}
