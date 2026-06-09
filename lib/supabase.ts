import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'anon'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function getSections() {
    try {
        const { data, error } = await supabase.from('site_sections').select('*');
        if (error) {
            console.error('Supabase getSections error:', error.message);
            return {};
        }
        return data?.reduce((acc, curr) => {
            acc[curr.section_key] = curr.content;
            return acc;
        }, {} as Record<string, any>) || {};
    } catch (e) {
        console.error('Supabase getSections fetch failed:', e);
        return {};
    }
}

export async function getNews() {
    try {
        const { data, error } = await supabase.from('news_releases').select('*').order('date', { ascending: false });
        if (error) {
            console.error('Supabase getNews error:', error.message);
            return [];
        }
        return data || [];
    } catch (e) {
        console.error('Supabase getNews fetch failed:', e);
        return [];
    }
}
