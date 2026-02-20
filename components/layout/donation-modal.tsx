"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { DonationInterface } from "./donation-interface";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface DonationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function DonationModal({ isOpen, onClose }: DonationModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="bg-[#f8f9fa] w-full max-w-[600px] shadow-2xl pointer-events-auto relative"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 bg-black text-white rounded-full hover:bg-black/80 transition-colors z-10"
                            >
                                <X size={20} />
                            </button>

                            {/* Header */}
                            <div className="p-8 pb-4 bg-[#f5f5f7] border-b border-black/5">
                                <h2 className="text-xl font-bold tracking-tight text-black">Support Radiant Rise</h2>
                            </div>

                            {/* Top Accent Line */}
                            <div className="h-px bg-black/5" />

                            {/* Donation UI */}
                            <div className="p-8 md:p-10 bg-[#f8f9fa]">
                                <DonationInterface />
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
}
