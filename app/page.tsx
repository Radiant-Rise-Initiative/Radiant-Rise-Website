import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/layout/Hero";
import { ImpactStats } from "@/components/layout/ImpactStats";
import { OurStory } from "@/components/layout/OurStory";
import { OurValuesTabs } from "@/components/layout/OurValuesTabs";
import { TargetScroller } from "@/components/layout/TargetScroller";
import { ImpactMilestones } from "@/components/layout/ImpactMilestones";
import { RecentNews } from "@/components/layout/RecentNews";
import { GotQuestions } from "@/components/layout/GotQuestions";
import { ConnectForm } from "@/components/layout/ConnectForm";
import { LetsRiseMarquee } from "@/components/layout/LetsRiseMarquee";
import { Footer } from "@/components/layout/Footer";
import { GiantLogoSection } from "@/components/layout/GiantLogoSection";
import { WhoWeAre } from "@/components/layout/WhoWeAre";
import { OurGallery } from "@/components/layout/OurGallery";
import { PurposeSection } from "@/components/layout/PurposeSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <PurposeSection />
      <ImpactStats />
      <WhoWeAre />
      <OurStory />
      <OurValuesTabs />
      <TargetScroller />
      <ImpactMilestones />
      <RecentNews />
      <OurGallery />
      <GotQuestions />
      <ConnectForm />
      <LetsRiseMarquee />
      <Footer />
      <GiantLogoSection />
    </main>
  );
}
