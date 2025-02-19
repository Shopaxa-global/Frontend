import React from "react";
import { FetchErrorType } from "../../types";

const Error: React.FC<FetchErrorType> = ({ errorMsg }) => (
  <div className="py-20 flex justify-center item text-black-100 text-xs font-medium leading-[18px] capitalize">
    {errorMsg}
  </div>
);

export default Error;
