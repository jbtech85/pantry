import { createContext } from 'react';

let household_id;
// TODO: use logic to get household of current user
household_id = 1;

// if no household is set (user is not logged in)
if(!household_id){
  // default to 0 for anonymous users
  household_id = 0;
}

export const HouseholdContext = createContext(household_id);