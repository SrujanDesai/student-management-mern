import React, { useState } from "react";
import { createStudent } from "../../services/service";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddStudent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    std: "",
    school: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createStudent(formData);
      navigate("/studentlist");
      toast.success("Student added successfully!");
    } catch (error) {
      console.error("Error adding student:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Add Student
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-indigo-200 py-8 px-6 shadow rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                required
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm rounded-md"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm rounded-md"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm rounded-md"
              />
            </div>

            <div>
              <label
                htmlFor="class"
                className="block text-sm font-medium text-gray-700"
              >
                Class
              </label>
              <input
                type="text"
                name="std"
                id="class"
                value={formData.std}
                onChange={handleChange}
                required
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm rounded-md"
              />
            </div>

            <div>
              <label
                htmlFor="school"
                className="block text-sm font-medium text-gray-700"
              >
                School
              </label>
              <input
                type="text"
                name="school"
                id="school"
                value={formData.school}
                onChange={handleChange}
                required
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm rounded-md"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Student
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
