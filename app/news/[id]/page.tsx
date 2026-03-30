"use client";

import { use } from "react";
import { newsItems } from "@/lib/newsData";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
                    <div className="p-8 md:p-12 border-b-2 border-black/5">
                        <Link href="/news" className="inline-flex items-center gap-2 bg-black/5 px-3 py-1.5 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-black/60 hover:bg-black/10 hover:text-black transition-colors mb-6 md:mb-8 group">
                            <ArrowLeft className="w-3.5 h-3.5 -ml-1 group-hover:-translate-x-1 transition-transform" />
                            RADIANT RISE WEEKLY • {item.date}
                        </Link>
                        
                        {(() => {
                            const parts = item.title.split(': ');
                            if (parts.length > 1) {
                                return (
                                    <>
                                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-black leading-tight max-w-4xl mb-4">
                                            {parts[0]}
                                        </h1>
                                        <div className="flex flex-row items-center justify-between gap-8">
                                            <p className="text-lg md:text-xl text-black/80 leading-relaxed max-w-3xl">
                                                {parts.slice(1).join(': ')}
                                            </p>
                                            <div className="hidden md:block shrink-0">
                                                <span className="text-xs font-mono tracking-widest text-black uppercase block">VOL. 01 ISSUE 12</span>
                                            </div>
                                        </div>
                                    </>
                                );
                            }
                            return (
                                <div className="flex flex-row md:items-end justify-between gap-6">
                                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-black leading-tight max-w-4xl">
                                        {item.title}
                                    </h1>
                                    <div className="text-right hidden md:block shrink-0 mb-3">
                                        <span className="text-xs font-mono tracking-widest text-black uppercase block">VOL. 01 ISSUE 12</span>
                                    </div>
                                </div>
                            );
                        })()}
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
                                <span className="text-sm leading-relaxed text-black/60 block mb-1">Category</span>
                                <span className="text-xs font-mono tracking-widest text-black uppercase block">{item.category}</span>
                            </div>
                            <div className="mb-8">
                                <span className="text-sm leading-relaxed text-black/60 block mb-1">Read Time</span>
                                <span className="text-xs font-mono tracking-widest text-black uppercase block">{item.readTime || "5 MIN"}</span>
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
                                    className="inline-flex items-center gap-2 bg-black/5 px-3 py-1.5 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-black/60 hover:bg-black/10 hover:text-black transition-colors group"
                                >
                                    <ArrowLeft className="w-3.5 h-3.5 -ml-1 group-hover:-translate-x-1 transition-transform" />
                                    BACK TO ALL NEWS
                                </Link>
                                
                                {(() => {
                                    const currentIndex = newsItems.findIndex(n => n.id === item.id);
                                    const nextItem = newsItems[(currentIndex + 1) % newsItems.length];
                                    const isLastItem = currentIndex === newsItems.length - 1;
                                    return (
                                        <Link 
                                            href={`/news/${nextItem.id}`}
                                            className="inline-flex items-center gap-2 bg-black/5 px-3 py-1.5 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-black/60 hover:bg-black/10 hover:text-black transition-colors group"
                                        >
                                            {isLastItem ? "VIEW LATEST RELEASE" : "READ NEXT EDITION"}
                                            <ArrowRight className="w-3.5 h-3.5 -mr-1 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    );
                                })()}
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
