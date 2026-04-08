"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { newsItems } from "@/lib/newsData";
import { siteDefaults } from "@/lib/siteDefaults";
import { motion } from "framer-motion";
import { Database, CheckCircle2, AlertCircle, Loader2, Sparkles } from "lucide-react";

export default function AdminSeed() {
    const [status, setStatus] = useState<string>("Ready to migrate data...");
    const [isMigrating, setIsMigrating] = useState(false);
    const [isDone, setIsDone] = useState(false);

    const migrateData = async () => {
        setIsMigrating(true);
        setStatus("Verifying Configuration...");

        // Diagnostic Environment Check
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!url || url === "undefined" || !key || key === "undefined") {
            const msg = "Supabase configuration missing. Ensure .env.local is correctly populated and restart your dev server.";
            console.error(msg);
            setStatus("Error: Config Missing");
            alert(msg);
            setIsMigrating(false);
            return;
        }

        try {
            setStatus("Migrating News Archive...");

            // 1. Migrate News Items
            for (const item of newsItems) {
                // Safe date parsing
                let formattedDate = new Date().toISOString().split('T')[0];
                try {
                    const parsed = new Date(item.date);
                    if (!isNaN(parsed.getTime())) {
                        formattedDate = parsed.toISOString().split('T')[0];
                    }
                } catch (e) {
                    console.error(`Failed to parse date for ${item.title}:`, item.date);
                }

                const { error } = await supabase
                    .from('news_releases')
                    .upsert({
                        title: item.title,
                        slug: item.id,
                        date: formattedDate,
                        content: item.content,
                        image_url: item.image,
                        author: item.author,
                        category: item.category,
                        read_time: item.readTime,
                    }, { onConflict: 'slug' });
                
                if (error) {
                    throw new Error(`News Migration Failed: ${error.message}`);
                }
            }

            setStatus("Migrating Home Sections...");

            // 2. Migrate Home Sections Directly from siteDefaults
            const sections = Object.entries(siteDefaults).map(([key, content]) => ({
                key,
                content
            }));

            for (const section of sections) {
                const { error } = await supabase.from('site_sections').upsert({
                    section_key: section.key,
                    content: section.content
                }, { onConflict: 'section_key' });

                if (error) {
                    throw new Error(`Section Migration Failed (${section.key}): ${error.message}`);
                }
            }

            setStatus("Migration Complete.");
            setIsMigrating(false);
            setIsDone(true);
        } catch (e: any) {
            console.error("Migration fatal error:", e);
            const errorMsg = e.message || "Archive Migration Failed (Likely Connection Error)";
            setStatus(`Error: ${errorMsg}`);
            alert(`Migration failed: ${errorMsg}\n\nCommon causes:\n1. Ad-blocker blocking supabase.co\n2. Incorrect Supabase credentials\n3. Database tables not created yet.`);
            setIsMigrating(false);
        }
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
                    {!isDone && (
                        <div className="p-4 bg-amber-50 border border-amber-200 text-left mb-6">
                            <div className="flex gap-3">
                                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                                <div className="space-y-1">
                                    <p className="text-[10px] font-mono leading-tight text-amber-800 uppercase tracking-tight font-bold">Production Data Warning</p>
                                    <p className="text-[10px] font-mono leading-tight text-amber-700 uppercase tracking-tight">Executing this migration will systemically overwrite your current database content with hardcoded defaults. Only proceed if you require a full repository reset.</p>
                                </div>
                            </div>
                        </div>
                    )}

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
