type SectionProps = {
  section: string
}

type IngredientProps = {
  ingredients: string[]
}

const IngredientList = ({ ingredients }: IngredientProps) => {
  return (
    <ul>
      {ingredients.map((ingredient) => (
        <li>{ingredient}</li>
      ))}
    </ul>
  )
}
export default IngredientList