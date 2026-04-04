import React, { useState, useRef, useEffect } from 'react'
import { Icon, Button, Input, Dropdown, MarkdownContent } from '@/components/ui'
import { useOutletContext, NavLink, useNavigate, } from 'react-router-dom'
import ReorderList from '@/components/dnd/ReorderList';
import clsx from 'clsx';
import useModules from '../../courses/hooks/useModules';
import useDeleteMoudule from '../hooks/useDeleteModule';
import { getModuleButtons } from '@/config/DropdownButtons';
import { useToast } from '@/context/ToastProvider';
import { useReorderModules } from '../hooks/useReorderModules'


function ModulesEditor() {

    const isMobile = window.innerWidth < 768;

    const navigate = useNavigate();

    const [isReorderMode, setIsReorderMode] = useState(false);
    const [isOpenDropdown, setIsOpenDropdown] = useState(null);
    const [renameModuleId, setRenameModuleId] = useState(null);
    const [renameValue, setRenameValue] = useState("");
    const [isRename, setIsRename] = useState(false);

    const inputRef = useRef(null);
    const rowRefs = useRef({});


    const { addToast } = useToast();


    const { courseContent, fetchCourseContent, courseSlug } = useOutletContext();
    const [orderedModules, setOrderedModules] = useState([]);

    const { updateModule, moduleError } = useModules();
    const { deleteModule } = useDeleteMoudule();


    const { reorder, isUpdating } = useReorderModules();



    useEffect(() => {
        if (courseContent?.modules) {
            setOrderedModules(courseContent.modules);
        }
    }, [courseContent]);

    useEffect(() => {
        if (renameModuleId && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [renameModuleId]);





    const handleReorder = () => {
        setIsReorderMode(prev => !prev);
    };

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
            setIsRename(true);
            await updateModule(moduleId, { title: newTitle });
            addToast("Module Renamed", "success")
            fetchCourseContent();

            setRenameModuleId(null);
        } catch (error) {
            console.error(error);
            addToast("Error Occured", "error")
        }
        finally{
            setIsRename(false);
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
                    <Button
                        buttonName={clsx(isReorderMode ? "Done" : "Reorder")}
                        frontIconName={clsx(isReorderMode ? "material-symbols:done-rounded" : "ix:reorder")}
                        frontIconWidth="24px" frontIconHeght="24px"
                        className="rounded p-1"
                        bgClass={clsx(isReorderMode && "bg-primary")} textClass={clsx(isReorderMode ? "text-white" : "hover:text-primary hover:dark:text-background")}
                        onClick={handleReorder}
                        isMobile={isMobile}
                    />
                    <NavLink to={`/course/${courseSlug}/content/modules/create`}>
                        <Button
                            buttonName="Add New Module"
                            frontIconName="ic:baseline-plus"
                            frontIconWidth="24px"
                            frontIconHeght="24px"
                            className="p-1 rounded"
                            bgClass=""
                            textClass="hover:text-primary hover:dark:text-background"
                            isMobile={isMobile}
                        />
                    </NavLink>
                </div>
            </div>
            <p className='text-body'> {courseContent?.short_description} </p>
            <ul className="flex flex-col">

                {
                    isReorderMode ?

                        <ReorderList
                            items={orderedModules}
                            reorder={reorder}
                            isUpdating={isUpdating}
                            addToast={addToast}
                            fetchCourseContent={fetchCourseContent}
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
                                                'flex justify-between items-center p-2 lg:px-5 py-3 rounded text-h45 hover:bg-primary/16 dark:hover:bg-primary', isRename ? "cursor-progress" : "cursor-pointer",
                                                (isOpenDropdown === module.id || renameModuleId === module.id) && 'bg-primary/16'
                                            )}
                                        >
                                        <li className="flex items-center gap-2 w-full min-w-0">

                                            <span className="hidden md:block shrink-0 text-muted-foreground">
                                                Module {index + 1} -
                                            </span>

                                            {renameModuleId === module.id ? (
                                                <span className={`flex w-full gap-4`} onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                                                    <Input
                                                        ref={inputRef}
                                                        value={renameValue}
                                                        disabled={isRename}
                                                        autoFocus
                                                        className="text-sm"
                                                        bgClass="bg-primary-border"
                                                        onChange={(e) => setRenameValue(e.target.value)}
                                                        onBlur={() => setRenameModuleId(null)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") {
                                                                setRenameModuleId(null);
                                                                e.preventDefault();
                                                                if (isRename) return;
                                                                const trimmed = renameValue.trim();
                                                                const original = module.title.trim();
                                                                if (trimmed === original) {
                                                                    setRenameModuleId(null);
                                                                    return;
                                                                }

                                                                if (!trimmed) return;

                                                                renameModuleHandler(module.id);
                                                            }

                                                            if (e.key === "Escape") {
                                                                setRenameModuleId(null);
                                                                setRenameValue(module.title);
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
                                            className='relative h-auto flex justify-center'
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
                                                    buttons={getModuleButtons(courseSlug, module.id, handleRename, handleDeleteModule, navigate)}
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
        </div >
    )
}

export default ModulesEditor
