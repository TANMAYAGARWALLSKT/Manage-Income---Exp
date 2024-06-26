import { React, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { User } from "@nextui-org/react";
import { signOut } from "firebase/auth";
import { auth } from "../Config/firebase";
import LoginInfo from "../LoginInfo/LoginInfo";

function Navbar() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [userPhotoURL, setUserPhotoURL] = useState(
    "https://via.placeholder.com/150"
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
      setDate(new Date().toLocaleDateString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserPhotoURL(user.photoURL);
      } else {
        setUserPhotoURL("https://via.placeholder.com/150");
      }
    });
  });
  const [showProfile, setShowProfile] = useState(false); // State to control the visibility of the Profile component

  const toggleProfile = () => {
    setShowProfile(!showProfile); // Toggle the value of showProfile
    // If showProfile is set to true, set a timeout to hide the Profile component after 10 seconds
    if (!showProfile) {
      setTimeout(() => {
        setShowProfile(false);
      }, 3000); // 10000 milliseconds = 10 seconds
    }
  };

  return (
    <div className="absolute h-screen navbar  rounded-full z-50">
      <div className="flex flex-wrap justify-around gap-4 w-20 h-auto min-h-screen">
        <span>
          {" "}
          <NavLink
            className="w-20 mt-10  flex justify-center"
            onClick={toggleProfile}
          >
            <User
              accessKey="u"
              className=""
              avatarProps={{
                src: userPhotoURL,
              }}
            />
          </NavLink>
          {showProfile && <LoginInfo />}
          {/* Render Profile component if showProfile is true */}
          <NavLink to="/Home">
            <h1 className=" text-white w-20 noto-sans  h-[3vh]  text-[1rem] flex justify-center ">
              {time}
            </h1>

            <h1 className=" text-white w-20 noto-sans text-[0.80rem]    h-[3vh]    text-sm flex justify-center   ">
              {date}
            </h1>
          </NavLink>
          <NavLink
            accessKey="a"
            className={(e) => {
              return e.isActive
                ? "  opacity-100 w-20    bg-green-500/30  flex justify-center content-center border-green-800  border-2 p-1  "
                : "   opacity-100 w-20 flex  justify-center     p-1 ";
            }}
            to="./income"
          >
            <img className="w-10" src="/profit.svg" alt="" />
          </NavLink>
          <NavLink
            accessKey="l"
            className={(e) => {
              return e.isActive
                ? "  opacity-100 bg-red-500/30 w-20  flex justify-center content-center border-red-800  border-2 p-1  "
                : "   opacity-100 flex  justify-center  w-20    p-1 ";
            }}
            to="./Expenses"
          >
            <img className="w-10" src="/expense.svg" alt="" />
          </NavLink>
          <NavLink
            accessKey="b"
            className={(e) => {
              return e.isActive
                ? "  opacity-100 bg-blue-500/30  flex justify-center content-center border-blue-800  border-2 p-1 w-full  "
                : "   opacity-100  flex  justify-center  w-20     p-1  ";
            }}
            to="./DailyBook"
          >
            <img className="w-8 m-2" src="/books.png" alt="" />
          </NavLink>
        </span>
        <img
          onClick={logout}
          className="w-10  absolute rounded-full  bottom-5"
          src="./logout-svgrepo-com.svg"
          alt=""
        />
      </div>
    </div>
  );
}

export default Navbar;
