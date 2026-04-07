export interface SectionConfig {
    key: string;
    label: string;
    icon: string;
    isMulti?: boolean;
    fieldName?: string;
}

export const HOME_SECTIONS: SectionConfig[] = [
    { key: "hero", label: "Hero Section", icon: "hero", isMulti: true, fieldName: 'slides' },
    { key: "purpose", label: "Purpose Section", icon: "purpose" },
    { key: "impact_stats", label: "Impact Statistics", icon: "statistics", isMulti: true, fieldName: 'stats' },
    { key: "who_we_are", label: "Who We Are", icon: "whoweare" },
    { key: "our_targets", label: "Our Targets", icon: "targets", isMulti: true, fieldName: 'items' },
    { key: "impact_milestones", label: "Impact Milestones", icon: "milestones", isMulti: true, fieldName: 'testimonials' },
    { key: "got_questions", label: "Got Questions", icon: "questions", isMulti: true, fieldName: 'items' },
    { key: "our_values", label: "Our Values", icon: "values" },
    { key: "gallery", label: "Our Gallery", icon: "gallery", isMulti: true, fieldName: 'items' },
];

export const getSectionByKey = (key: string) => HOME_SECTIONS.find(s => s.key === key);
