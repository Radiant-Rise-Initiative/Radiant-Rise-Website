"use client";

import { useState } from "react";
import { Trash2, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DeleteConfirmationProps {
    onConfirm: () => void;
    itemLabel?: string;
    className?: string;
}

export function DeleteConfirmation({ 
    onConfirm, 
    itemLabel = "this item",
    className = ""
}: DeleteConfirmationProps) {
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <>
            <button 
                onClick={() => setShowConfirm(true)}
                className={`p-2 text-black/20 hover:text-red-500 transition-colors ${className}`}
                title={`Delete ${itemLabel}`}
            >
                <Trash2 className="w-4 h-4" />
            </button>

            <AnimatePresence>
                {showConfirm && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowConfirm(false)}
                    >
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ type: "spring", duration: 0.4 }}
                            className="bg-white border border-black/5 p-8 max-w-sm w-full space-y-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-red-50 border border-red-200 rounded-full flex items-center justify-center shrink-0">
                                    <AlertTriangle className="w-4 h-4 text-red-500" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold tracking-tight">Delete {itemLabel}?</h3>
                                    <p className="text-[10px] font-mono text-black/40 uppercase tracking-widest leading-relaxed">
                                        This action will remove {itemLabel} from this section. The change will only take effect after you save and publish.
                                    </p>
                                </div>
                            </div>

                            <div className="p-3 bg-red-50 border border-red-200">
                                <div className="flex gap-2">
                                    <AlertTriangle className="w-3 h-3 text-red-500 shrink-0 mt-0.5" />
                                    <p className="text-[10px] font-mono text-red-700 uppercase tracking-tight leading-relaxed">
                                        This cannot be undone unless you reload the page without saving.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button 
                                    onClick={() => setShowConfirm(false)}
                                    className="flex-1 py-3 border border-black/10 text-[10px] font-mono uppercase tracking-widest hover:bg-black/[0.02] transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={() => {
                                        setShowConfirm(false);
                                        onConfirm();
                                    }}
                                    className="flex-1 py-3 bg-red-600 text-white text-[10px] font-mono uppercase tracking-widest hover:bg-red-700 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
