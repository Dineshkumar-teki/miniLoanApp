import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Cookies from "js-cookie";
import AdminDashboard from "../components/AdminDashboard";
import UserDashboard from "../components/UserDashboard";

const Home = () => {
  const [loading, setloading] = useState(true);
  
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!Cookies.get("jwtToken")) {
      navigate("/auth/sign-in");
    }
    setloading(false);
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-blue-500 text-3xl font-bold">loading...</p>
        </div>
      ) : (
        <>
          <Header />
          {user.role === "admin" ? <AdminDashboard /> : <UserDashboard />}
        </>
      )}
    </>
  );
};

export default Home;
