import { useState } from "react"
import Navbar from "../Navbar/Navbar"
import logo from "./../../assets/images/pantryIconOne.png"
// import LoginButton from "../LoginButton/LoginButton";
import { GiAbstract076 } from "react-icons/gi";

const Header = () => {
  const[isAuthed, setIsAuthed] = useState(false);

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between"
  }

  const loginStyle = {
    display: "flex",
    alignItems: "center"
  }

  const giAbstract076Style = {
    color: "hsl(28 100% 43%)",
    fontSize: "36px"
  }

  const buttonStyle = {
    background: "hsl(10 85% 53% / 80%)",
    border: "none",
    borderRadius: "10%",
    color: "hsl(180 100% 97%",
    fontFamily: "Trebuchet, sans-serif",
    fontWeight: "bold",
    margin: "5px",
    padding: "10px 20px"
  }

  return (
    <>
      <div style={headerStyle}>
        <img src={logo} height={100} alt="pantry logo" />

        <div style={loginStyle}>
          <button style={buttonStyle} onClick={() => setIsAuthed(!isAuthed)}>{isAuthed ? "Log out" : "Log in"}</button>
        </div>
      </div>
      {/* <Navbar /> */}
    </>
  )
}
export default Header