import { useQuery } from "@tanstack/react-query";
import IngredientList from "../IngredientList/IngredientList";

type PastItemsProps = {
  household_id: string
}

const PastItems: React.FC<PastItemsProps> = ({household_id}) => {
  // Grab data from our data source via Tanstack
  const pastitemQry = useQuery({
    queryKey: ["pastItems"],
    queryFn: async () => {
      const mongoIngredients = `/api/household/${household_id}/pastitems`;

      let fetchedIngredients = mongoIngredients;
      const response = await fetch(fetchedIngredients);
      if(!response.ok){
        throw new Error("Network response failed");
      }
      return response.json();
    }
  });
  
  if(pastitemQry.isLoading) {
    return <div>Loading...</div>
  }
  
  if(pastitemQry.isError) {
    return <div>Error: {pastitemQry.error.message}</div>;
  }  

  return (
    <section>
      {!pastitemQry.isLoading &&
        <IngredientList items={pastitemQry.data} mode="pastitem" />
      }
    </section>
  )
}
export default PastItems