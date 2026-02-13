import React, { useState, useEffect } from 'react'
import { Icon, Button } from '@/components/ui'
import { useOutletContext, NavLink } from 'react-router-dom'
import ReorderList from '@/components/dnd/ReorderList';
import clsx from 'clsx';

function ModulesEditor() {
    const [isReorderMode, setIsReorderMode] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false)


    const { modules, moduleloading, moduleError,courseSlug } = useOutletContext();
    const [orderedModules, setOrderedModules] = useState(modules || [])



    useEffect(() => {
        if (!modules) return null
        setOrderedModules(modules);
    }, [modules])


    const handleReorder = () => {
        setIsReorderMode(prev => !prev);
    }


    return (
        <div className="space-y-6">
            <div className='flex justify-between'>
                <h2 className="text-2xl font-semibold flex items-center gap-3">Curriculum</h2>
                <div className='flex gap-3'>
                    <Button buttonName={clsx(isReorderMode ? "Save" : "Reorder")} frontIconName={clsx(isReorderMode ? "material-symbols:done-rounded" : "ix:reorder")} frontIconWidth="24px" frontIconHeght="24px" className="p-1 rounded font-semibold text-md" bgClass={clsx(isReorderMode ? "bg-primary" : "bg-white")} textClass={clsx(isReorderMode ? "text-white" : "text-black hover:text-primary")} onClick={handleReorder} />
                    <NavLink to={`/admin/courses/${courseSlug}/create`}>
                        <Button buttonName="Add New Module" frontIconName="ic:baseline-plus" frontIconWidth="24px" frontIconHeght="24px" className="p-1 rounded font-semibold text-md" bgClass="bg-white" textClass="hover:text-primary" />
                    </NavLink>

                </div>
            </div>
            <ul className="flex flex-col">

                {
                    isReorderMode ?

                        <ReorderList
                            items={orderedModules}
                        />

                        :

                        <>
                            {modules.map((module, index) => (
                                <div key={module.id} className='flex justify-between items-center px-5 py-3 rounded font-semibold  hover:bg-active'>
                                    <li className=''>Module {index + 1} - {module.title}</li>
                                    <Icon name="iconamoon:menu-kebab-horizontal" height="32px" width="32px" />
                                </div>
                            ))}
                        </>
                }
            </ul>
        </div>
    )
}

export default ModulesEditor
