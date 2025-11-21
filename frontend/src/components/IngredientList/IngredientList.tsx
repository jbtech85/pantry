import { IngredientLI } from "./IngredientList.styles"
import IngredientListButton from "./IngredientListButton/IngredientListButton";
import { useState } from "react";
import IngredientListCheckbox from "./IngredientListCheckbox/IngredientListCheckbox";

type ingredientType = {
  _id: string;
  name: string;
}

type IngredientListProps = {
  items: ingredientType[],
  mode: string
}

const IngredientList: React.FC<IngredientListProps> = ({items, mode}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const onCheckboxChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const selectedItem: string = event.target.value;
    if(event.target.checked) {
      setSelectedItems([...selectedItems, selectedItem])
    } else {
      setSelectedItems(selectedItems.filter(id => id !== selectedItem))
    }
  }

  return (
    <ul>
      {items.map((ingredient: ingredientType) => (
        <IngredientLI key={ingredient._id}>
          <div>
            <div>{ingredient.name}</div>
              {(mode == 'pantry' || mode == 'grocery') &&
                <>
                  <IngredientListButton mode={mode} action='duplicate' ingredient_id={ingredient._id} />
                  <IngredientListButton mode={mode} action='transfer' ingredient_id={ingredient._id} />
                  <IngredientListButton mode={mode} action='remove' ingredient_id={ingredient._id} />
                </>
              }

              {(mode == 'pastitem') &&
                <IngredientListCheckbox onCheckboxChange={onCheckboxChange} ingredient_id={ingredient._id} />
              }
          </div>

        </IngredientLI>
      ))}
    </ul>
  )
}
export default IngredientList 