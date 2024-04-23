import React from "react";
import { Route, Routes } from "react-router-dom";
import Income from "../Components/Income/Income";
import App from "../App";
import Expense from "../Components/Expense/Expense";

import Testdaily from "../Components/Dailybook/Testdaily";
import Export from "../Components/Dailybook/Button_export";
function Router() {
  return (
    <Routes>
      <Route path="/income" element={<Income />} />
      <Route path="/Expenses" element={<Expense />} />
      <Route path="/Dailybook" element={<Testdaily />} />
      <Route path="/Export" element={<Export />} />
    </Routes>
  );
}

export default Router;
