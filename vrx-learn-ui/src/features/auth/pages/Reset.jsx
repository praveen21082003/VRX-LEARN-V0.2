import React, { useState } from "react";
import { Icon, Input, Button } from "@/components/ui";

export default function Reset({ onLogin }) {
  // const [warning, setWarning] = useState({ email: "", password: "" });
  // const [credentials, setCredentials] = useState({ email: "", password: "" });

  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });

  const [warning, setWarning] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!passwords.password || !passwords.confirmPassword) {
      setWarning((prev) => ({ ...prev, password: "All fields are required" }));
      return;
    }

    if (passwords.password !== passwords.confirmPassword) {
      setWarning((prev) => ({ ...prev, password: "Passwords do not match" }));
      return;
    }
    console.log(
      "Password reset successful : ",
      passwords.password,
      passwords.confirmPassword,
    );
    onLogin();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <Input
          name="password"
          type="password"
          label="New Password"
          placeholder="Enter your new password"
          paddingClass="p-2"
          icon="material-symbols:lock"
          inputWarning={warning.password}
          onChange={handleChange}
          value={passwords.password}
        />

        <Input
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="Confirm password"
          paddingClass="p-2"
          icon="material-symbols:lock"
          inputWarning={warning.password}
          onChange={handleChange}
          value={passwords.confirmPassword}
        />

        <Button
          type="submit"
          className="p-2 rounded-lg font-semibold mt-4 cursor-pointer"
          buttonName="Reset Password"
        />
        <Button
          type="submit"
          onClick={onLogin}
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
