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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Kalash Kuisine",
  description:
    "Premium North Indian & Continental family restaurant in Mansarovar, Jaipur.",
  servesCuisine: ["North Indian", "Continental", "Chinese", "Italian"],
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Opposite Neerja Modi School, Shipra Path",
    addressLocality: "Mansarovar, Jaipur",
    addressRegion: "Rajasthan",
    postalCode: "302020",
    addressCountry: "IN",
  },
  telephone: "+91-98765-43210",
  openingHours: "Mo-Su 11:00-23:00",
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "302" },
};

export const Route = createFileRoute("/")({
  head: () => ({
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(jsonLd),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <TrustBar />
        <About />
        <Gallery />
        <SignatureDishes />
        <FullMenu />
        <Reviews />
        <WhyChooseUs />
        <Occasions />
        <FinalCta />
        <FindUs />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
