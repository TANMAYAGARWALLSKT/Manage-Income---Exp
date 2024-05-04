import React, { useState } from "react";
import { Button, Input, Divider } from "@nextui-org/react";
import { auth } from "../../../Config/firebase";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    else setPassword(value);
  };

  const handleSubmit = (e, isLogin) => {
    e.preventDefault();
    const authFunction = isLogin
      ? signInWithEmailAndPassword
      : createUserWithEmailAndPassword;
    authFunction(auth, email, password)
      .then((userCred) => {
        const user = userCred.user;
        if (isLogin) navigate("/home");
        else alert("Account has been created successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      console.log(auth);
    } catch (error) {
      console.error("Authentication error:", error.code, error.message);
    }
  };

  return (
    <div className="bg-black w-screen h-screen flex flex-wrap gap-10 justify-center place-items-center">
      <span className="absolute bg-black/10 backdrop-blur-xl shadow-lg shadow-yellow-500/5 rounded-3xl px-10 py-16 gap-5 flex justify-center flex-wrap content-center">
        <form
          className="flex justify-center content-center gap-10 flex-wrap w-[20vw]"
          onSubmit={(e) => handleSubmit(e, false)}
        >
          <h1 className="font-bold text-3xl uppercase">Log In</h1>
          <Divider className="bg-yellow-500/60" />
          <Input
            onChange={handleChange}
            name="email"
            label="Email"
            type="email"
            variant="bordered"
            placeholder="Enter your Email"
            className="max-w-xs w-[22vw]"
          />
          <Input
            onChange={handleChange}
            name="password"
            label="Password"
            variant="bordered"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            className="max-w-xs w-[22vw]"
          />
          <Button className="bg-yellow-700" type="submit">
            Create An Account
          </Button>
        </form>
        <Divider className="bg-yellow-400/60" />
        <Button onClick={(e) => handleSubmit(e, true)} className="bg-blue-700">
          Sign Up
        </Button>
        <Button
          onClick={handleGoogleSignIn}
          className="bg-zinc-200 text-red-600 font-semibold"
        >
          <svg
            className="bg-zinc-300 p-2 rounded-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            width="30px"
            height="30px"
          >
            <path d="M 25.996094 48 C 13.3125 48 2.992188 37.683594 2.992188 25 C 2.992188 12.316406 13.3125 2 25.996094 2 C 31.742188 2 37.242188 4.128906 41.488281 7.996094 L 42.261719 8.703125 L 34.675781 16.289063 L 33.972656 15.6875 C 31.746094 13.78125 28.914063 12.730469 25.996094 12.730469 C 19.230469 12.730469 13.722656 18.234375 13.722656 25 C 13.722656 31.765625 19.230469 37.269531 25.996094 37.269531 C 30.875 37.269531 34.730469 34.777344 36.546875 30.53125 L 24.996094 30.53125 L 24.996094 20.175781 L 47.546875 20.207031 L 47.714844 21 C 48.890625 26.582031 47.949219 34.792969 43.183594 40.667969 C 39.238281 45.53125 33.457031 48 25.996094 48 Z" />
          </svg>
          Sign In With Google
        </Button>
      </span>
    </div>
  );
}
