"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setIsLoading(false);
        } else {
            router.push("/admin/dashboard");
        }
    };

    return (
        <main className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="w-full max-w-md bg-white p-8 md:p-12 border border-black/5 shadow-[0_4px_30px_rgba(0,0,0,0.03)]"
            >
                <div className="mb-12">
                    <h1 className="text-3xl font-semibold tracking-tight text-black mb-2">CM Portal</h1>
                    <p className="text-sm text-black/40 font-mono tracking-widest uppercase">Admin Authorization</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-mono tracking-widest uppercase text-black/60 mb-2">Email Address</label>
                        <input 
                            type="email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-black/[0.02] border border-black/10 px-4 py-3 outline-none focus:border-black transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-mono tracking-widest uppercase text-black/60 mb-2">Password</label>
                        <input 
                            type="password" 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black/[0.02] border border-black/10 px-4 py-3 outline-none focus:border-black transition-colors"
                        />
                    </div>

                    {error && (
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xs text-red-500 font-mono"
                        >
                            {error}
                        </motion.p>
                    )}

                    <button 
                        disabled={isLoading}
                        className="w-full bg-black text-white py-4 px-6 flex items-center justify-between group hover:bg-[#CD5929] transition-colors duration-500 disabled:opacity-50"
                    >
                        <span className="text-xs font-mono tracking-widest uppercase">
                            {isLoading ? "Validating..." : "Sign In"}
                        </span>
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        )}
                    </button>
                </form>
            </motion.div>
        </main>
    );
}
