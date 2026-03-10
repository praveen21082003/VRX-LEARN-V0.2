
import formatDateTime from "@/utils/formatDateTime"
import { Icon,Button, MarkdownContent, AttachmentCard, FileDropZone } from "@/components/ui"
import { useState, useEffect } from "react"


export default function AssignmentMainSection({ assignment }) {

    const [files, setFiles] = useState([]);


    useEffect(() => {
        setFiles([]);
    }, [assignment?.id]);

    if (!assignment) return null


    return (
        <main className="flex-1 min-h-0 overflow-y-auto p-3">
            <h1 className="flex gap-2 items-center text-h3"><Icon name="hugeicons:assignments" />{assignment.title}</h1>
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
                {assignment.attachments.map((file) => (
                    <AttachmentCard key={file.url} file={file} />
                ))}
            </div>

            <FileDropZone label="Your Works" files={files} multipleFiles={false} onFilesChange={setFiles} heightClass="h-74" />

            <div className='flex justify-center'>
                <Button buttonName={files.length <= 0 ? "Submit" : "Upload"} className="mt-5 px-5 py-2 rounded" />
            </div>




        </main>
    )
}