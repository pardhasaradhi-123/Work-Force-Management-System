import React from "react";
import { GoBell } from "react-icons/go";
import { FaRegUserCircle } from "react-icons/fa";

export default function Header() {
  return (
    <div className="flex justify-between items-center">
      <div className="">
        <h1 className="text-md">It's time to be!</h1>
        <p className="text-xl font-bold capitalize">admin 👨‍💼</p>
      </div>
      <div className="flex items-center space-x-5">
        <div className="flex items-center space-x-5">
          <button className="relative text-2xl text-gray-600">
            <GoBell size={32} />
            <span className="absolute top-0 right-0 -mt-1 -mr-1 flex justify-center items-center bg-indigo-600 text-white text-[10px] w-5 h-4 rounded-full border-2 border-white">
              9
            </span>
          </button>
          <FaRegUserCircle size={32} />
        </div>
      </div>
    </div>
  );
}
