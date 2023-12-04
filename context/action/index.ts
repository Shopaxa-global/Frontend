import { Dispatch } from "react";
import { DispatchType } from "../../interface";
import { REDUCERS, ScrollDirectionType } from "../../types";

export const handleSetLoading = (
  data: boolean,
  dispatch: Dispatch<DispatchType>
) => {
  dispatch({
    type: REDUCERS.SET_LOADING,
    payload: data,
  });
};

export const handleSetScrollDirection = (
  data: ScrollDirectionType,
  dispatch: Dispatch<DispatchType>
) => {
  dispatch({
    type: REDUCERS.SET_SCROLL_DIRECTION,
    payload: data,
  });
};
