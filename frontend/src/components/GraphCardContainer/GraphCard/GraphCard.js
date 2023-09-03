import React from "react";
import AppContext from "../../../context/app-context";
import LoadingCard from "../../UI/LoadingCard/LoadingCard";

import styles from "./GraphCard.module.css";
const GraphCard = (props) => {
  const ctx = React.useContext(AppContext);
  const [country, setCountry] = React.useState("");
  const [topic, setTopic] = React.useState("");
  const [sector, setSector] = React.useState("");
  const [pestle, setPestle] = React.useState("");

  const [year, setYear] = React.useState(2014);

  const countryChangeHandler = (event) => {
    setCountry(event.target.value);
  };
  const topicChangeHandler = (event) => {
    setTopic(event.target.value);
  };
  const sectorChangeHandler = (event) => {
    setSector(event.target.value);
  };
  const pestleChangeHandler = (event) => {
    setPestle(event.target.value);
  };
  const yearChangeHandler = (event) => {
    setYear(event.target.value);
  };

  const propsForChild = {
    filters: { pestle, sector, topic, country },
  };
  if (props.type === "pie") propsForChild.filters.year = year;
  const childWithProp = React.cloneElement(props.children, propsForChild);

  const graphCardDiv = (
    <div className={styles.card}>
      <h3>{props.heading}</h3>
      <div className={styles.content}>
        <div className={styles.filters}>
          <h4>Filters</h4>
          {props.icon}
          {props.type === "pie" && (
            <select onClick={yearChangeHandler}>
              <option value="2014">Year</option>
              <option value="2007" key="2007">
                2007
              </option>
              <option value="2012" key="2012">
                2012
              </option>
              <option value="2014" key="2014">
                2014
              </option>
              <option value="2015" key="2015">
                2015
              </option>
              <option value="2016" key="2016">
                2016
              </option>
              <option value="2017" key="2017">
                2017
              </option>
              <option value="2020" key="2020">
                2020
              </option>
            </select>
          )}
          <select onClick={pestleChangeHandler}>
            <option value="">PESTLE</option>
            {ctx.pestles.map((pestleObj) => (
              <option value={pestleObj.name} key={pestleObj.name}>
                {pestleObj.name}
              </option>
            ))}
          </select>
          <select onClick={sectorChangeHandler}>
            <option value="">Sector</option>
            {ctx.sectors.map((sectorObj) => (
              <option value={sectorObj.name} key={sectorObj.name}>
                {sectorObj.name}
              </option>
            ))}
          </select>

          {props.type !== "pie" && (
            <select onClick={topicChangeHandler}>
              <option value="">Topic</option>
              {ctx.topics.map((topicObj) => (
                <option value={topicObj.name} key={topicObj.name}>
                  {topicObj.name}
                </option>
              ))}
            </select>
          )}
          <select onClick={countryChangeHandler}>
            <option value="">Country</option>
            {ctx.countries.map((countryObj) => (
              <option value={countryObj.name} key={countryObj.name}>
                {countryObj.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.graph}>
          {/* <BarGraph filters={{ pestle, sector, topic, country }} /> */}
          {childWithProp}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {!ctx.loaded && <LoadingCard />}
      {ctx.loaded && graphCardDiv}
    </>
  );
};

export default GraphCard;
