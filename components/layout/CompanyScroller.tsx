"use client";

import { InfoScroller, ScrollerItem } from "@/components/ui/InfoScroller";

const partnerCompanies: ScrollerItem[] = [
    {
        name: "USAID",
        category: "International Development",
        description: "Partnering for global health and economic prosperity",
        logo: "USAID",
        image: "/assets/branding/splash-image-011.jpg",
    },
    {
        name: "UNICEF",
        category: "Child Advocacy",
        description: "Protecting the rights of every child and young mother",
        logo: "UNICEF",
        image: "/assets/branding/splash-image-012.jpg",
    },
    {
        name: "Ministry of Gender",
        category: "Government Partner",
        description: "Coordinating national social protection programs",
        logo: "MGLSD",
        image: "/assets/branding/splash-image-013.jpg",
    },
    {
        name: "Global Fund for Children",
        category: "Community Impact",
        description: "Scaling grassroots movements for social change",
        logo: "GFC",
        image: "/assets/branding/splash-image-014.jpg",
    },
    {
        name: "Uganda NGO Bureau",
        category: "Regulatory Partner",
        description: "Ensuring excellence in indigenous NGO operations",
        logo: "NGO BUREAU",
        image: "/assets/branding/splash-image-011.jpg",
    },
    {
        name: "The Mastercard Foundation",
        category: "Economic Empowerment",
        description: "Enabling young people to access dignified work",
        logo: "MASTERCARD",
        image: "/assets/branding/splash-image-012.jpg",
    },
    {
        name: "Save the Children",
        category: "Child Safety",
        description: "Championing the safety and future of every child",
        logo: "SAVE THE CHILDREN",
        image: "/assets/branding/splash-image-013.jpg",
    },
    {
        name: "Comic Relief",
        category: "Philanthropic Partner",
        description: "Driving positive change through creative advocacy",
        logo: "COMIC RELIEF",
        image: "/assets/branding/splash-image-014.jpg",
    }
];

export function CompanyScroller() {
    return (
        <InfoScroller
            sectionTitle="Our Partners"
            sectionLinkText="See All Partners"
            sectionHref="/partners"
            items={partnerCompanies}
        />
    );
}
