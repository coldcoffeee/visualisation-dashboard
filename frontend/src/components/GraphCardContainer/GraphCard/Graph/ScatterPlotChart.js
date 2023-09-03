import React, { useRef, useEffect, useContext } from "react";
import * as d3 from "d3";
import AppContext from "../../../../context/app-context";

const ScatterPlot = (props) => {
  const chartRef = useRef();
  const appContext = useContext(AppContext);

  useEffect(() => {
    const data = appContext.articles.filter((item) => {
      return (
        (props.filters.pestle === "" || item.pestle === props.filters.pestle) &&
        (props.filters.country === "" ||
          item.country === props.filters.country) &&
        (props.filters.topic === "" || item.topic === props.filters.topic) &&
        (props.filters.sector === "" || item.sector === props.filters.sector)
      );
    });

    const margin = { top: 50, right: 20, bottom: 50, left: 55 };
    const width =
      Math.floor(appContext.dimensions.width) * 0.4 -
      margin.left -
      margin.right;
    const height =
      Math.floor(appContext.dimensions.height * 0.5) -
      margin.top -
      margin.bottom;

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.intensity)])
      .nice()
      .range([0, width]);
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.relevance)])
      .nice()
      .range([height, 0]);

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    svg
      .selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => x(d.intensity))
      .attr("cy", (d) => y(d.relevance))
      .attr("r", 4)
      .attr("fill", "rgb(141, 215, 68)");

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .style("font-size", "1.5vmin");

    svg.append("g").call(d3.axisLeft(y));

    svg
      .append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("y", -55)
      .attr("x", -height / 2)
      .attr("fill", "rgb(141, 215, 68)")
      .attr("dy", ".75em")
      .attr("transform", "translate(0 , -50) rotate(-90)")
      .style("font-size", "1.5vmin")
      .text("Relevance");

    svg
      .append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", width / 2)
      .attr("fill", "rgb(141, 215, 68)")
      .attr("y", height + margin.bottom - 10)
      .style("font-size", "1.5vmin")
      .text("Intensity");

    return () => {
      chartRef.current.innerHTML = "";
    };
  }, [appContext.dimensions, appContext.articles, props.filters]);

  return <div ref={chartRef}></div>;
};

export default ScatterPlot;
