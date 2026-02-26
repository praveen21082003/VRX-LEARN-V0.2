import React, { useState } from "react";
import { Icon, Input, Button } from "@/components/ui";

function Forgot({ onReset, onLogin }) {
  const [warning, setWarning] = useState({ email: "", password: "" });
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email } = credentials;
    if (!email) {
      setWarning((prev) => ({ ...prev, email: "Please provide email" }));
      return;
    }
    console.log("Reset link sent to:", credentials.email);
    onReset();
  };

  return (
    <>
      <p className="text-sm  text-center mb-4 mt-2 ">
        No Worries , Enter your Email Address and we'll send you a link to reset
        your password.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <Input
          name="email"
          label="Email"
          placeholder="Enter your email id"
          paddingClass="p-2"
          icon="ic:outline-email"
          inputWarning={warning.email}
          onChange={handleChange}
          value={credentials.email}
        />

        <Button
          type="submit"
          className="p-2 rounded-lg font-semibold  mt-4 cursor-pointer"
          buttonName="Reset Password"
        />
        <Button
          type="submit"
          bgClass="bg-white"
          textClass="text-black"
          className="rounded-lg p-2 font-semibold "
          buttonName="Back To Login"
          frontIconName="eva:arrow-back-fill"
        />
      </form>
    </>
  );
}

export default Forgot;
