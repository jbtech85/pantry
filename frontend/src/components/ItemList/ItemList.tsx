import { ItemLI } from "./ItemList.styles"
import ItemListButton from "./ItemListButton/ItemListButton";
import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query"
import { HouseholdContext } from "../../context/userContext";
import ItemListCheckbox from "./ItemListCheckbox/ItemListCheckbox";

type itemType = {
  _id: string;
  name: string;
}

type ItemListProps = {
  mode: string
}

const ItemList: React.FC<ItemListProps> = ({mode}) => {
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
    queryKey: [`${mode}Items`],
    queryFn: async () => {
      const mongoItems = `/api/household/${household_id}/${mode}`;

      let fetchedItems = mongoItems;
      const response = await fetch(fetchedItems);
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
      {pantryQry.data.map((item: itemType) => (
        <ItemLI key={item._id}>
          <div>
            <div>{item.name}</div>
              {(mode == 'pantry' || mode == 'grocerylist') &&
                <>
                  <ItemListButton mode={mode} action='duplicate' item_id={item._id} />
                  <ItemListButton mode={mode} action='transfer' item_id={item._id} />
                  <ItemListButton mode={mode} action='remove' item_id={item._id} />
                </>
              }

              {(mode == 'past') &&
                <ItemListCheckbox onCheckboxChange={onCheckboxChange} item_id={item._id} />
              }
          </div>

        </ItemLI>
      ))}
    </ul>
  )
}
export default ItemList 