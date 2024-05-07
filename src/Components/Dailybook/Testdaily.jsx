import React from "react";
import { SparklesCore } from "../ui/sparkles";
import Booktable from "./Booktable.jsx";
// import { CanvasRevealEffect } from "../ui/canvas-reveal-effect.js";

export default function Testdaily() {
  return (
    <div className="w-full h-full overflow-x-hidden">
      <SparklesCore
        background="transparent"
        minSize={0.2}
        maxSize={0.5}
        particleDensity={120}
        className="w-full h-full absolute z-0"
        particleColor="#FFFFFF"
      />
     

      <Booktable />
    </div>
  );
}
