import { useEffect, useMemo, useState } from "react";
import { PROPERTIES, type Property } from "@/lib/properties";
import { WHATSAPP_URL } from "@/lib/brand";

type Option = { value: string; label: string; sub?: string };
type Step = { eyebrow: string; question: string; summaryLabel: string; options: Option[] };

const STEPS: Step[] = [
  {
    eyebrow: "INVESTMENT PROFILE", summaryLabel: "Budget",
    question: "How much are you ready to invest?",
    options: [
      { value: "under3", label: "Under ₱3M" },
      { value: "3to5", label: "₱3M – ₱5M" },
      { value: "5to8", label: "₱5M – ₱8M" },
      { value: "8to12", label: "₱8M – ₱12M" },
      { value: "12plus", label: "₱12M and above" },
    ],
  },
  {
    eyebrow: "PURPOSE", summaryLabel: "Purpose",
    question: "What is this condo for?",
    options: [
      { value: "primary", label: "My primary home" },
      { value: "rental", label: "Investment / Rental" },
      { value: "ofw", label: "OFW retirement plan" },
      { value: "vacation", label: "Vacation / Weekend use" },
    ],
  },
  {
    eyebrow: "TIMELINE", summaryLabel: "Timeline",
    question: "When do you plan to move in or start earning?",
    options: [
      { value: "rfo", label: "As soon as possible", sub: "RFO" },
      { value: "1to2", label: "Within 1–2 years" },
      { value: "3to5", label: "3–5 years" },
      { value: "exploring", label: "Still exploring" },
    ],
  },
  {
    eyebrow: "LOCATION", summaryLabel: "Location",
    question: "Which area do you prefer?",
    options: [
      { value: "pasig", label: "Pasig / Kapitolyo" },
      { value: "quezon", label: "Quezon City / Cubao" },
      { value: "taguig", label: "Taguig / BGC Area" },
      { value: "mandaluyong", label: "Mandaluyong / Ortigas" },
      { value: "any", label: "Open to any Metro Manila location" },
    ],
  },
  {
    eyebrow: "UNIT TYPE", summaryLabel: "Unit",
    question: "What size works for you?",
    options: [
      { value: "studio", label: "Studio", sub: "Solo / Investment" },
      { value: "1br", label: "1 Bedroom", sub: "Couple / Starter" },
      { value: "2br", label: "2 Bedroom", sub: "Small family" },
      { value: "3br", label: "3 Bedroom", sub: "Growing family" },
    ],
  },
  {
    eyebrow: "LIFESTYLE", summaryLabel: "Lifestyle",
    question: "Which matters most to you?",
    options: [
      { value: "amenities", label: "Pool & gym amenities" },
      { value: "quiet", label: "Quiet, low-density community" },
      { value: "offices", label: "Walking distance to offices" },
      { value: "schools", label: "Near schools & malls" },
    ],
  },
  {
    eyebrow: "FINANCING", summaryLabel: "Financing",
    question: "How do you plan to pay?",
    options: [
      { value: "inhouse", label: "In-house financing (DMCI)" },
      { value: "bank", label: "Bank loan / mortgage" },
      { value: "cash", label: "Cash / OFW remittance" },
      { value: "deciding", label: "Still deciding" },
    ],
  },
];

const BUDGET_RANGE: Record<string, [number, number]> = {
  under3: [0, 3_000_000],
  "3to5": [3_000_000, 5_000_000],
  "5to8": [5_000_000, 8_000_000],
  "8to12": [8_000_000, 12_000_000],
  "12plus": [12_000_000, Infinity],
};

const LOCATION_MAP: Record<string, string[]> = {
  pasig: ["Pasig"],
  quezon: ["Quezon City"],
  taguig: ["Taguig"],
  mandaluyong: ["Mandaluyong"],
  any: [],
};

const UNIT_KEYWORDS: Record<string, string[]> = {
  studio: ["Studio"],
  "1br": ["1BR"],
  "2br": ["2BR"],
  "3br": ["3BR"],
};

function scoreProperty(p: Property, ans: Record<number, string>): number {
  let s = 0;
  // Budget
  if (ans[0]) {
    const [min, max] = BUDGET_RANGE[ans[0]];
    if (p.startingPrice >= min && p.startingPrice <= max) s += 1;
  }
  // Timeline → RFO preference
  if (ans[2] === "rfo" && p.status === "rfo") s += 1;
  if ((ans[2] === "3to5" || ans[2] === "1to2") && p.status === "pre-selling") s += 1;
  // Location
  if (ans[3]) {
    const cities = LOCATION_MAP[ans[3]];
    if (cities.length === 0) s += 0.5;
    else if (cities.includes(p.location)) s += 1;
  }
  // Unit
  if (ans[4]) {
    const kws = UNIT_KEYWORDS[ans[4]];
    if (kws.some((k) => p.type.includes(k))) s += 1;
  }
  return s;
}

function matchProperties(ans: Record<number, string>) {
  return PROPERTIES.map((p) => ({ p, s: scoreProperty(p, ans) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => {
      if (b.s !== a.s) return b.s - a.s;
      // tiebreaker: rfo if user wants asap
      if (ans[2] === "rfo") return (a.p.status === "rfo" ? -1 : 1) - (b.p.status === "rfo" ? -1 : 1);
      return 0;
    })
    .slice(0, 3)
    .map((x) => x.p);
}

export function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [pending, setPending] = useState<string | null>(null);
  const [phase, setPhase] = useState<"in" | "out">("in");
  const [invalid, setInvalid] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "auto" }); }, []);

  useEffect(() => { setPending(answers[step] ?? null); setInvalid(false); }, [step, answers]);

  useEffect(() => {
    if (!invalid) return;
    const t = setTimeout(() => setInvalid(false), 3000);
    return () => clearTimeout(t);
  }, [invalid]);

  const total = STEPS.length;
  const progress = done ? 100 : Math.round(((step + (pending ? 0.5 : 0)) / total) * 100);

  const advance = (target: number | "done") => {
    setPhase("out");
    setTimeout(() => {
      if (target === "done") setDone(true);
      else setStep(target);
      setPhase("in");
    }, 250);
  };

  const onContinue = () => {
    if (!pending) { setInvalid(true); return; }
    const next = { ...answers, [step]: pending };
    setAnswers(next);
    if (step + 1 >= total) advance("done");
    else advance(step + 1);
  };

  const onBack = () => { if (step > 0) advance(step - 1); };

  const matches = useMemo(() => (done ? matchProperties(answers) : []), [done, answers]);

  return (
    <div data-header-theme="light" className="bg-[color:var(--pearl)]" style={{ minHeight: "calc(100vh - 88px)" }}>
      <div className="lg:flex" style={{ minHeight: "calc(100vh - 88px)" }}>
        {/* LEFT PANEL — desktop fixed, mobile banner */}
        <aside
          className="hidden lg:flex flex-col fixed left-0 top-0 h-dvh"
          style={{ width: "40%", background: "var(--obsidian)", padding: "48px 40px", zIndex: 10 }}
        >
          <a href="#/" className="block" style={{ width: 160 }} aria-label="Cityqlo home">
            <img src="/wordmark.png" alt="Cityqlo" className="logo--white" style={{ height: 36, width: "auto" }} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
            <span className="font-display italic" style={{ color: "var(--white)", fontSize: 26, letterSpacing: "0.02em" }}>Cityqlo</span>
          </a>

          <div style={{ marginTop: 32 }}>
            <div style={{ height: 1, background: "var(--graphite, #34393D)" }}>
              <div style={{ height: 1, background: "var(--accent-gold)", width: `${progress}%`, transition: "width 600ms var(--ease-luxury)" }} />
            </div>
            <p className="font-sans uppercase mt-3" style={{ fontSize: 10, letterSpacing: "0.25em", color: "rgba(156,163,175,0.6)" }}>
              {done ? "MATCHES READY" : `STEP ${step + 1} OF ${total}`}
            </p>
          </div>

          <div className="flex-1 flex flex-col justify-center" style={{ padding: "32px 0" }}>
            {done ? (
              <p className="font-display italic" style={{ fontWeight: 300, fontSize: "clamp(28px, 3vw, 40px)", color: "var(--white)", lineHeight: 1.3 }}>
                Your Matches
              </p>
            ) : (
              <>
                <p className="font-sans uppercase" style={{ fontSize: 10, letterSpacing: "0.25em", color: "rgba(156,163,175,0.5)" }}>
                  {STEPS[step].eyebrow}
                </p>
                <p
                  key={step}
                  className="mt-4 font-display italic"
                  style={{
                    fontWeight: 300, fontSize: "clamp(28px, 3vw, 40px)",
                    color: "var(--white)", lineHeight: 1.3,
                    animation: "quizFadeIn 400ms var(--ease-luxury)",
                  }}
                >
                  {STEPS[step].question}
                </p>
                <div style={{ borderTop: "1px solid var(--accent-gold)", width: 60, marginTop: 32, marginBottom: 24 }} />
                <div className="space-y-0">
                  {STEPS.map((s, i) => {
                    if (!answers[i]) return null;
                    const opt = s.options.find((o) => o.value === answers[i]);
                    return (
                      <div key={i} className="flex justify-between py-2" style={{ borderBottom: "1px solid #34393D" }}>
                        <span className="font-sans" style={{ fontSize: 12, color: "rgba(156,163,175,0.7)" }}>{s.summaryLabel}</span>
                        <span className="font-sans" style={{ fontSize: 12, color: "var(--white)" }}>{opt?.label}</span>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          <p className="font-sans text-center" style={{ fontWeight: 300, fontSize: 11, color: "rgba(156,163,175,0.35)" }}>
            Your answers are private and never stored.
          </p>
        </aside>

        {/* MOBILE TOP BANNER */}
        <div className="lg:hidden" style={{ background: "var(--obsidian)", padding: "20px 20px 16px" }}>
          <div className="flex items-center justify-between">
            <a href="#/" aria-label="Cityqlo home">
              <span className="font-display italic" style={{ color: "var(--white)", fontSize: 22 }}>Cityqlo</span>
            </a>
            <span className="font-sans uppercase" style={{ fontSize: 10, letterSpacing: "0.25em", color: "rgba(156,163,175,0.7)" }}>
              {done ? "MATCHES" : `${step + 1} / ${total}`}
            </span>
          </div>
          <div className="mt-3" style={{ height: 2, background: "#34393D" }}>
            <div style={{ height: 2, background: "var(--accent-gold)", width: `${progress}%`, transition: "width 600ms var(--ease-luxury)" }} />
          </div>
        </div>

        {/* RIGHT PANEL */}
        <section
          className="lg:ml-[40%] w-full lg:w-[60%]"
          style={{
            background: "var(--pearl)",
            padding: "40px 20px 100px",
            minHeight: "calc(100vh - 88px)",
          }}
        >
          <div className="mx-auto" style={{ maxWidth: 640, padding: "0", opacity: phase === "in" ? 1 : 0, transition: "opacity 400ms var(--ease-luxury)" }}>
            <div className="lg:px-10 lg:pt-10">
              {!done ? (
                <>
                  <p className="font-sans uppercase" style={{ fontSize: 10, letterSpacing: "0.25em", color: "rgba(35,90,144,0.7)", fontWeight: 400 }}>
                    {STEPS[step].eyebrow}
                  </p>
                  <h2 className="mt-3 font-display" style={{ fontWeight: 400, fontSize: "clamp(24px, 3vw, 36px)", color: "var(--ink-text)", lineHeight: 1.25 }}>
                    {STEPS[step].question}
                  </h2>
                  <div style={{ borderTop: "1px solid var(--linen)", marginTop: 24, marginBottom: 8 }} />

                  <div style={{ borderLeft: invalid ? "2px solid var(--accent-gold)" : "2px solid transparent", transition: "border-color 300ms" }}>
                    {STEPS[step].options.map((opt) => {
                      const sel = pending === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setPending(opt.value)}
                          className="w-full flex items-center text-left"
                          style={{
                            padding: "18px 12px",
                            borderBottom: "1px solid var(--linen)",
                            borderLeft: sel ? "2px solid var(--accent-gold)" : "2px solid transparent",
                            background: sel ? "rgba(212,160,23,0.04)" : "transparent",
                            transition: "all 350ms var(--ease-luxury)",
                            minHeight: 56,
                          }}
                        >
                          <span
                            aria-hidden
                            className="shrink-0 flex items-center justify-center"
                            style={{
                              width: 18, height: 18, borderRadius: "50%",
                              border: `1px solid ${sel ? "var(--accent-gold)" : "var(--logo-blue)"}`,
                              background: sel ? "var(--accent-gold)" : "transparent",
                              transition: "all 350ms var(--ease-luxury)",
                            }}
                          >
                            {sel && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />}
                          </span>
                          <span className="ml-4 flex-1 font-sans" style={{ fontSize: 15, color: sel ? "var(--accent-gold)" : "var(--ink-text)", lineHeight: 1.5 }}>
                            {opt.label}
                          </span>
                          {opt.sub && (
                            <span className="ml-3 font-sans" style={{ fontWeight: 300, fontSize: 12, color: "var(--ash)" }}>{opt.sub}</span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {invalid && (
                    <p className="font-sans uppercase mt-4" style={{ fontSize: 10, letterSpacing: "0.25em", color: "var(--silver)", animation: "quizFadeIn 300ms var(--ease-luxury)" }}>
                      PLEASE SELECT AN OPTION TO CONTINUE
                    </p>
                  )}

                  <div className="mt-12 flex items-center justify-between gap-4">
                    {step > 0 ? (
                      <button onClick={onBack} className="font-sans uppercase" style={{ fontSize: 12, letterSpacing: "0.2em", color: "var(--silver)", background: "transparent", border: 0 }}>
                        ← PREVIOUS
                      </button>
                    ) : <span />}
                    <button onClick={onContinue} className="btn-primary" style={{ minWidth: 200 }}>
                      {step + 1 === total ? "See Matches →" : "Continue →"}
                    </button>
                  </div>
                </>
              ) : (
                <ResultView matches={matches} answers={answers} />
              )}
            </div>
          </div>
        </section>
      </div>

      <style>{`@keyframes quizFadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }`}</style>
    </div>
  );
}

function ResultView({ matches, answers }: { matches: Property[]; answers: Record<number, string> }) {
  if (matches.length === 0) {
    return (
      <div className="text-center" style={{ padding: "60px 20px" }}>
        <p className="font-display italic" style={{ fontWeight: 300, fontSize: "clamp(22px, 3vw, 28px)", color: "var(--ink-text)", lineHeight: 1.3 }}>
          We couldn't pinpoint an exact match — but Jerwin can.
        </p>
        <p className="mt-4 font-sans" style={{ fontSize: 14, color: "var(--ash)" }}>
          A quick WhatsApp conversation will narrow your options faster than another quiz.
        </p>
        <a
          href={`${WHATSAPP_URL}?text=${encodeURIComponent("Hi Jerwin, I just finished the Cityqlo quiz but didn't see a clear match. Can you help me find the right unit?")}`}
          target="_blank" rel="noopener noreferrer"
          className="text-link mt-8 inline-flex" style={{ color: "var(--accent-gold)" }}
        >
          Speak with Jerwin →
        </a>
      </div>
    );
  }

  const names = matches.map((m) => m.name).join(", ");
  const waUrl = `${WHATSAPP_URL}?text=${encodeURIComponent(
    `Hi Jerwin! I just completed the Cityqlo Condo Quiz and got matched with ${names}. I'd love your expert advice.`
  )}`;
  void answers;

  return (
    <div>
      <p className="font-sans uppercase" style={{ fontSize: 10, letterSpacing: "0.25em", color: "rgba(35,90,144,0.7)" }}>YOUR MATCHES</p>
      <h2 className="mt-3 font-display" style={{ fontWeight: 400, fontSize: "clamp(24px, 3vw, 36px)", color: "var(--ink-text)" }}>
        {matches.length === 1 ? "1 development matched your profile." : `${matches.length} developments matched your profile.`}
      </h2>
      <div style={{ borderTop: "1px solid var(--linen)", marginTop: 24 }} />

      <div className="mt-8 flex flex-col" style={{ gap: 24 }}>
        {matches.map((p, i) => (
          <a
            key={p.id}
            href={`#/property-detail/${p.id}`}
            className="flex flex-col sm:flex-row overflow-hidden bg-white"
            style={{ border: "1px solid var(--linen)", borderRadius: 2 }}
          >
            <div className="sm:w-[35%]" style={{ minHeight: 180, background: "var(--bone)" }}>
              <img src={p.image} alt={p.name} className="w-full h-full object-cover" style={{ minHeight: 180 }} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
            </div>
            <div className="sm:w-[65%]" style={{ padding: 24 }}>
              <span
                className="font-sans uppercase inline-flex"
                style={{
                  fontSize: 10, letterSpacing: "0.22em", padding: "4px 10px", borderRadius: 2,
                  border: `1px solid ${i === 0 ? "var(--accent-teal)" : "var(--logo-blue)"}`,
                  color: i === 0 ? "var(--accent-teal)" : "var(--logo-blue)",
                }}
              >
                {i === 0 ? "STRONG MATCH" : "GOOD MATCH"}
              </span>
              <h3 className="mt-3 font-display" style={{ fontWeight: 600, fontSize: 22, color: "var(--ink-text)" }}>{p.name}</h3>
              <p className="mt-1 font-sans" style={{ fontSize: 12, color: "var(--ash)" }}>{p.location} · {p.area}</p>
              <p className="mt-3 font-display" style={{ fontWeight: 300, fontSize: 20, color: "var(--ink-text)" }}>{p.priceLabel}</p>
              <div className="mt-3">
                <span className={p.status === "rfo" ? "badge-rfo" : "badge-preselling"}>
                  {p.status === "rfo" ? "RFO" : "Pre-Selling"}
                </span>
              </div>
              <p className="mt-5 font-sans" style={{ fontSize: 13, color: "var(--logo-blue)", fontWeight: 500 }}>
                View Full Details →
              </p>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-10 text-center">
        <p className="font-display italic" style={{ fontWeight: 300, fontSize: 18, color: "var(--ash)" }}>
          Want expert guidance on these picks?
        </p>
        <div className="mt-5" style={{ maxWidth: 420, margin: "0 auto" }}>
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
            Discuss these results with Jerwin →
          </a>
        </div>
        <p className="mt-4 font-sans" style={{ fontSize: 11, color: "var(--silver)" }}>
          No commitment. Zero pressure. Free consultation.
        </p>
      </div>
    </div>
  );
}
