import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  getAllStudents,
  deleteStudentById,
  updateStudentById,
} from "../../services/service";
import Default from "../../assets/default.jpeg";
import toast from "react-hot-toast";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [updateData, setUpdateData] = useState({
    _id: "",
    name: "",
    email: "",
    class: "",
    school: "",
  });
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const results = students.filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, students]);

  const fetchStudents = async () => {
    try {
      const data = await getAllStudents();
      setStudents(data.data);
    } catch (error) {
      console.error("Error fetching students:", error.message);
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await deleteStudentById(id);
      setStudents(students.filter((student) => student._id !== id));
      toast.success("Student deleted successfully!");
    } catch (error) {
      console.error("Error deleting student:", error.message);
    }
  };

  const handleUpdateStudent = async () => {
    try {
      await updateStudentById(updateData._id, updateData);
      fetchStudents(); // Refresh student list after update
      setShowUpdateForm(false); // Hide the update form after successful update
      toast.success("Student updated successfully!");
    } catch (error) {
      console.error("Error updating student:", error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  const openUpdateForm = (student) => {
    setUpdateData(student);
    setShowUpdateForm(true);
  };
  
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    fetchStudents();
  }, [students]);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold my-8 ">Student List</h1>
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <input
          type="text"
          className="border border-gray-400 p-2 mb-2 md:mb-0 md:mr-2 w-full md:w-auto"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex flex-row items-center">
          <Link
            to={"/addstudent"}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-2 mx-2 md:mb-0 md:mr-2"
          >
            Add Student
          </Link>
          <Link
            to={"/parentlist"}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 mx-2 md:mb-0 md:mr-2"
          >
            View Parent
          </Link>
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold px-4 py-2 rounded mb-2 mx-2 md:mb-0 md:mr-2"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {searchResults.map((student, index) => (
          <div
            key={student._id}
            className={`rounded-lg shadow-md p-6 transition duration-300 ease-in-out transform hover:scale-105 ${
              index % 2 === 0
                ? "bg-blue-100 hover:bg-blue-300"
                : "bg-indigo-100 hover:bg-indigo-300"
            }`}
          >
            <img
              src={Default}
              alt="Profile Pic"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">Name: {student.name}</h2>
            <p className="text-gray-600 mb-2">Email: {student.email}</p>
            <p className="text-gray-600 mb-2">Class: {student.class}</p>
            <p className="text-gray-600 mb-4">School: {student.school}</p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
                onClick={() => handleDeleteStudent(student._id)}
              >
                Delete
              </button>
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded"
                onClick={() => openUpdateForm(student)}
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Update Form */}
      {showUpdateForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Update Student</h2>
            <input
              type="text"
              name="name"
              value={updateData.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="border border-gray-400 p-2 mb-2 w-full"
            />
            <input
              type="email"
              name="email"
              value={updateData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="border border-gray-400 p-2 mb-2 w-full"
            />
            <input
              type="text"
              name="class"
              value={updateData.class}
              onChange={handleInputChange}
              placeholder="Class"
              className="border border-gray-400 p-2 mb-2 w-full"
            />
            <input
              type="text"
              name="school"
              value={updateData.school}
              onChange={handleInputChange}
              placeholder="School"
              className="border border-gray-400 p-2 mb-2 w-full"
            />
            <div className="flex justify-center space-x-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
                onClick={handleUpdateStudent}
              >
                Save
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded"
                onClick={() => setShowUpdateForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;
