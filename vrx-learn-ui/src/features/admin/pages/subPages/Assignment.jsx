import React, { useEffect, useState } from 'react'
import { Icon, Tabs, Button, EmptyStateUI, FillPageLoading } from '@/components/ui'
import { useParams, useOutletContext, useNavigate } from "react-router-dom";

import formatDateTime from '@/utils/formatDateTime';
import { InstructionsTab, SubmissionsTab, SubmissionView } from "./sections";



import useAssignmentSubmissions from '../../hooks/useAssignmentSubmissions';


function Assignment() {
    const { courseSlug, assignmentId } = useParams();
    const navigate = useNavigate();


    const today = new Date().toISOString().split("T")[0];
    const [activeTab, setActiveTab] = useState("instructions");


    const { assignment, detailsLoading, fetchAssignmentDetails } = useOutletContext();
    const { submissions, loading, error, refetch } =
        useAssignmentSubmissions(assignmentId, { date: today });

    const { assignment: assignmentData, attachment } = assignment || {};


    const tabs = [
        { label: "Instructions", value: "instructions" },
        { label: "Submissions", value: ["submissions", "view_submission"] },
    ];


    if (detailsLoading) {
        return <FillPageLoading message="Loading, Assignment...." />;
    }

    if (!assignmentData) {
        return <EmptyStateUI message="Assignment not found" />;
    }







    return (
        <div>
            <div className='flex justify-between'>
                <h2 className="text-h3">{assignmentData?.title}</h2>
                {activeTab === "instructions" &&
                    <Button
                        buttonName="Edit Details"
                        frontIconName='mingcute:pencil-line'
                        frontIconWidth="24px"
                        frontIconHeght="24px"
                        className="p-1 rounded font-semibold text-md"
                        bgClass=""
                        textClass="text-primary dark:text-background"
                        onClick={() => navigate(`/course/${courseSlug}/content/assignments/${assignmentId}/edit`)}
                    />
                }
            </div>

            <div className="flex items-center text-caption gap-2 text-muted-foreground text-dark-gray">
                <div className="flex gap-2 items-center">
                    <Icon icon="mdi:clock-outline" width="16px" height="16px" />
                    <p className="text-muted-foreground">
                        Due: {assignmentData?.dueDate
                            ? formatDateTime(assignmentData.dueDate)
                            : "-"}
                    </p>
                </div>
                <Icon name="bi:dot" />
                <div className="flex gap-2 items-center">
                    <Icon name="streamline:star-badge-remix" width="16px" height="16px" />
                    <p className="text-muted-foreground">
                        Max: {assignmentData?.maxScore} Marks
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
                    {activeTab === "instructions" && <InstructionsTab instructions={assignmentData?.instructions} attachment={attachment} />}
                    {activeTab === "submissions" && <SubmissionsTab submissions={submissions} setActiveTab={setActiveTab} />}
                    {/* {activeTab === "view_submission" && <SubmissionView submissions={submissions} setActiveTab={setActiveTab} assignmentId={assignmentId} activeAssignmentId={activeAssignmentId}/>} */}
                </div>

            </div>
        </div>
    )
}

export default Assignment
