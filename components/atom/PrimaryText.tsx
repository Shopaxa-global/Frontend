import React from "react";
import { PrimaryTextProps } from "../../interface";

const PrimaryText = ({ title, customClass }: PrimaryTextProps) => {
  return (
    <p
      className={`font-HM-Sans text-base text-[#000] font-normal ${customClass}`}
    >
      {title}
    </p>
  );
};

export default PrimaryText;
