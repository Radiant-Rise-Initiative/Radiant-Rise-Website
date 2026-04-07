import { 
    Layout, 
    Target, 
    BarChart3, 
    Users, 
    Zap, 
    Quote, 
    HelpCircle, 
    Shield, 
    Image 
} from "lucide-react";

export interface SectionConfig {
    key: string;
    label: string;
    icon: any;
    isMulti?: boolean;
    fieldName?: string;
}

export const HOME_SECTIONS: SectionConfig[] = [
    { key: "hero", label: "Hero Section", icon: Layout, isMulti: true, fieldName: 'slides' },
    { key: "purpose", label: "Purpose Section", icon: Target },
    { key: "impact_stats", label: "Impact Statistics", icon: BarChart3, isMulti: true, fieldName: 'stats' },
    { key: "who_we_are", label: "Who We Are", icon: Users },
    { key: "our_targets", label: "Our Targets", icon: Zap, isMulti: true, fieldName: 'items' },
    { key: "impact_milestones", label: "Impact Milestones", icon: Quote, isMulti: true, fieldName: 'testimonials' },
    { key: "got_questions", label: "Got Questions", icon: HelpCircle, isMulti: true, fieldName: 'items' },
    { key: "our_values", label: "Our Values", icon: Shield },
    { key: "gallery", label: "Our Gallery", icon: Image, isMulti: true, fieldName: 'items' },
];

export const getSectionByKey = (key: string) => HOME_SECTIONS.find(s => s.key === key);
