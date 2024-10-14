import React from "react";
import ReactApexChart from "react-apexcharts";

const TimeSeriesChart = ({ data }) => {
  const series = [{ name: "Visitors", data }];
  const options = {
    chart: { id: "visitor-timeseries" },
    xaxis: { type: "datetime" },
  };

  return <ReactApexChart options={options} series={series} type="line" />;
};

export default TimeSeriesChart;
