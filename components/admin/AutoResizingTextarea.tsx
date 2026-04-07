"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AutoResizingTextareaProps {
    value: string;
    onChange: (val: string) => void;
    className?: string;
    placeholder?: string;
    disabled?: boolean;
}

export function AutoResizingTextarea({ 
    value, 
    onChange, 
    className, 
    placeholder, 
    disabled 
}: AutoResizingTextareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [value]);

    return (
        <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={cn("w-full resize-none overflow-hidden transition-all duration-200", className)}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
        />
    );
}
