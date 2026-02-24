import React, { useState } from 'react'
import { Icon, Input, Button } from "@/components/ui"
import { useAuth } from '@/context/AuthContext';
import { getUserProfile } from '@/services/profile.service'
import { replace, useNavigate } from 'react-router-dom'

function Login() {

    const navigate = useNavigate();

    const { setUser, setLoading } = useAuth();
    const [warning, setWarning] = useState({
        email: "",
        password: ""
    })

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });


    const handleChange = (e) => {
        const { name, value } = e.target;

        setCredentials((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    async function fetchProfile() {
        try {
            setLoading(true);
            const data = await getUserProfile(credentials.email, credentials.password);
            setUser(data[0]);

            if (data[0].role === "TRAINEE") {
                navigate("/dashboard", { replace: true });
            }
            else {
                navigate("/dashboard", { replace: true })
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
            setWarning(prev => ({ ...prev, email: "Please provide email" }))
        }
        if (!credentials.password) {
            setWarning(prev => ({ ...prev, password: "Password can't be empty" }))
        }
        fetchProfile();
    };


    return (
        <>
            <div className="flex flex-col items-center gap-2">
                <img
                    src="/VRX-logo.svg"
                    alt="VRX Logo"
                    className="h-16 w-16 object-contain"
                />

                <h1 className="text-2xl font-semibold text-gray-900">
                    Welcome Back!
                </h1>

                <p className="text-sm text-gray-500">
                    Please login to continue
                </p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-[80%]">
                <Input
                    name="email"
                    label="Email"
                    placeholder="enter your email ID"
                    icon={<Icon name="ic:outline-email" width="18px" height="18px" />}
                    inputWarning={warning.email}
                    onChange={handleChange}
                    value={credentials.email}
                />

                <Input
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="enter your password"
                    icon={<Icon name="material-symbols:lock" width="18px" height="18px" />}
                    inputWarning={warning.password}
                    onChange={handleChange}
                    value={credentials.password}
                />

                <Button type="submit" className="p-3 rounded-lg font-semibold text-sm" buttonName="Login" buttonColor="primary" />
            </form>

        </>
    )
}

export default Login
