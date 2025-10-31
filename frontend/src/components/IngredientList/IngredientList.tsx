import { RiFilePaper2Line } from "react-icons/ri"
import { TiDeleteOutline } from "react-icons/ti"
import { liIngredientStyle, ingredientWrapperStyle, listButtonStyle } from "./IngredientListStyles"

type ingredientType = {
    id: string;
    name: string;
    inPantry: boolean;
    onGroceryList: boolean;
}


const IngredientList = ({items}) => {
  console.log(items)
  return (
    <ul>
      {items.map((ingredient: ingredientType) => (
        <li key={ingredient.id} style={liIngredientStyle}>
          {/* 
            -- when clicking delete, if item is not on grocery list give prompt() to add.
            -- in prompt, give options, with icons,"Add to Grocery List and remove" and "Remove"
          */}
          <div style={ingredientWrapperStyle}>
            <div style={{flex:"1"}}>{ingredient.name}</div>
            
            <div style={listButtonStyle}>
              {/* -- TODO: change to "Remove from ingredientList" component, passing in Pantry */}
              <TiDeleteOutline />
            </div>

            <div style={listButtonStyle}>
              {/* -- TODO: change to "Add to ingredientList" component, passing in Pantry */}
              <RiFilePaper2Line />
            </div>
          </div>

        </li>
      ))}
    </ul>
  )
}
export default IngredientList