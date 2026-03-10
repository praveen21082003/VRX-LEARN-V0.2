import React, { useEffect } from "react";
import { Button, Avatar, StatusPill, Icon, Input } from "@/components/ui";
import useAssignment from "../../../hooks/useAssignment";
import DocumentControls from "@/components/content/document/DocumentControls";

function SubmissionView({ setActiveTab, activeAssignmentId }) {
    const { assignment, loading, fetchAssignment } = useAssignment();



    useEffect(() => {
        fetchAssignment(activeAssignmentId);
    }, [activeAssignmentId]);

    if (!assignment) return <p className="text-center py-10">Loading...</p>;

    return (
        <div className="space-y-6">

            <header className="flex items-center gap-4 flex-wrap">
                <Button
                    frontIconName="famicons:arrow-back-sharp"
                    frontIconWidth="20px"
                    frontIconHeght="20px"
                    bgClass=""
                    textClass=""
                    onClick={() => setActiveTab("submissions")}
                />

                <div className="flex items-center justify-between gap-3 px-4 py-2 border border-default bg-[#F8F9FA] dark:bg-transparent rounded min-w-64">
                    <div className="flex items-center gap-2">
                        <Avatar name={assignment.name} />
                        <span className="font-medium truncate">{assignment.name}</span>
                    </div>

                    <StatusPill status={assignment.status} />
                </div>

                <div className="flex items-center gap-6">
                    <Button frontIconName="mingcute:left-fill" frontIconHeght="24" frontIconWidth="24" bgClass="" textClass=""/>
                    <Button frontIconName="mingcute:right-fill" frontIconHeght="24" frontIconWidth="24" bgClass="" textClass="" />
                </div>
                
            </header>


            <main className="flex flex-col lg:flex-row gap-6">

                <section className="flex-1 min-w-0">
                    <DocumentControls
                        title={assignment.file_name}
                        fileUrl={assignment.file_url}
                        key={assignment.id}
                    />
                </section>

                <aside className="w-full lg:w-72 p-4 space-y-5">
                    <div className="">
                        <Input
                            label="Grade"
                            type="number"
                            paddingClass="p-2"
                        />

                        <span className="text-body whitespace-nowrap">
                            100 Points
                        </span>
                    </div>

                    <div className="space-y-2">
                        <label className="text-h5">Feedback</label>
                        <textarea
                            rows="8"
                            className="w-full border text-body border-input-border rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-brand"
                        />
                    </div>


                    <div className="flex justify-end">
                        <Button buttonName="Post" bgClass="" textClass="" className="px-3 rounded" />
                    </div>

                </aside>
            </main>
        </div>
    );
}

export default SubmissionView;