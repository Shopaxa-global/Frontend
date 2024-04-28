import React, { useContext } from "react";
import Link from "next/link";
import { GlobalContext } from "../../../context/GlobalContext";
import { NavHoverType } from "../../../types";
import {
  brands_to_shop,
  how_it_works,
  brands_to_shop_global,
  stores_coming_soon,
} from "./constants";

const Index = () => {
  const { navHoverType } = useContext(GlobalContext);

  switch (navHoverType) {
    case "brands_to_shop":
      return <BrandsYouCanShopComponent />;
    case "steps":
      return <StepsToShopping />;
    case "stores_to_shop":
      return <StoresYouCanShop />;
    default:
      return <div className="dropdown-content"></div>;
  }
};

export default Index;

const BrandsYouCanShopComponent = () => {
  return (
    <section className="dropdown-content grid grid-cols-6 font-HM-Sans">
      <div className="py-5 px-3 border-r border-r-[#0E0C22] w-full">
        <h2 className="text-xs text-[#0E0C22] uppercase">
          Brands You Can Shop
        </h2>
        <ul className="mt-6 flex flex-col gap-3">
          {brands_to_shop.slice(0, 11).map((brand, index) => (
            <li key={index} className="">
              <a
                href={brand.href}
                className="text-xs text-[#0E0C22] font-HM-Sans"
              >
                {brand.link}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="py-5 px-3 border-r border-r-[#0E0C22] w-full">
        <ul className="mt-[40px] flex flex-col gap-3">
          {brands_to_shop.slice(11, 22).map((brand, index) => (
            <li key={index} className="">
              <a
                href={brand.href}
                className="text-xs text-[#0E0C22] font-HM-Sans"
              >
                {brand.link}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="py-5 px-3 border-r border-r-[#0E0C22] w-full">
        <ul className="mt-[40px] flex flex-col gap-3">
          {brands_to_shop.slice(23).map((brand, index) => (
            <li key={index} className="">
              <a
                href={brand.href}
                className="text-xs text-[#0E0C22] font-HM-Sans"
              >
                {brand.link}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="py-5 px-3 border-r border-r-[#0E0C22] w-full">
        <h2 className="text-xs text-[#0E0C22]">CONTACT US</h2>
        <p className="text-[#0E0C22] text-xs mt-[30px]">SEND US AN EMAIL</p>
        <p className="text-[#0E0C22] text-xs mt-5">
          CALL US{" "}
          <Link href="" className="underline">
            +234 90 60 34 75 21
          </Link>
        </p>
      </div>
      <div className="py-5 px-3 border-r border-r-[#0E0C22] w-full">
        <h2 className="text-xs text-[#0E0C22]">
          WANT US TO ADD YOUR FAVOURITE <br /> STORE?
        </h2>
      </div>
      <div className="py-5 px-3 border-r border-r-[#0E0C22] w-full"></div>
    </section>
  );
};

const StepsToShopping = () => {
  return (
    <section className="dropdown-content grid grid-cols-6 font-HM-Sans min-h-[116px]">
      {how_it_works.map((step, index) => (
        <div
          className="py-5 px-3 border-r border-r-[#0E0C22] w-full"
          key={index}
        >
          <Link href={step.link} className="text-xs text-[#0E0C22] uppercase">
            {step.title}
          </Link>
        </div>
      ))}
    </section>
  );
};

const StoresYouCanShop = () => {
  return (
    <section className="dropdown-content grid grid-cols-6 font-HM-Sans">
      <div className="py-5 px-3 border-r border-r-[#0E0C22] w-full">
        <h2 className="text-xs text-[#0E0C22] uppercase">
          STORES YOU CAN SHOP
        </h2>
        <ul className="mt-6 flex flex-col gap-3">
          {brands_to_shop_global.slice(0, 11).map((brand, index) => (
            <li key={index} className="">
              <a
                href={brand.href}
                className="text-xs text-[#0E0C22] font-HM-Sans"
              >
                {brand.link}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="py-5 px-3 border-r border-r-[#0E0C22] w-full">
        <ul className="mt-[40px] flex flex-col gap-3">
          {brands_to_shop_global.slice(11, 22).map((brand, index) => (
            <li key={index} className="">
              <a
                href={brand.href}
                className="text-xs text-[#0E0C22] font-HM-Sans"
              >
                {brand.link}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="py-5 px-3 border-r border-r-[#0E0C22] w-full">
        <h2 className="text-xs text-[#0E0C22] uppercase">STORES COMING SOON</h2>
        <ul className="mt-6 flex flex-col gap-3">
          {stores_coming_soon.slice(0, 11).map((brand, index) => (
            <li key={index} className="">
              <a
                href={brand.href}
                className="text-xs text-[#0E0C22] font-HM-Sans"
              >
                {brand.link}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="py-5 px-3 border-r border-r-[#0E0C22] w-full">
        <ul className="mt-[40px] flex flex-col gap-3">
          {stores_coming_soon.slice(11).map((brand, index) => (
            <li key={index} className="">
              <a
                href={brand.href}
                className="text-xs text-[#0E0C22] font-HM-Sans"
              >
                {brand.link}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="py-5 px-3 border-r border-r-[#0E0C22] w-full">
        <h2 className="text-xs text-[#0E0C22]">CONTACT US</h2>
        <p className="text-[#0E0C22] text-xs mt-[30px]">SEND US AN EMAIL</p>
        <p className="text-[#0E0C22] text-xs mt-5">
          CALL US{" "}
          <Link href="" className="underline">
            +234 90 60 34 75 21
          </Link>
        </p>
      </div>
      <div className="py-5 px-3 border-r border-r-[#0E0C22] w-full">
        <h2 className="text-xs text-[#0E0C22]">
          WANT US TO ADD YOUR FAVOURITE <br /> STORE?
        </h2>
      </div>
    </section>
  );
};
