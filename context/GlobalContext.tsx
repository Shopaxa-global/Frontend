import { createContext, useReducer, ReactNode } from "react";
import StateReducer from "./StateReducer";
import { ScrollDirectionType, NavHoverType } from "../types"


interface Props {
  children?: ReactNode;
}

const initialState: any = {
  loading: false,
  scrollDirection: null as unknown as ScrollDirectionType,
  menuOpen: false as boolean,
  navHoverType: null as unknown as NavHoverType,
};

export const GlobalContext = createContext(initialState);

GlobalContext.displayName = "Shopaxa";

export const GlobalProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(StateReducer, {
    ...initialState,
  });

  const contextValue = {
    ...state,
    dispatch,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};
