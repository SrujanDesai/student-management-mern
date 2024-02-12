import React, { useState } from "react";
import { adminSignup } from "../services/service";
import "../styles/register.css";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await adminSignup(formData);
      console.log(response); // Handle success response
      // Optionally, you can redirect or show a success message
    } catch (error) {
      console.error(error.message); // Handle error
      // Optionally, you can show an error message to the user
    }
  };

  return (
    <div className="form-box">
      <form className="form" onSubmit={handleSubmit}>
        <span className="title">Sign up</span>
        <span className="subtitle">Create a free account with your email.</span>
        <div className="form-container">
          <input
            type="text"
            className="input"
            placeholder="Username"
            onChange={handleChange}
          />
          <input
            type="email"
            className="input"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            type="password"
            className="input"
            placeholder="Password"
            onChange={handleChange}
          />
        </div>
        <button>Sign up</button>
      </form>
      <div className="form-section">
        <p>
          Have an account? <a href="">Log in</a>{" "}
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
