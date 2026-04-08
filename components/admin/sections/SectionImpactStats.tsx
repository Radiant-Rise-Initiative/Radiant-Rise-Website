"use client";

import { Plus, GripVertical } from "lucide-react";
import { DeleteConfirmation } from "@/components/admin/DeleteConfirmation";
import { Reorder } from "framer-motion";
import { AutoResizingTextarea } from "@/components/admin/AutoResizingTextarea";

interface SectionImpactStatsProps {
    data: any;
    setData: (data: any) => void;
}

export function SectionImpactStats({ data, setData }: SectionImpactStatsProps) {
    const stats = data?.stats || [];

    const handleChange = (field: string, value: string) => {
        setData({ ...data, [field]: value });
    };

    const addStat = () => {
        const newStat = { 
            id: Math.random().toString(36).substr(2, 9), 
            label: "", value: "", modalTitle: "", description: "" 
        };
        setData({ ...data, stats: [...stats, newStat] });
    };

    const removeStat = (id: string) => {
        setData({ ...data, stats: stats.filter((s: any) => s.id !== id) });
    };

    const updateStat = (id: string, field: string, value: string) => {
        const updated = stats.map((s: any) => s.id === id ? { ...s, [field]: value } : s);
        setData({ ...data, stats: updated });
    };

    return (
        <div className="space-y-12">
            {/* 1. Global Narrative */}
            <div className="space-y-8">
                <h4 className="text-[10px] font-mono tracking-widest uppercase text-black/40">Section Heading</h4>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Title</label>
                        <AutoResizingTextarea 
                            value={data?.title || ""}
                            onChange={(val) => handleChange('title', val)}
                            className="bg-black/[0.02] border border-black/10 px-4 py-4 text-sm font-medium focus:border-black outline-none transition-colors"
                        />
                    </div>
                </div>
            </div>

            <div className="border-b border-dashed border-black/10" />

            {/* 2. Dynamic Metric Grid */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h4 className="text-[10px] font-mono tracking-widest uppercase text-black/40">Impact Metrics Grid</h4>
                        <p className="text-xs text-black/60">Manage individual impact milestones</p>
                    </div>
                    <button 
                        onClick={addStat}
                        className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-black/60 hover:text-black transition-colors"
                    >
                        <Plus className="w-3 h-3" /> Add Metric
                    </button>
                </div>

                <Reorder.Group 
                    axis="y" 
                    values={stats} 
                    onReorder={(newOrder) => setData({ ...data, stats: newOrder })}
                    className="space-y-4"
                >
                    {stats.map((item: any) => (
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
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="col-span-2 space-y-2">
                                                <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Short Label</label>
                                                <input value={item.label} onChange={(e) => updateStat(item.id, "label", e.target.value)} className="w-full bg-white border border-black/10 px-4 py-3 text-sm focus:border-black outline-none" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Value</label>
                                                <input value={item.value} onChange={(e) => updateStat(item.id, "value", e.target.value)} className="w-full bg-white border border-black/10 px-4 py-3 text-sm focus:border-black outline-none text-center font-bold" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Modal Heading</label>
                                            <input value={item.modalTitle} onChange={(e) => updateStat(item.id, "modalTitle", e.target.value)} className="w-full bg-white border border-black/10 px-4 py-3 text-sm focus:border-black outline-none" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Detailed Impact Narrative</label>
                                        <AutoResizingTextarea value={item.description} onChange={(val) => updateStat(item.id, "description", val)} className="bg-white border border-black/10 px-4 py-3 text-sm focus:border-black outline-none" />
                                    </div>
                                </div>
                            </div>

                            <DeleteConfirmation 
                                onConfirm={() => removeStat(item.id)}
                                itemLabel="this stat"
                                className="mt-4"
                            />
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            </div>

            <div className="border-b border-dashed border-black/10" />

            {/* 3. Overall Statistics */}
            <div className="space-y-6">
                <h4 className="text-[10px] font-mono tracking-widest uppercase text-black/40">Overall Community Metrics</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Global Metric Label</label>
                        <input value={data?.metric_label || ""} onChange={(e) => handleChange('metric_label', e.target.value)} className="w-full bg-black/[0.02] border border-black/10 px-4 py-3 text-sm focus:border-black outline-none" />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Global Metric Value</label>
                        <input value={data?.metric_value || ""} onChange={(e) => handleChange('metric_value', e.target.value)} className="w-full bg-black/[0.02] border border-black/10 px-4 py-3 text-sm focus:border-black outline-none" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Mobilization Narrative</label>
                    <AutoResizingTextarea value={data?.description || ""} onChange={(val) => handleChange('description', val)} className="bg-black/[0.02] border border-black/10 px-4 py-4 text-sm font-medium focus:border-black outline-none" />
                </div>
            </div>
        </div>
    );
}
