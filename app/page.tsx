import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/layout/hero";
import { ImpactStats } from "@/components/layout/impact-stats";
import { SuccessStories } from "@/components/layout/success-stories";
import { CompanyScroller } from "@/components/layout/company-scroller";
import { Testimonials } from "@/components/layout/testimonials";
import { RecentNews } from "@/components/layout/recent-news";
import { FAQ } from "@/components/layout/faq";
import { Contact } from "@/components/layout/contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <ImpactStats />
      <SuccessStories />
      <CompanyScroller />
      <Testimonials />
      <RecentNews />
      <FAQ />
      <Contact />
    </main>
  );
}
