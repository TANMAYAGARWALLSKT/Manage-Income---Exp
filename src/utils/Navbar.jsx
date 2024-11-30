import { React, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { User } from "@nextui-org/react";
import { signOut } from "firebase/auth";
import { auth } from "../Config/firebase";
import LoginInfo from "../LoginInfo/LoginInfo";
import { Navlink_Title } from "../Components/data";

function Navbar() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [userPhotoURL, setUserPhotoURL] = useState(
    "https://via.placeholder.com/150"
  );
  const [userName, setUserName] = useState(null);
  const [userMail, setUserMail] = useState(null);
  const [showProfile, setShowProfile] = useState(false); // State to control the visibility of the Profile component

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

  return (
    <div className=" sticky top-0 left-0 h-full min-h-screen  bg-stone-200 text-zinc-800 shadow-xl shadow-black/40  navbar-bg w-[12.5%] rounded-r-3xl  z-50">
      <div className="">
        <span className="flex w-full flex-col  py-10  gap-5 items-center">
          {" "}
          <NavLink
            className=" flex justify-start items-center  gap-5 "
            onClick={toggleProfile}
          >
            <img className="rounded-full h-16 " src={userPhotoURL} />
            <span>
              {/* <h1 className=" font-semibold w-full">{userName}</h1> */}
              {/* <h1 className="text-sm font-Extralight ">{userMail}</h1> */}
            </span>
          </NavLink>
          {showProfile && <LoginInfo />}
          <span className="flex flex-col gap-2 justify-center items-center my-auto mx-auto ">
            {Navlink_Title.map((items, Index) => {
              return (
                <span className="flex justify-center items-center my-auto mx-auto ">
                  <NavLink  key={Index} to={items.Link}>
                    <img
                      className=" w-10 h-auto mx-auto my-auto  inline-block  items-center"
                      src={items.Icon}
                    />
                    <h1>{items.Tilte}</h1>
                  </NavLink>
                </span>
              );
            })}
          </span>
        </span>
        {/* <img
          onClick={logout}
          className="w-10  absolute rounded-full  bottom-5"
          src="./logout-svgrepo-com.svg"
          alt=""
        /> */}
      </div>
    </div>
  );
}

export default Navbar;
