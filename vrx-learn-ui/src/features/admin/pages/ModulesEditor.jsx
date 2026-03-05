import React, { useState, useRef, useEffect } from 'react'
import { Icon, Button, Input, Dropdown, MarkdownContent } from '@/components/ui'
import { useOutletContext, NavLink, useNavigate,  } from 'react-router-dom'
import ReorderList from '@/components/dnd/ReorderList';
import clsx from 'clsx';
import useUpdateMoudule from '../hooks/useUpdateModule';
import useDeleteMoudule from '../hooks/useDeleteModule';
import { getButtons } from '@/config/DropdownButtons';
import { useToast } from '@/context/ToastProvider';


function ModulesEditor() {

    const navigate = useNavigate();

    const [isReorderMode, setIsReorderMode] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isOpenDropdown, setIsOpenDropdown] = useState(null);
    const [renameModuleId, setRenameModuleId] = useState(null);
    const [renameValue, setRenameValue] = useState("");

    const inputRef = useRef(null);
    const rowRefs = useRef({});


    const { addToast } = useToast();


    const { modules, moduleloading, moduleError, courseContent, courseSlug } = useOutletContext();
    const [orderedModules, setOrderedModules] = useState(modules || [])
    const { updateModule, loading, error } = useUpdateMoudule();
    const { deleteModule } = useDeleteMoudule();



    useEffect(() => {
        if (!modules) return null
        setOrderedModules(modules);
    }, [modules])

    useEffect(() => {
        if (renameModuleId && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select(); // optional → selects text
        }
    }, [renameModuleId]);


    const handleReorder = () => {
        setIsReorderMode(prev => !prev);
    }

    const handleRename = (moduleId) => {
        const module = orderedModules.find(m => m.id === moduleId);
        setRenameModuleId(moduleId);
        setRenameValue(module?.title || "");
        setIsOpenDropdown(null);
    }






    async function renameModuleHandler(moduleId) {
        const newTitle = renameValue.trim();

        if (!newTitle) return;

        try {
            await updateModule(moduleId, { title: newTitle });

            setOrderedModules(prev =>
                prev.map(m =>
                    m.id === moduleId ? { ...m, title: newTitle } : m
                )
            );
            addToast("Module Renamed", "success")

            setRenameModuleId(null);
        } catch (error) {
            console.error(error);
            addToast("Error Occured", "error")
        }
    }

    const handleDeleteModule = async (moduleId) => {
        try {
            await deleteModule(moduleId);

            setOrderedModules(prev =>
                prev.filter(m => m.id !== moduleId)
            );

            addToast("Module Deleted", "success");
        } catch (error) {
            addToast("Error Occured", "error");
        }
    };

    useEffect(() => {
        function handleClickOutside(e) {
            if (!isOpenDropdown) return;

            const currentRow = rowRefs.current[isOpenDropdown];

            if (currentRow && !currentRow.contains(e.target)) {
                setIsOpenDropdown(null);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpenDropdown]);



    return (
        <div className="space-y-4" onClick={() => setRenameModuleId(null)}>
            <div className='flex justify-between'>
                <h2 className="text-h3">Curriculum</h2>
                <div className='flex gap-3'>
                    <Button buttonName={clsx(isReorderMode ? "Done" : "Reorder")} frontIconName={clsx(isReorderMode ? "material-symbols:done-rounded" : "ix:reorder")} frontIconWidth="24px" frontIconHeght="24px" className="rounded p-1" bgClass={clsx(isReorderMode && "bg-primary")} textClass={clsx(isReorderMode ? "text-white" : "hover:text-primary hover:dark:text-background")} onClick={handleReorder} />
                    <NavLink to={`/courses/${courseSlug}/edit/modules/create`}>
                        <Button buttonName="Add New Module" frontIconName="ic:baseline-plus" frontIconWidth="24px" frontIconHeght="24px" className="p-1 rounded" bgClass="bg-white dark:bg-primary" textClass="hover:text-primary hover:dark:text-background" />
                    </NavLink>
                </div>
            </div>
            <p className='text-body'> {courseContent?.short_description} </p>
            <ul className="flex flex-col">

                {
                    isReorderMode ?

                        <ReorderList
                            items={orderedModules}
                        />

                        :

                        <>
                            {orderedModules.map((module, index) => {
                                const isOpen = isOpenDropdown === module.id;
                                return (
                                    <div
                                        key={module.id}
                                        ref={(el) => (rowRefs.current[module.id] = el)}
                                    >
                                        <NavLink
                                            onDoubleClick={() => navigate(module.id)}
                                            onClick={(e) => {
                                                if (isOpenDropdown === module.id) {
                                                    e.preventDefault();   // stop navigation
                                                    setIsOpenDropdown(null); // close dropdown
                                                }
                                            }}
                                            className={clsx(
                                                'flex justify-between items-center px-5 py-3 rounded text-h45 hover:bg-active cursor-pointer',
                                                isOpenDropdown === module.id || renameModuleId === module.id && 'bg-active'
                                            )}
                                        >
                                            <li className="flex items-center gap-2 w-full min-w-0">

                                                <span className="shrink-0 text-muted-foreground">
                                                    Module {index + 1} -
                                                </span>

                                                {renameModuleId === module.id ? (
                                                    <span className='flex-1' onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                                                        <Input
                                                            ref={inputRef}
                                                            value={renameValue}
                                                            autoFocus
                                                            className="text-sm"
                                                            bgClass="bg-primary-border"
                                                            onChange={(e) => setRenameValue(e.target.value)}
                                                            onBlur={() => setRenameModuleId(null)}
                                                            onKeyDown={(e) => {
                                                                if (e.key === "Enter") {
                                                                    e.preventDefault();
                                                                    renameModuleHandler(module.id);
                                                                }

                                                                if (e.key === "Escape") {
                                                                    setRenameModuleId(null);
                                                                }
                                                            }}
                                                        />

                                                    </span>
                                                ) : (
                                                    <span className="truncate flex-1">
                                                        {module.title}
                                                    </span>
                                                )}

                                            </li>

                                            <div
                                                className='relative w-20 h-auto flex justify-center'
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setIsOpenDropdown(prev =>
                                                        prev === module.id ? null : module.id
                                                    );
                                                }}
                                            >
                                                <Icon name="iconamoon:menu-kebab-horizontal" height="32px" width="32px" className="cursor-help" />

                                                {isOpen && (
                                                    <Dropdown
                                                        buttons={getButtons(module.id, handleRename, handleDeleteModule)}
                                                        closeDropdown={() => setIsOpenDropdown(null)}
                                                    />
                                                )}
                                            </div>
                                        </NavLink>
                                    </div>
                                )
                            })}
                        </>
                }
            </ul>
        </div>
    )
}

export default ModulesEditor
