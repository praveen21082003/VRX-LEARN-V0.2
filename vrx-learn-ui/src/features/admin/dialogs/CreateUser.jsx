import React, { useState } from 'react'
import { Input, Select, Button } from '@/components/ui'


function CreateUser({ isEdit = false, userData = {}, onClose, roles = [], statuses = []  }) {
    const [showResetFields, setShowResetFields] = useState(false);
    
    const roleOptions = roles.map((r) => ({ label: r, value: r.toLowerCase() }));
    const statusOptions = statuses.map((s) => ({ label: s, value: s.toLowerCase() }));

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
                options={roleOptions}
                borderClass="border-input-border"
            />
            {isEdit && (
                <Select
                    inputLabel="Status"
                    defaultValue={userData?.status?.toLowerCase() || "active"}
                    options={statusOptions}
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
