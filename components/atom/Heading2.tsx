import React from "react";
import { Heading2Props } from "../../interface";

const Heading2 = ({ title, customClass }: Heading2Props) => {
  return (
    <h2
      className={`font-Silka-SemiBold md:text-[40px] text-[32px] text-[#000] font-semibold ${customClass}`}
    >
      {title}
    </h2>
  );
};

export default Heading2;
