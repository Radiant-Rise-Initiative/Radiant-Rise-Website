import { SectionHeader } from "@/components/ui/SectionHeader";
import { GalleryScroller, GalleryItem } from "@/components/ui/GalleryScroller";

const galleryItems: GalleryItem[] = [
    {
        id: 1,
        title: "Healing Hearts",
        category: "Counseling",
        description: "Post-trauma and adversity counseling sessions for young mothers.",
        image: "/assets/images/gallery_images/gallery_01.jpg",
        link: "#"
    },
    {
        id: 2,
        title: "Economic Freedom",
        category: "Empowerment",
        description: "Equipping participants with vocational skills and financial inclusion.",
        image: "/assets/images/gallery_images/gallery_02.jpg",
        link: "#"
    },
    {
        id: 3,
        title: "Community Synergy",
        category: "Partnership",
        description: "Nurturing hope and self-reliance through values-based leadership.",
        image: "/assets/images/gallery_images/gallery_03.jpg",
        link: "#"
    },
    {
        id: 4,
        title: "Stronger Futures",
        category: "Mentorship",
        description: "Uplifting the next generation of youth through structured support.",
        image: "/assets/images/gallery_images/gallery_04.jpg",
        link: "#"
    },
    {
        id: 5,
        title: "Skills Training",
        category: "Vocational",
        description: "Dedicated workshops to build practical and marketable skills.",
        image: "/assets/images/gallery_images/gallery_05.jpg",
        link: "#"
    },
    {
        id: 6,
        title: "Spiritual Foundation",
        category: "Faith",
        description: "Building resilience on strong, enduring values.",
        image: "/assets/images/gallery_images/gallery_06.jpg",
        link: "#"
    },
    {
        id: 7,
        title: "Leadership Focus",
        category: "Development",
        description: "Fostering community leaders to inspire systemic change.",
        image: "/assets/images/gallery_images/gallery_07.jpg",
        link: "#"
    },
    {
        id: 8,
        title: "Creative Arts",
        category: "Expression",
        description: "Expressive therapies combining tradition and creativity.",
        image: "/assets/images/gallery_images/gallery_08.jpg",
        link: "#"
    },
    {
        id: 9,
        title: "Collaborative Growth",
        category: "Teamwork",
        description: "Achieving more through united community efforts.",
        image: "/assets/images/gallery_images/gallery_09.jpg",
        link: "#"
    },
    {
        id: 10,
        title: "Health & Wellness",
        category: "Care",
        description: "Holistic well-being approaches for lasting impacts.",
        image: "/assets/images/gallery_images/gallery_10.jpg",
        link: "#"
    },
    {
        id: 11,
        title: "Digital Literacy",
        category: "Education",
        description: "Closing the digital divide with hands-on computer training.",
        image: "/assets/images/gallery_images/gallery_11.jpg",
        link: "#"
    },
    {
        id: 12,
        title: "Family Unity",
        category: "Support",
        description: "Strengthening families as the core of community transformation.",
        image: "/assets/images/gallery_images/gallery_12.jpg",
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
