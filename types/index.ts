export enum REDUCERS {
  SET_LOADING = "SET_LOADING",
  SET_SCROLL_DIRECTION = "SET_SCROLL_DIRECTION",
}

export type ActionType = {
  payload: any;
  type: REDUCERS;
};

export type ScrollDirectionType = "up" | "down";
