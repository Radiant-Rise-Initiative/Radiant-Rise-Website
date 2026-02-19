"use client";

import Image from "next/image";
import Link from "next/link";

export function GiantLogoSection() {
    return (
        <section data-theme="dark" className="bg-black pt-12 pb-24 relative @container w-full overflow-hidden">
            <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full relative z-10">
                {/* Main Logo Row */}
                <div className="flex justify-between items-center mb-32">
                    {/* Text Logo - Fluid scaling with width constraint */}
                    <div className="relative w-[55%] max-w-[800px]">
                        <Image
                            src="/assets/branding/rr-lettermark.svg"
                            alt="Radiant Rise"
                            width={0}
                            height={0}
                            style={{ width: '100%', height: 'auto' }}
                            className="object-contain invert opacity-10 select-none"
                            priority
                        />
                    </div>

                    {/* Orb Asset Container */}
                    <div className="relative w-[520px] h-[520px] opacity-5 pointer-events-none select-none shrink-0">
                        <Image
                            src="/assets/branding/rr-logo-v3.svg"
                            alt=""
                            fill
                            className="object-contain object-right invert"
                        />
                    </div>
                </div>

                {/* Bottom Bar - Pushed from Footer */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/10 text-[10px] font-mono tracking-widest text-white/20 uppercase">
                    <p>© 2024 Radiant Rise Initiative. All rights reserved.</p>
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
