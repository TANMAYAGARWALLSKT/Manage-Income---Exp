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
<<<<<<< HEAD
import { useSelector } from 'react-redux';

function Router() {
  const [currentAuth, setCurrentAuth] = useState(false);
  const isNavbarOpen = useSelector((state) => state.nav.isNavbarOpen);
  const user = useSelector((state) => state.nav.user);
=======

function Router() {
  const [currentAuth, setCurrentAuth] = useState(false);
>>>>>>> origin/main

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
<<<<<<< HEAD
    <div>
=======
    <div className=" ">
>>>>>>> origin/main
      <div>
        <SparklesCore
          background="transparent"
          minSize={0.5}
          maxSize={0.7}
          particleDensity={200}
          className="w-full h-full absolute top-0 left-0 z-10"
          particleColor="#A8A29E"
        />
        <Routes>
          <Route
            path="/User"
            element={
<<<<<<< HEAD
              <div className="top-0 shadow-2xl shadow-black/70 bg-black absolute right-0 w-full sm:w-[96%] h-[96%] my-[1%] mx-0 sm:mx-[2%] overflow-hidden rounded-3xl flex justify-center items-center">
=======
              <div className=" top-0 shadow-2xl  shadow-black/70 bg-black absolute    right-0 w-[96%] h-[96%] my-[1%] mx-[2%] overflow-hidden rounded-3xl  flex justify-center items-center ">
>>>>>>> origin/main
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
<<<<<<< HEAD
          
          {/* Shared styles for authenticated routes */}
          {[
            { path: "/Home", Component: Indexpage },
            { path: "/Dashboard", Component: Indexpage },
            { path: "/", Component: Indexpage },
            { path: "/Income", Component: Income },
            { path: "/Expenses", Component: Expense },
            { path: "/Dailybook", Component: Testdaily },
            { path: "/UserInfo", Component: LoginInfo }
          ].map(({ path, Component }) => (
            <Route
              key={path}
              path={path}
              element={
                <AuthReq>
                  <div className={`
                    top-0 
                    shadow-2xl 
                    overflow-hidden 
                    shadow-black/70 
                    bg-black 
                    absolute 
                    right-0 
                    w-full 
                    sm:w-[83%] 
                    h-[96%] 
                    my-[1%] K
                    mx-0
                    sm:mx-[1%] 
                    rounded-3xl 
                    flex 
                    justify-center 
                    items-center
                    transition-[width,margin]
                    duration-300
                    ease-in-out
                    delay-200
                    ${!isNavbarOpen ? 'sm:w-[92%]' : 'sm:w-[83%]'}
                  `}>
                    <Component />
                  </div>
                </AuthReq>
              }
            />
          ))}
=======
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
>>>>>>> origin/main
        </Routes>
      </div>
    </div>
  );
}

<<<<<<< HEAD
export default Router;
=======
export default Router;
>>>>>>> origin/main
