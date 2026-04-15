
import formatDateTime from "@/utils/formatDateTime"
import { Icon, StatusPill, Button, MarkdownContent, AttachmentCard, UploadSection } from "@/components/ui"
import { useState, useEffect, useRef } from "react"
import BackButton from "@/components/navigation/BackButton";

import useMedia from '@/features/courses/hooks/useMedia';

import { useSubmission } from "../hooks/useSubmission";
import { useToast } from '@/context/ToastProvider'



export default function AssignmentMainSection({ assignment, loading, onRefresh, courseId }) {

    const { addToast } = useToast()
    const [openAttempt, setOpenAttempt] = useState(null);

    const [files, setFiles] = useState([]);
    const [showButton, setShowButton] = useState(true);




    const { assignment: assignmentData, attachment, submissions } = assignment || {};
    const { submitAssignment, loading: submitting, uploadProgress, mediaStatus, loadedData } = useSubmission();


    const maxAttempts = assignmentData?.numberOfAttempts || 1;
    const attemptsArray = Array.from({ length: maxAttempts }, (_, i) => i + 1);


    const mediaId = attachment?.mediaId;
    const { url, loading: mediaLoading } = useMedia(mediaId);


    const lastScrollY = useRef(0);
    const scrollRef = useRef(null);


    const submissionsMap = {};

    submissions?.forEach((sub) => {
        submissionsMap[sub.attempt] = sub;
    });

    const [retake, setRetake] = useState(submissions?.length === 0);
    useEffect(() => {
        setRetake(submissions?.length === 0);
    }, [submissions?.length]);


    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        const handleScroll = () => {
            const currentScrollY = container.scrollTop;

            if (Math.abs(currentScrollY - lastScrollY.current) < 5) return;

            if (currentScrollY > lastScrollY.current) {
                setShowButton(false);
            } else {
                setShowButton(true);
            }

            lastScrollY.current = currentScrollY;
        };

        container.addEventListener("scroll", handleScroll);

        return () => {
            container.removeEventListener("scroll", handleScroll);
        };
    }, []);



    useEffect(() => {
        setFiles([]);
    }, [assignment?.id]);

    const getButtonText = () => {
        if (submitting && uploadProgress > 0 && uploadProgress < 100) {
            return "Uploading...";
        }

        if (submitting && mediaStatus === "processing") {
            return "Finishing...";
        }

        if (mediaStatus === "uploaded") {
            return "Done";
        }

        return "Submit";
    };



    const handleSubmit = async () => {

        if (mediaStatus === "uploaded") {

            onRefresh?.();
            setRetake(false);

            return;
        }

        if (files.length === 0) {
            addToast("Please upload a file first.", "warning");
            return;
        }

        const file = files[0];

        const payload = {
            assignmentSubmission: {
                assignmentId: assignmentData.id,
            },
            fileMetadata: {
                filename: file.name,
                content_type: file.type || "application/pdf",
                size: file.size,
            },
        };

        console.log("assignment submission", payload)

        try {
            await submitAssignment(payload, file);
            addToast("Assignment submitted successfully", "success");
        }
        catch (err) {
            addToast(err.message, "error");
        }
    }

    if (!assignment) return null;

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <p>Loading assignment...</p>
            </div>
        );
    }


    return (
        <div className="overflow-y-auto w-full">
            <div className="block lg:hidden w-full border border-default p-2">
                <BackButton to={`/course/${courseId}/assignments`} iconName="material-symbols:arrow-back-rounded" label="Back" />
            </div>

            <main
                ref={scrollRef}
                className="flex-1 min-h-0 px-2 lg:p-3 lg:pt-5 pb-32"
            >
                <div className=" flex justify-between">
                    <div>
                        <h1 className="flex gap-2 items-center text-h3">{assignmentData?.title}</h1>
                        <div className="flex items-center gap-2 text-caption text-muted-foreground text-dark-gray">
                            <div className="flex gap-2 items-center">
                                <Icon icon="mdi:clock-outline" width="16" height="16" />
                                <p className="text-muted-foreground">
                                    Due: {formatDateTime(assignmentData?.dueDate)}
                                </p>
                            </div>
                            <Icon name="bi:dot" height="16" width="16" />
                            <div className="flex gap-2 items-center">
                                <Icon name="streamline:star-badge-remix" width="16" height="16" />
                                <p className="text-muted-foreground">
                                    Max: {assignmentData.maxScore} Marks
                                </p>
                            </div>
                            <Icon name="bi:dot" height="16" width="16" />
                            <div className="flex gap-2 items-center">
                                <Icon name="ic:baseline-loop" width="16" height="16" />
                                <p className="text-muted-foreground">
                                    Max Attempts: {assignmentData.numberOfAttempts}
                                </p>
                            </div>
                        </div>
                    </div>
                    {submissions?.length > 0 && submissions?.length < maxAttempts && (
                        <Button
                            buttonName={retake ? "Cancel" : "Retake"}
                            frontIconName={retake ? "radix-icons:cross-2" : "ic:baseline-loop"}
                            frontIconHeight="26"
                            frontIconWidth="26"
                            bgClass=""
                            textClass=""
                            className="p-1 h-9 rounded"
                            onClick={() => setRetake((prev) => !prev)}
                        />
                    )}

                </div>

                <div>
                    <MarkdownContent content={assignmentData?.instructions} />
                </div>

                {!attachment && null}

                {attachment && (
                    <>
                        <h1 className="text-h45 mt-6">Attachments</h1>

                        <div className="flex flex-wrap gap-3 mt-2">
                            <AttachmentCard
                                fileName={attachment.filename}
                                url={url}
                                loading={mediaLoading}
                            />
                        </div>
                    </>
                )}

                {retake && (
                    <div className="mt-6 space-y-4">
                        <h2 className="text-caption font-semibold text-primary mb-2 uppercase tracking-wide">
                            {submissions?.length === 0
                                ? ""
                                : `New Submission: Attempt ${submissions.length + 1} of ${maxAttempts}`
                            }
                        </h2>
                        <UploadSection
                            files={files}
                            setFiles={setFiles}
                            uploadProgress={uploadProgress}
                            isUploading={submitting}
                            mediaStatus={mediaStatus}
                            loadedData={loadedData}
                        />
                    </div>
                )}

                {!retake && (
                    <div className="space-y-3 mt-4">
                        {attemptsArray.map((attemptNumber) => {
                            const submission = submissionsMap[attemptNumber];

                            if (!submission) return null;

                            return (
                                <div key={attemptNumber} className="border rounded border-default bg-background overflow-hidden">
                                    <div className="flex bg-submission border-b border-default justify-between p-3 h-15 items-center">
                                        <div className="flex justify-center items-center gap-5">
                                            Attempt {attemptNumber} of {maxAttempts}
                                            {openAttempt !== attemptNumber && (
                                                <span>
                                                    <p className="text-body">{submission.filename}</p>
                                                    <p className="text-caption text-muted">
                                                        Submitted on {new Date(submission.submittedAt).toLocaleString()}
                                                    </p>
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex gap-2 items-center">
                                            {/* Since we filtered above, status will now only be 'Graded' or 'Submitted' */}
                                            <StatusPill status={submission.status} />
                                            <Button
                                                frontIconName="iconamoon:arrow-down-2"
                                                frontIconHeight="26"
                                                frontIconWidth="26"
                                                bgClass=""
                                                textClass=""
                                                className={openAttempt === attemptNumber ? "rotate-180" : ""}
                                                onClick={() =>
                                                    setOpenAttempt(prev =>
                                                        prev === attemptNumber ? null : attemptNumber
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>

                                    {openAttempt === attemptNumber && (
                                        <div className="space-y-3 p-4">
                                            <div className="flex justify-between items-center">
                                                <div className="flex gap-2">
                                                    <Icon name="fluent:document-pdf-24-filled" height="36" width="36" />
                                                    <span>
                                                        <p className="text-sm font-medium">{submission.filename}</p>
                                                        <p className="text-xs text-gray-500">
                                                            Submitted on {new Date(submission.submittedAt).toLocaleString()}
                                                        </p>
                                                    </span>
                                                </div>
                                                {submission.score !== null && (
                                                    <span className="flex items-center font-semibold text-primary">
                                                        <p className="text-h3">{submission.score}</p>
                                                        / <p className="text-h5">{assignmentData.maxScore}</p>
                                                    </span>
                                                )}
                                            </div>
                                            {submission.score !== null && (
                                                <div className="flex gap-2 text-emphasis">
                                                    <label className="font-bold">Trainer Feedback: </label>
                                                    <p>{submission?.feedback || "No feedback provided"}</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}


                <div className="flex w-full items-center justify-center mt-6">
                    {files.length > 0 && (
                        <Button
                            buttonName={getButtonText()}
                            onClick={handleSubmit}
                            bgClass="bg-primary"
                            textClass="text-white"
                            frontIconName={
                                submitting
                                    ? "mingcute:loading-3-fill"
                                    : mediaStatus === "uploaded"
                                        ? "mdi:check-circle"
                                        : ""
                            }
                            frontIconHeight="15"
                            frontIconWidth="15"
                            className="p-2 rounded px-6 font-semibold transition-all hover:opacity-90 disabled:bg-muted disabled:text-muted-foreground"
                            disabled={submitting || mediaStatus === "uploaded"}
                        />
                    )}
                </div>
            </main>
        </div>

    )
}