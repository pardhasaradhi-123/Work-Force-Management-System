import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import DashboardLayout from "./Components/DashboardLayout";
import AdminHome from "./Pages/adminDashboard/AdminHome";
import Shift from "./Pages/adminDashboard/Shift";
import Attandance from "./Pages/adminDashboard/Attandance";
import Performance from "./Pages/adminDashboard/Performance";
import Employee from "./Pages/adminDashboard/Employee";
import Report from "./Pages/adminDashboard/Report";
import AddEmployees from "./Components/AddEmployees";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="/admin/shift" element={<Shift />} />
          <Route path="/admin/attendance" element={<Attandance />} />
          <Route path="/admin/performance" element={<Performance />} />
          <Route path="/admin/employee" element={<Employee />} />
          <Route path="/admin/report" element={<Report />} />
        </Route>
        <Route
          path="/admin/employees/add-employees"
          element={<AddEmployees />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
