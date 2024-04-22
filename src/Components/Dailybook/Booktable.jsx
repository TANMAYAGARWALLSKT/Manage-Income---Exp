import { React, useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
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
  Calendar,
  Input,
  Button,
} from "@nextui-org/react";
import { PaymentModelist } from "../data";
import { typelist } from "../data";

export default function Booktable() {
  const [data, setData] = useState([]);
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [paymentModeselect, setPaymentModeselect] = useState("null");
  const [Typemode, setTypemode] = useState("null");

  async function fetchDataAndFilter(date, paymentModeselect, Typemode) {
    try {
      const selectdata = collection(db, "Income");
      const queryRef = query(selectdata, where("Date", "<=", date));
      const querySnapshot = await getDocs(queryRef);

      const tempData = [];
      querySnapshot.forEach((doc) => {
        tempData.push({ id: doc.id, ...doc.data() });
      });

      const filteredData = tempData.filter((item) => {
        return (
          (paymentModeselect === "null" ||
            ((Typemode === "null" || item.Type === Typemode) &&
              item.PaymentMode === paymentModeselect)) &&
          date === item.Date
        ); // Assuming item.Date is in the same format as date
      });

      setData(filteredData);
      return filteredData;
    } catch (error) {
      console.warn("Error fetching data: ", error);
      return [];
    }
  }

  function handleDateChange(e) {
    setDate(e.target.value);
  }

  function handlePaymentModeChange(e) {
    setPaymentModeselect(e.target.value);
  }

  function handleTypeChange(e) {
    setTypemode(e.target.value);
  }

  return (
    <div className="w-screen h-full  flex justify-center ">
      <div className="text-3xl h-full  text-white">
        <span className="flex my-10 h-full w-[80vw] items-center gap-10">
          <Input
            onChange={handleDateChange}
            value={date}
            className=" font-bold"
            type="text"
            label="Date"
          />
          

          <Select
            items={PaymentModelist}
            label=" Payment Mode"
            placeholder="Select a  Payment Mode"
            className=" font-extrabold "
            onChange={handlePaymentModeChange}
          >
            {(PaymentModelist) => (
              <SelectItem
                className="font-extrabold text-2xl"
                key={PaymentModelist.value}
              >
                {PaymentModelist.label}
              </SelectItem>
            )}
          </Select>
          <Select
            value={Typemode}
            onChange={handleTypeChange}
            items={typelist}
            label=" Type"
            placeholder="Select a Type"
            className=" font-bold"
          >
            {(PaymentModelist) => (
              <SelectItem key={PaymentModelist.value}>
                {PaymentModelist.label}
              </SelectItem>
            )}
          </Select>
          <Button
            className="text-zinc-700 font-bold w-[6vw] h-[4vh] text-2xl"
            color="success"
            onClick={() =>
              fetchDataAndFilter(date, paymentModeselect, Typemode)
            }
          >
            Filter
          </Button>
        </span>
        <Table
          variant="ghost"
          className="w-[80vw] h-full text-3xl  "
          aria-label="Example static collection table"
        >
          <TableHeader>
            <TableColumn className="text-2xl">Date</TableColumn>
            <TableColumn className="text-2xl">MODEL</TableColumn>
            <TableColumn className="text-2xl">Amount</TableColumn>
            <TableColumn className="text-2xl">Type</TableColumn>
            <TableColumn className="text-2xl"> Payment Mode</TableColumn>
            <TableColumn className="text-2xl">Notes</TableColumn>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow className="text-3xl" key={item.id}>
                <TableCell className="text-2xl font-bold">
                  {item.Date}
                </TableCell>
                <TableCell className="text-2xl">{item.Model}</TableCell>
                <TableCell className="text-2xl">{item.Amount}</TableCell>
                <TableCell id="type" className="text-2xl rounded-3xl h-[6vw]">
                  <spam
                    className={
                      item.Type === "Expense"
                        ? "bg-red-600 p-8 w-10 text-2xl rounded-3xl "
                        : "bg-green-600 p-8  w-10  text-2xl rounded-3xl "
                    }
                  >
                    {item.Type}
                  </spam>
                </TableCell>
                <TableCell className="text-2xl">{item.PaymentMode}</TableCell>
                <TableCell className="text-2xl">{item.Notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
