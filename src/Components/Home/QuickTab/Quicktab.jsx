import React from "react";
import { Card, CardHeader } from "@nextui-org/react";
import Incometab from "./Incometab";
import Expensetab from "./Expensetab";
import Cashinhand from "./Cashinhand";
import Totalsale from "./Totalsale";

function Quicktab() {
  return (
    <div className="flex justify-center gap-20 flex-wrap">
      <Incometab />
      <Expensetab />
      <Cashinhand />
      <Totalsale />
    </div>
  );
}

export default Quicktab;
