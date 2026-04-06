"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { 
    Save, 
    RefreshCcw, 
    CheckCircle2, 
    AlertCircle,
    ChevronDown,
    Loader2
} from "lucide-react";

// Define the keys for each section on the homepage
const SECTIONS = [
    { key: "hero", label: "Hero Section", fields: ["headline", "subheadline"] },
    { key: "purpose", label: "Purpose Section", fields: ["title", "description", "info_point_1", "info_point_2"] },
    { key: "impact_stats", label: "Impact Statistics", fields: ["title", "description", "metric_label", "metric_value"] },
    { key: "who_we_are", label: "Who We Are", fields: ["title", "content"] },
    { key: "values", label: "Our Values", fields: ["title", "description"] },
];

export default function AdminSections() {
    const [sectionsData, setSectionsData] = useState<any>({});
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState<string | null>(null);
    const [status, setStatus] = useState<{ [key: string]: 'success' | 'error' | null }>({});

    useEffect(() => {
        const fetchSections = async () => {
            const { data, error } = await supabase
                .from('site_sections')
                .select('*');

            if (data) {
                // Transform array into an object keyed by section_key
                const transformed = data.reduce((acc, curr) => {
                    acc[curr.section_key] = curr.content;
                    return acc;
                }, {});
                setSectionsData(transformed);
            }
            setIsLoading(false);
        };

        fetchSections();
    }, []);

    const handleChange = (sectionKey: string, field: string, value: string) => {
        setSectionsData((prev: any) => ({
            ...prev,
            [sectionKey]: {
                ...prev[sectionKey],
                [field]: value
            }
        }));
    };

    const handleSave = async (sectionKey: string) => {
        setIsSaving(sectionKey);
        setStatus(prev => ({ ...prev, [sectionKey]: null }));

        const { error } = await supabase
            .from('site_sections')
            .upsert({ 
                section_key: sectionKey, 
                content: sectionsData[sectionKey],
                updated_at: new Date().toISOString()
            }, { onConflict: 'section_key' });

        setIsSaving(null);
        if (error) {
            console.error(error);
            setStatus(prev => ({ ...prev, [sectionKey]: 'error' }));
        } else {
            setStatus(prev => ({ ...prev, [sectionKey]: 'success' }));
            setTimeout(() => setStatus(prev => ({ ...prev, [sectionKey]: null })), 3000);
        }
    };

    if (isLoading) {
        return (
            <div className="py-24 flex flex-col items-center justify-center opacity-20">
                <Loader2 className="w-8 h-8 animate-spin mb-4" />
                <p className="text-xs font-mono uppercase tracking-widest">Loading content matrix...</p>
            </div>
        );
    }

    return (
        <div className="space-y-12">
            <div className="space-y-2">
                <h2 className="text-3xl font-semibold tracking-tight text-black">Site Sections</h2>
                <p className="text-black/40 text-sm font-mono tracking-widest uppercase">Global Homepage Content Engine</p>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {SECTIONS.map((section) => (
                    <motion.div 
                        key={section.key}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white border border-black/5 flex flex-col group overflow-hidden"
                    >
                        {/* Section Header */}
                        <div className="p-6 border-b border-black/5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-1.5 h-1.5 bg-black rounded-full" />
                                <h3 className="text-sm font-semibold uppercase tracking-widest">{section.label}</h3>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                {status[section.key] === 'success' && (
                                    <span className="text-[10px] text-green-500 font-mono flex items-center gap-2">
                                        <CheckCircle2 className="w-3 h-3" /> Saved Successfully
                                    </span>
                                )}
                                {status[section.key] === 'error' && (
                                    <span className="text-[10px] text-red-500 font-mono flex items-center gap-2">
                                        <AlertCircle className="w-3 h-3" /> Save Failed
                                    </span>
                                )}
                                <button 
                                    onClick={() => handleSave(section.key)}
                                    disabled={isSaving === section.key}
                                    className="px-4 py-2 bg-black text-white text-[10px] font-mono uppercase tracking-widest flex items-center gap-2 hover:bg-[#CD5929] transition-colors disabled:opacity-50"
                                >
                                    {isSaving === section.key ? (
                                        <Loader2 className="w-3 h-3 animate-spin" />
                                    ) : (
                                        <Save className="w-3 h-3" />
                                    )}
                                    {isSaving === section.key ? "Syncing..." : "Save Changes"}
                                </button>
                            </div>
                        </div>

                        {/* Editable Fields */}
                        <div className="p-8 space-y-6">
                            {section.fields.map((field) => (
                                <div key={field} className="space-y-2">
                                    <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">
                                        {field.replace(/([A-Z])/g, ' $1')}
                                    </label>
                                    <textarea 
                                        rows={field === "content" || field === "subheadline" || field === "description" ? 4 : 1}
                                        value={sectionsData[section.key]?.[field] || ""}
                                        onChange={(e) => handleChange(section.key, field, e.target.value)}
                                        className="w-full bg-black/[0.02] border border-black/10 px-4 py-4 text-sm font-medium focus:border-black outline-none transition-colors overflow-hidden resize-none"
                                        placeholder={`Enter ${field}...`}
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
