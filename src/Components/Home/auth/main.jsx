import React from "react";
import { Button, Input, Divider } from "@nextui-org/react";
// import { EyeFilledIcon } from "./EyeFilledIcon";
// import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { SparklesCore } from "../../ui/sparkles";
import { CanvasRevealEffect } from "../../ui/canvas-reveal-effect";
export default function Auth() {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="bg-black w-screen h-screen flex flex-wrap gap-10 justify-center place-items-center">
      <CanvasRevealEffect
        className="opacity"
        animationSpeed={2}
        containerClassName="bg-black opacity-70 "
        colors={[
          [236, 72, 150],
          [232, 121, 149],
        ]}
        dotSize={0}
      ></CanvasRevealEffect>
      <span className=" absolute bg-black/10 backdrop-blur-xl shadow-lg shadow-yellow-500/5 rounded-3xl py-20 p-10 w-[20vw] gap-5   flex justify-center flex-wrap  content-center ">
        <Input
          label="Email"
          variant="bordered"
          placeholder="Enter your Email"
          className="max-w-xs w-[22vw] "
        />
        <Input
          label="Password"
          variant="bordered"
          placeholder="Enter your password"
          type={isVisible ? "text" : "password"}
          className="max-w-xs w-[22vw]"
        />
      
        <Button>Log In</Button>
      </span>
    </div>
  );
}
