import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function SkipLink() {
    return (
        <Button
            asChild
            className={cn(
                "absolute left-4 top-4 z-[100] -translate-y-[150%] transition-transform focus:translate-y-0",
                "bg-background text-foreground border border-input shadow-sm"
            )}
            variant="outline"
        >
            <a href="#main-content">Skip to content</a>
        </Button>
    );
}
