
import { TiDeleteOutline } from "react-icons/ti"
import { RiFilePaper2Line } from "react-icons/ri"
import { LuCopyPlus } from "react-icons/lu"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { HouseholdContext } from "../../../context/userContext";

type ButtonProps = {
  mode: string,
  action: string,
  item_id: string
}

const ItemListButton = ({mode, action, item_id}: ButtonProps) => {
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

  type itemFnParams = {
    household_id: string,
    item_id: string
  }

  const updateItemFn = async ({household_id, item_id}: itemFnParams) => {
    console.log(`household_id:${household_id}. item_id: ${item_id}`);
    const resp = await fetch(`/api/household/${household_id}/item/${item_id}`, {
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

  const updateItem = useMutation({
    mutationFn: (updateItemFn),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${mode}Items`]});
    }
  });

  const household_id = useContext(HouseholdContext);
  return (
    <button onClick={() => updateItem.mutate({ household_id:`${household_id}`, item_id:item_id })}>
      {renderIconFn()}
    </button>
  )
}
export default ItemListButton