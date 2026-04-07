"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { motion, Reorder } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
    Save, 
    CheckCircle2, 
    AlertCircle,
    Loader2,
    Plus,
    Trash2,
    GripVertical,
    Image as ImageIcon,
    Type,
    Tag
} from "lucide-react";

// Custom auto-resizing textarea for better Admin UX
function AutoResizingTextarea({ 
    value, 
    onChange, 
    className, 
    placeholder, 
    disabled 
}: { 
    value: string, 
    onChange: (val: string) => void, 
    className?: string, 
    placeholder?: string,
    disabled?: boolean
}) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [value]);

    return (
        <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={cn("w-full resize-none overflow-hidden transition-all duration-200", className)}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
        />
    );
}

// Define the keys for each section on the homepage
const SECTIONS = [
    { key: "hero", label: "Hero Section", isMulti: true, fieldName: 'slides' },
    { key: "purpose", label: "Purpose Section", fields: ["title", "description", "image_url", "video_url", "info_point_1", "info_point_2"] },
    { key: "impact_stats", label: "Impact Statistics", fields: ["title", "description", "image_url", "metric_label", "metric_value"] },
    { key: "who_we_are", label: "Who We Are", fields: ["title", "description", "image_url"] },
    { key: "values", label: "Our Values", fields: ["title", "description", "image_url"] },
    { key: "gallery", label: "Our Gallery", isMulti: true, fieldName: 'items' },
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

    const handleChange = (sectionKey: string, field: string, value: any) => {
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

    // Generic Multi-Item Helpers
    const addItem = (sectionKey: string, fieldName: string) => {
        const newItem = sectionKey === 'hero' 
            ? { id: Math.random().toString(36).substr(2, 9), image: "", description: "" }
            : { id: Math.random().toString(36).substr(2, 9), title: "", category: "", description: "", image: "", modal_title: "", modal_text: "" };
        
        const currentItems = sectionsData[sectionKey]?.[fieldName] || [];
        handleChange(sectionKey, fieldName, [...currentItems, newItem]);
    };

    const removeItem = (sectionKey: string, fieldName: string, id: string) => {
        const currentItems = sectionsData[sectionKey]?.[fieldName] || [];
        handleChange(sectionKey, fieldName, currentItems.filter((i: any) => i.id !== id));
    };

    const updateItem = (sectionKey: string, fieldName: string, id: string, field: string, value: string) => {
        const currentItems = sectionsData[sectionKey]?.[fieldName] || [];
        const updated = currentItems.map((i: any) => i.id === id ? { ...i, [field]: value } : i);
        handleChange(sectionKey, fieldName, updated);
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
                            {section.isMulti ? (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <h4 className="text-[10px] font-mono tracking-widest uppercase text-black/40">Manage {section.label} Items</h4>
                                            <p className="text-xs text-black/60">Drag handles to reorder</p>
                                        </div>
                                        <button 
                                            onClick={() => addItem(section.key, section.fieldName!)}
                                            className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-black/60 hover:text-black transition-colors"
                                        >
                                            <Plus className="w-3 h-3" /> Add Item
                                        </button>
                                    </div>

                                    <Reorder.Group 
                                        axis="y" 
                                        values={sectionsData[section.key]?.[section.fieldName!] || []} 
                                        onReorder={(newOrder) => handleChange(section.key, section.fieldName!, newOrder)}
                                        className="space-y-4"
                                    >
                                        {(sectionsData[section.key]?.[section.fieldName!] || []).map((item: any) => (
                                            <Reorder.Item 
                                                key={item.id} 
                                                value={item}
                                                className="bg-black/[0.02] border border-black/5 p-6 flex gap-6 items-start group/item"
                                            >
                                                <div className="mt-4 cursor-grab active:cursor-grabbing text-black/20 group-hover/item:text-black/40 transition-colors">
                                                    <GripVertical className="w-4 h-4" />
                                                </div>

                                                <div className="flex-1 space-y-6">
                                                    {section.key === 'hero' ? (
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                            <div className="space-y-2">
                                                                <label className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-black/40">
                                                                    <ImageIcon className="w-3 h-3" /> Image URL
                                                                </label>
                                                                <input 
                                                                    value={item.image}
                                                                    onChange={(e) => updateItem(section.key, section.fieldName!, item.id, "image", e.target.value)}
                                                                    className="w-full bg-white border border-black/10 px-4 py-3 text-sm focus:border-black outline-none transition-colors"
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Description</label>
                                                                <AutoResizingTextarea 
                                                                    value={item.description}
                                                                    onChange={(val) => updateItem(section.key, section.fieldName!, item.id, "description", val)}
                                                                    className="bg-white border border-black/10 px-4 py-3 text-sm focus:border-black outline-none transition-colors"
                                                                />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                            <div className="space-y-4">
                                                                <div className="space-y-2">
                                                                    <label className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-black/40"><Type className="w-3 h-3" /> Title</label>
                                                                    <input value={item.title} onChange={(e) => updateItem(section.key, section.fieldName!, item.id, "title", e.target.value)} className="w-full bg-white border border-black/10 px-4 py-3 text-sm focus:border-black outline-none" />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <label className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-black/40"><Tag className="w-3 h-3" /> Category</label>
                                                                    <input value={item.category} onChange={(e) => updateItem(section.key, section.fieldName!, item.id, "category", e.target.value)} className="w-full bg-white border border-black/10 px-4 py-3 text-sm focus:border-black outline-none" />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <label className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-black/40"><ImageIcon className="w-3 h-3" /> Image URL</label>
                                                                    <input value={item.image} onChange={(e) => updateItem(section.key, section.fieldName!, item.id, "image", e.target.value)} className="w-full bg-white border border-black/10 px-4 py-3 text-sm focus:border-black outline-none" />
                                                                </div>
                                                            </div>
                                                            <div className="space-y-4">
                                                                <div className="space-y-2">
                                                                    <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Preview Description</label>
                                                                    <AutoResizingTextarea 
                                                                        value={item.description} 
                                                                        onChange={(val) => updateItem(section.key, section.fieldName!, item.id, "description", val)} 
                                                                        className="bg-white border border-black/10 px-4 py-3 text-sm focus:border-black outline-none" 
                                                                    />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Modal Detail Text</label>
                                                                    <AutoResizingTextarea 
                                                                        value={item.modal_text} 
                                                                        onChange={(val) => updateItem(section.key, section.fieldName!, item.id, "modal_text", val)} 
                                                                        className="bg-white border border-black/10 px-4 py-3 text-sm focus:border-black outline-none" 
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                <button 
                                                    onClick={() => removeItem(section.key, section.fieldName!, item.id)}
                                                    className="mt-4 text-black/20 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </Reorder.Item>
                                        ))}
                                    </Reorder.Group>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {section.fields?.map((field) => (
                                        <div key={field} className="space-y-2">
                                            <label className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-black/40">
                                                {field.includes('url') ? <ImageIcon className="w-3 h-3" /> : <div className="w-1 h-1 bg-black/20" />}
                                                {field.replace(/_/g, ' ')}
                                            </label>
                                            <AutoResizingTextarea 
                                                value={sectionsData[section.key]?.[field] || ""}
                                                onChange={(val) => handleChange(section.key, field, val)}
                                                className="bg-black/[0.02] border border-black/10 px-4 py-4 text-sm font-medium focus:border-black outline-none transition-colors"
                                                placeholder={`Enter ${field.replace(/_/g, ' ')}...`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
