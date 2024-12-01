import React, { useState, useEffect, useRef } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../Config/firebase";
import { Input, Button, Textarea, Divider } from "@nextui-org/react";

function Incometable() {
  const [Model, SetModel] = useState("");
  const [Amount, SetAmount] = useState("");
  const [PaymentMode, SetPaymentMode] = useState("");
  const [Notes, SetNotes] = useState("");
  const [Company, SetCompany] = useState("");
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [type] = useState("Income");
  const formRef = useRef(null);

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
    e.preventDefault();
    try {
      await addDoc(collection(db, "Income"), {
        userid: auth?.currentUser?.uid,
        Model: Model,
        Amount: Amount,
        PaymentMode: PaymentMode,
        Company: Company,
        Notes: Notes,
        Date: date,
        Time: time,
        Type: type,
      });
      alert("Successfully added");
      SetModel("");
      SetAmount("");
      SetPaymentMode("");
      SetNotes("");
      SetCompany("");
      ` `;
      formRef.current.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex  px-2 py-5 h-auto -gap-4  rounded-md flex-col justify-evenly  bg-stone-800 z-50   ">
      <div className=" text-green-600 text-6xl uppercase  w-full  font-bold  flex justify-center items-center  ">
        {type}
      </div>
      <Divider className="bg-white/50" />

      <span>
        <form ref={formRef} id="Income" className="" onSubmit={handleInput}>
          <span className="   rounded-xl  flex justify-center gap-3 flex-col px-10 text-black  py-12 w-[40vw] ">
            <Input
              isRequired
              variant="flat"
              type="text"
              value={Model}
              onChange={(e) => SetModel(e.target.value)}
              label="Model"
              placeholder="Enter your Model"
            />
            <Input
              isRequired
              variant="blacked"
              label=" Payment Mode"
              type="text"
              id="Payment Mode"
              name="Payment Mode"
              placeholder="Payment Mode"
              list="payment-options"
              value={PaymentMode}
              onChange={(e) => SetPaymentMode(e.target.value)}
            >
              {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
            </Input>
            <Input
              isRequired
              variant="blacked"
              label=" Company Name"
              type="text"
              id="company"
              name="company"
              placeholder="Enter Phone Company"
              list="phone-companies"
              value={Company}
              onChange={(e) => SetCompany(e.target.value)}
            >
              {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
            </Input>
            <Input
              isRequired
              variant="blacked"
              label="Amount"
              type="number"
              value={Amount}
              onChange={(e) => SetAmount(e.target.value)}
              placeholder="Amount"
              className=""
            />
            <Textarea
              label="Note"
              variant="blacked"
              type="text"
              value={Notes}
              onChange={(e) => SetNotes(e.target.value)}
              placeholder="Note"
              className=""
            />
            <Button type="submit" className="bg-zinc-900 text-white">
              Submit
            </Button>
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
          </span>
        </form>
      </span>
    </div>
  );
}

export default Incometable;
