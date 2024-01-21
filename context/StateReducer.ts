import { REDUCERS, ActionType } from "../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state: any, action: ActionType) => {
  const { payload } = action;

  switch (action.type) {
    case REDUCERS.SET_LOADING:
      return {
        ...state,
        loading: payload,
      };

    case REDUCERS.SET_SCROLL_DIRECTION:
      return {
        ...state,
        scrollDirection: payload,
      };

    case REDUCERS.SET_MENU_OPEN:
      return {
        ...state,
        menuOpen: payload,
      };
  }
};
