import React from "react";
import Dailytable from "./Dailytable";

import { SparklesCore } from "../ui/sparkles";

// import"../"
function Expense() {
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
      <SparklesCore
        background="transparent"
        minSize={1}
        maxSize={1}
        particleDensity={100}
        className="w-screen h-screen absolute "
        particleColor="#FFFFFF"
      />
      <Dailytable />
    </>
  );
}

export default Expense;
