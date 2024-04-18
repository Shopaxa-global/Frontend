import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

const BackDrop = () => {
  const { navHoverType } = useContext(GlobalContext);


  if (!(!!navHoverType)) return null;

  return (
    <div className="w-screen h-screen fixed bg-[#000]/30 z-[8] top-0 left-0"></div>
  );
};

export default BackDrop;
