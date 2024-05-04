import { React, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { User } from "@nextui-org/react";

function Navbar() {
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setDate(new Date().toLocaleDateString());
  }, []);
  return (
    <div className="absolute h-screen navbar mr-10 rounded-full z-50">
      <div className="flex flex-wrap mt-10 content-center justify-center gap-4 w-[5vw]">
        <NavLink to="/User">
          <User
            accessKey="u"
            className=""
            avatarProps={{
              src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
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
      </div>
    </div>
  );
}

export default Navbar;
