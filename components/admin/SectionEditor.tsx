"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { siteDefaults } from "@/lib/siteDefaults";
import { 
    Save, 
    CheckCircle2, 
    AlertCircle,
    Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { deepMerge } from "@/lib/utils/deepMerge";

interface SectionEditorProps {
    sectionKey: string;
    label: string;
    subtitle?: string;
    children: (data: any, setData: (data: any) => void) => React.ReactNode;
}

export function SectionEditor({ 
    sectionKey, 
    label, 
    subtitle = "Content Management Interface", 
    children 
}: SectionEditorProps) {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [status, setStatus] = useState<'success' | 'error' | null>(null);
    const [showSaveConfirm, setShowSaveConfirm] = useState(false);

    useEffect(() => {
        const fetchSection = async () => {
            setIsLoading(true);
            const { data: sectionData, error } = await supabase
                .from('site_sections')
                .select('*')
                .eq('section_key', sectionKey)
                .single();

            const defaultData = (siteDefaults as any)[sectionKey];
            
            if (sectionData?.content) {
                // Pre-merge with defaults so the editor always has the full structure
                setData(deepMerge(defaultData, sectionData.content));
            } else {
                // Fallback: load from siteDefaults if Supabase has no data
                if (defaultData) {
                    setData(defaultData);
                }
            }
            setIsLoading(false);
        };

        fetchSection();
    }, [sectionKey]);

    const handleSaveClick = () => {
        setShowSaveConfirm(true);
    };

    const handleConfirmedSave = async () => {
        setShowSaveConfirm(false);
        setIsSaving(true);
        setStatus(null);

        // Step 1: Save to Supabase
        const { error } = await supabase
            .from('site_sections')
            .upsert({ 
                section_key: sectionKey, 
                content: data,
                updated_at: new Date().toISOString()
            }, { onConflict: 'section_key' });

        if (error) {
            console.error(error);
            setStatus('error');
            setIsSaving(false);
            return;
        }

        // Step 2: Trigger on-demand revalidation so changes appear on the live site
        try {
            const revalidateRes = await fetch('/api/revalidate', {
                method: 'POST',
                headers: {
                    'x-revalidation-secret': process.env.NEXT_PUBLIC_REVALIDATION_SECRET || '',
                },
            });
            if (!revalidateRes.ok) {
                console.warn('Revalidation request returned non-OK status:', revalidateRes.status);
            }
        } catch (e) {
            // Non-blocking: revalidation failure shouldn't prevent save confirmation
            console.warn('Revalidation request failed (non-blocking):', e);
        }

        setIsSaving(false);
        setStatus('success');
        setTimeout(() => setStatus(null), 3000);
    };

    if (isLoading) {
        return (
            <div className="py-24 flex flex-col items-center justify-center opacity-20">
                <Loader2 className="w-8 h-8 animate-spin mb-4" />
                <p className="text-xs font-mono uppercase tracking-widest">Accessing content matrix...</p>
            </div>
        );
    }

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h2 className="text-3xl font-semibold tracking-tight text-black">{label}</h2>
                    <p className="text-black/40 text-[10px] font-mono tracking-widest uppercase mt-1">{subtitle}</p>
                </div>

                <div className="flex items-center gap-4">
                    {status === 'success' && (
                        <motion.span 
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[10px] text-green-500 font-mono flex items-center gap-2"
                        >
                            <CheckCircle2 className="w-3 h-3" /> Published to Live Site
                        </motion.span>
                    )}
                    {status === 'error' && (
                        <motion.span 
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[10px] text-red-500 font-mono flex items-center gap-2"
                        >
                            <AlertCircle className="w-3 h-3" /> Save Failed
                        </motion.span>
                    )}
                    <button 
                        onClick={handleSaveClick}
                        disabled={isSaving || !data}
                        className="px-6 py-3 bg-black text-white text-[10px] font-mono uppercase tracking-widest flex items-center gap-2 hover:bg-[#CD5929] transition-colors disabled:opacity-50 min-w-[140px] justify-center"
                    >
                        {isSaving ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        {isSaving ? "Publishing..." : "Save Changes"}
                    </button>
                </div>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-black/5 overflow-hidden"
            >
                <div className="p-8">
                    {children(data, setData)}
                </div>
            </motion.div>

            {/* Save Confirmation Modal */}
            <AnimatePresence>
                {showSaveConfirm && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowSaveConfirm(false)}
                    >
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ type: "spring", duration: 0.4 }}
                            className="bg-white border border-black/5 p-8 max-w-sm w-full space-y-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold tracking-tight">Publish Changes?</h3>
                                <p className="text-[10px] font-mono text-black/40 uppercase tracking-widest leading-relaxed">
                                    This will save your changes to the database and immediately update the live website. Please confirm you are ready to publish.
                                </p>
                            </div>

                            <div className="p-3 bg-amber-50 border border-amber-200">
                                <div className="flex gap-2">
                                    <AlertCircle className="w-3 h-3 text-amber-600 shrink-0 mt-0.5" />
                                    <p className="text-[10px] font-mono text-amber-700 uppercase tracking-tight leading-relaxed">
                                        Changes will be visible to all visitors within seconds.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button 
                                    onClick={() => setShowSaveConfirm(false)}
                                    className="flex-1 py-3 border border-black/10 text-[10px] font-mono uppercase tracking-widest hover:bg-black/[0.02] transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={handleConfirmedSave}
                                    className="flex-1 py-3 bg-black text-white text-[10px] font-mono uppercase tracking-widest hover:bg-[#CD5929] transition-colors"
                                >
                                    Confirm &amp; Publish
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
