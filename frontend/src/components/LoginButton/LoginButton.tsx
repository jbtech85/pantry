import { ButtonDiv } from "./LoginButton.styles";
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from '../../hooks/useAuthContext';

// this button is also going to handle logout. seems like a secondary function, not a secondary component, to me.

const LoginButton = () => {

  // const navigate = useNavigate();
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
    window.location.reload(); 
  }

  return (
      <>
        <ButtonDiv>
          {!user &&
            <Link to='/login'>Login</Link> }
          
          {user &&
            <button onClick={handleClick}>Logout</button> }
        </ButtonDiv>
      </>
      
      // <button onClick={() => navigate('/login')}>{isAuthed ? "Log out" : "Log in"}</button>
  )
};
export default LoginButton