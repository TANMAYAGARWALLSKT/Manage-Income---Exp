import React, { useState, useCallback } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "../../Config/firebase";

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
  Spinner,
} from "@nextui-org/react";
import { PaymentModelist, typelist } from "../data";
import ExportButton from "./Button_export";

import { DeleteIcon } from "./DeleteIcon.jsx";
import { EditIcon } from "./EditIcon.jsx";

export default function Booktable() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    EndDate: new Date().toLocaleDateString(),
    StartDate: new Date().toLocaleDateString(),
    paymentModeSelect: null,
    typeMode: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDataAndFilter = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const selectData = collection(db, "Income");
      let queryRef = query(
        selectData,
        where("Date", ">=", filters.EndDate),
        where("userid", "==", auth?.currentUser?.uid)
      );
      if (filters.StartDate) {
        queryRef = query(queryRef, where("Date", "<=", filters.StartDate));
      }
      if (filters.paymentModeSelect) {
        queryRef = query(
          queryRef,
          where("PaymentMode", "==", filters.paymentModeSelect)
        );
      }

      if (filters.typeMode) {
        queryRef = query(queryRef, where("Type", "==", filters.typeMode));
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
  }, [filters]);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchDataAndFilter();
  };

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value.target.value,
    }));
  };
  const deleteDocument = async (id) => {
    try {
      const docRef = doc(db, "Income", id.toString());
      await deleteDoc(docRef);
      console.log(`Document with ID ${id} has been deleted.`);
      // Optionally, refetch the data after deleting
      fetchDataAndFilter();
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <div className="w-screen h-full flex justify-center">
      <div className="text-3xl h-full  noto-sans text-white">
        <form onSubmit={handleFilterSubmit}>
          <span className="flex my-10 h-full w-[80vw] items-center gap-10">
            <Input
              onChange={(e) => handleFilterChange("EndDate", e)}
              value={filters.EndDate}
              className="font-bold"
              type="text"
              label=" Start Date"
            />
            <Input
              onChange={(e) => handleFilterChange("StartDate", e)}
              value={filters.StartDate}
              className="font-bold"
              type="text"
              label=" End Date"
            />
            <Select
              value={filters.paymentModeSelect}
              onChange={(value) =>
                handleFilterChange("paymentModeSelect", value)
              }
              items={PaymentModelist}
              label="Payment Mode"
              placeholder="Select a Payment Mode"
              className="font-extrabold"
              isClearable
            >
              {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
            </Select>
            <Select
              value={filters.typeMode}
              onChange={(value) => handleFilterChange("typeMode", value)}
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
              className="text-zinc-100 font-bold w-[6vw] p-6 h-[4vh] text-2xl"
              color="success"
              disabled={loading}
            >
              {loading ? <Spinner /> : "Filter"}
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
            <TableColumn className="text-xl w-4"></TableColumn>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow
                className="text-3xl hover:bg-blue-700/10 rounded-3xl "
                key={item.id}
              >
                <TableCell className="text-2xl rounded-3xl font-bold">
                  {item.Date}
                </TableCell>
                <TableCell className="text-2xl rounded-3xl">
                  {item.Model}
                </TableCell>
                <TableCell className="text-2xl rounded-3xl">
                  {item.Amount}
                </TableCell>
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
                <TableCell className="text-2xl rounded-3xl">
                  {item.PaymentMode}
                </TableCell>
                <TableCell className="text-2xl rounded-3xl">
                  {item.Notes}
                </TableCell>

                <TableCell
                  onClick={() => deleteDocument(item.id)}
                  className="text-2xl  hover:bg-red-500    rounded-3xl"
                >
                  <DeleteIcon />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {data.length > 0 && <ExportButton data={data} />}
      </div>
    </div>
  );
}
