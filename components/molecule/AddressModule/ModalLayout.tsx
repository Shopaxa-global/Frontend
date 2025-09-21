import Image from "next/image";
import { ReactNode } from "react";
import closeNoOutline from "../../../assets/images/close-no-outline.svg";

type Props = {
  children: ReactNode;
  handleCloseModal: () => void;
};

const ModalLayout = ({ children, handleCloseModal }: Props) => {
  return (
    <aside className=" fixed right-0 bottom-0 top-0 z-50 bg-[rgba(255,255,255,0.8)] left-0">
      <div className="bg-white h-full w-full max-w-[575px] ml-auto py-[58px] pl-[39px] pr-[58px]">
        <div className="w-full flex justify-end">
          <button
            className="flex justify-end mt-2 mb-4 md:my-0 md:w-[18px] w-full"
            title="close-address-modal"
            onClick={handleCloseModal}
          >
            <Image src={closeNoOutline} alt="close-icon" />
          </button>
        </div>

        {children}
      </div>
    </aside>
  );
};

export default ModalLayout;
