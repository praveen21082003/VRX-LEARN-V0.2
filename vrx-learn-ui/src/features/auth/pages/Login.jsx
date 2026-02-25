import React, { useState } from "react";
import { Icon, Input, Button } from "@/components/ui";
import { useAuth } from "@/context/AuthContext";
import { getUserProfile } from "@/services/profile.service";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { setUser, setLoading } = useAuth();
  const [warning, setWarning] = useState({ email: "", password: "" });
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  async function fetchProfile() {
    try {
      setLoading(true);
      const data = await getUserProfile(
        credentials.email,
        credentials.password,
      );
      setUser(data[0]);

      if (data[0].role === "TRAINEE") {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      console.error("Profile fetch failed", err);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.email) {
      setWarning((prev) => ({ ...prev, email: "Please provide email" }));
    }
    if (!credentials.password) {
      setWarning((prev) => ({ ...prev, password: "Password can't be empty" }));
    }

    fetchProfile();
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md xl:max-w-lg  px-8 ">
      {/* Header Section */}
      <div className="flex flex-col items-center gap-3  mb-8 ">
        <img
          src="/VRX-logo.svg"
          alt="VRX Logo"
          className="h-24 w-24 object-contain xl:h-28 xl:w-28  "
        />
        <h1 className="text-2xl sm:text-3xl  lg:text-4xl font-semibold text-gray-800  ">
          Welcome Back!
        </h1>
      </div>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full xl:gap-6 2xl:gap-8 "
    
      >
        <Input
          name="email"
          label="Email" 
          placeholder="Enter your email id"
          icon={<Icon name="ic:outline-email" width="18px" height="18px" />}
          inputWarning={warning.email}
          onChange={handleChange}
          value={credentials.email}
        />

        <div className="flex flex-col gap-1">
          <Input
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            icon={
              <Icon name="material-symbols:lock" width="18px" height="18px" />
            }
            inputWarning={warning.password}
            onChange={handleChange}
            value={credentials.password}
          />
          {/* Forgot Password Link from L2 */}
          <a href="#" className="text-xs text-gray-500 hover:underline mt-1">
            Forgot Password?
          </a>
        </div>

        <Button
          type="submit"
          className="p-4 mt-4 rounded-lg font-bold text-white bg-primary"
          buttonName="Login"
        />
      </form>

      {/* Social Links Section from L2 */}
      <div className="mt-12 flex flex-col items-center gap-4">
        <p className="text-xs text-gray-500 lg:text-sm xl:text-lg">
          Connect with us
        </p>
        <div className="flex gap-4 ">
          {/* <Icon name="mdi:web" className="text-blue-500 text-2xl " /> */}
          <Icon
            name="streamline-plump-color:web"
            className="text-blue-500 text-xl h-8 w-8"
          />
          <Icon
            name="mdi:github"
            className="text-black text-2xl h-8 w-8"
          />
          <Icon
            name="skill-icons:linkedin"
            className="text-blue-700 text-2xl h-8 w-8"
          />
          <Icon
            name="logos:youtube-icon"
            className="text-red-600 text-2xl h-8 w-8"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
