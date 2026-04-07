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
    { key: "impact_stats", label: "Impact Statistics", fields: ["title", "description", "metric_label", "metric_value"], isMulti: true, fieldName: 'stats' },
    { key: "who_we_are", label: "Who We Are", fields: ["title", "description", "image_url"] },
    { key: "our_targets", label: "Our Targets", fields: ["title", "linkText", "href"], isMulti: true, fieldName: 'items' },
    { key: "impact_milestones", label: "Impact Milestones", fields: ["sectionLabel"], isMulti: true, fieldName: 'testimonials' },
    { key: "got_questions", label: "Got Questions", fields: ["title", "linkText", "href"], isMulti: true, fieldName: 'items' },
    { key: "our_values", label: "Our Values" },
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
        let newItem: any;
        
        switch (sectionKey) {
            case 'hero':
                newItem = { id: Math.random().toString(36).substr(2, 9), image: "", description: "" };
                break;
            case 'theories_of_change':
                newItem = { id: Math.random().toString(36).substr(2, 9), stage: "", name: "", includes: "" };
                break;
            case 'impact_stats':
                newItem = { 
                    id: Math.random().toString(36).substr(2, 9), 
                    label: "", value: "", modalTitle: "", description: "" 
                };
                break;
            case 'who_we_are':
                newItem = { 
                    id: Math.random().toString(36).substr(2, 9), 
                    title: "", description: "", modalTagline: "", modalTitle: "", modalText: "" 
                };
                break;
            case 'our_values':
                newItem = { 
                    id: Math.random().toString(36).substr(2, 9), 
                    label: "", headline: "", bottomTagline: "",
                    features: [
                        { title: "", text: "" },
                        { title: "", text: "" },
                        { title: "" , text: "" }
                    ]
                };
                break;
            case 'our_targets':
                newItem = { 
                    id: Math.random().toString(36).substr(2, 9), 
                    name: "", logo: "", description: "", image: "" 
                };
                break;
            case 'impact_milestones':
                newItem = { 
                    id: Math.random().toString(36).substr(2, 9), 
                    category: "", quote: "", role: "", company: "", image: "" 
                };
                break;
            case 'got_questions':
                newItem = { 
                    id: Math.random().toString(36).substr(2, 9), 
                    question: "", answer: "" 
                };
                break;
            default:
                newItem = { id: Math.random().toString(36).substr(2, 9), title: "", category: "", description: "", image: "", modal_title: "", modal_text: "" };
        }
        
        const currentItems = sectionsData[sectionKey]?.[fieldName] || [];
        handleChange(sectionKey, fieldName, [...currentItems, newItem]);
    };

    const removeItem = (sectionKey: string, fieldName: string, id: string) => {
        const currentItems = sectionsData[sectionKey]?.[fieldName] || [];
        handleChange(sectionKey, fieldName, currentItems.filter((i: any) => i.id !== id));
    };

    const updateItem = (sectionKey: string, fieldName: string, id: string, field: string, value: any) => {
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

                        {/* Section Content */}
                        <div className="p-8 space-y-8">
                            {section.key === 'impact_stats' ? (
                                // Special Layout for Our Impact
                                <div className="space-y-8">
                                    {/* 1. Title at Top */}
                                    <div className="space-y-4">
                                        <h4 className="text-[10px] font-mono tracking-widest uppercase text-black/40">Section Title</h4>
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-black/40">
                                                <div className="w-1 h-1 bg-black/20" /> Title
                                            </label>
                                            <AutoResizingTextarea 
                                                value={sectionsData[section.key]?.title || ""}
                                                onChange={(val) => handleChange(section.key, 'title', val)}
                                                className="bg-black/[0.02] border border-black/10 px-4 py-4 text-sm font-medium focus:border-black outline-none transition-colors"
                                            />
                                        </div>
                                        </div>
                                    {/* 2. Grid Items in Middle */}
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-1">
                                                <h4 className="text-[10px] font-mono tracking-widest uppercase text-black/40">Manage Impact Grid Items</h4>
                                                <p className="text-xs text-black/60">Drag handles to reorder</p>
                                            </div>
                                            <button 
                                                onClick={() => addItem(section.key, 'stats')}
                                                className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-black/60 hover:text-black transition-colors"
                                            >
                                                <Plus className="w-3 h-3" /> Add Item
                                            </button>
                                        </div>


                                        <Reorder.Group 
                                            axis="y" 
                                            values={sectionsData[section.key]?.stats || []} 
                                            onReorder={(newOrder) => handleChange(section.key, 'stats', newOrder)}
                                            className="space-y-4"
                                        >
                                            {(sectionsData[section.key]?.stats || []).map((item: any) => (
                                                <Reorder.Item 
                                                    key={item.id} 
                                                    value={item}
                                                    className="bg-black/[0.02] border border-black/5 p-6 flex gap-6 items-start group/item"

                                                >
                                                    <div className="mt-4 cursor-grab active:cursor-grabbing text-black/20 group-hover/item:text-black/40 transition-colors">
                                                        <GripVertical className="w-4 h-4" />
                                                    </div>

                                                    <div className="flex-1 space-y-6">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                            {/* Main Metric Info */}
                                                            <div className="space-y-4">
                                                                <div className="grid grid-cols-3 gap-4">
                                                                    <div className="col-span-2 space-y-2">
                                                                        <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Label</label>
                                                                        <input value={item.label} onChange={(e) => updateItem(section.key, 'stats', item.id, "label", e.target.value)} className="w-full bg-white border border-black/10 px-4 py-3 text-sm focus:border-black outline-none" />
                                                                    </div>
                                                                    <div className="space-y-2">
                                                                        <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Value</label>
                                                                        <input value={item.value} onChange={(e) => updateItem(section.key, 'stats', item.id, "value", e.target.value)} className="w-full bg-white border border-black/10 px-4 py-3 text-sm focus:border-black outline-none text-center font-bold" />
                                                                    </div>
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Modal Title (Full Heading)</label>
                                                                    <input value={item.modalTitle} onChange={(e) => updateItem(section.key, 'stats', item.id, "modalTitle", e.target.value)} className="w-full bg-white border border-black/10 px-4 py-3 text-sm focus:border-black outline-none" />
                                                                </div>
                                                            </div>

                                                            {/* Long Description */}
                                                            <div className="space-y-2">
                                                                <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Modal Description (Detailed Impact Narrative)</label>
                                                                <AutoResizingTextarea value={item.description} onChange={(val) => updateItem(section.key, 'stats', item.id, "description", val)} className="bg-white border border-black/10 px-4 py-3 text-sm focus:border-black outline-none" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <button 
                                                        onClick={() => removeItem(section.key, 'stats', item.id)}
                                                        className="mt-4 text-black/20 hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </Reorder.Item>
                                            ))}
                                        </Reorder.Group>
                                    </div>

                                    <div className="border-b border-dashed border-black/10" />

                                    {/* 3. Overall Metrics at Bottom */}
                                    <div className="space-y-6">
                                        <h4 className="text-[10px] font-mono tracking-widest uppercase text-black/40">Overall Mobilization Metrics</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Overall Metric Label</label>
                                                <input 
                                                    value={sectionsData[section.key]?.metric_label || ""}
                                                    onChange={(e) => handleChange(section.key, 'metric_label', e.target.value)}
                                                    className="w-full bg-black/[0.02] border border-black/10 px-4 py-3 text-sm focus:border-black outline-none"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Overall Metric Value</label>
                                                <input 
                                                    value={sectionsData[section.key]?.metric_value || ""}
                                                    onChange={(e) => handleChange(section.key, 'metric_value', e.target.value)}
                                                    className="w-full bg-black/[0.02] border border-black/10 px-4 py-3 text-sm focus:border-black outline-none"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Mobilization Description</label>
                                            <AutoResizingTextarea 
                                                value={sectionsData[section.key]?.description || ""}
                                                onChange={(val) => handleChange(section.key, 'description', val)}
                                                className="bg-black/[0.02] border border-black/10 px-4 py-4 text-sm font-medium focus:border-black outline-none transition-colors"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : section.key === 'who_we_are' ? (
                                // Custom Layout for Who We Are
                                <div className="space-y-10">
                                    {/* 1. Metadata at Top */}
                                    <div className="space-y-6">
                                        <h4 className="text-[10px] font-mono tracking-widest uppercase text-black/40">Section Metadata</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Section Title</label>
                                                <input 
                                                    value={sectionsData[section.key]?.title || ""}
                                                    onChange={(e) => handleChange(section.key, 'title', e.target.value)}
                                                    className="w-full bg-black/[0.02] border border-black/10 px-4 py-3 text-sm focus:border-black outline-none"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Header Image URL</label>
                                                <input 
                                                    value={sectionsData[section.key]?.image_url || ""}
                                                    onChange={(e) => handleChange(section.key, 'image_url', e.target.value)}
                                                    className="w-full bg-black/[0.02] border border-black/10 px-4 py-3 text-sm focus:border-black outline-none"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Primary Description</label>
                                            <AutoResizingTextarea 
                                                value={sectionsData[section.key]?.description || ""}
                                                onChange={(val) => handleChange(section.key, 'description', val)}
                                                className="bg-black/[0.02] border border-black/10 px-4 py-4 text-sm font-medium focus:border-black outline-none transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div className="border-b border-dashed border-black/10" />

                                    {/* 2. Identity Phases in Middle */}
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-1">
                                                <h4 className="text-[10px] font-mono tracking-widest uppercase text-black/40">Identity Phases (4 Pillars)</h4>
                                                <p className="text-xs text-black/60">Manage the grid of phases and their modal content</p>
                                            </div>
                                            <button 
                                                onClick={() => addItem(section.key, 'items')}
                                                className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-black/60 hover:text-black transition-colors"
                                            >
                                                <Plus className="w-3 h-3" /> Add Phase
                                            </button>
                                        </div>

                                        <Reorder.Group 
                                            axis="y" 
                                            values={sectionsData[section.key]?.items || []} 
                                            onReorder={(newOrder) => handleChange(section.key, 'items', newOrder)}
                                            className="space-y-4"
                                        >
                                            {(sectionsData[section.key]?.items || []).map((item: any) => (
                                                <Reorder.Item 
                                                    key={item.id} 
                                                    value={item}
                                                    className="bg-black/[0.02] border border-black/5 p-6 flex gap-6 items-start group/item"
                                                >
                                                    <div className="mt-4 cursor-grab active:cursor-grabbing text-black/20 group-hover/item:text-black/40 transition-colors">
                                                        <GripVertical className="w-4 h-4" />
                                                    </div>

                                                    <div className="flex-1 space-y-6">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                            {/* Grid Information */}
                                                            <div className="space-y-4">
                                                                <div className="space-y-2">
                                                                    <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Phase Title</label>
                                                                    <input value={item.title} onChange={(e) => updateItem(section.key, 'items', item.id, "title", e.target.value)} className="w-full bg-white border border-black/10 px-4 py-3 text-sm focus:border-black outline-none" />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Short Description (on grid)</label>
                                                                    <AutoResizingTextarea value={item.description} onChange={(val) => updateItem(section.key, 'items', item.id, "description", val)} className="bg-white border border-black/10 px-4 py-3 text-sm focus:border-black outline-none" />
                                                                </div>
                                                            </div>

                                                            {/* Modal Information */}
                                                            <div className="space-y-4">
                                                                <div className="space-y-2">
                                                                    <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Modal Tagline</label>
                                                                    <input value={item.modalTagline} onChange={(e) => updateItem(section.key, 'items', item.id, "modalTagline", e.target.value)} className="w-full bg-white border border-black/10 px-4 py-3 text-sm focus:border-black outline-none" />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Detailed Narrative</label>
                                                                    <AutoResizingTextarea value={item.modalText} onChange={(val) => updateItem(section.key, 'items', item.id, "modalText", val)} className="bg-white border border-black/10 px-4 py-3 text-sm focus:border-black outline-none" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <button 
                                                        onClick={() => removeItem(section.key, 'items', item.id)}
                                                        className="mt-4 text-black/20 hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </Reorder.Item>
                                            ))}
                                        </Reorder.Group>
                                    </div>
                                </div>
                            ) : section.key === 'our_targets' ? (
                                // Custom Layout for Our Targets
                                <div className="space-y-10">
                                    <div className="space-y-6">
                                        <h4 className="text-[10px] font-mono tracking-widest uppercase text-black/40">Section Metadata</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="space-y-2">
                                                <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Section Title</label>
                                                <input value={sectionsData[section.key]?.title || ""} onChange={(e) => handleChange(section.key, 'title', e.target.value)} className="w-full bg-black/[0.02] border border-black/10 px-4 py-3 text-sm focus:border-black outline-none" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Link Text</label>
                                                <input value={sectionsData[section.key]?.linkText || ""} onChange={(e) => handleChange(section.key, 'linkText', e.target.value)} className="w-full bg-black/[0.02] border border-black/10 px-4 py-3 text-sm focus:border-black outline-none" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Link HREF</label>
                                                <input value={sectionsData[section.key]?.href || ""} onChange={(e) => handleChange(section.key, 'href', e.target.value)} className="w-full bg-black/[0.02] border border-black/10 px-4 py-3 text-sm focus:border-black outline-none" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-b border-dashed border-black/10" />
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-[10px] font-mono tracking-widest uppercase text-black/40">Target Items</h4>
                                            <button onClick={() => addItem(section.key, 'items')} className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-black/60 hover:text-black transition-colors">
                                                <Plus className="w-3 h-3" /> Add Target
                                            </button>
                                        </div>
                                        <Reorder.Group axis="y" values={sectionsData[section.key]?.items || []} onReorder={(newOrder) => handleChange(section.key, 'items', newOrder)} className="space-y-4">
                                            {(sectionsData[section.key]?.items || []).map((item: any) => (
                                                <Reorder.Item key={item.id} value={item} className="bg-black/[0.02] border border-black/5 p-6 flex gap-6 items-start group/item">
                                                    <div className="mt-4 cursor-grab active:cursor-grabbing text-black/20 group-hover/item:text-black/40"><GripVertical className="w-4 h-4" /></div>
                                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div className="space-y-4">
                                                            <div className="space-y-1"><label className="block text-[10px] font-mono tracking-widest text-black/40 uppercase">Name</label><input value={item.name} onChange={(e) => updateItem(section.key, 'items', item.id, "name", e.target.value)} className="w-full bg-white border border-black/10 px-3 py-2 text-sm outline-none focus:border-black" /></div>
                                                            <div className="space-y-1"><label className="block text-[10px] font-mono tracking-widest text-black/40 uppercase">Image URL</label><input value={item.image} onChange={(e) => updateItem(section.key, 'items', item.id, "image", e.target.value)} className="w-full bg-white border border-black/10 px-3 py-2 text-sm outline-none focus:border-black" /></div>
                                                        </div>
                                                        <div className="space-y-4">
                                                            <div className="space-y-1"><label className="block text-[10px] font-mono tracking-widest text-black/40 uppercase">Logo (Multi-line text)</label><AutoResizingTextarea value={item.logo} onChange={(val) => updateItem(section.key, 'items', item.id, "logo", val)} className="bg-white border border-black/10 px-3 py-2 text-sm outline-none focus:border-black font-mono leading-relaxed" /></div>
                                                            <div className="space-y-1"><label className="block text-[10px] font-mono tracking-widest text-black/40 uppercase">Description</label><AutoResizingTextarea value={item.description} onChange={(val) => updateItem(section.key, 'items', item.id, "description", val)} className="bg-white border border-black/10 px-3 py-2 text-sm outline-none focus:border-black" /></div>
                                                        </div>
                                                    </div>
                                                    <button onClick={() => removeItem(section.key, 'items', item.id)} className="mt-4 text-black/20 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                                                </Reorder.Item>
                                            ))}
                                        </Reorder.Group>
                                    </div>
                                </div>
                            ) : section.key === 'impact_milestones' ? (
                                // Custom Layout for Impact Milestones
                                <div className="space-y-10">
                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Section Label</label>
                                        <input value={sectionsData[section.key]?.sectionLabel || ""} onChange={(e) => handleChange(section.key, 'sectionLabel', e.target.value)} className="w-full bg-black/[0.02] border border-black/10 px-4 py-3 text-sm focus:border-black outline-none" />
                                    </div>
                                    <div className="border-b border-dashed border-black/10" />
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-[10px] font-mono tracking-widest uppercase text-black/40">Milestones (Testimonials)</h4>
                                            <button onClick={() => addItem(section.key, 'testimonials')} className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-black/60 hover:text-black transition-colors">
                                                <Plus className="w-3 h-3" /> Add Milestone
                                            </button>
                                        </div>
                                        <Reorder.Group axis="y" values={sectionsData[section.key]?.testimonials || []} onReorder={(newOrder) => handleChange(section.key, 'testimonials', newOrder)} className="space-y-4">
                                            {(sectionsData[section.key]?.testimonials || []).map((item: any) => (
                                                <Reorder.Item key={item.id} value={item} className="bg-black/[0.02] border border-black/5 p-6 flex gap-6 items-start group/item">
                                                    <div className="mt-4 cursor-grab active:cursor-grabbing text-black/20 group-hover/item:text-black/40"><GripVertical className="w-4 h-4" /></div>
                                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div className="space-y-4">
                                                            <div className="space-y-1"><label className="block text-[10px] font-mono tracking-widest text-black/40 uppercase">Category</label><input value={item.category} onChange={(e) => updateItem(section.key, 'testimonials', item.id, "category", e.target.value)} className="w-full bg-white border border-black/10 px-3 py-2 text-sm outline-none focus:border-black" /></div>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div className="space-y-1"><label className="block text-[10px] font-mono tracking-widest text-black/40 uppercase">Role</label><input value={item.role} onChange={(e) => updateItem(section.key, 'testimonials', item.id, "role", e.target.value)} className="w-full bg-white border border-black/10 px-3 py-2 text-sm outline-none focus:border-black" /></div>
                                                                <div className="space-y-1"><label className="block text-[10px] font-mono tracking-widest text-black/40 uppercase">Company</label><input value={item.company} onChange={(e) => updateItem(section.key, 'testimonials', item.id, "company", e.target.value)} className="w-full bg-white border border-black/10 px-3 py-2 text-sm outline-none focus:border-black" /></div>
                                                            </div>
                                                            <div className="space-y-1"><label className="block text-[10px] font-mono tracking-widest text-black/40 uppercase">Image URL</label><input value={item.image} onChange={(e) => updateItem(section.key, 'testimonials', item.id, "image", e.target.value)} className="w-full bg-white border border-black/10 px-3 py-2 text-sm outline-none focus:border-black" /></div>
                                                        </div>
                                                        <div className="space-y-1"><label className="block text-[10px] font-mono tracking-widest text-black/40 uppercase">Quote (Detailed Narrative)</label><AutoResizingTextarea value={item.quote} onChange={(val) => updateItem(section.key, 'testimonials', item.id, "quote", val)} className="bg-white border border-black/10 px-3 py-2 text-sm outline-none focus:border-black h-full" /></div>
                                                    </div>
                                                    <button onClick={() => removeItem(section.key, 'testimonials', item.id)} className="mt-4 text-black/20 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                                                </Reorder.Item>
                                            ))}
                                        </Reorder.Group>
                                    </div>
                                </div>
                            ) : section.key === 'got_questions' ? (
                                // Custom Layout for Got Questions (FAQs)
                                <div className="space-y-10">
                                    <div className="space-y-6">
                                        <h4 className="text-[10px] font-mono tracking-widest uppercase text-black/40">Section Metadata</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="space-y-2">
                                                <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Section Title</label>
                                                <input value={sectionsData[section.key]?.title || ""} onChange={(e) => handleChange(section.key, 'title', e.target.value)} className="w-full bg-black/[0.02] border border-black/10 px-4 py-3 text-sm focus:border-black outline-none" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Link Text</label>
                                                <input value={sectionsData[section.key]?.linkText || ""} onChange={(e) => handleChange(section.key, 'linkText', e.target.value)} className="w-full bg-black/[0.02] border border-black/10 px-4 py-3 text-sm focus:border-black outline-none" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Link HREF</label>
                                                <input value={sectionsData[section.key]?.href || ""} onChange={(e) => handleChange(section.key, 'href', e.target.value)} className="w-full bg-black/[0.02] border border-black/10 px-4 py-3 text-sm focus:border-black outline-none" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-b border-dashed border-black/10" />
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-[10px] font-mono tracking-widest uppercase text-black/40">Question & Answer Items</h4>
                                            <button onClick={() => addItem(section.key, 'items')} className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-black/60 hover:text-black transition-colors">
                                                <Plus className="w-3 h-3" /> Add FAQ
                                            </button>
                                        </div>
                                        <Reorder.Group axis="y" values={sectionsData[section.key]?.items || []} onReorder={(newOrder) => handleChange(section.key, 'items', newOrder)} className="space-y-4">
                                            {(sectionsData[section.key]?.items || []).map((item: any) => (
                                                <Reorder.Item key={item.id} value={item} className="bg-black/[0.02] border border-black/5 p-6 flex gap-6 items-start group/item">
                                                    <div className="mt-4 cursor-grab active:cursor-grabbing text-black/20 group-hover/item:text-black/40"><GripVertical className="w-4 h-4" /></div>
                                                    <div className="flex-1 space-y-4">
                                                        <div className="space-y-1"><label className="block text-[10px] font-mono tracking-widest text-black/40 uppercase">Question</label><input value={item.question} onChange={(e) => updateItem(section.key, 'items', item.id, "question", e.target.value)} className="w-full bg-white border border-black/10 px-4 py-3 text-sm outline-none focus:border-black" /></div>
                                                        <div className="space-y-1"><label className="block text-[10px] font-mono tracking-widest text-black/40 uppercase">Answer</label><AutoResizingTextarea value={item.answer} onChange={(val) => updateItem(section.key, 'items', item.id, "answer", val)} className="bg-white border border-black/10 px-4 py-3 text-sm outline-none focus:border-black" /></div>
                                                    </div>
                                                    <button onClick={() => removeItem(section.key, 'items', item.id)} className="mt-4 text-black/20 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                                                </Reorder.Item>
                                            ))}
                                        </Reorder.Group>
                                    </div>
                                </div>
                            ) : section.key === 'our_values' ? (
                                // Custom Layout for Our Values (Nested Tabs)
                                <div className="space-y-10">
                                    <div className="space-y-6">
                                        <h4 className="text-[10px] font-mono tracking-widest uppercase text-black/40">Section Metadata</h4>
                                        <div className="space-y-2">
                                            <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Section Title</label>
                                            <input 
                                                value={sectionsData[section.key]?.title || ""}
                                                onChange={(e) => handleChange(section.key, 'title', e.target.value)}
                                                className="w-full bg-black/[0.02] border border-black/10 px-4 py-3 text-sm focus:border-black outline-none"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Primary Description</label>
                                            <AutoResizingTextarea 
                                                value={sectionsData[section.key]?.description || ""}
                                                onChange={(val) => handleChange(section.key, 'description', val)}
                                                className="bg-black/[0.02] border border-black/10 px-4 py-4 text-sm font-medium focus:border-black outline-none transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div className="border-b border-dashed border-black/10" />

                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-1">
                                                <h4 className="text-[10px] font-mono tracking-widest uppercase text-black/40">Value Pillars (Tabs)</h4>
                                                <p className="text-xs text-black/60">Manage the automated rotating phases and their pillars</p>
                                            </div>
                                            <button 
                                                onClick={() => addItem(section.key, 'tabs')}
                                                className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-black/60 hover:text-black transition-colors"
                                            >
                                                <Plus className="w-3 h-3" /> Add Value
                                            </button>
                                        </div>

                                        <Reorder.Group 
                                            axis="y" 
                                            values={sectionsData[section.key]?.tabs || []} 
                                            onReorder={(newOrder) => handleChange(section.key, 'tabs', newOrder)}
                                            className="space-y-6"
                                        >
                                            {(sectionsData[section.key]?.tabs || []).map((tab: any) => (
                                                <Reorder.Item 
                                                    key={tab.id} 
                                                    value={tab}
                                                    className="bg-black/[0.02] border border-black/5 p-8 flex gap-6 items-start group/item"
                                                >
                                                    <div className="mt-4 cursor-grab active:cursor-grabbing text-black/20 group-hover/item:text-black/40 transition-colors">
                                                        <GripVertical className="w-4 h-4" />
                                                    </div>

                                                    <div className="flex-1 space-y-8">
                                                        {/* Tab Header Info */}
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                            <div className="space-y-2">
                                                                <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Phase Title</label>
                                                                <input value={tab.label} onChange={(e) => updateItem(section.key, 'tabs', tab.id, "label", e.target.value)} className="w-full bg-white border border-black/10 px-4 py-3 text-sm focus:border-black outline-none" />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Modal Tagline</label>
                                                                <input value={tab.bottomTagline} onChange={(e) => updateItem(section.key, 'tabs', tab.id, "bottomTagline", e.target.value)} className="w-full bg-white border border-black/10 px-4 py-3 text-sm focus:border-black outline-none" />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Short Description (on grid)</label>
                                                                <input value={tab.headline} onChange={(e) => updateItem(section.key, 'tabs', tab.id, "headline", e.target.value)} className="w-full bg-white border border-black/10 px-4 py-3 text-sm focus:border-black outline-none" />
                                                            </div>
                                                        </div>

                                                        {/* Nest Items (Features) */}
                                                        <div className="space-y-4">
                                                            <h4 className="text-[10px] font-mono uppercase tracking-widest text-black/40 border-b border-black/5 pb-2">Detailed Narrative (3 Pillars)</h4>
                                                            <div className="grid grid-cols-1 gap-4">
                                                                {(tab.features || []).map((feature: any, fIdx: number) => (
                                                                    <div key={fIdx} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                                                                        <div className="space-y-1">
                                                                            <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Pillar {fIdx + 1} Title</label>
                                                                            <input 
                                                                                value={feature.title} 
                                                                                onChange={(e) => {
                                                                                    const newFeatures = [...tab.features];
                                                                                    newFeatures[fIdx].title = e.target.value;
                                                                                    updateItem(section.key, 'tabs', tab.id, "features", newFeatures);
                                                                                }} 
                                                                                className="w-full bg-white border border-black/10 px-3 py-2 text-sm focus:border-black outline-none" 
                                                                            />
                                                                        </div>
                                                                        <div className="md:col-span-3 space-y-1">
                                                                            <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Pillar {fIdx + 1} Description</label>
                                                                            <textarea 
                                                                                value={feature.text} 
                                                                                onChange={(e) => {
                                                                                    const newFeatures = [...tab.features];
                                                                                    newFeatures[fIdx].text = e.target.value;
                                                                                    updateItem(section.key, 'tabs', tab.id, "features", newFeatures);
                                                                                }} 
                                                                                rows={2}
                                                                                className="w-full bg-white border border-black/10 px-3 py-2 text-sm focus:border-black outline-none resize-none"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <button 
                                                        onClick={() => removeItem(section.key, 'tabs', tab.id)}
                                                        className="mt-4 text-black/20 hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </Reorder.Item>
                                            ))}
                                        </Reorder.Group>
                                    </div>
                                </div>
                            ) : (
                                // Original Combined Layout for Other Sections
                                <>
                                    {/* Metadata Fields (if any) */}
                                    {section.fields && (
                                        <div className="space-y-6 pb-6 border-b border-dashed border-black/10">
                                            <h4 className="text-[10px] font-mono tracking-widest uppercase text-black/40 mb-4">Section Metadata</h4>
                                            {section.fields.map((field) => (
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

                                    {/* Multi-Item Management (if any) */}
                                    {section.isMulti && (
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
                                                            ) : section.key === 'theories_of_change' ? (
                                                                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                                                                    <div className="md:col-span-1 space-y-2">
                                                                        <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Stage</label>
                                                                        <input 
                                                                            value={item.stage} 
                                                                            onChange={(e) => updateItem(section.key, section.fieldName!, item.id, "stage", e.target.value)} 
                                                                            className="w-full bg-white border border-black/10 px-4 py-3 text-sm focus:border-black outline-none" 
                                                                        />
                                                                    </div>
                                                                    <div className="md:col-span-3 space-y-2">
                                                                        <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Name</label>
                                                                        <input 
                                                                            value={item.name} 
                                                                            onChange={(e) => updateItem(section.key, section.fieldName!, item.id, "name", e.target.value)} 
                                                                            className="w-full bg-white border border-black/10 px-4 py-3 text-sm focus:border-black outline-none font-bold tracking-tighter" 
                                                                        />
                                                                    </div>
                                                                    <div className="md:col-span-8 space-y-2">
                                                                        <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Description (Includes)</label>
                                                                        <AutoResizingTextarea 
                                                                            value={item.includes} 
                                                                            onChange={(val) => updateItem(section.key, section.fieldName!, item.id, "includes", val)} 
                                                                            className="bg-white border border-black/10 px-4 py-3 text-sm focus:border-black outline-none" 
                                                                        />
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                    <div className="space-y-4">
                                                                        <div className="space-y-2">
                                                                            <label className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-black/40"><Type className="w-3 h-3" /> Title</label>
                                                                            <input value={item.title || ""} onChange={(e) => updateItem(section.key, section.fieldName!, item.id, "title", e.target.value)} className="w-full bg-white border border-black/10 px-4 py-3 text-sm focus:border-black outline-none" />
                                                                        </div>
                                                                        <div className="space-y-2">
                                                                            <label className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-black/40"><Tag className="w-3 h-3" /> Category</label>
                                                                            <input value={item.category || ""} onChange={(e) => updateItem(section.key, section.fieldName!, item.id, "category", e.target.value)} className="w-full bg-white border border-black/10 px-4 py-3 text-sm focus:border-black outline-none" />
                                                                        </div>
                                                                        <div className="space-y-2">
                                                                            <label className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-black/40"><ImageIcon className="w-3 h-3" /> Image URL</label>
                                                                            <input value={item.image || ""} onChange={(e) => updateItem(section.key, section.fieldName!, item.id, "image", e.target.value)} className="w-full bg-white border border-black/10 px-4 py-3 text-sm focus:border-black outline-none" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="space-y-4">
                                                                        <div className="space-y-2">
                                                                            <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Preview Description</label>
                                                                            <AutoResizingTextarea 
                                                                                value={item.description || ""} 
                                                                                onChange={(val) => updateItem(section.key, section.fieldName!, item.id, "description", val)} 
                                                                                className="bg-white border border-black/10 px-4 py-3 text-sm focus:border-black outline-none" 
                                                                            />
                                                                        </div>
                                                                        <div className="space-y-2">
                                                                            <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Modal Detail Text</label>
                                                                            <AutoResizingTextarea 
                                                                                value={item.modal_text || ""} 
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
                                    )}
                                </>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
