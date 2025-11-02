import { useState } from "react"
import styled from "styled-components"

const ButtonDiv = styled.div`
  margin-left: auto;

  button {
    background: hsl(10 85% 53% / 80%);
    border: none;
    border-radius: 10%;
    color: hsl(180 100% 97%);
    font-family: Trebuchet, sans-serif;
    font-weight: bold;
    margin: 10px 5px;
    padding: 10px 20px;
    whitespace: nowrap;
  }
`;

const LoginButton = () => {
  const[isAuthed, setIsAuthed] = useState(false);

  return (
      <ButtonDiv>
        <button onClick={() => setIsAuthed(!isAuthed)}>{isAuthed ? "Log out" : "Log in"}</button>
      </ButtonDiv>
  )
}
export default LoginButton