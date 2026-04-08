import Image from "next/image";
import Link from "next/link";

export function GiantLogo() {
    return (
        <div className="w-full">
            {/* Main Logo Row */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-16 md:mb-32 gap-12 md:gap-0">
                {/* Text Logo - Fluid scaling with width constraint */}
                <div className="relative w-full md:w-[55%] max-w-[800px]">
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
                <div className="relative w-full max-w-[520px] aspect-square opacity-5 pointer-events-none select-none shrink-0">
                    <Image
                        src="/assets/branding/rr-logo-v3.svg"
                        alt=""
                        fill
                        className="object-contain md:object-right invert"
                    />
                </div>
            </div>

            {/* Bottom Bar - Pushed from Footer */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mt-24 pt-8 border-t border-white/10 text-xs font-mono tracking-widest text-white/20 uppercase">
                <p className="shrink-0 text-center md:text-left w-full md:w-auto">© 2024 Radiant Rise Initiative. All rights reserved.</p>
                <div className="flex flex-wrap justify-end gap-8 ml-auto">
                    <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    <Link href="#" className="hover:text-white transition-colors">Cookie Settings</Link>
                    <Link href="/admin/login" className="hover:text-white transition-colors">Login</Link>
                </div>
            </div>
        </div>
    );
}
