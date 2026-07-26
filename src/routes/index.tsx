import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { TrustBar } from "@/components/site/TrustBar";
import { About } from "@/components/site/About";
import { Gallery } from "@/components/site/Gallery";
import { SignatureDishes } from "@/components/site/SignatureDishes";
import { FullMenu } from "@/components/site/FullMenu";
import { Reviews } from "@/components/site/Reviews";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { Occasions } from "@/components/site/Occasions";
import { FinalCta } from "@/components/site/FinalCta";
import { FindUs } from "@/components/site/FindUs";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { RajasthaniBorder } from "@/components/site/RajasthaniBorder";
import { PerformanceReporter } from "@/components/site/PerformanceReporter";
import {
  DesktopDoodleScatter,
  MobileDoodleScatter,
} from "@/components/site/RajasthaniDoodles";

const SITE_URL = "https://kalashkuisine.lovable.app";
const OG_IMAGE = `${SITE_URL}/og-cover.jpg`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": `${SITE_URL}/#restaurant`,
  name: "Kalash Kuisine",
  alternateName: "Kalash Kuisine Restaurant",
  description:
    "Premium North Indian, Rajasthani & Continental family restaurant in Mansarovar, Jaipur. Perfect for family dinners, birthdays, kitty parties and celebrations.",
  url: SITE_URL,
  image: [OG_IMAGE],
  logo: `${SITE_URL}/favicon.ico`,
  servesCuisine: ["North Indian", "Rajasthani", "Continental", "Chinese", "Italian"],
  priceRange: "₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, Credit Card, Debit Card, UPI",
  telephone: "+91-91166-68293",
  email: "hello@kalashkuisine.in",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Opposite Neerja Modi School, Shipra Path",
    addressLocality: "Mansarovar",
    addressRegion: "Rajasthan",
    postalCode: "302020",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 26.8574,
    longitude: 75.7712,
  },
  hasMap:
    "https://www.google.com/maps/search/?api=1&query=Kalash+Kuisine+Mansarovar+Jaipur",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "11:00",
      closes: "23:00",
    },
  ],
  acceptsReservations: "True",
  menu: `${SITE_URL}/#menu`,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "302",
    bestRating: "5",
    worstRating: "1",
  },
  sameAs: [
    "https://instagram.com/kalashkuisine",
    "https://www.zomato.com/jaipur/kalash-kuisine-restaurant-mansarovar",
    "https://www.swiggy.com/city/jaipur/kalash-kuisine-restaurant-manasarovar-rest1310146",
  ],
  areaServed: {
    "@type": "City",
    name: "Jaipur",
  },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content:
          "Warm elegant interior of Kalash Kuisine restaurant in Mansarovar, Jaipur",
      },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(jsonLd),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbLd),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <PerformanceReporter />
      <Nav />
      <main id="top" className="relative overflow-hidden">
        {/* Ornamental maroon doodles — large on desktop, small scattered on mobile */}
        <DesktopDoodleScatter />
        <MobileDoodleScatter />


        <Hero />
        <TrustBar />
        <About />
        <RajasthaniBorder tone="maroon-to-cream" />
        <Gallery />
        <RajasthaniBorder tone="cream-to-maroon" />
        <SignatureDishes />
        <RajasthaniBorder tone="maroon" />
        <FullMenu />
        <RajasthaniBorder tone="maroon-to-cream" />
        <Reviews />
        <RajasthaniBorder tone="cream-to-maroon" />
        <WhyChooseUs />
        <RajasthaniBorder tone="maroon-to-cream" />
        <Occasions />
        <RajasthaniBorder tone="cream-to-maroon" />
        <FinalCta />
        <RajasthaniBorder tone="maroon" />
        <FindUs />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
