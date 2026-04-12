import React, { useState, useRef, useEffect } from 'react'
import { Icon, Button, Input, Dropdown, Modal, EmptyStateUI, ContentLoading, DeleteConfirmContent } from '@/components/ui'
import { useOutletContext, NavLink, useNavigate, } from 'react-router-dom'
import ReorderList from '@/components/dnd/ReorderList';
import clsx from 'clsx';
import useModules from '../../courses/hooks/useModules';
import useDeleteMoudule from '../hooks/useDeleteModule';
import { getModuleButtons } from '@/config/DropdownButtons';
import { useToast } from '@/context/ToastProvider';
import { useReorder } from '../hooks/useReorder';
// import { useClickOutside } from '../../../hooks/useClickOutside';


function ModulesEditor() {

    const isMobile = window.innerWidth < 768;

    const navigate = useNavigate();

    const [isReorderMode, setIsReorderMode] = useState(false);
    const [isOpenDropdown, setIsOpenDropdown] = useState(null);
    const [renameModuleId, setRenameModuleId] = useState(null);
    const [renameValue, setRenameValue] = useState("");
    const [isRename, setIsRename] = useState(false);

    const [deleteModuleId, setDeleteModuleId] = useState(null);

    const inputRef = useRef(null);
    const rowRefs = useRef({});


    const { addToast } = useToast();


    const { courseContent, fetchCourseContent, setCourseContent, loading, courseSlug } = useOutletContext();


    const [orderedModules, setOrderedModules] = useState([]);

    const { updateModule, moduleError } = useModules();
    const { deleteModule, loading: isDeleting } = useDeleteMoudule();


    const { reorderModules, isUpdating } = useReorder();



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

            setCourseContent(prev => ({
                ...prev,
                modules: prev.modules.map(m =>
                    m.id === moduleId
                        ? { ...m, title: newTitle }
                        : m
                )
            }));

            addToast("Module Renamed", "success");
            setRenameModuleId(null);
        } catch (error) {
            console.error(error);
            addToast("Error Occured", "error")
        }
        finally {
            setIsRename(false);
        }
    }

    const handleDeleteModule = async (moduleId) => {
        try {
            await deleteModule(moduleId);
            await fetchCourseContent(courseSlug);

            setOrderedModules(prev =>
                prev.filter(m => m.id !== moduleId)
            );

            addToast("Module deleted successfully.", "success");

        } catch (error) {
            const status = error?.response?.status;

            let message = "Failed to delete module. Please try again.";

            if (status === 400) {
                message = "Invalid request. Unable to delete module.";
            } else if (status === 401) {
                message = "Session expired. Please log in again.";
            } else if (status === 403) {
                message = "You do not have permission to delete this module.";
            } else if (status === 404) {
                message = "Module not found. It may have already been deleted.";
            } else if (status === 409) {
                message = "This module cannot be deleted due to existing dependencies.";
            } else if (status === 500) {
                message = "Server error. Please try again later.";
            }

            addToast(message, "error");
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
                        disabled={orderedModules?.length === 0}
                        title={orderedModules?.length === 0 ? "no modules at" : "reorder"}
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

            <p className="text-body">
                {courseContent?.course?.shortDescription || "No short description available"}
            </p>

            <ul className="flex flex-col">

                {isReorderMode ?

                    <ReorderList
                        items={orderedModules}
                        reorder={reorderModules}
                        isUpdating={isUpdating}
                        addToast={addToast}
                        onReorderUI={(newOrder) => {
                            setOrderedModules(newOrder);

                            setCourseContent(prev => ({
                                ...prev,
                                modules: newOrder
                            }));
                        }}
                    />
                    : loading ? (
                        <div className="h-full w-full">
                            <ContentLoading count={7} />
                        </div>
                    )
                        : orderedModules?.length > 0 ? (

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
                                                    className='relative h-auto flex justify-center mr-5'
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
                                                            buttons={getModuleButtons(courseSlug, module.id, handleRename, setDeleteModuleId, navigate)}
                                                            closeDropdown={() => setIsOpenDropdown(null)}
                                                        />
                                                    )}
                                                    {deleteModuleId === module.id && (
                                                        <Modal
                                                            isOpen={true}
                                                            onClose={() => setDeleteModuleId(null)}
                                                            title="Are you absolutely sure?"
                                                        >
                                                            <DeleteConfirmContent
                                                                onClose={() => setDeleteModuleId(null)}
                                                                onConfirm={() => handleDeleteModule(module.id)}
                                                                loading={isDeleting}
                                                                confirmText={module.title}
                                                                entityName="module"
                                                                message={`You are about to permanently delete the ${module.title} module. All associated materials...`}
                                                            />
                                                        </Modal>
                                                    )}
                                                </div>
                                            </NavLink>
                                        </div>
                                    )
                                })}
                            </>
                        ) : (
                            <div className="h-full w-full">
                                <EmptyStateUI
                                    title="No Modules Found"
                                    description="You have not added any modules to this Course yet, Start building your course by adding modules."
                                    buttonText="Add New Module"
                                    onButtonClick={() => navigate(`/course/${courseSlug}/content/modules/create`)}
                                />
                            </div>
                        )
                }
            </ul>

        </div >
    )
}

export default ModulesEditor
