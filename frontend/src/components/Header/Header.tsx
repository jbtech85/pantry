
import { StyledHeader } from "./Header.styles";
import LoginButton from "./LoginButton/LoginButton";

const Header = () => {
  return (
    <StyledHeader>
      <h1 className="text-3xl">Pantry</h1>
      <LoginButton />
    </StyledHeader>
  )
}
export default Header