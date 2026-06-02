import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX; mouseY = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    };
    let raf: number;
    const tick = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ringRef.current) ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!ringRef.current) return;
      ringRef.current.classList.remove("is-link", "is-image");
      if (t.closest("a, button, [role=button]")) {
        ringRef.current.classList.add("is-link");
        ringRef.current.textContent = "Open";
      } else if (t.closest("img, picture, video")) {
        ringRef.current.classList.add("is-image");
        ringRef.current.textContent = "View";
      } else {
        ringRef.current.textContent = "";
      }
    };
    window.addEventListener("mouseover", onOver);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <>
      <div id="custom-cursor" ref={dotRef} aria-hidden />
      <div id="custom-cursor-ring" ref={ringRef} aria-hidden />
    </>
  );
}

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)) * 100;
      if (ref.current) ref.current.style.height = `${pct}%`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div id="scroll-progress" ref={ref} aria-hidden />;
}

export function PageTransition() {
  // Phase 5: fire the overlay immediately on any hash-route link click,
  // never wait for the route to load. Skips external/new-tab/modified clicks.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement | null)?.closest?.("a") as HTMLAnchorElement | null;
      if (!a) return;
      if (a.target && a.target !== "_self") return;
      const href = a.getAttribute("href") || "";
      if (!href.startsWith("#/")) return;
      const current = window.location.hash || "#/";
      if (href === current) return;
      const overlay = document.getElementById("page-transition");
      if (!overlay) return;
      overlay.classList.remove("is-entering");
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      void overlay.offsetWidth;
      overlay.classList.add("is-entering");
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return <div id="page-transition" aria-hidden />;
}

export function RevealOnScroll() {
  // Adds .active to any .v3-reveal element when intersecting
  useEffect(() => {
    const observed = new WeakSet<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("active");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );
    const scan = () => {
      document.querySelectorAll<HTMLElement>(".v3-reveal").forEach((el) => {
        if (!observed.has(el)) { observed.add(el); io.observe(el); }
      });
    };
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, []);
  return null;
}
