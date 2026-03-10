import React, { useState } from 'react'
import { Icon, Tabs, Button } from '@/components/ui'
import { useParams, useOutletContext } from "react-router-dom";

import formatDateTime from '@/utils/formatDateTime';
import { InstructionsTab, SubmissionsTab, SubmissionView } from "./sections";

import useAssignmentSubmissions from '../../hooks/useAssignmentSubmissions';

function Assignment() {
    const { assignmentId } = useParams();
    const { assignments } = useOutletContext();
    const [activeTab, setActiveTab] = useState("instructions");
    const [activeAssignmentId, setActiveAssignmentId] = useState(null);



    const { submissions, loading, error, refetch } =
        useAssignmentSubmissions(assignmentId);

    const tabs = [
        { label: "Instructions", value: "instructions" },
        { label: "Submissions", value: ["submissions", "view_submission"]},
    ]

    
    if (!assignments) return <p>Assignment not found</p>;

    const assignment = assignments.find(
        (a) => a.id === assignmentId
    );


    if (loading) return <p>Loading submissions...</p>;
    if (error) return <p>Error loading submissions</p>;





    return (
        <div>
            <div className='flex justify-between'>
                <h2 className="text-h3">{assignment.title}</h2>
                {activeTab === "instructions" &&
                    <Button buttonName="Edit Details" frontIconName='mingcute:pencil-line' frontIconWidth="24px" frontIconHeght="24px" className="p-1 rounded font-semibold text-md" bgClass="" textClass="text-primary dark:text-background" />
                }
            </div>

            <div className="flex items-center text-caption gap-2 text-muted-foreground text-dark-gray">
                <div className="flex gap-2 items-center">
                    <Icon icon="mdi:clock-outline" width="16px" height="16px" />
                    <p className="text-muted-foreground">
                        Due: {formatDateTime(assignment.submission_date)}
                    </p>
                </div>
                <Icon name="bi:dot" />
                <div className="flex gap-2 items-center">
                    <Icon name="streamline:star-badge-remix" width="16px" height="16px" />
                    <p className="text-muted-foreground">
                        Max: {assignment.marks} Marks
                    </p>
                </div>
            </div>
            <div className="mt-6">
                <Tabs
                    tabs={tabs}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />

                <div className="py-5">
                    {activeTab === "instructions" && <InstructionsTab description={assignment.description} attachments={assignment.attachments} />}
                    {activeTab === "submissions" && <SubmissionsTab submissions={submissions} setActiveTab={setActiveTab} setActiveAssignmentId={setActiveAssignmentId}/>}
                    {activeTab === "view_submission" && <SubmissionView submissions={submissions} setActiveTab={setActiveTab} assignmentId={assignmentId} activeAssignmentId={activeAssignmentId}/>}
                </div>

            </div>
        </div>
    )
}

export default Assignment
