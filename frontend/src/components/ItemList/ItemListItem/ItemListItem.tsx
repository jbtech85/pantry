import { ItemLI } from "./../ItemList.styles";
import ItemListButton from "./../ItemListButton/ItemListButton";
import ItemListCheckbox from "./../ItemListCheckbox/ItemListCheckbox";

type ItemListItemProps = {
  item: {
    _id: string,
    name: string
  };
  mode: string;
  onCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ItemListItem: React.FC<ItemListItemProps> = ({item, mode, onCheckboxChange}) => {
  return (
    <ItemLI>
      <div>
        <div>{item.name}</div>
          {(mode == 'pantry' || mode == 'grocerylist') &&
            <>
              <ItemListButton mode={mode} action='duplicate' item_id={item._id} />
              <ItemListButton mode={mode} action='transfer' item_id={item._id} />
              <ItemListButton mode={mode} action='remove' item_id={item._id} />
            </>
          }

          {(mode == 'past') &&
            <ItemListCheckbox onCheckboxChange={onCheckboxChange} isChecked item_id={item._id} />
          }
      </div>
    </ItemLI>
  )
}
export default ItemListItem