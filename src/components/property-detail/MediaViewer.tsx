import { useEffect, useRef, useState } from "react";
import type { PropertyDetail } from "@/lib/property-detail";
import { Icon } from "./icons";
import { WHATSAPP_URL } from "@/lib/brand";

type TabKey = "photos" | "video" | "tour" | "blueprint" | "amenities";

const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: "photos", label: "Photos", icon: "photos" },
  { key: "video", label: "Video", icon: "video" },
  { key: "tour", label: "360° Walkthrough", icon: "tour" },
  { key: "blueprint", label: "Blueprint", icon: "blueprint" },
  { key: "amenities", label: "Amenities", icon: "amenities" },
];

function TabGlyph({ name }: { name: string }) {
  const c = { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "photos":     return <svg {...c}><rect x="3" y="5" width="18" height="14" rx="1.5" /><circle cx="9" cy="11" r="2" /><path d="M21 17l-5-5-9 7" /></svg>;
    case "video":      return <svg {...c}><path d="M7 5l13 7-13 7V5z" /></svg>;
    case "tour":       return <svg {...c}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 4 6 4 9s-1 6-4 9c-3-3-4-6-4-9s1-6 4-9z" /></svg>;
    case "blueprint":  return <svg {...c}><rect x="3" y="3" width="18" height="18" rx="1.5" /><path d="M3 9h18M9 3v18M14 14h5" /></svg>;
    case "amenities":  return <svg {...c}><path d="M3 18h18M5 18V8l7-4 7 4v10" /><path d="M9 18v-4h6v4" /></svg>;
    default: return null;
  }
}

export function MediaViewer({ property, detail }: { property: { name: string }; detail: PropertyDetail }) {
  const [tab, setTab] = useState<TabKey>("photos");
  return (
    <div>
      {/* Tab bar */}
      <div className="media-tabs" role="tablist" aria-label="Property media">
        {TABS.map((t) => {
          const active = t.key === tab;
          return (
            <button
              key={t.key}
              role="tab"
              aria-selected={active}
              aria-controls={`tab-${t.key}`}
              id={`tabbtn-${t.key}`}
              className={`media-tab-btn ${active ? "active" : ""}`}
              onClick={() => setTab(t.key)}
            >
              <TabGlyph name={t.icon} />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Panels (always rendered, only active visible — preserves ARIA structure) */}
      <div role="tabpanel" id="tab-photos" aria-labelledby="tabbtn-photos" className={`media-view ${tab === "photos" ? "active" : ""}`}>
        <PhotosPanel photos={detail.photos} />
      </div>
      <div role="tabpanel" id="tab-video" aria-labelledby="tabbtn-video" className={`media-view ${tab === "video" ? "active" : ""}`}>
        <VideoPanel videoUrl={detail.videoUrl} propertyName={property.name} />
      </div>
      <div role="tabpanel" id="tab-tour" aria-labelledby="tabbtn-tour" className={`media-view ${tab === "tour" ? "active" : ""}`}>
        <TourPanel tourUrl={detail.walkthrough360Url} propertyName={property.name} />
      </div>
      <div role="tabpanel" id="tab-blueprint" aria-labelledby="tabbtn-blueprint" className={`media-view ${tab === "blueprint" ? "active" : ""}`}>
        <BlueprintPanel units={detail.units} />
      </div>
      <div role="tabpanel" id="tab-amenities" aria-labelledby="tabbtn-amenities" className={`media-view ${tab === "amenities" ? "active" : ""}`}>
        <AmenitiesPanel amenities={detail.amenities} />
      </div>
    </div>
  );
}

/* ── Tab 1: Photos ─────────────────────────────── */
function PhotosPanel({ photos }: { photos: string[] }) {
  const [active, setActive] = useState(0);
  const stripRef = useRef<HTMLDivElement>(null);

  const go = (delta: number) =>
    setActive((i) => (i + delta + photos.length) % photos.length);

  useEffect(() => {
    const el = stripRef.current?.children[active] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: "smooth", inline: "nearest", block: "nearest" });
  }, [active]);

  return (
    <div>
      <div className="relative bg-[color:var(--charcoal)]" style={{ aspectRatio: "3/2" }}>
        <ImageWithFade key={photos[active]} src={photos[active]} alt={`Photo ${active + 1}`} />
        <button
          aria-label="Previous photo"
          onClick={() => go(-1)}
          className="abs-arrow left-4"
        >‹</button>
        <button
          aria-label="Next photo"
          onClick={() => go(1)}
          className="abs-arrow right-4"
        >›</button>
        <span className="absolute bottom-3 right-4 font-sans uppercase" style={{ fontSize: 10, letterSpacing: "0.22em", color: "rgba(250,250,249,0.7)" }}>
          {String(active + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
        </span>
      </div>

      <div
        ref={stripRef}
        className="mt-4 flex gap-2 overflow-x-auto"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {photos.map((p, i) => (
          <button
            key={p + i}
            onClick={() => setActive(i)}
            className="shrink-0 overflow-hidden"
            style={{
              width: 72, height: 52,
              border: i === active ? "2px solid var(--accent-gold)" : "2px solid transparent",
              scrollSnapAlign: "start",
            }}
            aria-label={`Show photo ${i + 1}`}
          >
            <img src={p} alt="" className="w-full h-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}

function ImageWithFade({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const [broken, setBroken] = useState(false);
  if (broken) {
    return (
      <div className="absolute inset-0 flex items-center justify-center" style={{ background: "var(--obsidian)" }}>
        <span className="font-sans uppercase" style={{ fontSize: 10, letterSpacing: "0.25em", color: "var(--silver)" }}>
          Image Unavailable
        </span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      onLoad={() => setLoaded(true)}
      onError={() => setBroken(true)}
      className="absolute inset-0 w-full h-full object-cover"
      style={{
        opacity: loaded ? 1 : 0,
        transition: "opacity 600ms var(--ease-luxury)",
      }}
    />
  );
}

/* ── Tab 2: Video ─────────────────────────────── */
function VideoPanel({ videoUrl, propertyName }: { videoUrl?: string; propertyName: string }) {
  if (videoUrl) {
    return (
      <div className="relative" style={{ paddingTop: "56.25%" }}>
        <iframe
          src={videoUrl}
          title={`${propertyName} video walkthrough`}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center text-center" style={{ background: "var(--obsidian)", aspectRatio: "16/9", padding: "0 24px" }}>
      <div style={{ color: "var(--accent-gold)" }}><Icon name="play" size={40} /></div>
      <p className="mt-5 font-sans uppercase" style={{ fontSize: 11, letterSpacing: "0.25em", color: "var(--white)" }}>
        Video Walkthrough Coming Soon
      </p>
      <p className="mt-3 font-sans" style={{ fontSize: 13, color: "var(--silver)" }}>
        Contact Jerwin for a live video tour.
      </p>
      <a
        href={`${WHATSAPP_URL}?text=${encodeURIComponent(`Hi Jerwin, can we schedule a live video walkthrough of ${propertyName}?`)}`}
        target="_blank" rel="noopener noreferrer"
        className="text-link mt-5" style={{ color: "var(--accent-gold)" }}
      >
        Request via WhatsApp →
      </a>
    </div>
  );
}

/* ── Tab 3: 360 ──────────────────────────────── */
function TourPanel({ tourUrl, propertyName }: { tourUrl?: string; propertyName: string }) {
  if (tourUrl) {
    return (
      <div className="relative" style={{ aspectRatio: "16/9", background: "var(--obsidian)", cursor: "grab" }}>
        <iframe src={tourUrl} title="360 walkthrough" className="absolute inset-0 w-full h-full" />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center text-center" style={{ background: "var(--obsidian)", aspectRatio: "16/9", padding: "0 24px" }}>
      <div style={{ color: "var(--silver)" }}><Icon name="globe" size={40} /></div>
      <p className="mt-5 font-sans uppercase" style={{ fontSize: 11, letterSpacing: "0.25em", color: "var(--white)" }}>
        360° Tour Not Yet Available
      </p>
      <p className="mt-3 font-sans" style={{ fontSize: 13, color: "var(--silver)" }}>
        We can arrange a custom virtual tour on request.
      </p>
      <a
        href={`${WHATSAPP_URL}?text=${encodeURIComponent(`Hi Jerwin, can you arrange a 360° virtual tour of ${propertyName}?`)}`}
        target="_blank" rel="noopener noreferrer"
        className="text-link mt-5" style={{ color: "var(--accent-gold)" }}
      >
        Arrange via WhatsApp →
      </a>
    </div>
  );
}

/* ── Tab 4: Blueprint ─────────────────────────── */
function BlueprintPanel({ units }: { units: { type: string; sizeRange: string; pdfUrl?: string; planImage?: string }[] }) {
  const [active, setActive] = useState(0);
  if (!units.length) {
    return (
      <div className="text-center" style={{ background: "var(--bone)", padding: "80px 24px" }}>
        <p className="font-sans uppercase" style={{ fontSize: 10, letterSpacing: "0.25em", color: "var(--silver)" }}>Floor Plan Pending</p>
        <p className="mt-3 font-sans" style={{ fontSize: 13, color: "var(--ash)" }}>Plans will be added when the developer releases them.</p>
      </div>
    );
  }
  const u = units[active];
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-5">
        {units.map((unit, i) => {
          const isActive = i === active;
          return (
            <button
              key={unit.type}
              onClick={() => setActive(i)}
              className="font-sans uppercase"
              style={{
                fontSize: 11, letterSpacing: "0.2em", padding: "8px 16px", borderRadius: 2,
                border: "1px solid " + (isActive ? "var(--accent-gold)" : "var(--linen)"),
                background: isActive ? "var(--accent-gold)" : "transparent",
                color: isActive ? "var(--obsidian)" : "var(--ash)",
                transition: "all 300ms var(--ease-luxury)",
              }}
            >
              {unit.type}
            </button>
          );
        })}
      </div>
      {u.planImage ? (
        <div style={{ background: "var(--bone)", padding: 24 }}>
          <img src={u.planImage} alt={`${u.type} floor plan`} className="block mx-auto" style={{ maxWidth: "100%", height: "auto", mixBlendMode: "multiply" }} />
        </div>
      ) : (
        <div className="text-center" style={{ background: "var(--bone)", padding: "80px 24px" }}>
          <p className="font-sans uppercase" style={{ fontSize: 10, letterSpacing: "0.25em", color: "var(--silver)" }}>Floor Plan Pending</p>
          <p className="mt-3 font-sans" style={{ fontSize: 13, color: "var(--ash)" }}>This unit's plan will be added soon.</p>
        </div>
      )}
      <div className="mt-5 flex items-center justify-between flex-wrap gap-4">
        <span className="font-sans" style={{ fontSize: 13, color: "var(--ash)" }}>
          {u.type} · {u.sizeRange}
        </span>
        {u.pdfUrl && (
          <a
            href={u.pdfUrl}
            target="_blank" rel="noopener noreferrer"
            className="font-sans uppercase inline-flex items-center"
            style={{
              fontSize: 11, letterSpacing: "0.22em", fontWeight: 600,
              border: "1px solid var(--accent-gold)", color: "var(--accent-gold)",
              padding: "10px 16px", borderRadius: 2,
            }}
          >
            Download PDF ↓
          </a>
        )}
      </div>
    </div>
  );
}

/* ── Tab 5: Amenities ─────────────────────────── */
function AmenitiesPanel({ amenities }: { amenities: { label: string; icon: string }[] }) {
  if (!amenities.length) {
    return (
      <div className="text-center" style={{ background: "var(--bone)", padding: "80px 24px" }}>
        <p className="font-sans uppercase" style={{ fontSize: 10, letterSpacing: "0.25em", color: "var(--silver)" }}>Amenity List Pending</p>
        <p className="mt-3 font-sans" style={{ fontSize: 13, color: "var(--ash)" }}>Final amenities will be published before turnover.</p>
      </div>
    );
  }
  return (
    <div className="amenities-grid">
      {amenities.map((a) => (
        <div key={a.label} className="amenity-item">
          <span style={{ color: "var(--accent-gold)" }}><Icon name={a.icon} /></span>
          <span className="font-sans" style={{ fontSize: 13, color: "var(--ink-text)" }}>{a.label}</span>
        </div>
      ))}
    </div>
  );
}
