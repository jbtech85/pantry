import { RiFilePaper2Line } from "react-icons/ri"
import { TiDeleteOutline } from "react-icons/ti"
import { IngredientLI } from "./IngredientList.styles"
import { useMutation, useQueryClient } from "@tanstack/react-query";


type ingredientType = {
  id: string;
  name: string;
}

type IngredientListProps = {
  items: ingredientType[],
  mode: string
}

const IngredientList = ({items, mode}: IngredientListProps) => {
  const queryClient = useQueryClient();
  const removeIngredient = useMutation({
    mutationFn: async (household_id, ingredient_id) => {
      const resp = await fetch(`/api/household/${household_id}/item/${ingredient_id}`, {
        method: 'PUT'
      });
      if(!resp.ok) {
        throw new Error('Unable to remove item');
      }
      return resp.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pantryItems']});
    }
  })

  return (
    <ul>
      {items.map((ingredient: ingredientType) => (
        <IngredientLI key={ingredient.id}>
          {/* 
            -- when clicking delete, if item is not on grocery list give prompt() to add.
            -- in prompt, give options, with icons,"Add to Grocery List and remove" and "Remove"
          */}
          <div>
            <div>{ingredient.name}</div>
            

            {mode == 'pantry' && (
              <>
                <button>
                  {/* -- TODO: change to "Remove from ingredientList" component, passing in Pantry */}
                  <TiDeleteOutline />
                </button>

                <button>
                  {/* -- TODO: change to "Add to ingredientList" component, passing in Pantry */}
                  <RiFilePaper2Line />
                </button>
              </>
            )}

          </div>

        </IngredientLI>
      ))}
    </ul>
  )
}
export default IngredientList