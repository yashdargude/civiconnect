/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../Utilis";

function Login() {
  const [LogInInfo, setLogInInfo] = useState({
    email: "",
    password: "",
  });

  const [role, setRole] = useState("user"); // New state for role selection

  const navigate = useNavigate();

  const handlechange = (e) => {
    const { name, value } = e.target;
    const copyinfo = { ...LogInInfo };
    copyinfo[name] = value;
    setLogInInfo(copyinfo);
  };

  const handleRoleChange = (roleType) => {
    setRole(roleType); // Update role based on selection (user/admin)
  };

  const handlelogin = async (e) => {
    e.preventDefault();
    const { email, password } = LogInInfo;

    if (!email || !password) {
      return handleError("Email and password are required");
    }

    try {
      const url = `http://localhost:8080/auth/login`;
      const LoginData = {
        email,
        password,
        role,
      };
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(LoginData),
      });
      const result = await response.json();
      const { success, message, token, user, error } = result;
      console.log(token);
      const name = user?.name;

      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", token);
        localStorage.setItem("LoggedInUser", name);
        localStorage.setItem("role", role); // Ensure this line executes

        setTimeout(() => {
          if (role === "admin") {
            navigate("/AdminDashboard");
          } else if (role === "user") {
            navigate("/UserDashboard");
          }
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="container">
      <h1>LogIn</h1>

      {/* Role selection (User/Admin) */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: "25px",
        }}
      >
        <button
          type="button"
          onClick={() => handleRoleChange("user")}
          style={{
            backgroundColor: role === "user" ? "#4CAF50" : "#f0f0f0",
            width: "47%", // 40% width for User button
            padding: "10px",
            color: role === "user" ? "#f0f0f0" : "gray",
            textAlign: "center",
          }}
        >
          User
        </button>
        <button
          type="button"
          onClick={() => handleRoleChange("admin")}
          style={{
            backgroundColor: role === "admin" ? "#4CAF50" : "#f0f0f0",
            width: "47%", // 40% width for Admin button
            padding: "10px",
            color: role === "admin" ? "#f0f0f0" : "dimgray",
            textAlign: "center",
          }}
        >
          Admin
        </button>
      </div>

      <form onSubmit={handlelogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handlechange}
            type="email"
            name="email"
            autoFocus
            placeholder="Enter your email"
            value={LogInInfo.email}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handlechange}
            type="password"
            name="password"
            placeholder="Enter your password"
            value={LogInInfo.password}
          />
        </div>

        <button type="submit">Login</button>

        <span>
          Don&apos;t have an account? Create <Link to="/signup">Signup</Link>
        </span>
      </form>

      <ToastContainer />
    </div>
  );
}

export default Login;
