const existing = document.getElementById('modal');
if (!existing) {
  const div = document.createElement('div');
  div.id = 'modal';
  document.body.appendChild(div);
}

if (typeof globalThis.HTMLDialogElement !== 'undefined') {
  const proto = globalThis.HTMLDialogElement.prototype;

  if (!proto.showModal) {
    proto.showModal = function thisShowModal(this: HTMLDialogElement) {
      this.open = true;
      if (!this.parentNode) document.body.appendChild(this);
    };
  }
  if (!proto.close) {
    proto.close = function thisClose(this: HTMLDialogElement) {
      this.open = false;
      this.dispatchEvent(new Event('close'));
    };
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  const openDialog = document.querySelector(
    'dialog[open]'
  ) as HTMLDialogElement | null;
  if (openDialog && typeof openDialog.close === 'function') {
    openDialog.close();
  }
});
