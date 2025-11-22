import IngredientForm from "../IngredientForm/IngredientForm"
import IngredientList from "../IngredientList/IngredientList"
import { PantrySection } from './Pantry.styles'

const Pantry: React.FC = () => { 
  return (
    <PantrySection>
      <IngredientForm mode="pantry" />
      <IngredientList mode="pantry" />
    </PantrySection>
  )
}
export default Pantry