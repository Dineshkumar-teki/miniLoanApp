import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setloading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:3100/loan/getloans");
      const data = await res.json();
      setLoans(data.loans);
      setloading(false);
    } catch (error) {
      setloading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-blue-500 text-3xl font-bold">loading...</p>
        </div>
      ) : (
        <div className="my-10 px-10">
          {loans.length > 0 ? (
            <ul className="flex flex-col gap-3 text-white">
              {loans.map((item) => {
                const handleApprove = async () => {
                  const formData1 = {
                    role: "admin",
                    isApproved: "approved",
                  };
                  try {
                    const res = await fetch(
                      `http://localhost:3100/loan/updateloan/${item._id}`,
                      {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(formData1),
                      }
                    );
                    if (res.status === 200) {
                      alert("updated successfully");
                      fetchData()
                    } else {
                      console.log("something went wrong");
                    }
                  } catch (error) {
                    console.log(error);
                  }
                };
                const handleReject = async () => {
                  const formData1 = {
                    role: "admin",
                    isApproved: "rejected",
                  };
                  try {
                    const res = await fetch(
                      `http://localhost:3100/loan/updateloan/${item._id}`,
                      {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(formData1),
                      }
                    );
                    if (res.status === 200) {
                      alert("updated successfully");
                      fetchData()
                    } else {
                      console.log("something went wrong");
                    }
                  } catch (error) {
                    console.log(error);
                  }
                };
                return (
                  <li
                    key={item._id}
                    className="flex bg-slate-500 py-2 px-5 rounded-md justify-evenly"
                  >
                    <p>Amount: {item.amount}</p>
                    <p>Term: {item.term}</p>
                    <p>Status: {item.isApproved}</p>
                    {item.isApproved === "pending" && (
                      <div className="flex gap-3">
                        <button
                          onClick={handleApprove}
                          className="bg-green-500 px-3 py-1 rounded-sm font-semibold"
                        >
                          Approve
                        </button>
                        <button
                          onClick={handleReject}
                          className="bg-red-500 px-3 py-1 rounded-sm font-semibold"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>no loans received</p>
          )}
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
