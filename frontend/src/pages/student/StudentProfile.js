import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { getStudent, updateStudent } from "../../services/service";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DefaultProfilePic from "../../assets/default.jpeg";

const StudentProfile = () => {
  const navigate = useNavigate();

  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    class: "",
    school: "",
    profilepic: null, // Changed to null initially
  });
  const [isEditing, setIsEditing] = useState(false); // State to toggle editing mode
  const [file, setFile] = useState(null); // State to store the uploaded file

  const fetchStudentData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }
      const decodedToken = jwtDecode(token);
      const studentId = decodedToken.studentId;

      const response = await getStudent(studentId);
      setStudentData(response.data);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", studentData.name);
      formData.append("email", studentData.email);
      formData.append("class", studentData.class);
      formData.append("school", studentData.school);

      await updateStudent(studentData._id, studentData);
      setIsEditing(false);
      toast.success("Profile updated successfully");
      // After successful save, refetch student data to update the profile picture
      fetchStudentData();
    } catch (error) {
      toast.error(`Failed to update profile: ${error.message}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setStudentData((prevState) => ({
      ...prevState,
      profilepic: URL.createObjectURL(file), // Display the selected image preview
    }));
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col items-center">
            <img
              src={studentData.profilepic || DefaultProfilePic}
              alt="Profile Pic"
              className="w-24 h-24 rounded-full mb-4"
            />
            {isEditing && (
              <div className="mb-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mb-2"
                />
              </div>
            )}
            <h2 className="text-xl font-semibold mb-2">
              Name: {studentData.name}
            </h2>
            <p className="text-gray-600 mb-2">Email: {studentData.email}</p>
            <p className="text-gray-600 mb-2">Class: {studentData.class}</p>
            <p className="text-gray-600 mb-4">School: {studentData.school}</p>
            {!isEditing && (
              <div className="flex justify-between w-full">
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded mr-2"
                  onClick={handleEdit}
                >
                  Update
                </button>
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded"
                  onClick={() => navigate("/")}
                >
                  Back
                </button>
              </div>
            )}
            {isEditing && (
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded w-full"
                onClick={handleSave}
              >
                Save
              </button>
            )}
          </div>
          {isEditing && (
            <form onSubmit={(e) => e.preventDefault()} className="mt-4">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={studentData.name}
                  onChange={handleChange}
                  className="bg-gray-100 border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  value={studentData.email}
                  onChange={handleChange}
                  className="bg-gray-100 border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="class"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Class
                </label>
                <input
                  type="text"
                  name="class"
                  value={studentData.class}
                  onChange={handleChange}
                  className="bg-gray-100 border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="school"
                  className="block text-gray-700 font-bold mb-2"
                >
                  School
                </label>
                <input
                  type="text"
                  name="school"
                  value={studentData.school}
                  onChange={handleChange}
                  className="bg-gray-100 border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:border-blue-500"
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
