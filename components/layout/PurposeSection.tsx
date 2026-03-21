"use client";

import { useState } from "react";
import { PurposeStatement } from "@/components/ui/PurposeStatement";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function PurposeSection() {
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    return (
        <>
            <PurposeStatement
                title="Radiant Rise"
                description="Dedicated to breaking cycles of poverty by equipping young mothers and youths with the vocational skills, spiritual foundation, and resilience needed to thrive."
                imageSrc="/assets/images/hero_images/Hero 06.jpg"
                imageAlt="Radiant Rise Purpose"
                actionText="Play Trailer"
                onActionClick={() => setIsVideoOpen(true)}
                infoPoints={[
                    "To provide holistic empowerment that addresses not just economic needs, but emotional and spiritual well-being for lasting transformation.",
                    "To build sustainable futures where every participant becomes a pillar of strength, driving self-reliance and prosperity within their community."
                ]}
            />
            
            <AnimatePresence>
                {isVideoOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 lg:p-12 cursor-pointer"
                        onClick={() => setIsVideoOpen(false)}
                    >
                        <button 
                            onClick={() => setIsVideoOpen(false)}
                            className="absolute top-6 right-6 lg:top-12 lg:right-12 z-10 text-white/60 hover:text-white transition-colors bg-black/20 hover:bg-black/40 rounded-full p-3 backdrop-blur-xl border border-white/10"
                        >
                            <X size={24} />
                        </button>
                        
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-6xl aspect-video rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/10 bg-black"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <video 
                                src="/assets/images/video_stories/Radiant%20Rise%20Story.mp4" 
                                controls 
                                autoPlay 
                                playsInline
                                className="w-full h-full object-contain"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
