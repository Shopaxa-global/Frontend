import React from "react";
import styles from "../../styles/loading.module.scss";

const Loading: React.FC = () => (
  <div
    className="h-40 flex items-center justify-center text-[#BCBCBC] text-xs font-medium leading-[18px] capitalize"
    aria-label="Loading"
  >
    <div
      className={`${styles.lsd} flex justify-center items-center gap-2 h-full`}
      aria-hidden="true"
    >
      <div aria-hidden="true"></div>
      <div aria-hidden="true"></div>
      <div aria-hidden="true"></div>
    </div>
  </div>
);

export default Loading;
