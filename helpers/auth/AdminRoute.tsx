/* "use client";

import React, { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../src/firebase/config";
import Redirect from "./Redirect";


interface Props {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: Props) => {
  const [user, loading] = useAuthState(auth);

  const returnValidEmailCheck = () => {
    switch (user?.email) {
      case "benodesignlite@gmail.com":
        return true;

      case "akogunoyindamola42@gmail.com":
        return true;

      default:
        return false;
    }
  };

  if (loading) {
    return null; 
  }

  if (!user) {
    return <Redirect to="/auth/login" />;
  }

  if (!returnValidEmailCheck()) {
    return <Redirect to="/auth/login" />;
  }

  return children;
};

export default AdminRoute; */
