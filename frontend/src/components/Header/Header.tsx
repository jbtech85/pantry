
import { StyledHeader } from "./Header.styles";
import logo from "../../assets/images/pantryIconOne.png"
import Navbar from "../Navbar/Navbar"
import LoginButton from "../Button_Drawer/LoginButton/LoginButton";

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