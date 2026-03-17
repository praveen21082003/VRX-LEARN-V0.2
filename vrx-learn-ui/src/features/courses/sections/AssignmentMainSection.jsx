
import formatDateTime from "@/utils/formatDateTime"
import { Icon, MarkdownContent, AttachmentCard, UploadSection } from "@/components/ui"
import { useState, useEffect } from "react"


export default function AssignmentMainSection({ assignment, onBack }) {

    const [files, setFiles] = useState([]);


    useEffect(() => {
        setFiles([]);
    }, [assignment?.id]);

    if (!assignment) return null


    return (
        <main className="flex-1 min-h-0 overflow-y-auto p-3">
            <h1 className="flex gap-2 items-center text-h3">{assignment.title}</h1>
            <div className="flex items-center gap-2 text-caption text-muted-foreground text-dark-gray">
                <div className="flex gap-2 items-center">
                    <Icon icon="mdi:clock-outline" width="16" height="16" />
                    <p className="text-muted-foreground">
                        Due: {formatDateTime(assignment.submission_date)}
                    </p>
                </div>
                <Icon name="bi:dot" height="16" width="16" />
                <div className="flex gap-2 items-center">
                    <Icon name="streamline:star-badge-remix" width="16" height="16" />
                    <p className="text-muted-foreground">
                        Max: {assignment.marks} Marks
                    </p>
                </div>
            </div>
            <div>
                <MarkdownContent content={assignment.description} />
            </div>
            <h1 className="text-h5">Attachments</h1>
            <div className="flex flex-wrap gap-3 py-4">
                {assignment.attachments.map((file, index) => (
                    <AttachmentCard key={index} file={file} />
                ))}
            </div>


            <UploadSection
                files={files}
                setFiles={setFiles}
                // onUpload={handleUpload}
            />

        </main>
    )
}