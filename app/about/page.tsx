import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/layout/Hero";
import { Footer } from "@/components/layout/Footer";
import { AboutMissionVision } from "@/components/layout/AboutMissionVision";
import { AboutInfoImage } from "@/components/layout/AboutInfoImage";
import { AboutStory } from "@/components/layout/AboutStory";
import { PurposeSection } from "@/components/layout/PurposeSection";
import { LetsRiseMarquee } from "@/components/layout/LetsRiseMarquee";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero 
        title={
          <div className="flex items-center justify-between w-full gap-4 md:gap-8">
            <span className="shrink-0">TRAUMA</span>
            <div className="flex-1 h-[8px] sm:h-[12px] md:h-[16px] lg:h-[20px] bg-white/90" />
            <span className="shrink-0">PURPOSE</span>
          </div>
        } 
        images={["/assets/images/about_images/About HERO.jpg"]}
        description="Radiant Rise Initiative is an indigenous non-governmental organisation based in Kampala, fully registered with the Uganda National NGO Bureau with a 5-year renewable permit to operate."
        imageStyle={{ transform: 'translateY(0px) scale(1.15)', transformOrigin: 'center top' }}
      />
      <AboutMissionVision />
      <AboutInfoImage />
      <PurposeSection 
        videoSrc="/assets/images/video_stories/RRI (Story).mp4"
        imageSrc="/assets/images/about_images/About TN.jpg" 
        description="I believe that when a young person heals, they rise, and when they rise, they can transform their families and their communities." 
        infoPoints={[
          "Developing trauma-informed psychosocial support systems that help participants process lived experiences, rebuild inner strength, and rediscover their inherent worth.",
          "Providing practical interventions like vocational training and mentorship to guide participants from brokenness to stability, and from dependency to self-reliance."
        ]}
      />
      <AboutStory />
      <LetsRiseMarquee />
      <Footer />
    </main>
  );
}
