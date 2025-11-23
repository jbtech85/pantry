import ItemForm from "../ItemForm/ItemForm"
import ItemList from "../ItemList/ItemList"
import { PantrySection } from './Pantry.styles'

const Pantry: React.FC = () => { 
  return (
    <PantrySection>
      <ItemForm mode="pantry" />
      {/* <ItemList mode="pantry" /> */}
    </PantrySection>
  )
}
export default Pantry