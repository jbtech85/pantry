import { Link, Route, Routes } from "react-router-dom"
import Pantry from "../Pantry/Pantry"
import GroceryList from "../GroceryList/GroceryList"


const Navbar = () => {
  

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to='/pantry'>Pantry</Link>
          </li>
          <li>
            <Link to='/grocery-list'>Grocery List</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path='/' element={<Pantry />} />
        <Route path='/pantry' element={<Pantry />} />
        <Route path='/grocery-list' element={<GroceryList />} />
      </Routes>
    </>
  )
}
export default Navbar