import { appStyles } from "../assets/styles/StyleIndex"
import Pantry from "../components/Pantry/Pantry"

const HomePage = () => {
  return (
    <div style={appStyles}>
      <h1 className="text-3xl">Pantry</h1>
      <p>A helper for using the food you already have.</p>

      <Pantry />     

    </div>
  )
}
export default HomePage