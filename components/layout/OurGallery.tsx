import { SectionHeader } from "@/components/ui/SectionHeader";
import { GalleryScroller, GalleryItem } from "@/components/ui/GalleryScroller";

const galleryItems: GalleryItem[] = [
    {
        id: 1,
        title: "Healing Hearts: Post-trauma and adversity counseling sessions for young mothers.",
        category: "Counseling",
        description: "Healing Hearts: Post-trauma and adversity counseling sessions for young mothers.",
        image: "/assets/images/gallery_images/01. Healing Hearts.jpg",
        link: "#",
        modalTitle: "01. Healing Hearts",
        modalText: "Radiant Rise provides trauma-informed counseling as the vital first step toward stability. By addressing the social stigma and unresolved trauma faced by young mothers aged 14–25, these sessions restore confidence and decision-making. This emotional recovery ensures participants are mentally prepared to transition into vocational training."
    },
    {
        id: 2,
        title: "Community Synergy: Equipping participants with vocational skills and financial inclusion.",
        category: "Empowerment",
        description: "Community Synergy: Equipping participants with vocational skills and financial inclusion.",
        image: "/assets/images/gallery_images/02. Community Synergy.jpg",
        link: "#",
        modalTitle: "02. Community Synergy",
        modalText: "We empower youths and young mothers through market-aligned vocational training and intensive financial literacy. Beyond technical skills, the program fosters financial inclusion by integrating participants into savings groups and cooperatives. This dual approach ensures graduates possess both practical expertise and the tools for a sustainable livelihood."
    },
    {
        id: 3,
        title: "Stronger Futures: Nurturing hope and self-reliance through values-based leadership.",
        category: "Resilience",
        description: "Stronger Futures: Nurturing hope and self-reliance through values-based leadership.",
        image: "/assets/images/gallery_images/03. Stronger Futures.jpg",
        link: "#",
        modalTitle: "03. Stronger Futures",
        modalText: "Our vision is to nurture hope and self-reliance among those rising above adversity. Guided by faith and purpose, Radiant Rise cultivates values-based leadership to help youths unlock their full potential. By grounding development in ethical principles, we inspire participants to take ownership of their growth and community."
    },
    {
        id: 4,
        title: "Skills Training: Dedicated workshops to build practical and marketable skills.",
        category: "Vocational",
        description: "Skills Training: Dedicated workshops to build practical and marketable skills.",
        image: "/assets/images/gallery_images/04. Skills Training.jpg",
        link: "#",
        modalTitle: "04. Skills Training",
        modalText: "Our \"Build\" phase features dedicated workshops that align skills with real employer demand. From tailoring to enterprise management, these practical sessions focus on high-demand vocations. By ensuring training is market-aligned, we facilitate direct income activation through job placements or structured micro-enterprise toolkits for every participant."
    },
    {
        id: 5,
        title: "Spiritual Foundation: Building resilience on strong, enduring values.",
        category: "Faith",
        description: "Spiritual Foundation: Building resilience on strong, enduring values.",
        image: "/assets/images/gallery_images/05. Spiritual Foundation.jpg",
        link: "#",
        modalTitle: "05. Spiritual Foundation",
        modalText: "Resilience at Radiant Rise is built on a bedrock of seven core values: compassion, empowerment, integrity, inclusiveness, excellence, faith, and sustainability . We serve with empathy while maintaining transparency in every program. These principles ensure that interventions remain community-owned and capable of generating meaningful impact."
    },
    {
        id: 6,
        title: "Leadership Focus: Fostering community leaders to inspire systemic change.",
        category: "Leadership",
        description: "Leadership Focus: Fostering community leaders to inspire systemic change.",
        image: "/assets/images/gallery_images/06. Leadership Focus.jpg",
        link: "#",
        modalTitle: "06. Leadership Focus",
        modalText: "We engage religious, local council, and ethnic leaders to foster a community-driven environment for change. By advocating for social, economic, and gender equity, Radiant Rise influences local policies and raises awareness on issues affecting vulnerable groups. This collaboration ensures that systemic barriers are addressed through inclusive development."
    },
    {
        id: 7,
        title: "Collaborative Growth: Achieving more through united community efforts.",
        category: "Partnership",
        description: "Collaborative Growth: Achieving more through united community efforts.",
        image: "/assets/images/gallery_images/07. Collaborative Growth.jpg",
        link: "#",
        modalTitle: "07. Collaborative Growth",
        modalText: "We believe sustainable impact is achieved through collaboration with government, private sectors, and civil society. By building a community-owned model that engages 90% of local members, Radiant Rise ensures every intervention is responsive. United efforts strengthen trust and foster a collective commitment to uplifting vulnerable households."
    },
    {
        id: 8,
        title: "Health & Wellness: Holistic well-being approaches for lasting impacts.",
        category: "Care",
        description: "Health & Wellness: Holistic well-being approaches for lasting impacts.",
        image: "/assets/images/gallery_images/08. Health & Wellness.jpg",
        link: "#",
        modalTitle: "08. Health & Wellness",
        modalText: "Radiant Rise adopts a holistic \"Theory of Change\" that integrates emotional stabilization, vocational training, and financial reinforcement. By addressing the interconnected needs of trauma recovery and income activation, we create a complete ecosystem for growth. This comprehensive approach ensures that impact is both deep and enduring."
    }
];

export function OurGallery({ 
    items = galleryItems 
}: { 
    items?: GalleryItem[] 
}) {
    return (
        <section className="bg-[#f5f5f7] pt-24 pb-0 overflow-hidden select-none border-t border-black/10">
            <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full mb-12 px-4 sm:px-12 lg:px-0">
                <SectionHeader
                    title="Our Gallery"
                    linkText="Explore Our Stories"
                    href="#"
                />
            </div>
            <GalleryScroller items={items} />
        </section>
    );
}
