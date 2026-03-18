
import formatDateTime from "@/utils/formatDateTime"
import { Icon, MarkdownContent, AttachmentCard, UploadSection } from "@/components/ui"
import { useState, useEffect, useRef } from "react"
import BackButton from "@/components/navigation/BackButton";




export default function AssignmentMainSection({ assignment, courseId }) {

    console.log(courseId)

    const [files, setFiles] = useState([]);
    const [showButton, setShowButton] = useState(true);
    const lastScrollY = useRef(0);

    const scrollRef = useRef(null);


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

    if (!assignment) {
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
                className="flex-1 min-h-0 px-2 lg:p-3 pb-32"
            >
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
                    showButton={showButton}
                // onUpload={handleUpload}
                />
            </main>
        </div>

    )
}