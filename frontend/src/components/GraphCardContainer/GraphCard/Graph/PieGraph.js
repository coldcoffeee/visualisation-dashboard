import React, { useRef, useEffect, useContext } from "react";
import * as d3 from "d3";
import AppContext from "../../../../context/app-context";
const PieChart = (props) => {
  const chartRef = useRef();
  const appContext = useContext(AppContext);

  useEffect(() => {
    const data = appContext.articles.filter((item) => {
      console.log();
      return (
        (props.filters.pestle === "" || item.pestle === props.filters.pestle) &&
        (props.filters.country === "" ||
          item.country === props.filters.country) &&
        new Date(item.published).getFullYear() === +props.filters.year &&
        (props.filters.sector === "" || item.sector === props.filters.sector)
      );
    });
    const topicsData = data.reduce((acc, article) => {
      if (!article.published) return acc;
      const topic = article.topic;
      if (!article.topic) return acc;
      if (!acc[topic]) acc[topic] = 0;
      acc[topic]++;
      return acc;
    }, {});

    const topics = Object.keys(topicsData);
    const total = topics.reduce((sum, topic) => sum + topicsData[topic], 0);

    const margin = { top: 0, right: 0, bottom: 0, left: 0 };
    const width =
      Math.floor(appContext.dimensions.width) * 0.4 -
      margin.left -
      margin.right;
    const height =
      Math.floor(appContext.dimensions.height * 0.5) -
      margin.top -
      margin.bottom;
    const radius = Math.min(width, height) / 2;

    const color = d3.scaleOrdinal().range(d3.schemeCategory10);

    const pie = d3.pie().value((d) => d.value);

    const arc = d3.arc().outerRadius(radius).innerRadius(0);

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const g = svg
      .selectAll(".arc")
      .data(
        pie(Object.entries(topicsData).map(([key, value]) => ({ key, value })))
      )
      .enter()
      .append("g")
      .attr("class", "arc")
      .attr("fill", (d) => color(d.data.key))
      .style("opacity", 0.8);

    g.append("path")
      .attr("d", arc)
      .style("fill", (d) => color(d.data.key));

    // g.append("text")
    //   .attr("transform", (d) => `translate(${arc.centroid(d)})`)
    //   .attr("dy", "1vmin")
    //   .attr("dx", "-0.1vmin")
    //   .style("text-anchor", "middle")
    //   .text((d) => {
    //     const percentage = ((d.data.value / total) * 100).toFixed(1);
    //     return `${d.data.key}
    //     (${percentage}%)`;
    //   })
    //   .attr("fill", "transparent")
    //   .style("font-size", "0.7rem")
    //   .style("font-family", '"Rubik", sans-serif')
    //   .style("font-weight", "900")
    //   .style("opacity", 1);

    // g.on("mouseover", function (event, d) {
    //   d3.select(this).select("text").style("fill", "black");
    //   d3.select(this).select("text").style("z-index", "100");
    //   d3.select(this).select("text").style("opacity", 1);
    // }).on("mouseout", function () {
    //   d3.select(this).select("text").style("fill", "transparent");
    // });
    g.append("text")
      .attr("transform", (d) => {
        const centroid = arc.centroid(d);
        const x = centroid[0];
        const y = centroid[1];
        return `translate(${x},${y})`;
      })
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .style("fill", "transparent")
      .text((d) => {
        const percentage = ((d.data.value / total) * 100).toFixed(1);
        return `${d.data.key} (${percentage}%)`;
      })
      .on("mouseover", function () {
        d3.select(this).style("fill", "black");
        d3.select(this).style("cursor", "pointer");
        d3.select(this).style("font-size", "1.5rem");
      })
      .on("mouseout", function () {
        d3.select(this).style("fill", "transparent");
      });

    // g.append("text")
    //   .attr("class", "label")
    //   .attr("transform", (d) => `translate(${arc.centroid(d)})`)
    //   .attr("dy", ".35em")
    //   .style("text-anchor", "middle")
    //   .style("visibility", "hidden")
    //   .text((d) => {
    //     const percentage = ((d.data.value / total) * 100).toFixed(1);
    //     return `${d.data.key} (${percentage}%)`;
    //   });

    // g.on("mouseover", function (event, d) {
    //   d3.select(this).select(".label").style("visibility", "visible");
    // }).on("mouseout", function () {
    //   d3.select(this).select(".label").style("visibility", "hidden");
    // });

    return () => {
      chartRef.current.innerHTML = "";
    };
  }, [appContext.dimensions, appContext.articles, props.filters]);

  return (
    <>
      {" "}
      <div ref={chartRef}></div>
      <div
        style={{
          position: "absolute",
          right: "2%",
          bottom: "5%",
          fontWeight: "bold",
          color: "rgb(141, 215, 68)",
        }}
      >
        {props.filters.year}
      </div>
      <div
        style={{
          position: "absolute",
          right: "2%",
          top: "15%",
          fontWeight: "100",
        }}
      >
        Hover to reveal labels
      </div>
    </>
  );
};

export default PieChart;
