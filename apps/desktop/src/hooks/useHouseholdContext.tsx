import { HouseholdContext } from "../context/userContext";
import { useContext } from "react";

export const useHouseholdContext = () => {
  const context = useContext(HouseholdContext);

  if(!context) {
    throw Error('useHouseholdContext must be used inside an AuthContextProvider');
  }

  return context;
}