
import { TiDeleteOutline } from "react-icons/ti"
import { RiFilePaper2Line } from "react-icons/ri"
import { LuCopyPlus } from "react-icons/lu"
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ButtonProps = {
  mode: string,
  action: string,
  ingredient_id: string
}

const IngredientListButton = ({mode, action, ingredient_id}: ButtonProps) => {
  const renderIconFn = () => {
    switch(action) {
      case 'duplicate': // move to other list, do not remove from current list
        return <RiFilePaper2Line />
      case 'transfer': // move to other list, and remove from current list
        return <LuCopyPlus />
      case 'remove': // remove from current list. prompt will handle whether to move to other list
        return <TiDeleteOutline />
    }
  }

  const queryClient = useQueryClient();
  const updateIngredient = useMutation({
    mutationFn: async (household_id, ingredient_id) => {
      const resp = await fetch(`/api/household/${household_id}/item/${ingredient_id}`, {
        method: 'PUT',
        body: JSON.stringify({ mode:mode, action:action })
      });
      if(!resp.ok) {
        throw new Error('Unable to remove item');
      }
      return resp.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pantryItems']});
    }
  });

  return (
    <button onClick={() => updateIngredient.mutate(/* ids here */)}>
      {renderIconFn()}
    </button>
  )
}
export default IngredientListButton