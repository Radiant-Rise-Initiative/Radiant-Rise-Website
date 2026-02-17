import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/layout/hero";
import { ImpactStats } from "@/components/layout/impact-stats";
import { CompanyScroller } from "@/components/layout/company-scroller";
import { Testimonials } from "@/components/layout/testimonials";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <ImpactStats />
      <CompanyScroller />
      <Testimonials />
    </main>
  );
}
