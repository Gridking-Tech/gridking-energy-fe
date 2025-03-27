import NavBar from "@/src/shared/NavBar/NavBar";
import Button from "@/src/shared/util/Button";
import Inputs from "@/src/shared/util/Inputs";
import React from "react";

function contact() {
  return (
    <div className="w-screen max-h-screen  items-center flex flex-col ">
      <div className="w-full">
        <NavBar />
      </div>
      <div className="flex flex-col h-screen  overflow-y-hidden justify-center  items-center w-full max-w-lg mt-10 px-6">
        <h1 className="text-4xl text-black font-bold">Sign In</h1>
        <p className="text-sm text-gray-500">
          New Customer?{" "}
          <a href="#" className="text-black font-medium">
            Start here
          </a>
        </p>
        <div className="w-full mt-6 flex flex-col gap-4">
          <Inputs
            text=""
            placeholder="Email"
            className="border-2 outline-0  p-3 text-black rounded-md w-full"
          />
          <Inputs
            text=""
            placeholder="Password"
            className="border-2 outline-0  border-black text-black p-3 rounded-md w-full"
          />
          <a href="#" className="text-right text-sm text-black hover:underline">
            Forgot Password?
          </a>
        </div>
        <Button
          className="w-full bg-black text-white text-lg font-semibold py-3 rounded-lg mt-6"
          title="Sign In"
        />
      </div>
    </div>
  );
}

export default contact;
