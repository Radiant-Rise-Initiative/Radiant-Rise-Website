import { SectionHeader } from "@/components/ui/SectionHeader";
import { GalleryScroller, GalleryItem } from "@/components/ui/GalleryScroller";

const galleryItems: GalleryItem[] = [
    {
        id: 1,
        title: "Post-trauma and adversity counseling sessions for young mothers.",
        category: "Counseling",
        description: "Post-trauma and adversity counseling sessions for young mothers.",
        image: "/assets/images/gallery_images/gallery_01.jpg",
        link: "#",
        modalTitle: "Counseling for Young Mothers",
        modalText: "Radiant Rise provides trauma-informed counseling as the vital first step toward stability. By addressing the social stigma and unresolved trauma faced by young mothers aged 14–25, these sessions restore confidence and decision-making. This emotional recovery ensures participants are mentally prepared to transition into vocational training."
    },
    {
        id: 2,
        title: "Equipping participants with vocational skills and financial inclusion.",
        category: "Empowerment",
        description: "Equipping participants with vocational skills and financial inclusion.",
        image: "/assets/images/gallery_images/gallery_02.jpg",
        link: "#",
        modalTitle: "Vocational Skills and Financial Inclusion",
        modalText: "We empower youths and young mothers through market-aligned vocational training and intensive financial literacy. Beyond technical skills, the program fosters financial inclusion by integrating participants into savings groups and cooperatives. This dual approach ensures graduates possess both practical expertise and the tools for a sustainable livelihood."
    },
    {
        id: 3,
        title: "Nurturing hope and self-reliance through values-based leadership.",
        category: "Partnership",
        description: "Nurturing hope and self-reliance through values-based leadership.",
        image: "/assets/images/gallery_images/gallery_03.jpg",
        link: "#",
        modalTitle: "Hope and Values-Based Leadership",
        modalText: "Our vision is to nurture hope and self-reliance among those rising above adversity. Guided by faith and purpose, Radiant Rise cultivates values-based leadership to help youths unlock their full potential. By grounding development in ethical principles, we inspire participants to take ownership of their growth and community."
    },
    {
        id: 4,
        title: "Uplifting the next generation of youth through structured support.",
        category: "Mentorship",
        description: "Uplifting the next generation of youth through structured support.",
        image: "/assets/images/gallery_images/gallery_04.jpg",
        link: "#",
        modalTitle: "Uplifting Youth Through Structured Support",
        modalText: "Radiant Rise uplifts Uganda's young population by offering a structured six-month pathway designed to break cycles of vulnerability. By coordinating emotional support, skill-building, and income activation, we provide a consistent foundation for long-term stability. This ensures the next generation moves from survival toward lasting resilience."
    },
    {
        id: 5,
        title: "Dedicated workshops to build practical and marketable skills.",
        category: "Vocational",
        description: "Dedicated workshops to build practical and marketable skills.",
        image: "/assets/images/gallery_images/gallery_05.jpg",
        link: "#",
        modalTitle: "Marketable Skill Workshops",
        modalText: "Our \"Build\" phase features dedicated workshops that align skills with real employer demand. From tailoring to enterprise management, these practical sessions focus on high-demand vocations. By ensuring training is market-aligned, we facilitate direct income activation through job placements or structured micro-enterprise toolkits for every participant."
    },
    {
        id: 6,
        title: "Building resilience on strong, enduring values.",
        category: "Faith",
        description: "Building resilience on strong, enduring values.",
        image: "/assets/images/gallery_images/gallery_06.jpg",
        link: "#",
        modalTitle: "Resilience on Enduring Values",
        modalText: "Resilience at Radiant Rise is built on a bedrock of seven core values: compassion, empowerment, integrity, inclusiveness, excellence, faith, and sustainability . We serve with empathy while maintaining transparency in every program. These principles ensure that interventions remain community-owned and capable of generating meaningful impact."
    },
    {
        id: 7,
        title: "Fostering community leaders to inspire systemic change.",
        category: "Development",
        description: "Fostering community leaders to inspire systemic change.",
        image: "/assets/images/gallery_images/gallery_07.jpg",
        link: "#",
        modalTitle: "Inspiring Systemic Change",
        modalText: "We engage religious, local council, and ethnic leaders to foster a community-driven environment for change. By advocating for social, economic, and gender equity, Radiant Rise influences local policies and raises awareness on issues affecting vulnerable groups. This collaboration ensures that systemic barriers are addressed through inclusive development."
    },
    {
        id: 8,
        title: "Expressive therapies combining tradition and creativity.",
        category: "Expression",
        description: "Expressive therapies combining tradition and creativity.",
        image: "/assets/images/gallery_images/gallery_08.jpg",
        link: "#",
        modalTitle: "Expressive and Creative Therapies",
        modalText: "Through community dialogue and guided consultations, we provide a participatory platform for diverse voices to share their experiences. This trauma-informed approach utilizes storytelling and emotional support to help participants rise above adversity. We blend cultural appropriateness with innovative support to nurture healing and purpose."
    },
    {
        id: 9,
        title: "Achieving more through united community efforts.",
        category: "Teamwork",
        description: "Achieving more through united community efforts.",
        image: "/assets/images/gallery_images/gallery_09.jpg",
        link: "#",
        modalTitle: "United Community Efforts",
        modalText: "We believe sustainable impact is achieved through collaboration with government, private sectors, and civil society. By building a community-owned model that engages 90% of local members, Radiant Rise ensures every intervention is responsive. United efforts strengthen trust and foster a collective commitment to uplifting vulnerable households."
    },
    {
        id: 10,
        title: "Holistic well-being approaches for lasting impacts.",
        category: "Care",
        description: "Holistic well-being approaches for lasting impacts.",
        image: "/assets/images/gallery_images/gallery_10.jpg",
        link: "#",
        modalTitle: "Holistic Well-being for Lasting Impact",
        modalText: "Radiant Rise adopts a holistic \"Theory of Change\" that integrates emotional stabilization, vocational training, and financial reinforcement. By addressing the interconnected needs of trauma recovery and income activation, we create a complete ecosystem for growth. This comprehensive approach ensures that impact is both deep and enduring."
    },
    {
        id: 11,
        title: "Closing the digital divide with hands-on computer training.",
        category: "Education",
        description: "Closing the digital divide with hands-on computer training.",
        image: "/assets/images/gallery_images/gallery_11.jpg",
        link: "#",
        modalTitle: "Closing the Digital Divide",
        modalText: "Radiant Rise identifies vocational opportunities and practical skills that empower youth toward self-reliance and productive engagement. By focusing on employer demand and technical training, we aim to bridge the skills gap in the modern economy. These initiatives provide the hands-on expertise necessary for participants to thrive in a shifting landscape."
    },
    {
        id: 12,
        title: "Strengthening families as the core of community transformation.",
        category: "Support",
        description: "Strengthening families as the core of community transformation.",
        image: "/assets/images/gallery_images/gallery_12.jpg",
        link: "#",
        modalTitle: "Families as the Core of Transformation",
        modalText: "We operate as a household economic resilience model, recognizing that family stability is the foundation of community transformation. By reducing income pressure across the entire family unit, we decrease vulnerability and increase resilience. Strengthening one household's economic pathway leads to a more stable community."
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
