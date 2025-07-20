export * from "./apiTypes";

export enum REDUCERS {
  SET_LOADING = "SET_LOADING",
  SET_SCROLL_DIRECTION = "SET_SCROLL_DIRECTION",
  SET_MENU_OPEN = "SET_MENU_OPEN",
  SET_NAV_HOVER_TYPE = "SET_NAV_HOVER_TYPE",
  SET_USER = "SET_USER",
  SET_AUTH_TOKEN = "SET_AUTH_TOKEN",
  SET_AUTH_USER = "SET_AUTH_USER",
}

export type ActionType = {
  payload: any;
  type: REDUCERS;
};

export type ScrollDirectionType = "up" | "down";

export type NavHoverType =
  | "steps"
  | "brands_to_shop"
  | "stores_to_shop"
  | "login"
  | "profile"
  | "market_place"
  | "cart_bag"
  | "watches";
