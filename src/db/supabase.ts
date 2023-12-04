import { createBrowserClient } from "@supabase/ssr";
export const supabaseUrl = "https://bmtbohuzvkdifffdwayv.supabase.co";
export const imagePath = `${supabaseUrl}/storage/v1/object/public/images/}`;
export const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;

export const supabase = createBrowserClient(supabaseUrl, supabaseKey);

export default supabase;
