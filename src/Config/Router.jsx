import React from "react";
import { Route, Routes } from "react-router-dom";
import Income from "../Components/Income/Income";
import App from "../App";
import Expense from "../Components/Expense/Expense";

import Testdaily from "../Components/Dailybook/Testdaily";

function Router() {
  return (
    <Routes>
      <Route path="/income" element={<Income />} />
      <Route path="/Expenses" element={<Expense />} />
      <Route path="/Dailybook" element={<Testdaily />} />
    </Routes>
  );
}

export default Router;
