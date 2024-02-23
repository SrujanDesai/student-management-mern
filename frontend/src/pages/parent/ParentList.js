// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import {
//   getAllParents,
//   deleteParentById,
//   updateParentById,
// } from "../../services/service";
// import toast from "react-hot-toast";

// const ParentList = () => {
//   const [parents, setParents] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [updateData, setUpdateData] = useState({
//     _id: "",
//     name: "",
//     email: "",
//     student: "",
//     relation: "",
//   });
//   const [showUpdateForm, setShowUpdateForm] = useState(false);

//   const navigate = useNavigate();

//   const fetchParents = async () => {
//     try {
//       const data = await getAllParents();
//       setParents(data.data);
//     } catch (error) {
//       console.error("Error fetching parents:", error.message);
//     }
//   };

//   useEffect(() => {
//     fetchParents();
//   }, []);

//   useEffect(() => {
//     const results = parents.filter((parent) =>
//       parent.student.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setSearchResults(results);
//   }, [searchTerm, parents]);

//   const handleDeleteParent = async (id) => {
//     try {
//       await deleteParentById(id);
//       setParents(parents.filter((parent) => parent._id !== id));
//       toast.success("Parent deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting parent:", error.message);
//     }
//   };

//   const handleUpdateParent = async () => {
//     try {
//       await updateParentById(updateData._id, updateData);
//       fetchParents();
//       setShowUpdateForm(false);
//       toast.success("Parent updated successfully!");
//     } catch (error) {
//       console.error("Error updating parent:", error.message);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdateData({ ...updateData, [name]: value });
//   };

//   const openUpdateForm = (parent) => {
//     setUpdateData(parent);
//     setShowUpdateForm(true);
//   };

//   return (
//     <div className="container mx-auto">
//       <h1 className="text-3xl font-bold my-8">Parent List</h1>
//       <div className="flex flex-col md:flex-row items-center justify-between mb-4">
//         <input
//           type="text"
//           className="border border-gray-400 p-2 mb-2 md:mb-0 md:mr-2 w-full md:w-auto"
//           name="search"
//           placeholder="Search parent by student name"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <Link
//           to={"/addparent"}
//           className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Add Parent
//         </Link>
//         <button
//             className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
//             onClick={() => navigate("/studentlist")}
//           >
//             Back
//           </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {searchResults.map((parent, index) => (
//           <div
//             key={parent._id}
//             className={`rounded-lg shadow-md p-6 transition duration-300 ease-in-out transform hover:scale-105 ${
//               index % 2 === 0
//                 ? "bg-blue-100 hover:bg-blue-300"
//                 : "bg-indigo-100 hover:bg-indigo-300"
//             }`}
//           >
//             <h2 className="text-xl font-semibold mb-2">Name: {parent.name}</h2>
//             <p className="text-gray-600 mb-2">Email: {parent.email}</p>
//             <p className="text-gray-600 mb-2">Student: {parent.student}</p>
//             <p className="text-gray-600 mb-4">Relation: {parent.relation}</p>
//             <div className="flex justify-center space-x-4">
//               <button
//                 className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
//                 onClick={() => handleDeleteParent(parent._id)}
//               >
//                 Delete
//               </button>
//               <button
//                 className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded"
//                 onClick={() => openUpdateForm(parent)}
//               >
//                 Update
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {showUpdateForm && (
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
//             <h2 className="text-xl font-semibold mb-4">Update Parent</h2>
//             <input
//               type="text"
//               name="name"
//               value={updateData.name}
//               onChange={handleInputChange}
//               placeholder="Name"
//               className="border border-gray-400 p-2 mb-2 w-full"
//             />
//             <input
//               type="email"
//               name="email"
//               value={updateData.email}
//               onChange={handleInputChange}
//               placeholder="Email"
//               className="border border-gray-400 p-2 mb-2 w-full"
//             />
//             <input
//               type="text"
//               name="student"
//               value={updateData.student}
//               onChange={handleInputChange}
//               placeholder="Student"
//               className="border border-gray-400 p-2 mb-2 w-full"
//             />
//             <input
//               type="text"
//               name="relation"
//               value={updateData.relation}
//               onChange={handleInputChange}
//               placeholder="Relation"
//               className="border border-gray-400 p-2 mb-2 w-full"
//             />
//             <div className="flex justify-center space-x-4">
//               <button
//                 className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
//                 onClick={handleUpdateParent}
//               >
//                 Save
//               </button>
//               <button
//                 className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded"
//                 onClick={() => setShowUpdateForm(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ParentList;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  getAllParents,
  deleteParentById,
  updateParentById,
} from "../../services/service";
import toast from "react-hot-toast";

const ParentList = () => {
  const [parents, setParents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [updateData, setUpdateData] = useState({
    _id: "",
    name: "",
    email: "",
    student: "",
    relation: "",
  });
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const navigate = useNavigate();

  const fetchParents = async () => {
    try {
      const data = await getAllParents();
      setParents(data.data);
    } catch (error) {
      console.error("Error fetching parents:", error.message);
    }
  };

  useEffect(() => {
    fetchParents();
  }, []);

  useEffect(() => {
    const results = parents.filter((parent) =>
      parent.student.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, parents]);

  const handleDeleteParent = async (id) => {
    try {
      await deleteParentById(id);
      setParents(parents.filter((parent) => parent._id !== id));
      toast.success("Parent deleted successfully!");
    } catch (error) {
      console.error("Error deleting parent:", error.message);
    }
  };

  const handleUpdateParent = async () => {
    try {
      await updateParentById(updateData._id, updateData);
      fetchParents();
      setShowUpdateForm(false);
      toast.success("Parent updated successfully!");
    } catch (error) {
      console.error("Error updating parent:", error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  const openUpdateForm = (parent) => {
    setUpdateData(parent);
    setShowUpdateForm(true);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold my-8">Parent List</h1>
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <input
          type="text"
          className="border border-gray-400 p-2 mb-2 md:mb-0 md:mr-2 w-full md:w-auto"
          name="search"
          placeholder="Search parent by student name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex items-center space-x-4">
          <Link
            to={"/addparent"}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Parent
          </Link>
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => navigate("/studentlist")}
          >
            Back
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {searchResults.map((parent, index) => (
          <div
            key={parent._id}
            className={`rounded-lg shadow-md p-6 transition duration-300 ease-in-out transform hover:scale-105 ${
              index % 2 === 0
                ? "bg-blue-100 hover:bg-blue-300"
                : "bg-indigo-100 hover:bg-indigo-300"
            }`}
          >
            <h2 className="text-xl font-semibold mb-2">Name: {parent.name}</h2>
            <p className="text-gray-600 mb-2">Email: {parent.email}</p>
            <p className="text-gray-600 mb-2">Student: {parent.student}</p>
            <p className="text-gray-600 mb-2">Relation: {parent.relation}</p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
                onClick={() => handleDeleteParent(parent._id)}
              >
                Delete
              </button>
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded"
                onClick={() => openUpdateForm(parent)}
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>

      {showUpdateForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Update Parent</h2>
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
              name="student"
              value={updateData.student}
              onChange={handleInputChange}
              placeholder="Student"
              className="border border-gray-400 p-2 mb-2 w-full"
            />
            <input
              type="text"
              name="relation"
              value={updateData.relation}
              onChange={handleInputChange}
              placeholder="Relation"
              className="border border-gray-400 p-2 mb-2 w-full"
            />
            <div className="flex justify-center space-x-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
                onClick={handleUpdateParent}
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

export default ParentList;
