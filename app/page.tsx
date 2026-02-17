import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/layout/hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <section className="h-screen bg-white flex items-center justify-center">
        <p className="text-muted-foreground">Content continues here...</p>
      </section>
    </main>
  );
}
