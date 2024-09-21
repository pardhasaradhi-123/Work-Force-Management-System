import React, { useState, useEffect } from "react";
import {
  FaUsers,
  FaChartLine,
  FaUserAltSlash,
  FaUserAlt,
} from "react-icons/fa";
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
      name: "total no.of Employees",
      icon: FaUsers,
      value: employeeData.length,
      bgColor: "bg-gradient-to-r from-blue-100 to-blue-200",
      textColor: "text-blue-700",
    },
    {
      id: 2,
      name: "total no.of workers",
      factory: "(on Factory)",
      icon: FaUserAlt,
      value: "250",
      bgColor: "bg-gradient-to-r from-indigo-100 to-violet-200",
      textColor: "text-indigo-700",
    },
    {
      id: 3,
      name: "total no.of workers",
      factory: "(off Factory)",
      icon: FaUserAltSlash,
      value: "50",
      bgColor: "bg-gradient-to-r from-red-100 to-orange-200",
      textColor: "text-orange-700",
    },
    {
      id: 4,
      name: "productivity",
      icon: FaChartLine,
      value: "5",
      bgColor: "bg-gradient-to-r from-indigo-100 to-indigo-200",
      textColor: "text-indigo-700",
    },
  ];

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

        <AdminProductionGraph />
      </div>
    </>
  );
}
