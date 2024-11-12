import supabase from "@/supabase/config";

//TODO: utroha lang
const signup = (email, password, data) =>
  supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: data,
    },
  });

export default signup;
