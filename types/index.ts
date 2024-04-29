export enum REDUCERS {
  SET_LOADING = "SET_LOADING",
  SET_SCROLL_DIRECTION = "SET_SCROLL_DIRECTION",
  SET_MENU_OPEN = "SET_MENU_OPEN",
  SET_NAV_HOVER_TYPE = "SET_NAV_HOVER_TYPE",
}

export type ActionType = {
  payload: any;
  type: REDUCERS;
};

export type ScrollDirectionType = "up" | "down";


export type NavHoverType = 'steps' | 'brands_to_shop' | 'stores_to_shop' | 'login' | 'market_place' | 'cart_bag' | 'watches';