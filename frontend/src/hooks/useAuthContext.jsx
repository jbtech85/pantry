import { AuthContext } from "../context/userContext";
import { useContext } from "react";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if(!context) {
    throw Error('useAuthContext must be used inside an AUthContextProvider');
  }

  return context;
}