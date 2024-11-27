import React, { useEffect, useState } from "react";
import Loans from "../components/Loans";

const UserDashboard = () => {
  const [formData, setData] = useState({
    amount: "",
    term: "",
  });
  const [loans, setLoans] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setloading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleInput = (e) => {
    setData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData1 = {
        ...formData,
        id: user._id,
      };

      const res = await fetch(`http://localhost:3100/loan/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData1),
      });
      if (res.ok) {
        const data = await res.json();
        const newData = data.message;
        setLoans([...loans, newData]);
        setData({
          amount: "",
          term: "",
        });
        setErr("");
      } else {
        setErr("something went wrong");
      }
    } catch (error) {
      setErr(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3100/loan/getloans/${user._id}`
        );
        const data = await res.json();
        setLoans(data.loans);

        setloading(false);
      } catch (error) {
        setloading(false);
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="flex flex-col justify-center gap-5 items-center min-h-[80vh] py-20">
      <h2 className="text-5xl font-bold">Dashboard</h2>
      <form
        onSubmit={handleSubmit}
        className="w-[90%] md:w-[40%] shadow-md bg-slate-500 py-8 px-5 rounded-lg flex flex-col gap-3"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="amount" className="text-white font-semibold text-md">
            Loan amount
          </label>
          <input
            id="amount"
            type="number"
            value={formData.amount}
            placeholder="Enter loan amount"
            className=" p-2 rounded-md outline-none"
            onChange={handleInput}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="term" className="text-white text-md font-semibold">
            Term
          </label>
          <select
            id="term"
            name="term"
            value={formData.term}
            className="p-2 rounded-md outline-none text-md"
            onChange={handleInput}
          >
            <option value="">Select term</option>
            <option value="3" className="text-black">
              3
            </option>
            <option value="5" className="text-black">
              5
            </option>
            <option value="7" className="text-black">
              7
            </option>
          </select>
        </div>
        {err && <p className="text-red-500">{err}</p>}
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-600 self-end to-pink-500 py-2 px-5 text-white font-semibold w-[150px] rounded-md"
        >
          Apply for loan
        </button>
      </form>
      {/* Lones display component */}
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-blue-500 text-3xl font-bold">loading...</p>
        </div>
      ) : (
        <Loans loans={loans} />
      )}
    </section>
  );
};

export default UserDashboard;
