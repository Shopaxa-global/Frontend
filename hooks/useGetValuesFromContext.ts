import { useContext, Dispatch } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { DispatchType } from "../interface";
import { ScrollDirectionType } from "../types";

type ReturnType = {
  dispatch: Dispatch<DispatchType>;
  scrollDirection: ScrollDirectionType;
};

const useGetValueFromContext = (): ReturnType => {
  const { dispatch, scrollDirection } = useContext(GlobalContext);

  return { dispatch, scrollDirection };
};

export default useGetValueFromContext;
