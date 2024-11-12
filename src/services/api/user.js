import supabase from "@/supabase/config";
const getUser = async (setUser, setLoading) => {
  const { data } = await supabase.auth.getUser();

  const { user: currentUser } = data;
  setUser(currentUser ?? null);
  setLoading(false);
};

export { getUser };
