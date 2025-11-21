import { useActionState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
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

  const household_id = useContext(HouseholdContext);

  const addIngredientFn = async ({household_id, ingredient_name, ingredient_variation=''}: addIngredientParams) => {
    const resp = await fetch(`/api/household/${household_id}/`)
  }

  const addIngredientMutation = useMutation({
    mutationFn: (addIngredientFn),

  })

  const actionAddIngredient = async (prevState: any,formData: FormData) => {
    const newIngredient = formData.get("ingredient") as string;

    addIngredientMutation.mutate({ household_id:`${household_id}`, ingredient_name:newIngredient })
  }

  const [state, formAction] = useActionState(actionAddIngredient, undefined)

  return (
    <form action={formAction}>
      <label htmlFor="ingredient">
        <input type="text" name="ingredient" />
      </label>
        
      <button type="submit">
        Add to pantry
      </button>
    </form>
  )
}
export default IngredientForm