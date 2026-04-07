"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Plus, 
    Search, 
    MoreVertical, 
    Edit, 
    Trash2, 
    ExternalLink,
    Calendar,
    Loader2,
    X,
    Save,
    Newspaper,
    ArrowUpRight
} from "lucide-react";
import { ImagePreview } from "@/components/admin/ImagePreview";
import { s } from "@/lib/utils/sanitizer";
import Link from "next/link";
import Image from "next/image";

export default function AdminNews() {
    const [news, setNews] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentStory, setCurrentStory] = useState<any>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        const { data, error } = await supabase
            .from('news_releases')
            .select('*')
            .order('date', { ascending: false });

        if (data) setNews(data);
        setIsLoading(false);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        const payload = {
            ...currentStory,
            slug: currentStory.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
            updated_at: new Date().toISOString()
        };

        const { error } = await supabase
            .from('news_releases')
            .upsert(payload);

        if (!error) {
            setIsModalOpen(false);
            fetchNews();
        }
        setIsSaving(false);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this story?")) {
            await supabase.from('news_releases').delete().eq('id', id);
            fetchNews();
        }
    };

    const openEdit = (story: any) => {
        setCurrentStory(story);
        setIsModalOpen(true);
    };

    const openCreate = () => {
        setCurrentStory({
            title: "",
            content: "",
            author: "",
            category: "REPORT",
            date: new Date().toISOString().split('T')[0],
            image_url: "",
            read_time: "5 min read",
        });
        setIsModalOpen(true);
    };

    if (isLoading) {
        return (
            <div className="py-24 flex flex-col items-center justify-center opacity-20">
                <Loader2 className="w-8 h-8 animate-spin mb-4" />
                <p className="text-xs font-mono uppercase tracking-widest">Accessing archive...</p>
            </div>
        );
    }

    return (
        <div className="space-y-12">
            <div className="flex items-end justify-between">
                <div className="space-y-2">
                    <h2 className="text-3xl font-semibold tracking-tight text-black">News Archive</h2>
                    <p className="text-black/40 text-sm font-mono tracking-widest uppercase">Content Repository & Release Manager</p>
                </div>
                <button 
                    onClick={openCreate}
                    className="bg-black text-white px-6 py-4 flex items-center gap-4 hover:bg-[#CD5929] transition-all duration-500 group"
                >
                    <span className="text-[10px] font-mono tracking-widest uppercase">New Release</span>
                    <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
                </button>
            </div>

            {/* News List */}
            <div className="bg-white border border-black/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-black/5 bg-black/[0.01]">
                                <th className="px-8 py-5 text-[10px] font-mono tracking-widest uppercase text-black/40 w-[120px]">PRV</th>
                                <th className="px-8 py-5 text-[10px] font-mono tracking-widest uppercase text-black/40 whitespace-nowrap w-[150px]">Launch Date</th>
                                <th className="px-8 py-5 text-[10px] font-mono tracking-widest uppercase text-black/40">Story Title</th>
                                <th className="px-8 py-5 text-[10px] font-mono tracking-widest uppercase text-black/40 w-[120px]">Category</th>
                                <th className="px-8 py-5 text-[10px] font-mono tracking-widest uppercase text-black/40 text-right w-[100px]">Activity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {news.map((story) => (
                                <tr key={story.id} onMouseEnter={() => setHoveredId(story.id)} className="border-b border-black/5 group hover:bg-black/[0.01] transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="w-[120px] h-[68px] bg-black/5 overflow-hidden shrink-0">
                                            {story.image_url ? (
                                                <img 
                                                    src={s(story.image_url)} 
                                                    alt="" 
                                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center opacity-20">
                                                    <Newspaper className="w-4 h-4" />
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-sm font-medium text-black/60 whitespace-nowrap">{story.date}</td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-black">{story.title}</span>
                                            <span className="text-[10px] font-mono text-black/30 mt-1 uppercase">{story.author}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="inline-block px-3 py-1 bg-black/5 text-[10px] font-mono uppercase tracking-widest text-black/60">
                                            {story.category}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center justify-end gap-2">
                                            <button 
                                                onClick={() => openEdit(story)}
                                                className="p-2 hover:bg-black/5 text-black/40 hover:text-black transition-colors rounded-sm"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(story.id)}
                                                className="p-2 hover:bg-black/5 text-black/40 hover:text-red-500 transition-colors rounded-sm"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {news.length === 0 && (
                    <div className="py-24 text-center opacity-30 flex flex-col items-center justify-center">
                        <Newspaper className="w-8 h-8 mb-4 stroke-1" />
                        <p className="text-sm">Archive is empty.</p>
                    </div>
                )}
            </div>

            {/* Create/Edit Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
                        />
                        <motion.div 
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300, mass: 1 }}
                            className="fixed inset-y-0 right-0 w-full max-w-2xl bg-white shadow-2xl z-[70] flex flex-col overflow-hidden"
                        >
                            <div className="p-8 border-b border-black/5 flex items-center justify-between">
                                <h3 className="text-xl font-semibold tracking-tight uppercase">
                                    {currentStory?.id ? "Edit Release" : "New Release"}
                                </h3>
                                <button 
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 hover:bg-black/5 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-black/40 hover:text-black" />
                                </button>
                            </div>

                            <form onSubmit={handleSave} className="flex-grow overflow-y-auto p-8 space-y-8">
                                <div className="space-y-2">
                                    <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Story Title</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={currentStory?.title || ""}
                                        onChange={(e) => setCurrentStory({ ...currentStory, title: e.target.value })}
                                        className="w-full bg-black/[0.02] border border-black/10 px-4 py-4 text-sm font-medium focus:border-black outline-none transition-colors"
                                        placeholder="..."
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Release Date</label>
                                        <input 
                                            type="date" 
                                            required
                                            value={currentStory?.date || ""}
                                            onChange={(e) => setCurrentStory({ ...currentStory, date: e.target.value })}
                                            className="w-full bg-black/[0.02] border border-black/10 px-4 py-4 text-sm font-medium focus:border-black outline-none transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Category</label>
                                        <select 
                                            value={currentStory?.category || "REPORT"}
                                            onChange={(e) => setCurrentStory({ ...currentStory, category: e.target.value })}
                                            className="w-full bg-black/[0.02] border border-black/10 px-4 py-4 text-sm font-medium appearance-none outline-none focus:border-black"
                                        >
                                            <option value="REPORT">REPORT</option>
                                            <option value="INITIATIVE">INITIATIVE</option>
                                            <option value="IMPACT">IMPACT</option>
                                            <option value="PARTNERSHIP">PARTNERSHIP</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Author</label>
                                    <input 
                                        type="text" 
                                        value={currentStory?.author || ""}
                                        onChange={(e) => setCurrentStory({ ...currentStory, author: e.target.value })}
                                        className="w-full bg-black/[0.02] border border-black/10 px-4 py-4 text-sm font-medium focus:border-black outline-none transition-colors"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Image URL</label>
                                        <input 
                                            type="text" 
                                            value={currentStory?.image_url || ""}
                                            onChange={(e) => setCurrentStory({ ...currentStory, image_url: e.target.value })}
                                            className="w-full bg-black/[0.02] border border-black/10 px-4 py-4 text-sm font-medium focus:border-black outline-none transition-colors"
                                            placeholder="e.g. /assets/images/story.png"
                                        />
                                    </div>
                                    <ImagePreview url={currentStory?.image_url} />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-[10px] font-mono tracking-widest uppercase text-black/40">Full Narrative Content (HTML/Markdown)</label>
                                    <textarea 
                                        rows={12}
                                        value={currentStory?.content || ""}
                                        onChange={(e) => setCurrentStory({ ...currentStory, content: e.target.value })}
                                        className="w-full bg-black/[0.02] border border-black/10 px-4 py-4 text-sm font-medium focus:border-black outline-none transition-colors resize-none"
                                        placeholder="Paste your story content here..."
                                    />
                                </div>
                            </form>

                            <div className="p-8 border-t border-black/5 bg-black/[0.01]">
                                <button 
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="w-full bg-black text-white py-5 px-6 flex items-center justify-between group hover:bg-[#CD5929] transition-all duration-500 disabled:opacity-50"
                                >
                                    <span className="text-xs font-mono tracking-widest uppercase">
                                        {isSaving ? "Syncing..." : "Commit Release"}
                                    </span>
                                    {isSaving ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
