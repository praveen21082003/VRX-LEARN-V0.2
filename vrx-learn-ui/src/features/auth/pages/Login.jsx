import React, { useState } from "react";
import { Icon, Input, Button } from "@/components/ui";
import { useAuth } from "@/context/AuthContext";
import { getUserProfile } from "@/services/profile.service";
import { useNavigate } from "react-router-dom";
import { hover } from "motion/react";

function Login({ onForgot }) {
    const navigate = useNavigate();
    const { setUser, setLoading } = useAuth();
    const [warning, setWarning] = useState({ email: "", password: "" });
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };

    const icons = [
        { key: "web", name: "mdi:web", navlink: "https://vrnexgen1.com/", hover: "hover:text-blue-500" },
        { key: "linkedin", name: "mdi:linkedin", navlink: "", hover: "hover:text-blue-600" },
        { key: "youtube", name: "mdi:youtube", navlink: "", hover: "hover:text-red-500" },
        { key: "github", name: "mdi:github", navlink: "", hover: "hover:text-black" },
    ]

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
        <>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 w-full"
            >
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
                <div className="flex flex-col gap-1">
                    <Input
                        name="password"
                        type="password"
                        label="Password"
                        placeholder="Enter your password"
                        paddingClass="p-2"
                        icon="material-symbols:lock"
                        inputWarning={warning.password}
                        onChange={handleChange}
                        value={credentials.password}
                    />

                    <p onClick={onForgot} className="text-xs mt-2 text-gray-500 cursor-pointer">
                        Forgot Password?
                    </p>
                </div>
                <Button
                    type="submit"
                    className="p-2 rounded-lg font-semibold text-white bg-primary"
                    buttonName="Login"
                />
            </form>
            <div className="flex gap-3 py-10">
                {icons.map((i) => (
                    <a
                        key={i.key}
                        href={i.navlink}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Icon

                            name={i.name}
                            height="28"
                            width="28"
                            className={`text-gray-600 ${i.hover} transition-colors duration-200`}
                        />
                    </a>
                ))}
            </div>
        </>
    );
}

export default Login;
