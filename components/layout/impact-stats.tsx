"use client";

const stats = [
    {
        topLabel: "Investments made",
        topValue: "39",
        bottomLabel: "Successful exits",
        bottomValue: "8",
    },
    {
        topLabel: "Portfolio operating countries",
        topValue: "43",
        bottomLabel: "Leverage",
        bottomValue: "$529M",
    },
    {
        topLabel: "Direct full-time jobs created",
        topValue: "2,515",
        bottomLabel: "First mover deals",
        bottomValue: "88%",
    },
    {
        topLabel: "Cumulative metric tons of greenhouse gas emissions reduced",
        topValue: "379.7M",
        bottomLabel: "Hardware & software innovations",
        bottomValue: "39",
    },
];

export function ImpactStats() {
    return (
        <section data-theme="light" className="bg-white py-24">
            <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full">
                <div className="mb-16">
                    <h2 className="text-sm font-mono tracking-[0.2em] text-black uppercase">
                        Real Impact. Real Results.
                    </h2>
                </div>

                <div className="relative">
                    {/* Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className={`flex flex-col border-black/10 transition-colors hover:bg-black/[0.02] relative
                                    border-b lg:border-b-0
                                    ${index % 2 === 0 ? 'md:border-b-0' : ''} 
                                    py-12 lg:py-0
                                `}
                            >
                                {/* Vertical Divider - Absolute Positioned in the gap to the right */}
                                {/* Logic: 
                                    - Mobile (1 col): Hidden
                                    - Tablet (2 cols): Show on index 0, 2 (Right of left col)
                                    - Desktop (4 cols): Show on index 0, 1, 2 (Right of 1st, 2nd, 3rd col)
                                */}
                                <div className={`absolute -right-6 top-0 bottom-0 w-px bg-black/10 hidden
                                    ${(index === 0 || index === 2) ? 'md:block' : ''}
                                    ${(index === 1) ? 'lg:block' : ''}
                                    ${(index === 3) ? '!hidden' : ''} 
                                `} />

                                <div className="flex flex-col h-full gap-12 lg:py-4">
                                    {/* Top Stat */}
                                    <div className="flex flex-col justify-between min-h-[160px]">
                                        <p className="text-sm font-medium text-black/60 leading-tight mb-8">
                                            {stat.topLabel}
                                        </p>
                                        <p className="text-6xl sm:text-7xl font-semibold text-black tracking-tighter">
                                            {stat.topValue}
                                        </p>
                                    </div>

                                    {/* Inset Horizontal Divider */}
                                    <div className="border-t border-black/10 w-full" />

                                    {/* Bottom Stat */}
                                    <div className="flex flex-col justify-between min-h-[160px]">
                                        <p className="text-sm font-medium text-black/60 leading-tight mb-8">
                                            {stat.bottomLabel}
                                        </p>
                                        <p className="text-6xl sm:text-7xl font-semibold text-black tracking-tighter">
                                            {stat.bottomValue}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Overall Metric */}
                <div className="border-t border-black/10 transition-colors hover:bg-black/[0.01] mt-16 pt-16">
                    <div className="flex flex-col">
                        <p className="text-sm font-medium text-black/60 leading-tight mb-8">
                            Livelihoods improved
                        </p>
                        <p className="text-6xl sm:text-7xl font-semibold text-black tracking-tighter">
                            +119.6 million
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
