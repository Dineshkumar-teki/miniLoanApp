import React, { useState, useEffect } from "react";

const Loans = ({ loans }) => {
  return (
    <>
      {loans.length > 0 && (
        <ul className="flex flex-col gap-3 text-white">
          {loans.map((item) => {
            return (
              <li
                key={item._id}
                className="flex gap-5 w-full bg-slate-500 py-2 px-5 rounded-md justify-evenly"
              >
                <p>Amount: {item.amount}</p>
                <p>Term: {item.term}</p>
                <p>Weekly Installments: {item.intervals[0].emi}</p>
                <p>Status: {item.isApproved}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default Loans;
