// Inline stroke icons (1.5px stroke, no fill) — used across the property detail view.
import type { SVGProps } from "react";

const base: SVGProps<SVGSVGElement> = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const props = { ...base, width: size, height: size };
  switch (name) {
    case "waves":
      return <svg {...props}><path d="M2 6c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2" /><path d="M2 12c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2" /><path d="M2 18c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2" /></svg>;
    case "dumbbell":
      return <svg {...props}><path d="M6 4v16M2 8v8M18 4v16M22 8v8M6 12h12" /></svg>;
    case "users":
      return <svg {...props}><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3 20c0-3 3-5 6-5s6 2 6 5M15 20c0-2 2-4 4-4s3 1 3 3" /></svg>;
    case "smile":
      return <svg {...props}><circle cx="12" cy="12" r="9" /><path d="M8 14c1 1.5 2.5 2 4 2s3-.5 4-2" /><circle cx="9" cy="10" r=".5" fill="currentColor" /><circle cx="15" cy="10" r=".5" fill="currentColor" /></svg>;
    case "shield":
      return <svg {...props}><path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6l8-3z" /></svg>;
    case "trees":
      return <svg {...props}><path d="M8 19v-4M16 19v-6" /><path d="M8 15c-3 0-5-2-5-5s2-5 5-5 4 2 4 5-1 5-4 5z" /><path d="M16 13c-2 0-4-2-4-4s2-4 4-4 4 2 4 4-2 4-4 4z" /></svg>;
    case "car":
      return <svg {...props}><path d="M3 14l2-6h14l2 6M3 14h18v5H3z" /><circle cx="7" cy="17" r="1.5" /><circle cx="17" cy="17" r="1.5" /></svg>;
    case "zap":
      return <svg {...props}><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" /></svg>;
    case "concierge":
      return <svg {...props}><path d="M3 20h18M5 20v-5c0-4 3-7 7-7s7 3 7 7v5M12 8V4M10 4h4" /></svg>;
    case "play":
      return <svg {...props} width={size} height={size}><path d="M6 4l14 8-14 8V4z" fill="currentColor" stroke="none" /></svg>;
    case "globe":
      return <svg {...props}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 4 6 4 9s-1 6-4 9c-3-3-4-6-4-9s1-6 4-9z" /></svg>;
    case "whatsapp":
      return <svg {...props}><path d="M3 21l1.6-4.6A8.5 8.5 0 1 1 8.5 20L3 21z" /><path d="M9 10c.4 1.2 1.4 2.4 2.6 3.1 1 .5 1.7.7 2.1.6.3-.1.6-.3.8-.6.2-.3.2-.6.1-.8l-1.4-1.1c-.2-.1-.4-.1-.6 0l-.6.5c-.5-.3-1-.7-1.4-1.4l.5-.6c.1-.2.1-.4 0-.6L9.6 7.7c-.2-.2-.5-.2-.8-.1-.4.2-.6.5-.7.9-.1.4 0 .9.3 1.5z" /></svg>;
    default:
      return <svg {...props}><circle cx="12" cy="12" r="3" /></svg>;
  }
}
