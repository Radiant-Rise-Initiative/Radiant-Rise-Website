"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
    LayoutDashboard, 
    FileText, 
    Newspaper, 
    LogOut, 
    Menu, 
    X,
    ChevronRight,
    Loader2
} from "lucide-react";
import { HOME_SECTIONS } from "@/lib/admin/sectionRegistry";

const NAV_ITEMS = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    ...HOME_SECTIONS.map(s => ({
        name: s.label.replace(" Section", ""),
        href: `/admin/sections/${s.key}`,
        icon: s.icon
    })),
    { name: "News Archive", href: "/admin/news", icon: Newspaper },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const isPublicPath = pathname === "/admin/login" || pathname === "/admin/seed";

        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session && !isPublicPath) {
                router.push("/admin/login");
            } else {
                setUser(session?.user ?? null);
                setIsLoading(false);
            }
        };

        checkUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!session && !isPublicPath) {
                router.push("/admin/login");
            } else {
                setUser(session?.user ?? null);
                setIsLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, [router]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/admin/login");
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-black/20" />
            </div>
        );
    }

    const isPublicPath = pathname === "/admin/login" || pathname === "/admin/seed";

    if (isPublicPath) {
        return <AnimatePresence mode="wait"><motion.div key={pathname}>{children}</motion.div></AnimatePresence>;
    }

    return (
        <div className="min-h-screen bg-[#fafafa] flex">
            {/* Minimalist Sidebar */}
            <aside 
                className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-black/5 transition-all duration-500 ease-[0.21, 0.47, 0.32, 0.98] ${
                    isSidebarOpen ? "w-72" : "w-20"
                }`}
            >
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className={`h-24 flex items-center border-b border-black/5 px-6 ${isSidebarOpen ? "justify-between" : "justify-center"}`}>
                        {isSidebarOpen && (
                            <Link href="/admin/dashboard" className="text-lg font-semibold tracking-tight whitespace-nowrap">RRI Admin Portal</Link>
                        )}
                        <button 
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 hover:bg-black/5 rounded-full transition-colors shrink-0"
                        >
                            <Menu className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Nav Links */}
                    <nav className="flex-grow pt-4 pb-8 px-4 space-y-1 overflow-y-auto no-scrollbar">
                        {NAV_ITEMS.map((item: any, idx) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <Link 
                                    key={item.name} 
                                    href={item.href || "#"}
                                    className={`flex items-center gap-4 px-4 py-3 group relative transition-all duration-300 ${
                                        isActive ? "text-black" : "text-black/40 hover:text-black"
                                    }`}
                                >
                                    {isActive && (
                                        <motion.div 
                                            layoutId="nav-pill"
                                            className="absolute inset-0 bg-black/[0.03] rounded-sm -z-10"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    {Icon && <Icon className={`w-5 h-5 shrink-0 ${isActive ? "text-[#CD5929]" : ""}`} />}
                                    {isSidebarOpen && (
                                        <span className="text-sm font-medium tracking-tight whitespace-nowrap">
                                            {item.name}
                                        </span>
                                    )}
                                    {isSidebarOpen && isActive && (
                                        <ChevronRight className="w-3 h-3 ml-auto text-black/20" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Sidebar Footer */}
                    <div className="p-4 border-t border-black/5">
                        <button 
                            onClick={handleLogout}
                            className={`flex items-center gap-4 px-4 py-4 w-full text-black/40 hover:text-red-500 transition-colors group`}
                        >
                            <LogOut className="w-5 h-5 shrink-0" />
                            {isSidebarOpen && <span className="text-sm font-medium tracking-tight">Logout</span>}
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main 
                className={`flex-grow transition-all duration-500 ease-[0.21, 0.47, 0.32, 0.98] ${
                    isSidebarOpen ? "pl-72" : "pl-20"
                }`}
            >
                <div className="max-w-6xl mx-auto p-8 md:p-12 lg:p-16">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={pathname}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4 }}
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}
