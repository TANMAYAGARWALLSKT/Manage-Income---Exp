import React, { useState, useEffect } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../Config/firebase";
import { Input, Button } from "@nextui-org/react";

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
        userid: auth?.currentUser?.uid,
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
    <div className="flex  flex-wrap justify-center pt-[10vh]">
      <div className="flex flex-wrap  overflow-hidden  w-[80vw] h-[80vh] rounded-3xl Forst   text-zinc-100 ">
        <h1 className="font-bold text-red-600 text-[8vw] w-screen flex justify-center ">
          Add {type}
        </h1>
        <form
          id="Income"
          onSubmit={handleinput}
          className="flex flex-wrap mb-[10vh] gap-20 justify-center place-content-center "
        >
          <span className="flex flex-wrap w-[80vw] justify-center content-center gap-10 ">
            <Input
              label="Note"
              className="w-[22vw]"
              type="text"
              size="lg"
              placeholder="Note"
              onChange={(e) => SetNotes(e.target.value)}
            />

            <Input
              label="Amount"
              className="w-[22vw]"
              type="number"
              id="Amount"
              name="Amount"
              size="lg"
              placeholder="Amount"
              onChange={(e) => SetAmount(Number(e.target.value))}
            />

            <Input
              label="Payment Mode"
              className="w-[22vw]"
              type="text"
              id="payment-mode"
              name="payment_mode"
              size="lg"
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

            <Button
              // className="text-7xl  bg-red-500/80 w-[20vw] h-[10vh] mt-[7rem]   rounded-full"
              type="submit"
              size="lg"
              className="w-[22vw] h-20"
            >
              Submit
            </Button>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Dailytable;
