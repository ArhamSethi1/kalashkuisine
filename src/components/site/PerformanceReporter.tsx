import { useEffect } from "react";
import heroDesktopAsset from "@/assets/hero-desktop.webp.asset.json";
import heroMobileAsset from "@/assets/hero-mobile.webp.asset.json";
import g1 from "@/assets/gallery-facade.webp.asset.json";
import g2 from "@/assets/gallery-mural.webp.asset.json";
import g3 from "@/assets/gallery-window.webp.asset.json";
import g4 from "@/assets/gallery-signage2.webp.asset.json";
import g5 from "@/assets/gallery-booth.webp.asset.json";
import g6 from "@/assets/gallery-corridor.webp.asset.json";
import g7 from "@/assets/dish-thali.webp.asset.json";
import g8 from "@/assets/dish-paneer.webp.asset.json";
import m1 from "@/assets/moments-shake.webp.asset.json";
import m2 from "@/assets/moments-signage.webp.asset.json";
import m3 from "@/assets/moments-decor.webp.asset.json";
import s1 from "@/assets/moment-jan27.webp.asset.json";
import s2 from "@/assets/moment-2398.webp.asset.json";
import s3 from "@/assets/moment-5135.webp.asset.json";
import s4 from "@/assets/moment-5195.webp.asset.json";
import s5 from "@/assets/moment-5249.webp.asset.json";
import s6 from "@/assets/moment-5303.webp.asset.json";
import s7 from "@/assets/moment-jan03.webp.asset.json";

type LargestContentfulPaintEntry = PerformanceEntry & {
  size?: number;
  url?: string;
  element?: Element;
};

type LayoutShiftEntry = PerformanceEntry & {
  value: number;
  hadRecentInput: boolean;
};

const HERO_IMAGE_URLS = [heroDesktopAsset.url, heroMobileAsset.url];
const GALLERY_IMAGE_URLS = [
  g1.url,
  g2.url,
  g3.url,
  g4.url,
  g5.url,
  g6.url,
  g7.url,
  g8.url,
  m1.url,
  m2.url,
  m3.url,
  s1.url,
  s2.url,
  s3.url,
  s4.url,
  s5.url,
  s6.url,
  s7.url,
];

const TRACKED_IMAGES = [
  ...HERO_IMAGE_URLS.map((url) => ({ url, group: "hero" })),
  ...GALLERY_IMAGE_URLS.map((url) => ({ url, group: "gallery" })),
];

function summarizeImages() {
  const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];

  return TRACKED_IMAGES.flatMap(({ url, group }) => {
    const entry = resources.find((item) => item.name.includes(url));
    if (!entry) return [];

    return [
      {
        group,
        file: url.split("/").pop() ?? url,
        durationMs: Math.round(entry.duration),
        loadEndMs: Math.round(entry.responseEnd),
        transferKb: Math.round((entry.transferSize || entry.encodedBodySize || 0) / 1024),
        decodedKb: Math.round((entry.decodedBodySize || 0) / 1024),
      },
    ];
  });
}

export function PerformanceReporter() {
  useEffect(() => {
    if (typeof PerformanceObserver === "undefined") return;

    let lcp: LargestContentfulPaintEntry | null = null;
    let cls = 0;
    const observers: PerformanceObserver[] = [];

    const report = () => {
      const payload = {
        lcpMs: lcp ? Math.round(lcp.startTime) : null,
        lcpSize: lcp?.size ?? null,
        cls: Number(cls.toFixed(4)),
        images: summarizeImages(),
      };

      console.info("[Kalash performance] Hero + gallery metrics", payload);
    };

    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries() as LargestContentfulPaintEntry[];
        const latest = entries.at(-1);
        if (latest) lcp = latest;
      });
      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
      observers.push(lcpObserver);
    } catch {
      // The metric is optional on older browsers.
    }

    try {
      const clsObserver = new PerformanceObserver((list) => {
        (list.getEntries() as LayoutShiftEntry[]).forEach((entry) => {
          if (!entry.hadRecentInput) cls += entry.value;
        });
      });
      clsObserver.observe({ type: "layout-shift", buffered: true });
      observers.push(clsObserver);
    } catch {
      // The metric is optional on older browsers.
    }

    const loadTimer = window.setTimeout(report, 4500);
    const hideReport = () => report();
    window.addEventListener("pagehide", hideReport, { once: true });

    return () => {
      window.clearTimeout(loadTimer);
      window.removeEventListener("pagehide", hideReport);
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return null;
}