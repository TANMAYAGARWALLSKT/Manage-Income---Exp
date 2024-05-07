import React, { useState, useEffect } from "react";

import { SparklesCore } from "../ui/sparkles";
import Incometable from "./Incometable";

function Income() {
  return (
    <div className="flex flex-wrap justify-center content-center">
      {/* <h1 className="text-6xl mb-10  absolute  top-10  ">Add Income</h1> */}
      <Incometable />
    </div>
  );
}

export default Income;
