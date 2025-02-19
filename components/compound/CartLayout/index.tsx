import Image from "next/image";
import { useEffect, useRef } from "react";
import cancelIcon from "../../../assets/images/cancel.svg";
import CartLayout from "./layout";
export const CartModal = ({
  isOpen,
  onClose,
  code,
  location,
}: {
  isOpen: boolean;
  onClose: () => void;
  code?: string;
  location?: string;
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen && dialog) {
      dialog.showModal();
    } else if (!isOpen && dialog) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleDialogClose = () => onClose();
    dialog.addEventListener("close", handleDialogClose);

    return () => dialog.removeEventListener("close", handleDialogClose);
  }, [onClose]);

  const handleClose = () => {
    dialogRef.current?.close();
    onClose();
  };

  return (
    <dialog
      className="max-w-full w-screen m-0 bg-white backdrop:relative mx-auto"
      ref={dialogRef}
    >
      <div className="h-[42px] searchbar w-full border-b border-[#000] relative flex items-center">
        <p className="w-full focus:outline-none font-semibold text-sm text-black-100 pl-7">
          {code}
        </p>
        <button autoFocus onClick={handleClose} className="w-full">
          <Image
            src={cancelIcon}
            alt="clear search"
            className={`absolute top-[50%] lg:left-[98.88%] left-[calc(100vw-18px)] -translate-x-[50%] -translate-y-[50%]`}
          />
        </button>
      </div>
      {isOpen ? <CartLayout /> : null}
    </dialog>
  );
};

export default CartModal;
