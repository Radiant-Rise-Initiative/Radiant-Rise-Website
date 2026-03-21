"use client";

import { use } from "react";
import { newsItems } from "@/lib/newsData";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { notFound } from "next/navigation";

export default function NewsletterTemplate({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const item = newsItems.find(n => n.id === id);

    if (!item) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[#fafafa] flex flex-col">
            <Navbar />

            <article className="pt-32 pb-24 flex-grow px-6">
                <div className="max-w-[1000px] mx-auto bg-white shadow-[0_40px_100px_rgba(0,0,0,0.05)] border border-black/[0.02]">
                    {/* Newsletter Header / Masthead */}
                    <div className="p-8 md:p-12 border-b-2 border-black/5 flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <span className="text-[#CD5929] font-mono text-xs tracking-[0.3em] font-bold mb-4 block">
                                RADIANT RISE WEEKLY • {item.date}
                            </span>
                            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-black leading-tight max-w-3xl">
                                {item.title}
                            </h1>
                        </div>
                        <div className="text-right hidden md:block">
                            <span className="text-[10px] font-mono tracking-widest text-black/30 uppercase block">VOL. 01 ISSUE 12</span>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="relative h-[400px] md:h-[600px] w-full overflow-hidden">
                        <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Article Body */}
                    <div className="p-8 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Meta Sidebar */}
                        <div className="lg:col-span-3 border-t lg:border-t-0 lg:border-r border-black/5 pt-8 lg:pt-0">
                            <div className="mb-8">
                                <span className="text-[10px] font-mono text-black/40 uppercase tracking-widest block mb-1">AUTHOR</span>
                                <span className="text-sm font-semibold text-black">{item.author || "Radiant Rise Team"}</span>
                            </div>
                            <div className="mb-8">
                                <span className="text-[10px] font-mono text-black/40 uppercase tracking-widest block mb-1">CATEGORY</span>
                                <span className="text-sm font-semibold text-black">{item.category}</span>
                            </div>
                            <div className="mb-8">
                                <span className="text-[10px] font-mono text-black/40 uppercase tracking-widest block mb-1">READ TIME</span>
                                <span className="text-sm font-semibold text-black">{item.readTime || "5 MIN"}</span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="lg:col-span-9 newsletter-body">
                            <div
                                className="text-lg md:text-xl text-black/80 leading-relaxed space-y-8 prose prose-lg max-w-none"
                                dangerouslySetInnerHTML={{ __html: item.content || `<p>No content available for this news item.</p>` }}
                            />

                            {/* Footer inside the Newsletter */}
                            <div className="mt-16 pt-12 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-8">
                                <Link
                                    href="/news"
                                    className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#CD5929] hover:text-[#96503F] transition-colors group"
                                >
                                    <span className="transition-transform group-hover:-translate-x-1">←</span> Back to all news
                                </Link>
                                <div className="flex gap-4">
                                    <button className="h-10 w-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-[#CD5929] hover:text-white transition-all text-black/60">
                                        <span className="text-xs font-mono">SH</span>
                                    </button>
                                    <button className="h-10 w-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-[#CD5929] hover:text-white transition-all text-black/60">
                                        <span className="text-xs font-mono">TW</span>
                                    </button>
                                    <button className="h-10 w-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-[#CD5929] hover:text-white transition-all text-black/60">
                                        <span className="text-xs font-mono">IN</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            <Footer topPadding={true} />

            <style jsx global>{`
                .newsletter-body h3 {
                    font-size: 1.75rem;
                    font-weight: 600;
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                    color: black;
                }
                .newsletter-body blockquote {
                    border-left: 4px solid #CD5929;
                    padding-left: 2rem;
                    font-style: italic;
                    font-size: 1.5rem;
                    color: rgba(0,0,0,0.7);
                    margin: 3rem 0;
                }
                .newsletter-body strong {
                    color: black;
                }
            `}</style>
        </main>
    );
}
