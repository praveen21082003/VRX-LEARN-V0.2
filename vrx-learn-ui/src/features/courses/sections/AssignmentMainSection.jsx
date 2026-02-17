import formatDate from "@/utils/formatDate"
import formatDateTime from "@/utils/formatDateTime"
import { Icon, MarkdownContent, AttachmentCard, FileDropZone } from "@/components/ui"
import { useState, useEffect } from "react"


export default function AssignmentMainSection({ assignment }) {

    const [files, setFiles] = useState([]);


    useEffect(() => {
        setFiles([]);
    }, [assignment?.id]);

    if (!assignment) return null


    return (
        <main className="flex-1 min-h-0 overflow-y-auto p-3">
            <h1 className="flex gap-2 items-center text-xl font-semibold"><Icon name="hugeicons:assignments" />{assignment.title}</h1>
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
            <div>
                <MarkdownContent content={assignment.description} />
            </div>
            <h1 className="text-xl font-semibold">Attachments</h1>
            <div className="flex flex-wrap gap-3 mt-2">
                {assignment.attachments.map((file) => (
                    <AttachmentCard key={file.url} file={file} />
                ))}
            </div>

            <FileDropZone label="Your Works" files={files} multipleFiles={false} onFilesChange={setFiles} heightClass="h-74" />




        </main>
    )
}