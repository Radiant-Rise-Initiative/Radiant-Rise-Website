import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TabForm } from "@/components/ui/TabForm";

export function ConnectForm() {
    return (
        <section id="connect" data-theme="dark" className="relative min-h-[800px] flex items-center pt-20 pb-0 select-none">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/branding/splash-image-015.jpg"
                    alt="Radiant Rise Community"
                    fill
                    className="object-cover brightness-[0.4]"
                />
                <div className="absolute inset-0 bg-green-900/20 mix-blend-multiply" />
                {/* Bottom Gradient Fade - Increased height for smoother transition */}
                <div className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-black to-transparent" />
            </div>

            <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full relative z-10 px-4 sm:px-12 lg:px-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[64px] sm:gap-10 items-stretch">
                    {/* Left Side: Title */}
                    <div className="flex flex-col @container sticky top-44 self-start sm:py-0">
                        <div className="lg:hidden w-full invert">
                            <SectionHeader
                                title="Connect"
                                linkText="DISCOVER OUR VISION"
                                href="#"
                                className="px-0"
                            />
                        </div>
                        <h1 className="hidden lg:block text-[18cqi] font-semibold text-white tracking-tighter leading-[0.8] uppercase whitespace-nowrap">
                            CONNECT
                        </h1>
                    </div>

                    {/* Right Side: Tabbed Form */}
                    <TabForm />
                </div>
            </div>
        </section>
    );
}
