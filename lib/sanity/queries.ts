import { client } from "./client";
import { groq } from "next-sanity";

// Types (simplified for now, ideally generated from schema)
export interface ImpactStory {
    title: string;
    slug: { current: string };
    mainImage: any;
    summary: string;
    body?: any;
    stats?: { label: string; value: string }[];
}

export interface Campaign {
    headline: string;
    targetAmount: number;
    currentAmount: number;
    status: "Active" | "Completed" | "Emergency";
    paymentLink: string;
}

export async function getHomepageStories(): Promise<ImpactStory[]> {
    const query = groq`*[_type == "impactStory"] | order(_createdAt desc)[0...3] {
    title,
    slug,
    mainImage,
    summary
  }`;
    return client.fetch(query);
}

export async function getActiveCampaigns(): Promise<Campaign[]> {
    const query = groq`*[_type == "campaign" && (status == "Active" || status == "Emergency")] {
    headline,
    targetAmount,
    currentAmount,
    status,
    paymentLink
  }`;
    return client.fetch(query);
}

export async function getStoryBySlug(slug: string): Promise<ImpactStory | null> {
    const query = groq`*[_type == "impactStory" && slug.current == $slug][0] {
    title,
    slug,
    mainImage,
    summary,
    body,
    stats
  }`;
    return client.fetch(query, { slug });
}
