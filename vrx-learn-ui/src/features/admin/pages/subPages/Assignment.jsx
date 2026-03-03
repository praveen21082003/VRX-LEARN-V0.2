import React, { useState } from 'react'
import { Icon, Tabs, Button } from '@/components/ui'
import { useParams, useOutletContext } from "react-router-dom";
import formatDate from '@/utils/formatDate'
import formatDateTime from '@/utils/formatDateTime';
import { InstructionsTab, SubmissionsTab } from "./sections";

function Assignment() {
    const { assignmentId } = useParams();
    const { assignments } = useOutletContext();
    const [activeTab, setActiveTab] = useState("instructions");

    const tabs = [
        { label: "Instructions", value: "instructions" },
        { label: "Submissions", value: "submissions" }
    ]

    if (!assignments) return <p>Assignment not found</p>;

    const assignment = assignments.find(
        (a) => a.id === assignmentId
    );





    return (
        <div>
            <div className='flex justify-between'>
                <h2 className="title-h2">{assignment.title}</h2>
                <Button buttonName="Edit Details" frontIconName='mingcute:pencil-line' frontIconWidth="24px" frontIconHeght="24px" className="p-1 rounded font-semibold text-md" bgClass="bg-white" textClass="text-primary" />
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground text-dark-gray">
                <div className="flex gap-2 items-center">
                    <Icon icon="mdi:clock-outline" width="16px" height="16px" />
                    <p className="text-sm text-muted-foreground">
                        Due: {formatDate(assignment.due_date)}, {formatDateTime(assignment.due_date, assignment.due_time)}
                    </p>
                </div>
                <Icon name="bi:dot" />
                <div className="flex gap-2 items-center">
                    <Icon name="streamline:star-badge-remix" width="16px" height="16px" />
                    <p className="text-sm text-muted-foreground">
                        Max: {assignment.marks} Marks
                    </p>
                </div>
            </div>
            <div className="mt-6">
                <Tabs
                    tabs={tabs}
                    activeTab={activeTab}
                    onChange={setActiveTab}
                />

                <div className="py-5">
                    {activeTab === "instructions" && <InstructionsTab description={assignment.description} attachments={assignment.attachments} />}
                    {activeTab === "submissions" && <SubmissionsTab />}
                </div>

            </div>
        </div>
    )
}

export default Assignment
