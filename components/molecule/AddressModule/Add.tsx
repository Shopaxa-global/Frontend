import React from 'react';
const AddAAddress: React.FC = () => {
  return (
    <div>
      <h3 className="mb-6 tracking-[0.008rem] leading-5 text-[#0E0C22CC]">
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
          <label htmlFor="state">State/Province</label>
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
            <label htmlFor="prefix">Prefix</label>
            <select
              id="prefix"
              name="prefix"
              className="border-b border-[#D9D9D9] focus:outline-none focus:border-b-2 focus:border-blue-400 transition-colors duration-700 text-[#0E0C22] text-[17px]"
              required
            >
              <option value="+234">+234</option>
            </select>
          </div>
          <div className="flex flex-col gap-y-1 mb-5 flex-grow">
            <label htmlFor="tel">Telephone</label>
            <input
              type="tel"
              id="tel"
              name="tel"
              className="border-b border-[#D9D9D9] focus:outline-none focus:border-b-2 focus:border-blue-400 transition-colors duration-700 text-[#0E0C22] text-[17px]"
              required
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-1 mb-5">
          <label htmlFor="postcode">Postcode/Zip</label>
          <input
            type="text"
            id="postcode"
            name="postcode"
            className="border-b border-[#D9D9D9] focus:outline-none focus:border-b-2 focus:border-blue-400 transition-colors duration-700 text-[#0E0C22] text-[17px]"
            required
          />
        </div>
      </form>
    </div>
  );
};

export default AddAAddress;
