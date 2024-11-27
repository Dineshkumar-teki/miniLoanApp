import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import img1 from "../assets/img1.png";

const SignIn = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const handleInput = (e) => {
    setData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3100/auth/sign-in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        Cookies.set("jwtToken", data.token, { expires: 1 });
        localStorage.setItem("user", JSON.stringify(data.rest));
        navigate("/");
      } else {
        setErr(data.message);
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
    <div className="flex justify-evenly items-center h-screen bg-black">
      <div className="hidden w-[45%] lg:flex justify-center items-center">
        <img src={img1} alt="sign-in" className="w-[80%]" />
      </div>
      <div className="w-[90%] md:w-[400px] border border-slate-500 py-10 px-5 bg-white/10 rounded-lg backdrop-blur-lg">
        <h2 className="font-semibold text-3xl text-center text-white">
          Sign-In
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-white font-semibold text-md">
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
            <label htmlFor="role" className="text-white text-md font-semibold">
              Role
            </label>
            <select
              id="role"
              name="role"
              className="p-2 rounded-md outline-none text-md"
              onChange={handleInput}
            >
              <option value="">Select role</option>
              <option value="admin" className="text-black">
                Admin
              </option>
              <option value="user" className="text-black">
                User
              </option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-white font-semibold text-md"
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
          {err && <p className="text-red-500 font-semibold text-sm">{err}</p>}
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-800 to-blue-400 hover:bg-gradient-to-l font-semibold rounded-lg py-2 text-white text-xl"
          >
            Sign in
          </button>
          <button
            type="button"
            className="border-amber-500 hover:border-amber-600 rounded-lg py-1.5 border-2 font-semibold text-white text-lg"
            onClick={() => {
              navigate("/auth/sign-up");
            }}
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
