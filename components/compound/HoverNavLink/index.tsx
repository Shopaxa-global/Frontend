import React, { useContext } from "react";
import Link from "next/link";
import { GlobalContext } from "../../../context/GlobalContext";
import { NavHoverType } from "../../../types";

const brands_to_shop = [
  {
    link: "Gucci",
    href: "#",
  },
  {
    link: "Chanel",
    href: "#",
  },
  {
    link: "Cartier",
    href: "#",
  },
  {
    link: "Givenchy",
    href: "#",
  },
  {
    link: "Tiffanny & co",
    href: "#",
  },
  {
    link: "Celine",
    href: "#",
  },
  {
    link: "Hermes",
    href: "#",
  },
  {
    link: "Dior",
    href: "#",
  },
  {
    link: "Goat",
    href: "#",
  },
  {
    link: "Farfetch",
    href: "#",
  },
  {
    link: "Burberry",
    href: "#",
  },
  {
    link: "Baleciaga",
    href: "#",
  },
  {
    link: "Prada",
    href: "#",
  },
  {
    link: "Vercase",
    href: "#",
  },
  {
    link: "Valentino",
    href: "#",
  },
  {
    link: "Rimowa",
    href: "#",
  },
  {
    link: "Fendi",
    href: "#",
  },
  {
    link: "Dolce & Gabbana",
    href: "#",
  },
  {
    link: "Bottega Veneta",
    href: "#",
  },
  {
    link: "Ralph Lauren",
    href: "#",
  },
  {
    link: "Giorgio Armani",
    href: "#",
  },
  {
    link: "Louis Vuitton",
    href: "#",
  },
  {
    link: "Saint Laurent",
    href: "#",
  },
  {
    link: "Supreme",
    href: "#",
  },
  {
    link: "Bulgari",
    href: "#",
  },
  {
    link: "Diesel",
    href: "#",
  },
  {
    link: "Lacoste",
    href: "#",
  },
  {
    link: "Alexander Mcqueen",
    href: "#",
  },
];

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
        <h2 className="text-xs text-[#0E0C22] uppercase">Brands You Can Shop</h2>
        <ul className="mt-6 flex flex-col gap-3">
          {brands_to_shop.slice(0, 11).map((brand, index) => (
            <li key={index} className="">
              <a href={brand.href} className="text-xs text-[#0E0C22] font-HM-Sans">
                {brand.link}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="py-5 px-3 border-r border-r-[#0E0C22] w-full">
        <ul className="mt-6 flex flex-col gap-3">
          {brands_to_shop.slice(11, 22).map((brand, index) => (
            <li key={index} className="">
              <a href={brand.href} className="text-xs text-[#0E0C22] font-HM-Sans">
                {brand.link}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="py-5 px-3 border-r border-r-[#0E0C22] w-full">
        <ul className="mt-6 flex flex-col gap-3">
          {brands_to_shop.slice(23).map((brand, index) => (
            <li key={index} className="">
              <a href={brand.href} className="text-xs text-[#0E0C22] font-HM-Sans">
                {brand.link}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="py-5 px-3 border-r border-r-[#0E0C22] w-full">
        <h2 className="text-xs text-[#0E0C22]">CONTACT US</h2>
        <p className="text-[#0E0C22] text-xs mt-6">SEND US AN EMAIL</p>
        <p className="text-[#0E0C22] text-xs mt-3">
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
  return <section className="dropdown-content"></section>;
};

const StoresYouCanShop = () => {
  return <section className="dropdown-content"></section>;
};
