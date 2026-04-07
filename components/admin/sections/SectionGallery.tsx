"use client";

import { Plus, Trash2, GripVertical, Image as ImageIcon } from "lucide-react";
import { Reorder } from "framer-motion";
import { ImagePreview } from "@/components/admin/ImagePreview";

interface SectionGalleryProps {
    data: any;
    setData: (data: any) => void;
}

export function SectionGallery({ data, setData }: SectionGalleryProps) {
    const items = data?.items || [];

    const addItem = () => {
        const newItem = { 
            id: Math.random().toString(36).substr(2, 9), 
            image: "", title: "", description: "" 
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
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h4 className="text-[10px] font-mono tracking-widest uppercase text-black/40">Initiative Gallery Grid</h4>
                    <p className="text-xs text-black/60">Manage the visual storytelling assets</p>
                </div>
                <button 
                    onClick={addItem}
                    className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-black/60 hover:text-black transition-colors"
                >
                    <Plus className="w-3 h-3" /> Add Image
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

                        <div className="flex-1 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-4 col-span-2">
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-black/40">
                                            <ImageIcon className="w-3 h-3" /> Image URL
                                        </label>
                                        <input 
                                            value={item.image}
                                            onChange={(e) => updateItem(item.id, "image", e.target.value)}
                                            className="w-full bg-white border border-black/10 px-4 py-3 text-sm focus:border-black outline-none transition-colors"
                                        />
                                    </div>
                                    <ImagePreview url={item.image} />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Asset Label</label>
                                    <input 
                                        value={item.title}
                                        onChange={(e) => updateItem(item.id, "subtitle", e.target.value)}
                                        className="w-full bg-white border border-black/10 px-4 py-3 text-sm focus:border-black outline-none transition-colors"
                                    />
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
    );
}
