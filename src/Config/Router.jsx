import { React, useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Income from "../Components/Income/Income";
import Expense from "../Components/Expense/Expense";
import Testdaily from "../Components/Dailybook/Testdaily";
import Export from "../Components/Dailybook/Button_export";
import Indexpage from "../Components/Home/Indexpage";
import Auth from "../Components/Home/auth/main";
import { auth } from "./firebase";
import LoginInfo from "../LoginInfo/LoginInfo";

function Router() {
  const [currentAuth, setCurrentAuth] = useState(false);

  useEffect(() => {
    // Listener for Firebase authentication state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        setCurrentAuth(true);
      } else {
        // User is signed out
        setCurrentAuth(false);
      }
    });

    // Cleanup function to unsubscribe from the listener when component unmounts
    return () => unsubscribe();
  }, []);

  const AuthReq = ({ children }) => {
    return currentAuth ? children : <Navigate to="/User" />;
  };

  return (
    <Routes>
      <Route path="/User" element={<Auth />} />
      <Route
        path="/Home"
        element={
          <AuthReq>
            <Indexpage />
          </AuthReq>
        }
      />

      <Route
        path="/"
        element={
          <AuthReq>
            <Indexpage />
          </AuthReq>
        }
      />
      <Route
        path="/Income"
        element={
          <AuthReq>
            <Income />
          </AuthReq>
        }
      />

      <Route
        path="/Expenses"
        element={
          <AuthReq>
            <Expense />
          </AuthReq>
        }
      />

      <Route
        path="/Dailybook"
        element={
          <AuthReq>
            <Testdaily />
          </AuthReq>
        }
      />

      <Route
        path="/UserInfo"
        element={
          <AuthReq>
            <LoginInfo />
          </AuthReq>
        }
      />
    </Routes>
  );
}

export default Router;
