import React from "react";
import styles from "./LoadingCard.module.css";

const LoadingCard = (props) => {
  return (
    <div className={styles.loadingCard} style={{ height: props.height }}></div>
  );
};

export default LoadingCard;
