import React from "react";
import styles from "./Header.module.css";
const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <ion-icon name="bar-chart-sharp"></ion-icon>
        <div className={styles.title}>
          <h1>Visualization Dashboard</h1>
          <sub>beautifying the boring stuff</sub>
        </div>
      </header>
      <header
        className={styles.header}
        style={{ position: "relative", opacity: 0 }}
      >
        <ion-icon name="bar-chart-sharp"></ion-icon>
        <div className={styles.title}>
          <h1>Visualization Dashboard</h1>
          <sub>beautifying the boring stuff</sub>
        </div>
      </header>
    </>
  );
};

export default Header;
