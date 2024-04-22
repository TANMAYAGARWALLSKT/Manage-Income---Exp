import React, { useState, useEffect } from "react";

import { SparklesCore } from "../ui/sparkles";
import Incometable from "./Incometable";

function Income() {
  return (
    <>
      <SparklesCore
        background="transparent"
        minSize={0.4}
        maxSize={0.8}
        particleDensity={200}
        className="w-screen h-screen absolute "
        particleColor="#FFFFFF"
      />
      <Incometable />
    </>
  );
}

export default Income;
