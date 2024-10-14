import React from "react";
import ReactApexChart from "react-apexcharts";

const SparklineChart = ({ data, title }) => {
  const series = [{ data }];

  const options = {
    chart: { type: "line", height: 160, sparkline: { enabled: false } }, // Disable sparkline to show axes
    stroke: { width: 2 },
    title: { text: title, align: "center", style: { fontSize: '16px' } },
    xaxis: {
      type: 'category', // Show x-axis
      labels: { show: true },
      title: { text: "Days", style: { fontSize: '12px' } },
    },
    yaxis: {
      labels: { show: true },
      title: { text: "Number of Visitors", style: { fontSize: '12px' } },
    },
    tooltip: {
      enabled: true,
      theme: 'dark',
    },
  };

  return <ReactApexChart options={options} series={series} type="line" height={200} />;
};

export default SparklineChart;
