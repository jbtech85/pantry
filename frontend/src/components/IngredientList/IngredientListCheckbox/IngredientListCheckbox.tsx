type CheckboxProps = {
  isChecked: boolean,
  onCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>)=>void,
  ingredient_id: string
}

const IngredientListCheckbox = ({isChecked, onCheckboxChange, ingredient_id}: CheckboxProps) => {
  return (
    <input type="checkbox" checked={isChecked} onChange={onCheckboxChange} ingredient_id={ingredient_id} />
  )
}
export default IngredientListCheckbox