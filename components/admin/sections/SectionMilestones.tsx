"use client";

import { Plus, GripVertical } from "lucide-react";
import { DeleteConfirmation } from "@/components/admin/DeleteConfirmation";
import { Reorder } from "framer-motion";
import { AutoResizingTextarea } from "@/components/admin/AutoResizingTextarea";
import { ImagePreview } from "@/components/admin/ImagePreview";

interface SectionMilestonesProps {
    data: any;
    setData: (data: any) => void;
}

export function SectionMilestones({ data, setData }: SectionMilestonesProps) {
    const testimonials = data?.testimonials || [];

    const handleChange = (field: string, value: string) => {
        setData({ ...data, [field]: value });
    };

    const addItem = () => {
        const newItem = { 
            id: Math.random().toString(36).substr(2, 9), 
            category: "", quote: "", role: "", company: "", image: "" 
        };
        setData({ ...data, testimonials: [...testimonials, newItem] });
    };

    const removeItem = (id: string) => {
        setData({ ...data, testimonials: testimonials.filter((i: any) => i.id !== id) });
    };

    const updateItem = (id: string, field: string, value: string) => {
        const updated = testimonials.map((i: any) => i.id === id ? { ...i, [field]: value } : i);
        setData({ ...data, testimonials: updated });
    };

    return (
        <div className="space-y-12">
            <div className="space-y-6">
                <h4 className="text-[10px] font-mono tracking-widest uppercase text-black/40">Section Heading</h4>
                <div className="space-y-2">
                    <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Navigation Label</label>
                    <input value={data?.sectionLabel || ""} onChange={(e) => handleChange('sectionLabel', e.target.value)} className="w-full bg-black/[0.02] border border-black/10 px-4 py-3 text-sm focus:border-black outline-none" />
                </div>
            </div>

            <div className="border-b border-dashed border-black/10" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h4 className="text-[10px] font-mono tracking-widest uppercase text-black/40">Impact Narratives (Testimonials)</h4>
                        <p className="text-xs text-black/60">Manage community success stories</p>
                    </div>
                    <button 
                        onClick={addItem}
                        className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-black/60 hover:text-black transition-colors"
                    >
                        <Plus className="w-3 h-3" /> Add Quote
                    </button>
                </div>

                <Reorder.Group 
                    axis="y" 
                    values={testimonials} 
                    onReorder={(newOrder) => setData({ ...data, testimonials: newOrder })}
                    className="space-y-4"
                >
                    {testimonials.map((item: any) => (
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
                                        <label className="block text-[10px] font-mono tracking-widest text-black/40 uppercase">Story Category</label>
                                        <input value={item.category} onChange={(e) => updateItem(item.id, "category", e.target.value)} className="w-full bg-white border border-black/10 px-3 py-2 text-sm outline-none focus:border-black" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="block text-[10px] font-mono tracking-widest text-black/40 uppercase">Attribution Role</label>
                                            <input value={item.role} onChange={(e) => updateItem(item.id, "role", e.target.value)} className="w-full bg-white border border-black/10 px-3 py-2 text-sm outline-none focus:border-black" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="block text-[10px] font-mono tracking-widest text-black/40 uppercase">Organization</label>
                                            <input value={item.company} onChange={(e) => updateItem(item.id, "company", e.target.value)} className="w-full bg-white border border-black/10 px-3 py-2 text-sm outline-none focus:border-black" />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-[10px] font-mono tracking-widest text-black/40 uppercase">Profile Image URL</label>
                                        <input value={item.image} onChange={(e) => updateItem(item.id, "image", e.target.value)} className="w-full bg-white border border-black/10 px-3 py-2 text-sm outline-none focus:border-black" />
                                        <ImagePreview url={item.image} className="mt-2" />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <label className="block text-[10px] font-mono tracking-widest text-black/40 uppercase mb-1">Detailed Quote / Narrative</label>
                                    <AutoResizingTextarea value={item.quote} onChange={(val) => updateItem(item.id, "quote", val)} className="bg-white border border-black/10 px-3 py-2 text-sm outline-none focus:border-black flex-1 min-h-[140px]" />
                                </div>
                            </div>

                            <DeleteConfirmation 
                                onConfirm={() => removeItem(item.id)}
                                itemLabel="this milestone"
                                className="mt-4"
                            />
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            </div>
        </div>
    );
}
