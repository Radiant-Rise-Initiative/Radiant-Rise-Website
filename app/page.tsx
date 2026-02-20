import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/layout/Hero";
import { ImpactStats } from "@/components/layout/ImpactStats";
import { ImpactStories } from "@/components/layout/ImpactStories";
import { WhoWeAreTabs } from "@/components/layout/WhoWeAreTabs";
import { CompanyScroller } from "@/components/layout/CompanyScroller";
import { Testimonials } from "@/components/layout/Testimonials";
import { RecentNews } from "@/components/layout/RecentNews";
import { FAQ } from "@/components/layout/Faq";
import { Contact } from "@/components/layout/Contact";
import { Footer } from "@/components/layout/Footer";
import { GiantLogoSection } from "@/components/layout/GiantLogoSection";
import { OurIdentity } from "@/components/layout/OurIdentity";
import { Gallery } from "@/components/layout/Gallery";
import { PurposeSection } from "@/components/layout/PurposeSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <PurposeSection />
      <ImpactStats />
      <OurIdentity />
      <ImpactStories />
      <WhoWeAreTabs />
      <CompanyScroller />
      <Testimonials />
      <RecentNews />
      <Gallery />
      <FAQ />
      <Contact />
      <Footer />
      <GiantLogoSection />
    </main>
  );
}
