"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent, useInView } from "framer-motion";
import { supabase } from "@/lib/supabase";

function NewsItemContent({ item }: { item: any }) {
    const [bgColor, setBgColor] = useState("rgba(0,0,0,0.6)");

    useEffect(() => {
        const img = new window.Image();
        img.crossOrigin = "anonymous";
        img.src = item.image;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            canvas.width = 1;
            canvas.height = 1;
            ctx.drawImage(img, 0, 0, 1, 1);
            const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
            // Slightly darken/mute the color for a more premium feel if it's too bright
            setBgColor(`rgb(${r}, ${g}, ${b})`);
        };
    }, [item.image]);

    return (
        <div className="relative h-full flex flex-col justify-end">
            <div
                className="p-8 transition-colors duration-500 w-full"
                style={{ backgroundColor: bgColor }}
            >
                <div className="w-full">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-xs font-mono tracking-[0.2em] text-white/80 uppercase">
                            {item.category}
                        </span>
                        <span className="text-xs font-mono tracking-[0.2em] text-white/80 uppercase">
                            {item.date}
                        </span>
                    </div>
                    <h3 className="text-2xl font-semibold text-white leading-tight tracking-tight">
                        {item.title}
                    </h3>
                </div>
            </div>
        </div>
    );
}

import { SectionHeader } from "@/components/ui/SectionHeader";

export function RecentNews({ initialNews }: { initialNews?: any[] }) {
    const [news, setNews] = useState<any[]>(initialNews || []);
    const [scrollDirection, setScrollDirection] = useState<"down" | "up">("down");
    const { scrollY } = useScroll();
    const gridRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(gridRef, { once: false, amount: 0.2 });

    useEffect(() => {
        if (initialNews && initialNews.length > 0) {
            setNews(initialNews);
            return;
        }

        const fetchNews = async () => {
            const { data } = await supabase
                .from('news_releases')
                .select('*')
                .order('date', { ascending: false })
                .limit(3);
            if (data && data.length > 0) setNews(data);
        };
        fetchNews();
    }, [initialNews]);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && scrollDirection !== "down") {
            setScrollDirection("down");
        } else if (latest < previous && scrollDirection !== "up") {
            setScrollDirection("up");
        }
    });

    if (news.length === 0) return null;

    return (
        <section id="our-updates" data-theme="light" className="bg-[#f5f5f7] py-24 px-4 sm:px-12 lg:px-0">
            <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full">
                {/* Header */}
                <SectionHeader
                    title="Our Updates"
                    linkText="VIEW ALL UPDATES"
                    href="/news"
                    className="mb-16"
                />

                {/* News Grid */}
                <div
                    ref={gridRef}
                    data-theme="dark"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8 -my-8 px-4 -mx-4"
                >
                    {news.map((item, index) => (
                        <motion.div
                            key={item.id}
                            animate={isInView
                                ? { opacity: 1, x: 0 }
                                : { opacity: 0, x: scrollDirection === "down" ? 40 : -40 }
                            }
                            transition={{
                                duration: isInView ? 0.8 : 0,
                                ease: [0.21, 0.47, 0.32, 0.98],
                                delay: isInView ? index * 0.1 : 0
                            }}
                        >
                            <Link
                                href={`/news/${item.slug}`}
                                className="relative group h-[500px] block overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.0375] hover:z-10"
                            >
                                {/* Background Image */}
                                {item.image_url && (
                                    <Image
                                        src={item.image_url}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                )}

                                <NewsItemContent item={{ ...item, image: item.image_url }} />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
