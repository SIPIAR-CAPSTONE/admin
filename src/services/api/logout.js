import supabase from "@/supabase/config";
const logout = () => supabase.auth.signOut();

export default logout;
