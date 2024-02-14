import React, { useState, useEffect } from "react";
import {
  getAllStudents,
  deleteStudentById,
  updateStudentById,
} from "../services/service";
import Default from "../assets/default.jpeg";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [updateData, setUpdateData] = useState({
    name: "",
    email: "",
    class: "",
    school: "",
  });
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

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
      console.log(data);
    } catch (error) {
      console.error("Error fetching students:", error.message);
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await deleteStudentById(id);
      setStudents(students.filter((student) => student._id !== id));
    } catch (error) {
      console.error("Error deleting student:", error.message);
    }
  };

  const handleUpdateStudent = async () => {
    try {
      await updateStudentById(updateData._id, updateData);
      fetchStudents(); // Refresh student list after update
      setShowUpdateForm(false); // Hide the update form after successful update
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

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold my-8">Student List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          className="border border-gray-400 p-2 mr-2"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-auto">
          Add Student
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {searchResults.map((student) => (
          <div key={student._id} className="bg-white rounded-lg shadow-md p-6">
            <img
              src={Default}
              alt="Profile Pic"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">Name: {student.name}</h2>
            <p className="text-gray-600 mb-2">Email: {student.email}</p>
            <p className="text-gray-600 mb-2">Class: {student.class}</p>
            <p className="text-gray-600 mb-4">School: {student.school}</p>
            <div className="flex justify-center">
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded mr-2"
                onClick={() => handleDeleteStudent(student._id)}
              >
                Delete
              </button>
              {/* Add Update button */}
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded mr-2"
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
          <div className="bg-white p-6 rounded-lg shadow-md">
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
            <div className="flex justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded mr-2"
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
