import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../Config/firebase";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Select,
  SelectItem,
  Input,
  Button,
} from "@nextui-org/react";

import { PaymentModelist, typelist } from "../data";

import ExportButton from "./Button_export";

export default function Booktable() {
  const [data, setData] = useState([]);
  const [EndDate, setDate] = useState(new Date().toLocaleDateString());
  const [paymentModeSelect, setPaymentModeSelect] = useState(null);
  const [typeMode, setTypeMode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [StartDate, setStartDate] = useState();

  const handfilter =
    (() => {
      fetchDataAndFilter();
    },
    []); // Fetch data initially on component mount

  const fetchDataAndFilter = async () => {
    setLoading(true);
    setError(null);
    try {
      const selectData = collection(db, "Income");
      let queryRef = query(selectData, where("Date", "==", EndDate));
      if (StartDate) {
        queryRef = query(queryRef, where("Date", "<=", StartDate));
      }
      if (paymentModeSelect) {
        queryRef = query(
          queryRef,
          where("PaymentMode", "==", paymentModeSelect)
        );
      }

      if (typeMode) {
        queryRef = query(queryRef, where("Type", "==", typeMode));
      }

      const querySnapshot = await getDocs(queryRef);

      const tempData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setData(tempData);
    } catch (error) {
      console.warn("Error fetching data: ", error);
      setError("Error fetching data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handlePaymentModeChange = (value) => {
    setPaymentModeSelect(value.target.value); // Update to extract the value from event
  };

  const handleTypeChange = (value) => {
    setTypeMode(value.target.value); // Update to extract the value from event
  };
  const handleStartDateChange = (value) => {
    setStartDate(value.target.value); // Update to extract the value from event
  };

  return (
    <div className="w-screen h-full flex justify-center">
      <div className="text-3xl h-full text-white">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchDataAndFilter();
          }}
        >
          <span className="flex my-10 h-full w-[80vw] items-center gap-10">
            <Input
              onChange={handleDateChange}
              value={EndDate}
              className="font-bold"
              type="text"
              label=" Start Date"
            />
            <Input
              onChange={handleStartDateChange}
              value={StartDate}
              className="font-bold"
              type="text"
              label=" End Date"
            />
            <Select
              value={paymentModeSelect}
              onChange={handlePaymentModeChange}
              items={PaymentModelist}
              label="Payment Mode"
              placeholder="Select a Payment Mode"
              className="font-extrabold"
              isClearable
            >
              {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
            </Select>
            <Select
              value={typeMode}
              onChange={handleTypeChange}
              items={typelist}
              label="Type"
              placeholder="Select a Type"
              className="font-bold"
              isClearable
            >
              {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
            </Select>
            <Button
              type="submit"
              className="text-zinc-100 font-bold w-[6vw] p-8 h-[4vh] text-2xl"
              color="success"
              onClick={handfilter}
              disabled={loading}
            >
              {loading ? "Loading..." : "Filter"}
            </Button>
          </span>
        </form>

        {error && <p className="text-red-500">{error}</p>}

        <Table
          variant="ghost"
          className="w-[80vw] h-full text-3xl"
          aria-label="Example static collection table"
        >
          <TableHeader>
            <TableColumn className="text-2xl">Date</TableColumn>
            <TableColumn className="text-2xl">MODEL</TableColumn>
            <TableColumn className="text-2xl">Amount</TableColumn>
            <TableColumn className="text-2xl">Type</TableColumn>
            <TableColumn className="text-2xl">Payment Mode</TableColumn>
            <TableColumn className="text-2xl">Notes</TableColumn>
          </TableHeader>
          <TableBody >
            {data.map((item) => (
              <TableRow className="text-3xl hover:bg-blue-700/10 rounded-3xl " key={item.id}>
                <TableCell className="text-2xl rounded-3xl font-bold">
                  {item.Date}
                </TableCell>
                <TableCell className="text-2xl rounded-3xl">{item.Model}</TableCell>
                <TableCell className="text-2xl rounded-3xl">{item.Amount}</TableCell>
                <TableCell
                  id="type"
                  className="p-5 text-2xl rounded-3xl w-10 h-[4vw] "
                >
                  <span
                    className={` rounded-3xl h-[3vh]  ${
                      item.Type === "Expense"
                        ? "bg-red-600/60  "
                        : "bg-green-600/60 "
                    }  p-4 w-16`}
                  >
                    {item.Type}
                  </span>
                </TableCell>
                <TableCell className="text-2xl rounded-3xl">{item.PaymentMode}</TableCell>
                <TableCell className="text-2xl rounded-3xl">{item.Notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ExportButton data={data} />
      </div>
    </div>
  );
}
