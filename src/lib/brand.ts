import wordmarkAsset from "@/assets/wordmark.png.asset.json";

export const WORDMARK_SRC = wordmarkAsset.url;
export const PHONE_DISPLAY = "+63 917 000 0000";
export const PHONE_TEL = "tel:+639170000000";
export const WHATSAPP_URL = "https://wa.me/639170000000";

export const NAV_LINKS: Array<{ label: string; action: string }> = [
  { label: "Featured", action: "featured" },
  { label: "Catalog", action: "catalog" },
  { label: "Locations", action: "locations" },
  { label: "Insights", action: "insights" },
  { label: "Compare", action: "compare" },
  { label: "About", action: "about" },
];

export function openWhatsApp() {
  const w = window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
  if (!w) window.location.href = WHATSAPP_URL;
}

export function handleNavAction(action: string, navigate: (hash: string) => void) {
  switch (action) {
    case "featured":
      navigate("#/");
      requestAnimationFrame(() => {
        document.getElementById("featured-portfolio")?.scrollIntoView({ behavior: "smooth" });
        window.dispatchEvent(new CustomEvent("cityqlo:catalog-toggle", { detail: "featured" }));
      });
      break;
    case "catalog":
      navigate("#/");
      requestAnimationFrame(() => {
        document.getElementById("complete-catalog")?.scrollIntoView({ behavior: "smooth" });
        window.dispatchEvent(new CustomEvent("cityqlo:catalog-toggle", { detail: "catalog" }));
      });
      break;
    case "locations":
      navigate("#/");
      requestAnimationFrame(() => document.getElementById("locations")?.scrollIntoView({ behavior: "smooth" }));
      break;
    case "insights":
      navigate("#/insights");
      break;
    case "compare":
      navigate("#/compare");
      break;
    case "about":
      navigate("#/");
      requestAnimationFrame(() => document.getElementById("advisor")?.scrollIntoView({ behavior: "smooth" }));
      break;
  }
}
