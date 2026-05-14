import { Link } from "react-router-dom";
import logo from "../../assets/images/pantryIconOne.png";
import { StyledNav, UserSpan } from './Navbar.styles';
import { useAuthContext } from "../../hooks/useAuthContext";


export default function Navbar(){
  const { user } = useAuthContext();

  return (
      <StyledNav>
        <img src={logo} height={100} alt="pantry logo" />
        
        <ul>
          <li>
            <Link to='/'>Pantry</Link>
          </li>
          <li>
            <Link to='/grocery-list'>Grocery List</Link>
          </li>
          <li>
            <Link to='/past-items'>Past Items</Link>
          </li>
          <li>
            <Link to='/recipes'>Recipes</Link>
          </li>

          {user &&
            <li>
              <UserSpan>{user.email}</UserSpan>
            </li>
          }
        </ul>
      </StyledNav>
  )
}