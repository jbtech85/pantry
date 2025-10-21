import IngredientForm from "../IngredientForm/IngredientForm"
import IngredientList from "../IngredientList/IngredientList"
import { useQuery } from "@tanstack/react-query"
import { pantrySectionStyle } from './PantryStyles'

const Pantry = () => {
  // Grab data from our data source via Tanstack
  const pantryQry = useQuery({
    queryKey: ["pantryItems"],
    queryFn: async () => {
      const response = await fetch('http://localhost:4100/ingredients?inPantry=true');
      if(!response.ok){
        throw new Error("Network response failed");
      }
      return response.json();
    }
  })

  type pantryItemType = {
    id: number,
    name: string,
    inPantry: boolean,
    onGroceryList: boolean
  };

  type pantryItemsType = pantryItemType[];
  
  if(pantryQry.isLoading) {
    return <div>Loading...</div>
  }
  
  if(pantryQry.isError) {
    return (
      <div>
        Error
        Message: {pantryQry.data.error.message}
        Name: {pantryQry.data.error.name}
        Stack: {pantryQry.data.error.stack}
      </div>
    )
  }
  
  return (
    <div style={pantrySectionStyle}>
      Pantry Section

      <IngredientForm />
      
      {!pantryQry.isLoading &&
        <IngredientList items={pantryQry.data} />
      }
    </div>
  )
}
export default Pantry