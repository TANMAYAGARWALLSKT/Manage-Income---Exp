import React, { useState, useEffect } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../Config/firebase";
import { useToast } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";

import { SparklesCore } from "../ui/sparkles";

function Incometable() {
  // const Income = collection(db, "movies");
  const [Model, SetModel] = useState();
  const [Amount, SetAmount] = useState("0");
  const [PaymentMode, SetPaymentMode] = useState();
  const [Notes, SetNotes] = useState();
  const [Company, SetCompany] = useState("");
  const moviesCollectionRef = collection(db, "Income");
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [type, settype] = useState("Income");

  // Update the state with the formatted time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setDate(new Date().toLocaleDateString());
  }, []);

  const handleInput = async (e) => {
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
      alert("Successfully added");
      document.getElementById("Income").reset();
      SetModel("");
      SetAmount(0);
      SetPaymentMode("");
      SetNotes("");
      SetCompany("");
    } catch (error) {
      console.error(error);
    }
  };
  const toast = useToast();
  return (
    <>
      <div className=" pl-[6.5vw] mt-[5vh] flex flex-wrap  ml-[10vw] w-[85vw] h-[80vh] rounded-3xl Forst z-10 absolute top-0  text-zinc-100 ">
        <h1 className="font-bold text-green-600 text-[8vw] w-screen flex justify-center ">
          Add {type}
        </h1>
        <form
          id="Income"
          onSubmit={handleInput}
          className=" flex flex-wrap p-20 pb-32 justify-between place-items-center  "
        >
          <div className=" w-">
            <label className=" text-6xl p-5 flex justify-center ">Model</label>
            <Input
              size="lg"
              type="text"
              className="rounded-xl w-[20vw] p-5  bg-zinc-900/40 text-black text-5xl"
              placeholder="Enter Model Name"
              onChange={(e) => SetModel(e.target.value)}
            />
          </div>
          <div className="">
            <label className="text-6xl p-5 flex justify-center  ">
              Payment Mode
            </label>
            <Input
              size="lg"
              type="text"
              id="payment-mode"
              name="payment_mode"
              className="rounded-xl bg-zinc-900   w-[20vw] p-5 text-black text-4xl"
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
          <div className="">
            <label className="text-6xl p-5 flex justify-center ">Company</label>
            <Input
              size="lg"
              type="text"
              id="company"
              name="company"
              className="rounded-xl w-[20vw] bg-zinc-900/40 p-5 text-black text-4xl"
              placeholder="Enter Phone Company"
              list="phone-companies"
              onChange={(e) => SetCompany(e.target.value)}
            />
            <datalist id="phone-companies">
              <option value="Apple">Apple</option>
              <option value="Samsung">Samsung</option>
              <option value="Realme">Realme</option>
              <option value="Vivo">Vivo</option>
              <option value="OnePlus">OnePlus</option>
              <option value="Mi">Mi</option>
              <option value="Nokia">Nokia</option>
              <option value="Oppo">Oppo</option>
              <option value="Other">Other</option>
            </datalist>
          </div>

          <div className="">
            <label className="text-6xl p-5 flex justify-center ">Amount</label>
            <Input
              size="lg"
              type="number"
              id="Amount"
              name="Amount"
              className="rounded-xl w-[20vw] bg-zinc-900/40 p-5 text-black text-4xl"
              placeholder="Amount"
              onChange={(e) => SetAmount(Number(e.target.value))}
            />
          </div>
          <div className="">
            <label className="text-6xl p-5 flex justify-center  ">Note</label>
            <Input
              size="lg"
              type="text"
              className="rounded-xl w-[20vw] bg-zinc-900/40 p-5 text-black text-5xl"
              placeholder="Note"
              onChange={(e) => SetNotes(e.target.value)}
            />
          </div>
          <div className="text-6xl p-5 flex justify-center ">
            <button
              className="text-7xl  bg-green-500/40 w-[20vw] h-[10vh] mt-[7rem]   rounded-full"
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

export default Incometable;
