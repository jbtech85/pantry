
import { StyledHeader } from "./HeaderStyles";
import logo from "../../assets/images/pantryIconOne.png"
import Navbar from "../Navbar/Navbar"
import LoginButton from "../LoginButton/LoginButton";

const Header = () => {
  return (
    <StyledHeader>
      <img src={logo} height={100} alt="pantry logo" />
      <Navbar />
      <LoginButton />
    </StyledHeader>
  )
}
export default Header