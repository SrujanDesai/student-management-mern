import React from "react";
import { Link } from "react-router-dom";
import Home from "../assets/home.svg";

const Homepage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col md:flex-row-reverse items-center md:items-start w-full max-w-screen-lg">
        <div className="md:w-1/2 md:order-2 mb-8 md:mb-0">
          <img src={Home} alt="home" className="w-full" />
        </div>
        <div className="md:w-1/2 md:order-1">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-center mb-4">
              Welcome to <br /> Student Management <br /> System
            </h1>
            <p className="text-gray-700 text-center mb-6">
              Our Student Management System is a comprehensive platform designed
              to streamline the administration of student data. It provides a
              user-friendly interface that allows for efficient and effective
              management of student data.
            </p>
            <div className="flex flex-col gap-4 ">
              <Link to="/choose" className="text-center">
                <button className="bg-blue-600 text-white rounded-lg py-2 px-4 ">
                  LOGIN
                </button>
              </Link>
              <p className="text-center">
                Don't have an account?{" "}
                <Link to="/adminregister" className="text-blue-600">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
