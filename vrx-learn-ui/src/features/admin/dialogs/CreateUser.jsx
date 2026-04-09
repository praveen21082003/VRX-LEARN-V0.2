import React, { useState, useEffect } from 'react'
import { Input, Select, Button } from '@/components/ui'
import { useToast } from '@/context/ToastProvider';
import { useUser } from '../hooks/useUser';


function CreateUser({ isEdit = false, userData = {}, onClose, statuses = [], onSuccess }) {
    const [showResetFields, setShowResetFields] = useState(false);

    const roleOptions = [
        { label: "Admin", value: "admin" },
        { label: "Trainer", value: "trainer" },
        { label: "Trainee", value: "trainee" }
    ];
    const statusOptions = statuses.map((s) => ({ label: s, value: s.toLowerCase() }));

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "trainee",
    });

    const [warnings, setWarning] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "trainee",
    })

    const handleOnChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    }

    useEffect(() => {
        if (isEdit && userData) {
            setFormData({
                username: userData.name || "",
                email: userData.email || "",
                password: "",
                confirmPassword: "",
                role: userData.role || "trainee",
            });
        }
    }, [isEdit, userData]);

    const { createNewUser, loading, error, } = useUser();
    const { addToast } = useToast();

    const validateUser = () => {
        let errors = {};

        // Username
        if (!formData.username.trim()) {
            errors.username = "Username is required";
        } else if (formData.username.trim().length < 5) {
            errors.username = "Username must be at least 5 characters";
        }

        // Email
        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ) {
            errors.email = "Enter a valid email address";
        }

        // Password
        if (!formData.password) {
            errors.password = "Password is required";
        }

        // Confirm Password
        if (!formData.confirmPassword) {
            errors.confirmPassword = "Confirm password is required";
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }

        // Role (optional but safe check)
        if (!formData.role) {
            errors.role = "Role is required";
        }

        setWarning(errors);

        return Object.keys(errors).length === 0;
    };


    const handleAction = async () => {
        const isValid = validateUser();

        if (!isValid) return;


        if (isEdit) {
            // update logic
        } else {

            try {
                await createNewUser(formData);

                addToast("User created successfully.", "success");

                onSuccess?.();
                onClose?.();
                setWarning({});

            } catch (err) {
                console.error("Create User Error:", err);

                const status = err?.response?.status;
                const backendMessage = err?.response?.data?.message;

                let message = "Failed to create user. Please try again.";

                if (status === 400) {
                    message = "Invalid input. Please check the entered details.";
                } else if (status === 401) {
                    message = "Session expired. Please login again.";
                } else if (status === 403) {
                    message = "You are not authorized to create users.";
                } else if (status === 409) {
                    message = "User already exists with this email or username.";
                } else if (status === 422) {
                    message = "Please provide valid user information.";
                } else if (status >= 500) {
                    message = "Server error. Please try again later.";
                } else {
                    message = backendMessage
                }

                addToast(message, "error");
            }
        }
    };


    if (isEdit) {
        return (
            <div className="flex flex-col items-center justify-center py-10 text-center space-y-3">
                <div className="text-lg font-semibold text-main">
                    Edit User
                </div>

                <p className="text-sm text-muted">
                    Edit functionality is coming soon 🚧
                </p>

                <Button
                    buttonName="Close"
                    onClick={onClose}
                    className="mt-4 px-4 py-2"
                />
            </div>
        );
    }




    return (
        <div className='space-y-4'>
            <Input
                name="username"
                label="Full Name"
                placeholder="John"
                paddingClass="p-2"
                value={formData.username}
                onChange={(e) => handleOnChange("username", e.target.value)}
                inputWarning={warnings.username}
            />
            <Input
                name="email"
                label="Email ID"
                placeholder="example@gmail.com"
                paddingClass="p-2"
                icon="ic:outline-email"
                value={formData.email}
                onChange={(e) => handleOnChange("email", e.target.value)}
                inputWarning={warnings.email}
            />
            <Select
                name="role"
                inputLabel="Role"
                options={roleOptions}
                borderClass="border-input-border"
                value={formData.role}
                onChange={(val) => handleOnChange("role", val)}
                inputWarning={warnings.role}
            />
            {isEdit && (
                <Select
                    name="status"
                    inputLabel="Status"
                    options={statusOptions}
                    value={formData.status}
                    onChange={handleOnChange}
                    inputWarning={warnings.status}
                />
            )}

            {(!isEdit || showResetFields) ? (
                <>
                    <Input
                        name="password"
                        label="Set Password"
                        type="password"
                        icon="material-symbols:lock"
                        paddingClass="p-2"
                        value={formData.password}
                        onChange={(e) => handleOnChange("password", e.target.value)}
                        inputWarning={warnings.password}
                    />
                    <Input
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        icon="material-symbols:lock"
                        paddingClass="p-2"
                        value={formData.confirmPassword}
                        onChange={(e) => handleOnChange("confirmPassword", e.target.value)}
                        inputWarning={warnings.confirmPassword}
                    />
                </>
            ) : (
                <p
                    className="text-blue-500 text-sm cursor-pointer underline font-medium"
                    onClick={() => setShowResetFields(true)}
                >
                    Reset Password
                </p>
            )}

            <div className='flex w-full gap-3'>
                <Button
                    buttonName="Cancel"
                    className="px-4 py-2 rounded-lg w-full"
                    bgClass=""
                    textClass=""
                    onClick={onClose}
                />
                <Button
                    disabled={loading}
                    buttonName={
                        loading
                            ? "Processing..."
                            : isEdit
                                ? "Save Changes"
                                : "Create User"
                    }
                    className="px-4 py-2 rounded-lg w-full"
                    onClick={handleAction}
                />
            </div>
        </div>
    )
}

export default CreateUser
