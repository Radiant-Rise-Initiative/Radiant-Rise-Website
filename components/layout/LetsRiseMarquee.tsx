import { MarqueeScroller } from "@/components/ui/MarqueeScroller";

export function LetsRiseMarquee() {
    return (
        <section data-theme="dark" className="bg-black pt-40 lg:pt-[240px] pb-40 lg:pb-[240px] overflow-hidden text-white font-sans">
            <MarqueeScroller text="Let's Rise" speed={60} direction={1} />
            <MarqueeScroller text="Together" speed={60} direction={-1} />
        </section>
    );
}
