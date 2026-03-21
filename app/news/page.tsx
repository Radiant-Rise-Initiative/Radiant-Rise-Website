"use client";

import { newsItems } from "@/lib/newsData";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NewsArchive() {
    return (
        <main className="min-h-screen bg-[#f5f5f7] flex flex-col">
            <Navbar />
            
            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 bg-white border-b border-black/5">
                <div className="max-w-[1200px] mx-auto text-center">
                    <motion.span 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs font-mono tracking-[0.3em] text-[#CD5929] uppercase mb-4 block"
                    >
                        THE LATEST FROM RADIANT RISE
                    </motion.span>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-semibold tracking-tight text-black mb-8"
                    >
                        Our News & Updates
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-2xl mx-auto text-lg text-black/60 leading-relaxed"
                    >
                        Stay informed about our latest initiatives, community impact stories, and strategic partnerships as we work towards a more resilient Acholi Quarters.
                    </motion.p>
                </div>
            </section>

            {/* News Grid */}
            <section className="py-20 px-6 flex-grow">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {newsItems.map((item, index) => (
                            <motion.article 
                                key={item.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-white rounded-3xl overflow-hidden border border-black/[0.03] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
                            >
                                <Link href={`/news/${item.id}`} className="block relative h-64 overflow-hidden">
                                    <Image 
                                        src={item.image} 
                                        alt={item.title} 
                                        fill 
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute top-6 left-6">
                                        <span className="bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-mono tracking-wider uppercase text-black">
                                            {item.category}
                                        </span>
                                    </div>
                                </Link>
                                <div className="p-8 flex-grow flex flex-col">
                                    <span className="text-xs font-mono text-black/40 mb-4 block">
                                        {item.date}
                                    </span>
                                    <h2 className="text-2xl font-semibold text-black mb-6 leading-tight group-hover:text-[#CD5929] transition-colors">
                                        <Link href={`/news/${item.id}`}>
                                            {item.title}
                                        </Link>
                                    </h2>
                                    <div className="mt-auto flex justify-between items-center pt-6 border-t border-black/5">
                                        <span className="text-xs text-black/40 italic">
                                            {item.readTime || "5 min read"}
                                        </span>
                                        <Link 
                                            href={`/news/${item.id}`}
                                            className="text-xs font-semibold uppercase tracking-widest text-black hover:text-[#CD5929] transition-colors inline-flex items-center gap-2 group/link"
                                        >
                                            Read More
                                            <span className="transition-transform group-hover/link:translate-x-1">→</span>
                                        </Link>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
