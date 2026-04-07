"use client";

import { useState } from "react";
import { ImageIcon, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { s } from "@/lib/utils/sanitizer";
import { cn } from "@/lib/utils";

interface ImagePreviewProps {
    url: string;
    className?: string;
}

type PreviewSize = 'S' | 'M' | 'L';

const SIZE_MAP = {
    'S': 'w-[120px] h-[68px]',
    'M': 'w-[240px] h-[135px]',
    'L': 'w-[360px] h-[202px]'
};

export function ImagePreview({ url, className }: ImagePreviewProps) {
    const [size, setSize] = useState<PreviewSize>('S');
    const [hasError, setHasError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Sanitize the URL before displaying
    const sanitizedUrl = s(url);

    const toggleSizes: PreviewSize[] = ['S', 'M', 'L'];

    return (
        <div className={cn("space-y-3", className)}>
            <div className="flex items-center justify-between gap-4">
                <label className="text-[10px] font-mono tracking-widest uppercase text-black/40">Visual Preview</label>
                
                {/* Size Toggle */}
                <div className="flex bg-black/[0.03] p-0.5 rounded-sm">
                    {toggleSizes.map((s) => (
                        <button
                            key={s}
                            onClick={() => setSize(s)}
                            className={cn(
                                "px-2 py-0.5 text-[9px] font-mono transition-all duration-200",
                                size === s ? "bg-black text-white shadow-sm" : "hover:text-black text-black/30"
                            )}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            <motion.div 
                layout
                className={cn(
                    "relative bg-black/[0.02] border border-black/10 overflow-hidden group",
                    SIZE_MAP[size]
                )}
            >
                <AnimatePresence mode="wait">
                    {!url || hasError ? (
                        <motion.div 
                            key="error"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex flex-col items-center justify-center text-black/10 gap-2"
                        >
                            {hasError ? <AlertCircle className="w-5 h-5 text-red-500/30" /> : <ImageIcon className="w-5 h-5" />}
                            <span className="text-[8px] font-mono uppercase tracking-widest">
                                {hasError ? "Link Inactive" : "No Asset"}
                            </span>
                        </motion.div>
                    ) : (
                        <motion.img 
                            key={sanitizedUrl}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isLoaded ? 1 : 0 }}
                            className="absolute inset-0 w-full h-full object-cover"
                            src={sanitizedUrl}
                            alt="Preview"
                            onLoad={() => {
                                setIsLoaded(true);
                                setHasError(false);
                            }}
                            onError={() => setHasError(true)}
                        />
                    )}
                </AnimatePresence>

                {/* Loading State Overlay */}
                {!isLoaded && url && !hasError && (
                    <div className="absolute inset-0 bg-black/[0.02] animate-pulse flex items-center justify-center">
                         <div className="w-1 h-1 bg-black/10 rounded-full animate-bounce" />
                    </div>
                )}
            </motion.div>
        </div>
    );
}
