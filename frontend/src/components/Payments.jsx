import { useState, useEffect } from "react";

const Payments = () => {
  const [loading, setloading] = useState(true);
  const [loansA, setLoansA] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3100/loan/getloans/${user._id}`
        );
        if (res.ok) {
          const { loans } = await res.json();
          const approvedLoans = loans.filter(
            (item) => item.isApproved === "approved"
          );
          setLoansA(approvedLoans);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setloading(false);
      }
    };
    fetchData();
  }, []);

  console.log(loansA);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-blue-500 text-3xl font-bold">loading...</p>
        </div>
      ) : (
        <>
          {loansA.length > 0 && (
            <section className="py-24 px-10">
              <ul className="flex flex-col gap-10">
                {loansA.map((item) => (
                  <li key={item._id} className="bg-slate-500 rounded-md">
                    <ul className="flex flex-col gap-4 p-5 rounded-md">
                      {item.intervals.map((interval, index) => {
                        return (
                          <li
                            key={index}
                            className="flex gap-5 bg-slate-800 py-1 px-3 justify-evenly items-center rounded-md text-white"
                          >
                            <div className="flex gap-3">
                              <h3 className="font-semibold">Amount to pay: </h3>
                              <p>{interval.emi} rs</p>
                            </div>
                            <div className="flex gap-3">
                              <h3 className="font-semibold">Payment: </h3>
                              <p>{interval.isPaid ? "Done" : "Not done"}</p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default Payments;
