"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SectionsRedirect() {
    const router = useRouter();

    useEffect(() => {
        router.replace("/admin/sections/hero");
    }, [router]);

    return (
        <div className="py-24 flex items-center justify-center opacity-20">
            <p className="text-xs font-mono uppercase tracking-widest">Redirecting to content engine...</p>
        </div>
    );
}
