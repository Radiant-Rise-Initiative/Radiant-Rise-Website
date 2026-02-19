import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/layout/hero";
import { ImpactStats } from "@/components/layout/impact-stats";
import { SuccessStories } from "@/components/layout/success-stories";
import { AutomatedTabs } from "@/components/layout/automated-tabs";
import { CompanyScroller } from "@/components/layout/company-scroller";
import { Testimonials } from "@/components/layout/testimonials";
import { RecentNews } from "@/components/layout/recent-news";
import { FAQ } from "@/components/layout/faq";
import { Contact } from "@/components/layout/contact";
import { Footer } from "@/components/layout/footer";
import { GiantLogoSection } from "@/components/layout/giant-logo-section";
import { WhoWeAre } from "@/components/layout/who-we-are";
import { Gallery } from "@/components/layout/gallery";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <ImpactStats />
      <WhoWeAre />
      <SuccessStories />
      <AutomatedTabs />
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
