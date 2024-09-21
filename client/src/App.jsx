import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import DashboardLayout from "./Components/AdminDashboardLayout";
import AdminHome from "./Pages/adminDashboard/AdminHome";
import Shift from "./Pages/adminDashboard/Shift";
import Attandance from "./Pages/adminDashboard/Attandance";
import Performance from "./Pages/adminDashboard/Performance";
import Employee from "./Pages/adminDashboard/Employee";
import Report from "./Pages/adminDashboard/Report";
import AddEmployees from "./Components/AddEmployees";
import "react-toastify/ReactToastify.css";
import Client from "./Pages/clientDashboard/Client";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="/admin/shift" element={<Shift />} />
          <Route path="/admin/attendance" element={<Attandance />} />
          <Route path="/admin/production" element={<Performance />} />
          <Route path="/admin/employee" element={<Employee />} />
          <Route path="/admin/report" element={<Report />} />
          <Route
            path="/admin/employee/add-employees"
            element={<AddEmployees />}
          />
        </Route>
        <Route path="/employee" element={<Client />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
