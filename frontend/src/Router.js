import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Choose from "./pages/Choose";
import Registration from "./components/Registration";
import AdminLogin from "./components/AdminLogin";
import StudentLogin from "./components/StudentLogin";
import StudentList from "./pages/student/StudentList";
import AddStudent from "./pages/student/AddStudent";
import ParentList from "./pages/parent/ParentList";
import AddParent from "./pages/parent/AddParent";
import StudentProfile from "./pages/student/StudentProfile";

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
        <Route path="/addstudent" element={<AddStudent />} />
        <Route path="/parentlist" element={<ParentList />} />
        <Route path="/addparent" element={<AddParent />} />
        <Route path="/studentprofile" element={<StudentProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
