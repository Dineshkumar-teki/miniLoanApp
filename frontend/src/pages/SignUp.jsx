import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import img2 from "../assets/img2.png";

const SignUp = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showCheckPassword, setShowCheckPassword] = useState(false);
  const [formData, setData] = useState({
    email: "",
    password: "",
    username: "",
    passwordCheck: "",
  });

  const handleInput = (e) => {
    setData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !formData.username ||
      !formData.password ||
      !formData.email ||
      !formData.passwordCheck
    ) {
      return setErr("Please fill out all fields.");
    } else {
      if (formData.password !== formData.passwordCheck) {
        return setErr("Password mismatch");
      }
    }
    setErr(null);
    try {
      setErr(null);
      const res = await fetch("http://localhost:3100/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        return setErr(data.message);
      }
      if (res.ok) {
        navigate("/auth/sign-in");
      }
    } catch (error) {
      setErr(error.message);
    }
  };

  useEffect(() => {
    if (Cookies.get("jwtToken")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex justify-evenly items-center min-h-screen bg-black py-10">
      <div className="hidden w-[45%] lg:flex justify-center items-center ">
        <img src={img2} alt="sign-in" className="w-[80%]" />
      </div>
      <div className="w-[90%] md:w-[400px] bg-white/10 py-10 px-5 border border-slate-500 rounded-lg backdrop-blur-lg">
        <h2 className="text-center text-white font-semibold text-4xl mb-5">
          Sign-Up
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="username"
              className="text-white text-md font-semibold"
            >
              Name
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your name"
              className=" p-2 rounded-md outline-none"
              onChange={handleInput}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-white text-md font-semibold">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@company.com"
              className=" p-2 rounded-md outline-none"
              onChange={handleInput}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-white text-md font-semibold"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                className="p-2 rounded-md outline-none w-full"
                onChange={handleInput}
              />
              <span
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-lg cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-white text-md font-semibold"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showCheckPassword ? "text" : "password"}
                id="passwordCheck"
                placeholder="Enter your password"
                className="p-2 w-full rounded-md outline-none"
                onChange={handleInput}
              />
              <span
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-lg cursor-pointer"
                onClick={() => {
                  setShowCheckPassword(!showCheckPassword);
                }}
              >
                {showCheckPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            {err && <p className="text-red-500">{err}</p>}
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-800 via-purple-600 to-pink-400 hover:bg-gradient-to-l font-semibold rounded-lg py-2 text-white text-xl"
          >
            Sign Up
          </button>
          <button
            className="border-pink-500 hover:border-amber-600 rounded-lg py-1.5 border-2 font-semibold text-white text-xl"
            onClick={() => {
              navigate("/auth/sign-in");
            }}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
