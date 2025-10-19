import { Link } from "react-router-dom"

const Navbar = () => {
  return (
      <nav>
        <ul>
          <li>
            link to pantry
          </li>
          <li>
            <Link to='/grocery-list'>link to grocery</Link>
          </li>
        </ul>
      </nav>
  )
}
export default Navbar