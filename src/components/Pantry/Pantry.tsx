import IngredientForm from "../IngredientForm/IngredientForm"
import IngredientList from "../IngredientList/IngredientList"

const pantrySectionStyle = {
  padding: "0px 30px",
  background: "hsla(31, 92%, 90%, 1.00)",
  color: "hsl(17, 41%, 34%)",
  fontSize: "20px"
}

const Pantry = () => {
  return (
    <div style={pantrySectionStyle}>Pantry Section

      <IngredientForm />
      <IngredientList section="pantry" />
    </div>
  )
}
export default Pantry