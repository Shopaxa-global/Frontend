import React, { SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";
import footer_pointer from "../../assets/images/footer_pointer.svg";
import { useIpadHook } from "../../hooks";

const FooterColumn = ({
  data,
  index,
  handleToggleDropDown,
  setIsDropDownOpen,
}: {
  data: {
    title: string;
    links: { title: string; href: string }[];
  };
  index: number;
  handleToggleDropDown: (class_uid: string) => void;
  setIsDropDownOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const { isMobile } = useIpadHook();

  return (
    <div className="py-5 px-3 lg:h-[275px] lg:border-r-[1px] lg:border-r-[#000] lg:border-b-0 border-b-[1px] border-b-[#000]">
      <p
        className="text-[#0E0C22] text-[12px] lg:mb-4 flex flex-row justify-between items-center"
        onClick={
          isMobile
            ? () => {
                handleToggleDropDown(`${index}`);
                setIsDropDownOpen((prev) => !prev);
              }
            : () => {}
        }
      >
        <span>{data.title}</span>
        <Image
          src={footer_pointer}
          alt="footer_pointer"
          className={`lg:hidden block rotate-180 arrow-${index}`}
        />
      </p>
      <ul
        className={`text-[#0E0C22] text-[12px] h-0 lg:opacity-100 opacity-0 lg:flex hidden flex-col relative lg:top-0 top-3 dropdown-${index}`}
      >
        {data.links.map((link, index) => (
          <li className="mb-3 hover:underline" key={index}>
            <Link href={link.href}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterColumn;
