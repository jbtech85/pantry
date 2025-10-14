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

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["pantryItems"],
    queryFn: async () => {
      const response = await fetch('src/components/IngredientList/tempIngredients.json');
      if(!response.ok){
        throw new Error("Network response failed");
      }
      return response.json();
    }
  })
  
  if(isLoading) {
    return <div>Loading...</div>
  }

  if(isError) {
    return (
      <div>
        Error
        Message: {error.message}
        Name: {error.name}
        Stack: {error.stack}
      </div>
    )
  }

  console.log(data);

  
    
  return (
    <div style={pantrySectionStyle}>Pantry Section

      <IngredientForm />
      <IngredientList section="pantry" />
    </div>
  )
}
export default Pantry