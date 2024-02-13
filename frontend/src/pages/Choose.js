import React from "react";

const Choose = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="max-w-screen-lg w-full flex justify-center space-x-8">
        {/* Admin Card */}
        <div className="flex flex-col content-center items-center bg-blue-500 rounded-lg shadow-md p-6 hover:bg-blue-600 transition duration-300 cursor-pointer">
          <h2 className="text-2xl font-bold text-white mb-2">Admin</h2>
          <p className="text-white">
            Streamline student management, Manage students data like student's
            school, class, and more. Also can manage details of each student's
            parent and also seamlessly student can manage their own profile.
          </p>
        </div>
        {/* Student Card */}
        <div className="flex flex-col content-center items-center bg-green-500 rounded-lg shadow-md p-6 hover:bg-green-600 transition duration-300 cursor-pointer">
          <h2 className="text-2xl font-bold text-white mb-2">Student</h2>
          <p className="text-white">
            Streamline student management, Manage students data like student's
            school, class, and more. Also can manage details of each student's
            parent and also seamlessly student can manage their own profile.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Choose;
