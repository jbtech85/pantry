import { useState } from "react"
import IngredientForm from "../IngredientForm/IngredientForm"
import IngredientList from "../IngredientList/IngredientList"
import { useQuery } from "@tanstack/react-query"

const pantrySectionStyle = {
  padding: "0px 30px",
  background: "hsla(31, 92%, 90%, 1.00)",
  color: "hsl(17, 41%, 34%)",
  fontSize: "20px"
}

const Pantry = () => {

  const [pantryList, setPantryList] = useState({});

  const query = useQuery({
    queryKey: ["pantryItems"],
    queryFn: async () => {
      const response = await fetch('src/components/IngredientList/tempIngredients.json');
      if(!response.ok){
        throw new Error("Network response failed");
      }
      return response.json();
    }
  })
  
  console.log(query.data);

  
    
  return (
    <div style={pantrySectionStyle}>Pantry Section

      <IngredientForm />
      <IngredientList section="pantry" />
    </div>
  )
}
export default Pantry