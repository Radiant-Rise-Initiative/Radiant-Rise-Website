import { getSections, getNews } from "@/lib/supabase";
import { newsItems } from "@/lib/newsData";
import { siteDefaults } from "@/lib/siteDefaults";

// Data Sanitization Failsafe
const s = (val: any): any => {
  if (typeof val !== 'string') return val;
  // ONLY replace the specifically broken path used in the CMS for the video section
  if (val.includes('Hero 06.jpg')) {
    return '/assets/images/thumbnails/thumbnail_story.jpg';
  }
  if (val.includes('About TN.jpg')) {
    return '/assets/images/thumbnails/thumbnail_about.jpg';
  }
  return val
<<<<<<< HEAD
    .replace(/Hero 06\.jpg/g, 'hero_006.jpg')
=======
>>>>>>> b68987f (1.4.6 - Fix corrupted sanitizer and standardize thumbnail filenames)
    .replace(/[\u00A0\u1680\u180E\u2000-\u200B\u202F\u205F\u3000\uFEFF]/g, ' ')
    .trim();
};
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
  
  // Merge Supabase content over robust internal defaults
  const hero = { ...siteDefaults.hero, ...sections.hero };
  const purpose = { ...siteDefaults.purpose, ...sections.purpose };
  const impact = { ...siteDefaults.impact_stats, ...sections.impact_stats };
  const whoWeAre = { ...siteDefaults.who_we_are, ...sections.who_we_are };
  const theoriesOfChange = { ...siteDefaults.theories_of_change, ...sections.theories_of_change };
  
  const newsData = await getNews();
  const finalNews = (newsData && newsData.length > 0) ? newsData : newsItems.slice(0, 3);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero 
        title={s(hero.headline || hero.title)}
        slides={hero.slides?.map((slide: any) => ({
          ...slide,
          image: s(slide.image),
          description: s(slide.description)
        }))}
      />
      <PurposeSection 
        videoSrc={s(purpose.video_url)} 
        imageSrc={s(purpose.image_url)}
        title={s(purpose.title)}
        description={s(purpose.description)}
        infoPoints={[purpose.info_point_1, purpose.info_point_2].filter(Boolean).map(s)}
      />
      <TheoriesOfChange 
        title={s(theoriesOfChange.title)}
        description={s(theoriesOfChange.description)}
        items={theoriesOfChange.items?.map((item: any) => ({
          ...item,
          stage: s(item.stage),
          name: s(item.name),
          includes: s(item.includes)
        }))}
      />
      <ImpactStats 
        title={s(impact.title)}
        description={s(impact.description)}
        imageSrc={s(impact.image_url)}
        overallMetric={{
          label: s(impact.metric_label),
          value: s(impact.metric_value)
        }}
      />
      <WhoWeAre 
        title={s(whoWeAre.title)}
        description={s(whoWeAre.description)}
        imageSrc={s(whoWeAre.image_url)}
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
