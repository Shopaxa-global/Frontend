import React, { useState } from "react";
import Image from "next/image";
import searchIcon from "../../assets/images/search.svg";
import cancelIcon from "../../assets/images/cancel.svg";

type NavSearchbarType = {
  addMargin?: boolean;
}

const NavSearchbar: React.FC<NavSearchbarType> = ({ addMargin=true }) => {
  const [searchvalue, setSearchValue] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className={`h-[42px] ${addMargin ? 'mt-10' : ''} z-[22] searchbar fixed w-full border-b border-[#000] bg-[#fff]`}>
      <Image
        src={searchIcon}
        alt=""
        className="absolute top-[50%] lg:left-[1.2%] left-[26px] -translate-x-[50%] -translate-y-[50%]"
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
        alt=""
        aria-label="clear search"
        className={` ${
          searchvalue ? "block" : "hidden"
        } absolute top-[50%] lg:left-[98.88%] left-[calc(100vw-20px)] -translate-x-[50%] -translate-y-[50%] cursor-pointer`}
      />
    </div>
  );
};

export default NavSearchbar;
