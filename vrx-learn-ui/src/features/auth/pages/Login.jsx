import React, { useState } from "react";
import { Icon, Input, Button } from "@/components/ui";
import { useAuth } from "@/context/AuthContext";
import { getUserProfile, getMe } from "@/services/profile.service";
import { useNavigate } from "react-router-dom";
import { hover } from "motion/react";

function Login({ onForgot, setWarnMsg }) {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const [loading, setLoading] = useState(false);
    const [warning, setWarning] = useState({ email: "", password: "" });
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };

    const icons = [
        { key: "web", name: "mdi:web", navlink: "https://vrnexgen1.com/", hover: "hover:text-blue-500" },
        { key: "linkedin", name: "mdi:linkedin", navlink: "#", hover: "hover:text-blue-600" },
        { key: "youtube", name: "mdi:youtube", navlink: "#", hover: "hover:text-red-500" },
        { key: "github", name: "mdi:github", navlink: "#", hover: "hover:text-black" },
    ]

    async function fetchProfile() {
        try {
            setLoading(true);
            const data = await getUserProfile(
                credentials.email,
                credentials.password,
            );

            if (data.message === "Logged in successfully") {
                const userData = await getMe();
                setUser(userData);
                navigate("/dashboard", { replace: true });
            }


        } catch (err) {
            console.log("login error", err);

            const status = err.response?.status;

            if (status === 401) {
                setWarnMsg("Invalid email or password.");
            } else if (status === 500) {
                setWarnMsg("Server error. Please try again later.");
            } else {
                setWarnMsg("Something went wrong. Check your connection.");
            }

            console.error("Login Error:", err.response?.data || err.message);

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

        // if (hasError) return;

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
                    bgClass="bg-surface"
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
                        bgClass="bg-surface dark:bg-surface"
                        inputWarning={warning.password}
                        onChange={handleChange}
                        value={credentials.password}
                    />

                    <p onClick={onForgot} className="text-caption text-muted mt-2 cursor-pointer hover:text-brand">
                        Forgot Password?
                    </p>
                </div>
                <Button
                    type="submit"
                    bgClass="bg-primary"
                    className="p-2 rounded-lg"
                    buttonName={loading ? "loging in..." : "Login"}
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
                            className={`text-muted ${i.hover} transition-colors duration-200`}
                        />
                    </a>
                ))}
            </div>
        </>
    );
}

export default Login;
