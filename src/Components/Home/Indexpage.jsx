import React from "react";

import Incometab from "./QuickTab/Incometab";
import Expensetab from "./QuickTab/Expensetab";
import Cashinhand from "./QuickTab/Cashinhand";
import Totalsale from "./QuickTab/Totalsale";
import { CanvasRevealEffect } from "../ui/canvas-reveal-effect";
import { SparklesCore } from "../ui/sparkles";

function Indexpage() {
  return (
    <div className="flex noto-sans w-auto min-h-screen min-w-screen  h-auto pt-10  justify-center content-center gap-20 flex-wrap z-50 ">
      <Incometab />
      <Expensetab />
      <Cashinhand />
      <Totalsale />
    </div>
  );
}

export default Indexpage;
