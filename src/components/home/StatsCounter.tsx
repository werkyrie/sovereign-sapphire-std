import { useEffect, useRef, useState } from "react";

type Stat = { value: number; suffix?: string; prefix?: string; label: string; format?: (n: number) => string };

const STATS: Stat[] = [
  {
    value: 2.8,
    label: "Total Property Value",
    format: (n) => `₱${n.toFixed(1)}B+`,
  },
  { value: 200, suffix: "+", label: "Buyers Helped" },
  { value: 4, label: "Metro Areas" },
  { value: 0, label: "OFW Remote-Ready", format: () => "OFW" },
];

export function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setStart(true)),
      { threshold: 0.3 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      data-header-theme="dark"
      className="bg-[color:var(--obsidian)] text-[color:var(--white)]"
      style={{ paddingTop: 120, paddingBottom: 120 }}
    >
      <div className="mx-auto max-w-[1280px] px-5 md:px-[5%]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="text-center px-4"
              style={{
                borderRight: i < STATS.length - 1 ? "1px solid var(--graphite)" : "none",
              }}
            >
              <div
                className="font-display"
                style={{
                  fontWeight: 600,
                  fontSize: "clamp(40px, 6vw, 72px)",
                  color: "var(--accent-gold)",
                  lineHeight: 1,
                }}
              >
                <Counter start={start} value={s.value} format={s.format} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div
                className="mt-4 font-sans uppercase"
                style={{ fontSize: 12, letterSpacing: "0.22em", color: "var(--silver)" }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({
  start, value, format, prefix = "", suffix = "",
}: { start: boolean; value: number; format?: (n: number) => string; prefix?: string; suffix?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (format && value === 0) { setN(0); return; }
    const duration = 1600;
    const startT = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - startT) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, value, format]);

  if (format) return <>{format(n)}</>;
  const display = Number.isInteger(value) ? Math.floor(n).toString() : n.toFixed(1);
  return <>{prefix}{display}{suffix}</>;
}
