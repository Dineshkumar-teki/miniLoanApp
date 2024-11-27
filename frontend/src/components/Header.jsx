import logo from "../assets/cloud.png";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    Cookies.remove("jwtToken");
    localStorage.removeItem("user");
    navigate("/auth/sign-in");
  };

  return (
    <header className="py-3 px-10 flex justify-between items-center w-full border-b border-slate-500">
      <img src={logo} alt="logo" className="w-8 object-scale-down" />
      <div className="flex gap-5 self-center">
        {user.role !== "admin" && (
          <p
            className="hover:underline font-semibold self-center"
            onClick={() => navigate("/loan/payments")}
          >
            payments
          </p>
        )}
        <p className="font-semibold self-center">{user.username}</p>
        <button
          className="bg-blue-500 rounded-md text-white font-semibold px-5 py-1.5"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
