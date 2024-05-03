import React from "react";
import Navbar from "./utils/Navbar";
import Router from "./Config/Router";

function App() {
  return (
    <div className=" bg-blue-400/20   min-h-screen h-full w-full min-w-screen">
      <Navbar />
      <Router />
    </div>
  );
}

export default App;
