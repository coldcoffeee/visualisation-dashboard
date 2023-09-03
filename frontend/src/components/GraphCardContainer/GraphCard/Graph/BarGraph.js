import React, { useRef, useEffect, useContext } from "react";
import AppContext from "../../../../context/app-context";
import * as d3 from "d3";

const BarGraph = (props) => {
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
    const yearData = Object.values(
      data.reduce((acc, article) => {
        if (!article.published) return acc;
        const year = +article.published.split("-")[0];
        if (!acc[year]) acc[year] = { key: year, value: article.intensity };
        else acc[year].value += article.intensity;
        return acc;
      }, {})
    ).sort((a, b) => a.key - b.key);

    const margin = { top: 50, right: 0, bottom: 50, left: 55 };
    const width =
      Math.floor(appContext.dimensions.width) * 0.4 -
      margin.left -
      margin.right;
    const height =
      Math.floor(appContext.dimensions.height * 0.5) -
      margin.top -
      margin.bottom;

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(yearData.map((d) => d.key))
      .range([0, width])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(yearData, (d) => d.value)])
      .nice()
      .range([height, 0]);

    svg
      .selectAll(".bar")
      .data(yearData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.key))
      .attr("y", (d) => y(0))
      .attr("width", x.bandwidth())
      .attr("height", 0)
      .attr("rx", 2)
      .attr("fill", "rgb(141, 215, 68)")
      .transition()
      .duration(2000)
      .delay((d, i) => i * 100)
      .attr("y", (d) => y(d.value))
      .attr("height", (d) => Math.abs(height - y(d.value)));

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
      .text("Intensity");

    svg
      .append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", width / 2)
      .attr("fill", "rgb(141, 215, 68)")
      .attr("y", height + margin.bottom - 10)
      .text("Year");

    return () => {
      chartRef.current.innerHTML = "";
    };
  }, [appContext.dimensions, appContext.articles, props.filters]);

  return <div ref={chartRef}></div>;
};

export default BarGraph;
