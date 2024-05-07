import React, { useState, useEffect } from "react";
// import { auth } from "../Config/firebase";
import { signOut } from "firebase/auth";
import { auth } from "../Config/firebase";

function LoginInfo() {
  const [userPhotoURL, setUserPhotoURL] = useState();
  const [displayName, setDisplayName] = useState("");
  const [email, setemail] = useState("");

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
    <div className="flex flex-wrap justify-center  content-center">
      <div className="flex p-10 gap-10 w-[40vw] flex-wrap justify-center   h-full Forst noto-sans text-white">
        <img src={userPhotoURL} alt="user" className=" rounded-3xl  w-[10vw] h-[10vw] " />
        <span>
          <h1>Name: {displayName}</h1>
          <h1>{email}</h1>
        </span>
      </div>
    </div>
  );
}

export default LoginInfo;
