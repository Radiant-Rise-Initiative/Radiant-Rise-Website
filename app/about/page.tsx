import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/layout/Hero";
import { Footer } from "@/components/layout/Footer";
import { LetsRiseMarquee } from "@/components/layout/LetsRiseMarquee";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero title="TRAUMA TO PURPOSE" />
      <LetsRiseMarquee />
      <Footer />
    </main>
  );
}
