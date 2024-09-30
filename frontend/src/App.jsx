import { Navigate, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import UserDashboard from "./components/Dashboard/UserDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import "./App.css";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/Login" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/UserDashboard" element={<UserDashboard />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
