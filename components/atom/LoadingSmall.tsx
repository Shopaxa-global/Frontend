import React from "react";
import styles from "./styles/loadingSmall.module.scss";

const Loading: React.FC = () => (
  <div
    className="h-[17px] flex items-center justify-center text-[#BCBCBC] text-xs font-medium leading-[18px] capitalize"
    aria-label="Loading"
    aria-live="assertive"
  >
    <div
      className={`${styles.lsd} flex justify-center items-center gap-[2px] h-full`}
      aria-hidden="true"
    >
      <div aria-hidden="true"></div>
      <div aria-hidden="true"></div>
      <div aria-hidden="true"></div>
    </div>
  </div>
);

export default Loading;
