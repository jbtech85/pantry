import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null); // Type 'unknown' is not assignable to type 'ReactNode'.ts(2322)
  const [isLoading, setIsLoading] = useState(false);

  const { dispatch } = useAuthContext();

  const login = async (email: FormDataEntryValue | null, password: FormDataEntryValue | null) => {
    setIsLoading(true);

    // reset on each attempt
    setError(null);

    const resp = await fetch('/api/users/login', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ email, password })
    });

    const json = await resp.json();

    if(resp.ok) {
      // save the user to local storage
      localStorage.setItem('pantrydata_user', JSON.stringify(json));

      // update the auth context
      dispatch({type: 'LOGIN', payload: json});

      setIsLoading(false);
      return resp.status;
    } 
    if(!resp.ok) {
      setIsLoading(false);
      setError(json.error)
      return resp.status;
    }
  }
  
  return { login, isLoading, error }
}