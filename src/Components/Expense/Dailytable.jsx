import React, { useState, useEffect } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../Config/firebase";
import { NavLink } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

function Dailytable() {
  const [Model, SetModel] = useState("N/A");
  const [Amount, SetAmount] = useState("0");
  const [PaymentMode, SetPaymentMode] = useState();
  const [Notes, SetNotes] = useState("N/A");
  const [Company, SetCompany] = useState("N/A");
  const moviesCollectionRef = collection(db, "Income");
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [type, settype] = useState("Expense");
  const toast = useToast();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setDate(new Date().toLocaleDateString());
  }, []);

  const handleinput = async (e) => {
    try {
      e.preventDefault();

      await addDoc(moviesCollectionRef, {
        Amount: Amount,
        Company: Company,
        Notes: Notes,
        PaymentMode: PaymentMode,
        Model: Model,
        Date: date,
        Time: time,
        Type: type,
      });

      document.getElementById("Income").reset();
      alert("Sale added successfully!");
      SetModel("");
      SetAmount(0);

      SetPaymentMode("");
      SetNotes("");
      SetCompany("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className=" pl-[6.5vw] mt-[5vh] flex flex-wrap absolute  ml-[10vw] w-[85vw] h-[90vh] rounded-3xl Forst z-10 top-0  text-zinc-100 ">
        <h1 className="font-bold text-green-600 text-[8vw] w-screen flex justify-center ">
          Add {type}
        </h1>
        <form
          id="Income"
          onSubmit={handleinput}
          className="flex flex-wrap mb-[10vh] gap-20 justify-center place-content-center "
        >
          <div className="flex w-[20vw] flex-wrap">
            <label className="text-7xl p-5 flex justify-center ">Note</label>
            <input
              type="text"
              className="rounded-xl w-[20vw] bg-zinc-800 p-5 text-black text-5xl"
              placeholder="Note"
              onChange={(e) => SetNotes(e.target.value)}
            />
          </div>

          <div className="flex w-[20vw] flex-wrap">
            <label className="text-7xl p-5 flex justify-center">Amount</label>
            <input
              type="number"
              id="Amount"
              name="Amount"
              className="rounded-xl w-[20vw] bg-zinc-800/40 p-5 text-black text-4xl"
              placeholder="Amount"
              onChange={(e) => SetAmount(Number(e.target.value))}
            />
          </div>
          <div className="flex w-[20vw] flex-wrap">
            <label className="text-6xl p-5 flex justify-center">
              Payment Mode
            </label>
            <input
              type="text"
              id="payment-mode"
              name="payment_mode"
              className="rounded-xl bg-zinc-800/40 w-[20vw] hover:border-blue-500 selection:border-blue-500 focus:border-blue-500 type active:border-blue-500 selection:border-2   p-5 text-black text-4xl"
              placeholder="Enter Payment Mode"
              list="payment-options"
              onChange={(e) => SetPaymentMode(e.target.value)}
            />
            <datalist id="payment-options">
              <option value="UPI">UPI</option>
              <option value="Credit Card">C.C</option>
              <option value="Cash">Cash</option>
              <option value="Due">DUE</option>
              <option value="Paid">Paid</option>
              <option value="Bajaj">Bajaj</option>
              <option value="Other">Others</option>
            </datalist>
          </div>

          <div className="flex w-[20vw] flex-wrap">
            <button
              className="text-7xl  bg-red-500/80 w-[20vw] h-[10vh] mt-[7rem]   rounded-full"
              type="submit"
              onClick={() =>
                toast({
                  title: "Successfully added.",
                  status: "success",
                  duration: 1000,
                  isClosable: true,
                })
              }
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Dailytable;
