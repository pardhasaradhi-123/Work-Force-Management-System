import React, { useState, useEffect } from "react";
import { FaUsers, FaUser } from "react-icons/fa";
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
import { FaArrowTrendUp } from "react-icons/fa6";
import AdminProductionGraph from "../../Components/AdminProductionGraph";

export default function Home() {
  const [employeeData, setEmployeeData] = useState([]);

  const fetchEmployeeData = async () => {
    const res = await fetch("http://localhost:5000/employee/getAll");
    const result = await res.json();
    setEmployeeData(result);
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const cardData = [
    {
      id: 1,
      name: "total Employees",
      icon: FaUsers,
      value: employeeData.length,
      bgColor: "bg-gradient-to-r from-blue-100 to-blue-200",
      textColor: "text-blue-700",
    },
    {
      id: 2,
      name: "total Productivity",
      icon: FaArrowTrendUp,
      value: "80%",
      bgColor: "bg-gradient-to-tr from-green-400 to-green-500",
      textColor: "text-green-700",
    },
    {
      id: 3,
      name: "On Shift workers",
      icon: FaUser,
      value: "8/10",
      bgColor: "bg-gradient-to-r from-red-100 to-orange-200",
      textColor: "text-orange-700",
    },
    {
      id: 4,
      name: "general workers",
      icon: FaUsers,
      value: "39/40",
      bgColor: "bg-gradient-to-r from-indigo-100 to-indigo-200",
      textColor: "text-indigo-700",
    },
  ];

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

  // State to track the current time range (default is week)
  const [chartData, setChartData] = useState(weeklyData);
  const [timePeriod, setTimePeriod] = useState("Week");

  return (
    <>
      <div className="grid grid-cols-4 gap-4 pt-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {cardData.map((card) => (
          <article
            key={card.id}
            className={`flex flex-col justify-center rounded-md ${card.bgColor} shadow-md shadow-violet-200 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-300 p-4`}
          >
            <div className="flex justify-between">
              <p
                className={`font-semibold text-lg capitalize p-2 ${card.textColor}`}
              >
                {card.name}
              </p>
              <card.icon size={38} className={card.textColor} />
            </div>
            <div className="flex justify-center items-center p-2">
              <h1 className={`font-semibold text-3xl`}>
                {card.value}
                {card.factory ? (
                  <span className={`font-medium text-sm ${card.textColor}`}>
                    {card.factory}
                  </span>
                ) : null}
              </h1>
            </div>
          </article>
        ))}
        <div>
          <AdminProductionGraph />
          <div className="w-[1250px] mt-6 bg-white rounded-md shadow-md p-3">
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
              Nuts and bolts production over the past {timePeriod.toLowerCase()}
              .
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
      </div>
    </>
  );
}
