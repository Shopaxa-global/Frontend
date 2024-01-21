import React, { useState } from "react";
import Image from "next/image";
import searchIcon from "../../assets/images/search.svg";
import cancelIcon from "../../assets/images/cancel.svg";

const NavSearchbar = () => {
  const [searchvalue, setSearchValue] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="h-[42px] mt-10 z-[22] searchbar fixed w-full border-b border-[#000] bg-[#fff]">
      <Image
        src={searchIcon}
        alt="search icon"
        className="absolute top-[50%] lg:left-[1.2%] left-[22px] -translate-x-[50%] -translate-y-[50%]"
      />
      <input
        value={searchvalue}
        onChange={handleInputChange}
        type="input"
        className="w-full h-full focus:outline-none text-[12px] placeholder:text-[12px] placeholder:text-[#939393] pl-[46px]"
        placeholder="PASTE YOUR GENERATED CODE HERE"
      />
      <Image
        onClick={() => setSearchValue("")}
        src={cancelIcon}
        alt="canel icon"
        className={` ${
          searchvalue ? "block" : "hidden"
        } absolute top-[50%] lg:left-[98.88%] sm:left-[98%] left-[96.5%] -translate-x-[50%] -translate-y-[50%] cursor-pointer`}
      />
    </div>
  );
};

export default NavSearchbar;
