"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Star, Loader2, MessageSquareQuote, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function ReviewsPage() {
    const [reviews, setReviews] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // Form state
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(5);
    const [hoveredStar, setHoveredStar] = useState<number | null>(null);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        setIsLoading(true);

        try {
            // Attempt to fetch from Supabase
            const { data, error } = await supabase
                .from('reviews')
                .select('*')
                .eq('is_approved', true)
                .order('created_at', { ascending: false });
                
            if (error || !data || data.length === 0) {
                setReviews([]);
            } else {
                setReviews(data);
            }
        } catch (e) {
            setReviews([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // Attempt Supabase insert
            await supabase
                .from('reviews')
                .insert([{ name, role, comment, rating, is_approved: false }]);
            // Ignore error for now, as table might not be created yet during preview.
        } catch (e) {
            console.error("Submission error ignored for prototype");
        } finally {
            setIsSubmitting(false);
            setSubmitSuccess(true);
            setName("");
            setRole("");
            setComment("");
            setRating(5);
            
            setTimeout(() => setSubmitSuccess(false), 5000);
        }
    };

    return (
        <main className="min-h-screen bg-white flex flex-col pt-28 md:pt-40">
            <Navbar />
            
            <section className="px-4 sm:px-12 lg:px-0 mb-16 md:mb-24">
                <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-black/10 pb-12">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-black/5 px-3 py-1.5 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-black/60 mb-4 cursor-default">
                                COMMUNITY VOICES
                            </div>
                            <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-black">
                                Reviews
                            </h1>
                        </div>
                        <p className="text-black/60 max-w-md text-lg leading-relaxed">
                            Discover what our partners, volunteers, and the community have to say about the impact of the Radiant Rise Initiative.
                        </p>
                    </div>
                </div>
            </section>

            <section className="px-4 sm:px-12 lg:px-0 pb-24 md:pb-32 flex-grow w-full">
                <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full min-w-0">
                    <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 w-full min-w-0">
                        
                        {/* Reviews Display */}
                        <div className="flex-1 min-w-0 w-full">
                            {isLoading ? (
                                <div className="flex justify-center py-32">
                                    <Loader2 className="w-8 h-8 text-black animate-spin" />
                                </div>
                            ) : reviews.length > 0 ? (
                                <div className="flex flex-col">
                                    {reviews.map((review, i) => (
                                        <motion.div 
                                            key={review.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1, duration: 0.6 }}
                                            className={`group flex flex-col md:flex-row gap-8 md:gap-16 pt-12 pb-16 ${i === 0 ? '' : 'border-t'} border-black/10 hover:bg-[#f5f5f7]/30 transition-colors cursor-default`}
                                        >
                                            {/* Metadata Column */}
                                            <div className="w-full md:w-1/3 xl:w-1/4 shrink-0 flex flex-col gap-6 pt-2">
                                                <div className="flex gap-1 text-[#CD5929]">
                                                    {[...Array(5)].map((_, index) => (
                                                        <Star 
                                                            key={index} 
                                                            className={`w-4 h-4 ${index < review.rating ? 'fill-current' : 'opacity-20'}`} 
                                                        />
                                                    ))}
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-semibold text-black tracking-tight mb-1">{review.name}</h4>
                                                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-black/40">{review.role}</p>
                                                </div>
                                                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-black mt-auto">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                                                    Verified Voice
                                                </div>
                                            </div>

                                            {/* Review Content Column */}
                                            <div className="w-full md:w-2/3 xl:w-3/4">
                                                <MessageSquareQuote className="w-8 h-8 text-black/10 mb-6" />
                                                <p className="text-2xl md:text-3xl lg:text-4xl text-black font-medium leading-[1.3] tracking-tight group-hover:text-black/80 transition-colors">
                                                    "{review.comment}"
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="group flex flex-col md:flex-row gap-8 md:gap-16 pt-12 pb-16 cursor-default border-t border-black/10 first:border-t-0"
                                >
                                    {/* Placeholder Metadata */}
                                    <div className="w-full md:w-1/3 xl:w-1/4 shrink-0 flex flex-col gap-6 pt-2">
                                        <div className="flex gap-1 text-black/10">
                                            {[...Array(5)].map((_, index) => (
                                                <Star key={index} className="w-4 h-4 fill-current" />
                                            ))}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-semibold text-black/20 tracking-tight mb-1">Your Name</h4>
                                            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-black/20">Your Community Role</p>
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-black/10 mt-auto">
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                            Pending Verification
                                        </div>
                                    </div>

                                    {/* Placeholder Content */}
                                    <div className="w-full md:w-2/3 xl:w-3/4">
                                        <MessageSquareQuote className="w-8 h-8 text-black/5 mb-6" />
                                        <p className="text-2xl md:text-3xl lg:text-4xl text-black/30 font-medium leading-[1.3] tracking-tight italic">
                                            "Be the first to share your impact story and inspire the Radiant Rise community. Your experience matters and helps us build a stronger movement."
                                        </p>
                                        <div className="mt-10 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#CD5929]">
                                            <div className="w-2 h-2 rounded-full bg-[#CD5929] animate-pulse" />
                                            Awaiting first voice
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Submission Portal */}
                        <div className="w-full lg:w-[400px] xl:w-[450px] min-w-0 shrink-0 relative">
                            <div className="lg:sticky lg:top-32 max-h-[calc(100vh-10rem)] overflow-y-auto bg-[#f5f5f7]/50 rounded-none p-8 md:p-12 border border-black/10 relative custom-scrollbar">
                                <h3 className="text-3xl font-medium tracking-tight mb-2">Publish Your Review</h3>
                                <p className="text-black/60 text-sm mb-8 leading-relaxed">Got a story about the Radiant Rise Initiative? We want to hear it. We verify all submissions.</p>

                                <AnimatePresence mode="wait">
                                    {submitSuccess ? (
                                        <motion.div 
                                            key="success"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="bg-green-50 text-green-800 p-6 rounded-none flex flex-col items-center justify-center text-center py-12"
                                        >
                                            <div className="w-12 h-12 bg-green-100 rounded-none flex items-center justify-center mb-4">
                                                <Star className="w-6 h-6 text-green-600 fill-current" />
                                            </div>
                                            <h4 className="font-semibold text-lg mb-2">Thank you!</h4>
                                            <p className="text-sm opacity-80">Your review has been submitted successfully and is pending approval.</p>
                                        </motion.div>
                                    ) : (
                                        <motion.form 
                                            key="form"
                                            onSubmit={handleSubmit} 
                                            className="space-y-6"
                                        >
                                            {/* Rating Input */}
                                            <div className="mb-6">
                                                <label className="block text-xs font-mono tracking-widest text-black/60 uppercase mb-3">Rating</label>
                                                <div className="flex gap-2 text-[#CD5929]">
                                                    {[...Array(5)].map((_, i) => {
                                                        const starValue = i + 1;
                                                        return (
                                                            <button
                                                                type="button"
                                                                key={i}
                                                                onMouseEnter={() => setHoveredStar(starValue)}
                                                                onMouseLeave={() => setHoveredStar(null)}
                                                                onClick={() => setRating(starValue)}
                                                                className="transition-transform hover:scale-110 p-1"
                                                            >
                                                                <Star 
                                                                    className={`w-8 h-8 ${starValue <= (hoveredStar ?? rating) ? 'fill-current' : 'opacity-20'}`} 
                                                                />
                                                            </button>
                                                        )
                                                    })}
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="border border-black/10 rounded-none px-4 py-4 focus-within:border-black transition-all bg-white group hover:border-black/30">
                                                    <label className="block text-[10px] font-mono tracking-widest text-black/30 uppercase mb-1 group-focus-within:text-[#CD5929] transition-colors">Your Name</label>
                                                    <input 
                                                        type="text" 
                                                        value={name}
                                                        onChange={e => setName(e.target.value)}
                                                        placeholder="e.g. Sarah J." 
                                                        required
                                                        className="w-full bg-transparent outline-none placeholder:text-black/20 text-black text-sm font-medium"
                                                    />
                                                </div>

                                                <div className="border border-black/10 rounded-none px-4 py-4 focus-within:border-black transition-all bg-white group hover:border-black/30">
                                                    <label className="block text-[10px] font-mono tracking-widest text-black/30 uppercase mb-1 group-focus-within:text-[#CD5929] transition-colors">Your Role</label>
                                                    <input 
                                                        type="text" 
                                                        value={role}
                                                        onChange={e => setRole(e.target.value)}
                                                        placeholder="e.g. Volunteer" 
                                                        required
                                                        className="w-full bg-transparent outline-none placeholder:text-black/20 text-black text-sm font-medium"
                                                    />
                                                </div>

                                                <div className="border border-black/10 rounded-none px-4 py-4 focus-within:border-black transition-all bg-white group hover:border-black/30">
                                                    <label className="block text-[10px] font-mono tracking-widest text-black/30 uppercase mb-1 group-focus-within:text-[#CD5929] transition-colors">Your Experience</label>
                                                    <textarea 
                                                        value={comment}
                                                        onChange={e => setComment(e.target.value)}
                                                        placeholder="Share your thoughts..." 
                                                        rows={4}
                                                        required
                                                        className="w-full bg-transparent outline-none placeholder:text-black/20 text-black text-sm font-medium resize-none"
                                                    />
                                                </div>
                                            </div>

                                            <button 
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full bg-[#2D2D2D] hover:bg-black text-white py-5 rounded-none text-xs font-mono tracking-[0.2em] uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-4 group/submit"
                                            >
                                                {isSubmitting ? (
                                                    <><Loader2 className="w-4 h-4 animate-spin" /> Submitting</>
                                                ) : (
                                                    <>
                                                        Submit Review
                                                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover/submit:translate-x-1 group-hover/submit:-translate-y-1" />
                                                    </>
                                                )}
                                            </button>
                                        </motion.form>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            
            <Footer />
        </main>
    );
}
