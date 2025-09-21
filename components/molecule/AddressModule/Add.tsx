import { Dispatch, SetStateAction } from "react";
import { AddressModalLayout } from ".";

type AddAddressTypes = {
  setOpenAddModal: Dispatch<SetStateAction<boolean>>;
};

const AddAAddress = ({ setOpenAddModal }: AddAddressTypes) => {
  const handleCloseModal = () => {
    setOpenAddModal(false);
  };
  return (
    <AddressModalLayout handleCloseModal={handleCloseModal}>
      <div className="mt-10 font-Silka">
        <h3 className="mb-6 tracking-[0.008rem] text-base leading-5 text-[#0E0C22CC]">
          WRITE YOUR PERSONAL DETAILS
        </h3>
        <form>
          <div className="flex flex-col gap-y-1 mb-5">
            <label
              htmlFor="address"
              className="text-[#707070] font-[0.938rem] leading-[1.188rem] tracking-[0.038rem] flex items-start"
            >
              Address
              <span aria-label="required">*</span>
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="border-b border-[#D9D9D9] focus:outline-none focus:border-b-2 focus:border-blue-400 text-[#0E0C22] text-[17px]"
              required
            />
          </div>
          <div className="flex flex-col gap-y-1 mb-5">
            <label
              htmlFor="city"
              className="text-[#707070] font-[0.938rem] leading-[1.188rem] tracking-[0.038rem] flex items-start"
            >
              City/Town
              <span aria-label="required">*</span>
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="border-b border-[#D9D9D9] focus:outline-none focus:border-b-2 focus:border-blue-400 transition-colors duration-700 text-[#0E0C22] text-[17px]"
              required
            />
          </div>
          <div className="flex flex-col gap-y-1 mb-5">
            <label
              htmlFor="state"
              className="text-[#707070] font-[0.938rem] leading-[1.188rem] tracking-[0.038rem] flex items-start"
            >
              State/Province
              <span aria-label="required">*</span>
            </label>
            <input
              type="text"
              id="state"
              name="state"
              className="border-b border-[#D9D9D9] focus:outline-none focus:border-b-2 focus:border-blue-400 transition-colors duration-700 text-[#0E0C22] text-[17px]"
              required
            />
          </div>
          <div className="flex gap-x-4">
            <div className="flex flex-col gap-y-1 mb-5 w-20">
              <label
                htmlFor="prefix"
                className="text-[#707070] font-[0.938rem] leading-[1.188rem] tracking-[0.038rem] flex items-start"
              >
                Prefix
                <span aria-label="required">*</span>
              </label>
              <select
                id="prefix"
                name="prefix"
                className="border-b border-[#D9D9D9] focus:outline-none focus:border-b-2 focus:border-blue-400 transition-colors duration-700 text-[#0E0C22] text-[17px] mt-4"
                required
              >
                <option value="+234">+234</option>
              </select>
            </div>
            <div className="flex flex-col gap-y-1 mb-5 flex-grow">
              <label
                htmlFor="tel"
                className="text-[#707070] font-[0.938rem] leading-[1.188rem] tracking-[0.038rem] flex items-start"
              >
                Telephone
                <span aria-label="required">*</span>
              </label>
              <input
                type="tel"
                id="tel"
                name="tel"
                className="border-b border-[#D9D9D9] focus:outline-none focus:border-b-2 focus:border-blue-400 transition-colors duration-700 text-[#0E0C22] text-[17px] mt-4"
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-1 mb-5">
            <label
              htmlFor="postcode"
              className="text-[#707070] font-[0.938rem] leading-[1.188rem] tracking-[0.038rem] flex items-start"
            >
              Postcode/Zip
              <span aria-label="required">*</span>
            </label>
            <input
              type="text"
              id="postcode"
              name="postcode"
              className="border-b border-[#D9D9D9] focus:outline-none focus:border-b-2 focus:border-blue-400 transition-colors duration-700 text-[#0E0C22] text-[17px]"
              required
            />
          </div>

          <div className="mt-24 flex justify-end">
            <button className="bg-[#212121] w-full max-w-[105px] h-[44px] font-HM-Sans uppercase text-sm text-white font-light">
              submit
            </button>
          </div>
        </form>
      </div>
    </AddressModalLayout>
    // <aside className=" fixed right-0 bottom-0 top-0 z-50 bg-[rgba(255,255,255,0.8)] left-0">
    //   <div className="bg-white h-full w-full max-w-[575px] ml-auto py-[58px] pl-[39px] pr-[58px]">
    //     <div className="w-full flex justify-end">
    //       <button
    //         className="flex justify-end mt-2 mb-4 md:my-0 md:w-[18px] w-full"
    //         title="close-address-modal"
    //         onClick={() => setOpenAddModal(false)}
    //       >
    //         <Image src={closeNoOutline} alt="close-icon" />
    //       </button>
    //     </div>

    //     <div className="mt-10">
    //       <h3 className="mb-6 tracking-[0.008rem] text-base leading-5 text-[#0E0C22CC]">
    //         WRITE YOUR PERSONAL DETAILS
    //       </h3>
    //       <form>
    //         <div className="flex flex-col gap-y-1 mb-5">
    //           <label
    //             htmlFor="address"
    //             className="text-[#707070] font-[0.938rem] leading-[1.188rem] tracking-[0.038rem] flex items-start"
    //           >
    //             Address
    //             <span aria-label="required">*</span>
    //           </label>
    //           <input
    //             type="text"
    //             id="address"
    //             name="address"
    //             className="border-b border-[#D9D9D9] focus:outline-none focus:border-b-2 focus:border-blue-400 text-[#0E0C22] text-[17px]"
    //             required
    //           />
    //         </div>
    //         <div className="flex flex-col gap-y-1 mb-5">
    //           <label
    //             htmlFor="city"
    //             className="text-[#707070] font-[0.938rem] leading-[1.188rem] tracking-[0.038rem] flex items-start"
    //           >
    //             City/Town
    //             <span aria-label="required">*</span>
    //           </label>
    //           <input
    //             type="text"
    //             id="city"
    //             name="city"
    //             className="border-b border-[#D9D9D9] focus:outline-none focus:border-b-2 focus:border-blue-400 transition-colors duration-700 text-[#0E0C22] text-[17px]"
    //             required
    //           />
    //         </div>
    //         <div className="flex flex-col gap-y-1 mb-5">
    //           <label
    //             htmlFor="state"
    //             className="text-[#707070] font-[0.938rem] leading-[1.188rem] tracking-[0.038rem] flex items-start"
    //           >
    //             State/Province
    //             <span aria-label="required">*</span>
    //           </label>
    //           <input
    //             type="text"
    //             id="state"
    //             name="state"
    //             className="border-b border-[#D9D9D9] focus:outline-none focus:border-b-2 focus:border-blue-400 transition-colors duration-700 text-[#0E0C22] text-[17px]"
    //             required
    //           />
    //         </div>
    //         <div className="flex gap-x-4">
    //           <div className="flex flex-col gap-y-1 mb-5 w-20">
    //             <label
    //               htmlFor="prefix"
    //               className="text-[#707070] font-[0.938rem] leading-[1.188rem] tracking-[0.038rem] flex items-start"
    //             >
    //               Prefix
    //               <span aria-label="required">*</span>
    //             </label>
    //             <select
    //               id="prefix"
    //               name="prefix"
    //               className="border-b border-[#D9D9D9] focus:outline-none focus:border-b-2 focus:border-blue-400 transition-colors duration-700 text-[#0E0C22] text-[17px] mt-4"
    //               required
    //             >
    //               <option value="+234">+234</option>
    //             </select>
    //           </div>
    //           <div className="flex flex-col gap-y-1 mb-5 flex-grow">
    //             <label
    //               htmlFor="tel"
    //               className="text-[#707070] font-[0.938rem] leading-[1.188rem] tracking-[0.038rem] flex items-start"
    //             >
    //               Telephone
    //               <span aria-label="required">*</span>
    //             </label>
    //             <input
    //               type="tel"
    //               id="tel"
    //               name="tel"
    //               className="border-b border-[#D9D9D9] focus:outline-none focus:border-b-2 focus:border-blue-400 transition-colors duration-700 text-[#0E0C22] text-[17px] mt-4"
    //               required
    //             />
    //           </div>
    //         </div>
    //         <div className="flex flex-col gap-y-1 mb-5">
    //           <label
    //             htmlFor="postcode"
    //             className="text-[#707070] font-[0.938rem] leading-[1.188rem] tracking-[0.038rem] flex items-start"
    //           >
    //             Postcode/Zip
    //             <span aria-label="required">*</span>
    //           </label>
    //           <input
    //             type="text"
    //             id="postcode"
    //             name="postcode"
    //             className="border-b border-[#D9D9D9] focus:outline-none focus:border-b-2 focus:border-blue-400 transition-colors duration-700 text-[#0E0C22] text-[17px]"
    //             required
    //           />
    //         </div>

    //         <div className="mt-24 flex justify-end">
    //           <button className="bg-[#212121] w-full max-w-[105px] h-[44px] font-HM-Sans uppercase text-sm text-white font-light">
    //             submit
    //           </button>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </aside>
  );
};

export default AddAAddress;
