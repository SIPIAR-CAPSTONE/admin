import supabase from "@/supabase/config"
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

const useSendToken = (email, isNavigate) => {
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})

  const process = async () => {
    //! if form is valid send password recovery token
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
    })

    if (error) {
      let errors = {}
      errors.email = error.message
      setErrors(errors)
    } else if (!error) {
      //! if no error exist, and isNavigate is true (for forgotpassword screen only)
      if (isNavigate) {
        //! navigate to token verification screen
        navigate('/token-verification')
      }
    }
  }

  return { errors, setErrors, process }
}

export default useSendToken
