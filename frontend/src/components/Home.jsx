import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../../Utilis";
import { ToastContainer } from "react-toastify";

function Home() {
  const [LoggedInUser, setLoggedInUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("LoggedInUser"));
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem("LoggedInUser");
    localStorage.removeItem("tokens");
    handleSuccess("logged out successfully");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div>
      <h1>Welcome , {LoggedInUser} </h1>
      <button onClick={handleLogout}> Logout</button>

      <ToastContainer />
    </div>
  );
}

export default Home;
