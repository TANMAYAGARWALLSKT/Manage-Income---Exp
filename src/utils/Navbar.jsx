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
    <div className="text-zinc-950  pl-4 min-h-screen justify-center flex content-start flex-wrap  w-[5vw]  absolute pr-5   pt-10   z-50 Forst ">
      <NavLink to="/User">
        <User
          className=" mb-10"
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
          }}
        />
      </NavLink>
      <NavLink to="/">
        <h1 className=" text-white h-[3vh  text-[1.25rem] flex justify-center ">
          {time}
        </h1>

        <h1 className=" text-white   h-[3vh]    text-sm flex justify-center   ">
          {date}
        </h1>
      </NavLink>

      <NavLink
        className={(e) => {
          return e.isActive
            ? " bg-green-500/30 p-2 opacity-100    font-bold flex justify-center w-full rounded-xl text-center  mt-5"
            : "  p-2    opacity-80    font-bold flex justify-center w-full rounded-xl text-center  mt-5";
        }}
        to="./income"
      >
        <img src="/profit.png" alt="" />
      </NavLink>
      <NavLink
        className={(e) => {
          return e.isActive
            ? " bg-red-500/30 p-2 rounded-lg   opacity-100   font-bold flex justify-center w-full rounded-l0 text-center mt-5 "
            : "   opacity-100   p-2 rounded-lg   font-bold flex justify-center w-full rounded-l0 text-center mt-5 ";
        }}
        to="./Expenses"
      >
        <img className="w-14" src="/Expen.png" alt="" />
      </NavLink>
      <NavLink
        className={(e) => {
          return e.isActive
            ? "  opacity-100 bg-blue-500/30 p-2   font-bold flex justify-center w-full rounded-lg  text-center mt-5"
            : "   opacity-100 p-2 font-bold flex justify-center w-full rounded-lg  text-center mt-5";
        }}
        to="./DailyBook"
      >
        <img className="w-14" src="/books.png" alt="" />
      </NavLink>
    </div>
  );
}

export default Navbar;
