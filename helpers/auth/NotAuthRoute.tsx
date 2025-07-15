import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";
import Redirect from "./Redirect";

export const NotAuthRoute = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return <Redirect to="/dashboard" />;
  }

  return <div />;
};
