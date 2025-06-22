import { ActionType, REDUCERS } from "../types";

const authReducer = (state: any, action: ActionType) => {
  const { payload } = action;

  switch (action.type) {
    case REDUCERS.SET_USER:
      return {
        ...state,
        user: payload,
      };
    case REDUCERS.SET_AUTH_TOKEN:
      return {
        ...state,
        authToken: payload,
      };
    case REDUCERS.SET_AUTH_USER:
      return {
        ...state,
        authUser: payload,
      };
  }
};

export default authReducer;
