import { Link } from "react-router-dom"
import styled from 'styled-components';
import logo from "../../assets/images/pantryIconOne.png"

const StyledNav = styled.nav`
  background: hsl(10 85% 83% / 80%);

  ul {
    list-style: none;
    padding-inline-start: 5px;

    li {
      padding: 0px 10px 10px 5px;

      a {
        color: black;
        font-family: 'Poppins', sans-serif;
        font-weight: bold;
        text-decoration: none;

        &:hover {
          color: #e08d12e1;
        }
      }
    }
  }
`


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