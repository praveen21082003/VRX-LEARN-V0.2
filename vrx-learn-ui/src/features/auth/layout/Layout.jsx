import { useState } from "react";
import Login from "../pages/Login";
import Forgot from "../pages/Forgot";
import Reset from "../pages/Reset";
import { useTheme } from "../../dashboard/hook/useTheme";
import Icon from "../../../components/ui/Icon/Icon";
function Layout() {
  const [authMode, setAuthMode] = useState("login");

  const { darkMode, toggleTheme } = useTheme();
  const handleMode = () => {
    toggleTheme();
  };

  return (
    <div className="hidden lg:flex min-h-screen w-full justify-center items-center bg-white md:bg-surface">
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
        <div className="dark:bg-dark-bg hidden md:block relative w-[500px] bg-primary overflow-hidden">
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
        <div className="dark:bg-dark-secondary w-[400px] flex flex-col items-center justify-center bg-white py-5 px-8 ">
          {/*Newly Created*/}
          <div className="mt-0  ml-65 top-5 right-6">
            <button
              onClick={handleMode}
              className={`relative w-20 h-10 rounded-full  flex items-center px-1 transition-all duration-300 ${darkMode ? "bg-dark-bg" : "bg-primary"}`}
            >
              {/* Left Icon */}
              <span className={`z-10 text-xl  h-8 w-8 ${darkMode ? "text-dark-bg" : "text-white"}`}>
                <Icon name="line-md:moon" />{" "}
              </span>

              {/* Right Icon */}
              <span className={`ml-auto z-10  text-lg h-8 w-8 ${darkMode ? "text-white" : "text-dark-bg"}`}>
                <Icon name="eva:sun-fill" />{" "}
              </span>

              {/* White Circle */}
              <div
                className={`absolute top-1 w-8 h-8 rounded-full bg-white shadow-md transition-all duration-300
      ${darkMode ? "left-1" : "right-1"}
    `}
              />
            </button>
          </div>

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
          {authMode === "forgot" && <Forgot onReset={()=>setAuthMode("reset")} onLogin={() => setAuthMode("login")}/>}
          {authMode === "reset" && <Reset onLogin={() => setAuthMode("login")}/>}
          
          
        </div>
      </div>
    </div>
  );
}

export default Layout;
