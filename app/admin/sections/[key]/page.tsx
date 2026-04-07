"use client";

import { useParams } from "next/navigation";
import { getSectionByKey } from "@/lib/admin/sectionRegistry";
import { SectionEditor } from "@/components/admin/SectionEditor";
import { SectionHero } from "@/components/admin/sections/SectionHero";
import { SectionPurpose } from "@/components/admin/sections/SectionPurpose";
import { SectionImpactStats } from "@/components/admin/sections/SectionImpactStats";
import { SectionWhoWeAre } from "@/components/admin/sections/SectionWhoWeAre";
import { SectionTargets } from "@/components/admin/sections/SectionTargets";
import { SectionMilestones } from "@/components/admin/sections/SectionMilestones";
import { SectionQuestions } from "@/components/admin/sections/SectionQuestions";
import { SectionValues } from "@/components/admin/sections/SectionValues";
import { SectionGallery } from "@/components/admin/sections/SectionGallery";

export default function DynamicSectionPage() {
    const params = useParams();
    const key = params.key as string;
    const config = getSectionByKey(key);

    if (!config) {
        return (
            <div className="py-24 text-center">
                <h2 className="text-xl font-semibold">Section Not Found</h2>
                <p className="text-black/40 text-sm mt-2">The section key "{key}" could not be located in the registry.</p>
            </div>
        );
    }

    return (
        <SectionEditor 
            sectionKey={config.key}
            label={config.label}
        >
            {(data, setData) => {
                switch (config.key) {
                    case "hero": return <SectionHero data={data} setData={setData} />;
                    case "purpose": return <SectionPurpose data={data} setData={setData} />;
                    case "impact_stats": return <SectionImpactStats data={data} setData={setData} />;
                    case "who_we_are": return <SectionWhoWeAre data={data} setData={setData} />;
                    case "our_targets": return <SectionTargets data={data} setData={setData} />;
                    case "impact_milestones": return <SectionMilestones data={data} setData={setData} />;
                    case "got_questions": return <SectionQuestions data={data} setData={setData} />;
                    case "our_values": return <SectionValues data={data} setData={setData} />;
                    case "gallery": return <SectionGallery data={data} setData={setData} />;
                    default: return <div>This section renderer is not yet implemented.</div>;
                }
            }}
        </SectionEditor>
    );
}
