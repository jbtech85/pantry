import { useActionState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { HouseholdContext } from "../../context/userContext";

type IngredientFormProps = {
  mode: string
}

type addIngredientParams = {
  household_id: string,
  ingredient_name: string,
  ingredient_variation?: string
}

const IngredientForm: React.FC<IngredientFormProps> = ({ mode }) => {
  const queryClient = useQueryClient();
  const household_id = useContext(HouseholdContext);

  // the core add function that calls our API
  const addIngredient = async (formData: FormData) => {
    // event.preventDefault();
    let ingredientName = formData.get("ingredient");
    let ingredientVariation = formData.get("variation");
    // 

    const resp = await fetch(`/api/household/${household_id}/item/new`, {
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        "name": ingredientName,
        "ingredientVariation": ingredientVariation,
        "mode": mode
      })
    });
    if(resp.ok) {
      queryClient.invalidateQueries({ queryKey: [`${mode}Items`]});
    } else {
      throw new Error('Unable to add item');
    }
  }


  return (
    <form action={addIngredient}>
      <input type="text" name="ingredient" placeholder="name" />
      <input type="text" name="variation" placeholder="variation" />
        
      <button type="submit">
        Add to pantry
      </button>
    </form>
  )
}
export default IngredientForm