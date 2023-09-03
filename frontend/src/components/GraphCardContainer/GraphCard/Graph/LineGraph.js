import React, { useRef, useEffect, useContext } from "react";
import AppContext from "../../../../context/app-context";
import * as d3 from "d3";

const LineChart = (props) => {
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
        if (!acc[year]) {
          acc[year] = { key: year, likelihood: 0, relevance: 0, count: 0 };
        }
        acc[year].likelihood += article.likelihood;
        acc[year].relevance += article.relevance;
        acc[year].count++;
        return acc;
      }, {})
    ).map((entry) => ({
      key: entry.key,
      likelihood: entry.likelihood / entry.count,
      relevance: entry.relevance / entry.count,
    }));

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
      .domain([
        0,
        Math.max(
          d3.max(yearData, (d) => d.likelihood),
          d3.max(yearData, (d) => d.relevance)
        ),
      ])
      .nice()
      .range([height, 0]);

    const lineLikelihood = d3
      .line()
      .x((d) => x(d.key) + x.bandwidth() / 2)
      .y((d) => y(d.likelihood));

    const lineRelevance = d3
      .line()
      .x((d) => x(d.key) + x.bandwidth() / 2)
      .y((d) => y(d.relevance));

    svg
      .selectAll(".line-likelihood")
      .data([yearData])
      .enter()
      .append("path")
      .attr("class", "line-likelihood")
      .attr("d", lineLikelihood)
      .attr("fill", "none")
      .attr("stroke", "#003366")
      .attr("stroke-width", 2)
      .style("opacity", 0)
      .transition()
      .duration(1000)
      .style("opacity", 1)
      .attr("d", lineLikelihood);

    svg
      .selectAll(".line-relevance")
      .data([yearData])
      .enter()
      .append("path")
      .attr("class", "line-relevance")
      .attr("d", lineRelevance)
      .attr("fill", "none")
      .attr("stroke", "rgb(141, 215, 68)")
      .attr("stroke-width", 2)
      .style("opacity", 0)
      .transition()
      .duration(1000)
      .style("opacity", 1)
      .attr("d", lineRelevance);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .style("font-size", "1.5vmin");

    const yAxis = svg.append("g").call(d3.axisLeft(y));

    // svg
    //   .append("text")
    //   .attr("class", "y label")
    //   .attr("text-anchor", "end")
    //   .attr("y", -55)
    //   .attr("x", -height / 2)
    //   .attr("fill", "rgb(141, 215, 68)")
    //   .attr("dy", ".75em")
    //   .attr("transform", "translate(0 , -50) rotate(-90)")
    //   .text("Value");
    yAxis
      .append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("y", -60) // Adjust the vertical position as needed
      .attr("x", -height / 2)
      .attr("fill", "rgb(141, 215, 68)")
      .attr("dy", "1.5em")
      .attr("transform", "translate(0 , -50) rotate(-90)")
      .style("font-size", "1.5vmin")
      .style("font-family", '"Oswald", sans-serif')
      .text("Relevance")
      .append("tspan")
      .text(" & ")
      .attr("fill", "#aaa")
      .append("tspan")
      .attr("fill", "#003366")
      .text("Likelihood");

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

export default LineChart;
