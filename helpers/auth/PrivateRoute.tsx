"use client";

import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";
import Redirect from "./Redirect";

interface Props {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    // You can return a spinner, skeleton, or null
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Redirect to="/auth/login" />;
  }
  return children;
};

export default PrivateRoute;
