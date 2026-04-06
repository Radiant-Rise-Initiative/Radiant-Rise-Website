"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { newsItems } from "@/lib/newsData";
import { motion } from "framer-motion";
import { Database, CheckCircle2, AlertCircle, Loader2, Sparkles } from "lucide-react";

export default function AdminSeed() {
    const [status, setStatus] = useState<string>("Ready to migrate data...");
    const [isMigrating, setIsMigrating] = useState(false);
    const [isDone, setIsDone] = useState(false);

    const migrateData = async () => {
        setIsMigrating(true);
        setStatus("Migrating News Archive...");

        // 1. Migrate News Items
        for (const item of newsItems) {
            const { error } = await supabase
                .from('news_releases')
                .upsert({
                    title: item.title,
                    slug: item.id,
                    date: new Date(item.date).toISOString().split('T')[0],
                    content: item.content,
                    image_url: item.image,
                    author: item.author,
                    category: item.category,
                    read_time: item.readTime,
                }, { onConflict: 'slug' });
            
            if (error) console.error("Error migrating news:", error);
        }

        setStatus("Migrating Home Sections...");

        // 2. Migrate Home Sections
        const sections = [
            {
                key: 'hero',
                content: {
                    headline: "RISING TOGETHER",
                    subheadline: "Nurturing Hope and Purpose to Transform Vulnerability into Sustained Livelihoods"
                }
            },
            {
                key: 'purpose',
                content: {
                    title: "Radiant Rise",
                    description: "Dedicated to breaking cycles of poverty by equipping young mothers and youths with the vocational skills, spiritual foundation, and resilience needed to thrive.",
                    info_point_1: "To provide holistic empowerment that addresses not just economic needs, but emotional and spiritual well-being for lasting transformation.",
                    info_point_2: "To build sustainable futures where every participant becomes a pillar of strength, driving self-reliance and prosperity within their community."
                }
            },
            {
                key: 'impact_stats',
                content: {
                    title: "Our Impact",
                    description: "During our critical initial community mobilization phase, one hundred and five young mothers successfully registered and were comprehensively profiled...",
                    metric_label: "Grassroots Engagement",
                    metric_value: "105 Young Mothers"
                }
            },
            {
                key: 'who_we_are',
                content: {
                    title: "Who We Are",
                    content: "At the heart of the Radiant Rise Initiative are core values that guide every partnership and program we undertake. We serve with compassion and empathy..."
                }
            },
            {
                key: 'values',
                content: {
                    title: "Our Values",
                    description: "We are driven by a commitment to human dignity, creating a safe sanctuary where vulnerable youths and young mothers can truly heal and lead."
                }
            }
        ];

        for (const section of sections) {
            await supabase.from('site_sections').upsert({
                section_key: section.key,
                content: section.content
            }, { onConflict: 'section_key' });
        }

        setStatus("Migration Complete.");
        setIsMigrating(false);
        setIsDone(true);
    };

    return (
        <div className="flex flex-col items-center justify-center py-24 space-y-12">
            <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-black/[0.02] border border-black/5 rounded-full flex items-center justify-center mx-auto">
                    <Database className="w-6 h-6 text-black/40" />
                </div>
                <h2 className="text-3xl font-semibold tracking-tight">Data Migration</h2>
                <p className="text-black/40 text-sm font-mono tracking-widest uppercase max-w-md mx-auto">
                    Synchronize your hardcoded content with the new Supabase Cloud Database.
                </p>
            </div>

            <div className="w-full max-w-sm space-y-6">
                <div className="p-8 bg-white border border-black/5 text-center space-y-6">
                    <div className="flex items-center justify-center gap-3">
                        {isMigrating ? (
                            <Loader2 className="w-4 h-4 animate-spin text-[#CD5929]" />
                        ) : isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                        ) : (
                            <Sparkles className="w-4 h-4 text-[#CD5929]" />
                        )}
                        <span className="text-xs font-mono tracking-widest uppercase">{status}</span>
                    </div>

                    {!isDone && (
                        <button 
                            onClick={migrateData}
                            disabled={isMigrating}
                            className="w-full bg-black text-white py-4 px-6 text-xs font-mono uppercase tracking-widest hover:bg-[#CD5929] transition-all duration-500 disabled:opacity-50"
                        >
                            {isMigrating ? "Syncing..." : "Execute Migration"}
                        </button>
                    )}

                    {isDone && (
                        <a 
                            href="/admin/dashboard"
                            className="w-full inline-block bg-black text-white py-4 px-6 text-xs font-mono uppercase tracking-widest hover:bg-[#CD5929] transition-all duration-500"
                        >
                            Back to Dashboard
                        </a>
                    )}
                </div>
                
                <p className="text-[10px] text-center text-black/30 font-mono tracking-tight">
                    * This only needs to be run once to seed your database with your current site content.
                </p>
            </div>
        </div>
    );
}
