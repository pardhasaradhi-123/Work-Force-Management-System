import React, { useState } from "react";
import { FaCalendarAlt, FaClock, FaUser, FaUserCog } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { AiFillFileText } from "react-icons/ai";
import { BsPersonWorkspace } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [activeLink, setActiveLink] = useState(0);
  const handleLinkClick = (index) => {
    setActiveLink(index);
  };
  const SIDEBAR_LINKS = [
    {
      id: 1,
      path: "/admin",
      name: "Overview",
      icon: MdDashboard,
    },
    {
      id: 2,
      path: "/admin/employee",
      name: "employees",
      icon: FaUser,
    },
    {
      id: 3,
      path: "/admin/shift",
      name: "shifts",
      icon: FaClock,
    },
    {
      id: 4,
      path: "/admin/attendance",
      name: "attendance",
      icon: FaCalendarAlt,
    },
    {
      id: 5,
      path: "/admin/production",
      name: "production",
      icon: FaUserCog,
    },
    {
      id: 6,
      path: "/admin/report",
      name: "report",
      icon: AiFillFileText,
    },
  ];
  return (
    <aside className="flex flex-col justify-between items-center h-screen w-56 max-md:w-16 max-sm:w-11 bg-white p-3 fixed left-0 border-r z-10">
      <div className="max-sm:w-auto">
        <Link
          to=""
          className="flex flex-col items-center text-violet-600 space-x-4 px-3"
        >
          <BsPersonWorkspace size={35} />
          <p className="capitalize font-bold max-md:hidden text-xl">
            TS man-Agent
          </p>
        </Link>
        <ul className="max-sm:w-auto">
          {SIDEBAR_LINKS.map((link, index) => {
            return (
              <li
                key={index}
                className={`font-medium rounded-md mt-5 py-4 px-5 hover:bg-gray-100 hover:text-indigo-500 max-sm:px-0 max-sm:w-12 ${
                  activeLink === index ? "bg-indigo-100 text-indigo-500" : ""
                }`}
              >
                <Link
                  to={link.path}
                  onClick={() => {
                    handleLinkClick(index);
                  }}
                  className="flex items-center gap-3 capitalize max-sm:justify-center"
                >
                  <span>{link.icon()}</span>
                  <span className="text-md text-gray-500 hidden md:flex">
                    {link.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="w-full cursor-pointer text-center uppercase">
        <Link to="/">
          <p className="flex items-center space-x-2 text-xs text-white py-2 px-5 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full max-sm:px-3 max-sm:justify-center">
            <span>{IoIosLogOut()}</span>
            <span className="max-sm:hidden max-md:hidden">log out</span>
          </p>
        </Link>
      </div>
    </aside>
  );
}
