"use client";

import { useEffect } from "react";
import type { NotificationArgsProps } from "antd";
import { notification } from "antd";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { getUserProfile } from "../api/auth";
import { REDUCERS } from "../types";
import { storeUserProfileInLocalStorage } from "../utils/helpers";

import { signInWithPopup, auth, provider, signOut, signInWithEmailAndPassword } from "../lib/firebase";
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
  dispatch: (action: any) => {},
  handleGoogleLogin: async () => {},
  handleEmailLogin: async (email: string, password: string) => {},
  handleGoogleLogout: async () => {},
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

  // Handles Google login, gets user profile, stores in localStorage, updates state
  const handleGoogleLogin = useCallback(async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("user", user);
      if (user) {
        const profileResponse = await getUserProfile(user);
        console.log("profileResponse", profileResponse);
        if (profileResponse?.data) {
          storeUserProfileInLocalStorage(profileResponse.data.res_data);
        }
        dispatch({ type: REDUCERS.SET_USER, payload: user });
        openNotification("topRight", {
          message: "Login Success",
          description: "You are now logged in",
          type: "success",
        });
      }
    } catch (error: any) {
      openNotification("topRight", {
        message: "Google Login Error",
        description: error?.message || "An error occurred during Google login",
        type: "error",
      });
    }
  }, [dispatch, openNotification]);


  // Handles Email and Password Logins
  const handleEmailLogin = useCallback(
    async (email: string, password: string) => {
      try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        const user = response.user;
        if (user) {
          const profileResponse = await getUserProfile(user);
          if (profileResponse?.data) {
            storeUserProfileInLocalStorage(profileResponse.data.res_data);
          }
          dispatch({ type: REDUCERS.SET_USER, payload: user });
          openNotification("topRight", {
            message: "Login Success",
            description: "You are now logged in",
            type: "success",
          });
        }
      } catch (error: any) {
        openNotification("topRight", {
          message: "Email Login Error",
          description: error?.message || "An error occurred during email login",
          type: "error",
        });
      }
    },
    [dispatch, openNotification]
  );




  const handleGoogleLogout = useCallback(async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("userProfile");
      dispatch({ type: REDUCERS.SET_USER, payload: null });
    } catch (error) {
      console.error("Google Logout Error:", error);
      throw error;
    }
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: REDUCERS.SET_USER, payload: user });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);

  const authContextValue = useMemo(
    () => ({
      ...state,
      dispatch,
      openNotification,
      handleGoogleLogin,
      handleEmailLogin,
      handleGoogleLogout,
    }),
    [state, openNotification, handleGoogleLogin, handleGoogleLogout]
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
