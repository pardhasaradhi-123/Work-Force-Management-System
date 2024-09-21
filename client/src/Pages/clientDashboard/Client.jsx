import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ClientHeader from "../../Components/ClientHeader";
// Sample performance data for each month
const performanceData = {
  January: [
    { day: 1, performance: 60 },
    { day: 10, performance: 65 },
    { day: 20, performance: 70 },
    { day: 30, performance: 75 },
  ],
  February: [
    { day: 1, performance: 72 },
    { day: 10, performance: 78 },
    { day: 20, performance: 80 },
    { day: 28, performance: 85 },
  ],
  March: [
    { day: 1, performance: 80 },
    { day: 10, performance: 85 },
    { day: 20, performance: 88 },
    { day: 31, performance: 90 },
  ],
  // Add more data for other months if needed
};

const Overview = () => {
  // Get current month
  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  // State to hold selected month and its performance data
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [data, setData] = useState(performanceData[selectedMonth]);

  // Function to handle month change
  const handleMonthChange = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);
    setData(performanceData[month]);
  };

  return (
    <>
      <ClientHeader />
      <div className="h-full flex flex-col mt-5">
        {/* Main Content */}
        <div className="flex justify-center items-center flex-grow">
          {/* Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 w-full h-auto overflow-auto">
            {/* Header Info */}
            <div className="flex items-center justify-between mb-6">
              {/* User Info */}
              <div className="flex items-center space-x-4">
                {/* Profile Icon */}
                <FaUser size={34} />
                <div>
                  <h3 className="text-xl font-semibold">
                    Name: <span className="font-normal">Ashik</span>
                  </h3>
                  <h3 className="text-xl font-semibold">
                    Designation:{" "}
                    <span className="font-normal">AI Architect</span>
                  </h3>
                </div>
              </div>
              {/* User ID and Shift */}
              <div className="text-right">
                <h3 className="text-xl font-semibold">
                  ID: <span className="font-normal">123456</span>
                </h3>
                <h3 className="text-xl font-semibold">
                  Shift: <span className="font-normal">A/N</span>
                </h3>
              </div>
            </div>

            {/* Performance Chart and Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Line Chart for Performance */}
              <div className="bg-red-300 p-4 rounded-lg shadow-md h-64 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-lg">Performance</h4>
                  <select
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    className="bg-white p-2 rounded shadow-md"
                  >
                    {Object.keys(performanceData).map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Line Chart */}
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="performance"
                      stroke="#ff7300"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Stats - Attendance and Grade */}
              <div className="flex flex-col space-y-6">
                <div className="flex justify-center items-center bg-green-400 p-8 rounded-lg shadow-md h-full">
                  <h4 className="font-semibold text-lg">85% Attendance</h4>
                </div>
                <div className="flex justify-center items-center bg-blue-400 p-8 rounded-lg shadow-md h-full">
                  <h4 className="font-semibold text-lg">A Grade</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
