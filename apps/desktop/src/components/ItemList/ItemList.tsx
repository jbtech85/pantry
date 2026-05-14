import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ItemListItem from "./ItemListItem/ItemListItem";
import { useHouseholdContext } from "../../hooks/useHouseholdContext";


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

  const { householdID } = useHouseholdContext();  

  console.log(`household_id: ${householdID}`);

  // TODO: will need to differentiate between default household and selectedhousehold, probably within context and affected by a dropdown

  // Grab data from our data source via Tanstack
  const pantryQry = useQuery({
    queryKey: [`${mode}Items`],
    queryFn: async () => {
      const mongoItems = `/api/items/household/${householdID}/${mode}`;

      let fetchedItems = mongoItems;
      const response = await fetch(fetchedItems);
      if(!response.ok){
        throw new Error("No items found. Please add items and try again.");
      }
      return response.json();
    },
    enabled: householdID > 1 // only run when user is logged in, and a household is selected
  });

  if(pantryQry.isLoading) {
    return <div>Loading...</div>
  }
  
  if(pantryQry.isError) {
    return <div>{pantryQry.error.message}</div>;
  }

  if(householdID > 1 && pantryQry.data.rows > 0) {
    return (
      <ul>
        {pantryQry.data.map((item: itemType) => (
          <ItemListItem key={item._id} item={item} mode={mode} onCheckboxChange={onCheckboxChange} />
        ))}
      </ul>
    )
  }

  // if user is anonymous
    // check locale storage
  
}
export default ItemList 