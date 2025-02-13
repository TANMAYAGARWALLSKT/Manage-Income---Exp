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
    });

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      unsubscribe();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [dispatch]);

  const handleBeforeUnload = () => {
    if (auth.currentUser) {
      // Sign out the user before the page is unloaded
      auth.signOut();
    }
  };

  return (
    <div className="bg-stone-400 Font flex items-center overflow-hidden gap-[1%]">
      {user ? <Navbar /> : null}
      <Router />
    </div>
  );
}

// Main App component wrapped with Provider
function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
