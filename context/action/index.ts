import { Dispatch } from "react";
import { DispatchType } from "../../interface";
import { REDUCERS, ScrollDirectionType, NavHoverType } from "../../types";

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

export const handleSetMenuOpen = (
  data: boolean,
  dispatch: Dispatch<DispatchType>
) => {
  dispatch({
    type: REDUCERS.SET_MENU_OPEN,
    payload: data,
  });
};

export const handleSetNavHoverType = (
  data: NavHoverType,
  dispatch: Dispatch<DispatchType>
) => {
  dispatch({
    type: REDUCERS.SET_NAV_HOVER_TYPE,
    payload: data,
  });
};
