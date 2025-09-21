import { Dispatch, SetStateAction } from "react";
import { AddressModalLayout } from ".";
import AddressCard from "./AddressCard";

type SelectAddressTypes = {
  setOpenSelectAddress: Dispatch<SetStateAction<boolean>>;
};

const SelectAddress = ({ setOpenSelectAddress }: SelectAddressTypes) => {
  const handleCloseModal = () => {
    setOpenSelectAddress(false);
  };
  return (
    <AddressModalLayout handleCloseModal={handleCloseModal}>
      <div className="mt-10 font-Silka">
        <h3 className="mb-6 tracking-[0.008rem] text-base leading-5 text-[#0E0C22CC]">
          SELECT A DELIVERY LOCATION
        </h3>

        <div className="mt-8 w-full">
          {[...Array(2)].map((_, idx) => (
            <AddressCard key={idx} />
          ))}
        </div>

        <div className="mt-24">
          <button className="bg-[#212121] w-full max-w-[232px] h-[44px] font-HM-Sans uppercase text-sm text-white font-light">
            ADD NEW HOME ADDRESS
          </button>
        </div>
      </div>
    </AddressModalLayout>
  );
};

export default SelectAddress;
