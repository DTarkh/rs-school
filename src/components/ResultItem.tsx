'use client';

import { useDispatch, useSelector } from 'react-redux';
import { itemsActions } from '../store/items/itemSlice';
import type { ItemsState } from '../store/items/itemSlice';
import { useSearchParams } from 'next/navigation';
import { Link, usePathname } from '../i18n/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

type Items = {
  items: ItemsState;
};

export type ItemProps = {
  id: number;
  title: string;
  image: string;
  quantity?: number;
};

export default function ResultsItem({ id, title, image }: ItemProps) {
  const dispatch = useDispatch();
  const items = useSelector((state: Items) => state.items.items);
  const searchParams = useSearchParams();
  const t = useTranslations();

  const isChecked = items.some((item) => item.id === id);

  function checkboxHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const item = { id, title, image, quantity: 1 };
    if (e.target.checked) {
      dispatch(itemsActions.addItem(item));
    } else {
      dispatch(itemsActions.removeItem(id));
    }

    const existingItems: ItemProps[] = JSON.parse(
      localStorage.getItem('items') || '[]'
    );

    const itemExists = existingItems.find((item: ItemProps) => item.id === id);

    if (!itemExists) {
      localStorage.setItem('items', JSON.stringify([...existingItems, item]));
    } else {
      const updatedItems = existingItems.filter((item) => item.id !== id);
      localStorage.setItem('items', JSON.stringify([...updatedItems]));
    }
  }
  const currentPath = usePathname();
  const params = new URLSearchParams(searchParams?.toString() ?? '');
  params.set('id', String(id));

  return (
    <div className="flex items-center space-x-4 bg-white rounded-lg shadow-sm border hover:bg-gray-100  p-4">
      <Image
        src={image}
        alt={title}
        width={200}
        height={200}
        className="w-16 h-16 object-cover rounded-md flex-shrink-0"
      />
      <div className="flex flex-col gap-3">
        <h3 className="font-medium text-gray-900" data-testid="item-title">
          {title}
        </h3>
        <div className="flex gap-7 ">
          <Link
            href={{
              pathname: currentPath,
              query: Object.fromEntries(params.entries()),
            }}
            className="hover:text-fuchsia-600 transition-all"
          >
            {t('seeDetails')}{' '}
          </Link>
          <input
            data-testid="checkbox"
            type="checkbox"
            className="w-5"
            onChange={checkboxHandler}
            checked={isChecked}
          />
        </div>
      </div>
    </div>
  );
}
