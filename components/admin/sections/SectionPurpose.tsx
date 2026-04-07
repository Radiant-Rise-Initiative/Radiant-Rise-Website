"use client";

import { ImageIcon } from "lucide-react";
import { AutoResizingTextarea } from "@/components/admin/AutoResizingTextarea";
import { ImagePreview } from "@/components/admin/ImagePreview";

interface SectionPurposeProps {
    data: any;
    setData: (data: any) => void;
}

export function SectionPurpose({ data, setData }: SectionPurposeProps) {
    const handleChange = (field: string, value: string) => {
        setData({ ...data, [field]: value });
    };

    const fields = [
        { key: "title", label: "Title" },
        { key: "description", label: "Description" },
        { key: "image_url", label: "Image URL", isUrl: true, hasPreview: true },
        { key: "video_url", label: "Video URL", isUrl: true, hasPreview: true },
        { key: "info_point_1", label: "Info Point 1" },
        { key: "info_point_2", label: "Info Point 2" },
    ];

    return (
        <div className="space-y-8">
            <h4 className="text-[10px] font-mono tracking-widest uppercase text-black/40 mb-4">Section Metadata</h4>
            <div className="grid grid-cols-1 gap-8">
                {fields.map((field) => (
                    <div key={field.key} className="space-y-4">
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-black/40">
                                {field.isUrl ? <ImageIcon className="w-3 h-3" /> : <div className="w-1 h-1 bg-black/20" />}
                                {field.label}
                            </label>
                            <AutoResizingTextarea 
                                value={data?.[field.key] || ""}
                                onChange={(val) => handleChange(field.key, val)}
                                className="bg-black/[0.02] border border-black/10 px-4 py-4 text-sm font-medium focus:border-black outline-none transition-colors"
                                placeholder={`Enter ${field.label.toLowerCase()}...`}
                            />
                        </div>
                        {field.hasPreview && data?.[field.key] && (
                            <ImagePreview url={data[field.key]} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
