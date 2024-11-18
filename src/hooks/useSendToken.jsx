import supabase from "@/supabase/config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useSendToken = (email, isNavigate) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const process = async () => {
    //* if form is valid send password recovery token
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
    });

    if (error) {
      setError(error.message);
    } else if (!error) {
      //* if no error exist, and isNavigate is true (for ForgotPassword page only)
      if (isNavigate) {
        //* navigate to token verification screen
        navigate("/token-verification");
      }
    }
  };

  return { error, setError, process };
};

export default useSendToken;
