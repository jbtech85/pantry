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
        const res = await fetch(`/api/household/default/${state.user.userID}`);
        const json = await res.json();

        // default to 1 if no default household
        setHouseholdID(json.household_id ?? 1);
      } catch (err) {
        console.log('Unable to fetch household: ', err);
        setHouseholdID(1);
      }
    };

    fetchHousehold();
  }, [state.user]);

  return (
    <AuthContext.Provider value={{...state, dispatch}}>
      <HouseholdContext.Provider value={{householdID, setHouseholdID}}>
        { children }
      </HouseholdContext.Provider>
    </AuthContext.Provider>
  );
};

