type CheckboxProps = {
  isChecked: boolean,
  onCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>)=>void,
  item_id: string
}

const ItemListCheckbox = ({isChecked, onCheckboxChange, item_id}: CheckboxProps) => {
  return (
    <input type="checkbox" checked={isChecked} onChange={onCheckboxChange} itemID={item_id} />
  )
}
export default ItemListCheckbox