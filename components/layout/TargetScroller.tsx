"use client";

import { InfoScroller, ScrollerItem } from "@/components/ui/InfoScroller";

interface TargetScrollerProps {
    title?: string;
    linkText?: string;
    href?: string;
    items?: any[];
}

export function TargetScroller({ 
    title = "Our Targets", 
    linkText = "See All Targets", 
    href = "/targets", 
    items = [] 
}: TargetScrollerProps) {
    // Transform items to handle logo newlines and name-to-category mapping
    const transformedItems: ScrollerItem[] = items.map(item => ({
        ...item,
        category: item.name, // Map merged 'name' field to the 'category' prop for display
        logo: typeof item.logo === 'string' ? (
            <span>
                {item.logo.split(/<br\s*\/?>|\n/).map((line: string, i: number, arr: string[]) => (
                    <span key={i}>
                        {line}
                        {i < arr.length - 1 && <br />}
                    </span>
                ))}
            </span>
        ) : item.logo
    }));

    return (
        <InfoScroller
            sectionTitle={title}
            sectionLinkText={linkText}
            sectionHref={href}
            items={transformedItems}
        />
    );
}
