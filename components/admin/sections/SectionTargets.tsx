"use client";

import { Plus, Trash2, GripVertical } from "lucide-react";
import { Reorder } from "framer-motion";
import { AutoResizingTextarea } from "@/components/admin/AutoResizingTextarea";

interface SectionTargetsProps {
    data: any;
    setData: (data: any) => void;
}

export function SectionTargets({ data, setData }: SectionTargetsProps) {
    const items = data?.items || [];

    const handleChange = (field: string, value: string) => {
        setData({ ...data, [field]: value });
    };

    const addItem = () => {
        const newItem = { 
            id: Math.random().toString(36).substr(2, 9), 
            name: "", logo: "", description: "", image: "" 
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
            <div className="space-y-6">
                <h4 className="text-[10px] font-mono tracking-widest uppercase text-black/40">Section Heading</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Title</label>
                        <input value={data?.title || ""} onChange={(e) => handleChange('title', e.target.value)} className="w-full bg-black/[0.02] border border-black/10 px-4 py-3 text-sm focus:border-black outline-none" />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Link Label</label>
                        <input value={data?.linkText || ""} onChange={(e) => handleChange('linkText', e.target.value)} className="w-full bg-black/[0.02] border border-black/10 px-4 py-3 text-sm focus:border-black outline-none" />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Navigation HREF</label>
                        <input value={data?.href || ""} onChange={(e) => handleChange('href', e.target.value)} className="w-full bg-black/[0.02] border border-black/10 px-4 py-3 text-sm focus:border-black outline-none" />
                    </div>
                </div>
            </div>

            <div className="border-b border-dashed border-black/10" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h4 className="text-[10px] font-mono tracking-widest uppercase text-black/40">Success Targets Grid</h4>
                        <p className="text-xs text-black/60">Manage individual impact objectives</p>
                    </div>
                    <button 
                        onClick={addItem}
                        className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-black/60 hover:text-black transition-colors"
                    >
                        <Plus className="w-3 h-3" /> Add Target
                    </button>
                </div>

                <Reorder.Group 
                    axis="y" 
                    values={items} 
                    onReorder={(newOrder) => setData({ ...data, items: newOrder })}
                    className="space-y-4"
                >
                    {items.map((item: any) => (
                        <Reorder.Item 
                            key={item.id} 
                            value={item}
                            className="bg-black/[0.02] border border-black/5 p-6 flex gap-6 items-start group/item"
                        >
                            <div className="mt-4 cursor-grab active:cursor-grabbing text-black/20 group-hover/item:text-black/40 transition-colors">
                                <GripVertical className="w-4 h-4" />
                            </div>

                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="block text-[10px] font-mono tracking-widest text-black/40 uppercase">Target Name</label>
                                        <input value={item.name} onChange={(e) => updateItem(item.id, "name", e.target.value)} className="w-full bg-white border border-black/10 px-3 py-2 text-sm outline-none focus:border-black" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-[10px] font-mono tracking-widest text-black/40 uppercase">Background Image URL</label>
                                        <input value={item.image} onChange={(e) => updateItem(item.id, "image", e.target.value)} className="w-full bg-white border border-black/10 px-3 py-2 text-sm outline-none focus:border-black" />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="block text-[10px] font-mono tracking-widest text-black/40 uppercase">Logo (Multi-line text)</label>
                                        <AutoResizingTextarea value={item.logo} onChange={(val) => updateItem(item.id, "logo", val)} className="bg-white border border-black/10 px-3 py-2 text-sm outline-none focus:border-black font-mono leading-relaxed" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-[10px] font-mono tracking-widest text-black/40 uppercase">Metric Description</label>
                                        <AutoResizingTextarea value={item.description} onChange={(val) => updateItem(item.id, "description", val)} className="bg-white border border-black/10 px-3 py-2 text-sm outline-none focus:border-black" />
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={() => removeItem(item.id)}
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
