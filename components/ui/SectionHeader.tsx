import Link from "next/link";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
    title: string;
    linkText?: string;
    href?: string;
    className?: string;
}

export function SectionHeader({ title, linkText, href, className }: SectionHeaderProps) {
    return (
        <div className={cn(
            "flex flex-col items-start md:flex-row md:justify-between md:items-end gap-4 md:gap-0",
            className
        )}>
            <h2 className="text-5xl md:text-6xl font-semibold text-black tracking-tight -ml-1">
                {title}
            </h2>
            {linkText && href && (
                <Link
                    href={href}
                    className="text-xs sm:text-sm font-mono font-medium tracking-widest uppercase border-b border-black pb-1 hover:text-black/70 hover:border-black/70 transition-colors w-fit"
                >
                    {linkText}
                </Link>
            )}
        </div>
    );
}
