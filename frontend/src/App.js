import React from "react";
import AppContextProvider from "./context/AppContextProvider";
import Header from "./components/Header/Header";
import Overview from "./components/Overview/Overview";

import styles from "./App.module.css";
import GraphCard from "./components/GraphCardContainer/GraphCard/GraphCard";
import BarGraph from "./components/GraphCardContainer/GraphCard/Graph/BarGraph";
import LineChart from "./components/GraphCardContainer/GraphCard/Graph/LineGraph";
import PieChart from "./components/GraphCardContainer/GraphCard/Graph/PieGraph";
import ScatterPlot from "./components/GraphCardContainer/GraphCard/Graph/ScatterPlotChart";

const App = () => {
  return (
    <AppContextProvider>
      <Header />
      <div className={styles.body}>
        <Overview />
        <GraphCard
          heading="Intensity vs. Year"
          icon={<ion-icon name="cellular-outline"></ion-icon>}
        >
          <BarGraph />
        </GraphCard>
        <GraphCard
          heading={"Likelihood & Relevance vs. Year"}
          icon={<ion-icon name="analytics-outline"></ion-icon>}
        >
          <LineChart />
        </GraphCard>
        <GraphCard
          heading={"Topic Distribution"}
          icon={<ion-icon name="pie-chart-outline"></ion-icon>}
          type="pie"
        >
          <PieChart />
        </GraphCard>
        <GraphCard
          heading={"Intensity vs. Relevance"}
          icon={<ion-icon name="information-circle-outline"></ion-icon>}
        >
          <ScatterPlot />
        </GraphCard>
        <hr />
        <br />
        Blackcoffer Info Services, Delhi
      </div>
    </AppContextProvider>
  );
};

export default App;
