import { Dispatch } from "react";
import { DispatchType } from "../../interface";
import { REDUCERS } from "../../types";

export const handleSetLoading = (
  data: boolean,
  dispatch: Dispatch<DispatchType>
) => {
  dispatch({
    type: REDUCERS.SET_LOADING,
    payload: data,
  });
};
