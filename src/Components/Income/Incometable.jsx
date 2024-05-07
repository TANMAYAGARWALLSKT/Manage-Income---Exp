import React, { useState, useEffect } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db, auth } from "../../Config/firebase";
import { Input, Select, Button, SelectItem } from "@nextui-org/react";

import { PaymentModelist, typelist } from "../data";

function Incometable() {
  const [Model, SetModel] = useState();
  const [Amount, SetAmount] = useState("0");
  const [PaymentMode, SetPaymentMode] = useState();
  const [Notes, SetNotes] = useState("N/A");
  const [Company, SetCompany] = useState("");
  const moviesCollectionRef = collection(db, "Income");
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [type, settype] = useState("Income");

  const Paymentmodefill = "Cash";
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
        userid: auth?.currentUser?.uid,
      });
      alert("Successfully added");
      document.getElementById("Income").reset();
      SetModel("");
      SetAmount(0);
      SetPaymentMode("");
      SetNotes("");
      SetCompany("");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className=" flex justify-center flex-wrap">
      <h1 className=" text-green-500/60 noto-sans text-[8vw] w-screen flex justify-center ">
       Add {type}
      </h1>
      {/* <div className="  flex flex-wrap     overflow-hidden   w-[50vw] h-full rounded-3xl Forst   text-zinc-100 "> */}
      <form
        id="Income"
        className="Forst w-[80vw] rounded-3xl py-32 px-10"
        onSubmit={handleInput}
      >
        <span className="flex flex-wrap w-full  justify-center content-center gap-20  ">
          <Input
            isRequired
            variant="blacked"
            type="Mdel"
            onChange={(e) => SetModel(e.target.value)}
            label="Model"
            placeholder="Enter your Model"
            size="lg"
            className="bg-zince-950 w-[20vw] "
          />
          <Input
            isRequired
            variant="blacked"
            label=" Payment Mode"
            size="lg"
            type="text"
            id="Payment Mode"
            name="Payment Mode"
            placeholder="Payment Mode"
            list="payment-options"
            className=" w-[20vw]"
            onChange={(e) => SetPaymentMode(e.target.value)}
          >
            {/* {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>} */}
          </Input>
          <Input
            isRequired
            variant="blacked"
            label=" Company Name"
            size="lg"
            type="text"
            id="company"
            name="company"
            placeholder="Enter Phone Company"
            list="phone-companies"
            className=" w-[20vw]"
            onChange={(e) => SetCompany(e.target.value)}
          >
            {/* {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>} */}
          </Input>

          <Input
            items={typelist}
            isRequired
            variant="blacked"
            size="lg"
            label=" Amount"
            type="number"
            id="Amount"
            name="Amount"
            placeholder="Amount"
            className="w-[20vw]"
            onChange={(e) => SetAmount(Number(e.target.value))}
          />
          <Input
            label="Note"
            variant="blacked"
            size="lg"
            type="text"
            placeholder="Note"
            className="w-[20vw]"
            onChange={(e) => SetNotes(e.target.value)}
          />

          <datalist id="payment-options">
            <option value="UPI">UPI</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash">Cash</option>
            <option value="Due">Due</option>
            <option value="Paid">Paid</option>
            <option value="Bajaj">Bajaj</option>
            <option value="Other">Others</option>
          </datalist>
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

          <Button type="submit" className="bg-black w-[20vw]" size="lg">
            Submit
          </Button>
        </span>
      </form>
    </div>
    // </div>
  );
}

export default Incometable;
