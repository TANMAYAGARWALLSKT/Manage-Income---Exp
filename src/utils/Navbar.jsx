import { React, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { User } from "@nextui-org/react";
import { signOut } from "firebase/auth";
import { auth } from "../Config/firebase";
import LoginInfo from "../LoginInfo/LoginInfo";
import { Navlink_Title } from "../Components/data";
<<<<<<< HEAD
import { useDispatch, useSelector } from 'react-redux';
import { toggleNav } from '../Redux';
=======
>>>>>>> origin/main

function Navbar() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [userPhotoURL, setUserPhotoURL] = useState(
    "https://via.placeholder.com/150"
  );
  const [userName, setUserName] = useState(null);
  const [userMail, setUserMail] = useState(null);
  const [showProfile, setShowProfile] = useState(false); // State to control the visibility of the Profile component

<<<<<<< HEAD
  const dispatch = useDispatch();
  const isNavbarOpen = useSelector((state) => state.nav.isNavbarOpen);

=======
>>>>>>> origin/main
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
        setUserName(user.displayName);
        // setUserMail(user.email);
        setUserPhotoURL(user.photoURL);
      } else {
        setUserPhotoURL("https://via.placeholder.com/150");
      }
    });
  });

  const toggleProfile = () => {
    setShowProfile(!showProfile); // Toggle the value of showProfile
    // If showProfile is set to true, set a timeout to hide the Profile component after 10 seconds
    if (!showProfile) {
      setTimeout(() => {
        setShowProfile(false);
      }, 3000); // 10000 milliseconds = 10 seconds
    }
  };
<<<<<<< HEAD

  const toggleNavbar = () => {
    dispatch(toggleNav());
=======
  const [isNavbarOpen, setIsNavbarOpen] = useState(true);

  const toggleNavbar = () => {
    setIsNavbarOpen((prev) => !prev);
>>>>>>> origin/main
  };

  return (
    <div
      className={`${
        isNavbarOpen ? "w-full sm:w-[12.5%]" : "w-20"
      } sticky top-0 left-0 h-full min-h-screen bg-stone-100 text-zinc-800 shadow-md transition-all duration-300 rounded-r-3xl z-50 relative`}
    >
      {/* Arrow to close navbar */}
      <div
        className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 cursor-pointer p-2 rounded-full shadow-lg"
        onClick={toggleNavbar}
      >
        {isNavbarOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 text-gray-700"
          >
            <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 text-gray-700 rotate-180 duration-175 ease-soft-spring"
          >
            <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
          </svg>
        )}
      </div>

      <div className="flex flex-col items-center py-8 gap-6">
        {/* Profile Section */}
        <NavLink
          className={`${
            isNavbarOpen
              ? "flex flex-col items-center gap-2 cursor-pointer"
              : "flex flex-col items-center gap-2 cursor-pointer"
          }`}
          onClick={toggleProfile}
        >
          <img
            className={`${
              isNavbarOpen ? "h-24 w-24" : "h-10 w-10"
            } rounded-full border-2 border-gray-300 object-cover`}
            src={userPhotoURL}
            alt="User Profile"
          />
          <h1
            className={`${
              isNavbarOpen ? "text-xl" : "text-sm"
            } font-medium text-gray-800 text-center`}
          >
            {userName || "Guest"}
          </h1>
        </NavLink>
        {showProfile && <LoginInfo />}

        {/* Navigation Links */}
        <div className="flex flex-col gap-4 w-full px-4">
          {Navlink_Title.map((items, Index) => {
            return (
              <NavLink
                to={items.Link}
                key={Index}
                className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-200 transition-all"
              >
                {/* Dynamic SVG icon */}
                <img
                  src={items.Icon}
                  alt={items.Tilte}
                  className={`${
                    isNavbarOpen ? "w-5 h-5" : "w-10 h-10"
                  } text-gray-700 flex-shrink-0`}
                />
                {isNavbarOpen && (
                  <h1 className="text-sm font-medium text-gray-800 truncate">
                    {items.Tilte}
                  </h1>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
}

<<<<<<< HEAD
export default Navbar;
=======
export default Navbar;
>>>>>>> origin/main
