import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminProductionGraph = () => {
  // Sample daily data for a month (0 to 100 scale for productivity)
  const dailyData = [
    80, 60, 70, 40, 90, 50, 85, 60, 75, 65, 95, 30, 85, 45, 70, 50, 65, 95, 100,
    85, 55, 80, 45, 65, 75, 55, 90, 35, 85, 95,
  ]; // Example: 30 days of data

  const [view, setView] = useState("Day");

  // Function to calculate average productivity
  const calculateAverage = (data) =>
    data.reduce((a, b) => a + b, 0) / data.length;

  // Prepare weekly and monthly data based on daily data
  const getWeeklyData = () => {
    const weeks = [];
    for (let i = 0; i < dailyData.length; i += 7) {
      const weekData = dailyData.slice(i, i + 7);
      weeks.push(calculateAverage(weekData));
    }
    return weeks;
  };

  const getMonthlyData = () => {
    return [calculateAverage(dailyData)];
  };

  // Determine the data to display based on the current view
  const getCurrentData = () => {
    if (view === "Day") return dailyData;
    if (view === "Week") return getWeeklyData();
    return getMonthlyData();
  };

  // Set chart labels based on the current view
  const getCurrentLabels = () => {
    if (view === "Day")
      return Array.from({ length: dailyData.length }, (_, i) => `Day ${i + 1}`);
    if (view === "Week")
      return Array.from(
        { length: getWeeklyData().length },
        (_, i) => `Week ${i + 1}`
      );
    return ["Month"];
  };

  // Calculate the average for color coding
  const average = calculateAverage(dailyData);

  // Determine the color for each bar
  const getCurrentColors = () => {
    return getCurrentData().map((value) =>
      value >= average ? "green" : "red"
    );
  };

  // Data configuration for Chart.js
  const data = {
    labels: getCurrentLabels(),
    datasets: [
      {
        label: `Productivity (${view})`,
        data: getCurrentData(),
        backgroundColor: getCurrentColors(),
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  // Chart.js options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `Productivity Overview (${view} View)`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100, // Productivity is between 0 and 100
      },
    },
  };

  return (
    <div className="p-4 h-screen w-[1250px] bg-white rounded-md">
      <h1 className="font-semibold text-xl capitalize">production overview</h1>
      <div className="flex justify-end space-x-4 mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:rounded-full"
          onClick={() => setView("Day")}
        >
          Day
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:rounded-full"
          onClick={() => setView("Week")}
        >
          Week
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:rounded-full"
          onClick={() => setView("Month")}
        >
          Month
        </button>
      </div>

      <Bar data={data} options={options} />
    </div>
  );
};

export default AdminProductionGraph;
