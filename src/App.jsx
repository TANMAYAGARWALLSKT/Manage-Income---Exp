import React from "react";
import Navbar from "./utils/Navbar";
import Router from "./Config/Router";
import { CanvasRevealEffect } from "./Components/ui/canvas-reveal-effect";

function App() {
  return (
    <div className=" min-h-screen h-full w-full min-w-screen">
       <CanvasRevealEffect
        className=""
        animationSpeed={2}
        containerClassName="bg-black  absolute z-0 "
        colors={[
          [255, 191, 0],
          [255,255,240],
        ]}
        dotSize={2}
      ></CanvasRevealEffect>
      <Navbar />
      <Router />
    </div>
  );
}

export default App;
