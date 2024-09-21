import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Attendance = () => {
  const [selectedOption, setSelectedOption] = useState("day");
  const [startDate, setStartDate] = useState(new Date());
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [employeeData, setEmployeeData] = useState([]);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const toggleDatePicker = () => {
    setIsDatePickerVisible(!isDatePickerVisible);
  };

  const fetchEmployeeData = async () => {
    const res = await fetch("http://localhost:5000/employee/getAll");
    const result = await res.json();
    setEmployeeData(result);
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <div className="flex justify-around mb-6">
        <button
          className="bg-purple-500 text-white font-bold py-4 px-8 rounded-lg shadow-md hover:bg-purple-700"
          onClick={() => console.log("Shift 1 Clicked")}
        >
          Shift 1 <span className="block text-sm">25/30</span>
        </button>
        <button
          className="bg-red-500 text-white font-bold py-4 px-8 rounded-lg shadow-md hover:bg-red-700"
          onClick={() => console.log("Shift 2 Clicked")}
        >
          Shift 2 <span className="block text-sm">20/30</span>
        </button>
        <button
          className="bg-green-500 text-white font-bold py-4 px-8 rounded-lg shadow-md hover:bg-green-700"
          onClick={() => console.log("Shift 3 Clicked")}
        >
          Shift 3 <span className="block text-sm">25/35</span>
        </button>
        <button
          className="bg-gray-800 text-white font-bold py-4 px-8 rounded-lg shadow-md hover:bg-gray-900"
          onClick={() => console.log("General Clicked")}
        >
          General <span className="block text-sm">40/40</span>
        </button>
      </div>

      {/* Date Picker and Dropdown */}
      <div className="flex justify-end mb-4 items-center">
        <button
          className="bg-gray-200 border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded mr-4"
          onClick={toggleDatePicker}
        >
          Date &#x1F4C5;
        </button>
        {isDatePickerVisible && (
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            inline
            className="mt-2"
          />
        )}
        <select
          value={selectedOption}
          onChange={handleOptionChange}
          className="bg-gray-200 border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded"
        >
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
        </select>
      </div>

      {/* Attendance Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">S.No</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Employee ID</th>
              <th className="border border-gray-300 px-4 py-2">Designation</th>
              <th className="border border-gray-300 px-4 py-2">In Time</th>
              <th className="border border-gray-300 px-4 py-2">Out Time</th>
              <th className="border border-gray-300 px-4 py-2">
                Attendance Status
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Placeholder rows for the table */}
            {employeeData?.map((employee, index) => (
              <tr key={index} className="bg-blue-50">
                <td className="border border-gray-300 px-4 py-2">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2 capitalize">
                  {employee.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {employee.employeeId}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {employee.role}
                </td>
                <td className="border border-gray-300 px-4 py-2"></td>
                <td className="border border-gray-300 px-4 py-2"></td>
                <td className="border border-gray-300 px-4 py-2"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
