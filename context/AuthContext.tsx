"use client";

import type { NotificationArgsProps } from "antd";
import { notification } from "antd";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import reducer from "./AuthReducer";

type MessageType = {
  message: string;
  description: string;
  type?: "success" | "info" | "warning" | "error";
};

export const AuthContext = createContext({
  user: null,
  setUser: (user: any) => {},
  openNotification: (
    placement: NotificationPlacement,
    message: MessageType
  ) => {},
});

type NotificationPlacement = NotificationArgsProps["placement"];

const Context = createContext({ name: "Default" });

const initialState = {
  user: null,
  setUser: (user: any) => {},
  openNotification: (
    placement: NotificationPlacement,
    message: MessageType
  ) => {},
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [api, contextHolder] = notification.useNotification();

  const openNotification = useCallback(
    (placement: NotificationPlacement, message: MessageType) => {
      const { type = "info", ...rest } = message;
      api[type]({
        ...rest,
        placement,
        duration: 4.5,
        style: {
          width: 380,
        },
      });
    },
    [api]
  );

  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);

  const authContextValue = useMemo(
    () => ({ ...state, dispatch, openNotification }),
    [state, openNotification]
  );

  return (
    <Context.Provider value={contextValue}>
      <AuthContext.Provider value={authContextValue}>
        {contextHolder}
        {children}
      </AuthContext.Provider>
    </Context.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
