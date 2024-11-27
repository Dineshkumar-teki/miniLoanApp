import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Payments from "./components/Payments";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/sign-in" element={<SignIn />} />
      <Route path="/auth/sign-up" element={<SignUp />} />
      <Route path="/loan/payments" element={<Payments />} />
    </Routes>
  );
};

export default App;
