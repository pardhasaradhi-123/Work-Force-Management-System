import React from "react";
import Aside from "./AdminAside";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div>
      <div className="flex">
        <Aside />
        <div className="w-full ml-16 md:ml-60 p-4">
          <Header />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
