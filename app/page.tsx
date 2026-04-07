import { getSections, getNews } from "@/lib/supabase";
import { newsItems } from "@/lib/newsData";
import { siteDefaults } from "@/lib/siteDefaults";

import { s } from "@/lib/utils/sanitizer";
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
  const ourValues = { ...siteDefaults.our_values, ...sections.our_values };
  const ourTargets = { ...siteDefaults.our_targets, ...sections.our_targets };
  const impactMilestones = { ...siteDefaults.impact_milestones, ...sections.impact_milestones };
  const gallery = { ...siteDefaults.gallery, ...sections.gallery };
  const gotQuestions = { ...siteDefaults.got_questions, ...sections.got_questions };
  
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
        overallMetric={{
          label: s(impact.metric_label),
          value: s(impact.metric_value)
        }}
        stats={impact.stats?.map((stat: any) => ({
          ...stat,
          label: s(stat.label),
          value: s(stat.value),
          modalTitle: s(stat.modalTitle),
          description: s(stat.description)
        }))}

      />
      <WhoWeAre 
        title={s(whoWeAre.title)}
        description={s(whoWeAre.description)}
        imageSrc={s(whoWeAre.image_url)}
        items={whoWeAre.items?.map((item: any) => ({
          ...item,
          title: s(item.title),
          description: s(item.description),
          modalTagline: s(item.modalTagline),
          modalTitle: s(item.modalTitle),
          modalText: s(item.modalText)
        }))}
      />
      <OurValuesTabs 
        title={s(ourValues.title)}
        description={s(ourValues.description)}
        tabs={ourValues.tabs?.map((tab: any) => ({
          ...tab,
          label: s(tab.label),
          headline: s(tab.headline),
          bottomTagline: s(tab.bottomTagline),
          features: tab.features?.map((feat: any) => ({
            ...feat,
            title: s(feat.title),
            text: s(feat.text)
          }))
        }))}
      />
      <TargetScroller 
        title={s(ourTargets.title)}
        linkText={s(ourTargets.linkText)}
        href={s(ourTargets.href)}
        items={(ourTargets.items || []).map((item: any) => ({
          ...item,
          name: s(item.name),
          category: s(item.category),
          logo: s(item.logo),
          description: s(item.description),
          image: s(item.image)
        }))}
      />
      <ImpactMilestones 
        sectionLabel={s(impactMilestones.sectionLabel)}
        testimonials={(impactMilestones.testimonials || []).map((item: any) => ({
          ...item,
          category: s(item.category),
          quote: s(item.quote),
          role: s(item.role),
          company: s(item.company),
          image: s(item.image)
        }))}
      />
      <RecentNews initialNews={finalNews} />
      <OurGallery items={gallery.items} />
      <GotQuestions 
        title={s(gotQuestions.title)}
        linkText={s(gotQuestions.linkText)}
        href={s(gotQuestions.href)}
        items={(gotQuestions.items || []).map((item: any) => ({
          ...item,
          question: s(item.question),
          answer: s(item.answer)
        }))}
      />
      <ConnectForm />
      <LetsRiseMarquee />
      <Footer />
      <GiantLogoSection />
    </main>
  );
}
