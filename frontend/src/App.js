import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Sales from "./pages/Sales";
import SalesManagement from "./pages/SalesManagement";
import Attendance from "./pages/Attendance";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/sales-management" element={<SalesManagement />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="*" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;