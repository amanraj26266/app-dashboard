import React from "react";
import ReactApexChart from "react-apexcharts";

const ColumnChart = ({ data }) => {
  const series = [{ name: "Visitors", data: Object.values(data) }];
  const options = {
    chart: { type: "bar" },
    plotOptions: { bar: { dataLabels: { position: "top" } } },
    dataLabels: { enabled: true },
    xaxis: { categories: Object.keys(data) },
  };

  return <ReactApexChart options={options} series={series} type="bar" />;
};

export default ColumnChart;
