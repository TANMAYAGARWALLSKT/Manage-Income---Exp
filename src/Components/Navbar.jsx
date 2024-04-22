import { React, useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";

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
    <div className="text-zinc-950  min-h-screen  rounded-t-md rounded-b-md  w-[5vw]  absolute pr-5    z-50 Forst font-semibold  text-[0.8vw]  ">
      <h1 className=" text-white   h-[3vh]  flex justify-center mt-3 ml-3   ">
        {date}
      </h1>
      <h1 className=" text-white h-[3vh]  text-[1.1vw] flex justify-center mt-4 ml-3">
        {time}
      </h1>
      <NavLink
        className={(e) => {
          return e.isActive
            ? " bg-green-500/30 p-2 opacity-100 backdrop-blur-lg   font-bold flex justify-center w-full rounded-xl text-center  mt-10"
            : "  p-2    opacity-80 backdrop-blur-lg   font-bold flex justify-center w-full rounded-xl text-center  mt-10";
        }}
        to="./income"
      >
        <img
          className="w-14 bg-transparent"
          src="./src\assets\profit.png"
          alt=""
        />
      </NavLink>
      <NavLink
        className={(e) => {
          return e.isActive
            ? " bg-red-500/30 p-2 rounded-lg   opacity-100   font-bold flex justify-center w-full rounded-l0 text-center mt-10 "
            : "   opacity-100   p-2 rounded-lg   font-bold flex justify-center w-full rounded-l0 text-center mt-10 ";
        }}
        to="./Expenses"
      >
        <img className="w-14" src="src\assets\Expen.png" alt="" />
      </NavLink>
      <NavLink
        className={(e) => {
          return e.isActive
            ? "  opacity-100 bg-blue-500/30 p-2   font-bold flex justify-center w-full rounded-lg  text-center mt-10"
            : "   opacity-100 p-2 font-bold flex justify-center w-full rounded-lg  text-center mt-10";
        }}
        to="./DailyBook"
      >
        <img className="w-14" src="src\assets\books.png" alt="" />
      </NavLink>
    </div>
  );
}

export default Navbar;
