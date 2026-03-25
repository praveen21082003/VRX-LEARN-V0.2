import { MarkdownContent, AttachmentCard } from "@/components/ui"
export default function InstructionsTab({ instructions, attachments }) {
    if (!attachments || attachments.length === 0) {
        return (
            <>
                <MarkdownContent content={instructions} />
            </>
        );
    }

    return (
        <>
            <MarkdownContent content={instructions} />
            <h1 className="text-h45 mt-6">Attachments</h1>

            <div className="flex flex-wrap gap-3 mt-2">
                <ul className="flex gap-2">
                    {/* After change to url */}
                    {attachments.map((file, index) => (
                        <li key={index}>    
                            <AttachmentCard file={file} />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
