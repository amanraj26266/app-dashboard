// src/App.jsx
import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import "./App.css";
import DateSelector from "./components/DateSelector";
import TimeSeriesChart from "./components/TimeSeriesChart";
import SparklineChart from "./components/SparklineChart";
import ColumnChart from "./components/CloumnChart";


const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [countriesData, setCountriesData] = useState({});

  useEffect(() => {
    // Fetch CSV file from public folder and parse it
    fetch("/hotel_bookings_1000.csv")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          complete: (result) => {
            setData(result.data);
            setFilteredData(result.data);
            calculateCountryData(result.data);
          },
        });
      })
      .catch((error) => console.error("Error fetching CSV data:", error));
  }, []);

  const handleDateChange = (dateRange) => {
    const { startDate, endDate } = dateRange;
    const start = new Date(startDate);
    const end = new Date(endDate);

    const filtered = data.filter((item) => {
      const recordDate = new Date(
        `${item.arrival_date_year}-${item.arrival_date_month}-${item.arrival_date_day_of_month}`
      );
      return recordDate >= start && recordDate <= end;
    });

    setFilteredData(filtered);
    calculateCountryData(filtered);
  };

  const calculateCountryData = (filteredData) => {
    const countryCounts = filteredData.reduce((acc, curr) => {
      acc[curr.country] = (acc[curr.country] || 0) + 1;
      return acc;
    }, {});
    setCountriesData(countryCounts);
  };

  // Prepare data for charts
  const visitorsTimeSeriesData = filteredData.map((item) => ({
    x: new Date(
      `${item.arrival_date_year}-${item.arrival_date_month}-${item.arrival_date_day_of_month}`
    ).getTime(),
    y: parseInt(item.adults) + parseInt(item.children) + parseInt(item.babies),
  }));

  const adultsData = filteredData.map((item) => parseInt(item.adults));
  const childrenData = filteredData.map((item) => parseInt(item.children));

  return (
    <div className="App">
      <div className="heading">
        <h1>Waterdip Assignment</h1>
        <h1>Hotel Booking Dashboard</h1>
      </div>
      <div className="date">
        <DateSelector onDateChange={handleDateChange} />
      </div>
      <div className="chart-container">
        <TimeSeriesChart data={visitorsTimeSeriesData} />
        <ColumnChart data={countriesData} />
        <SparklineChart data={adultsData} title="Total Adults" />
        <SparklineChart data={childrenData} title="Total Children" />
      </div>
    </div>
  );
};

export default App;
