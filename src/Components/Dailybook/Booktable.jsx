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
<<<<<<< HEAD
    EndDate: new Date().toISOString().split('T')[0],
    StartDate: new Date().toISOString().split('T')[0],
    paymentModeSelect: "",
    typeMode: "",
=======
    EndDate: new Date().toLocaleDateString(),
    StartDate: new Date().toLocaleDateString(),
    paymentModeSelect: null,
    typeMode: null,
>>>>>>> origin/main
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

<<<<<<< HEAD
  React.useEffect(() => {
    fetchDataAndFilter();
  }, []);

=======
>>>>>>> origin/main
  const fetchDataAndFilter = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const selectData = collection(db, "Income");
      let queryRef = query(
        selectData,
<<<<<<< HEAD
        where("userid", "==", auth?.currentUser?.uid)
      );

      if (filters.EndDate) {
        queryRef = query(queryRef, where("Date", ">=", filters.EndDate));
      }
=======
        where("Date", ">=", filters.EndDate),
        where("userid", "==", auth?.currentUser?.uid)
      );
>>>>>>> origin/main
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
<<<<<<< HEAD
    if (value.target === undefined) {
      setFilters(prevFilters => ({
        ...prevFilters,
        [key]: value || ""
      }));
    } else {
      setFilters(prevFilters => ({
        ...prevFilters,
        [key]: value.target.value
      }));
    }
  };

  const resetFilters = () => {
    setFilters({
      EndDate: new Date().toISOString().split('T')[0],
      StartDate: new Date().toISOString().split('T')[0],
      paymentModeSelect: "",
      typeMode: "",
    });
  };

=======
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value.target.value,
    }));
  };
>>>>>>> origin/main
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
<<<<<<< HEAD
    <div className="w-full max-w-[1400px] mx-auto p-2 sm:p-4 pb-5">
      <div className="noto-sans">
        <form onSubmit={handleFilterSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 my-4">
            <Input
              onChange={(e) => handleFilterChange("EndDate", e)}
              value={filters.EndDate}
              className="font-bold w-full"
              type="date"
              label="Start Date"
              placeholder="YYYY-MM-DD"
=======
    <div className=" px-4 pb-5">
      <div className="text-3xl h-full  noto-sans ">
        <form onSubmit={handleFilterSubmit}>
          <span className="flex my-10 h-full w-[80vw] items-center gap-10">
            <Input
              onChange={(e) => handleFilterChange("EndDate", e)}
              value={filters.EndDate}
              className="font-bold"
              type="text"
              label=" Start Date"
>>>>>>> origin/main
            />
            <Input
              onChange={(e) => handleFilterChange("StartDate", e)}
              value={filters.StartDate}
<<<<<<< HEAD
              className="font-bold w-full"
              type="date"
              label="End Date"
              placeholder="YYYY-MM-DD"
            />
            <Select
              selectedKeys={filters.paymentModeSelect ? [filters.paymentModeSelect] : []}
              onChange={(value) => handleFilterChange("paymentModeSelect", value)}
              items={PaymentModelist}
              label="Payment Mode"
              placeholder="Select Mode"
              className="font-extrabold w-full"
=======
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
>>>>>>> origin/main
              isClearable
            >
              {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
            </Select>
            <Select
<<<<<<< HEAD
              selectedKeys={filters.typeMode ? [filters.typeMode] : []}
              onChange={(value) => handleFilterChange("typeMode", value)}
              items={typelist}
              label="Type"
              placeholder="Select Type"
              className="font-bold w-full"
=======
              value={filters.typeMode}
              onChange={(value) => handleFilterChange("typeMode", value)}
              items={typelist}
              label="Type"
              placeholder="Select a Type"
              className="font-bold"
>>>>>>> origin/main
              isClearable
            >
              {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
            </Select>
            <Button
              type="submit"
<<<<<<< HEAD
              className="w-full h-12 text-zinc-100 font-bold text-base sm:text-lg"
=======
              className="text-zinc-100 font-bold w-[6vw] p-6 h-[4vh] text-2xl"
>>>>>>> origin/main
              color="success"
              disabled={loading}
            >
              {loading ? <Spinner /> : "Filter"}
            </Button>
<<<<<<< HEAD
            <Button
              type="button"
              className="w-full h-12 font-bold text-base sm:text-lg"
              color="danger"
              variant="flat"
              onClick={resetFilters}
            >
              Reset
            </Button>
          </div>
        </form>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <div className="overflow-x-auto rounded-lg shadow">
          <Table
            aria-label="Transaction table"
            className="min-w-full bg-content1"
            classNames={{
              wrapper: "shadow-none",
            }}
          >
            <TableHeader>
              <TableColumn className="bg-default-200 text-sm sm:text-base font-bold">Date</TableColumn>
              <TableColumn className="bg-default-200 text-sm sm:text-base font-bold">MODEL</TableColumn>
              <TableColumn className="bg-default-200 text-sm sm:text-base font-bold">Amount</TableColumn>
              <TableColumn className="bg-default-200 text-sm sm:text-base font-bold">Type</TableColumn>
              <TableColumn className="bg-default-200 text-sm sm:text-base font-bold">Payment Mode</TableColumn>
              <TableColumn className="bg-default-200 text-sm sm:text-base font-bold">Notes</TableColumn>
              <TableColumn className="bg-default-200 w-4"></TableColumn>
            </TableHeader>
            <TableBody emptyContent={loading ? "Loading..." : "No data found"}>
              {data.map((item) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-default-100 transition-colors"
                >
                  <TableCell className="text-xs sm:text-sm font-medium">
                    {item.Date}
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm">
                    {item.Model}
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm font-semibold">
                    ₹{Number(item.Amount).toLocaleString('en-IN')}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-block rounded-full px-2 py-1 text-xs sm:text-sm text-white ${
                        item.Type === "Expense"
                          ? "bg-red-500"
                          : "bg-green-500"
                      }`}
                    >
                      {item.Type}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm">
                    {item.PaymentMode}
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm max-w-[200px] truncate">
                    {item.Notes}
                  </TableCell>
                  <TableCell>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      className="text-danger hover:text-danger-400"
                      onClick={() => deleteDocument(item.id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="mt-6 flex justify-end">
          {data.length > 0 && <ExportButton data={data} />}
        </div>
=======
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
>>>>>>> origin/main
      </div>
    </div>
  );
}
