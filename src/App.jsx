<<<<<<< HEAD
import React, { useEffect } from "react";
import { Provider } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from "./utils/Navbar";
import Router from "./Config/Router";
import { auth } from "./Config/firebase";
import { store } from './store/store';
import { setUser } from './Redux';

// Create a wrapped component to use Redux hooks
function AppContent() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.nav.user);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      dispatch(setUser(user ? {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      } : null));
=======
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
>>>>>>> origin/main
    });

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      unsubscribe();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
<<<<<<< HEAD
  }, [dispatch]);

  const handleBeforeUnload = () => {
    if (auth.currentUser) {
=======
  }, []);

  const handleBeforeUnload = () => {
    if (auth.currentUser) {
      // Sign out the user before the page is unloaded
>>>>>>> origin/main
      auth.signOut();
    }
  };

  return (
<<<<<<< HEAD
    <div className="bg-stone-400 Font flex items-center overflow-hidden gap-[1%]">
      {user ? <Navbar /> : null}
=======
    <div className="bg-stone-400  Font  flex items-center overflow-hidden  gap-[1%]  ">
      {user ? <Navbar /> : null}

>>>>>>> origin/main
      <Router />
    </div>
  );
}

<<<<<<< HEAD
// Main App component wrapped with Provider
function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
=======
export default App;
>>>>>>> origin/main
