import { IngredientLI } from "./IngredientList.styles"
import IngredientListButton from "../Button_Drawer/IngredientListButton/IngredientListButton";

type ingredientType = {
  id: string;
  name: string;
}

type IngredientListProps = {
  items: ingredientType[],
  mode: string
}

const IngredientList = ({items, mode}: IngredientListProps) => {
  return (
    <ul>
      {items.map((ingredient: ingredientType) => (
        <IngredientLI key={ingredient.id}>
          <div>
            <div>{ingredient.name}</div>
              <IngredientListButton mode={mode} action='transfer' ingredient_id={ingredient.id} />
              <IngredientListButton mode={mode} action='duplicate' ingredient_id={ingredient.id} />
              <IngredientListButton mode={mode} action='remove' ingredient_id={ingredient.id} />
          </div>

        </IngredientLI>
      ))}
    </ul>
  )
}
export default IngredientList