import { useEffect, useState } from "react";
import { TESTIMONIALS } from "@/lib/properties";

export function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % TESTIMONIALS.length), 9000);
    return () => clearInterval(id);
  }, []);
  const t = TESTIMONIALS[i];
  return (
    <section
      data-header-theme="light"
      className="bg-[color:var(--pearl)]"
      style={{ paddingTop: 120, paddingBottom: 120 }}
    >
      <div className="mx-auto max-w-[820px] px-5 md:px-[5%] text-center">
        <div
          className="font-display italic select-none"
          aria-hidden
          style={{ fontWeight: 400, fontSize: 96, color: "var(--accent-gold)", lineHeight: 0.6 }}
        >
          “
        </div>
        <blockquote
          key={i}
          className="mt-6 font-display italic v3-reveal active"
          style={{ fontWeight: 300, fontSize: "clamp(22px, 2.4vw, 28px)", lineHeight: 1.4, color: "var(--ink-text)" }}
        >
          {t.quote}
        </blockquote>
        <div className="mt-8 font-sans" style={{ fontSize: 13, color: "var(--ash)", letterSpacing: "0.05em" }}>
          — {t.name}, {t.detail}
        </div>
        <div className="mt-10 flex justify-center gap-3">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Testimonial ${idx + 1}`}
              style={{
                width: 8, height: 8, borderRadius: "50%",
                background: idx === i ? "var(--accent-gold)" : "var(--linen)",
                transition: "background 300ms var(--ease-luxury)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
