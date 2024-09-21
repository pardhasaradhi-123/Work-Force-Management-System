import React, { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Example data for different time ranges
const weeklyData = [
  { name: "12 Jan", nuts: 80, bolts: 120 },
  { name: "13 Jan", nuts: 110, bolts: 90 },
  { name: "14 Jan", nuts: 40, bolts: 160 },
  { name: "15 Jan", nuts: 120, bolts: 60 },
  { name: "16 Jan", nuts: 70, bolts: 130 },
  { name: "17 Jan", nuts: 50, bolts: 150 },
  { name: "18 Jan", nuts: 150, bolts: 50 },
];

const monthlyData = [
  { name: "Week 1", nuts: 400, bolts: 600 },
  { name: "Week 2", nuts: 320, bolts: 500 },
  { name: "Week 3", nuts: 700, bolts: 800 },
  { name: "Week 4", nuts: 500, bolts: 650 },
];

const yearlyData = [
  { name: "Jan", nuts: 5000, bolts: 6000 },
  { name: "Feb", nuts: 4000, bolts: 5500 },
  { name: "Mar", nuts: 7000, bolts: 7500 },
  { name: "Apr", nuts: 8000, bolts: 9000 },
  { name: "May", nuts: 6000, bolts: 7000 },
  { name: "Jun", nuts: 7000, bolts: 7500 },
  { name: "Jul", nuts: 5000, bolts: 6500 },
  { name: "Aug", nuts: 6500, bolts: 7000 },
  { name: "Sep", nuts: 5500, bolts: 6000 },
  { name: "Oct", nuts: 7000, bolts: 8000 },
  { name: "Nov", nuts: 8000, bolts: 8500 },
  { name: "Dec", nuts: 7500, bolts: 9000 },
];

const Performance = () => {
  // State to track the current time range (default is week)
  const [chartData, setChartData] = useState(weeklyData);
  const [timePeriod, setTimePeriod] = useState("Week");

  const handleTimeFilter = (period) => {
    setTimePeriod(period);
    switch (period) {
      case "Year":
        setChartData(yearlyData);
        break;
      case "Month":
        setChartData(monthlyData);
        break;
      case "Week":
      default:
        setChartData(weeklyData);
        break;
    }
  };

  return (
    <div className="p-6">
      {/* Production Weight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-red-100 text-red-800 p-4 rounded-lg shadow-md flex flex-col">
          <h2 className="text-lg font-semibold">
            Production Weight{" "}
            <span className="text-sm text-gray-600">Yesterday</span>
          </h2>
          <div className="flex items-center text-5xl font-bold mt-2 mb-4">
            82%
            <FaArrowDown className="ml-2 text-red-800" size={24} />
          </div>
          <p className="text-sm">Growth from Yesterday</p>
          <p className="text-2xl mt-auto">130 KG</p>
        </div>
        <div className="bg-green-100 text-green-800 p-4 rounded-lg shadow-md flex flex-col">
          <h2 className="text-lg font-semibold">
            Production Weight{" "}
            <span className="text-sm text-gray-600">Last week</span>
          </h2>
          <div className="flex items-center text-5xl font-bold mt-2 mb-4">
            103%
            <FaArrowUp className="ml-2 text-green-800" size={24} />
          </div>
          <p className="text-sm">Growth from Last Week</p>
          <p className="text-2xl mt-auto">1600 KG</p>
        </div>
      </div>

      {/* Factory Report */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-6 text-center">
          Factory Report: Nuts and Bolts Production
        </h2>
        {/* Line Chart for Nuts and Bolts Production */}
        <div className="mb-6">
          <h3 className="text-center text-lg font-semibold mb-4">
            Production Trend (Nuts vs Bolts)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="nuts"
                stroke="#82ca9d"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="bolts" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex justify-center items-center space-x-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
            <p>Nuts</p>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
            <p>Bolts</p>
          </div>
        </div>

        {/* Descriptive Text */}
        <p className="text-center mt-4 text-gray-600">
          Nuts and bolts production over the past {timePeriod.toLowerCase()}.
        </p>

        {/* Time filters */}
        <div className="flex space-x-4 justify-center mt-4">
          <button
            onClick={() => handleTimeFilter("Year")}
            className={`bg-blue-500 text-white px-4 py-1 rounded-full hover:bg-blue-600 transition ${
              timePeriod === "Year" ? "bg-blue-700" : ""
            }`}
          >
            Year
          </button>
          <button
            onClick={() => handleTimeFilter("Month")}
            className={`bg-blue-500 text-white px-4 py-1 rounded-full hover:bg-blue-600 transition ${
              timePeriod === "Month" ? "bg-blue-700" : ""
            }`}
          >
            Month
          </button>
          <button
            onClick={() => handleTimeFilter("Week")}
            className={`bg-blue-500 text-white px-4 py-1 rounded-full hover:bg-blue-600 transition ${
              timePeriod === "Week" ? "bg-blue-700" : ""
            }`}
          >
            Week
          </button>
        </div>
      </div>
    </div>
  );
};

export default Performance;
