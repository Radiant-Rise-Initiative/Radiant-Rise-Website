import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 border-b border-white/10 bg-black/20 backdrop-blur-sm">
            <div className="text-xl font-bold tracking-tight text-white">
                Radiant Rise
            </div>

            <div className="hidden md:flex items-center gap-8">
                {["About", "Approach", "Learnings"].map((item) => (
                    <Link
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="text-sm font-medium text-white/90 hover:text-white transition-colors uppercase tracking-widest"
                    >
                        {item}
                    </Link>
                ))}
            </div>

            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black uppercase tracking-wider bg-transparent">
                Connect
            </Button>
        </nav>
    );
}
