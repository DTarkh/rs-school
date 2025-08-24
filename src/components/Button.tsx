import type { ReactNode } from 'react';

export default function Button({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className="bg-amber-600 px-5 py-2 text-amber-50 cursor-pointer"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
