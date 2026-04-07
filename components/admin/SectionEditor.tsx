"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
    Save, 
    CheckCircle2, 
    AlertCircle,
    Loader2
} from "lucide-react";
import { motion } from "framer-motion";

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

    useEffect(() => {
        const fetchSection = async () => {
            setIsLoading(true);
            const { data: sectionData, error } = await supabase
                .from('site_sections')
                .select('*')
                .eq('section_key', sectionKey)
                .single();

            if (sectionData) {
                setData(sectionData.content);
            }
            setIsLoading(false);
        };

        fetchSection();
    }, [sectionKey]);

    const handleSave = async () => {
        setIsSaving(true);
        setStatus(null);

        const { error } = await supabase
            .from('site_sections')
            .upsert({ 
                section_key: sectionKey, 
                content: data,
                updated_at: new Date().toISOString()
            }, { onConflict: 'section_key' });

        setIsSaving(false);
        if (error) {
            console.error(error);
            setStatus('error');
        } else {
            setStatus('success');
            setTimeout(() => setStatus(null), 3000);
        }
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
                            <CheckCircle2 className="w-3 h-3" /> Saved Successfully
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
                        onClick={handleSave}
                        disabled={isSaving || !data}
                        className="px-6 py-3 bg-black text-white text-[10px] font-mono uppercase tracking-widest flex items-center gap-2 hover:bg-[#CD5929] transition-colors disabled:opacity-50 min-w-[140px] justify-center"
                    >
                        {isSaving ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        {isSaving ? "Syncing..." : "Save Changes"}
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
        </div>
    );
}
