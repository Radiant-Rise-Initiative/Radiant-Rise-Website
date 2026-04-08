"use client";

import { Plus, GripVertical, Image as ImageIcon } from "lucide-react";
import { DeleteConfirmation } from "@/components/admin/DeleteConfirmation";
import { Reorder } from "framer-motion";
import { AutoResizingTextarea } from "@/components/admin/AutoResizingTextarea";
import { ImagePreview } from "@/components/admin/ImagePreview";

interface SectionHeroProps {
    data: any;
    setData: (data: any) => void;
}

export function SectionHero({ data, setData }: SectionHeroProps) {
    const slides = data?.slides || [];

    const addSlide = () => {
        const newSlide = { id: Math.random().toString(36).substr(2, 9), image: "", description: "" };
        setData({ ...data, slides: [...slides, newSlide] });
    };

    const removeSlide = (id: string) => {
        setData({ ...data, slides: slides.filter((s: any) => s.id !== id) });
    };

    const updateSlide = (id: string, field: string, value: string) => {
        const updated = slides.map((s: any) => s.id === id ? { ...s, [field]: value } : s);
        setData({ ...data, slides: updated });
    };

    const handleReorder = (newOrder: any[]) => {
        setData({ ...data, slides: newOrder });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h4 className="text-[10px] font-mono tracking-widest uppercase text-black/40">Manage Hero Slides</h4>
                    <p className="text-xs text-black/60">Drag handles to reorder</p>
                </div>
                <button 
                    onClick={addSlide}
                    className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-black/60 hover:text-black transition-colors"
                >
                    <Plus className="w-3 h-3" /> Add Slide
                </button>
            </div>

            <Reorder.Group 
                axis="y" 
                values={slides} 
                onReorder={handleReorder}
                className="space-y-4"
            >
                {slides.map((item: any) => (
                    <Reorder.Item 
                        key={item.id} 
                        value={item}
                        className="bg-black/[0.02] border border-black/5 p-6 flex gap-6 items-start group/item"
                    >
                        <div className="mt-4 cursor-grab active:cursor-grabbing text-black/20 group-hover/item:text-black/40 transition-colors">
                            <GripVertical className="w-4 h-4" />
                        </div>

                        <div className="flex-1 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-black/40">
                                            <ImageIcon className="w-3 h-3" /> Image URL
                                        </label>
                                        <input 
                                            value={item.image}
                                            onChange={(e) => updateSlide(item.id, "image", e.target.value)}
                                            className="w-full bg-white border border-black/10 px-4 py-3 text-sm focus:border-black outline-none transition-colors"
                                        />
                                    </div>
                                    <ImagePreview url={item.image} />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Description</label>
                                    <AutoResizingTextarea 
                                        value={item.description}
                                        onChange={(val) => updateSlide(item.id, "description", val)}
                                        className="bg-white border border-black/10 px-4 py-3 text-sm focus:border-black outline-none transition-colors"
                                    />
                                </div>
                            </div>
                        </div>

                        <DeleteConfirmation 
                            onConfirm={() => removeSlide(item.id)}
                            itemLabel="this slide"
                            className="mt-4"
                        />
                    </Reorder.Item>
                ))}
            </Reorder.Group>
        </div>
    );
}
