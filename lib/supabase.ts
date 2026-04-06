import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function getSections() {
    const { data } = await supabase.from('site_sections').select('*');
    return data?.reduce((acc, curr) => {
        acc[curr.section_key] = curr.content;
        return acc;
    }, {} as Record<string, any>) || {};
}

export async function getNews() {
    const { data } = await supabase.from('news_releases').select('*').order('date', { ascending: false });
    return data || [];
}
