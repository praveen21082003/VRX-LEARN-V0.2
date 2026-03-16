import React, { useState } from 'react'
import { Input, Select, Button } from '@/components/ui'


function CreateUser({ isEdit = false, userData = {}, onClose }) {
    const [showResetFields, setShowResetFields] = useState(false);
    return (
        <div className='space-y-4'>
            <Input
                label="Full Name"
                placeholder="John"
                defaultValue={userData?.name || ""}
                paddingClass="p-2"
            />
            <Input
                label="Email ID"
                placeholder="example@gmail.com"
                defaultValue={userData?.email || ""}
                paddingClass="p-2"
                icon="ic:outline-email"
            />
            <Select
                inputLabel="Role"
                defaultValue={userData?.role?.toLowerCase() || ""}
                options={[
                    { label: "Admin", value: "admin" },
                    { label: "Sub Admin", value: "sub_admin" },
                    { label: "Trainer", value: "trainer" },
                    { label: "Trainee", value: "trainee" }
                ]}
                borderClass="border-input-border"
            />
            {isEdit && (
                <Select
                    inputLabel="Status"
                    defaultValue={userData?.status?.toLowerCase() || "active"}
                    options={[
                        { label: "Active", value: "active" },
                        { label: "Inactive", value: "inactive" },
                        { label: "Pending", value: "pending" }
                    ]}
                    borderClass="border-input-border"
                />
            )}

              {(!isEdit || showResetFields) ? (
                <>
                    <Input
                        label="Set Password"
                        type="password"
                        icon="material-symbols:lock"
                        paddingClass="p-2"
                    />
                    <Input
                        label="Confirm Password"
                        type="password"
                        icon="material-symbols:lock"
                        paddingClass="p-2"
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
                    buttonName={isEdit ? "Save Changes" : "Create User"}
                    className="px-4 py-2 rounded-lg w-full"
                />
            </div>
        </div>
    )
}

export default CreateUser
