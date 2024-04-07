import React from "react";
import PrimaryButton from "./PrimaryButton";
import { SecondaryHeading } from "../atom";
import { MoreInfoProps } from "../../interface";

const MoreInfo = ({
  buttonTitle,
  heading,
  headingCustomClass,
  buttonId,
}: MoreInfoProps) => {
  return (
    <div className="flex w-full h-fit flex-col items-center justify-end">
      <SecondaryHeading title={heading} customClass={headingCustomClass} />
      <PrimaryButton
        id={buttonId}
        stroke
        title={buttonTitle}
        onClick={() => {}}
      />
    </div>
  );
};

export default MoreInfo;
