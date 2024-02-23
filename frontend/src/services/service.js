import axios from "axios";
const baseURL = "http://localhost:8080";
// const token = localStorage.getItem("token");
// console.log("token 2", token);
const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Admin service functions
export const adminSignup = async (adminData) => {
  try {
    const response = await axiosInstance.post(
      `${baseURL}/admin/signup`,
      adminData
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const adminLogin = async (credentials) => {
  try {
    const response = await axiosInstance.post(
      `${baseURL}/admin/login`,
      credentials
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Student service functions
export const createStudent = async (studentData) => {
  try {
    const response = await axiosInstance.post(
      `${baseURL}/student/add`,
      studentData
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getAllStudents = async () => {
  try {
    const response = await axiosInstance.get(`${baseURL}/student`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getStudentById = async (studentId) => {
  try {
    const response = await axiosInstance.get(`${baseURL}/student/${studentId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const updateStudentById = async (studentId, studentData) => {
  try {
    const response = await axiosInstance.put(
      `${baseURL}/student/edit/${studentId}`,
      studentData
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const deleteStudentById = async (studentId) => {
  try {
    const response = await axiosInstance.delete(
      `${baseURL}/student/delete/${studentId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Parent service functions
export const createParent = async (parentData) => {
  try {
    const response = await axiosInstance.post(
      `${baseURL}/parent/add`,
      parentData
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getAllParents = async () => {
  try {
    const response = await axiosInstance.get(`${baseURL}/parent`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getParentById = async (parentId) => {
  try {
    const response = await axiosInstance.get(`${baseURL}/parent/${parentId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const updateParentById = async (parentId, parentData) => {
  try {
    const response = await axiosInstance.put(
      `${baseURL}/parent/edit/${parentId}`,
      parentData
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const deleteParentById = async (parentId) => {
  try {
    const response = await axiosInstance.delete(
      `${baseURL}/parent/delete/${parentId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// student login and manage own profile functions
export const studentLogin = async (credentials) => {
  try {
    const response = await axiosInstance.post(
      `${baseURL}/student/login`,
      credentials
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getStudent = async (studentId) => {
  try {
    const response = await axiosInstance.get(
      `${baseURL}/student/login/${studentId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const updateStudent = async (studentId, studentData) => {
  try {
    const response = await axiosInstance.put(
      `${baseURL}/student/login/edit/${studentId}`,
      studentData
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export default {
  adminSignup,
  adminLogin,
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById,
  createParent,
  getAllParents,
  getParentById,
  updateParentById,
  deleteParentById,
  studentLogin,
  getStudent,
  updateStudent,
};
