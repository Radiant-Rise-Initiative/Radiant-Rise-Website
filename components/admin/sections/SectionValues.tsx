"use client";

import { Plus, Trash2, GripVertical } from "lucide-react";
import { Reorder } from "framer-motion";
import { AutoResizingTextarea } from "@/components/admin/AutoResizingTextarea";

interface SectionValuesProps {
    data: any;
    setData: (data: any) => void;
}

export function SectionValues({ data, setData }: SectionValuesProps) {
    const tabs = data?.tabs || [];

    const handleChange = (field: string, value: string) => {
        setData({ ...data, [field]: value });
    };

    const addTab = () => {
        const newTab = { 
            id: Math.random().toString(36).substr(2, 9), 
            label: "", headline: "", bottomTagline: "",
            features: [
                { title: "", text: "" },
                { title: "", text: "" },
                { title: "" , text: "" }
            ]
        };
        setData({ ...data, tabs: [...tabs, newTab] });
    };

    const removeTab = (id: string) => {
        setData({ ...data, tabs: tabs.filter((t: any) => t.id !== id) });
    };

    const updateTab = (id: string, field: string, value: any) => {
        const updated = tabs.map((t: any) => t.id === id ? { ...t, [field]: value } : t);
        setData({ ...data, tabs: updated });
    };

    return (
        <div className="space-y-12">
            <div className="space-y-6">
                <h4 className="text-[10px] font-mono tracking-widest uppercase text-black/40">Section Heading</h4>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Title</label>
                        <input value={data?.title || ""} onChange={(e) => handleChange('title', e.target.value)} className="w-full bg-black/[0.02] border border-black/10 px-4 py-3 text-sm focus:border-black outline-none" />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Primary Description</label>
                        <AutoResizingTextarea value={data?.description || ""} onChange={(val) => handleChange('description', val)} className="bg-black/[0.02] border border-black/10 px-4 py-4 text-sm font-medium focus:border-black outline-none" />
                    </div>
                </div>
            </div>

            <div className="border-b border-dashed border-black/10" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h4 className="text-[10px] font-mono tracking-widest uppercase text-black/40">Core Value Pillars (Tabs)</h4>
                        <p className="text-xs text-black/60">Manage the philosophical foundation of the initiative</p>
                    </div>
                    <button 
                        onClick={addTab}
                        className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-black/60 hover:text-black transition-colors"
                    >
                        <Plus className="w-3 h-3" /> Add Value
                    </button>
                </div>

                <Reorder.Group 
                    axis="y" 
                    values={tabs} 
                    onReorder={(newOrder) => setData({ ...data, tabs: newOrder })}
                    className="space-y-8"
                >
                    {tabs.map((tab: any) => (
                        <Reorder.Item 
                            key={tab.id} 
                            value={tab}
                            className="bg-black/[0.02] border border-black/5 p-8 flex gap-6 items-start group/item"
                        >
                            <div className="mt-4 cursor-grab active:cursor-grabbing text-black/20 group-hover/item:text-black/40 transition-colors">
                                <GripVertical className="w-4 h-4" />
                            </div>

                            <div className="flex-1 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Value Label</label>
                                        <input value={tab.label} onChange={(e) => updateTab(tab.id, "label", e.target.value)} className="w-full bg-white border border-black/10 px-4 py-3 text-sm focus:border-black outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Tagline Anchor</label>
                                        <input value={tab.bottomTagline} onChange={(e) => updateTab(tab.id, "bottomTagline", e.target.value)} className="w-full bg-white border border-black/10 px-4 py-3 text-sm focus:border-black outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Short Feature Headline</label>
                                        <input value={tab.headline} onChange={(e) => updateTab(tab.id, "headline", e.target.value)} className="w-full bg-white border border-black/10 px-4 py-3 text-sm focus:border-black outline-none" />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-black/40 border-b border-dashed border-black/10 pb-2">Detailed Narrative (3 Pillars)</h4>
                                    <div className="grid grid-cols-1 gap-4">
                                        {(tab.features || []).map((feature: any, fIdx: number) => (
                                            <div key={fIdx} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                                                <div className="space-y-1">
                                                    <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Pillar {fIdx + 1} Heading</label>
                                                    <input 
                                                        value={feature.title} 
                                                        onChange={(e) => {
                                                            const newFeatures = [...tab.features];
                                                            newFeatures[fIdx].title = e.target.value;
                                                            updateTab(tab.id, "features", newFeatures);
                                                        }} 
                                                        className="w-full bg-white border border-black/10 px-3 py-2 text-sm focus:border-black outline-none font-medium" 
                                                    />
                                                </div>
                                                <div className="md:col-span-3 space-y-1">
                                                    <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Pillar {fIdx + 1} Narrative</label>
                                                    <textarea 
                                                        value={feature.text} 
                                                        onChange={(e) => {
                                                            const newFeatures = [...tab.features];
                                                            newFeatures[fIdx].text = e.target.value;
                                                            updateTab(tab.id, "features", newFeatures);
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
                                onClick={() => removeTab(tab.id)}
                                className="mt-4 text-black/20 hover:text-red-500 transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            </div>
        </div>
    );
}
