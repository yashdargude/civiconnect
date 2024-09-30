/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../Utilis";
function SignUp() {
  const [LogInInfo, setLogInInfo] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const handlechange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyinfo = { ...LogInInfo };
    copyinfo[name] = value;
    setLogInInfo(copyinfo);
  };
  console.log("logininfo -> ", LogInInfo);

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password, role } = LogInInfo;
    if (!name || !email || !password) {
      return handleError("name, email ,role and password  are required");
    }
    if (!role) {
      return handleError("role is required , choose between user or admin");
    }
    try {
      const url = "http://localhost:8080/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(LogInInfo),
      });
      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        // console.log("logininfo -> ", LogInInfo);
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (err) {
      handleError(err);
    }
  };
  return (
    <div className="container">
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            onChange={handlechange}
            type="text"
            name="name"
            autoFocus
            placeholder="enter your name"
            value={LogInInfo.name}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handlechange}
            type="email"
            name="email"
            autoFocus
            placeholder="enter your email"
            value={LogInInfo.email}
          />
        </div>

        <div>
          <label htmlFor="role">Role</label>
          <select name="role" value={LogInInfo.role} onChange={handlechange}>
            <option value="">select</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handlechange}
            type="password"
            name="password"
            autoFocus
            placeholder="enter your password"
            value={LogInInfo.password}
          />
        </div>

        <button type="submit">SignUp </button>

        <span>
          Already have an account ?<Link to="/login">Login</Link>
        </span>
      </form>

      <ToastContainer />
    </div>
  );
}

export default SignUp;
