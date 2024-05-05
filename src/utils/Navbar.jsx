import { React, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { User } from "@nextui-org/react";
import { signOut } from "firebase/auth";
import { auth } from "../Config/firebase";
// import { userPhotoURL } from "../Components/Home/auth/main";
// import { auth } from "../Config/firebase";

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

  // const userPhotoURL = auth.currentUser.photoURL;

  return (
    <div className="absolute h-screen navbar mr-10 rounded-full z-50">
      <div className="flex flex-wrap mt-10 content-center justify-center gap-4 w-[5vw]">
        <NavLink to="/User">
          <User
            accessKey="u"
            className=""
            avatarProps={{
              src: userPhotoURL,
            }}
          />
        </NavLink>

        <NavLink to="/">
          <h1 className=" text-white h-[3vh]  text-[1.25rem] flex justify-center ">
            {time}
          </h1>

          <h1 className=" text-white   h-[3vh]    text-sm flex justify-center   ">
            {date}
          </h1>
        </NavLink>
        <NavLink
          accessKey="p"
          className={(e) => {
            return e.isActive
              ? "  opacity-100 bg-green-500/30  flex justify-center content-center border-green-800  border-2 p-1 w-full  "
              : "   opacity-100     p-1 ";
          }}
          to="./income"
        >
          <img className="w-10" src="/profit.svg" alt="" />
        </NavLink>
        <NavLink
          accessKey="l"
          className={(e) => {
            return e.isActive
              ? "  opacity-100 bg-red-500/30  flex justify-center content-center border-red-800  border-2 p-1 w-full  "
              : "   opacity-100     p-1 ";
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
              : "   opacity-100     p-1  ";
          }}
          to="./DailyBook"
        >
          <img className="w-8 m-2" src="/books.png" alt="" />
        </NavLink>
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
