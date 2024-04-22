import React from "react";
import Navbar from "./Components/Navbar";
import Router from "./Config/Router";
import { BackgroundGradientAnimation } from "../src/Components/ui/background-gradient-animation";

function App() {
  return (
    <div className=" bg-zinc-950  min-h-screen h-full w-full min-w-screen">
      <Navbar />
      <Router />
     
    </div>
  );
}

export default App;
