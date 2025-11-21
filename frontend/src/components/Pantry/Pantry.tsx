import IngredientForm from "../IngredientForm/IngredientForm"
import IngredientList from "../IngredientList/IngredientList"
import { useQuery } from "@tanstack/react-query"
import { PantrySection } from './Pantry.styles'

type PantryProps = {
  household_id: string
}

type pantryItemType = {
  id: number,
  name: string,
  inPantry: boolean,
  onGroceryList: boolean
};

type pantryItemsType = pantryItemType[];

const Pantry: React.FC<PantryProps> = ({household_id}) => {
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
    <PantrySection>
      <IngredientForm mode="pantry" />
      
      {!pantryQry.isLoading && !pantryQry.isError && 
        <IngredientList items={pantryQry.data} mode="pantry" /> }

      
    </PantrySection>
  )
}
export default Pantry