import { useMemo, useState } from "react";
import type { Property } from "@/lib/properties";
import { WHATSAPP_URL } from "@/lib/brand";

type ToolTab = "amortization" | "yield" | "appreciation";

const PHP = new Intl.NumberFormat("en-PH", { maximumFractionDigits: 0 });

function formatPHP(n: number) {
  if (!isFinite(n) || n <= 0) return "—";
  return "₱" + PHP.format(Math.round(n));
}

export function InvestmentToolkit({ property }: { property: Property }) {
  const [tab, setTab] = useState<ToolTab>("amortization");
  const waUrl =
    `${WHATSAPP_URL}?text=` +
    encodeURIComponent(
      `Hi Jerwin, I'd like to discuss financing for ${property.name} in ${property.location}.`
    );

  return (
    <aside className="bg-white border border-[color:var(--linen)] flex flex-col" style={{ minHeight: 520 }}>
      <div className="flex border-b border-[color:var(--linen)]" role="tablist">
        {([
          { k: "amortization", l: "Amortization" },
          { k: "yield", l: "Rental Yield" },
          { k: "appreciation", l: "Appreciation" },
        ] as const).map((t) => {
          const active = tab === t.k;
          return (
            <button
              key={t.k}
              onClick={() => setTab(t.k)}
              role="tab"
              aria-selected={active}
              className="flex-1 py-4 font-sans uppercase"
              style={{
                fontSize: 10, letterSpacing: "0.22em", fontWeight: 400,
                color: active ? "var(--accent-gold)" : "var(--ash)",
                borderBottom: active ? "2px solid var(--accent-gold)" : "2px solid transparent",
                background: "transparent",
              }}
            >
              {t.l}
            </button>
          );
        })}
      </div>

      <div className="flex-1 p-6">
        {tab === "amortization" && <Amortization basePrice={property.startingPrice} />}
        {tab === "yield" && <RentalYield basePrice={property.startingPrice} />}
        {tab === "appreciation" && <Appreciation basePrice={property.startingPrice} />}
      </div>

      <div className="p-5 border-t border-[color:var(--linen)]">
        <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
          Consult Jerwin →
        </a>
      </div>
    </aside>
  );
}

function Field({ label, suffix, value, setValue, min, max, step }: { label: string; suffix?: string; value: number; setValue: (n: number) => void; min: number; max: number; step: number }) {
  return (
    <label className="block">
      <span className="font-sans uppercase block" style={{ fontSize: 10, letterSpacing: "0.22em", color: "var(--ash)" }}>
        {label}
      </span>
      <div className="mt-2 flex items-center gap-3">
        <input
          type="number"
          value={Number.isFinite(value) ? value : ""}
          onChange={(e) => setValue(parseFloat(e.target.value))}
          className="catalog-search w-full"
          style={{ padding: "10px 12px", fontSize: 14 }}
          min={min}
          max={max}
          step={step}
        />
        {suffix && <span className="font-sans" style={{ fontSize: 12, color: "var(--ash)" }}>{suffix}</span>}
      </div>
      <input type="range" min={min} max={max} step={step} value={Math.min(Math.max(value, min), max) || min}
        onChange={(e) => setValue(parseFloat(e.target.value))}
        className="toolkit-range mt-3 w-full"
      />
    </label>
  );
}

function Result({ value, label }: { value: string; label: string }) {
  const isEm = value === "—";
  return (
    <div className="mt-8 text-center">
      <div
        className="font-display"
        style={{
          fontWeight: 600, fontSize: 36, color: "var(--ink-text)", lineHeight: 1,
          opacity: isEm ? 0.4 : 1,
          transition: "opacity 400ms var(--ease-luxury)",
        }}
      >
        {value}
      </div>
      <div className="mt-3 font-sans uppercase" style={{ fontSize: 10, letterSpacing: "0.22em", color: "var(--ash)" }}>
        {label}
      </div>
    </div>
  );
}

function Amortization({ basePrice }: { basePrice: number }) {
  const [price, setPrice] = useState(basePrice);
  const [downPct, setDownPct] = useState(20);
  const [years, setYears] = useState(15);
  const [rate, setRate] = useState(7);

  const monthly = useMemo(() => {
    if (!(price > 0) || !(years > 0) || !(rate >= 0) || downPct < 0 || downPct >= 100) return NaN;
    const principal = price * (1 - downPct / 100);
    const n = years * 12;
    const r = rate / 100 / 12;
    if (r === 0) return principal / n;
    const pmt = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return pmt;
  }, [price, downPct, years, rate]);

  return (
    <div className="space-y-5">
      <Field label="Property Price (₱)" value={price} setValue={setPrice} min={1_000_000} max={50_000_000} step={100_000} />
      <Field label="Down Payment" suffix="%" value={downPct} setValue={setDownPct} min={0} max={50} step={5} />
      <div className="grid grid-cols-2 gap-4">
        <Field label="Term" suffix="yrs" value={years} setValue={setYears} min={5} max={30} step={1} />
        <Field label="Interest" suffix="%" value={rate} setValue={setRate} min={3} max={12} step={0.25} />
      </div>
      <Result value={formatPHP(monthly)} label="Estimated Monthly Payment" />
    </div>
  );
}

function RentalYield({ basePrice }: { basePrice: number }) {
  const [rent, setRent] = useState(Math.round(basePrice * 0.005 / 1000) * 1000);
  const yieldPct = basePrice > 0 && rent > 0 ? (rent * 12) / basePrice * 100 : NaN;
  const display = isFinite(yieldPct) && yieldPct > 0 ? `${yieldPct.toFixed(2)}%` : "—";

  return (
    <div className="space-y-5">
      <div className="font-sans" style={{ fontSize: 12, color: "var(--ash)" }}>
        Based on a starting price of <span style={{ color: "var(--ink-text)", fontWeight: 500 }}>{formatPHP(basePrice)}</span>.
      </div>
      <Field label="Expected Monthly Rent (₱)" value={rent} setValue={setRent} min={5_000} max={200_000} step={1_000} />
      <Result value={display} label="Gross Annual Yield" />
    </div>
  );
}

function Appreciation({ basePrice }: { basePrice: number }) {
  const [rate, setRate] = useState(5);
  const projected = basePrice > 0 && rate > 0 ? basePrice * Math.pow(1 + rate / 100, 5) : NaN;
  return (
    <div className="space-y-5">
      <div className="font-sans" style={{ fontSize: 12, color: "var(--ash)" }}>
        Compounded over 5 years from <span style={{ color: "var(--ink-text)", fontWeight: 500 }}>{formatPHP(basePrice)}</span>.
      </div>
      <Field label="Annual Growth Rate" suffix="%" value={rate} setValue={setRate} min={0} max={15} step={0.5} />
      <Result value={formatPHP(projected)} label="Projected Value in 5 Years" />
    </div>
  );
}
