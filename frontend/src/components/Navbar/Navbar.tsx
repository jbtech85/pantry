import { Link } from "react-router-dom";
import logo from "../../assets/images/pantryIconOne.png";
import { StyledNav } from './Navbar.styles';


export default function Navbar(){
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
        </ul>
      </StyledNav>
  )
}