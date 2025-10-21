import { useState } from "react"
import Navbar from "../Navbar/Navbar"
import logo from "../../assets/images/pantryIconOne.png"
// import LoginButton from "../LoginButton/LoginButton";
import { GiAbstract076 } from "react-icons/gi";
import { Link } from "react-router-dom";
import { buttonStyle, headerStyle, loginStyle } from "./HeaderStyles";

const Header = () => {
  const[isAuthed, setIsAuthed] = useState(false);

 
  return (
    <>
      <div style={headerStyle}>
        <img src={logo} height={100} alt="pantry logo" />

        <div style={loginStyle}>
          <button style={buttonStyle} onClick={() => setIsAuthed(!isAuthed)}>{isAuthed ? "Log out" : "Log in"}</button>
        </div>
      </div>
      <Navbar />

    </>
  )
}
export default Header