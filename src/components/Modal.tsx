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

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    if (open) {
      modal.showModal();
    } else {
      modal.close();
    }
  }, [open]);

  function handleBackdropMouseDown(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === e.currentTarget) setOpen(false);
  }

  return createPortal(
    <dialog
      className="min-w-[400px] bg-gray-300 backdrop:bg-black/50"
      ref={modalRef}
      onClose={() => setOpen(false)}
      onMouseDown={handleBackdropMouseDown}
    >
      {children}
    </dialog>,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.getElementById('modal')!
  );
}
