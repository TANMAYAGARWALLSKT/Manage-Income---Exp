import React from "react";
import * as XLSX from "xlsx";
import { Button } from "@nextui-org/react";

export default function ExportButton({ data }) {
  const handleExport = () => {
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "Sheet1.xlsx");
  };

  return (
    <Button className="w-30 text-3xl p-10  mt-10" onClick={handleExport} type="Export">
      Export
    </Button>
  );
}
