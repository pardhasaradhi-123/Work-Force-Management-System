import React from "react";
import { GoBell } from "react-icons/go";
import { FaRegUserCircle } from "react-icons/fa";
import { BsPersonWorkspace } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="flex justify-between items-center bg-white p-3">
      <div className="flex justify-center items-center gap-20">
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
        </div>
        <div className="">
          <h1 className="text-md">Welcome back!</h1>
          <p className="text-xl font-bold capitalize">Ashik 👷</p>
        </div>
      </div>
      <div className="flex justify-center items-center gap-5">
        <div className="flex items-center space-x-5">
          <div className="flex items-center space-x-5">
            <button className="relative text-2xl text-gray-600">
              <GoBell size={32} />
              <span className="absolute top-0 right-0 -mt-1 -mr-1 flex justify-center items-center bg-indigo-600 text-white text-[10px] w-4 h-4 rounded-full border-2 border-white"></span>
            </button>
            <FaRegUserCircle size={32} />
          </div>
        </div>
        <div className="cursor-pointer text-center uppercase">
          <Link to="/">
            <p className="flex items-center space-x-2 text-xs text-white py-2 px-5 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full max-sm:px-3 max-sm:justify-center">
              <span>{IoIosLogOut()}</span>
              <span className="max-sm:hidden max-md:hidden">log out</span>
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
