import { ButtonDiv } from "./LoginButton.styles";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../../../hooks/useLogout";

// this button is also going to handle logout. seems like a secondary function, not a secondary component, to me.

const LoginButton = () => {

  const navigate = useNavigate();

  return (
      <ButtonDiv>
        <Link to='/login'>Login</Link>
      </ButtonDiv>
      
      // <button onClick={() => navigate('/login')}>{isAuthed ? "Log out" : "Log in"}</button>
  )
}
export default LoginButton