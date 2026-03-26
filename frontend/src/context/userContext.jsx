import { createContext, useReducer, useEffect, useState } from 'react';

export const AuthContext = createContext();
export const HouseholdContext = createContext();

const authReducer = (state, action) => {
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
  const [state, dispatch] = useReducer(authReducer, {user: null});
  const [householdID, setHouseholdID] = useState(0);

  // restore user from localStorage on mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('pantrydata_user'));

    if(user){
      dispatch({ type: 'LOGIN', payload: user });
    }
  }, []);

  // update household whenever user changes
  useEffect(() => {
    if(!state.user) {
      setHouseholdID(0);
      return;
    }

    const fetchHousehold = async () => {
      try {
        
      } catch (err) {
        console.log('Unable to fetch household: ', err);
      }
    };
  });

  console.log('AuthContext state: ', state);
  if(state.user !== null) {
    console.log(state.user.userID);
    userID = state.user.userID;
  }

  return (
    <AuthContext.Provider value={{...state, dispatch}}>
      { children }
    </AuthContext.Provider>
  )
}



let household_id;
// TODO: use logic to get household of current user
// SELECT household_fk FROM account_household WHERE account_fk = 1;
household_id = 1;

// if no household is set (user is not logged in)
if(!household_id){
  // default to 0 for anonymous users
  household_id = 0;
}

// export const HouseholdContext = createContext(household_id);