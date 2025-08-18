import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

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

  return createPortal(
    <dialog
      className="min-w-[400px] bg-gray-300 backdrop:bg-black/50"
      ref={modalRef}
      onClose={() => setOpen(false)}
    >
      {children}
    </dialog>,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.getElementById('modal')!
  );
}
