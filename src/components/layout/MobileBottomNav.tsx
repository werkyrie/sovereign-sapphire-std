import { useEffect, useState } from "react";
import { WHATSAPP_URL, openWhatsApp } from "@/lib/brand";

type Tab = { key: string; label: string; href?: string; section?: string; external?: boolean; svg: React.ReactNode };

const TABS: Tab[] = [
  {
    key: "home",
    label: "Home",
    href: "#/",
    svg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" />
      </svg>
    ),
  },
  {
    key: "condos",
    label: "Condos",
    section: "properties",
    svg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3" width="16" height="18" /><path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2" />
      </svg>
    ),
  },
  {
    key: "consult",
    label: "Consult",
    href: WHATSAPP_URL,
    external: true, // N-8
    svg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 0 1-13.5 7.8L3 21l1.2-4.5A9 9 0 1 1 21 12z" />
      </svg>
    ),
  },
  {
    key: "insights",
    label: "Insights",
    href: "#/insights",
    svg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h11a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4V4z" /><path d="M4 16a4 4 0 0 1 4-4h11" />
      </svg>
    ),
  },
];

export function MobileBottomNav() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash || "#/";
      if (hash.startsWith("#/insights")) setActive("insights");
      else if (hash === "#/" || hash === "") setActive("home");
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const handleClick = (e: React.MouseEvent, tab: Tab) => {
    if (tab.external) return; // let browser open new tab
    e.preventDefault();
    setActive(tab.key);
    if (tab.section) {
      window.location.hash = "/";
      requestAnimationFrame(() => document.getElementById(tab.section!)?.scrollIntoView({ behavior: "smooth" }));
    } else if (tab.href) {
      window.location.hash = tab.href.slice(1);
    }
  };

  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-[999] bg-[color:var(--obsidian)]"
      role="tablist"
      aria-label="Primary"
      style={{
        height: 64,
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div className="grid h-full" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        {TABS.map((t) => {
          const isActive = active === t.key;
          const content = (
            <span
              className="flex flex-col items-center justify-center gap-1 h-full transition-colors duration-300"
              style={{ color: isActive ? "var(--accent-gold)" : "var(--silver)" }}
            >
              {isActive && (
                <span
                  aria-hidden
                  style={{
                    position: "absolute", top: 0, left: "10%", right: "10%",
                    height: 2, background: "var(--accent-gold)",
                  }}
                />
              )}
              {t.svg}
              <span
                className="font-sans uppercase"
                style={{ fontSize: 9, letterSpacing: "0.22em", fontWeight: 400 }}
              >
                {t.label}
              </span>
            </span>
          );
          if (t.external) {
            return (
              <a
                key={t.key}
                href={t.href}
                target="_blank"
                rel="noopener noreferrer"
                role="tab"
                aria-selected={isActive}
                aria-label={t.label}
                className="relative min-h-[48px]"
                onClick={(e) => {
                  // Ensure we don't try to navigate internally (N-8)
                  e.stopPropagation();
                  setActive(t.key);
                  if (!window.open(t.href!, "_blank", "noopener,noreferrer")) {
                    e.preventDefault();
                    openWhatsApp();
                  }
                }}
              >
                {content}
              </a>
            );
          }
          return (
            <a
              key={t.key}
              href={t.href ?? "#"}
              role="tab"
              aria-selected={isActive}
              aria-label={t.label}
              className="relative min-h-[48px]"
              onClick={(e) => handleClick(e, t)}
            >
              {content}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
