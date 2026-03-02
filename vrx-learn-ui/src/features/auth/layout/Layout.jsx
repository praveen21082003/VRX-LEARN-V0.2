import { useState } from "react";
import Login from "../pages/Login";
import Forgot from "../pages/Forgot";
import Reset from "../pages/Reset";

function Layout() {
  const [authMode, setAuthMode] = useState("login");


  return (
    <div className="dark:bg-dark hidden lg:flex min-h-screen w-full justify-center items-center bg-white md:bg-surface">
      <div
        className="
      flex 
      w-full 
      max-w-4xl 
      h-auto 
      lg:h-[33rem]
      rounded-xl 
      overflow-hidden 
      bg-white 
      md:shadow-lg
    "
      >
        {/* Left Side */}
        <div className="hidden md:block relative w-[500px] bg-primary overflow-hidden">
          <img
            src="/src/assets/images/Learning-Illustration.png"
            alt="Background Decor"
            className="absolute top-20 left-[-11%] opacity-10 scale-110 pointer-events-none"
          />

          <img
            src="/src/assets/images/Learning-Illustration.png"
            alt="Login Illustration"
            className="absolute bottom-1 right-6 object-contain z-10"
          />
        </div>

        {/* Right Side */}
        <div className="w-[400px] flex flex-col items-center justify-center bg-white py-5 px-8">
          <div className="flex flex-col items-center">
            <img
              src="/VRX-logo.svg"
              alt="VRX Logo"
              className="h-15 w-15 object-contain"
            />
            <h1 className="text-lg font-semibold text-gray-800  ">
              {authMode === "login" && "Welcome Back !"}
              {authMode === "forgot" && "Forgot Password?"}
              {authMode === "reset" && "Reset Password?"}
            </h1>
          </div>
          {authMode === "login" && <Login onForgot={()=>setAuthMode("forgot")}/>}
          {authMode === "forgot" && <Forgot/>}
          {authMode === "reset" && <Reset/>}

        </div>
      </div>
    </div>
  );
}

export default Layout;
