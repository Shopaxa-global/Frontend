import React from "react";
import { SecondaryHeadingProps } from "../../interface";

const SecondaryHeading = ({ title, customClass }: SecondaryHeadingProps) => {
  return <p className={`${customClass} font-Silka-Bold`}>{title}</p>;
};

export default SecondaryHeading;
