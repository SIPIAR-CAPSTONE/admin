import supabase from "@/supabase/config";

const signup = (email, password, data) =>
  supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        ...data,
        role: "verifier", //TODO: change this to dynamic [verifier, admin]
      },
    },
  });

export default signup;
