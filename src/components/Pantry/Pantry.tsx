import IngredientForm from "../IngredientForm/IngredientForm"
import IngredientList from "../IngredientList/IngredientList"



const Pantry = () => {
  const ingredients = [
    {
      id: 1,
      title: "potatoes"
    },
    {
      id: 2,
      title: "carrots"
    }
  ]

  return (
    <div>Pantry Section

      <IngredientForm />
      <IngredientList section="pantry" ingredients={ingredients} />
    </div>
  )
}
export default Pantry