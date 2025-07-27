import { useSelector } from 'react-redux';
import type { ItemsState } from '../store/items';

export default function Menu() {
  const items = useSelector((state: ItemsState) => state.items);
  return (
    <div
      className={`w-[200px] h-full bg-amber-500 absolute  top-0 left-0 duration-400 ${items.length > 0 ? 'translate-x-0' : '-translate-x-full'}`}
    >
      menu
    </div>
  );
}
