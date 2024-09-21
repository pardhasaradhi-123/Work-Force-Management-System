import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ShiftSchedule = () => {
  const totalHours = 24;

  const [shifts, setShifts] = useState([]);
  const [filteredRole, setFilteredRole] = useState("Shift Incharge");
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, [containerRef]);

  // Fetch employees from the API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:5000/employee/getAll");
        const data = await response.json();

        const filteredData = data
          .filter((employee) =>
            [
              "Shift Incharge",
              "Production Worker",
              "CNC Worker",
              "Final Inspector",
            ].includes(employee.role)
          )
          .map((employee) => ({
            name: employee.name,
            start: employee.shiftStart,
            width: employee.shiftWidth,
            role: employee.role,
          }));

        setShifts(filteredData);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const convertToTime = (percentage) => {
    const hours = (percentage / 100) * totalHours;
    const hourPart = Math.floor(hours);
    const minutePart = Math.round((hours - hourPart) * 60);

    return `${hourPart % 12 || 12}:${minutePart.toString().padStart(2, "0")} ${
      hourPart >= 12 ? "PM" : "AM"
    }`;
  };

  const handleDrag = (index, deltaX, shiftWidth) => {
    setShifts((prevShifts) =>
      prevShifts.map((shift, i) =>
        i === index
          ? {
              ...shift,
              start: Math.max(
                0,
                Math.min(shift.start + deltaX, 100 - shiftWidth)
              ),
            }
          : shift
      )
    );
  };

  const handleFilterChange = (e) => {
    setFilteredRole(e.target.value);
  };

  const filteredShifts = shifts.filter((shift) => shift.role === filteredRole);

  const timeSlots = Array.from({ length: totalHours }, (_, i) => ({
    time: i,
    employees: shifts.reduce((acc, shift) => {
      const shiftStart = (shift.start / 100) * totalHours;
      const shiftEnd = shiftStart + (shift.width / 100) * totalHours;
      return i >= shiftStart && i < shiftEnd ? acc + 1 : acc;
    }, 0),
  }));

  return (
    <>
      <div className="p-4 w-full bg-white rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-bold">Shift Schedule</h1>
          <div>
            <select
              className="p-2 border border-gray-300 rounded-md"
              value={filteredRole}
              onChange={handleFilterChange}
            >
              <option value="Shift Incharge">Shift Incharge</option>
              <option value="Production Worker">Production Worker</option>
              <option value="CNC Worker">CNC Worker</option>
              <option value="Final Inspector">Final Inspector</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col w-full">
          {/* Adjusted Time Labels */}
          <div className="flex justify-start mb-2 text-xs text-gray-500 border-b-2 border-gray-500">
            <span className="capitalize text-black text-lg font-semibold w-28">
              Team
            </span>
            <div className="grid grid-cols-4 w-full items-center">
              <div className="flex justify-center">
                <span>6:00 AM</span>
              </div>
              <div className="flex justify-center">
                <span>2:00 PM</span>
              </div>
              <div className="flex justify-center">
                <span>10:00 PM</span>
              </div>
              <div className="flex justify-end">
                <span>6:00 AM</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2" ref={containerRef}>
            {filteredShifts.map((shift, index) => {
              const startTime = convertToTime(shift.start);
              const endTime = convertToTime(shift.start + shift.width);

              return (
                <div key={index} className="flex items-center">
                  <span className="w-60 font-medium">{shift.name}</span>
                  <div className="relative w-full h-8 rounded-md ml-2">
                    <Draggable
                      axis="x"
                      bounds="parent"
                      onDrag={(e, data) =>
                        handleDrag(
                          index,
                          (data.deltaX / containerWidth) * 100,
                          shift.width
                        )
                      }
                      position={{
                        x: (shift.start / 100) * containerWidth,
                        y: 0,
                      }}
                    >
                      <div
                        className="absolute h-8 rounded-md bg-gradient-to-r from-cyan-400 to-blue-500 cursor-move"
                        style={{
                          left: `${shift.start}%`,
                          width: `${shift.width}%`,
                        }}
                      >
                        <div className="text-white text-xs p-1">
                          {startTime} - {endTime}
                        </div>
                      </div>
                    </Draggable>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Enhanced Line Graph Section */}
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-4">Shift Report</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={timeSlots}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorEmployees" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              tickFormatter={(tick) =>
                `${tick % 12 === 0 ? 12 : tick % 12} ${
                  tick >= 12 ? "PM" : "AM"
                }`
              }
              label={{
                value: "Time",
                position: "insideBottomRight",
                offset: -10,
              }}
            />
            <YAxis
              label={{
                value: "Employees",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#333", color: "#fff" }}
            />
            <Legend />

            <Area
              type="monotone"
              dataKey="employees"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorEmployees)"
              activeDot={{ r: 8, fill: "#82ca9d", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-end">
        <button className="bg-indigo-500 p-2 px-4 m-2 rounded-md font-medium uppercase hover:bg-indigo-600 hover:text-white hover:rounded-full">
          Save
        </button>
      </div>
    </>
  );
};

export default ShiftSchedule;
