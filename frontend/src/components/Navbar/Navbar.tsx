import { Link } from "react-router-dom"

export default function Navbar(){
  return (
      <nav>
        <ul>
          <li>
            <Link to='/'>Pantry</Link>
          </li>
          <li>
            <Link to='/grocery-list'>Grocery List</Link>
          </li>
          <li>
            <Link to='/recipes'>Recipes</Link>
          </li>
        </ul>
      </nav>
  )
}