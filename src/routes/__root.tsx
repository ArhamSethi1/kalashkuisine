import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { responsiveImages } from "@/data/responsive-images";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
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
      { name: "theme-color", content: "#6B1F2A" },
      {
        title:
          "Kalash Kuisine — Best Restaurant in Mansarovar, Jaipur | North Indian & Continental",
      },
      {
        name: "description",
        content:
          "Kalash Kuisine — premium family restaurant in Mansarovar, Jaipur. Authentic North Indian, Rajasthani & Continental cuisine. 4.9★ on Google. Book a table, order on Swiggy or Zomato. Open 11 AM–11 PM.",
      },
      {
        name: "keywords",
        content:
          "restaurant in Mansarovar, best restaurant Jaipur, North Indian restaurant Jaipur, family restaurant Mansarovar, Rajasthani thali Jaipur, Kalash Kuisine, dine out Mansarovar, birthday party restaurant Jaipur",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "author", content: "Kalash Kuisine" },
      { name: "geo.region", content: "IN-RJ" },
      { name: "geo.placename", content: "Mansarovar, Jaipur" },
      { name: "geo.position", content: "26.8574;75.7712" },
      { name: "ICBM", content: "26.8574, 75.7712" },
      {
        property: "og:title",
        content: "Kalash Kuisine — Premium Dining in Mansarovar, Jaipur",
      },
      {
        property: "og:description",
        content:
          "Authentic North Indian & Continental cuisine, warm hospitality and memorable dining experiences in the heart of Mansarovar, Jaipur.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Kalash Kuisine" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Kalash Kuisine — Premium Dining in Mansarovar, Jaipur",
      },
      {
        name: "twitter:description",
        content:
          "Authentic flavours, warm hospitality, and memorable dining experiences — all under one roof.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "preconnect", href: "https://lovable.app" },
      {
        rel: "preload",
        as: "image",
         href: responsiveImages["hero-mobile"].src,
         imageSrcSet: responsiveImages["hero-mobile"].srcSet,
         imageSizes: "100vw",
        media: "(max-width: 639px)",
        fetchPriority: "high",
      } as Record<string, string>,
      {
        rel: "preload",
        as: "image",
         href: responsiveImages["hero-desktop"].src,
         imageSrcSet: responsiveImages["hero-desktop"].srcSet,
         imageSizes: "100vw",
        media: "(min-width: 640px)",
        fetchPriority: "high",
      } as Record<string, string>,
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@400;500;600;700&display=swap",
      },
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
      <head>
        <HeadContent />
      </head>
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
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
