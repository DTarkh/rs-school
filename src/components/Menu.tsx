'use client';

import { useDispatch, useSelector } from 'react-redux';
import type { ItemsState } from '../store/items/itemSlice';
import Button from './Button';
import { itemsActions } from '../store/items/itemSlice';
import DownloadCSVButton from '../components/DownloadCSVButton';

type Items = {
  items: ItemsState;
};

export default function Menu() {
  const dispatch = useDispatch();
  const items = useSelector((state: Items) => state.items.items);
  const totalSelected = useSelector(
    (state: Items) => state.items.totalQuantity
  );

  function handleClick() {
    dispatch(itemsActions.removeAllItems());
    localStorage.setItem('items', JSON.stringify([]));
  }

  return (
    <div
      className={`min-w-[250px] p-5 flex flex-col gap-5 items-start justify-center h-full bg-gray-100 border-r border-gray-300 absolute top-0 left-0 duration-400 ${items.length > 0 ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <DownloadCSVButton items={items} />
      <Button onClick={handleClick}>Unselect All</Button>
      <span className="mt-10">Total Items Selected: {totalSelected}</span>
    </div>
  );
}
