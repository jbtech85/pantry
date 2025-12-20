import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState<null | unknown>(null);
  const [isLoading, setIsLoading] = useState<null | boolean>(null);
  const { dispatch } = useAuthContext;

  const signup = async (email: string, password: string) => {
    setIsLoading(true);

    // reset on each attempt
    setError(null);

    const resp = await fetch('/api/users/signup', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ email, password })
    });

    const json = await resp.json();

    if(resp.ok) {
      // save the user to local storage
      localStorage.setItem('pantrydata_user', JSON.stringify(json));

      // update the auth context
      dispatch({type: 'Login', payload: json});

      setIsLoading(false);
    } 
    if(!resp.ok) {
      setIsLoading(false);
      setError(json.error)
    }
  }
  
  return { signup, isLoading, error }
}