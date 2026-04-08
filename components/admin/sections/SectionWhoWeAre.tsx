"use client";

import { Plus, GripVertical } from "lucide-react";
import { DeleteConfirmation } from "@/components/admin/DeleteConfirmation";
import { Reorder } from "framer-motion";
import { AutoResizingTextarea } from "@/components/admin/AutoResizingTextarea";

interface SectionWhoWeAreProps {
    data: any;
    setData: (data: any) => void;
}

export function SectionWhoWeAre({ data, setData }: SectionWhoWeAreProps) {
    const items = data?.items || [];

    const handleChange = (field: string, value: string) => {
        setData({ ...data, [field]: value });
    };

    const addItem = () => {
        const newItem = { 
            id: Math.random().toString(36).substr(2, 9), 
            title: "", description: "", modalTagline: "", modalText: "" 
        };
        setData({ ...data, items: [...items, newItem] });
    };

    const removeItem = (id: string) => {
        setData({ ...data, items: items.filter((i: any) => i.id !== id) });
    };

    const updateItem = (id: string, field: string, value: string) => {
        const updated = items.map((i: any) => i.id === id ? { ...i, [field]: value } : i);
        setData({ ...data, items: updated });
    };

    return (
        <div className="space-y-12">
            {/* 1. Metadata */}
            <div className="space-y-6">
                <h4 className="text-[10px] font-mono tracking-widest uppercase text-black/40">Section Identity</h4>
                <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                        <label className="block text-[10px) font-mono tracking-widest uppercase text-black/40">Title</label>
                        <input value={data?.title || ""} onChange={(e) => handleChange('title', e.target.value)} className="w-full bg-black/[0.02] border border-black/10 px-4 py-3 text-sm focus:border-black outline-none" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Mission Description</label>
                    <AutoResizingTextarea value={data?.description || ""} onChange={(val) => handleChange('description', val)} className="bg-black/[0.02] border border-black/10 px-4 py-4 text-sm font-medium focus:border-black outline-none" />
                </div>
            </div>

            <div className="border-b border-dashed border-black/10" />

            {/* 2. Identity Phases */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h4 className="text-[10px] font-mono tracking-widest uppercase text-black/40">Stabilization Phases (4 Pillars)</h4>
                        <p className="text-xs text-black/60">Manage the transformation pathway steps</p>
                    </div>
                    <button 
                        onClick={addItem}
                        className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-black/60 hover:text-black transition-colors"
                    >
                        <Plus className="w-3 h-3" /> Add Phase
                    </button>
                </div>

                <Reorder.Group 
                    axis="y" 
                    values={items} 
                    onReorder={(newOrder) => setData({ ...data, items: newOrder })}
                    className="space-y-4"
                >
                    {items.map((item: any, index: number) => (
                        <Reorder.Item 
                            key={item.id || `phase-${index}`} 
                            value={item}
                            className="bg-black/[0.02] border border-black/5 p-6 flex gap-6 items-start group/item"
                        >
                            <div className="mt-4 cursor-grab active:cursor-grabbing text-black/20 group-hover/item:text-black/40 transition-colors">
                                <GripVertical className="w-4 h-4" />
                            </div>

                            <div className="flex-1 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Phase Heading</label>
                                            <input value={item.title} onChange={(e) => updateItem(item.id, "title", e.target.value)} className="w-full bg-white border border-black/10 px-4 py-3 text-sm focus:border-black outline-none" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Summary (Grid Display)</label>
                                            <AutoResizingTextarea value={item.description} onChange={(val) => updateItem(item.id, "description", val)} className="bg-white border border-black/10 px-4 py-3 text-sm focus:border-black outline-none font-medium" />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Modal Tagline</label>
                                            <input value={item.modalTagline} onChange={(e) => updateItem(item.id, "modalTagline", e.target.value)} className="w-full bg-white border border-black/10 px-4 py-3 text-sm focus:border-black outline-none" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Detailed Transformation Narrative</label>
                                            <AutoResizingTextarea value={item.modalText} onChange={(val) => updateItem(item.id, "modalText", val)} className="bg-white border border-black/10 px-4 py-3 text-sm focus:border-black outline-none" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <DeleteConfirmation 
                                onConfirm={() => removeItem(item.id)}
                                itemLabel="this phase"
                                className="mt-4"
                            />
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            </div>
        </div>
    );
}
