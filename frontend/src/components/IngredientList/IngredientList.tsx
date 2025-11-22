import { IngredientLI } from "./IngredientList.styles"
import IngredientListButton from "./IngredientListButton/IngredientListButton";
import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query"
import { HouseholdContext } from "../../context/userContext";
import IngredientListCheckbox from "./IngredientListCheckbox/IngredientListCheckbox";

type ingredientType = {
  _id: string;
  name: string;
}

type IngredientListProps = {
  mode: string
}

const IngredientList: React.FC<IngredientListProps> = ({mode}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const onCheckboxChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const selectedItem: string = event.target.value;
    if(event.target.checked) {
      setSelectedItems([...selectedItems, selectedItem])
    } else {
      setSelectedItems(selectedItems.filter(id => id !== selectedItem))
    }
  }

  const household_id = useContext(HouseholdContext);  

  // Grab data from our data source via Tanstack
  const pantryQry = useQuery({
    queryKey: ["pantryItems"],
    queryFn: async () => {
      const mongoIngredients = `/api/household/${household_id}/pantry`;

      let fetchedIngredients = mongoIngredients;
      const response = await fetch(fetchedIngredients);
      if(!response.ok){
        throw new Error("No items found. Please add items and try again.");
      }
      return response.json();
    }
  });

  if(pantryQry.isLoading) {
    return <div>Loading...</div>
  }
  
  if(pantryQry.isError) {
    return <div>{pantryQry.error.message}</div>;
  }

  return (
    <ul>
      {pantryQry.data.map((ingredient: ingredientType) => (
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