import React, { useState, useEffect } from 'react'
import { Input, Select, Button } from '@/components/ui'
import { useToast } from '@/context/ToastProvider';
import { useCreateUser } from '../hooks/useCreateUser';


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

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
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

    const { createNewUser, loading, error, } = useCreateUser();
    const { addToast } = useToast();


    const handleAction = async () => {
        if (isEdit) {
            // update logic
        } else {
            try {
                await createNewUser(formData);
                addToast("User created!", "success");
                onSuccess?.();
                onClose?.(); // optional close
            } catch (err) {
                addToast("Create failed", "error");
            }
        }
    };




    return (
        <div className='space-y-4'>
            <Input
                name="username"
                label="Full Name"
                placeholder="John"
                // defaultValue={userData?.name || ""}
                paddingClass="p-2"
                value={formData.username}
                onChange={handleOnChange}
            />
            <Input
                name="email"
                label="Email ID"
                placeholder="example@gmail.com"
                // defaultValue={userData?.email || ""}
                paddingClass="p-2"
                icon="ic:outline-email"
                value={formData.email}
                onChange={handleOnChange}
            />
            <Select
                name="role"
                inputLabel="Role"
                // defaultValue={userData?.role?.toLowerCase() || ""}
                options={roleOptions}
                borderClass="border-input-border"
                value={formData.role}
                onChange={handleOnChange}
            />
            {isEdit && (
                <Select
                    name="status"
                    inputLabel="Status"
                    options={statusOptions}
                    value={formData.status}
                    onChange={handleOnChange}
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
                        onChange={handleOnChange}
                    />
                    <Input
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        icon="material-symbols:lock"
                        paddingClass="p-2"
                        value={formData.confirmPassword}
                        onChange={handleOnChange}
                    />
                </>
            ) : (
                <p
                    className="text-blue-500 font-semibold text-sm cursor-pointer underline font-medium"
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
