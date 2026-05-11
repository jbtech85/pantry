// import { useActionState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { useHouseholdContext } from "../../hooks/useHouseholdContext";

type ItemFormProps = {
  mode: string
}

/* TODO: utilize or delete
type addItemParams = {
  household_id: string,
  item_name: string,
  item_variation?: string
} */

const ItemForm: React.FC<ItemFormProps> = ({ mode }) => {
  const queryClient = useQueryClient();
  const { householdID } = useHouseholdContext();

  // TODO
  // Begin by checking for a local cache of all items a user has
  // If no cache found, create one including all pantry/grocery/past items


  // the core add function that calls our API
  const addItem = async (formData: FormData) => {
    console.log("adding item");
    let itemName = formData.get("item");
    let itemVariation = formData.get("variation");

    // TODO: check against local cache for existing items

    let resp;
    // If truly new item, create new item
    if(/*creating a new item*/ 1 == 1) {
      console.log("1 == 1");
      resp = await fetch(`/api/items/household/${householdID}`, {
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
      resp = await fetch(`/api/household/${householdID}/item/${item_id}`, {
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
      <label><span>*</span>Item: 
        {/* TODO: use rotating suggested items */}
        <input type="text" name="item" placeholder="shredded cheese" />
      </label>
      <label>Variation: 
        <input type="text" name="variation" placeholder="mexican blend" />
      </label>
        
      <button type="submit">
        Add to pantry
      </button>
    </form>
  )
}
export default ItemForm