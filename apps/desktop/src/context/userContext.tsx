import { createContext, useReducer, useEffect, useState } from 'react';


type UserType = {
  email: string;
  userID: number;
  token: string;
}

type LoginActionType = {
  type: 'LOGIN';
  payload: UserType;
}

type LogoutActionType = {
  type: 'LOGOUT';
}

type AuthActionType = LoginActionType | LogoutActionType;

type AuthContextType = {
  user: UserType | null;
  dispatch: React.Dispatch<AuthActionType>
}

type HouseholdContextType = {
  householdID: number;
  setHouseholdID: React.Dispatch<React.SetStateAction<number>>;
}


export const AuthContext = createContext<AuthContextType | null>(null);
export const HouseholdContext = createContext<HouseholdContextType | null>(null);

const authReducer = (state: { user: UserType | null }, action: AuthActionType) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}


export const AuthContextProvider = ({ children }: { children: React.ReactNode}) => {
  const [state, dispatch] = useReducer(authReducer, {user: null});
  const [householdID, setHouseholdID] = useState(0);

  // restore user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('pantrydata_user');
    if(storedUser){
      const user = JSON.parse(storedUser);
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
        const res = await fetch(`/api/households/default/${(state.user as UserType).userID}`);
        const json = await res.json();

        // default to 1 if no default household
        setHouseholdID(json.defaultHouseholdFK ?? 1);
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

