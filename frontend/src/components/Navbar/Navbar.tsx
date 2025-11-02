import { Link } from "react-router-dom"
import styled from 'styled-components';

const NavUL = styled.ul`
  display: flex;
  list-style: none;

  li {
    padding: 0px 10px 0px 5px;

    a {
      font-family: 'Poppins', sans-serif;
      font-weight: bold;
      text-decoration: none;
    }
  }
`;

export default function Navbar(){
  return (
      <nav>
        <NavUL>
          <li>
            <Link to='/'>Pantry</Link>
          </li>
          <li>
            <Link to='/grocery-list'>Grocery List</Link>
          </li>
          <li>
            <Link to='/recipes'>Recipes</Link>
          </li>
        </NavUL>
      </nav>
  )
}