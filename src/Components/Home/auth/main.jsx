import { React, useState } from "react";
import { Button, Input, Divider } from "@nextui-org/react";
import { auth } from "../../../Config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function Auth() {
  const [isVisible, setIsVisible] = useState(false);
  const navitage = useNavigate();

  const toggleVisibility = () => setIsVisible(!isVisible);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Handlelogin = (e) => {
    e.preventDefault();
    console.log(email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userdit) => {
        const user = userdit.user;

        alert("Account have been created successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const HandleSignup = (e) => {
    e.preventDefault();
    console.log(email, password);
    signInWithEmailAndPassword(auth, email, password)
      .then((userdit) => {
        const user = userdit.user;
        console.log(user);
        navitage("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="bg-black w-screen h-screen flex flex-wrap gap-10 justify-center place-items-center">
      <span className=" absolute bg-black/10 backdrop-blur-xl shadow-lg shadow-yellow-500/5 rounded-3xl px-10 py-16  gap-5   flex justify-center flex-wrap  content-center ">
        <form
          className="flex justify-center content-center  gap-10 flex-wrap w-[20vw]"
          onSubmit={Handlelogin}
        >
          <h1 className=" font-bold text-3xl uppercase ">Log In</h1>
          <Divider className="bg-yellow-500/60" />
          <Input
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            type="email"
            variant="bordered"
            placeholder="Enter your Email"
            className="max-w-xs w-[22vw] "
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            variant="bordered"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            className="max-w-xs w-[22vw] "
          />

          <Button className="bg-yellow-700" type="submit">
            Create An Account
          </Button>
        </form>
        <Divider className="bg-yellow-400/60" />
        <Button onClick={HandleSignup} className="bg-blue-700 ">
          Sign Up{" "}
        </Button>
      </span>
    </div>
  );
}
