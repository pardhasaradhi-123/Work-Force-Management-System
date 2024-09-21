import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import no_Employees from "../../assets/no_employees.json";

const Employee = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [optionState, setOptionState] = useState("All Role");

  const options = [
    "All Role",
    "CEO",
    "HR",
    "SCM",
    "Accountant",
    "Plant Head",
    "Quality Head",
    "Shift Incharge",
    "Production Worker",
    "CNC Worker",
    "Final Inspector",
  ];

  const fetchEmployeeData = async () => {
    const res = await fetch("http://localhost:5000/employee/getAll");
    const result = await res.json();
    setEmployeeData(result);
    setFilteredData(result); // Initialize filtered data
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  useEffect(() => {
    // Filter the data based on the selected optionState
    if (optionState === "All Role") {
      setFilteredData(employeeData); // Show all employees if "All Role" is selected
    } else {
      const filtered = employeeData.filter(
        (employee) => employee.role === optionState
      );
      setFilteredData(filtered);
    }
  }, [optionState, employeeData]);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/employee/delete/${id}`, {
        method: "DELETE",
      });
      fetchEmployeeData(); // Refresh the data after deletion
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="bg-white mt-2 p-8 rounded-lg shadow-lg overflow-auto">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Employees</h1>
        <div className="flex justify-center items-center gap-3">
          {employeeData.length === 0 ? null : (
            <select
              value={optionState}
              onChange={(e) => setOptionState(e.target.value)}
              className="p-3 outline-none bg-[#f5f5f5] rounded-md"
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
          <Link
            to="/admin/employee/add-employees"
            className="flex justify-center items-center gap-3"
          >
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              + Add Employee
            </button>
          </Link>
        </div>
      </div>

      {employeeData.length === 0 ? (
        <div className="w-full flex flex-col justify-center items-center">
          <div className="w-[500px]">
            <Lottie animationData={no_Employees} />
          </div>
          <h1 className="font-semibold">
            There is no employee data. Please add the required employee details.
          </h1>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">S.No</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">
                  Employee ID
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Designation
                </th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <div className="w-screen flex flex-col justify-center items-center border-red-300 border-2">
                  <div className="w-[500px]">
                    <Lottie animationData={no_Employees} />
                  </div>
                  <h1 className="font-semibold">
                    There is no employee data. Please add the required employee
                    details.
                  </h1>
                </div>
              ) : (
                filteredData.map((employee, index) => (
                  <tr key={employee._id} className="text-center">
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
                    <td className="border border-gray-300 px-4 py-2">
                      <button onClick={() => handleDelete(employee._id)}>
                        <FaTrash color="red" size={25} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Employee;
