import supabase from "@/supabase/config";

const login = (email, password) =>
  supabase.auth.signInWithPassword({ email, password });

export default login;
