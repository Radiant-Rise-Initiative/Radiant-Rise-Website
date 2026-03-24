import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/layout/Hero";
import { Footer } from "@/components/layout/Footer";
import { AboutMissionVision } from "@/components/layout/AboutMissionVision";
import { AboutInfoImage } from "@/components/layout/AboutInfoImage";
import { AboutStory } from "@/components/layout/AboutStory";
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
        images={["/assets/images/hero_images/Hero 08.jpg"]}
        description="We coordinate trauma-informed healing with vocational partnerships, transitioning families from daily survival toward sustained, dignified household stability."
        imageStyle={{ transform: 'translateY(-120px) scale(1.15)', transformOrigin: 'center top' }}
      />
      <AboutMissionVision />
      <AboutInfoImage />
      <AboutStory />
      <LetsRiseMarquee />
      <Footer />
    </main>
  );
}
