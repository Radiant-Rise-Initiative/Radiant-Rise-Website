"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export interface HeroProps {
    title: React.ReactNode;
    description: string | string[];
    images: string[];
    actionText?: string;
    onActionClick?: () => void;
    className?: string;
    imageClassName?: string;
    imageStyle?: React.CSSProperties;
    contentClassName?: string;
    contentStyle?: React.CSSProperties;
}

export function HeroUI({
    title,
    description,
    images,
    actionText,
    onActionClick,
    className,
    imageClassName,
    imageStyle,
    contentClassName,
    contentStyle
}: HeroProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    useEffect(() => {
        if (!images || images.length <= 1 || isPaused) return;

        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [images, isPaused]);

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const opacityOverlay = useTransform(scrollYProgress, [0, 1], [0, 0.5]);

    return (
        <section
            ref={ref}
            data-theme="dark"
            className={cn(
                "relative h-[100dvh] w-full overflow-hidden flex items-end px-6 md:px-12 pb-8",
                className
            )}
        >
            <motion.div
                className="absolute inset-0 z-0 h-[120%] will-change-transform" // Taller than container for parallax
                style={{
                    y: backgroundY,
                }}
            >
                <AnimatePresence mode="popLayout">
                    {images && images.length > 0 && (
                        <motion.div
                            key={currentImageIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5 }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={images[currentImageIndex]}
                                alt={typeof title === 'string' ? title : "Background"}
                                fill
                                className={cn("object-cover", imageClassName)}
                                style={imageStyle}
                                priority={currentImageIndex === 0}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
                <div className="absolute inset-0 bg-black/30 z-10" />
                <motion.div
                    className="absolute inset-0 bg-black z-20"
                    style={{ opacity: opacityOverlay }}
                />
            </motion.div>

            <motion.div
                className={cn("relative z-10 w-full will-change-transform", contentClassName)}
                style={{ ...contentStyle, y: textY, opacity: textOpacity }}
            >
                <div className="@container max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full">
                    <div className="flex flex-col md:flex-row items-start md:items-stretch justify-between gap-8 pb-8 border-b border-white/40">
                        <div className="max-w-xl">
                            <div className="relative min-h-[4.5rem]">
                                {Array.isArray(description) ? (
                                    <AnimatePresence mode="wait">
                                        <motion.p
                                            key={currentImageIndex % description.length}
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -12 }}
                                            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
                                            className="text-white text-lg md:text-xl font-medium leading-relaxed"
                                        >
                                            {description[currentImageIndex % description.length]}
                                        </motion.p>
                                    </AnimatePresence>
                                ) : (
                                    <p className="text-white text-lg md:text-xl font-medium leading-relaxed">
                                        {description}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col items-start md:items-end justify-between gap-4">
                            {images && images.length > 1 && (
                                <button
                                    onClick={() => setIsPaused(!isPaused)}
                                    className="text-white/60 hover:text-white transition-colors flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-mono mt-1.5"
                                    aria-label={isPaused ? "Play slides" : "Pause slides"}
                                >
                                    <span>{isPaused ? "Play" : "Pause"}</span>
                                    {isPaused ? <Play size={14} /> : <Pause size={14} />}
                                </button>
                            )}

                            {actionText && (
                                <Button
                                    variant="link"
                                    onClick={onActionClick}
                                    className="text-white text-lg p-0 h-auto font-medium hover:text-white/80 transition-colors group"
                                >
                                    {actionText}
                                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-primary w-full"></span>
                                </Button>
                            )}
                        </div>
                    </div>

                    <h1 className={cn(
                        "text-[10.5cqi] font-semibold text-white tracking-tighter leading-[0.8] mt-8 uppercase w-full",
                        typeof title === 'string' && "whitespace-nowrap [text-align-last:justify]"
                    )}>
                        {title}
                    </h1>
                </div>
            </motion.div>
        </section>
    );
}
