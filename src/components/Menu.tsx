import { useDispatch, useSelector } from 'react-redux';
import type { ItemsState } from '../store/items';
import Button from './Button';
import { itemsActions } from '../store/items';

export default function Menu() {
  const dispatch = useDispatch();
  const items = useSelector((state: ItemsState) => state.items);
  const totalSelected = useSelector((state: ItemsState) => state.totalQuantity);

  function handleClick() {
    dispatch(itemsActions.removeAllItems());

    localStorage.setItem('items', JSON.stringify([]));
  }
  return (
    <div
      className={`min-w-[250px] p-5 flex flex-col gap-5 items-start justify-center h-full bg-amber-500 absolute  top-0 left-0 duration-400 ${items.length > 0 ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <button className="hover:cursor-pointer hover:underline px-3">
        Download
      </button>
      <Button onClick={handleClick}>Unselect All</Button>
      <span className="mt-10">Total Items Selected: {totalSelected}</span>
    </div>
  );
}
