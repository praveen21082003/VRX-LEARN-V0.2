import React, { useState } from 'react'
import { Icon, Button } from '@/components/ui'
import { useOutletContext } from 'react-router-dom'

function ModulesEditor() {
    const [isReorderMode, setIsReorderMode] = useState(false)

    const { modules, moduleloading, moduleError } = useOutletContext();

    const handleReorder = ()=>{
        
    }


    return (
        <div className="space-y-6">
            <div className='flex justify-between'>
                <h2 className="text-2xl font-semibold flex items-center gap-3">Curriculum</h2>
                <div className='flex gap-3'>
                    <Button buttonName="Reorder" frontIconName="ix:reorder" frontIconWidth="24px" frontIconHeght="24px" className="p-1 rounded font-semibold text-md" bgClass="bg-white" textClass="hover:text-primary" onClick={handleReorder}/>
                    <Button buttonName="Add New Module" frontIconName="ic:baseline-plus" frontIconWidth="24px" frontIconHeght="24px" className="p-1 rounded font-semibold text-md" bgClass="bg-white" textClass="hover:text-primary" />
                </div>
            </div>
            <ul className="flex flex-col">
                {modules.map((module, index) => (
                    <div className='flex justify-between items-center px-10 py-3 rounded font-semibold  hover:bg-active'>
                        <li key={module.id} className=''>Module {index + 1} - {module.title}</li>
                        <Icon name="iconamoon:menu-kebab-horizontal" height="32px" width="32px" />
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default ModulesEditor
