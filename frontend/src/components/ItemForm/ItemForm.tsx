import { useActionState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { HouseholdContext } from "../../context/userContext";

type ItemFormProps = {
  mode: string
}

type addItemParams = {
  household_id: string,
  item_name: string,
  item_variation?: string
}

const ItemForm: React.FC<ItemFormProps> = ({ mode }) => {
  const queryClient = useQueryClient();
  const household_id = useContext(HouseholdContext);

  // TODO
  // Begin by checking for a local cache of all items a user has
  // If no cache found, create one including all pantry/grocery/past items


  // the core add function that calls our API
  const addItem = async (formData: FormData) => {
    let itemName = formData.get("item");
    let itemVariation = formData.get("variation");

    // TODO: check against local cache for existing items

    let resp;
    // If truly new item, create new item
    if(/*creating a new item*/ 1 == 1) {
      resp = await fetch(`/api/household/${household_id}/item/new`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          "itemName": itemName,
          "itemVariation": itemVariation,
          "mode": mode
        })
      });
    } else if (/*if updating an existing item*/ 0 == 0) {
      // If existing item, update item accordingly
      // For simplicity and code re-use, going to lean on past item logic
      let item_id = ''; // whatever ID we found in our duplicate check
      resp = await fetch(`/api/househod/${household_id}/item/${item_id}`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          "mode": "past",
          "action": mode
        })
      });
    }

    if((resp as Response).ok) {
      // managing list state with Tanstack
      queryClient.invalidateQueries({ queryKey: [`${mode}Items`]});
    } else {
      throw new Error('Unable to add item');
    }
  }
  return (
    <form action={addItem}>
      <input type="text" name="item" placeholder="name" />
      <input type="text" name="variation" placeholder="variation" />
        
      <button type="submit">
        Add to pantry
      </button>
    </form>
  )
}
export default ItemForm