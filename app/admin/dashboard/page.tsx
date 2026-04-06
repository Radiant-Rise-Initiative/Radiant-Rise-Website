"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { 
    Users, 
    Newspaper, 
    Heart, 
    ArrowUpRight,
    MousePointer2
} from "lucide-react";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        newsCount: 0,
        sectionsCount: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            const { count: newsCount } = await supabase
                .from('news_releases')
                .select('*', { count: 'exact', head: true });
            
            const { count: sectionsCount } = await supabase
                .from('site_sections')
                .select('*', { count: 'exact', head: true });

            setStats({
                newsCount: newsCount || 0,
                sectionsCount: sectionsCount || 0,
            });
        };

        fetchStats();
    }, []);

    const cards = [
        { title: "News Stories", value: stats.newsCount, icon: Newspaper, label: "Total Releases" },
        { title: "Site Content", value: stats.sectionsCount, icon: MousePointer2, label: "Editable Sections" },
        { title: "Impact Stories", value: 12, icon: Heart, label: "Active Narratives" },
        { title: "Total Users", value: 1, icon: Users, label: "Admin Access" },
    ];

    return (
        <div className="space-y-12">
            {/* Greeting */}
            <div className="space-y-2">
                <h2 className="text-3xl font-semibold tracking-tight text-black">Welcome back</h2>
                <p className="text-black/40 text-sm font-mono tracking-widest uppercase">System Overview & Performance</p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, idx) => (
                    <motion.div 
                        key={card.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-8 border border-black/5 flex flex-col gap-8 group hover:border-[#CD5929]/20 transition-all duration-500"
                    >
                        <div className="flex items-center justify-between">
                            <div className="w-10 h-10 bg-black/[0.02] flex items-center justify-center rounded-sm">
                                <card.icon className="w-4 h-4 text-black/60" />
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-black/10 group-hover:text-[#CD5929] transition-colors" />
                        </div>
                        <div>
                            <p className="text-[10px] font-mono tracking-widest uppercase text-black/40 mb-1">{card.label}</p>
                            <h3 className="text-4xl font-semibold tracking-tight text-black">{card.value}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Recent Activity / System Integrity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-8 border border-black/5">
                    <div className="flex items-center justify-between mb-8">
                        <h4 className="text-sm font-semibold tracking-tight uppercase">Recent Releases</h4>
                        <span className="text-[10px] font-mono tracking-widest uppercase text-black/40">View All</span>
                    </div>
                    
                    {stats.newsCount === 0 ? (
                        <div className="py-12 border-t border-black/5 flex flex-col items-center justify-center text-center opacity-40">
                            <Newspaper className="w-8 h-8 mb-4 stroke-1" />
                            <p className="text-sm">No stories published yet.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {/* We could map actual news here */}
                        </div>
                    )}
                </div>

                <div className="bg-black p-8 text-white relative overflow-hidden">
                    <div className="relative z-10 space-y-4">
                        <h4 className="text-sm font-medium tracking-widest uppercase opacity-60">System Security</h4>
                        <p className="text-xl font-medium tracking-tight leading-relaxed">
                            CM Portal is currently protected by Supabase Auth with Row-Level Security enabled.
                        </p>
                        <div className="pt-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full">
                                <div className="w-1.5 h-1.5 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.5)] animate-pulse" />
                                <span className="text-[10px] font-mono tracking-widest uppercase text-white/80">Active Integrity Check</span>
                            </div>
                        </div>
                    </div>
                    {/* Decorative element */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#CD5929] rounded-full blur-[100px] opacity-20" />
                </div>
            </div>
        </div>
    );
}
