import { useState } from "react"
import Navbar from "../Navbar/Navbar"
import logo from "./../../assets/images/pantryIconOne.png"
// import LoginButton from "../LoginButton/LoginButton";
import { GiAbstract076 } from "react-icons/gi";

const Header = () => {
  const[isAuthed, setIsAuthed] = useState(false);

  const giAbstract076Style = {
    fontSize: "36px",
    color: "hsl(28 100% 43%)"
  }

  return (
    <>
      <img src={logo} height={150} alt="pantry logo" />
      <Navbar />
      <GiAbstract076 style={giAbstract076Style}/><button onClick={() => setIsAuthed(!isAuthed)}>{isAuthed ? "Log out" : "Log in"}</button>
    </>
  )
}
export default Header