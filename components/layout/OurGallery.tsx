import { SectionHeader } from "@/components/ui/SectionHeader";
import { GalleryScroller, GalleryItem } from "@/components/ui/GalleryScroller";

const galleryItems: GalleryItem[] = [
    {
        id: 1,
        title: "Healing Hearts",
        category: "Counseling",
        description: "Post-trauma and adversity counseling sessions for young mothers.",
        image: "/assets/branding/splash-image-016.jpg",
        link: "#"
    },
    {
        id: 2,
        title: "Economic Freedom",
        category: "Empowerment",
        description: "Equipping participants with vocational skills and financial inclusion.",
        image: "/assets/branding/splash-image-017.jpg",
        link: "#"
    },
    {
        id: 3,
        title: "Community Synergy",
        category: "Partnership",
        description: "Nurturing hope and self-reliance through values-based leadership.",
        image: "/assets/branding/splash-image-018.jpg",
        link: "#"
    },
    {
        id: 4,
        title: "Stronger Futures",
        category: "Mentorship",
        description: "Uplifting the next generation of youth through structured support.",
        image: "/assets/branding/splash-image-019.jpg",
        link: "#"
    }
];

export function OurGallery() {
    return (
        <section className="bg-[#f5f5f7] pt-24 pb-0 overflow-hidden select-none border-t border-black/10">
            <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full mb-12 px-4 sm:px-12 lg:px-0">
                <SectionHeader
                    title="Our Gallery"
                    linkText="Explore Our Stories"
                    href="#"
                />
            </div>
            <GalleryScroller items={galleryItems} />
        </section>
    );
}
