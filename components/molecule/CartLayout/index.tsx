import Image from 'next/image';
import { useEffect, useRef } from 'react';
import cancelIcon from '../../../assets/images/cancel.svg';
import { useCart } from '../../../context/CartContext';
import CartLayout from './layout';

export const CartModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { error, cartData } = useCart();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const body = window.document.body;
  const classList = [`max-h-screen`, `overflow-hidden`];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen && dialog) {
      dialog.showModal();
      body.classList.add(...classList);
    } else if (!isOpen && dialog) {
      body.classList.remove(...classList);
      dialog.close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, body]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleDialogClose = () => {
      body.classList.remove(...classList);
      onClose();
    };

    dialog.addEventListener('close', handleDialogClose);

    return () => dialog.removeEventListener('close', handleDialogClose);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose, body]);

  const handleClose = () => {
    dialogRef.current?.close();
    body.classList.remove(...classList);
    onClose();
  };

  return (
    <dialog
      className={`max-w-full ${
        error ? 'min-h-[auto]' : 'min-h-dvh'
      } w-screen m-0 bg-white backdrop:relative mx-auto`}
      tabIndex={-1}
      ref={dialogRef}
    >
      <div className='h-[42px] bg-white w-full border-b border-[#000] fixed top-0 inset-x-0 z-10 flex px-[1.125rem] md:px-7 items-center'>
        <p className='w-full focus:outline-none font-semibold text-sm text-black-100'>
          {cartData?.code}
        </p>
        <button
          onClick={handleClose}
          className='focus:outline-none focus:ring-2 focus:ring-offset-white focus:ring-offset-2 focus:ring-orange-300 focus:rounded-full'
          tabIndex={0}
          aria-label='Close Cart'
        >
          <Image src={cancelIcon} alt='' />
        </button>
      </div>
      {isOpen ? <CartLayout /> : null}
    </dialog>
  );
};

export default CartModal;
