import IngredientForm from "../IngredientForm/IngredientForm"
import IngredientList from "../IngredientList/IngredientList"


const Pantry = () => {
  

  return (
    <div>Pantry Section

      <IngredientForm />
      <IngredientList section="pantry" ingredients={ingredients} />
    </div>
  )
}
export default Pantry