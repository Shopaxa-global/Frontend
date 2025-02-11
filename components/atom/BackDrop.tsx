import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

const BackDrop = () => {
  const { navHoverType } = useContext(GlobalContext);

  switch (navHoverType) {
    case "login":
      return null;
    case "market_place":
      return null;
    case "cart_bag":
      return null;
    case "watches":
      return null;

    case null:
      return null;

    default:
      return (
        <div className="w-screen h-screen fixed bg-[#000]/30 z-[8] top-0 left-0"></div>
      );
  }
};

export default BackDrop;
