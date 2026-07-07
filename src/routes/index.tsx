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
import {
  ElephantDoodle,
  PeacockDoodle,
  PaisleyDoodle,
} from "@/components/site/RajasthaniDoodles";

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
      <main id="top" className="relative overflow-hidden">
        {/* Desktop-only ornamental doodles — subtle maroon silhouettes */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden lg:block"
        >
          <PeacockDoodle className="absolute left-[-40px] top-[720px] w-40 text-[color:var(--primary)] opacity-[0.06]" />
          <ElephantDoodle className="absolute right-[-30px] top-[1500px] w-56 text-[color:var(--primary)] opacity-[0.07]" />
          <PaisleyDoodle className="absolute left-[-20px] top-[2600px] w-32 text-[color:var(--gold)] opacity-[0.18]" />
          <PeacockDoodle className="absolute right-[-30px] top-[3600px] w-40 text-[color:var(--turquoise)] opacity-[0.08]" />
          <ElephantDoodle className="absolute left-[-30px] top-[4700px] w-52 text-[color:var(--primary)] opacity-[0.06]" />
          <PaisleyDoodle className="absolute right-[-10px] top-[5600px] w-32 text-[color:var(--gold)] opacity-[0.18]" />
        </div>

        <Hero />
        <TrustBar />
        <About />
        <RajasthaniBorder />
        <Gallery />
        <RajasthaniBorder />
        <SignatureDishes />
        <RajasthaniBorder />
        <FullMenu />
        <RajasthaniBorder />
        <Reviews />
        <RajasthaniBorder />
        <WhyChooseUs />
        <RajasthaniBorder />
        <Occasions />
        <RajasthaniBorder />
        <FinalCta />
        <RajasthaniBorder />
        <FindUs />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
