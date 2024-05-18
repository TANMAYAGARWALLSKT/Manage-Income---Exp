import React from "react";

import Incometab from "./QuickTab/Incometab";
import Expensetab from "./QuickTab/Expensetab";
import Cashinhand from "./QuickTab/Cashinhand";
import Totalsale from "./QuickTab/Totalsale";
import { CanvasRevealEffect } from "../ui/canvas-reveal-effect";
import { SparklesCore } from "../ui/sparkles";

function Indexpage() {
  return (
    <div className="flex noto-sans w-auto  h-auto pt-10  justify-center content-center gap-20 flex-wrap">
      <SparklesCore
        background="transparent"
        minSize={0.5}
        maxSize={0.7}
        particleDensity={200}
        className="w-auto h-auto absolute top-0 z-0"
        particleColor="#FFFFFF"
      />

      <Incometab />
      <Expensetab />
      <Cashinhand />
      <Totalsale />
    </div>
  );
}

export default Indexpage;
