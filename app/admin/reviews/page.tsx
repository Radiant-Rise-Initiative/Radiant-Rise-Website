"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
    MessageSquareQuote, 
    CheckCircle2, 
    XCircle, 
    Trash2, 
    Loader2,
    Star
} from "lucide-react";

export default function AdminReviews() {
    const [reviews, setReviews] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        const { data, error } = await supabase
            .from('reviews')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setReviews(data);
        setIsLoading(false);
    };

    const handleToggleApproval = async (id: string, currentStatus: boolean) => {
        setUpdatingId(id);
        const { error } = await supabase
            .from('reviews')
            .update({ is_approved: !currentStatus })
            .eq('id', id);
            
        if (!error) {
            setReviews(reviews.map(r => r.id === id ? { ...r, is_approved: !currentStatus } : r));
        }
        setUpdatingId(null);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to permanently delete this review?")) {
            setUpdatingId(id);
            await supabase.from('reviews').delete().eq('id', id);
            setReviews(reviews.filter(r => r.id !== id));
            setUpdatingId(null);
        }
    };

    if (isLoading) {
        return (
            <div className="py-24 flex flex-col items-center justify-center opacity-20">
                <Loader2 className="w-8 h-8 animate-spin mb-4" />
                <p className="text-xs font-mono uppercase tracking-widest">Accessing reviews...</p>
            </div>
        );
    }

    return (
        <div className="space-y-12">
            <div className="flex items-end justify-between">
                <div className="space-y-2">
                    <h2 className="text-3xl font-semibold tracking-tight text-black">Community Reviews</h2>
                    <p className="text-black/40 text-sm font-mono tracking-widest uppercase">Content Moderation & Verification</p>
                </div>
            </div>

            {/* Reviews List */}
            <div className="bg-white border border-black/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-black/5 bg-black/[0.01]">
                                <th className="px-8 py-5 text-[10px] font-mono tracking-widest uppercase text-black/40 w-[150px]">Author</th>
                                <th className="px-8 py-5 text-[10px] font-mono tracking-widest uppercase text-black/40 w-[100px]">Rating</th>
                                <th className="px-8 py-5 text-[10px] font-mono tracking-widest uppercase text-black/40">Review Content</th>
                                <th className="px-8 py-5 text-[10px] font-mono tracking-widest uppercase text-black/40 w-[150px]">Status</th>
                                <th className="px-8 py-5 text-[10px] font-mono tracking-widest uppercase text-black/40 text-right w-[150px]">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map((review) => (
                                <tr key={review.id} className="border-b border-black/5 group hover:bg-black/[0.01] transition-colors">
                                    <td className="px-8 py-6 align-top">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-black">{review.name}</span>
                                            <span className="text-[10px] font-mono text-black/30 mt-1 uppercase">{review.role}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 align-top">
                                        <div className="flex gap-0.5 text-[#CD5929]">
                                            {[...Array(5)].map((_, index) => (
                                                <Star 
                                                    key={index} 
                                                    className={`w-3.5 h-3.5 ${index < review.rating ? 'fill-current' : 'opacity-20'}`} 
                                                />
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 align-top">
                                        <p className="text-sm text-black/70 leading-relaxed max-w-2xl">
                                            "{review.comment}"
                                        </p>
                                    </td>
                                    <td className="px-8 py-6 align-top">
                                        {review.is_approved ? (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-[10px] font-mono uppercase tracking-widest text-green-700">
                                                <CheckCircle2 className="w-3 h-3" /> Live
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/5 text-[10px] font-mono uppercase tracking-widest text-black/50">
                                                <XCircle className="w-3 h-3" /> Pending
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-8 py-6 align-top">
                                        <div className="flex items-center justify-end gap-2">
                                            {updatingId === review.id ? (
                                                <div className="p-2">
                                                    <Loader2 className="w-4 h-4 animate-spin text-black/20" />
                                                </div>
                                            ) : (
                                                <>
                                                    <button 
                                                        onClick={() => handleToggleApproval(review.id, review.is_approved)}
                                                        className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest transition-colors rounded-none ${
                                                            review.is_approved 
                                                                ? "bg-black/5 hover:bg-black/10 text-black" 
                                                                : "bg-[#CD5929] hover:bg-[#CD5929]/90 text-white"
                                                        }`}
                                                    >
                                                        {review.is_approved ? "Revoke" : "Approve"}
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(review.id)}
                                                        className="p-1.5 hover:bg-black/5 text-black/40 hover:text-red-500 transition-colors rounded-none ml-2"
                                                        title="Delete Review"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {reviews.length === 0 && (
                    <div className="py-24 text-center opacity-30 flex flex-col items-center justify-center">
                        <MessageSquareQuote className="w-8 h-8 mb-4 stroke-1" />
                        <p className="text-sm">No reviews submitted yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
