import { IngredientLI } from "./IngredientList.styles"
import IngredientListButton from "../Button_Drawer/IngredientListButton/IngredientListButton";

type ingredientType = {
  _id: string;
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
        <IngredientLI key={ingredient._id}>
          <div>
            <div>{ingredient.name}</div>
              <IngredientListButton mode={mode} action='duplicate' ingredient_id={ingredient._id} />
              <IngredientListButton mode={mode} action='transfer' ingredient_id={ingredient._id} />
              <IngredientListButton mode={mode} action='remove' ingredient_id={ingredient._id} />
          </div>

        </IngredientLI>
      ))}
    </ul>
  )
}
export default IngredientList