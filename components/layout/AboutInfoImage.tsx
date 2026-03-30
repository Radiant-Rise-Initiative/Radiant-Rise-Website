"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function AboutInfoImage() {
    return (
        <section className="relative w-full h-[560px] md:h-[760px] overflow-hidden">
            {/* Background Image - Aligned to Bottom */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/images/hero_images/hero_006.jpg"
                    alt="About background"
                    fill
                    className="object-cover object-top"
                    priority
                />
            </div>
        </section>
    );
}
