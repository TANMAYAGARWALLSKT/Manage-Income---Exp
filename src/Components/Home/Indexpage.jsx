import React from "react";

import Incometab from "./QuickTab/Incometab";
import Expensetab from "./QuickTab/Expensetab";
import Cashinhand from "./QuickTab/Cashinhand";
import Totalsale from "./QuickTab/Totalsale";
import { CanvasRevealEffect } from "../ui/canvas-reveal-effect";
import { SparklesCore } from "../ui/sparkles";

function Indexpage() {
  return (
    // flex flex-wrap justify-center content-center
    <div className="flex noto-sans pt-10 justify-center content-center gap-20 flex-wrap">
      <CanvasRevealEffect
        className="h-screen w-screen"
        animationSpeed={2}
        containerClassName="bg- h-screen w-screen  top-0 absolute z-0 "
        colors={[
          [255, 191, 0],
          [255, 255, 240],
        ]}
        dotSize={2}
      ></CanvasRevealEffect>
      <SparklesCore
        background="transparent"
        minSize={0.5}
        maxSize={0.7}
        particleDensity={200}
        className="w-full h-full absolute top-0 z-0"
        particleColor="#FFFFFF"
      />

      <Incometab  />
      <Expensetab  />
      <Cashinhand  />
      <Totalsale  />
    </div>
  );
}

export default Indexpage;
