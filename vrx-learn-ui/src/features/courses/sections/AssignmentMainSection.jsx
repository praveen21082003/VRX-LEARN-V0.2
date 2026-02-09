import formatDate from "@/utils/formatDate"
import formatDateTime from "@/utils/formatDateTime"
import { Icon, MarkdownContent } from "@/components/ui"
import { FileDropZone } from "@/components/ui"
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
                {assignment.attachments.map((file, index) => {
                    // Determine file extension to show different icons (optional but pro)
                    const extension = file.name.split('.').pop().toLowerCase();

                    return (
                        <div
                            key={index}
                            className="group flex items-center gap-3 p-2 pr-4 bg-surface border-2 border-border/50 rounded-xl hover:shadow-md transition-all duration-200 min-w-51 max-w-70"
                        >

                            <div className="shrink-0 w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                                <Icon
                                    name={extension === 'pdf' ? "ri:file-pdf-2-line" : "line-md:file"}
                                    className="text-xl"
                                />
                            </div>


                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground truncate leading-tight">
                                    {file.name}
                                </p>
                                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                                    {extension} File
                                </p>
                            </div>


                            <a
                                href={file.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="shrink-0 p-1.5 bg-primary/10 hover:bg-primary hover:text-white rounded-full text-primary transition-colors"
                                title="View Attachment"
                            >
                                <Icon name="ri:external-link-line" className="text-lg" />
                            </a>
                        </div>
                    );
                })}
            </div>
            <h1 className="text-xl font-semibold"><u>Your Works</u></h1>
            <div className="h-71 w-full mt-4" >
                <FileDropZone files={files} onFilesChange={setFiles} />
            </div>

            
                
        </main>
    )
}