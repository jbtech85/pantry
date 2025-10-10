import { useState } from "react"
import Navbar from "../Navbar/Navbar"
import logo from "./../../assets/images/pantryIconOne.png"
import LoginButton from "../LoginButton/LoginButton";

const Header = () => {
  const[isAuthed, setIsAuthed] = useState(false);

  

  return (
    <>
      <img src={logo} height={150} alt="pantry logo" />
      <Navbar />
      <button onClick={setIsAuthed(!isAuthed)}>Log {logOption}</button>
    </>
  )
}
export default Header