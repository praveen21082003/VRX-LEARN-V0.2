import React, { useEffect, useState } from "react";
import { Button, Avatar, StatusPill, Icon, Input } from "@/components/ui";
import useAssignmentSubmissions from "../../../hooks/useAssignmentSubmissions";
import DocumentControls from "@/components/content/document/DocumentControls";
import useMedia from '@/features/courses/hooks/useMedia';
import { useToast } from "@/context/ToastProvider"

function SubmissionView({ setActiveTab, activeAssignmentId }) {

    const { addToast } = useToast();
    const [evaluation, setEvaluation] = useState({
        score: "",
        feedback: ""
    });

    const { submitedData, gradeData, submissionLoading, grading, fetchSubmitionData, gradeSubmission } = useAssignmentSubmissions();

    const mediaId = submitedData?.mediaId;
    const { url, loading: mediaLoading } = useMedia(mediaId);



    useEffect(() => {
        if (activeAssignmentId) {
            fetchSubmitionData(activeAssignmentId);
        }
    }, [activeAssignmentId]);

    useEffect(() => {
        if (submitedData) {
            setEvaluation({
                score: submitedData.score || "",
                feedback: submitedData.feedback || ""
            });
        }
    }, [submitedData]);

    const handleChange = (field, value) => {
        setEvaluation((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    const getErrorMessage = (status) => {
        const map = {
            400: "Assignment already verified.",
            401: "Session expired. Please login again.",
            403: "You are not allowed to grade this submission.",
            404: "Submission not found.",
            409: "Already graded. Refresh to see latest.",
            422: "Validation failed. Check grade value.",
            500: "Server error. Please try again later."
        };

        return map[status] || "Failed to submit grade.";
    };


    const handleSubmit = async () => {

        const original = submitedData || {};

        const payload = {}

        if (
            evaluation.score !== "" &&
            Number(evaluation.score) !== original?.score
        ) {
            payload.score = Number(evaluation.score);
        }

        if (evaluation.feedback !== original?.feedback) {
            payload.feedback = evaluation.feedback?.trim()
                ? evaluation.feedback.trim()
                : null;
        }

        try {
            await gradeSubmission(activeAssignmentId, payload);
            addToast("Graded successfully", "success");

        } catch (err) {
            const status = err?.response?.status;

            const message = !err?.response
                ? "Network error. Check your connection"
                : getErrorMessage(status);

            addToast(message, "error");
        }
    }




    if (!submitedData) return;

    if (submissionLoading) return <p className="text-center py-10">Loading...</p>;

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

                <div className="flex items-center justify-between gap-3 px-4 py-2 border border-default bg-submission dark:bg-transparent rounded min-w-64">
                    <div className="flex items-center gap-2">
                        <Avatar name={submitedData?.submitterName} />
                        <span className="font-medium truncate">{submitedData?.submitterName}</span>
                    </div>

                    <StatusPill status={submitedData?.status} />
                </div>

                <div className="flex items-center gap-6">
                    <Button frontIconName="mingcute:left-fill" frontIconHeght="24" frontIconWidth="24" bgClass="" textClass="" />
                    <Button frontIconName="mingcute:right-fill" frontIconHeght="24" frontIconWidth="24" bgClass="" textClass="" />
                </div>

            </header>


            <main className="flex flex-col lg:flex-row gap-1">

                <section className="flex-1 min-w-0">
                    <DocumentControls
                        title={submitedData?.filename}
                        fileUrl={url}
                        key={submitedData?.id}
                        loading={mediaLoading}
                    />
                </section>

                <aside className="w-full lg:w-80 p-4 space-y-5">
                    <div className="">
                        <Input
                            label="Grade"
                            type="number"
                            paddingClass="p-2"
                            border="border-2 border-default"
                            value={evaluation.score || ""}
                            onChange={(e) => handleChange("score", e.target.value)}
                        />

                        <span className="text-body whitespace-nowrap">
                            100 Points
                        </span>
                    </div>

                    <div className="space-y-2">
                        <label className="text-h5">Feedback</label>
                        <textarea
                            rows="8"
                            placeholder="Provide feedback for the student (e.g., strengths, areas for improvement, suggestions...)"
                            className="w-full border-2 text-body border-default rounded p-3 focus:outline-none focus:ring-3 focus:ring-brand"
                            value={evaluation.feedback || ""}
                            onChange={(e) => handleChange("feedback", e.target.value)}
                        />
                    </div>


                    <div className="flex justify-end">
                        <Button
                            buttonName={grading ? "Grading..." : "Grade"}
                            bgClass=""
                            textClass=""
                            className="px-4 py-1 rounded"
                            onClick={handleSubmit}
                        />
                    </div>

                </aside>
            </main>
        </div>
    );
}

export default SubmissionView;