import React from "react";
import { Route, Routes } from "react-router-dom";
import Income from "../Components/Income/Income";

import Expense from "../Components/Expense/Expense";

import Testdaily from "../Components/Dailybook/Testdaily";
import Export from "../Components/Dailybook/Button_export";
import Indexpage from "../Components/Home/Indexpage";
import Auth from "../Components/Home/auth/main";
function Router() {
  return (
    <Routes>
      <Route path="/User" element={<Auth />} />
      <Route path="/Home" element={<Indexpage />} />
      <Route path="/" element={<Indexpage />} />
      <Route path="/income" element={<Income />} />
      <Route path="/Expenses" element={<Expense />} />
      <Route path="/Dailybook" element={<Testdaily />} />
      <Route path="/Export" element={<Export />} />
    </Routes>
  );
}

export default Router;
