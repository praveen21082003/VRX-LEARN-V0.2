import React from 'react'
import { Input, Select, Button } from '@/components/ui'


function CreateUser() {
    return (
        <div className='space-y-4'>
            <Input
                label="Full Name"
                placeholder="John"
                paddingClass="p-2"
            />
            <Input
                label="Email ID"
                placeholder="example@gmail.com"
                paddingClass="p-2"
                icon="ic:outline-email"
            />
            <Select
                inputLabel="Role"
                options={[
                    { label: "Admin", value: "admin" },
                    { label: "Sub Admin", value: "sub_admin" },
                    { label: "Trainer", value: "trainer" },
                    { label: "Trainee", value: "trainee" }
                ]}
                borderClass="border-input-border"
            />
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
            <div className='flex w-full gap-3'>
                <Button
                    buttonName="Cancle"
                    className="px-4 py-2 rounded-lg w-full"
                    bgClass=""
                    textClass=""
                />
                <Button
                    buttonName="Create User"
                    className="px-4 py-2 rounded-lg w-full"
                />
            </div>
        </div>
    )
}

export default CreateUser
