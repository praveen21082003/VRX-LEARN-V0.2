import React, { useState, useRef, useEffect } from 'react'
import { Button, Input, Icon, Dropdown } from '@/components/ui'
import { useOutletContext, NavLink } from 'react-router-dom'
import formatDateTime from '@/utils/formatDateTime';
import formatDate from "@/utils/formatDate";
import { getButtons } from '@/config/DropdownButtons';
import useUpdateAssignment from '../hooks/useUpdateAssignment';
import useDeleteAssignment from '../hooks/useDeleteAssignment';
import { useToast } from '@/context/ToastProvider';


function AssignmentsEditor() {
    const { assignments, courseSlug } = useOutletContext();
    const { updateAssignemt, loading, error } = useUpdateAssignment();
    const { deleteAssignment } = useDeleteAssignment();
    const { addToast } = useToast();
    const inputRef = useRef(null);
    const rowRefs = useRef({});

    const [isOpenDropdown, setIsOpenDropdown] = useState(null);
    const [renameAssignmentId, setRenameAssignmentId] = useState(null);
    const [renameValue, setRenameValue] = useState("");
    const [updatedAssignments, setUpdatedAssignments] = useState(assignments || [])



    const handleRename = (assignmentId) => {
        const assignment = assignments.find(a => a.id === assignmentId);
        setRenameAssignmentId(assignmentId);
        setRenameValue(assignment?.title || "");
        setIsOpenDropdown(null);
    }

    async function renameAssignmentHandler(assignmentId) {
        const newTitle = renameValue.trim();

        if (!newTitle) return;

        try {
            await updateAssignemt(assignmentId, { title: newTitle });

            setUpdatedAssignments(prev =>
                prev.map(a =>
                    a.id === assignmentId ? { ...a, title: newTitle } : a
                )
            );
            addToast("Module Renamed", "success")

            setRenameAssignmentId(null);
        } catch (error) {
            console.error(error);
            addToast("Error Occured", "error")
        }
    }

    const handleDelete = async (assignmentId) => {
        try {
            await deleteAssignment(assignmentId);

            setUpdatedAssignments(prev =>
                prev.filter(a => a.id !== assignmentId)
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





    if (!assignments) return null
    return (
        <div className="space-y-6">
            <div className='flex justify-between'>
                <h2 className="text-h3">Assignments</h2>
                <NavLink to={`/courses/${courseSlug}/edit/assignments/create`}>
                    <Button buttonName="Add New Assignment" frontIconName="ic:baseline-plus" frontIconWidth="24px" frontIconHeght="24px" className="p-1 rounded font-semibold text-md" bgClass="" textClass="hover:text-primary dark:hover:text-white/70" />
                </NavLink>
            </div>
            <ul className="flex flex-col">
                {updatedAssignments.map((assignment) => {
                    const isOpen = isOpenDropdown === assignment.id;

                    return (
                        < li key={assignment.id} >
                            <NavLink
                                onDoubleClick={() =>
                                    navigate(`/courses/${courseSlug}/edit/assignments/${assignment.id}`)
                                }
                                className="flex items-center justify-between px-5 py-3 rounded-md hover:bg-primary/16 dark:hover:bg-primary transition-colors cursor-pointer"
                                onClick={(e) => {
                                    if (isOpenDropdown === assignment.id) {
                                        e.preventDefault();   // stop navigation
                                        setIsOpenDropdown(null); // close dropdown
                                    }
                                }}
                            >
                                {/* Left side */}
                                <div className="flex items-center w-full min-w-0 gap-3">
                                    <Icon
                                        name="material-symbols:assignment-outline"
                                        height="25"
                                        width="25"
                                        className="text-muted-foreground"
                                    />
                                    <div className='flex flex-col w-full'>

                                        {renameAssignmentId === assignment.id
                                            ? <span className='flex-1'>
                                                <Input
                                                    className="text-sm"
                                                    paddingClass="p-2"
                                                    bgClass="bg-primary-border"
                                                    value={renameValue}
                                                    autoFocus
                                                    onChange={(e) => setRenameValue(e.target.value)}
                                                    onBlur={() => setRenameAssignmentId(null)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            e.preventDefault();
                                                            renameAssignmentHandler(assignment.id);
                                                        }

                                                        if (e.key === "Escape") {
                                                            setRenameAssignmentId(null);
                                                        }
                                                    }}
                                                />
                                            </span>
                                            : <span className="text-h45 text-foreground">
                                                {assignment.title}
                                            </span>
                                        }
                                        <span className='text-caption text-dark-gray text-muted-foreground'>
                                            Due: {formatDate(assignment.due_date)}, {formatDateTime(assignment.due_date, assignment.due_time)}
                                        </span>
                                    </div>

                                </div>
                                <div
                                    className='relative w-20 h-auto flex justify-center'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setIsOpenDropdown(prev =>
                                            prev === assignment.id ? null : assignment.id
                                        );
                                    }}
                                >
                                    <Icon name="iconamoon:menu-kebab-horizontal" height="32px" width="32px" className="cursor-help" />

                                    {isOpen && (
                                        <Dropdown
                                            buttons={getButtons(assignment.id, handleRename, handleDelete)}
                                            closeDropdown={() => setIsOpenDropdown(null)}
                                        />
                                    )}
                                </div>
                            </NavLink>

                        </li>
                    )
                })}
            </ul>
        </div >
    )
}

export default AssignmentsEditor
