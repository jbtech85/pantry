import { createContext, useReducer } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, 
    {user: null}
  );

  console.log('AuthContext state: ', state);

  return (
    <AuthContext.Provider value={{...state, dispatch}}>
      { children }
    </AuthContext.Provider>
  )
}



let household_id;
// TODO: use logic to get household of current user
household_id = 1;

// if no household is set (user is not logged in)
if(!household_id){
  // default to 0 for anonymous users
  household_id = 0;
}

export const HouseholdContext = createContext(household_id);