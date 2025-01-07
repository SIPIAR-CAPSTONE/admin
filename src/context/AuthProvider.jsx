import { createContext, useContext, useState, useEffect } from "react";
import supabase from "@/supabase/config";
import { login, logout, getUser } from "@/services/api";

const AuthContext = createContext({
  user: null,
  role: null,
  auth: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  // Function to fetch user role
  const fetchUserRole = async (sessionUser) => {

    const { data } = await supabase
    .from('USER')
    .select('admin_role')
    .eq('user_id', sessionUser.id)

    const userRole = data[0]['admin_role'];
    setRole(userRole);
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error);
      }
      if (session?.user) {
        setUser(session.user);
        setAuth(true);
        await fetchUserRole(session.user);
      }
      setLoading(false);
    };

    initializeAuth();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          setUser(session.user);
          setAuth(true);
          await fetchUserRole(session.user);
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          setRole(null);
          setAuth(false);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, auth, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
