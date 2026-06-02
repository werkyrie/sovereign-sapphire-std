import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { CustomCursor, ScrollProgress, PageTransition, RevealOnScroll } from "@/components/layout/GlobalEffects";
import { PropertyDetail } from "@/components/property-detail/PropertyDetail";
import { Quiz } from "@/components/quiz/Quiz";
import { Insights } from "@/components/insights/Insights";
import { Compare } from "@/components/compare/Compare";
import { Guides } from "@/components/guides/Guides";
import { LocationDetail } from "@/components/locations/LocationDetail";

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-[color:var(--pearl)] px-4" data-header-theme="light">
      <div className="max-w-md text-center">
        {/* N-10: use --ash, not --linen */}
        <h1 className="font-display" style={{ fontWeight: 300, fontSize: "clamp(96px, 18vw, 180px)", color: "var(--ash)", lineHeight: 1 }}>404</h1>
        <p className="mt-6 font-display italic" style={{ color: "var(--ink-text)", fontSize: "clamp(20px, 3vw, 28px)" }}>
          The page you're looking for isn't here.
        </p>
        <span className="state-error-label">Cityqlo · navigation</span>
        <div className="mt-8">
          <Link to="/" className="btn-primary">Return Home</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-[color:var(--pearl)] px-4">
      <div className="state-error max-w-lg">
        Something didn't load as expected.
        <span className="state-error-label">Try again in a moment</span>
        <div className="mt-8 flex justify-center gap-3">
          <button onClick={() => { router.invalidate(); reset(); }} className="btn-primary">Try again</button>
          <a href="/" className="btn-ghost-light">Home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Cityqlo — DMCI Homes Advisory for Metro Manila & OFW Buyers" },
      { name: "description", content: "Independent DMCI Homes accredited advisory pairing Metro Manila buyers and OFWs with the right condominium — zero pressure, radical honesty." },
      { name: "author", content: "Cityqlo" },
      { property: "og:title", content: "Cityqlo — DMCI Homes Advisory for Metro Manila & OFW Buyers" },
      { property: "og:description", content: "Independent DMCI Homes accredited advisory pairing Metro Manila buyers and OFWs with the right condominium — zero pressure, radical honesty." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Cityqlo — DMCI Homes Advisory for Metro Manila & OFW Buyers" },
      { name: "twitter:description", content: "Independent DMCI Homes accredited advisory pairing Metro Manila buyers and OFWs with the right condominium — zero pressure, radical honesty." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/487aaf7e-b184-437f-97eb-d2aa35a43f97/id-preview-8d16228f--23a1ff2b-3603-442a-a65d-3c6207d402d7.lovable.app-1780374609352.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/487aaf7e-b184-437f-97eb-d2aa35a43f97/id-preview-8d16228f--23a1ff2b-3603-442a-a65d-3c6207d402d7.lovable.app-1780374609352.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main className="min-h-dvh pt-[72px] lg:pt-[88px] pb-16 lg:pb-0">
        <HashRoutes />
      </main>
      <Footer />
      <MobileBottomNav />
      <CustomCursor />
      <ScrollProgress />
      <PageTransition />
      <RevealOnScroll />
    </QueryClientProvider>
  );
}

function HashRoutes() {
  const [hash, setHash] = useState<string>("");
  useEffect(() => {
    setHash(window.location.hash);
    const onChange = () => {
      setHash(window.location.hash);
      window.scrollTo({ top: 0, behavior: "auto" });
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  const detailMatch = hash.match(/^#\/property-detail\/([^?#]+)/);
  if (detailMatch) return <PropertyDetail id={decodeURIComponent(detailMatch[1])} />;
  const locMatch = hash.match(/^#\/locations\/([^?#]+)/);
  if (locMatch) return <LocationDetail slug={decodeURIComponent(locMatch[1])} />;
  if (hash.startsWith("#/quiz")) return <Quiz />;
  if (hash.startsWith("#/insights")) return <Insights />;
  if (hash.startsWith("#/compare")) return <Compare />;
  if (hash.startsWith("#/guides")) return <Guides />;
  return <Outlet />;
}
