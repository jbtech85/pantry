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
        throw new Error("Network response failed");
      }
      return response.json();
    }
  })

  
  if(pantryQry.isLoading) {
    return <div>Loading...</div>
  }
  
  if(pantryQry.isError) {
    return <div>Error: {pantryQry.error.message}</div>;
  }
  
  return (
    <PantrySection>
      <IngredientForm />
      
      {!pantryQry.isLoading &&
        <IngredientList items={pantryQry.data} mode="pantry" />
      }
    </PantrySection>
  )
}
export default Pantry