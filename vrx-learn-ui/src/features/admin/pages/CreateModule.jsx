import React, { useState } from 'react'
import { Input, Button, TextEditor } from '@/components/ui'

function CreateModule() {
    const [description, setDescription] = useState("");

    const handleSubmit = () => {
        console.log(description) // Markdown string
        // send to backend
    }
    return (
        <main className="flex-1 min-h-0 overflow-y-auto py-4 px-6">
            <div className='flex justify-between'>
                <h2 className="text-2xl font-semibold flex items-center gap-3">New Module</h2>
            </div>

            <Input
                label="Title"
            // value={formData.name}
            // onChange={(e) => handleChange("name", e.target.value)}
            // bgClass="bg-active"
            />

            <div className="space-y-2">
                <label className="text-sm font-bold">Description</label>
                <TextEditor
                    value={description}
                    onChange={setDescription}
                />
            </div>
            <div className='flex justify-center'>
                <Button buttonName="Save" onClick={handleSubmit} className="mt-5 px-5 py-2 rounded" />
            </div>
        </main>
    )
}

export default CreateModule
