import { getSections, getNews } from "@/lib/supabase";
import { newsItems } from "@/lib/newsData";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/layout/Hero";
import { ImpactStats } from "@/components/layout/ImpactStats";
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
import { TheoriesOfChange } from "@/components/layout/TheoriesOfChange";

export default async function Home() {
  const sections = await getSections();
  const heroData = sections.hero || {};
  const purposeData = sections.purpose || {};
  const impactData = sections.impact_stats || {};
  const whoWeAreData = sections.who_we_are || {};
  const newsData = await getNews();
  const finalNews = (newsData && newsData.length > 0) ? newsData : newsItems.slice(0, 3);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero 
        title={heroData.headline}
        slides={heroData.slides}
      />
      <PurposeSection 
        videoSrc={purposeData.video_url || "/assets/images/video_stories/Radiant Rise Story.mp4"} 
        imageSrc={purposeData.image_url || "/assets/images/hero_images/hero_006.jpg"}
        title={purposeData.title}
        description={purposeData.description}
        infoPoints={[purposeData.info_point_1, purposeData.info_point_2].filter(Boolean)}
      />
      <TheoriesOfChange />
      <ImpactStats 
        title={impactData.title}
        description={impactData.description}
        imageSrc={impactData.image_url}
        overallMetric={{
          label: impactData.metric_label,
          value: impactData.metric_value
        }}
      />
      <WhoWeAre 
        title={whoWeAreData.title}
        description={whoWeAreData.description}
        imageSrc={whoWeAreData.image_url}
      />
      <OurValuesTabs />
      <TargetScroller />
      <ImpactMilestones />
      <RecentNews initialNews={finalNews} />
      <OurGallery items={sections.gallery?.items} />
      <GotQuestions />
      <ConnectForm />
      <LetsRiseMarquee />
      <Footer />
      <GiantLogoSection />
    </main>
  );
}
