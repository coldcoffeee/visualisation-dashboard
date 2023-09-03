import React from "react";
import AppContext from "../../context/app-context";
import LoadingCard from "../UI/LoadingCard/LoadingCard";

import styles from "./Overview.module.css";
import OverviewCard from "./OverviewCard";

const Overview = () => {
  // const divRef = React.useRef();
  const appContext = React.useContext(AppContext);
  // const windowWidth = appContext.dimensions.width;
  // const windowHeight = appContext.dimensions.height;
  const loadingCard = <LoadingCard />;

  // window.onscroll = (event) => {
  //   if (window.scrollY <= windowHeight)
  //     divRef.current.style.opacity =
  //       (windowHeight - window.scrollY) / windowHeight;
  // };

  return (
    <>
      {!appContext.loaded && loadingCard}
      {appContext.loaded && (
        <div
          className={styles.overviewContainer}
          onLoad={window.scrollTo(0, 0)}
        >
          {" "}
          <OverviewCard />{" "}
        </div>
      )}
    </>
  );
};

export default Overview;
