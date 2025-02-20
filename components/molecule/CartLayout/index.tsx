import Image from "next/image";
import { useEffect, useRef } from "react";
import cancelIcon from "../../../assets/images/cancel.svg";
import CartLayout from "./layout";
export const CartModal = ({
  isOpen,
  onClose,
  code,
}: {
  isOpen: boolean;
  onClose: () => void;
  code?: string;
}) => {
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
    dialog.addEventListener("close", handleDialogClose);

    return () => dialog.removeEventListener("close", handleDialogClose);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose, body]);

  const handleClose = () => {
    dialogRef.current?.close();
    body.classList.remove(...classList);
    onClose();
  };

  return (
    <dialog
      className="max-w-full w-screen m-0 bg-white backdrop:relative mx-auto"
      tabIndex={-1}
      ref={dialogRef}
    >
      <div className="h-[42px] bg-white w-full border-b border-[#000] fixed top-0 inset-x-0 flex items-center">
        <p className="w-full focus:outline-none font-semibold text-sm text-black-100 pl-7">
          {code}
        </p>
        <button
          onClick={handleClose}
          className="focus-visible:rounded-full focus-visible:outline-offset-2 absolute top-[50%] lg:left-[98.88%] left-[calc(100vw-18px)] -translate-x-[50%] -translate-y-[50%]"
        >
          <Image src={cancelIcon} alt="clear search" className={``} />
        </button>
      </div>
      {isOpen ? <CartLayout /> : null}
    </dialog>
  );
};

export default CartModal;
