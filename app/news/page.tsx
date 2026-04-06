"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function NewsArchive() {
    const [news, setNews] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            const { data } = await supabase
                .from('news_releases')
                .select('*')
                .order('date', { ascending: false });
            if (data) setNews(data);
            setIsLoading(false);
        };
        fetchNews();
    }, []);

    const featuredStory = news[0];
    const archiveStories = news.slice(1);

    // Mouse tracking for premium hover effect
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const mouseX = useMotionValue(-1000);
    const mouseY = useMotionValue(-1000);

    const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX - 200); // 400px width / 2
            mouseY.set(e.clientY - 150); // 300px height / 2
        };
        
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-black/10" />
            </div>
        );
    }

    if (news.length === 0) {
        return (
            <main className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center">
                <Navbar />
                <p className="text-black/40 font-mono text-xs uppercase tracking-widest">No stories found in the archive.</p>
                <Footer topPadding={true} />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#fafafa] flex flex-col overflow-x-hidden">
            <Navbar />
            
            {/* Featured Spotlight */}
            <section className="pt-40 lg:pt-48 pb-24 px-4 sm:px-12 lg:px-0 bg-white border-b border-black/5">
                <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                            className="relative aspect-square sm:aspect-[4/5] lg:aspect-[3/4] w-full overflow-hidden"
                        >
                            <Link href={`/news/${featuredStory.slug}`} className="block w-full h-full group">
                                {featuredStory.image_url && (
                                    <Image 
                                        src={featuredStory.image_url} 
                                        alt={featuredStory.title}
                                        fill 
                                        className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                                        priority
                                    />
                                )}
                                <div className="absolute top-6 left-6 md:top-8 md:left-8">
                                    <span className="inline-block py-1 px-3 transition-all duration-300 text-xs font-mono uppercase tracking-widest text-white/90 bg-[#f5f5f7]/10 backdrop-blur-sm">
                                        FEATURED • {featuredStory.category}
                                    </span>
                                </div>
                            </Link>
                        </motion.div>

                        <div className="flex flex-col items-start pr-0 lg:pr-12">
                            <motion.span 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-xs font-mono tracking-widest text-black/60 uppercase block mb-4 md:mb-6"
                            >
                                {featuredStory.date}
                            </motion.span>
                            <motion.h1 
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-5xl md:text-6xl font-semibold tracking-tight text-black mb-8 md:mb-10 -ml-1"
                            >
                                {featuredStory.title}
                            </motion.h1>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="w-full sm:w-auto"
                            >
                                <Link 
                                    href={`/news/${featuredStory.slug}`} 
                                    className="group inline-flex w-full sm:w-auto justify-center sm:justify-start items-center gap-2 text-sm font-mono tracking-widest uppercase border border-black text-black px-8 py-4 sm:px-10 sm:py-5 hover:bg-black hover:text-white transition-all duration-300"
                                >
                                    Read Story
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Editorial Archive List */}
            <section className="py-24 md:py-32 px-4 sm:px-12 lg:px-0 flex-grow relative">
                <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full">
                    <div className="flex justify-between items-end mb-16">
                        <h2 className="text-5xl md:text-6xl font-semibold tracking-tight text-black -ml-1">The Archive</h2>
                        <span className="font-mono text-xs tracking-widest text-black/60 uppercase hidden sm:block">Latest Updates</span>
                    </div>

                    <div 
                        className="flex flex-col border-b border-black/10"
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        {archiveStories.map((story) => (
                            <Link 
                                href={`/news/${story.slug}`} 
                                key={story.id} 
                                onMouseEnter={() => setHoveredId(story.id)}
                                className="group grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8 items-start md:items-center py-8 md:py-10 border-t border-black/10 hover:bg-black/[0.02] transition-colors relative z-10"
                            >
                                <div className="md:col-span-2">
                                    <span className="text-xs font-mono tracking-widest text-black/60 uppercase block mb-1 md:mb-0">
                                        {story.date}
                                    </span>
                                </div>
                                <div className="md:col-span-8">
                                    <h3 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-black group-hover:text-[#CD5929] transition-colors leading-[1.15] md:leading-[1.1]">
                                        {story.title}
                                    </h3>
                                </div>
                                <div className="md:col-span-2 hidden md:flex justify-end items-center gap-5">
                                    <span className="text-xs font-mono tracking-widest text-black/60 uppercase text-right">
                                        {story.category}
                                    </span>
                                    <ArrowUpRight className="w-8 h-8 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#CD5929] shrink-0" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Mouse-following Image Preview (Desktop Only) */}
                <motion.div 
                    className="pointer-events-none fixed top-0 left-0 w-[400px] h-[300px] z-50 overflow-hidden shadow-2xl hidden lg:block"
                    style={{ x, y, opacity: hoveredId ? 1 : 0 }}
                >
                    <AnimatePresence>
                        {hoveredId && (
                            <motion.div 
                                key={hoveredId} 
                                initial={{ opacity: 0, scale: 1.1 }} 
                                animate={{ opacity: 1, scale: 1 }} 
                                exit={{ opacity: 0 }} 
                                transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                                className="absolute inset-0"
                            >
                                <Image 
                                    src={archiveStories.find(s => s.id === hoveredId)?.image_url || ''} 
                                    alt="Preview"
                                    fill 
                                    className="object-cover"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </section>

            <Footer topPadding={true} />
        </main>
    );
}

