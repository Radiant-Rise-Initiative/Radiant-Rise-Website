"use client";

import Image from "next/image";
import Link from "next/link";

export function GiantLogoSection() {
    return (
        <section data-theme="dark" className="bg-black pt-40 pb-12 relative border-t border-white/5 @container">
            <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full relative z-10">
                {/* Main Logo Row */}
                <div className="flex justify-between items-center mb-32">
                    {/* Text Logo - Fluid scaling with width constraint */}
                    <h2 className="text-[13cqi] md:text-[7cqi] font-medium text-white/10 tracking-tighter leading-none select-none whitespace-nowrap">
                        Radiant Rise
                    </h2>

                    {/* Orb Asset Container */}
                    <div className="relative w-[520px] h-[520px] opacity-[0.1] pointer-events-none select-none shrink-0 -mr-[12%] lg:-mr-16">
                        <Image
                            src="/assets/branding/rr-monochrome.svg"
                            alt=""
                            fill
                            className="object-contain object-right"
                        />
                    </div>
                </div>

                {/* Bottom Bar - Pushed from Footer */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/10 text-[10px] font-mono tracking-widest text-white/20 uppercase">
                    <p>© 2024 Radiant Rise Venture Capital. All rights reserved.</p>
                    <div className="flex gap-8">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="#" className="hover:text-white transition-colors">Cookie Settings</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
