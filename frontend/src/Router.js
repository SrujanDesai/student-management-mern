import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Choose from "./pages/Choose";
import Registration from "./components/Registration";
import AdminLogin from "./components/AdminLogin";
import StudentLogin from "./components/StudentLogin";
import StudentList from "./pages/StudentList";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/choose" element={<Choose />} />
        <Route path="/adminregister" element={<Registration />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/studentlogin" element={<StudentLogin />} />
        <Route path="/studentlist" element={<StudentList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
