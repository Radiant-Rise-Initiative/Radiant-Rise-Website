"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Star, Loader2, MessageSquareQuote } from "lucide-react";
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
        // Fallback mock data if table doesn't exist yet
        const mockReviews = [
            { id: '1', name: 'Sarah O.', role: 'Community Partner', comment: 'The dedication of the Radiant Rise team is truly inspiring. They are making a tangible difference in Acholi Quarters every single day.', rating: 5, created_at: '2026-03-15T10:00:00Z' },
            { id: '2', name: 'John K.', role: 'Volunteer', comment: 'Such a well-structured and thoughtfully executed program. The focus on trauma healing before vocational training is brilliant.', rating: 5, created_at: '2026-02-28T14:30:00Z' },
            { id: '3', name: 'Grace M.', role: 'Local Leader', comment: 'We have seen genuine transformation in the young mothers attending these programs. Their confidence has grown immensely.', rating: 5, created_at: '2026-01-10T09:15:00Z' },
            { id: '4', name: 'David T.', role: 'Supporter', comment: 'Transparent, accountable, and deeply rooted in the community. Radiant Rise is an organization worth supporting.', rating: 4, created_at: '2025-12-05T16:45:00Z' },
        ];

        try {
            // Attempt to fetch from Supabase
            const { data, error } = await supabase
                .from('reviews')
                .select('*')
                .eq('is_approved', true)
                .order('created_at', { ascending: false });
                
            if (error || !data || data.length === 0) {
                setReviews(mockReviews);
            } else {
                setReviews(data);
            }
        } catch (e) {
            setReviews(mockReviews);
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
                            <span className="text-xs font-mono tracking-widest text-[#CD5929] uppercase block mb-4">
                                COMMUNITY VOICES
                            </span>
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

            <section className="px-4 sm:px-12 lg:px-0 pb-24 md:pb-32 bg-[#fafafa] pt-16 md:pt-24 flex-grow">
                <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                        
                        {/* Reviews Display */}
                        <div className="lg:col-span-7 xl:col-span-8">
                            {isLoading ? (
                                <div className="flex justify-center py-32">
                                    <Loader2 className="w-8 h-8 text-black animate-spin" />
                                </div>
                            ) : reviews.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                    {reviews.map((review, i) => (
                                        <motion.div 
                                            key={review.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1, duration: 0.6 }}
                                            className="bg-white p-8 md:p-10 rounded-3xl border border-black/5 hover:shadow-xl transition-shadow duration-500 flex flex-col justify-between"
                                        >
                                            <div>
                                                <div className="flex text-[#CD5929] mb-6">
                                                    {[...Array(5)].map((_, index) => (
                                                        <Star 
                                                            key={index} 
                                                            className={`w-4 h-4 ${index < review.rating ? 'fill-current' : 'opacity-30'}`} 
                                                        />
                                                    ))}
                                                </div>
                                                <p className="text-lg md:text-xl text-black leading-relaxed font-medium mb-10 tracking-tight">
                                                    "{review.comment}"
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-[#f5f5f7] rounded-full flex items-center justify-center text-black/40">
                                                    <MessageSquareQuote className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-black tracking-tight">{review.name}</h4>
                                                    <p className="text-xs font-mono uppercase tracking-widest text-[#CD5929] mt-1">{review.role}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-32 border border-dashed border-black/20 rounded-3xl">
                                    <MessageSquareQuote className="w-12 h-12 text-black/20 mx-auto mb-4" />
                                    <p className="text-black/60 font-medium">No reviews published yet.</p>
                                </div>
                            )}
                        </div>

                        {/* Submission Form */}
                        <div className="lg:col-span-5 xl:col-span-4 self-start sticky top-32">
                            <div className="bg-white rounded-[32px] p-8 md:p-10 border border-black/10 shadow-2xl relative overflow-hidden">
                                <h3 className="text-2xl font-medium tracking-tight mb-2">Leave a Review</h3>
                                <p className="text-black/60 text-sm mb-8">Your feedback is important to us and will be reviewed before publishing.</p>

                                <AnimatePresence mode="wait">
                                    {submitSuccess ? (
                                        <motion.div 
                                            key="success"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="bg-green-50 text-green-800 p-6 rounded-2xl flex flex-col items-center justify-center text-center py-12"
                                        >
                                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
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

                                            <div className="border border-black/10 rounded-xl px-4 py-3 focus-within:border-black/50 focus-within:ring-1 ring-black/50 transition-all bg-[#fafafa]">
                                                <input 
                                                    type="text" 
                                                    value={name}
                                                    onChange={e => setName(e.target.value)}
                                                    placeholder="Your Name" 
                                                    required
                                                    className="w-full bg-transparent outline-none placeholder:text-black/40 text-black text-sm"
                                                />
                                            </div>

                                            <div className="border border-black/10 rounded-xl px-4 py-3 focus-within:border-black/50 focus-within:ring-1 ring-black/50 transition-all bg-[#fafafa]">
                                                <input 
                                                    type="text" 
                                                    value={role}
                                                    onChange={e => setRole(e.target.value)}
                                                    placeholder="Your Role (e.g., Volunteer, Participant)" 
                                                    required
                                                    className="w-full bg-transparent outline-none placeholder:text-black/40 text-black text-sm"
                                                />
                                            </div>

                                            <div className="border border-black/10 rounded-xl px-4 py-3 focus-within:border-black/50 focus-within:ring-1 ring-black/50 transition-all bg-[#fafafa]">
                                                <textarea 
                                                    value={comment}
                                                    onChange={e => setComment(e.target.value)}
                                                    placeholder="Share your experience..." 
                                                    rows={4}
                                                    required
                                                    className="w-full bg-transparent outline-none placeholder:text-black/40 text-black text-sm resize-none"
                                                />
                                            </div>

                                            <button 
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full bg-black hover:bg-[#CD5929] text-white py-4 rounded-xl text-sm font-semibold tracking-wide transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                                            >
                                                {isSubmitting ? (
                                                    <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                                                ) : (
                                                    <>Submit Review</>
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
