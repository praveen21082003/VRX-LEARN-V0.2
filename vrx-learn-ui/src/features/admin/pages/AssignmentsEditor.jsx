import React from 'react'
import { Button, Icon } from '@/components/ui'
import { useOutletContext, NavLink } from 'react-router-dom'
import formatDateTime from '@/utils/formatDateTime';
import formatDate from "@/utils/formatDate";

function AssignmentsEditor() {
    const { assignments, moduleloading, moduleError, courseSlug } = useOutletContext();

    if (!assignments) return null
    return (
        <div className="space-y-6">
            <div className='flex justify-between'>
                <h2 className="text-2xl font-semibold flex items-center gap-3">Assignments</h2>
                <NavLink to={`/admin/courses/${courseSlug}/create/assignment`}>
                    <Button buttonName="Add New Assignment" frontIconName="ic:baseline-plus" frontIconWidth="24px" frontIconHeght="24px" className="p-1 rounded font-semibold text-md" bgClass="bg-white" textClass="hover:text-primary" />
                </NavLink>
            </div>
            <ul className="flex flex-col">
                {assignments.map((assignment) => (

                    <li key={assignment.id} >
                        <NavLink to={`/admin/courses/${courseSlug}/edit/assignments/${assignment.id}`} className="flex items-center justify-between px-5 py-3 rounded-md hover:bg-surface transition-colors cursor-pointer">
                            {/* Left side */}
                            <div className="flex items-center gap-3">
                                <Icon
                                    name="material-symbols:assignment-outline"
                                    height="25"
                                    width="25"
                                    className="text-muted-foreground"
                                />
                                <div className='flex flex-col'>
                                    <span className="font-medium text-foreground">
                                        {assignment.title}
                                    </span>
                                    <span className='text-xs text-dark-gray text-muted-foreground'>
                                        Due: {formatDate(assignment.due_date)}, {formatDateTime(assignment.due_date, assignment.due_time)}
                                    </span>
                                </div>

                            </div>
                            <Icon
                                name="iconamoon:menu-kebab-horizontal"
                                height="32"
                                width="32"
                                className="text-muted-foreground hover:text-foreground"
                            />
                        </NavLink>

                    </li>
                ))}
            </ul>
        </div >
    )
}

export default AssignmentsEditor
