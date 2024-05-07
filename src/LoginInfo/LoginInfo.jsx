import React, { useState, useEffect } from "react";
// import { auth } from "../Config/firebase";
import { signOut } from "firebase/auth";
import { auth } from "../Config/firebase";
import { Button } from "@nextui-org/react";

function LoginInfo() {
  const [userPhotoURL, setUserPhotoURL] = useState();
  const [displayName, setDisplayName] = useState("");
  const [email, setemail] = useState("");
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
        setDisplayName(user.displayName);
        setemail(user.email);
        // console.log(user);
      } else {
        setUserPhotoURL("https://via.placeholder.com/150");
      }
    });
  });
  return (
    <div className="flex absolute z-50 bg-black/80 w-screen   animate-[Op_3s_ease-in-out]  right-0 top-0  h-screen   flex-wrap justify-center  content-center">
      <div className="flex p-10 gap-10 w-[40vw] relative  flex-wrap justify-center   Forst noto-sans text-white">
        <img
          src={userPhotoURL}
          alt="user"
          className=" rounded-3xl  w-[10vw] h-[10vw] "
        />
        <span className="flex justify-center text-center gap-10 flex-wrap">
          <h1 className=" text-xl">Name: {displayName}</h1>
          <h1 className="flex relative top-[-20%] justify-center w-[40vw]">
            Email-Id : {email}
          </h1>
          <Button className=" relative top-[-20%]" onClick={logout}>
            Sign Out
          </Button>
        </span>
      </div>
    </div>
  );
}

export default LoginInfo;
