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
import { SparklesCore } from "../Components/ui/sparkles";

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
    <div className="">
      <SparklesCore
        background="transparent"
        minSize={0.5}
        maxSize={0.7}
        particleDensity={200}
        className="w-full h-full min-w-screen min-h-screen absolute top-0 left-0 z-10"
        particleColor="#FFFFFF"
      />
      <Routes>
        <Route
          path="/User"
          element={
            <div className=" top-0 shadow-2xl  shadow-black/70 bg-black absolute    right-0 w-[96%] h-[96%] my-[1%] mx-[2%] overflow-hidden rounded-3xl  flex justify-center items-center ">
              <SparklesCore
                background="transparent"
                minSize={0.5}
                maxSize={0.7}
                particleDensity={200}
                className="w-full h-full min-w-screen min-h-screen absolute top-0 left-0 z-10"
                particleColor="#FFFFFF"
              />
              <Auth />
            </div>
          }
        />
        <Route
          path="/Home"
          element={
            <AuthReq>
              <div className="top-0  overflow-hidden shadow-2xl  shadow-black/70 bg-black absolute right-0 w-[83%] h-[96%] my-[1%] mx-[1%] rounded-3xl flex justify-center items-center">
                <Indexpage />
              </div>
            </AuthReq>
          }
        />
        <Route
          path="/"
          element={
            <AuthReq>
              <div className="top-0 shadow-2xl overflow-hidden  shadow-black/70 bg-black absolute right-0 w-[83%] h-[96%] my-[1%] mx-[1%] rounded-3xl flex justify-center items-center">
                <Indexpage />
              </div>
            </AuthReq>
          }
        />
        <Route
          path="/Income"
          element={
            <AuthReq>
              <div className="top-0 shadow-2xl overflow-hidden  shadow-black/70 bg-black absolute right-0 w-[83%] h-[96%] my-[1%] mx-[1%] rounded-3xl flex justify-center items-center">
                <Income />
              </div>
            </AuthReq>
          }
        />
        <Route
          path="/Expenses"
          element={
            <AuthReq>
              <div className="top-0 shadow-2xl overflow-hidden shadow-black/70 bg-black absolute right-0 w-[83%] h-[96%] my-[1%] mx-[1%] rounded-3xl flex justify-center items-center">
                <Expense />
              </div>
            </AuthReq>
          }
        />
        <Route
          path="/Dailybook"
          element={
            <AuthReq>
              <div className="top-0 shadow-2xl overflow-hidden shadow-black/70 bg-black absolute right-0 w-[83%] h-[96%] my-[1%] mx-[1%] rounded-3xl flex justify-center items-center">
                <Testdaily />
              </div>
            </AuthReq>
          }
        />
        <Route
          path="/UserInfo"
          element={
            <AuthReq>
              <div className="top-0 shadow-2xl shaders overflow-hidden shadow-black/70 bg-black absolute right-0 w-[83%] h-[96%] my-[1%] mx-[1%] rounded-3xl flex justify-center items-center">
                <LoginInfo />
              </div>
            </AuthReq>
          }
        />
      </Routes>
    </div>
  );
}

export default Router;
