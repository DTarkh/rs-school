import { useEffect, useRef, type ReactNode } from 'react';

export default function Modal({
  open,
  setOpen,
  children,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  children: ReactNode;
}) {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  console.log(open);

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    if (open) {
      modal.showModal();
    } else {
      modal.close();
    }
  }, [open]);

  return (
    <dialog
      className="w-[400px] h-[200px] bg-gray-300 backdrop:bg-black/50"
      ref={modalRef}
      onClose={() => setOpen(false)}
    >
      Modal
      {children}
      <div className="w-full flex justify-end">
        <button
          onClick={() => setOpen(false)}
          className="px-4 py-1 bg-amber-400 text-amber-50 cursor-pointer"
        >
          Close
        </button>
      </div>
    </dialog>
  );
}
