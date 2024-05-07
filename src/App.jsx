import React, { useState, useEffect } from "react";
import Navbar from "./utils/Navbar";
import Router from "./Config/Router";
import { CanvasRevealEffect } from "./Components/ui/canvas-reveal-effect";
import { auth } from "./Config/firebase";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      unsubscribe();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleBeforeUnload = () => {
    if (auth.currentUser) {
      // Sign out the user before the page is unloaded
      auth.signOut();
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(17,17,21)] h-screen w-screen min-w-screen">
     
      {user ? <Navbar /> : null}
      <Router />
    </div>
  );
}

export default App;
