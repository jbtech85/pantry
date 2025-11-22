
import { TiDeleteOutline } from "react-icons/ti"
import { RiFilePaper2Line } from "react-icons/ri"
import { LuCopyPlus } from "react-icons/lu"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { HouseholdContext } from "../../../context/userContext";

type ButtonProps = {
  mode: string,
  action: string,
  ingredient_id: string
}

const IngredientListButton = ({mode, action, ingredient_id}: ButtonProps) => {
  const renderIconFn = () => {
    switch(action) {
      case 'transfer': // move to other list, do not remove from current list
        return <RiFilePaper2Line />
      case 'duplicate': // move to other list, and remove from current list
        return <LuCopyPlus />
      case 'remove': // remove from current list. prompt will handle whether to move to other list
        return <TiDeleteOutline />
    }
  }

  type ingredientFnParams = {
    household_id: string,
    ingredient_id: string
  }

  const updateIngredientFn = async ({household_id, ingredient_id}: ingredientFnParams) => {
    console.log(`household_id:${household_id}. ingredient_id: ${ingredient_id}`);
    const resp = await fetch(`/api/household/${household_id}/item/${ingredient_id}`, {
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ "mode":mode, "action":action })
    });
    if(!resp.ok) {
      throw new Error('Unable to remove item');
    }
    return resp.json();
  }

  const queryClient = useQueryClient();

  const updateIngredient = useMutation({
    mutationFn: (updateIngredientFn),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${mode}Items`]});
    }
  });

  const household_id = useContext(HouseholdContext);
  return (
    <button onClick={() => updateIngredient.mutate({ household_id:`${household_id}`, ingredient_id:ingredient_id })}>
      {renderIconFn()}
    </button>
  )
}
export default IngredientListButton