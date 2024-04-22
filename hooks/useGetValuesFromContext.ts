import { useContext, Dispatch } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { DispatchType } from "../interface";
import { NavHoverType, ScrollDirectionType } from "../types";

type ReturnType = {
  dispatch: Dispatch<DispatchType>;
  scrollDirection: ScrollDirectionType;
  navHoverType: NavHoverType
};

const useGetValueFromContext = (): ReturnType => {
  const { dispatch, scrollDirection, navHoverType } = useContext(GlobalContext);

  return { dispatch, scrollDirection, navHoverType };
};

export default useGetValueFromContext;
