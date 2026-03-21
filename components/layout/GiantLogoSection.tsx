"use client";

import { GiantLogo } from "@/components/ui/GiantLogo";

export function GiantLogoSection() {
    return (
        <section data-theme="dark" className="bg-black pt-12 pb-8 relative @container w-full overflow-hidden">
            <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full relative z-10 px-4 sm:px-12 lg:px-0">
                <GiantLogo />
            </div>
        </section>
    );
}
