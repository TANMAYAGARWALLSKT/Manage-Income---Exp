import React from "react";

import Incometab from "./QuickTab/Incometab";
import Expensetab from "./QuickTab/Expensetab";
import Cashinhand from "./QuickTab/Cashinhand";
import Totalsale from "./QuickTab/Totalsale";

function Indexpage() {
  return (
    <div className="flex justify-center gap-20 flex-wrap">
      <Incometab />
      <Expensetab />
      <Cashinhand />
      <Totalsale />
    </div>
  );
}

export default Indexpage;
