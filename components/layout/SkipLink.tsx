"use client";

import React from "react";

/**
 * SkipLink component for accessibility.
 * Allows keyboard users to skip directly to the main content.
 */
export function SkipLink() {
    return (
        <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-6 focus:py-3 focus:bg-white focus:text-black focus:border-2 focus:border-black focus:rounded-full focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:shadow-2xl transition-all"
        >
            Skip to main content
        </a>
    );
}
