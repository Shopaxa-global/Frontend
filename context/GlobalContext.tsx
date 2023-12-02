import { createContext, useReducer, ReactNode } from "react";
import StateReducer from "./StateReducer";


interface Props {
  children?: ReactNode;
}

const initialState: any = {
  loading: false,
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
