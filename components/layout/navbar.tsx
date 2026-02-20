"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DonationModal } from "./donation-modal";

import { NavbarUI } from "@/components/ui/navbar";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

    // Prevent scrolling when menu or modal is open
    useEffect(() => {
        if (isOpen || isDonationModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        }
    }, [isOpen, isDonationModalOpen]);

    const navItems = [
        { label: "Who We Are", id: "who-we-are" },
        { label: "Our Impact", id: "our-impact" },
        { label: "What We Do", id: "what-we-do" }
    ];

    const logo = {
        src: "/assets/branding/rr-logo-v3.svg",
        alt: "Radiant Rise Logo",
        label: "Radiant Rise"
    };

    return (
        <>
            <NavbarUI
                items={navItems}
                logo={logo}
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                onGiveNowClick={() => setIsDonationModalOpen(true)}
            />

            {/* Global Donation Modal */}
            <DonationModal
                isOpen={isDonationModalOpen}
                onClose={() => setIsDonationModalOpen(false)}
            />
        </>
    );
}

