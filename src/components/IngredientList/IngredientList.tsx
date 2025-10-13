import tempIngredients from "./tempIngredients.json"

type SectionProps = {
  section: string
}

type IngredientProps = {
  ingredients: string[]
}

const IngredientList = ({ ingredients }: IngredientProps) => {
  return (
    <ul>
      {tempIngredients.map((ingredient) => (
        <li key={ingredient.id}>{ingredient.name}</li>
      ))}
    </ul>
  )
}
export default IngredientList