import React, { useState, useEffect, useRef } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../Config/firebase";
import { Input, Button, Textarea } from "@nextui-org/react";

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
    <div className="flex justify-center w-auto h-auto relative flex-wrap">
      <h1 className="text-green-500/60 noto-sans text-[8vw] w-auto h-auto flex-wrap flex justify-center">
        Add {type}
      </h1>

      <form
        ref={formRef}
        id="Income"
        className="Forst w-[80vw] rounded-3xl py-32 px-10"
        onSubmit={handleInput}
      >
        <span className="flex w-auto h-auto h-min-[100vh] flex-wrap justify-center content-center gap-20">
          <Input
            isRequired
            variant="blacked"
            type="text"
            value={Model}
            onChange={(e) => SetModel(e.target.value)}
            label="Model"
            placeholder="Enter your Model"
            size="lg"
            className="bg-zince-950 w-[20vw]"
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
            value={PaymentMode}
            onChange={(e) => SetPaymentMode(e.target.value)}
          >
            {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
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
            value={Company}
            onChange={(e) => SetCompany(e.target.value)}
          >
            {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
          </Input>
          <Input
            isRequired
            variant="blacked"
            size="lg"
            label="Amount"
            type="number"
            value={Amount}
            onChange={(e) => SetAmount(e.target.value)}
            placeholder="Amount"
            className="w-[20vw]"
          />
          <Textarea
            label="Note"
            variant="blacked"
            size="lg"
            type="text"
            value={Notes}
            onChange={(e) => SetNotes(e.target.value)}
            placeholder="Note"
            className="w-[20vw]"
          />
          <Button type="submit" className="bg-black w-[20vw]" size="lg">
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
    </div>
  );
}

export default Incometable;
